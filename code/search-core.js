// ============================================================================
// Such-/Retrieval-Kern für Wiki-Suche und Thi-RAG (AP3, THI-RAG Quick Wins).
// ----------------------------------------------------------------------------
// BEWUSST ohne Store-/React-/Next-Abhängigkeiten: reine Funktionen, damit das
// Modul im Node-Test-Runner läuft (tests/search-core.test.js). `lib/wiki.js`
// re-exportiert die öffentlichen Funktionen für die App.
// ============================================================================

// Hinweis (AP3-Fix): Die Umlaut-Digraphen MÜSSEN vor dem NFD-Strip laufen.
// Die Vorgängerversion strippte erst NFD-Akzente (ä→a), wodurch die
// dokumentierte ae/oe/ue-Normalisierung nie griff — getippte ASCII-Formen
// („Tuerkontakt") fanden den Artikel („Türkontakt") nicht. Query und
// Haystack werden beide zur Laufzeit hiermit normalisiert (konsistent).
export function normalizeSearch(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    // Akronym-Entpunkten: punktierte Buchstaben-Akronyme kollabieren, damit
    // getippte Kurzformen die kanonische Schreibweise treffen — „T.S.A." → „tsa",
    // „G.A.S." → „gas". Greift NUR bei mind. zwei aufeinanderfolgenden
    // Einzelbuchstabe-Punkt-Paaren ([a-z], nicht \w): Versionen/Artikelnummern
    // („1.1", „105753", „co2") und Domains/Pfade bleiben strukturell unberührt.
    // Läuft beidseitig (Query UND Haystack über dieselbe Funktion) → keine
    // Asymmetrie. Muss NACH dem NFD-Strip stehen, damit es auf ASCII-Buchstaben
    // arbeitet.
    .replace(/\b(?:[a-z]\.){2,}/g, (m) => m.replace(/\./g, ''));
}

// ─── De-Flood: FAQ-/Anleitungs-PDF-Einträge abwerten ────────────────────────
// Die FAQ-/Anleitungs-PDFs fluten den Index (de: 82 von 147 Einträgen) mit
// generischen Begriffen ("FAQ", "häufige Fragen", Produktnamen in jeder Frage)
// und verdrängen die kanonischen Wiki-Artikel aus dem Top-8-RAG-Fenster
// (Eval-Befund 2026-06-18). Diese Typen werden multiplikativ ABGEWERTET, NICHT
// ausgeschlossen: ein deutlich stärkerer PDF-Treffer gewinnt weiterhin, aber bei
// vergleichbarer lexikalischer Deckung steht der Fachartikel vorn. Faktor per
// THI_FAQ_DEMOTE überschreibbar (Tuning gegen scripts/thi-rag-eval.mjs).
const FAQ_DEMOTE_TYPES = new Set(['faq', 'anleitung']);
const FAQ_DEMOTE_FACTOR = (() => {
  const v = Number(typeof process !== 'undefined' && process.env && process.env.THI_FAQ_DEMOTE);
  return Number.isFinite(v) && v > 0 && v <= 1 ? v : 0.4;
})();

// Abwertung ankerloser Intro-Abschnitte im Abschnitts-Retrieval (searchSections).
// Per THI_SECTION_INTRO_DEMOTE justierbar (Tuning gegen scripts/thi-rag-eval.mjs).
const SECTION_INTRO_DEMOTE = (() => {
  const v = Number(typeof process !== 'undefined' && process.env && process.env.THI_SECTION_INTRO_DEMOTE);
  return Number.isFinite(v) && v > 0 && v <= 1 ? v : 0.25;
})();

// Fahrzeugartikel enthalten durch die ausführlichen Einbauanleitungen sehr viele
// allgemeine Begriffe (Montage, Batterie, CAN, Prüfung, Alarm). Ohne konkretes
// Fahrzeugmodell verdrängen sie dadurch die kanonischen Produkt-/Diagnoseartikel.
// Bei echter Modellabsicht bleiben sie voll gewichtet.
const VEHICLE_GENERIC_FACTOR = (() => {
  const v = Number(typeof process !== 'undefined' && process.env && process.env.THI_VEHICLE_GENERIC_FACTOR);
  return Number.isFinite(v) && v > 0 && v <= 1 ? v : 0.35;
})();

