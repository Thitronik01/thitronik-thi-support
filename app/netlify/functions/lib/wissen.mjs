// ============================================================================
// Wissenspflege — was die Wissensmanager steuern und was Thi daraus macht.
// ----------------------------------------------------------------------------
//   Korrekturen   aus thi.korrektur (statt aus dem Bündel), 60 s gecacht
//   Gewichtung    je Artikel: Faktor 0,1–3,0 und Status normal|bevorzugt|veraltet
//   Lücken        Fälle mit dünner Quellenlage, als Signal fürs Wiki
//
// Alles fällt weich aus: Ist die Datenbank nicht erreichbar, antwortet Thi
// mit dem Bündel und ohne Gewichtung — der Support läuft weiter, das
// Function-Log zeigt den Grund.
// ============================================================================

import { rest, supabaseAktiv } from './supabase.mjs';
import { wirksameKorrekturen, korrekturAlsArtikel, zeileZuNotiz } from './korrekturen.mjs';

const CACHE_MS = 60 * 1000;
let korrekturCache = { bis: 0, wert: null };
let gewichtungCache = { bis: 0, wert: null };

// ─── Korrekturen fürs Retrieval ─────────────────────────────────────────────
// Liefert Artikel-Objekte (korrekturAlsArtikel), EINMAL je Cache-Fenster
// erzeugt, damit search-core seine normalisierten Felder je Objekt
// zwischenspeichern kann.
export async function korrekturArtikelLaden(artikel, buendel = []) {
  const jetzt = Date.now();
  if (korrekturCache.wert && korrekturCache.bis > jetzt) return korrekturCache.wert;
  let liste = buendel;
  if (supabaseAktiv()) {
    try {
      const zeilen = await rest('/korrektur?select=*&status=in.(ungeprueft,freigegeben)&order=erstellt.asc');
      liste = zeilen.map(zeileZuNotiz);
    } catch (fehler) {
      console.error('[thi/wissen] Korrekturen nicht ladbar, Bündel greift:', fehler.message);
    }
  }
  const wert = wirksameKorrekturen(liste).map((k) => korrekturAlsArtikel(k, artikel));
  korrekturCache = { bis: jetzt + CACHE_MS, wert };
  return wert;
}

export function korrekturCacheLeeren() { korrekturCache = { bis: 0, wert: null }; }

// ─── Gewichtung ─────────────────────────────────────────────────────────────
export async function gewichtungLaden() {
  const jetzt = Date.now();
  if (gewichtungCache.wert && gewichtungCache.bis > jetzt) return gewichtungCache.wert;
  const wert = new Map();
  if (supabaseAktiv()) {
    try {
      const zeilen = await rest('/gewichtung?select=route,faktor,status,notiz');
      for (const z of zeilen) wert.set(z.route, { faktor: Number(z.faktor) || 1, status: z.status || 'normal', notiz: z.notiz || '' });
    } catch (fehler) {
      console.error('[thi/wissen] Gewichtung nicht ladbar:', fehler.message);
    }
  }
  gewichtungCache = { bis: jetzt + CACHE_MS, wert };
  return wert;
}

export function gewichtungCacheLeeren() { gewichtungCache = { bis: 0, wert: null }; }

// Wendet die Gewichtung auf Treffer an (Artikel oder Abschnitte, beide tragen
// `route` und `score`) und sortiert neu. Ein Faktor verschiebt die
// Reihenfolge, er streicht nichts: Auch „veraltet" (Faktor wird auf höchstens
// 0,3 gedrückt) bleibt auffindbar, wenn nichts Besseres da ist — die Antwort
// trägt dann aber die Markierung und der Prozentwert den Deckel.
export function gewichtungAnwenden(treffer, gewichtung) {
  if (!gewichtung || !gewichtung.size || !Array.isArray(treffer)) return treffer;
  return treffer
    .map((t) => {
      const g = gewichtung.get(t.route);
      if (!g) return t;
      const faktor = g.status === 'veraltet' ? Math.min(g.faktor, 0.3) : g.faktor;
      return { ...t, score: (t.score || 0) * faktor, gewichtung: { faktor, status: g.status, notiz: g.notiz } };
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0));
}

// ─── Lücken ─────────────────────────────────────────────────────────────────
// Best effort, nie blockierend: Ein Fall mit dünner Quellenlage ist ein
// Signal fürs Wiki, kein Fehler der Anfrage.
export async function lueckeMelden({ sprache, frage, produkte, fahrzeug, sicherheit, besterScore, nutzerId }) {
  if (!supabaseAktiv()) return;
  try {
    await rest('/luecke', {
      method: 'POST',
      prefer: 'return=minimal',
      body: {
        sprache: sprache || 'de',
        frage: String(frage || '').slice(0, 600),
        produkte: Array.isArray(produkte) ? produkte.slice(0, 12) : [],
        fahrzeug: fahrzeug || null,
        sicherheit: Number.isFinite(sicherheit) ? Math.round(sicherheit) : null,
        bester_score: Number.isFinite(besterScore) ? Math.round(besterScore) : null,
        nutzer_id: nutzerId || null,
      },
    });
  } catch (fehler) {
    console.error('[thi/wissen] Lücke nicht gespeichert:', fehler.message);
  }
}

// Ab welchem Prozentwert ein Fall als Lücke gilt. Unter 50 heißt in der
// Oberfläche „gering" — genau die Fälle, bei denen der Mitarbeiter selbst
// nachsehen musste.
export const LUECKE_SCHWELLE = 50;
