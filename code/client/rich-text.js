"use client";

// ============================================
// Sicherer Markdown-Subset-Renderer für Forum-Beiträge UND THI-Antworten.
//
// Inline: **fett**, *kursiv*, `code`, [Text](url), nackte URLs, Bilder
//   ![alt](url | data:image/…).
// Block:  GFM-Tabellen (| … | + |---|-Trenner), Aufzählungen (- / * / 1.),
//   Überschriften (#…######), horizontale Trenner (--- / *** / ___).
//
// Es wird KEIN rohes HTML gerendert — alles läuft über React-Knoten, daher kein
// XSS über dangerouslySetInnerHTML.
// ============================================

import React from 'react';

const SAFE_LINK = /^(https?:\/\/|\/|mailto:)/i;
const SAFE_IMG = /^(https?:\/\/|data:image\/|\/)/i;

// Reihenfolge der Alternativen = Priorität beim Tokenisieren.
const INLINE_RE = /(!\[[^\]]*\]\([^)]+\))|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+?\*\*)|(\*[^*]+?\*)|(`[^`]+?`)|(https?:\/\/[^\s)]+)/g;

function parseInline(text, kp) {
  const nodes = [];
  let last = 0;
  let i = 0;
  let m;
  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${kp}-${i++}`;

    if (tok.startsWith('![')) {
      const mm = tok.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (mm && SAFE_IMG.test(mm[2].trim())) {
        // Nutzergenerierte Data-/HTTPS-Bilder haben keine verlässlichen Maße oder
        // Host-Allowlist und bleiben deshalb bewusst native, lazy geladene Bilder.
        // eslint-disable-next-line @next/next/no-img-element
        nodes.push(<img key={key} src={mm[2].trim()} alt={mm[1] || 'Bild'} className="forum-post-img" loading="lazy" />);
      } else {
        nodes.push(tok);
      }
    } else if (tok.startsWith('[')) {
      const mm = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (mm && SAFE_LINK.test(mm[2].trim())) {
        nodes.push(<a key={key} href={mm[2].trim()} target="_blank" rel="noopener noreferrer">{mm[1]}</a>);
      } else {
        nodes.push(tok);
      }
    } else if (tok.startsWith('**')) {
      nodes.push(<strong key={key}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('*')) {
      nodes.push(<em key={key}>{tok.slice(1, -1)}</em>);
    } else if (tok.startsWith('`')) {
      nodes.push(<code key={key} className="forum-inline-code">{tok.slice(1, -1)}</code>);
    } else {
      // nackte URL
      nodes.push(<a key={key} href={tok} target="_blank" rel="noopener noreferrer">{tok}</a>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// ─── Tabellen-Hilfen (GFM) ────────────────────────────────────────────────────
// Eine Zeile ist eine Tabellen-Trennzeile, wenn sie NUR aus |, -, :, Leerzeichen
// besteht und mindestens ein | sowie ein - enthält (grenzt sie vom ---Trenner ab,
// der keine Pipe hat, und von normalen Datenzeilen mit Text).
function isSeparatorRow(line) {
  const t = line.trim();
  return t.includes('|') && t.includes('-') && /^[\s|:-]+$/.test(t);
}
function isTableRow(line) {
  return line.includes('|') && line.trim() !== '';
}
// Zerlegt eine Tabellenzeile in Zellen; führende/abschließende Pipe werden
// verworfen (| a | b | → ['a','b']).
function splitRow(line) {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map((c) => c.trim());
}
// Spalten-Ausrichtung aus einer Trennzelle (:--- links, ---: rechts, :---: mittig).
function alignOf(cell) {
  const c = cell.trim();
  const l = c.startsWith(':');
  const r = c.endsWith(':');
  if (l && r) return 'center';
  if (r) return 'right';
  if (l) return 'left';
  return null;
}

export function renderRichText(content) {
  if (!content) return null;
  const lines = String(content).split('\n');
  const blocks = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Leerzeile → Abstand
    if (trimmed === '') {
      blocks.push(<div key={`sp-${key++}`} className="forum-post-spacer" aria-hidden="true" />);
      i++;
      continue;
    }

    // Tabelle: aktuelle Zeile = Kopf, nächste Zeile = Trennzeile.
    if (isTableRow(line) && i + 1 < lines.length && isSeparatorRow(lines[i + 1])) {
      const header = splitRow(line);
      const aligns = splitRow(lines[i + 1]).map(alignOf);
      const bkey = key++;
      i += 2;
      const rows = [];
      while (i < lines.length && isTableRow(lines[i]) && !isSeparatorRow(lines[i])) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      blocks.push(
        <div key={`tbl-${bkey}`} className="forum-post-table-wrap">
          <table className="forum-post-table">
            <thead>
              <tr>
                {header.map((c, ci) => (
                  <th key={ci} style={aligns[ci] ? { textAlign: aligns[ci] } : undefined}>
                    {parseInline(c, `th-${bkey}-${ci}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {header.map((_, ci) => (
                    <td key={ci} style={aligns[ci] ? { textAlign: aligns[ci] } : undefined}>
                      {parseInline(row[ci] || '', `td-${bkey}-${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // Horizontaler Trenner
    if (/^(-{3,}|_{3,}|\*{3,})$/.test(trimmed)) {
      blocks.push(<hr key={`hr-${key++}`} className="forum-post-hr" />);
      i++;
      continue;
    }

    // Überschrift (# … ######). # → h3, damit die Seiten-h1 unberührt bleibt.
    const h = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (h) {
      const level = Math.min(6, h[1].length + 2);
      const Tag = `h${level}`;
      const hkey = key++;
      blocks.push(
        <Tag key={`h-${hkey}`} className="forum-post-heading">
          {parseInline(h[2], `h-${hkey}`)}
        </Tag>,
      );
      i++;
      continue;
    }

    // Aufzählung (ungeordnet - / * bzw. geordnet 1.) — zusammenhängende Zeilen.
    const ul = /^[-*]\s+/.test(trimmed);
    const ol = /^\d+\.\s+/.test(trimmed);
    if (ul || ol) {
      const items = [];
      while (i < lines.length) {
        const t = lines[i].trim();
        const mU = t.match(/^[-*]\s+(.*)$/);
        const mO = t.match(/^\d+\.\s+(.*)$/);
        if (ul && mU) items.push(mU[1]);
        else if (ol && mO) items.push(mO[1]);
        else break;
        i++;
      }
      const ListTag = ul ? 'ul' : 'ol';
      const lkey = key++;
      blocks.push(
        <ListTag key={`list-${lkey}`} className="forum-post-list">
          {items.map((it, li) => (
            <li key={li}>{parseInline(it, `li-${lkey}-${li}`)}</li>
          ))}
        </ListTag>,
      );
      continue;
    }

    // Standard-Absatz
    blocks.push(
      <p key={`p-${key++}`} className="forum-post-line">
        {parseInline(line, `l${i}`)}
      </p>,
    );
    i++;
  }

  return blocks;
}
