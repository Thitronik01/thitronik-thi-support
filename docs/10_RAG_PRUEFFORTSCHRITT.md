# RAG-Fachprüfung – Fortschritt

Stand: **02.10.2026 · 71 %**

Die Prozentzahl misst abgeschlossene **gewichtete Arbeitsschritte** im Projekt „dokumentengestützte Fachprüfung der DE-/FR-Wissensbasis“. Sie ist keine Schätzung gelesener PDF-Seiten, kein Anteil fachlich freigegebener Aussagen und keine Antwortsicherheit des Bots. Die Gewichtung ist eine Planungsbasis und wird bei Änderungen des Umfangs ausdrücklich neu versioniert; sie ist keine gemessene Stundenverteilung.

## Fester Arbeitsplan, Version 1

| Arbeitspaket | Gewicht | Erreichte Punkte | Status |
|---|---:|---:|---|
| Bestand, Dubletten, Versionen und Extraktionslücken erfassen | 10 | 10 | 114 PDFs / 97 Inhalte inventarisiert; Seiten-/Textabdeckung dokumentiert |
| CampLock / VanLock | 15 | 10 | Quellenabgleich, DE/FR-Übernahme und lokale Belegtests erfolgt; Herstellerklärung und Live-Evaluation offen |
| WiPro / safe.lock und Bedienlogik | 15 | 10 | Bedienungsrevisionen plus Installation/FAQ/Kurzfassungen abgeglichen; 58 lokale Belegfälle bestanden; Live-Test und Herstellerklärung offen |
| Pro-Finder / Telemetrie / Befehle | 15 | 10 | 107 Originalseiten auf DE/FR-Inhalte geprüft, 40 Prüfpunkte dokumentiert, zehn Wiki-Routen integriert, 58 Belegfälle bestanden; Herstellerklärung und Live-Test offen |
| G.A.S. / CO / Sensorik | 10 | 7 | 16 PDFs / 74 ausgewählte Seiten, 48 Prüfpunkte, 16 DE/FR-Routen und 80 Belegfälle; Herstellerklärung und Live-Test offen |
| Funk-Zubehör einschließlich Wasser-/Magnetkontakt | 10 | 7 | 23 PDFs / 109 ausgewählte Seiten, 57 Prüfpunkte, sechzehn DE/FR-Routen und 100 Belegfälle; Herstellerklärung und Live-Test offen |
| Fahrzeugspezifische Anleitungen und Versionsgrenzen | 15 | 10 | 24 zusätzliche PDFs / 128 ausgewählte Seiten, 33 Befundgruppen, 68 DE/FR-Routen, 84 Belegfälle; fehlende Detailquellen, Herstellerklärung und Live-Test offen |
| Abschließender Gesamtvergleich, Importqualität und Gesamt-Evaluation | 10 | 7 | Wiki-Gesamtabgleich und Modulbau abgesichert; 404 Belegfälle, 82 historische Vergleichsfragen, Quellenintegrität geprüft; 24 Live-Pilotfälle vorbereitet, Ausführung offen |
| **Summe** | **100** | **71** | **71 % Gesamtfortschritt** |

Bereits vorher vorhandene Wiki-Inhalte zählen nicht automatisch als neu abgeschlossene Fachprüfung. Auch die ersten Sichtprüfungen anderer Produktfamilien erhalten noch keine Punkte für einen vollständigen Durchlauf.

## CampLock / VanLock: 10 von 15 Punkten

| Schritt | Punkte | Erledigt |
|---|---:|---|
| Quellen- und Aussagenmatrix, Varianten, Konfliktregister | 5 | Ja, [Detailprotokoll](quellenpruefung/2026-09-28-camplock-vanlock.md) |
| Belegte DE-/FR-Ergänzungen in Wiki und App-Daten | 3 | Ja, sechs Artikelrouten aktualisiert und synchron |
| Lokale Beleg-/Kontexttests und Regressionen | 2 | Ja, 24/24 Belegfälle, 9/9 Kontext-Modultests, bestehende Tests bestanden |
| Antworten des konfigurierten Modells beurteilen | 2 | Nein, Modellzugang in der lokalen Prüfumgebung nicht konfiguriert |
| Verbindliche Herstellerklärung der technischen Widersprüche | 3 | Nein, Fragen vorbereitet; keine externe Anfrage versendet |

