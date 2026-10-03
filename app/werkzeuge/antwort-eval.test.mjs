// Exercises the real CLI against a local HTTP stub: no provider/model call.
import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

for (const bearer of [true, false]) test(`Antwort-Eval überträgt ${bearer ? 'App-Bearer' : 'altes Zugangswort'} ohne Provider-Schlüssel oder Bericht-Leak`, async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'thi-eval-test-'));
  const appToken = 'fixture-app-token', providerKey = 'fixture-provider-key', password = 'fixture-password';
  const requests = [];
  const server = http.createServer((req, res) => {
    requests.push(req.headers);
    req.resume();
    res.writeHead(200, { 'content-type': 'application/x-ndjson' });
    res.end(JSON.stringify({ typ: 'text', text: 'Lokaler Testbeleg.' }) + '\n');
  });
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const gold = path.join(dir, 'gold.json'), report = path.join(dir, 'result.json');
    fs.writeFileSync(gold, JSON.stringify({ cases: [{ id: 'fixture', question: 'Testfrage', expected: ['/de/pro-finder'], antwort_muss: ['Testbeleg'], antwort_darf_nicht: [], beleg: 'Lokaler Testbeleg.', source: 'lokaler HTTP-Testserver' }] }));
    const child = spawn(process.execPath, [fileURLToPath(new URL('./antwort-eval.mjs', import.meta.url)), '--gold', gold, '--limit', '1', '--ergebnis', report], { env: { ...process.env, THI_EVAL_URL: `http://127.0.0.1:${server.address().port}/api/chat`, THI_EVAL_BEARER_TOKEN: bearer ? appToken : '', THI_ZUGANGSWORT: password, ANYMIZE_API_KEY: providerKey, ANYMIZE_API_URL: 'http://127.0.0.1:1/no-provider-call' }, windowsHide: true });
    let output = '';
    child.stdout.on('data', chunk => { output += chunk; }); child.stderr.on('data', chunk => { output += chunk; });
    const code = await new Promise((resolve, reject) => { child.once('error', reject); child.once('exit', resolve); });
    assert.equal(code, 0, output);
    assert.equal(requests.length, 1);
    assert.equal(requests[0].authorization, bearer ? `Bearer ${appToken}` : undefined);
    assert.equal(requests[0]['x-zugangswort'], bearer ? undefined : password);
    assert.ok(!JSON.stringify(requests).includes(providerKey));
    const saved = fs.readFileSync(report, 'utf8');
    for (const secret of [appToken, providerKey, password]) { assert.ok(!saved.includes(secret)); assert.ok(!output.includes(secret)); }
  } finally {
    await new Promise(resolve => server.close(resolve));
    assert.ok(path.resolve(dir).startsWith(path.resolve(os.tmpdir()) + path.sep));
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
