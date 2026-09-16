#!/usr/bin/env node
// ============================================================================
// App-Navigations-Abnahme (Stufe 2, Schritt 1): prüft das Tool app_navigieren
// (lib/thi-tools.js + lib/thi-nav.js) — Auflösung, Deep-Links, vor allem die
// Sicherheits-Eigenschaften: nur Whitelist-Routen, Rollen-Gate, kein Existenz-
// Leak. Optional ein echter Anymize-Tool-Loop, wenn Keys in .env.local stehen.
//   node scripts/thi-nav-check.mjs
// ============================================================================
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { executeThiTool, THI_TOOL_DEFINITIONS } from '../lib/thi-tools.js';
import { NAV_TARGETS, matchNavTarget } from '../lib/thi-nav.js';
import { isAnleitungInternal } from '../lib/anleitungen-runtime.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEALER = { role: 'lernender', canViewInternal: false };
const TRAINER = { role: 'trainer', canViewInternal: true };
const ADMIN = { role: 'admin', canViewInternal: true };

let pass = 0; let fail = 0;
const check = (label, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
  ok ? pass++ : fail++;
};
const nav = (ziel, frage, access) => JSON.parse(executeThiTool('app_navigieren', JSON.stringify({ ziel, frage }), access));

// ── 1) Auflösung gängiger Absichten (Händler-Sicht) ─────────────────────────
check('zertifikate → /nachweis', nav('zertifikate', '', DEALER).route === '/nachweis');
check('arbeitskarte → /tools/arbeitskarte', nav('arbeitskarte', '', DEALER).route === '/tools/arbeitskarte');
check('kurse → /courses', nav('kurse', '', DEALER).route === '/courses');
check('lernpfade → /lernpfade', nav('lernpfade', '', DEALER).route === '/lernpfade');
check('forum → /forum', nav('forum', '', DEALER).route === '/forum');
const glossar = nav('glossar', '', DEALER);
check('glossar langScoped → /de/glossar', glossar.route === '/de/glossar', glossar.route);

// ── 2) Anleitungs-Deep-Link (Resolver) ──────────────────────────────────────
const anlGeneric = nav('anleitung', '', DEALER);
check('anleitung allgemein → Übersicht /anleitungen', anlGeneric.ok && anlGeneric.route === '/anleitungen', anlGeneric.route);
const anlWipro = nav('anleitung', 'WiPro III Installationsanleitung', DEALER);
check('anleitung + "WiPro III" → konkreter Deep-Link', anlWipro.ok && anlWipro.route.startsWith('/anleitungen?open='), anlWipro.route);

// ── 3) Rollen-Gate + KEIN Existenz-Leak (Kern-Sicherheit) ───────────────────
const notFoundMsg = (z) => `Kein passender App-Bereich zu "${z}" gefunden.`;
const adminAsDealer = nav('admin', '', DEALER);
const genuineMiss = nav('wetterbericht segeltoern', '', DEALER);
check('Admin-Ziel für Händler gesperrt (ok:false)', adminAsDealer.ok === false);
// Kein Existenz-Leak: das gesperrte Ziel liefert WORTGLEICH den generischen
// Nichttreffer-Text (nur die Nutzereingabe variiert) — eine "verboten"- oder
// "existiert, aber kein Zugriff"-Meldung würde die Existenz verraten.
check('gesperrtes Ziel == generischer Nichttreffer (kein Leak)', adminAsDealer.hinweis === notFoundMsg('admin'));
check('echter Nichttreffer nutzt dieselbe Vorlage', genuineMiss.ok === false && genuineMiss.hinweis === notFoundMsg('wetterbericht segeltoern'));
check('Händler verwalten (admin-only) für Händler gesperrt', nav('konto anlegen haendler', '', DEALER).ok === false);
check('interne Asset-Bibliothek für Händler gesperrt', nav('asset bibliothek download', '', DEALER).ok === false);

// ── 4) Privilegierte Sichten ────────────────────────────────────────────────
check('Trainer sieht Wiki-Audit (intern)', nav('audit', '', TRAINER).route === '/wiki/audit');
check('Trainer NICHT Händlerverwaltung (admin-only)', nav('haendler verwalten konten', '', TRAINER).ok === false);
check('Admin sieht /admin', nav('admin verwaltung', '', ADMIN).route === '/admin');
check('Admin sieht Editor (/de/editor)', nav('wiki-editor bearbeiten', '', ADMIN).route === '/de/editor');

