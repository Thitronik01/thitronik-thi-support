#!/usr/bin/env node
// ============================================================================
// Antwort-Eval (Grounding) — misst, ob Thi BELEGT und KORREKT antwortet.
// ----------------------------------------------------------------------------
// Die Selbsttests (`netlify/functions/lib/tests.mjs`) prüfen die Bausteine:
// Gate, Widersprüche, Sicherheitsrechnung. Sie sagen NICHTS darüber, ob die
// fertige Antwort stimmt. Genau diese Lücke ist der Auslöserfall des ganzen
// Vorgängerprojekts: Quelle gefunden, Antwort trotzdem falsch
// (../../docs/05_EVAL_UND_QUALITAET.md §1).
//
// Abgeleitet von ../../code/thi-answer-eval.mjs, aber an diese App angepasst.
// Der wesentliche Unterschied: Dort baute der CLIENT den Kontext und schickte
// ihn mit. Hier macht die Function das Retrieval selbst — der Eval schickt nur
// die Frage und misst damit die ECHTE Kette statt einer Nachbildung davon.
//
//   node werkzeuge/antwort-eval.mjs                    # Substring-Modus
//   node werkzeuge/antwort-eval.mjs --judge            # empfohlen: LLM-Judge
//   node werkzeuge/antwort-eval.mjs --judge --min 90   # als Gate (Exit 1)
//   node werkzeuge/antwort-eval.mjs --sprache fr --judge
//
// Weitere Schalter:
//   --ids a,b,c             nur diese Gold-IDs (Nachlauf einzelner Fälle)
//   --limit n               nur die ersten n Fälle
//   --ergebnis <datei>      jeden Fall sofort in diese JSON-Datei schreiben
//   --fortsetzen            mit --ergebnis: gespeicherte Fälle überspringen
//   --nur-judge             mit --ergebnis --judge: gespeicherte Antworten neu
//                           bewerten, ohne den Server zu fragen (billig —
//                           nach einer Änderung am Judge-Prompt)
//   --gold <datei>          anderes Gold-Set
//   --verbose               alle Fehlschläge im Detail (statt der ersten 20)
//
// Ein Lauf mit 41 Fällen dauert 20 Minuten und kostet echte Modellaufrufe.
// Bricht er ab (Sitzung geschlossen, Server weg), war bisher alles verloren.
// Mit --ergebnis liegt jeder fertige Fall sofort auf der Platte, und
// --fortsetzen macht dort weiter, wo es aufhörte — Bericht über alles.
//
// ⚠️ ZUR AUSSAGEKRAFT: Zwei Läufe über dasselbe Gold-Set liefern NICHT dieselbe
// Quote. Der Chat-Endpunkt legt keine feste Temperatur fest — die App
// formuliert jedes Mal etwas anders, und bei Grenzfällen kippt das Urteil. In
// der Praxis wandern drei bis vier Fälle je Lauf. Der Judge selbst läuft
// deshalb mit temperature 0; die Streuung der App bleibt.
//
// Folge: Ein Unterschied von ein bis zwei Fällen ist RAUSCHEN, kein Befund.
// Wer eine Änderung am Retrieval bewerten will, misst besser deterministisch —
// „liegt der Beleg im Kontext?" — und nimmt diesen Lauf als Grobkontrolle.
//
// Voraussetzung: laufender Server (`node dev-server.mjs`).
// ⚠️ Das Rate-Limit greift: 41 Fälle > THI_RATE_LIMIT (Standard 20 / 5 Min).
//    Server für den Lauf starten mit:
//    THI_RATE_LIMIT=999 THI_DAILY_LIMIT=9999 node dev-server.mjs
//
// Ohne --min ist es ein Bericht (Exit 0); mit Schwelle ein Gate (Exit 1).
// ============================================================================

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ARTIKEL from '../data/artikel.mjs';

const WURZEL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ─── Argumente ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const hat = (f) => args.includes(f);
const wert = (f, standard = null) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : standard; };
const zahl = (f) => { const v = wert(f); return v == null ? null : Number(v); };

const AUSFUEHRLICH = hat('--verbose');
const JUDGE = hat('--judge');
const MIN = zahl('--min');
const LIMIT = zahl('--limit');
const SPRACHE = wert('--sprache', 'de') === 'fr' ? 'fr' : 'de';
const IDS = wert('--ids') ? new Set(String(wert('--ids')).split(',').map((s) => s.trim()).filter(Boolean)) : null;
const ERGEBNIS = wert('--ergebnis') ? path.resolve(process.cwd(), wert('--ergebnis')) : null;
const NUR_JUDGE = hat('--nur-judge');
const FORTSETZEN = hat('--fortsetzen') || NUR_JUDGE;

