// ============================================================================
// Support-Korrekturen — gemeinsamer Kern.
// ----------------------------------------------------------------------------
// Wird von DREI Stellen benutzt und muss deshalb frei von Netzwerk und
// Dateizugriff bleiben:
//   - netlify/functions/korrektur.mjs   nimmt Korrekturen entgegen (schreibt)
//   - netlify/functions/chat.mjs        legt sie ins Retrieval (liest)
//   - werkzeuge/korrekturen-pruefen.mjs prüft den Bestand offline
//
// GRUNDSATZ (docs/07_KORREKTUREN_ENTWUERFE.md §1): Eine Korrektur verändert
// NIE den Wiki-Text. Sie ist ein eigener kleiner Eintrag mit Herkunft, Status
// und Bezug auf die Stelle, die sie korrigiert. Dadurch:
//   - lässt sie sich per Statuswechsel zurücknehmen, ohne in 16.000 Zeichen
//     Artikeltext zu suchen,
//   - bleibt ihre Herkunft im Kontextblock sichtbar („Support-Korrektur,
//     ungeprüft, M. Behrens"), statt als „laut Wiki" zu erscheinen,
//   - überlebt sie einen Neu-Import des Wikis, weil sie nicht darin liegt.
//
// Thi ist NICHT das Wiki. Eine Korrektur ist eine Warteschlange für die
// Wiki-Redaktion, die sofort in Thi wirkt. Zielzustand ist `im-wiki` — dann
// ist die Notiz archiviert und der Wiki-Text wieder die einzige Wahrheit.
// ============================================================================

import { pruefeGefahr } from './fall.mjs';

// ─── Status und Lebenszyklus ────────────────────────────────────────────────
//   ungeprueft      wirkt sofort, Prozentwert gedeckelt, sichtbar gekennzeichnet
//   wartet-freigabe wirkt NICHT — sicherheitsrelevante Themen bis zur Freigabe
//   freigegeben     wirkt voll, Herkunft bleibt sichtbar
//   zurueckgezogen  wirkt nicht mehr (war falsch oder überholt)
//   im-wiki         wirkt nicht mehr — Inhalt steht inzwischen im Wiki
export const STATUS = Object.freeze({
  UNGEPRUEFT: 'ungeprueft',
  WARTET: 'wartet-freigabe',
  FREIGEGEBEN: 'freigegeben',
  ZURUECK: 'zurueckgezogen',
  IM_WIKI: 'im-wiki',
});

export const ALLE_STATUS = new Set(Object.values(STATUS));
export const WIRKSAME_STATUS = new Set([STATUS.UNGEPRUEFT, STATUS.FREIGEGEBEN]);

// Erlaubte Übergänge. Freigeben und Im-Wiki verlangen das Freigabewort;
// Zurückziehen darf jeder mit Zugangswort — weniger Wirkung ist nie gefährlich.
export const UEBERGAENGE = Object.freeze({
  freigeben: { von: [STATUS.UNGEPRUEFT, STATUS.WARTET], nach: STATUS.FREIGEGEBEN, freigabewort: true },
  zurueckziehen: { von: [STATUS.UNGEPRUEFT, STATUS.WARTET, STATUS.FREIGEGEBEN], nach: STATUS.ZURUECK, freigabewort: false },
  'im-wiki': { von: [STATUS.UNGEPRUEFT, STATUS.FREIGEGEBEN], nach: STATUS.IM_WIKI, freigabewort: true },
});

// Wie viele Korrekturen dürfen zusätzlich zum normalen Kontextfenster
// GARANTIERT beigelegt werden, wenn ihr Bezugsartikel im Kontext liegt.
export const KORREKTUR_BEILAGE_MAX = 3;

// Nach so vielen Tagen ohne Freigabe meldet der Health-Check eine Warnung.
export const WIEDERVORLAGE_TAGE = 60;

// ─── Grenzen ────────────────────────────────────────────────────────────────
export const GRENZEN = Object.freeze({
  titel: [5, 120],
  text: [20, 2000],
  widerspricht: [0, 600],
  autor: [2, 60],
  begruendung: [0, 400],
  frage: [0, 600],
  antwortAuszug: [0, 800],
});

