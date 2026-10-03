# Fachprüfung CampLock / VanLock – 28.09.2026

## Geltungsbereich und Ergebnis

Erster vertiefter Durchlauf der DE-/FR-Wissensbasis. Grundlage sind die drei unveränderten Hersteller-PDFs C1, C2 und K1. Geprüft wurden die produktbezogenen Bedien- und Technikangaben; beim Katalog die Fingerprint-Doppelseite, bei C2 die deutschen und französischen Fassungen. Keine pauschale Freigabe der übrigen Sprachfassungen oder des gesamten Katalogs.

Dokumentenabgleich, gezielte Wiki-Korrekturen, Synchronisierung und lokale Belegtests sind erfolgt. **Eine verbindliche Herstellerfreigabe und ein Live-Modelltest stehen noch aus.** Ungeklärte Angaben werden in der Wissensbasis ausdrücklich als Quellenkonflikt wiedergegeben.

| Quelle | Pfad | Geprüfte Fundstellen |
|---|---|---|
| C1 | [CampLock-Kurzanleitung](../../content/quellen/camplock-fingerprint.pdf) | Beide physischen PDF-Seiten; DE/FR-Bedienung und Technik; EN-Löschschritt auf S. 1 gesondert verglichen. Art. 106111/106144, Rev. 1.0. |
| C2 | [CampLock-/VanLock-Anleitung](../../content/quellen/camplock-vanlock-fingerprint.pdf) | DE S. 2–10; FR S. 20–28. Englischer Löschschritt S. 17 ergänzend textlich verglichen. Camp 106111-002/106144-002; Van 106259/106260. |
| K1 | [Deutscher Katalog](../../content/quellen/katalog_thitronik_de.pdf) | Physische S. 25, gedruckt 48 VanLock / 49 CampLock. |

Die vollständigen Prüfsummen stehen im [Inventar](2026-09-27-pdf-inventar.csv). Die Kopien in `content/quellen/` wurden bytegleich gegen die inventarisierten Originale geprüft. „Belegt“ bedeutet nachfolgend: durch diese Dokumente gestützt, nicht am realen Gerät messtechnisch verifiziert.

## Aussagenmatrix

