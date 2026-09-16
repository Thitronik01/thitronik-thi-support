#!/usr/bin/env node
// ============================================================================
// Agentic-THI-Abnahme (Stufe 2): prüft die Tool-Ausführung (lib/thi-tools.js)
// gegen den echten Runtime-Suchindex UND – wenn Anymize-Keys in .env.local
// stehen – einen echten End-to-End-Tool-Loop über den llm-anonymous-Endpoint.
//   node scripts/thi-tools-check.mjs
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { executeThiTool, THI_TOOL_DEFINITIONS } from '../lib/thi-tools.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEALER = { canViewInternal: false };
const INTERN = { canViewInternal: true };

let pass = 0; let fail = 0;
const check = (label, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
  ok ? pass++ : fail++;
};

// ── 1) Tool-Ausführung offline ──────────────────────────────────────────────
const such = executeThiTool('wiki_suchen', JSON.stringify({ query: 'Handsender anlernen WiPro III' }), DEALER);
check('wiki_suchen liefert Treffer', /\[\d\].+\(\/de\/|\[\d\].+\(\/anleitungen/.test(such), such.split('\n')[0]?.slice(0, 70));

const lesen = executeThiTool('artikel_lesen', JSON.stringify({ route: '/de/wipro-iii' }), DEALER);
check('artikel_lesen /de/wipro-iii liefert Volltext', lesen.includes('wipro') || /WiPro/i.test(lesen), `${lesen.length} Zeichen`);

const faqLesen = executeThiTool('artikel_lesen', JSON.stringify({ route: '/anleitungen?open=faq-fragen-zu-wipro-iii' }), DEALER);
check('artikel_lesen liest FAQ-PDF-Eintrag', /CR2032|easy-add|Zulassung|R10/i.test(faqLesen), `${faqLesen.length} Zeichen`);

const leer = executeThiTool('wiki_suchen', JSON.stringify({ query: 'xyzqwklm' }), DEALER);
check('wiki_suchen ohne Treffer gibt Hinweis statt Crash', /Keine Treffer/i.test(leer));

const badArgs = executeThiTool('wiki_suchen', '{kaputt', DEALER);
check('kaputte Argumente → Fehlertext statt Exception', /Fehler/i.test(badArgs));

const unknown = executeThiTool('rm_rf', '{}', DEALER);
check('unbekanntes Tool → Fehlertext', /Unbekanntes Tool/i.test(unknown));

// Interne Sichtbarkeit: ein internes PDF darf Händler-Sicht NICHT als Volltext bekommen.
const internId = '/anleitungen?open=faq-nur-interner-gebrauch-pro-finder-befehle-abv9-1-v1-1';
const internDealer = executeThiTool('artikel_lesen', JSON.stringify({ route: internId }), DEALER);
const internAdmin = executeThiTool('artikel_lesen', JSON.stringify({ route: internId }), INTERN);
check('internes PDF für Händler verborgen', /Kein Eintrag/i.test(internDealer));
check('internes PDF für Admin lesbar', !/Kein Eintrag/i.test(internAdmin) && internAdmin.length > 40);

check('Tool-Definitionen vollständig', ['wiki_suchen', 'artikel_lesen'].every((n) => THI_TOOL_DEFINITIONS.some((t) => t.function?.name === n)) && THI_TOOL_DEFINITIONS.every((t) => t.function?.name));

// ── 2) Echter Tool-Loop gegen Anymize (nur wenn Keys vorhanden) ─────────────
function readEnv() {
  const p = path.join(ROOT, '.env.local');
  if (!existsSync(p)) return {};
  const map = {};
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_]+)\s*=\s*"?([^"]*)"?\s*$/);
    if (m) map[m[1]] = m[2];
  }
  return map;
}

const env = readEnv();
const URL = env.Anymize_API_URL || env.ANYMIZE_API_URL;
const KEY = env.Anymize_API_KEY || env.ANYMIZE_API_KEY;
const MODEL = env.THI_MODEL || 'anthropic/claude-sonnet-4.6';

if (!URL || !KEY) {
  console.log('\n(Übersprungen: kein Anymize-Key in .env.local — Offline-Checks gelten.)');
} else {
  const SYS = 'Du bist Thi. Nutze wiki_suchen/artikel_lesen, wenn dir Detailwissen fehlt. Antworte knapp auf Deutsch und nenne am Ende Quellen.';
  const messages = [
    { role: 'system', content: SYS },
    { role: 'user', content: 'Welche Knopfzelle gehört in den Funk-Handsender 868 und worauf muss ich beim Wechsel achten?' },
  ];
  const callsSeen = [];
  let finalText = '';
  try {
    for (let hop = 0; hop < 4; hop++) {
      const useTools = hop < 3;
      const res = await fetch(URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({ model: MODEL, max_tokens: 700, messages, ...(useTools ? { tools: THI_TOOL_DEFINITIONS, tool_choice: 'auto' } : {}) }),
      });
      if (!res.ok) { console.log(`FAIL  Anymize-Aufruf hop ${hop}: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`); fail++; break; }
      const msg = (await res.json())?.choices?.[0]?.message || {};
      const calls = msg.tool_calls || [];
      if (useTools && calls.length) {
        messages.push({ role: 'assistant', content: msg.content || '', tool_calls: calls });
        const blocks = calls.map((tc) => {
          callsSeen.push(tc.function?.name);
          const out = executeThiTool(tc.function?.name, tc.function?.arguments, DEALER);
          return `[TOOL-ERGEBNIS ${tc.function?.name}(${tc.function?.arguments})]\n${out}`;
        });
        messages.push({ role: 'user', content: `${blocks.join('\n\n')}\n\nBeantworte jetzt die Frage.` });
        continue;
      }
      finalText = String(msg.content || '').trim();
      break;
    }
    check('E2E: Modell rief mind. ein Tool auf', callsSeen.length >= 1, `Tools: ${callsSeen.join(', ') || '—'}`);
    check('E2E: finale Antwort nennt CR2032', /CR2032/i.test(finalText), finalText.slice(0, 120).replace(/\n/g, ' '));
    console.log('\n--- Finale Antwort ---\n' + finalText + '\n----------------------');
  } catch (e) {
    check('E2E-Tool-Loop ohne Exception', false, String(e.message || e));
  }
}

console.log(`\n${pass} PASS, ${fail} FAIL`);
process.exit(fail ? 1 : 0);