Der Teilbereich CampLock/VanLock steht damit bei rund **67 %**. Eine bestandene lokale Suche darf nicht als bestandener Live-Antworttest gezählt werden. Dokumentierte Widersprüche dürfen nicht als geklärt gezählt werden.

## WiPro / safe.lock: 10 von 15 Punkten

Das bisher noch nicht unterteilte 15-Punkte-Paket wird folgendermaßen konkretisiert; die Gesamtgewichtung bleibt unverändert.

| Schritt | Punkte | Erledigt |
|---|---:|---|
| Bedienungsrevisionen 1.2/1.3, Aussagenmatrix DE/FR und Konfliktregister | 4 | Ja, 76 Sprachseiten plus zwei globale Deckblätter visuell gesichtet; [40 Prüfpunkte](quellenpruefung/2026-09-28-wipro-safelock.md) dokumentiert |
| Ergänzende Installations-, Kurzfassungs- und FAQ-Gegenprüfung | 1 | Ja, weitere 92 physische PDF-Seiten gesichtet; [35 Prüfpunkte und Fahrzeugausnahmen](quellenpruefung/2026-09-28-wipro-installation-faq.md) dokumentiert; Widersprüche bleiben offen |
| DE-/FR-Integration in Wiki und App-Daten | 3 | Ja, zunächst acht Routen, im Ergänzungslauf zehn betroffene Routen einschließlich sechs zusätzlicher Querverweise; Sichtbarkeit und Metadaten bewahrt |
| Lokale Beleg-/Kontexttests und Regressionen | 2 | Ja, 58/58 WiPro-Fälle, 24/24 Camp-/Van-Fälle, 179 Selbsttests, 16 Kontext-/Suchtests; acht Versionskonflikt-Kontexte konsistent |
| Live-Antwortprüfung | 2 | Nein, lokaler Modellzugang fehlt |
| Verbindliche Herstellerklärung | 3 | Nein; optische Alarmdauer, Sprachabweichungen, Ford-Jahresgrenzen und Zustand nach Teillöschung offen |

Dieser Teilbereich steht bei rund **67 %**. Die Arbeit an einzelnen Bedienhinweisen für Ford/Sprinter zählt hier; sie wird nicht zusätzlich im Fahrzeugpaket als vollständige Einbauprüfung verbucht.

## Pro-Finder: 10 von 15 Punkten

Das 15-Punkte-Paket wird wie Camp/Van in 5 + 3 + 2 + 2 + 3 Punkte unterteilt; die Gesamtgewichtung bleibt unverändert.

| Schritt | Punkte | Erledigt |
|---|---:|---|
| Quellen-/Aussagenmatrix, Befehle, Versionsgrenzen und Konflikte | 5 | Ja, 107 Originalseiten auf DE/FR-Inhalte visuell geprüft; OCR separat abgeglichen; [40 Prüfpunkte](quellenpruefung/2026-09-28-profinder.md) |
| DE-/FR-Integration in Wiki und App-Daten | 3 | Ja, zehn Wiki-Routen; zusätzlich vier Datenrouten ausschließlich durch Wiederherstellung zuvor entfernter Literalzeichen korrigiert |
| Lokale Beleg-/Kontexttests und Regressionen | 2 | Ja, 58/58 Pro-Finder-, 58/58 WiPro-, 24/24 Camp-/Van-Fälle; 179 Selbsttests, 19 Kontext-/Sprach-/Importtests, 6 Erkennungstests; keine Verluste bei den 82 allgemeinen Vergleichsfragen |
| Live-Antwortprüfung | 2 | Nein, Modellzugang lokal nicht konfiguriert |
| Verbindliche Herstellerklärung | 3 | Nein, u. a. Altgeräte-Geofencing, Befehls-/Sprachvarianten, FR-Pin-Fehler, Modus 9 und 24-V-Unterspannung offen |

