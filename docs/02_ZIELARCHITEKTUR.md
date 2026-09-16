# Zielarchitektur — Netlify, Anymize, hybrides RAG

> Dieses Dokument benennt die Architekturentscheidungen **und die harten
> Randbedingungen**, die sie erzwingen. Mehrere davon sind Stolperfallen, die man
> erst beim Deployen merkt — hier stehen sie vorher.

---

## 1. Der Systemschnitt

```
┌──────────────────────────────────────────────────────────┐
│  Browser — Formatvorlage (DE/FR) + Chat                  │
│  Klasse-A-Felder als Struktur, Fehlerbild als Text        │
└────────────────────────┬─────────────────────────────────┘
                         │ POST /api/support  (nur Struktur + Fehlerbild,
                         │                     KEINE Kontaktdaten)
┌────────────────────────▼─────────────────────────────────┐
│  Netlify Function  (Server — hält den API-Schlüssel)     │
│   1. Validierung + Widerspruchsprüfung (SN ↔ Produkt ↔ Fz)│
│   2. Sicherheits-Gate (Gas/Rauch/Brand → Eskalation)      │
│   3. Retrieval-Steuerung aus Klasse A                     │
│   4. Hybride Suche  (lexikalisch + Vektor → RRF)          │
│   5. Kontextblock bauen (Top-Quellen volltext-angereichert)│
│   6. LLM-Aufruf gegen Anymize (Streaming)                 │
└────────────────────────┬─────────────────────────────────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
      ┌───────────────┐    ┌────────────────────┐
      │ Index-Store   │    │ Anymize (LLM,      │
      │ lexikalisch   │    │ anonymisiert)      │
      │ + Vektoren    │    └────────────────────┘
      └───────────────┘
```

**Unverhandelbar:** Der API-Schlüssel bleibt serverseitig. Er darf nie im
Frontend-Bundle landen — auch nicht „nur für den Test".

---

## 2. Netlify — die Randbedingungen, die weh tun

### 2.1 Function-Timeout vs. agentischer Loop ⚠️

