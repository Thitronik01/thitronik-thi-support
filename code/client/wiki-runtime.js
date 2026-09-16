import path from 'path';
import { runtimeExistsSync, runtimeReadFileSync } from './runtime-fs.js';
import {
  dealerArticleView,
  dealerSearchView,
  dealerSectionsView,
  stripDealerSearchFields,
} from './wiki-dealer-view.mjs';

const RUNTIME_ROOT = path.join(process.cwd(), 'project-data', 'runtime', 'wiki');

// Schema-Version der Runtime-Artefakte. v2 (2026-07-22): Suchindex-Einträge mit
// Intern-Anteil tragen dealer*-Felder, Abschnitte tragen dealerHidden. Ältere
// Artefakte kennen diese Felder nicht — sie auszuliefern hieße, Händlern die
// ungefilterten Texte zu geben. Deshalb hartes Gate (fail-closed) statt Fallback.
const WIKI_SCHEMA_VERSION = 2;

function readJson(filePath) {
  return JSON.parse(runtimeReadFileSync(filePath, 'utf-8'));
}

function safeParts(parts) {
  return (parts || [])
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    // Punkt-Segmente ('.', '..') und alles, was nach Traversal aussieht, KOMPLETT
    // verwerfen. Die Zeichenklasse unten erlaubt '.', sonst überlebt ein '..'-Segment
    // unverändert und path.join() in fileForRoute() löst es auf → Path-Traversal
    // (Lesen beliebiger *.json außerhalb des Wiki-Verzeichnisses, auch unauthentifiziert).
    .filter((part) => part !== '.' && part !== '..' && !part.includes('..'))
    .map((part) => part.replace(/[^a-zA-Z0-9._-]/g, '_'));
}

function routeFromParts(parts) {
  const clean = safeParts(parts);
  return `/${clean.join('/')}`;
}

function fileForRoute(baseDir, parts) {
  const clean = safeParts(parts);
  if (clean.length === 0) return null;
  const filePath = path.join(
    /*turbopackIgnore: true*/ baseDir,
    ...clean.slice(0, -1),
    `${clean[clean.length - 1] || '_index'}.json`,
  );
  // Defense-in-depth: niemals aus baseDir ausbrechen, selbst falls die Säuberung
  // oben einmal versagen sollte. Der aufgelöste Pfad muss unter baseDir liegen.
  const resolvedBase = path.resolve(baseDir);
  const resolved = path.resolve(filePath);
  if (resolved !== resolvedBase && !resolved.startsWith(resolvedBase + path.sep)) return null;
  return filePath;
}

function filterIndexForAccess(index, access) {
  if (access.canViewInternal) return index;
  const visibleRoutes = new Set(index.articles.filter((a) => a.visibility !== 'internal').map((a) => a.route));
  return {
    ...index,
    articles: index.articles.filter((a) => visibleRoutes.has(a.route)),
    linkDictionary: (index.linkDictionary || []).filter((entry) => {
      const target = String(entry?.target || '');
      if (!target.includes('/{lang}/')) return true;
      const suffix = target.replace('/{lang}', '').split('#')[0];
      return visibleRoutes.has(`/de${suffix}`) || !suffix.includes('/intern/');
    }),
    summary: {
      ...index.summary,
      totalArticles: visibleRoutes.size,
      languageCounts: Object.fromEntries((index.summary?.languages || []).map((lang) => [
        lang,
        index.articles.filter((a) => a.lang === lang && visibleRoutes.has(a.route)).length,
      ])),
    },
  };
}

function filterSearchForAccess(searchIndex, access) {
  // Die dealer*-Rohfelder sind ein Artefakt-Implementierungsdetail und werden in
  // KEINER Sicht ausgeliefert: Interne bekommen die Originaltexte, Nicht-Interne
  // die vom Ingest aus dealerHtml abgeleitete Fassung (Finding P1, 2026-07-22).
  if (access.canViewInternal) return (searchIndex || []).map(stripDealerSearchFields);
  return (searchIndex || [])
    .filter((item) => item.visibility !== 'internal')
    .map(dealerSearchView);
}

function filterSectionsForAccess(sectionIndex, access) {
  if (access.canViewInternal) return sectionIndex;
  return dealerSectionsView(sectionIndex);
}

