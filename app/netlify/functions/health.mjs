// ============================================================================
// Health-Check.
// ----------------------------------------------------------------------------
// Existiert wegen einer konkreten Betriebserfahrung: Der Vorgänger-Bot war
// WOCHENLANG tot, weil das konfigurierte Modell vom Anbieter abgekündigt wurde
// (HTTP 404 bei jedem Aufruf) — und niemand merkte es, weil der Modellname nur
// in einer nicht versionierten Umgebungsvariable stand
// (docs/01_RAG_WISSENSTRANSFER.md §7).
//
//   GET /api/health          → Status; mit Zugangswort: Konfiguration + Wissensbasis
//   GET /api/health?live=1   → zusätzlich ein ECHTER Mini-Modellaufruf (nur mit Zugangswort)
//
// ZWEI SICHTEN. Ohne Zugangswort antwortet der Endpunkt nur mit dem Nötigsten:
// ob die Seite ein Zugangswort verlangt (das braucht das Frontend beim Start)
// und ob der Dienst grundsätzlich läuft. Modellname, Umfang der Wissensbasis,
// Korrekturstand und die Problemliste sind Betriebsinterna — die gehören nicht
// an jeden, der die Adresse kennt. Mit gültigem Zugangswort (Header
// `x-zugangswort`) kommt der vollständige Bericht.
//
// Ist KEIN Zugangswort konfiguriert, ist die Seite ohnehin offen; dann ist
// auch der Bericht offen und meldet genau das als Problem.
//
// Der Live-Test kostet Token und ist deshalb doppelt gebremst: nur mit
// Zugangswort, und das Ergebnis wird 60 Sekunden zwischengespeichert.
// ============================================================================

import ARTIKEL from '../../data/artikel.mjs';
import SEKTIONEN from '../../data/sektionen.mjs';
import KORREKTUREN from '../../data/korrekturen.mjs';
import { ueberfaellige, WIEDERVORLAGE_TAGE } from './lib/korrekturen.mjs';
import { ZUGANGSWORT, zugangPruefen, zugangsModus } from './lib/zugang.mjs';
import { supabaseAktiv, rest } from './lib/supabase.mjs';

const API_URL = process.env.ANYMIZE_API_URL || process.env.Anymize_API_URL || '';
const API_KEY = process.env.ANYMIZE_API_KEY || process.env.Anymize_API_KEY || '';
const MODELL = process.env.THI_MODEL || 'anthropic/claude-sonnet-4.6';

// ─── Kostenbremse für den Live-Test ─────────────────────────────────────────
// Ob das Modell erreichbar ist, ändert sich nicht im Sekundentakt. Das
// Ergebnis wird deshalb zwischengespeichert — pro Function-Instanz, wie das
// Rate-Limit in chat.mjs. Im dev-server greift der Cache nicht, weil der die
// Module bei jeder Anfrage neu lädt.
const LIVE_CACHE_MS = 60 * 1000;
let letzterLiveTest = null; // { zeit, ergebnis, probleme }

// Statischer Import: dieselbe Abhängigkeit wie in chat.mjs, damit der Check
// wirklich das prüft, womit geantwortet wird (siehe Kommentar dort).
function findeBasis() {
  try {
    const proSprache = {};
    for (const a of ARTIKEL) proSprache[a.lang] = (proSprache[a.lang] || 0) + 1;
    return {
      gefunden: true,
      artikel: ARTIKEL.length,
      abschnitte: SEKTIONEN.length,
      proSprache,
      // Stiller Textverlust ist die gefährlichste Ingest-Störung — deshalb
      // die Ø-Textlänge mitliefern (docs/01_… §1.1). Fällt sie nach einem
      // Neubau unerwartet, hat der Ingest Inhalte verloren.
      durchschnittLaenge: Math.round(
        ARTIKEL.reduce((s, a) => s + String(a.body || '').length, 0) / Math.max(1, ARTIKEL.length),
      ),
    };
  } catch (fehler) {
    return { gefunden: false, fehler: String(fehler.message || fehler) };
  }
}