// ─── Sicherheitsrelevanz ────────────────────────────────────────────────────
// Frage 7 der Entwürfe: Eine falsche Angabe zu Gas oder CO hat andere Folgen
// als eine falsche Artikelnummer. Deshalb wirken solche Korrekturen NIE sofort,
// sondern erst nach begründeter Freigabe. Zwei Kriterien, beide reichen allein:
//   1. Der Bezugsartikel gehört zur Sperrliste (Gas, CO, Rauchmelder,
//      Abschalteinrichtung — 16 DE-Artikel, gemessen am 16.09.2026).
//   2. Der Korrekturtext selbst spricht über Gas/CO/Rauch/Brand/Abschaltung
//      oder würde das Gefahren-Gate auslösen.
// Bewusst konservativ: Lieber eine harmlose Korrektur zu viel in die Freigabe
// als eine gefährliche zu wenig.
const SPERR_SLUG = /(^|-)(gas|co|kohlenmonoxid|rauchmelder|abschalteinrichtung)(-|$)/;
const SPERR_TEXT = /\b(gas|gaz|kohlenmonoxid|monoxyde|co|rauch|rauchmelder|fum[ée]e|brand|incendie|feuer|abschalteinrichtung|coupure|kill)\b/i;

function entpunkten(text) {
  // „G.A.S." → „GAS", damit die Wortgrenzen greifen (wie in search-core).
  return String(text || '').replace(/\b(?:[a-z]\.){2,}/gi, (m) => m.replace(/\./g, ''));
}

export function istSicherheitsrelevant(notiz) {
  // Slug = alles nach dem letzten „/" oder „=" — Anleitungen haben Routen
  // wie „/anleitungen?open=gas_pro_iii-kurzanleitung" (mit Unterstrichen,
  // deshalb werden sie zu Bindestrichen vereinheitlicht).
  const slug = String(notiz?.bezug?.route || '').replace(/^.*[/=]/, '').toLowerCase().replace(/_/g, '-');
  if (SPERR_SLUG.test(slug)) return { relevant: true, grund: `Bezugsartikel „${slug}" steht auf der Sperrliste.` };

  const text = entpunkten(`${notiz?.titel || ''} ${notiz?.text || ''} ${notiz?.widerspricht || ''}`);
  const wort = text.match(SPERR_TEXT);
  if (wort) return { relevant: true, grund: `Korrekturtext nennt „${wort[0]}".` };

  const gate = pruefeGefahr(text, notiz?.lang || 'de');
  if (gate.gefahr) return { relevant: true, grund: `Text würde das Gefahren-Gate auslösen („${gate.ausloeser}").` };

  return { relevant: false, grund: null };
}

// ─── Validierung ────────────────────────────────────────────────────────────
function laenge(wert, [min, max], feld, fehler) {
  const s = String(wert ?? '').trim();
  if (s.length < min) fehler.push(min > 0 && !s ? `${feld} fehlt.` : `${feld} ist zu kurz (mind. ${min} Zeichen).`);
  if (s.length > max) fehler.push(`${feld} ist zu lang (max. ${max} Zeichen).`);
  return s;
}

