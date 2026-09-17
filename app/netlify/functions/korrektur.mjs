// ============================================================================
// THITRONIK Thi Support — Korrekturen-Endpunkt (Netlify Function, ESM/v2).
// ----------------------------------------------------------------------------
//   GET  /api/korrektur                     Liste aller Korrekturen
//   POST /api/korrektur { aktion: 'anlegen', notiz }
//   POST /api/korrektur { aktion: 'freigeben'|'zurueckziehen'|'im-wiki',
//                         id, von, begruendung, freigabewort }
//
// WO DIE DATEN LIEGEN — und warum (docs/07_KORREKTUREN_ENTWUERFE.md, Entwurf A):
// Git ist die Datenbank. Diese Function schreibt `app/data/korrekturen.json`
// und das daraus gebaute `korrekturen.mjs` per GitHub-API in EINEN Commit auf
// den Deploy-Branch. Der Push löst den Netlify-Deploy aus; chat.mjs importiert
// die .mjs statisch — mit denselben Bundler-Garantien wie die Wissensbasis.
// Damit gibt es Historie (git log), Diff, Revert und Netlify-Rollback gratis,
// ohne Datenbank, ohne npm-Paket, ohne Laufzeit-Zustand.
//
// Konsequenz, die man kennen muss: Eine Korrektur WIRKT ERST NACH DEM DEPLOY,
// nicht in der nächsten Sekunde. Die Oberfläche sagt das.
//
// Der Git-Data-Weg (Blob → Tree → Commit → Ref) statt zweier Contents-PUTs:
// beide Dateien landen atomar in einem Commit, und ein gleichzeitiger zweiter
// Schreiber scheitert sauber am Ref-Update (422) statt die Hälfte zu
// überschreiben. Dann wird einmal neu gelesen und wiederholt.
//
// Lokal ohne Token: THI_KORREKTUREN_LOKAL=1 schreibt in data/ auf der Platte
// (nur für dev-server.mjs gedacht — auf Netlify ist das Dateisystem nicht
// beschreibbar, und die Variable bleibt dort ungesetzt).
// ============================================================================

import ARTIKEL from '../../data/artikel.mjs';
import KORREKTUREN from '../../data/korrekturen.mjs';
import {
  STATUS, UEBERGAENGE, validiereNotiz, erzeugeNotiz, wechsleStatus,
  baueJsonText, baueModulText,
} from './lib/korrekturen.mjs';
import { ZUGANGSWORT, zugangPruefen, wortPruefen, clientIp } from './lib/zugang.mjs';
import { darf, audit } from './lib/auth.mjs';

// ─── Konfiguration ──────────────────────────────────────────────────────────
// Freigabewort: eigenes Wort, sonst das Zugangswort. Bei einem kleinen Team
// ist ein drittes Geheimnis nur Bürokratie — die eigentliche Sicherung ist die
// Vier-Augen-Regel in wechsleStatus (Freigeber ≠ Autor). Fehlen beide Wörter,
// sind Freigaben deaktiviert (fail-closed).
const FREIGABEWORT = process.env.THI_FREIGABEWORT || ZUGANGSWORT;
const GITHUB_TOKEN = process.env.THI_GITHUB_TOKEN || '';
const GITHUB_REPO = process.env.THI_GITHUB_REPO || 'Thitronik01/thitronik-thi-support';
const GITHUB_BRANCH = process.env.THI_GITHUB_BRANCH || 'main';
// Pfad im Repository — Netlify hat `app` als Base directory, im Repo liegt
// die Wissensbasis aber unter app/data.
const GITHUB_PFAD = (process.env.THI_GITHUB_PFAD || 'app/data').replace(/^\/+|\/+$/g, '');
const LOKAL = process.env.THI_KORREKTUREN_LOKAL === '1';

const RL_FENSTER_MS = 15 * 60 * 1000;
const RL_MAX = Number(process.env.THI_KORREKTUR_LIMIT || 30);
const treffer = new Map();

const MAX_KOERPER = 16_000;