// ─── Umgebung ───────────────────────────────────────────────────────────────
// Dieselbe schlichte .env-Lesung wie im dev-server: kein `npm install` nötig,
// damit der Eval auch in einer frischen Arbeitskopie sofort läuft. Liegt in
// app/ keine .env, gilt die des Projektordners (THI/.env) — dort liegt sie
// auf dem Entwicklungsrechner.
function envLaden() {
  const kandidaten = [path.join(WURZEL, '.env'), path.join(WURZEL, '..', '..', '.env')];
  const datei = kandidaten.find((k) => existsSync(k));
  if (!datei) return;
  for (const zeile of readFileSync(datei, 'utf8').split('\n')) {
    const t = zeile.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 1) continue;
    const schluessel = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!process.env[schluessel]) process.env[schluessel] = v;
  }
}
envLaden();

const ENDPUNKT = process.env.THI_EVAL_URL || `http://localhost:${process.env.PORT || 8888}/api/chat`;
const ZUGANGSWORT = process.env.THI_ZUGANGSWORT || '';

// ─── Gold-Set ───────────────────────────────────────────────────────────────
const goldDatei = path.resolve(WURZEL, wert('--gold')
  || process.env.THI_GOLD_FILE
  || `../daten/thi-eval-gold.${SPRACHE}.json`);

if (!existsSync(goldDatei)) {
  console.error(`Gold-Set fehlt: ${goldDatei}`);
  if (SPRACHE === 'fr') {
    console.error('Für Französisch existiert noch kein Gold-Set — siehe NAECHSTE_SCHRITTE.md,');
    console.error('„Die eine echte Lücke". Vor einem Einsatz in Frankreich ist das der erste Schritt.');
  }
  process.exit(1);
}
let faelle = JSON.parse(readFileSync(goldDatei, 'utf8')).cases || [];
if (IDS) {
  const vorhanden = new Set(faelle.map((c) => c.id));
  const fremd = [...IDS].filter((id) => !vorhanden.has(id));
  if (fremd.length) console.error(`⚠  ${fremd.length} ID(s) nicht im Gold-Set: ${fremd.join(', ')}`);
  faelle = faelle.filter((c) => IDS.has(c.id));
}
if (LIMIT) faelle = faelle.slice(0, LIMIT);
if (!faelle.length) { console.error('Keine Fälle ausgewählt.'); process.exit(1); }

// ─── Ergebnisdatei: Fortsetzen nach Abbruch ─────────────────────────────────
// Jeder fertig gemessene Fall wird SOFORT geschrieben. Ein Abbruch kostet damit
// höchstens den laufenden Fall, nicht den ganzen Lauf. Die Datei trägt Sprache
// und Modus, damit kein Substring-Lauf still in einen Judge-Lauf hineinläuft.
const MODUS = JUDGE ? 'judge' : 'substring';
let gespeichert = { faelle: {} };
if (FORTSETZEN && !ERGEBNIS) {
  console.error(`${NUR_JUDGE ? '--nur-judge' : '--fortsetzen'} braucht --ergebnis <datei>.`);
  process.exit(1);
}
if (NUR_JUDGE && (!JUDGE || !existsSync(ERGEBNIS))) {
  console.error('--nur-judge braucht --judge und eine vorhandene Ergebnisdatei.');
  process.exit(1);
}
if (ERGEBNIS && existsSync(ERGEBNIS)) {
  if (!FORTSETZEN) {
    console.error(`Ergebnisdatei existiert schon: ${ERGEBNIS}`);
    console.error('Mit --fortsetzen weitermachen oder eine andere Datei angeben.');
    process.exit(1);
  }
  try { gespeichert = JSON.parse(readFileSync(ERGEBNIS, 'utf8')); } catch { gespeichert = { faelle: {} }; }
  gespeichert.faelle = gespeichert.faelle || {};
  if (gespeichert.sprache && gespeichert.sprache !== SPRACHE) {
    console.error(`Ergebnisdatei ist ${gespeichert.sprache.toUpperCase()}, dieser Lauf ${SPRACHE.toUpperCase()} — passt nicht.`);
    process.exit(1);
  }
  if (gespeichert.modus && gespeichert.modus !== MODUS) {
    console.error(`Ergebnisdatei ist im Modus „${gespeichert.modus}", dieser Lauf „${MODUS}" — passt nicht.`);
    process.exit(1);
  }
}
// Nachbewertung: nur Fälle, deren Antwort schon vorliegt.
if (NUR_JUDGE) faelle = faelle.filter((c) => gespeichert.faelle[c.id]);
if (!faelle.length) { console.error('Keine Fälle ausgewählt.'); process.exit(1); }
function ergebnisSchreiben() {
  if (!ERGEBNIS) return;
  mkdirSync(path.dirname(ERGEBNIS), { recursive: true });
  writeFileSync(ERGEBNIS, JSON.stringify({
    sprache: SPRACHE, modus: MODUS, endpunkt: ENDPUNKT, gold: goldDatei,
    begonnen: gespeichert.begonnen || new Date().toISOString(),
    aktualisiert: new Date().toISOString(),
    faelle: gespeichert.faelle,
  }, null, 2));
}

