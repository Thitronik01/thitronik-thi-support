// Tests für den Such-/Retrieval-Kern (THI-RAG Quick Wins, AP3).
//   node --test tests/search-core.test.js  (via npm test / scripts/run-tests.mjs)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeSearch,
  searchWiki,
  expandSearchQuery,
  buildRetrievalQuery,
  salientTerms,
  extractSnippet,
  findRelatedArticles,
  buildQuizRefIndex,
  matchQuizRefs,
  mergeCuratedHits,
  sourceMatchPercent,
} from '../lib/search-core.js';

const ACCESS = { canViewInternal: false };

// Mini-Suchindex im Format von public/search-index.json.
const INDEX = [
  {
    route: '/de/wipro-iii', title: 'WiPro III', slug: 'wipro-iii', lang: 'de',
    visibility: 'standard', headings: 'Installation Anlernen Testalarm',
    excerpt: 'Funk-Alarmsystem für Freizeitfahrzeuge.',
    body: 'Die WiPro III ist ein Funk-Alarmsystem. Zubehör wie Funk-Handsender wird über das Anlern-Menü angelernt.',
    keywords: 'Alarmanlage Wohnmobil', boostKeywords: 'WiPro III Alarmanlage',
  },
  {
    route: '/de/pro-finder', title: 'Pro-Finder', slug: 'pro-finder', lang: 'de',
    visibility: 'standard', headings: 'GPS Ortung Inbetriebnahme',
    excerpt: 'GPS-Ortungssystem.', body: 'Der Pro-Finder ortet Fahrzeuge per GPS und meldet Positionen.',
    keywords: 'Ortung', boostKeywords: 'Pro-Finder GPS',
  },
  {
    route: '/de/funk-rauchmelder', title: 'T.S.A. — Funk-Rauchmelder für WiPro III', slug: 'funk-rauchmelder', lang: 'de',
    visibility: 'standard', headings: 'Montageort Variante Batterie',
    excerpt: 'Kompakter Funk-Rauchmelder für Freizeitfahrzeuge.',
    body: 'Der T.S.A. Funk-Rauchmelder warnt frühzeitig vor Feuer mit Rauchentwicklung.',
    keywords: 'Funk-Rauchmelder T.S.A. TSA Rauchmelder', boostKeywords: '',
  },
  {
    route: '/de/intern/geheim', title: 'Interner Artikel', slug: 'intern-geheim', lang: 'de',
    visibility: 'internal', headings: 'Anlernen', excerpt: 'Intern.', body: 'Anlernen intern.',
    keywords: '', boostKeywords: '',
  },
];

test('normalizeSearch: Umlaute und Großschreibung', () => {
  assert.equal(normalizeSearch('Türkontakt ÖL Müde Straße'), 'tuerkontakt oel muede strasse');
});

test('expandSearchQuery: Umgangssprache wird auf kanonische Slugs erweitert', () => {
  assert.match(expandSearchQuery('WiPro 3 anlernen'), /wipro-iii/);
  assert.match(expandSearchQuery('Wie funktioniert die Ortung?'), /pro-finder/);
  assert.match(expandSearchQuery('Gas Pro Alarm'), /gas-pro-iii/);
  assert.match(expandSearchQuery('Fernbedienung defekt'), /funk-handsender/);
  // Ohne Alias-Treffer bleibt die Query unverändert.
  assert.equal(expandSearchQuery('Garantieabwicklung'), 'Garantieabwicklung');
});

test('normalizeSearch: Buchstaben-Akronyme werden entpunktet, Zahlen/Versionen bleiben intakt', () => {
  // Punktierte Buchstaben-Akronyme kollabieren (T.S.A. → tsa, G.A.S. → gas).
  assert.equal(normalizeSearch('T.S.A.'), 'tsa');
  assert.match(normalizeSearch('G.A.S.-pro'), /gas-pro/);
  // Falsch-Positiv-Gegenproben: Ziffern/Versionen/Artikelnummern unverändert.
  assert.equal(normalizeSearch('Version 1.1'), 'version 1.1');
  assert.equal(normalizeSearch('co2'), 'co2');
  assert.match(normalizeSearch('Art.-Nr. 105753'), /105753/);
});

