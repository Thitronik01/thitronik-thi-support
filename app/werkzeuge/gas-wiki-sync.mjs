// Begrenzter Sync der fachlich abgeglichenen Gas-/CO-Artikel und Diagnoseverweise.
import { synchronisieren } from './wiki-sync-basis.mjs';
try {
  synchronisieren(['gas', 'gas-connect', 'gas-plug', 'gas-pro', 'gas-pro-iii', 'co-sensor', 'zusatzsensor-gas-pro-iii', 'stoerungsbeseitigung'], 'G.A.S. / CO / Sensorik', 'gas-wiki-sync.mjs');
} catch (err) {
  console.error(`Gas-Wiki-Sync: ${err.message}`);
  process.exitCode = 2;
}