// ─── Gold-Pflege: Routen-Drift melden ───────────────────────────────────────
// Ein Gold-Set veraltet leiser als Code: Die Routen der Wissensbasis ändern
// sich, der Testfall zeigt ins Leere und misst ab da nichts mehr. Deshalb wird
// vor dem ersten Modellaufruf geprüft, ob jede `expected`-Route noch existiert.
// Verglichen wird über den SLUG, nicht über die volle Route — der Slug überlebt
// Pfadumbauten (`/de/x` → `/de/tech-doku/x`) und ist zugleich das, was ein
// FR-Spiegel-Gold mit dem deutschen teilt (`/de/x` ↔ `/fr/x`).
const letztesSegment = (r) => String(r).split('?')[0].split('/').filter(Boolean).pop();
const routeZuSlug = new Map(ARTIKEL.map((a) => [a.route, a.slug]));
const slugsDerSprache = new Set(ARTIKEL.filter((a) => a.lang === SPRACHE).map((a) => a.slug));
const alleRouten = new Set(ARTIKEL.map((a) => a.route));
const zuSlug = (r) => routeZuSlug.get(r) || letztesSegment(r);

const drift = [];
const unbekannt = [];
for (const c of faelle) {
  for (const r of c.expected || []) {
    if (alleRouten.has(r)) continue;
    if (slugsDerSprache.has(zuSlug(r))) drift.push(`${c.id}: ${r}`);
    else unbekannt.push(`${c.id}: ${r}`);
  }
}

// ─── LLM-Judge ──────────────────────────────────────────────────────────────
// Substring-Prüfung ist spröde: „keine Bewegungsmelder" und „verzichtet auf
// Bewegungsmelder" sind dieselbe Aussage, eine davon fällt durch. Der Judge
// bewertet die Tatsache, nicht die Formulierung. Er nutzt dasselbe Backend wie
// Thi — bewusst, damit kein zweiter Anbieter konfiguriert werden muss.
// THI_JUDGE_URL: eigener Endpunkt für den Judge. Grund (22.09.2026): Der
// Standard-Endpunkt `…/llm-anonymous/…` ersetzt Seriennummern wie 0699-045
// durch Platzhalter, BEVOR das Modell sie sieht — Frage, Beleg und Antwort
// bekommen dabei verschiedene Platzhalter, und der Judge urteilte „Nano-SIM ab
// internal_id-PVPMJN, nicht ab internal_id-6Y0WVU" über eine richtige Antwort.
// Gibt es einen Endpunkt ohne Anonymisierung, gehört er hierhin; die
// Gold-Belege enthalten keine Personendaten.
const JUDGE_URL = process.env.THI_JUDGE_URL || process.env.ANYMIZE_API_URL || process.env.Anymize_API_URL || '';
const JUDGE_KEY = process.env.THI_JUDGE_KEY || process.env.ANYMIZE_API_KEY || process.env.Anymize_API_KEY || '';
const JUDGE_MODELL = process.env.THI_JUDGE_MODEL || 'anthropic/claude-sonnet-4.6';
if (JUDGE && (!JUDGE_URL || !JUDGE_KEY)) {
  console.error('--judge benötigt ANYMIZE_API_URL und ANYMIZE_API_KEY (.env).');
  process.exit(1);
}

