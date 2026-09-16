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
import {
  searchWiki, searchSections, bestSectionForRoute,
  buildRetrievalQuery, extractSnippet,
} from './lib/search-core.js';
import { pruefeGefahr, pruefeWidersprueche, baueSuchanfrage, fahrzeugGewichten } from './lib/fall.mjs';
import { bewerteSicherheit, leseModellStufe } from './lib/sicherheit.mjs';
import { SYSTEM, GEFAHR_ANTWORT, KEIN_TREFFER, SUPPORT_TELEFON } from './lib/prompts.mjs';

// ─── Konfiguration ──────────────────────────────────────────────────────────
const API_URL = process.env.ANYMIZE_API_URL || process.env.Anymize_API_URL || '';
const API_KEY = process.env.ANYMIZE_API_KEY || process.env.Anymize_API_KEY || '';
const MODELL = process.env.THI_MODEL || 'anthropic/claude-sonnet-4.6';
const ZUGANGSWORT = process.env.THI_ZUGANGSWORT || '';

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
const BASIS = { artikel: ARTIKEL, sektionen: SEKTIONEN };

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

function limitPruefen(ip) {
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
async function frageModell(nachrichten, quellen, hinweise, bewerten) {
  const antwort = await fetch(API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODELL, max_tokens: 4096, stream: true, messages: nachrichten }),
  });

  if (!antwort.ok) {
    const detail = await antwort.text().catch(() => '');
    // Die häufigste Betriebsstörung des Vorgängers: abgekündigtes Modell → 404.
    const tipp = antwort.status === 404
      ? ` Das konfigurierte Modell „${MODELL}" ist beim Anbieter nicht (mehr) verfügbar — THI_MODEL prüfen.`
      : '';
    throw new Error(`Anymize ${antwort.status}:${tipp} ${detail.slice(0, 200)}`);
  }

  const kodierer = new TextEncoder();
  return new Response(new ReadableStream({
    async start(steuerung) {
      steuerung.enqueue(kodierer.encode(JSON.stringify({ typ: 'meta', quellen, hinweise }) + '\n'));
      const leser = antwort.body.getReader();
      const dekodierer = new TextDecoder();
      let puffer = '';
      // Das Antwortende trägt den Marker [[SICHERHEIT: …]]. Damit er nie im
      // sichtbaren Text aufblitzt, wird ein Stück Text zurückgehalten, das
      // groß genug für einen vollständigen Marker ist, und erst am Schluss
      // gefiltert ausgegeben.
      const RUECKHALT = 64;
      let schwanz = '';
      let gesamt = '';

      const sende = (t) => steuerung.enqueue(kodierer.encode(JSON.stringify({ typ: 'text', text: t }) + '\n'));

      try {
        for (;;) {
          const { done, value } = await leser.read();
          if (done) break;
          puffer += dekodierer.decode(value, { stream: true });
          const zeilen = puffer.split('\n');
          puffer = zeilen.pop() || '';
          for (const zeile of zeilen) {
            const z = zeile.trim();
            if (!z.startsWith('data:')) continue;
            const nutzlast = z.slice(5).trim();
            if (!nutzlast || nutzlast === '[DONE]') continue;
            try {
              const stueck = JSON.parse(nutzlast)?.choices?.[0]?.delta?.content;
              if (!stueck) continue;
              gesamt += stueck;
              schwanz += stueck;
              if (schwanz.length > RUECKHALT) {
                const raus = schwanz.slice(0, schwanz.length - RUECKHALT);
                schwanz = schwanz.slice(schwanz.length - RUECKHALT);
                if (raus) sende(raus);
              }
            } catch { /* unvollständiges JSON — ignorieren */ }
          }
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

  const ip = (anfrage.headers.get('x-nf-client-connection-ip')
    || anfrage.headers.get('x-forwarded-for') || 'unbekannt').split(',')[0].trim();

  // 1) Zugangsschutz — der eigentliche Kostenschutz bei öffentlichem Deployment.
  // Fehlversuche werden gezählt und führen zur Sperre, sonst ließe sich ein
  // merkbares Zugangswort in Minuten durchprobieren.
  if (ZUGANGSWORT) {
    if (istGesperrt(ip)) {
      return json({
        fehler: 'gesperrt',
        meldung: 'Zu viele Fehlversuche. Bitte in 15 Minuten erneut versuchen.',
      }, 429);
    }
    const gesendet = anfrage.headers.get('x-zugangswort') || '';
    if (gesendet !== ZUGANGSWORT) {
      fehlversuchZaehlen(ip);
      return json({ fehler: 'zugang', meldung: 'Zugangswort fehlt oder ist falsch.' }, 401);
    }
  }

  const limit = limitPruefen(ip);
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
  const basis = BASIS;

  const zugang = { canViewInternal: false };
  const vorherige = verlauf.filter((n) => n.rolle === 'nutzer').map((n) => n.text);
  const anfrageText = frage || baueSuchanfrage(fall);
  const suche = buildRetrievalQuery(anfrageText, vorherige);

  const fahrzeugSlug = (fall.fahrzeug && !fall.fahrzeug.fallback) ? fall.fahrzeug.slug : null;
  let artikelTreffer = fahrzeugGewichten(
    searchWiki(basis.artikel, suche, zugang, sprache, 14),
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
    const deTreffer = searchWiki(basis.artikel, suche, zugang, 'de', 6);
    if (deTreffer.length && (deTreffer[0]?.score ?? 0) > (artikelTreffer[0]?.score ?? 0) * 1.4) {
      artikelTreffer = [...artikelTreffer, ...deTreffer].slice(0, 10);
      rueckfallDe = true;
      hinweise.push({
        art: 'sprache', schwere: 'hinweis',
        text: 'Une partie des sources n\'existe qu\'en allemand. La réponse reste en français ; les sources allemandes sont signalées.',
      });
    }
  }

  if (!artikelTreffer.length) {
    // Auch hier eine Bewertung mitgeben — „nichts gefunden" IST eine Aussage
    // über die Sicherheit, und der Nutzer soll sehen, woran es lag.
    return textStream(KEIN_TREFFER[sprache], [], hinweise, bewerteSicherheit({
      fall, sn, quellen: [], hinweise, rueckfallDe: false, modellStufe: 'gering', sprache,
    }));
  }

  // Jedem Artikeltreffer den passenden Abschnitt zuordnen (Deep-Link + Zitat).
  const quellen = [];
  for (const t of artikelTreffer.slice(0, MAX_KONTEXT)) {
    const abschnitt = bestSectionForRoute(basis.sektionen, t.route, suche, t.lang);
    quellen.push({
      route: t.route, title: t.title, lang: t.lang, articleType: t.articleType,
      anchor: abschnitt?.anchor || '', headingPath: abschnitt?.headingPath || '',
      score: Math.round(t.score),
      fremdsprachig: t.lang !== sprache,
    });
  }

  // Eigenständige Abschnitte aus ANDEREN Artikeln ergänzen — fängt Sub-Themen,
  // die das artikelweise Scoring verdrängt (der „Zusatzhupe an Pin"-Fall).
  const bekannteRouten = new Set(quellen.map((q) => q.route));
  for (const s of searchSections(basis.sektionen, suche, zugang, sprache, 4)) {
    if (quellen.length >= MAX_KONTEXT) break;
    if (bekannteRouten.has(s.route) || !s.anchor) continue;
    bekannteRouten.add(s.route);
    quellen.push({
      route: s.route, title: s.title, lang: s.lang, articleType: s.articleType,
      anchor: s.anchor, headingPath: s.headingPath, score: Math.round(s.score),
      fremdsprachig: s.lang !== sprache, ausAbschnittssuche: true,
    });
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
    const artikel = basis.artikel.find((a) => a.route === q.route && a.lang === q.lang);
    const voll = String(artikel?.body || '');
    const text = extractSnippet(voll, suche, i < 2 ? 6000 : 1400);
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
  const bewerten = (modellStufe) => bewerteSicherheit({
    fall, sn, quellen, hinweise, rueckfallDe, modellStufe, sprache,
  });

  try {
    return await frageModell(nachrichten, quellen, hinweise, bewerten);
  } catch (fehler) {
    console.error('[thi] Modellaufruf fehlgeschlagen:', fehler);
    return json({
      fehler: 'modell',
      meldung: sprache === 'fr'
        ? `Erreur lors de la consultation du modèle. Contacte le support THITRONIK : ${SUPPORT_TELEFON}`
        : `Beim Nachschlagen ist ein Fehler aufgetreten. Bitte wende dich an den THITRONIK-Support: ${SUPPORT_TELEFON}`,
      detail: String(fehler.message || fehler).slice(0, 300),
      quellen, hinweise,
    }, 502);
  }
}
