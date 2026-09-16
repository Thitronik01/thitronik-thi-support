# THI-RAG-Überarbeitung — 2026-06-18

> Vollständige Doku der Diagnose + Behebung der THI-Chatbot-Probleme („THI tut nicht
> das, was ich will / hat keinen echten Bezug zum Wiki"). Steuerdokument bleibt
> `docs/MASTERPLAN.md`; THI-Architektur im Überblick: `AGENTS.md` §14.

## TL;DR

THI war faktisch **kaputt** (das konfigurierte KI-Modell wurde vom Provider abgekündigt →
HTTP 404 bei jedem Aufruf) und hatte zusätzlich **Grounding-** und **Retrieval-Schwächen**.
Nach dieser Runde:

| Kennzahl | Vorher | Nachher |
|---|---|---|
| THI funktionsfähig | nein (404) | **ja** |
| Retrieval **Hit@8** (`thi:eval`, 97 Fälle) | 57,7 % | **70,1 %** |
| **Grounding-Treue** (`thi:answer-eval --judge`, 41 Fälle) | — | **39/41 = 95,1 %** (effektiv ~40/41) |

Einziger echter Rest: **Pin-/Zusatzhupe-Fall** = harte Grenze rein lexikalischer Suche
(→ semantische Suche/pgvector als nächste Stufe).

---

## 1. Ausgangslage

Mehrere Tests des Eigentümers zeigten falsche/unbrauchbare THI-Antworten. Konkreter
Auslöser-Fall: „Brauche ich eine WiPro III, um einen T.S.A. Funk-Rauchmelder zu betreiben?"
→ THI behauptete **„ja, zwingend"**, obwohl das Wiki ausdrücklich sagt, der T.S.A. sei
**standalone immer nutzbar**. Latenz war ausdrücklich unkritisch (30 s ok), solange die
Antwort aus dem Wiki kommt.

## 2. Diagnose-Methodik

- **Code-Tiefenanalyse** des Retrieval-/RAG-Pfads (`lib/search-core.js`, `lib/thi-tools.js`,
  `app/api/thi/route.js`, `scripts/wiki-ingest.mjs`).
- **Live-Reproduktion** gegen den laufenden Dev-Server (`thitronik-dev-local-auth`, Port 3011,
  `THI_REQUIRE_AUTH=false`) mit temporärem Logging — um zu sehen, was THI **tatsächlich**
  retrievt, liest und antwortet.
- **Messbar gemacht** über zwei Eval-Skripte (s. §4).

## 3. Befunde & Behebung

### 3.1 KRITISCH: Totes KI-Modell (Commit `90fd736`)
`THI_MODEL=google/gemini-2.5-flash` wurde von Anymize **abgekündigt** → die API antwortete
mit `HTTP 404 model_not_found`, d. h. **jeder echte THI-Aufruf scheiterte**. Das war
höchstwahrscheinlich die Hauptursache für „THI tut nicht, was ich will".

- Anymize-Modell-Liste abgefragt (`GET …/api/v1/llm-anonymous/models`).
- Umgestellt auf **`anthropic/claude-sonnet-4.6`** (zuverlässige, vollständig wiki-gegründete
  Antworten; E2E `thi:tools` 11/11). Alternativen: `google/gemini-3.5-flash` (günstiger, lieferte
  im Test aber leere Endantworten), `anthropic/claude-opus-4.8` (stärker, teurer).
- ⚠️ **Der Modellname steht in `.env.local` (gitignored)** — Konsequenz s. §5.

### 3.2 Retrieval-Qualität (Commit `90fd736`)
- **FAQ-Entflutung:** FAQ-/Anleitungs-PDFs fluteten den Index (de: 82/147 Einträge) und
  verdrängten kanonische Artikel. In `searchWiki` (`lib/search-core.js`) werden `articleType`
  `faq`/`anleitung` jetzt **abgewertet** (Faktor `0.4`, per ENV `THI_FAQ_DEMOTE` justierbar) —
  Abwertung, kein Ausschluss. → Hit@8 57,7 % → 69,1 %.
- **Body-Cap angehoben** (`scripts/wiki-ingest.mjs`): Artikel `6000 → 16000`, Anleitungen
  `6000 → 12000`. Vorher waren 65/147 de-Artikel abgeschnitten (Inhalt für Suche/RAG unsichtbar).
- **Mehr Wiki-Text ans Modell:** `lib/thi-tools.js` `MAX_TOOL_RESULT_CHARS 6000 → 16000`,
  `SNIPPET_CHARS 420 → 1000`; Kontext-Auszug in `route.js` `800 → 2500`.

### 3.3 SYSTEMISCHER Ingest-Bug: Blockquotes verschwanden (Commit `e8400df`)
`extractPlainText()` (`scripts/wiki-ingest.mjs`) rief `.replace(/^---[\s\S]*?---/m, '')` auf,
um das Frontmatter zu strippen — das macht aber `gray-matter` bereits. Auf dem (frontmatter-
freien) Body löschte die Regex stattdessen **alles zwischen den ersten beiden `---`-Trennlinien**.
Da fast jeder Artikel `---` als Abschnittstrenner nutzt, fehlten so **ganze Abschnitte inkl.
`> **WICHTIG:**`-Sicherheitshinweise** komplett in Suche UND RAG.

- Ursache des Feuerzeuggas-Fehlers („Test … nicht möglich" war verschwunden).
- **Zeile entfernt** (nur ein Aufrufer, der bereits `parsed.content` übergibt). Effekt indexweit:
  Ø-de-Artikel-Body **3.950 → 5.837 Zeichen** (Inhalt zurückgeholt).

### 3.4 Grounding: Wortlaut schlägt Annahme (Commits `7bc57d9`, `327a364`)
THI überschrieb expliziten Wiki-Wortlaut mit Vorannahmen (z. B. „Zubehör *für* WiPro III ⇒
*braucht* WiPro III", verstärkt durch Artikeltitel). System-Prompt (`route.js`, Tool- und
Nicht-Tool-Variante) gehärtet:
- **WORTLAUT SCHLÄGT ANNAHME:** explizite Aussagen haben Vorrang vor Produktname/Titel/Vorwissen;
  nie von Produktkategorie auf zwingende Voraussetzung schließen.
- **Volltext lesen** bei Voraussetzungs-/Ja-Nein-/Kompatibilitäts-/Detail-Fragen (`artikel_lesen`)
  und Beleg zitieren.
- **KEINE-ANGABE-FALLE:** bevor THI behauptet, das Wiki sage zu etwas nichts, erst den Volltext lesen.

### 3.5 Top-Quellen-Volltext-Anreicherung (Commit `e8400df`)
Der Client schickt nur ~800-Zeichen-Snippets als Kontext — benachbarte Fakten (z. B.
„empfohlen: Panasonic / **nicht empfohlen: Duracell**") wurden zerschnitten. `route.js` reichert
jetzt die **Top-2-Kontextquellen serverseitig mit Volltext** aus dem Runtime-Index an
(`buildContextBlock`-Cap für angereicherte Einträge `2500 → 6000`). Verlässlicher, als auf eine
Tool-Lese-Entscheidung des Modells zu hoffen. Behebt den Duracell-Fall.
- **Nebenwirkung:** verankert auf den Top-Artikel — wenn der falsch ist (Pin-Fall, s. §6),
  unterdrückt es THIs eigene Tool-Suche. Bewusst akzeptiert; Pin ist ein Retrieval-, kein
  Grounding-Problem.

### 3.6 `sirenen-hupen`-Boost (Commit `e8400df`)
`CANONICAL_BOOST` um `sirenen-hupen` (Hupe/Zusatzhupe/Pin) ergänzt — hilft, reicht aber gegen
die „WiPro III"-Dominanz allein nicht (s. §6).

## 4. Das Eval-System (Gold-Set + Judge)

Zwei komplementäre Skripte. **Beide messen aus Händler-Sicht (`canViewInternal:false`).**

### 4.1 Retrieval: `npm run thi:eval` (`scripts/thi-rag-eval.mjs`)
Misst, ob die **richtige Quelle** im Top-8-Fenster landet (Hit@3/Hit@8/MRR) über die Quiz-
`wikiRefs` + `project-data/thi-eval-extra.de.json`. Offline, schnell, ohne Modell-Aufruf.
Als CI-Gate: `--min-hit8 <prozent>`.

### 4.2 Grounding/Antwort-Treue: `npm run thi:answer-eval` (`scripts/thi-answer-eval.mjs`) — NEU
Misst, ob die **Antwort faktisch korrekt UND aus dem Wiki** kommt — die Lücke, die `thi:eval`
nicht abdeckt (Quelle gefunden ≠ Antwort korrekt). Bildet den echten Client-Fluss nach
(searchWiki Top-8 + Snippet als Kontext) und ruft den **laufenden** `/api/thi` auf.

- **Voraussetzung:** laufender Dev-Server (am einfachsten `thitronik-dev-local-auth`, Port 3011).
  Ziel-URL via `THI_EVAL_URL` überschreibbar.
- **Zwei Modi:**
  - *Substring* (Standard): prüft `antwort_muss` / `antwort_darf_nicht`. Billig, aber spröde
    (Synonyme/Verneinungen → False-Fails).
  - **`--judge`**: ein LLM (Anymize, `THI_JUDGE_MODEL || THI_MODEL`) bewertet semantisch
    „Antwort korrekt + durch Beleg gedeckt?". **Empfohlen** — keine Formulierungs-Artefakte.
- Flags: `--verbose`, `--min <%>` (CI-Gate), `--limit n`, ENV `THI_GOLD_FILE=<datei>` (Subset).
- **Gold-Set:** `project-data/thi-eval-gold.de.json` — 41 verifizierte Fälle, aus den Wiki-
  Artikeln geschürft + adversarial geprüft (wörtliche Belege + `datei.md:zeile`), verteilt über
  `negation / voraussetzung / fakt / standalone / kompatibilitaet`. Feld-Schema pro Fall:
  `id, question, expected[], antwort_muss[], antwort_darf_nicht[], beleg, source, kategorie`.

**Hinweis zur Gold-Pflege:** Findet der Judge einen „Fehler", erst prüfen, ob THI tatsächlich
falschliegt — oder ob der **Gold-Beleg unvollständig** ist (so geschehen beim Panik-Fall: THI
war korrekter als der Beleg). Dann den Gold-Fall korrigieren.

## 5. Betrieb — WICHTIG

- **`THI_MODEL` lebt in `.env.local` (gitignored).** Auf JEDER deployten Umgebung muss
  `THI_MODEL=anthropic/claude-sonnet-4.6` (oder ein anderes **gültiges** Anymize-Modell) gesetzt
  sein — sonst ist THI dort wieder kaputt (404). Gültige Modelle ggf. via
  `GET <Anymize_API_URL-Basis>/models` prüfen.
- Provider-Steuerung: `THI_PROVIDER` (`anthropic` | `anymize`), Key `Anymize_API_KEY` bzw.
  `ANTHROPIC_API_KEY`, Endpoint `Anymize_API_URL`. Agentic Tools nur bei `anymize` (`THI_TOOLS`).
- Nach jeder Wiki-Änderung: `npm run wiki:ingest` (baut Such-Index neu; Runtime-Index wird vom
  laufenden Server per mtime-Check automatisch übernommen).

## 6. Offene Punkte / nächste Stufen

1. **Pin-/Zusatzhupe-Fall (lexikalische Grenze):** „An welchen Pin … Zusatzhupe?" — „WiPro III"
   in der Frage zieht `wipro-iii` (Score 58) hoch; die Antwort steht in `sirenen-hupen`
   (Score 22 trotz Boost). Pure lexikalische Suche kann das nicht lösen → **semantische Suche /
   Embeddings (pgvector)** ist die nächste echte Stufe.
2. **Abschnitts-Chunking:** ✅ ERLEDIGT am 2026-06-19 — H2/H3-Sektions-Chunking beim Ingest
   (`section-index.json`), Abschnitts-Retrieval (`searchSections`) und `route#anker`-Zitate/
   Deep-Links. Voll dokumentiert in **`docs/THI_ABSCHNITTS_ZITATE_2026-06-19.md`**.
3. **Gold-Set erweitern:** echte Zweifelsfragen + Content-Gap-Log (`/admin/content-gaps`)
   einspeisen; als CI-Gate verdrahten (`thi:answer-eval --judge --min <%>`).

## 7. Datei-Referenz (Quick-Lookup)

| Thema | Datei |
|---|---|
| Lexikalisches Scoring, De-Flood, Normalisierung, Snippet | `lib/search-core.js` |
| Agentic Tools (`wiki_suchen`/`artikel_lesen`/`app_navigieren`), Runtime-Index | `lib/thi-tools.js` |
| Server-Route, System-Prompts, Kontext-Anreicherung, Provider | `app/api/thi/route.js` |
| Ingest, `extractPlainText`, Body-Caps, `CANONICAL_BOOST` | `scripts/wiki-ingest.mjs` |
| Retrieval-Eval (Hit@8) | `scripts/thi-rag-eval.mjs` |
| Grounding-Eval (Judge) | `scripts/thi-answer-eval.mjs` |
| Grounding-Gold-Set | `project-data/thi-eval-gold.de.json` |

## 8. Commit-Spur

| Commit | Inhalt |
|---|---|
| `90fd736` | Totes Modell ersetzt + Retrieval (De-Flood, Cap, Kontext) |
| `7bc57d9` | Grounding: Wortlaut schlägt Annahme |
| `196f007` | Grounding-Gold-Eval + Runner |
| `327a364` | LLM-Judge + Keine-Angabe-Falle |
| `e8400df` | Blockquote-Ingest-Bug + Volltext-Anreicherung + Boost + Panik-Gold-Korrektur |