const JUDGE_SYSTEM = 'Du bist ein strenger, fairer Prüfer für die FAKTISCHE Korrektheit der Antwort eines technischen Support-Assistenten. Dir liegt der maßgebliche WIKI-BELEG vor (= Grundwahrheit). Bewerte AUSSCHLIESSLICH, ob die ANTWORT die in der Frage adressierte Tatsache korrekt und ohne Widerspruch zum Beleg wiedergibt. Formulierung, Synonyme, zusätzliche korrekte Details, Rückfragen, Quellenangaben und Sicherheitshinweise sind IRRELEVANT. Urteile "falsch" nur, wenn die Antwort der Tatsache widerspricht, sie klar verfehlt oder fälschlich behauptet, die Wissensbasis sage dazu nichts. Antworte als striktes JSON, NUR das Objekt: {"urteil":"korrekt"|"falsch"|"unklar","grund":"<max 15 Woerter>"}'
  // Beim FR-Lauf sind Frage, Beleg und Antwort französisch. Der Judge urteilt
  // weiter auf Deutsch (gleiches Ausgabeformat), soll aber wissen, dass die
  // Sprache kein Fehler ist — und deutsche Antworten auf französische Fragen
  // als Fehlschlag werten: Für den FR-Support ist eine deutsche Antwort keine.
  // Die „DARF NICHT"-Liste nennt falsche AUSSAGEN, keine verbotenen Wörter.
  // Ohne diesen Satz las der Judge sie wörtlich: „aucun accessoire n'est
  // mémorisé en usine" wurde als „behauptet 'mémorisés en usine'" verworfen —
  // drei korrekte FR-Antworten fielen so durch (Nachlauf 22.09.2026).
  + ' Die Liste "DARF NICHT behaupten" nennt FALSCHE Aussagen. Sie ist nur verletzt, wenn die Antwort eine davon BEJAHT. Verneint oder widerlegt die Antwort eine dieser Aussagen, ist das korrekt — das bloße Vorkommen der Wörter zählt nicht.'
  + (SPRACHE === 'fr'
    ? ' HINWEIS: Frage, Beleg und Antwort sind FRANZÖSISCH. Das ist erwartet. Ist die Antwort dagegen überwiegend DEUTSCH, urteile "falsch" mit Grund "Antwort nicht auf Französisch".'
    : '');

async function judgeEinmal(c, antwort) {
  const nutzer =
    `FRAGE:\n${c.question}\n\n`
    + `WIKI-BELEG (Grundwahrheit):\n${c.beleg}\n\n`
    + `KERNAUSSAGE, die stimmen muss: ${(c.antwort_muss || []).join('; ')}\n`
    + `DARF NICHT behaupten (falsche Aussagen — ihre Verneinung ist richtig): ${(c.antwort_darf_nicht || []).join('; ')}\n\n`
    + `ANTWORT DES ASSISTENTEN:\n${antwort}`;
  const res = await fetch(JUDGE_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${JUDGE_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: JUDGE_MODELL,
      max_tokens: 200,
      // Temperatur 0: Zwei Läufe über dasselbe Gold-Set sollen vergleichbar
      // sein. Sonst misst man beim Vorher-Nachher die Laune des Prüfers mit.
      temperature: 0,
      messages: [{ role: 'system', content: JUDGE_SYSTEM }, { role: 'user', content: nutzer }],
    }),
  });
  if (!res.ok) throw new Error(`Judge HTTP ${res.status}`);
  const daten = await res.json();
  const roh = daten?.choices?.[0]?.message?.content || '';
  const m = roh.match(/\{[\s\S]*\}/);
  if (m) {
    try {
      const j = JSON.parse(m[0]);
      const urteil = ['korrekt', 'falsch', 'unklar'].includes(j.urteil) ? j.urteil : null;
      if (urteil) return { urteil, grund: String(j.grund || '').slice(0, 120) };
    } catch { /* unten abgefangen */ }
  }
  return null; // unbrauchbare Antwort — der Aufrufer entscheidet
}

// Antwortet der Judge nicht als JSON, ist das SEIN Fehler — nicht der der App.
// Die frühere Fassung buchte so etwas stillschweigend als falsche Antwort und
// verfälschte damit die Quote nach unten. Beobachtet bei der Panik-Frage: Der
// Judge gab seinen Fließtext aus, die Antwort der App war einwandfrei.
// Deshalb: ein zweiter Versuch, und wenn der auch scheitert, gilt der Fall als
// NICHT BEWERTBAR und wird getrennt ausgewiesen.
async function bewerteDurchJudge(c, antwort) {
  for (let versuch = 1; versuch <= 2; versuch += 1) {
    let ergebnis = null;
    try { ergebnis = await judgeEinmal(c, antwort); } catch (e) {
      if (versuch === 2) return { urteil: 'unbewertet', grund: `Judge-Fehler: ${e.message}` };
      continue;
    }
    if (ergebnis) return ergebnis;
  }
  return { urteil: 'unbewertet', grund: 'Judge lieferte kein verwertbares Urteil' };
}

// ─── Eine Frage stellen ─────────────────────────────────────────────────────
// Der Endpunkt antwortet als NDJSON-Strom: meta → text* → sicherheit → ende.
// Eingesammelt wird alles, denn die Nebenwerte sind für die Messung so wichtig
// wie der Text: `quellen` zeigt, ob die richtige Stelle überhaupt vorlag,
// `sicherheit` zeigt, ob der Prozentwert zur Antwortqualität passt.
class ZugangFehlt extends Error {}
class LimitErreicht extends Error {}