| ID | Aussage / Prüfgegenstand | Beleg | Ergebnis |
|---|---|---|---|
| F01 | CampLock ohne -002: zahlreiche Hartal-Aufbautüren mit Zentralverriegelung; keine allgemeine Freigabe aller Türen. | C1 S. 2 | Belegt; Artikelnummer erforderlich. |
| F02 | Ohne -002: WiPro III bedient Hartal-Tür und Alarm; safe.lock das Gesamtfahrzeug und Alarm. | C1 S. 2 | Belegt; getrennte Varianten im DE-/FR-Wiki. |
| F03 | Ohne -002: Türzustand wird gemeldet; zusätzlicher Funk-Magnetkontakt an dieser Tür nicht nötig. | C1 S. 2 | Belegt; nicht auf -002 übertragen. |
| F04 | CampLock -002: gemeinsame Anleitung beschreibt ausschließlich WiPro III safe.lock als Zubehörsystem. | C2 DE S. 2–3 / FR S. 20–21 | Belegt für diese Anleitung; keine erfundene Freigabe für Standard-WiPro. |
| F05 | VanLock 106259/106260: Standard-WiPro-Kompatibilität. | C2 DE S. 3 / FR S. 21; K1 S. 25 | **Offener Konflikt V1**, siehe Freigabefragen. |
| F06 | Vor Betrieb mindestens ein Finger registrieren und separat am Alarmsystem koppeln. | C1 S. 2; C2 DE S. 4,6 / FR S. 22,24 | Belegt; zwei verschiedene Anlernvorgänge. |
| F07 | Erstinbetriebnahme: Gelb; 15-mal auflegen; fünfmal grün bestätigt. | C1 S. 2; C2 DE S. 4 / FR S. 22 | Belegt. Alte Camp-Ausführung: zuvor Tür schließen. |
| F08 | Erste zwei registrierte Finger sind automatisch Master. | C1 S. 2; C2 DE S. 4 / FR S. 22 | Belegt. Keine Behauptung, beide müssten vor jeder Funkkopplung zwingend vorhanden sein. |
| F09 | Maximal 16 Finger insgesamt, inklusive Master. | C1 S. 2; C2 DE S. 5,10 / FR S. 23,28 | Belegt; keine 18 Speicherplätze. |
| F10 | Weiteren Finger registrieren: Master fünf Sekunden bis Gelb, neuen Finger 15-mal auflegen. | C1 S. 2; C2 DE S. 5 / FR S. 23 | Belegt. |
| F11 | Ohne -002 beginnt auch weiteres Anlernen mit geschlossener Hartal-Tür. | C1 S. 2, Abschnitt „Weitere Finger anlernen“ | **Präzisierung eingearbeitet**, DE und FR. |
| F12 | Funkkopplung: WiPro-Anlernmodus, registrierten Finger verwenden; kurzer Ton und Status-LED etwa eine Sekunde aus. | C1 S. 1–2; C2 DE S. 6 / FR S. 24 | Belegt. |
| F13 | Ohne -002 auch Türbewegung zum Funksenden; Sensor sendet nur bei geschlossener Tür. | C1 S. 1–2 | Belegt; keine Übertragung dieser Zusatzfunktion auf -002/Van. |
| F14 | Funktionstest: verriegeln/scharf und entriegeln/unscharf getrennt kontrollieren; ansteuerbare Türen prüfen. | C2 DE S. 6 / FR S. 24 | Belegt. DE formuliert „ansteuerbar“ präziser als FR. |
| F15 | Alte Camp-Ausführung: nach Fingerverriegelung mechanisch öffnen; Öffnen muss Alarm auslösen. | C1 S. 1 | Belegt; nur in dieser Anleitung so beschrieben. |
| F16 | Fünfmal grün: erkannt/erfolgreich; rot blinkend nach Fingerauflegen: nicht erkannt, Zustand unverändert. | C1 S. 1–2; C2 DE S. 7 / FR S. 25 | Belegt; keine Batterie- oder Alarmzustandsdiagnose allein aus Rot ableiten. |
| F17 | Löschen entfernt alle registrierten Finger inklusive Master. | C1 S. 1; C2 DE S. 8–9 / FR S. 26–27 | Belegt; selektives Löschen nicht dokumentiert. |
| F18 | Löschen: Master zehn Sekunden; fünf bis Gelb, weitere fünf bis Rot; abheben; innerhalb zehn Sekunden mit demselben Master bestätigen. | C1 DE/FR S. 1; C2 DE S. 8–9 / FR S. 26–27 | Belegt; ohne Bestätigung Abbruch. Danach neuer Master. |
| F19 | Englische alte Kurzanleitung nennt zehn statt fünf Sekunden bis Gelb. | C1 S. 1 Feld 11; C2 EN S. 17 | **Übersetzungsabweichung T1 markiert**; DE/FR und gemeinsame EN-Fassung stimmen bei fünf plus fünf überein. |
| F20 | Alternativer Reset ohne registrierten Master. | C1 S. 1; C2 DE S. 8–9 / FR S. 26–27 | **Nicht dokumentiert**; kein Verfahren erfunden. |
| F21 | Mechanische Notöffnung / alternative Öffnungsmöglichkeit; Batterie als Versorgung. | C1 S. 2; C2 DE S. 3 / FR S. 21 | Belegt; elektronischer Zugang ersetzt mechanische Notöffnung nicht. |
| F22 | Fachpersonal, passende Installationsvorgaben, Batterie vor Arbeiten abklemmen, Leitungen geschützt verlegen. | C1 S. 2; C2 DE S. 3 / FR S. 21 | Belegt. Diese Bedienanleitungen enthalten keine fahrzeugspezifische Pinbelegung. |
| F23 | Kontaktstifte der älteren Hartal-Ausführung sauber und leitfähig halten. | C1 S. 2 | Belegt; nicht pauschal als VanLock-Bauteil darstellen. |
| F24 | Versorgung 12/24 V DC; 1,2 mA bei 12 V; 868,35 MHz; 150 m Freifeld. | C1 S. 1; C2 DE S. 10 / FR S. 28; K1 S. 25 | Übereinstimmende dokumentierte Werte. Freifeld-Funkreichweite ist kein Abstand der Fingerbedienung. |
| F25 | Camp 106111/106144 bei 24 V: 1,7 oder 0,6 mA. | C1 S. 1; K1 S. 25 / gedruckt 49 | **Offener Konflikt C1-24V**, direkt in Technik und Konfliktabschnitt ergänzt. |
| F26 | Camp -002: gemeinsame Anleitung nennt 1,7 mA bei 24 V. | C2 DE S. 10 / FR S. 28 | Belegt als Quellenangabe. Erklärt nicht den Widerspruch für die Artikel ohne -002. |
| F27 | Camp-Gewicht: ohne -002 156 g ohne zweiten Kabelbaum; -002 213 g. | C1 S. 1; C2 DE S. 10 / FR S. 28 | Getrennte Ausführungen/Messabgrenzung beibehalten. Sekundärquelle mit 202 g nicht übernommen. |
| F28 | Van bei 24 V 1,7 gegenüber 0,6 mA; Gewicht 219 gegenüber 151 g. | C2 DE S. 10 / FR S. 28; K1 S. 25 | **Offene Konflikte V2/V3**, unmittelbar in Technik-Tabelle sichtbar. |
| F29 | Umschaltbox 100×71×22 mm; Camp Ø41/L53; Van Ø50/L13; Speicher 16, davon zwei Master; IP67 laut Anleitung. | C1 S. 1; C2 DE S. 10 / FR S. 28 | Belegt; Werte mit Produktzuordnung. |
| F30 | Farbzuordnung: Camp 106111 silber / 106144 schwarz; Van 106260 silber / 106259 schwarz. | K1 S. 25 | Belegt für diese Katalogartikel; -002-Farbzuordnung nicht aus unbeschrifteten Abbildungen neu abgeleitet. |
| F31 | Hardwareänderung aus PDF-Erstellungsdatum oder gleicher Revisionsnummer herleiten. | Dokumentmetadaten und Geltungsbereiche C1/C2/K1 | Nicht zulässig als Beleg. „Älterer Katalog“ als vermeintliche technische Erklärung aus Zugangsübersichten entfernt. |

