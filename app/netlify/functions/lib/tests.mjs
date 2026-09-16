// ============================================================================
// Selbsttests der Fallprüfung.
// ----------------------------------------------------------------------------
//     node netlify/functions/lib/tests.mjs
//
// Schwerpunkt ist das SICHERHEITS-GATE — die einzige Komponente mit
// Null-Toleranz (docs/05_EVAL_UND_QUALITAET.md §8). Ein übersehener Gasgeruch
// ist ein Produktfehler, kein Qualitätsabzug.
//
// Die negativen Fälle sind genauso wichtig: Ein Gate, das bei jedem normalen
// Gaswarner-Supportfall eskaliert, wird umgangen und schützt dann niemanden.
// ============================================================================

import { pruefeGefahr, leseSeriennummer, pruefeWidersprueche, baueSuchanfrage, fahrzeugGewichten } from './fall.mjs';
import { bewerteSicherheit, leseModellStufe } from './sicherheit.mjs';
import { extractSnippet, searchWiki, buildRetrievalQuery } from './search-core.js';
import {
  STATUS, validiereNotiz, erzeugeNotiz, wechsleStatus, istSicherheitsrelevant,
  wirksameKorrekturen, korrekturAlsArtikel, kontextText, baueModulText, ueberfaellige,
} from './korrekturen.mjs';
import ARTIKEL from '../../../data/artikel.mjs';

let ok = 0;
let fehlgeschlagen = 0;

function pruefe(name, bedingung, detail = '') {
  if (bedingung) { ok += 1; console.log(`  OK    ${name}`); }
  else { fehlgeschlagen += 1; console.log(`  FEHLT ${name}${detail ? `\n        ${detail}` : ''}`); }
}

// ─── 1) Sicherheits-Gate: MUSS auslösen ─────────────────────────────────────
console.log('\n1) Sicherheits-Gate — Gefahr MUSS erkannt werden');
const GEFAHR_DE = [
  'Der Gaswarner piept dauernd und im Fahrzeug riecht es nach Gas.',
  'Es riecht hier drinnen ganz stark nach Gas.',
  'Ich habe Gasgeruch im Aufbau bemerkt.',
  'Aus dem Gerät kommt Rauch.',
  'Das Kabel ist verschmort und riecht verbrannt.',
  'Die Zentrale ist sehr heiß geworden.',
  'Der CO-Alarm geht seit einer Stunde.',
  'Da ist irgendwo ein Gasleck.',
  'Es stinkt im ganzen Wohnmobil nach Gas.',
  'Starke Erwärmung am Steuergerät festgestellt.',
  'Mir wird davon übel und schwindelig.',
  'Am Anschluss gab es Funken.',
];
for (const satz of GEFAHR_DE) {
  const e = pruefeGefahr(satz, 'de');
  pruefe(`DE: "${satz.slice(0, 48)}…"`, e.gefahr, `nicht erkannt — Gate hätte durchgelassen!`);
}

const GEFAHR_FR = [
  'Ça sent le gaz dans le véhicule.',
  'Il y a une odeur de gaz près du détecteur.',
  'Une fuite de gaz au niveau du raccord.',
  'Le boîtier a fondu, odeur de brûlé.',
  'De la fumée sort de la centrale.',
  'L\'alarme monoxyde de carbone se déclenche.',
  'J\'ai des nausées et des vertiges.',
];
for (const satz of GEFAHR_FR) {
  const e = pruefeGefahr(satz, 'fr');
  pruefe(`FR: "${satz.slice(0, 48)}…"`, e.gefahr, 'nicht erkannt — Gate hätte durchgelassen!');
}

// ─── 2) Sicherheits-Gate: darf NICHT auslösen ───────────────────────────────
// Sonst eskaliert jeder normale Gaswarner-Fall und das Gate wird unbrauchbar.
console.log('\n2) Sicherheits-Gate — normale Supportfälle dürfen NICHT eskalieren');
const HARMLOS = [
  'Der G.A.S.-pro III zeigt eine gelbe LED und lässt sich nicht kalibrieren.',
  'Die WiPro III schaltet nicht scharf, wenn ich den Handsender drücke.',
  'Welche Batterie gehört in den Funk-Handsender 868?',
  'Der Pro-Finder sendet keine SMS mehr, LED blinkt grün.',
  'An welchen Pin kommt die Zusatzhupe?',
  'Le détecteur de gaz émet un bip toutes les 30 secondes.',
  'La télécommande ne fonctionne plus depuis le changement de pile.',
  'Wie stelle ich die DIP-Schalter für einen Ducato ein?',
  'Der Gassensor muss nach 5 Jahren getauscht werden, richtig?',
  'Die Sirene ist zu leise eingestellt.',
  // ── Produktnamen, die Gefahrenwörter ENTHALTEN ──
  // Ohne Maskierung eskaliert jede Rauchmelder-Frage. Live aufgefallen:
  // „détecteur de fumée" löste das Gate aus — damit wäre der T.S.A. auf
  // Französisch überhaupt nicht supportbar gewesen.
  'Le détecteur de fumée fonctionne-t-il sans WiPro III ?',
  'Le détecteur de fumée ne se connecte pas à la centrale.',
  'Der Funk-Rauchmelder lässt sich nicht anlernen.',
  'Wie montiere ich den Rauchmelder an der Decke?',
  'Der T.S.A. Rauchmelder piept alle 60 Sekunden.',
  'Comment remplacer la pile du détecteur de fumée ?',
  // ── Fehlalarm-Meldungen ohne Akut-Signal (häufigster Gaswarner-Fall) ──
  'Der Gasalarm wurde letzte Woche grundlos ausgelöst.',
  'Beim Kunden gab es einen Gasalarm, Ursache unklar — was prüfen?',
];
for (const satz of HARMLOS) {
  const e = pruefeGefahr(satz, 'de');
  pruefe(`harmlos: "${satz.slice(0, 48)}…"`, !e.gefahr,
    `fälschlich eskaliert wegen "${e.ausloeser}" — Gate zu scharf!`);
}

