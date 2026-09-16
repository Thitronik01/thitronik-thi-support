// ============================================================================
// Thi — Agentic Such-Tools (Stufe 2, E4-Kür c). Server-only.
// ----------------------------------------------------------------------------
// Stellt dem Thi-LLM zwei Funktions-Tools bereit, mit denen es SELBST im
// Wiki + den Anleitungs-/FAQ-Extrakten nachschlagen kann, wenn der vorab
// injizierte <kontext>-Block nicht reicht:
//   - wiki_suchen(query)    → Top-Treffer mit Snippets
//   - artikel_lesen(route)  → (gekappter) Volltext eines Index-Eintrags
//
// Datenquelle ist der VOLLE Runtime-Suchindex (project-data/runtime/wiki/
// search-index.json, inkl. interner Einträge) — die Sichtbarkeit filtert
// searchWiki über access.canViewInternal, artikel_lesen prüft sie explizit.
// Kein DB-/Netzwerkzugriff: alles lokale Dateien + reine Funktionen, damit
// der Tool-Roundtrip schnell bleibt.
//
// Anymize-Besonderheit (live getestet 2026-06-12): Der llm-anonymous-Endpoint
// lehnt `role:"tool"`-Messages immer mit 400 ab. Tool-Ergebnisse werden daher
// als user-Message mit dem Präfix [TOOL-ERGEBNIS …] zurückgegeben — die
// assistant-Message darf ihr natives tool_calls-Feld behalten.
// ============================================================================
import path from 'path';
import { runtimeReadFileSync, runtimeStatSync } from './runtime-fs.js';
import { searchWiki, buildRetrievalQuery, extractSnippet, normalizeSearch, bestSectionForRoute } from './search-core.js';
import { matchNavTarget } from './thi-nav.js';
import { loadAnleitungenIndex, isAnleitungInternal } from './anleitungen-index.js';
import { dealerSearchView, dealerSectionsView, stripDealerSearchFields } from './wiki-dealer-view.mjs';

// de-only Kontext: langScoped-Routen bekommen /de vorangestellt.
const NAV_LANG = 'de';

const RUNTIME_SEARCH_INDEX = path.join(process.cwd(), 'project-data', 'runtime', 'wiki', 'search-index.json');
const RUNTIME_SECTION_INDEX = path.join(process.cwd(), 'project-data', 'runtime', 'wiki', 'section-index.json');

// Lazy-Cache mit mtime-Check: ein Re-Ingest bei laufendem Server wird beim
// nächsten Request übernommen, ohne den Prozess neu zu starten.
let indexCache = { mtimeMs: 0, data: null };
let sectionCache = { mtimeMs: 0, data: null };

export function loadThiSearchIndex() {
  try {
    const stat = runtimeStatSync(RUNTIME_SEARCH_INDEX);
    if (!indexCache.data || stat.mtimeMs !== indexCache.mtimeMs) {
      indexCache = { mtimeMs: stat.mtimeMs, data: JSON.parse(runtimeReadFileSync(RUNTIME_SEARCH_INDEX, 'utf-8')) };
    }
    return indexCache.data;
  } catch {
    return null; // Ingest noch nicht gelaufen
  }
}

// Abschnitts-Index (THI Abschnitts-Zitate) — damit der agentische Pfad Treffer
// auf route#anker deep-linken und einen Abschnitts-TOC für gezielte Zitate
// liefern kann. Fehlt die Datei (alter Ingest), arbeiten die Tools artikelweise.
export function loadThiSectionIndex() {
  try {
    const stat = runtimeStatSync(RUNTIME_SECTION_INDEX);
    if (!sectionCache.data || stat.mtimeMs !== sectionCache.mtimeMs) {
      sectionCache = { mtimeMs: stat.mtimeMs, data: JSON.parse(runtimeReadFileSync(RUNTIME_SECTION_INDEX, 'utf-8')) };
    }
    return sectionCache.data;
  } catch {
    return null;
  }
}