Der bestehende Bot macht bis zu **3 Tool-Hops**, jeder ein eigener LLM-Aufruf.
Latenz war dort ausdrücklich unkritisch („30 s sind ok"). **Auf Netlify ist sie
das nicht.**

Synchrone Netlify Functions haben ein deutlich engeres Zeitbudget als ein
dauerhaft laufender Next.js-Server. Ein Loop aus drei sequenziellen LLM-Aufrufen
läuft dort in den Timeout.

> **Empfehlung: Vorab-Retrieval statt agentischem Loop.**
> Die Formatvorlage macht den Loop weitgehend überflüssig: Die Angaben, die der
> bestehende Bot sich per `wiki_suchen`/`artikel_lesen` **erarbeiten** musste,
> liegen jetzt **strukturiert vor**. Ein sorgfältig gebauter Kontextblock aus
> einem Retrieval-Durchgang ersetzt zwei bis drei Tool-Hops.
>
> Konkret: **ein** Retrieval → Top-Quellen volltext-anreichern → **ein**
> LLM-Aufruf mit Streaming. Das ist schneller, billiger und deterministischer.
>
> Wird der Loop doch gebraucht (tiefe Rückfragen), gehört er in eine
> **Background Function** mit Job-ID und Polling — nicht in den Request-Pfad.

**Streaming dennoch nutzen:** Time-to-first-token sinkt spürbar, und der Nutzer
sieht sofort etwas. Der bestehende Code streamt bereits (`code/thi-route.js`,
`agenticStream`) inklusive Live-Statusmarkern — die Mechanik ist übernehmbar.

### 2.2 Rate-Limit: der In-Memory-Zähler funktioniert hier nicht ⚠️

```js
const ipHits = new Map();              // lebt PRO PROZESS
let daily = { count: 0, day: … };      // ebenso
```

Auf einem dauerhaft laufenden Server ist das brauchbar. **Auf Netlify Functions
ist es wirkungslos** — jede Instanz hat ihre eigene Map, und Instanzen kommen und
gehen. Das globale Tageslimit, ausdrücklich als **Kosten-Notbremse** gebaut,
zählt dann faktisch nichts.

> **Ersatz zwingend:** ein geteilter Zähler (Upstash Redis, Netlify Blobs,
> Supabase-Tabelle). Ohne ihn ist ein öffentlich erreichbarer Endpunkt mit
> LLM-Kosten dahinter ein offenes Kostenrisiko.

Die übrigen Schutzmechanismen aus `code/thi-route.js` bleiben gültig und sollten
mitgenommen werden: **Same-Origin-Check**, **Input-Caps** (Nachrichtenzahl,
Zeichenzahl, Kontextgröße), **fail-closed bei fehlender Konfiguration**.

### 2.3 Der Index passt nicht in eine Function

`search-index.json` ist **18 MB**, `section-index.json` **14,8 MB**. Das in einer
Serverless Function bei jedem Kaltstart zu laden, ist nicht praktikabel.

**Optionen:**

| Ansatz | Bewertung |
|---|---|
| **Externe Vektor-DB** (Supabase `pgvector`, Upstash Vector, Turso) | **Empfohlen.** Keine Kaltstartkosten, Filterung in der DB, skaliert |
| Index als statisches Asset, clientseitige Suche | Nur für kleine Indizes; leakt zudem interne Inhalte ins Frontend |
| Index in Netlify Blobs, lazy laden | Möglich, aber eigener Cache-Layer nötig |

> **Hinweis zu Supabase:** Im Hauptprojekt ist ein kontoweites Projektlimit im
> kostenlosen Tarif dokumentiert. Bevor `pgvector` auf Supabase gesetzt wird,
> prüfen, ob ein weiteres Projekt überhaupt angelegt werden kann — sonst ist
> Upstash Vector (eigenes Konto, großzügiges Gratiskontingent) der pragmatischere
> Weg für dieses eigenständige Projekt.

**Was in der DB filtern statt nachträglich:** Sprache, `articleType`,
Sichtbarkeit und — der große Gewinn — das **Fahrzeug**. Eine Vektorsuche mit
Metadatenfilter `fahrzeug_slug = 'fiat-ducato-2022-2024' OR fahrzeug_slug IS NULL`
löst das Problem aus `01_…` §2.2 elegant und ohne Heuristik.

### 2.4 Auth-Entscheidung

Das Hauptprojekt verlangt Anmeldung (fail-closed). Für den Support-Bot ist zu
klären, ob er **öffentlich** erreichbar sein soll.

- **Öffentlich:** dann sind geteiltes Rate-Limit + Tageslimit die **einzige**
  Kostenbremse — und ein CAPTCHA oder Netlify-seitiger Schutz sinnvoll.
- **Nur für Händler:** Token-Prüfung wie in `code/thi-route.js` (`getRequestAccess`),
  und die **Rollen-Projektion** aus `01_…` §6 wird wieder relevant — interne
  Abschnitte dürfen Händler nicht erreichen.

> Diese Entscheidung beeinflusst Sicherheit **und** Retrieval (interne Quellen
> ja/nein) und sollte **vor** dem Bau fallen.

---

## 3. Anymize — was aus dem Betrieb bekannt ist

Bereits produktiv verifiziert, im bestehenden Code umgesetzt:

- **OpenAI-kompatibel:** `Authorization: Bearer`, `/v1/chat/completions`,
  SSE-Deltas unter `choices[].delta.content`.
- **⚠️ `role:"tool"` wird mit HTTP 400 abgelehnt.** Tool-Ergebnisse müssen als
  `user`-Message mit `[TOOL-ERGEBNIS …]`-Präfix zurückgehen; die
  `assistant`-Message darf ihr natives `tool_calls`-Feld behalten. Das ist live
  verifiziert und kostet sonst Stunden Fehlersuche.
- **Function-Calling funktioniert** grundsätzlich (`tools` + `tool_choice: 'auto'`).
- **Modell-IDs ändern sich.** Genau daran war der Bot wochenlang tot (HTTP 404,
  `model_not_found`) — siehe `01_…` §7.

> **Pflicht für den Betrieb:**
> 1. Beim Start die Modellliste des Providers abfragen und die konfigurierte ID
>    dagegen prüfen. Abweichung → **laut scheitern**, nicht still.
> 2. Health-Check-Endpunkt mit einem echten Mini-Aufruf.
> 3. Modell-ID beim Deploy loggen.

**Anonymisierung und RAG-Kontext zusammendenken:** Anymize anonymisiert die
Anfrage. Der **Wiki-Kontext**, den wir mitschicken, enthält technische Inhalte —
aber der **Fall** könnte Kennzeichen, VIN oder Namen enthalten, wenn das Formular
sie durchreicht. Genau deshalb bleibt **Klasse C draußen** (`03_…` §4). Das ist
Datensparsamkeit *und* bessere Retrieval-Qualität.

---

## 4. Retrieval: hybrid, nicht rein lexikalisch

Die klarste Lehre aus dem Vorgängersystem: Rein lexikalische Suche hat eine
**harte Decke** (`01_…` §2.7, der Pin-/Zusatzhupe-Fall).

**Empfohlener Aufbau:**

1. **Lexikalisch** — den vorhandenen Kern übernehmen (`code/search-core.js`).
   Er ist ausgemessen und bei Artikelnummern, Seriennummern und exakten
   Produktnamen unschlagbar. **Nicht wegwerfen.**
2. **Semantisch** — Embeddings über die **Abschnitts-Chunks** (nicht über ganze
   Artikel). Mehrsprachiges Modell nötig (DE **und** FR).
3. **Fusion** — Reciprocal Rank Fusion über beide Ergebnislisten. RRF braucht
   keine Score-Normalisierung zwischen unterschiedlichen Skalen, was der
   häufigste Fehler beim Zusammenführen ist.
4. **Metadatenfilter aus Klasse A** — Sprache, Fahrzeug, Produkt: **vor** der
   Suche, nicht danach.
5. **Typ-Gewichtung beibehalten** — FAQ/Anleitung abwerten (0,4), fremde
   Fahrzeugartikel abwerten, passenden Fahrzeugartikel **hochgewichten**.

**Chunk-Metadaten** (aus `buildSections`, `code/wiki-ingest.mjs`):
`anchor`, `heading`, `headingPath`, `level`, `route`, `lang`, `articleType`,
`visibility`. Der `headingPath` („Montage › Variante 2") sollte **mit einbettet**
werden — er gibt dem Chunk den Kontext, den er isoliert verliert.

---

## 5. Datenfluss beim Neuaufbau des Index

```
content/wiki/{de,fr}/**.md
        │
        ├─ gray-matter → Frontmatter + Body
        │  ⚠️ KEIN zweites Frontmatter-Stripping (01_… §1.1)
        │
        ├─ github-slugger (frische Instanz je Datei) → Anker == HTML-IDs
        ├─ buildSections()  → H2/H3-Chunks + headingPath
        ├─ extractPlainText()
        │
        ├─→ lexikalischer Index  (Felder: title/slug/headings/boost/keywords/body)
        └─→ Embeddings pro Chunk → Vektor-Store
```

**Nach jedem Ingest prüfen** (sonst stille Verluste, siehe `01_…` §1.1):
- Ø-Textlänge pro Sprache gegen den Vorlauf
- bekannte Referenzsätze im Index auffindbar
- **0 tote Anker** gegen die gerenderten HTML-IDs
- keine internen Inhalte im öffentlichen Index

---

## 6. Offene Entscheidungen

| # | Frage | Empfehlung |
|---|---|---|
| 1 | Agentischer Loop oder Vorab-Retrieval? | **Vorab-Retrieval**, Loop nur als Background Function |
| 2 | Vektor-Store? | Upstash Vector (unabhängig) oder Supabase pgvector (falls Projektlimit es zulässt) |
| 3 | Öffentlich oder Händler-Login? | **Vor** dem Bau klären — beeinflusst Sicherheit und Retrieval |
| 4 | Embedding-Modell DE+FR | mehrsprachiges Modell zwingend; Kandidaten gegen das Gold-Set messen |
| 5 | Ticket-Anbindung | Soll der Fall gespeichert/weitergeleitet werden? Dann DSGVO-Pfad für Klasse C klären |
