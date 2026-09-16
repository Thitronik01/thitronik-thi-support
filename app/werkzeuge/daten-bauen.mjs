// ============================================================================
// Wissensbasis neu bauen: data/*.json  →  data/*.mjs
// ----------------------------------------------------------------------------
//     node werkzeuge/daten-bauen.mjs
//
// WARUM als JS-Modul und nicht als Datei, die zur Laufzeit gelesen wird?
// Ein `fs.readFileSync` in einer Netlify Function hängt an drei Annahmen:
// dass `included_files` greift, dass der Bundler die Pfade erhält und dass
// `process.cwd()` das ist, was man erwartet. Alle drei fallen je nach
// Deploy-Methode (Git-Build vs. Drag & Drop) unterschiedlich aus. Ein `import`
// ist für den Bundler dagegen eine harte Abhängigkeit — er nimmt die Daten
// immer mit. Das ist der Unterschied zwischen „läuft bei mir" und „läuft".
//
// Die .json-Dateien bleiben als lesbare Zwischenstufe erhalten; ausgeliefert
// werden die .mjs.
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath statt import.meta.dirname: letzteres gibt es erst ab Node 20.11
// und wäre auf einer älteren Laufzeit still `undefined` — der Fehler fiele dann
// erst im Deployment auf.
const HIER = path.dirname(fileURLToPath(import.meta.url));
const DATEN = path.join(HIER, '..', 'data');

// JSON ist gültiges JS-Literal — mit EINER Ausnahme: U+2028 (Line Separator)
// und U+2029 (Paragraph Separator) sind in JSON-Strings erlaubt, im
// JS-Quelltext aber Zeilenterminatoren. Unmaskiert erzeugen sie einen
// Syntaxfehler, der erst beim Deploy auffällt.
//
// Die Zeichen werden hier über ihren Codepoint erzeugt und NICHT literal
// notiert — sonst zerbräche diese Datei am selben Problem, das sie behebt.
// (Genau das ist beim ersten Schreiben passiert.)
const LINE_SEP = String.fromCharCode(0x2028);
const PARA_SEP = String.fromCharCode(0x2029);

function maskiereSeparatoren(text) {
  // split/join statt Regex: kommt ohne Regex-Literal mit Sonderzeichen aus.
  return text
    .split(LINE_SEP).join('\\u2028')
    .split(PARA_SEP).join('\\u2029');
}

function bauen(quelle, ziel) {
  const pfad = path.join(DATEN, quelle);
  if (!fs.existsSync(pfad)) {
    console.error(`  FEHLT  ${quelle} — bitte zuerst aus dem Wiki erzeugen.`);
    process.exitCode = 1;
    return null;
  }

  const roh = fs.readFileSync(pfad, 'utf8');
  const sicher = maskiereSeparatoren(roh);

  const kopf = `// AUTOMATISCH ERZEUGT aus ${quelle} — nicht von Hand bearbeiten.\n`
    + '// Als JS-Modul, damit der Bundler die Wissensbasis garantiert mitnimmt.\n'
    + '// Neu erzeugen: node werkzeuge/daten-bauen.mjs\n';

  fs.writeFileSync(path.join(DATEN, ziel), `${kopf}export default ${sicher};\n`, 'utf8');

  const daten = JSON.parse(roh);
  const mb = (fs.statSync(path.join(DATEN, ziel)).size / 1048576).toFixed(1);
  console.log(`  OK     ${ziel}  ${String(daten.length).padStart(5)} Einträge  ${mb} MB`);
  return daten;
}

console.log('\nWissensbasis bauen …\n');
const artikel = bauen('artikel.json', 'artikel.mjs');
const sektionen = bauen('sektionen.json', 'sektionen.mjs');

// Support-Korrekturen: eigener Bestand, eigenes Modulformat (mit Kopfzeile,
// die auf die schreibende Function verweist). Fehlt die Datei, wird sie leer
// angelegt — ein fehlendes Modul ließe chat.mjs beim Import scheitern.
{
  const { baueModulText, baueJsonText } = await import('../netlify/functions/lib/korrekturen.mjs');
  const quelle = path.join(DATEN, 'korrekturen.json');
  let liste = [];
  if (fs.existsSync(quelle)) {
    try { liste = JSON.parse(fs.readFileSync(quelle, 'utf8') || '[]'); } catch (e) {
      console.error(`  FEHLER korrekturen.json ist kein gültiges JSON: ${e.message}`);
      process.exitCode = 1;
    }
  } else {
    fs.writeFileSync(quelle, baueJsonText([]), 'utf8');
    console.log('  NEU    korrekturen.json (leer angelegt)');
  }
  if (!Array.isArray(liste)) { console.error('  FEHLER korrekturen.json muss ein Array sein.'); process.exitCode = 1; liste = []; }
  fs.writeFileSync(path.join(DATEN, 'korrekturen.mjs'), baueModulText(liste), 'utf8');
  console.log(`  OK     korrekturen.mjs  ${String(liste.length).padStart(5)} Einträge`);
}

if (artikel && sektionen) {
  const proSprache = {};
  for (const a of artikel) proSprache[a.lang] = (proSprache[a.lang] || 0) + 1;
  const schnitt = Math.round(
    artikel.reduce((s, a) => s + String(a.body || '').length, 0) / artikel.length,
  );

  console.log(`\n  Sprachen: ${Object.entries(proSprache).map(([k, v]) => `${k}=${v}`).join('  ')}`);
  console.log(`  Ø Textlänge je Artikel: ${schnitt} Zeichen`);
  console.log('\n  ⚠ Diesen Wert mit dem vorherigen Lauf vergleichen. Fällt er unerwartet,');
  console.log('    hat der Ingest still Text verloren — der teuerste Fehler des');
  console.log('    Vorgängersystems (docs/01_RAG_WISSENSTRANSFER.md §1.1).\n');
}
