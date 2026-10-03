import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { sourcesBlock, replaceSources, resolveSource } from './quellenpflege.mjs';
import { markdownInhalt } from './wiki-gesamt-sync.mjs';

test('mehrzeilige und zitierte Quellen behalten vollständige Pfade und Sonderzeichen', () => {
  const fm = `title: Test\nsources:\n  - >-\n    sources/SMS-Konfiguration für Pro-Finder - SMS-Konfiguration für\n    Pro-Finder.csv\n  - 'sources/L''exemple #1.pdf'\n  - "sources/Ä.pdf"\nlang: de`;
  assert.deepEqual(sourcesBlock(fm).sources, ['sources/SMS-Konfiguration für Pro-Finder - SMS-Konfiguration für Pro-Finder.csv', "sources/L'exemple #1.pdf", 'sources/Ä.pdf']);
});
test('sources-Änderung erhält BOM, CRLF, andere Metadaten und Körper bytegenau', () => {
  const raw = '\uFEFF---\r\ntitle: Test\r\nsources:\r\n  - old.pdf\r\nupdated: 2026-09-28\r\n---\r\n# Test\r\n*100#P+S49…\r\n';
  const changed = replaceSources(raw, ['content/quellen/neu.pdf']);
  assert.equal(changed, raw.replace('  - old.pdf', '  - "content/quellen/neu.pdf"'));
  assert.equal(markdownInhalt(changed).body, markdownInhalt(raw).body);
  assert.equal(replaceSources(changed, ['content/quellen/neu.pdf']), changed);
});
test('sources am Ende des Frontmatter verliert keinen Trenner', () => {
  const raw = '---\nlang: de\nsources:\n  - a\n---\nBody';
  assert.equal(replaceSources(raw, ['b']), '---\nlang: de\nsources:\n  - "b"\n---\nBody');
});
test('unbekannte YAML-Strukturen werden abgelehnt statt abgeschnitten', () => {
  for (const fm of ['sources: [a, b]', 'sources:\n  - path: test', 'sources:\n  - &alias test', 'sources:\n  - |-\n    a\n    b']) assert.throws(() => sourcesBlock(fm));
});
test('leere Quellenlisten und sources im Fließtext erzeugen keine Quellen', () => {
  assert.deepEqual(sourcesBlock('sources: []\nlang: de').sources, []);
  assert.deepEqual(sourcesBlock('title: sources: test').sources, []);
});
function fixture(t) {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'thi-quellen-'));
  t.after(() => fs.rmSync(repo, { recursive: true, force: true }));
  for (const rel of ['content/wiki/de/product.md', 'content/wiki/fr/product.md', 'content/quellen/manual.pdf']) {
    fs.mkdirSync(path.dirname(path.join(repo, rel)), { recursive: true }); fs.writeFileSync(path.join(repo, rel), 'fixture');
  }
  return { repo, catalog: { sources: [{ path: 'content/quellen/manual.pdf', sha256: 'same' }], originalPdfFiles: [{ path: 'de/Old name.pdf', sha256: 'same' }, { path: 'archive/Old name.pdf', sha256: 'same' }] } };
}
test('sprachloses wiki bleibt kanonisch DE; explizite FR-Referenz bleibt FR', t => {
  const opts = fixture(t), file = path.join(opts.repo, 'content/wiki/fr/product.md');
  assert.equal(resolveSource('wiki/product.md', file, opts).target, 'content/wiki/de/product.md');
  assert.equal(resolveSource('wiki/fr/product.md', file, opts).target, 'content/wiki/fr/product.md');
  assert.equal(resolveSource('D:/Texte/de/product.md', file, opts).target, 'content/wiki/de/product.md');
});
test('Originalname wird nur bei eindeutigem Hash zur geprüften Kopie zugeordnet', t => {
  const opts = fixture(t), file = path.join(opts.repo, 'content/wiki/de/product.md');
  assert.equal(resolveSource('sources/Old name.pdf', file, opts).target, 'content/quellen/manual.pdf');
  opts.catalog.originalPdfFiles.push({ path: 'different/Old name.pdf', sha256: 'different' });
  assert.equal(resolveSource('sources/Old name.pdf', file, opts).status, 'ambiguous-original');
});
test('ähnliche Namen und fehlende RAG-Auszüge erhalten keine erfundene Zuordnung', t => {
  const opts = fixture(t), file = path.join(opts.repo, 'content/wiki/de/product.md');
  assert.equal(resolveSource('sources/Old-name.pdf', file, opts).status, 'unresolved');
  assert.equal(resolveSource('sources/Old name__Overview_DE.md', file, opts).status, 'unresolved');
  assert.equal(resolveSource('sources/product.md', file, opts).status, 'unresolved');
});
test('Original ohne Repository-Kopie bleibt gesonderter Befund', t => {
  const opts = fixture(t), file = path.join(opts.repo, 'content/wiki/de/product.md');
  opts.catalog.sources = [];
  assert.equal(resolveSource('sources/Old name.pdf', file, opts).status, 'original-only');
});
test('relative Pfade werden geprüft, fehlende kanonische Dateien nicht verborgen', t => {
  const opts = fixture(t), file = path.join(opts.repo, 'content/wiki/de/product.md');
  assert.equal(resolveSource('../../quellen/manual.pdf', file, opts).target, 'content/quellen/manual.pdf');
  assert.equal(resolveSource('quellen/manual.pdf', file, opts).target, 'content/quellen/manual.pdf');
  assert.equal(resolveSource('content/quellen/gone.pdf', file, opts).status, 'broken-canonical');
  assert.equal(resolveSource('../../../../outside.pdf', file, opts).status, 'unresolved');
  assert.equal(resolveSource('fahrzeuge/*.md', file, opts).status, 'historical-collection');
});
