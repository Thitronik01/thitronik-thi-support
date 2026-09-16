/**
 * Thitronik Wiki — Build-time Ingest Script (Next.js)
 *
 * Processes all wiki/**\/*.md files and produces:
 * - public/wiki-index.json    (slim; Artikel-Bodies lazy via wiki-articles/)
 * - public/search-index.json  (Fuse.js-ready)
 * - project-data/runtime/wiki/audit-report[.public].json (Issues; Auslieferung NUR via /api/wiki/bootstrap)
 * - public/wiki-sources/{lang}/{slug}.json (raw markdown body per article — Editor lädt lazy)
 * - public/wiki-sources-index.json (slim Liste aller Source-Files)
 * - public/glossary.json      (curated V2 glossary from wiki/Glossar/01_final/)
 *
 * Adapted for the Next.js Online project:
 *   REPO_ROOT = <project>            (scripts/ is directly under repo root)
 *   PUBLIC_DIR = <project>/public
 *
 * Design refs: docs/CONTENT_MODEL.md, docs/ASSET_MAPPING_GUIDE.md, docs/HYPERLINKING_STRATEGY.md
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { glob } from 'glob';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import GithubSlugger from 'github-slugger';
import {
  INTERNAL_SECTION_ANCHORS,
  dealerHeadingsFor,
  dealerSearchView,
  dealerSectionsView,
  htmlToPlainText,
} from '../lib/wiki-dealer-view.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const WIKI_ROOT = path.join(REPO_ROOT, 'wiki');
const PROJECT_DATA = path.join(REPO_ROOT, 'project-data');
const PUBLIC_DIR = path.join(REPO_ROOT, 'public');
const RUNTIME_WIKI_DIR = path.join(PROJECT_DATA, 'runtime', 'wiki');

const LANGUAGES = ['de', 'en', 'fr', 'es', 'it', 'nl', 'da', 'sv', 'no', 'pl', 'cs'];
const CANONICAL_LANG = 'de';
const LANGUAGE_SET = new Set(LANGUAGES);
const TRANSLATION_EXEMPT_PATHS = new Set([
  'wiki/de/uebersetzungs-glossar.md',
  // Interne Quellen-Abdeckungs-Matrix (Redaktionswerkzeug, nicht händlerseitig) —
  // bewusst deutsch, von Übersetzungs-/Residue-Checks ausgenommen (Entscheidung Max, 2026-07-06).
  'wiki/de/quellen-matrix.md',
]);
const INTERNAL_SLUGS = new Set([
  'quellen-matrix',
  'support-fallaufnahme',
  'terminologie-und-schreibweisen',
  'uebersetzungs-glossar',
  'werkseinbau-eckernfoerde',
]);
const INTERNAL_SOURCE_PATTERNS = [
  /NUR_INTERNER_GEBRAUCH/i,
  /\/intern\//i,
  /(?:^|[_/-])RAG(?:[_/-]|$)/i,
  /RAG_Pack/i,
  /FULL_RAG/i,
  /abgeleitet aus aktuellen Wiki-Frontmattern/i,
];
const SOURCE_PATH_EXTENSIONS = new Set(['.md', '.pdf', '.txt', '.docx', '.csv']);

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg']);
const AUDIO_EXTENSIONS = new Set(['.mp3', '.wav', '.ogg', '.m4a']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov', '.m4v']);
const PDF_EXTENSIONS = new Set(['.pdf']);

function classifyAssetType(ext) {
  if (IMAGE_EXTENSIONS.has(ext)) return 'image';
  if (AUDIO_EXTENSIONS.has(ext)) return 'audio';
  if (VIDEO_EXTENSIONS.has(ext)) return 'video';
  if (PDF_EXTENSIONS.has(ext)) return 'pdf';
  return 'document';
}

const linkDictionary = JSON.parse(fs.readFileSync(path.join(PROJECT_DATA, 'link-dictionary.json'), 'utf-8'));
const assetOverrides = JSON.parse(fs.readFileSync(path.join(PROJECT_DATA, 'asset-overrides.json'), 'utf-8'));
const navigationBlueprint = JSON.parse(fs.readFileSync(path.join(PROJECT_DATA, 'navigation-blueprint.json'), 'utf-8'));

// ============================================
// Audit-Felder: coverage / dealerStatus / articleType
// Siehe docs/CONTENT_MODEL.md fuer Spec.
// ============================================

const COVERAGE_VALUES = new Set(['complete', 'partial', 'faq_only', 'source_missing']);
const DEALER_STATUS_VALUES = new Set(['approved', 'needs_review', 'internal_only']);
const ARTICLE_TYPE_VALUES = new Set([
  'product', 'accessory', 'vehicle', 'troubleshooting',
  'faq', 'tech-doku', 'internal', 'overview', 'reference',
]);

// Produkte/Accessories aus linkDictionary herleiten (Slugs als Ziele "/{lang}/<slug>")
const PRODUCT_SLUGS = new Set();
const ACCESSORY_SLUGS = new Set();
for (const entry of linkDictionary) {
  if (!entry?.target?.startsWith('/{lang}/')) continue;
  const slug = entry.target.replace('/{lang}/', '').split('/').pop()?.split('#')[0];
  if (!slug) continue;
  if (entry.type === 'product') PRODUCT_SLUGS.add(slug);
  if (entry.type === 'accessory') ACCESSORY_SLUGS.add(slug);
}

function deriveArticleType({ section, slug, visibility, isIndex }) {
  if (visibility === 'internal') return 'internal';
  if (isIndex) return 'overview';
  if (section === 'fahrzeuge') return 'vehicle';
  if (section === 'tech-doku') return 'tech-doku';
  if (PRODUCT_SLUGS.has(slug)) return 'product';
  if (ACCESSORY_SLUGS.has(slug)) return 'accessory';
  if (/^faq-/.test(slug)) return 'faq';
  if (/(stoerung|stoerungs|fehler|troubleshoot)/i.test(slug)) return 'troubleshooting';
  return 'reference';
}

function resolveCoverage(raw, sources) {
  if (typeof raw === 'string' && COVERAGE_VALUES.has(raw)) return raw;
  // Default heuristisch: ohne Quellen = source_missing, sonst partial
  return Array.isArray(sources) && sources.length === 0 ? 'source_missing' : 'partial';
}

function resolveDealerStatus(raw, visibility) {
  if (visibility === 'internal') return 'internal_only';
  if (typeof raw === 'string' && DEALER_STATUS_VALUES.has(raw)) return raw;
  return 'needs_review';
}

// Mindestbloecke fuer Fahrzeugseiten — alle in Lowercase.
// Jede Klasse braucht mindestens EIN Match aus ihrer Liste.
const VEHICLE_REQUIRED_BLOCKS = {
  einbauort:        ['einbauort', 'montageort', 'einbau', 'montage'],
  anschluss:        ['anschluss', 'pins', 'pin', 'kabelbelegung', 'verkabelung'],
  varianten:        ['varianten', 'modellvarianten', 'ausstattung', 'baujahr', 'modelljahr'],
  'bekannte-fallen': ['bekannte fallen', 'stolperfallen', 'besonderheiten', 'hinweise', 'achtung', 'warnung'],
  pflichttest:      ['test', 'funktionstest', 'pflichttest', 'inbetriebnahme', 'abnahme'],
};

function findMissingVehicleBlocks(headings) {
  const haystack = (headings || [])
    .filter((h) => h.level <= 3)
    .map((h) => String(h.text || '').toLowerCase());
  const missing = [];
  for (const [blockClass, terms] of Object.entries(VEHICLE_REQUIRED_BLOCKS)) {
    const hit = haystack.some((heading) => terms.some((term) => heading.includes(term)));
    if (!hit) missing.push(blockClass);
  }
  return missing;
}

function wordCount(plainText) {
  if (!plainText) return 0;
  return plainText.split(/\s+/).filter(Boolean).length;
}

function collectAssets() {
  const assetDirs = ['Produkte', 'Fahrzeuge', 'CI', 'Firma', 'Bilder und mehr', 'Alarmtöne'];
  const assets = [];
  for (const dir of assetDirs) {
    const dirPath = path.join(REPO_ROOT, dir);
    if (!fs.existsSync(dirPath)) continue;
    const files = glob.sync('**/*.*', { cwd: dirPath });
    for (const f of files) {
      const ext = path.extname(f).toLowerCase();
      assets.push({
        relativePath: `${dir}/${f}`,
        category: dir,
        filename: path.basename(f),
        ext,
        type: classifyAssetType(ext),
      });
    }
  }
  return assets;
}

