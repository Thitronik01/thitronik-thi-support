// Reproduzierbarer Gesamtvergleich gegen einen expliziten Vorher-Stand.
// Keine Modellaufrufe. Historische Gold-Metriken bleiben getrennt von Belegfällen.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { buildRetrievalQuery, searchWiki, searchSections, normalizeSearch } from '../netlify/functions/lib/search-core.js';
import { artikelKontext } from '../netlify/functions/lib/kontext.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const value = (flag, fallback) => args.includes(flag) ? args[args.indexOf(flag) + 1] : fallback;
for (let i = 0; i < args.length; i += 2) if (!['--data', '--baseline', '--report'].includes(args[i]) || !args[i + 1] || args[i + 1].startsWith('--')) throw new Error('Aufruf: gesamtvergleich.mjs [--data Ordner] [--baseline Ordner] [--report Datei]');
const dataDir = path.resolve(value('--data', path.join(repo, 'app/data')));
const baselineDir = value('--baseline', null);
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const load = dir => ({ articles: read(path.join(dir, 'artikel.json')), sections: read(path.join(dir, 'sektionen.json')) });
const current = load(dataDir), before = baselineDir ? load(path.resolve(baselineDir)) : null;
const fold = s => normalizeSearch(s).replace(/\s+/g, ' ').trim();

const byRoute = new Map(current.articles.map(a => [a.route, a]));
assert.equal(byRoute.size, current.articles.length, 'Doppelte Artikelrouten');
assert.ok(current.articles.every(a => a.visibility === 'standard'), 'Interner Artikel im öffentlichen Index');
const anchors = new Set();
for (const s of current.sections) {
  const a = byRoute.get(s.route);
  assert.ok(a && a.lang === s.lang && s.visibility === a.visibility, `Abschnittszuordnung: ${s.route}`);
  assert.ok(!s.dealerHidden, 'Interner Abschnitt im öffentlichen Index');
  const key = s.route + '#' + s.anchor;
  assert.ok(!anchors.has(key), `Doppelter Anker ${key}`); anchors.add(key);
}
let integrity = { uniqueRoutes: true, uniqueAnchors: true, matchingLanguages: true, publicOnly: true };
if (before) {
  const metadata = a => Object.fromEntries(Object.entries(a).filter(([k]) => !['body', 'excerpt', 'headings', 'keywords'].includes(k)));
  assert.deepEqual(current.articles.map(metadata), before.articles.map(metadata), 'Artikelmetadaten verändert');
  for (const s of before.sections) assert.ok(anchors.has(s.route + '#' + s.anchor), `Anker verloren: ${s.route}#${s.anchor}`);
  const pdf = x => x.route.startsWith('/anleitungen?open=');
  assert.deepEqual(current.articles.filter(pdf), before.articles.filter(pdf), 'PDF-Artikel verändert');
  assert.deepEqual(current.sections.filter(pdf), before.sections.filter(pdf), 'PDF-Abschnitte verändert');
  integrity = { ...integrity, metadataPreserved: true, anchorsPreserved: true, pdfExportsPreserved: true };
}

const results = [];
for (const pack of ['fingerprint', 'wipro', 'profinder', 'gas', 'funk', 'fahrzeuge']) for (const lang of ['de', 'fr']) {
  for (const c of read(path.join(repo, `daten/thi-eval-${pack}.${lang}.json`)).cases) {
    const q = buildRetrievalQuery(c.question);
    const hits = searchWiki(current.articles, q, { canViewInternal: false }, lang, 14);
    const rank = hits.findIndex(a => c.expected.includes(a.route));
    const context = rank >= 0 && rank < 8 ? artikelKontext(hits[rank], current.sections, q, { limit: rank < 2 ? 6000 : 1400 }) : '';
    const missing = c.kontext_muss.filter(s => !normalizeSearch(context).includes(normalizeSearch(s)));
    const missingExact = (c.kontext_exakt || []).filter(s => !context.includes(s));
    const linked = searchSections(current.sections, q, { canViewInternal: false }, lang, 6).some(s => c.expected.includes(s.route) && s.anchor);
    results.push({ pack, lang, id: c.id, pass: rank >= 0 && rank < 3 && !missing.length && !missingExact.length && linked, rank: rank < 0 ? null : rank + 1, linked, missing, missingExact });
  }
}
const historical = [];
for (const lang of ['de', 'fr']) for (const c of read(path.join(repo, `daten/thi-eval-gold.${lang}.json`)).cases) {
  const q = buildRetrievalQuery(c.question);
  const measure = state => {
    const hits = searchWiki(state.articles, q, { canViewInternal: false }, lang, 8);
    const rank = hits.findIndex(a => c.expected.includes(a.route));
    const context = hits.map((a, i) => artikelKontext(a, state.sections, q, { limit: i < 2 ? 6000 : 1400 })).join('\n');
    return { rank: rank < 0 ? null : rank + 1, literal: !!c.beleg && normalizeSearch(context).includes(normalizeSearch(c.beleg)), whitespaceNormalizedLiteral: !!c.beleg && fold(context).includes(fold(c.beleg)) };
  };
  historical.push({ lang, id: c.id, ...(before ? { before: measure(before) } : {}), after: measure(current) });
}
const metrics = field => ({ hit8: historical.filter(c => c[field]?.rank).length, strictLiteral: historical.filter(c => c[field]?.literal).length, whitespaceNormalizedLiteral: historical.filter(c => c[field]?.whitespaceNormalizedLiteral).length });
const regressions = before ? historical.filter(c => (c.before.rank && !c.after.rank) || (c.before.whitespaceNormalizedLiteral && !c.after.whitespaceNormalizedLiteral)) : [];
const report = { checkedAt: new Date().toISOString(), mode: 'offline-retrieval-and-import', liveModelEvaluated: false, articles: current.articles.length, sections: current.sections.length, integrity, packageTests: { total: results.length, passed: results.filter(r => r.pass).length, byPackage: Object.fromEntries(['fingerprint', 'wipro', 'profinder', 'gas', 'funk', 'fahrzeuge'].map(pack => [pack, { total: results.filter(r => r.pack === pack).length, passed: results.filter(r => r.pack === pack && r.pass).length }])), cases: results }, historical: { total: historical.length, ...(before ? { before: metrics('before') } : {}), after: metrics('after'), regressions, cases: historical } };
const out = value('--report', null);
if (out) { fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true }); fs.writeFileSync(path.resolve(out), JSON.stringify(report, null, 2) + '\n'); }
console.log(JSON.stringify({ articles: report.articles, sections: report.sections, packageTests: { total: results.length, passed: report.packageTests.passed, failures: results.filter(r => !r.pass) }, historical: { before: report.historical.before, after: report.historical.after, regressions } }, null, 2));
if (results.some(r => !r.pass) || regressions.length) process.exitCode = 1;
