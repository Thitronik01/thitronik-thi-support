import test from 'node:test';
import assert from 'node:assert/strict';
import { artikelKontext } from './kontext.mjs';
import { extractSnippet } from './search-core.js';

const article = { route: '/de/beispiel', lang: 'de', visibility: 'standard', body: 'Allgemeine Hinweise. '.repeat(400) + ' Technische Daten hinten.' };
const section = { route: article.route, lang: 'de', visibility: 'standard', anchor: 'betrieb', heading: 'Betrieb', body: 'Erst die Tür schließen, dann einen weiteren Finger registrieren.' };

test('zitierten Beleg trotz langer Artikelfenster erhalten', () => {
  const text = artikelKontext(article, [section], 'Tür Finger', { limit: 1400, anchor: 'betrieb' });
  assert.ok(text.includes(section.body));
  assert.ok(text.length <= 1400);
});
test('technischen Quellenkonflikt im passenden Abschnitt zusammen halten', () => {
  const conflict = { ...section, anchor: 'daten', heading: 'Stromaufnahme 24 V', body: 'Bei 24 V: Anleitung 1,7 mA, Katalog 0,6 mA. Derselbe Artikel; Widerspruch ungeklärt.' };
  const text = artikelKontext(article, [conflict], 'Stromaufnahme 24 V', { limit: 1400 });
  assert.ok(text.includes(conflict.body));
});
test('zweiten relevanten Ablauf erhalten, wenn eine Frage beide berührt', () => {
  const reset = { ...section, anchor: 'reset', heading: 'Finger zurücksetzen', body: 'Ohne registrierten Master-Finger ist kein alternativer Reset dokumentiert.' };
  const text = artikelKontext(article, [section, reset], 'Finger registrieren zurücksetzen', { anchor: 'betrieb' });
  assert.ok(text.includes(section.body));
  assert.ok(text.includes(reset.body));
});
test('interne Abschnitte weder auswählen noch über übergebenen Anker einfügen', () => {
  const secret = { ...section, anchor: 'intern', visibility: 'internal', heading: 'Geheim', body: 'INTERNER_TESTWERT' };
  for (const anchor of [undefined, 'intern']) {
    assert.ok(!artikelKontext(article, [secret], 'Geheim', { anchor }).includes(secret.body));
  }
  assert.ok(artikelKontext(article, [secret], 'Geheim', { anchor: 'intern', canViewInternal: true }).includes(secret.body));
});
test('interne Artikel benötigen internen Zugang', () => {
  assert.equal(artikelKontext({ ...article, visibility: 'internal' }, [section], 'Tür'), '');
});
test('keine fremden Routen oder Sprachen über gleichen Anker einschleusen', () => {
  for (const changed of [{ route: '/de/fremd' }, { lang: 'fr' }]) {
    const other = { ...section, ...changed, body: 'FREMDER_TESTWERT' };
    assert.ok(!artikelKontext(article, [other], 'Tür', { anchor: 'betrieb' }).includes(other.body));
  }
});
test('kurze vollständige Belege nicht duplizieren', () => {
  const short = { ...article, body: section.body };
  assert.equal(artikelKontext(short, [section], 'Tür'), section.body);
});
test('auch bei überlangem Abschnitt feste Kontextgrenzen einhalten', () => {
  const long = { ...section, body: 'Finger Tür '.repeat(1000) };
  for (const limit of [0, 20, 1400, 6000]) {
    const text = artikelKontext(article, [long], 'Finger', { limit });
    assert.ok(text.length <= limit);
  }
});
test('bei zu langem Abschnitt den bestehenden Kontextauszug bewahren', () => {
  const long = { ...section, body: 'Betrieb '.repeat(1000) };
  assert.equal(artikelKontext(article, [long], 'Technische Daten', { limit: 1400, anchor: 'betrieb' }), extractSnippet(article.body, 'Technische Daten', 1400).slice(0, 1400));
});