const VEHICLE_QUERY_RE = /\b(?:adria|boxer|citroen|coral|crafter|daily|ducato|fiat|ford|iveco|jumper|knaus|man|master|matrix|mercedes|movano|ncv3|nissan|opel|peugeot|primastar|renault|sprinter|talento|tge|toyota|trafic|transit|t1n|vito|volkswagen|vw|w447|vs30|x250|t5|t6(?:\.1)?)\b/;
const NORMALIZED_FIELDS = new WeakMap();

function normalizedFields(item) {
  if (item && typeof item === 'object' && NORMALIZED_FIELDS.has(item)) {
    return NORMALIZED_FIELDS.get(item);
  }
  const fields = {
    title: normalizeSearch(item?.title),
    slug: normalizeSearch(item?.slug),
    headings: normalizeSearch(item?.headings),
    heading: normalizeSearch(`${item?.heading || ''} ${item?.headingPath || ''}`),
    boost: normalizeSearch(item?.boostKeywords),
    keywords: normalizeSearch(item?.keywords),
    excerpt: normalizeSearch(item?.excerpt),
    body: normalizeSearch(item?.body),
  };
  fields.all = `${fields.title} ${fields.slug} ${fields.headings} ${fields.heading} ${fields.boost} ${fields.keywords} ${fields.excerpt} ${fields.body}`;
  if (item && typeof item === 'object') NORMALIZED_FIELDS.set(item, fields);
  return fields;
}

function retrievalTerms(query) {
  const terms = salientTerms(query);
  if (terms.length) return [...new Set(terms)];
  return [...new Set(normalizeSearch(query).split(/\s+/).filter(Boolean))];
}

function termWeights(items, terms) {
  const weights = new Map();
  const total = Math.max(1, items.length);
  for (const term of terms) {
    let documentFrequency = 0;
    for (const item of items) {
      if (normalizedFields(item).all.includes(term)) documentFrequency += 1;
    }
    // Seltene Fachbegriffe/Artikelnummern zählen stärker als überall vorkommende
    // Wörter wie „Montage“ oder „prüfen“. Begrenzter IDF-Aufschlag verhindert,
    // dass ein einzelner exotischer Begriff die gesamte Frage überstimmt.
    weights.set(term, Math.min(4, 1 + Math.log((total + 1) / (documentFrequency + 1))));
  }
  return weights;
}

function hasVehicleIntent(query) {
  return VEHICLE_QUERY_RE.test(normalizeSearch(query));
}

function coverageFactor(matches, termCount) {
  if (!termCount) return 1;
  const coverage = matches / termCount;
  return 0.55 + (0.45 * coverage);
}

export function searchWiki(searchIndex, query, access, lang = 'de', limit = 12) {
  const q = normalizeSearch(query).trim();
  if (q.length < 2) return [];
  const terms = retrievalTerms(query);
  const candidates = (searchIndex || [])
    .filter((item) => item.lang === lang)
    .filter((item) => access.canViewInternal || item.visibility !== 'internal');
  const weights = termWeights(candidates, terms);
  const vehicleIntent = hasVehicleIntent(query);

  return candidates
    .map((item) => {
      const fields = normalizedFields(item);
      let score = 0;
      let matches = 0;
      for (const term of terms) {
        if (!fields.all.includes(term)) continue;
        matches += 1;
        const weight = weights.get(term) || 1;
        if (fields.title.includes(term)) score += 12 * weight;
        if (fields.slug.includes(term)) score += 10 * weight;
        if (fields.headings.includes(term)) score += 6 * weight;
        if (fields.boost.includes(term)) score += 9 * weight;
        if (fields.keywords.includes(term)) score += 4 * weight;
        if (fields.excerpt.includes(term)) score += 2 * weight;
        else if (fields.body.includes(term)) score += 1 * weight;
      }
      score *= coverageFactor(matches, terms.length);
      score += matches * matches;
      if (score > 0 && FAQ_DEMOTE_TYPES.has(item.articleType)) score *= FAQ_DEMOTE_FACTOR;
      if (score > 0 && item.articleType === 'vehicle' && !vehicleIntent) {
        score *= VEHICLE_GENERIC_FACTOR;
      }
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'de'))
    .slice(0, limit);
}