// Prüft eine eingehende Notiz und liefert die bereinigte Fassung oder Fehler.
// `artikel` ist der Artikelindex — der Bezug muss auf einen existierenden
// Artikel zeigen, sonst hängt die Korrektur im Leeren.
export function validiereNotiz(roh, artikel = []) {
  const fehler = [];
  const n = roh && typeof roh === 'object' ? roh : {};

  const lang = n.lang === 'fr' ? 'fr' : 'de';
  const titel = laenge(n.titel, GRENZEN.titel, 'Titel', fehler);
  const text = laenge(n.text, GRENZEN.text, 'Korrekturtext', fehler);
  const widerspricht = laenge(n.widerspricht, GRENZEN.widerspricht, 'Widerspruchsangabe', fehler);
  const autor = laenge(n.autor, GRENZEN.autor, 'Name', fehler);

  const route = String(n.bezug?.route || '').trim();
  const anchor = String(n.bezug?.anchor || '').trim();
  if (!route) fehler.push('Bezug (Artikel) fehlt.');
  else if (artikel.length && !artikel.some((a) => a.route === route)) {
    fehler.push(`Bezug „${route}" ist kein bekannter Artikel.`);
  }

  const ausloeser = n.ausloeser && typeof n.ausloeser === 'object' ? {
    frage: laenge(n.ausloeser.frage, GRENZEN.frage, 'Auslöser-Frage', fehler),
    antwortAuszug: laenge(n.ausloeser.antwortAuszug, GRENZEN.antwortAuszug, 'Antwort-Auszug', fehler),
  } : null;

  if (fehler.length) return { ok: false, fehler };
  return {
    ok: true,
    notiz: { lang, titel, text, widerspricht, autor, bezug: { route, anchor }, ausloeser },
  };
}

// ─── Anlegen ────────────────────────────────────────────────────────────────
export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

export function neueId(titel, jetzt = new Date(), zufall = Math.random) {
  const datum = jetzt.toISOString().slice(0, 10);
  const hex = Math.floor(zufall() * 0xffff).toString(16).padStart(4, '0');
  return `${datum}-${slugify(titel) || 'korrektur'}-${hex}`;
}

// Erzeugt den vollständigen Datensatz. Der Status folgt aus der
// Sicherheitsrelevanz — das ist keine Wahl des Einreichenden.
export function erzeugeNotiz(geprueft, { jetzt = new Date(), zufall } = {}) {
  const sicherheit = istSicherheitsrelevant(geprueft);
  const status = sicherheit.relevant ? STATUS.WARTET : STATUS.UNGEPRUEFT;
  const am = jetzt.toISOString();
  return {
    id: neueId(geprueft.titel, jetzt, zufall),
    status,
    sicherheitsrelevant: sicherheit.relevant,
    sicherheitsgrund: sicherheit.grund,
    lang: geprueft.lang,
    bezug: geprueft.bezug,
    titel: geprueft.titel,
    text: geprueft.text,
    widerspricht: geprueft.widerspricht || '',
    autor: geprueft.autor,
    erstellt: am,
    freigegebenVon: null,
    freigegebenAm: null,
    ausloeser: geprueft.ausloeser,
    historie: [{ status, von: geprueft.autor, am, begruendung: '' }],
  };
}

// ─── Statuswechsel ──────────────────────────────────────────────────────────
export function wechsleStatus(notiz, aktion, { von, begruendung = '', jetzt = new Date() } = {}) {
  const regel = UEBERGAENGE[aktion];
  if (!regel) return { ok: false, fehler: `Unbekannte Aktion „${aktion}".` };
  if (!regel.von.includes(notiz.status)) {
    return { ok: false, fehler: `„${aktion}" ist im Status „${notiz.status}" nicht möglich.` };
  }
  const name = String(von || '').trim();
  if (name.length < GRENZEN.autor[0]) return { ok: false, fehler: 'Name fehlt.' };
  const grund = String(begruendung || '').trim().slice(0, GRENZEN.begruendung[1]);
  // VIER-AUGEN-REGEL: Wer eine Korrektur eingereicht hat, gibt sie nicht selbst
  // frei. Der Name ist selbst erklärt, also keine harte Sicherung — aber eine
  // sichtbare Regel, die im Commit-Log nachprüfbar bleibt.
  if (aktion === 'freigeben' && name.toLowerCase() === String(notiz.autor || '').trim().toLowerCase()) {
    return { ok: false, fehler: 'Vier-Augen-Regel: Eine Korrektur gibt nicht frei, wer sie eingereicht hat.' };
  }
  if (aktion === 'freigeben' && notiz.sicherheitsrelevant && grund.length < 10) {
    return { ok: false, fehler: 'Sicherheitsrelevante Korrekturen brauchen eine Begründung zur Freigabe (mind. 10 Zeichen).' };
  }
  const am = jetzt.toISOString();
  const neu = {
    ...notiz,
    status: regel.nach,
    historie: [...(notiz.historie || []), { status: regel.nach, von: name, am, begruendung: grund }],
  };
  if (aktion === 'freigeben') { neu.freigegebenVon = name; neu.freigegebenAm = am; }
  return { ok: true, notiz: neu };
}

