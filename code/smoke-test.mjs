// ============================================================================
// Selbsttest des Retrieval-Kerns — ohne Framework, ohne Index, ohne Netzwerk.
// ----------------------------------------------------------------------------
// Zweck: in 2 Sekunden belegen, dass `search-core.js` im neuen Projekt läuft und
// die ausgemessenen Mechaniken greifen. Läuft mit:
//
//     node code/smoke-test.mjs
//
// Prüft die vier Mechaniken, die im Vorgängerprojekt Trefferquote gekostet
// haben, als sie fehlten oder falsch herum standen (docs/01_RAG_WISSENSTRANSFER.md).
// ============================================================================

import {
  searchWiki, searchSections, normalizeSearch, expandSearchQuery,
  salientTerms, extractSnippet, bestSectionForRoute,
} from './search-core.js';

let bestanden = 0;
let fehlgeschlagen = 0;

function pruefe(name, ist, soll) {
  const ok = JSON.stringify(ist) === JSON.stringify(soll);
  if (ok) { bestanden += 1; console.log(`  OK    ${name}`); }
  else { fehlgeschlagen += 1; console.log(`  FEHLT ${name}\n        ist:  ${JSON.stringify(ist)}\n        soll: ${JSON.stringify(soll)}`); }
}

function pruefeDass(name, bedingung, hinweis = '') {
  if (bedingung) { bestanden += 1; console.log(`  OK    ${name}`); }
  else { fehlgeschlagen += 1; console.log(`  FEHLT ${name}${hinweis ? `\n        ${hinweis}` : ''}`); }
}

// ── 1) Normalisierung: Umlaut-Digraphen VOR dem NFD-Strip ──────────────────
// Die Vorgängerversion strippte erst NFD (ä→a), wodurch die ae/oe/ue-Regel nie
// griff: getipptes „Tuerkontakt" fand „Türkontakt" NICHT.
console.log('\n1) Normalisierung (Umlaute + Akronyme)');
pruefe('Türkontakt == Tuerkontakt', normalizeSearch('Türkontakt'), normalizeSearch('Tuerkontakt'));
pruefe('ß → ss', normalizeSearch('Straße'), 'strasse');
pruefe('Akronym T.S.A. → tsa', normalizeSearch('T.S.A.'), 'tsa');
pruefe('Akronym G.A.S.-pro → gas-pro', normalizeSearch('G.A.S.-pro'), 'gas-pro');
// Versionen und Artikelnummern dürfen die Entpunktung NICHT auslösen:
pruefe('Version 1.1 bleibt', normalizeSearch('1.1'), '1.1');
pruefe('Artikelnummer bleibt', normalizeSearch('105753'), '105753');

// ── 2) Produkt-Aliasse: anhängen, nicht ersetzen ───────────────────────────
console.log('\n2) Produkt-Aliasse (Umgangssprache → kanonischer Slug)');
const alias = expandSearchQuery('Alarmanlage geht nicht');
pruefeDass('„Alarmanlage" ergänzt wipro-iii', alias.includes('wipro-iii'));
pruefeDass('Originalbegriffe bleiben erhalten', alias.includes('Alarmanlage'),
  'Der Alias darf die Query ERGÄNZEN, nicht ersetzen.');
pruefeDass('„Rauchmelder" ergänzt funk-rauchmelder',
  expandSearchQuery('Rauchmelder piept').includes('funk-rauchmelder'));
pruefeDass('„Ortung" ergänzt pro-finder',
  expandSearchQuery('Ortung funktioniert nicht').includes('pro-finder'));

// ── 3) Stoppwörter ─────────────────────────────────────────────────────────
console.log('\n3) Salient Terms (Stoppwortfilter)');
pruefe('Fragewörter fallen raus', salientTerms('Wie lange heult der Alarm?'),
  ['lange', 'heult', 'alarm']);
pruefeDass('Interpunktion wird gestrippt',
  salientTerms('Rauchmelder?').includes('rauchmelder'));

// ── 4) Scoring: FAQ-Abwertung + Fahrzeug-Abwertung ohne Fahrzeugabsicht ────
console.log('\n4) Scoring (Typ-Abwertung)');
const zugang = { canViewInternal: false };
const index = [
  { lang: 'de', route: '/de/wipro-iii', title: 'WiPro III', slug: 'wipro-iii',
    body: 'Funk-Alarmsystem für Freizeitfahrzeuge. Magnetkontakte, CAN-Bus.',
    articleType: 'product', visibility: 'standard' },
  { lang: 'de', route: '/de/sirenen-hupen', title: 'Sirenen und Hupen', slug: 'sirenen-hupen',
    body: 'Die Zusatzhupe wird an Pin 9 angeschlossen.',
    articleType: 'reference', visibility: 'standard' },
  { lang: 'de', route: '/de/faq-master', title: 'FAQ', slug: 'faq-master',
    body: 'Häufige Fragen zur WiPro III und zur Zusatzhupe an Pin 9.',
    articleType: 'faq', visibility: 'standard' },
  { lang: 'de', route: '/de/fahrzeuge/fiat-ducato-2022-2024', title: 'Fiat Ducato (2022–2024)',
    slug: 'fiat-ducato-2022-2024',
    body: 'Einbau, Montage, Batterie, CAN, Prüfung, Alarm, Zusatzhupe, Pin.',
    articleType: 'vehicle', visibility: 'standard' },
  { lang: 'de', route: '/de/intern/quellen-matrix', title: 'Quellen-Matrix', slug: 'quellen-matrix',
    body: 'Interne Zusatzhupe Pin Übersicht.',
    articleType: 'internal', visibility: 'internal' },
];

