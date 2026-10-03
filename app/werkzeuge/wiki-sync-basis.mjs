// Gemeinsamer, begrenzter Wiki-Sync für explizite Artikelgruppen.
// Metadaten und fremde Routen bleiben erhalten; gemischte Sichtbarkeit wird abgelehnt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractPlainText, markdownLines } from '../../code/wiki-klartext.mjs';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HIER, '..', '..');
const DATEN = path.join(REPO, 'app', 'data');
const ANKER_ZEICHEN = /[\u2000-\u206f\u2e00-\u2e7f\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;
const ABSCHNITTSFELDER = new Set([
  'lang', 'route', 'slug', 'title', 'anchor', 'heading', 'headingPath',
  'level', 'articleType', 'visibility', 'body',
]);
const INTERNE_H2_ANKER = new Set([
  'service-amp-intern', 'service-intern', 'service--intern',
  'service--internal', 'service--interne',
  'service-und-interne-abläufe', 'service-and-internal-processes',
  'service-et-procédures-internes',
]);
const FACHBEGRIFFE = [
  'CampLock', 'VanLock', 'Fingerprint', 'Fingerabdruck', 'empreinte digitale',
  'Master-Finger', 'Masterfinger', 'doigt maître', 'Hartal', 'WiPro', 'safe.lock',
  'Zentralverriegelung', 'verrouillage central', 'Alarmsystem',
  "système d'alarme", 'système d’alarme',
  'Scharfschalten', 'Unscharfschalten', 'Funk-Handsender', 'télécommande radio',
  'NFC', 'KeyCard', 'KeyTag', 'KeyStrap', 'BT-connect', 'Pro-Finder',
  'Artikelnummer', 'Art.-Nr.', 'Seriennummer',
];

function fehler(text) { throw new Error(text); }

function frontmatterWert(kopf, feld) {
  const zeile = kopf.split(/\r?\n/).find((z) => z.startsWith(`${feld}:`));
  if (!zeile) fehler(`Frontmatter-Feld ${feld} fehlt.`);
  let wert = zeile.slice(feld.length + 1).trim();
  if (/^[>|][+-]?\s*$/.test(wert)) {
    fehler(`Frontmatter-Feld ${feld} ist mehrzeilig; vor dem begrenzten Sync semantisch unverändert in eine Zeile normalisieren.`);
  }
  if ((wert.startsWith('"') && wert.endsWith('"')) ||
      (wert.startsWith("'") && wert.endsWith("'"))) {
    wert = wert.slice(1, -1);
  }
  if (!wert) fehler(`Frontmatter-Feld ${feld} ist leer.`);
  return wert;
}

function markdownLesen(ziel) {
  const roh = fs.readFileSync(ziel.pfad, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const treffer = roh.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!treffer) fehler(`Frontmatter fehlt: ${ziel.pfad}`);
  const titel = frontmatterWert(treffer[1], 'title');
  const sprache = frontmatterWert(treffer[1], 'lang');
  if (sprache !== ziel.lang) fehler(`Sprache in ${ziel.pfad}: ${sprache} statt ${ziel.lang}`);
  const inhalt = roh.slice(treffer[0].length);
  if (!/^#\s+.+/m.test(inhalt)) fehler(`H1 fehlt: ${ziel.pfad}`);
  return { titel, inhalt };
}

// Klartext-Regeln angelehnt an extractPlainText in code/wiki-ingest.mjs,
// hier ergänzt um den Erhalt von Inline-Code für SMS-Steuerzeichen.
// Frontmatter wurde vorher entfernt; horizontale Regeln dürfen keinen Inhalt
// zwischen zwei "---"-Zeilen verschlucken.
export const klartext = extractPlainText;

export function ueberschriften(markdown) {
  const ergebnis = [];
  const verwendet = new Set();
  for (const { line: zeile, code } of markdownLines(markdown)) {
    if (code) continue;
    const treffer = zeile.match(/^(#{1,6})\s+(.+)$/);
    if (!treffer) continue;
    const text = treffer[2].trim();
    const basis = text.toLowerCase().replace(ANKER_ZEICHEN, '').replace(/\s/g, '-');
    let anker = basis;
    let nummer = 0;
    while (verwendet.has(anker)) anker = `${basis}-${++nummer}`;
    verwendet.add(anker);
    ergebnis.push({ level: treffer[1].length, text, anchor: anker });
  }
  return ergebnis;
}

export function abschnitte(markdown, headings, route, cap = 4000) {
  const ergebnis = [];
  const intro = [];
  let aktuell = null;
  let letzteH2 = null;
  let index = 0;
  const abschliessen = () => {
    if (!aktuell) return;
    const text = klartext(aktuell.zeilen.join('\n'));
    if (text.length > cap) {
      console.warn(`${route}#${aktuell.anchor}: Warnung: Abschnitt hat ${text.length} Zeichen; Runtime endet bei 4000.`);
    }
    ergebnis.push({ ...aktuell, body: text.slice(0, cap) });
    delete ergebnis.at(-1).zeilen;
    aktuell = null;
  };
  for (const { line: zeile, code } of markdownLines(markdown)) {
    const treffer = !code && zeile.match(/^(#{1,6})\s+(.+)$/);
    if (treffer) {
      const h = headings[index++];
      if (h.level === 2 || h.level === 3) {
        abschliessen();
        if (h.level === 2) letzteH2 = h.text;
        aktuell = {
          anchor: h.anchor, heading: h.text,
          headingPath: h.level === 3 && letzteH2 ? `${letzteH2} › ${h.text}` : h.text,
          level: h.level, zeilen: [],
        };
      } else {
        (aktuell ? aktuell.zeilen : intro).push(h.text);
      }
    } else {
      (aktuell ? aktuell.zeilen : intro).push(zeile);
    }
  }
  abschliessen();
  const introText = klartext(intro.join('\n'));
  if (introText.length >= 40) {
    if (introText.length > cap) {
      console.warn(`${route}: Warnung: Intro hat ${introText.length} Zeichen; Runtime endet bei 4000.`);
    }
    ergebnis.unshift({
      anchor: '', heading: headings.find((h) => h.level === 1)?.text || '',
      headingPath: '', level: 1, body: introText.slice(0, cap),
    });
  }
  return ergebnis;
}

function schluesselwoerter(klarerText, headings) {
  const begriffe = FACHBEGRIFFE.filter((begriff) => {
    const escaped = begriff.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, 'iu')
      .test(klarerText);
  });
  // Nur sechsstellige Artikelnummern, optional mit Varianten-Suffix. Jahreszahlen
  // und Seriennummern wie 0699-045 gehören nicht in diese Keyword-Liste.
  const artikelnummern = klarerText.match(/\b\d{6}(?:-\d{3,4})?\b/g) || [];
  return [...new Set([...begriffe, ...artikelnummern, ...headings.map((h) => h.text)])].join(' ');
}

function datenLesen(datei) {
  const pfad = path.join(DATEN, datei);
  const liste = JSON.parse(fs.readFileSync(pfad, 'utf8'));
  if (!Array.isArray(liste)) fehler(`${pfad} muss ein Array enthalten.`);
  return { pfad, liste };
}

function einmaligeArtikel(liste, ZIELE) {
  for (const ziel of ZIELE) {
    const anzahl = liste.filter((a) => a.route === ziel.route).length;
    if (anzahl !== 1) fehler(`${ziel.route}: ${anzahl} Artikel statt genau einem.`);
  }
}

export function synchronisieren(slugs, bezeichnung, befehl) {
  const ZIELE = ['de', 'fr'].flatMap((lang) => slugs.map((slug) => ({
    lang, slug: path.posix.basename(slug), route: `/${lang}/${slug}`,
    pfad: path.join(REPO, 'content', 'wiki', lang, `${slug}.md`),
  })));
  const ROUTEN = new Set(ZIELE.map((z) => z.route));
  const argumente = process.argv.slice(2);
  if (argumente.length > 1 || (argumente.length === 1 && argumente[0] !== '--check')) {
    fehler(`Aufruf: node werkzeuge/${befehl} [--check]`);
  }
  const nurPruefen = argumente[0] === '--check';
  const artikel = datenLesen('artikel.json');
  const sektionen = datenLesen('sektionen.json');
  einmaligeArtikel(artikel.liste, ZIELE);
  for (const ziel of ZIELE) {
    const alt = sektionen.liste.filter((s) => s.route === ziel.route);
    if (!alt.length) {
      fehler(`${ziel.route}: keine bisherigen Abschnitte vorhanden.`);
    }
    const artikelAlt = artikel.liste.find((a) => a.route === ziel.route);
    if (alt.some((s) => s.visibility !== artikelAlt.visibility) ||
        Object.keys(artikelAlt).some((k) => k.startsWith('dealer'))) {
      fehler(`${ziel.route}: gemischte Sichtbarkeit oder Händler-Suchfelder erfordern einen gesonderten Sync.`);
    }
    const sonderfeld = alt.flatMap((s) => Object.keys(s)).find((feld) => !ABSCHNITTSFELDER.has(feld));
    if (sonderfeld) fehler(`${ziel.route}: Abschnittsfeld ${sonderfeld} würde verloren gehen; gezielten Sync anpassen.`);
  }

  const neueArtikel = new Map();
  const neueSektionen = new Map();
  for (const ziel of ZIELE) {
    const { titel, inhalt } = markdownLesen(ziel);
    const headings = ueberschriften(inhalt);
    if (!headings.some((h) => h.level === 1)) fehler(`${ziel.route}: H1 außerhalb von Code fehlt.`);
    if (headings.some((h) => h.level === 2 && INTERNE_H2_ANKER.has(h.anchor))) {
      fehler(`${ziel.route}: interner H2-Abschnitt erfordert bereinigte Händler-Suchfelder; gezielter Sync abgebrochen.`);
    }
    const plain = klartext(inhalt);
    if (plain.length > 16000) {
      console.warn(`${ziel.route}: Warnung: Artikeltext hat ${plain.length} Zeichen; Runtime-Body endet bei 16000.`);
    }
    const alt = artikel.liste.find((a) => a.route === ziel.route);
    const neue = {
      ...alt,
      title: titel,
      headings: headings.map((h) => h.text).join(' '),
      keywords: bezeichnung === 'Fingerprint' ? schluesselwoerter(plain, headings) : [...new Set([...['CAN-Bus', 'Klemme 30', 'Klemme 15', 'DIP-Schalter', 'Easy-Add', 'Panikalarm', 'Vent-check', 'Magnetkontakt', 'Testalarm', 'Schaltersperre', 'Sprinter', 'Ford Transit', 'G.A.S.'].filter((w) => plain.includes(w)), schluesselwoerter(plain, headings)])].join(' '),
      excerpt: plain.slice(0, 2000),
      body: plain.slice(0, 16000),
    };
    neueArtikel.set(ziel.route, neue);
    const chunks = abschnitte(inhalt, headings, ziel.route).map((s) => ({
      lang: ziel.lang, route: ziel.route, slug: ziel.slug, title: titel,
      anchor: s.anchor, heading: s.heading, headingPath: s.headingPath,
      level: s.level, articleType: alt.articleType, visibility: alt.visibility,
      body: s.body,
    }));
    if (!chunks.length) fehler(`${ziel.route}: kein Abschnitt erzeugt.`);
    neueSektionen.set(ziel.route, chunks);
  }

  const artikelNeu = artikel.liste.map((a) => neueArtikel.get(a.route) || a);
  const gesehen = new Set();
  const sektionenNeu = [];
  for (const s of sektionen.liste) {
    if (!ROUTEN.has(s.route)) { sektionenNeu.push(s); continue; }
    if (!gesehen.has(s.route)) {
      sektionenNeu.push(...neueSektionen.get(s.route));
      gesehen.add(s.route);
    }
  }
  const ausgaben = [
    { ...artikel, text: JSON.stringify(artikelNeu) },
    { ...sektionen, text: JSON.stringify(sektionenNeu) },
  ];
  const abweichungen = ausgaben.filter((a) => fs.readFileSync(a.pfad, 'utf8') !== a.text);
  for (const ziel of ZIELE) {
    const bisherigeAbschnitte = sektionen.liste.filter((s) => s.route === ziel.route);
    const neueAbschnitte = neueSektionen.get(ziel.route);
    const alt = artikel.liste.find((a) => a.route === ziel.route);
    const neu = neueArtikel.get(ziel.route);
    const veraendert = JSON.stringify(alt) !== JSON.stringify(neu) ||
      JSON.stringify(bisherigeAbschnitte) !== JSON.stringify(neueAbschnitte);
    console.log(`${ziel.route}: ${veraendert ? 'Änderung' : 'aktuell'}, ` +
      `${alt.body.length} → ${neu.body.length} Zeichen, ` +
      `${bisherigeAbschnitte.length} → ${neueAbschnitte.length} Abschnitte`);
  }
  if (!abweichungen.length) {
    console.log(`${bezeichnung}-Wissensdaten sind aktuell.`);
    return;
  }
  if (nurPruefen) {
    console.error(`Drift in ${abweichungen.map((a) => path.basename(a.pfad)).join(', ')}. Synchronisieren mit: node werkzeuge/${befehl}`);
    process.exitCode = 1;
    return;
  }
  for (const a of abweichungen) fs.writeFileSync(a.pfad, a.text, 'utf8');
  console.log(`Aktualisiert: ${abweichungen.map((a) => path.basename(a.pfad)).join(', ')}.`);
  console.log('Jetzt node werkzeuge/daten-bauen.mjs ausführen und die App prüfen.');
}
