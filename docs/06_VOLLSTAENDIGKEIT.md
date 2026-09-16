# Vollständigkeit — reicht das Paket, um Thi standalone aufzustellen?

> **Kurzantwort: Ja.** Seit dem 15.09.2026 enthält das Paket neben dem Wissen
> auch die **fertige, deploybare Anwendung** unter [`../app/`](../app/README.md)
> — im THITRONIK-CI, zweisprachig, mit Formatvorlage, Live-Validierung,
> Sicherheits-Gate und funktionierendem Retrieval. Ordner hochladen, drei
> Umgebungsvariablen setzen, fertig.
>
> Die Abschnitte unten trennen weiterhin sauber: was **fertig** ist, was bewusst
> **fehlt**, und was als Nächstes dran wäre (§3).

---

## 1. Was vollständig enthalten ist

### Wissen — vollständig
Die fünf Transferdokumente decken Ingest, Retrieval, Chunking, Grounding,
Gesprächsführung, Sicherheit, Betrieb, Architektur, Formatvorlage,
Zweisprachigkeit und Evaluation ab — jeweils mit den gemessenen Werten und den
Fehlschlägen, die dahinter stehen.

### Server-Kern — vollständig und lauffähig
| Datei | Rolle |
|---|---|
| `search-core.js` | Retrieval: Scoring, Normalisierung, Abschnittssuche, Aliasse, Snippets |
| `wiki-ingest.mjs` | Ingest: Chunking, Anker, Caps, Boosts, Sichtbarkeit |
| `thi-route.js` | Server-Route: System-Prompts, Kontextblock, Provider, Limits, Streaming |
| `thi-tools.js` · `thi-nav.js` | Agentische Tools + Rollen-Projektion |
| `wiki-dealer-view.mjs` | Sichtbarkeits-Projektion (sicherheitskritisch) |
| `anleitungen-index.js` | Anleitungs-/FAQ-Index |

**Belegt lauffähig:** `node code/smoke-test.mjs` → 20/20 ohne `npm install`.

### Client — vollständig (`code/client/`)
| Datei | Rolle |
|---|---|
| `thi-page.js` (922 Z.) | Die komplette Chat-Oberfläche: Client-Retrieval, Quellen-Chips mit Deep-Links, Folgefragen-Parsing (`[[FOLGEFRAGEN: …]]`), Status-Marker-Trennung, Content-Gap-Logging |
| `wiki-context.js` · `wiki-runtime.js` · `wiki.js` | Bootstrap- und Runtime-Layer, rollengefilterte Index-Auslieferung |
| `rich-text.js` | Markdown-Rendering der Antworten |
| `ThiAvatar.js` · `thi-layout.js` | Darstellung |

### Qualitätssicherung — vollständig
- **106 Gold-Testfälle** mit wörtlichen Belegen und Fundstellen
- **Beide Eval-Runner** (Retrieval + Grounding mit LLM-Judge)
- **Unit-Tests** für Retrieval-Kern und Sichtbarkeits-Projektion
- **Drei E2E-Checks** (`thi-tools-check`, `thi-nav-check`, `thi-rag-check`)
- **Zwei eigene Analyse-Skripte** (`smoke-test`, `sprachanteil-analyse`)

### Knowledge Base — vollständig für DE/FR
- 83 deutsche + 81 französische Wiki-Artikel (inkl. **30 Fahrzeuge je Sprache**)
- **93 Anleitungs-/FAQ-Textextrakte** (`content/anleitungen/`)
- Strukturierte Kataloge: Fahrzeugmatrix, Produktkatalog, DE↔FR-Glossar
- Die fachliche Formatvorlage in DE und FR

---

## 2. Was bewusst **nicht** enthalten ist

