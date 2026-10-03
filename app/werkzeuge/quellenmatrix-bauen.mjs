// Rebuild internal inventories only; no article content or release decisions.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { inspectSources, replaceSources } from './quellenpflege.mjs';
import { markdownInhalt } from './wiki-gesamt-sync.mjs';
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
let audit = inspectSources();
for (const lang of ['de', 'fr']) {
  const relative = `content/wiki/${lang}/quellen-matrix.md`;
  const file = path.join(repo, relative);
  const sources = audit.files.filter(f => f.file.startsWith(`content/wiki/${lang}/`) && f.file !== relative).map(f => f.file);
  const raw = replaceSources(fs.readFileSync(file, 'utf8'), sources).replace(/^updated:.*$/m, "updated: '2026-10-02'");
  fs.writeFileSync(file, raw);
}
audit = inspectSources();
for (const lang of ['de', 'fr']) {
  const file = path.join(repo, `content/wiki/${lang}/quellen-matrix.md`);
  const fr = lang === 'fr', files = audit.files.filter(f => f.file.startsWith(`content/wiki/${lang}/`));
  const refs = audit.records.filter(r => r.file.startsWith(`content/wiki/${lang}/`));
  const resolved = refs.filter(r => r.status === 'resolved').length;
  const urls = refs.filter(r => r.status === 'external-url').length;
  const rows = files.map(f => {
    const rel = f.file.slice(`content/wiki/${lang}/`.length);
    const fm = markdownInhalt(f.raw).frontmatter;
    const status = fm.match(/^dealerStatus:\s*(.+)$/m)?.[1] || '—';
    return `| [${rel}](${encodeURI(rel)}) | ${f.sourceCount} | ${f.statuses.resolved || 0} | ${f.statuses['external-url'] || 0} | ${f.sourceCount - (f.statuses.resolved || 0) - (f.statuses['external-url'] || 0)} | ${status} |`;
  });
  const body = fr ? `# Matrice des sources — inventaire local et maintenance

État : **02.10.2026**. Cette matrice compte les références réellement présentes. La disponibilité d'un fichier ne constitue ni une validation technique ni une autorisation de publication.

## Inventaire de cette langue

${files.length} pages ; ${refs.length} références : **${resolved} résolues localement**, ${urls} URL externes non vérifiées et ${refs.length - resolved - urls} références à clarifier. Une référence historique peut apparaître dans plusieurs pages.

| Page | Références | Locales | URL | À clarifier | dealerStatus existant |
|---|---:|---:|---:|---:|---|
${rows.join('\n')}

## Lacunes et suivi

L'ancien tableau « 77/77 terminé » décrivait un état éditorial historique ; il ne prouvait pas la présence des sources. Voir le [rapport de maintenance](../../../docs/quellenpruefung/2026-10-02-quellenpflege.md) et le [registre des PDF](../../../docs/11_QUELLENREGISTER.md). Les 11 statuts FR <code>internal_only</code> restent à clarifier ; aucune nouvelle approbation n'a été donnée.

Les fichiers Markdown dérivés absents ne sont pas remplacés par des PDF de nom similaire. Les références Wiki sans langue ont été rattachées au DE canonique selon l'importeur d'origine. Les renvois explicites FR restent FR.

## Règles de maintenance

Les documents primaires sont conservés sans modification. Le produit, la révision, la série, le logiciel et le véhicule doivent être considérés ensemble. Les contradictions restent explicites. Les champs <code>confidence</code> et <code>dealerStatus</code> ne sont pas recalculés à partir du nombre de sources. La profondeur de lecture figure dans les rapports des lots.

Vérification reproductible : <code>npm run sources:check</code>. Après une modification des références : <code>npm run sources:matrix</code>. Les matrices restent internes et sont exclues du RAG standard.
` : `# Quellenmatrix — lokaler Bestand und Pflege

Stand: **02.10.2026**. Die Matrix zählt tatsächlich vorhandene Quellenverweise. Dateiverfügbarkeit ist weder fachliche Bestätigung noch Veröffentlichungsfreigabe.

## Bestand dieser Sprachfassung

${files.length} Seiten; ${refs.length} Verweise: **${resolved} lokal auflösbar**, ${urls} externe, nicht live geprüfte URLs und ${refs.length - resolved - urls} zu klärende Verweise. Ein historischer Quellpfad kann in mehreren Seiten vorkommen.

| Seite | Verweise | Lokal | URL | Zu klären | Bisheriger dealerStatus |
|---|---:|---:|---:|---:|---|
${rows.join('\n')}

## Lücken und Nachverfolgung

Die alte Angabe „77/77 abgeschlossen“ war ein historischer Redaktionsstand und kein Nachweis vorhandener Quellen. Aktuell gelten der [Pflegebericht](../../../docs/quellenpruefung/2026-10-02-quellenpflege.md) und das [PDF-Quellenregister](../../../docs/11_QUELLENREGISTER.md). Die 11 FR-Statusabweichungen <code>internal_only</code> bleiben zur Klärung vorgemerkt; es wurde keine neue Freigabe gesetzt.

Fehlende abgeleitete Markdown-Auszüge werden nicht durch ähnlich benannte PDFs ersetzt. Sprachlose Wiki-Quellen wurden entsprechend dem ursprünglichen Importer dem kanonischen DE zugeordnet; ausdrücklich französische Verweise bleiben FR.

## Pflege- und Konfliktregeln

Primärdateien bleiben unverändert. Produkt, Revision, Seriennummer, Software und Fahrzeug müssen zusammen bewertet werden. Widersprüche bleiben ausdrücklich markiert. <code>confidence</code> und <code>dealerStatus</code> werden nicht aus Quellenzahlen abgeleitet. Die tatsächliche Prüftiefe steht in den jeweiligen Paketberichten.

Reproduzierbare Prüfung: <code>npm run sources:check</code>. Nach Quellenänderungen: <code>npm run sources:matrix</code>. Beide Matrizen bleiben intern und sind vom Standard-RAG ausgeschlossen.
`;
  const raw = fs.readFileSync(file, 'utf8'), { frontmatter } = markdownInhalt(raw);
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  fs.writeFileSync(file, (`---\n${frontmatter}\n---\n\n${body}`).replaceAll('\n', eol));
}
const rows = audit.catalog.sources.map(s => {
  const label = path.posix.basename(s.path);
  const evidence = [...new Set(s.reviewEvidence.map(e => e.report))].map(p => `[Prüfbericht](${p.replace(/^docs\//, '')})`).join(', ');
  return `| [${label}](../${s.path}) | ${s.pages} | ${s.sha256.slice(0, 12)} | ${s.originalPathsRelativeToAnleitungen.length} | ${evidence} |`;
});
fs.writeFileSync(path.join(repo, 'docs/11_QUELLENREGISTER.md'), `# PDF-Quellenregister

Stand: **02.10.2026**. Alle **${audit.catalog.sources.length} vorhandenen Repository-PDFs** sind mit den Originalen über SHA-256 abgeglichen. Die **114 Originaldateien enthalten 97 unterschiedliche PDF-Inhalte**. 16 Inhalte haben keine Repository-Kopie; sie sind dadurch nicht automatisch fachlich ungeprüft oder erforderlich.

Vollständige Prüfsummen und Originalpfade: [Maschinenlesbares Register](quellenpruefung/quellenregister.json). Verweisbereinigung, verbleibende Lücken und Grenzen: [Pflegebericht](quellenpruefung/2026-10-02-quellenpflege.md).

Die Seitenzahl ist die **physische Gesamtlänge**, nicht der Umfang fachlich gelesener Seiten. Der Prüfbericht benennt die tatsächliche Prüftiefe und offene Konflikte. Ein Hash bestätigt Dateigleichheit, keine fachliche Freigabe. Die zwei WiPro-Bedienungsrevisionen sind nun auch in der automatischen Integritätsprüfung enthalten.

| PDF | Seiten | SHA-256 (Kurzform) | Originalpfade | Prüftiefe / Herkunft |
|---|---:|---|---:|---|
${rows.join('\n')}

## Pflege

<code>npm run sources:check</code> prüft die Repository-Kopien, Quellenverweise und PDF-Seitenanker. <code>npm run sources:originals</code> vergleicht zusätzlich alle 114 PDFs im benachbarten Ordner <code>Anleitungen</code>. Neue oder entfernte Kopien benötigen einen bewussten Registereintrag samt Herkunft; der Prüfer bricht bei Abweichungen ab. Nach Änderungen <code>npm run sources:matrix</code> ausführen.
`);
console.log('Zwei interne Quellenmatrizen und PDF-Register aktualisiert.');