// ─── 2b) Grenzfälle: Produktname UND echte Gefahr im selben Satz ────────────
console.log('\n2b) Grenzfälle — Produktname plus echte Gefahr MUSS eskalieren');
const GRENZ = [
  'Der Rauchmelder piept und es riecht verbrannt.',
  'Le détecteur de fumée sonne et il y a de la fumée dans le véhicule.',
  'Der Gaswarner schlägt an und es riecht stark nach Gas.',
  'Gasalarm geht gerade los und wir riechen nichts.',        // Akut-Signal
  'Der CO-Alarm wurde letzte Woche ausgelöst.',              // CO immer
  'Le détecteur de gaz a détecté du monoxyde de carbone.',   // CO immer
];
for (const satz of GRENZ) {
  const e = pruefeGefahr(satz, 'de');
  pruefe(`Grenzfall: "${satz.slice(0, 46)}…"`, e.gefahr,
    'trotz echter Gefahr NICHT eskaliert — die Maskierung greift zu weit!');
}

// ─── 2c) Kohlenmonoxid: die schwierigste Grenze ─────────────────────────────
// CO ist geruchlos und tödlich — ein CO-Alarm MUSS immer eskalieren. Zugleich
// ist „Kohlenmonoxid" ein ganz normales Wort in Produktfragen, und die
// Wissensbasis hat darauf eine Antwort. Beide Richtungen gehören geprüft:
// Ein Gate, das jede CO-Frage zur Notfallmeldung macht, wird umgangen — ein
// Gate, das einen CO-Alarm durchlässt, ist ein Produktfehler.
console.log('\n2c) Kohlenmonoxid — Alarm eskaliert, Sachfrage nicht');

const CO_MUSS = [
  'Der CO-Alarm geht seit einer Stunde.',
  'Kohlenmonoxid-Alarm im Wohnmobil!',
  'Der CO-Sensor schlägt Alarm.',
  'Mein CO-Melder piept ununterbrochen.',
  'Mein CO-Melder piept, warnt der auch vor Gas?',
  'Warnt der Melder vor Kohlenmonoxid? Er piept gerade dauernd.',
  'Es ist Kohlenmonoxid ausgetreten.',
  'Wir haben Kohlenmonoxid im Fahrzeug.',
  'L\'alarme monoxyde de carbone se déclenche.',
  'Le détecteur de monoxyde sonne.',
];
for (const satz of CO_MUSS) {
  pruefe(`CO-Alarm: "${satz.slice(0, 46)}…"`, pruefeGefahr(satz, 'de').gefahr,
    'NICHT erkannt — ein CO-Alarm hätte die Wiki-Antwort statt der Eskalation bekommen!');
}

const CO_DARF_NICHT = [
  'Warnt der T.S.A. Funk-Rauchmelder auch vor Gas oder Kohlenmonoxid?',
  'Warnt der G.A.S.-connect auch vor Kohlenmonoxid?',
  'Erkennt der Gaswarner auch Kohlenmonoxid?',
  'Ist der T.S.A. für Kohlenmonoxid geeignet?',
  'Misst der G.A.S.-pro III CO auch Kohlenmonoxid?',
  'Le détecteur avertit-il du monoxyde de carbone ?',
  'Welchen Softwarestand braucht der CO-Sensor?',
  'Wie lerne ich den CO-Sensor an?',
];
for (const satz of CO_DARF_NICHT) {
  const e = pruefeGefahr(satz, 'de');
  pruefe(`CO-Sachfrage frei: "${satz.slice(0, 44)}…"`, !e.gefahr,
    `FEHLALARM („${e.ausloeser}") — die Wissensbasis hat auf diese Frage eine Antwort.`);
}