| Fehlt | Warum | Woher bei Bedarf |
|---|---|---|
| **Anleitungs-PDFs** (~45 MB) | Die Textextrakte sind das RAG-Material; die PDFs sind nur Darstellung | `Thitronik Online/wiki/` |
| **Gebaute Indizes** (33 MB) | Aus `content/` reproduzierbar — und veralten sofort | `npm run wiki:ingest` |
| **Bilder/Medien** | Für Retrieval irrelevant | Ursprungsprojekt |
| **9 weitere Sprachen** | Nicht im Auftrag (DE/FR) | Ursprungsprojekt, gleiche Qualität |
| **Plattform-Kontext** | Auth, Supabase, Kurse, Forum, Quiz — gehört nicht zum Support-Bot | — |
| **Zugangsdaten** | Gehören nie in ein Übergabepaket | Anymize-Konto |
| **`package.json`/Deps** | Zielstack steht noch nicht fest (Netlify ≠ Next.js-Server) | siehe §3 |

---

## 3. Stand der Umsetzung

| # | Punkt | Stand |
|---|---|---|
| 1 | **Formatvorlage als Anwendung** | ✅ **fertig** — Formular, Autocomplete über alle Schwestermarken, 48-Produkte-Katalog, Live-Validierung |
| 2 | **Widerspruchserkennung** | ✅ **fertig** — SN↔Produkt, SN↔Fahrzeug, Baujahr↔Generation, live beim Tippen |
| 3 | **Sicherheits-Gate** | ✅ **fertig** — DE/FR, mit Produktnamen-Maskierung, 67 Tests |
| 4 | **Zweisprachige Oberfläche** | ✅ **fertig** — Oberfläche, Prompts, Retrieval, Fallback DE |
| 5 | **Netlify-Anpassungen** | ✅ **fertig** — Vorab-Retrieval statt Loop, Streaming, Health-Check |
| 6 | **Fahrzeug als Retrieval-Steuerung** | ✅ **fertig** — der passende Artikel wird gewichtet **und** garantiert beigelegt |
| 7 | **Hybrides Retrieval** (Embeddings) | ⬜ offen — der lexikalische Kern läuft, Vektor-Suche fehlt (`02_…` §4) |
| 8 | **Sprachsegmentierung im Ingest** | ⬜ offen — hebt 23 Anleitungen nach FR (`04_…` §1.2) |
| 9 | **FR-Gold-Set** | ⬜ offen — **die größte blinde Stelle** (`05_…` §8) |
| 10 | **Geteiltes Rate-Limit** | ⬜ offen — aktuell pro Instanz; Schutz ist das Zugangswort (`02_…` §2.2) |

### Drei Befunde aus dem Bau der App

Sie sind in den Code eingeflossen und stehen hier, weil sie die Dokumente oben
ergänzen:

1. **Der Fahrzeug-Slug darf kein Suchbegriff sein.** Als Text in der Query zog
   „fiat ducato 2022 2024" *alle* Ducato-Generationen hoch — auch die falschen
   (2012-2021, 2024plus, x250) — und verdrängte den fachlich richtigen Artikel.
   Die strukturierte Angabe wirkt jetzt als **Gewichtung** (passender Artikel ×3,
   andere Fahrzeugartikel ×0,1), nicht als Suchwort. Genau das, was `02_…` §2.3
   mit „Metadatenfilter statt Heuristik" meint.

2. **Der Fahrzeugartikel muss garantiert beigelegt werden.** Sobald er nicht mehr
   in der Suchquery steht, fehlt er bei Fragen wie „Welche DIP-Stellung brauche
   ich?" — obwohl genau dort die Antwort steht. Er wird deshalb unabhängig vom
   Retrieval in den Kontext gelegt.

3. **Produktnamen enthalten Gefahrenwörter.** „détecteur de fumée" ist der
   T.S.A. Funk-Rauchmelder — ohne Maskierung eskalierte **jede** französische
   Rauchmelder-Frage, und das Gate wäre unbrauchbar gewesen. Produktbezeichnungen
   werden vor der Gefahrenprüfung entfernt; eine echte Gefahr im selben Satz
   greift weiterhin. Umgekehrt eskaliert ein reiner „Gasalarm" **nicht** mehr
   automatisch (Fehlalarme sind der häufigste Gaswarner-Supportfall) — ein
   **CO-Alarm** dagegen immer, weil CO geruchlos ist.

---

## 4. Wichtig: Es gibt bereits einen lauffähigen Standalone-Export

Unter **`export/thi export/thi-standalone`** liegt eine **vollständige,
lauffähige Next.js-Anwendung** (Stand 30.08.2026):