function normalizeRepoPath(value) {
  return String(value || '').replace(/\\/g, '/').replace(/^\.?\//, '');
}

function collectRepoFileIndex() {
  const files = glob
    .sync('**/*.*', {
      cwd: REPO_ROOT,
      nodir: true,
      ignore: ['.git/**', 'node_modules/**', '.next/**', '_old_/**'],
    })
    .map(normalizeRepoPath);

  const byPath = new Set(files);
  const byBasename = new Map();
  for (const file of files) {
    const basename = path.basename(file).toLowerCase();
    if (!byBasename.has(basename)) byBasename.set(basename, []);
    byBasename.get(basename).push(file);
  }

  return { byPath, byBasename };
}

function isPathLikeSource(source) {
  const normalized = normalizeRepoPath(source);
  if (normalized.startsWith('sources/') || normalized.startsWith('wiki/')) return true;
  return SOURCE_PATH_EXTENSIONS.has(path.extname(normalized).toLowerCase());
}

function isInternalSource(source) {
  return INTERNAL_SOURCE_PATTERNS.some((pattern) => pattern.test(String(source || '')));
}

function preferredSourceMatch(matches) {
  return [...matches].sort((a, b) => {
    const score = (value) => {
      if (value.startsWith('wiki/Anleitungen/')) return 0;
      if (value.startsWith('wiki/de/')) return 1;
      if (value.startsWith('wiki/Glossar/')) return 2;
      if (value.startsWith('wiki/')) return 3;
      return 4;
    };
    return score(a) - score(b) || a.localeCompare(b);
  })[0];
}

function resolveSourceReference(source, articleLang, fileIndex) {
  const original = String(source || '').trim();
  const normalized = normalizeRepoPath(original);
  const internal = isInternalSource(normalized);
  const result = {
    source: original,
    internal,
    public: !internal,
    status: 'unresolved',
    resolvedPath: null,
    matches: [],
  };

  if (!normalized) return { ...result, status: 'empty' };
  if (!isPathLikeSource(normalized)) return { ...result, status: 'note' };

  const candidates = [normalized];
  if (/^wiki\/(?![a-z]{2}\/)/i.test(normalized)) {
    candidates.push(`wiki/${CANONICAL_LANG}/${normalized.replace(/^wiki\//, '')}`);
  }
  if (normalized.startsWith('sources/')) {
    const basename = path.basename(normalized);
    candidates.push(`wiki/Anleitungen/${basename}`);
    candidates.push(`wiki/${CANONICAL_LANG}/${basename}`);
  }

  for (const candidate of [...new Set(candidates)]) {
    if (fileIndex.byPath.has(candidate)) {
      const status = candidate === normalized
        ? 'resolved'
        : normalized.startsWith('sources/')
          ? 'basename-match'
          : 'normalized';
      return {
        ...result,
        status,
        resolvedPath: candidate,
        normalizedFrom: candidate === normalized ? null : normalized,
        matches: status === 'basename-match' ? [candidate] : [],
      };
    }
  }

  const basenameMatches = fileIndex.byBasename.get(path.basename(normalized).toLowerCase()) || [];
  if (basenameMatches.length > 0) {
    const preferred = preferredSourceMatch(basenameMatches);
    return {
      ...result,
      status: 'basename-match',
      resolvedPath: preferred,
      matches: basenameMatches.slice(0, 8),
    };
  }

  if (articleLang && normalized.startsWith(`wiki/${articleLang}/`)) return result;
  return result;
}

function registerSourceUsage(usage, article, sourceMeta) {
  for (const meta of sourceMeta) {
    if (!usage.has(meta.source)) {
      usage.set(meta.source, { ...meta, count: 0, files: [] });
    }
    const entry = usage.get(meta.source);
    entry.count += 1;
    if (entry.files.length < 8) entry.files.push(article.path);
  }
}

function auditSourceReferences(sourceUsage, auditIssues) {
  for (const entry of sourceUsage.values()) {
    if (entry.status === 'note' || entry.status === 'resolved') continue;
    if (entry.status === 'normalized') {
      auditIssues.push({
        type: 'source-normalized',
        source: entry.source,
        resolvedPath: entry.resolvedPath,
        normalizedFrom: entry.normalizedFrom,
        count: entry.count,
        files: entry.files,
      });
      continue;
    }
    if (entry.status === 'basename-match') {
      auditIssues.push({
        type: 'source-basename-match',
        source: entry.source,
        resolvedPath: entry.resolvedPath,
        matches: entry.matches,
        count: entry.count,
        files: entry.files,
      });
      continue;
    }
    // AP4 (Quellen-Realität): Diese Referenzen zeigen auf den RAG-Workspace des
    // ursprünglichen Erstellers. Die zugrunde liegenden Bedienungs- und Montage-
    // anleitungen liegen zuverlässig vor und wurden nur fürs RAG-Chunking verarbeitet
    // — daher KEIN Audit-Issue (Entscheidung Max, 2026-07-06). Die Gesamtzahl bleibt
    // informativ in summary.sourceSummary.missing erhalten.
    continue;
  }
}

function summarizeSourceUsage(sourceUsage) {
  const summary = { unique: sourceUsage.size, resolved: 0, normalized: 0, basenameMatch: 0, missing: 0, note: 0, internal: 0, public: 0 };
  for (const entry of sourceUsage.values()) {
    if (entry.status === 'resolved') summary.resolved++;
    else if (entry.status === 'normalized') summary.normalized++;
    else if (entry.status === 'basename-match') summary.basenameMatch++;
    else if (entry.status === 'note') summary.note++;
    else summary.missing++;
    if (entry.internal) summary.internal++;
    else summary.public++;
  }
  return summary;
}

function auditDealerSourceLeaks(articles, auditIssues) {
  for (const article of articles) {
    if (article.visibility !== 'standard') continue;
    // Wenn die Seite bewusst auf internal_only steht, ist der "Leak" keiner
    // mehr — der Konflikt wurde redaktionell aufgelöst. Der schärfere Check
    // `dealer-approved-internal-source` bleibt davon unberührt.
    if (article.dealerStatus === 'internal_only') continue;
    const leakingSources = (article.sourceMeta || []).filter((source) => source.internal).map((source) => source.source);
    if (leakingSources.length === 0) continue;
    auditIssues.push({
      type: 'dealer-internal-source',
      file: article.path,
      route: article.route,
      sources: leakingSources.slice(0, 12),
      count: leakingSources.length,
    });
  }
}

function auditCoverageConfidence(articles, auditIssues) {
  for (const article of articles) {
    if (article.isIndex) continue;
    if (article.confidence === 'high' && article.coverage === 'source_missing') {
      auditIssues.push({
        type: 'confidence-coverage-mismatch',
        file: article.path,
        route: article.route,
        confidence: article.confidence,
        coverage: article.coverage,
      });
    }
    if (article.coverage === 'complete' && (!article.sources || article.sources.length === 0)) {
      auditIssues.push({
        type: 'coverage-without-sources',
        file: article.path,
        route: article.route,
        coverage: article.coverage,
      });
    }
  }
}

function auditDealerFlags(articles, auditIssues) {
  for (const article of articles) {
    if (article.visibility === 'internal' && article.dealerStatus === 'approved') {
      auditIssues.push({
        type: 'dealer-internal-conflict',
        file: article.path,
        route: article.route,
      });
    }
    if (article.dealerStatus === 'approved') {
      const internalSources = (article.sourceMeta || [])
        .filter((meta) => meta.internal)
        .map((meta) => meta.source);
      if (internalSources.length > 0) {
        auditIssues.push({
          type: 'dealer-approved-internal-source',
          file: article.path,
          route: article.route,
          sources: internalSources.slice(0, 12),
          count: internalSources.length,
        });
      }
    }
  }
}

function auditVehicleStructure(articles, auditIssues) {
  // Die Pflichtblock-Erkennung matcht DEUTSCHE Stichwörter (VEHICLE_REQUIRED_BLOCKS)
  // gegen die Artikel-Überschriften. Bei Übersetzungen sind die Überschriften übersetzt
  // (z. B. „Monteringsplats" statt „Montageort", „Kabelanslutning" statt „Kabelanschluss")
  // → die deutschen Keywords greifen nicht und ein korrekt übersetzter Abschnitt würde
  // fälschlich als „fehlend" gemeldet. Da Übersetzungen die DE-Struktur 1:1 spiegeln, wird
  // die Lücke EINMAL am kanonischen DE-Artikel bestimmt und für die Übersetzungen übernommen
  // (echte Content-Lücke statt Sprach-Artefakt). Fehlt ein DE-Pendant, wird konservativ direkt geprüft.
  // Sprach-agnostischer Schlüssel: 'wiki/<lang>/<rest>' -> '<rest>' (wie relativeWikiPath im Link-Resolver).
  const relPath = (p) => String(p).split('/').slice(2).join('/');
  const headingCount = (a) => (a.headings || []).filter((h) => h.level <= 3).length;
  const canonicalByRelPath = new Map();
  for (const article of articles) {
    if (article.articleType !== 'vehicle' || article.isIndex) continue;
    if (article.lang !== CANONICAL_LANG) continue;
    canonicalByRelPath.set(relPath(article.path), {
      missing: findMissingVehicleBlocks(article.headings),
      headings: headingCount(article),
    });
  }
  for (const article of articles) {
    if (article.articleType !== 'vehicle' || article.isIndex) continue;
    const canonical = article.lang === CANONICAL_LANG ? null : canonicalByRelPath.get(relPath(article.path));
    const missing = article.lang === CANONICAL_LANG
      ? findMissingVehicleBlocks(article.headings)
      : (canonical ? canonical.missing : findMissingVehicleBlocks(article.headings));
    for (const blockClass of missing) {
      auditIssues.push({
        type: 'missing-required-section',
        file: article.path,
        route: article.route,
        articleType: article.articleType,
        blockClass,
      });
    }
    // Übersetzung strukturell HINTER dem DE-Kanon: der DE-Artikel hat mehr Abschnitte
    // (Überschriften) als die Übersetzung → im DE wurden Abschnitte ergänzt, die noch
    // nicht übersetzt sind. Ehrliches Gegenstück zur DE-Spiegelung oben, damit gefüllte
    // DE-Lücken nicht fälschlich auch die Übersetzungen als „komplett" erscheinen lassen.
    if (canonical && headingCount(article) < canonical.headings) {
      auditIssues.push({
        type: 'translation-behind-source',
        file: article.path,
        route: article.route,
        de_abschnitte: canonical.headings,
        uebersetzt_abschnitte: headingCount(article),
      });
    }
    if ((article.wordCount || 0) < 250) {
      auditIssues.push({
        type: 'vehicle-thin-content',
        file: article.path,
        route: article.route,
        wordCount: article.wordCount || 0,
      });
    }
  }
}

function normalizeProductAssetName(filename) {
  return String(filename || '')
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[„“"'.()]/g, ' ')
    .replace(/&/g, ' und ')
    .replace(/\b868\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function productAssetSlugCandidates(asset) {
  const base = normalizeProductAssetName(asset.filename);
  const explicit = {
    'backup-sirene': ['sirenen-hupen'],
    'back-up-sirene': ['sirenen-hupen'],
    'zusatzhupe': ['sirenen-hupen'],
    'zusatzsirene': ['sirenen-hupen'],
    'gps-pro': ['pro-finder'],
    'montageadapter': ['funk-magnetkontakt', 'funk-rauchmelder'],
    'montageadapter-fur-t-s-a': ['funk-rauchmelder'],
    'funk-magnetkontakt-wasserdicht': ['funk-magnetkontakt'],
    'funk-magnetkontakt': ['funk-magnetkontakt'],
    'camp-lock-fingerprint': ['camplock-fingerprint'],
    'camplock-fingerprint': ['camplock-fingerprint'],
    'key-card': ['keycard'],
    'keycard': ['keycard'],
    'key-tag': ['keytag'],
    'keytag': ['keytag'],
    'key-strap': ['keystrap'],
    'keystrap': ['keystrap'],
    'nfc-modul': ['nfc-modul'],
    'zusatzsensor-fur-g-a-s-pro': ['gas-pro'],
    'zusatzsensor-fur-g-a-s-pro-iii': ['zusatzsensor-gas-pro-iii'],
    'wipro-iii-safelock': ['wipro-iii'],
    't-s-a-funk-rauchmelder': ['funk-rauchmelder'],
    'co-sensor-fur-g-a-s-pro-und-g-a-s-pro-iii': ['co-sensor'],
    'app': ['app-befehle'],
    'abschalteinrichtungen-ein-und-mehrpolig': ['abschalteinrichtung'],
    'safe-lock-umrustplatine': ['safe-lock-umruestplatine'],
    'profinder': ['pro-finder'],
    'g-a-s': ['gas-pro'],
    'g-a-s-pro': ['gas-pro'],
    'g-a-s-plug-all-in-one': ['gas-plug'],
    'g-a-s-connect': ['gas-connect'],
    'externe-gsm-antenne-2g-3g-4g': ['pro-finder'],
  };
  return explicit[base] || [base];
}

function auditProductImageCoverage(articles, assets, auditIssues) {
  const deSlugs = new Set(
    articles
      .filter((article) => article.lang === CANONICAL_LANG && !article.isIndex)
      .map((article) => article.slug),
  );
  const primaryImages = new Set(
    Object.values(assetOverrides)
      .map((entry) => normalizeRepoPath(entry?.primaryImage || ''))
      .filter(Boolean),
  );
  const relatedImages = new Set(
    Object.values(assetOverrides)
      .flatMap((entry) => (Array.isArray(entry?.relatedAssets) ? entry.relatedAssets : []))
      .map(normalizeRepoPath)
      .filter(Boolean),
  );

  for (const asset of assets) {
    if (asset.category !== 'Produkte' || asset.type !== 'image') continue;
    const expectedSlugs = productAssetSlugCandidates(asset);
    const hasArticle = expectedSlugs.some((slug) => deSlugs.has(slug));
    const usedAsAsset = primaryImages.has(asset.relativePath) || relatedImages.has(asset.relativePath);
    if (!hasArticle) {
      auditIssues.push({
        type: 'product-image-without-article',
        asset: asset.relativePath,
        expectedSlugs,
      });
    } else if (!usedAsAsset) {
      auditIssues.push({
        type: 'product-image-without-asset-override',
        asset: asset.relativePath,
        expectedSlugs,
      });
    }
  }
}

function auditTranslationResidue(articles, auditIssues) {
  const patterns = [
    /\b(Die|Der|Das) safe\.lock Umrüstplatine\b/,
    /\bEinbau-Schritte\b/,
    /\bSchlüsselgehäuse\b/,
    /\bZentralverriegelung\b/,
    /\bOffene High-Value-Quellen\b/,
    /\bPrimaerquellen\b/,
    /\bErgaenzende Quellen\b/,
  ];
  for (const article of articles) {
    if (article.lang === CANONICAL_LANG) continue;
    // Die Terminologieseiten zeigen in ihrer ersten Tabellenspalte bewusst den
    // deutschen Ausgangsbegriff (z. B. „Zentralverriegelung“) neben der
    // freigegebenen Zielübersetzung. Das ist kein sichtbarer Übersetzungsrest.
    if (article.slug === 'terminologie-und-schreibweisen') continue;
    // Übersetzungs-ausgenommene Seiten (interne Redaktionswerkzeuge, s. TRANSLATION_EXEMPT_PATHS)
    // sind bewusst deutsch → nicht auf deutschen Resttext prüfen. Abgleich über den DE-Kanon-Pfad.
    if (TRANSLATION_EXEMPT_PATHS.has('wiki/de/' + article.path.split('/').slice(2).join('/'))) continue;
    const body = article.markdownContent || '';
    const hits = [];
    const lines = body.split('\n');
    for (const [idx, line] of lines.entries()) {
      if (patterns.some((pattern) => pattern.test(line))) hits.push({ line: idx + 1, text: line.slice(0, 180) });
      if (hits.length >= 5) break;
    }
    if (hits.length === 0) continue;
    auditIssues.push({ type: 'translation-german-residue', file: article.path, route: article.route, hits });
  }
}

function normalizeRoute(relativePath) {
  let route = relativePath
    .replace(/^wiki\//, '/')
    .replace(/\/_index\.md$/, '')
    .replace(/\.md$/, '');
  route = route.replace(/Tech\.\s*Doku/gi, 'tech-doku');
  if (route === '/' || route === '') route = '/';
  return route;
}

function deriveMetadata(relativePath) {
  const parts = relativePath.replace(/^wiki\//, '').split('/');
  const lang = parts[0];
  const filename = parts[parts.length - 1];
  const slug = filename.replace(/\.md$/, '');
  const isIndex = slug === '_index';
  let section = 'root';
  if (parts.length > 2) {
    section = parts[1].toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
    if (section === 'tech-doku' || section === 'tech doku') section = 'tech-doku';
  }
  const visibility = parts.some((p) => p.toLowerCase() === 'intern') || INTERNAL_SLUGS.has(slug) ? 'internal' : 'standard';
  const route = normalizeRoute(relativePath);
  return { lang, section, slug, route, visibility, isIndex };
}

function isLanguageMarkdown(relativePath) {
  const parts = relativePath.replace(/\\/g, '/').split('/');
  return parts[0] === 'wiki' && LANGUAGE_SET.has(parts[1]) && parts[parts.length - 1].endsWith('.md');
}

function extractHeadings(markdown) {
  const headings = [];
  // Anker-IDs MÜSSEN exakt denen entsprechen, die rehypeSlug ins gerenderte HTML
  // schreibt — sonst zeigen TOC-Sprünge und Thi-Deep-Links auf nicht existierende
  // #anker (über 837 Artikel verifiziert: github-slugger == rehypeSlug, 0 Abweichung).
  // Die frühere selbstgebaute Slugifizierung wich bei Satzzeichen ab (z. B.
  // „… — …" → ein vs. zwei Bindestriche) und ließ solche Sprünge ins Leere laufen.
  // Eine FRISCHE Slugger-Instanz pro Datei in Dokumentreihenfolge repliziert
  // rehypeSlug exakt (inkl. -1/-2-Deduplizierung bei doppelten Überschriften).
  const slugger = new GithubSlugger();
  // CRLF-toleranter Split — sonst frisst der nachfolgende `.` in der Regex
  // das \r nicht (JS-`.` matcht keine Line-Terminator) und `(.+)$` matched
  // nicht. Vorher waren ALLE Headings in CRLF-Dateien unsichtbar.
  const lines = markdown.split(/\r?\n/);
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      headings.push({ level, text, id: slugger.slug(text) });
    }
  }
  return headings;
}

// ─── Abschnitts-Chunking (THI Abschnitts-Zitate) ────────────────────────────
// Zerlegt einen Artikel an H2/H3-Grenzen in Abschnitte, damit Thi nicht nur den
// ganzen Artikel, sondern die JEWEILIGE STELLE zitieren und verlinken kann
// (route#anker). Jeder Abschnitt trägt seinen Anker (= heading.id, identisch zum
// HTML), den Überschriften-Pfad (z. B. „Montage › Variante 2") und seinen
// Klartext. Inhalt VOR der ersten H2/H3 wird als „intro"-Abschnitt geführt
// (Anker = H1-Anker bzw. leer → Artikelanfang). Die `headings` werden bewusst
// hereingereicht, damit die Anker exakt dieselben Slugger-IDs sind wie in
// extractHeadings/HTML (keine zweite, abweichende Slugifizierung).
function buildSections(markdown, headings) {
  const lines = markdown.split(/\r?\n/);
  const sections = [];
  let hIdx = 0; // Zeiger in headings[] — Überschriften erscheinen in Zeilenreihenfolge
  let current = null; // aktueller Abschnitt-Akkumulator
  let currentH2 = null; // letzte H2 für den headingPath von H3-Abschnitten
  let introLines = [];
  let inCodeBlock = false;

  const flush = () => {
    if (current) {
      current.text = extractPlainText(current._md.join('\n')).trim();
      delete current._md;
      sections.push(current);
      current = null;
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      (current ? current._md : introLines).push(line);
      continue;
    }
    const match = !inCodeBlock && line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const heading = headings[hIdx] || { level, text: match[2].trim(), id: '' };
      hIdx += 1;
      if (level === 2 || level === 3) {
        flush();
        if (level === 2) currentH2 = heading.text;
        const headingPath = level === 3 && currentH2 ? `${currentH2} › ${heading.text}` : heading.text;
        current = { anchor: heading.id, heading: heading.text, level, headingPath, _md: [] };
        continue;
      }
      // H1/H4–H6: Überschriftentext gehört zum laufenden Abschnitt (bzw. Intro).
      (current ? current._md : introLines).push(match[2].trim());
      continue;
    }
    (current ? current._md : introLines).push(line);
  }
  flush();

  const introText = extractPlainText(introLines.join('\n')).trim();
  if (introText.length >= 40) {
    // Intro = Artikelanfang. BEWUSST ohne Anker: die Artikel-Ansicht entfernt die
    // H1, wenn sie dem (separat gerenderten) Titel entspricht — ein H1-Anker liefe
    // dann ins Leere. Anker '' → der Quell-Link zeigt auf den Artikelanfang. Der
    // H1-Text bleibt als `heading` für das Scoring erhalten (headingPath leer, damit
    // im Chip kein irreführendes Abschnitts-Label steht).
    const h1 = headings.find((h) => h.level === 1);
    sections.unshift({
      anchor: '',
      heading: h1 ? h1.text : '',
      level: 1,
      headingPath: '',
      text: introText,
    });
  }
  return sections;
}

function extractPlainText(markdown) {
  // WICHTIG: Das Frontmatter ist hier bereits via gray-matter entfernt
  // (parsed.content). Eine zusätzliche /^---…---/-Ersetzung würde fälschlich den
  // Inhalt ZWISCHEN den ersten beiden `---`-Trennlinien (horizontale Regeln, als
  // Abschnittstrenner genutzt) löschen — so verschwanden ganze Abschnitte inkl.
  // `> **WICHTIG:**`-Hinweise aus Suche UND Thi-RAG. Daher NICHT wieder einfügen.
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, target, label) => label || target)
    .replace(/[#*_~`>|]/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function splitTitleVariants(title) {
  if (!title) return [];
  const variants = new Set([title]);
  for (const separator of [' — ', ' - ', ' – ', ' | ']) {
    if (title.includes(separator)) variants.add(title.split(separator)[0].trim());
  }
  return [...variants].filter(Boolean);
}

function normalizeLookup(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/\.md$/i, '')
    .replace(/#/g, ' ')
    .replace(/\+/g, ' plus ')
    .replace(/&/g, ' und ')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/Ä/g, 'ae')
    .replace(/Ö/g, 'oe')
    .replace(/Ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeRouteTarget(value) {
  const normalized = normalizeLookup(value);
  if (!normalized) return '';
  return normalized.replace(/\s+/g, '-');
}

function buildWikiLinkResolver(articles) {
  const byLang = new Map();
  const byLangRoute = new Map();

  function ensureLang(lang) {
    if (!byLang.has(lang)) byLang.set(lang, new Map());
    if (!byLangRoute.has(lang)) byLangRoute.set(lang, new Map());
  }

  function add(lang, key, route) {
    const normalized = normalizeLookup(key);
    if (!normalized) return;
    ensureLang(lang);
    const langMap = byLang.get(lang);
    if (!langMap.has(normalized)) langMap.set(normalized, route);
  }

  function addSlugAlias(slug, aliases) {
    for (const lang of LANGUAGES) {
      const article = articles.find((a) => a.lang === lang && a.slug === slug);
      if (!article) continue;
      for (const alias of aliases) add(lang, alias, article.route);
    }
  }

  for (const article of articles) {
    ensureLang(article.lang);
    byLangRoute.get(article.lang).set(article.slug, article.route);
    add(article.lang, article.slug, article.route);
    add(article.lang, article.slug.replace(/-/g, ' '), article.route);
    for (const variant of splitTitleVariants(article.title)) add(article.lang, variant, article.route);
    const firstHeading = article.headings?.find((h) => h.level === 1);
    if (firstHeading) for (const variant of splitTitleVariants(firstHeading.text)) add(article.lang, variant, article.route);
  }

  for (const group of navigationBlueprint.groups || []) {
    for (const item of group.items || []) {
      if (!item.path) continue;
      const targetSlug = path.basename(item.path, '.md');
      addSlugAlias(targetSlug, [item.label]);
    }
  }

  for (const entry of linkDictionary) {
    for (const lang of LANGUAGES) {
      const route = entry.target.replace('{lang}', lang);
      for (const term of entry.terms || []) add(lang, term, route);
    }
  }

  const manualAliases = {
    'zugang-bedienung': ['Zugangsmedien & Bedienung', 'Zugangsmedien und Bedienung', 'Zugang & Bedienung', 'Zugang und Bedienung'],
    'sirenen-hupen': ['Sirenen und Hupen', 'Sirenen & Hupen', 'Sirenen/Hupen'],
    'systemueberblick': ['Systemüberblick', 'Systemueberblick', 'System overview'],
    'fahrzeugkompatibilitaet': ['Fahrzeugkompatibilität', 'Fahrzeugkompatibilitaet'],
    'stoerungsbeseitigung': ['Störungsbeseitigung', 'Stoerungsbeseitigung', 'Fehlersuche', 'Troubleshooting'],
    'mobilfunk-sim': ['Mobilfunk & SIM-Karten', 'Mobilfunk und SIM-Karten'],
    'seriennummern-softwarestaende': ['Seriennummern & Softwarestaende', 'Seriennummern & Softwarestände'],
    'artikelnummern': ['Artikelnummern-Register', 'Artikelnummern'],
    'app-befehle': ['App-Befehle', 'THITRONIK App & Befehle'],
    'nfc-modul': ['NFC-Modul', 'NFC Modul'],
    'vernetzungsmodul': ['Bluetooth-Vernetzungsmodul', 'Vernetzungsmodul'],
    'safe-lock-umruestplatine': ['safe.lock Umrüstplatine', 'safe.lock Umruestplatine'],
    'funk-handsender': ['Funk-Handsender 868', 'Funk-Handsender'],
    'funk-magnetkontakt': ['Funk-Magnetkontakt 868', 'Funk-Magnetkontakt'],
    'funk-kabelschleife': ['Funk-Kabelschleife 868', 'Funk-Kabelschleife'],
    'funk-rauchmelder': ['Funk-Rauchmelder T.S.A.', 'T.S.A. Funk-Rauchmelder', 'Funk-Rauchmelder'],
    'funk-wassermelder': ['Funk-Wassermelder 868', 'Funk-Wassermelder'],
    'gas': ['G.A.S.', 'GAS'],
    'gas-pro': ['G.A.S.-pro', 'GAS-pro'],
    'gas-pro-iii': ['G.A.S.-pro III', 'GAS-pro III'],
    'gas-connect': ['G.A.S.-connect', 'GAS-connect'],
    'gas-plug': ['G.A.S.-plug', 'GAS-plug'],
    'co-sensor': ['CO-Sensor', 'CO Sensor'],
    'abschalteinrichtung': ['Abschalteinrichtung', 'Kill-Funktion'],
    'tech-doku/uebersicht': ['Tech. Doku — Übersicht', 'Tech. Doku - Übersicht'],
    'tech-doku/normen-und-richtlinien': ['Normen, Richtlinien & Zulassungen', 'Normen & Richtlinien'],
    'tech-doku/funkstandards-und-schnittstellen': ['Funkstandards & Schnittstellen', 'Funkstandards und Schnittstellen'],
  };

  for (const [target, aliases] of Object.entries(manualAliases)) {
    const slug = target.split('/').pop();
    for (const lang of LANGUAGES) {
      const route = `/${lang}/${target}`;
      const exists = articles.some((a) => a.route === route || (a.lang === lang && a.slug === slug));
      if (!exists) continue;
      for (const alias of aliases) add(lang, alias, route);
    }
  }

  function resolve(rawTarget, lang) {
    const target = String(rawTarget || '').split('#')[0].trim();
    const anchor = rawTarget.includes('#') ? `#${rawTarget.split('#').slice(1).join('#')}` : '';
    const key = normalizeLookup(target);
    if (!key) return null;

    const langMap = byLang.get(lang);
    if (langMap?.has(key)) return `${langMap.get(key)}${anchor}`;

    const directSlug = normalizeRouteTarget(target);
    const directRoute = `/${lang}/${directSlug}`;
    if (articles.some((a) => a.route === directRoute)) return `${directRoute}${anchor}`;

    const deMap = byLang.get(CANONICAL_LANG);
    if (deMap?.has(key)) return `${deMap.get(key)}${anchor}`;

    const keyTokens = new Set(key.split(' ').filter((t) => t.length > 2));
    if (keyTokens.size < 2) return null;

    let best = null;
    for (const article of articles.filter((a) => a.lang === lang)) {
      const candidates = [
        normalizeLookup(article.title),
        normalizeLookup(article.slug),
        normalizeLookup(article.slug.replace(/-/g, ' ')),
        ...splitTitleVariants(article.title).map(normalizeLookup),
      ];
      for (const candidate of candidates) {
        if (!candidate) continue;
        if (candidate.includes(key) || key.includes(candidate)) {
          const score = Math.min(key.length, candidate.length) / Math.max(key.length, candidate.length);
          if (score > 0.35 && (!best || score > best.score)) best = { route: article.route, score };
        }
        const candidateTokens = new Set(candidate.split(' ').filter((t) => t.length > 2));
        const overlap = [...keyTokens].filter((t) => candidateTokens.has(t)).length;
        const score = overlap / keyTokens.size;
        if (score >= 0.75 && (!best || score > best.score)) best = { route: article.route, score };
      }
    }
    return best ? `${best.route}${anchor}` : null;
  }

  function relativeWikiPath(articlePath) {
    const parts = articlePath.split('/');
    return parts.slice(2).join('/');
  }

  function extractWikiTargets(markdown) {
    const targets = [];
    let inCodeBlock = false;
    for (const line of String(markdown || '').split('\n')) {
      if (line.trim().startsWith('```')) { inCodeBlock = !inCodeBlock; continue; }
      if (inCodeBlock) continue;
      for (const match of line.matchAll(/\[\[([^\]]+)\]\]/g)) targets.push(match[1].split('|')[0].trim());
    }
    return targets;
  }

  function addCrossLanguageAliasesFromCanonical() {
    const canonicalByRelPath = new Map(
      articles.filter((a) => a.lang === CANONICAL_LANG).map((a) => [relativeWikiPath(a.path), a]),
    );
    for (const article of articles) {
      if (article.lang === CANONICAL_LANG) continue;
      const canonical = canonicalByRelPath.get(relativeWikiPath(article.path));
      if (!canonical) continue;
      const canonicalTargets = extractWikiTargets(canonical.markdownContent);
      const translatedTargets = extractWikiTargets(article.markdownContent);
      const count = Math.min(canonicalTargets.length, translatedTargets.length);
      for (let i = 0; i < count; i++) {
        const canonicalRoute = resolve(canonicalTargets[i], CANONICAL_LANG);
        if (!canonicalRoute) continue;
        const localizedRoute = canonicalRoute.replace(/^\/de(?=\/|$)/, `/${article.lang}`);
        const routeExists = articles.some((a) => a.route === localizedRoute.split('#')[0]);
        add(article.lang, translatedTargets[i], routeExists ? localizedRoute : canonicalRoute);
      }
    }
  }

  addCrossLanguageAliasesFromCanonical();
  return { resolve };
}

function preprocessWikiLinks(markdown, article, resolver, auditIssues) {
  const lines = markdown.split('\n');
  let inCodeBlock = false;
  return lines
    .map((line, index) => {
      if (line.trim().startsWith('```')) { inCodeBlock = !inCodeBlock; return line; }
      if (inCodeBlock) return line;
      return line.replace(/\[\[([^\]]+)\]\]/g, (match, raw) => {
        const [rawTarget, rawLabel] = raw.split('|');
        const target = rawTarget.trim();
        const label = (rawLabel || rawTarget).trim();
        const resolved = resolver.resolve(target, article.lang);
        if (!resolved) {
          auditIssues.push({ type: 'broken-wikilink', file: article.path, line: index + 1, target });
          return label;
        }
        return `[${label}](${resolved})`;
      });
    })
    .join('\n');
}

function applyAutolinks(html, currentRoute, lang) {
  const sortedEntries = [...linkDictionary].sort((a, b) => {
    const maxA = Math.max(...a.terms.map((t) => t.length));
    const maxB = Math.max(...b.terms.map((t) => t.length));
    return maxB - maxA;
  });
  const linkedTerms = new Set();
  for (const entry of sortedEntries) {
    const target = entry.target.replace('{lang}', lang);
    const anchor = entry.anchor ? `#${entry.anchor}` : '';
    const fullTarget = `${target}${anchor}`;
    if (target === currentRoute) continue;
    for (const term of entry.terms) {
      if (linkedTerms.has(term.toLowerCase())) continue;
      const regex = new RegExp(
        `(?<!<[^>]*)(?<!<a[^>]*>[^<]*)\\b(${escapeRegex(term)})\\b(?![^<]*<\\/a>)(?![^<]*<\\/code>)`,
        'i',
      );
      if (regex.test(html)) {
        html = html.replace(regex, (match, captured) => `<a href="${fullTarget}" class="autolink" data-type="${entry.type || 'article'}">${captured}</a>`);
        linkedTerms.add(term.toLowerCase());
      }
    }
  }
  return html;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchAssets(relativePath, slug, section, allAssets) {
  const overrideKey = relativePath;
  if (assetOverrides[overrideKey]) return assetOverrides[overrideKey];
  // Bilder sind sprachunabhängig: übersetzte Artikel (wiki/<lang>/…) erben den
  // de-Override, sonst verschwindet das Artikelbild beim Sprachwechsel.
  const deKey = relativePath.replace(/^wiki\/[a-z]{2}\//, 'wiki/de/');
  if (deKey !== overrideKey && assetOverrides[deKey]) return assetOverrides[deKey];

  let primaryImage = null;
  const relatedAssets = [];
  const slugNorm = slug.toLowerCase();

  for (const asset of allAssets) {
    const fnNorm = asset.filename.toLowerCase().replace(/\.[^.]+$/, '');
    if (asset.category === 'Produkte' && (fnNorm.includes(slugNorm) || slugNorm.includes(fnNorm.replace(/[\s.-]+/g, '-')))) {
      if (!primaryImage && /\.(png|jpg|jpeg|webp|avif)$/i.test(asset.filename)) primaryImage = asset.relativePath;
      else relatedAssets.push(asset.relativePath);
    }
  }
  if (section === 'fahrzeuge') {
    for (const asset of allAssets) {
      if (asset.category !== 'Fahrzeuge') continue;
      const vehicleName = asset.filename.toLowerCase().replace(/\.[^.]+$/, '').replace(/\s+/g, '-');
      if (slugNorm.includes(vehicleName.split('-')[0]) || vehicleName.includes(slugNorm.split('-')[0])) {
        if (!primaryImage) primaryImage = asset.relativePath;
        break;
      }
    }
  }
  return { primaryImage, relatedAssets };
}

function computeRelatedLinks(article, allArticles) {
  const scores = [];
  for (const candidate of allArticles) {
    if (candidate.route === article.route) continue;
    if (candidate.lang !== article.lang) continue;
    if (article.visibility !== 'internal' && candidate.visibility === 'internal') continue;
    let score = 0;
    if (candidate.section === article.section && article.section !== 'root') score += 1;
    const articleTerms = new Set((article.plainText || '').toLowerCase().split(/\s+/).filter((w) => w.length > 4));
    const candidateTerms = new Set((candidate.plainText || '').toLowerCase().split(/\s+/).filter((w) => w.length > 4));
    let shared = 0;
    for (const t of articleTerms) if (candidateTerms.has(t)) shared++;
    if (shared > 20) score += 3;
    else if (shared > 10) score += 2;
    else if (shared > 5) score += 1;
    const productNames = ['wipro', 'pro-finder', 'profinder', 'g.a.s', 'gas-pro', 'bt-connect', 'nfc', 'safe.lock', 'safelock'];
    for (const pn of productNames) {
      if (article.title?.toLowerCase().includes(pn) && candidate.title?.toLowerCase().includes(pn)) { score += 5; break; }
    }
    const vehicleNames = ['fiat', 'ford', 'mercedes', 'vw', 'iveco', 'renault', 'man', 'opel', 'toyota'];
    for (const vn of vehicleNames) {
      if (article.slug.includes(vn) && candidate.slug.includes(vn)) { score += 5; break; }
    }
    if (article.sources && candidate.sources) {
      const sharedSources = article.sources.filter((s) => candidate.sources.includes(s));
      score += sharedSources.length * 2;
    }
    if (score > 0) scores.push({ route: candidate.route, title: candidate.title, score, section: candidate.section, slug: candidate.slug });
  }
  return scores.sort((a, b) => b.score - a.score).slice(0, 6);
}

// Sicherheits-Schema: erlaubt normale Inhalts-Tags + className/id, entfernt aber
// <script>/<iframe>/Event-Handler/gefährliche Protokolle (Stored-XSS-Schutz). Die Klassen
// autolink/callout/table-wrapper werden erst NACH dem Stringify per Regex ergänzt und sind
// von dieser Sanitisierung daher nicht betroffen.
const sanitizeSchema = {
  ...defaultSchema,
  clobberPrefix: '',
  tagNames: [...new Set([
    ...(defaultSchema.tagNames || []),
    'span', 'figure', 'figcaption', 'details', 'summary', 'section', 'mark', 'abbr',
  ])],
  attributes: {
    ...defaultSchema.attributes,
    '*': [...new Set([...((defaultSchema.attributes && defaultSchema.attributes['*']) || []), 'className', 'id', 'title'])],
    a: [...new Set([...((defaultSchema.attributes && defaultSchema.attributes.a) || []), 'href', 'name', 'target', 'rel'])],
    img: [...new Set([...((defaultSchema.attributes && defaultSchema.attributes.img) || []), 'src', 'alt', 'title', 'width', 'height', 'loading'])],
    input: [...new Set([...((defaultSchema.attributes && defaultSchema.attributes.input) || []), 'type', 'checked', 'disabled'])],
  },
};

// rehypeRaw parst rohes HTML aus dem Markdown in echte Knoten; danach entfernt rehypeSanitize
// gefährliche Inhalte. rehypeSlug läuft DANACH, damit Heading-IDs sauber (ohne clobber-Prefix)
// für TOC/Anker erhalten bleiben.
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSanitize, sanitizeSchema)
  .use(rehypeSlug)
  .use(rehypeStringify, { allowDangerousHtml: true });

async function renderMarkdown(body) {
  const result = await processor.process(body);
  return String(result);
}

function postProcessHtml(html) {
  html = html.replace(/<table/g, '<div class="table-wrapper"><table');
  html = html.replace(/<\/table>/g, '</table></div>');
  html = html.replace(
    /<blockquote>\s*<p>\s*<strong>(HINWEIS|WICHTIG|TIPP|ACHTUNG|NOTE|IMPORTANT|WARNING|TIP|CAUTION)[:.]?\s*<\/strong>/gi,
    (match, type) => {
      const typeMap = {
        HINWEIS: 'note', NOTE: 'note', WICHTIG: 'warning', IMPORTANT: 'warning', WARNING: 'warning',
        TIPP: 'tip', TIP: 'tip', ACHTUNG: 'caution', CAUTION: 'caution',
      };
      const cls = typeMap[type.toUpperCase()] || 'note';
      return `<blockquote class="callout callout-${cls}"><p><strong>${type}:</strong>`;
    },
  );
  return html;
}

function hrefToRoute(href, lang) {
  const raw = String(href || '').split('#')[0].trim();
  if (!raw || /^(https?:|mailto:|tel:)/i.test(raw) || raw.startsWith('#')) return null;
  if (raw.startsWith('/')) return raw.replace(/\/$/, '');
  const target = raw.replace(/^\.\//, '').replace(/\.md$/i, '').replace(/Tech\.\s*Doku/gi, 'tech-doku');
  return `/${lang}/${target}`.replace(/\/$/, '');
}

// „Service & Intern“-H2-Blöcke: EIN Anker-Set für alle Sprachen (Befund
// 2026-07-22: die frühere hartcodierte Dreier-Liste deckte nur de/nl ab —
// en/fr/es/it/da/sv/no/pl/cs-Blöcke blieben im Händler-HTML stehen).
const INTERNAL_H2_RE = new RegExp(
  `<h2[^>]*id="(?:${[...INTERNAL_SECTION_ANCHORS].map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})"[^>]*>[\\s\\S]*?(?=<hr>|<h2|$)`,
  'gi',
);

function blockHasInternalLink(block, lang, internalRoutes) {
  for (const m of block.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const route = hrefToRoute(m[1], lang);
    if (route && internalRoutes.has(route)) return true;
  }
  return false;
}

function buildDealerHtml(html, article, internalRoutes) {
  if (article.visibility !== 'standard') return '';
  let output = html;
  output = output.replace(INTERNAL_H2_RE, '');
  // Block-Elemente (<li>, <p>), die auf eine INTERNE Route verlinken, komplett
  // entfernen. Sonst leakt der Link-TEXT (= Titel des internen Artikels) samt
  // Verweis-Satz in Händler-HTML, -Suchindex UND Thi — genau der Fließtext-Fall
  // „→ Für eine saubere Erstaufnahme vor Eskalation: Support-Fallaufnahme“, den
  // die frühere reine <li>-Regel übersah (Finding P1 Runde 2, 2026-07-22).
  for (const tag of ['li', 'p']) {
    const re = new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi');
    output = output.replace(re, (block) => (blockHasInternalLink(block, article.lang, internalRoutes) ? '' : block));
  }
  // Fallback für verbleibende Inline-Links auf interne Routen (in gemischten
  // Absätzen): den ganzen <a>…</a> streichen (Tag inkl. Link-Text).
  output = output.replace(/<a\b[^>]*href="([^"]+)"[^>]*>[\s\S]*?<\/a>/gi, (match, href) => {
    const route = hrefToRoute(href, article.lang);
    return route && internalRoutes.has(route) ? '' : match;
  });
  return output;
}

const GLOSSARY_JSONL_PATH = path.join(REPO_ROOT, 'wiki/Glossar/01_final/thitronik-wortglossar-v2.rag.jsonl');
const GLOSSARY_REAL_TYPES = new Set([
  'canonical_term', 'glossary_entry', 'context_glossary', 'manual_term',
  'autolink_term', 'product', 'accessory', 'brand', 'technical',
]);

function buildGlossaryJson(publicDir) {
  if (!fs.existsSync(GLOSSARY_JSONL_PATH)) {
    console.log(`  ⚠️  ${GLOSSARY_JSONL_PATH} not found — skipping glossary`);
    return;
  }
  const raw = fs.readFileSync(GLOSSARY_JSONL_PATH, 'utf-8');
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const terms = [];
  let skipped = 0;
  for (const line of lines) {
    let o;
    try { o = JSON.parse(line); } catch { skipped++; continue; }
    if (!o.term_de) { skipped++; continue; }
    terms.push({
      id: o.id || null,
      term: o.term_de,
      aliases: Array.isArray(o.aliases_de) ? o.aliases_de : [],
      definition: o.definition_de || '',
      domain: o.domain || 'Allgemein',
      type: o.term_type || 'term',
      canonical: o.canonical_rule || 'preferred',
      qa: o.qa_priority || 'OK',
      role: o.term_role || '',
      protected: o.canonical_rule === 'keep',
      noteHint: o.forbidden_translation_hint || '',
      translations: o.translations || {},
      real: GLOSSARY_REAL_TYPES.has(o.term_type),
    });
  }
  terms.sort((a, b) => a.term.localeCompare(b.term, 'de', { sensitivity: 'base', numeric: true }));
  const typeCounts = {};
  const domainCounts = {};
  for (const t of terms) {
    typeCounts[t.type] = (typeCounts[t.type] || 0) + 1;
    domainCounts[t.domain] = (domainCounts[t.domain] || 0) + 1;
  }
  const out = {
    generatedAt: process.env.WIKI_GENERATED_AT || new Date().toISOString(),
    version: 'v2',
    source: 'wiki/Glossar/01_final/thitronik-wortglossar-v2.rag.jsonl',
    total: terms.length,
    realCount: terms.filter((t) => t.real).length,
    languages: LANGUAGES,
    canonicalLanguage: CANONICAL_LANG,
    typeCounts,
    domainCounts,
    terms,
  };
  fs.writeFileSync(path.join(publicDir, 'glossary.json'), JSON.stringify(out), 'utf-8');
  const sizeKb = Math.round(fs.statSync(path.join(publicDir, 'glossary.json')).size / 1024);
  console.log(`  ✅ glossary.json: ${terms.length} terms (${out.realCount} core), ${sizeKb} KB${skipped ? `, ${skipped} skipped` : ''}`);
}

function computeGeneratedAt(inputFiles) {
  if (process.env.WIKI_GENERATED_AT) return process.env.WIKI_GENERATED_AT;
  const candidates = [
    ...inputFiles.map((file) => path.join(REPO_ROOT, file)),
    path.join(PROJECT_DATA, 'asset-overrides.json'),
    path.join(PROJECT_DATA, 'link-dictionary.json'),
    path.join(PROJECT_DATA, 'navigation-blueprint.json'),
  ];
  let latest = 0;
  for (const file of candidates) {
    try {
      latest = Math.max(latest, fs.statSync(file).mtimeMs);
    } catch {
      /* ignore missing optional inputs */
    }
  }
  return new Date(latest || Date.now()).toISOString();
}

function safeRouteParts(route) {
  const relRoute = route.startsWith('/') ? route.slice(1) : route;
  return relRoute.split('/').map((seg) => seg.replace(/[^a-zA-Z0-9._-]/g, '_'));
}

function writeArticleBodyFiles(baseDir, articlesToWrite, articleBody) {
  if (fs.existsSync(baseDir)) fs.rmSync(baseDir, { recursive: true, force: true });
  fs.mkdirSync(baseDir, { recursive: true });
  let bytes = 0;
  for (const a of articlesToWrite) {
    const safeParts = safeRouteParts(a.route);
    const filePath = path.join(baseDir, ...safeParts.slice(0, -1), `${safeParts[safeParts.length - 1] || '_index'}.json`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const payload = JSON.stringify(articleBody(a));
    fs.writeFileSync(filePath, payload, 'utf-8');
    bytes += payload.length;
  }
  return bytes;
}

function writeWikiSources(baseDir, indexPath, articlesToWrite) {
  if (fs.existsSync(baseDir)) fs.rmSync(baseDir, { recursive: true, force: true });
  fs.mkdirSync(baseDir, { recursive: true });
  let sourceCount = 0;
  let sourceBytes = 0;
  const sourceIndex = [];
  for (const a of articlesToWrite) {
    const filePath = path.join(WIKI_ROOT, a.path.replace(/^wiki\//, ''));
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
      const payload = {
        route: a.route,
        frontmatter: {
          title: a.title,
          lang: a.lang,
          updated: a.updated || null,
          confidence: a.confidence || null,
          visibility: a.visibility || 'standard',
          sources: a.sources || [],
        },
        body: fmMatch ? fmMatch[2] : raw,
        path: a.path,
      };
      const safeParts = safeRouteParts(a.route);
      const outPath = path.join(baseDir, ...safeParts.slice(0, -1), `${safeParts[safeParts.length - 1] || '_index'}.json`);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      const json = JSON.stringify(payload);
      fs.writeFileSync(outPath, json, 'utf-8');
      sourceBytes += json.length;
      sourceCount++;
      sourceIndex.push({ route: a.route, lang: a.lang, slug: a.slug, path: a.path, title: a.title, visibility: a.visibility });
    } catch {
      /* file read error - skip silently */
    }
  }
  fs.writeFileSync(indexPath, JSON.stringify(sourceIndex), 'utf-8');
  return { sourceCount, sourceBytes, sourceIndex };
}

async function main() {
  console.log('🔧 Thitronik Wiki Ingest — Starting...');

  const allAssets = collectAssets();
  const repoFileIndex = collectRepoFileIndex();
  const sourceUsage = new Map();
  console.log(`📦 Found ${allAssets.length} assets`);

  const mdFiles = glob.sync('wiki/**/*.md', { cwd: REPO_ROOT })
    .map((f) => f.replace(/\\/g, '/'))
    .filter(isLanguageMarkdown);
  console.log(`📄 Found ${mdFiles.length} markdown files`);

  const articles = [];
  const auditIssues = [];

  for (const relPath of mdFiles) {
    const absPath = path.join(REPO_ROOT, relPath);
    const raw = fs.readFileSync(absPath, 'utf-8');
    let parsed;
    try { parsed = matter(raw); }
    catch (e) { auditIssues.push({ type: 'frontmatter-error', file: relPath, message: e.message }); continue; }

    const { lang, section, slug, route, visibility, isIndex } = deriveMetadata(relPath);
    const frontmatter = parsed.data || {};
    const sources = Array.isArray(frontmatter.sources) ? frontmatter.sources : [];
    const sourceMeta = sources.map((source) => resolveSourceReference(source, lang, repoFileIndex));

    if (!frontmatter.title && !isIndex) auditIssues.push({ type: 'missing-title', file: relPath });

    const headings = extractHeadings(parsed.content);
    const sections = buildSections(parsed.content, headings);
    const plainText = extractPlainText(parsed.content);
    const assetMatch = matchAssets(relPath, slug, section, allAssets);

    // Audit-Felder: explizit aus Frontmatter, sonst Default
    const articleTypeRaw = typeof frontmatter.articleType === 'string' ? frontmatter.articleType : null;
    const articleType = articleTypeRaw && ARTICLE_TYPE_VALUES.has(articleTypeRaw)
      ? articleTypeRaw
      : deriveArticleType({ section, slug, visibility, isIndex });
    const coverage = resolveCoverage(frontmatter.coverage, sources);
    const dealerStatus = resolveDealerStatus(frontmatter.dealerStatus, visibility);
    // Ob die Redaktion den Status EXPLIZIT gesetzt hat — Übersetzungen ohne
    // eigenen Status erben im Post-Pass unten vom DE-Artikel; das
    // dealer-status-missing-Issue entsteht ebenfalls erst dort.
    const dealerStatusExplicit = typeof frontmatter.dealerStatus === 'string';

    const article = {
      path: relPath,
      lang, section, slug, route, visibility, isIndex,
      title: frontmatter.title || slug,
      updated: frontmatter.updated || null,
      confidence: frontmatter.confidence || null,
      coverage,
      dealerStatus,
      dealerStatusExplicit,
      articleType,
      sources,
      sourceMeta,
      dealerSources: sourceMeta.filter((s) => s.public).map((s) => s.source),
      headings,
      sections,
      html: '',
      dealerHtml: '',
      markdownContent: parsed.content,
      plainText,
      wordCount: wordCount(plainText),
      primaryImage: assetMatch.primaryImage || null,
      relatedAssets: assetMatch.relatedAssets || [],
      relatedLinks: [],
    };
    articles.push(article);
    registerSourceUsage(sourceUsage, article, sourceMeta);
  }
  console.log(`✅ Parsed ${articles.length} articles`);

  // F7-Vererbung: Übersetzungen ohne EIGENEN dealerStatus erben die
  // Entscheidung des kanonischen DE-Artikels (gleiche section+slug) — so
  // verspricht es docs/DEALER_STATUS_KANDIDATEN.md. dealer-status-missing
  // feuert danach nur noch, wo auch der DE-Artikel keine Entscheidung trägt.
  const deDealerStatus = new Map();
  for (const a of articles) {
    if (a.lang === 'de' && a.dealerStatusExplicit) {
      deDealerStatus.set(`${a.section}|${a.slug}`, a.dealerStatus);
    }
  }
  for (const a of articles) {
    const inherited = a.lang !== 'de' && !a.dealerStatusExplicit
      ? deDealerStatus.get(`${a.section}|${a.slug}`)
      : undefined;
    if (inherited) a.dealerStatus = inherited;
    if (a.visibility === 'standard' && !a.isIndex && !a.dealerStatusExplicit && !inherited) {
      auditIssues.push({ type: 'dealer-status-missing', file: a.path, route: a.route });
    }
    delete a.dealerStatusExplicit;
  }

  auditTranslationResidue(articles, auditIssues);

  console.log('🔗 Resolving wiki links and rendering markdown...');
  const wikiLinkResolver = buildWikiLinkResolver(articles);
  for (const article of articles) {
    const linkedMarkdown = preprocessWikiLinks(article.markdownContent, article, wikiLinkResolver, auditIssues);
    let html = await renderMarkdown(linkedMarkdown);
    html = postProcessHtml(html);
    article.html = applyAutolinks(html, article.route, article.lang);
    delete article.markdownContent;
  }

  const internalRoutes = new Set(articles.filter((a) => a.visibility === 'internal').map((a) => a.route));
  for (const article of articles) {
    article.dealerHtml = buildDealerHtml(article.html, article, internalRoutes);
    // Finding P1 (2026-07-22): Standard-Artikel mit Intern-Anteil („Service &
    // Intern“-Abschnitte / Links auf interne Routen) brauchen für Suche & Thi
    // einen BEREINIGTEN Text. Der wird aus dealerHtml abgeleitet — per
    // Konstruktion identisch mit dem, was Händler auch im Artikel sehen.
    article.hasInternalContent = article.visibility === 'standard' && article.dealerHtml !== article.html;
    article.dealerPlainText = article.hasInternalContent ? htmlToPlainText(article.dealerHtml) : article.plainText;
  }
  const articlesWithInternalContent = articles.filter((a) => a.hasInternalContent).length;
  console.log(`🔒 ${articlesWithInternalContent} Standard-Artikel mit Intern-Anteil → Dealer-Suchfelder werden bereinigt`);

  console.log('🔗 Computing related links...');
  for (const article of articles) article.relatedLinks = computeRelatedLinks(article, articles);

  console.log('🌐 Checking translations...');
  const deArticles = articles.filter((a) => a.lang === CANONICAL_LANG && !a.isIndex);
  for (const deArt of deArticles) {
    if (TRANSLATION_EXEMPT_PATHS.has(deArt.path)) continue;
    for (const lang of LANGUAGES) {
      if (lang === CANONICAL_LANG) continue;
      const expectedRoute = deArt.route.replace(`/${CANONICAL_LANG}/`, `/${lang}/`).replace(`/${CANONICAL_LANG}`, `/${lang}`);
      const found = articles.find((a) => a.route === expectedRoute);
      if (!found) auditIssues.push({ type: 'missing-translation', file: deArt.path, lang, expectedRoute });
    }
  }

  auditSourceReferences(sourceUsage, auditIssues);
  auditDealerSourceLeaks(articles, auditIssues);
  auditCoverageConfidence(articles, auditIssues);
  auditDealerFlags(articles, auditIssues);
  auditVehicleStructure(articles, auditIssues);
  auditProductImageCoverage(articles, allAssets, auditIssues);

  console.log('🔍 Building search index...');

  const synonymKeywords = {};
  for (const entry of linkDictionary) {
    for (const lang of LANGUAGES) {
      const resolved = entry.target.replace('{lang}', lang);
      if (!synonymKeywords[resolved]) synonymKeywords[resolved] = new Set();
      for (const term of entry.terms) synonymKeywords[resolved].add(term);
    }
  }

  const CANONICAL_BOOST = {
    'wipro-iii': 'WiPro III WiPro Funk-Alarmsystem Panikalarm Panikfunktion Vent-check Belüftungsfunktion safe.lock Safelock Alarmanlage Wohnmobil',
    'pro-finder': 'Pro-Finder ProFinder GPS-Tracker Ortung Kill-Funktion Geofencing Abschalteinrichtung',
    'gas-pro-iii': 'G.A.S.-pro III GAS-pro Gaswarner Gassensor Gasdetektor',
    'bt-connect': 'BT-connect Bluetooth Vernetzungsmodul Smartphone-Steuerung',
    'safe-lock-umruestplatine': 'safe.lock Umrüstplatine Safelock Nachrüstung Schlüssel',
    'glossar': 'Glossar CAN-Bus Klemme 30 Klemme 15 Fachbegriffe DIP-Schalter Zentralverriegelung Magnetkontakt',
    'funk-handsender': 'Funk-Handsender Fernbedienung Scharfschalten Unscharfschalten',
    'abschalteinrichtung': 'Abschalteinrichtung Kill-Funktion Motorsperre Pro-Finder',
    'artikelnummern': 'Artikelnummern Artikelnummer Art.-Nr. Produktnummern Bestellnummer',
    'terminologie-und-schreibweisen': 'Terminologie Schreibweisen Fachbegriffe kanonisch',
    'faq-master': 'FAQ Fragen Antworten häufig gestellt',
    'nfc-modul': 'NFC NFC-Modul Zugangskontrolle Nahfeldkommunikation',
    'keycard': 'KeyCard NFC Karte Transponderkarte Zugang Zutritt NFC-Modul',
    'keytag': 'KeyTag NFC Anhaenger Tag Zugang Zutritt NFC-Modul',
    'keystrap': 'KeyStrap NFC Armband wasserdicht Zugang Zutritt NFC-Modul',
    'camplock-fingerprint': 'CampLock Fingerprint biometrischer Zugang Hartal Aufbautuer',
    'vanlock-fingerprint': 'VanLock Fingerprint biometrischer Zugang Reisemobil Kastenwagen',
    'gas-plug': 'G.A.S.-plug Gasplug Gaswarner mobil',
    'gas-connect': 'G.A.S.-connect Gasconnect Gasmelder',
    'sirenen-hupen': 'Sirene Sirenen Hupe Hupen Zusatzhupe Fahrzeughupe Zusatzsirene Back-up-Sirene Hupensignal Pin 9 Pin 15 Anschluss Steckerbelegung akustische Alarmmittel',
    'systemueberblick': 'Systemüberblick Produktwelt Thitronik Übersicht alle Produkte',
    'stoerungsbeseitigung': 'Störungsbeseitigung Fehler Probleme Diagnose Troubleshooting',
    'funkstandards-und-schnittstellen': 'CAN-Bus Funkstandards Schnittstellen technische Doku',
    'ford-transit-7g-facelift': 'Ford Transit 2019 2024 Facelift Fahrzeugwissen',
    'fiat-ducato-2022-2024': 'Fiat Ducato 2022 2024 Ducato 8 9 Fahrzeugwissen',
  };

  function extractKeywords(text, headings, route) {
    if (!text) return '';
    const parts = [];
    const domainTerms = [
      'CAN-Bus', 'Klemme 30', 'Klemme 15', 'Panikalarm', 'Vent-check',
      'Easy-Add', 'Geofencing', 'Kill-Funktion', 'safe.lock', 'WiPro',
      'Pro-Finder', 'G.A.S.', 'BT-connect', 'NFC', 'RAG',
      'DIP-Schalter', 'Zentralverriegelung', 'Magnetkontakt',
      'Panikfunktion', 'Belüftungsfunktion', 'Scharfschalten', 'Unscharfschalten',
      'Testalarm', 'Alarmsequenz', 'Bewegungsmelder', 'Rauchmelder',
      'Sirene', 'Hupe', 'Funk-Handsender', 'Fernbedienung',
      'Artikelnummer', 'Art.-Nr.', 'Seriennummer', 'Softwarestand',
      'Einbauanleitung', 'Abschalteinrichtung',
    ];
    const found = domainTerms.filter((term) => text.toLowerCase().includes(term.toLowerCase()));
    parts.push(...found);
    const artNums = text.match(/\b\d{4,6}(-\d{2,4})?\b/g) || [];
    parts.push(...artNums);
    if (headings) parts.push(...headings.map((h) => h.text));
    if (synonymKeywords[route]) parts.push(...synonymKeywords[route]);
    return parts.join(' ');
  }

  function getBoostKeywords(slug) {
    return CANONICAL_BOOST[slug] || '';
  }

  // ── AP4: Anleitungs-Bibliothek ─────────────────────────────────────────────
  // Die 31 Bedienungs-/Installationsanleitungen (wiki/Anleitungen/*.pdf) werden
  // (a) als Manifest für die rollengegatete Auslieferung (/api/anleitungen) und
  // (b) mit ihrem Text-Extrakt als Suchindex-Einträge bereitgestellt — damit
  // Cmd+K UND Thi-RAG sie finden. Die PDFs selbst bleiben außerhalb von public/
  // (Auslieferung NUR über die gated Route; SW-Cache fasst /api/ nicht an).
  const ANLEITUNGEN_DIR = path.join(WIKI_ROOT, 'Anleitungen');
  const ANLEITUNGEN_EXTRACT_DIR = path.join(WIKI_ROOT, 'Glossar', '03_build', '_anleitungen_extract');

  function anleitungProduct(name) {
    const n = name.toLowerCase();
    if (/wipro|safe[-.]?lock/.test(n)) return 'WiPro III';
    if (/pro[-_]?finder|abschalteinrichtung/.test(n)) return 'Pro-Finder';
    if (/g\.a\.s|gas[-_]?pro|co_sensor|zusatzsensor/.test(n)) return 'G.A.S.';
    if (/bt-connect/.test(n)) return 'BT-connect';
    return 'Funk-Zubehör';
  }

  function anleitungTitle(name) {
    let t = name.replace(/\.pdf$/i, '').replace(/[_]+/g, ' ').replace(/\s+-\s+/g, ' — ').trim();
    const fixes = [
      [/wipro iii/gi, 'WiPro III'], [/safe[-.]lock/gi, 'safe.lock'],
      [/g\.a\.s\./gi, 'G.A.S.'], [/\bgas[- ]pro\b/gi, 'G.A.S.-pro'],
      [/pro[- ]finder/gi, 'Pro-Finder'], [/bt-connect/gi, 'BT-connect'],
      [/\bnfc\b/gi, 'NFC'], [/\bco\b/gi, 'CO'], [/t\.s\.a\./gi, 'T.S.A.'],
      [/\bsn[- ]?0?45\b/gi, 'ab SN 045'], [/\bce\b/gi, 'CE'],
      [/de en fr/gi, '(DE/EN/FR)'], [/zehn sprachen/gi, '(10 Sprachen)'],
    ];
    for (const [re, val] of fixes) t = t.replace(re, val);
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  function buildAnleitungenLibrary() {
    if (!fs.existsSync(ANLEITUNGEN_DIR)) return { manifest: [], searchEntries: [] };
    const manifest = [];
    const searchEntries = [];
    const pdfs = fs.readdirSync(ANLEITUNGEN_DIR).filter((f) => f.toLowerCase().endsWith('.pdf')).sort();
    for (const file of pdfs) {
      const id = file.replace(/\.pdf$/i, '');
      // Whitelist-Zeichen — die Route rekonstruiert den Dateinamen aus der id.
      if (!/^[a-zA-Z0-9._-]+$/.test(id)) continue;
      const stat = fs.statSync(path.join(ANLEITUNGEN_DIR, file));
      const extractPath = path.join(ANLEITUNGEN_EXTRACT_DIR, `${file}.txt`);
      const text = fs.existsSync(extractPath)
        ? fs.readFileSync(extractPath, 'utf-8').replace(/\s+/g, ' ').trim()
        : '';
      const title = anleitungTitle(file);
      const product = anleitungProduct(file);
      // Sichtbarkeit datenrobust ableiten (wie buildFaqPdfLibrary): ein PDF mit
      // internem Muster (z. B. NUR_INTERNER_GEBRAUCH_*) ist auch hier internal —
      // sonst hinge das Gating allein an der zufälligen Ordnerwahl.
      const visibility = isInternalSource(file) ? 'internal' : 'standard';
      manifest.push({ id, file, title, product, visibility, bytes: stat.size, hasText: text.length > 0 });
      searchEntries.push({
        path: `wiki/Anleitungen/${file}`,
        route: `/anleitungen?open=${encodeURIComponent(id)}`,
        title: `${title} (PDF)`,
        slug: `anleitung-${id.toLowerCase().replace(/[^a-z0-9-]+/g, '-')}`,
        lang: 'de',
        section: 'anleitungen',
        visibility,
        headings: '',
        excerpt: text.substring(0, 2000),
        // Anleitungs-Body 2026-06-18 von 6000 → 12000 (Parität mit FAQ-PDFs),
        // damit artikel_lesen mehr Volltext für Thi liefern kann.
        body: text.substring(0, 12000),
        keywords: `${product} Anleitung Bedienungsanleitung Installationsanleitung Montageanleitung PDF ${id.replace(/[_-]+/g, ' ')}`,
        boostKeywords: `${product} Anleitung`,
        confidence: 'high',
        coverage: 'complete',
        dealerStatus: 'approved',
        articleType: 'anleitung',
        updated: stat.mtime.toISOString().slice(0, 10),
      });
    }
    return { manifest, searchEntries };
  }

  const anleitungen = buildAnleitungenLibrary();

  // ── E4 (AP4-Rest): FAQ-/Info-PDFs aus wiki/de ───────────────────────────────
  // Die FAQ-, Befehls- und Kompatibilitäts-PDFs liegen flach in wiki/de/*.pdf.
  // Gleiches Muster wie die Anleitungen: handgepflegter Text-Extrakt (kein
  // pdf-parse — Umgebung bleibt npm-frei) → Suchindex + Thi-RAG; Auslieferung
  // über die bestehende gated Route /api/anleitungen als eigene Gruppe.
  // NUR_INTERNER_GEBRAUCH_* bekommt visibility:internal (Liste/PDF rollengegatet,
  // publicSearchIndex filtert sie ohnehin heraus).
  const FAQ_PDF_DIR = path.join(WIKI_ROOT, CANONICAL_LANG);
  const FAQ_EXTRACT_DIR = path.join(WIKI_ROOT, 'Glossar', '03_build', '_faq_extract');
  const FAQ_GROUP = 'FAQ & Infoblätter';

  // IDs müssen die Route-Whitelist /^[a-zA-Z0-9._-]+$/ bestehen — die
  // Original-Dateinamen (Leerzeichen, Umlaute, „") tun das nicht.
  function faqSlugId(name) {
    return `faq-${name
      .replace(/\.pdf$/i, '')
      .replace(/ä/gi, 'ae').replace(/ö/gi, 'oe').replace(/ü/gi, 'ue').replace(/ß/g, 'ss')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}`;
  }

  function buildFaqPdfLibrary() {
    if (!fs.existsSync(FAQ_PDF_DIR)) return { manifest: [], searchEntries: [] };
    const manifest = [];
    const searchEntries = [];
    const pdfs = fs.readdirSync(FAQ_PDF_DIR).filter((f) => f.toLowerCase().endsWith('.pdf')).sort();
    for (const file of pdfs) {
      // Byte-identische "(n)"-Duplikate (AP10-Restpunkt) nicht doppelt indexieren.
      if (/\(\d+\)\.pdf$/i.test(file)) {
        auditIssues.push({ type: 'pdf-duplicate-skipped', file: `wiki/${CANONICAL_LANG}/${file}` });
        continue;
      }
      const id = faqSlugId(file);
      const stat = fs.statSync(path.join(FAQ_PDF_DIR, file));
      const extractPath = path.join(FAQ_EXTRACT_DIR, `${file}.txt`);
      const raw = fs.existsSync(extractPath) ? fs.readFileSync(extractPath, 'utf-8') : '';
      const text = raw.replace(/\s+/g, ' ').trim();
      // „Frage: …"-Zeilen der Extrakte wirken als Headings (+4 im Such-Scoring):
      // Nutzerfragen matchen direkt auf die FAQ-Frage statt nur auf Fließtext.
      const questionLines = raw
        .split(/\r?\n/)
        .filter((l) => l.trim().startsWith('Frage:'))
        .map((l) => l.replace(/^\s*Frage:\s*/, '').trim());
      const visibility = isInternalSource(file) ? 'internal' : 'standard';
      const title = file.replace(/\.pdf$/i, '');
      const product = anleitungProduct(file);
      manifest.push({
        id,
        file,
        title,
        product: FAQ_GROUP,
        group: 'faq',
        baseDir: `wiki/${CANONICAL_LANG}`,
        visibility,
        bytes: stat.size,
        hasText: text.length > 0,
      });
      searchEntries.push({
        path: `wiki/${CANONICAL_LANG}/${file}`,
        route: `/anleitungen?open=${encodeURIComponent(id)}`,
        title: `${title} (PDF)`,
        slug: id,
        lang: 'de',
        section: 'anleitungen',
        visibility,
        headings: questionLines.join(' '),
        excerpt: text.substring(0, 2000),
        // FAQ-Extrakte sind Q&A-dicht — großzügigeres Body-Limit als bei
        // Artikeln (~25 Extrakte × ~12 KB ≈ 0,3 MB; Index-Budget 8 MB).
        body: text.substring(0, 12000),
        keywords: `${product} FAQ häufige Fragen Infoblatt PDF ${title}`,
        boostKeywords: `${product} FAQ`,
        confidence: 'high',
        coverage: text.length > 0 ? 'complete' : 'source_missing',
        dealerStatus: visibility === 'internal' ? 'internal_only' : 'approved',
        articleType: 'faq',
        updated: stat.mtime.toISOString().slice(0, 10),
      });
    }
    return { manifest, searchEntries };
  }

  // Pflegeprozess (Max, 2026-06-12): Extrakte sind handgepflegt — der Build
  // erkennt per SHA-256, wenn eine PDF neuer ist als ihr Extrakt, und meldet das
  // als Audit-Issue statt stillschweigend veralteten Text auszuliefern.
  // Manifest-Pflege: scripts/pdf-extract-manifest.mjs nach jeder (Re-)Extraktion.
  function checkPdfExtractFreshness(pdfDir, extractDir, label) {
    const manifestPath = path.join(extractDir, '_extract-manifest.json');
    if (!fs.existsSync(manifestPath)) {
      console.log(`  ⚠️  ${label}: kein _extract-manifest.json — Stale-Check übersprungen (scripts/pdf-extract-manifest.mjs ausführen)`);
      return;
    }
    let extractManifest;
    try { extractManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8')); }
    catch { console.log(`  ⚠️  ${label}: _extract-manifest.json unlesbar`); return; }
    let stale = 0;
    for (const [file, meta] of Object.entries(extractManifest)) {
      const pdfPath = path.join(pdfDir, file);
      if (!fs.existsSync(pdfPath)) {
        auditIssues.push({ type: 'pdf-extract-orphan', file: `${label}/${file}` });
        continue;
      }
      const hash = crypto.createHash('sha256').update(fs.readFileSync(pdfPath)).digest('hex');
      if (hash !== meta.sha256) {
        stale++;
        auditIssues.push({ type: 'pdf-extract-stale', file: `${label}/${file}`, extractedAt: meta.extractedAt || null });
      }
    }
    if (stale > 0) {
      console.log(`  ⚠️  ${label}: ${stale} PDF(s) neuer als ihr Text-Extrakt — Extrakt erneuern + scripts/pdf-extract-manifest.mjs ausführen`);
    }
  }

  const faqPdfs = buildFaqPdfLibrary();
  checkPdfExtractFreshness(ANLEITUNGEN_DIR, ANLEITUNGEN_EXTRACT_DIR, 'wiki/Anleitungen');
  checkPdfExtractFreshness(FAQ_PDF_DIR, FAQ_EXTRACT_DIR, `wiki/${CANONICAL_LANG} (FAQ)`);

  const searchIndex = articles.map((a) => ({
    path: a.path,
    route: a.route,
    title: a.title,
    slug: a.slug,
    lang: a.lang,
    section: a.section,
    visibility: a.visibility,
    headings: a.headings.map((h) => h.text).join(' '),
    excerpt: (a.plainText || '').substring(0, 2000),
    // Body-Cap 2026-06-18 von 6000 → 16000 angehoben: 65 von 147 de-Artikeln
    // waren bei 6000 abgeschnitten (z. B. WiPro III), Inhalt danach war für Suche
    // UND Thi-RAG (artikel_lesen) unsichtbar. 16000 deckt praktisch alle Artikel ab.
    body: (a.plainText || '').substring(0, 16000),
    keywords: extractKeywords(a.plainText, a.headings, a.route),
    boostKeywords: getBoostKeywords(a.slug),
    confidence: a.confidence,
    coverage: a.coverage,
    dealerStatus: a.dealerStatus,
    articleType: a.articleType,
    updated: a.updated,
    // Nur bei Intern-Anteil: bereinigte Parallel-Felder für die Händler-Sicht.
    // lib/wiki-runtime.js ersetzt damit excerpt/body/keywords/headings, bevor
    // der Bootstrap an Nicht-Interne geht (Finding P1; Schema v2).
    ...(a.hasInternalContent ? {
      dealerExcerpt: (a.dealerPlainText || '').substring(0, 2000),
      dealerBody: (a.dealerPlainText || '').substring(0, 16000),
      dealerKeywords: extractKeywords(a.dealerPlainText, dealerHeadingsFor(a.headings), a.route),
      dealerHeadings: dealerHeadingsFor(a.headings).map((h) => h.text).join(' '),
    } : {}),
  }));
  // AP4: Anleitungs-PDFs in den Suchindex (Cmd+K + Thi-RAG finden sie damit).
  searchIndex.push(...anleitungen.searchEntries);
  // E4: FAQ-/Info-PDFs ebenso (interne bleiben via publicSearchIndex draußen).
  searchIndex.push(...faqPdfs.searchEntries);

  // ── Abschnitts-Index (THI Abschnitts-Zitate) ──────────────────────────────
  // Flache Liste aller H2/H3-Abschnitte über alle Artikel. Damit kann Thi auf
  // Abschnittsebene retrieven und exakt die jeweilige Stelle als route#anker
  // zitieren/verlinken — der größte verbleibende Retrieval-Hebel laut
  // docs/THI_RAG_UEBERARBEITUNG_2026-06-18.md §6. Reine Markdown-Artikel; die
  // PDF-/FAQ-Einträge bleiben artikel-/dokumentebene (kein Anker).
  const SECTION_BODY_CAP = 4000;
  const sectionIndex = [];
  for (const a of articles) {
    // „Service & Intern“-H2-Blöcke in Standard-Artikeln (inkl. ihrer H3-Kinder
    // bis zur nächsten H2) sind für Händler unsichtbar → dealerHidden. Die
    // Runtime filtert sie vor der Auslieferung an Nicht-Interne (Finding P1).
    let inInternalH2 = false;
    for (const s of a.sections || []) {
      if (s.level <= 1) inInternalH2 = false;
      else if (s.level === 2) inInternalH2 = INTERNAL_SECTION_ANCHORS.has(String(s.anchor || ''));
      const dealerHidden = a.visibility === 'standard' && s.level >= 2 && inInternalH2;
      sectionIndex.push({
        route: a.route,
        anchor: s.anchor || '',
        lang: a.lang,
        visibility: a.visibility,
        articleType: a.articleType,
        slug: a.slug,
        title: a.title,
        heading: s.heading || '',
        headingPath: s.headingPath || '',
        level: s.level,
        body: String(s.text || '').slice(0, SECTION_BODY_CAP),
        ...(dealerHidden ? { dealerHidden: true } : {}),
      });
    }
  }

  // Slim-Felder pro Artikel — alles, was Dashboard/Search/Sidebar brauchen,
  // OHNE den teuren HTML-Body, dealerHtml, headings, sources oder relatedLinks.
  // Diese kommen nachgelagert über wiki-articles/{lang}/{slug}.json.
  const articleSlim = (a) => ({
    path: a.path,
    lang: a.lang,
    section: a.section,
    slug: a.slug,
    route: a.route,
    visibility: a.visibility,
    isIndex: a.isIndex,
    title: a.title,
    updated: a.updated,
    confidence: a.confidence,
    coverage: a.coverage,
    dealerStatus: a.dealerStatus,
    articleType: a.articleType,
    primaryImage: a.primaryImage || null,
  });
  // Felder, die NUR im Body-File landen — der Rest kann ohne Re-Fetch
  // wiederverwendet werden.
  const articleBody = (a) => ({
    route: a.route,
    lang: a.lang,
    title: a.title,
    visibility: a.visibility,
    confidence: a.confidence,
    coverage: a.coverage,
    dealerStatus: a.dealerStatus,
    articleType: a.articleType,
    updated: a.updated,
    primaryImage: a.primaryImage || null,
    sources: a.sources || [],
    sourceMeta: a.sourceMeta || [],
    dealerSources: a.dealerSources || [],
    headings: a.headings || [],
    html: a.html || '',
    dealerHtml: a.dealerHtml || '',
    relatedAssets: a.relatedAssets || [],
    relatedLinks: a.relatedLinks || [],
  });

  const generatedAt = computeGeneratedAt(mdFiles);
  process.env.WIKI_GENERATED_AT = generatedAt;
  const standardArticles = articles.filter((a) => a.visibility !== 'internal');
  // Händler-Sicht für Offline-Evals/Smokes: nicht nur interne ARTIKEL raus,
  // sondern auch die Textfelder der Standard-Artikel bereinigt — identisch zur
  // Runtime-Projektion in lib/wiki-runtime.js (Finding P1).
  const publicSearchIndex = searchIndex
    .filter((a) => a.visibility !== 'internal')
    .map(dealerSearchView);

  const wikiIndex = {
    generatedAt,
    // Artefakt-Schema: v2 = dealer*-Felder im Suchindex + dealerHidden im
    // Abschnittsindex. lib/wiki-runtime.js verweigert ältere Artefakte (503).
    schemaVersion: 2,
    summary: {
      totalArticles: standardArticles.length,
      languages: LANGUAGES,
      languageCounts: {},
      assets: allAssets.length,
    },
    navigation: navigationBlueprint,
    linkDictionary,
    articles: standardArticles.map(articleSlim),
    assets: allAssets,
  };
  for (const lang of LANGUAGES) wikiIndex.summary.languageCounts[lang] = standardArticles.filter((a) => a.lang === lang).length;

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.mkdirSync(RUNTIME_WIKI_DIR, { recursive: true });

  const runtimeWikiIndex = {
    ...wikiIndex,
    summary: {
      ...wikiIndex.summary,
      totalArticles: articles.length,
      languageCounts: {},
    },
    articles: articles.map(articleSlim),
  };
  for (const lang of LANGUAGES) runtimeWikiIndex.summary.languageCounts[lang] = articles.filter((a) => a.lang === lang).length;

  fs.writeFileSync(path.join(RUNTIME_WIKI_DIR, 'wiki-index.json'), JSON.stringify(runtimeWikiIndex), 'utf-8');
  fs.writeFileSync(path.join(RUNTIME_WIKI_DIR, 'search-index.json'), JSON.stringify(searchIndex), 'utf-8');
  // Abschnitts-Index: Runtime-Variante (inkl. intern, für Bootstrap-Rollenfilter
  // und die Thi-Tools); öffentliche Variante weiter unten neben search-index.json.
  fs.writeFileSync(path.join(RUNTIME_WIKI_DIR, 'section-index.json'), JSON.stringify(sectionIndex), 'utf-8');
  console.log(`🧭 section-index.json written (${sectionIndex.length} Abschnitte aus ${articles.length} Artikeln)`);
  // AP4: Manifest der Anleitungs-Bibliothek — privat (Runtime), Auslieferung
  // ausschließlich über die rollengegatete Route /api/anleitungen.
  const anleitungenManifest = [...anleitungen.manifest, ...faqPdfs.manifest];
  fs.writeFileSync(path.join(RUNTIME_WIKI_DIR, 'anleitungen-index.json'), JSON.stringify(anleitungenManifest), 'utf-8');
  console.log(`📕 anleitungen-index.json written (${anleitungenManifest.length} PDFs davon ${faqPdfs.manifest.length} FAQ, ${anleitungenManifest.filter((a) => a.hasText).length} mit Text-Extrakt)`);
  const runtimeArticleBytes = writeArticleBodyFiles(path.join(RUNTIME_WIKI_DIR, 'wiki-articles'), articles, articleBody);
  const runtimeSources = writeWikiSources(
    path.join(RUNTIME_WIKI_DIR, 'wiki-sources'),
    path.join(RUNTIME_WIKI_DIR, 'wiki-sources-index.json'),
    articles,
  );
  console.log(`Private runtime wiki written (${articles.length} articles, ${(runtimeArticleBytes / 1024 / 1024).toFixed(1)} MB, ${runtimeSources.sourceCount} sources)`);

  // F15-Entscheid (Max, 2026-07-21, Issue #17): Das Wiki ist login-pflichtig —
  // es gibt KEINE öffentlichen Wiki-Artefakte mehr in public/. wiki-index,
  // Artikel-Bodies, Such-/Abschnitts-Index, Glossar und Quellen liegen nur noch
  // unter project-data/runtime/wiki/ und werden ausschließlich über die
  // Bearer-gegateten /api/wiki/*-Routen ausgeliefert (anon → 401).
  // Alte public-Kopien früherer Ingest-Läufe aktiv wegräumen (Dev-Maschinen;
  // auf CI/Vercel entstehen sie gar nicht mehr).
  for (const legacyFile of ['wiki-index.json', 'search-index.json', 'section-index.json', 'glossary.json', 'wiki-sources-index.json', 'wiki-sources.json', 'wiki-data.json']) {
    const legacyPath = path.join(PUBLIC_DIR, legacyFile);
    if (fs.existsSync(legacyPath)) fs.unlinkSync(legacyPath);
  }
  for (const legacyDir of ['wiki-articles', 'wiki-sources']) {
    const legacyPath = path.join(PUBLIC_DIR, legacyDir);
    if (fs.existsSync(legacyPath)) fs.rmSync(legacyPath, { recursive: true, force: true });
  }
  console.log('🔒 public/ wiki artifacts removed/skipped — login-gated via /api/wiki/* (Issue #17)');

  // Gefilterte Händler-Sicht (ohne interne Artikel) für Offline-Evals/Smokes
  // (scripts/wiki-smoke.mjs, thi-rag-*.mjs) — bewusst NICHT in public/.
  fs.writeFileSync(path.join(RUNTIME_WIKI_DIR, 'search-index.public.json'), JSON.stringify(publicSearchIndex), 'utf-8');
  console.log(`🔍 search-index.public.json written (${publicSearchIndex.length} entries, Händler-Sicht)`);

  const publicSectionIndex = dealerSectionsView(sectionIndex);
  fs.writeFileSync(path.join(RUNTIME_WIKI_DIR, 'section-index.public.json'), JSON.stringify(publicSectionIndex), 'utf-8');
  console.log(`🧭 section-index.public.json written (${publicSectionIndex.length} entries, Händler-Sicht)`);

  const byType = {};
  const byLanguage = {};
  for (const issue of auditIssues) {
    byType[issue.type] = (byType[issue.type] || 0) + 1;
    const issueLang = issue.lang || (issue.file?.match(/^wiki\/([a-z]{2})\//) || [])[1] || 'unknown';
    if (!byLanguage[issueLang]) byLanguage[issueLang] = {};
    byLanguage[issueLang][issue.type] = (byLanguage[issueLang][issue.type] || 0) + 1;
  }
  const internalArticles = articles.filter((a) => a.visibility === 'internal');
  const internalByLang = {};
  for (const a of internalArticles) internalByLang[a.lang] = (internalByLang[a.lang] || 0) + 1;
  const internalWithoutConfidence = internalArticles.filter((a) => !a.confidence).length;
  const internalWithoutSources = internalArticles.filter((a) => !a.sources || a.sources.length === 0).length;
  const totalMdFiles = mdFiles.length;
  const successfullyParsed = articles.length;
  const frontmatterHealth = Math.round((successfullyParsed / totalMdFiles) * 100);
  const deArticleSlugs = articles
    .filter((a) => a.lang === 'de' && !a.isIndex && !TRANSLATION_EXEMPT_PATHS.has(a.path))
    .map((a) => a.slug);
  const languageCoverage = {};
  for (const lang of LANGUAGES) {
    if (lang === 'de') { languageCoverage[lang] = { total: deArticleSlugs.length, covered: deArticleSlugs.length, pct: 100 }; continue; }
    const langSlugs = new Set(articles.filter((a) => a.lang === lang).map((a) => a.slug));
    const covered = deArticleSlugs.filter((s) => langSlugs.has(s)).length;
    languageCoverage[lang] = { total: deArticleSlugs.length, covered, pct: Math.round((covered / deArticleSlugs.length) * 100) };
  }
  const deArticles2 = articles.filter((a) => a.lang === 'de');
  const confidenceDist = { high: 0, medium: 0, low: 0, none: 0 };
  for (const a of deArticles2) {
    if (a.confidence === 'high') confidenceDist.high++;
    else if (a.confidence === 'medium') confidenceDist.medium++;
    else if (a.confidence === 'low') confidenceDist.low++;
    else confidenceDist.none++;
  }
  const sourceSummary = summarizeSourceUsage(sourceUsage);

  // Coverage- und DealerStatus-Verteilung fuer DE-Bestand
  const coverageDist = { complete: 0, partial: 0, faq_only: 0, source_missing: 0 };
  const dealerStatusDist = { approved: 0, needs_review: 0, internal_only: 0 };
  const articleTypeCounts = {};
  for (const a of deArticles2) {
    if (coverageDist[a.coverage] != null) coverageDist[a.coverage]++;
    if (dealerStatusDist[a.dealerStatus] != null) dealerStatusDist[a.dealerStatus]++;
    articleTypeCounts[a.articleType] = (articleTypeCounts[a.articleType] || 0) + 1;
  }
  // Anteil approved unter dealer-sichtbaren Seiten
  const dealerVisible = deArticles2.filter((a) => a.visibility === 'standard' && !a.isIndex).length;
  const dealerReadiness = dealerVisible === 0
    ? null
    : Math.round((dealerStatusDist.approved / dealerVisible) * 100);

  const auditReport = {
    generatedAt,
    totalIssues: auditIssues.length,
    summary: {
      byType, byLanguage, frontmatterHealth,
      totalFiles: totalMdFiles,
      parsedFiles: successfullyParsed,
      languageCoverage,
      confidenceDistribution: confidenceDist,
      coverageDistribution: coverageDist,
      dealerStatusDistribution: dealerStatusDist,
      articleTypeCounts,
      dealerReadiness, // % der dealer-sichtbaren DE-Seiten mit dealerStatus=approved
      sourceSummary,
      internalStats: {
        totalPages: internalArticles.length,
        byLanguage: internalByLang,
        withoutConfidence: internalWithoutConfidence,
        withoutSources: internalWithoutSources,
      },
    },
    issues: auditIssues,
  };
  fs.writeFileSync(path.join(RUNTIME_WIKI_DIR, 'audit-report.json'), JSON.stringify(auditReport, null, 2), 'utf-8');

  const internalFiles = new Set(internalArticles.map((a) => a.path));
  const auditInternalRoutes = new Set(internalArticles.map((a) => a.route));
  const publicAuditIssues = auditIssues.filter((issue) => {
    const file = String(issue.file || '');
    const route = String(issue.route || '');
    return !internalFiles.has(file)
      && !auditInternalRoutes.has(route)
      && !file.includes('/intern/')
      && !route.includes('/intern/');
  });
  const publicByType = {};
  const publicByLanguage = {};
  for (const issue of publicAuditIssues) {
    publicByType[issue.type] = (publicByType[issue.type] || 0) + 1;
    const issueLang = issue.lang || (issue.file?.match(/^wiki\/([a-z]{2})\//) || [])[1] || 'unknown';
    if (!publicByLanguage[issueLang]) publicByLanguage[issueLang] = {};
    publicByLanguage[issueLang][issue.type] = (publicByLanguage[issueLang][issue.type] || 0) + 1;
  }
  const publicAuditReport = {
    ...auditReport,
    totalIssues: publicAuditIssues.length,
    summary: {
      ...auditReport.summary,
      byType: publicByType,
      byLanguage: publicByLanguage,
      internalStats: { totalPages: 0, byLanguage: {}, withoutConfidence: 0, withoutSources: 0 },
    },
    issues: publicAuditIssues,
  };
  // AP0: bewusst NICHT mehr nach public/ — auch die gefilterte Variante gehört
  // hinter das Rollen-Gate (Auslieferung ausschließlich via /api/wiki/bootstrap,
  // siehe lib/wiki-runtime.js). Direkter Abruf /audit-report.json → 404.
  fs.writeFileSync(path.join(RUNTIME_WIKI_DIR, 'audit-report.public.json'), JSON.stringify(publicAuditReport, null, 2), 'utf-8');
  console.log(`📋 audit-report.json: ${auditIssues.length} issues (health: ${frontmatterHealth}%)`);

  // Editor-Quellen (wiki-sources/ + Index) liegen seit Issue #17 ausschließlich
  // im Runtime-Verzeichnis (writeWikiSources oben) und kommen über die
  // Bearer-gegateten /api/wiki/source-Routen — kein public-Spiegel mehr.

  console.log('📖 Building glossary.json (runtime, via /api/wiki/bootstrap)...');
  buildGlossaryJson(RUNTIME_WIKI_DIR);

  console.log('📁 Copying assets...');
  let copiedCount = 0;
  let skipCount = 0;
  let videoCount = 0;
  for (const asset of allAssets) {
    // AP0: Videos (~816 MB Unikate) NICHT bei jedem predev/prebuild umkopieren —
    // bewusster Einzellauf via `npm run assets:videos` (scripts/copy-videos.mjs).
    // Bereits vorhandene Kopien unter public/assets/ bleiben unangetastet.
    if (asset.type === 'video') { videoCount++; continue; }
    const src = path.join(REPO_ROOT, asset.relativePath);
    const dest = path.join(PUBLIC_DIR, 'assets', asset.relativePath);
    try {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
      copiedCount++;
    } catch {
      skipCount++;
    }
  }
  console.log(`✅ Assets copied: ${copiedCount} ok, ${skipCount} skipped, ${videoCount} Videos ausgelassen (npm run assets:videos)`);

  console.log('📚 Copying training & quiz seed data...');
  const seedFiles = ['training-modules.json', 'quiz-schema.json'];
  for (const seedFile of seedFiles) {
    const src = path.join(PROJECT_DATA, seedFile);
    const dest = path.join(PUBLIC_DIR, seedFile);
    if (fs.existsSync(src)) {
      try { fs.copyFileSync(src, dest); console.log(`  ✅ ${seedFile}`); }
      catch (e) { console.log(`  ⚠️  ${seedFile} skipped: ${e.message}`); }
    } else {
      console.log(`  ℹ️  ${seedFile} not found, skipping`);
    }
  }

  // Kuratierte Händler-Quizfragen: enthalten correct-Markierungen + wikiRefs
  // und sind damit Wiki-abgeleiteter Inhalt → seit 2026-07-22 NICHT mehr in
  // public/, sondern login-gegated über /api/wiki/quizzes (Issue #17-Logik).
  const quizSrc = path.join(REPO_ROOT, 'Quiz', 'dealer-quizzes.de.json');
  const quizDest = path.join(RUNTIME_WIKI_DIR, 'dealer-quizzes.de.json');
  if (fs.existsSync(quizSrc)) {
    try { fs.copyFileSync(quizSrc, quizDest); console.log('  ✅ dealer-quizzes.de.json → runtime (gated via /api/wiki/quizzes)'); }
    catch (e) { console.log(`  ⚠️  dealer-quizzes.de.json skipped: ${e.message}`); }
  } else {
    console.log('  ℹ️  Quiz/dealer-quizzes.de.json not found');
  }
  // Öffentliche Altkopie früherer Ingest-Läufe aktiv wegräumen (Dev-Maschinen).
  const legacyQuizPath = path.join(PUBLIC_DIR, 'dealer-quizzes.de.json');
  if (fs.existsSync(legacyQuizPath)) fs.unlinkSync(legacyQuizPath);

  const typeCounts = {};
  for (const a of allAssets) typeCounts[a.type] = (typeCounts[a.type] || 0) + 1;
  console.log(`📊 Asset types: ${Object.entries(typeCounts).map(([t, c]) => `${t}=${c}`).join(', ')}`);
  console.log('\n🎉 Ingest complete!');
}

main().catch((e) => {
  console.error('❌ Ingest failed:', e);
  process.exit(1);
});