// ─── Rollen-projizierter Index (Security-Review 2026-07-22, Finding P1 Runde 2) ──
// KERNPROBLEM: Der Runtime-Suchindex trägt den VOLLEN body/excerpt inkl. der
// „Service & Intern“-Abschnitte, die in Standardartikeln stecken. `searchWiki`
// filtert nur GANZ interne Artikel (visibility==='internal') — die internen
// TEIL-Abschnitte in Standardartikeln blieben für Händler im Tool-Volltext UND
// (über die Kontextanreicherung der Route) im <kontext>-Block sichtbar.
// Deshalb dieselbe Dealer-Projektion wie lib/wiki-runtime.js, BEVOR irgendein
// Text das LLM erreicht: dealerSearchView ersetzt body/excerpt/keywords/headings
// durch die aus dealerHtml abgeleitete, bereinigte Fassung; interne Artikel
// fallen ganz weg. Cache pro (mtime, Sicht) — die Projektion über ~860 Einträge
// soll nicht jeden Tool-Hop neu laufen.
let scopedIndexCache = { mtimeMs: -1, internal: null, dealer: null };
let scopedSectionCache = { mtimeMs: -1, internal: null, dealer: null };

export function thiSearchIndexForAccess(access) {
  const raw = loadThiSearchIndex();
  if (!Array.isArray(raw)) return raw;
  if (scopedIndexCache.mtimeMs !== indexCache.mtimeMs) {
    scopedIndexCache = { mtimeMs: indexCache.mtimeMs, internal: null, dealer: null };
  }
  if (access?.canViewInternal) {
    // Interne sehen alles — aber ohne die dealer*-Rohfelder (Implementierungsdetail).
    if (!scopedIndexCache.internal) scopedIndexCache.internal = raw.map(stripDealerSearchFields);
    return scopedIndexCache.internal;
  }
  if (!scopedIndexCache.dealer) {
    scopedIndexCache.dealer = raw.filter((e) => e.visibility !== 'internal').map(dealerSearchView);
  }
  return scopedIndexCache.dealer;
}

export function thiSectionIndexForAccess(access) {
  const raw = loadThiSectionIndex();
  if (!Array.isArray(raw)) return raw;
  if (scopedSectionCache.mtimeMs !== sectionCache.mtimeMs) {
    scopedSectionCache = { mtimeMs: sectionCache.mtimeMs, internal: null, dealer: null };
  }
  if (access?.canViewInternal) return raw;
  if (!scopedSectionCache.dealer) scopedSectionCache.dealer = dealerSectionsView(raw);
  return scopedSectionCache.dealer;
}

