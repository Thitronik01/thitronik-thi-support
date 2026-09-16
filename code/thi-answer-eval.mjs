#!/usr/bin/env node
// ============================================================================
// THI-Grounding-Eval (Antwort-Treue): Ergänzung zu scripts/thi-rag-eval.mjs.
// ----------------------------------------------------------------------------
// thi-rag-eval misst nur RETRIEVAL ("ist die Quelle im Top-8-Fenster?"). Dieses
// Skript misst, ob Thi auch faktisch KORREKT UND AUS DEM WIKI antwortet — genau
// die Lücke, die der T.S.A.-Standalone-Fall aufdeckte (Quelle gefunden, Antwort
// trotzdem falsch).
//
// Vorgehen: Es bildet den ECHTEN Client-Fluss nach (gleicher Kontext wie
// app/thi/page.js: searchWiki Top-8 + extractSnippet) und ruft den LAUFENDEN
// /api/thi-Endpunkt auf. Pro Fall wird die Antwort gegen das Gold-Set geprüft:
//   antwort_muss        → ALLE Substrings müssen vorkommen
//   antwort_darf_nicht  → KEINER der Substrings darf vorkommen (die Falle)
//
// Voraussetzung: laufender Dev-Server, am einfachsten `thitronik-dev-local-auth`
// (Port 3011, THI_REQUIRE_AUTH=false). Ziel-URL via THI_EVAL_URL überschreibbar.
//
//   node scripts/thi-answer-eval.mjs [--verbose] [--min <prozent>] [--limit <n>]
//
// Ohne --min ist es ein Report (Exit 0); mit Schwelle ein Gate (Exit 1 bei Unterschreitung).
// Hinweis: Pro Frage ein echter Modell-Aufruf (Anymize) → mehrere Sekunden je Fall.
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { searchWiki, buildRetrievalQuery, extractSnippet } from '../lib/search-core.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ENDPOINT = process.env.THI_EVAL_URL || 'http://localhost:3011/api/thi';
const ACCESS = { canViewInternal: false }; // Händler-Sicht wie im echten Einsatz
const LANG = 'de';

const args = process.argv.slice(2);
const VERBOSE = args.includes('--verbose');
const JUDGE = args.includes('--judge'); // LLM-Judge statt sprödem Substring-Matching
const num = (flag) => { const i = args.indexOf(flag); return i >= 0 ? Number(args[i + 1]) : null; };
const MIN = num('--min');
const LIMIT = num('--limit');

const goldFile = process.env.THI_GOLD_FILE
  ? path.resolve(ROOT, process.env.THI_GOLD_FILE)
  : path.join(ROOT, 'project-data', 'thi-eval-gold.de.json');
if (!existsSync(goldFile)) {
  console.error(`Gold-Set fehlt: ${goldFile}`);
  process.exit(1);
}
let cases = JSON.parse(readFileSync(goldFile, 'utf8')).cases || [];
if (LIMIT) cases = cases.slice(0, LIMIT);
const index = JSON.parse(readFileSync(path.join(ROOT, 'project-data', 'runtime', 'wiki', 'search-index.public.json'), 'utf8'));

// ── LLM-Judge (optional, --judge) ───────────────────────────────────────────
// Bewertet semantisch, ob die Antwort faktisch korrekt + durch den Wiki-Beleg
// gedeckt ist — ohne spröde Substring-Begriffe (die bei Synonymen/Verneinungen
// False-Fails geben). Nutzt dasselbe Anymize-Backend wie Thi.
function loadEnvLocal() {
  const f = path.join(ROOT, '.env.local');
  if (!existsSync(f)) return;
  for (const line of readFileSync(f, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m && process.env[m[1]] == null) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  }
}
let JUDGE_URL = '', JUDGE_KEY = '', JUDGE_MODEL = '';
if (JUDGE) {
  loadEnvLocal();
  JUDGE_URL = process.env.Anymize_API_URL || process.env.ANYMIZE_API_URL || '';
  JUDGE_KEY = process.env.Anymize_API_KEY || process.env.ANYMIZE_API_KEY || '';
  JUDGE_MODEL = process.env.THI_JUDGE_MODEL || process.env.THI_MODEL || 'anthropic/claude-sonnet-4.6';
  if (!JUDGE_URL || !JUDGE_KEY) {
    console.error('--judge benötigt Anymize_API_URL/Anymize_API_KEY in .env.local');
    process.exit(1);
  }
}

const JUDGE_SYS = `Du bist ein strenger, fairer Prüfer für die FAKTISCHE Korrektheit der Antwort eines Produkt-Assistenten. Dir liegt der maßgebliche WIKI-BELEG vor (= Grundwahrheit). Bewerte AUSSCHLIESSLICH, ob die ANTWORT die in der Frage adressierte Tatsache korrekt und ohne Widerspruch zum Beleg wiedergibt. Formulierung, Synonyme, zusätzliche korrekte Details sowie Quellen-/Folgefragen-Anhänge sind IRRELEVANT. Urteile "falsch" nur, wenn die Antwort der Tatsache widerspricht, sie klar verfehlt oder fälschlich behauptet, das Wiki sage dazu nichts. Antworte als striktes JSON, NUR das Objekt: {"urteil":"korrekt"|"falsch"|"unklar","grund":"<max 15 Woerter>"}`;