// ─── Fürs Retrieval ─────────────────────────────────────────────────────────
export function wirksameKorrekturen(liste) {
  return (Array.isArray(liste) ? liste : []).filter((k) => k && WIRKSAME_STATUS.has(k.status));
}

function datumKurz(iso, lang) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso || '');
  return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Der Text, den das MODELL sieht. Die Kopfzeile trägt Herkunft und Status —
// deshalb kann die Prompt-Regel „SUPPORT-KORREKTUR" daran anknüpfen und die
// Antwort die Quelle als das benennen, was sie ist.
export function kontextText(notiz, bezugArtikel = null, lang = notiz.lang) {
  const fr = lang === 'fr';
  const status = notiz.status === STATUS.FREIGEGEBEN
    ? (fr ? `validée le ${datumKurz(notiz.freigegebenAm, lang)} par ${notiz.freigegebenVon}` : `freigegeben am ${datumKurz(notiz.freigegebenAm, lang)} von ${notiz.freigegebenVon}`)
    : (fr ? 'NON VÉRIFIÉE — pas encore validée' : 'UNGEPRÜFT — noch nicht freigegeben');
  const kopf = fr
    ? `CORRECTION DU SUPPORT (statut : ${status}), saisie le ${datumKurz(notiz.erstellt, lang)} par ${notiz.autor}.`
    : `SUPPORT-KORREKTUR (Status: ${status}), erfasst am ${datumKurz(notiz.erstellt, lang)} von ${notiz.autor}.`;
  const bezug = bezugArtikel
    ? (fr ? `Concerne : ${bezugArtikel.title}` : `Bezug: ${bezugArtikel.title}`) + (notiz.bezug?.anchor ? ` — #${notiz.bezug.anchor}` : '')
    : (fr ? `Concerne : ${notiz.bezug?.route}` : `Bezug: ${notiz.bezug?.route}`);
  const teile = [kopf, bezug, '', notiz.text];
  if (notiz.widerspricht) {
    teile.push('', (fr ? 'Contredit selon le collaborateur le wiki : ' : 'Widerspricht laut Mitarbeiter dem Wiki: ') + notiz.widerspricht);
  }
  return teile.join('\n');
}

// Macht aus einer Notiz einen Eintrag, den searchWiki wie einen Artikel
// behandelt. Gemessen (16.09.2026): Ein solcher Eintrag landet bei der
// passenden Frage auf Platz 2 hinter dem Wiki-Artikel (76 zu 100) und taucht
// bei 1 von 41 Gold-Fragen in den Top-8 auf — er wird gefunden, flutet aber
// nicht. Deshalb KEIN Boost über den Titel hinaus.
export function korrekturAlsArtikel(notiz, artikel = []) {
  const bezugArtikel = artikel.find((a) => a.route === notiz.bezug?.route && a.lang === notiz.lang)
    || artikel.find((a) => a.route === notiz.bezug?.route) || null;
  return {
    lang: notiz.lang,
    route: `/korrekturen/${notiz.id}`,
    slug: `korrektur-${notiz.id}`,
    title: `${notiz.lang === 'fr' ? 'Correction' : 'Korrektur'}: ${notiz.titel}`,
    articleType: 'korrektur',
    visibility: 'standard',
    headings: notiz.titel,
    keywords: bezugArtikel ? bezugArtikel.title : '',
    boostKeywords: '',
    excerpt: '',
    body: kontextText(notiz, bezugArtikel),
    korrektur: {
      id: notiz.id,
      status: notiz.status,
      autor: notiz.autor,
      erstellt: notiz.erstellt,
      freigegebenVon: notiz.freigegebenVon,
      freigegebenAm: notiz.freigegebenAm,
      bezug: notiz.bezug,
      bezugTitel: bezugArtikel ? bezugArtikel.title : '',
    },
  };
}

