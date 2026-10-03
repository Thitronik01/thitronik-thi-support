// Gezielter Sync; --check prüft nur, ohne Dateien zu ändern.
import { synchronisieren } from './wiki-sync-basis.mjs';
try {
  synchronisieren(["camplock-fingerprint", "vanlock-fingerprint", "zugang-bedienung", "artikelnummern", "systemueberblick"], "Fingerprint", "fingerprint-wiki-sync.mjs");
}
catch (err) { console.error(`Fingerprint-Wiki-Sync: ${err.message}`); process.exitCode = 2; }