async function frageThi(frage) {
  const res = await fetch(ENDPUNKT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(ZUGANGSWORT ? { 'x-zugangswort': ZUGANGSWORT } : {}),
    },
    body: JSON.stringify({ frage, sprache: SPRACHE, verlauf: [] }),
  });

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    if (res.status === 401) throw new ZugangFehlt(detail.meldung || 'Zugangswort abgelehnt');
    if (res.status === 429) throw new LimitErreicht(detail.meldung || 'Rate-Limit');
    throw new Error(`HTTP ${res.status}: ${(detail.meldung || JSON.stringify(detail)).slice(0, 160)}`);
  }

  const leser = res.body.getReader();
  const dekoder = new TextDecoder();
  let puffer = '';
  const ergebnis = { text: '', quellen: [], hinweise: [], sicherheit: null, fehler: null };

  const zeileLesen = (zeile) => {
    const z = zeile.trim();
    if (!z) return;
    let ereignis;
    try { ereignis = JSON.parse(z); } catch { return; }
    if (ereignis.typ === 'text') ergebnis.text += ereignis.text;
    else if (ereignis.typ === 'meta') {
      ergebnis.quellen = ereignis.quellen || [];
      ergebnis.hinweise = ereignis.hinweise || [];
    } else if (ereignis.typ === 'sicherheit') ergebnis.sicherheit = ereignis.sicherheit;
    else if (ereignis.typ === 'fehler') ergebnis.fehler = ereignis.text;
  };

  for (;;) {
    const { done, value } = await leser.read();
    if (done) break;
    puffer += dekoder.decode(value, { stream: true });
    const zeilen = puffer.split('\n');
    puffer = zeilen.pop() || '';
    for (const zeile of zeilen) zeileLesen(zeile);
  }
  zeileLesen(puffer);

  if (ergebnis.fehler) throw new Error(ergebnis.fehler);
  ergebnis.text = ergebnis.text.trim();
  return ergebnis;
}

// ─── Einen Fall messen ──────────────────────────────────────────────────────
// Liefert einen abgeschlossenen Datensatz je Fall — derselbe, der in die
// Ergebnisdatei geht. Die Verbuchung (Zähler, Bericht) passiert getrennt, damit
// gespeicherte Fälle beim Fortsetzen genauso verbucht werden wie frische.
async function fallMessen(c) {
  const start = Date.now();
  let antwort = null;
  let anfrageFehler = null;
  try {
    antwort = await frageThi(c.question);
  } catch (e) {
    if (e instanceof ZugangFehlt || e instanceof LimitErreicht) throw e;
    anfrageFehler = e.message;
  }

  // Das Sicherheits-Gate bricht VOR dem Retrieval ab — es gibt dann keine
  // Quellen, und die Frage nach dem Quellenbeleg ist sinnlos. Solche Fälle
  // dürfen die Retrieval-Quote nicht verwässern; sie sind ein eigener Befund.
  // Bei einer Gold-Frage darf das Gate gar nicht greifen: Gold-Fragen sind
  // Sachfragen. Löst es hier aus, ist das ein Fehlalarm — und der ist keine
  // Kleinigkeit, sondern die dokumentierte Ausfallart des Gates: Ein Gate, das
  // bei normalen Gaswarner-Fragen eskaliert, wird umgangen und schützt dann
  // niemanden mehr (../../docs/05_EVAL_UND_QUALITAET.md §8).
  const gate = Boolean(antwort?.hinweise?.some((h) => h.art === 'gefahr'));

  // Eine LEERE Antwort ist kein Grounding-Befund, sondern ein technischer:
  // Der Server hat keinen Text geliefert (FR-Lauf 22.09.2026: 7 von 41). Sie
  // wird als Fehler gezählt, nicht dem Judge vorgelegt — der urteilt über
  // Leere mal „falsch", mal „unklar" und verbrennt dabei einen Aufruf.
  const text = antwort?.text || '';
  if (antwort && !gate && !text) anfrageFehler = 'Leere Antwort — der Server lieferte keinen Text';

  const klein = text.toLowerCase();
  const fehlt = anfrageFehler ? [] : (c.antwort_muss || []).filter((s) => !klein.includes(String(s).toLowerCase()));
  const verboten = anfrageFehler ? [] : (c.antwort_darf_nicht || []).filter((s) => klein.includes(String(s).toLowerCase()));

  let urteil = null;
  let ok;
  if (anfrageFehler) {
    ok = false;
  } else if (JUDGE) {
    urteil = await bewerteDurchJudge(c, text);
    ok = urteil.urteil === 'korrekt';
  } else {
    ok = fehlt.length === 0 && verboten.length === 0;
  }

  // Lag die erwartete Quelle überhaupt im Kontext? Das trennt „Retrieval hat
  // sie nicht gefunden" von „Retrieval hatte sie, das Modell hat sie
  // ignoriert" — zwei Fehler mit völlig verschiedenen Gegenmitteln.
  let quelleDabei = null;
  if (antwort && !gate && (c.expected || []).length) {
    const erwartet = new Set((c.expected || []).map(zuSlug));
    quelleDabei = antwort.quellen.some((q) => erwartet.has(zuSlug(q.route)));
  }

  return {
    id: c.id,
    zeit: new Date().toISOString(),
    dauerMs: Date.now() - start,
    ok,
    anfrageFehler,
    ohneUrteil: urteil?.urteil === 'unbewertet',
    urteil,
    fehlt,
    verboten,
    gate,
    quelleDabei,
    rueckfallDe: Boolean(antwort?.hinweise?.some((h) => h.art === 'sprache')),
    sicherheit: antwort?.sicherheit || null,
    quellen: (antwort?.quellen || []).map((q) => q.route),
    antwort: text,
  };
}

