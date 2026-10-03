// Source maintenance only: never infer technical approval from file availability.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { markdownInhalt } from './wiki-gesamt-sync.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const slash = p => p.replaceAll('\\', '/');
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);

// Deliberately limited to the scalar source lists used by this repository. Fail on
// unfamiliar YAML rather than silently losing a continuation, quote or mapping.
export function sourcesBlock(frontmatter) {
  const match = /^sources:[ \t]*(?:\[\])?[ \t]*\n((?:(?:[ \t]+[^\n]*|)[\n])*)/m.exec(frontmatter + '\n');
  if (!match) {
    if (/^sources:/m.test(frontmatter)) throw new Error('Unbekanntes sources-Format');
    return { sources: [], start: -1, end: -1 };
  }
  const entries = [];
  let current;
  for (const line of match[1].split('\n')) {
    if (!line.trim()) continue;
    const item = /^  - (.+)$/.exec(line);
    if (item) { current = [item[1]]; entries.push(current); }
    else if (/^    \S/.test(line) && current) current.push(line.trim());
    else throw new Error(`Unbekannte sources-Zeile: ${line}`);
  }
  const sources = entries.map(parts => {
    const block = /^[>|][+-]?$/.test(parts[0]);
    if (block && parts[0][0] === '|' && parts.length > 2) throw new Error('Mehrzeiliger Literalpfad muss manuell geprüft werden');
    let value = (block ? parts.slice(1) : parts).join(' ').trim();
    if (value.startsWith('"')) value = JSON.parse(value);
    else if (value.startsWith("'")) {
      assert.ok(value.endsWith("'"), 'Nicht geschlossenes YAML-Zitat');
      value = value.slice(1, -1).replaceAll("''", "'");
    } else if (/^[\[\]{&*!]|: |\s#/.test(value)) throw new Error(`Mehrdeutiger YAML-Quellwert: ${value}`);
    assert.ok(typeof value === 'string' && value.length && !value.includes('\n'), 'Leerer/mehrzeiliger Quellenpfad');
    return value;
  });
  return { sources, start: match.index, end: Math.min(frontmatter.length, match.index + match[0].length) };
}

export function replaceSources(raw, sources) {
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const m = /^(\uFEFF?---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/.exec(raw);
  assert.ok(m, 'Frontmatter fehlt');
  const fm = m[2].replaceAll('\r\n', '\n');
  const block = sourcesBlock(fm);
  assert.ok(block.start >= 0, 'sources fehlt');
  const next = `sources:\n${sources.map(s => `  - ${JSON.stringify(s)}`).join('\n')}`;
  const suffix = fm.slice(block.end);
  const updated = fm.slice(0, block.start) + next + (suffix ? '\n' + suffix : '');
  return m[1] + updated.replaceAll('\n', eol) + raw.slice(m[1].length + m[2].length);
}

export function resolveSource(source, file, { repo, catalog }) {
  const s = slash(source).normalize('NFC');
  if (/^https?:\/\//i.test(s)) return { status: 'external-url', source };
  const inside = p => {
    const absolute = path.resolve(repo, p), rel = slash(path.relative(repo, absolute));
    return !rel.startsWith('../') && rel !== '..' && !path.isAbsolute(rel) && fs.existsSync(absolute) && fs.statSync(absolute).isFile() ? rel : null;
  };
  let candidate = null, method = null;
  if (s.startsWith('content/')) { candidate = s; method = 'repository-path'; }
  else if (s.startsWith('../') || s.startsWith('./')) { candidate = path.resolve(path.dirname(file), s); method = 'relative-path'; }
  else if (s.startsWith('quellen/')) { candidate = 'content/' + s; method = 'source-root'; }
  else if (s.startsWith('wiki/')) {
    // Preserve the original importer's German canonical source semantics,
    // including for French translations. Never guess the page language here.
    candidate = /^wiki\/(de|fr)\//.test(s) ? 'content/' + s : 'content/wiki/de/' + s.slice(5);
    method = 'canonical-wiki-reference';
  } else {
    const historicWiki = /^[A-Za-z]:\/.*?\/wiki\/(de|fr)\/(.+\.md)$/.exec(s) || /^[A-Za-z]:\/Texte\/(de|fr)\/(.+\.md)$/.exec(s);
    if (historicWiki) { candidate = `content/wiki/${historicWiki[1]}/${historicWiki[2]}`; method = 'explicit-historical-wiki-root'; }
  }
  if (candidate) {
    const target = inside(candidate);
    if (target) return { status: 'resolved', source, target, method };
    // A broken new canonical path is a regression, not an old missing source.
    if (s.startsWith('content/')) return { status: 'broken-canonical', source };
  }
  if (s.toLowerCase().endsWith('.pdf')) {
    const basename = path.posix.basename(s);
    const originals = catalog.originalPdfFiles.filter(o => path.posix.basename(o.path).normalize('NFC') === basename);
    const hashes = [...new Set(originals.map(o => o.sha256))];
    if (hashes.length > 1) return { status: 'ambiguous-original', source, candidates: originals };
    if (hashes.length === 1) {
      const copies = catalog.sources.filter(c => c.sha256 === hashes[0]);
      if (copies.length === 1) return { status: 'resolved', source, target: copies[0].path, method: 'exact-original-filename-and-copy-hash', sha256: hashes[0], originalPaths: originals.map(o => o.path) };
      return { status: 'original-only', source, sha256: hashes[0], originalPaths: originals.map(o => o.path) };
    }
  }
  if (s.includes('*')) return { status: 'historical-collection', source };
  return { status: 'unresolved', source, kind: s.endsWith('.md') ? 'derived-markdown' : s.endsWith('.pdf') ? 'pdf' : /\.(docx|csv|txt|idml)$/i.test(s) ? 'editorial-file' : 'other' };
}

export function inspectSources({ repo = REPO, verifyOriginals = false } = {}) {
  const catalog = JSON.parse(fs.readFileSync(path.join(repo, 'docs/quellenpruefung/quellenregister.json'), 'utf8'));
  assert.deepEqual(walk(path.join(repo, 'content/quellen')).filter(f => f.endsWith('.pdf')).map(f => slash(path.relative(repo, f))).sort(), catalog.sources.map(s => s.path).sort(), 'PDF-Bestand und Quellenregister weichen ab');
  assert.equal(new Set(catalog.sources.map(s => s.path)).size, catalog.sources.length, 'Doppelte Registerpfade');
  const pages = new Map(), checked = new Map(), originalLocations = new Set();
  for (const source of catalog.sources) {
    assert.equal(hash(path.join(repo, source.path)), source.sha256, `${source.path}: Hash abweichend`);
    assert.ok(Number.isInteger(source.pages) && source.pages > 0);
    checked.set(source.path, source.sha256); pages.set(source.path, source.pages);
    for (const evidence of source.reviewEvidence) assert.ok(fs.existsSync(path.join(repo, evidence.report)), evidence.report);
  }
  if (verifyOriginals) for (const source of catalog.originalPdfFiles) {
    assert.equal(hash(path.resolve(repo, '../Anleitungen', source.path)), source.sha256, `${source.path}: Originalhash abweichend`);
    originalLocations.add(source.path);
  }
  const records = [], changes = [], duplicates = [], files = [], brokenLinks = [], pageLinks = [];
  for (const file of walk(path.join(repo, 'content/wiki')).filter(f => f.endsWith('.md')).sort()) {
    const raw = fs.readFileSync(file, 'utf8'), relative = slash(path.relative(repo, file));
    const { frontmatter, body } = markdownInhalt(raw);
    const { sources } = sourcesBlock(frontmatter);
    const resolved = sources.map(s => ({ file: relative, ...resolveSource(s, file, { repo, catalog }) }));
    for (const r of resolved) assert.notEqual(r.status, 'broken-canonical', `${relative}: ${r.source} fehlt`);
    records.push(...resolved);
    const normalized = [], seen = new Set();
    for (const r of resolved) {
      const target = r.target || r.source;
      if (r.target && r.target !== r.source) changes.push(r);
      if (seen.has(target)) { duplicates.push({ file: relative, source: r.source, target }); continue; }
      seen.add(target); normalized.push(target);
    }
    const edited = JSON.stringify(sources) === JSON.stringify(normalized) ? raw : replaceSources(raw, normalized);
    // Mutations may only affect sources, never technical prose or other metadata.
    assert.equal(markdownInhalt(edited).body, body);
    const beforeBlock = sourcesBlock(frontmatter), afterFm = markdownInhalt(edited).frontmatter, afterBlock = sourcesBlock(afterFm);
    assert.equal(frontmatter.slice(0, beforeBlock.start) + frontmatter.slice(beforeBlock.end), afterFm.slice(0, afterBlock.start) + afterFm.slice(afterBlock.end));
    files.push({ file: relative, raw, edited, sourceCount: sources.length, statuses: Object.fromEntries([...new Set(resolved.map(r => r.status))].map(s => [s, resolved.filter(r => r.status === s).length])) });
    for (const m of body.matchAll(/\]\(([^)]+\.pdf)(?:#page=(\d+))?\)/gi)) {
      if (/^[a-z]+:/i.test(m[1])) continue;
      const target = slash(path.relative(repo, path.resolve(path.dirname(file), decodeURIComponent(m[1]))));
      if (!fs.existsSync(path.join(repo, target))) { brokenLinks.push({ file: relative, target }); continue; }
      if (m[2]) {
        assert.ok(pages.has(target), `${target}: Seitenzahl fehlt im Register`);
        assert.ok(+m[2] >= 1 && +m[2] <= pages.get(target), `${relative}: Seite ${m[2]} außerhalb ${target}`);
        pageLinks.push({ file: relative, target, page: +m[2] });
      }
    }
    for (const m of body.matchAll(/\]\(([^)]+\.md)(?:#[^)]*)?\)/g)) {
      if (/^[a-z]+:/i.test(m[1])) continue;
      const target = path.resolve(path.dirname(file), decodeURIComponent(m[1]));
      if (!fs.existsSync(target)) brokenLinks.push({ file: relative, target: m[1] });
    }
  }
  assert.equal(brokenLinks.length, 0, JSON.stringify(brokenLinks));
  const unresolved = new Map();
  for (const r of records.filter(r => r.status !== 'resolved' && r.status !== 'external-url')) {
    if (!unresolved.has(r.source)) unresolved.set(r.source, { ...r, file: undefined, files: [] });
    const entry = unresolved.get(r.source); if (!entry.files.includes(r.file)) entry.files.push(r.file);
  }
  const summary = {
    wikiFiles: files.length, sourceReferences: records.length, distinctSourceReferences: new Set(records.map(r => r.source)).size,
    resolvedReferences: records.filter(r => r.status === 'resolved').length,
    externalUrls: records.filter(r => r.status === 'external-url').length,
    unresolvedDistinct: unresolved.size,
    unresolvedByStatus: Object.fromEntries([...new Set([...unresolved.values()].map(r => r.status))].map(s => [s, [...unresolved.values()].filter(r => r.status === s).length])),
    checkedPdfCopies: checked.size, originalLocationsCompared: originalLocations.size, physicalPageLinksChecked: pageLinks.length,
    changedFiles: files.filter(f => f.raw !== f.edited).length, normalizedReferences: changes.length, duplicateReferencesRemoved: duplicates.length,
    brokenMarkdownLinks: brokenLinks.length,
  };
  return { summary, catalog, files, records, changes, duplicates, unresolved: [...unresolved.values()], hashes: Object.fromEntries(checked), pageLinks };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2), options = { verifyOriginals: args.includes('--originals') };
  const allowed = new Set(['--write', '--check', '--originals', '--report']);
  let reportPath;
  for (let i = 0; i < args.length; i++) {
    if (!allowed.has(args[i])) throw new Error(`Unbekannte Option: ${args[i]}`);
    if (args[i] === '--report') { reportPath = args[++i]; assert.ok(reportPath && !reportPath.startsWith('--')); }
  }
  assert.ok(!(args.includes('--write') && args.includes('--check')), '--write/--check schließen sich aus');
  const result = inspectSources(options);
  // All files and hashes have passed preflight before the first edit.
  if (args.includes('--write')) for (const f of result.files) if (f.raw !== f.edited) fs.writeFileSync(path.join(REPO, f.file), f.edited);
  if (reportPath) fs.writeFileSync(path.resolve(reportPath), JSON.stringify({ checkedAt: new Date().toISOString(), mode: args.includes('--write') ? 'source-maintenance' : 'source-check', summary: result.summary, changes: result.changes, duplicates: result.duplicates, unresolved: result.unresolved, files: result.files.map(({ raw, edited, ...f }) => f) }, null, 2) + '\n');
  console.log(JSON.stringify(result.summary, null, 2));
  if (!args.includes('--write') && result.summary.changedFiles) process.exitCode = 1;
}
