// Gemeinsame Klartextprojektion für Referenz-Ingest und Support-App.
// Eingabe: Markdown-Inhalt OHNE YAML-Frontmatter. Technische Literale sind Daten,
// keine Formatierung; insbesondere SMS-Steuerzeichen und Vergleichsoperatoren.
export function markdownLines(markdown) {
  const lines = String(markdown).replace(/\r\n?/g, '\n').split('\n');
  let fence = null;
  const result = [];
  for (const line of lines) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (marker && !fence) { fence = marker[1]; result.push({ line, code: true }); continue; }
    if (fence) {
      if (new RegExp(`^ {0,3}${fence[0]}{${fence.length},}\\s*$`).test(line)) fence = null;
      result.push({ line, code: true });
      continue;
    }
    result.push({ line, code: false });
  }
  return result;
}

export function extractPlainText(markdown) {
  const outside = markdownLines(markdown).filter(l => !l.code).map(l => l.line);
  // Keep established spacing: it affects excerpt windows. Choose a marker that
  // does not occur in the input, so even literal private-use characters survive.
  const clean = (text) => text
    .replace(/!\[[^\]]*\]\([^\n]*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^\n]*?\)/g, '$1')
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, target, label) => label || target)
    .replace(/^ {0,3}#{1,6}(?=\s)/gm, '')
    .replace(/^ {0,3}>(?=[ \t])/gm, '')
    .replace(/^ {0,3}\*(?=[ \t])/gm, '')
    .replace(/\*\*([^\n]*?)\*\*|__([^\n]*?)__/g, (_, a, b) => a ?? b)
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=$|[\s.,;:!?)])/g, '$1$2')
    .replace(/(^|[\s(])_([^_\n]+)_(?=$|[\s.,;:!?)])/g, '$1$2')
    .replace(/~~([^\n]*?)~~/g, '$1')
    .replace(/\|/g, '');
  const text = outside.join('\n');
  let marker = '\uE000';
  while (text.includes(marker)) marker += '\uE000';
  const literals = [];
  const protectedText = text.replace(/(`+)([^\n]*?)\1(?!`)/g, (_, ticks, value) => `${marker}${literals.push(value) - 1}\uE001`);
  let plain = clean(protectedText);
  for (const [i, literal] of literals.entries()) plain = plain.replaceAll(`${marker}${i}\uE001`, literal);
  return plain.replace(/\n{2,}/g, '\n').trim();
}
