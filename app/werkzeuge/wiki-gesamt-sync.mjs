// Vollständiger Abgleich der lokalen, bereits enthaltenen Wiki-Routen.
// Standard: nur prüfen. Ein Kandidat kann separat erzeugt und geprüft werden.
// PDF-/FAQ-Exporte bleiben unverändert; interne Seiten werden nicht importiert.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { klartext, ueberschriften, abschnitte } from './wiki-sync-basis.mjs';
import { INTERNAL_SECTION_ANCHORS } from '../../code/wiki-dealer-view.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../..');
const INTERNAL = new Set(['quellen-matrix', 'support-fallaufnahme', 'terminologie-und-schreibweisen', 'uebersetzungs-glossar', 'werkseinbau-eckernfoerde']);
const readJson = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const walk = p => fs.readdirSync(p, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(p, e.name)) : [path.join(p, e.name)]);

export function wikiRoute(relative) {
  return '/' + relative.replaceAll('\\', '/').replace(/Tech\.\s*Doku/gi, 'tech-doku').replace(/\/_index\.md$/, '').replace(/\.md$/, '');
}

export function markdownInhalt(raw) {
  const text = raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const fm = text.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!fm) throw new Error('YAML-Frontmatter fehlt.');
  return { frontmatter: fm[1], body: text.slice(fm[0].length) };
}

// Entfernt einen internen H2-Bereich einschließlich untergeordneter Blöcke.
// Die Anker werden am vollständigen Dokument ermittelt, damit identische
// Überschriften hinter einem entfernten Block nicht umnummeriert werden.
export function oeffentlichesMarkdown(markdown) {
  const headings = ueberschriften(markdown);
  const visibleHeadings = [];
  const output = [];
  const hidden = [];
  let index = 0, internal = false, fence = null;
  for (const line of markdown.split('\n')) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (marker && !fence) { fence = marker[1]; if (!internal) output.push(line); continue; }
    if (fence) {
      if (new RegExp(`^ {0,3}${fence[0]}{${fence.length},}\\s*$`).test(line)) fence = null;
      if (!internal) output.push(line);
      continue;
    }
    if (/^#{1,6}\s+/.test(line)) {
      const h = headings[index++];
      if (!h) throw new Error('Überschriftenzählung stimmt nicht.');
      if (h.level <= 2) internal = h.level === 2 && INTERNAL_SECTION_ANCHORS.has(h.anchor);
      if (internal) hidden.push(h.anchor); else visibleHeadings.push(h);
    }
    if (!internal) output.push(line);
  }
  return { body: output.join('\n'), headings: visibleHeadings, hidden };
}