## Änderungen im Wiki und RAG

- CampLock DE/FR: Tür-Voraussetzung beim weiteren Anlernen, Stromkonflikt, englische Abweichung, Katalogbeleg und präzisere Quellenangaben. Quellenvertrauen im Frontmatter auf `medium`, analog VanLock mit ungeklärten Werten.
- VanLock DE/FR: Widersprüche zusätzlich direkt in der Technik-Tabelle und beim Geltungsbereich. Ein einzelner herausgelöster Technikabschnitt enthält damit beide Werte und die Einschränkung.
- Französische Camp-/Van-Belege zeigen auf die tatsächlich geprüften französischen Originalseiten. Die deutsche Katalogquelle bleibt ausdrücklich als deutsch bezeichnet.
- Zugangsübersicht DE/FR: keine unbelegte Erklärung der Van-Kompatibilität durch das Alter eines Katalogs.
- Gezielte Synchronisierung änderte ausschließlich diese sechs Artikelrouten und deren Abschnitte. JSON und Runtime-MJS wurden aktualisiert. Vorhandene Support-Korrekturen blieben bytegleich.

## Kontextfehler und Prüfung

Die neuen 24 Belegfälle fanden anfangs alle richtigen Produktartikel, aber **vier entscheidende Passagen fehlten im ausgewählten Modelltext**. Ein langes Artikelfenster allein konnte die Variante oder Tür-Voraussetzung abschneiden.

`lib/kontext.mjs` erhält nun den zur Quelle gewählten Abschnitt und, wenn das Zeichenbudget reicht, einen zweiten relevanten Abschnitt. Die Grenzen bleiben 6.000 Zeichen für die ersten beiden Quellen und 1.400 für weitere. Zu lange Abschnitte verdrängen das bisherige Artikelfenster nicht. Sprache, Route und interne Sichtbarkeit werden berücksichtigt.