Der Pro-Finder-Teilbereich steht bei rund **67 %**. Nach diesem Durchlauf am 28.09. lag das Gesamtprojekt bei **40 %**. Die damaligen allgemeinen Vergleichsfragen erreichten unverändert 78/82 erwartete Artikel in Top 8 und 12/82 wörtliche Altbelege im Kontext; sie werden nicht als 82 bestandene Fachtests gezählt. Offene Dokumentwidersprüche und fehlende Live-Modellprüfung verhindern eine vollständige fachliche Freigabe.

## G.A.S. / CO / Sensorik: 7 von 10 Punkten

Das bisher nicht unterteilte 10-Punkte-Paket wird in 4 + 2 + 1 + 1 + 2 Punkte konkretisiert; die Gesamtgewichtung des Plans bleibt unverändert.

| Schritt | Punkte | Erledigt |
|---|---:|---|
| Quellen-/Aussagenmatrix, Varianten und Konflikte | 4 | Ja, 74 ausgewählte Originalseiten aus 16 PDFs auf DE/FR-Inhalte und gemeinsame Zeichnungen geprüft; sieben offizielle Webseiten; [48 Prüfpunkte](quellenpruefung/2026-10-01-gas.md) |
| DE-/FR-Integration in Wiki und App-Daten | 2 | Ja, 16 Wiki-Routen aktualisiert; Originalkopien und Metadaten geprüft |
| Lokale Beleg-/Kontexttests und Regressionen | 1 | Ja, 80/80 neue Belegfälle; 24/24 Camp-/Van-, 58/58 WiPro- und 58/58 Pro-Finder-Fälle bestanden |
| Live-Antwortprüfung | 1 | Nein, noch kein Modelltest durchgeführt |
| Verbindliche Herstellerklärung | 2 | Nein, insbesondere CO-Montage, Prüfverfahren, Stromaufnahme, Dokumentstände, Unterspannung und CO-Vorrang offen |

Der Teilbereich steht bei **70 %**, das Gesamtprojekt bei **47 %**. Die allgemeinen 82 Vergleichsfragen behalten 78 erwartete Artikel in Top 8. Die historische Literalmetrik liegt bei 12 → 11 Treffern durch zusätzliche Tabellen-Leerzeichen; bei identischer Leerzeichen-Normalisierung vor/nach bleiben 15/82 Belege erhalten. Die Negation zum III-Feuerzeugtest ist vollständig im Kontext vorhanden. Die allgemeinen Fragen zählen nicht als 82 bestandene Fachtests. Widersprüche werden kenntlich gemacht, nicht als geklärt gewertet.

## Funk-Zubehör: 7 von 10 Punkten

Das 10-Punkte-Paket folgt der Aufteilung 4 + 2 + 1 + 1 + 2; die Gesamtgewichtung bleibt unverändert.

| Schritt | Punkte | Erledigt |
|---|---:|---|
| Aussagenmatrix, Varianten und Quellenkonflikte | 4 | Ja, 23 PDFs / 109 ausgewählte DE-/FR-/Abbildungsseiten, zehn offizielle Webseiten und [57 Prüfpunkte](quellenpruefung/2026-10-01-funk.md) |
| DE-/FR-Integration | 2 | Ja, sechzehn Wiki-Routen; 23 Originalkopien mit Hashnachweis; Montage-, Alarm- und Variantenabgrenzungen präzisiert |
| Lokale Belegtests und Vergleich | 1 | Ja, 100/100 neue sowie 220/220 bisherige Paketfälle, 179 Selbsttests, 19 Modul- und 6 Erkennungstests |
| Live-Antwortprüfung | 1 | Nein, kein Modelltest durchgeführt |
| Herstellerklärung | 2 | Nein, u. a. Kontaktabstand, Gewicht/Temperatur, Batterieanzeigen, NFC-Dokumentkennung und T.S.A.-Norm/FR-Text offen |