// ─── Lauf ───────────────────────────────────────────────────────────────────
console.log(`\nAntwort-Eval — ${faelle.length} Fälle (${SPRACHE.toUpperCase()}) gegen ${ENDPUNKT}`);
console.log(`Modus: ${JUDGE ? `LLM-Judge (${JUDGE_MODELL})` : 'Substring'}${NUR_JUDGE ? ' — Nachbewertung gespeicherter Antworten, kein Server-Aufruf' : ''}`);
if (ERGEBNIS) {
  const schon = faelle.filter((c) => gespeichert.faelle[c.id]).length;
  console.log(`Ergebnisdatei: ${ERGEBNIS}${FORTSETZEN ? ` — ${schon} von ${faelle.length} Fällen liegen schon vor` : ''}`);
}
if (drift.length) {
  console.log(`\n⚠  ${drift.length} Gold-Route(n) veraltet — Slug existiert, Pfad nicht mehr:`);
  for (const d of drift) console.log(`   ${d}`);
  console.log('   Gewertet wird über den Slug; die Gold-Datei sollte nachgezogen werden.');
}
if (unbekannt.length) {
  console.log(`\n⚠  ${unbekannt.length} Gold-Route(n) ohne Entsprechung in der Wissensbasis:`);
  for (const u of unbekannt) console.log(`   ${u}`);
}
console.log('');

let bestanden = 0;
let technisch = 0;
const fehlschlaege = [];
const nachKategorie = new Map();
const kalibrierung = { korrekt: [], falsch: [], hochUndFalsch: [], geringUndKorrekt: 0 };
let quellenTreffer = 0;
let quellenGeprueft = 0;
const gateFehlalarm = [];
const unbewertet = [];
let rueckfallDe = 0;
const begonnen = Date.now();

function verbuchen(c, r) {
  // Ein Fall ohne Urteil sagt nichts über die ANTWORTQUALITÄT aus und wird aus
  // dieser Wertung genommen, statt die Quote nach unten zu ziehen. Gate und
  // Quellenbeleg werden trotzdem gezählt: Die stehen fest, ganz gleich, ob der
  // Judge ein Urteil zustande gebracht hat.
  if (r.ohneUrteil) unbewertet.push({ id: c.id, grund: r.urteil?.grund || '' });
  if (r.gate) gateFehlalarm.push({ id: c.id, frage: c.question });
  if (r.quelleDabei !== null) {
    quellenGeprueft += 1;
    if (r.quelleDabei) quellenTreffer += 1;
  }
  if (r.rueckfallDe) rueckfallDe += 1;
  if (r.anfrageFehler) technisch += 1;

  const s = r.sicherheit;
  if (s && typeof s.wert === 'number' && !r.ohneUrteil) {
    if (r.ok) {
      kalibrierung.korrekt.push(s.wert);
      if (s.wert < 50) kalibrierung.geringUndKorrekt += 1;
    } else {
      kalibrierung.falsch.push(s.wert);
      if (s.wert >= 75) kalibrierung.hochUndFalsch.push({ id: c.id, wert: s.wert });
    }
  }

  if (!r.ohneUrteil) {
    const kat = c.kategorie || 'fakt';
    const ks = nachKategorie.get(kat) || { n: 0, ok: 0 };
    ks.n += 1;
    if (r.ok) ks.ok += 1;
    nachKategorie.set(kat, ks);

    if (r.ok) bestanden += 1;
    else fehlschlaege.push({ ...c, ...r, antwort: String(r.antwort || '').slice(0, 280) });
  }
}

