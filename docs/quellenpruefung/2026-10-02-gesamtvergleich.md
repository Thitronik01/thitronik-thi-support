# Gesamtvergleich und Importqualität – 02.10.2026

**Der lokale Wiki-Import ist abgesichert und der neue Datenstand besteht alle 404 Belegfälle. Gesamtfortschritt: 71 %. Echte Modellantworten wurden nicht geprüft.**

## Umfang

Geprüft wurde die Kette lokales Markdown → Artikel/Abschnitte → ausgelieferte JavaScript-Module → Retrieval und Kontext. Der Vorher-Stand wurde unter `.rag-audit/2026-10-02-gesamt-before` im übergeordneten THI-Arbeitsordner gesichert. Bereits vorhandene Änderungen aus den vorherigen Paketen wurden bewahrt.

| Bestand | Ergebnis |
|---|---:|
| Lokale Wiki-Dateien DE/FR | 164 |
| Bestehende öffentliche Wiki-Routen im Abgleich | 143 |
| Interne Seiten ausgeschlossen | 21 |
| Bestehende PDF-/FAQ-Exporte unverändert bewahrt | 81 |
| Artikel insgesamt | 224 |
| Abschnitte insgesamt | 2837 |
| Tatsächlich geänderte Datenrouten | 14 |
| Technische Inline-Literalvorkommen auf Erhalt geprüft | 4223 |

143 + 81 ergibt den vorhandenen App-Bestand von 224 Artikeln. Die 81 Exporte werden nicht erneut aus PDF extrahiert. Die Original-PDFs und alle 164 Wiki-Dateien blieben unverändert. „Öffentlich“ bezeichnet hier die bestehende Standard-Sicht des Suchindexes, keine neue rechtliche oder fachliche Freigabe und keinen unauthentifizierten Zugriff.

## Behobene Importfehler

1. **Technische Zeichen:** Referenz-Ingest und Support-Synchronisierung verwenden jetzt dieselbe reine Klartextfunktion `code/wiki-klartext.mjs`. SMS-Beispiele wie `*100#P+S49…`, Rauten, Unterstriche und Vergleichszeichen bleiben erhalten. Die bisherige pauschale Entfernung von Markdown-Zeichen hätte im alten Vollimport Befehle beschädigt. Inline-Code wird vor Formatbereinigung geschützt; Platzhalterzeichen können nicht mit Nutztext kollidieren.
2. **Abschnittsgrenzen:** CRLF, BOM, horizontale Trenner und Codeblöcke mit Backticks oder Tilden werden konsistent behandelt. Überschriften in Codebeispielen erzeugen keine Scheinabschnitte. Codeblöcke bleiben gemäß bisheriger Importkonvention ausgeschlossen; die ausgewiesene Literalprüfung betrifft technische Inline-Werte, nicht pauschal jeden Codeblock.
3. **Lange Glossarabschnitte:** Die bisher bei 4000 Zeichen abgeschnittenen DE-/FR-Abschnitte bleiben mit 4732 bzw. 5389 Zeichen vollständig im Index. Für diese Artikel wird auch der vollständige Körpertext bewahrt, damit der bestehende Kontext-Fallback auf spätere Stellen zugreifen kann. Die Modell-Kontextbudgets bleiben unverändert; vollständige Speicherung garantiert keine vollständige Übernahme in jede Antwort.
4. **Interne Inhalte und Anker:** 21 interne Seiten sowie interne H2-Bereiche und deren Unterabschnitte werden ausgeschlossen. Bestehende Anker werden erhalten, auch bei früher durch github-slugger erzeugten Sonderzeichen-IDs. Unbekannte Artikelrouten werden nicht automatisch aufgenommen. Der Abgleich bewahrt vorhandene Artikelmetadaten und die bestehenden Keywords.
5. **Ungültige Eingabedaten:** `daten-bauen.mjs` prüft alle JSON-Eingaben vor dem ersten Schreibzugriff. Beschädigte Korrekturdaten überschreiben nicht länger den letzten Modulstand mit einer leeren Liste. Auch ungültige Artikel-/Abschnittsdaten lassen den letzten gültigen Stand erhalten. Dies ist eine Eingabeprüfung, keine zugesicherte Dateisystemtransaktion bei Hardware-/Schreibfehlern.

Der vollständige ursprüngliche Next.js-Exporter `code/wiki-ingest.mjs` benötigt weiterhin Bibliotheken und Projektdateien des Ursprungsprojekts. Hier wurden seine gemeinsame Klartext-/Zeilenverarbeitung sowie seine Syntax geprüft; ein vollständiger Next.js-Export dieses anderen Projekts wurde nicht vorgetäuscht. Der neue, ausführbare App-Weg ist `app/werkzeuge/wiki-gesamt-sync.mjs`.

