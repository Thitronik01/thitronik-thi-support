#!/usr/bin/env node
// ============================================================================
// THI-RAG-Eval (AP4/E4): misst die Retrieval-Qualität von searchWiki() gegen
// den ECHTEN Suchindex (public/search-index.json, nach `npm run wiki:ingest`).
//
// Fragenquellen:
//   (a) Quiz/dealer-quizzes.de.json — kuratierte Händler-Quizfragen; die
//       wikiRefs der Antworten gelten als erwartete Quellartikel.
//   (b) project-data/thi-eval-extra.de.json — handkuratierte Händlerfragen
//       (freie Formulierungen, FAQ-PDF-Ziele, bekannte Schwächen). Erweiterbar;
//       sobald content_luecken echte Fehlfragen liefert, dort einpflegen.
//
// Metriken (Händler-Sicht, canViewInternal=false):
//   Hit@3 — erwartete Quelle unter den ersten 3 (Quellen-Anzeige im Thi-UI)
//   Hit@8 — erwartete Quelle im RAG-Kontextfenster (Top 8 → <kontext>-Block)
//   MRR   — Mean Reciprocal Rank über alle Fragen
//
//   node scripts/thi-rag-eval.mjs [--verbose] [--min-hit8 <prozent>]
//
// Ohne --min-hit8 ist das Skript ein Report (Exit 0); mit Schwelle ein Gate.
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  searchWiki,
  searchSections,
  buildRetrievalQuery,
  buildQuizRefIndex,
  matchQuizRefs,
  mergeCuratedHits,
} from '../lib/search-core.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ACCESS = { canViewInternal: false }; // Händler-Sicht wie im Thi-Einsatz
const LANG = 'de';
const TOP_K = 8;

const args = process.argv.slice(2);
const VERBOSE = args.includes('--verbose');
const minIdx = args.indexOf('--min-hit8');
const MIN_HIT8 = minIdx >= 0 ? Number(args[minIdx + 1]) : null;
const minAnchorIdx = args.indexOf('--min-anchor8');
const MIN_ANCHOR8 = minAnchorIdx >= 0 ? Number(args[minAnchorIdx + 1]) : null;

const index = JSON.parse(readFileSync(path.join(ROOT, 'project-data/runtime/wiki/search-index.public.json'), 'utf8'));
// Abschnitts-Index (THI Abschnitts-Zitate) — für die Anker-Eval optional.
const sectionIndexPath = path.join(ROOT, 'project-data/runtime/wiki/section-index.public.json');
const sectionIndex = existsSync(sectionIndexPath) ? JSON.parse(readFileSync(sectionIndexPath, 'utf8')) : null;
const dealerQuizData = JSON.parse(readFileSync(path.join(ROOT, 'Quiz/dealer-quizzes.de.json'), 'utf8'));
const quizRefIndex = buildQuizRefIndex(dealerQuizData);

// ── (a) Quizfragen → Eval-Fälle ─────────────────────────────────────────────
// Erwartung = alle wikiRefs der Antwortoptionen (ohne Anker). Fragen ohne
// einzige Ref werden übersprungen (keine Erwartung definierbar).
function quizCases() {
  const cases = [];
  for (const quiz of dealerQuizData.quizzes || []) {
    for (const q of quiz.questions || []) {
      const expected = [...new Set(
        (q.answers || [])
          .map((a) => String(a.wikiRef || '').split('#')[0].trim())
          .filter(Boolean),
      )];
      if (expected.length === 0 || !q.prompt) continue;
      cases.push({ id: q.id, source: 'quiz', question: q.prompt, expected, history: [] });
    }
  }
  return cases;
}

// ── (b) Handkuratierte Fragen ───────────────────────────────────────────────
// Format: [{ id, question, expected: [route|substring], history?, note? }]
// Treffer-Regel: exakte Route ODER Substring in decodeURIComponent(route) —
// damit lassen sich Anleitungs-/FAQ-Einträge ("/anleitungen?open=…") ohne
// URL-Encoding-Akrobatik erwarten.
function extraCases() {
  const file = path.join(ROOT, 'project-data/thi-eval-extra.de.json');
  if (!existsSync(file)) return [];
  const data = JSON.parse(readFileSync(file, 'utf8'));
  return (data.cases || []).map((c) => ({ source: 'extra', history: [], ...c }));
}