// ─── Modul-Text (data/korrekturen.mjs) ──────────────────────────────────────
// Dieselbe Maskierung wie in werkzeuge/daten-bauen.mjs: U+2028/U+2029 sind in
// JSON erlaubt, im JS-Quelltext aber Zeilenumbrüche.
export function baueModulText(liste) {
  const json = JSON.stringify(Array.isArray(liste) ? liste : [], null, 2)
    .split(String.fromCharCode(0x2028)).join('\\u2028')
    .split(String.fromCharCode(0x2029)).join('\\u2029');
  return '// AUTOMATISCH ERZEUGT aus korrekturen.json — nicht von Hand bearbeiten.\n'
    + '// Support-Korrekturen; geschrieben von netlify/functions/korrektur.mjs oder\n'
    + '// node werkzeuge/daten-bauen.mjs. Historie: git log -- app/data/korrekturen.json\n'
    + `export default ${json};\n`;
}

export function baueJsonText(liste) {
  return `${JSON.stringify(Array.isArray(liste) ? liste : [], null, 2)}\n`;
}

// ─── Datenbank-Abbildung (thi.korrektur) ────────────────────────────────────
// Die Notiz bleibt im Code das führende Objekt (wie im Git-Speicher); die
// Tabelle ist nur eine andere Ablage. Beide Richtungen sind reine Funktionen,
// damit sie sich ohne Datenbank testen lassen.
export function notizZuZeile(n) {
  return {
    id: n.id,
    lang: n.lang,
    titel: n.titel,
    text: n.text,
    widerspricht: n.widerspricht || '',
    bezug_route: n.bezug?.route || '',
    bezug_anchor: n.bezug?.anchor || '',
    bezug_titel: n.bezugTitel || '',
    autor_id: n.autorId || null,
    autor: n.autor,
    status: n.status,
    sicherheitsrelevant: Boolean(n.sicherheitsrelevant),
    sicherheitsgrund: n.sicherheitsgrund || null,
    freigegeben_von: n.freigegebenVon || null,
    freigegeben_von_id: n.freigegebenVonId || null,
    freigegeben_am: n.freigegebenAm || null,
    begruendung: n.begruendung || null,
    ausloeser: n.ausloeser || null,
    historie: Array.isArray(n.historie) ? n.historie : [],
    erstellt: n.erstellt,
    geaendert: new Date().toISOString(),
  };
}

export function zeileZuNotiz(z) {
  return {
    id: z.id,
    status: z.status,
    sicherheitsrelevant: Boolean(z.sicherheitsrelevant),
    sicherheitsgrund: z.sicherheitsgrund || null,
    lang: z.lang,
    bezug: { route: z.bezug_route, anchor: z.bezug_anchor || '' },
    bezugTitel: z.bezug_titel || '',
    titel: z.titel,
    text: z.text,
    widerspricht: z.widerspricht || '',
    autor: z.autor,
    autorId: z.autor_id || null,
    erstellt: z.erstellt,
    freigegebenVon: z.freigegeben_von || null,
    freigegebenVonId: z.freigegeben_von_id || null,
    freigegebenAm: z.freigegeben_am || null,
    begruendung: z.begruendung || null,
    ausloeser: z.ausloeser || null,
    historie: Array.isArray(z.historie) ? z.historie : [],
  };
}

// ─── Wiedervorlage ──────────────────────────────────────────────────────────
export function ueberfaellige(liste, jetzt = Date.now(), tage = WIEDERVORLAGE_TAGE) {
  const grenze = jetzt - tage * 86400000;
  return (Array.isArray(liste) ? liste : []).filter((k) => (
    (k.status === STATUS.UNGEPRUEFT || k.status === STATUS.WARTET)
    && new Date(k.erstellt).getTime() < grenze
  ));
}