- `app/thi/` + `app/api/thi/` + `app/login/` + `app/v2/`
- kompletter `lib/`-Kern, `components/`, `public/`
- **fertig gebaute Indizes** (`search-index.json`, `section-index.json`, …)
- eigenes `package.json`, `next.config.mjs`, README mit Schnellstart
- drei E2E-Check-Skripte

> **Laut dessen README läuft es mit `npm install` + API-Schlüssel sofort.**
> Wenn „Thi standalone aufstellen" bedeutet: *den bestehenden Assistenten
> unabhängig betreiben* — dann ist das **bereits erledigt**, und es fehlt nur
> der Schlüssel plus die Zugangsentscheidung.

**Aber für das neue Ziel ist es nur teilweise geeignet:**

| | Standalone-Export | neues Ziel |
|---|---|---|
| Sprache | **nur Deutsch** | DE **+ FR** |
| Eingabe | freier Chat | **Formatvorlage** |
| Retrieval | rein lexikalisch | **hybrid** |
| Hosting | Next.js-Server | **Netlify Functions** |
| Wiki-Quellen | **fehlen** (nur gebaute Indizes) | Ingest nötig |
| Evals/Gold-Sets | **fehlen** | Pflicht |

> **Empfehlung:** Den Standalone-Export als **Referenz für UI und Verdrahtung**
> nutzen — dort ist bereits gelöst, wie der Client Retrieval, Quellen-Chips,
> Statusmarker und Streaming zusammenspielt. Die **Architektur** aber nach
> `02_ZIELARCHITEKTUR.md` neu aufsetzen. Ein Weiterbauen auf einem
> Next.js-Server-Projekt, das dann auf Netlify Functions laufen soll, führt
> genau in die Timeout- und Rate-Limit-Fallen aus `02_…` §2.
>
> Dass dem Export die `wiki/`-Quelldateien fehlen, ist dabei der praktische
> Knackpunkt: **Ohne sie lässt sich der Index nicht neu bauen** — und ohne
> Neubau gibt es weder FR-Segmentierung noch Chunking-Änderungen. Genau diese
> Quellen liegen in diesem Paket unter `content/wiki/`.

---

## 5. Ehrliches Fazit

**Der Bot ist deploybar.** Die App unter [`../app/`](../app/README.md) läuft,
ist getestet (67 Selbsttests plus Browser-Durchlauf) und braucht nur noch
API-Zugang und ein Zugangswort.

**Was noch fehlt, ist kein vergessenes Wissen, sondern bewusst aufgeschobene
Arbeit** — die vier offenen Punkte aus §3. Keiner davon blockiert den Start:

- Ohne Embeddings bleibt das Retrieval an seiner lexikalischen Grenze — die
  Formatvorlage kompensiert das für Supportfälle aber deutlich, weil Fahrzeug und
  Produkt jetzt Fakten statt Vermutungen sind.
- Ohne Sprachsegmentierung fehlen französischen Nutzern die Anleitungen; die
  Fachartikel sind vollständig da.

> **Die einzige echte blinde Stelle bleibt Französisch — bei der Messung,
> nicht beim Inhalt.** Es existiert kein einziger französischer Testfall. Die
> französischen Antworten *sehen* im Test gut aus (Retrieval liefert die
> richtigen FR-Abschnitte), aber „sieht gut aus" ist genau das, was dieses Paket
> an anderer Stelle als unzureichend beschreibt.
>
> **Empfehlung: vor breitem Einsatz in Frankreich ein FR-Gold-Set aufbauen** —
> `05_EVAL_UND_QUALITAET.md` §8 beschreibt den Weg, und die deutschen Sets sind
> die Vorlage.

### Risiko beim Go-Live

Ein Punkt ist wichtiger als die Retrieval-Qualität: **Ohne `THI_ZUGANGSWORT` ist
die Seite öffentlich** — und damit der API-Schlüssel auf fremde Kosten nutzbar.
Das In-Memory-Rate-Limit zählt pro Function-Instanz und bremst das nicht
zuverlässig. Das Zugangswort ist keine Formalität, sondern der eigentliche Schutz.
