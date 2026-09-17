#!/usr/bin/env node
// ============================================================================
// Deploy-Prüfung — beantwortet eine Frage: Kann das so hochgeladen werden?
// ----------------------------------------------------------------------------
//     node werkzeuge/deploy-pruefen.mjs
//
// Geprüft wird, was beim Hochladen tatsächlich schiefgehen kann, in der
// Reihenfolge des Schadens:
//
//   1. Geheimnisse   — wandert ein Schlüssel mit ins Deploy-Paket?
//   2. Wissensbasis  — sind die Daten da, vollständig und aktuell?
//   3. Functions     — laden sie überhaupt?
//   4. netlify.toml  — zeigen Verzeichnisse und Routen ins Leere?
//   5. Frontend      — fehlt eine referenzierte Datei? Blockt die CSP eigene?
//   6. Ordner        — liegt etwas darin, das nicht hochgeladen gehört?
//
// FEHLER heißt: nicht hochladen. WARNUNG heißt: ansehen und entscheiden.
// Exit 1, sobald ein FEHLER vorliegt — damit taugt das Skript auch als Gate.
//
// Was dieses Skript NICHT kann: die Netlify-Umgebungsvariablen prüfen. Die
// leben im Dashboard. Dafür gibt es nach dem Deploy /api/health?live=1 —
// erst diese beiden Schritte zusammen ergeben eine vollständige Prüfung.
// ============================================================================