// Umlaute und Wortgrenzen: `\b` ist in JavaScript auf ASCII definiert. Ein
// Muster wie /\bübel\b/ trifft deshalb NIE. Das ist keine Theorie — genau so
// lief „Mir ist übel." am Gate vorbei, während der alte Testsatz nur zufällig
// über „schwindelig" ansprang. Deshalb hier die knappen Formen einzeln.
console.log('\n2d) Symptome ohne Zweitwort — Umlaut-Fallstrick');
for (const satz of ['Mir ist übel.', 'Mir ist übel und ich weiß nicht warum.', 'Starke Übelkeit.',
  'Mir ist schwindelig.', 'Ich bin benommen.', 'Ich habe Kopfschmerzen davon.']) {
  pruefe(`Symptom allein: "${satz}"`, pruefeGefahr(satz, 'de').gefahr,
    'nicht erkannt — Symptom muss ALLEIN reichen, ohne zweites Stichwort!');
}

// ─── 3) Seriennummern lesen ─────────────────────────────────────────────────
console.log('\n3) Seriennummern-Präfixe');
const sn1 = leseSeriennummer('5298-012');
pruefe('5298 → Ford-Set', sn1.bekannt && sn1.variante === 'Ford-Set', JSON.stringify(sn1));
pruefe('5298 → safe.lock', /safe\.lock/.test(sn1.produkt || ''), sn1.produkt);

const sn2 = leseSeriennummer('0699-045');
pruefe('0699-045 → Pro-finder', sn2.produkt === 'Pro-finder');
pruefe('0699-045 erreicht Schwelle', sn2.ueberSchwelle === true, JSON.stringify(sn2));

const sn3 = leseSeriennummer('0699-030');
pruefe('0699-030 unter Schwelle', sn3.ueberSchwelle === false, JSON.stringify(sn3));

pruefe('führende Null bleibt erhalten', leseSeriennummer('0823-001').praefix === '0823');
pruefe('Leerzeichen-Variante wird gelesen', leseSeriennummer('1050 118').praefix === '1050');
pruefe('unbekanntes Präfix wird gemeldet', leseSeriennummer('9999-001').bekannt === false);
pruefe('leere Eingabe ergibt null', leseSeriennummer('') === null);

// ─── 4) Widerspruchsprüfung ─────────────────────────────────────────────────
console.log('\n4) Widerspruchsprüfung');
const fiat = { titel: 'Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer (2022–2024)', von: 2022, bis: 2024, offen: false };

const w1 = pruefeWidersprueche({ fahrzeug: fiat, produkte: ['WiPro III'], seriennummer: '5298-012', baujahr: '2023' });
pruefe('Ford-SN bei Fiat wird gemeldet', w1.hinweise.some((h) => h.art === 'sn_fahrzeug'),
  JSON.stringify(w1.hinweise.map((h) => h.art)));
pruefe('safe.lock-Variante wird gemeldet', w1.hinweise.some((h) => h.art === 'variante'));

const w2 = pruefeWidersprueche({ fahrzeug: fiat, produkte: ['WiPro III'], seriennummer: '', baujahr: '2015' });
pruefe('Baujahr außerhalb wird gemeldet', w2.hinweise.some((h) => h.art === 'baujahr'));

const w3 = pruefeWidersprueche({ fahrzeug: fiat, produkte: ['WiPro III safe.lock'], seriennummer: '1050-118', baujahr: '2023' });
pruefe('stimmiger Fall erzeugt KEINE Warnung', w3.hinweise.length === 0,
  JSON.stringify(w3.hinweise.map((h) => h.text)));

const offen = { titel: 'Renault Master III (ab 2011)', von: 2011, bis: null, offen: true };
const w4 = pruefeWidersprueche({ fahrzeug: offen, produkte: [], seriennummer: '', baujahr: '2024' });
pruefe('offenes Ende akzeptiert spätes Baujahr', !w4.hinweise.some((h) => h.art === 'baujahr'));

const fallback = { titel: 'Universalanschluss', von: null, bis: null, offen: false, fallback: true };
const w5 = pruefeWidersprueche({ fahrzeug: fallback, produkte: [], seriennummer: '', baujahr: '1998' });
pruefe('Fallback-Fahrzeug wird nicht gegen Baujahr geprüft', !w5.hinweise.some((h) => h.art === 'baujahr'));

// ─── 5) Suchanfrage ─────────────────────────────────────────────────────────
console.log('\n5) Retrieval-Query');
const q = baueSuchanfrage({
  fehlerbild: { beobachtet: 'Zentralverriegelung reagiert nicht', led: '2x rot' },
  produkte: ['WiPro III safe.lock'],
  produktSlugs: ['wipro-iii'],
  fahrzeug: { slug: 'fiat-ducato-2022-2024' },
});
pruefe('Fehlerbild fließt ein', q.includes('Zentralverriegelung'));
pruefe('LED-Angabe fließt ein', q.includes('2x rot'));
pruefe('Produkt-Slug fließt ein', q.includes('wipro-iii'));
// Bewusste Änderung nach einem Live-Befund: Der Fahrzeug-Slug als SUCHTEXT zog
// alle Ducato-Generationen hoch (auch die falschen). Er wirkt jetzt als
// Gewichtung, nicht als Suchbegriff.
pruefe('Fahrzeug-Slug ist KEIN Suchbegriff', !q.includes('ducato'), q);