**Funk-Zubehör steht bei 70 %, das Gesamtprojekt bei 54 %.** Im allgemeinen Vergleich bleiben 11 strikte beziehungsweise 15 leerzeichennormalisierte Altbelege erhalten. Die historische erwartete Artikelquote sinkt von 78 auf 77/82: Bei einer französischen Wassermelder-Versionsfrage steht jetzt der passende Produktartikel mit 0823-021/6.8 auf Rang 1, das früher erwartete Serienregister auf Rang 9. Diese belegte Ersatzquelle wird separat ausgewiesen; die historische Quote und die 82 Altfragen werden nicht zu bestandenen Live-Antworttests umgedeutet.

## Fahrzeuge und Versionsgrenzen: 10 von 15 Punkten

Das 15-Punkte-Paket folgt der Aufteilung 5 + 3 + 2 + 2 + 3; die Gesamtgewichtung bleibt unverändert.

| Schritt | Punkte | Erledigt |
|---|---:|---|
| Aussagenmatrix, Fahrzeug-/Versionsabgleich und Quellenlücken | 5 | Ja, 24 zusätzliche PDFs / 128 ausgewählte Originalseiten, drei bereits geprüfte Primärquellen wiederverwendet, [33 Befundgruppen](quellenpruefung/2026-10-01-fahrzeuge.md) |
| DE-/FR-Integration | 3 | Ja, 68 Routen einschließlich Übersicht und Versionsregister; Quellenkopien und Metadaten geprüft |
| Lokale Belegtests und Vergleich | 2 | Ja, 84/84 neue Fälle und 320/320 bisherige Paketfälle; 179 Selbsttests, 19 Modul- und 6 Erkennungstests |
| Live-Antwortprüfung | 2 | Nein, keine generierten Modellantworten geprüft |
| Verbindliche Herstellerklärung und fehlende Detailquellen | 3 | Nein, u. a. Ford-Deadlock, Vito-Versionen, Ducato-Software, ILS und Upgrade-Umfang offen; sieben Profile ohne vollständige neu geprüfte Originalanleitung |

Der Teilbereich steht bei rund **67 %**, das Gesamtprojekt bei **64 %**. Die Punkte würdigen den Abgleich der verfügbaren Quellen und die dokumentierten Lücken; sie bestätigen keine vollständige Einbaufreigabe aller Varianten. Die allgemeinen Vergleichsfragen bleiben bei 77/82 erwarteten Artikeln in Top 8. Strikte Altbelege sinken von 11 auf 10, leerzeichennormalisierte von 15 auf 14: Eine alte französische Erwartung fordert fälschlich ausschließlich WiPro für die Umrüstplatine; FAQ PDF 24 belegt auch Modul 101051. Diese bewusste fachliche Korrektur ist separat geprüft, die historische Metrik bleibt sichtbar.

## Gesamtvergleich und Importqualität: 7 von 10 Punkten

Das bisher nicht unterteilte 10-Punkte-Paket wird in 3 + 3 + 1 + 3 Punkte konkretisiert. Planversion und Gesamtgewichtung bleiben unverändert.

| Schritt | Punkte | Erledigt |
|---|---:|---|
| Importqualität und reproduzierbarer Wiki-Gesamtabgleich | 3 | Ja, gemeinsame Klartextverarbeitung, Erhalt technischer Zeichen, 143 Wiki-Routen, interne Bereiche ausgeschlossen, lange Glossarabschnitte erhalten, Modulbau vor ungültigen Eingaben geschützt |
| Gesamtvergleich und Quellenintegrität | 3 | Ja, 404/404 Belegfälle, 82 historische Fragen ohne neue Regression; 79 PDF-Kopien, 89 Originalpfade und 585 Seitenverweise geprüft; Quellenlücken separat ausgewiesen |
| Live-Antwort-Evaluation vorbereiten | 1 | Ja, je zwölf DE-/FR-Pilotfälle aus den sechs Produktpaketen mit eingefrorenen Belegen und Antwortkriterien |
| Live-Antwort-Evaluation und Abnahme | 3 | Nein, API-Adresse und API-Schlüssel lokal nicht konfiguriert; keine Modellantworten bewertet |

