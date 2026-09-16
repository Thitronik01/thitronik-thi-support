# RAG-Wissenstransfer — was wir im Thitronik-RAG teuer gelernt haben

> **Zweck dieses Dokuments:** Es ist die wichtigste Datei im Paket. Sie enthält die
> Befunde aus ~3 Monaten Arbeit am produktiven THI-RAG — jeder Punkt wurde
> gemessen, nicht vermutet. Wer den neuen Support-Bot baut, spart damit die
> komplette Diagnoseschleife.
>
> Vollständige Originaldokumentation: `referenz/THI_RAG_UEBERARBEITUNG_2026-06-18.md`
> und `referenz/THI_ABSCHNITTS_ZITATE_2026-06-19.md`.

---

## 0. Die Kernthese

Ein RAG über eine technische Produkt-Knowledge-Base scheitert **fast nie am Modell**.
Es scheitert an drei Stellen, in dieser Reihenfolge der Häufigkeit:

1. **Der Inhalt kommt gar nicht erst im Index an** (Ingest-Bugs, Text-Caps).
2. **Das Richtige wird nicht gefunden** (Retrieval-Scoring, Index-Flutung).
3. **Das Modell überschreibt den gefundenen Wortlaut mit Vorannahmen** (Grounding).

Wir haben an allen drei Stellen Blut gelassen. Messbare Wirkung:

| Kennzahl | Vorher | Nachher |
|---|---|---|
| Retrieval Hit@8 (97 Fälle) | 57,7 % | **72,6 %** |
| Grounding-Treue (41 Fälle, LLM-Judge) | — | **95,1 %** |
| Zitat-Genauigkeit (Abschnitts-Deep-Link) | Artikel | **H2/H3-Abschnitt, 66 % exakt** |
| Ø indexierter Artikeltext (DE) | 3.950 Z. | **5.837 Z.** |

---

## 1. Ingest — die stillen Totalausfälle

### 1.1 Der teuerste Bug: eine Regex, die Inhalte fraß

```js
// FALSCH — war monatelang drin:
markdown.replace(/^---[\s\S]*?---/m, '')   // sollte Frontmatter strippen
```

`gray-matter` hatte das Frontmatter **bereits** entfernt. Auf dem verbleibenden Body
löschte diese Regex alles **zwischen den ersten beiden `---`-Trennlinien**. Da fast
jeder Artikel `---` als Abschnittstrenner nutzt, verschwanden ganze Abschnitte —
inklusive der `> **WICHTIG:**`-Sicherheitshinweise — aus Suche **und** RAG.

Symptom war nicht „Suche schlecht", sondern: **Der Bot behauptete, das Wiki sage
nichts dazu.** Er hatte recht — es stand nicht im Index.

