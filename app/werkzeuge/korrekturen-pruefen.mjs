// ============================================================================
// Support-Korrekturen prüfen — offline, ohne Modellaufruf.
// ----------------------------------------------------------------------------
//     node werkzeuge/korrekturen-pruefen.mjs            Bericht
//     node werkzeuge/korrekturen-pruefen.mjs --strikt   Exit 1 bei Warnungen
//
// Beantwortet Frage 2 der Entwürfe („Wie merken wir, dass jemand etwas
// Falsches eingepflegt hat?") mit dem, was sich OHNE Modell prüfen lässt:
//
//   1. Schema und Bezug — zeigt jede Korrektur auf einen existierenden
//      Artikel (und Anker)? Nach einem Wiki-Neuimport können Bezüge verwaisen.
//   2. Status ↔ Sicherheitsrelevanz — eine sicherheitsrelevante Korrektur darf
//      nie „ungeprüft" wirksam sein.
//   3. Flutung — taucht eine wirksame Korrektur bei Gold-Fragen auf, die
//      nichts mit ihrem Bezug zu tun haben? (Referenz: 1 von 41 beim
//      Testeintrag am 16.09.2026.)
//   4. Im-Wiki-Vorschlag — steht der Korrekturtext inzwischen im Wiki? Dann
//      gehört die Notiz archiviert, sonst wird sie zur zweiten Wahrheit.
//   5. Wiedervorlage — Notizen, die zu lange auf Freigabe warten.
//   6. Modul-Parität — korrekturen.mjs muss korrekturen.json entsprechen.
//
// Für die Aussage „stimmt die Korrektur fachlich?" gibt es kein Werkzeug.
// Das entscheidet die Freigabe.
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const WURZEL = path.join(HIER, '..');
const STRIKT = process.argv.includes('--strikt');

const { validiereNotiz, istSicherheitsrelevant, wirksameKorrekturen, korrekturAlsArtikel, ueberfaellige, ALLE_STATUS, STATUS, WIEDERVORLAGE_TAGE } = await import(pathToFileURL(path.join(WURZEL, 'netlify/functions/lib/korrekturen.mjs')).href);
const { searchWiki, buildRetrievalQuery, salientTerms, normalizeSearch } = await import(pathToFileURL(path.join(WURZEL, 'netlify/functions/lib/search-core.js')).href);
const ARTIKEL = (await import(pathToFileURL(path.join(WURZEL, 'data/artikel.mjs')).href)).default;
const SEKTIONEN = (await import(pathToFileURL(path.join(WURZEL, 'data/sektionen.mjs')).href)).default;

let fehler = 0;
let warnungen = 0;
const melde = {
  ok: (t, d = '') => console.log(`  OK      ${t}${d ? `\n          ${d}` : ''}`),
  warn: (t, d = '') => { warnungen += 1; console.log(`  WARNUNG ${t}${d ? `\n          ${d}` : ''}`); },
  fehler: (t, d = '') => { fehler += 1; console.log(`  FEHLER  ${t}${d ? `\n          ${d}` : ''}`); },
};

console.log('\nSupport-Korrekturen prüfen\n');

// ─── Laden ──────────────────────────────────────────────────────────────────
const jsonPfad = path.join(WURZEL, 'data/korrekturen.json');
const mjsPfad = path.join(WURZEL, 'data/korrekturen.mjs');
let liste = [];
try {
  liste = JSON.parse(fs.readFileSync(jsonPfad, 'utf8') || '[]');
  if (!Array.isArray(liste)) throw new Error('kein Array');
} catch (e) {
  melde.fehler('data/korrekturen.json lässt sich nicht lesen.', e.message);
  process.exit(1);
}
console.log(`  ${liste.length} Korrektur(en) in data/korrekturen.json\n`);

// 6) Modul-Parität
console.log('1) Modul-Parität');
try {
  const ausMjs = (await import(pathToFileURL(mjsPfad).href)).default;
  if (JSON.stringify(ausMjs) === JSON.stringify(liste)) melde.ok('korrekturen.mjs entspricht korrekturen.json.');
  else melde.fehler('korrekturen.mjs weicht von korrekturen.json ab.', '`node werkzeuge/daten-bauen.mjs` laufen lassen.');
} catch (e) {
  melde.fehler('korrekturen.mjs lässt sich nicht laden.', e.message);
}

// 1) Schema und Bezug
console.log('\n2) Schema und Bezug');
const ids = new Set();
for (const k of liste) {
  const name = `${k.id || '(ohne id)'}`;
  if (!k.id) { melde.fehler(`${name}: id fehlt.`); continue; }
  if (ids.has(k.id)) melde.fehler(`${name}: id doppelt.`);
  ids.add(k.id);
  if (!ALLE_STATUS.has(k.status)) melde.fehler(`${name}: unbekannter Status „${k.status}".`);
  const v = validiereNotiz(k, ARTIKEL);
  if (!v.ok) { melde.fehler(`${name}: ${v.fehler.join(' ')}`); continue; }
  const artikel = ARTIKEL.find((a) => a.route === k.bezug.route && a.lang === k.lang) || ARTIKEL.find((a) => a.route === k.bezug.route);
  if (!artikel) { melde.fehler(`${name}: Bezug ${k.bezug.route} existiert nicht mehr (verwaist).`); continue; }
  if (k.bezug.anchor && !SEKTIONEN.some((s) => s.route === k.bezug.route && s.anchor === k.bezug.anchor)) {
    melde.warn(`${name}: Anker #${k.bezug.anchor} in ${k.bezug.route} nicht (mehr) vorhanden.`, 'Der Artikel bleibt der Bezug; nur der Abschnittsverweis läuft ins Leere.');
  }
}
if (!liste.length) melde.ok('Keine Korrekturen — nichts zu prüfen.');
else if (!fehler) melde.ok(`Alle ${liste.length} Korrekturen haben gültiges Schema und existierenden Bezug.`);

