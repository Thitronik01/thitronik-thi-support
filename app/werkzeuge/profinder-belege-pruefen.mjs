// Prüft die dokumentierten Supportfälle gegen die ausgelieferten RAG-Module.
// Kein Modellaufruf, keine behauptete Bewertung generierter Antworten.
// node app/werkzeuge/profinder-belege-pruefen.mjs [--ergebnis <datei>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ARTIKEL from '../data/artikel.mjs';
import SEKTIONEN from '../data/sektionen.mjs';
import { buildRetrievalQuery, searchWiki, searchSections, normalizeSearch } from '../netlify/functions/lib/search-core.js';
import { artikelKontext } from '../netlify/functions/lib/kontext.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--ergebnis')) {
  throw new Error('Aufruf: profinder-belege-pruefen.mjs [--ergebnis <datei>]');
}
const results = [];
for (const lang of ['de', 'fr']) {
  const gold = JSON.parse(fs.readFileSync(path.join(repo, `daten/thi-eval-profinder.${lang}.json`), 'utf8'));
  for (const c of gold.cases) {
    if (!c.kontext_muss?.length) throw new Error(`${c.id}: keine Kontext-Erwartung`);
    const query = buildRetrievalQuery(c.question);
    const hits = searchWiki(ARTIKEL, query, { canViewInternal: false }, lang, 14);
    const rank = hits.findIndex((a) => c.expected.includes(a.route));
    // Wie chat.mjs: erste zwei Quellen 6000 Zeichen, weitere 1400 Zeichen.
    // Dieser gezielte Lauf verwendet den Basisbestand ohne Fall-/Admin-Gewichtung.
    const context = rank >= 0 && rank < 8 ? artikelKontext(hits[rank], SEKTIONEN, query, { limit: rank < 2 ? 6000 : 1400 }) : '';
    const missing = c.kontext_muss.filter((s) => !normalizeSearch(context).includes(normalizeSearch(s)));
    // Search normalization removes punctuation. Executable SMS examples must
    // additionally survive ingestion byte-for-byte, including * and #.
    const missingExact = (c.kontext_exakt || []).filter((s) => !context.includes(s));
    const sections = searchSections(SEKTIONEN, query, { canViewInternal: false }, lang, 6);
    const linked = sections.some((s) => c.expected.includes(s.route) && s.anchor);
    const pass = rank >= 0 && rank < 3 && !missing.length && !missingExact.length && linked;
    const result = { lang, id: c.id, pass, articleRank: rank < 0 ? null : rank + 1, linkedSection: linked, missing, missingExact, source: c.source };
    results.push(result);
    console.log(`${pass ? 'OK' : 'FEHLT'} ${lang}/${c.id}: Artikel ${result.articleRank ?? 'fehlt'}, Beleganker ${linked ? 'ja' : 'nein'}${missing.length ? `, fehlend: ${missing.join(' | ')}` : ''}${missingExact.length ? `, SMS-Zeichen fehlen: ${missingExact.join(' | ')}` : ''}`);
  }
}
const report = { checkedAt: new Date().toISOString(), mode: 'retrieval-only', liveModelEvaluated: false, total: results.length, passed: results.filter((x) => x.pass).length, cases: results };
if (args[0] === '--ergebnis') fs.writeFileSync(path.resolve(args[1]), JSON.stringify(report, null, 2) + '\n', 'utf8');
console.log(`${report.passed}/${report.total} Belegprüfungen bestanden; kein Live-Modelltest.`);
if (report.passed !== report.total) process.exitCode = 1;