**Gesamtfortschritt: 71 %.** Der allgemeine Fragenkatalog bleibt bei 77/82 erwarteten Artikeln in Top 8, zehn strikten und 14 leerzeichennormalisierten Altbelegen. Die 24 Pilotfälle sind eine Auswahl der bereits gezählten 404 Fälle und erhöhen deren Zahl nicht. Historische Quellenpfade und elf widersprüchliche französische Redaktionsstatus sind offene Befunde; die neue Importfunktion verleiht keine neue fachliche Freigabe. Die 81 PDF-/FAQ-Exporte werden unverändert bewahrt, nicht erneut aus den Roh-PDFs extrahiert. [Detailbericht](quellenpruefung/2026-10-02-gesamtvergleich.md).

## Nächster unabhängiger Arbeitsschritt

Historische Quellenverweise und FR-Redaktionsstatus mit dem Ursprungsprojekt abgleichen sowie die offenen Herstellerfragen bündeln. Nach Einrichtung des Modellzugangs den vorbereiteten Live-Piloten DE/FR ausführen, anschließend die vollständige Antwort-Evaluation und Abnahme. Die Herstellerklärungen und fehlenden Detailanleitungen bleiben offen; ein lokaler Belegtest ersetzt diese Schritte nicht.

## Nachweise und Dateien

- [Gesamtinventar](quellenpruefung/2026-09-27-pdf-inventar.csv)
- [Erster Quellenbericht](09_PDF_QUELLENPRUEFUNG_2026-09-27.md)
- [CampLock-/VanLock-Aussagenmatrix und Freigabefragen](quellenpruefung/2026-09-28-camplock-vanlock.md)
- [Ergebnis der 24 Belegtests](quellenpruefung/2026-09-28-fingerprint-retrieval.json)
- [Vergleich mit 82 allgemeinen Goldfragen](quellenpruefung/2026-09-28-kontext-vergleich.json)
- [WiPro-DE/FR-Matrix und offene Fragen](quellenpruefung/2026-09-28-wipro-safelock.md)
- [34 WiPro-Belegtests](quellenpruefung/2026-09-28-wipro-retrieval.json)
- [WiPro-Datenintegrität und Vergleich der 82 allgemeinen Goldfragen](quellenpruefung/2026-09-28-wipro-regression.json)
- [WiPro-Installation, FAQ, Kurzfassungen und offene Herstellerfragen](quellenpruefung/2026-09-28-wipro-installation-faq.md)
- [58 WiPro-Belegtests nach dem Ergänzungslauf](quellenpruefung/2026-09-28-wipro-installation-retrieval.json)
- [Integrität, acht Querverweise und 82 allgemeine Vergleichsfragen](quellenpruefung/2026-09-28-wipro-installation-regression.json)
- [Pro-Finder: 40 Prüfpunkte, Quellenkonflikte und Herstellerfragen](quellenpruefung/2026-09-28-profinder.md)
- [Pro-Finder-Quellenmanifest mit Hashes und Seitenbereichen](quellenpruefung/2026-09-28-profinder-quellen.json)
- [58 Pro-Finder-Belegtests](quellenpruefung/2026-09-28-profinder-retrieval.json)
- [Pro-Finder-Integrität und 82 allgemeine Vergleichsfragen](quellenpruefung/2026-09-28-profinder-regression.json)
- [G.A.S./CO/Sensorik: 48 Prüfpunkte und offene Herstellerfragen](quellenpruefung/2026-10-01-gas.md)
- [Gas-Quellenmanifest mit Hashes und Seitenbereichen](quellenpruefung/2026-10-01-gas-quellen.json)
- [80 Gas-/CO-Belegtests](quellenpruefung/2026-10-01-gas-retrieval.json)
- [Gas-Integrität und 82 allgemeine Vergleichsfragen](quellenpruefung/2026-10-01-gas-regression.json)
- [Funk-Zubehör: 57 Prüfpunkte und offene Herstellerfragen](quellenpruefung/2026-10-01-funk.md)
- [Funk-Quellenmanifest mit Hashes und Seitenbereichen](quellenpruefung/2026-10-01-funk-quellen.json)
- [100 Funk-Zubehör-Belegtests](quellenpruefung/2026-10-01-funk-retrieval.json)
- [Funk-Integrität und 82 allgemeine Vergleichsfragen](quellenpruefung/2026-10-01-funk-regression.json)
- [Fahrzeuge: Dokumentprüfung, Korrekturen und offene Herstellerfragen](quellenpruefung/2026-10-01-fahrzeuge.md)
- [Fahrzeug-Quellenmanifest mit Hashes, Seitenbereichen und Lücken](quellenpruefung/2026-10-01-fahrzeuge-quellen.json)
- [33 Fahrzeug-/Versions-Befundgruppen](quellenpruefung/2026-10-01-fahrzeuge-aussagen.json)
- [84 Fahrzeug-Belegtests](quellenpruefung/2026-10-01-fahrzeuge-retrieval.json)
- [Fahrzeug-Integrität und 82 allgemeine Vergleichsfragen](quellenpruefung/2026-10-01-fahrzeuge-regression.json)
- [Gesamtvergleich und Importqualität](quellenpruefung/2026-10-02-gesamtvergleich.md)
- [Wiki-Gesamtabgleich: Änderungen und Ausschlüsse](quellenpruefung/2026-10-02-gesamt-import.json)
- [404 Belegfälle und historischer Vorher-/Nachher-Vergleich](quellenpruefung/2026-10-02-gesamt-regression.json)
- [Quellenintegrität und historische Pfadlücken](quellenpruefung/2026-10-02-gesamt-quellen.json)
- [Live-Vorbereitung und lokaler Konfigurationsstand](quellenpruefung/2026-10-02-live-vorbereitung.json)
- [Maschinenlesbarer Projektstand](quellenpruefung/projektfortschritt.json)

