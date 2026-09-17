// ============================================================================
// Wer ist das, und was darf die Person?
// ----------------------------------------------------------------------------
// Rollen (thi.profile.rolle):
//   mitarbeiter     Fälle aufnehmen, Antworten lesen, Korrekturen einreichen,
//                   eigene Korrekturen zurückziehen
//   wissensmanager  zusätzlich: freigeben, zurückziehen, im-wiki, gewichten
//   admin           zusätzlich: Nutzer einladen, sperren, Rollen setzen
//
// Ein Token gilt als gültig, wenn GoTrue es bestätigt UND ein THI-Profil mit
// aktiv=true existiert. Ein Auth-Nutzer ohne THI-Profil (z. B. aus einem
// anderen System im selben Projekt) kommt nicht hinein.
// ============================================================================

import { auth, rest, supabaseAktiv } from './supabase.mjs';

export const ROLLEN = Object.freeze(['mitarbeiter', 'wissensmanager', 'admin']);

// Rechte-Matrix. Eine Stelle, nicht verstreute if-Abfragen.
const RECHTE = Object.freeze({
  'fall.stellen':           ['mitarbeiter', 'wissensmanager', 'admin'],
  'intern.lesen':           ['mitarbeiter', 'wissensmanager', 'admin'],
  'korrektur.einreichen':   ['mitarbeiter', 'wissensmanager', 'admin'],
  'korrektur.zurueckziehen.eigene': ['mitarbeiter', 'wissensmanager', 'admin'],
  'korrektur.zurueckziehen': ['wissensmanager', 'admin'],
  'korrektur.freigeben':    ['wissensmanager', 'admin'],
  'korrektur.im-wiki':      ['wissensmanager', 'admin'],
  'gewichtung.setzen':      ['wissensmanager', 'admin'],
  'nutzer.verwalten':       ['admin'],
  'health.details':         ['mitarbeiter', 'wissensmanager', 'admin'],
});

export function darf(nutzer, recht) {
  if (!nutzer || !nutzer.aktiv) return false;
  const erlaubt = RECHTE[recht];
  return Array.isArray(erlaubt) && erlaubt.includes(nutzer.rolle);
}

// Token → Nutzer. Kurz zwischengespeichert (pro Instanz), damit nicht jede
// Chat-Anfrage zwei Supabase-Aufrufe kostet. 60 s sind kurz genug, dass eine
// Sperre oder ein Rollenwechsel binnen einer Minute greift.
const CACHE_MS = 60 * 1000;
const cache = new Map(); // token -> { bis, nutzer }

function profilZuNutzer(p) {
  return { id: p.id, email: p.email, name: p.name || p.email, rolle: p.rolle, sprache: p.sprache || 'de', aktiv: p.aktiv !== false };
}

export async function profilLaden(id) {
  const zeilen = await rest(`/profile?id=eq.${encodeURIComponent(id)}&select=*`);
  return Array.isArray(zeilen) && zeilen[0] ? profilZuNutzer(zeilen[0]) : null;
}

export async function nutzerAusToken(token) {
  if (!token || !supabaseAktiv()) return null;
  const jetzt = Date.now();
  const c = cache.get(token);
  if (c && c.bis > jetzt) return c.nutzer;

  let nutzer = null;
  try {
    const u = await auth('/user', { token });
    if (u && u.id && (u.app_metadata || {}).system === 'thi') {
      nutzer = await profilLaden(u.id);
      if (nutzer && !nutzer.aktiv) nutzer = null;
    }
  } catch { nutzer = null; }

  cache.set(token, { bis: jetzt + CACHE_MS, nutzer });
  if (cache.size > 500) for (const [k, v] of cache) if (v.bis <= jetzt) cache.delete(k);
  return nutzer;
}

export function tokenAusAnfrage(anfrage) {
  const kopf = anfrage.headers.get('authorization') || '';
  const m = kopf.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : '';
}

export function nutzerAusAnfrage(anfrage) {
  return nutzerAusToken(tokenAusAnfrage(anfrage));
}

export function cacheLeeren(token) {
  if (token) cache.delete(token); else cache.clear();
}

// Audit-Eintrag — best effort: ein fehlgeschlagener Log-Eintrag darf die
// eigentliche Aktion nicht verhindern, wird aber im Function-Log sichtbar.
export async function audit(nutzer, aktion, ziel = null, details = {}) {
  if (!supabaseAktiv()) return;
  try {
    await rest('/audit', {
      method: 'POST',
      body: { wer: nutzer?.id || null, wer_email: nutzer?.email || null, aktion, ziel, details },
      prefer: 'return=minimal',
    });
  } catch (fehler) {
    console.error('[thi/audit] Eintrag fehlgeschlagen:', fehler.message);
  }
}