## Prüfung und Vergleich

| Prüfung | Ergebnis |
|---|---|
| Produktpakete Camp/Van, WiPro, Pro-Finder, Gas, Funk, Fahrzeuge | **404/404** Belegfälle |
| Bestehende Selbsttests | **179/179** |
| Kontext-, Such-, Import- und Modulbau-Tests | **35/35** |
| Fingerprint-Erkennung und Browser-Katalog | **6/6** |
| Allgemeiner historischer Katalog | **82 Fragen**, erwartete Quelle in Top 8 unverändert **77 → 77** |
| Historische wörtliche Belege | Unverändert **10 → 10** strikt, **14 → 14** leerzeichennormalisiert |
| Datenintegrität | JSON/MJS gleich, Korrekturen unverändert, Artikelmetadaten und bestehende Anker erhalten |
| Wiederholbarkeit | Erneuter Gesamtabgleich meldet keine Änderungen |

Die 404 Fälle prüfen erwarteten Artikelrang, Beleganker und Pflichtangaben im tatsächlichen Kontextauszug. Ein separater Gesamtprüfer hat zuerst den Importkandidaten und anschließend die App-Daten gegen den gesicherten Vorher-Stand geprüft. Suchkern und Kontextlogik wurden in diesem Block nicht verändert. Die historischen Fragen werden nicht als 82 bestandene Fachtests gezählt; ihre begrenzten Literalwerte bleiben sichtbar.

Nachweise: [Importprotokoll](2026-10-02-gesamt-import.json), [Gesamtvergleich](2026-10-02-gesamt-regression.json).

## Quellenintegrität und offene Befunde

- **79 PDF-Kopien** gegen SHA-256 aus den Quellenmanifesten bzw. dem Originalinventar geprüft. Zusätzlich wurden **89 Originaldateipfade** verglichen; mehrere Pfade können denselben Inhalt tragen. Die Zahlen dürfen nicht zu einer Anzahl unterschiedlicher neu geprüfter Handbücher addiert werden.
- **276 Frontmatter-Verweise** auf lokale PDF-Kopien, **51 unterschiedliche dort referenzierte lokale PDF-Pfade** und **585 physische PDF-Seitenlinks** geprüft. Seitenobergrenzen wurden geprüft, soweit die Manifeste Seitenzahlen enthalten. Alle lokalen PDF-Ziele existieren; keine defekten relativen Markdown-Dateilinks nach URL-Dekodierung gefunden.
- **1146 unterschiedliche historische Frontmatter-Pfade** sind im Übergabepaket nicht auflösbar. Das betrifft unter anderem frühere `sources/`, `wiki/` und Laufwerkspfade aus dem Ursprungsprojekt, einschließlich interner Wiki-Seiten. Das ist weder die Anzahl fehlender PDF-Dateien noch die Anzahl fachlich falscher Aussagen. Die Pfade wurden nicht erfunden, umgebogen oder als verifiziert ausgegeben. Ein Abgleich mit dem Ursprungsprojekt bleibt erforderlich.
- **Elf französische Seiten** haben `dealerStatus: internal_only`, während der vorhandene App-Export sie als `visibility: standard` führt. Im Referenzexport steuert `visibility` die Zugriffssicht; `dealerStatus` ist ein separates Redaktionslabel. Der Import bewahrt die vorhandene Sichtbarkeit und protokolliert diese Abweichung, statt eine neue Freigabe zu behaupten. Der Status muss im Ursprungsprojekt geklärt werden.
- Die offenen fachlichen Widersprüche und fehlenden fahrzeugspezifischen Detailanleitungen aus den vorherigen Paketen bleiben offen. Der Gesamtvergleich ist kein neuer vollständiger PDF-Inhaltsdurchlauf.

Die elf FR-Routen:

- `/fr/anlernvorgang`
- `/fr/app-befehle`
- `/fr/bt-connect`
- `/fr/gas-connect`
- `/fr/gas-plug`
- `/fr/gas`
- `/fr/glossar`
- `/fr/nfc-modul`
- `/fr/pro-finder`
- `/fr/stoerungsbeseitigung`
- `/fr/wipro-iii`

Details und vollständige Pfadlisten: [Quellenintegritätsbericht](2026-10-02-gesamt-quellen.json). Die Liste der Redaktionsstatus steht zusätzlich im [Importprotokoll](2026-10-02-gesamt-import.json).

