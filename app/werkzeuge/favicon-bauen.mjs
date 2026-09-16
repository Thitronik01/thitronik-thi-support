// ============================================================================
// Favicons erzeugen: ein Quadratlogo → alle benötigten Größen.
// ----------------------------------------------------------------------------
//     node werkzeuge/favicon-bauen.mjs <pfad/zum/app-logo.jpg>
//
// Erzeugt in public/:
//   favicon-16.png    Browser-Tab (klassisch)
//   favicon-32.png    Browser-Tab (Retina), Lesezeichen
//   favicon-48.png    Windows-Tasklaufleiste
//   apple-touch-icon.png (180)   iOS-Startbildschirm
//   icon-192.png / icon-512.png  Android / PWA-Manifest
//
// WARUM KEIN SVG-FAVICON: Das Markenlogo ist ein Bild, kein Pfad. Ein
// nachgezeichnetes SVG wäre eine Näherung — bei einem Logo ist das nicht
// akzeptabel.
//
// WARUM PNG STATT .ICO: Alle relevanten Browser lesen PNG-Favicons seit
// Jahren. Eine .ico-Datei wäre nur für sehr alte Internet-Explorer-Versionen
// nötig, die diese App ohnehin nicht bedienen kann.
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const ZIEL = path.join(HIER, '..', 'public');

const SHARP_PFADE = [
  'sharp',
  path.resolve(HIER, '../../../../Thitronik Online/node_modules/sharp'),
];

function ladeSharp() {
  const require = createRequire(import.meta.url);
  for (const p of SHARP_PFADE) {
    try { return require(p); } catch { /* nächster Kandidat */ }
  }
  console.error('sharp nicht gefunden. Installieren mit:  npm i -D sharp');
  process.exit(1);
}

const GROESSEN = [
  { datei: 'favicon-16.png', px: 16 },
  { datei: 'favicon-32.png', px: 32 },
  { datei: 'favicon-48.png', px: 48 },
  { datei: 'apple-touch-icon.png', px: 180 },
  { datei: 'icon-192.png', px: 192 },
  { datei: 'icon-512.png', px: 512 },
];

const quelle = process.argv[2];
if (!quelle || !fs.existsSync(quelle)) {
  console.error('Aufruf: node werkzeuge/favicon-bauen.mjs <pfad/zum/app-logo.jpg>');
  console.error('Erwartet ein QUADRATISCHES Logo (z. B. CI/App Logo.jpg).');
  process.exit(1);
}

const sharp = ladeSharp();

async function bauen() {
  const m = await sharp(quelle).metadata();
  console.log(`\n  Quelle  ${m.width}×${m.height}  ${m.format}`);

  if (Math.abs(m.width - m.height) > 2) {
    console.warn('  ⚠ Quelle ist nicht quadratisch — das Ergebnis wird verzerrt oder beschnitten.');
  }

  for (const g of GROESSEN) {
    await sharp(quelle)
      // `fit: cover` statt `contain`: Ein Favicon soll die Fläche füllen,
      // nicht mit Rändern in der Tableiste schweben.
      .resize(g.px, g.px, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(path.join(ZIEL, g.datei));

    const kb = (fs.statSync(path.join(ZIEL, g.datei)).size / 1024).toFixed(1);
    console.log(`  ${g.datei.padEnd(22)} ${String(g.px).padStart(3)}×${g.px}   ${kb} KB`);
  }
  console.log('');
}

bauen().catch((fehler) => {
  console.error('Fehlgeschlagen:', fehler.message);
  process.exit(1);
});