const qOhne = baueSuchanfrage({
  fehlerbild: { beobachtet: 'Test' }, produkte: [], produktSlugs: [],
});
pruefe('Fallback-Fahrzeug verwässert die Query nicht', !qOhne.includes('universalanschluss'), qOhne);

// ─── 6) Fahrzeug-Gewichtung ─────────────────────────────────────────────────
console.log('\n6) Fahrzeug-Gewichtung (der Kern-Gewinn der Formatvorlage)');
const roh = [
  { route: '/de/fahrzeuge/fiat-ducato-2024plus', slug: 'fiat-ducato-2024plus', articleType: 'vehicle', score: 317 },
  { route: '/de/fahrzeuge/fiat-ducato-2022-2024', slug: 'fiat-ducato-2022-2024', articleType: 'vehicle', score: 300 },
  { route: '/de/fahrzeuge/fiat-ducato-2012-2021', slug: 'fiat-ducato-2012-2021', articleType: 'vehicle', score: 310 },
  { route: '/de/sirenen-hupen', slug: 'sirenen-hupen', articleType: 'reference', score: 120 },
];
const gewichtet = fahrzeugGewichten(roh, 'fiat-ducato-2022-2024');
pruefe('richtige Generation steht vorn', gewichtet[0].route === '/de/fahrzeuge/fiat-ducato-2022-2024',
  gewichtet.map((t) => `${Math.round(t.score)} ${t.slug}`).join(' | '));
pruefe('Fachartikel schlägt falsche Generationen',
  gewichtet.findIndex((t) => t.slug === 'sirenen-hupen')
    < gewichtet.findIndex((t) => t.slug === 'fiat-ducato-2024plus'),
  gewichtet.map((t) => `${Math.round(t.score)} ${t.slug}`).join(' | '));
pruefe('Nicht-Fahrzeugartikel bleiben unverändert',
  gewichtet.find((t) => t.slug === 'sirenen-hupen').score === 120);
pruefe('ohne Fahrzeugangabe wird nichts umgewichtet',
  fahrzeugGewichten(roh, null)[0].score === 317);


// ─── 7) Sicherheitsbewertung ────────────────────────────────────────────────
// Die Prozentzahl steuert, wie sehr ein Mitarbeiter der Antwort traut. Sie darf
// bei dünner Lage nicht hoch und bei Widersprüchen nie „hoch" sein.
console.log('\n7) Sicherheitsbewertung');

const vollerFall = {
  fehlerbild: { beobachtet: 'Die Zentralverriegelung reagiert nicht beim Scharfschalten.', led: '2x rot' },
  produkte: ['WiPro III safe.lock'],
  fahrzeug: { slug: 'fiat-ducato-2022-2024' },
};
const starkeQuellen = [{ score: 260 }, { score: 180 }, { score: 90 }];

const sVoll = bewerteSicherheit({ fall: vollerFall, sn: { bekannt: true, praefix: '1050' }, quellen: starkeQuellen, modellStufe: 'hoch' });
pruefe('vollständige Angaben + starke Quellen → hoch', sVoll.stufe === 'hoch' && sVoll.wert >= 85, `${sVoll.wert}% ${sVoll.stufe}`);
pruefe('nichts offen, wenn alles erfasst ist', sVoll.fehlt.length === 0, JSON.stringify(sVoll.fehlt));

const sDuenn = bewerteSicherheit({ fall: { fehlerbild: { beobachtet: 'Geht nicht mehr.' }, produkte: [] }, sn: null, quellen: [{ score: 60 }], modellStufe: 'mittel' });
pruefe('dünne Angaben → nicht hoch', sDuenn.stufe !== 'hoch', `${sDuenn.wert}% ${sDuenn.stufe}`);
pruefe('dünne Angaben benennen, was fehlt', sDuenn.fehlt.length >= 3, JSON.stringify(sDuenn.fehlt));

const sSchwach = bewerteSicherheit({ fall: vollerFall, sn: { bekannt: true, praefix: '1050' }, quellen: [{ score: 30 }], modellStufe: 'gering' });
pruefe('schwache Quellen drücken trotz voller Angaben', sSchwach.wert < 60, `${sSchwach.wert}%`);
pruefe('schwache Quellenlage wird begründet', sSchwach.gruende.length > 0);

// Der gefährlichste Fall: überzeugende Quellen, aber widersprüchliche Angaben.
const sWiderspruch = bewerteSicherheit({
  fall: vollerFall, sn: { bekannt: true, praefix: '5298' }, quellen: starkeQuellen,
  modellStufe: 'hoch', hinweise: [{ schwere: 'warnung' }],
});
pruefe('Widerspruch deckelt auf höchstens „mittel"', sWiderspruch.stufe !== 'hoch', `${sWiderspruch.wert}% ${sWiderspruch.stufe}`);
pruefe('Widerspruch wird begründet', sWiderspruch.gruende.length > 0);

