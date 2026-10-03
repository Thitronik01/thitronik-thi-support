// Gezielter Sync; --check prüft nur, ohne Dateien zu ändern.
import { synchronisieren } from './wiki-sync-basis.mjs';
try {
  synchronisieren(["wipro-iii", "anlernvorgang", "fahrzeuge/ford-transit-2024plus", "fahrzeuge/mercedes-sprinter-vs30", "fahrzeuge/fiat-ducato-2022-2024", "fahrzeugkompatibilitaet", "seriennummern-softwarestaende"], "WiPro", "wipro-wiki-sync.mjs");
}
catch (err) { console.error(`WiPro-Wiki-Sync: ${err.message}`); process.exitCode = 2; }
