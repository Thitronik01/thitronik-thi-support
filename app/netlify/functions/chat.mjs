// ============================================================================
// THITRONIK Thi Support — Chat-Endpunkt (Netlify Function, ESM/v2).
// ----------------------------------------------------------------------------
// Ablauf pro Anfrage:
//   1. Zugangsschutz + Rate-Limit          (Kostenbremse)
//   2. Eingaben validieren und kappen
//   3. SICHERHEITS-GATE                    → bricht ab, ruft KEIN Modell
//   4. Widerspruchsprüfung (SN ↔ Produkt ↔ Fahrzeug ↔ Baujahr)
//   5. Retrieval, gesteuert durch die Fallangaben
//   6. Kontextblock bauen (Top-Quellen volltext-angereichert)
//   7. EIN Modellaufruf, gestreamt
//
// Bewusst KEIN agentischer Tool-Loop: Die Fallaufnahme liefert vorab, was sich
// der Vorgänger per Tool-Hops erarbeiten musste — und drei sequenzielle
// LLM-Aufrufe sprengen das Function-Zeitbudget
// (docs/02_ZIELARCHITEKTUR.md §2.1).
// ============================================================================

import ARTIKEL from '../../data/artikel.mjs';
import SEKTIONEN from '../../data/sektionen.mjs';
import KORREKTUREN from '../../data/korrekturen.mjs';
import {
  searchWiki, searchSections, bestSectionForRoute,
  buildRetrievalQuery, extractSnippet,
} from './lib/search-core.js';
import { pruefeGefahr, pruefeWidersprueche, baueSuchanfrage, fahrzeugGewichten } from './lib/fall.mjs';
import { bewerteSicherheit, leseModellStufe } from './lib/sicherheit.mjs';
import { SYSTEM, GEFAHR_ANTWORT, KEIN_TREFFER, SUPPORT_TELEFON } from './lib/prompts.mjs';
import { wirksameKorrekturen, korrekturAlsArtikel, KORREKTUR_BEILAGE_MAX } from './lib/korrekturen.mjs';
import { ZUGANGSWORT, zugangPruefen, clientIp } from './lib/zugang.mjs';
import { darf } from './lib/auth.mjs';
import { supabaseAktiv, rpc } from './lib/supabase.mjs';
import { korrekturArtikelLaden, gewichtungLaden, gewichtungAnwenden, lueckeMelden, LUECKE_SCHWELLE } from './lib/wissen.mjs';

// ─── Konfiguration ──────────────────────────────────────────────────────────
const API_URL = process.env.ANYMIZE_API_URL || process.env.Anymize_API_URL || '';
const API_KEY = process.env.ANYMIZE_API_KEY || process.env.Anymize_API_KEY || '';
const MODELL = process.env.THI_MODEL || 'anthropic/claude-sonnet-4.6';

const RL_FENSTER_MS = 5 * 60 * 1000;
const RL_MAX = Number(process.env.THI_RATE_LIMIT || 20);
const TAGESLIMIT = Number(process.env.THI_DAILY_LIMIT || 500);

const MAX_TEXT = 4000;      // Zeichen je Freitextfeld
const MAX_KONTEXT = 8;      // Kontexteinträge ans Modell
const MAX_VERLAUF = 12;     // Nachrichten im Verlauf

// ─── Wissensbasis ───────────────────────────────────────────────────────────
// Statischer Import statt Dateizugriff zur Laufzeit. Grund: Ein `fs.readFileSync`
// hängt davon ab, dass `included_files` greift, dass der Bundler die Pfade
// erhält und dass `process.cwd()` das ist, was man erwartet — drei Annahmen, die
// je nach Deploy-Methode (Git-Build vs. Drag & Drop) unterschiedlich ausfallen.
// Ein Import ist für den Bundler dagegen eine harte Abhängigkeit: Er nimmt die
// Daten IMMER mit. Damit läuft die Function unabhängig davon, wie deployt wurde.
// Support-Korrekturen (docs/07_KORREKTUREN_ENTWUERFE.md): eigene kleine
// Einträge, die wie Artikel durchsucht werden. Mit Datenbank kommen sie aus
// thi.korrektur und wirken SOFORT nach der Freigabe; ohne Datenbank aus dem
// Bündel. lib/wissen.mjs hält sie 60 s je Instanz, damit search-core seine
// normalisierten Felder je Objekt zwischenspeichern kann (WeakMap).
async function basisLaden() {
  const korrekturen = await korrekturArtikelLaden(ARTIKEL, KORREKTUREN);
  return { artikel: ARTIKEL, sektionen: SEKTIONEN, korrekturen };
}

// ─── Rate-Limit ─────────────────────────────────────────────────────────────
// ⚠️ In-Memory: lebt PRO Function-Instanz. Auf Netlify skalieren Instanzen,
// daher ist das nur eine grobe Bremse — der eigentliche Schutz ist das
// Zugangswort. Für harte Limits einen geteilten Zähler einsetzen
// (Netlify Blobs / Upstash), siehe docs/02_ZIELARCHITEKTUR.md §2.2.
const treffer = new Map();
let tag = { anzahl: 0, datum: new Date().toDateString() };