// OpenAI-kompatible Tool-Definitionen (Anymize reicht sie durch).
export const THI_TOOL_DEFINITIONS = [
  {
    type: 'function',
    function: {
      name: 'wiki_suchen',
      description:
        'Durchsucht das THITRONIK-Wiki inkl. Bedienungsanleitungen und FAQ-PDFs. Liefert die besten Treffer mit Titel, Pfad und Textauszug. Formuliere die Suche in Fachbegriffen (z. B. "Fehlalarm Erschütterungssensor" statt ganzer Sätze); bei 0 Treffern mit anderen Begriffen erneut versuchen.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Suchbegriffe (Deutsch, 2-6 Wörter)' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'artikel_lesen',
      description:
        'Liest einen Wiki-Artikel oder ein Anleitungs-/FAQ-Dokument im Volltext (gekürzt). Als Referenz den Pfad aus wiki_suchen oder dem <kontext>-Block übergeben, z. B. "/de/wipro-iii" oder "/anleitungen?open=faq-fragen-zu-wipro-iii".',
      parameters: {
        type: 'object',
        properties: {
          route: { type: 'string', description: 'Pfad/Route des Eintrags' },
        },
        required: ['route'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'app_navigieren',
      description:
        'Schlägt dem Nutzer einen direkten Sprung in einen App-Bereich vor (z. B. Zertifikate, eine Anleitung öffnen, Arbeitskarte, Kurse, Lernpfade). NUR für "Bring mich zu …"/"Öffne …"/"Wo finde ich …"-Absichten — NICHT zum Nachschlagen von Inhalten (dafür wiki_suchen). Gib das Ergebnis dem Nutzer knapp weiter; nach einer Navigation ist die Aufgabe meist erledigt.',
      parameters: {
        type: 'object',
        properties: {
          ziel: { type: 'string', description: 'Stichwort des Bereichs, z. B. zertifikate, anleitung, arbeitskarte, kurse, lernpfade, forum, glossar' },
          frage: { type: 'string', description: 'optional: konkretes Dokument/Produkt/Fahrzeug, z. B. "WiPro III VW T6" (für gezielten Anleitungs-Deep-Link)' },
        },
        required: ['ziel'],
      },
    },
  },
];

// 2026-06-18: Tool-Ausgaben deutlich vergrößert. Latenz ist bewusst akzeptiert
// (Ziel: Antwort kommt verlässlich aus dem Wiki), und der Body-Cap im Ingest
// liegt jetzt bei 16000 — artikel_lesen darf den Artikel also (fast) komplett
// liefern, wiki_suchen größere Auszüge zur Treffer-Auswahl.
const MAX_TOOL_RESULT_CHARS = 16000;
const SEARCH_HITS = 6;
const SNIPPET_CHARS = 1000;

function formatHit(hit, i, query, sectionIndex) {
  const snippet = extractSnippet(hit.body || hit.excerpt || '', query, SNIPPET_CHARS).replace(/\s+/g, ' ').trim();
  // Bester Abschnitt → route#anker, damit Thi auf die jeweilige Stelle verweisen kann.
  const sec = sectionIndex ? bestSectionForRoute(sectionIndex, hit.route, query, 'de') : null;
  const cite = sec?.anchor ? `${hit.route}#${sec.anchor}` : hit.route;
  const label = sec?.headingPath ? ` — Abschnitt: ${sec.headingPath}` : '';
  return `[${i + 1}] ${hit.title}${label} (${cite})\n${snippet}`;
}

function runWikiSuchen(args, access) {
  const query = String(args?.query || '').trim();
  if (query.length < 2) return 'Fehler: query fehlt oder ist zu kurz.';
  // Rollen-projizierter Index: für Händler ohne Intern-Teilabschnitte (Finding P1).
  const index = thiSearchIndexForAccess(access);
  if (!index) return 'Fehler: Suchindex nicht verfügbar (Ingest fehlt).';
  const hits = searchWiki(index, buildRetrievalQuery(query, []), access, 'de', SEARCH_HITS);
  if (hits.length === 0) {
    return `Keine Treffer für "${query}". Versuche andere/kanonische Begriffe (Produktname, Bauteil, Symptom).`;
  }
  const sectionIndex = thiSectionIndexForAccess(access);
  const out = hits.map((h, i) => formatHit(h, i, query, sectionIndex)).join('\n\n');
  return out.slice(0, MAX_TOOL_RESULT_CHARS);
}

function runArtikelLesen(args, access) {
  const wanted = String(args?.route || '').trim();
  if (!wanted) return 'Fehler: route fehlt.';
  // Rollen-projizierter Index: entry.body ist für Händler die bereinigte
  // Dealer-Fassung (ohne „Service & Intern“-Abschnitt), interne Artikel fehlen
  // ganz — die frühere Sackgasse las den vollen Runtime-body (Finding P1).
  const index = thiSearchIndexForAccess(access);
  if (!index) return 'Fehler: Suchindex nicht verfügbar (Ingest fehlt).';
  const norm = (v) => normalizeSearch(String(v || '')).replace(/\s+/g, '');
  const entry = index.find(
    (e) => e.route === wanted || norm(e.route) === norm(wanted) || (e.slug && norm(e.slug) === norm(wanted)),
  );
  if (!entry || (entry.visibility === 'internal' && !access?.canViewInternal)) {
    // 3 Alternativen anbieten statt Sackgasse — und interne Einträge für
    // Händler-Sicht wie "nicht vorhanden" behandeln (kein Existenz-Leak).
    const related = searchWiki(index, buildRetrievalQuery(wanted.replace(/[/?=-]+/g, ' '), []), access, 'de', 3)
      .map((h) => `- ${h.title} (${h.route})`)
      .join('\n');
    return `Kein Eintrag unter "${wanted}".${related ? `\nÄhnliche Einträge:\n${related}` : ''}`;
  }
  const body = String(entry.body || entry.excerpt || '').trim();
  const header = `${entry.title} (${entry.route})${entry.updated ? ` — Stand ${entry.updated}` : ''}`;
  // Abschnitts-TOC: erlaubt dem Modell, gezielt route#anker eines Unterabschnitts
  // zu zitieren statt nur den Artikel. Projizierter Abschnittsindex → für Händler
  // ohne dealerHidden-/interne Abschnitte (kein Existenz-Leak).
  const sectionIndex = thiSectionIndexForAccess(access);
  const toc = (sectionIndex || [])
    .filter((s) => s.route === entry.route && s.anchor && (s.visibility !== 'internal' || access?.canViewInternal))
    .slice(0, 30)
    .map((s) => `- ${entry.route}#${s.anchor} — ${s.headingPath || s.heading}`)
    .join('\n');
  const tocBlock = toc ? `\n\nAbschnitte (für gezielte route#anker-Zitate):\n${toc}` : '';
  if (!body) return `${header}${tocBlock}\n(Für diesen Eintrag liegt kein Text-Extrakt vor — nur Titel/Metadaten.)`;
  return `${header}${tocBlock}\n\n${body}`.slice(0, MAX_TOOL_RESULT_CHARS);
}

// ─── App-Navigation (Schritt 1) ─────────────────────────────────────────────
// Versucht, eine Anleitungs-Absicht auf ein KONKRETES PDF zu deep-linken.
// Quelle ist ausschließlich das Ingest-Manifest (keine LLM-Pfade); interne
// PDFs nur für canViewInternal. Liefert {id,label} oder null (→ Übersichtsseite).
function resolveAnleitungDeepLink(text, access) {
  const index = loadAnleitungenIndex();
  if (!Array.isArray(index) || !index.length) return null;
  const tokens = normalizeSearch(text).split(/\s+/).filter((t) => t.length >= 3);
  if (!tokens.length) return null;
  let best = null;
  for (const entry of index) {
    if (isAnleitungInternal(entry) && !access?.canViewInternal) continue;
    const hay = normalizeSearch(`${entry.title || ''} ${entry.product || ''} ${entry.file || ''}`);
    let score = 0;
    for (const tok of tokens) if (hay.includes(tok)) score += 1;
    if (score > (best ? best.score : 0)) best = { entry, score };
  }
  // Mind. zwei spezifische Treffer, sonst ist es nur "anleitung" allgemein.
  if (!best || best.score < 2) return null;
  return { id: best.entry.id, label: `${best.entry.title} (PDF)` };
}

// Löst eine Navigations-Absicht gegen die Whitelist (lib/thi-nav.js) auf.
// Das LLM liefert nur Stichwörter; die Route kommt IMMER aus NAV_TARGETS.
// Rollen-Gating: gesperrte Ziele werden wie nicht existent behandelt (gleicher
// "nicht gefunden"-Text wie ein echter Fehlschlag → kein Existenz-Leak).
function runNavigieren(args, access) {
  const ziel = String(args?.ziel || '').trim();
  const frage = String(args?.frage || '').trim();
  if (!ziel && !frage) return JSON.stringify({ ok: false, hinweis: 'Kein Ziel angegeben.' });

  const notFound = JSON.stringify({ ok: false, hinweis: `Kein passender App-Bereich zu "${ziel || frage}" gefunden.` });

  let target = matchNavTarget(ziel || frage);
  if (!target && ziel && frage) target = matchNavTarget(`${ziel} ${frage}`);
  if (!target) return notFound;

  // Rollen-Gate — gesperrtes Ziel == "nicht gefunden" (kein Leak).
  if (target.admin && access?.role !== 'admin') return notFound;
  if (target.internal && !access?.canViewInternal) return notFound;

  let route = target.langScoped ? `/${NAV_LANG}${target.route}` : target.route;
  let label = target.label;

  // Anleitungs-Resolver: konkretes PDF statt nur Übersichtsseite.
  if (target.resolver === 'anleitung') {
    const open = resolveAnleitungDeepLink(`${frage} ${ziel}`, access);
    if (open) { route = `/anleitungen?open=${encodeURIComponent(open.id)}`; label = open.label; }
  }

  return JSON.stringify({ ok: true, route, label, icon: target.icon || null });
}

// Führt einen Tool-Call aus. Wirft nie — Fehler kommen als Text zurück, damit
// das Modell damit umgehen kann (und der Stream nicht abreißt).
export function executeThiTool(name, rawArgs, access) {
  let args = {};
  try {
    args = typeof rawArgs === 'string' ? JSON.parse(rawArgs || '{}') : rawArgs || {};
  } catch {
    return `Fehler: Argumente für ${name} waren kein gültiges JSON.`;
  }
  try {
    if (name === 'wiki_suchen') return runWikiSuchen(args, access);
    if (name === 'artikel_lesen') return runArtikelLesen(args, access);
    if (name === 'app_navigieren') return runNavigieren(args, access);
    return `Fehler: Unbekanntes Tool "${name}".`;
  } catch (err) {
    console.error(`[thi] Tool ${name} fehlgeschlagen:`, err);
    return `Fehler: ${name} ist intern fehlgeschlagen.`;
  }
}
