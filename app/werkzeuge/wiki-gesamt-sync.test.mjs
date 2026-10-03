import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { extractPlainText } from '../../code/wiki-klartext.mjs';
import { klartext, ueberschriften, abschnitte } from './wiki-sync-basis.mjs';
import { markdownInhalt, oeffentlichesMarkdown, wikiRoute, gesamtStand } from './wiki-gesamt-sync.mjs';

test('Gemeinsamer Import erhält SMS, unformatierte Vergleiche und technische Unterstriche', () => {
  const md = '## **Befehle**\n*100#P+S49123 und #121#; Spannung >6 V, <5 V, SERIAL_NO.\n`*100#PDE+S49` / `> 6 V` / `<10 mW`';
  assert.equal(klartext, extractPlainText);
  const plain = klartext(md);
  for (const token of ['*100#P+S49123', '#121#', '>6 V', '<5 V', 'SERIAL_NO', '*100#PDE+S49', '> 6 V', '<10 mW']) assert.ok(plain.includes(token), token);
  assert.ok(!plain.includes('##') && !plain.includes('**'));
});
test('Regeln zwischen horizontalen Trennern und Negationen bleiben bestehen', () => {
  const md = '---\n> **WICHTIG:** Nicht anschließen!\n---\nNe pas brancher sans module.';
  assert.ok(klartext(md).includes('WICHTIG: Nicht anschließen!'));
  assert.ok(klartext(md).includes('Ne pas brancher sans module.'));
});
test('Mehrfache Backticks und Platzhalterzeichen bleiben wörtlich', () => {
  assert.equal(klartext('``a `b` #121#`` und `\uE0000\uE001`'), 'a `b` #121# und \uE0000\uE001');
});
test('CRLF und BOM: nur YAML entfernen, keine späteren Trenner', () => {
  const { body } = markdownInhalt('\uFEFF---\r\nlang: de\r\n---\r\n# Titel\r\n---\r\nNicht löschen.\r\n---');
  assert.ok(klartext(body).includes('Nicht löschen.'));
  assert.throws(() => markdownInhalt('# Keine Metadaten'));
});
test('Codeblöcke beider Formen erzeugen keine Überschriften oder Scheinanker', () => {
  const md = '# Titel\n```txt\n## Verstecktes Beispiel\n```\n~~~txt\n## Auch Beispiel\n~~~\n## Echt\nText.';
  assert.deepEqual(ueberschriften(md).map(h => h.text), ['Titel', 'Echt']);
  assert.ok(!klartext(md).includes('Beispiel'));
  assert.deepEqual(abschnitte(md, ueberschriften(md), '/de/test').map(s => s.anchor), ['echt']);
});
test('Interner H2 samt H3 wird entfernt; Öffentlichkeit beginnt erst am nächsten H2', () => {
  for (const heading of ['Service & Intern', 'Service et procédures internes']) {
    const md = '# Titel\nÖffentlicher Anfang.\n## ' + heading + '\nGEHEIM-A\n### Unterpunkt\nGEHEIM-B\n```txt\n## Kein echter Abschnitt\n```\n## Sichtbar\nFreigegeben.';
    const projected = oeffentlichesMarkdown(md);
    assert.ok(!projected.body.includes('GEHEIM') && projected.body.includes('Freigegeben.'));
    assert.ok(!projected.headings.some(h => h.text === 'Unterpunkt'));
  }
});
test('Gleiche Überschrift nach internem Block behält die ursprüngliche Ankernummer', () => {
  const md = '# Titel\n## Service & Intern\n### Ablauf\nIntern.\n## Öffentlich\n### Ablauf\nSichtbar.';
  assert.equal(oeffentlichesMarkdown(md).headings.at(-1).anchor, 'ablauf-1');
});
test('Fahrzeug-, Index- und Tech-Doku-Routen werden ohne Sprachvermischung abgebildet', () => {
  assert.equal(wikiRoute('fr/Tech. Doku/uebersicht.md'), '/fr/tech-doku/uebersicht');
  assert.equal(wikiRoute('de/_index.md'), '/de');
  assert.equal(wikiRoute('de/fahrzeuge/vw-t6.md'), '/de/fahrzeuge/vw-t6');
});
test('Langer technischer Abschnitt bleibt im Gesamtimport bis zum letzten Wert erhalten', () => {
  const md = '# Titel\n## Messwerte\n' + 'Wert 24 V. '.repeat(600) + '\n`*100#P+S491234567`';
  const all = abschnitte(md, ueberschriften(md), '/de/test', Infinity);
  assert.ok(all[0].body.length > 4000 && all[0].body.endsWith('*100#P+S491234567'));
});
test('Gesamtimport lässt unbekannte/interne Routen geschlossen und bleibt wiederholbar', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'thi-import-test-'));
  try {
    fs.mkdirSync(path.join(root, 'content/wiki/de/intern'), { recursive: true });
    fs.mkdirSync(path.join(root, 'app/data'), { recursive: true });
    fs.writeFileSync(path.join(root, 'content/wiki/de/intern/privat.md'), 'Nicht veröffentlichen');
    fs.writeFileSync(path.join(root, 'content/wiki/de/test.md'), '---\nlang: de\n---\n# Titel\n## Werte\n' + 'Spannung 24 V. '.repeat(400) + 'ENDE#121#');
    const a = { route: '/de/test', lang: 'de', visibility: 'standard', title: 'Titel', slug: 'test', articleType: 'reference', keywords: 'unverändert', headings: '', body: '', excerpt: '' };
    const save = (articles, sections) => { fs.writeFileSync(path.join(root, 'app/data/artikel.json'), JSON.stringify(articles)); fs.writeFileSync(path.join(root, 'app/data/sektionen.json'), JSON.stringify(sections)); };
    save([a], [{ ...a, anchor: 'werte', heading: 'Werte', level: 2, body: 'Alt' }]);
    const first = gesamtStand({ repo: root });
    assert.equal(first.report.excludedInternal.length, 1);
    assert.ok(first.articles[0].body.endsWith('ENDE#121#'));
    assert.equal(first.articles[0].keywords, 'unverändert');
    save(first.articles, first.sections);
    assert.equal(gesamtStand({ repo: root }).report.changedRoutes.length, 0);
    fs.writeFileSync(path.join(root, 'content/wiki/de/neu.md'), '---\nlang: de\n---\n# Neu');
    assert.throws(() => gesamtStand({ repo: root }), /explizite Aufnahme/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