test('expandSearchQuery + searchWiki: TSA-Schreibvarianten finden denselben Rauchmelder-Artikel', () => {
  // Kernfix: unterschiedliche Schreibweisen → derselbe Wiki-Artikel → gleiche RAG-Quelle.
  for (const q of ['TSA Funkrauchmelder', 'T.S.A. Funk-Rauchmelder', 'T.S.A Funkrauchmelder',
    'tsa rauchmelder', 'Funk-Rauchmelder', 'Funk Rauchmelder']) {
    // Nach Normalisierung der (ggf. Alias-erweiterten) Query muss der kanonische
    // Slug auftauchen — entweder war er schon da oder der Alias ergänzt ihn.
    assert.match(normalizeSearch(expandSearchQuery(q)), /funk-rauchmelder/, `Slug sollte für „${q}" auflösbar sein`);
    const hits = searchWiki(INDEX, buildRetrievalQuery(q, []), ACCESS, 'de', 8);
    const top3 = hits.slice(0, 3).map((h) => h.route);
    assert.ok(top3.includes('/de/funk-rauchmelder'), `„${q}" → Top-3 sollte /de/funk-rauchmelder enthalten (war ${top3.join(', ')})`);
  }
  // Negativ: generische Fremd-Query darf den Rauchmelder-Alias NICHT auslösen.
  assert.equal(expandSearchQuery('Garantieabwicklung'), 'Garantieabwicklung');
});

test('searchWiki: Alias-erweiterte Query findet den Produktartikel', () => {
  const hits = searchWiki(INDEX, expandSearchQuery('WiPro 3 anlernen'), ACCESS, 'de', 8);
  assert.ok(hits.length >= 1);
  assert.equal(hits[0].route, '/de/wipro-iii');
});

test('searchWiki: interne Artikel bleiben für Händler unsichtbar', () => {
  const hits = searchWiki(INDEX, 'anlernen intern', ACCESS, 'de', 8);
  assert.ok(hits.every((h) => h.visibility !== 'internal'));
});

test('sourceMatchPercent: voll prominente Abdeckung ergibt 100 %', () => {
  // wipro + iii + anlernen stehen alle in Titel/Headings/Boost von /de/wipro-iii.
  assert.equal(sourceMatchPercent(INDEX[0], 'WiPro III anlernen'), 100);
});

test('sourceMatchPercent: Stopwörter und Füllwörter zählen nicht', () => {
  // "welche/gehoert/in/den" fliegen raus; batterie (kein Treffer) + handsender
  // (nur im Body, halbe Punktzahl) → 1 von 4 Punkten = 25 %.
  assert.equal(sourceMatchPercent(INDEX[0], 'Welche Batterie gehört in den Handsender?'), 25);
});

test('sourceMatchPercent: reine Fließtext-Treffer ergeben 50 %', () => {
  const item = {
    title: 'X', slug: 'x', headings: '', boostKeywords: '',
    excerpt: '', body: 'Der Gelverbinder wird verpresst.', keywords: '',
  };
  assert.equal(sourceMatchPercent(item, 'Gelverbinder verpresst?'), 50);
});

test('sourceMatchPercent: Frage ohne signifikante Begriffe liefert null', () => {
  assert.equal(sourceMatchPercent(INDEX[0], 'Wie ist das?'), null);
});

test('buildRetrievalQuery: kurze Folgefrage erbt Begriffe der Vorgängerfrage', () => {
  const q = buildRetrievalQuery('und wie lösche ich ihn?', ['Wie lerne ich einen Funk-Handsender an der WiPro III an?']);
  const norm = normalizeSearch(q);
  assert.match(norm, /handsender/);
  assert.match(norm, /wipro/);
});

test('buildRetrievalQuery: eigenständige Frage bleibt (bis auf Aliasse) unverändert', () => {
  const q = buildRetrievalQuery('Wie wird ein Gelverbinder korrekt verwendet?', ['Frühere Frage über Pro-Finder GPS']);
  assert.doesNotMatch(normalizeSearch(q), /finder/);
});

test('salientTerms: Stoppwörter raus, kurze Begriffe mit Ziffern bleiben', () => {
  assert.deepEqual(salientTerms('Wie ist das mit dem CAN-Bus und g5?'), ['can-bus', 'g5']);
});

test('extractSnippet: Fenster liegt um die Trefferstelle, nicht am Artikelanfang', () => {
  const body = `${'A '.repeat(600)}Der Gelverbinder wird gecrimpt und verpresst.${' B'.repeat(600)}`;
  const snip = extractSnippet(body, 'Gelverbinder crimpen', 200);
  assert.match(snip, /Gelverbinder/);
  assert.match(snip, /^… /);
  assert.match(snip, / …$/);
  assert.ok(snip.length <= 220);
});

test('extractSnippet: Umlaut-Variante wird im Originaltext gefunden', () => {
  const body = `${'x '.repeat(500)}Die Tür wird über den Türkontakt überwacht.${' y'.repeat(500)}`;
  const snip = extractSnippet(body, 'tuerkontakt', 200);
  assert.match(snip, /Türkontakt/);
});