## Verlauf

- 27.09.2026: Inventar und erste Detailprüfung abgeschlossen. Nach der am 28.09. festgelegten Gewichtung entspricht der Bestandsschritt 10 Punkten.
- 28.09.2026: Camp-/Van-Dokumentabgleich, Übernahme und lokale Tests abgeschlossen; zusätzlich 10 Punkte. Gesamt **20/100**. Wissensänderungen und Kontextkorrektur liegen lokal, ohne Commit/Push/Deployment dieses Durchlaufs.
- 28.09.2026, WiPro-Durchlauf: DE-/FR-Bedienungsrevisionen, acht Routen und lokale Tests bearbeitet; zusätzlich 9 Punkte. Gesamt **29/100**. Weitere Dokumentarten, Herstellerklärung und Live-Modelltest bleiben offen. Änderungen lokal, ohne Commit/Push/Deployment.

- 28.09.2026, WiPro-Ergänzungslauf: Installation Rev. 1.8, zwei FAQ und zwei Kurzfassungen gegengeprüft, Konflikte in DE/FR und Querverweisen integriert, FAQ-Abschnitte vollständig abrufbar; zusätzlich 1 Punkt. Gesamt **30/100**. 58 Belegfälle, 179 Selbsttests und 16 Kontext-/Suchtests bestanden. Live-Modelltest und Herstellerklärung offen. Änderungen lokal, ohne Commit/Push/Deployment.
- 28.09.2026, Pro-Finder-Durchlauf: Alte/neue Handbücher, Kurzfassungen, FAQ, Befehlsmatrizen und Abschalteinrichtungen gegengeprüft; 107 Originalseiten, 40 Prüfpunkte, zehn Wiki-Routen und Importkorrektur für SMS-Steuerzeichen; zusätzlich 10 Punkte. Gesamt **40/100**. 58 Pro-Finder-Belegfälle bestanden; Herstellerklärung und Live-Modelltest bleiben offen. Änderungen lokal, ohne Commit/Push/Deployment.
- 01.10.2026, G.A.S./CO/Sensorik: 16 PDFs mit 74 ausgewählten Seiten, sieben offizielle Webquellen, 48 Prüfpunkte und 16 DE/FR-Wiki-Routen bearbeitet; 80/80 neue Belegfälle bestanden. Zusätzlich 7 Punkte, Gesamt **47/100**. Herstellerklärung und Live-Antworttest bleiben offen. Änderungen lokal, ohne Commit/Push/Deployment dieses Durchlaufs.