> **Lehre:** Nach jedem Ingest-Lauf den Ø-Body-Umfang pro Sprache loggen und
> gegen den Vorlauf vergleichen. Ein stiller Textverlust ist sonst unsichtbar.
> Konkret: eine Handvoll bekannter Sätze („Kanarienvögel") nach dem Ingest im
> Index suchen und den Build failen lassen, wenn sie fehlen.

### 1.2 Body-Caps schneiden die Antwort ab

Artikel wurden bei 6.000 Zeichen gekappt — **65 von 147 DE-Artikeln** waren
betroffen. Der abgeschnittene Teil war für Suche und RAG schlicht nicht existent.
Und weil technische Details (Tabellen, Pin-Belegungen, Ausnahmen) typischerweise
**hinten** im Artikel stehen, traf der Cap systematisch das Wertvollste.

Angehoben auf: Artikel **16.000**, Anleitungen **12.000**.

> **Lehre für den neuen Bot:** Caps nicht raten. Die Verteilung der Artikellängen
> messen und den Cap über das 95. Perzentil legen. Beim Chunking entfällt das
> Problem ohnehin weitgehend — aber dann muss jeder Chunk vollständig sein.

### 1.3 Anker müssen exakt dem gerenderten HTML entsprechen

Der Ingest erzeugte Heading-Anker mit einer selbstgebauten Slugifizierung, das
gerenderte HTML aber mit `rehypeSlug` (github-slugger). Bei Satzzeichen wichen
sie ab („… — …" → ein vs. zwei Bindestriche) → **jeder Deep-Link lief ins Leere**.

Lösung: **eine frische `github-slugger`-Instanz pro Datei**, in Dokumentreihenfolge.
Über 837 Artikel / 10.778 Headings: **0 Abweichung**.

> **Lehre:** Wenn der Bot auf eine Stelle verlinken soll, muss die Anker-Erzeugung
> im Ingest und im Renderer **dieselbe Bibliothek** sein. Und: Audit-Skript, das
> jeden Anker gegen die existierenden HTML-IDs prüft (wir: 0 tote Anker von 9.930).

---

## 2. Retrieval — was das Scoring wirklich entscheidet

### 2.1 Index-Flutung: FAQ-PDFs verdrängen die Fachartikel

Die FAQ-/Anleitungs-PDFs stellten **82 von 147 DE-Index-Einträgen**. Sie enthalten
generische Begriffe („FAQ", „häufige Fragen", Produktnamen in *jeder* Frage) und
verdrängten die kanonischen Artikel aus dem Top-8-Fenster.

Lösung: **multiplikative Abwertung, kein Ausschluss** (Faktor 0,4, per ENV
justierbar). Ein deutlich stärkerer PDF-Treffer gewinnt weiterhin; bei
vergleichbarer Deckung steht der Fachartikel vorn. → Hit@8 57,7 % → 69,1 %.

```js
const FAQ_DEMOTE_TYPES = new Set(['faq', 'anleitung']);
if (score > 0 && FAQ_DEMOTE_TYPES.has(item.articleType)) score *= FAQ_DEMOTE_FACTOR;
```

> **Lehre:** Abwerten statt filtern. Ein harter Ausschluss kostet die Fälle, in
> denen das FAQ tatsächlich die beste Quelle ist. Und: Dokumenttypen **beim Ingest**
> sauber vergeben — ohne `articleType` gibt es keinen Hebel.

### 2.2 Dieselbe Falle ein zweites Mal: Fahrzeugartikel

Die 30 Fahrzeugartikel enthalten ausführliche Einbauanleitungen und damit sehr
viele allgemeine Begriffe (Montage, Batterie, CAN, Prüfung, Alarm). Ohne konkretes
Fahrzeugmodell in der Frage verdrängten sie die Produkt-/Diagnoseartikel.

Lösung: **intent-abhängige Abwertung** — Faktor 0,35, aber **nur wenn die Frage
kein Fahrzeug nennt**:

```js
const VEHICLE_QUERY_RE = /\b(?:adria|boxer|citroen|crafter|ducato|fiat|ford|…)\b/;
if (score > 0 && item.articleType === 'vehicle' && !vehicleIntent) score *= 0.35;
```

> **Für den Support-Bot hochrelevant:** Die Formatvorlage liefert das Fahrzeug
> **strukturiert**. Damit ist `vehicleIntent` kein Ratespiel mehr, sondern ein
> harter Fakt — und die Fahrzeugartikel können bei passendem Modell sogar
> **hochgewichtet** statt abgewertet werden. Siehe `03_FALLAUFNAHME_SCHEMA.md`.

### 2.3 Deutsche Normalisierung ist keine Formalie

Reihenfolge ist entscheidend — und war anfangs falsch:

```js
.toLowerCase()
.replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')  // ZUERST
.normalize('NFD').replace(/[̀-ͯ]/g,'')                              // DANN
.replace(/\b(?:[a-z]\.){2,}/g, m => m.replace(/\./g,''))                      // Akronyme
```

Die Vorgängerversion strippte erst NFD-Akzente (ä→a), wodurch die ae/oe/ue-Regel
nie griff: getipptes „Tuerkontakt" fand „Türkontakt" nicht.

Die **Akronym-Entpunktung** ist Thitronik-spezifisch und wichtig: „T.S.A." → „tsa",
„G.A.S." → „gas". Sie greift bewusst nur bei ≥ 2 Einzelbuchstabe-Punkt-Paaren, damit
Versionen („1.1") und Artikelnummern („105753") unberührt bleiben.

> **Kritisch:** Query **und** Haystack müssen durch **dieselbe Funktion** — sonst
> entsteht Asymmetrie und Treffer verschwinden unerklärlich.

### 2.4 Produkt-Aliasse: Umgangssprache → kanonischer Slug

Monteure schreiben nicht „WiPro III", sondern „die Alarmanlage", „wipro3", „Wi Pro".

```js
[/wipro\s*-?\s*(3|iii)\b|wipro3|wi\s+pro\b/, 'wipro-iii'],
[/ortung|\bgps\b|tracker|peilsender|orten\b/, 'pro-finder'],
[/\btsa\b|funk[-\s]?rauchmelder|rauchmelder|brandmelder/, 'funk-rauchmelder'],
```

Der Alias **hängt den kanonischen Slug an die Query an**, ersetzt nichts. Damit
verdrängt er keine anderen Treffer. Vollständige Liste: `code/search-core.js`.

### 2.5 IDF-Gewichtung mit Deckel

```js
weights.set(term, Math.min(4, 1 + Math.log((total + 1) / (documentFrequency + 1))));
```

Seltene Fachbegriffe und Artikelnummern zählen stärker als „Montage" oder „prüfen".
Der **Deckel bei 4** verhindert, dass ein einzelner exotischer Begriff die ganze
Frage überstimmt — ohne ihn kippt das Ranking bei Tippfehlern.

### 2.6 Coverage-Faktor: wie viele Begriffe treffen?

```js
const coverage = matches / termCount;
return 0.55 + (0.45 * coverage);   // Dokument, das ALLE Begriffe hat, gewinnt
score += matches * matches;         // quadratischer Bonus für Mehrfachtreffer
```

Das ist der Hebel gegen Artikel, die einen Begriff 20-mal nennen, aber die anderen
drei gar nicht.

### 2.7 Die harte Grenze: rein lexikalische Suche

**Der Fall, den wir nicht lösen konnten:** „An welchen Pin kommt die Zusatzhupe bei
der WiPro III?" — „WiPro III" in der Frage zieht `wipro-iii` (Score 58) hoch; die
Antwort steht in `sirenen-hupen` (Score 22 trotz Boost).

Auch ein Keyword-Boost half nicht. **Das ist die Grenze.** Für Synonym- und
Umschreibungsfragen („wie lange heult der Alarm" → Abschnitt „Alarmdauer") braucht
es semantische Suche.

> **Klare Empfehlung für den neuen Bot: hybrid von Anfang an.**
> BM25/lexikalisch **plus** Embeddings, Ergebnisse per Reciprocal Rank Fusion
> zusammenführen. Die lexikalische Seite ist bei Artikelnummern, Seriennummern und
> exakten Produktbezeichnungen unschlagbar — die wirft man nicht weg. Die
> semantische Seite fängt genau die Fälle, an denen wir gescheitert sind.
> Details: `02_ZIELARCHITEKTUR.md`.

---

## 3. Chunking — Abschnitte statt Artikel

Retrievable Einheit war anfangs der **ganze Artikel**. Das ist bei 16.000-Zeichen-
Artikeln zu grob: Der Bot zitierte „siehe WiPro III" statt „siehe Abschnitt
Batterie-Wechsel".

Lösung: **Chunking an H2/H3-Grenzen** (`buildSections` in `code/wiki-ingest.mjs`).
Jeder Abschnitt trägt:

- `anchor` (= exakte HTML-Heading-ID → Deep-Link)
- `headingPath` („Montage › Variante 2") — gibt dem Chunk Kontext, den er allein verlöre
- `level`, Klartext, plus die geerbten Artikel-Metadaten (Typ, Sprache, Sichtbarkeit)

**Zwei Scoring-Verfeinerungen, die zusammen +11 Punkte brachten (55 % → 66 %):**

1. **Intro-Abwertung (0,25):** Der Textteil vor der ersten H2 hat als „Überschrift"
   den Artikel-H1 (= Produktname). Der matcht bei **jeder** Produktfrage und
   verdrängte die spezifischen Abschnitte. Zudem ist ein Intro ohne Anker ohnehin
   kein Deep-Link-Ziel.

2. **Titel-bewusstes Scoring:** Ein Query-Begriff, der **im Artikeltitel** steht,
   gibt **keinen** Überschriften-Bonus. Begründung: Er unterscheidet die Abschnitte
   *innerhalb* dieses Artikels nicht. Sonst gewinnt der Abschnitt, dessen Überschrift
   bloß den Produktnamen wiederholt („… G.A.S.-pro III/CO") — bei jeder Produktfrage.
   Nur abschnitts-**spezifische** Begriffe (DIP, Kabelquerschnitt, Stummschaltung)
   zählen für die Überschrift.

> **Lehre:** Chunk-Scoring ist nicht Artikel-Scoring im Kleinen. Was einen Artikel
> identifiziert (der Produktname), ist innerhalb des Artikels reines Rauschen.

---

## 4. Grounding — das Modell gegen sich selbst absichern

### 4.1 Der Fall, der alles auslöste

> „Brauche ich eine WiPro III, um einen T.S.A. Funk-Rauchmelder zu betreiben?"

Der Bot antwortete **„ja, zwingend"**. Das Wiki sagt ausdrücklich: **standalone immer
nutzbar**. Der Artikel heißt „T.S.A. Funk-Rauchmelder — Zubehör für WiPro III" — und
das Modell schloss vom **Titel** auf eine Voraussetzung. Die richtige Quelle war
gefunden. Die Antwort war trotzdem falsch.

> **Das ist die wichtigste Einsicht des ganzen Projekts:**
> **Quelle gefunden ≠ Antwort korrekt.** Wer nur Hit@k misst, misst das Falsche.

### 4.2 Die Prompt-Regeln, die es behoben haben

Wörtlich übernehmen (vollständig in `code/thi-route.js`):

**WORTLAUT SCHLÄGT ANNAHME**
> Eine EXPLIZITE Aussage im Kontext („Standalone immer nutzbar", „auch ohne WiPro
> verwendbar", „nicht kompatibel mit …") hat IMMER Vorrang vor dem Produktnamen,
> dem Artikeltitel („… für WiPro III") oder deinem Vorwissen. Schließe NIEMALS von
> einer Produktkategorie (Zubehör/„für X") auf eine zwingende Voraussetzung, wenn
> der Text das nicht ausdrücklich sagt.

**KEINE-ANGABE-FALLE**
> Bevor du behauptest, das Wiki sage zu etwas NICHTS, lies den relevantesten Artikel
> im VOLLTEXT — solche Angaben stehen häufig in Tabellen, Hinweis-Kästen oder im FAQ.

Das ist der zweithäufigste Fehlertyp: Der Bot sagt „dazu steht nichts im Wiki", und
es steht zwei Absätze weiter unten in einer Tabelle.

**VOLLTEXT-PFLICHT bei bestimmten Fragetypen**
Bei Voraussetzungs-, Ja/Nein-, Kompatibilitäts- und konkreten Wertfragen (Pins,
Mengen, „nur/ausschließlich/nicht empfohlen/Ausnahme") **nicht** auf den Snippet
verlassen — Volltext lesen und die belegende Stelle **wörtlich zitieren**, bevor
Ja/Nein gesagt wird.

### 4.3 Snippets zerschneiden Fakten — Top-Quellen anreichern

Der Client schickte ~800-Zeichen-Snippets. Im Batterie-Artikel steht:
„empfohlen: Panasonic — **nicht empfohlen: Duracell**". Das Snippet-Fenster
schnitt zwischen den beiden Hälften. Der Bot empfahl Duracell.

Lösung: Die **Top-2-Kontextquellen serverseitig mit Volltext anreichern**
(bis 6.000 Zeichen), statt darauf zu hoffen, dass das Modell selbst nachliest.

> **Bewusste Nebenwirkung:** Das verankert auf den Top-Artikel. Ist der falsch
> (Pin-Fall), unterdrückt es die eigene Tool-Suche des Modells. Wir haben das
> akzeptiert, weil es ein Retrieval-Problem ist, kein Grounding-Problem. Mit
> hybridem Retrieval entschärft sich das.

### 4.4 Passagen-Fenster statt `body.slice(0, 800)`

Wenn Snippets, dann **um die Trefferstelle herum** — nicht stur der Artikelanfang.
`extractSnippet()` sucht den **längsten** (spezifischsten) Query-Begriff im
normalisierten Text und rechnet den Fundindex auf den Originaltext zurück
(Normalisierung ändert die Länge: ä→ae). Implementierung: `code/search-core.js`.

### 4.5 Niemals Pfade erfinden lassen

Die Quellenzeile war anfangs frei vom Modell generiert → erfundene Pfade und Anker.

Jetzt: Das Modell gibt **„Titel — Abschnitt"** aus, **keine URLs**. Die
anklickbaren, **geprüften** Deep-Links rendert die App darunter aus den
tatsächlich verwendeten Kontexteinträgen.

> **Regel:** Alles, was verifizierbar ist, verifiziert die Anwendung — nicht das
> Modell. Das Modell benennt, die App verlinkt.

---

## 5. Gesprächsführung — der Bot muss nachfragen

Das ist im Support-Kontext **die** Qualitätsfrage, und es steht bereits im
produktiven Prompt:

> **LENKE DAS GESPRÄCH:** Hängt eine präzise Antwort von Angaben ab, die der Nutzer
> noch nicht gemacht hat — die harten Fallaufnahme-Kriterien sind Fahrzeugmodell,
> Baujahr, Seriennummer/Softwarestand, verbaute Produkte, Einbauzeitpunkt und das
> genaue Fehlerbild; ebenso die Produktvariante (WiPro III vs. WiPro III safe.lock,
> G.A.S.-pro vs. G.A.S.-pro III) — dann stelle ZUERST **genau eine** kurze, gezielte
> Rückfrage, statt zu raten oder alle Varianten aufzuzählen. Frage nur nach dem, was
> wirklich fehlt (eine, höchstens zwei Angaben).

**Die Formatvorlage des neuen Bots nimmt diese Rückfragen vorweg.** Das ist ihr
eigentlicher Zweck: Sie verlagert die Nachfrage vom Dialog ins Formular — und macht
die Antworten damit ab dem ersten Turn präzise. Was das Formular *nicht* abdeckt,
muss der Bot weiterhin erfragen; die Regel bleibt also im Prompt.

**Support-Verweis statt Raten:** Findet der Bot nichts Belastbares, rät er nicht,
sondern verweist ehrlich auf den Support (+49 (0)4351 76744-112). Dasselbe bei
sicherheitskritischer Unsicherheit.

---

## 6. Sicherheit & Sichtbarkeit — der subtilste Bug

**Rollen-Projektion muss VOR dem LLM greifen, nicht danach.**

Der Suchindex trug den vollen Body inklusive der „Service & Intern"-Abschnitte, die
in **Standard**artikeln stecken. Die Sichtbarkeitsprüfung filterte nur **ganz**
interne Artikel (`visibility === 'internal'`). Ergebnis: Interne **Teil**abschnitte
in Standardartikeln erreichten Händler über den Tool-Volltext und die
Kontextanreicherung.

Lösung: `dealerSearchView` projiziert den Index auf die Händler-Sicht, **bevor
irgendein Text das LLM erreicht** (`code/wiki-dealer-view.mjs`, `code/thi-tools.js`).

**Fail-closed bei Auth:** Ursprünglich hing `REQUIRE_AUTH` am Vorhandensein der
Supabase-Keys. Fehlten sie (unvollständige Deployment-Config), kippte es auf
`false` — und der Bot wurde ein **offener, kostenpflichtiger LLM-Proxy**. Jetzt:
Auth verlangt + Keys fehlen → **niemand** kommt durch (HTTP 503).

> **Für Netlify unbedingt übernehmen:** Same-Origin-Check, Rate-Limit pro IP,
> globales Tageslimit als Kosten-Notbremse, Input-Caps. Alles in `code/thi-route.js`.
> Achtung: Das In-Memory-Rate-Limit lebt **pro Prozess** — auf Netlify Functions
> (die skalieren) braucht es einen geteilten Zähler (KV/Upstash/DB), sonst ist das
> Limit faktisch wirkungslos.

---

## 7. Betrieb — was uns wirklich lahmgelegt hat

**Der Bot war wochenlang komplett kaputt, und niemand merkte es an der richtigen
Stelle.** Ursache: Das konfigurierte Modell war vom Provider **abgekündigt** →
HTTP 404 bei **jedem** Aufruf. Der Modellname stand in `.env.local` (gitignored),
also gab es keine Code-Spur.

> **Konsequenz für den neuen Bot — nicht verhandelbar:**
> 1. **Health-Check-Endpunkt**, der einen echten (winzigen) Modellaufruf macht und
>    fehlschlägt, wenn der Provider 404/401 liefert.
> 2. **Modell-ID nicht nur in ENV**, sondern beim Deploy geloggt und im
>    Admin-Screen sichtbar.
> 3. Beim Start die Modellliste des Providers abfragen und gegen die konfigurierte
>    ID prüfen — bei Abweichung laut scheitern, nicht still.

Weitere Betriebsregeln:

- Nach **jeder** Content-Änderung: Ingest neu bauen. Der Server übernimmt den
  Runtime-Index per mtime-Check ohne Neustart (`code/thi-tools.js`).
- **Anymize-Besonderheit (live verifiziert):** Der `llm-anonymous`-Endpunkt lehnt
  `role:"tool"`-Messages mit **HTTP 400** ab. Tool-Ergebnisse müssen als
  `user`-Message mit `[TOOL-ERGEBNIS …]`-Präfix zurückgehen; die `assistant`-Message
  darf ihr natives `tool_calls`-Feld behalten. **Das kostet sonst Stunden.**

---

## 8. Checkliste für den neuen Support-Bot

Abhaken, bevor „fertig" gesagt wird:

- [ ] Ingest loggt Ø-Textlänge pro Sprache; Build failt bei stillem Textverlust
- [ ] Bekannte Referenzsätze („Kanarienvögel") nach dem Ingest im Index verifiziert
- [ ] Anker aus Ingest == gerenderte HTML-IDs (Audit-Skript, 0 tote Anker)
- [ ] `articleType` sauber vergeben (Hebel für Typ-Gewichtung)
- [ ] Normalisierung: Umlaut-Digraphen **vor** NFD; Query und Haystack identisch
- [ ] Akronym-Entpunktung (T.S.A./G.A.S.) aktiv, Artikelnummern unberührt
- [ ] Produkt-Aliasse hängen an, ersetzen nicht
- [ ] Hybrid-Retrieval (lexikalisch + Embeddings, RRF) statt rein lexikalisch
- [ ] Chunking auf Abschnittsebene mit `headingPath` als Kontext
- [ ] Intro-Abwertung + titel-bewusstes Chunk-Scoring
- [ ] Grounding-Prompts wörtlich übernommen (Wortlaut/Keine-Angabe/Volltext-Pflicht)
- [ ] Top-Quellen serverseitig mit Volltext angereichert
- [ ] Modell gibt „Titel — Abschnitt" aus; App rendert die geprüften Links
- [ ] Rollen-Projektion **vor** dem LLM
- [ ] Auth fail-closed; Rate-Limit **geteilt** (nicht pro Prozess)
- [ ] Health-Check mit echtem Modellaufruf
- [ ] Beide Eval-Ebenen laufen: Retrieval **und** Grounding (siehe `05_…`)
