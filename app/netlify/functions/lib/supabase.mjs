// ============================================================================
// Supabase-Zugriff — nur per fetch, kein npm-Paket.
// ----------------------------------------------------------------------------
// Zwei Endpunkte desselben Projekts:
//   /auth/v1  GoTrue: Login, Token prüfen, Nutzer verwalten
//   /rest/v1  PostgREST: Tabellen im Schema `thi`
//
// Der Secret Key bleibt in dieser Function. Der Browser spricht NIE direkt
// mit Supabase — Login, Passwort setzen und Token-Erneuerung laufen über
// /api/auth. Damit bleibt die CSP bei connect-src 'self', und ein Wechsel des
// Anbieters betrifft genau diese Datei plus auth.mjs.
// ============================================================================

export const SB_URL = String(process.env.THI_SUPABASE_URL || '').replace(/\/+$/, '');
export const SB_KEY = process.env.THI_SUPABASE_SECRET_KEY || '';

export function supabaseAktiv() {
  return Boolean(SB_URL && SB_KEY);
}

class SupabaseFehler extends Error {
  constructor(status, text, pfad) {
    super(`Supabase ${status} bei ${pfad}: ${text.slice(0, 200)}`);
    this.status = status;
    this.detail = text;
  }
}

async function aufruf(url, init, pfad) {
  const antwort = await fetch(url, init);
  const text = await antwort.text();
  let daten = null;
  try { daten = text ? JSON.parse(text) : null; } catch { /* kein JSON */ }
  if (!antwort.ok) throw new SupabaseFehler(antwort.status, (daten && (daten.msg || daten.message || daten.error_description || daten.error)) || text, pfad);
  return daten;
}

// PostgREST im Schema `thi`. `pfad` z. B. '/profile?id=eq.…&select=*'.
export function rest(pfad, { method = 'GET', body, prefer, schema = 'thi' } = {}) {
  return aufruf(`${SB_URL}/rest/v1${pfad}`, {
    method,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      'Accept-Profile': schema,
      'Content-Profile': schema,
      'content-type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  }, pfad);
}

export function rpc(name, argumente = {}) {
  return rest(`/rpc/${name}`, { method: 'POST', body: argumente });
}

// GoTrue. Mit `token` handelt die Anfrage im Namen des Nutzers (z. B.
// /user, /logout), sonst mit dem Secret Key (Admin-Endpunkte, Login).
export function auth(pfad, { method = 'GET', body, token } = {}) {
  return aufruf(`${SB_URL}/auth/v1${pfad}`, {
    method,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${token || SB_KEY}`,
      'content-type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  }, pfad);
}

export { SupabaseFehler };
