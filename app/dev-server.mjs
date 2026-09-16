// ============================================================================
// Lokaler Entwicklungsserver — bildet das Netlify-Verhalten nach.
// ----------------------------------------------------------------------------
// Bedient public/ statisch und leitet /api/* an die Functions weiter, genau wie
// die Redirects in netlify.toml. Ohne Abhängigkeiten, damit ein `npm install`
// zum Ausprobieren nicht nötig ist.
//
//     node dev-server.mjs            → http://localhost:8888
//     PORT=3000 node dev-server.mjs
//
// Umgebungsvariablen werden aus .env gelesen, falls vorhanden.
// ============================================================================

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WURZEL = path.dirname(fileURLToPath(import.meta.url));
const OEFFENTLICH = path.join(WURZEL, 'public');
const PORT = Number(process.env.PORT || 8888);

// .env einlesen (schlicht, ohne Abhängigkeit)
try {
  const roh = fs.readFileSync(path.join(WURZEL, '.env'), 'utf8');
  for (const zeile of roh.split('\n')) {
    const t = zeile.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 1) continue;
    const schluessel = t.slice(0, i).trim();
    let wert = t.slice(i + 1).trim();
    if ((wert.startsWith('"') && wert.endsWith('"')) || (wert.startsWith("'") && wert.endsWith("'"))) {
      wert = wert.slice(1, -1);
    }
    if (!process.env[schluessel]) process.env[schluessel] = wert;
  }
  console.log('  .env geladen');
} catch { console.log('  keine .env gefunden (ok — ohne API-Schlüssel läuft nur die Oberfläche)'); }

const TYPEN = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
};

async function functionAufrufen(name, anfrage, koerper) {
  const modul = await import(`./netlify/functions/${name}.mjs?t=${Date.now()}`);
  const url = `http://localhost:${PORT}${anfrage.url}`;
  const req = new Request(url, {
    method: anfrage.method,
    headers: anfrage.headers,
    body: ['GET', 'HEAD'].includes(anfrage.method) ? undefined : koerper,
  });
  return modul.default(req);
}

const server = http.createServer(async (anfrage, antwort) => {
  const url = new URL(anfrage.url, `http://localhost:${PORT}`);
  let pfad = decodeURIComponent(url.pathname);

  // ─── API ───
  if (pfad.startsWith('/api/')) {
    const name = pfad.slice(5).split('/')[0];
    if (!['chat', 'health'].includes(name)) {
      antwort.writeHead(404).end('Unbekannte Function');
      return;
    }
    try {
      const teile = [];
      for await (const stueck of anfrage) teile.push(stueck);
      const koerper = teile.length ? Buffer.concat(teile) : undefined;

      const res = await functionAufrufen(name, anfrage, koerper);
      const kopf = {};
      res.headers.forEach((v, k) => { kopf[k] = v; });
      antwort.writeHead(res.status, kopf);

      if (res.body) {
        const leser = res.body.getReader();
        for (;;) {
          const { done, value } = await leser.read();
          if (done) break;
          antwort.write(Buffer.from(value));
        }
      }
      antwort.end();
    } catch (fehler) {
      console.error(`  [${name}]`, fehler);
      antwort.writeHead(500, { 'content-type': 'application/json' })
        .end(JSON.stringify({ fehler: 'function', meldung: String(fehler.message || fehler) }));
    }
    return;
  }

  // ─── Statisch ───
  if (pfad === '/') pfad = '/index.html';
  const datei = path.join(OEFFENTLICH, path.normalize(pfad).replace(/^(\.\.[/\\])+/, ''));
  if (!datei.startsWith(OEFFENTLICH)) { antwort.writeHead(403).end('Verboten'); return; }

  fs.readFile(datei, (fehler, inhalt) => {
    if (fehler) {
      // SPA-Fallback wie in netlify.toml
      fs.readFile(path.join(OEFFENTLICH, 'index.html'), (f2, html) => {
        if (f2) { antwort.writeHead(404).end('Nicht gefunden'); return; }
        antwort.writeHead(200, { 'content-type': TYPEN['.html'] }).end(html);
      });
      return;
    }
    antwort.writeHead(200, {
      'content-type': TYPEN[path.extname(datei)] || 'application/octet-stream',
      'cache-control': 'no-store',
    }).end(inhalt);
  });
});

server.listen(PORT, () => {
  console.log(`\n  THITRONIK Thi Support — Entwicklungsserver`);
  console.log(`  → http://localhost:${PORT}`);
  console.log(`  → http://localhost:${PORT}/api/health?live=1  (Konfiguration prüfen)\n`);
});
