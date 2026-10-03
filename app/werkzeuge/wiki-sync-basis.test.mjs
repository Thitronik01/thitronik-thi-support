import assert from 'node:assert/strict';
import test from 'node:test';
import { klartext } from './wiki-sync-basis.mjs';

test('SMS-Steuerzeichen in Inline-Code bleiben beim RAG-Ingest exakt erhalten', () => {
  assert.equal(klartext('**Altgerät:** `*100#P+S491234567-491234568` und `#121#`; neuer: `+S491234567`.'),
    'Altgerät: *100#P+S491234567-491234568 und #121#; neuer: +S491234567.');
});
test('Befehlsparameter und Vergleichszeichen werden nicht als Markdown zerstört', () => {
  assert.equal(klartext('### Beispiel\n`a %min%` / `>6 V` / `<5 V` / `rapport d etat`'),
    'Beispiel\na %min% / >6 V / <5 V / rapport d etat');
});
test('Normaler Markdown wird weiterhin bereinigt, Codeblöcke bleiben ausgeschlossen', () => {
  assert.equal(klartext('## **Titel**\n[Quelle](quelle.pdf)\n[[pro-finder|Pro-Finder]]\n```txt\n*100#\n```\n`fence an`'),
    'Titel\nQuelle\nPro-Finder\nfence an');
});