test('extractSnippet: ohne Treffer Fallback auf Artikelanfang; kurzer Text unverändert', () => {
  const body = `Anfang. ${'z '.repeat(800)}`;
  assert.match(extractSnippet(body, 'nichtenthalten', 100), /^Anfang\./);
  assert.equal(extractSnippet('Kurzer Text.', 'egal', 800), 'Kurzer Text.');
});

test('findRelatedArticles: liefert verwandte Artikel, wenn die Gesamt-Query nichts trifft', () => {
  const query = 'Anlernprozedur Spezialgehäuse Quietschgeräusch';
  assert.equal(searchWiki(INDEX, query, ACCESS, 'de', 8).length, 0);
  const related = findRelatedArticles(INDEX, query, ACCESS, 'de', 3);
  assert.ok(related.length >= 1, 'Präfix-Suche (anlern…) sollte WiPro-Artikel finden');
  assert.equal(related[0].route, '/de/wipro-iii');
});

test('buildQuizRefIndex + matchQuizRefs: kuratierte Verweise für ähnliche Fragen', () => {
  const quizData = {
    quizzes: [{
      questions: [
        {
          prompt: 'Wie lernen Sie einen Funk-Handsender an der WiPro III an?',
          answers: [
            { wikiRef: '/de/funk-handsender', wikiLabel: 'funk handsender' },
            { wikiRef: '/de/wipro-iii', wikiLabel: 'wipro iii' },
            { wikiRef: '/de/wipro-iii', wikiLabel: 'doppelt' },
          ],
        },
        { prompt: 'Wofür ist der Pro-Finder gedacht?', answers: [{ wikiRef: '/de/pro-finder', wikiLabel: 'pro finder' }] },
      ],
    }],
  };
  const idx = buildQuizRefIndex(quizData);
  assert.equal(idx.length, 2);
  assert.equal(idx[0].refs.length, 2, 'Dubletten-Routen werden dedupliziert');

  const refs = matchQuizRefs(idx, 'WiPro 3 Handsender anlernen');
  assert.ok(refs.some((r) => r.route === '/de/funk-handsender'));
  // Unähnliche Frage (nur 1 Begriff-Treffer bei mehreren Begriffen) → keine Refs.
  assert.deepEqual(matchQuizRefs(idx, 'Garantie für Gasfilter Außensirene'), []);
});

test('mergeCuratedHits: kuratierter Treffer wirkt auch bei vollem Top-8-Fenster', () => {
  const filler = Array.from({ length: 8 }, (_, index) => ({
    route: `/de/fuell-${index}`,
    title: `Füller ${index}`,
    lang: 'de',
    visibility: 'standard',
  }));
  const searchIndex = [...filler, INDEX[1]];
  const merged = mergeCuratedHits(
    searchIndex,
    filler,
    [{ route: '/de/pro-finder#sim-karte-und-mobilfunk' }],
    ACCESS,
    'de',
    8,
  );

  assert.equal(merged.length, 8);
  assert.equal(merged[0].route, '/de/fuell-0', 'lexikalischer Top-Treffer bleibt erhalten');
  assert.equal(merged[1].route, '/de/pro-finder', 'kuratierter Treffer wird auf Rang 2 eingefügt');
});

test('searchWiki: generische Fragen werden nicht von Fahrzeugartikeln verdrängt', () => {
  const mixedIndex = [
    {
      route: '/de/fahrzeuge/renault-master-iii',
      title: 'Renault Master III',
      slug: 'fahrzeuge renault master iii',
      lang: 'de',
      visibility: 'standard',
      articleType: 'vehicle',
      headings: 'Batterie Funkkontakt Montage',
      excerpt: 'Fahrzeugelektrik und Montage.',
      body: 'Die Batterie des Funkkontakts wird bei der Montage geprüft.',
      keywords: '',
      boostKeywords: '',
    },
    {
      route: '/de/funk-magnetkontakt',
      title: 'Funk-Magnetkontakt',
      slug: 'funk-magnetkontakt',
      lang: 'de',
      visibility: 'standard',
      articleType: 'accessory',
      headings: 'Batterie und Montage',
      excerpt: 'Batterie des Funk-Magnetkontakts.',
      body: 'Der Funk-Magnetkontakt verwendet eine CR2032-Batterie.',
      keywords: '',
      boostKeywords: '',
    },
  ];

  assert.equal(
    searchWiki(mixedIndex, 'Welche Batterie braucht der Funkkontakt?', ACCESS, 'de', 8)[0].route,
    '/de/funk-magnetkontakt',
  );
  assert.equal(
    searchWiki(mixedIndex, 'Batterie Funkkontakt Renault Master III', ACCESS, 'de', 8)[0].route,
    '/de/fahrzeuge/renault-master-iii',
  );
});
