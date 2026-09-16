# Startprompt — neuer Chat für den Thitronik-Support-Bot

> **Verwendung:** Diesen Text als erste Nachricht in die neue Session kopieren.
> Der Ordner `RAG Support/` muss im Arbeitsverzeichnis des neuen Projekts liegen.

---

## Der Auftrag

Wir bauen **Thi** — einen eigenständigen technischen Support-Chatbot für
THITRONIK (Alarmanlagen, Gaswarner und GPS-Ortung für Freizeitfahrzeuge).

**Die Idee:** Ein Händler, Monteur oder Servicemitarbeiter füllt eine
**strukturierte Formatvorlage** aus — Fahrzeug, Aufbau, verbaute
THITRONIK-Produkte mit Seriennummer und Softwarestand, Einbauzeitpunkt und das
genaue Fehlerbild. Der Bot durchsucht daraufhin die Knowledge Base und antwortet
**belegt, mit Verweis auf die konkrete Fundstelle**.

**Rahmenbedingungen:**
- **Zweisprachig: Deutsch und Französisch.**
- **Hosting: Netlify.**
- **LLM über die anonymisierte Anymize-API** (OpenAI-kompatibel).
- **Das RAG muss exzellent sein.** Falsche technische Auskünfte sind hier keine
  Unannehmlichkeit — es geht um Gas, Strom und Fahrzeugstilllegung.

---

## Die Ausgangslage — bitte zuerst lesen

Im Ordner `RAG Support/` liegt ein vollständiges Übergabepaket aus einem
**produktiven Vorgängersystem**: ein RAG über dieselbe Knowledge Base, das über
Monate diagnostiziert, vermessen und verbessert wurde.

**Lies in dieser Reihenfolge:**

1. `RAG Support/README.md` — Überblick
2. `RAG Support/docs/01_RAG_WISSENSTRANSFER.md` — ⭐ **die wichtigste Datei**
3. `RAG Support/docs/03_FALLAUFNAHME_SCHEMA.md` — die Formatvorlage
4. `RAG Support/docs/02_ZIELARCHITEKTUR.md` — Netlify/Anymize-Randbedingungen
5. `RAG Support/docs/04_MEHRSPRACHIGKEIT_DE_FR.md` — Französisch
6. `RAG Support/docs/05_EVAL_UND_QUALITAET.md` — Messung
7. `RAG Support/docs/06_VOLLSTAENDIGKEIT.md` — was da ist, was fehlt, was neu muss

Im Paket liegen außerdem:
- **`code/`** — produktiv erprobter, ausführlich kommentierter Code: Server-Kern,
  **Chat-Client** (`code/client/`), Unit-Tests, drei E2E-Checks und zwei
  Analyse-Skripte. `search-core.js` ist framework-frei und direkt portierbar.
  Prüf das gleich mit `node code/smoke-test.mjs` (20 Prüfungen, kein Setup nötig).
- **`content/`** — die Knowledge Base: 83 deutsche und 81 französische Artikel
  (darunter **30 Fahrzeugartikel in beiden Sprachen**) plus **93 Anleitungs-/
  FAQ-Textextrakte**.
- **`daten/`** — Formatvorlage (DE+FR), Fahrzeugmatrix, Produktkatalog mit echten
  Artikelnummern, DE↔FR-Glossar und **106 verifizierte Gold-Testfälle**.

**Ebenfalls wichtig:** Unter `export/thi export/thi-standalone` existiert bereits
eine **lauffähige** Next.js-Fassung von Thi (deutsch, freier Chat). Sie ist eine
gute Referenz dafür, wie Client, Retrieval, Quellen-Chips und Streaming
zusammenspielen — aber sie zielt auf einen Next.js-Server, nicht auf Netlify, und
ihr fehlen die Wiki-Quelldateien für einen Index-Neubau. Einordnung in `06_…` §4.

---

## Was du dabei nicht neu erfinden musst

- **Die Formatvorlage existiert bereits fachlich**: `daten/support-fallaufnahme.de.md`
  ist ein redaktionell gepflegter Wiki-Artikel in 11 Sprachen. Unsere Aufgabe ist
  die **strukturierte, maschinenlesbare Fassung** — nicht der fachliche Inhalt.
- **Das Retrieval-Scoring ist ausgemessen.** Normalisierung, IDF-Deckelung,
  Coverage-Faktor, Typ-Abwertung, Abschnitts-Chunking — alles in `search-core.js`,
  mit Begründung im Kommentar.
- **Die Grounding-Prompts sind erprobt** („WORTLAUT SCHLÄGT ANNAHME",
  „KEINE-ANGABE-FALLE", Volltext-Pflicht) und haben 95 % Grounding-Treue gebracht.
  Wörtlich übernehmen, in `code/thi-route.js`.

---

## Wichtige Leitplanken

**Sicherheit geht vor Antwortfreude.**
Bei akutem Gas-, CO-, Rauch- oder Brandfall **eskaliert** das System sofort und
generiert **keine** Wiki-Antwort. Ebenso: keine verbindliche Kompatibilitäts-,
Software- oder Verdrahtungsaussage ohne belastbare Seriennummer und genaue
Fahrzeugangabe. Details in `03_FALLAUFNAHME_SCHEMA.md` §6.

**Nie raten.** Findet der Bot nichts Belastbares, sagt er das ehrlich und
verweist auf den THITRONIK-Support: **+49 (0)4351 76744-112**.

**Belegen statt behaupten.** Jede Sachaussage stützt sich auf die Quelle, mit
Verweis auf den konkreten Abschnitt. Das Modell nennt „Titel — Abschnitt";
**die Anwendung** rendert die geprüften Links. Das Modell erfindet **nie** Pfade.

**Messen statt vermuten.** Bevor am Scoring geschraubt wird, muss die
Retrieval-Eval laufen. Das Vorgängerprojekt hat +11 Punkte nur deshalb gefunden,
weil ein Gold-Set existierte.

---

## Sprache

Antworten und Code-Kommentare auf **Deutsch**. Die Benutzeroberfläche ist
deutsch- und französischsprachig.

---

## Wie ich starten möchte

Lies zuerst das Paket. Dann **kein Code**, sondern:

1. Deine **Einschätzung der Ausgangslage** — was ist übernehmbar, was muss neu,
   und wo widersprichst du den Empfehlungen im Paket?
2. Ein **Architekturvorschlag** mit den offenen Entscheidungen, die ich treffen
   muss (sie sind in `02_…` §6, `03_…` §8 und `04_…` §6 bereits gesammelt).
3. Eine **Reihenfolge der Umsetzung** — was zuerst, was hängt woran.

Erst wenn wir uns darauf geeinigt haben, fangen wir an zu bauen.
