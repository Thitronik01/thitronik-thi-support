import test from 'node:test';
import assert from 'node:assert/strict';
import * as runtime from './search-core.js';
import * as referenz from '../../../../code/search-core.js';

const abschnitte = [
  { lang: 'fr', route: '/fr/test', anchor: 'commande', heading: "Armement avec la clé d'origine", body: "Clignotants à l'armement : un ou deux selon le véhicule.", visibility: 'standard' },
  { lang: 'fr', route: '/fr/test', anchor: 'installation', heading: 'Installation', body: 'Pour les véhicules, avec les vis dans les trous. Combien de fois faut-il vérifier les fils ?', visibility: 'standard' },
];
for (const [nom, moteur] of [['runtime', runtime], ['référence', referenz]]) {
  test(`${nom}: leere Überschriften liefern keine Belegquelle`, () => {
    const data = [
      { lang: 'de', route: '/de/test', anchor: 'leer', heading: 'Batterie Signalton LED Warnung', body: '  \n ', visibility: 'standard' },
      { lang: 'de', route: '/de/test', anchor: 'beleg', heading: 'Diagnose', body: 'Beim Signalton die Batterie und LED prüfen.', visibility: 'standard' },
    ];
    const q = 'Batterie Signalton LED Warnung';
    assert.equal(moteur.searchSections(data, q, { canViewInternal: false }, 'de', 1)[0]?.anchor, 'beleg');
    assert.equal(moteur.bestSectionForRoute(data, '/de/test', q)?.anchor, 'beleg');
    assert.deepEqual(moteur.searchSections(data.slice(0, 1), q, { canViewInternal: false }, 'de'), []);
    assert.equal(moteur.bestSectionForRoute(data.slice(0, 1), '/de/test', q), null);
  });
  test(`${nom}: la typographie des apostrophes ne change pas le passage trouvé`, () => {
    for (const apostrophe of ["'", '’', 'ʼ']) {
      const q = `Combien de fois clignotent les feux à l${apostrophe}armement avec la clé d${apostrophe}origine ?`;
      assert.equal(moteur.bestSectionForRoute(abschnitte, '/fr/test', q, 'fr')?.anchor, 'commande');
      assert.equal(moteur.searchSections(abschnitte, q, { canViewInternal: false }, 'fr', 1)[0]?.anchor, 'commande');
    }
  });
  test(`${nom}: versions, numéros d'article et terme allemand Quelle restent cherchables`, () => {
    const terms = moteur.salientTerms('Welche Quelle belegt 1.2.0sx und 106111-002?');
    for (const term of ['quelle', '1.2.0sx', '106111-002']) assert.ok(terms.includes(term));
  });
}
test('les deux moteurs extraient les mêmes termes français et allemands', () => {
  for (const q of ["Avec la clé d'origine, quels signaux à l’armement ?", 'Welche Quelle erklärt Türkontakt 1.2.0sx?']) {
    assert.deepEqual(runtime.salientTerms(q), referenz.salientTerms(q));
  }
});
