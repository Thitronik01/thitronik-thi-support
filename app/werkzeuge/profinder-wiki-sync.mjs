// Nur diese zehn DE-/FR-Routen synchronisieren; Metadaten bleiben erhalten.
import { synchronisieren } from './wiki-sync-basis.mjs';
try {
  synchronisieren(['pro-finder', 'app-befehle', 'mobilfunk-sim', 'stromversorgung-standzeiten', 'stoerungsbeseitigung'], 'Pro-Finder', 'profinder-wiki-sync.mjs');
} catch (err) {
  console.error(`Pro-Finder-Wiki-Sync: ${err.message}`);
  process.exitCode = 2;
}
