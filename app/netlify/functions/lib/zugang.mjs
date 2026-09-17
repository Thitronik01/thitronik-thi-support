// ============================================================================
// Zugangsprüfung — gemeinsam für chat, korrektur, health und auth.
// ----------------------------------------------------------------------------
// Zwei Betriebsarten, entschieden durch die Konfiguration:
//
//   LOGIN        THI_SUPABASE_URL + THI_SUPABASE_SECRET_KEY gesetzt.
//                Token im Header `Authorization: Bearer …`, Person und Rolle
//                aus thi.profile. Das ist der Zielzustand.
//   ZUGANGSWORT  nur THI_ZUGANGSWORT gesetzt. Ein gemeinsames Wort im Header
//                `x-zugangswort`, keine Identität. Übergangsbetrieb, damit die
//                Produktion nicht bricht, bevor Supabase eingetragen ist.
//   OFFEN        nichts gesetzt. Seite ist öffentlich; der Health-Check
//                meldet das als Problem.
//
// Ergebnis: { ok, modus, nutzer?, grund? }. Im Zugangswort- und Offen-Modus
// ist `nutzer` ein Platzhalter mit Rolle „mitarbeiter", damit die Rechte-
// prüfung überall dieselbe ist. Freigaben verlangen dort weiter das
// Freigabewort (korrektur.mjs).
// ============================================================================

import { timingSafeEqual } from 'node:crypto';
import { supabaseAktiv } from './supabase.mjs';
import { nutzerAusAnfrage } from './auth.mjs';

export const ZUGANGSWORT = process.env.THI_ZUGANGSWORT || '';

export function zugangsModus() {
  if (supabaseAktiv()) return 'login';
  if (ZUGANGSWORT) return 'zugangswort';
  return 'offen';
}

// Zeichengenauer Vergleich in konstanter Zeit.
export function wortPruefen(gesendet, erwartet) {
  if (!erwartet) return true;
  const a = Buffer.from(String(gesendet || ''), 'utf8');
  const b = Buffer.from(String(erwartet), 'utf8');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function clientIp(anfrage) {
  return (anfrage.headers.get('x-nf-client-connection-ip')
    || anfrage.headers.get('x-forwarded-for') || 'unbekannt').split(',')[0].trim();
}

const PLATZHALTER = Object.freeze({ id: null, email: null, name: '', rolle: 'mitarbeiter', sprache: 'de', aktiv: true, platzhalter: true });

export async function zugangPruefen(anfrage) {
  const modus = zugangsModus();
  if (modus === 'login') {
    const nutzer = await nutzerAusAnfrage(anfrage);
    return nutzer ? { ok: true, modus, nutzer } : { ok: false, modus, grund: 'login' };
  }
  if (modus === 'zugangswort') {
    const gesendet = anfrage.headers.get('x-zugangswort') || '';
    return wortPruefen(gesendet, ZUGANGSWORT)
      ? { ok: true, modus, nutzer: PLATZHALTER }
      : { ok: false, modus, grund: 'zugang' };
  }
  return { ok: true, modus, nutzer: PLATZHALTER, offen: true };
}
