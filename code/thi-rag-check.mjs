#!/usr/bin/env node
// ============================================================================
// THI-RAG-Abnahme (AP3 §4): prüft die Retrieval-Quick-Wins gegen den ECHTEN
// Suchindex (public/search-index.json, nach `npm run wiki:ingest`).
//   node scripts/thi-rag-check.mjs
// Abnahmekriterien:
//   1. Frage-Varianten („WiPro 3 anlernen" / „wie lerne ich einen Sender an")
//      finden denselben Artikel.
//   2. Folgefrage ohne Subjekt liefert weiter relevanten Kontext.
//   3. 0-Treffer-Frage liefert verwandte Artikel statt „weiß nicht".
// ============================================================================
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  searchWiki,
  buildRetrievalQuery,
  extractSnippet,
  findRelatedArticles,
  buildQuizRefIndex,
  matchQuizRefs,
} from '../lib/search-core.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const index = JSON.parse(readFileSync(path.join(ROOT, 'project-data/runtime/wiki/search-index.public.json'), 'utf8'));
const quizData = JSON.parse(readFileSync(path.join(ROOT, 'Quiz/dealer-quizzes.de.json'), 'utf8'));
const quizIndex = buildQuizRefIndex(quizData);
const ACCESS = { canViewInternal: false }; // Händler-Sicht

let pass = 0; let fail = 0;
const check = (label, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
  ok ? pass++ : fail++;
};
const topRoutes = (q, prev = []) =>
  searchWiki(index, buildRetrievalQuery(q, prev), ACCESS, 'de', 8).map((h) => h.route);

// 1) Varianten finden denselben Artikel
const v1 = topRoutes('WiPro 3 anlernen');
const v2 = topRoutes('wie lerne ich einen Sender an');
check('Variante A „WiPro 3 anlernen" → Top enthält wipro-iii', v1.slice(0, 3).includes('/de/wipro-iii'), `Top3: ${v1.slice(0, 3).join(', ')}`);
check('Variante B „wie lerne ich einen Sender an" → findet wipro-iii/handsender', v2.slice(0, 5).some((r) => r === '/de/wipro-iii' || r === '/de/funk-handsender'), `Top5: ${v2.slice(0, 5).join(', ')}`);
const overlap = v1.slice(0, 5).filter((r) => v2.slice(0, 5).includes(r));
check('Varianten überlappen in den Top-5', overlap.length >= 1, `Schnittmenge: ${overlap.join(', ') || '—'}`);

// Alte Schwäche belegen/vergleichen: ASCII-Umlaute
const ascii = topRoutes('Tuerkontakt anlernen');
check('ASCII-Umlaut „Tuerkontakt" findet funk-magnetkontakt', ascii.slice(0, 5).includes('/de/funk-magnetkontakt'), `Top5: ${ascii.slice(0, 5).join(', ')}`);

// 2) Folgefrage ohne Subjekt erbt Kontext
const follow = topRoutes('und wie lösche ich ihn wieder?', ['Wie lerne ich einen Funk-Handsender an der WiPro III an?']);
check('Folgefrage ohne Subjekt bleibt beim Thema', follow.slice(0, 5).some((r) => r === '/de/wipro-iii' || r === '/de/funk-handsender'), `Top5: ${follow.slice(0, 5).join(', ')}`);

// 3) 0-Treffer-Frage → verwandte Artikel
const zeroQ = 'Quietschgeräusch Spezialhalterung Wackelkontakt Dachluke';
const zeroHits = topRoutes(zeroQ);
const related = findRelatedArticles(index, buildRetrievalQuery(zeroQ, []), ACCESS, 'de', 3);
check('0-Treffer-Query liefert verwandte Artikel', related.length >= 1, `direkt: ${zeroHits.length}, verwandt: ${related.map((r) => r.route).join(', ') || '—'}`);

// 4) Quiz-wiki_refs als kuratierter Zusatzkontext
const refs = matchQuizRefs(quizIndex, buildRetrievalQuery('WiPro 3 Handsender anlernen', []), 3);
check('Quiz-wiki_refs matchen Produktfrage', refs.length >= 1, refs.map((r) => r.route).join(', ') || '—');

// 5) Passagen-Fenster: Snippet enthält die Trefferstelle (nicht nur Artikelanfang)
const wipro = index.find((it) => it.route === '/de/wipro-iii');
const snip = extractSnippet(wipro.body, 'Testalarm durchführen', 800);
check('Snippet-Fenster um „Testalarm" gelegt', /testalarm/i.test(snip) && snip.startsWith('…'), `Beginn: "${snip.slice(0, 60)}…"`);

// 6) Interne Artikel bleiben für Händler draußen (Regressionsschutz)
const internLeak = searchWiki(index, 'intern', ACCESS, 'de', 20).some((h) => h.visibility === 'internal');
check('Keine internen Artikel in Händler-Sicht', !internLeak);

console.log(`\n${pass} PASS, ${fail} FAIL`);
process.exit(fail ? 1 : 0);