async function judgeAnswer(c, answer) {
  const user =
    `FRAGE:\n${c.question}\n\n` +
    `WIKI-BELEG (Grundwahrheit):\n${c.beleg}\n\n` +
    `KERNAUSSAGE, die stimmen muss: ${(c.antwort_muss || []).join('; ')}\n` +
    `DARF NICHT behaupten: ${(c.antwort_darf_nicht || []).join('; ')}\n\n` +
    `ANTWORT DES ASSISTENTEN:\n${answer}`;
  const res = await fetch(JUDGE_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${JUDGE_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: JUDGE_MODEL,
      max_tokens: 200,
      messages: [{ role: 'system', content: JUDGE_SYS }, { role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error(`judge HTTP ${res.status}`);
  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content || '';
  const m = raw.match(/\{[\s\S]*\}/);
  if (m) { try { const j = JSON.parse(m[0]); return { urteil: j.urteil || 'unklar', grund: j.grund || '' }; } catch { /* fallthrough */ } }
  return { urteil: 'unklar', grund: raw.slice(0, 80) };
}

// Status-/Folgefragen-Marker aus dem Stream entfernen.
function cleanAnswer(text) {
  return String(text || '')
    .replace(/\[\[STATUS:[^\]]*\]\]/g, '')
    .replace(/\[\[FOLGEFRAGEN:[^\]]*\]\]/g, '')
    .trim();
}

// Baut denselben Kontext wie der Client (app/thi/page.js) und ruft /api/thi.
async function askThi(question) {
  const retrievalQuery = buildRetrievalQuery(question, []);
  const hits = searchWiki(index, retrievalQuery, ACCESS, LANG, 8);
  const context = hits.map((h) => ({
    title: h.title,
    route: h.route,
    snippet: extractSnippet(h.body || h.excerpt || '', retrievalQuery),
  }));
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: new URL(ENDPOINT).origin, // Same-Origin-Check der Route erfüllen
    },
    body: JSON.stringify({ messages: [{ role: 'user', content: question }], context }),
  });
  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${detail.slice(0, 160)}`);
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let out = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += dec.decode(value, { stream: true });
  }
  return cleanAnswer(out);
}

// ── Lauf ────────────────────────────────────────────────────────────────────
let pass = 0;
const fails = [];
const byKat = new Map();

for (const c of cases) {
  let answer = '';
  let reqError = null;
  try {
    answer = await askThi(c.question);
  } catch (e) {
    reqError = e.message;
  }
  const lc = answer.toLowerCase();
  const missing = reqError ? [] : (c.antwort_muss || []).filter((s) => !lc.includes(String(s).toLowerCase()));
  const verboten = reqError ? [] : (c.antwort_darf_nicht || []).filter((s) => lc.includes(String(s).toLowerCase()));

  // Urteil: --judge nutzt den LLM-Judge (semantisch), sonst Substring-Matching.
  let verdict = null;
  let ok;
  if (reqError) {
    ok = false;
  } else if (JUDGE) {
    try { verdict = await judgeAnswer(c, answer); }
    catch (e) { verdict = { urteil: 'unklar', grund: `judge_error: ${e.message}` }; }
    ok = verdict.urteil === 'korrekt';
  } else {
    ok = missing.length === 0 && verboten.length === 0;
  }

  const k = c.kategorie || 'fakt';
  const ks = byKat.get(k) || { n: 0, ok: 0 };
  ks.n++; if (ok) ks.ok++; byKat.set(k, ks);

  if (ok) pass++;
  else fails.push({ ...c, reqError, missing, verboten, verdict, answer: answer.slice(0, 240) });

  if (VERBOSE) {
    const mark = reqError ? 'ERR ' : ok ? 'PASS' : 'FAIL';
    const why = reqError ? ` — ${reqError}`
      : ok ? (JUDGE ? ' (Judge: korrekt)' : '')
      : JUDGE ? ` — Judge:${verdict?.urteil} (${verdict?.grund})`
      : ` — fehlt:[${missing.join(',')}] verboten:[${verboten.join(',')}]`;
    console.log(`${mark} [${c.id}] ${c.question.slice(0, 60)}${why}`);
  }
}

const total = cases.length;
const pct = total ? Math.round((pass / total) * 1000) / 10 : 0;
console.log(`\nTHI-Grounding-Eval — ${total} Fälle gegen ${ENDPOINT}` +
  (JUDGE ? ` · Modus: LLM-Judge (${JUDGE_MODEL})` : ' · Modus: Substring'));
for (const [k, s] of byKat) console.log(`  ${k.padEnd(15)} ${s.ok}/${s.n}`);
console.log(`  GESAMT Grounding-Treffer: ${pass}/${total} (${pct} %)`);

if (fails.length) {
  console.log(`\n${fails.length} Fehlschläge:`);
  for (const f of fails.slice(0, VERBOSE ? fails.length : 20)) {
    console.log(`  [${f.id}] „${f.question.slice(0, 80)}"`);
    if (f.reqError) { console.log(`     FEHLER: ${f.reqError}`); continue; }
    if (f.verdict) {
      console.log(`     Judge: ${f.verdict.urteil} — ${f.verdict.grund}`);
    } else {
      if (f.missing.length) console.log(`     fehlt in Antwort: ${f.missing.join(' | ')}`);
      if (f.verboten.length) console.log(`     VERBOTEN aufgetreten: ${f.verboten.join(' | ')}`);
    }
    console.log(`     Antwort: ${f.answer.replace(/\s+/g, ' ')}`);
  }
}

if (MIN !== null && pct < MIN) {
  console.error(`\nFAIL: Grounding ${pct} % < Schwelle ${MIN} %`);
  process.exit(1);
}
