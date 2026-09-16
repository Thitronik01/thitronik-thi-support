// Lightweight server loader for the generated instructions manifest.
//
// Keep this separate from `anleitungen-runtime.js`: routes that only search or
// list instruction metadata must not pull every gated PDF into their Vercel
// Function trace. The PDF resolver remains in `anleitungen-runtime.js`.
import path from 'path';
import { runtimeReadFileSync } from './runtime-fs.js';

const RUNTIME_INDEX = path.join(
  process.cwd(),
  'project-data',
  'runtime',
  'wiki',
  'anleitungen-index.json',
);

const INTERNAL_FILE_PATTERN = /NUR_INTERNER_GEBRAUCH|(?:^|[_/-])intern(?:[_/-]|$)/i;

export function isAnleitungInternal(entry) {
  if (!entry) return false;
  if (entry.visibility === 'internal') return true;
  return INTERNAL_FILE_PATTERN.test(entry.file || '');
}

export function loadAnleitungenIndex() {
  try {
    const list = JSON.parse(runtimeReadFileSync(RUNTIME_INDEX, 'utf-8'));
    return Array.isArray(list) ? list : null;
  } catch {
    return null;
  }
}