const treffer = searchWiki(index, 'Zusatzhupe Pin', zugang, 'de', 10);
const routen = treffer.map((t) => t.route);
console.log(`        Reihenfolge: ${routen.join(' > ')}`);

pruefeDass('Fachartikel schlägt FAQ',
  routen.indexOf('/de/sirenen-hupen') < routen.indexOf('/de/faq-master'),
  'FAQ-Abwertung (Faktor 0,4) greift nicht.');
pruefeDass('Fachartikel schlägt Fahrzeugartikel ohne Fahrzeugabsicht',
  routen.indexOf('/de/sirenen-hupen') < routen.indexOf('/de/fahrzeuge/fiat-ducato-2022-2024'),
  'Fahrzeug-Abwertung (Faktor 0,35) greift nicht.');
pruefeDass('Interner Artikel bleibt für Händler unsichtbar',
  !routen.includes('/de/intern/quellen-matrix'),
  'SICHERHEIT: Sichtbarkeitsfilter greift nicht!');

// Mit Fahrzeugabsicht muss der Fahrzeugartikel aufsteigen:
const mitFahrzeug = searchWiki(index, 'Zusatzhupe Pin Ducato', zugang, 'de', 10)
  .map((t) => t.route);
pruefeDass('Mit Fahrzeugnennung steigt der Fahrzeugartikel',
  mitFahrzeug.indexOf('/de/fahrzeuge/fiat-ducato-2022-2024')
    < routen.indexOf('/de/fahrzeuge/fiat-ducato-2022-2024'),
  `ohne: ${routen.join(' > ')}\n        mit:  ${mitFahrzeug.join(' > ')}`);

// ── 5) Snippet-Fenster um die Trefferstelle ────────────────────────────────
console.log('\n5) Passagen-Fenster (statt body.slice(0, n))');
const langtext = `${'Einleitung. '.repeat(60)}Die Zusatzhupe wird an Pin 9 angeschlossen. ${'Nachtext. '.repeat(60)}`;
const snippet = extractSnippet(langtext, 'Zusatzhupe Pin', 200);
pruefeDass('Snippet enthält die Trefferstelle', snippet.includes('Zusatzhupe'),
  `Snippet begann bei: "${snippet.slice(0, 60)}…"`);

// ── 6) Abschnitts-Retrieval + bester Anker für eine Route ──────────────────
console.log('\n6) Abschnitts-Retrieval (Deep-Link-Anker)');
const abschnitte = [
  { lang: 'de', route: '/de/wipro-iii', slug: 'wipro-iii', title: 'WiPro III',
    anchor: '', heading: 'WiPro III', headingPath: '', level: 1,
    body: 'Funk-Alarmsystem für Freizeitfahrzeuge.', articleType: 'product', visibility: 'standard' },
  { lang: 'de', route: '/de/wipro-iii', slug: 'wipro-iii', title: 'WiPro III',
    anchor: 'batterie-wechseln', heading: 'Batterie wechseln', headingPath: 'Batterie wechseln', level: 2,
    body: 'Empfohlen Panasonic. Nicht empfohlen Duracell.', articleType: 'product', visibility: 'standard' },
  { lang: 'de', route: '/de/wipro-iii', slug: 'wipro-iii', title: 'WiPro III',
    anchor: 'dip-schalter', heading: 'DIP-Schalter', headingPath: 'Installation › DIP-Schalter', level: 3,
    body: 'DIP 1 bis 4 je nach Fahrzeugtyp stellen.', articleType: 'product', visibility: 'standard' },
];

const besterAnker = bestSectionForRoute(abschnitte, '/de/wipro-iii', 'Welche Batterie wird empfohlen?');
pruefe('Bester Abschnitt für Batteriefrage', besterAnker?.anchor, 'batterie-wechseln');

const dip = bestSectionForRoute(abschnitte, '/de/wipro-iii', 'DIP-Schalter einstellen');
pruefe('Bester Abschnitt für DIP-Frage', dip?.anchor, 'dip-schalter');

const sekTreffer = searchSections(abschnitte, 'Duracell Batterie', zugang, 'de', 3);
pruefeDass('Abschnittssuche findet den Unterabschnitt, nicht das Intro',
  sekTreffer[0]?.anchor === 'batterie-wechseln',
  'Intro-Abwertung (0,25) greift nicht.');

// ── Ergebnis ───────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(60)}`);
console.log(`Ergebnis: ${bestanden} bestanden, ${fehlgeschlagen} fehlgeschlagen`);
if (fehlgeschlagen > 0) {
  console.log('→ Siehe docs/01_RAG_WISSENSTRANSFER.md zur jeweiligen Mechanik.');
  process.exit(1);
}
console.log('→ Retrieval-Kern ist funktionsfähig und framework-frei.');