async function korrekturenStand() {
  let liste = KORREKTUREN;
  let speicher = process.env.THI_GITHUB_TOKEN ? 'github' : process.env.THI_KORREKTUREN_LOKAL === '1' ? 'lokal' : 'nur-lesen';
  if (supabaseAktiv()) {
    try { liste = await rest('/korrektur?select=status,erstellt'); speicher = 'datenbank'; } catch { speicher = 'datenbank-nicht-erreichbar'; }
  }
  const proStatus = {};
  for (const k of liste) proStatus[k.status] = (proStatus[k.status] || 0) + 1;
  return {
    gesamt: liste.length,
    proStatus,
    ueberfaellig: ueberfaellige(liste).length,
    speicher,
    freigabeKonfiguriert: supabaseAktiv() || !!(process.env.THI_FREIGABEWORT || process.env.THI_ZUGANGSWORT),
  };
}

function antwort(bericht) {
  return new Response(JSON.stringify(bericht, null, 2), {
    status: bericht.status === 'fehler' ? 503 : 200,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

export default async function handler(anfrage) {
  const url = new URL(anfrage.url);
  const modus = zugangsModus();
  const zugang = await zugangPruefen(anfrage);
  const berechtigt = zugang.ok;
  const live = url.searchParams.get('live') === '1' && berechtigt;

  const basis = findeBasis();

  // ── Öffentliche Sicht ────────────────────────────────────────────────────
  // Nur, was das Frontend zum Start braucht und was ein Monitoring-Ping
  // wissen darf: läuft es, und welcher Zugangsmodus gilt.
  if (!berechtigt) {
    const grundsaetzlichOk = basis.gefunden && !!API_URL && !!API_KEY;
    return antwort({
      status: grundsaetzlichOk ? 'ok' : 'fehler',
      zeit: new Date().toISOString(),
      konfiguration: { zugangsModus: modus, zugangswortAktiv: modus === 'zugangswort' },
      hinweis: modus === 'login'
        ? 'Vollständiger Bericht und Live-Test nur eingeloggt (Header Authorization: Bearer …).'
        : 'Vollständiger Bericht und Live-Test nur mit Zugangswort (Header x-zugangswort).',
    });
  }

  // ── Vollständiger Bericht ────────────────────────────────────────────────
  let datenbank = null;
  if (supabaseAktiv()) {
    try {
      const profile = await rest('/profile?select=rolle,aktiv');
      const proRolle = {};
      for (const p of profile) proRolle[p.rolle] = (proRolle[p.rolle] || 0) + 1;
      datenbank = { erreichbar: true, nutzer: profile.length, aktiv: profile.filter((p) => p.aktiv).length, proRolle };
    } catch (fehler) {
      datenbank = { erreichbar: false, fehler: String(fehler.message || fehler).slice(0, 160) };
    }
  }

  const bericht = {
    status: 'ok',
    zeit: new Date().toISOString(),
    konfiguration: {
      apiUrlGesetzt: !!API_URL,
      apiKeyGesetzt: !!API_KEY,
      modell: MODELL,
      zugangsModus: modus,
      zugangswortAktiv: modus === 'zugangswort',
    },
    datenbank,
    wissensbasis: basis,
    korrekturen: await korrekturenStand(),
    modellPruefung: live ? null : 'übersprungen (mit ?live=1 erzwingen)',
  };

  const probleme = [];
  // Wiedervorlage: Eine Korrektur, die wochenlang „ungeprüft" bleibt, wirkt
  // die ganze Zeit mit Deckel — und niemand hat je entschieden, ob sie
  // stimmt. Das soll auffallen, nicht versanden.
  if (bericht.korrekturen.ueberfaellig) {
    probleme.push(`${bericht.korrekturen.ueberfaellig} Support-Korrektur(en) warten seit über ${WIEDERVORLAGE_TAGE} Tagen auf Freigabe.`);
  }
  if (!basis.gefunden) probleme.push('Wissensbasis nicht ladbar (data/artikel.mjs).');
  if (!API_URL) probleme.push('ANYMIZE_API_URL ist nicht gesetzt.');
  if (!API_KEY) probleme.push('ANYMIZE_API_KEY ist nicht gesetzt.');
  if (modus === 'offen') {
    probleme.push('Weder Login (THI_SUPABASE_URL) noch THI_ZUGANGSWORT ist gesetzt — die Seite ist '
      + 'öffentlich nutzbar und der API-Schlüssel damit auf fremde Kosten verwendbar.');
  }
  if (modus === 'zugangswort') {
    probleme.push('Übergangsbetrieb mit gemeinsamem Zugangswort — Login mit Rollen ist nicht aktiv.');
  }
  if (datenbank && !datenbank.erreichbar) probleme.push(`Datenbank nicht erreichbar: ${datenbank.fehler}`);
  if (datenbank && datenbank.erreichbar && !datenbank.proRolle.admin) probleme.push('Kein Admin-Profil vorhanden — THI_ERSTADMIN einladen.');

  if (live && API_URL && API_KEY && letzterLiveTest && Date.now() - letzterLiveTest.zeit < LIVE_CACHE_MS) {
    // Frisches Ergebnis vorhanden — wiederverwenden statt erneut zu bezahlen.
    const alterS = Math.round((Date.now() - letzterLiveTest.zeit) / 1000);
    bericht.modellPruefung = { ...letzterLiveTest.ergebnis, ausCache: true, alterSekunden: alterS };
    probleme.push(...letzterLiveTest.probleme);
  } else if (live && API_URL && API_KEY) {
    // Die Befunde dieses Laufs getrennt sammeln, damit sie zusammen mit dem
    // Ergebnis in den Cache wandern — sonst meldete ein zwischengespeicherter
    // Fehlschlag später „alles in Ordnung".
    const liveProbleme = [];
    try {
      const start = Date.now();
      const antwort = await fetch(API_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_KEY}`, 'content-type': 'application/json' },
        // max_tokens großzügig, NICHT knapp: Reasoning-Modelle (z. B.
        // waterfall-2.0) verbrauchen den Großteil des Budgets fürs Denken. Mit
        // den früheren 8 Token blieb für die sichtbare Antwort nichts übrig —
        // der Check meldete „erreichbar" bei leerem Inhalt und hätte ein totes
        // Modell nicht mehr von einem lebenden unterschieden. Ein paar hundert
        // Token kosten fast nichts, zumal das Ergebnis gecacht wird.
        body: JSON.stringify({
          model: MODELL, max_tokens: 512,
          messages: [{ role: 'user', content: 'Antworte nur mit: OK' }],
        }),
      });
      const dauerMs = Date.now() - start;
      if (antwort.ok) {
        const daten = await antwort.json().catch(() => null);
        const inhalt = String(daten?.choices?.[0]?.message?.content || '').trim();
        bericht.modellPruefung = {
          erreichbar: true, dauerMs, antwort: inhalt.slice(0, 40),
        };
        // HTTP 200 mit leerem Text ist KEIN Erfolg. Es bedeutet, dass das
        // Modell antwortet, aber nichts Sichtbares liefert — und genau das
        // würde einem Nutzer als stumme Seite begegnen.
        if (!inhalt) {
          bericht.modellPruefung.erreichbar = false;
          liveProbleme.push(`Modell „${MODELL}" antwortet, liefert aber keinen Text. `
            + 'Bei Reasoning-Modellen deutet das auf ein zu knappes max_tokens hin.');
        }
      } else {
        const detail = await antwort.text().catch(() => '');
        bericht.modellPruefung = { erreichbar: false, httpStatus: antwort.status, detail: detail.slice(0, 200) };
        liveProbleme.push(antwort.status === 404
          ? `Modell „${MODELL}" ist beim Anbieter nicht (mehr) verfügbar — THI_MODEL anpassen.`
          : `Modellaufruf scheiterte mit HTTP ${antwort.status}.`);
      }
    } catch (fehler) {
      bericht.modellPruefung = { erreichbar: false, fehler: String(fehler.message || fehler).slice(0, 200) };
      liveProbleme.push('Modell-Endpunkt nicht erreichbar.');
    }
    probleme.push(...liveProbleme);
    letzterLiveTest = { zeit: Date.now(), ergebnis: bericht.modellPruefung, probleme: liveProbleme };
  }

  if (probleme.length) {
    bericht.status = basis.gefunden && API_KEY && API_URL ? 'warnung' : 'fehler';
    bericht.probleme = probleme;
  }

  return antwort(bericht);
}
