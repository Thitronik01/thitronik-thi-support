// ============================================================================
// THITRONIK Thi — Login und Nutzerverwaltung (Netlify Function, ESM/v2).
// ----------------------------------------------------------------------------
//   POST /api/auth { aktion: … }
//
//   config                       → welcher Zugangsmodus gilt (öffentlich)
//   login     { email, passwort }→ Sitzung + Nutzer
//   erneuern  { refresh_token }  → neue Sitzung
//   abmelden                     → Token ungültig machen
//   passwort  { token, passwort }→ Passwort setzen (Einladung / Zurücksetzen)
//   ich                          → Nutzer zum Token
//   zuruecksetzen { email }      → Mail zum Zurücksetzen (öffentlich, stumm)
//
//   Admin:
//   nutzer                       → Liste aller Profile
//   einladen  { email, name, rolle, sprache }
//   rolle     { id, rolle }
//   aktiv     { id, aktiv }
//   einladung-erneut { email }
//
// Der Browser redet NUR mit dieser Function, nie mit Supabase direkt. Deshalb
// bleibt der Secret Key serverseitig und die CSP bei connect-src 'self'.
//
// ERSTER ADMIN: Solange kein einziges Profil existiert, darf die Adresse aus
// THI_ERSTADMIN sich selbst einladen — ohne Login, weil es noch keins gibt.
// Danach ist dieser Weg geschlossen.
// ============================================================================

import { auth, rest } from './lib/supabase.mjs';
import { ROLLEN, darf, nutzerAusToken, tokenAusAnfrage, profilLaden, cacheLeeren, audit } from './lib/auth.mjs';
import { zugangsModus, clientIp } from './lib/zugang.mjs';

const ERSTADMIN = String(process.env.THI_ERSTADMIN || '').trim().toLowerCase();
let erstadminGeprueft = false; // pro Instanz — die Datenbankabfrage entscheidet, nicht der Merker
const SITE_URL = String(process.env.URL || process.env.THI_SITE_URL || '').replace(/\/+$/, '');

// Login-Fehlversuche bremsen — pro Instanz, wie die anderen Zähler. Supabase
// bremst zusätzlich serverseitig (Rate-Limits im Auth-Dienst).
const versuche = new Map();
const VERSUCHE_MAX = 10;
const VERSUCHE_FENSTER_MS = 15 * 60 * 1000;
function zuVieleVersuche(ip) {
  const jetzt = Date.now();
  const e = versuche.get(ip);
  if (!e || jetzt > e.bis) { versuche.set(ip, { anzahl: 1, bis: jetzt + VERSUCHE_FENSTER_MS }); return false; }
  e.anzahl += 1;
  return e.anzahl > VERSUCHE_MAX;
}