function json(daten, status = 200) {
  return new Response(JSON.stringify(daten), {
    status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

function limitPruefen(ip) {
  const jetzt = Date.now();
  const e = treffer.get(ip);
  if (!e || jetzt > e.bis) { treffer.set(ip, { anzahl: 1, bis: jetzt + RL_FENSTER_MS }); return false; }
  e.anzahl += 1;
  if (treffer.size > 2000) for (const [k, v] of treffer) if (jetzt > v.bis) treffer.delete(k);
  return e.anzahl > RL_MAX;
}

// ─── GitHub ─────────────────────────────────────────────────────────────────
const GH = 'https://api.github.com';

async function gh(pfad, init = {}) {
  const antwort = await fetch(`${GH}${pfad}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'thitronik-thi-support',
      ...(init.body ? { 'content-type': 'application/json' } : {}),
      ...(init.headers || {}),
    },
  });
  const text = await antwort.text();
  let daten = null;
  try { daten = text ? JSON.parse(text) : null; } catch { /* kein JSON */ }
  if (!antwort.ok) {
    const fehler = new Error(`GitHub ${antwort.status} bei ${pfad}: ${(daten && daten.message) || text.slice(0, 160)}`);
    fehler.status = antwort.status;
    throw fehler;
  }
  return daten;
}

// Liest den AKTUELLEN Bestand aus dem Repository — nicht aus dem Bündel.
// Zwischen Commit und Deploy wäre das Bündel veraltet, und zwei Korrekturen
// kurz nacheinander würden sich sonst gegenseitig überschreiben.
async function listeLesen() {
  if (LOKAL) return lokalLesen();
  if (!GITHUB_TOKEN) return { liste: KORREKTUREN, quelle: 'bundle' };
  const datei = await gh(`/repos/${GITHUB_REPO}/contents/${GITHUB_PFAD}/korrekturen.json?ref=${encodeURIComponent(GITHUB_BRANCH)}`);
  const inhalt = Buffer.from(String(datei.content || ''), 'base64').toString('utf8');
  const liste = JSON.parse(inhalt || '[]');
  return { liste: Array.isArray(liste) ? liste : [], quelle: 'github' };
}

async function listeSchreiben(liste, nachricht, autor) {
  if (LOKAL) return lokalSchreiben(liste);
  const dateien = [
    { path: `${GITHUB_PFAD}/korrekturen.json`, content: baueJsonText(liste) },
    { path: `${GITHUB_PFAD}/korrekturen.mjs`, content: baueModulText(liste) },
  ];
  const ref = await gh(`/repos/${GITHUB_REPO}/git/ref/heads/${encodeURIComponent(GITHUB_BRANCH)}`);
  const elternSha = ref.object.sha;
  const eltern = await gh(`/repos/${GITHUB_REPO}/git/commits/${elternSha}`);
  const baum = await gh(`/repos/${GITHUB_REPO}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({
      base_tree: eltern.tree.sha,
      tree: dateien.map((d) => ({ path: d.path, mode: '100644', type: 'blob', content: d.content })),
    }),
  });
  const commit = await gh(`/repos/${GITHUB_REPO}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({
      message: nachricht,
      tree: baum.sha,
      parents: [elternSha],
      // Der Name ist selbst erklärt (Formularfeld) — kein Nachweis, aber im
      // Log sichtbar. Die E-Mail ist ein Platzhalter, damit Git zufrieden ist.
      author: { name: autor, email: 'thi-korrekturen@users.noreply.github.com' },
    }),
  });
  await gh(`/repos/${GITHUB_REPO}/git/refs/heads/${encodeURIComponent(GITHUB_BRANCH)}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });
  return { commit: commit.sha, quelle: 'github' };
}

// Lesen → ändern → schreiben, mit EINEM Wiederholungsversuch bei Konflikt.
async function aendern(veraendere, nachricht, autor) {
  let letzter = null;
  for (let versuch = 0; versuch < 2; versuch += 1) {
    const { liste } = await listeLesen();
    const ergebnis = veraendere(liste);
    if (!ergebnis.ok) return ergebnis;
    try {
      const geschrieben = await listeSchreiben(ergebnis.liste, nachricht, autor);
      return { ...ergebnis, ...geschrieben };
    } catch (fehler) {
      letzter = fehler;
      if (fehler.status !== 422 && fehler.status !== 409) throw fehler;
    }
  }
  throw letzter;
}

// ─── Lokaler Modus (nur dev-server) ─────────────────────────────────────────
async function lokalPfade() {
  const { fileURLToPath } = await import('node:url');
  const path = await import('node:path');
  const hier = path.dirname(fileURLToPath(import.meta.url));
  const daten = path.join(hier, '..', '..', 'data');
  return { json: path.join(daten, 'korrekturen.json'), mjs: path.join(daten, 'korrekturen.mjs') };
}

async function lokalLesen() {
  const fs = await import('node:fs');
  const p = await lokalPfade();
  try {
    const liste = JSON.parse(fs.readFileSync(p.json, 'utf8') || '[]');
    return { liste: Array.isArray(liste) ? liste : [], quelle: 'lokal' };
  } catch { return { liste: [], quelle: 'lokal' }; }
}

async function lokalSchreiben(liste) {
  const fs = await import('node:fs');
  const p = await lokalPfade();
  fs.writeFileSync(p.json, baueJsonText(liste), 'utf8');
  fs.writeFileSync(p.mjs, baueModulText(liste), 'utf8');
  return { commit: null, quelle: 'lokal' };
}

// ─── Antwort-Hilfen ─────────────────────────────────────────────────────────
function oeffentlich(k) {
  // Der Auslöser (Frage + Antwortauszug) bleibt im Bestand, wird aber nicht
  // in der Liste ausgeliefert — er ist Kontext für die Redaktion, nicht für
  // die Oberfläche.
  const { ausloeser, ...rest } = k;
  return rest;
}

// Was die Oberfläche wissen muss. Im Login-Modus folgt „darf freigeben" aus
// der Rolle der Person; im Zugangswort-Modus aus dem Vorhandensein eines
// Freigabeworts (das dann im Formular abgefragt wird).
function konfiguration(zugang) {
  const login = zugang.modus === 'login';
  return {
    schreibenMoeglich: LOKAL || !!GITHUB_TOKEN,
    freigabeMoeglich: login ? darf(zugang.nutzer, 'korrektur.freigeben') : !!FREIGABEWORT,
    zugangsModus: zugang.modus,
    modus: LOKAL ? 'lokal' : (GITHUB_TOKEN ? 'github' : 'nur-lesen'),
    repo: GITHUB_TOKEN ? GITHUB_REPO : null,
    branch: GITHUB_TOKEN ? GITHUB_BRANCH : null,
  };
}

// ════════════════════════════════════════════════════════════════════════════
export default async function handler(anfrage) {
  const ip = clientIp(anfrage);

  // Zugang wie bei /api/chat — ohne Fehlversuchs-Sperre, weil hier kein
  // Modell dranhängt und das Zugangswort ohnehin dort geprüft wird.
  const zugang = await zugangPruefen(anfrage);
  if (!zugang.ok) {
    return json({ fehler: zugang.grund, meldung: zugang.modus === 'login' ? 'Bitte anmelden.' : 'Zugangswort fehlt oder ist falsch.' }, 401);
  }
  const nutzer = zugang.nutzer;
  const login = zugang.modus === 'login';

  if (anfrage.method === 'GET') {
    try {
      const { liste, quelle } = await listeLesen();
      return json({ korrekturen: liste.map(oeffentlich), quelle, ...konfiguration(zugang) });
    } catch (fehler) {
      console.error('[thi/korrektur] Lesen fehlgeschlagen:', fehler);
      // Rückfall auf das Bündel — die Liste ist dann höchstens einen Deploy alt.
      // Die Ursache steht im Log, nicht in der Antwort.
      return json({ korrekturen: KORREKTUREN.map(oeffentlich), quelle: 'bundle', ...konfiguration(zugang), warnung: 'Der aktuelle Bestand konnte nicht gelesen werden — angezeigt wird der Stand des letzten Deploys.' });
    }
  }

  if (anfrage.method !== 'POST') return json({ fehler: 'method_not_allowed' }, 405);
  if (limitPruefen(ip)) return json({ fehler: 'rate_limit', meldung: 'Zu viele Änderungen in kurzer Zeit. Bitte kurz warten.' }, 429);

  if (!LOKAL && !GITHUB_TOKEN) {
    return json({
      fehler: 'nicht_konfiguriert',
      meldung: 'Korrekturen können nicht gespeichert werden: THI_GITHUB_TOKEN ist serverseitig nicht hinterlegt.',
      ...konfiguration(zugang),
    }, 503);
  }

  let körper;
  try {
    const roh = await anfrage.text();
    if (roh.length > MAX_KOERPER) return json({ fehler: 'zu_gross' }, 413);
    körper = JSON.parse(roh);
  } catch { return json({ fehler: 'ungueltiges_json' }, 400); }

  const aktion = String(körper.aktion || '');

  try {
    // ── Anlegen ─────────────────────────────────────────────────────────────
    if (aktion === 'anlegen') {
      if (!darf(nutzer, 'korrektur.einreichen')) return json({ fehler: 'verboten' }, 403);
      // Im Login-Modus ist der Autor die eingeloggte Person — kein Formularfeld.
      const roh = login ? { ...(körper.notiz || {}), autor: nutzer.name } : körper.notiz;
      const pruefung = validiereNotiz(roh, ARTIKEL);
      if (!pruefung.ok) return json({ fehler: 'ungueltig', fehlerliste: pruefung.fehler }, 400);
      const notiz = erzeugeNotiz(pruefung.notiz);
      if (login) { notiz.autorId = nutzer.id; notiz.autorEmail = nutzer.email; }
      const ergebnis = await aendern(
        (liste) => ({ ok: true, liste: [...liste, notiz] }),
        `Korrektur angelegt: ${notiz.titel} [${notiz.status}] — ${notiz.autor}`,
        notiz.autor,
      );
      await audit(nutzer, 'korrektur.anlegen', notiz.id, { status: notiz.status, titel: notiz.titel });
      return json({
        ok: true,
        notiz: oeffentlich(notiz),
        wirkt: notiz.status === STATUS.WARTET ? 'nach-freigabe' : (ergebnis.quelle === 'lokal' ? 'sofort-lokal' : 'nach-deploy'),
        commit: ergebnis.commit || null,
        ...konfiguration(zugang),
      }, 201);
    }

    // ── Statuswechsel ───────────────────────────────────────────────────────
    if (UEBERGAENGE[aktion]) {
      const id = String(körper.id || '').trim();
      if (!id) return json({ fehler: 'ungueltig', fehlerliste: ['id fehlt.'] }, 400);

      if (login) {
        // Rechte aus der Rolle. Zurückziehen der EIGENEN Korrektur darf jeder;
        // fremde nur Wissensmanager und Admin. Freigeben und Im-Wiki: nur die.
        const recht = aktion === 'freigeben' ? 'korrektur.freigeben'
          : aktion === 'im-wiki' ? 'korrektur.im-wiki' : 'korrektur.zurueckziehen';
        if (!darf(nutzer, recht)) {
          if (aktion !== 'zurueckziehen') return json({ fehler: 'verboten', meldung: 'Freigeben dürfen Wissensmanager und Admins.' }, 403);
          const { liste } = await listeLesen();
          const eigene = liste.find((k) => k.id === id);
          const meine = eigene && (eigene.autorId ? eigene.autorId === nutzer.id : String(eigene.autor || '').toLowerCase() === nutzer.name.toLowerCase());
          if (!meine) return json({ fehler: 'verboten', meldung: 'Fremde Korrekturen ziehen Wissensmanager und Admins zurück.' }, 403);
        }
      } else if (UEBERGAENGE[aktion].freigabewort) {
        // Übergangsbetrieb: Fail-closed. Ohne konfiguriertes Freigabewort gibt
        // es keine Freigabe — nicht „dann darf jeder", sondern „dann darf niemand".
        if (!FREIGABEWORT) return json({ fehler: 'freigabe_nicht_konfiguriert', meldung: 'Weder THI_FREIGABEWORT noch THI_ZUGANGSWORT ist serverseitig gesetzt — Freigaben sind deaktiviert.' }, 403);
        if (!wortPruefen(körper.freigabewort, FREIGABEWORT)) return json({ fehler: 'freigabe', meldung: 'Freigabewort fehlt oder ist falsch.' }, 403);
      }

      const von = login ? nutzer.name : String(körper.von || '').trim();
      let gewechselt = null;
      const ergebnis = await aendern((liste) => {
        const i = liste.findIndex((k) => k.id === id);
        if (i < 0) return { ok: false, fehler: 'unbekannt', meldung: `Korrektur „${id}" nicht gefunden.` };
        // VIER-AUGEN-REGEL, im Login-Modus hart über die Nutzer-ID: Wer die
        // Korrektur eingereicht hat, gibt sie nicht selbst frei — auch nicht
        // mit einem anderen Anzeigenamen.
        if (login && aktion === 'freigeben' && liste[i].autorId && liste[i].autorId === nutzer.id) {
          return { ok: false, fehler: 'ungueltig', fehlerliste: ['Vier-Augen-Regel: Eine Korrektur gibt nicht frei, wer sie eingereicht hat.'] };
        }
        const w = wechsleStatus(liste[i], aktion, { von, begruendung: körper.begruendung });
        if (!w.ok) return { ok: false, fehler: 'ungueltig', fehlerliste: [w.fehler] };
        gewechselt = w.notiz;
        if (login && aktion === 'freigeben') gewechselt.freigegebenVonId = nutzer.id;
        const neu = liste.slice();
        neu[i] = w.notiz;
        return { ok: true, liste: neu };
      }, `Korrektur ${aktion}: ${id} — ${von}`, von || 'Thi');

      if (!ergebnis.ok) return json(ergebnis, ergebnis.fehler === 'unbekannt' ? 404 : 400);
      await audit(nutzer, `korrektur.${aktion}`, id, { begruendung: String(körper.begruendung || '').slice(0, 400) });
      return json({ ok: true, notiz: oeffentlich(gewechselt), commit: ergebnis.commit || null, ...konfiguration(zugang) });
    }

    return json({ fehler: 'ungueltig', fehlerliste: [`Unbekannte Aktion „${aktion}".`] }, 400);
  } catch (fehler) {
    console.error('[thi/korrektur] Schreiben fehlgeschlagen:', fehler);
    return json({
      fehler: 'speichern',
      meldung: 'Die Korrektur konnte nicht gespeichert werden. Details stehen im Function-Log.',
    }, 502);
  }
}