function zeileDrucken(i, c, r, ausDatei) {
  const marke = r.anfrageFehler ? 'FEHL' : r.ohneUrteil ? '?   ' : r.ok ? 'OK  ' : 'NEIN';
  const s = r.sicherheit;
  const sTxt = s ? ` ${String(s.wert).padStart(2)} %` : '     ';
  const qTxt = r.gate ? ' [GATE]' : r.quelleDabei === false ? ' [Quelle fehlte]' : '';
  const grund = r.anfrageFehler ? ` — ${r.anfrageFehler}`
    : r.ohneUrteil ? ` — nicht bewertbar: ${r.urteil?.grund}`
      : r.ok ? ''
        : JUDGE ? ` — ${r.urteil?.urteil}: ${r.urteil?.grund}`
          : ` — fehlt:[${r.fehlt.join(', ')}]${r.verboten.length ? ` verboten:[${r.verboten.join(', ')}]` : ''}`;
  console.log(`  ${String(i + 1).padStart(2)}/${faelle.length} ${marke}${sTxt}${qTxt} ${c.question.slice(0, 52)}${grund}${ausDatei ? '  (aus Datei)' : ''}`);
}

for (const [i, c] of faelle.entries()) {
  let r = FORTSETZEN ? gespeichert.faelle[c.id] : null;
  const ausDatei = Boolean(r) && !NUR_JUDGE;
  if (NUR_JUDGE && r && !r.anfrageFehler && r.antwort) {
    r.urteil = await bewerteDurchJudge(c, r.antwort);
    r.ok = r.urteil.urteil === 'korrekt';
    r.ohneUrteil = r.urteil.urteil === 'unbewertet';
    r.nachbewertet = new Date().toISOString();
    gespeichert.faelle[c.id] = r;
    ergebnisSchreiben();
  }
  if (!r) {
    try {
      r = await fallMessen(c);
    } catch (e) {
      if (e instanceof ZugangFehlt) {
        console.error(`\nAbbruch: ${e.message}`);
        console.error('THI_ZUGANGSWORT in .env muss zu dem passen, mit dem der Server läuft.');
        process.exit(1);
      }
      if (e instanceof LimitErreicht) {
        console.error(`\nAbbruch nach ${i} Fällen: ${e.message}`);
        console.error('Der Eval stellt mehr Anfragen, als das Rate-Limit erlaubt. Server neu starten mit:');
        console.error('  THI_RATE_LIMIT=999 THI_DAILY_LIMIT=9999 node dev-server.mjs');
        if (ERGEBNIS) console.error(`Bisherige Fälle liegen in ${ERGEBNIS} — weiter mit --fortsetzen.`);
        process.exit(1);
      }
      throw e;
    }
    if (ERGEBNIS) {
      gespeichert.faelle[c.id] = r;
      ergebnisSchreiben();
    }
  }
  verbuchen(c, r);
  zeileDrucken(i, c, r, ausDatei);
}

// ─── Bericht ────────────────────────────────────────────────────────────────
const mittel = (a) => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : null);
const gesamt = faelle.length - unbewertet.length;
const prozent = gesamt ? Math.round((bestanden / gesamt) * 1000) / 10 : 0;
const dauer = Math.round((Date.now() - begonnen) / 1000);

console.log(`\n${'─'.repeat(70)}`);
console.log(`Grounding — ${bestanden}/${gesamt} korrekt (${prozent} %)   ·   ${dauer} s`);
if (technisch) {
  console.log(`  ⚠  ${technisch} Fall/Fälle ohne Antwort (technischer Fehler, als Fehlschlag gezählt) —`);
  console.log('     kein Grounding-Befund, sondern Server/Modell. Function-Log des Servers ansehen.');
}
if (unbewertet.length) {
  console.log(`  ${unbewertet.length} Fall/Fälle nicht bewertbar und aus der Wertung genommen:`);
  for (const u of unbewertet) console.log(`     ${u.id} — ${u.grund}`);
}
for (const [k, s] of [...nachKategorie].sort()) {
  console.log(`  ${k.padEnd(16)} ${String(s.ok).padStart(2)}/${String(s.n).padEnd(2)}`);
}

if (gateFehlalarm.length) {
  console.log(`\n⚠  Sicherheits-Gate FEHLALARM — ${gateFehlalarm.length}× bei einer reinen Sachfrage:`);
  for (const g of gateFehlalarm) console.log(`     ${g.id}\n       „${g.frage.slice(0, 88)}"`);
  console.log('  Diese Fälle bekamen die Notfallantwort statt einer Auskunft — ohne Modellaufruf,');
  console.log('  ohne Quellen. Ein Gate, das bei normalen Gaswarner-Fragen eskaliert, wird umgangen');
  console.log('  und schützt dann niemanden mehr. Gegenprobe: netlify/functions/lib/tests.mjs §2.');
}

