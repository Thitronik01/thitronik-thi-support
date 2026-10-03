// Prüft die Fallaufnahme gegen den ausgelieferten Browser-Katalog.
// Aufruf aus app/: node werkzeuge/erkennung-fingerprint-test.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const hier = path.dirname(fileURLToPath(import.meta.url));
const app = path.resolve(hier, '..');
const repo = path.resolve(app, '..');
const katalog = JSON.parse(fs.readFileSync(path.join(repo, 'daten/produkt-katalog.json'), 'utf8'));
const browser = { window: {} };
for (const datei of ['kataloge.js', 'erkennung.js']) {
  vm.runInNewContext(
    fs.readFileSync(path.join(app, 'public/assets/js', datei), 'utf8'),
    browser,
    { filename: datei },
  );
}

const ausgeliefert = Array.from(browser.window.THI_KATALOGE.produkte, (p) => ({
  gruppe: p.gruppe, artikel: p.name, artikelnummer: p.nr,
}));
assert.equal(ausgeliefert.length, katalog.anzahl_produkte);
assert.deepEqual(ausgeliefert, katalog.produkte);

const faelle = [
  ['Camp Lock Fingerprint', ['CampLock Fingerprint']],
  ['Van Lock', ['VanLock Fingerprint']],
  ['CampLock Fingerprint 106111-002', ['CampLock Fingerprint 106111-002']],
  ['106111', ['CampLock Fingerprint 106111']],
  ['106111-002/106144-002', ['CampLock Fingerprint 106111-002', 'CampLock Fingerprint 106144-002']],
  ['VanLock 106260', ['VanLock Fingerprint 106260']],
];
for (const [eingabe, erwartet] of faelle) {
  const erkannt = Array.from(browser.window.THI_ERKENNUNG.auswerten(eingabe).produkte);
  assert.deepEqual(erkannt, erwartet, `Produkterkennung für ${eingabe}`);
  console.log(`OK ${eingabe} → ${erkannt.join(', ')}`);
}
console.log(`${faelle.length} Fingerprint-Fälle und Browser-Katalog geprüft.`);