export function loadWikiBootstrap(access) {
  const indexPath = path.join(RUNTIME_ROOT, 'wiki-index.json');
  const searchPath = path.join(RUNTIME_ROOT, 'search-index.json');
  // Die Runtime-JSONs liegen unter project-data/runtime/ (gitignored) und werden nur vom
  // Ingest (predev/prebuild) erzeugt. Fehlen sie, klare 503-Diagnose statt generischem 500.
  if (!runtimeExistsSync(indexPath) || !runtimeExistsSync(searchPath)) {
    const err = new Error('Wiki-Runtime-Daten fehlen. Bitte "npm run wiki:ingest" ausführen (läuft normalerweise als predev/prebuild).');
    err.code = 'WIKI_NOT_INGESTED';
    throw err;
  }
  const index = readJson(indexPath);
  // Fail-closed gegen veraltete Artefakte: Ohne die v2-Dealer-Felder würde die
  // Händler-Projektion unbereinigte Texte durchreichen. Klare 503-Diagnose.
  if ((index.schemaVersion || 1) < WIKI_SCHEMA_VERSION) {
    const err = new Error('Wiki-Runtime-Daten sind veraltet (Schema < v2). Bitte "npm run wiki:ingest" ausführen (läuft normalerweise als predev/prebuild).');
    err.code = 'WIKI_NOT_INGESTED';
    throw err;
  }
  const searchIndex = readJson(searchPath);
  // Abschnitts-Index (THI Abschnitts-Zitate): optional — fehlt er (alter Ingest),
  // fällt der Client gracefully auf artikelweise Quellen zurück.
  const sectionPath = path.join(RUNTIME_ROOT, 'section-index.json');
  const sectionIndex = runtimeExistsSync(sectionPath) ? readJson(sectionPath) : [];
  // Beide Audit-Varianten liegen seit AP0 unter project-data/runtime/ — die
  // gefilterte .public-Variante für Nicht-Interne wird hier rollenabhängig
  // ausgeliefert; in public/ liegt keine Kopie mehr (direkter Abruf → 404).
  const auditPathInternal = path.join(RUNTIME_ROOT, 'audit-report.json');
  const auditPathPublic = path.join(RUNTIME_ROOT, 'audit-report.public.json');
  const auditPath = access.canViewInternal && runtimeExistsSync(auditPathInternal)
    ? auditPathInternal
    : auditPathPublic;
  const auditReport = runtimeExistsSync(auditPath) ? readJson(auditPath) : null;
  // Glossar (rollen-neutral) — seit Issue #17 nicht mehr als public/glossary.json,
  // sondern Teil des gegateten Bootstraps. Optional: fehlt es (alter Ingest),
  // rendert der Client ohne Glossar-Popover weiter.
  const glossaryPath = path.join(RUNTIME_ROOT, 'glossary.json');
  const glossary = runtimeExistsSync(glossaryPath) ? readJson(glossaryPath) : null;

  return {
    data: filterIndexForAccess(index, access),
    searchIndex: filterSearchForAccess(searchIndex, access),
    sectionIndex: filterSectionsForAccess(sectionIndex, access),
    auditReport,
    glossary,
  };
}

export function loadWikiArticle(parts, access) {
  const route = routeFromParts(parts);
  const filePath = fileForRoute(path.join(RUNTIME_ROOT, 'wiki-articles'), parts);
  if (!filePath || !runtimeExistsSync(filePath)) return { status: 404, route };
  const article = readJson(filePath);
  if (article.visibility === 'internal' && !access.canViewInternal) return { status: 404, route };
  // Nicht-Interne bekommen die Händler-Projektion: html := dealerHtml,
  // sources/sourceMeta ohne interne Quellen, Headings ohne Intern-Abschnitte.
  // Die Auswahl traf bisher der Client — serverseitig erzwungen seit 2026-07-22
  // (Finding P1: Händler konnten interne Teilabschnitte per API abrufen).
  return { status: 200, route, article: access.canViewInternal ? article : dealerArticleView(article) };
}

export function loadWikiSourceIndex(access) {
  if (!access.canEditWiki) return { status: 403, items: [] };
  const items = readJson(path.join(RUNTIME_ROOT, 'wiki-sources-index.json'));
  return { status: 200, items };
}

export function loadWikiSource(parts, access) {
  const route = routeFromParts(parts);
  if (!access.canEditWiki) return { status: 403, route };
  const filePath = fileForRoute(path.join(RUNTIME_ROOT, 'wiki-sources'), parts);
  if (!filePath || !runtimeExistsSync(filePath)) return { status: 404, route };
  return { status: 200, route, source: readJson(filePath) };
}