// ── (c) Anker-Gold-Set ──────────────────────────────────────────────────────
// Multi-Agent generiert + adversarial verifiziert (scripts/wf … thi-anchor-gold).
// Jeder Fall trägt `anchor` (erwarteter Abschnitt) → fließt in Retrieval- UND
// Anker-Eval ein. Datei optional (fehlt vor dem ersten Gold-Lauf).
function anchorGoldCases() {
  const file = path.join(ROOT, 'project-data/thi-anchor-gold.de.json');
  if (!existsSync(file)) return [];
  const data = JSON.parse(readFileSync(file, 'utf8'));
  return (data.cases || [])
    .filter((c) => c.question && c.route && c.anchor)
    .map((c) => ({ source: 'anchor-gold', history: [], expected: [c.route], ...c }));
}

function routeMatches(hitRoute, expected) {
  if (hitRoute === expected) return true;
  try {
    return decodeURIComponent(hitRoute).includes(expected);
  } catch {
    return hitRoute.includes(expected);
  }
}

// ── Lauf ────────────────────────────────────────────────────────────────────
const cases = [...quizCases(), ...extraCases(), ...anchorGoldCases()];
if (cases.length === 0) {
  console.error('Keine Eval-Fälle gefunden — dealer-quizzes.de.json fehlt? Erst `npm run wiki:ingest`.');
  process.exit(1);
}

let hit3 = 0; let hit8 = 0; let mrrSum = 0;
let lexicalHit3 = 0; let lexicalHit8 = 0; let lexicalMrrSum = 0;
const misses = [];
const perSource = new Map();

