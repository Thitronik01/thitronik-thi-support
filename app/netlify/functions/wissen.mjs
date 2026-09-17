// ============================================================================
// THITRONIK Thi — Wissenspflege für Wissensmanager (Netlify Function, ESM/v2).
// ----------------------------------------------------------------------------
//   POST /api/wissen { aktion: … }   — eingeloggt; schreibend nur mit Recht
//
//   artikel                        Liste aller Artikel (Route, Titel, Sprache, Typ)
//   gewichtung                     alle gesetzten Gewichtungen
//   gewichten { route, faktor, status, notiz }   setzen / ändern
//   gewichtung-loeschen { route }  zurück auf normal
//   luecken { tage }               Fälle mit dünner Quellenlage, jüngste zuerst
//
// Nur mit Datenbank. Ohne Supabase antwortet alles mit 503 — die Oberfläche
// zeigt den Bereich dann gar nicht erst an.
// ============================================================================

import ARTIKEL from '../../data/artikel.mjs';
import { rest, supabaseAktiv } from './lib/supabase.mjs';
import { zugangPruefen } from './lib/zugang.mjs';
import { darf, audit } from './lib/auth.mjs';
import { gewichtungCacheLeeren } from './lib/wissen.mjs';

function json(daten, status = 200) {
  return new Response(JSON.stringify(daten), {
    status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

const STATUS_ERLAUBT = new Set(['normal', 'bevorzugt', 'veraltet']);
const ARTIKEL_KURZ = ARTIKEL.map((a) => ({ route: a.route, title: a.title, lang: a.lang, articleType: a.articleType }));
const ROUTEN = new Set(ARTIKEL.map((a) => a.route));

export default async function handler(anfrage) {
  if (anfrage.method !== 'POST') return json({ fehler: 'method_not_allowed' }, 405);
  if (!supabaseAktiv()) return json({ fehler: 'nicht_konfiguriert', meldung: 'Wissenspflege braucht die Datenbank.' }, 503);

  const zugang = await zugangPruefen(anfrage);
  if (!zugang.ok || zugang.modus !== 'login') return json({ fehler: 'login', meldung: 'Bitte anmelden.' }, 401);
  const nutzer = zugang.nutzer;

  let körper;
  try { körper = await anfrage.json(); } catch { return json({ fehler: 'ungueltiges_json' }, 400); }
  const aktion = String(körper.aktion || '');

  try {
    if (aktion === 'artikel') return json({ ok: true, artikel: ARTIKEL_KURZ });

    if (aktion === 'gewichtung') {
      const liste = await rest('/gewichtung?select=*&order=geaendert.desc');
      const titel = new Map(ARTIKEL.map((a) => [a.route, a.title]));
      return json({ ok: true, gewichtung: liste.map((g) => ({ ...g, title: titel.get(g.route) || g.route })) });
    }

    if (!darf(nutzer, 'gewichtung.setzen')) return json({ fehler: 'verboten', meldung: 'Gewichten dürfen Wissensmanager und Admins.' }, 403);

    if (aktion === 'gewichten') {
      const route = String(körper.route || '').trim();
      if (!ROUTEN.has(route)) return json({ fehler: 'ungueltig', meldung: 'Unbekannter Artikel.' }, 400);
      let faktor = Number(körper.faktor);
      if (!Number.isFinite(faktor)) faktor = 1;
      faktor = Math.min(3, Math.max(0.1, Math.round(faktor * 100) / 100));
      const status = STATUS_ERLAUBT.has(körper.status) ? körper.status : 'normal';
      const notiz = String(körper.notiz || '').trim().slice(0, 300);
      const zeilen = await rest('/gewichtung', {
        method: 'POST',
        body: { route, faktor, status, notiz, gesetzt_von: nutzer.name, geaendert: new Date().toISOString() },
        prefer: 'resolution=merge-duplicates,return=representation',
      });
      gewichtungCacheLeeren();
      await audit(nutzer, 'gewichtung.setzen', route, { faktor, status, notiz });
      return json({ ok: true, gewichtung: zeilen[0] });
    }

    if (aktion === 'gewichtung-loeschen') {
      const route = String(körper.route || '').trim();
      if (!route) return json({ fehler: 'ungueltig' }, 400);
      await rest(`/gewichtung?route=eq.${encodeURIComponent(route)}`, { method: 'DELETE', prefer: 'return=minimal' });
      gewichtungCacheLeeren();
      await audit(nutzer, 'gewichtung.loeschen', route);
      return json({ ok: true });
    }

    if (aktion === 'luecken') {
      const tage = Math.min(365, Math.max(1, Number(körper.tage) || 30));
      const seit = new Date(Date.now() - tage * 86400000).toISOString();
      const liste = await rest(`/luecke?select=id,zeit,sprache,frage,produkte,fahrzeug,sicherheit,bester_score&zeit=gte.${encodeURIComponent(seit)}&order=zeit.desc&limit=300`);
      // Verdichtung: welche Produkte tauchen in Lücken am häufigsten auf?
      const proProdukt = {};
      for (const l of liste) for (const p of l.produkte || []) proProdukt[p] = (proProdukt[p] || 0) + 1;
      const haeufig = Object.entries(proProdukt).sort((a, b) => b[1] - a[1]).slice(0, 8)
        .map(([produkt, anzahl]) => ({ produkt, anzahl }));
      return json({ ok: true, tage, luecken: liste, haeufig });
    }

    return json({ fehler: 'ungueltig', meldung: `Unbekannte Aktion „${aktion}".` }, 400);
  } catch (fehler) {
    console.error('[thi/wissen]', aktion, fehler);
    return json({ fehler: 'server', meldung: 'Datenbank nicht erreichbar. Details stehen im Function-Log.' }, 502);
  }
}
