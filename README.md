# RAG Support — Wissenspaket **und fertige App** für den Thitronik-Support-Bot

**Was das ist:** Ein in sich geschlossenes Übergabepaket. Es enthält das
RAG-Wissen aus der Thitronik-Händlerplattform — destilliert, aktualisiert und auf
den neuen Fall zugeschnitten: ein **eigenständiger Support-Chatbot (Thi)** mit
strukturierter Formatvorlage, **deutsch und französisch**, gehostet auf Netlify,
LLM über die anonymisierte Anymize-API.

> ## 🚀 Sofort einsatzbereit: [`app/`](app/)
>
> Im Ordner **[`app/`](app/README.md)** liegt die **fertige, deploybare
> Netlify-Anwendung** — im THITRONIK-CI, zweisprachig, mit Formatvorlage,
> Live-Validierung, Sicherheits-Gate und funktionierendem Retrieval.
>
> **Kein Build-Schritt, kein Framework.** Ordner auf
> [app.netlify.com/drop](https://app.netlify.com/drop) ziehen, drei
> Umgebungsvariablen setzen, fertig. Anleitung: [`app/README.md`](app/README.md).
>
> Die Dokumente unten erklären, **warum** die App so gebaut ist — und was als
> Nächstes dran wäre.

**Stand:** 15.09.2026 · **Quelle:** `Thitronik Händlerplattform` (Next.js-Plattform
mit produktivem THI-RAG)

> Dieses Paket ist **abtrennbar**. Es referenziert das Ursprungsprojekt nur
> dokumentarisch — alles Nötige liegt hier. Der Ordner kann nach dem Umzug
> gelöscht werden, ohne dass das Hauptprojekt Schaden nimmt.

---

## Reihenfolge zum Lesen

| # | Datei | Inhalt |
|---|---|---|
| 0 | [`00_STARTPROMPT.md`](00_STARTPROMPT.md) | **In den neuen Chat kopieren.** Auftrag, Kontext, Leitplanken |
| 1 | [`docs/01_RAG_WISSENSTRANSFER.md`](docs/01_RAG_WISSENSTRANSFER.md) | ⭐ **Die wichtigste Datei.** Was wir teuer gelernt haben — gemessen, nicht vermutet |
| 2 | [`docs/02_ZIELARCHITEKTUR.md`](docs/02_ZIELARCHITEKTUR.md) | Netlify, Anymize, hybrides Retrieval — inkl. der Fallstricke |
| 3 | [`docs/03_FALLAUFNAHME_SCHEMA.md`](docs/03_FALLAUFNAHME_SCHEMA.md) | Die Formatvorlage: welche Felder, und **warum** sie das Retrieval verbessern |
| 4 | [`docs/04_MEHRSPRACHIGKEIT_DE_FR.md`](docs/04_MEHRSPRACHIGKEIT_DE_FR.md) | Französisch — Befund, Lücken, Strategie |
| 5 | [`docs/05_EVAL_UND_QUALITAET.md`](docs/05_EVAL_UND_QUALITAET.md) | Wie man Qualität misst statt sie zu behaupten |
| 6 | [`docs/06_VOLLSTAENDIGKEIT.md`](docs/06_VOLLSTAENDIGKEIT.md) | Was drin ist, was fehlt, was neu entstehen muss — **und der Hinweis auf den bereits existierenden lauffähigen Standalone-Export** |

---

## Paketinhalt

```
RAG Support/
├─ README.md                  ← diese Datei
├─ 00_STARTPROMPT.md          ← Einstieg für den neuen Chat
│
├─ app/                       ⭐ FERTIGE NETLIFY-APP (5,8 MB, 20 Dateien)
│   ├─ README.md                Deploy-Anleitung in drei Schritten
│   ├─ netlify.toml             Konfiguration — kein Build nötig
│   ├─ .env.example             Vorlage für die Umgebungsvariablen
│   ├─ dev-server.mjs           lokal testen ohne npm install
│   ├─ public/                  Frontend im THITRONIK-CI, DE/FR, ab 375 px
│   ├─ netlify/functions/       chat + health + 67 Selbsttests
│   └─ data/                    Wissensbasis (224 Artikel, 2.591 Abschnitte)
│
├─ docs/                      ← der eigentliche Wissenstransfer (6 Dokumente)
│
├─ code/                      ← produktiv erprobter, kommentierter Code
│   ├─ search-core.js           Retrieval-Kern: Scoring, Normalisierung,
│   │                           Abschnitts-Suche, Aliasse, Snippets
│   │                           (framework-frei, direkt portierbar)
│   ├─ wiki-ingest.mjs          Ingest: Chunking, Anker, Caps, Boosts
│   ├─ thi-route.js             Server-Route: System-Prompts, Kontextblock,
│   │                           Provider, Rate-Limit, Auth, Streaming
│   ├─ thi-tools.js             Agentische Tools + Rollen-Projektion
│   ├─ thi-nav.js               App-Navigations-Tool
│   ├─ wiki-dealer-view.mjs     Sichtbarkeits-Projektion (Sicherheit!)
│   ├─ anleitungen-index.js     Anleitungs-/FAQ-Index
│   ├─ arbeitskarte-data.js     48 Produkte mit echten Artikelnummern
│   │
│   ├─ client/                  ← die Chat-Oberfläche
│   │   ├─ thi-page.js            922 Z.: Client-Retrieval, Quellen-Chips mit
│   │   │                         Deep-Links, Folgefragen-Parsing, Statusmarker
│   │   ├─ wiki-context.js        Bootstrap + rollengefilterte Auslieferung
│   │   ├─ wiki-runtime.js        Runtime-Index
│   │   ├─ wiki.js                Re-Exports
│   │   ├─ rich-text.js           Markdown-Rendering der Antworten
│   │   ├─ ThiAvatar.js           Darstellung
│   │   └─ thi-layout.js
│   │
│   ├─ tests/                   ← Unit-Tests
│   │   ├─ search-core.test.js
│   │   └─ wiki-dealer-view.test.js
│   │
│   ├─ thi-rag-eval.mjs         Retrieval-Eval (Hit@k, MRR, Anker)
│   ├─ thi-answer-eval.mjs      Grounding-Eval (LLM-Judge)
│   ├─ thi-tools-check.mjs      E2E: agentische Tools
│   ├─ thi-nav-check.mjs        E2E: Navigations-Tool
│   ├─ thi-rag-check.mjs        E2E: Retrieval
│   ├─ smoke-test.mjs           Selbsttest des Retrieval-Kerns (20 Prüfungen)
│   └─ sprachanteil-analyse.mjs Belegt den FR-Anteil in den Anleitungen
│
├─ daten/
│   ├─ support-fallaufnahme.de.md   ⭐ die fachliche Formatvorlage
│   ├─ support-fallaufnahme.fr.md   dieselbe auf Französisch
│   ├─ fahrzeug-matrix.json         30 Fahrzeuge, DE+FR, Baujahre, Varianten
│   ├─ produkt-katalog.json         48 Produkte, 6 Gruppen, Artikelnummern
│   ├─ glossar-de-fr.json           668 Begriffspaare, 200 geschützt/fachlich
│   ├─ thi-eval-gold.de.json        41 Grounding-Fälle mit Belegen
│   ├─ thi-anchor-gold.de.json      47 Anker-Fälle (adversarial verifiziert)
│   └─ thi-eval-extra.de.json       18 Zusatzfälle
│
├─ content/                   ← die Knowledge Base
│   ├─ wiki/de/   83 Artikel (inkl. 30 Fahrzeuge)
│   ├─ wiki/fr/   81 Artikel (inkl. 30 Fahrzeuge)
│   └─ anleitungen/anleitungen-und-faq.json
│                 93 Textextrakte der Anleitungs-/FAQ-PDFs
│                 (23 davon mit substanziellem FR-Anteil!)
│
└─ referenz/                  ← Originaldokumentation der RAG-Arbeit
    ├─ THI_RAG_UEBERARBEITUNG_2026-06-18.md
    └─ THI_ABSCHNITTS_ZITATE_2026-06-19.md
```

---

## Sofort prüfen, dass der Kern läuft

```bash
node code/smoke-test.mjs
```

Braucht **kein** `npm install`, keinen Index, kein Netzwerk. Prüft in ~2 Sekunden
die Mechaniken, die im Vorgängerprojekt Trefferquote gekostet haben, als sie
fehlten: Normalisierungsreihenfolge, Akronym-Entpunktung, Produkt-Aliasse,
FAQ-/Fahrzeug-Abwertung, Sichtbarkeitsfilter, Snippet-Fenster und
Abschnitts-Anker.

**Verifiziert am 15.09.2026: 20 von 20 Prüfungen bestanden.**

---

## Die fünf wichtigsten Erkenntnisse

Wer nur fünf Minuten hat:

1. **Quelle gefunden ≠ Antwort korrekt.** Zwei Evalebenen sind Pflicht.
   Der Auslöserfall: Der Bot behauptete, ein Rauchmelder brauche zwingend eine
   WiPro III — weil der Artikel *„… für WiPro III"* heißt. Retrieval war perfekt.

2. **Ingest-Bugs sind stille Totalausfälle.** Eine überflüssige Regex löschte
   monatelang ganze Abschnitte inklusive Sicherheitshinweisen aus dem Index.
   Symptom war nicht „Suche schlecht", sondern „dazu steht nichts im Wiki".

3. **Rein lexikalische Suche hat eine harte Decke.** Hit@8 ließ sich auf 72,6 %
   heben, dann war Schluss. **Hybrid (BM25 + Embeddings, RRF) von Anfang an.**

4. **Die Formatvorlage ist kein Formular, sondern Retrieval-Steuerung.** Fahrzeug
   und Produkt strukturiert zu kennen, ersetzt Heuristiken durch Fakten — und die
   **Seriennummer** disambiguiert Produktvariante *und* Fahrzeugzweig
   (`5298-` = Ford-Set, `5458-` = Sprinter-Set …).

5. **Französisch steht deutlich besser da als gedacht.** Alle Fachartikel und alle
   30 Fahrzeuge sind strukturgleich übersetzt. Und gemessen am Textinhalt:
   **23 der 31 Anleitungen enthalten bereits 22–75 % französischen Text** — sie
   sind nur unter `/de/` indexiert. Die FR-Anleitungslücke ist damit eine
   **Ingest-Aufgabe (Sprachsegmentierung), keine Übersetzungsaufgabe**.
   Beleg: `node code/sprachanteil-analyse.mjs`

---

## Was hier bewusst **nicht** drin ist

- **Anleitungs- und FAQ-PDFs** (~45 MB). Die **Textextrakte** liegen bei
  (`content/anleitungen/`) — das ist das RAG-Material. Die PDFs selbst stehen im
  Ursprungsprojekt unter `Thitronik Online/wiki/`.
- **Gebaute Indizes** (33 MB) — aus `content/` reproduzierbar und sofort veraltet.
- **Bilder und Medien** — für das Retrieval irrelevant.
- **Zugangsdaten jeder Art.** API-Schlüssel gehören in die Umgebungskonfiguration
  des neuen Projekts, nie in dieses Paket.
- **Die übrigen 9 Sprachen** (en, es, it, nl, da, sv, no, pl, cs). Sie existieren
  im Ursprungsprojekt in gleicher Qualität — falls der Bot später wachsen soll.

Vollständige Abgrenzung inkl. „was noch entstehen muss":
**[`docs/06_VOLLSTAENDIGKEIT.md`](docs/06_VOLLSTAENDIGKEIT.md)**

> **Nicht übersehen:** Unter `export/thi export/thi-standalone` liegt bereits eine
> **lauffähige** Next.js-Fassung von Thi (deutsch, freier Chat, fertige Indizes).
> Gut als UI-Referenz — aber ihr fehlen die Wiki-Quelldateien, sodass sich der
> Index dort **nicht neu bauen** lässt. Genau die liegen hier in `content/wiki/`.
> Einordnung in `06_VOLLSTAENDIGKEIT.md` §4.
