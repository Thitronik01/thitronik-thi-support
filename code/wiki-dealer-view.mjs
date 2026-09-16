// Händler-Sicht („Dealer-View") der Wiki-Artefakte — geteilte, reine Funktionen.
//
// Hintergrund (Security-Review 2026-07-22, Finding P1): Der Ingest speichert im
// Artikelobjekt sowohl die volle `html`-Fassung (inkl. „Service & Intern“-
// Abschnitten) als auch die bereinigte `dealerHtml`-Fassung plus die kompletten
// `sources`/`sourceMeta` (inkl. interner Quellen). Bisher wählte erst der CLIENT
// die passende Fassung — die API lieferte Händlern das volle Objekt aus. Diese
// Datei zentralisiert die serverseitige Projektion, damit Nicht-Interne
// (role != admin/trainer/editor) interne Teilinhalte nie über die Leitung
// bekommen. Genutzt von lib/wiki-runtime.js (Auslieferung), vom Ingest
// (scripts/wiki-ingest.mjs, für die .public-Artefakte der Offline-Evals) und
// von tests/wiki-dealer-view.test.js.
//
// Bewusst .mjs: Der Ingest läuft als plain `node scripts/wiki-ingest.mjs`
// (predev/prebuild) ohne ESM-Flags — eine .js-Datei würde dort ohne
// "type":"module" als CJS interpretiert. Next bundelt .mjs problemlos.

// Anker der „Service & Intern“-H2-Abschnitte in Standard-Artikeln — die EINE
// Quelle der Wahrheit: buildDealerHtml (scripts/wiki-ingest.mjs) entfernt exakt
// diese Abschnitte aus dem Händler-HTML, dealerHeadingsFor aus dem TOC, der
// Ingest markiert sie im Abschnittsindex als dealerHidden.
//
// WICHTIG (Befund 2026-07-22): Die Überschrift ist ÜBERSETZT — github-slugger
// erzeugt daher pro Sprache einen anderen Anker. Die frühere Dreier-Liste
// (nur de/nl) ließ die Blöcke in 9 von 11 Sprachen im Händler-HTML stehen.
// Der Wächter in scripts/wiki-smoke.mjs schlägt an, wenn eine Sprach-Indexseite
// keinen als dealerHidden markierten Abschnitt mehr hat (z. B. weil eine
// Neuübersetzung einen neuen Slug erzeugt → hier nachtragen!).
export const INTERNAL_SECTION_ANCHORS = new Set([
  'service-amp-intern',    // historische Slug-Variante
  'service-intern',        // historische Slug-Variante
  'service--intern',       // de, nl („Service & Intern“)
  'service--internal',     // en
  'service--interne',      // fr
  'servicio-e-interno',    // es
  'servizio-e-interno',    // it
  'service--internt',      // da, sv
  'service-og-internt',    // no
  'serwis-i-wewnętrzne',   // pl
  'servis--interní',       // cs
  // Redaktioneller Textaustausch 2026-07: „Service & Intern“ wurde in allen
  // Sprach-Indizes präziser als „Service und interne Abläufe/Prozesse“ benannt.
  'service-und-interne-abläufe',          // de
  'service-and-internal-processes',       // en
  'service-et-procédures-internes',       // fr
  'servicio-y-procesos-internos',         // es
  'assistenza-e-procedure-interne',       // it
  'service-en-interne-processen',         // nl
  'service-og-interne-processer',         // da
  'service-och-interna-processer',        // sv
  'service-og-interne-prosesser',         // no
  'serwis-i-procesy-wewnętrzne',          // pl
  'servis-a-interní-procesy',             // cs
]);

// Grobe HTML→Text-Extraktion für Suchindex-Zwecke. Muss nicht hübsch sein,
// aber vollständig: alles, was der Händler nicht sehen darf, ist im dealerHtml
// bereits entfernt — hieraus abgeleiteter Text ist damit per Konstruktion sauber.
export function htmlToPlainText(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Headings-Liste ohne die „Service & Intern“-Blöcke: der markierte H2 selbst
 * und alle tieferen Überschriften (H3+) bis zur nächsten H2/H1 fliegen raus.
 * Konservativ: lieber einen TOC-Eintrag zu viel entfernen als einen internen
 * Überschriftentext ausliefern.
 */
export function dealerHeadingsFor(headings) {
  const out = [];
  let hiding = false;
  for (const h of headings || []) {
    const level = Number(h?.level) || 0;
    if (level <= 1) hiding = false;
    else if (level === 2) hiding = INTERNAL_SECTION_ANCHORS.has(String(h?.id || ''));
    if (!hiding) out.push(h);
  }
  return out;
}

/**
 * Artikel-Body-Objekt (wiki-articles/{lang}/{slug}.json) für Nicht-Interne.
 * Fail-closed: fehlt `dealerHtml` (uralte Artefakte), wird ein leerer Body
 * ausgeliefert — nie die ungefilterte `html`-Fassung.
 */
export function dealerArticleView(article) {
  if (!article || typeof article !== 'object') return article;
  const view = { ...article };
  view.html = typeof article.dealerHtml === 'string' ? article.dealerHtml : '';
  delete view.dealerHtml;
  view.sources = Array.isArray(article.dealerSources) ? article.dealerSources : [];
  view.sourceMeta = Array.isArray(article.sourceMeta)
    ? article.sourceMeta.filter((s) => s && s.public === true && s.internal !== true)
    : [];
  view.headings = dealerHeadingsFor(article.headings);
  // relatedLinks/relatedAssets: computeRelatedLinks() schließt interne Ziele
  // für Standard-Artikel bereits beim Ingest aus — hier nichts zu filtern.
  return view;
}

// Die dealer*-Zusatzfelder existieren nur in den Runtime-Artefakten und sind
// ein Implementierungsdetail — sie verlassen den Server in KEINER Sicht.
export function stripDealerSearchFields(item) {
  if (!item || typeof item !== 'object') return item;
  const { dealerExcerpt, dealerBody, dealerKeywords, dealerHeadings, ...rest } = item;
  return rest;
}

/**
 * Suchindex-Eintrag für Nicht-Interne. Einträge mit Intern-Anteil tragen seit
 * Schema v2 die vom Ingest aus `dealerHtml` abgeleiteten dealer*-Felder; die
 * ungefilterten Textfelder werden damit überschrieben (fail-closed auf '').
 * Einträge ohne Intern-Anteil (dealerBody undefined) bleiben unverändert.
 */
export function dealerSearchView(item) {
  if (!item || typeof item !== 'object') return item;
  const { dealerExcerpt, dealerBody, dealerKeywords, dealerHeadings, ...rest } = item;
  if (dealerBody === undefined && dealerExcerpt === undefined) return rest;
  return {
    ...rest,
    excerpt: dealerExcerpt ?? '',
    body: dealerBody ?? '',
    // keywords/headings sind im Suchindex Strings (join(' ')), keine Arrays.
    keywords: dealerKeywords ?? '',
    headings: dealerHeadings ?? '',
  };
}

/**
 * Abschnittsindex für Nicht-Interne: Abschnitte interner Artikel UND als
 * dealerHidden markierte Abschnitte (die „Service & Intern“-Blöcke in
 * Standard-Artikeln) fliegen raus; das Markierungsfeld selbst ebenfalls.
 */
export function dealerSectionsView(sectionIndex) {
  return (sectionIndex || [])
    .filter((item) => item && item.visibility !== 'internal' && item.dealerHidden !== true)
    .map(({ dealerHidden, ...rest }) => rest);
}
