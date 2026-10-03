import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const script = fileURLToPath(new URL('./daten-bauen.mjs', import.meta.url));
async function fixture(run) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'thi-build-test-'));
  try {
    for (const name of ['artikel', 'sektionen', 'korrekturen']) {
      fs.writeFileSync(path.join(dir, name + '.json'), '[]');
      fs.writeFileSync(path.join(dir, name + '.mjs'), 'LAST_GOOD_BUILD');
    }
    await run(dir, () => spawnSync(process.execPath, [script, '--data-dir', dir], { encoding: 'utf8' }));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}
for (const [name, invalid] of [['artikel', '{invalid'], ['sektionen', '{}'], ['korrekturen', '{invalid']]) test(`Ungültige ${name}.json lässt alle letzten Module unverändert`, () => fixture((dir, build) => {
  fs.writeFileSync(path.join(dir, name + '.json'), invalid);
  assert.notEqual(build().status, 0);
  for (const kind of ['artikel', 'sektionen', 'korrekturen']) assert.equal(fs.readFileSync(path.join(dir, kind + '.mjs'), 'utf8'), 'LAST_GOOD_BUILD');
  assert.equal(fs.readFileSync(path.join(dir, name + '.json'), 'utf8'), invalid);
}));
test('JSON → MJS erhält technische Zeichen und Unicode-Separatoren exakt', () => fixture(async (dir, build) => {
  const data = [{ body: '*100#P+S49\u2028>6 V\u2029−20 °C', lang: 'de' }];
  fs.writeFileSync(path.join(dir, 'artikel.json'), JSON.stringify(data));
  assert.equal(build().status, 0);
  const module = await import(pathToFileURL(path.join(dir, 'artikel.mjs')).href);
  assert.deepEqual(module.default, data);
  assert.ok(fs.readFileSync(path.join(dir, 'artikel.mjs'), 'utf8').includes('\\u2028'));
}));
