// Tests für die Händler-Projektion der Wiki-Artefakte (Finding P1,
// Security-Review 2026-07-22): Nicht-Interne dürfen weder das ungefilterte
// html noch interne sourceMeta/Suchtexte über die Leitung bekommen.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  INTERNAL_SECTION_ANCHORS,
  dealerArticleView,
  dealerHeadingsFor,
  dealerSearchView,
  dealerSectionsView,
  htmlToPlainText,
  stripDealerSearchFields,
} from '../lib/wiki-dealer-view.mjs';

const FULL_HTML = '<h2 id="einbau">Einbau</h2><p>Öffentlich.</p><h2 id="service-intern">Service &amp; Intern</h2><p>GEHEIM-42</p>';
const DEALER_HTML = '<h2 id="einbau">Einbau</h2><p>Öffentlich.</p>';

const ARTICLE = {
  route: '/de/produkte/wipro',
  visibility: 'standard',
  html: FULL_HTML,
  dealerHtml: DEALER_HTML,
  sources: ['wiki/de/quelle.md', 'sources/intern/schaltplan.pdf'],
  dealerSources: ['wiki/de/quelle.md'],
  sourceMeta: [
    { source: 'wiki/de/quelle.md', internal: false, public: true },
    { source: 'sources/intern/schaltplan.pdf', internal: true, public: false },
  ],
  headings: [
    { level: 1, text: 'WiPro', id: 'wipro' },
    { level: 2, text: 'Einbau', id: 'einbau' },
    { level: 2, text: 'Service & Intern', id: 'service-intern' },
    { level: 3, text: 'Interner Ablauf', id: 'interner-ablauf' },
    { level: 2, text: 'FAQ', id: 'faq' },
  ],
};

test('dealerArticleView: liefert dealerHtml als html, nie die volle Fassung', () => {
  const view = dealerArticleView(ARTICLE);
  assert.equal(view.html, DEALER_HTML);
  assert.equal(view.dealerHtml, undefined);
  assert.ok(!JSON.stringify(view).includes('GEHEIM-42'), 'kein interner Text in der Händler-Sicht');
});

test('dealerArticleView: sourceMeta/sources ohne interne Quellen', () => {
  const view = dealerArticleView(ARTICLE);
  assert.deepEqual(view.sources, ['wiki/de/quelle.md']);
  assert.equal(view.sourceMeta.length, 1);
  assert.equal(view.sourceMeta[0].source, 'wiki/de/quelle.md');
  assert.ok(!JSON.stringify(view).includes('schaltplan'), 'interner Quellpfad darf nicht leaken');
});

test('dealerArticleView: Headings ohne Service-&-Intern-Block (inkl. H3-Kinder), Folge-H2 bleibt', () => {
  const view = dealerArticleView(ARTICLE);
  assert.deepEqual(view.headings.map((h) => h.id), ['wipro', 'einbau', 'faq']);
});

test('dealerArticleView: fail-closed ohne dealerHtml-Feld (uralte Artefakte)', () => {
  const { dealerHtml, ...withoutDealer } = ARTICLE;
  const view = dealerArticleView(withoutDealer);
  assert.equal(view.html, '', 'nie die ungefilterte html-Fassung ausliefern');
});

test('dealerSearchView: ersetzt Textfelder durch die dealer*-Fassung und strippt die Rohfelder', () => {
  const item = {
    route: '/de/produkte/wipro',
    visibility: 'standard',
    excerpt: 'voll GEHEIM-42',
    body: 'voll GEHEIM-42 lang',
    keywords: 'WiPro GEHEIM-42',
    headings: 'Einbau Service & Intern FAQ',
    dealerExcerpt: 'nur öffentlich',
    dealerBody: 'nur öffentlich lang',
    dealerKeywords: 'WiPro',
    dealerHeadings: 'Einbau FAQ',
  };
  const view = dealerSearchView(item);
  assert.equal(view.body, 'nur öffentlich lang');
  assert.equal(view.excerpt, 'nur öffentlich');
  assert.equal(view.keywords, 'WiPro');
  assert.equal(view.headings, 'Einbau FAQ');
  assert.ok(!JSON.stringify(view).includes('GEHEIM-42'));
  assert.equal(view.dealerBody, undefined);
  assert.equal(view.dealerExcerpt, undefined);
});

test('dealerSearchView: Einträge ohne Intern-Anteil bleiben unverändert', () => {
  const item = { route: '/de/x', visibility: 'standard', body: 'öffentlich', excerpt: 'ö' };
  assert.deepEqual(dealerSearchView(item), item);
});

test('stripDealerSearchFields: entfernt die Rohfelder auch aus der internen Sicht', () => {
  const stripped = stripDealerSearchFields({ body: 'voll', dealerBody: 'gefiltert', dealerHeadings: 'x' });
  assert.deepEqual(stripped, { body: 'voll' });
});

test('dealerSectionsView: interne Artikel UND dealerHidden-Abschnitte fliegen raus', () => {
  const sections = [
    { route: '/de/a', visibility: 'standard', anchor: 'einbau', body: 'ok' },
    { route: '/de/a', visibility: 'standard', anchor: 'service-intern', body: 'GEHEIM-42', dealerHidden: true },
    { route: '/de/intern/b', visibility: 'internal', anchor: 'x', body: 'intern' },
  ];
  const view = dealerSectionsView(sections);
  assert.equal(view.length, 1);
  assert.equal(view[0].anchor, 'einbau');
  assert.equal(view[0].dealerHidden, undefined);
  assert.ok(!JSON.stringify(view).includes('GEHEIM-42'));
});

test('dealerHeadingsFor: H1 beendet einen Intern-Block, Anker-Set deckt alle Varianten', () => {
  for (const anchor of INTERNAL_SECTION_ANCHORS) {
    const headings = [
      { level: 2, text: 'Intern', id: anchor },
      { level: 3, text: 'Kind', id: 'kind' },
      { level: 1, text: 'Neuer Artikel-Teil', id: 'neu' },
      { level: 3, text: 'Danach', id: 'danach' },
    ];
    assert.deepEqual(dealerHeadingsFor(headings).map((h) => h.id), ['neu', 'danach'], anchor);
  }
});

test('htmlToPlainText: Tags weg, Entities decodiert, Whitespace normalisiert', () => {
  const text = htmlToPlainText('<h2 id="a">Titel &amp; mehr</h2>\n<p>Zeile&nbsp;eins</p><script>evil()</script>');
  assert.equal(text, 'Titel & mehr Zeile eins');
});
