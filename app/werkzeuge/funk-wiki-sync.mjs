// Begrenzter Sync der dokumentengestützt geprüften Funk-Zubehörartikel.
import { synchronisieren } from './wiki-sync-basis.mjs';
try {
  synchronisieren(['funk-handsender', 'funk-kabelschleife', 'funk-magnetkontakt', 'funk-wassermelder', 'funk-rauchmelder', 'nfc-modul', 'bt-connect', 'vernetzungsmodul'], 'Funk-Zubehör', 'funk-wiki-sync.mjs');
} catch (err) {
  console.error(`Funk-Wiki-Sync: ${err.message}`);
  process.exitCode = 2;
}