function json(daten, status = 200) {
  return new Response(JSON.stringify(daten), {
    status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailNorm = (e) => String(e || '').trim().toLowerCase();

function sitzung(daten) {
  return {
    access_token: daten.access_token,
    refresh_token: daten.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + Number(daten.expires_in || 3600),
  };
}

// Passwort-Mindestregel. Länge schlägt Komplexität; 12 Zeichen sind das Minimum,
// das Supabase-seitig zusätzlich konfiguriert werden kann.
function passwortPruefen(p) {
  const s = String(p || '');
  if (s.length < 12) return 'Das Passwort braucht mindestens 12 Zeichen.';
  if (/^(.)\1+$/.test(s)) return 'Das Passwort ist zu einfach.';
  return null;
}

async function anzahlProfile() {
  const zeilen = await rest('/profile?select=id&limit=1');
  return Array.isArray(zeilen) ? zeilen.length : 0;
}

// Nutzer anlegen (Auth + Profil) und Mail zum Passwort-Setzen schicken.
// Auth-Nutzer wird per Admin-API mit app_metadata.system='thi' angelegt —
// der Trigger legt das Profil an; zur Sicherheit wird es hier zusätzlich
// per Upsert geschrieben (falls der Trigger je fehlt).
async function nutzerAnlegen({ email, name, rolle, sprache }) {
  let user;
  try {
    user = await auth('/admin/users', {
      method: 'POST',
      body: {
        email, email_confirm: true,
        app_metadata: { system: 'thi', rolle },
        user_metadata: { name, sprache },
      },
    });
  } catch (fehler) {
    // Existiert der Auth-Nutzer schon (z. B. aus einem anderen System im
    // selben Projekt), wird er für THI freigeschaltet statt neu angelegt.
    if (fehler.status !== 422 && fehler.status !== 400) throw fehler;
    const liste = await auth(`/admin/users?page=1&per_page=1000`);
    user = (liste?.users || []).find((u) => emailNorm(u.email) === email);
    if (!user) throw fehler;
    await auth(`/admin/users/${user.id}`, {
      method: 'PUT',
      body: { app_metadata: { ...(user.app_metadata || {}), system: 'thi', rolle }, user_metadata: { ...(user.user_metadata || {}), name, sprache } },
    });
  }
  await rest('/profile', {
    method: 'POST',
    body: { id: user.id, email, name, rolle, sprache, aktiv: true },
    prefer: 'resolution=merge-duplicates,return=minimal',
  });
  await einladungSenden(email);
  return user;
}

// „Einladung" = Mail zum Passwort-Setzen. Der Recovery-Weg funktioniert für
// jeden vorhandenen Nutzer zuverlässig; der Link führt auf die Site URL mit
// #access_token&type=recovery, worauf das Frontend das Passwort-Formular zeigt.
async function einladungSenden(email) {
  await auth('/recover', { method: 'POST', body: { email, ...(SITE_URL ? { redirect_to: `${SITE_URL}/` } : {}) } });
}

// ════════════════════════════════════════════════════════════════════════════
export default async function handler(anfrage) {
  if (anfrage.method !== 'POST') return json({ fehler: 'method_not_allowed' }, 405);
  let körper;
  try { körper = await anfrage.json(); } catch { return json({ fehler: 'ungueltiges_json' }, 400); }
  const aktion = String(körper.aktion || '');
  const modus = zugangsModus();

  // ── Öffentlich ────────────────────────────────────────────────────────────
  if (aktion === 'config') {
    // Erster Admin: Beim allerersten Aufruf nach der Einrichtung — noch kein
    // einziges Profil — wird THI_ERSTADMIN angelegt und bekommt die Mail zum
    // Passwort-Setzen. Danach ist dieser Weg geschlossen. So braucht es keine
    // Kommandozeile für den Start.
    if (modus === 'login' && ERSTADMIN && !erstadminGeprueft) {
      erstadminGeprueft = true;
      try {
        if (await anzahlProfile() === 0) {
          await nutzerAnlegen({ email: ERSTADMIN, name: 'Admin', rolle: 'admin', sprache: 'de' });
          await audit(null, 'nutzer.erstadmin', ERSTADMIN);
          console.log(`[thi/auth] Erster Admin angelegt und eingeladen: ${ERSTADMIN}`);
        }
      } catch (fehler) {
        erstadminGeprueft = false; // beim nächsten Aufruf erneut versuchen
        console.error('[thi/auth] Erster Admin konnte nicht angelegt werden:', fehler.message);
      }
    }
    return json({ modus, siteUrl: SITE_URL || null });
  }

  if (modus !== 'login') {
    return json({ fehler: 'kein_login', meldung: 'Login ist serverseitig nicht eingerichtet (THI_SUPABASE_URL / THI_SUPABASE_SECRET_KEY).', modus }, 503);
  }

  const ip = clientIp(anfrage);

  try {
    if (aktion === 'login') {
      if (zuVieleVersuche(ip)) return json({ fehler: 'gesperrt', meldung: 'Zu viele Fehlversuche. Bitte in 15 Minuten erneut versuchen.' }, 429);
      const email = emailNorm(körper.email);
      const passwort = String(körper.passwort || '');
      if (!EMAIL_RE.test(email) || !passwort) return json({ fehler: 'login', meldung: 'E-Mail oder Passwort fehlt.' }, 400);
      let daten;
      try {
        daten = await auth('/token?grant_type=password', { method: 'POST', body: { email, password: passwort } });
      } catch {
        return json({ fehler: 'login', meldung: 'E-Mail oder Passwort stimmt nicht.' }, 401);
      }
      const nutzer = await nutzerAusToken(daten.access_token);
      if (!nutzer) {
        // Gültiges Konto, aber kein (aktives) THI-Profil — Token sofort wegwerfen.
        try { await auth('/logout', { method: 'POST', token: daten.access_token }); } catch { /* egal */ }
        return json({ fehler: 'kein_zugang', meldung: 'Dieses Konto ist für Thi nicht freigeschaltet.' }, 403);
      }
      await audit(nutzer, 'login');
      return json({ ok: true, sitzung: sitzung(daten), nutzer });
    }

    if (aktion === 'erneuern') {
      const refresh = String(körper.refresh_token || '');
      if (!refresh) return json({ fehler: 'login' }, 401);
      let daten;
      try {
        daten = await auth('/token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: refresh } });
      } catch { return json({ fehler: 'login', meldung: 'Sitzung abgelaufen. Bitte neu anmelden.' }, 401); }
      const nutzer = await nutzerAusToken(daten.access_token);
      if (!nutzer) return json({ fehler: 'kein_zugang' }, 403);
      return json({ ok: true, sitzung: sitzung(daten), nutzer });
    }

    if (aktion === 'passwort') {
      // Token kommt aus dem Einladungs-/Zurücksetzen-Link (URL-Fragment).
      const token = String(körper.token || tokenAusAnfrage(anfrage) || '');
      const fehler = passwortPruefen(körper.passwort);
      if (fehler) return json({ fehler: 'passwort', meldung: fehler }, 400);
      if (!token) return json({ fehler: 'login' }, 401);
      let u;
      try { u = await auth('/user', { method: 'PUT', token, body: { password: String(körper.passwort) } }); }
      catch { return json({ fehler: 'login', meldung: 'Der Link ist abgelaufen oder ungültig. Bitte eine neue Einladung anfordern.' }, 401); }
      cacheLeeren(token);
      const nutzer = await profilLaden(u.id);
      if (!nutzer || !nutzer.aktiv) return json({ fehler: 'kein_zugang', meldung: 'Dieses Konto ist für Thi nicht freigeschaltet.' }, 403);
      // Frische Sitzung: Der Link-Token ist kurzlebig; ein normaler Login
      // mit dem neuen Passwort liefert Access- und Refresh-Token.
      const daten = await auth('/token?grant_type=password', { method: 'POST', body: { email: nutzer.email, password: String(körper.passwort) } });
      await audit(nutzer, 'passwort.gesetzt');
      return json({ ok: true, sitzung: sitzung(daten), nutzer });
    }

    if (aktion === 'zuruecksetzen') {
      // Bewusst immer dieselbe Antwort — ob die Adresse existiert, wird nicht verraten.
      const email = emailNorm(körper.email);
      if (EMAIL_RE.test(email) && !zuVieleVersuche(ip)) {
        try { await einladungSenden(email); } catch { /* stumm */ }
      }
      return json({ ok: true, meldung: 'Falls die Adresse bekannt ist, wurde eine Mail verschickt.' });
    }

    // ── Ab hier: eingeloggt ────────────────────────────────────────────────
    const token = tokenAusAnfrage(anfrage);
    const nutzer = await nutzerAusToken(token);
    if (!nutzer) return json({ fehler: 'login', meldung: 'Bitte anmelden.' }, 401);

    if (aktion === 'ich') return json({ ok: true, nutzer });

    if (aktion === 'abmelden') {
      try { await auth('/logout', { method: 'POST', token }); } catch { /* Token war schon weg */ }
      cacheLeeren(token);
      return json({ ok: true });
    }

    // ── Admin ──────────────────────────────────────────────────────────────
    if (!darf(nutzer, 'nutzer.verwalten')) return json({ fehler: 'verboten', meldung: 'Nur Admins verwalten Nutzer.' }, 403);

    if (aktion === 'nutzer') {
      const liste = await rest('/profile?select=id,email,name,rolle,sprache,aktiv,erstellt&order=name.asc');
      return json({ ok: true, nutzer: liste });
    }

    if (aktion === 'einladen') {
      const email = emailNorm(körper.email);
      const name = String(körper.name || '').trim().slice(0, 60);
      const rolle = ROLLEN.includes(körper.rolle) ? körper.rolle : 'mitarbeiter';
      const sprache = körper.sprache === 'fr' ? 'fr' : 'de';
      if (!EMAIL_RE.test(email)) return json({ fehler: 'ungueltig', meldung: 'E-Mail-Adresse ungültig.' }, 400);
      if (name.length < 2) return json({ fehler: 'ungueltig', meldung: 'Name fehlt.' }, 400);
      await nutzerAnlegen({ email, name, rolle, sprache });
      await audit(nutzer, 'nutzer.einladen', email, { rolle, sprache });
      return json({ ok: true, meldung: `Einladung an ${email} verschickt.` }, 201);
    }

    if (aktion === 'einladung-erneut') {
      const email = emailNorm(körper.email);
      if (!EMAIL_RE.test(email)) return json({ fehler: 'ungueltig' }, 400);
      await einladungSenden(email);
      await audit(nutzer, 'nutzer.einladung-erneut', email);
      return json({ ok: true, meldung: `Mail an ${email} verschickt.` });
    }

    if (aktion === 'rolle' || aktion === 'aktiv') {
      const id = String(körper.id || '');
      if (!id) return json({ fehler: 'ungueltig' }, 400);
      if (id === nutzer.id) return json({ fehler: 'verboten', meldung: 'Die eigene Rolle oder Sperre ändert ein anderer Admin.' }, 403);
      const aenderung = aktion === 'rolle'
        ? { rolle: ROLLEN.includes(körper.rolle) ? körper.rolle : null }
        : { aktiv: Boolean(körper.aktiv) };
      if (aenderung.rolle === null) return json({ fehler: 'ungueltig', meldung: 'Unbekannte Rolle.' }, 400);
      const zeilen = await rest(`/profile?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: { ...aenderung, geaendert: new Date().toISOString() }, prefer: 'return=representation' });
      if (!zeilen?.length) return json({ fehler: 'unbekannt' }, 404);
      // app_metadata mitziehen, damit ein neues Token die Rolle trägt; und
      // eine Sperre sofort wirken lassen, indem alle Sitzungen enden.
      if (aktion === 'rolle') {
        const u = await auth(`/admin/users/${id}`);
        await auth(`/admin/users/${id}`, { method: 'PUT', body: { app_metadata: { ...(u.app_metadata || {}), rolle: aenderung.rolle } } });
      }
      if (aktion === 'aktiv' && !aenderung.aktiv) {
        try { await auth(`/admin/users/${id}/logout`, { method: 'POST' }); } catch { /* ältere GoTrue-Versionen */ }
      }
      cacheLeeren();
      await audit(nutzer, `nutzer.${aktion}`, id, aenderung);
      return json({ ok: true, nutzer: zeilen[0] });
    }

    return json({ fehler: 'ungueltig', meldung: `Unbekannte Aktion „${aktion}".` }, 400);
  } catch (fehler) {
    console.error('[thi/auth]', aktion, fehler);
    return json({ fehler: 'server', meldung: 'Anmeldedienst nicht erreichbar. Details stehen im Function-Log.' }, 502);
  }
}