// ─── Sperre für falsche Zugangswörter ───────────────────────────────────────
// Eigener Zähler, BEWUSST getrennt vom normalen Rate-Limit: Würde man
// Fehlversuche auf das Tageskontingent buchen, könnte ein Angreifer damit das
// Kontingent leerlaufen lassen und echte Nutzer aussperren.
// Nötig, weil das Zugangswort ein gemeinsames, merkbares Wort ist — ohne Sperre
// wäre es in Minuten durchprobiert.
const FEHLVERSUCHE_MAX = Number(process.env.THI_FEHLVERSUCHE || 8);
const FEHLVERSUCHE_FENSTER_MS = 15 * 60 * 1000;
const fehlversuche = new Map(); // ip -> { anzahl, bis }

function istGesperrt(ip) {
  const e = fehlversuche.get(ip);
  if (!e) return false;
  if (Date.now() > e.bis) { fehlversuche.delete(ip); return false; }
  return e.anzahl >= FEHLVERSUCHE_MAX;
}

function fehlversuchZaehlen(ip) {
  const jetzt = Date.now();
  const e = fehlversuche.get(ip);
  if (!e || jetzt > e.bis) fehlversuche.set(ip, { anzahl: 1, bis: jetzt + FEHLVERSUCHE_FENSTER_MS });
  else e.anzahl += 1;
  if (fehlversuche.size > 2000) {
    for (const [k, v] of fehlversuche) if (jetzt > v.bis) fehlversuche.delete(k);
  }
}

function limitPruefenLokal(ip) {
  const heute = new Date().toDateString();
  if (tag.datum !== heute) tag = { anzahl: 0, datum: heute };
  if (tag.anzahl >= TAGESLIMIT) return 'tag';

  const jetzt = Date.now();
  const e = treffer.get(ip);
  if (!e || jetzt > e.bis) treffer.set(ip, { anzahl: 1, bis: jetzt + RL_FENSTER_MS });
  else if (++e.anzahl > RL_MAX) return 'ip';

  tag.anzahl += 1;
  if (treffer.size > 3000) for (const [k, v] of treffer) if (jetzt > v.bis) treffer.delete(k);
  return null;
}

// Mit Supabase: GETEILTER Zähler über alle Function-Instanzen (thi.zaehlen,
// atomar in Postgres). Gezählt wird je Person, nicht je IP — im Büro teilen
// sich alle eine IP. Fällt die Datenbank aus, greift der lokale Zähler, damit
// ein DB-Problem den Support nicht lahmlegt.
async function limitPruefen(ip, nutzer) {
  if (!supabaseAktiv()) return limitPruefenLokal(ip);
  try {
    const wer = nutzer?.id ? `nutzer:${nutzer.id}` : `ip:${ip}`;
    const heute = new Date().toISOString().slice(0, 10);
    const proTag = await rpc('zaehlen', { p_schluessel: `tag:${heute}`, p_fenster_sekunden: 86400 });
    if (Number(proTag) > TAGESLIMIT) return 'tag';
    const proPerson = await rpc('zaehlen', { p_schluessel: wer, p_fenster_sekunden: RL_FENSTER_MS / 1000 });
    if (Number(proPerson) > RL_MAX) return 'ip';
    return null;
  } catch (fehler) {
    console.error('[thi] Zähler in der Datenbank nicht erreichbar, lokaler Zähler greift:', fehler.message);
    return limitPruefenLokal(ip);
  }
}

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────
const txt = (v) => String(v ?? '').trim().slice(0, MAX_TEXT);

