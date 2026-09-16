// ============================================================================
// Logo-Varianten erzeugen: eine Quelldatei → hell + dunkel.
// ----------------------------------------------------------------------------
//     node werkzeuge/logo-bauen.mjs <pfad/zum/original.png>
//
// Erwartet das Original mit TRANSPARENTEM Hintergrund (Navy-Schriftzug, rotes
// Segel). Erzeugt daraus:
//
//   public/assets/img/logo-hell.webp    Original, nur zugeschnitten
//   public/assets/img/logo-dunkel.webp  Negativfassung: Schrift weiß, Segel rot
//
// WARUM SO:
// 1. KEINE farbige Platte unter das Logo legen. Ein weißes Logo auf einer eigens
//    gelegten Navy-Fläche sieht nach Notlösung aus — weil es eine ist.
// 2. KEIN CSS-Filter für die Dunkelfassung. `filter: invert()` oder
//    `brightness(0) invert(1)` würde auch das rote Segel ausbleichen und damit
//    die Marke verfälschen. Deshalb wird pixelweise umgefärbt: alles außer den
//    rot-dominanten Pixeln wird weiß.
// 3. ZUSCHNEIDEN nicht vergessen. Die Originaldatei hatte 76 % Leerrand — bei
//    fester CSS-Höhe wirkt das Logo dadurch winzig, ohne dass man den Grund
//    sieht.
// 4. BEIDE FASSUNGEN FORMATGLEICH, sonst springt das Layout beim Umschalten.
//
// Braucht `sharp`. Im Hauptprojekt vorhanden:
//   node --experimental-... ist nicht nötig; ggf. Pfad unten anpassen.
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HIER = path.dirname(fileURLToPath(import.meta.url));
const ZIEL = path.join(HIER, '..', 'public', 'assets', 'img');
const HOEHE = 140; // Ausgabehöhe in Pixeln; die Breite folgt dem Seitenverhältnis

// sharp aus dem Hauptprojekt laden — die App selbst hat bewusst keine
// Abhängigkeiten (siehe README: kein Build-Schritt).
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

const quelle = process.argv[2];
if (!quelle || !fs.existsSync(quelle)) {
  console.error('Aufruf: node werkzeuge/logo-bauen.mjs <pfad/zum/original.png>');
  console.error('Das Original muss einen TRANSPARENTEN Hintergrund haben.');
  process.exit(1);
}

const sharp = ladeSharp();

const istRot = (r, g, b) => r > 110 && r > g * 1.6 && r > b * 1.6;

async function bauen() {
  const original = await sharp(quelle).metadata();

  // 1) Weißen Hintergrund in Transparenz umwandeln.
  // Die CI-Datei heißt „Logo White", trägt aber einen EINGEBRANNTEN weißen
  // Grund (Alpha durchgehend 255) — kein transparentes Logo. Im Dunkelmodus
  // stand es dadurch in einem weißen Kasten, in dem die weiße Schrift der
  // Negativfassung unsichtbar wurde. Genau so ist es live aufgefallen.
  // Innerhalb der Marke gibt es keine weißen Flächen (Schrift Navy, Segel rot),
  // deshalb ist das Freistellen hier gefahrlos. Kantenpixel werden weich
  // ausgeblendet, damit keine harten Treppen entstehen.
  const vor = await sharp(quelle).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const vp = vor.data;
  let frei = 0;
  for (let i = 0; i < vp.length; i += vor.info.channels) {
    const hell = Math.min(vp[i], vp[i + 1], vp[i + 2]);
    if (hell >= 250) { vp[i + 3] = 0; frei += 1; }
    else if (hell > 205) {
      // Übergangsbereich: je heller, desto durchsichtiger
      vp[i + 3] = Math.round(vp[i + 3] * (1 - (hell - 205) / 45));
    }
  }
  console.log(`\n  freigestellt  ${frei} weiße Pixel → transparent`);

  const freigestellt = await sharp(vp, {
    raw: { width: vor.info.width, height: vor.info.height, channels: vor.info.channels },
  }).png().toBuffer();

  // 2) Leerrand entfernen
  const zug = await sharp(freigestellt).trim({ threshold: 8 })
    .toBuffer({ resolveWithObject: true });
  const rand = Math.round((1 - (zug.info.width * zug.info.height) / (original.width * original.height)) * 100);
  console.log(`\n  Original      ${original.width}×${original.height}`);
  console.log(`  zugeschnitten ${zug.info.width}×${zug.info.height}   (${rand} % Leerrand entfernt)`);

  // 3) Hellfassung: unverändert
  await sharp(zug.data).ensureAlpha().resize({ height: HOEHE, fit: 'inside' })
    .webp({ quality: 94, alphaQuality: 100, effort: 6 })
    .toFile(path.join(ZIEL, 'logo-hell.webp'));

  // 4) Dunkelfassung: alles außer Rot wird weiß, Deckkraft bleibt erhalten
  const roh = await sharp(zug.data).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = roh.info;
  const px = roh.data;
  let weiss = 0;
  let rot = 0;

  for (let i = 0; i < px.length; i += channels) {
    if (px[i + 3] < 10) continue; // transparent
    if (istRot(px[i], px[i + 1], px[i + 2])) { rot += 1; continue; }
    px[i] = 255; px[i + 1] = 255; px[i + 2] = 255;
    weiss += 1;
  }

  await sharp(px, { raw: { width, height, channels } })
    .ensureAlpha().resize({ height: HOEHE, fit: 'inside' })
    .webp({ quality: 94, alphaQuality: 100, effort: 6 })
    .toFile(path.join(ZIEL, 'logo-dunkel.webp'));

  console.log(`  umgefärbt     ${weiss} Pixel → weiß, ${rot} rote Pixel erhalten\n`);

  for (const datei of ['logo-hell.webp', 'logo-dunkel.webp']) {
    const m = await sharp(path.join(ZIEL, datei)).metadata();
    const kb = (fs.statSync(path.join(ZIEL, datei)).size / 1024).toFixed(1);
    const alpha = m.hasAlpha ? 'transparent' : 'DECKEND — Fehler!';
    console.log(`  ${datei.padEnd(18)} ${m.width}×${m.height}  ${kb} KB  (${(m.width / m.height).toFixed(2)}:1)  ${alpha}`);
    if (!m.hasAlpha) process.exitCode = 1;
  }
  console.log('\n  Beide Fassungen sind formatgleich — beim Moduswechsel springt nichts.\n');
}

bauen().catch((fehler) => {
  console.error('Fehlgeschlagen:', fehler.message);
  process.exit(1);
});
