# THI — Abschnitts-Zitate & Deep-Links — 2026-06-19

> Fortsetzung von `docs/THI_RAG_UEBERARBEITUNG_2026-06-18.md` (offener Punkt §6.2
> „Abschnitts-Chunking"). Ziel des Eigentümers: **THI soll aus dem Wiki fehlerfrei
> zitieren UND auf die jeweilige Stelle (Abschnitt) verweisen.** THI-Architektur:
> `AGENTS.md` §14.

## TL;DR

THI zitierte bisher nur **artikelweise** (`/de/wipro-iii`). Jetzt retrievt und zitiert er
auf **Abschnittsebene** und verlinkt direkt auf die jeweilige Stelle (`/de/wipro-iii#batterie-wechsel`).

| Aspekt | Vorher | Nachher |
|---|---|---|
| Zitat-Granularität | ganzer Artikel | **H2/H3-Abschnitt** (`route#anker`) |
| Quellen-Chips im Chat | Artikel-Link | **Deep-Link auf den Abschnitt** + Abschnitts-Label |
| Modell-Quellenzeile | „Titel + Pfad" (frei, fehleranfällig) | „**Titel — Abschnitt**", keine erfundenen Pfade |
| Anker-Korrektheit | TOC-Anker wichen vom HTML ab (tote Sprünge) | **0 Abweichung** (github-slugger == rehypeSlug, 10 778 Headings) |
| Direkter `#anker`-Link | scrollte nicht (Body via innerHTML nach Hash-Scroll) | **scrollt + hebt Abschnitt hervor** |
| Retrieval-Eval | Hit@8 70,1 % | Artikel-Hit@8 **72,6 %** (keine Regression); Anker-Chip-Pfad **66 %** über 47-Fälle-Gold-Set |

## 1. Befunde (im Code/Browser verifiziert)

1. **Anker-IDs stimmten nicht überein.** Der Ingest erzeugte Heading-Anker mit einer
   selbstgebauten Slugifizierung (`extractHeadings`), das gerenderte HTML aber mit
   `rehypeSlug` (github-slugger). Bei Satzzeichen wichen sie ab (z. B. „… — …" → ein vs.
   zwei Bindestriche) → schon **TOC-Sprünge liefen ins Leere**, und jeder Deep-Link hätte
   den Fehler geerbt.
2. **Kein Retrieval/Zitat auf Abschnittsebene.** Retrievable-Einheit war der ganze Artikel.
3. **Direkte `#anker`-Links scrollten nicht.** `WikiArticleView` spritzt das HTML per
   `innerHTML` in einem Layout-Effekt ein — NACH dem nativen Hash-Scroll des Browsers.
4. **Quellen waren nicht verifiziert.** Die „Quellen:"-Zeile war frei vom Modell generiert
   (Pfad/Titel konnten falsch sein).

## 2. Umsetzung

### 2.1 Anker-Fundament (`scripts/wiki-ingest.mjs`)
- `extractHeadings` nutzt jetzt **eine frische `github-slugger`-Instanz pro Datei** in
  Dokumentreihenfolge → IDs identisch zu `rehypeSlug`/HTML (über 837 Artikel / 10 778
  Headings: **0 Abweichung**). Repariert nebenbei die kaputten TOC-Sprünge.

### 2.2 Abschnitts-Index (`scripts/wiki-ingest.mjs`)
- Neue Funktion `buildSections(markdown, headings)` zerlegt jeden Artikel an H2/H3-Grenzen.
  Jeder Abschnitt trägt `anchor` (= heading.id), `headingPath` („Montage › Variante 2"),
  Level und Klartext. Inhalt vor der ersten H2/H3 = **Intro** (bewusst **ohne Anker** — die
  Artikel-Ansicht entfernt die titelgleiche H1; ein H1-Anker liefe ins Leere → Intro-Link
  zeigt auf den Artikelanfang).
- Ausgabe: `project-data/runtime/wiki/section-index.json` (voll, inkl. intern) +
  `public/section-index.json` (öffentlich) — 10 680 Abschnitte (9 929 öffentlich).

### 2.3 Abschnitts-Retrieval (`lib/search-core.js`)
- `searchSections(sectionIndex, query, access, lang, limit)` — gleiche Normalisierung/
  FAQ-Abwertung wie `searchWiki`; nutzt `salientTerms` (strippt Satzzeichen → „rauchmelder?"
  matcht).
- `bestSectionForRoute(sectionIndex, route, query)` — wählt für einen Artikel-Treffer den
  am besten passenden **Unterabschnitt mit Anker** (Intro nur als Fallback).
- **Scoring-Verfeinerungen (gegen das Gold-Set getunt, §2.7):**
  - **Intro-Abwertung** (`THI_SECTION_INTRO_DEMOTE`, Default 0.25): ankerlose Intro-Abschnitte
    (ihre „Überschrift" = Artikel-H1 = Produktname) verdrängten sonst die spezifischen H2/H3.
  - **Titel-bewusstes Scoring:** Ein Query-Begriff, der im **Artikeltitel** steht (= Produkt-/
    Identitätsbegriff), gibt KEINEN Überschrift-Bonus — er unterscheidet die Abschnitte eines
    Artikels nicht. Sonst gewann der Abschnitt, dessen Überschrift bloß den Produktnamen
    wiederholt (z. B. „… G.A.S.-pro III/CO"), bei JEDER Produktfrage. Nur abschnitts-spezifische
    Begriffe (DIP, Kabelquerschnitt, Stummschaltung …) zählen für die Überschrift.

### 2.4 Client (`app/thi/page.js`, `lib/wiki-context.js`, `lib/wiki-runtime.js`)
- Bootstrap (`/api/wiki/bootstrap`) liefert den **rollengefilterten** `sectionIndex` mit
  (Händler: ohne interne Abschnitte). `WikiDataProvider` stellt ihn bereit.
- THI hängt jedem Quell-Treffer den besten Abschnitt an (`anchor`, `headingPath`) und fügt
  starke **eigenständige Abschnitte aus anderen Artikeln** als Zusatzkontext ein (fängt
  Sub-Themen, die das artikelweise Scoring verdrängt). Quellen-Chips verlinken auf
  `route#anker` und zeigen den Abschnitts-Pfad.

### 2.5 Server-Route & Tools (`app/api/thi/route.js`, `lib/thi-tools.js`)
- `buildContextBlock` rendert `[i] Titel — Abschnitt: … (route#anker)`.
- System-Prompts (beide Varianten) gehärtet: **nur über die bereitgestellten Quellen zitieren,
  niemals Pfad/Anker erfinden**, „Quellen:" als „Titel — Abschnitt" (die App zeigt die
  geprüften, anklickbaren Deep-Links darunter).
- Agentische Tools: `wiki_suchen` liefert pro Treffer `route#anker`, `artikel_lesen` hängt
  einen **Abschnitts-TOC** (`route#anker — Überschrift`) an.

### 2.6 Artikel-Ansicht (`components/wiki/WikiArticleView.js` + `app/globals.css`)
- Nach dem `innerHTML`-Einspritzen wird **synchron** zum `location.hash`-Abschnitt gescrollt
  (`scrollToCurrentHash`); zusätzlich auf `hashchange` (In-Page-Sprünge). Der angesprungene
  Abschnitt blitzt kurz auf (`.wiki-section-target`, CI-Cyan).
- ⚠️ Bewusst **`scrollIntoView({behavior:'auto'})`** (instant) statt `smooth` und **synchron
  statt `requestAnimationFrame`**: smooth wurde im langen Scroll-Container
  (`main.page-content`) je nach Artikel verworfen, rAF feuert im Headless-/Hintergrund-Kontext
  unzuverlässig. Headings haben `scroll-margin-top: 90px` (Sprungziel unter der Sticky-Topbar).

### 2.7 Eval & Gold-Set (`scripts/thi-rag-eval.mjs`, `project-data/thi-anchor-gold.de.json`)
- Neue **Anker-Hit@3/@8**-Metrik (`searchSections`) für alle Fälle mit `anchor`-Feld, plus
  Kategorie-Aufschlüsselung und CI-Gate `--min-anchor8 <prozent>`.
- **Anker-Gold-Set (47 Fälle):** per Multi-Agent-Workflow (`thi-anchor-gold`) generiert
  (69 Kandidaten) und **adversarial verifiziert** (47 bestätigt), danach jede `route#anker`
  gegen den Abschnitts-Index validiert. Realistische Händler-/Monteurfragen mit wörtlichem
  Beleg, verteilt über alle 35 Kern-Artikel und Kategorien (wert/vorgehen/fakt/kompatibilitaet/
  voraussetzung/sicherheit). Liegt in `project-data/thi-anchor-gold.de.json`.
- **Gemessen (Händler-Sicht):**
  - **Chip-Pfad** (realistische UX: `searchWiki`→Artikel + `bestSectionForRoute`-Anker):
    **66 %** exakter Anker — der primäre Pfad der Quellen-Chips. Artikel-Hit@8 = 77 %.
  - **Standalone `searchSections`** Anker-Hit@8 = **52 %** (härtere Aufgabe; enthält
    Aggregator-Fälle wie `faq-master`, wo das Retrieval die *spezifischere* Produktquelle
    korrekt bevorzugt → kein echter Fehler, aber gegen das strikte Gold ein „Miss").
  - Die zwei Scoring-Verfeinerungen (§2.3) hoben den Chip-Pfad von 55 % → 66 %.

## 3. Verifikation (2026-06-19)
- `npm test` (Node-Runner): **49/49**.
- `npm run thi:eval`: Artikel-Hit@8 **72,6 %** (keine Regression), Anker-Chip-Pfad **66 %**,
  standalone `searchSections` Anker-Hit@8 **52 %** (über 47-Fälle-Gold + 3 Extra).
- **Abschnitts-Index-Audit (alle 9 930 Anker):** 0 tote Anker (jeder zeigt auf eine
  existierende HTML-ID), 0 leere Überschriften, 0 Dubletten pro Route, 0 Leaks im öffentlichen
  Index, 539 reine Navi-Container (akzeptabel).
- Anker-Parität Ingest vs. HTML: **0 Abweichung** (10 778 Headings).
- Browser (lokale Auth, Port 3011, Händler-Login): Quellen-Chips deep-linken auf
  `route#anker` mit Abschnitts-Label; THI-Antwort zitiert „Funk-Handsender 868 —
  Batterie-Wechsel" (Duracell-Fall weiterhin korrekt); Klick auf Chip → Sprung auf den
  Abschnitt (Ziel bei 90px) + Hervorhebung; In-Page-`hashchange` ebenso.

## 4. Offene Punkte / nächste Stufen
1. **Standalone `searchSections` (52 %) < Chip-Pfad (66 %):** rein lexikalische Grenze. Größte
   verbleibende Hebel: (a) **semantische Suche / Embeddings (pgvector)** für Synonym-/
   Umschreibungsfragen (z. B. „wie lange heult der Alarm" → Abschnitt „Alarmdauer"); (b)
   leichte **IDF-/Feldgewichtung**, um abschnitts-fremde Allerweltsbegriffe weiter zu dämpfen.
2. **Aggregator-Gold-Fälle:** Einige Gold-Fälle zielen auf `faq-master`, obwohl das Retrieval
   die spezifischere Produktquelle (z. B. `mobilfunk-sim`) korrekt bevorzugt. Gold-Set ggf. um
   `altAnchors` (mehrere gültige Ziele) erweitern, damit die Metrik diese „Misses" nicht
   unfair zählt.
3. **CI-Gate:** `npm run thi:eval --min-anchor8 <prozent>` als Regressions-Schutz verdrahten
   (konservativ unter dem aktuellen Wert ansetzen).
4. Optional: Modell-`[n]`-Inline-Marker als klickbare Deep-Links rendern — derzeit bewusst
   NICHT umgesetzt: `lib/rich-text.js` erlaubt kein `]` im Link-Text, und die geprüften
   Quellen-Chips sind bereits der maßgebliche, fehlerfreie Deep-Link.

## 5. Datei-Referenz
| Thema | Datei |
|---|---|
| Anker-Slugger, `buildSections`, Abschnitts-Index-Ausgabe | `scripts/wiki-ingest.mjs` |
| `searchSections`, `bestSectionForRoute` | `lib/search-core.js` (re-export `lib/wiki.js`) |
| Bootstrap-Auslieferung (rollengegated) | `lib/wiki-runtime.js`, `lib/wiki-context.js` |
| Client-Retrieval + Quellen-Chips | `app/thi/page.js` |
| Kontextblock + Zitier-Prompts | `app/api/thi/route.js` |
| Agentische Tools (Anker + Abschnitts-TOC) | `lib/thi-tools.js` |
| Deep-Link-Scroll + Highlight | `components/wiki/WikiArticleView.js`, `app/globals.css` |
| Anker-Eval + Gate (`--min-anchor8`) | `scripts/thi-rag-eval.mjs` |
| Anker-Gold-Set (47 verifizierte Fälle) | `project-data/thi-anchor-gold.de.json` |
