// ============================================================================
// Health-Check.
// ----------------------------------------------------------------------------
// Existiert wegen einer konkreten Betriebserfahrung: Der Vorgänger-Bot war
// WOCHENLANG tot, weil das konfigurierte Modell vom Anbieter abgekündigt wurde
// (HTTP 404 bei jedem Aufruf) — und niemand merkte es, weil der Modellname nur
// in einer nicht versionierten Umgebungsvariable stand
// (docs/01_RAG_WISSENSTRANSFER.md §7).
//
//   GET /api/health          → Konfiguration + Wissensbasis prüfen
//   GET /api/health?live=1   → zusätzlich ein ECHTER Mini-Modellaufruf
//
// Der Live-Test kostet ein paar Token und ist deshalb nicht der Standard —
// aber er ist der einzige Check, der ein totes Modell zuverlässig findet.
// ============================================================================

import ARTIKEL from '../../data/artikel.mjs';
import SEKTIONEN from '../../data/sektionen.mjs';

const API_URL = process.env.ANYMIZE_API_URL || process.env.Anymize_API_URL || '';
const API_KEY = process.env.ANYMIZE_API_KEY || process.env.Anymize_API_KEY || '';
const MODELL = process.env.THI_MODEL || 'anthropic/claude-sonnet-4.6';

// ─── Kostenbremse für den Live-Test ─────────────────────────────────────────
// Dieser Endpunkt ist bewusst OHNE Zugangswort erreichbar — er soll auch dann
// antworten, wenn die Konfiguration kaputt ist, und er wird per URL im Browser
// aufgerufen, wo sich kein Header setzen lässt. `?live=1` löst aber einen
// echten Modellaufruf aus: ungebremst könnte jeder, der die Adresse kennt,
// beliebig oft auf fremde Rechnung Token verbrauchen.
//
// Statt den Zugriff zu sperren (und damit den dokumentierten Browser-Aufruf
// unbrauchbar zu machen), wird das ERGEBNIS zwischengespeichert: Ob das Modell
// erreichbar ist, ändert sich nicht im Sekundentakt. Tausend Abrufe je Minute
// kosten damit genau einen Modellaufruf.
//
// Wie das Rate-Limit in chat.mjs gilt der Cache PRO Function-Instanz. Das
// genügt hier: Er soll Dauerfeuer bremsen, nicht exakt zählen. Im dev-server
// greift er nicht, weil der die Module bei jeder Anfrage neu lädt.
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

export default async function handler(anfrage) {
  const url = new URL(anfrage.url);
  const live = url.searchParams.get('live') === '1';

  const basis = findeBasis();
  const bericht = {
    status: 'ok',
    zeit: new Date().toISOString(),
    konfiguration: {
      apiUrlGesetzt: !!API_URL,
      apiKeyGesetzt: !!API_KEY,
      modell: MODELL,
      zugangswortAktiv: !!process.env.THI_ZUGANGSWORT,
    },
    wissensbasis: basis,
    modellPruefung: live ? null : 'übersprungen (mit ?live=1 erzwingen)',
  };

  const probleme = [];
  if (!basis.gefunden) probleme.push('Wissensbasis nicht ladbar (data/artikel.mjs).');
  if (!API_URL) probleme.push('ANYMIZE_API_URL ist nicht gesetzt.');
  if (!API_KEY) probleme.push('ANYMIZE_API_KEY ist nicht gesetzt.');
  if (!process.env.THI_ZUGANGSWORT) {
    probleme.push('THI_ZUGANGSWORT ist NICHT gesetzt — die Seite ist öffentlich nutzbar '
      + 'und der API-Schlüssel damit auf fremde Kosten verwendbar.');
  }

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

  return new Response(JSON.stringify(bericht, null, 2), {
    status: bericht.status === 'fehler' ? 503 : 200,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}