for (const c of cases) {
  const retrievalQuery = buildRetrievalQuery(c.question, c.history);
  const lexicalHits = searchWiki(index, retrievalQuery, ACCESS, LANG, TOP_K);
  const lexicalRank = lexicalHits.findIndex((h) => c.expected.some((e) => routeMatches(h.route, e)));
  if (lexicalRank >= 0) {
    lexicalMrrSum += 1 / (lexicalRank + 1);
    if (lexicalRank < 3) lexicalHit3++;
    if (lexicalRank < TOP_K) lexicalHit8++;
  }
  const hits = mergeCuratedHits(
    index,
    lexicalHits,
    matchQuizRefs(quizRefIndex, retrievalQuery, 3),
    ACCESS,
    LANG,
    TOP_K,
  );
  const rank = hits.findIndex((h) => c.expected.some((e) => routeMatches(h.route, e)));
  const stat = perSource.get(c.source) || { n: 0, hit3: 0, hit8: 0 };
  stat.n++;
  if (rank >= 0) {
    mrrSum += 1 / (rank + 1);
    if (rank < 3) { hit3++; stat.hit3++; }
    if (rank < TOP_K) { hit8++; stat.hit8++; }
  } else {
    misses.push({ ...c, top3: hits.slice(0, 3).map((h) => h.route) });
  }
  perSource.set(c.source, stat);
  if (VERBOSE) {
    const mark = rank < 0 ? 'MISS ' : rank < 3 ? 'TOP3 ' : 'TOP8 ';
    console.log(`${mark} [${c.source}] ${c.question.slice(0, 70)} → ${rank < 0 ? '—' : `#${rank + 1}`}`);
  }
}

const pct = (n) => `${Math.round((n / cases.length) * 1000) / 10} %`;
console.log(`\nTHI-RAG-Eval — ${cases.length} Fragen (Händler-Sicht, Top ${TOP_K})`);
console.log(`  lexikalisch Hit@3 ${pct(lexicalHit3)} · Hit@8 ${pct(lexicalHit8)} · MRR ${Math.round((lexicalMrrSum / cases.length) * 100) / 100}`);
for (const [src, s] of perSource) {
  console.log(`  ${src.padEnd(6)} n=${String(s.n).padStart(3)}  Hit@3 ${Math.round((s.hit3 / s.n) * 100)} %  Hit@8 ${Math.round((s.hit8 / s.n) * 100)} %`);
}
console.log(`  gesamt Hit@3 ${pct(hit3)} · Hit@8 ${pct(hit8)} · MRR ${Math.round((mrrSum / cases.length) * 100) / 100}`);

if (misses.length) {
  console.log(`\n${misses.length} Misses (erwartete Quelle nicht in Top ${TOP_K}):`);
  for (const m of misses.slice(0, VERBOSE ? misses.length : 15)) {
    console.log(`  [${m.id || m.source}] „${m.question.slice(0, 80)}"`);
    console.log(`     erwartet: ${m.expected.join(' | ')}`);
    console.log(`     bekommen: ${m.top3.join(', ') || '—'}`);
  }
  if (!VERBOSE && misses.length > 15) console.log(`  … ${misses.length - 15} weitere (--verbose zeigt alle)`);
}

// ── Anker-Eval (Abschnitts-Retrieval) ───────────────────────────────────────
// Misst, ob der erwartete ABSCHNITT (route#anker) über searchSections im
// Top-Fenster landet — die Grundlage für „verweise auf die jeweilige Stelle".
// Greift für alle Fälle mit `anchor`-Feld (thi-eval-extra + thi-anchor-gold).
let anchorHit8Pct = null;
if (sectionIndex) {
  const anchorCases = cases.filter((c) => c.anchor);
  if (anchorCases.length) {
    let aHit3 = 0; let aHit8 = 0; const aMiss = [];
    const perCat = new Map();
    for (const c of anchorCases) {
      const route = (c.expected || [])[0];
      const secHits = searchSections(sectionIndex, buildRetrievalQuery(c.question, c.history), ACCESS, LANG, TOP_K);
      const rank = secHits.findIndex((s) => s.route === route && s.anchor === c.anchor);
      const cat = c.kategorie || c.source || 'sonstige';
      const cs = perCat.get(cat) || { n: 0, h8: 0 };
      cs.n++;
      if (rank >= 0) { if (rank < 3) aHit3++; if (rank < TOP_K) { aHit8++; cs.h8++; } }
      else aMiss.push({ ...c, route, top3: secHits.slice(0, 3).map((s) => `${s.route}#${s.anchor}`) });
      perCat.set(cat, cs);
    }
    const apct = (n) => `${Math.round((n / anchorCases.length) * 1000) / 10} %`;
    anchorHit8Pct = (aHit8 / anchorCases.length) * 100;
    console.log(`\nAnker-Eval — ${anchorCases.length} Fälle (Abschnitts-Retrieval, Top ${TOP_K})`);
    for (const [cat, s] of [...perCat].sort((a, b) => b[1].n - a[1].n)) {
      console.log(`  ${String(cat).padEnd(16)} n=${String(s.n).padStart(3)}  Anker-Hit@8 ${Math.round((s.h8 / s.n) * 100)} %`);
    }
    console.log(`  gesamt Anker-Hit@3 ${apct(aHit3)} · Anker-Hit@8 ${apct(aHit8)}`);
    for (const m of aMiss.slice(0, VERBOSE ? aMiss.length : 20)) {
      console.log(`  MISS [${m.id}] „${String(m.question).slice(0, 70)}" erwartet ${m.route}#${m.anchor}`);
      console.log(`     bekommen: ${m.top3.join(', ') || '—'}`);
    }
    if (!VERBOSE && aMiss.length > 20) console.log(`  … ${aMiss.length - 20} weitere (--verbose zeigt alle)`);
  }
}

let failed = false;
const hit8Pct = (hit8 / cases.length) * 100;
if (MIN_HIT8 !== null && hit8Pct < MIN_HIT8) {
  console.error(`\nFAIL: Hit@8 ${Math.round(hit8Pct)} % < Schwelle ${MIN_HIT8} %`);
  failed = true;
}
if (MIN_ANCHOR8 !== null) {
  if (anchorHit8Pct === null) {
    console.error(`\nFAIL: --min-anchor8 gesetzt, aber keine Anker-Fälle/Abschnitts-Index vorhanden.`);
    failed = true;
  } else if (anchorHit8Pct < MIN_ANCHOR8) {
    console.error(`\nFAIL: Anker-Hit@8 ${Math.round(anchorHit8Pct)} % < Schwelle ${MIN_ANCHOR8} %`);
    failed = true;
  }
}
if (failed) process.exit(1);