// 2) Status ↔ Sicherheitsrelevanz
console.log('\n3) Sicherheitsrelevanz');
for (const k of liste) {
  const s = istSicherheitsrelevant(k);
  if (s.relevant && k.status === STATUS.UNGEPRUEFT) {
    melde.fehler(`${k.id}: sicherheitsrelevant, aber „ungeprüft" wirksam.`, `${s.grund} — muss „wartet-freigabe" sein oder freigegeben werden.`);
  } else if (s.relevant && !k.sicherheitsrelevant) {
    melde.warn(`${k.id}: wird heute als sicherheitsrelevant erkannt, ist aber nicht so markiert.`, s.grund);
  } else if (!s.relevant && k.sicherheitsrelevant) {
    melde.warn(`${k.id}: als sicherheitsrelevant markiert, die Sperrliste sieht das heute nicht mehr so.`, 'Harmlos — die strengere Einstufung bleibt.');
  }
}
if (liste.length && !liste.some((k) => istSicherheitsrelevant(k).relevant && k.status === STATUS.UNGEPRUEFT)) melde.ok('Keine sicherheitsrelevante Korrektur wirkt ungeprüft.');

// 3) Flutung gegen das Gold-Set
console.log('\n4) Flutung (Gold-Fragen, ohne Modell)');
const goldPfad = path.join(WURZEL, '..', 'daten', 'thi-eval-gold.de.json');
const wirksam = wirksameKorrekturen(liste);
if (!wirksam.length) melde.ok('Keine wirksame Korrektur — keine Flutung möglich.');
else if (!fs.existsSync(goldPfad)) melde.warn('Gold-Set nicht gefunden, Flutungsprüfung übersprungen.', goldPfad);
else {
  const gold = JSON.parse(fs.readFileSync(goldPfad, 'utf8')).cases || [];
  const kArtikel = wirksam.map((k) => korrekturAlsArtikel(k, ARTIKEL));
  const index = [...ARTIKEL, ...kArtikel];
  const zugang = { canViewInternal: false };
  for (const ka of kArtikel) {
    let fremd = 0;
    const beispiele = [];
    for (const c of gold) {
      const erwartet = c.expected || [];
      if (erwartet.includes(ka.korrektur.bezug.route)) continue; // passende Frage — soll sie finden
      const top = searchWiki(index, buildRetrievalQuery(c.question), zugang, 'de', 8);
      if (top.some((t) => t.route === ka.route)) { fremd += 1; if (beispiele.length < 2) beispiele.push(c.id); }
    }
    if (fremd > 3) melde.warn(`${ka.korrektur.id}: taucht bei ${fremd} fremden Gold-Fragen in den Top-8 auf.`, `z. B. ${beispiele.join(', ')} — Titel/Text zu allgemein formuliert?`);
    else melde.ok(`${ka.korrektur.id}: ${fremd} fremde Gold-Fragen in den Top-8 (Referenz ≤ 3).`);
  }
}

// 4) Im-Wiki-Vorschlag
console.log('\n5) Steht die Korrektur inzwischen im Wiki?');
let vorschlaege = 0;
for (const k of liste) {
  if (k.status === STATUS.IM_WIKI || k.status === STATUS.ZURUECK) continue;
  const artikel = ARTIKEL.find((a) => a.route === k.bezug?.route && a.lang === k.lang);
  if (!artikel) continue;
  const saetze = String(k.text).split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length >= 40);
  const body = normalizeSearch(artikel.body);
  const treffer = saetze.filter((s) => body.includes(normalizeSearch(s)));
  if (treffer.length) {
    vorschlaege += 1;
    melde.warn(`${k.id}: ${treffer.length} Satz/Sätze der Korrektur stehen wörtlich im Wiki-Artikel.`, 'Vorschlag: Status „im-wiki" setzen, damit keine zweite Wahrheit entsteht.');
  } else {
    // Weicher Hinweis: Deckt der Artikel die Begriffe der Korrektur zu über 80 % ab? Dann nur Hinweis, keine Warnung.
    const begriffe = [...new Set(salientTerms(k.text))];
    const abgedeckt = begriffe.filter((b) => body.includes(b)).length;
    if (begriffe.length >= 5 && abgedeckt / begriffe.length > 0.8) {
      console.log(`  HINWEIS ${k.id}: ${abgedeckt}/${begriffe.length} Begriffe der Korrektur kommen im Artikel vor — gegenlesen, ob sie inzwischen drinsteht.`);
    }
  }
}
if (!vorschlaege) melde.ok('Keine Korrektur, die wörtlich schon im Wiki steht.');

// 5) Wiedervorlage
console.log('\n6) Wiedervorlage');
const alt = ueberfaellige(liste);
if (alt.length) {
  for (const k of alt) melde.warn(`${k.id}: seit ${Math.round((Date.now() - new Date(k.erstellt)) / 86400000)} Tagen „${k.status}".`, `Grenze: ${WIEDERVORLAGE_TAGE} Tage. Freigeben, zurückziehen oder ins Wiki übernehmen.`);
} else melde.ok(`Keine Korrektur wartet länger als ${WIEDERVORLAGE_TAGE} Tage.`);

// ─── Ergebnis ───────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(64)}`);
console.log(`Ergebnis: ${fehler} Fehler, ${warnungen} Warnung(en)`);
if (fehler || (STRIKT && warnungen)) process.exit(1);