## Live-Antwortprüfung vorbereitet

Unter `daten/thi-eval-gesamt-live.de.json` und `.fr.json` liegen je zwölf Pilotfälle aus allen sechs Produktpaketen. Sie prüfen insbesondere Varianten, Negationen, Quellenkonflikte, technische Zeichen und fehlende Freigaben. Die Belege sind eingefrorene, gehashte Wiki-Kontextauszüge; Antwortkriterien und unzulässige Behauptungen sind beigefügt. Die Fälle sind eine Auswahl aus den bisherigen 404 Belegfällen, keine zusätzliche unabhängige Stichprobe.

**Nicht ausgeführt:** API-Adresse und API-Schlüssel sind lokal am 02.10.2026 nicht konfiguriert. Es gab keine Modellaufrufe und keine Netzwerkprüfung des Anbieters. Auch ein später vorhandener Schlüssel bestätigt noch nicht Anmeldung, Modellverfügbarkeit oder Antwortqualität. [Konfigurations-/Vorbereitungsnachweis](2026-10-02-live-vorbereitung.json).

Der Evaluator unterstützt jetzt neben dem früheren Zugangswort auch den regulären Bearer-Login über `THI_EVAL_BEARER_TOKEN`. Dafür ist eine gültige App-Sitzung nötig; der Token wird ausschließlich als HTTP-Header an den App-Endpunkt gesendet und nicht im Ergebnisbericht gespeichert. Der Provider-Schlüssel bleibt davon getrennt. Zwei lokale HTTP-Tests mit künstlichen Antworten bestätigen Bearer-/Zugangswort-Übertragung und die Trennung der Zugangsdaten; sie sind keine Live-Antworttests. Eine echte Anmeldung wurde nicht ausgeführt.

Nach konfiguriertem lokalem Server und gültiger Evaluationsanmeldung kann der Pilot aus `app/` gestartet werden:

```bash
node werkzeuge/antwort-eval.mjs --sprache de --gold ../daten/thi-eval-gesamt-live.de.json --judge --ergebnis ../docs/quellenpruefung/live-pilot-de.json
node werkzeuge/antwort-eval.mjs --sprache fr --gold ../daten/thi-eval-gesamt-live.fr.json --judge --ergebnis ../docs/quellenpruefung/live-pilot-fr.json
```

Die Ergebnisse sind anschließend fachlich zu beurteilen; der vorbereitete Pilot ersetzt weder den vollständigen Antworttest noch die Herstellerklärung.

## Wiederholbare Arbeitsweise

Aus `app/`:

```bash
npm run wiki:check
# Vor einem neuen Import: aktuellen Datenstand sichern und Kandidaten prüfen.
node werkzeuge/wiki-gesamt-sync.mjs --output-dir ../../.rag-audit/kandidat --report ../../.rag-audit/kandidat-import.json
node werkzeuge/gesamtvergleich.mjs --data ../../.rag-audit/kandidat --baseline data --report ../../.rag-audit/kandidat-vergleich.json
# Nur nach erfolgreichem Vergleich übernehmen:
npm run wiki:sync
npm run daten
npm test
npm run test:gesamt
```

Ohne `--baseline` gibt `gesamtvergleich.mjs` aktuelle Metriken aus; mit Baseline prüft es zusätzlich auf Verluste. Fehlgeschlagene Kandidaten werden nicht durch dieses Prüfschema automatisch übernommen. Die Quellkopien lassen sich mit `node werkzeuge/quellen-integritaet-pruefen.mjs` prüfen; für Originalvergleiche wird außerdem der lokale Ordner `Anleitungen` benötigt.

## Projektfortschritt

Das bisher offene 10-Punkte-Paket wird in Importqualität 3, Gesamtvergleich 3, Live-Vorbereitung 1 und Live-Abnahme 3 unterteilt. Die ersten sieben Punkte sind erreicht, die Live-Abnahme bleibt offen. Gesamt: **64 → 71 %** bei unveränderter Planversion 1. Die Prozentzahl misst Arbeitsschritte, keine Antwortsicherheit und keine Herstellerfreigabe.

Nächste Schritte: Herkunft der historischen Quellenpfade und FR-Redaktionsstatus klären; Herstellerfragen bündeln; nach eingerichtetem Modellzugang den Live-Piloten und anschließend die vollständige Antwort-Evaluation durchführen. In diesem Durchlauf erfolgten kein Commit, Push oder Deployment.
