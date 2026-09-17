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

import { readFileSync, existsSync } from 'node:fs';
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

// ─── Umgebung ───────────────────────────────────────────────────────────────
// Dieselbe schlichte .env-Lesung wie im dev-server: kein `npm install` nötig,
// damit der Eval auch in einer frischen Arbeitskopie sofort läuft.
function envLaden() {
  const datei = path.join(WURZEL, '.env');
  if (!existsSync(datei)) return;
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
if (LIMIT) faelle = faelle.slice(0, LIMIT);

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
const JUDGE_URL = process.env.ANYMIZE_API_URL || process.env.Anymize_API_URL || '';
const JUDGE_KEY = process.env.ANYMIZE_API_KEY || process.env.Anymize_API_KEY || '';
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
  + (SPRACHE === 'fr'
    ? ' HINWEIS: Frage, Beleg und Antwort sind FRANZÖSISCH. Das ist erwartet. Ist die Antwort dagegen überwiegend DEUTSCH, urteile "falsch" mit Grund "Antwort nicht auf Französisch".'
    : '');

async function judgeEinmal(c, antwort) {
  const nutzer =
    `FRAGE:\n${c.question}\n\n`
    + `WIKI-BELEG (Grundwahrheit):\n${c.beleg}\n\n`
    + `KERNAUSSAGE, die stimmen muss: ${(c.antwort_muss || []).join('; ')}\n`
    + `DARF NICHT behaupten: ${(c.antwort_darf_nicht || []).join('; ')}\n\n`
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

// ─── Lauf ───────────────────────────────────────────────────────────────────
console.log(`\nAntwort-Eval — ${faelle.length} Fälle (${SPRACHE.toUpperCase()}) gegen ${ENDPUNKT}`);
console.log(`Modus: ${JUDGE ? `LLM-Judge (${JUDGE_MODELL})` : 'Substring'}`);
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
const fehlschlaege = [];
const nachKategorie = new Map();
const kalibrierung = { korrekt: [], falsch: [], hochUndFalsch: [], geringUndKorrekt: 0 };
let quellenTreffer = 0;
let quellenGeprueft = 0;
const gateFehlalarm = [];
const unbewertet = [];
let rueckfallDe = 0;
const begonnen = Date.now();

for (const [i, c] of faelle.entries()) {
  let antwort = null;
  let anfrageFehler = null;
  try {
    antwort = await frageThi(c.question);
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
      process.exit(1);
    }
    anfrageFehler = e.message;
  }

  const text = antwort?.text || '';
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

  // Ein Fall ohne Urteil sagt nichts über die ANTWORTQUALITÄT aus und wird aus
  // dieser Wertung genommen, statt die Quote nach unten zu ziehen. Gate und
  // Quellenbeleg werden trotzdem gezählt: Die stehen fest, ganz gleich, ob der
  // Judge ein Urteil zustande gebracht hat.
  const ohneUrteil = urteil?.urteil === 'unbewertet';
  if (ohneUrteil) unbewertet.push({ id: c.id, grund: urteil.grund });

  // Das Sicherheits-Gate bricht VOR dem Retrieval ab — es gibt dann keine
  // Quellen, und die Frage nach dem Quellenbeleg ist sinnlos. Solche Fälle
  // dürfen die Retrieval-Quote nicht verwässern; sie sind ein eigener Befund.
  // Bei einer Gold-Frage darf das Gate gar nicht greifen: Gold-Fragen sind
  // Sachfragen. Löst es hier aus, ist das ein Fehlalarm — und der ist keine
  // Kleinigkeit, sondern die dokumentierte Ausfallart des Gates: Ein Gate, das
  // bei normalen Gaswarner-Fragen eskaliert, wird umgangen und schützt dann
  // niemanden mehr (../../docs/05_EVAL_UND_QUALITAET.md §8).
  const gate = Boolean(antwort?.hinweise?.some((h) => h.art === 'gefahr'));
  if (gate) gateFehlalarm.push({ id: c.id, frage: c.question });

  // Lag die erwartete Quelle überhaupt im Kontext? Das trennt „Retrieval hat
  // sie nicht gefunden" von „Retrieval hatte sie, das Modell hat sie
  // ignoriert" — zwei Fehler mit völlig verschiedenen Gegenmitteln.
  let quelleDabei = null;
  if (antwort && !gate && (c.expected || []).length) {
    quellenGeprueft += 1;
    const erwartet = new Set((c.expected || []).map(zuSlug));
    quelleDabei = antwort.quellen.some((q) => erwartet.has(zuSlug(q.route)));
    if (quelleDabei) quellenTreffer += 1;
  }
  if (antwort?.hinweise?.some((h) => h.art === 'sprache')) rueckfallDe += 1;

  const s = antwort?.sicherheit;
  if (s && typeof s.wert === 'number' && !ohneUrteil) {
    if (ok) {
      kalibrierung.korrekt.push(s.wert);
      if (s.wert < 50) kalibrierung.geringUndKorrekt += 1;
    } else {
      kalibrierung.falsch.push(s.wert);
      if (s.wert >= 75) kalibrierung.hochUndFalsch.push({ id: c.id, wert: s.wert });
    }
  }

  if (!ohneUrteil) {
    const kat = c.kategorie || 'fakt';
    const ks = nachKategorie.get(kat) || { n: 0, ok: 0 };
    ks.n += 1;
    if (ok) ks.ok += 1;
    nachKategorie.set(kat, ks);

    if (ok) bestanden += 1;
    else fehlschlaege.push({ ...c, anfrageFehler, fehlt, verboten, urteil, quelleDabei, gate, sicherheit: s, antwort: text.slice(0, 280) });
  }

  const marke = anfrageFehler ? 'FEHL' : ohneUrteil ? '?   ' : ok ? 'OK  ' : 'NEIN';
  const sTxt = s ? ` ${String(s.wert).padStart(2)} %` : '     ';
  const qTxt = gate ? ' [GATE]' : quelleDabei === false ? ' [Quelle fehlte]' : '';
  const grund = anfrageFehler ? ` — ${anfrageFehler}`
    : ohneUrteil ? ` — nicht bewertbar: ${urteil.grund}`
      : ok ? ''
        : JUDGE ? ` — ${urteil?.urteil}: ${urteil?.grund}`
          : ` — fehlt:[${fehlt.join(', ')}]${verboten.length ? ` verboten:[${verboten.join(', ')}]` : ''}`;
  console.log(`  ${String(i + 1).padStart(2)}/${faelle.length} ${marke}${sTxt}${qTxt} ${c.question.slice(0, 52)}${grund}`);
}

// ─── Bericht ────────────────────────────────────────────────────────────────
const mittel = (a) => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : null);
const gesamt = faelle.length - unbewertet.length;
const prozent = gesamt ? Math.round((bestanden / gesamt) * 1000) / 10 : 0;
const dauer = Math.round((Date.now() - begonnen) / 1000);

console.log(`\n${'─'.repeat(70)}`);
console.log(`Grounding — ${bestanden}/${gesamt} korrekt (${prozent} %)   ·   ${dauer} s`);
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