const sZwei = bewerteSicherheit({
  fall: vollerFall, sn: { bekannt: true, praefix: '5298' }, quellen: starkeQuellen,
  modellStufe: 'hoch', hinweise: [{ schwere: 'warnung' }, { schwere: 'warnung' }],
});
pruefe('zwei Widersprüche → gering', sZwei.stufe === 'gering', `${sZwei.wert}% ${sZwei.stufe}`);

const sHinweis = bewerteSicherheit({
  fall: vollerFall, sn: { bekannt: true, praefix: '1050' }, quellen: starkeQuellen,
  modellStufe: 'hoch', hinweise: [{ schwere: 'hinweis' }],
});
pruefe('reiner Hinweis deckelt NICHT', sHinweis.stufe === 'hoch', `${sHinweis.wert}%`);

pruefe('Wert bleibt im Bereich 3–97',
  [sVoll, sDuenn, sSchwach, sWiderspruch, sZwei].every((s) => s.wert >= 3 && s.wert <= 97));

// Marker
pruefe('Marker wird gelesen', leseModellStufe('Antwort.\n[[SICHERHEIT: hoch]]').stufe === 'hoch');
pruefe('Marker wird aus dem Text entfernt',
  !leseModellStufe('Antwort.\n[[SICHERHEIT: hoch]]').text.includes('SICHERHEIT'));
pruefe('französische Marker-Variante', leseModellStufe('Réponse. [[SICHERHEIT: faible]]').stufe === 'gering');
pruefe('ohne Marker kein Absturz', leseModellStufe('Nur Text').stufe === null);
// ─── 8) Textfenster (extractSnippet) ────────────────────────────────────────
// Diese Funktion entscheidet, WELCHE Stelle eines gefundenen Artikels das
// Modell zu sehen bekommt. Sie war lange die stillste Fehlerquelle im System:
// Sie liefert immer irgendeinen plausiblen Text, auch den falschen. Vier von
// sechs Fehlschlägen im Gold-Lauf gingen darauf zurück — das Modell antwortete
// „dazu steht nichts in der Dokumentation" und hatte damit recht, weil der
// Satz nie mitgeschickt wurde (werkzeuge/antwort-eval.mjs).
console.log('\n8) Textfenster — die richtige Stelle, nicht die erste');

const FUELL = 'Allgemeine Beschreibung des Systems und seiner Bedienung. '.repeat(120); // ~6600 Z.

// Der Produktname steht im Titel und wiederholt sich — die Antwort steht weit
// hinten. Genau der Fall, an dem die frühere Fassung scheiterte.
const langerArtikel = `WiPro III Alarmanlage — Übersicht\n${FUELL}`
  + 'Die WiPro III wird über den Handsender bedient. '.repeat(40)
  + '\nWICHTIG: Scharfschalten über den Fahrzeugfunkschlüssel ist nur bei geschlossenen Fahrerhaustüren möglich.\n'
  + `${FUELL}`;

const fenster = extractSnippet(langerArtikel, 'Kann man per Fahrzeugfunkschlüssel bei offener Fahrerhaustür scharf schalten?', 3000);
pruefe('findet die Stelle tief im Text statt des Textanfangs',
  fenster.includes('geschlossenen Fahrerhaustüren'),
  `Fenster beginnt mit: ${fenster.slice(0, 70)}…`);
pruefe('Fenster hält die vorgegebene Größe ein', fenster.length <= 3000 + 8, `${fenster.length} Zeichen`);
pruefe('abgeschnittener Anfang wird mit … kenntlich gemacht', fenster.startsWith('… '));

// Ein häufiges Wort darf das Fenster nicht an sich reißen: „system" steht
// hundertfach im Fülltext, „notstromakku" genau einmal — dorthin gehört das
// Fenster.
const seltenerBegriff = `${FUELL}Der Notstromakku hält die Zentrale 12 Stunden am Laufen.\n${FUELL}`;
const f2 = extractSnippet(seltenerBegriff, 'Wie lange hält der Notstromakku im System?', 2000);
pruefe('seltener Begriff schlägt häufigen', f2.includes('Notstromakku'), f2.slice(0, 70));

// Kurze Texte bleiben unangetastet — kein „…", keine Auswahl.
const kurz = 'Batterie CR2032, Lebensdauer etwa zwei Jahre.';
pruefe('kurzer Text bleibt unverändert', extractSnippet(kurz, 'Batterie', 800) === kurz);

// Kein Suchbegriff im Text: definierter Rückfall auf den Textanfang.
const ohneTreffer = extractSnippet(`Anfang des Artikels. ${FUELL}`, 'völlig anderes Thema Quantenphysik', 1000);
pruefe('ohne Begriffstreffer Rückfall auf den Anfang', ohneTreffer.startsWith('Anfang des Artikels.'));

// Robustheit: leere und fehlende Eingaben dürfen nicht werfen.
pruefe('leerer Text wirft nicht', extractSnippet('', 'irgendwas', 500) === '');
pruefe('null-Text wirft nicht', extractSnippet(null, 'irgendwas', 500) === '');
pruefe('leere Suchanfrage wirft nicht', typeof extractSnippet(langerArtikel, '', 500) === 'string');