if (quellenGeprueft) {
  const qp = Math.round((quellenTreffer / quellenGeprueft) * 1000) / 10;
  const ohneGate = gateFehlalarm.length ? ` · ${gateFehlalarm.length} Gate-Fall/Fälle nicht gewertet` : '';
  console.log(`\nQuellenbeleg — erwartete Quelle im Kontext: ${quellenTreffer}/${quellenGeprueft} (${qp} %)${ohneGate}`);
  console.log('  Darunter liegt die Grenze: Was nicht im Kontext liegt, kann keine Antwort belegen.');
}

// Der Prozentwert ist ein Versprechen an den, der am Telefon sitzt. Er ist nur
// dann etwas wert, wenn er bei falschen Antworten SINKT. Eine falsche Antwort
// mit hoher Sicherheit ist der einzige Fehler, der aktiv schadet — ohne die
// Anzeige hätte der Monteur selbst nachgesehen.
const mKorrekt = mittel(kalibrierung.korrekt);
const mFalsch = mittel(kalibrierung.falsch);
if (mKorrekt !== null || mFalsch !== null) {
  console.log('\nKalibrierung der Sicherheitsangabe');
  if (mKorrekt !== null) console.log(`  Ø bei korrekten Antworten: ${mKorrekt} %  (n=${kalibrierung.korrekt.length})`);
  if (mFalsch !== null) console.log(`  Ø bei falschen Antworten:  ${mFalsch} %  (n=${kalibrierung.falsch.length})`);
  if (mKorrekt !== null && mFalsch !== null) {
    const spanne = mKorrekt - mFalsch;
    console.log(`  Spanne: ${spanne > 0 ? '+' : ''}${spanne} Punkte — ${
      spanne >= 10 ? 'die Anzeige trennt.'
        : spanne > 0 ? 'trennt schwach; für ein Urteil braucht es mehr Fälle.'
          : 'sie trennt NICHT. Die Anzeige verspricht mehr, als sie weiß.'}`);
  }
  if (kalibrierung.hochUndFalsch.length) {
    console.log(`  ⚠  ${kalibrierung.hochUndFalsch.length}× hohe Sicherheit (≥75 %) bei falscher Antwort — der schädlichste Fall:`);
    for (const h of kalibrierung.hochUndFalsch) console.log(`     ${h.id} (${h.wert} %)`);
  }
  if (kalibrierung.geringUndKorrekt) {
    console.log(`  ${kalibrierung.geringUndKorrekt}× geringe Sicherheit (<50 %) bei korrekter Antwort — unnötig zurückhaltend.`);
  }
}

if (SPRACHE === 'fr') {
  const fp = gesamt ? Math.round((rueckfallDe / gesamt) * 1000) / 10 : 0;
  console.log(`\nRückfall FR→DE: ${rueckfallDe}/${gesamt} (${fp} %)`);
  console.log('  Steigt dieser Wert, ist das ein Content-Signal: Diese Themen fehlen auf Französisch.');
}

if (fehlschlaege.length) {
  console.log(`\n${fehlschlaege.length} Fehlschläge im Detail:`);
  for (const f of fehlschlaege.slice(0, AUSFUEHRLICH ? fehlschlaege.length : 20)) {
    console.log(`\n  [${f.id}] „${f.question.slice(0, 84)}"`);
    if (f.anfrageFehler) { console.log(`     FEHLER: ${f.anfrageFehler}`); continue; }
    if (f.urteil) console.log(`     Judge: ${f.urteil.urteil} — ${f.urteil.grund}`);
    else {
      if (f.fehlt.length) console.log(`     fehlt in der Antwort: ${f.fehlt.join(' | ')}`);
      if (f.verboten.length) console.log(`     VERBOTEN aufgetreten: ${f.verboten.join(' | ')}`);
    }
    if (f.gate) console.log('     SICHERHEITS-GATE ausgelöst → Notfallantwort statt Auskunft, kein Retrieval');
    else console.log(`     erwartete Quelle im Kontext: ${f.quelleDabei === null ? '—' : f.quelleDabei ? 'ja → das Modell hat sie ignoriert' : 'NEIN → Retrieval-Problem, nicht Modell-Problem'}`);
    if (f.sicherheit) console.log(`     Sicherheit laut App: ${f.sicherheit.wert} % (${f.sicherheit.stufe})`);
    console.log(`     Beleg: ${String(f.beleg || '').replace(/\s+/g, ' ').slice(0, 150)}`);
    console.log(`     Antwort: ${f.antwort.replace(/\s+/g, ' ')}`);
  }
  console.log('\n  Bevor ein Fehlschlag als Regression gilt: prüfen, ob der Bot falschliegt');
  console.log('  ODER der Gold-Beleg unvollständig ist (../../docs/05_EVAL_UND_QUALITAET.md §3).');
}

if (MIN !== null && prozent < MIN) {
  console.error(`\nFAIL: Grounding ${prozent} % < Schwelle ${MIN} %`);
  process.exit(1);
}
console.log('');