// ── 5) Invarianten: nur Whitelist-Routen, nie freier Pfad ───────────────────
const allowed = new Set();
for (const t of NAV_TARGETS) allowed.add(t.langScoped ? `/de${t.route}` : t.route);
const probes = ['zertifikate', 'kurse', 'forum', 'glossar', 'admin', 'editor', '../../etc/passwd', 'http://evil.com', 'profile', 'support'];
let leaked = null;
for (const p of probes) {
  for (const acc of [DEALER, TRAINER, ADMIN]) {
    const r = nav(p, '', acc);
    if (r.ok && !r.route.startsWith('/anleitungen?open=') && !allowed.has(r.route)) { leaked = `${p}:${r.route}`; break; }
  }
  if (leaked) break;
}
check('jede ok-Route stammt aus der Whitelist (kein freier Pfad)', leaked === null, leaked || 'alle ok');
check('Pfad-Injection "../../etc/passwd" → kein Treffer', nav('../../etc/passwd', '', ADMIN).ok === false);
check('app_navigieren in Tool-Definitionen', THI_TOOL_DEFINITIONS.some((t) => t.function?.name === 'app_navigieren'));
check('matchNavTarget: Unsinn → null', matchNavTarget('quietschende dachluke') === null);

// ── 5b) Fail-closed-Sichtbarkeit (Review-Fix MED #1) ────────────────────────
check('internes PDF ohne visibility-Feld gilt als intern', isAnleitungInternal({ file: 'NUR_INTERNER_GEBRAUCH_Pro-finder.pdf' }) === true);
check('visibility:internal gilt als intern', isAnleitungInternal({ file: 'x.pdf', visibility: 'internal' }) === true);
check('normale Anleitung gilt als öffentlich', isAnleitungInternal({ file: 'wipro_iii.pdf', visibility: 'standard' }) === false);
check('Mehrwort-Stichwort "konto anlegen" trifft (admin-gated)', nav('konto anlegen', '', ADMIN).route === '/admin/users');

// ── 6) Echter Anymize-Tool-Loop (nur mit Keys) ──────────────────────────────
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
  console.log('\n(Übersprungen: kein Anymize-Key — Offline-Checks gelten.)');
} else {
  const SYS = 'Du bist Thi. Bei "Bring mich zu …"/"Öffne …"-Absichten nutze app_navigieren statt wiki_suchen und nenne dem Nutzer das Ziel-Label. Antworte knapp auf Deutsch.';
  const messages = [
    { role: 'system', content: SYS },
    { role: 'user', content: 'Bring mich bitte zu meinen Zertifikaten.' },
  ];
  const calls = [];
  let finalText = '';
  try {
    for (let hop = 0; hop < 3; hop++) {
      const useTools = hop < 2;
      const res = await fetch(URL, { method: 'POST', headers: { Authorization: `Bearer ${KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({ model: MODEL, max_tokens: 500, messages, ...(useTools ? { tools: THI_TOOL_DEFINITIONS, tool_choice: 'auto' } : {}) }) });
      if (!res.ok) { console.log(`FAIL  Anymize hop ${hop}: HTTP ${res.status}`); fail++; break; }
      const msg = (await res.json())?.choices?.[0]?.message || {};
      const tc = msg.tool_calls || [];
      if (useTools && tc.length) {
        messages.push({ role: 'assistant', content: msg.content || '', tool_calls: tc });
        const blocks = tc.map((c) => { calls.push(c.function?.name); return `[TOOL-ERGEBNIS ${c.function?.name}(${c.function?.arguments})]\n${executeThiTool(c.function?.name, c.function?.arguments, DEALER)}`; });
        messages.push({ role: 'user', content: `${blocks.join('\n\n')}\n\nNenne dem Nutzer jetzt das Ziel.` });
        continue;
      }
      finalText = String(msg.content || '').trim();
      break;
    }
    check('E2E: Modell rief app_navigieren', calls.includes('app_navigieren'), `Tools: ${calls.join(', ') || '—'}`);
    check('E2E: Antwort verweist auf Nachweis/Zertifikate', /nachweis|zertifikat/i.test(finalText), finalText.slice(0, 120).replace(/\n/g, ' '));
    console.log('\n--- Finale Antwort ---\n' + finalText + '\n----------------------');
  } catch (e) {
    check('E2E ohne Exception', false, String(e.message || e));
  }
}

console.log(`\n${pass} PASS, ${fail} FAIL`);
process.exit(fail ? 1 : 0);