// ─── Support-Korrekturen ────────────────────────────────────────────────────
// docs/07_KORREKTUREN_ENTWUERFE.md — die Regeln, die eine eingepflegte
// Falschaussage davon abhalten, wie eine geprüfte Wiki-Aussage zu wirken.
console.log('\n9) Support-Korrekturen');
{ // eigener Block — die Namen unten kollidieren sonst mit früheren Abschnitten
const DE_ARTIKEL = ARTIKEL.filter((a) => a.lang === 'de');
const handsender = DE_ARTIKEL.find((a) => a.slug === 'funk-handsender');
pruefe('Testartikel funk-handsender vorhanden', !!handsender);

const rohNotiz = {
  lang: 'de',
  titel: 'Funk-Handsender: Batterielaufzeit',
  text: 'Die Laufzeit der CR2032-Knopfzelle beträgt bei normaler Nutzung etwa zwei Jahre, nicht ein Jahr.',
  widerspricht: 'Im Wiki steht „etwa ein Jahr".',
  autor: 'M. Behrens',
  bezug: { route: handsender?.route, anchor: 'batterie' },
  ausloeser: { frage: 'Wie lange hält die Batterie im Handsender?', antwortAuszug: 'Laut Wiki etwa ein Jahr.' },
};

// Validierung
const v1 = validiereNotiz(rohNotiz, ARTIKEL);
pruefe('gültige Notiz wird angenommen', v1.ok, JSON.stringify(v1.fehler));
pruefe('Notiz ohne Text wird abgelehnt', !validiereNotiz({ ...rohNotiz, text: '' }, ARTIKEL).ok);
pruefe('Notiz ohne Namen wird abgelehnt', !validiereNotiz({ ...rohNotiz, autor: '' }, ARTIKEL).ok);
pruefe('Notiz mit unbekanntem Bezug wird abgelehnt', !validiereNotiz({ ...rohNotiz, bezug: { route: '/de/gibt-es-nicht' } }, ARTIKEL).ok);
pruefe('zu langer Text wird abgelehnt', !validiereNotiz({ ...rohNotiz, text: 'x'.repeat(2001) }, ARTIKEL).ok);
pruefe('fremde Felder werden verworfen', !('boese' in validiereNotiz({ ...rohNotiz, boese: 1 }, ARTIKEL).notiz));

// Sicherheitsrelevanz — Sperrliste über den Bezugsartikel
const gesperrt = DE_ARTIKEL.filter((a) => istSicherheitsrelevant({ bezug: { route: a.route }, titel: '', text: '' }).relevant).map((a) => a.slug);
const erwartetGesperrt = ['gas', 'gas-pro', 'gas-pro-iii', 'gas-plug', 'gas-connect', 'co-sensor', 'zusatzsensor-gas-pro-iii', 'funk-rauchmelder', 'abschalteinrichtung'];
pruefe('Sperrliste erfasst alle Gas-/CO-/Rauch-/Abschalt-Artikel',
  erwartetGesperrt.every((s) => gesperrt.includes(s)), `fehlt: ${erwartetGesperrt.filter((s) => !gesperrt.includes(s)).join(', ')}`);
pruefe('Sperrliste erfasst die Gas-/CO-Anleitungen und das CO-FAQ',
  gesperrt.filter((s) => s.startsWith('anleitung-')).length >= 6 && gesperrt.some((s) => s.startsWith('faq-') && s.includes('co-sensor')),
  gesperrt.join(', '));
pruefe('Sperrliste lässt WiPro, Handsender, BT-connect, Pro-Finder durch',
  ['wipro-iii', 'funk-handsender', 'bt-connect', 'pro-finder'].every((s) => !gesperrt.includes(s)));
// Gemessen am 16.09.2026: genau 20 (9 Artikel, 9 Anleitungen, 2 FAQ). Wächst
// die Zahl deutlich, ist die Sperrliste zu weit gefasst — dann blockiert sie
// harmlose Korrekturen und wird umgangen.
pruefe('Sperrliste ist eng (höchstens 24 DE-Artikel)', gesperrt.length <= 24, `${gesperrt.length}: ${gesperrt.join(', ')}`);
pruefe('Sperrliste erfasst beide Abschalteinrichtungs-Anleitungen', gesperrt.filter((s) => s.includes('abschalteinrichtung')).length === 3);

// Sicherheitsrelevanz — über den Text, auch bei harmlosem Bezug
pruefe('Text über CO macht die Notiz sicherheitsrelevant',
  istSicherheitsrelevant({ bezug: { route: handsender?.route }, titel: 'Handsender', text: 'Der CO-Sensor wird über den Handsender stumm geschaltet.' }).relevant);
pruefe('Text über G.A.S.-pro macht die Notiz sicherheitsrelevant',
  istSicherheitsrelevant({ bezug: { route: handsender?.route }, titel: 'Handsender', text: 'Gilt auch für den G.A.S.-pro III am selben Bus.' }).relevant);
pruefe('Text über Gasgeruch (Gate) macht die Notiz sicherheitsrelevant',
  istSicherheitsrelevant({ bezug: { route: handsender?.route }, titel: 'Handsender', text: 'Wenn es nach Gas riecht, zuerst lüften.' }).relevant);
pruefe('Batterie-Notiz ist NICHT sicherheitsrelevant', !istSicherheitsrelevant(v1.notiz).relevant);
pruefe('„BT-connect" wird nicht als CO gelesen',
  !istSicherheitsrelevant({ bezug: { route: '/de/bt-connect' }, titel: 'BT-connect Kopplung', text: 'Die Kopplung gelingt erst nach dem Neustart der App.' }).relevant);

// Anlegen: Status folgt aus der Relevanz, nicht aus der Eingabe
const fest = { jetzt: new Date('2026-09-16T10:00:00Z'), zufall: () => 0.5 };
const n1 = erzeugeNotiz(v1.notiz, fest);
pruefe('harmlose Notiz startet als „ungeprueft"', n1.status === STATUS.UNGEPRUEFT);
pruefe('ID trägt Datum und Titel', /^2026-09-16-funk-handsender-batterielaufzeit-[0-9a-f]{4}$/.test(n1.id), n1.id);
pruefe('Historie beginnt mit dem Autor', n1.historie.length === 1 && n1.historie[0].von === 'M. Behrens');
const nGas = erzeugeNotiz({ ...v1.notiz, bezug: { route: '/de/gas-pro-iii', anchor: '' } }, fest);
pruefe('Notiz zu gas-pro-iii startet als „wartet-freigabe"', nGas.status === STATUS.WARTET && nGas.sicherheitsrelevant);

// Statuswechsel
pruefe('freigeben ohne Namen wird abgelehnt', !wechsleStatus(n1, 'freigeben', { von: '' }).ok);
const f1 = wechsleStatus(n1, 'freigeben', { von: 'A. Prüfer', jetzt: fest.jetzt });
pruefe('freigeben setzt Status, Freigeber und Historie',
  f1.ok && f1.notiz.status === STATUS.FREIGEGEBEN && f1.notiz.freigegebenVon === 'A. Prüfer' && f1.notiz.historie.length === 2);
pruefe('freigegeben → freigeben ist nicht möglich', !wechsleStatus(f1.notiz, 'freigeben', { von: 'X Y' }).ok);
pruefe('Vier-Augen: Autor kann nicht selbst freigeben', !wechsleStatus(n1, 'freigeben', { von: 'm. behrens' }).ok);
pruefe('Vier-Augen: Autor darf zurückziehen', wechsleStatus(n1, 'zurueckziehen', { von: 'M. Behrens' }).ok);
pruefe('sicherheitsrelevant ohne Begründung wird nicht freigegeben', !wechsleStatus(nGas, 'freigeben', { von: 'A. Prüfer', begruendung: 'ok' }).ok);
pruefe('sicherheitsrelevant mit Begründung wird freigegeben',
  wechsleStatus(nGas, 'freigeben', { von: 'A. Prüfer', begruendung: 'Mit Entwicklung abgestimmt am 16.09.' }).ok);
pruefe('zurückziehen geht aus jedem wirksamen Status', wechsleStatus(f1.notiz, 'zurueckziehen', { von: 'M. B.' }).ok);
pruefe('im-wiki aus zurückgezogen ist nicht möglich',
  !wechsleStatus(wechsleStatus(f1.notiz, 'zurueckziehen', { von: 'M. B.' }).notiz, 'im-wiki', { von: 'M. B.' }).ok);
pruefe('unbekannte Aktion wird abgelehnt', !wechsleStatus(n1, 'loeschen', { von: 'M. B.' }).ok);

// Wirksamkeit
const alle = [n1, nGas, f1.notiz, wechsleStatus(n1, 'zurueckziehen', { von: 'M. B.' }).notiz];
pruefe('nur ungeprüft und freigegeben wirken', wirksameKorrekturen(alle).length === 2);

// Fürs Retrieval: gefunden, aber nicht flutend
const kArtikel = korrekturAlsArtikel(n1, ARTIKEL);
pruefe('Korrektur-Artikel trägt Typ und Herkunft', kArtikel.articleType === 'korrektur' && kArtikel.korrektur.id === n1.id);
pruefe('Kontexttext beginnt mit SUPPORT-KORREKTUR und Status', /^SUPPORT-KORREKTUR \(Status: UNGEPRÜFT/.test(kArtikel.body));
pruefe('Kontexttext nennt Bezugsartikel', kArtikel.body.includes(handsender?.title || '§'));
pruefe('freigegebene Notiz nennt Freigeber im Kontext', kontextText(f1.notiz, handsender).includes('freigegeben am') && kontextText(f1.notiz, handsender).includes('A. Prüfer'));
pruefe('FR-Kontexttext nutzt französische Kopfzeile', /^CORRECTION DU SUPPORT/.test(kontextText({ ...n1, lang: 'fr' }, handsender, 'fr')));

const zugang = { canViewInternal: false };
const index = [...ARTIKEL, kArtikel];
const trefferPassend = searchWiki(index, buildRetrievalQuery('Welche Batterie kommt in den Funk-Handsender und wie lange hält sie?'), zugang, 'de', 8);
const rangPassend = trefferPassend.findIndex((t) => t.articleType === 'korrektur');
pruefe('passende Frage findet die Korrektur in den Top-3', rangPassend >= 0 && rangPassend < 3, `Rang ${rangPassend + 1}`);
pruefe('Korrektur verdrängt den Wiki-Artikel nicht von Platz 1', trefferPassend[0]?.slug === 'funk-handsender', trefferPassend[0]?.slug);
const unpassend = [
  'Welche DIP-Stellung braucht der Fiat Ducato 2023?',
  'Wie lösche ich den Alarmspeicher der WiPro III?',
  'Pro-Finder sendet keine SMS mehr, SIM-PIN?',
  'G.A.S.-pro III Montagehöhe im Kastenwagen',
  'NFC Modul KeyCard anlernen Reihenfolge',
  'Zusatzhupe an welchen Pin bei der WiPro III?',
];
const flut = unpassend.filter((f) => searchWiki(index, buildRetrievalQuery(f), zugang, 'de', 8).some((t) => t.articleType === 'korrektur')).length;
pruefe('unpassende Fragen holen die Korrektur nicht in die Top-8', flut === 0, `${flut} von ${unpassend.length}`);

// Prozentwert: ungeprüft deckelt, freigegeben nicht
const starkerFall = {
  fall: { fehlerbild: { beobachtet: 'Handsender reagiert nur noch sporadisch, LED bleibt dunkel', led: 'aus' }, produkte: ['Funk-Handsender'], fahrzeug: { slug: 'fiat-ducato-2022-2024' } },
  sn: { bekannt: true, praefix: '0823' },
  hinweise: [], rueckfallDe: false, modellStufe: 'hoch', sprache: 'de',
};
const starkeQuellen = [{ route: '/de/funk-handsender', score: 200 }, { route: '/de/wipro-iii', score: 120 }, { route: '/de/anlernvorgang', score: 90 }];
const ohne = bewerteSicherheit({ ...starkerFall, quellen: starkeQuellen });
pruefe('Referenzfall ohne Korrektur liegt über 60 %', ohne.wert > 60, `${ohne.wert} %`);
const mitUngeprueft = bewerteSicherheit({ ...starkerFall, quellen: [...starkeQuellen, { route: kArtikel.route, score: 76, korrektur: kArtikel.korrektur }] });
pruefe('ungeprüfte Korrektur deckelt auf 60 %', mitUngeprueft.wert <= 60, `${mitUngeprueft.wert} %`);
pruefe('Deckel wird begründet', mitUngeprueft.gruende.some((g) => g.includes('ungeprüfte Support-Korrektur')));
const fArtikel = korrekturAlsArtikel(f1.notiz, ARTIKEL);
const mitFreigabe = bewerteSicherheit({ ...starkerFall, quellen: [...starkeQuellen, { route: fArtikel.route, score: 76, korrektur: fArtikel.korrektur }] });
pruefe('freigegebene Korrektur deckelt nicht', mitFreigabe.wert === ohne.wert, `${mitFreigabe.wert} % vs ${ohne.wert} %`);
pruefe('freigegebene Korrektur wird in den Gründen genannt', mitFreigabe.gruende.some((g) => g.includes('freigegebene Support-Korrektur')));
pruefe('FR-Begründung für ungeprüfte Korrektur', bewerteSicherheit({ ...starkerFall, sprache: 'fr', quellen: [{ route: kArtikel.route, score: 76, korrektur: kArtikel.korrektur }] }).gruende.some((g) => g.includes('non encore validée')));

// Modul-Text und Wiedervorlage
const modul = baueModulText([n1]);
pruefe('Modultext ist auswertbares JS mit Default-Export', modul.startsWith('// AUTOMATISCH') && modul.includes('export default [') && JSON.parse(modul.slice(modul.indexOf('export default ') + 15, -2)).length === 1);
pruefe('Modultext maskiert U+2028', baueModulText([{ ...n1, text: `a${String.fromCharCode(0x2028)}b` }]).includes('\\u2028'));
pruefe('Wiedervorlage findet alte ungeprüfte Notizen', ueberfaellige([n1], new Date('2026-12-01').getTime()).length === 1);
pruefe('Wiedervorlage ignoriert frische und freigegebene', ueberfaellige([n1, f1.notiz], new Date('2026-09-20').getTime()).length === 0);
}

// ─── Ergebnis ───────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(64)}`);
console.log(`Ergebnis: ${ok} bestanden, ${fehlgeschlagen} fehlgeschlagen`);
if (fehlgeschlagen > 0) process.exit(1);
console.log('→ Sicherheits-Gate und Fallprüfung arbeiten wie spezifiziert.');