import { readFileSync, existsSync, readdirSync, lstatSync, readlinkSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const WURZEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

let fehler = 0;
let warnungen = 0;
const melde = {
  ok: (t, d = '') => console.log(`  OK      ${t}${d ? `\n            ${d}` : ''}`),
  warn: (t, d = '') => { warnungen += 1; console.log(`  WARNUNG ${t}${d ? `\n            ${d}` : ''}`); },
  fehler: (t, d = '') => { fehler += 1; console.log(`  FEHLER  ${t}${d ? `\n            ${d}` : ''}`); },
  info: (t) => console.log(`          ${t}`),
};

const lies = (p) => readFileSync(path.join(WURZEL, p), 'utf8');
const da = (p) => existsSync(path.join(WURZEL, p));

// Alle Dateien einsammeln, die beim Drag & Drop mitgingen. Symlinks und
// Junctions werden NICHT verfolgt — sonst läuft die Prüfung in fremde Ordner.
function dateienSammeln(rel = '', treffer = []) {
  const abs = path.join(WURZEL, rel);
  let eintraege;
  try { eintraege = readdirSync(abs, { withFileTypes: true }); } catch { return treffer; }
  for (const e of eintraege) {
    const kind = rel ? `${rel}/${e.name}` : e.name;
    if (e.name === 'node_modules' || e.name === '.git' || e.name === '.netlify') continue;
    let st;
    try { st = lstatSync(path.join(WURZEL, kind)); } catch { continue; }
    if (st.isSymbolicLink()) { treffer.push({ pfad: kind, verweis: true }); continue; }
    if (st.isDirectory()) dateienSammeln(kind, treffer);
    else treffer.push({ pfad: kind, groesse: st.size });
  }
  return treffer;
}
const alleDateien = dateienSammeln();

console.log('\nDeploy-Prüfung — THITRONIK Thi Support');
console.log('='.repeat(72));

// ─── 1) Geheimnisse ─────────────────────────────────────────────────────────
// Der teuerste denkbare Fehler: ein API-Schlüssel im Deploy-Paket. `.gitignore`
// hilft NUR bei Git-Deploys — beim Drag & Drop wandert der Ordnerinhalt mit.
console.log('\n1) Geheimnisse');

const GEHEIM_SCHLUESSEL = ['ANYMIZE_API_KEY', 'ANYMIZE_API_URL', 'THI_ZUGANGSWORT'];
let werte = new Map();

if (da('.env')) {
  melde.warn('.env liegt im Ordner.',
    'Vor einem Drag-&-Drop-Upload löschen oder verschieben. Bei Git-Deploy greift .gitignore.');
  for (const zeile of lies('.env').split('\n')) {
    const m = zeile.trim().match(/^([A-Z_]+)=(.*)$/);
    if (!m) continue;
    const wert = m[2].replace(/^["']|["']$/g, '').trim();
    if (GEHEIM_SCHLUESSEL.includes(m[1]) && wert) werte.set(m[1], wert);
  }
  melde.info(`darin gesetzt: ${[...werte.keys()].join(', ') || '— nichts —'}`);
} else {
  melde.ok('Keine .env im Ordner.', 'Das Paket kann keinen Schlüssel mitschleppen.');
}

// Jeden echten Wert in allen anderen Dateien suchen — zeichengenau.
const TEXTENDUNGEN = new Set(['.js', '.mjs', '.json', '.html', '.css', '.md', '.toml', '.webmanifest', '.txt', '.yml', '.yaml']);
if (werte.size) {
  let lecks = 0;
  for (const { pfad, verweis, groesse } of alleDateien) {
    if (verweis || pfad === '.env') continue;
    if (!TEXTENDUNGEN.has(path.extname(pfad))) continue;
    if (groesse > 5_000_000) continue;   // die Wissensbasis nicht Zeile für Zeile
    let inhalt;
    try { inhalt = readFileSync(path.join(WURZEL, pfad), 'utf8'); } catch { continue; }
    for (const [name, wert] of werte) {
      if (!inhalt.includes(wert)) continue;        // zeichengenau, nicht case-insensitiv
      const zeile = inhalt.split('\n').findIndex((z) => z.includes(wert)) + 1;
      if (wert.length >= 12) {
        melde.fehler(`${name} steht im Klartext in ${pfad}:${zeile}`, 'Vor dem Upload entfernen.');
        lecks += 1;
      } else {
        melde.warn(`${name} (kurzer Wert) taucht in ${pfad}:${zeile} auf`,
          'Kann Zufall sein — nachsehen. Kurze Wörter treffen leicht versehentlich.');
      }
    }
  }
  if (!lecks) melde.ok('Kein Schlüssel im Klartext in einer auslieferbaren Datei.');
}

// Das Frontend darf grundsätzlich keine Zugangsdaten enthalten: Es liegt
// öffentlich. Der Modellaufruf passiert ausschließlich in der Function.
const VERDACHT = /(?:api[_-]?key|apikey|secret|bearer\s+[A-Za-z0-9._-]{16,}|sk-[A-Za-z0-9]{16,})\s*[:=]\s*["'][^"']{8,}/i;
let frontendVerdacht = 0;
for (const { pfad, verweis } of alleDateien) {
  if (verweis || !pfad.startsWith('public/')) continue;
  if (!TEXTENDUNGEN.has(path.extname(pfad))) continue;
  const inhalt = readFileSync(path.join(WURZEL, pfad), 'utf8');
  if (VERDACHT.test(inhalt)) {
    melde.fehler(`Verdächtige Zeichenkette in ${pfad}`, inhalt.match(VERDACHT)[0].slice(0, 80));
    frontendVerdacht += 1;
  }
}
if (!frontendVerdacht) melde.ok('Im Frontend (public/) keine hinterlegten Zugangsdaten.');

// ─── 2) Wissensbasis ────────────────────────────────────────────────────────
// Der teuerste Fehler des Vorgängersystems war ein still schrumpfender Index
// (docs/01_RAG_WISSENSTRANSFER.md §1.1). Deshalb wird hier nicht nur auf
// Vorhandensein geprüft, sondern auf Umfang.
console.log('\n2) Wissensbasis');

let ARTIKEL = null;
let SEKTIONEN = null;
try {
  ARTIKEL = (await import(pathToFileURL(path.join(WURZEL, 'data/artikel.mjs')).href)).default;
  SEKTIONEN = (await import(pathToFileURL(path.join(WURZEL, 'data/sektionen.mjs')).href)).default;
} catch (e) {
  melde.fehler('data/artikel.mjs oder data/sektionen.mjs lässt sich nicht laden.', e.message);
}

if (Array.isArray(ARTIKEL) && Array.isArray(SEKTIONEN)) {
  const proSprache = {};
  for (const a of ARTIKEL) proSprache[a.lang] = (proSprache[a.lang] || 0) + 1;
  const laengen = ARTIKEL.map((a) => String(a.body || '').length);
  const schnitt = Math.round(laengen.reduce((x, y) => x + y, 0) / (laengen.length || 1));
  const leer = ARTIKEL.filter((a) => !String(a.body || '').trim()).length;

  if (ARTIKEL.length < 50) melde.fehler(`Nur ${ARTIKEL.length} Artikel — das ist zu wenig, der Ingest hat verloren.`);
  else melde.ok(`${ARTIKEL.length} Artikel, ${SEKTIONEN.length} Abschnitte.`,
    `Sprachen: ${Object.entries(proSprache).map(([k, v]) => `${k} ${v}`).join(', ')} · Ø ${schnitt} Zeichen`);

  // Textlose Einträge sind nicht automatisch ein Ingest-Fehler: Bildlastige
  // Marketing-PDFs haben schlicht nichts zu extrahieren. Deshalb werden sie
  // benannt statt nur gezählt — sonst ruft die Meldung bei jedem Lauf „Wolf".
  if (leer) {
    const leereRouten = ARTIKEL.filter((a) => !String(a.body || '').trim()).map((a) => a.route);
    melde.warn(`${leer} von ${ARTIKEL.length} Artikeln ohne Text.`,
      `${leereRouten.slice(0, 4).join(', ')}${leereRouten.length > 4 ? ' …' : ''}\n            `
      + 'Bei bildlastigen PDFs normal. Bei einem Technikartikel dagegen ein Ingest-Fehler.');
  }
  if (schnitt < 2000) melde.warn(`Durchschnittliche Textlänge nur ${schnitt} Zeichen.`,
    'Beim Vorgänger war genau das das Zeichen für stillen Textverlust.');

  // Sind die importierten .mjs so aktuell wie die lesbaren .json?
  for (const name of ['artikel', 'sektionen']) {
    const j = path.join(WURZEL, `data/${name}.json`);
    const m = path.join(WURZEL, `data/${name}.mjs`);
    if (existsSync(j) && existsSync(m) && statSync(j).mtimeMs > statSync(m).mtimeMs + 1000) {
      melde.warn(`data/${name}.json ist neuer als data/${name}.mjs.`,
        'Ausgeliefert wird die .mjs — `node werkzeuge/daten-bauen.mjs` erneut laufen lassen.');
    }
  }

  // Support-Korrekturen: Beide Dateien werden von der Function in EINEM Commit
  // geschrieben, müssen also inhaltsgleich sein — mtime reicht hier nicht,
  // weil ein Git-Checkout beide Dateien zur selben Sekunde anlegt.
  try {
    const j = path.join(WURZEL, 'data/korrekturen.json');
    const m = path.join(WURZEL, 'data/korrekturen.mjs');
    if (!existsSync(j) || !existsSync(m)) {
      melde.fehler('data/korrekturen.json oder data/korrekturen.mjs fehlt.', 'chat.mjs importiert die .mjs — `node werkzeuge/daten-bauen.mjs` legt beide an.');
    } else {
      const ausJson = JSON.parse(lies('data/korrekturen.json') || '[]');
      const ausMjs = (await import(pathToFileURL(m).href)).default;
      if (JSON.stringify(ausJson) !== JSON.stringify(ausMjs)) {
        melde.fehler('data/korrekturen.mjs weicht von data/korrekturen.json ab.', '`node werkzeuge/daten-bauen.mjs` erneut laufen lassen.');
      } else {
        const proStatus = {};
        for (const k of ausJson) proStatus[k.status] = (proStatus[k.status] || 0) + 1;
        melde.ok(`${ausJson.length} Support-Korrektur(en).`,
          ausJson.length ? Object.entries(proStatus).map(([k, v]) => `${k} ${v}`).join(', ') : '');
      }
    }
  } catch (e) {
    melde.fehler('data/korrekturen.* lässt sich nicht lesen.', e.message);
  }
}

// ─── 3) Functions ───────────────────────────────────────────────────────────
console.log('\n3) Functions');
for (const name of ['chat', 'health', 'korrektur', 'auth']) {
  const rel = `netlify/functions/${name}.mjs`;
  if (!da(rel)) { melde.fehler(`${rel} fehlt.`); continue; }
  try {
    const modul = await import(pathToFileURL(path.join(WURZEL, rel)).href);
    if (typeof modul.default !== 'function') melde.fehler(`${rel} hat keinen Default-Export als Funktion.`);
    else melde.ok(`${rel} lädt und exportiert einen Handler.`);
  } catch (e) {
    melde.fehler(`${rel} lässt sich nicht laden.`, e.message);
  }
}

// ─── 4) netlify.toml ────────────────────────────────────────────────────────
console.log('\n4) netlify.toml');
if (!da('netlify.toml')) {
  melde.fehler('netlify.toml fehlt.', 'Ohne sie kennt Netlify weder publish-Ordner noch Routen.');
} else {
  const toml = lies('netlify.toml');
  const publish = toml.match(/publish\s*=\s*"([^"]+)"/)?.[1];
  const funcDir = toml.match(/directory\s*=\s*"([^"]+)"/)?.[1];

  if (!publish) melde.fehler('Kein publish-Verzeichnis gesetzt.');
  else if (!da(publish)) melde.fehler(`publish-Verzeichnis "${publish}" existiert nicht.`);
  else melde.ok(`publish = "${publish}" vorhanden.`);

  if (!funcDir) melde.warn('Kein Functions-Verzeichnis gesetzt.');
  else if (!da(funcDir)) melde.fehler(`Functions-Verzeichnis "${funcDir}" existiert nicht.`);
  else melde.ok(`Functions-Verzeichnis "${funcDir}" vorhanden.`);

  // Jede Route muss auf eine Datei zeigen, die es gibt.
  const ziele = [...toml.matchAll(/to\s*=\s*"\/\.netlify\/functions\/([A-Za-z0-9_-]+)"/g)].map((m) => m[1]);
  const fehlend = ziele.filter((z) => !da(`${funcDir || 'netlify/functions'}/${z}.mjs`));
  if (fehlend.length) melde.fehler(`Redirect zeigt auf fehlende Function: ${fehlend.join(', ')}`);
  else if (ziele.length) melde.ok(`${ziele.length} Function-Routen zeigen auf vorhandene Dateien (${ziele.join(', ')}).`);

  if (/\btimeout\s*=/.test(toml)) {
    melde.warn('netlify.toml enthält einen timeout-Schlüssel.',
      'Den gibt es dort nicht — die Function-Laufzeit wird im Dashboard eingestellt.');
  }
  if (!/NODE_VERSION/.test(toml)) {
    melde.warn('Keine NODE_VERSION festgelegt.', 'Ohne Festlegung entscheidet die Plattform-Voreinstellung.');
  }
}

// ─── 5) Frontend ────────────────────────────────────────────────────────────
// Ein fehlendes Asset merkt man lokal nicht, wenn der Browser es noch im Cache
// hat — nach dem Deploy dagegen sofort.
console.log('\n5) Frontend');
if (!da('public/index.html')) {
  melde.fehler('public/index.html fehlt.');
} else {
  const html = lies('public/index.html');
  const verweise = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);

  const lokal = verweise.filter((v) => v.startsWith('/') && !v.startsWith('//'));
  const fehlendeDateien = [...new Set(lokal)].filter((v) => !da(path.join('public', v.split('?')[0])));
  if (fehlendeDateien.length) melde.fehler(`Referenzierte Datei(en) fehlen in public/: ${fehlendeDateien.join(', ')}`);
  else melde.ok(`Alle ${new Set(lokal).size} lokal referenzierten Dateien sind vorhanden.`);

  // Externe Hosts gegen die CSP halten — eine CSP, die eigene Ressourcen
  // blockiert, fällt erst im Betrieb auf.
  const csp = da('netlify.toml') ? (lies('netlify.toml').match(/Content-Security-Policy\s*=\s*"([^"]+)"/)?.[1] || '') : '';
  const externeHosts = [...new Set(verweise
    .filter((v) => v.startsWith('http'))
    .map((v) => { try { return new URL(v).origin; } catch { return null; } })
    .filter(Boolean))];
  if (!csp) {
    melde.warn('Keine Content-Security-Policy gesetzt.');
  } else {
    const blockiert = externeHosts.filter((h) => !csp.includes(new URL(h).host));
    if (blockiert.length) melde.fehler(`CSP erlaubt diese von index.html geladenen Hosts nicht: ${blockiert.join(', ')}`);
    else melde.ok(`CSP deckt alle ${externeHosts.length} externen Hosts ab.`,
      externeHosts.join(', ') || 'keine externen Hosts');
  }
}

// Doppelt kodierte Umlaute erkennen. Passiert beim Bearbeiten mit einem
// Werkzeug, das die Datei als Windows-1252 liest und als UTF-8 zurückschreibt:
// Aus einem Gedankenstrich werden drei Zeichen Buchstabensalat. Lokal sieht man
// es oft nicht, auf der ausgelieferten Seite sofort.
//
// Erkannt wird die Bytefolge C3 83 — in korrektem deutschem UTF-8 kommt sie
// praktisch nie vor, in doppelt kodiertem Text dagegen bei jedem Umlaut.
// Bewusst als BYTES geprüft und nirgends als Zeichen hingeschrieben: Sonst
// würde diese Datei sich selbst melden.
const kaputtKodiert = [];
for (const { pfad, verweis, groesse } of alleDateien) {
  if (verweis || !TEXTENDUNGEN.has(path.extname(pfad))) continue;
  if (groesse > 5_000_000) continue;
  const roh = readFileSync(path.join(WURZEL, pfad));
  for (let i = 0; i < roh.length - 1; i += 1) {
    if (roh[i] === 0xC3 && roh[i + 1] === 0x83) { kaputtKodiert.push(pfad); break; }
  }
}
if (kaputtKodiert.length) {
  melde.fehler(`Doppelt kodierte Umlaute in ${kaputtKodiert.length} Datei(en): ${kaputtKodiert.slice(0, 5).join(', ')}`,
    'Die Datei wurde mit falscher Kodierung gespeichert. Auf der Seite erscheint Buchstabensalat.');
} else {
  melde.ok('Keine doppelt kodierten Umlaute — alle Textdateien sauberes UTF-8.');
}

// ─── 6) Was sonst noch mit hochginge ────────────────────────────────────────
console.log('\n6) Ordnerinhalt');
const verweise = alleDateien.filter((d) => d.verweis);
if (verweise.length) {
  const kaputt = verweise.filter((d) => !existsSync(path.join(WURZEL, d.pfad)));
  melde.warn(`${verweise.length} Symlink(s)/Junction(s) im Ordner, davon ${kaputt.length} ins Leere zeigend.`,
    'Beim Drag & Drop können sie den Upload stören. Sie gehören nicht ins Deployment.');
  for (const v of verweise.slice(0, 5)) {
    let ziel = '?';
    try { ziel = readlinkSync(path.join(WURZEL, v.pfad)); } catch { /* egal */ }
    melde.info(`${v.pfad} → ${ziel}${existsSync(path.join(WURZEL, v.pfad)) ? '' : '   (ZIEL FEHLT)'}`);
  }
  if (verweise.length > 5) melde.info(`… und ${verweise.length - 5} weitere`);
} else {
  melde.ok('Keine Symlinks oder Junctions im Ordner.');
}

// Entwicklungs-Beiwerk, das beim Drag & Drop mit hochginge: Agenten-Skills,
// Editor-Konfiguration, Sperrdateien. Ausgeliefert wird davon nichts (nur
// public/ geht online), aber im Deploy-Paket hat es nichts verloren.
const BEIWERK = ['.agents', '.claude', 'skills-lock.json', '.vscode', '.idea'];
const gefundenesBeiwerk = BEIWERK.filter((b) => da(b));
if (gefundenesBeiwerk.length) {
  melde.warn(`Entwicklungs-Beiwerk im Ordner: ${gefundenesBeiwerk.join(', ')}`,
    'Vor einem Drag-&-Drop-Upload entfernen oder verschieben. Bei Git-Deploy greift .gitignore.');
} else {
  melde.ok('Kein Entwicklungs-Beiwerk im Ordner.');
}

const gesamtMB = alleDateien.reduce((s, d) => s + (d.groesse || 0), 0) / 1024 / 1024;
const jsonMB = alleDateien.filter((d) => /^data\/.*\.json$/.test(d.pfad))
  .reduce((s, d) => s + (d.groesse || 0), 0) / 1024 / 1024;
melde.ok(`Paketgröße ${gesamtMB.toFixed(1)} MB.`,
  jsonMB > 1
    ? `Davon ${jsonMB.toFixed(1)} MB data/*.json — nur die lesbare Zwischenstufe. Ausgeliefert wird die .mjs; die .json kann für den Upload wegbleiben.`
    : '');

// ─── Ergebnis ───────────────────────────────────────────────────────────────
console.log(`\n${'='.repeat(72)}`);
if (fehler) {
  console.log(`NICHT HOCHLADEN — ${fehler} Fehler${warnungen ? `, ${warnungen} Warnung(en)` : ''}.`);
  console.log('Erst die Fehler beheben, dann erneut prüfen.');
  process.exit(1);
}
console.log(warnungen
  ? `Bereit zum Hochladen — ${warnungen} Warnung(en), keine Fehler.`
  : 'Bereit zum Hochladen — keine Fehler, keine Warnungen.');
console.log('\nDanach nicht vergessen:');
console.log('  1. Umgebungsvariablen in Netlify setzen (ANYMIZE_API_URL, ANYMIZE_API_KEY,');
console.log('     THI_MODEL, THI_ZUGANGSWORT) — sie stehen NICHT im Paket.');
console.log('  2. /api/health?live=1 mit dem Header x-zugangswort aufrufen (curl, siehe');
console.log('     README). Das prüft in einem Schritt, ob die Wissensbasis in der');
console.log('     Function angekommen ist und das Modell antwortet.\n');