| Prüfung | Ergebnis / Aussagegrenze |
|---|---|
| [24 Fingerprint-Belegfälle](2026-09-28-fingerprint-retrieval.json) | 24/24 bestanden, je 12 DE/FR. Richtiger Artikel unter Top 3, verlinkbarer Abschnitt und entscheidende Textstellen im Kontext. Ohne Admin-/Fallgewichtung, ohne Modellaufruf. |
| Kontext-Modultests | 9/9 bestanden: fehlende Passage, zwei Abläufe, Konfliktwerte, Zugriff, Sprache/Route, Zeichenbudget und Erhalt des bisherigen Fensters. |
| Bestehende App-Selbsttests | 179 bestanden, 0 fehlgeschlagen. |
| Bestehende Produkt-/Artikelnummernerkennung | 6/6 Fälle und Katalogabgleich bestanden. |
| [Vergleich 82 allgemeiner DE-/FR-Goldfragen](2026-09-28-kontext-vergleich.json) | Vorher 16, nachher 16 exakte hinterlegte Belegsätze im Kontext; keine Regression dieses Wortlaut-Maßes. Die übrigen 66 Fälle sind damit weder fachlich widerlegt noch bestanden: Die ältere Goldbasis enthält auch inzwischen abweichende Formulierungen. Kein Qualitätswert für erzeugte Antworten. |
| Wiki-/Daten-Synchronität | Zehn vom Fingerprint-Sync erfasste Artikel ohne Drift. |
| Live-Modellantworten | **Offen**. In der geprüften lokalen Umgebung fehlen API-URL und API-Schlüssel; kein Live-Qualitätswert behauptet. |

Reproduzierbare lokale Läufe aus `app/`: `npm test`, `node werkzeuge/erkennung-fingerprint-test.mjs`, `node werkzeuge/fingerprint-wiki-sync.mjs --check`. Der ausführliche Belegbericht wird aus dem Repo mit `node app/werkzeuge/fingerprint-belege-pruefen.mjs --ergebnis docs/quellenpruefung/2026-09-28-fingerprint-retrieval.json` erzeugt.

Umgebungsbefund: Der lokale `npm`-Starter verweist auf eine fehlende `npm-cli.js`. Deshalb wurden alle drei in `package.json` unter `test` hinterlegten Node-Kommandos direkt ausgeführt und bestanden. Es wurden keine globalen Paketinstallationen oder Änderungen am System vorgenommen.

## Verbindliche Freigabefragen – noch nicht versendet

| ID | Frage an THITRONIK / autorisierte Fachperson | Benötigte Antwort |
|---|---|---|
| C1-24V | Welcher Stromwert gilt für CampLock 106111/106144 ohne -002: C1 1,7 mA oder K1 0,6 mA bei 24 V? | Messbedingungen, Artikel-/Hardwarestand und korrigierter Dokumentbeleg. |
| V1 | Welche Funktionen unterstützt VanLock 106259/106260 mit WiPro III ohne safe.lock, angesichts C2 „ausschließlich safe.lock“ und K1 „beide“? | Verbindliche Freigabe je Funktion und Artikel-/Hardwarestand. |
| V2 | Welcher VanLock-Stromwert gilt bei 24 V: 1,7 oder 0,6 mA? | Messbedingungen und eindeutig zugeordneter Dokumentstand. |
| V3 | Beziehen sich 219 und 151 g auf unterschiedliche Lieferumfänge/Messbedingungen oder ist eine Angabe falsch? | Genaue Gewichtsabgrenzung und freigegebener Wert. |
| T1 | Kann die abweichende englische Löschzeile in C1 korrigiert werden? | Korrigierte englische Originalfassung. DE/FR-Ablauf bleibt nach vorhandenen Belegen fünf plus fünf Sekunden. |

Keine Anfrage wurde an Dritte gesendet. Bis zur Klärung bleiben die vier technischen Widersprüche offen; die Übersetzungsabweichung ist separat dokumentiert. Keine Messung am realen Gerät und keine Fahrzeugfreigabe werden durch diese Prüfung ersetzt.

## Änderungsprotokoll

### [2026-09-28] ingest | CampLock-/VanLock-Prüfdurchlauf DE/FR

Bestehende Vorarbeit anhand C1/C2/K1 ergänzt; sechs Wiki-Dateien und App-Wissensdaten aktualisiert; neue Belegfälle und Kontextkorrektur geprüft. Herstellerfragen und Live-Evaluation offen. Kein Commit, Push oder Deployment in diesem Durchlauf. Gesamtfortschritt siehe [Projektstand](../10_RAG_PRUEFFORTSCHRITT.md).