function json(daten, status = 200) {
  return new Response(JSON.stringify(daten), {
    status, headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function textStream(inhalt, quellen = [], hinweise = [], sicherheit = null) {
  const kodierer = new TextEncoder();
  return new Response(new ReadableStream({
    start(steuerung) {
      steuerung.enqueue(kodierer.encode(JSON.stringify({ typ: 'meta', quellen, hinweise }) + '\n'));
      steuerung.enqueue(kodierer.encode(JSON.stringify({ typ: 'text', text: inhalt }) + '\n'));
      if (sicherheit) {
        steuerung.enqueue(kodierer.encode(JSON.stringify({ typ: 'sicherheit', sicherheit }) + '\n'));
      }
      steuerung.enqueue(kodierer.encode(JSON.stringify({ typ: 'ende' }) + '\n'));
      steuerung.close();
    },
  }), { headers: { 'content-type': 'application/x-ndjson; charset=utf-8', 'cache-control': 'no-store' } });
}

// ─── Kontextblock ───────────────────────────────────────────────────────────
function baueKontext(eintraege) {
  const teile = eintraege.map((c, i) => {
    const abschnitt = c.headingPath ? ` — Abschnitt: ${c.headingPath}` : '';
    const pfad = c.anchor ? `${c.route}#${c.anchor}` : c.route;
    // Die Top-Quellen bekommen ein großes Fenster (6000 Z. statt 1400), damit
    // benachbarte Fakten nicht durch ein enges Snippet zerschnitten werden —
    // der „Duracell-Fall" aus docs/01_RAG_WISSENSTRANSFER.md §4.3.
    return `[${i + 1}] ${c.title}${abschnitt} (${pfad})\n${c.text}`;
  });
  return `<kontext>\n${teile.join('\n\n')}\n</kontext>`;
}

function baueFallblock(fall, sn, sprache) {
  const z = [];
  const L = sprache === 'fr'
    ? { fz: 'Véhicule', bj: 'Année', au: 'Type de cellule', pr: 'Produits', sn: 'N° de série', sw: 'Version logicielle', eb: 'Montage', er: 'Attendu', be: 'Observé', led: 'LED / code', me: 'Message app / SMS', au2: 'Déclencheur', re: 'Reproductibilité', bi: 'Déjà tenté' }
    : { fz: 'Fahrzeug', bj: 'Baujahr', au: 'Aufbauart', pr: 'Produkte', sn: 'Seriennummer', sw: 'Softwarestand', eb: 'Einbau', er: 'Erwartet', be: 'Beobachtet', led: 'Status-LED / Code', me: 'App-Meldung / SMS', au2: 'Auslöser', re: 'Reproduzierbarkeit', bi: 'Bereits versucht' };

  if (fall.fahrzeug?.titel) z.push(`${L.fz}: ${fall.fahrzeug.titel}${fall.fahrzeug.slug ? `  [${fall.fahrzeug.slug}]` : ''}`);
  if (fall.baujahr) z.push(`${L.bj}: ${fall.baujahr}`);
  if (fall.aufbauart) z.push(`${L.au}: ${fall.aufbauart}${fall.aufbauhersteller ? ` (${fall.aufbauhersteller})` : ''}`);
  if (fall.startknopf) z.push(`Startknopf: ${fall.startknopf}`);
  if (fall.produkte?.length) z.push(`${L.pr}: ${fall.produkte.join(', ')}`);
  if (sn?.roh) {
    let s = `${L.sn}: ${sn.roh}`;
    if (sn.bekannt) s += `  → ${sn.produkt}${sn.variante ? ` (${sn.variante})` : ''}`;
    if (sn.ueberSchwelle === true) s += `  → ab Schwelle ${sn.praefix}-${String(sn.schwelle).padStart(3, '0')}`;
    if (sn.ueberSchwelle === false) s += `  → UNTER Schwelle ${sn.praefix}-${String(sn.schwelle).padStart(3, '0')}`;
    z.push(s);
  }
  z.push(`${L.sw}: ${fall.softwarestand || (sprache === 'fr' ? 'inconnue' : 'unbekannt')}`);
  if (fall.einbau) z.push(`${L.eb}: ${fall.einbau}`);

  const f = fall.fehlerbild || {};
  const fb = [];
  if (f.erwartet) fb.push(`${L.er}: ${f.erwartet}`);
  if (f.beobachtet) fb.push(`${L.be}: ${f.beobachtet}`);
  if (f.led) fb.push(`${L.led}: ${f.led}`);
  if (f.meldung) fb.push(`${L.me}: ${f.meldung}`);
  if (f.ausloeser) fb.push(`${L.au2}: ${f.ausloeser}`);
  if (f.reproduzierbar) fb.push(`${L.re}: ${f.reproduzierbar}`);
  if (f.bisher) fb.push(`${L.bi}: ${f.bisher}`);

  return `<fall>\n${z.join('\n')}\n</fall>\n\n<fehlerbild>\n${fb.join('\n')}\n</fehlerbild>`;
}

// ─── Modellaufruf (gestreamt) ───────────────────────────────────────────────
// `bewerten` erhält die Selbsteinschätzung des Modells und liefert das fertige
// Sicherheitsobjekt — es kann erst am Ende des Streams gesendet werden.
//
// Leere und abgeschnittene Antworten (FR-Eval 22.09.2026): Bei 7 von 41
// Gold-Fragen kam vom Anbieter ein Strom OHNE Text an — einmal nach 32 Zeichen
// abgebrochen, sonst gar nichts. Die frühere Fassung las nur `delta.content`,
// übersah Fehlerobjekte im Strom und schickte am Ende trotzdem „Sicherheit
// 53 %" plus „Ende" — eine leere Antwort mit Prozentwert. Deshalb jetzt:
//   1. Alles, was kein Textstück ist, wird gemerkt und landet im Function-Log.
//   2. Kam kein Text (oder brach der Strom ab, bevor etwas gesendet wurde),
//      folgt EIN zweiter Versuch ohne Streaming.
//   3. Bleibt es leer, geht ein `fehler`-Ereignis raus statt einer leeren
//      Antwort — der Nutzer sieht den Fehler, der Eval zählt ihn als solchen.
function inhaltAus(objekt) {
  const wahl = objekt?.choices?.[0];
  const inhalt = wahl?.delta?.content ?? wahl?.delta?.text ?? wahl?.message?.content ?? wahl?.text;
  return typeof inhalt === 'string' ? inhalt : '';
}

async function frageModell(nachrichten, quellen, hinweise, bewerten, sprache = 'de') {
  const rufe = async (stream) => {
    const antwort = await fetch(API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: MODELL, max_tokens: 4096, stream, messages: nachrichten }),
    });
    if (!antwort.ok) {
      const detail = await antwort.text().catch(() => '');
      // Die häufigste Betriebsstörung des Vorgängers: abgekündigtes Modell → 404.
      const tipp = antwort.status === 404
        ? ` Das konfigurierte Modell „${MODELL}" ist beim Anbieter nicht (mehr) verfügbar — THI_MODEL prüfen.`
        : '';
      throw new Error(`Anymize ${antwort.status}:${tipp} ${detail.slice(0, 200)}`);
    }
    return antwort;
  };
  const antwort = await rufe(true);

  const kodierer = new TextEncoder();
  return new Response(new ReadableStream({
    async start(steuerung) {
      steuerung.enqueue(kodierer.encode(JSON.stringify({ typ: 'meta', quellen, hinweise }) + '\n'));
      // Das Antwortende trägt den Marker [[SICHERHEIT: …]]. Damit er nie im
      // sichtbaren Text aufblitzt, wird ein Stück Text zurückgehalten, das
      // groß genug für einen vollständigen Marker ist, und erst am Schluss
      // gefiltert ausgegeben.
      const RUECKHALT = 64;
      let schwanz = '';
      let gesamt = '';
      let gesendet = false;
      const diagnose = { stuecke: 0, abschluss: false, auffaellig: [] };

      const sende = (t) => {
        gesendet = true;
        steuerung.enqueue(kodierer.encode(JSON.stringify({ typ: 'text', text: t }) + '\n'));
      };
      const merke = (was) => { if (diagnose.auffaellig.length < 5) diagnose.auffaellig.push(String(was).slice(0, 300)); };
      const uebernimm = (stueck) => {
        diagnose.stuecke += 1;
        gesamt += stueck;
        schwanz += stueck;
        if (schwanz.length > RUECKHALT) {
          const raus = schwanz.slice(0, schwanz.length - RUECKHALT);
          schwanz = schwanz.slice(schwanz.length - RUECKHALT);
          if (raus) sende(raus);
        }
      };
      const zeileVerarbeiten = (zeile) => {
        const z = zeile.trim();
        if (!z || z.startsWith(':')) return;                       // leer / SSE-Keep-alive
        if (z.startsWith('event:')) { if (!/^event:\s*(message)?$/i.test(z)) merke(z); return; }
        if (!z.startsWith('data:')) { merke(z); return; }
        const nutzlast = z.slice(5).trim();
        if (!nutzlast) return;
        if (nutzlast === '[DONE]') { diagnose.abschluss = true; return; }
        let objekt;
        try { objekt = JSON.parse(nutzlast); } catch { merke(nutzlast); return; }
        if (objekt?.error) { merke(nutzlast); return; }
        if (objekt?.choices?.[0]?.finish_reason) diagnose.abschluss = true;
        const stueck = inhaltAus(objekt);
        if (stueck) uebernimm(stueck);
        else if (!Array.isArray(objekt?.choices)) merke(nutzlast);
      };

      try {
        const leser = antwort.body.getReader();
        const dekodierer = new TextDecoder();
        let puffer = '';
        for (;;) {
          const { done, value } = await leser.read();
          if (done) break;
          puffer += dekodierer.decode(value, { stream: true });
          const zeilen = puffer.split('\n');
          puffer = zeilen.pop() || '';
          for (const zeile of zeilen) zeileVerarbeiten(zeile);
        }
        zeileVerarbeiten(puffer);

        // Nichts Brauchbares — oder Abbruch, bevor der erste Text raus war:
        // einmal ohne Streaming nachfragen. Nach dem ersten gesendeten Stück
        // ist das nicht mehr möglich, sonst käme die Antwort doppelt an.
        const leer = !gesamt.trim();
        if (!gesendet && (leer || !diagnose.abschluss)) {
          console.error(`[thi] Modellstrom ${leer ? 'ohne Inhalt' : 'ohne Abschluss'}`
            + ` (${diagnose.stuecke} Stücke, ${gesamt.length} Zeichen, Modell ${MODELL})`
            + (diagnose.auffaellig.length ? ` — auffällige Zeilen: ${JSON.stringify(diagnose.auffaellig)}` : '')
            + ' → zweiter Versuch ohne Streaming.');
          const zweite = await rufe(false);
          const daten = await zweite.json().catch(() => null);
          const text = inhaltAus(daten);
          if (text) { gesamt = text; schwanz = text; diagnose.abschluss = true; }
          else merke(JSON.stringify(daten));
        }
        if (!gesamt.trim()) {
          console.error('[thi] Auch der zweite Versuch lieferte keinen Text:', JSON.stringify(diagnose));
          throw new Error(sprache === 'fr'
            ? `Le modèle n'a pas fourni de réponse. Réessaie ; si le problème persiste, contacte le support THITRONIK : ${SUPPORT_TELEFON}`
            : `Das Modell hat keine Antwort geliefert. Bitte erneut versuchen; bleibt es dabei, an den THITRONIK-Support wenden: ${SUPPORT_TELEFON}`);
        }
        if (!diagnose.abschluss) {
          // Ein Strom ohne [DONE]/finish_reason ist verdächtig — möglicherweise
          // abgeschnitten. Nur loggen: Was schon gesendet ist, bleibt.
          console.warn(`[thi] Modellstrom endete ohne Abschlusssignal nach ${gesamt.length} Zeichen`
            + (diagnose.auffaellig.length ? ` — auffällige Zeilen: ${JSON.stringify(diagnose.auffaellig)}` : ''));
        }

        // Rest ausgeben, Marker entfernen.
        const { stufe, text } = leseModellStufe(schwanz);
        if (text) sende(text);
        const gesamtStufe = stufe || leseModellStufe(gesamt).stufe;
        steuerung.enqueue(kodierer.encode(
          JSON.stringify({ typ: 'sicherheit', sicherheit: bewerten(gesamtStufe) }) + '\n',
        ));
      } catch (fehler) {
        steuerung.enqueue(kodierer.encode(JSON.stringify({ typ: 'fehler', text: String(fehler.message || fehler) }) + '\n'));
      } finally {
        steuerung.enqueue(kodierer.encode(JSON.stringify({ typ: 'ende' }) + '\n'));
        steuerung.close();
      }
    },
  }), { headers: { 'content-type': 'application/x-ndjson; charset=utf-8', 'cache-control': 'no-store' } });
}

