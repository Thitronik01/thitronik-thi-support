// Shared source parser and complete PDF register; no semantic/model evaluation.
import fs from 'node:fs';
import path from 'node:path';
import { inspectSources } from './quellenpflege.mjs';
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--report')) throw new Error('Aufruf: quellen-integritaet-pruefen.mjs [--report Datei]');
const result = inspectSources({ verifyOriginals: true });
const local = result.records.filter(r => r.target?.startsWith('content/quellen/'));
const report = {
  checkedAt: new Date().toISOString(), mode: 'local-integrity-not-semantic-review',
  ...result.summary, localFrontmatterRefs: local.length, distinctLocalPdfRefs: new Set(local.map(r => r.target)).size,
  hashes: result.hashes, unresolvedHistoricalReferences: result.unresolved, brokenMarkdownLinks: [],
  limitations: ['Namens-/Hashzuordnung belegt die vorhandene Originalkopie, nicht den Inhalt einer verlorenen historischen Version.', 'Original-only verweist auf den Anleitungen-Ordner; historische Sammelverweise werden nicht als Einzeldatei ausgegeben.', 'Web-URLs, fehlende Redaktionsdateien und fachliche Widersprüche benötigen separate Prüfung.', 'Kein neuer vollständiger PDF-Inhaltsdurchlauf und kein Live-Modelltest.'],
};
if (args[1]) {
  fs.mkdirSync(path.dirname(path.resolve(args[1])), { recursive: true });
  fs.writeFileSync(path.resolve(args[1]), JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify({ ...report, hashes: undefined, unresolvedHistoricalReferences: result.unresolved.length }, null, 2));