- 01.10.2026, Funk-Zubehör: 23 PDFs mit 109 ausgewählten Seiten, zehn Webquellen, 57 Prüfpunkte, sechzehn DE/FR-Routen und 100/100 Belegfälle bearbeitet. Zusätzlich 7 Punkte, Gesamt **54/100**. Herstellerklärung und Live-Antworttest bleiben offen. Änderungen lokal, ohne Commit/Push/Deployment dieses Durchlaufs.

- 01.10.2026, Fahrzeug-Durchlauf: 24 zusätzliche PDFs / 128 ausgewählte Seiten, 33 Befundgruppen, 68 DE/FR-Routen und 84/84 neue Belegfälle bearbeitet. Zusätzlich 10 Punkte, Gesamt **64/100**. Fehlende Detailquellen, Herstellerklärung und Live-Antworttest bleiben offen. Änderungen lokal, ohne Commit/Push/Deployment dieses Durchlaufs.

- 02.10.2026, Gesamtvergleich/Importqualität: 143 Wiki-Routen abgeglichen, 14 Datenrouten geändert, 81 PDF-/FAQ-Exporte erhalten; 404 Belegfälle, 179 Selbsttests, 35 Modultests und sechs Erkennungstests bestanden. 24 Live-Pilotfälle vorbereitet, nicht ausgeführt. Zusätzlich 7 Punkte, Gesamt **71/100**. Quellenlücken, Redaktionsstatus, Herstellerklärung und Live-Abnahme bleiben offen. Änderungen lokal, ohne Commit/Push/Deployment.

## Quellenpflege vom 02.10.2026 – weiterhin 71 %

[Pflegebericht](quellenpruefung/2026-10-02-quellenpflege.md): 713 Verweiszuordnungen vereinheitlicht, 144 Doppeleinträge entfernt, 81 Repository-PDFs und 114 Originaldateien per SHA-256 geprüft; 585 PDF-Seitenverweise inklusive Seitenobergrenzen bestätigt. Beide internen Quellenmatrizen bilden jetzt den tatsächlichen Bestand ab.

Offen sind 982 unterschiedliche, nicht auffindbare historische Dateiverweise, zehn nur im Anleitungen-Ordner verfügbare PDFs und ein gesonderter Sammelverweis. Die frühere Zahl 1146 wird durch die präzisierte Prüfung ersetzt; sie war wegen abgeschnittener YAML-Werte und alter Pfadformen keine verlässliche Zahl fehlender Dateien. Die elf FR-Statusabweichungen sind mit Originalen und Git-HEAD abgeglichen, aber nicht freigegeben.

Alle 404 Belegfälle, 179 Selbsttests und 45 Modultests bestehen. Die App-Daten bleiben bytegleich. Diese Pflege erhält keine zusätzlichen Punkte: Herstellerklärungen und Live-Antwortprüfung stehen weiterhin aus.

## Herstellerklärung und Live-Prüfung gestartet – weiterhin 71 %

[Ausführungsbericht vom 02.10.2026](quellenpruefung/2026-10-02-hersteller-live.md): 47 Hersteller-Prüfpunkte zusammengestellt, zehn offizielle Fundstellen gezielt nachgeprüft und ein zusätzlicher Herstellerhinweis in vier CampLock-/VanLock-Artikeln ergänzt. 408 Belegfälle, 179 Selbsttests und 45 Modultests bestehen. Der Live-Pilot umfasst nun 28 vorbereitete Fälle.

Der lokale Server wurde gestartet und sein Live-Health-Endpunkt aufgerufen: HTTP 503 wegen fehlender API-Adresse und fehlendem API-Schlüssel. Auch der echte Evaluator brach vor dem ersten Modellaufruf ab. Null echte Modellantworten bewertet. Herstellerantworten liegen nicht vor; Versandweg beziehungsweise interne Fachklärung und Testzugang sind angefragt. Keine zusätzlichen Punkte für Vorbereitung oder fehlgeschlagene Ausführung.