// ════════════════════════════════════════════════════════════════════════════
export default async function handler(anfrage) {
  if (anfrage.method !== 'POST') return json({ fehler: 'method_not_allowed' }, 405);

  const ip = clientIp(anfrage);

  // 1) Zugangsschutz — der eigentliche Kostenschutz bei öffentlichem Deployment.
  // Im Login-Modus prüft lib/zugang das Token und liefert Person + Rolle.
  // Im Zugangswort-Modus werden Fehlversuche gezählt und führen zur Sperre,
  // sonst ließe sich ein merkbares Wort in Minuten durchprobieren.
  if (ZUGANGSWORT && istGesperrt(ip)) {
    return json({ fehler: 'gesperrt', meldung: 'Zu viele Fehlversuche. Bitte in 15 Minuten erneut versuchen.' }, 429);
  }
  const zugangErgebnis = await zugangPruefen(anfrage);
  if (!zugangErgebnis.ok) {
    if (zugangErgebnis.modus === 'zugangswort') fehlversuchZaehlen(ip);
    return json({
      fehler: zugangErgebnis.grund,
      meldung: zugangErgebnis.modus === 'login' ? 'Bitte anmelden.' : 'Zugangswort fehlt oder ist falsch.',
    }, 401);
  }
  const nutzer = zugangErgebnis.nutzer;
  if (!darf(nutzer, 'fall.stellen')) return json({ fehler: 'verboten' }, 403);

  const limit = await limitPruefen(ip, nutzer);
  if (limit) {
    return json({
      fehler: 'rate_limit',
      meldung: limit === 'tag'
        ? `Das Tageslimit ist erreicht. Bitte wende dich an den THITRONIK-Support: ${SUPPORT_TELEFON}`
        : 'Zu viele Anfragen in kurzer Zeit. Bitte kurz warten.',
    }, 429);
  }

  let körper;
  try { körper = await anfrage.json(); } catch { return json({ fehler: 'ungueltiges_json' }, 400); }

  const sprache = körper.sprache === 'fr' ? 'fr' : 'de';
  const verlauf = Array.isArray(körper.verlauf) ? körper.verlauf.slice(-MAX_VERLAUF) : [];
  const frage = txt(körper.frage);

  const fall = {
    fahrzeug: körper.fahrzeug || null,
    baujahr: txt(körper.baujahr),
    aufbauart: txt(körper.aufbauart),
    aufbauhersteller: txt(körper.aufbauhersteller),
    startknopf: txt(körper.startknopf),
    produkte: Array.isArray(körper.produkte) ? körper.produkte.slice(0, 12).map(txt) : [],
    produktSlugs: Array.isArray(körper.produktSlugs) ? körper.produktSlugs.slice(0, 12) : [],
    seriennummer: txt(körper.seriennummer),
    softwarestand: txt(körper.softwarestand),
    einbau: txt(körper.einbau),
    fehlerbild: {
      erwartet: txt(körper.fehlerbild?.erwartet),
      beobachtet: txt(körper.fehlerbild?.beobachtet),
      led: txt(körper.fehlerbild?.led),
      meldung: txt(körper.fehlerbild?.meldung),
      ausloeser: txt(körper.fehlerbild?.ausloeser),
      reproduzierbar: txt(körper.fehlerbild?.reproduzierbar),
      bisher: txt(körper.fehlerbild?.bisher),
    },
  };

  const freitext = [
    fall.fehlerbild.beobachtet, fall.fehlerbild.erwartet, fall.fehlerbild.ausloeser,
    fall.fehlerbild.meldung, fall.fehlerbild.bisher, frage,
  ].filter(Boolean).join(' \n ');

  if (!freitext.trim()) {
    return json({ fehler: 'leer', meldung: sprache === 'fr' ? 'Décris le problème observé.' : 'Bitte beschreibe das beobachtete Problem.' }, 400);
  }

  // 3) SICHERHEITS-GATE — vor allem anderen, ohne Modellaufruf.
  const gefahr = pruefeGefahr(freitext, sprache);
  if (gefahr.gefahr) {
    return textStream(GEFAHR_ANTWORT[sprache], [], [{
      art: 'gefahr', schwere: 'kritisch',
      text: sprache === 'fr'
        ? `Signal de danger détecté (« ${gefahr.ausloeser} ») — diagnostic à distance suspendu.`
        : `Gefahrenhinweis erkannt („${gefahr.ausloeser}") — Ferndiagnose ausgesetzt.`,
    }]);
  }

  // 4) Widersprüche prüfen.
  const { hinweise, sn } = pruefeWidersprueche({
    fahrzeug: fall.fahrzeug, produkte: fall.produkte,
    seriennummer: fall.seriennummer, baujahr: fall.baujahr,
  });

  // 5) Retrieval.
  const basis = await basisLaden();
  const gewichtung = await gewichtungLaden();

  // Rollen-Projektion VOR dem Retrieval (docs/01 §6): Interne Artikel sieht
  // nur, wer eingeloggt ist. Im Zugangswort-Modus bleibt es beim Standard-
  // bestand, weil dort niemand identifiziert ist.
  const zugang = { canViewInternal: !nutzer.platzhalter && darf(nutzer, 'intern.lesen') };
  const vorherige = verlauf.filter((n) => n.rolle === 'nutzer').map((n) => n.text);
  const anfrageText = frage || baueSuchanfrage(fall);
  const suche = buildRetrievalQuery(anfrageText, vorherige);

  const fahrzeugSlug = (fall.fahrzeug && !fall.fahrzeug.fallback) ? fall.fahrzeug.slug : null;
  // Korrekturen laufen im selben Index mit — ohne Boost. Gemessen: Ein
  // passender Korrektur-Eintrag landet auf Platz 2 hinter dem Wiki-Artikel,
  // ein unpassender taucht bei 1 von 41 Gold-Fragen in den Top-8 auf.
  const suchIndex = basis.korrekturen.length ? [...basis.artikel, ...basis.korrekturen] : basis.artikel;
  // Gewichtung der Wissensmanager (Faktor, bevorzugt/veraltet) greift NACH
  // dem lexikalischen Score und VOR dem Fahrzeug-Boost — sie verschiebt die
  // Reihenfolge, streicht aber nichts.
  let artikelTreffer = fahrzeugGewichten(
    gewichtungAnwenden(searchWiki(suchIndex, suche, zugang, sprache, 14), gewichtung),
    fahrzeugSlug,
  ).slice(0, 10);

  // Den gewählten Fahrzeugartikel GARANTIERT beilegen, auch wenn die Frage
  // lexikalisch nicht auf ihn zeigt: DIP-Stellungen, Anschlusspläne und
  // fahrzeugspezifische Besonderheiten stehen genau dort. Ohne diesen Schritt
  // fehlt er bei Fragen wie „Welche DIP-Stellung brauche ich?", weil der
  // Fahrzeugname (zu Recht) nicht mehr in der Suchquery steht.
  if (fahrzeugSlug && !artikelTreffer.some((t) => t.slug === fahrzeugSlug)) {
    const fahrzeugArtikel = basis.artikel.find(
      (a) => a.slug === fahrzeugSlug && a.lang === sprache,
    ) || basis.artikel.find((a) => a.slug === fahrzeugSlug && a.lang === 'de');
    if (fahrzeugArtikel) {
      artikelTreffer = [
        { ...fahrzeugArtikel, score: artikelTreffer[0]?.score || 100, ausFallangabe: true },
        ...artikelTreffer,
      ].slice(0, 10);
    }
  }

  // FR-Rückfall auf DE (docs/04_MEHRSPRACHIGKEIT_DE_FR.md §3, Variante B):
  // Die FR-Fachartikel sind vollwertig, aber Anleitungen/FAQ liegen nur auf DE.
  let rueckfallDe = false;
  if (sprache === 'fr' && (artikelTreffer.length < 3 || (artikelTreffer[0]?.score ?? 0) < 25)) {
    const deTreffer = searchWiki(suchIndex, suche, zugang, 'de', 6);
    if (deTreffer.length && (deTreffer[0]?.score ?? 0) > (artikelTreffer[0]?.score ?? 0) * 1.4) {
      artikelTreffer = [...artikelTreffer, ...deTreffer].slice(0, 10);
      rueckfallDe = true;
      hinweise.push({
        art: 'sprache', schwere: 'hinweis',
        text: 'Une partie des sources n\'existe qu\'en allemand. La réponse reste en français ; les sources allemandes sont signalées.',
      });
    }
  }

  // Lücke protokollieren — ein Signal fürs Wiki, nie blockierend.
  const lueckeFalls = (sicherheit, besterScore) => {
    if (!sicherheit || sicherheit.wert >= LUECKE_SCHWELLE) return;
    lueckeMelden({
      sprache, frage: frage || fall.fehlerbild.beobachtet, produkte: fall.produkte,
      fahrzeug: fall.fahrzeug?.titel || null, sicherheit: sicherheit.wert, besterScore, nutzerId: nutzer.id,
    });
  };

  if (!artikelTreffer.length) {
    // Auch hier eine Bewertung mitgeben — „nichts gefunden" IST eine Aussage
    // über die Sicherheit, und der Nutzer soll sehen, woran es lag.
    const s = bewerteSicherheit({ fall, sn, quellen: [], hinweise, rueckfallDe: false, modellStufe: 'gering', sprache });
    lueckeFalls(s, 0);
    return textStream(KEIN_TREFFER[sprache], [], hinweise, s);
  }

  // Jedem Artikeltreffer den passenden Abschnitt zuordnen (Deep-Link + Zitat).
  const quellen = [];
  const quelleAusKorrektur = (t, extra = {}) => ({
    route: t.route, title: t.title, lang: t.lang, articleType: 'korrektur',
    anchor: '', headingPath: t.korrektur.bezugTitel || '',
    score: Math.round(t.score || 0),
    fremdsprachig: t.lang !== sprache,
    korrektur: t.korrektur,
    ...extra,
  });
  for (const t of artikelTreffer.slice(0, MAX_KONTEXT)) {
    if (t.articleType === 'korrektur') { quellen.push(quelleAusKorrektur(t)); continue; }
    const abschnitt = bestSectionForRoute(basis.sektionen, t.route, suche, t.lang);
    quellen.push({
      route: t.route, title: t.title, lang: t.lang, articleType: t.articleType,
      anchor: abschnitt?.anchor || '', headingPath: abschnitt?.headingPath || '',
      score: Math.round(t.score),
      fremdsprachig: t.lang !== sprache,
      ...(t.gewichtung ? { gewichtung: t.gewichtung } : {}),
    });
  }

  // Eigenständige Abschnitte aus ANDEREN Artikeln ergänzen — fängt Sub-Themen,
  // die das artikelweise Scoring verdrängt (der „Zusatzhupe an Pin"-Fall).
  const bekannteRouten = new Set(quellen.map((q) => q.route));
  for (const s of gewichtungAnwenden(searchSections(basis.sektionen, suche, zugang, sprache, 4), gewichtung)) {
    if (quellen.length >= MAX_KONTEXT) break;
    if (bekannteRouten.has(s.route) || !s.anchor) continue;
    bekannteRouten.add(s.route);
    quellen.push({
      route: s.route, title: s.title, lang: s.lang, articleType: s.articleType,
      anchor: s.anchor, headingPath: s.headingPath, score: Math.round(s.score),
      fremdsprachig: s.lang !== sprache, ausAbschnittssuche: true,
      ...(s.gewichtung ? { gewichtung: s.gewichtung } : {}),
    });
  }

  // Korrekturen GARANTIERT beilegen, deren Bezugsartikel im Kontext liegt —
  // wie beim Fahrzeugartikel. Eine Korrektur zur Batterielaufzeit des
  // Handsenders muss mitreisen, sobald der Handsender-Artikel mitreist, auch
  // wenn die Frage lexikalisch nicht auf die Korrektur zeigt. Sonst würde das
  // Modell den (falschen) Wiki-Text sehen und die Korrektur nicht.
  if (basis.korrekturen.length) {
    const kontextRouten = new Set(quellen.filter((q) => !q.korrektur).map((q) => q.route));
    const schonDrin = new Set(quellen.filter((q) => q.korrektur).map((q) => q.korrektur.id));
    let beigelegt = 0;
    for (const k of basis.korrekturen) {
      if (beigelegt >= KORREKTUR_BEILAGE_MAX) break;
      if (schonDrin.has(k.korrektur.id) || !kontextRouten.has(k.korrektur.bezug?.route)) continue;
      if (k.lang !== sprache && !rueckfallDe) continue;
      quellen.push(quelleAusKorrektur(k, { ausBezug: true }));
      beigelegt += 1;
    }
  }

  // 6) Kontext bauen: Top-2 mit großem Fenster, Rest als Passagen-Fenster.
  //
  // Beide Fenster werden AN DER FRAGE ausgerichtet, nicht am Textanfang. Das
  // klingt nach einer Kleinigkeit, ist aber der Unterschied zwischen „Antwort
  // vorhanden" und „Antwort abgeschnitten": Der Median-Artikel hat 11.873
  // Zeichen, 75 % liegen über 6000. Ein `slice(0, 6000)` liefert bei drei von
  // vier Artikeln immer dieselbe erste Hälfte — egal, wonach gefragt wurde.
  // Gemessen mit werkzeuge/antwort-eval.mjs: Vier der sechs Fehlschläge lagen
  // genau daran, der Beleg stand bei Zeichen 7264 bis 10356 und wurde nie
  // mitgeschickt. Das Modell antwortete daraufhin korrekterweise „dazu steht
  // nichts in der Dokumentation" — es hatte recht, es sah den Satz nicht.
  //
  // Das große Fenster für die Top-2 bleibt: `extractSnippet` liefert einen
  // zusammenhängenden Ausschnitt mit dem Treffer bei einem Viertel, also mit
  // Vorlauf UND Umfeld. Damit bleiben benachbarte Fakten beieinander — der
  // „Duracell-Fall" aus docs/01_RAG_WISSENSTRANSFER.md §4.3 — und der Fakt ist
  // trotzdem drin. Die Artikel-Identität geht nicht verloren: Titel und
  // Abschnittspfad stehen ohnehin in der Kopfzeile jedes Kontexteintrags.
  const kontext = quellen.map((q, i) => {
    // Korrekturen sind kurz (max. 2000 Zeichen Text) und tragen ihre Herkunft
    // in der Kopfzeile — sie gehen vollständig mit, kein Fenster nötig.
    const bestand = q.korrektur ? basis.korrekturen : basis.artikel;
    const artikel = bestand.find((a) => a.route === q.route && a.lang === q.lang);
    const voll = String(artikel?.body || '');
    const text = q.korrektur ? voll : extractSnippet(voll, suche, i < 2 ? 6000 : 1400);
    return { ...q, text: text || artikel?.excerpt || '' };
  }).filter((k) => k.text);

  // Jeder Quelle einen lesbaren Auszug mitgeben. Eine Quellenangabe, die man
  // nicht nachlesen kann, ist nur Dekoration — und es gibt hier keine
  // Wiki-Seite zum Verlinken. Deshalb reist der Beleg mit der Antwort.
  for (const q of quellen) {
    const passend = kontext.find((k) => k.route === q.route && k.lang === q.lang);
    if (passend) q.auszug = extractSnippet(passend.text, suche, 700);
  }

  if (!API_KEY || !API_URL) {
    return json({
      fehler: 'nicht_konfiguriert',
      meldung: 'Serverseitig ist kein API-Zugang hinterlegt (ANYMIZE_API_KEY / ANYMIZE_API_URL).',
      quellen, hinweise,
    }, 503);
  }

  // 7) Modellaufruf.
  const nachrichten = [
    { role: 'system', content: SYSTEM[sprache] },
    ...verlauf.map((n) => ({ role: n.rolle === 'thi' ? 'assistant' : 'user', content: txt(n.text) })),
    {
      role: 'user',
      content: `${baueFallblock(fall, sn, sprache)}\n\n${baueKontext(kontext)}\n\n${
        frage || (sprache === 'fr'
          ? 'Analyse ce cas et propose la marche à suivre.'
          : 'Analysiere diesen Fall und nenne das weitere Vorgehen.')}`,
    },
  ];

  // Die Bewertung wird erst am Ende des Streams gesendet — sie braucht die
  // Selbsteinschätzung des Modells, die am Antwortende steht.
  const bewerten = (modellStufe) => {
    const s = bewerteSicherheit({ fall, sn, quellen, hinweise, rueckfallDe, modellStufe, sprache });
    lueckeFalls(s, Math.max(0, ...quellen.map((q) => q.score || 0)));
    return s;
  };

  try {
    return await frageModell(nachrichten, quellen, hinweise, bewerten, sprache);
  } catch (fehler) {
    // Die technische Ursache (Anbieter-Antwort, URL-Fragmente) bleibt im
    // Function-Log. An den Browser geht nur die Meldung — was dort ankommt,
    // liegt öffentlich in der Entwicklerkonsole.
    console.error('[thi] Modellaufruf fehlgeschlagen:', fehler);
    return json({
      fehler: 'modell',
      meldung: sprache === 'fr'
        ? `Erreur lors de la consultation du modèle. Contacte le support THITRONIK : ${SUPPORT_TELEFON}`
        : `Beim Nachschlagen ist ein Fehler aufgetreten. Bitte wende dich an den THITRONIK-Support: ${SUPPORT_TELEFON}`,
      quellen, hinweise,
    }, 502);
  }
}