// ─── Abschnitts-Retrieval (THI Abschnitts-Zitate) ───────────────────────────
// Sucht auf ABSCHNITTSEBENE (H2/H3) statt nur artikelweise — damit Thi exakt die
// jeweilige Stelle (route#anker) zitieren/verlinken kann und Sub-Themen, die im
// Artikel-Scoring von einem dominanten Produktnamen verdrängt werden (z. B.
// „Zusatzhupe an Pin …" steht in einem Abschnitt von sirenen-hupen, nicht im
// Top-Artikel wipro-iii), eigenständig auffindbar werden. Gleiche Normalisierung
// und FAQ-Abwertung wie searchWiki; gewichtet Überschrift > Pfad > Titel > Text.
export function searchSections(sectionIndex, query, access, lang = 'de', limit = 6) {
  const q = normalizeSearch(query).trim();
  if (q.length < 2) return [];
  const terms = retrievalTerms(query);
  const candidates = (sectionIndex || [])
    .filter((s) => s.lang === lang)
    .filter((s) => access.canViewInternal || s.visibility !== 'internal');
  const weights = termWeights(candidates, terms);
  const vehicleIntent = hasVehicleIntent(query);

  return candidates
    .map((s) => {
      const fields = normalizedFields(s);
      let score = 0;
      let matches = 0;
      for (const term of terms) {
        if (!fields.all.includes(term)) continue;
        matches += 1;
        const weight = weights.get(term) || 1;
        if (fields.heading.includes(term)) score += 14 * weight;
        if (fields.slug.includes(term)) score += 9 * weight;
        if (fields.title.includes(term)) score += 5 * weight;
        if (fields.body.includes(term)) score += 1.5 * weight;
      }
      score *= coverageFactor(matches, terms.length);
      score += matches * matches;
      if (score > 0 && FAQ_DEMOTE_TYPES.has(s.articleType)) score *= FAQ_DEMOTE_FACTOR;
      if (score > 0 && s.articleType === 'vehicle' && !vehicleIntent) {
        score *= VEHICLE_GENERIC_FACTOR;
      }
      // Intro-Abschnitte (anchor '') stark abwerten: ihre „Überschrift" ist der
      // ganze Artikel-H1 (= Produktname), der in fast JEDER Produktfrage matcht und
      // sonst die spezifischen H2/H3 verdrängt — und ein ankerloser Intro ist
      // ohnehin kein Deep-Link-Ziel. So gewinnt der konkrete, verlinkbare Abschnitt.
      if (score > 0 && !s.anchor) score *= SECTION_INTRO_DEMOTE;
      return { ...s, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || (b.heading?.length || 0) - (a.heading?.length || 0))
    .slice(0, limit);
}

// Wählt für einen bereits gefundenen Artikel (route) den am besten zur Frage
// passenden Abschnitt — so bekommt ein artikelweiser Treffer einen präzisen
// Anker. Gibt { anchor, heading, headingPath, score } zurück oder null. Bevorzugt
// einen Treffer mit Anker; ein reiner Intro-Abschnitt (Anker '') gilt nur als
// schwacher Fallback.
export function bestSectionForRoute(sectionIndex, route, query, lang = 'de') {
  const terms = retrievalTerms(expandSearchQuery(query));
  if (!terms.length) return null;
  const candidates = (sectionIndex || []).filter((s) => s.route === route && s.lang === lang);
  const weights = termWeights(candidates, terms);
  let bestAnchored = null; // bester echter Unterabschnitt (H2/H3, verlinkbar)
  let bestAny = null; // bester Treffer überhaupt (inkl. Intro ohne Anker)
  for (const s of candidates) {
    const fields = normalizedFields(s);
    let score = 0;
    let matches = 0;
    for (const term of terms) {
      if (!fields.heading.includes(term) && !fields.body.includes(term)) continue;
      matches += 1;
      const weight = weights.get(term) || 1;
      if (fields.heading.includes(term)) score += 12 * weight;
      if (fields.body.includes(term)) score += 1.5 * weight;
    }
    if (score <= 0) continue;
    score *= coverageFactor(matches, terms.length);
    score += matches * matches;
    const hit = { anchor: s.anchor, heading: s.heading, headingPath: s.headingPath, score };
    if (!bestAny || score > bestAny.score) bestAny = hit;
    if (s.anchor && (!bestAnchored || score > bestAnchored.score)) bestAnchored = hit;
  }
  // Konkreten, verlinkbaren Unterabschnitt bevorzugen; nur wenn keiner zur Frage
  // passt, auf den Intro (Anker '' → Artikelanfang) zurückfallen.
  return bestAnchored || bestAny;
}

// ─── Produkt-Aliasse (Quick Win 2) ──────────────────────────────────────────
// Umgangssprache/Schreibvarianten → kanonische Wiki-Slugs/-Begriffe. Die
// Muster laufen auf dem NORMALISIERTEN Text (Umlaute bereits ae/oe/ue).
// Kanonische Begriffe sind echte Slugs aus wiki/de (Treffer auf slug = Score 5).
export const PRODUCT_ALIASES = [
  [/wipro\s*-?\s*(3|iii)\b|wipro3|wi\s+pro\b/, 'wipro-iii'],
  [/alarmanlage|alarmsystem|funk-?alarm/, 'wipro-iii'],
  [/g\.?\s?a\.?\s?s\.?[\s-]*pro|gas\s*-?\s*pro|gaspro|gaswarner|gasalarm|narkosegas|betaeubungsgas/, 'gas-pro-iii gas-pro'],
  [/ortung|\bgps\b|tracker|tracking|peilsender|orten\b/, 'pro-finder'],
  [/pro\s*-?\s*finder|profinder/, 'pro-finder'],
  [/bt\s*-?\s*connect|btconnect|\bbluetooth\b/, 'bt-connect'],
  [/fernbedienung|hand\s*-?\s*sender/, 'funk-handsender'],
  [/magnetkontakt|tuer\s*-?\s*kontakt|fensterkontakt/, 'funk-magnetkontakt'],
  [/\bnfc\b|schluesselkarte/, 'nfc-modul'],
  [/sirene|\bhupe\b/, 'sirenen-hupen'],
  [/einlernen|\bpairing\b|koppeln\b/, 'anlernen'],
  // T.S.A. Funk-Rauchmelder: deckt Akronym (nach Entpunkten „tsa"), Kompositum
  // („funkrauchmelder" ohne Bindestrich), Bindestrich-/Leerzeichen-Variante und
  // Umgangssprache („rauchmelder"/„brandmelder") ab und kanonisiert auf den Slug
  // „funk-rauchmelder" (+5). \btsa\b ist in dieser geschlossenen Produkt-Wiki
  // eindeutig die Rauchmelder-Linie; der Alias hängt nur den Slug-Token an,
  // verdrängt also nichts.
  [/\btsa\b|funk[-\s]?rauchmelder|rauchmelder|brandmelder/, 'funk-rauchmelder'],
];

// Hängt für erkannte Umgangssprache die kanonischen Begriffe an die Query an.
// Gibt die Original-Query (unnormalisiert) + Zusatzbegriffe zurück — die
// Suche normalisiert selbst.
export function expandSearchQuery(query) {
  const norm = normalizeSearch(query);
  if (!norm.trim()) return query;
  const extras = [];
  for (const [pattern, canonical] of PRODUCT_ALIASES) {
    if (!pattern.test(norm)) continue;
    for (const term of canonical.split(/\s+/)) {
      if (!norm.includes(term) && !extras.includes(term)) extras.push(term);
    }
  }
  return extras.length ? `${query} ${extras.join(' ')}` : query;
}

// ─── Gesprächskontext in die Retrieval-Query mischen (Quick Win 1) ──────────
const STOPWORDS_DE = new Set([
  'aber', 'als', 'am', 'an', 'auch', 'auf', 'aus', 'bei', 'bin', 'bitte', 'bis',
  'da', 'damit', 'dann', 'das', 'dass', 'dem', 'den', 'denn', 'der', 'des',
  'die', 'diese', 'dieser', 'dieses', 'doch', 'dort', 'du', 'durch', 'ein',
  'eine', 'einem', 'einen', 'einer', 'eines', 'er', 'es', 'etwas', 'fuer',
  'geht', 'gibt', 'habe', 'haben', 'hat', 'hier', 'ich', 'ihr', 'im', 'in',
  'ist', 'ja', 'kann', 'koennen', 'machen', 'mal', 'man', 'mehr', 'mein',
  'mich', 'mir', 'mit', 'muss', 'nach', 'nein', 'nicht', 'noch', 'nur', 'ob',
  'oder', 'ohne', 'sehr', 'sein', 'sich', 'sie', 'sind', 'so', 'soll', 'um',
  'und', 'uns', 'unter', 'vom', 'von', 'vor', 'war', 'warum', 'was', 'wenn',
  'wer', 'werden', 'wie', 'wieder', 'wird', 'wieso', 'wir', 'wo', 'zu', 'zum',
  'zur', 'tun', 'jetzt', 'dazu', 'davon', 'darauf', 'danach', 'denen', 'dies',
]);

// Aussagekräftige Begriffe einer (normalisierten) Query: keine Stoppwörter,
// mind. 3 Zeichen (oder Ziffern-haltig, z. B. "g5").
export function salientTerms(text) {
  return normalizeSearch(text)
    .split(/\s+/)
    .map((t) => t.replace(/^[^a-z0-9]+|[^a-z0-9.-]+$/g, ''))
    .filter((t) => t && !STOPWORDS_DE.has(t) && (t.length >= 3 || /\d/.test(t)));
}

// Baut die Retrieval-Query: kurze Folgefragen ("und wie lösche ich ihn?")
// erben die aussagekräftigen Begriffe der letzten Nutzerfrage(n); danach
// werden Produkt-Aliasse ergänzt. Lange, eigenständige Fragen bleiben
// unverändert (nur Alias-Erweiterung).
export function buildRetrievalQuery(query, prevUserTexts = []) {
  const own = salientTerms(query);
  let combined = query;
  if (own.length < 3) {
    const inherited = [];
    for (const prev of [...prevUserTexts].reverse()) {
      for (const term of salientTerms(prev)) {
        if (!own.includes(term) && !inherited.includes(term)) inherited.push(term);
      }
      if (inherited.length >= 4) break; // eine Vorgängerfrage reicht meist
    }
    if (inherited.length) combined = `${query} ${inherited.slice(0, 6).join(' ')}`;
  }
  return expandSearchQuery(combined);
}

// ─── Passagen-Fenster statt body.slice(0,800) (Quick Win 3) ─────────────────
// Sucht die erste Trefferstelle eines Query-Begriffs im Artikeltext und legt
// das Snippet-Fenster DARUM, statt stur den Artikelanfang zu nehmen. Gesucht
// wird im normalisierten Text; der Fundindex wird auf den Originaltext
// zurückgerechnet (Normalisierung ändert die Länge: ä→ae).
function originalIndexForNormalized(text, normIdx) {
  let consumed = 0;
  for (let i = 0; i < text.length; i++) {
    consumed += normalizeSearch(text[i]).length;
    if (consumed > normIdx) return i;
  }
  return text.length;
}

export function extractSnippet(body, query, size = 800) {
  const text = String(body || '');
  if (text.length <= size) return text;
  const ntext = normalizeSearch(text);
  const terms = salientTerms(query).sort((a, b) => b.length - a.length);
  let best = -1;
  for (const term of terms) {
    const idx = ntext.indexOf(term);
    if (idx >= 0) { best = idx; break; } // längster (spezifischster) Begriff gewinnt
  }
  if (best < 0) return text.slice(0, size);
  const hitAt = originalIndexForNormalized(text, best);
  let start = Math.max(0, hitAt - Math.floor(size / 4));
  if (start > 0) {
    const space = text.indexOf(' ', start);
    if (space >= 0 && space < hitAt) start = space + 1;
  }
  const slice = text.slice(start, start + size).trim();
  return `${start > 0 ? '… ' : ''}${slice}${start + size < text.length ? ' …' : ''}`;
}

// ─── Quellen-Übereinstimmung (Thi-Quellenanzeige) ───────────────────────────
// Wie stark deckt ein Artikel die NUTZERFRAGE ab? Anteil der signifikanten
// Begriffe (Stopwörter und < 3 Zeichen raus), die der Artikel enthält —
// prominente Treffer (Titel/Slug/Überschriften/Boost) zählen doppelt,
// Fließtext-Treffer einfach. 100 % = jeder Begriff prominent vorhanden.
// Lexikalische Abdeckung, keine semantische Garantie — als Orientierung
// für „wird meine Frage dort behandelt?" gedacht.
const MATCH_STOPWORDS = new Set([
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer',
  'und', 'oder', 'aber', 'auch', 'noch', 'schon', 'nur', 'sehr', 'bitte', 'danke',
  'ich', 'du', 'wir', 'ihr', 'sie', 'es', 'man', 'mein', 'meine', 'sich',
  'ist', 'sind', 'war', 'waren', 'wird', 'werden', 'kann', 'koennen', 'muss', 'muessen',
  'soll', 'sollen', 'darf', 'duerfen', 'hat', 'haben', 'gibt', 'geben',
  'gehoert', 'gehoeren', 'brauche', 'braucht', 'brauchen', 'moechte', 'moechten',
  'will', 'wollen', 'tun', 'machen', 'mache',
  'was', 'wie', 'wer', 'wem', 'wen', 'wo', 'wann', 'warum', 'wieso', 'weshalb',
  'welche', 'welcher', 'welches', 'welchen', 'welchem',
  'in', 'im', 'an', 'am', 'auf', 'aus', 'bei', 'mit', 'nach', 'von', 'vor',
  'zu', 'zum', 'zur', 'ueber', 'unter', 'fuer', 'gegen', 'ohne', 'um',
  'als', 'wenn', 'dann', 'denn', 'dass', 'beim', 'vom', 'durch',
]);

export function sourceMatchPercent(item, query) {
  const terms = normalizeSearch(query)
    .trim()
    .split(/\s+/)
    // Interpunktion strippen ("handsender?" → "handsender"), sonst matcht
    // weder das Stopwort-Set noch der Artikeltext.
    .map((t) => t.replace(/[^\p{L}\p{N}-]/gu, ''))
    .filter((t) => t.length >= 3 && !MATCH_STOPWORDS.has(t));
  if (!terms.length) return null;
  const prominent = normalizeSearch(
    `${item.title} ${item.slug} ${item.headings} ${item.boostKeywords}`,
  );
  const body = normalizeSearch(`${item.excerpt} ${item.body} ${item.keywords}`);
  let points = 0;
  for (const t of terms) {
    if (prominent.includes(t)) points += 2;
    else if (body.includes(t)) points += 1;
  }
  return Math.round((100 * points) / (2 * terms.length));
}

// ─── Verwandte Artikel bei 0 Treffern (Quick Win 5) ─────────────────────────
// Lockere Einzelbegriff-Suche: jeder aussagekräftige Begriff sucht für sich
// (lange Begriffe zusätzlich als Präfix, z. B. "anlernprozedur" → "anlern"),
// die Ergebnisse werden nach Score vereinigt.
export function findRelatedArticles(searchIndex, query, access, lang = 'de', limit = 3) {
  const terms = salientTerms(expandSearchQuery(query)).sort((a, b) => b.length - a.length);
  const byRoute = new Map();
  for (const term of terms) {
    const probes = term.length >= 8 ? [term, term.slice(0, 6)] : [term];
    for (const probe of probes) {
      for (const hit of searchWiki(searchIndex, probe, access, lang, limit)) {
        const prev = byRoute.get(hit.route);
        if (!prev || hit.score > prev.score) byRoute.set(hit.route, hit);
      }
      if (byRoute.size >= limit * 2) break;
    }
  }
  return [...byRoute.values()].sort((a, b) => b.score - a.score).slice(0, limit);
}

// ─── Kuratierte Quiz-Verweise als Zusatzkontext (Quick Win 6) ───────────────
// Die Händler-Quizze tragen seit AP2 kuratierte Wiki-Verweise pro Frage
// (wiki_refs). Wenn die Nutzerfrage einer Quizfrage ähnelt, sind deren
// Verweise hochwertige Retrieval-Hinweise.
//
// quizIndex: [{ prompt, refs: [{ route, label }] }] — siehe buildQuizRefIndex.
export function buildQuizRefIndex(dealerQuizData) {
  const out = [];
  for (const quiz of dealerQuizData?.quizzes || []) {
    for (const question of quiz.questions || []) {
      const refs = [];
      for (const answer of question.answers || []) {
        const route = answer?.wikiRef;
        if (route && !refs.some((r) => r.route === route)) {
          refs.push({ route, label: answer.wikiLabel || '' });
        }
      }
      if (question?.prompt && refs.length) {
        out.push({ prompt: question.prompt, promptNorm: normalizeSearch(question.prompt), refs });
      }
    }
  }
  return out;
}

export function matchQuizRefs(quizIndex, query, maxRefs = 3) {
  const terms = salientTerms(expandSearchQuery(query));
  if (!terms.length) return [];
  const scored = [];
  for (const entry of quizIndex || []) {
    let score = 0;
    for (const term of terms) {
      // Spezifische (lange) Begriffe wie „anlernen"/„magnetkontakt" zählen
      // doppelt — ein einzelner starker Treffer reicht, ein einzelner
      // generischer (z. B. „gas") nicht.
      if (entry.promptNorm.includes(term)) score += term.length >= 6 ? 2 : 1;
    }
    if (score >= 2) scored.push({ entry, score });
  }
  scored.sort((a, b) => b.score - a.score);
  const routes = [];
  for (const { entry } of scored) {
    for (const ref of entry.refs) {
      if (!routes.some((r) => r.route === ref.route)) routes.push(ref);
      if (routes.length >= maxRefs) return routes;
    }
  }
  return routes;
}

/**
 * Mischt redaktionell kuratierte Quiz-Verweise in das normale Suchergebnis.
 *
 * Die frühere Implementierung hing Verweise nur an, solange weniger als acht
 * lexikalische Treffer vorhanden waren. Im realen Wiki ist das praktisch nie
 * der Fall. Dadurch blieb die kuratierte Wissensbasis wirkungslos. Bestehende
 * Top-3-Treffer bleiben unverändert; weiter hinten liegende oder fehlende
 * Referenzen werden ab Rang 2 eingefügt.
 */
export function mergeCuratedHits(
  searchIndex,
  hits,
  refs,
  access,
  lang = 'de',
  limit = 8,
) {
  const merged = [...(hits || [])];
  let insertionIndex = Math.min(1, merged.length);
  const handledRoutes = new Set();

  for (const ref of refs || []) {
    const route = String(ref?.route || '').split('#')[0];
    if (!route || handledRoutes.has(route)) continue;
    handledRoutes.add(route);

    const existingIndex = merged.findIndex((hit) => hit.route === route);
    if (existingIndex >= 0 && existingIndex < 3) continue;

    let item = null;
    if (existingIndex >= 0) {
      [item] = merged.splice(existingIndex, 1);
    } else {
      item = (searchIndex || []).find(
        (candidate) => candidate.route === route
          && candidate.lang === lang
          && (access?.canViewInternal || candidate.visibility !== 'internal'),
      );
    }
    if (!item) continue;

    merged.splice(insertionIndex, 0, item);
    insertionIndex += 1;
  }

  const seen = new Set();
  return merged
    .filter((item) => {
      const key = `${item.lang || lang}|${item.route}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}