export function gesamtStand({ repo = REPO, dataDir = path.join(repo, 'app/data') } = {}) {
  const articles = readJson(path.join(dataDir, 'artikel.json'));
  const sections = readJson(path.join(dataDir, 'sektionen.json'));
  const byRoute = new Map(articles.map(a => [a.route, a]));
  if (byRoute.size !== articles.length) throw new Error('Doppelte Artikelrouten.');
  const wiki = path.join(repo, 'content/wiki');
  const replacements = new Map(), chunks = new Map();
  const report = { mode: 'offline-import', wikiFiles: 0, imported: [], excludedInternal: [], unchangedExports: [], removedInternalSections: [], editorialStatusWarnings: [], longSectionsPreserved: [], changedRoutes: [], missingAnchors: [], technicalLiterals: 0 };
  for (const file of walk(wiki).filter(f => f.endsWith('.md')).sort()) {
    report.wikiFiles++;
    const relative = path.relative(wiki, file).replaceAll('\\', '/');
    const route = wikiRoute(relative);
    const slug = path.basename(file, '.md');
    if (relative.split('/').includes('intern') || INTERNAL.has(slug)) {
      if (byRoute.has(route)) throw new Error(`Interne Wiki-Route im öffentlichen Bestand: ${route}`);
      report.excludedInternal.push(route); continue;
    }
    const old = byRoute.get(route);
    if (!old || old.visibility !== 'standard') throw new Error(`Keine bestehende öffentliche Route für ${relative}; explizite Aufnahme erforderlich.`);
    if (Object.keys(old).some(k => k.startsWith('dealer'))) throw new Error(`${route}: unerwartete gemischte Sichtbarkeit.`);
    const { frontmatter, body } = markdownInhalt(fs.readFileSync(file, 'utf8'));
    if (/^visibility:\s*['"]?internal['"]?\s*$/m.test(frontmatter)) throw new Error(`${route}: interne Sichtbarkeit widerspricht öffentlichem Bestand.`);
    // dealerStatus is an editorial audit label in the source exporter, not its
    // access filter (which uses visibility/internal routes and H2 projection).
    // Preserve existing access metadata; expose stale labels for review rather
    // than silently assigning a new approval or changing access semantics.
    if (/^dealerStatus:\s*['"]?internal_only['"]?\s*$/m.test(frontmatter)) report.editorialStatusWarnings.push({ route, sourceStatus: 'internal_only', existingVisibility: old.visibility });
    const lang = frontmatter.match(/^lang:\s*['"]?(de|fr)['"]?\s*$/m)?.[1];
    if (!lang || lang !== old.lang || !route.startsWith(`/${lang}`)) throw new Error(`${route}: Sprachzuordnung fehlt oder widerspricht dem Index.`);
    const projected = oeffentlichesMarkdown(body);
    const oldSections = sections.filter(s => s.route === route);
    // Existing links were produced with github-slugger in the source platform.
    // Keep those IDs for unchanged headings (including ®, + and translated
    // punctuation); never silently rename a published anchor during a reimport.
    const used = new Set();
    for (const h of projected.headings) {
      const previous = oldSections.find((s, i) => !used.has(i) && s.level === h.level && s.heading === h.text);
      if (previous && h.level >= 2) { used.add(oldSections.indexOf(previous)); h.anchor = previous.anchor; }
    }
    report.removedInternalSections.push(...projected.hidden.map(anchor => ({ route, anchor })));
    // Preserve all section text, including the two historically clipped glossary
    // sections. Context budgets are still enforced in artikelKontext, not here.
    const nextSections = abschnitte(projected.body, projected.headings, route, Infinity).map(s => ({
      lang, route, slug: old.slug, title: old.title, anchor: s.anchor, heading: s.heading,
      headingPath: s.headingPath, level: s.level, articleType: old.articleType,
      visibility: old.visibility, body: s.body,
    }));
    const plain = klartext(projected.body);
    const long = nextSections.filter(s => s.body.length > 4000);
    report.longSectionsPreserved.push(...long.map(s => ({ route, anchor: s.anchor, chars: s.body.length })));
    // Long sections must also be available to the existing snippet fallback.
    // Other articles retain the established 16k body window + complete sections.
    const next = { ...old, headings: projected.headings.map(h => h.text).join(' '), excerpt: plain.slice(0, 2000), body: long.length ? plain : plain.slice(0, 16000) };
    for (const s of oldSections) if (!nextSections.some(n => n.anchor === s.anchor)) report.missingAnchors.push({ route, anchor: s.anchor });
    const sectionText = nextSections.map(s => s.heading + '\n' + s.body).join('\n');
    for (const m of projected.body.matchAll(/`([^`\n]+)`/g)) {
      if (!/[\d#*+<>=]/.test(m[1])) continue;
      report.technicalLiterals++;
      if (!sectionText.includes(m[1]) && !next.body.includes(m[1])) throw new Error(`${route}: technisches Literal verloren: ${m[1]}`);
    }
    if (JSON.stringify(old) !== JSON.stringify(next) || JSON.stringify(oldSections) !== JSON.stringify(nextSections)) report.changedRoutes.push(route);
    replacements.set(route, next); chunks.set(route, nextSections); report.imported.push(route);
  }
  if (report.missingAnchors.length) throw new Error(`Bestehende Anker fehlen: ${JSON.stringify(report.missingAnchors)}`);
  for (const a of articles) if (!replacements.has(a.route)) {
    if (!a.route.startsWith('/anleitungen?open=')) throw new Error(`Nicht zugeordnete Route: ${a.route}`);
    report.unchangedExports.push(a.route);
  }
  const nextArticles = articles.map(a => replacements.get(a.route) || a);
  const seen = new Set();
  const nextSections = sections.flatMap(s => {
    if (!chunks.has(s.route)) return [s];
    if (seen.has(s.route)) return [];
    seen.add(s.route); return chunks.get(s.route);
  });
  if (seen.size !== chunks.size) throw new Error('Wiki-Artikel ohne bisherigen Abschnittsplatz.');
  return { articles: nextArticles, sections: nextSections, report };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const value = flag => args[args.indexOf(flag) + 1];
  const out = args.includes('--output-dir') ? path.resolve(value('--output-dir')) : null;
  const reportPath = args.includes('--report') ? path.resolve(value('--report')) : null;
  const write = args.includes('--write');
  const allowed = new Set(['--write', '--check', '--output-dir', '--report']);
  for (let i = 0; i < args.length; i++) {
    if (!allowed.has(args[i])) throw new Error(`Unbekanntes Argument: ${args[i]}`);
    if (['--output-dir', '--report'].includes(args[i]) && (!args[++i] || args[i].startsWith('--'))) throw new Error('Dateipfad fehlt.');
  }
  if (write && (out || args.includes('--check'))) throw new Error('--write, --check und --output-dir sind getrennte Betriebsarten.');
  const result = gesamtStand();
  if (out || write) {
    const target = out || path.join(REPO, 'app/data');
    fs.mkdirSync(target, { recursive: true });
    fs.writeFileSync(path.join(target, 'artikel.json'), JSON.stringify(result.articles));
    fs.writeFileSync(path.join(target, 'sektionen.json'), JSON.stringify(result.sections));
  } else if (result.report.changedRoutes.length) process.exitCode = 1;
  if (reportPath) { fs.mkdirSync(path.dirname(reportPath), { recursive: true }); fs.writeFileSync(reportPath, JSON.stringify(result.report, null, 2) + '\n'); }
  console.log(JSON.stringify({ wikiFiles: result.report.wikiFiles, imported: result.report.imported.length, excludedInternal: result.report.excludedInternal.length, preservedPdfExports: result.report.unchangedExports.length, articles: result.articles.length, sections: result.sections.length, changedRoutes: result.report.changedRoutes.length, longSectionsPreserved: result.report.longSectionsPreserved, technicalLiterals: result.report.technicalLiterals }, null, 2));
}
