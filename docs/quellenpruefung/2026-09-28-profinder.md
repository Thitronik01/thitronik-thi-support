# Pro-Finder: dokumentengestützte Fachprüfung DE/FR

Stand: 28.09.2026. Ergebnis: Quellenabgleich, Übernahme in die Wissensbasis und lokale Belegtests abgeschlossen. **10 von 15 Punkten im Pro-Finder-Paket; Gesamtprojekt 40/100.** Herstellerklärung und Live-Antwortprüfung bleiben offen. Die Prozentzahl misst gewichtete Arbeitsschritte, keine fachliche Freigabe oder Antwortsicherheit.

## Umfang und Methode

107 physische PDF-Seiten wurden visuell auf die relevanten deutschen und französischen Inhalte geprüft: 104 Seiten aus acht öffentlichen Dokumenten und drei Seiten einer internen Befehlsmatrix. Bei mehrsprachigen Seiten betrifft die Prüfung DE/FR; andere Sprachfassungen sind nicht als geprüft gezählt. Die beiden großen Handbücher wurden in den unten bezeichneten Seitenbereichen einschließlich Tabellen, Anschlussgrafiken und LED-Legenden gesichtet. Daraus ergeben sich 40 dokumentierte Prüfpunkte.

Die OCR-Fassung des neueren Handbuchs wurde als Suchhilfe gegen die sichtbaren Originalseiten geprüft. Sie ist keine unabhängige Quelle und nicht Teil der 107 visuell geprüften Originalseiten. Ihre 248 Seiten wurden nicht vollständig visuell geprüft. Die zusätzliche OCR-Titelseite verschiebt die Seitenzählung um eins. Insbesondere liest OCR-Seite 20 fälschlich „500“, während Originalseite 19 sichtbar „900“ Meter angibt. Auch Befehlswörter sind in der OCR fehlerhaft erkannt.

Originaldateien und Dubletten im Ordner `Anleitungen` blieben unverändert. SHA-256, ursprüngliche relative Pfade, Seitenbereiche und bytegleiche Kopien stehen im [Quellenmanifest](2026-09-28-profinder-quellen.json). Acht öffentliche PDFs wurden in `content/quellen/` abgelegt. Die interne Matrix und die OCR-Abschrift wurden nicht als öffentliche Rohquellen übernommen. Bereits vorhandene, aus internen Quellen abgeleitete Wiki-Passagen behalten ihre bisherigen Metadaten; dieser Durchlauf ist keine vollständige Vertraulichkeitsprüfung des Altbestands.

## Quellenlegende

Alle Seitenangaben in diesem Bericht und den Testfällen sind **physische PDF-Seiten, beginnend bei 1**, keine gedruckten Kapitelnummern. Die Kurzzeichen werden auch in den Testdaten verwendet. Ein Dateizeitstempel gilt nicht als Dokumentdatum.

| Kennung | Dokument / sichtbarer Stand | Geprüfte physische Seiten |
|---|---|---|
| P0 | [Bedienungs- und Montageanleitung, Rev. 2.6](../../content/quellen/profinder-handbuch-rev2.6.pdf), ältere Gerätefamilie | 1–19 und 37–53; 36 von 72 Seiten |
| P1 | [Bedienungs- und Installationsanleitung ab 0699-045, Rev. 1.3, Stand 06/2025](../../content/quellen/profinder-ab045-handbuch-rev1.3.pdf) | 1–25 und 50–76; 52 von 247 Seiten |
| K0 | [Kurzanleitung, Rev. 1.1](../../content/quellen/profinder-kurz-rev1.1.pdf) | 1–2; DE/FR-Anteile |
| K1 | [Kurzanleitung ab -045, Rev. 1.3.2](../../content/quellen/profinder-ab045-kurz-rev1.3.2.pdf) | 1–2; DE/FR-Anteile |
| Q | [Fragen zu Pro-Finder](../../content/quellen/profinder-faq.pdf), im Dokument undatiert | 1–7 |
| C | [Öffentliche App-Befehlsmatrix 1.1](../../content/quellen/profinder-app-befehle-1.1.pdf) | 1; DE/FR-Spalten |
| S1 | [Einpolige Abschalteinrichtung, Rev. 2.0](../../content/quellen/profinder-abschaltung-einpolig-rev2.0.pdf) | 1–2; DE/FR-Anteile |
| S2 | [Mehrpolige Abschalteinrichtung, Rev. 1.0](../../content/quellen/profinder-abschaltung-mehrpolig-rev1.0.pdf) | 1–2; DE/FR-Anteile |
| I | Interne Befehlsmatrix vom 05.08.2022, Software 9.1 / 9.4 / 10.0.0; nur lokaler Vergleich | 1–3; Originalpfad und Hash im Manifest |
| O | OCR-Abschrift von P1; Suchhilfe, kein zweiter Beleg | relevante Textstellen gegen Original geprüft; keine zusätzlichen Originalseiten gezählt |

## Aussagenmatrix

„Belegt“ bedeutet hier: im angegebenen Dokument gefunden und im richtigen Geräte-/Versionskontext übernommen. Es ersetzt keine Messung am Gerät oder Herstellerfreigabe.

| ID | Aussage / Befund | Beleg, physische PDF-Seiten | Ergebnis und Behandlung |
|---|---|---|---|
| PF01 | Mini-SIM 001–007, Micro-SIM 008–044, Nano-SIM ab 045 | Q 2; P0 8/43; P1 13/62 | Formate nach Generation abgegrenzt; kein universelles SIM-Format. |
| PF02 | Altanleitung: PIN 0000, aktivierte SIM; K0 verlangt keinen Datentarif. Ab -045: PIN deaktiviert, Telefonie/SMS und DATA | K0 1; K1 1; P0 8/43; P1 13–14/62–64; Q 1 | Alte Aussage „keine Daten erforderlich“ nicht auf 4G übertragen. |
| PF03 | MultiSIM nicht unterstützt; eigene Rufnummer erforderlich | Q 1; K1 1 | Explizit in DE/FR ergänzt. Mehrnetz-/Multioperator-Karten nicht mit MultiSIM gleichsetzen. |
| PF04 | Guthabenabfrage nur bis -044, nicht bei 4G ab -045 | Q 4; K1 1 | Portal oder automatische Aufladung für -045; alte USSD-Beispiele nicht universell anbieten. |
| PF05 | Providerlisten und Tarifbeispiele sind zeitabhängige Dokumentinhalte | Q 2–4 | Keine aktuelle Empfehlung für Swisscom, Salt oder andere Anbieter daraus abgeleitet. Keine aktuelle Netzverfügbarkeit geprüft. |
| PF06 | Ältere Programmierung enthält tarifabhängig Guthabencode und `P`, etwa `*100#P+S49…`; ohne Guthabenabfrage `+S49…` | P0 9–10/44–45 | Nur als Syntax der alten Quelle dargestellt. `*`, `#` und `+` müssen beim Import erhalten bleiben. |
| PF07 | P1 zeigt Programmierbeispiele ohne USSD-Teil und ohne DE-/FR-Präfix; interne Matrix enthält versionsgebundene Präfixbeispiele | P1 15–16/65–66; I 1–3 | Keine Mischsyntax und kein pauschales Verbot von Sprachpräfixen behauptet. Gerätestand und App-Konfiguration abgleichen; universelle Alias-/Präfixunterstützung offen. |
| PF08 | Master programmiert bis zu zehn Zielnummern; neue Programmierung ersetzt die bisherige Liste | P0 9–10/44–45; P1 15–16/65–66 | Ersatz statt bloßem Anhängen herausgestellt. |
| PF09 | Stellung E löscht alle Zielnummern einschließlich Master; SIM bleibt eingesetzt | P0 11/46; P1 17/67 | Reihenfolge mit Trennen des Kabelbaums, E, Wiederverbinden, LED-Rückmeldung und Rückkehr zur vorherigen Betriebsart dokumentiert. Kein WiPro-/Bluetooth-Reset. |
| PF10 | Betriebsart 0 ist laut FAQ Standard ohne periodischen Statusversand | Q 5; P1 9–10/57–58 | Standard und automatische Meldungen getrennt erläutert. |
| PF11 | In Betriebsart 2 und 3 schaltet ein autorisierter Anruf die WiPro scharf/unscharf und liefert Status | P0 14/49; P1 10,21/58,72 | Nicht als reine Statusabfrage anbieten. DE-/FR-Modustabellen stimmen hier überein. |
| PF12 | Modi 4/5/6/7: Intervalle 15 Minuten / 60 Minuten / 6 Stunden / 24 Stunden | P1 10/58 | Versionsbezogen übernommen; kein kontinuierliches Live-Tracking daraus abgeleitet. |
| PF13 | Modus 9: P1 zeigt U1–U5, P0 keine U-Werte | P0 5/40; P1 10/58 | Versionsunterschied lokal am entsprechenden Absatz markiert; nicht auf alle Geräte übertragen. |
| PF14 | Geofencing: P1 nennt DE und FR 900 Meter; OCR liest einmal 500 | P1 19,21/70,72; O 20 | 900 Meter aus sichtbarem Original übernommen; OCR-Wert verworfen. |
| PF15 | P0 nennt DE ca. 1 km, FR ca. 1,5 km | P0 12,15/47,50 | Echter Quellenwiderspruch; keine einstellbare Spanne oder universelle Altgeräte-Grenze daraus gemacht. |
| PF16 | Modus 8 schaltet Geofencing über Pin 3: über 6 V aktiv, unter 5 V inaktiv; B invertiert | P1 10,21/58,72 | Geräte-/Betriebsartbindung erhalten; Zwischenbereich nicht frei interpretiert. |
| PF17 | Geofencing neu setzen bzw. beenden folgt der jeweiligen Betriebsart; C/D verwenden unterschiedliche Wartezeiten | P1 10,21/58,72 | Abschalten/Neusetzen nicht mit Löschen der Telefonnummern in E vermischt. C: 90 Sekunden, D: 8 Minuten laut Tabelle. |
| PF18 | GPS-Standby bezeichnet einen Ruhezustand des Empfängers | P0 12/47; P1 19/70 | Nicht mit einem garantierten Alter der Positionsdaten gleichgesetzt. Ereignisse können den Empfänger aufwecken. |
| PF19 | Bei fehlendem GPS wartet das Gerät bis zu zehn Minuten und kann die letzte gültige Position melden; Zeitangabe ist UTC des letzten Fixes | P0 17/52; P1 24/75 | SMS-Empfangszeit und Fixzeit getrennt; keine Echtzeitposition versprechen. |
| PF20 | GPS-Diagnose F: rot dauerhaft = GPS nicht angeschlossen; gelb blinkend = Daten ohne gültige Position; grün dauerhaft = Position gültig | P0 7/42; P1 12/61 | Getrennte Diagnose-Legende in DE/FR; anschließend ursprüngliche Betriebsart wiederherstellen. |
| PF21 | Im Normalbetrieb bedeutet rotes Dauerlicht SIM fehlt/defekt; die gelbe Anzeige unterscheidet sich zwischen Kurzfassungen | P0 11/46; P1 18/69; K0 2; K1 2 | Normalbetrieb nicht mit Stellung F mischen. K1: letzte SMS konnte nicht gesendet werden; ältere Legende separat erhalten. |
| PF22 | Externen GPS-Empfänger spannungsfrei anschließen; Erstinitialisierung mit freier Sicht und über 13,5 V für fünf Minuten | P0 6–7/41–42; P1 11–12/60–61 | Initialisierungsbedingung nicht als allgemeine Mindestbetriebsspannung ausgegeben. |
| PF23 | U2–U5 sind auch ab -045 dokumentiert; Pins 2–5, Messbereich 0–30 V | P1 8,11/56,59; K1 1 | Falsche Beschränkung auf ältere Geräte entfernt. Anzeige bleibt betriebsartabhängig. |
| PF24 | Anschlussgrafik: Pin 1 Masse/schwarz, Pin 8 Plus/rot; FR-Fließtext P1 bezeichnet Pin 1 abweichend als positiv | P1 8,11/56,59; P0 4/39 | FR-Quellenfehler sichtbar markiert. Bei abweichendem Kabelbaum keine unsichere Pluszuordnung übernehmen; Herstellerklärung. |
| PF25 | P1/K1: ca. 16–21 mA normal und ca. 37 mA Netzsuche; P0: ca. 21 mA normal | P1 25/76; K1 2; P0 18/53; K0 2 | Unbelegte allgemeine Angabe 16–25 mA durch revisionsgebundene PDF-Werte ersetzt. Kein Messbericht. |
| PF26 | Beispieladdition 11 mA + 16–21 mA ergibt 27–32 mA | P1 25/76 für Pro-Finder; vorhandene Wiki-Annahme 11 mA für WiPro | Als Rechenbeispiel gekennzeichnet, nicht als gemessener Gesamtverbrauch. WiPro-Annahme und andere Verbrauchsdokumente in diesem Punkt nicht neu verifiziert. |
| PF27 | Spannungswarnung bei dauerhaft unter 11,2 V; Rückkehr über 12,5 V; Warnfunktion ausdrücklich nicht in Betriebsart B | P0 12/47; P1 19/70 | Nicht „bei genau 11,2 V“. Keine ungeprüfte Übertragung auf 24-V-Schwellen und keine Behauptung, B habe überhaupt keinen Schutz. |
| PF28 | Schaltausgänge 12 V / 500 mA; höhere Lasten benötigen geeignete Relais mit Freilaufdiode | P0 16/51; P1 23/74; K1 2 | Geräteversorgung 9–30 V nicht als 24-V-Ausgangsspezifikation fehlinterpretieren. |
| PF29 | Temperaturangabe existiert bereits in älterer Anleitung | P0 12/47; K0 2; P1 19/70 | Nicht als exklusives Merkmal ab -045 darstellen; Temperatur am Gerät, kein kalibrierter Wohnraumsensor zugesichert. |
| PF30 | Pro-Finder ist unabhängig von WiPro nutzbar; Kombination erweitert Alarmmeldungen | Q 1; P0/P1 Zweck-/Anschlussabschnitte | Eigenständige Ortung von WiPro-Alarmfunktionen getrennt. |
| PF31 | Alarm-SMS werden nacheinander versandt; frühes Unscharfschalten kann spätere Empfänger verhindern | Q 7; P0 13/48; P1 20/71 | Verhalten ergänzt; kein simultaner Versand versprochen. |
| PF32 | Rückruf an Master ist für dokumentierte Einbruch-/Gas-/Panikfälle beschrieben | P0 13/48; P1 20/71 | Kein pauschales Rückrufversprechen für jede Meldung, insbesondere nicht allein aus dem Vorliegen einer Kabelschleifen-SMS. |
| PF33 | Französische Befehle unterscheiden sich: ältere Matrix u. a. `arme`/`desarme`/`statut`, P1 u. a. `activer`/`desactiver`/`rapport d etat` | C 1; P0 48–51; P1 71–74 | Alt-/Neufassungen nebeneinander mit Quellenbindung; keine universelle Aliasgarantie. |
| PF34 | P1 easy.add: DE `anlernmodus an`/`anlernmodus aus`; FR `activer le mode d appairage`/`desactiver le mode d appairage` | P1 24/75; Q 5–6 | Wortlaut erhalten; Verfügbarkeit abhängig von Geräte-/Softwarestand. OCR-Fehler nicht als Befehl übernehmen. |
| PF35 | P1 FR Zeitsteuerung: `a %min%`, Werte 1–120 Minuten | P1 74 | Platzhalter durch Zahl ersetzen, z. B. `a 30`; alte Matrix nicht als allgemeines Synonymverzeichnis behandeln. |
| PF36 | Nicht zugestellte Konfigurations-SMS können mit Zeichencodierung, SIM-Aktivierung oder Messenger-Versand zusammenhängen | Q 6–7; P1 14/63–64 | Dokumentierte Diagnosehinweise beibehalten; keine generelle Hardwaredefekt-Diagnose aus fehlender Antwort. |
| PF37 | Abschalteinrichtung per `kill`: GPS-Geschwindigkeit mindestens fünf Sekunden bei 0 km/h, dann Ausgang A; zeitliche Grenze drei Tage | S1 2; S2 2 | Bedingungen und Einbauwarnungen erhalten. Keine Anleitung zum ungeprüften Eingriff am Fahrzeug. |
| PF38 | `a an` ist kein Ersatz für `kill` bei der Abschalteinrichtung | S1 2; S2 2 | Bestehende Negation gegengeprüft und als Belegfall abgesichert. |
| PF39 | Einpolig Art. 101283: 12 V / 40 A; mehrpolig Art. 105821: 12 V / 1 A | S1 1; S2 1 | Unterschiedliche Einrichtungen nicht gleichsetzen. Fahrzeugverdrahtung nicht als vollständig abgenommen bewertet. |
| PF40 | Vorhandene Seriennummern-Meilensteine und interne Befehlsvarianten sind nicht durch die neuen PDFs vollständig bestätigt | I 1–3 im Vergleich mit P0/P1/Q; vorhandener Katalog | Detailgrenzen 003/009/013/015/018/029/056/065 bleiben außerhalb einer vollständigen Neuverifikation. Keine zusätzliche Freigabe aus bloßer Altbestandsübernahme. |

## Offene Herstellerfragen

1. Welcher Geofencing-Radius gilt für welche älteren Serien-/Softwarestände? P0 widerspricht sich mit 1 km DE und 1,5 km FR. Für P1 ist 900 m dokumentiert; das klärt den Altgeräte-Konflikt nicht.
2. Welche Programmierpräfixe und französischen Befehls-Aliasse unterstützen die einzelnen Softwarestände tatsächlich? Öffentliche Matrix, Handbücher und interne Matrix sind nicht deckungsgleich. Bitte versionsbezogene Befehlsliste bestätigen.
3. Pin-1-Fehler im französischen Fließtext von P1 bestätigen und korrigierte Quelle bereitstellen. Die Anschlussgrafik und DE-Fassung zeigen Masse an Pin 1, Plus an Pin 8.
4. Ist der Unterschied der Spannungsanzeigen in Modus 9 zwischen P0 und P1 absichtlich generationsbedingt? Welche Serien-/Softwaregrenze gilt?
5. Welche Unterspannungs-/Rückkehrschwellen gelten verbindlich für 24-V-Anlagen, und welche Schutzfunktionen bleiben in Betriebsart B aktiv? Die geprüften Passagen belegen die beschriebenen Warnschwellen und die Warn-Ausnahme, keine vollständige 24-V-Logik.
6. Bestehende detaillierte Seriennummern-Meilensteine, Sprach-/Softwaregrenzen und gegebenenfalls aktuelle Upgrade-Verfügbarkeit anhand freigegebener Herstellerdaten bestätigen.

Keine dieser Fragen wurde extern versendet oder als beantwortet gezählt. Aktuelle Provider- und Tarifprüfung ist separat erforderlich, bevor zeitabhängige Anbieterempfehlungen freigegeben werden.

## Übernahme und technische Korrektur

Zehn Wiki-Routen wurden in DE/FR bearbeitet: `pro-finder`, `app-befehle`, `mobilfunk-sim`, `stromversorgung-standzeiten` und `stoerungsbeseitigung`. Die zugehörigen Artikel und Abschnitte sind synchronisiert; Sichtbarkeiten, Freigabestatus und Vertrauensmetadaten blieben erhalten. Der vorhandene gefaltete FR-Titel für `stromversorgung-standzeiten` wurde ohne inhaltliche Umbenennung in einen eindeutigen einzeiligen Frontmatter-Wert überführt.

Beim Abgleich fiel ein Importfehler auf: Die Markdown-Bereinigung entfernte Steuerzeichen aus SMS-Beispielen. `wiki-sync-basis.mjs` schützt jetzt Inhalte in Inline-Code, sodass etwa `*100#P+S49…` unverändert in den Modellkontext gelangt. Drei Modultests prüfen Steuerzeichen, Parameter/Vergleiche und normale Markdown-Bereinigung. Mehrzeilige Frontmatter-Werte werden nicht mehr still als Titel `>-` übernommen, sondern erfordern eine eindeutige Quelle.

Die gemeinsame Importkorrektur stellte außerdem in vier bereits zuvor synchronisierten Routen jeweils zwei zuvor entfernte Zeichen wieder her: DE/FR `camplock-fingerprint` und `artikelnummern`. Dort wurden in diesem Durchlauf keine Wiki-Aussagen geändert. Der Datenvergleich weist diese vier Änderungen separat aus. Insgesamt betreffen die Laufzeitdaten somit zehn fachlich bearbeitete und vier ausschließlich bei Literalzeichen reparierte Routen.

Die Korrektur betrifft den gezielten Wiki-Sync. Der separate Vollimport `code/wiki-ingest.mjs` wurde in diesem Durchlauf nicht geändert; vor einem Vollimport muss dessen Klartextbereinigung ebenfalls auf Steuerzeichenerhalt geprüft bzw. angepasst werden. Die neuen exakten SMS-Kontexttests dienen dabei als notwendige Prüfung. Das bleibt im Paket „abschließender Gesamtvergleich / Importqualität“ offen und erhält hier keine zusätzlichen Fortschrittspunkte.

Der erzeugte Bestand umfasst 224 Artikel und 2.652 Abschnitte. Der längste betroffene Abschnitt hat 2.667 Zeichen; kein betroffener Abschnitt wurde an der 4.000-Zeichen-Grenze gekappt. Vollständige Abschnittsdaten stehen auch dann bereit, wenn der aggregierte Artikeltext die bestehende Längengrenze erreicht. Suchkern, Kontextmodul und bestehende sechs Korrektureinträge blieben gegenüber dem Beginn dieses Pro-Finder-Durchlaufs unverändert.

## Prüfungen und Aussagegrenzen

| Prüfung | Ergebnis |
|---|---|
| Pro-Finder: Artikelrang, Beleganker, tatsächlicher Kontext, bei SMS zusätzlich exakte Steuerzeichen | **58/58**, je 29 DE/FR; [Ergebnisdatei](2026-09-28-profinder-retrieval.json) |
| Bestehende WiPro-Belegfälle | **58/58** |
| Bestehende Camp-/Van-Belegfälle | **24/24** |
| Kern-Selbsttests | **179 bestanden**, keine Fehler |
| Kontext-/Sprach-/Import-Modultests | **19 bestanden**, davon drei neue Importtests |
| Fingerprint-Produkterkennung | **6/6** |
| Drei gezielte Wiki-Synchronisierungen im Prüfmodus | Keine Drift |
| JSON-/Modulgleichheit, Metadaten, fremde Routen, Korrekturen, Original-/Kopie-Hashes | Bestanden; [Integritäts- und Vergleichsbericht](2026-09-28-profinder-regression.json) |
| 82 bestehende allgemeine Vergleichsfragen, vor/nach Pro-Finder | Erwarteter Artikel in Top 8 unverändert **78/82**; wörtlicher Altbeleg im Kontext unverändert **12/82**; kein bisheriger Treffer verloren |

Die 82 Vergleichsfragen sind **kein 82/82-Erfolg** und keine semantische Antwortbewertung. Die niedrige wörtliche Quote des alten allgemeinen Sets bleibt sichtbar; sie wurde weder als vollständige fachliche Abdeckung gewertet noch durch Umformulieren der allgemeinen Erwartungen verborgen. Die gezielten 58 neuen Fälle prüfen die hier dokumentierten Aussagen einschließlich Versionsgrenzen und Quellenkonflikten im tatsächlich verwendeten Kontextbudget.

Das konfigurierte Antwortmodell wurde nicht getestet: Modellzugang fehlt in der lokalen Prüfumgebung. Es wurden keine realen SMS gesendet, keine Hardware geschaltet und keine Fahrzeugverdrahtung abgenommen. Aus Quellen-/Retrievaltests folgt keine Garantie, dass jede generierte Antwort fachlich richtig ist. Die Quellen selbst sind Herstellerdokumente mit den oben benannten Widersprüchen; deren Kennzeichnung ist keine verbindliche Auflösung.

Aus dem Repository-Stamm reproduzierbar:

```bash
node app/werkzeuge/profinder-wiki-sync.mjs --check
node app/werkzeuge/profinder-belege-pruefen.mjs --ergebnis docs/quellenpruefung/2026-09-28-profinder-retrieval.json
node --test app/werkzeuge/wiki-sync-basis.test.mjs
```

Neue Testdaten: `daten/thi-eval-profinder.de.json` und `.fr.json`. Die dortigen Antworterwartungen sind für eine spätere Live-Evaluation vorbereitet; dieser Durchlauf wertet nur Retrieval und Kontext aus. Änderungen liegen lokal; in diesem Durchlauf kein Commit, Push oder Deployment.

Nächster unabhängiger Schritt gemäß [Projektplan](../10_RAG_PRUEFFORTSCHRITT.md): G.A.S., CO und Sensorik. Offene Herstellerfragen und der ausstehende Live-Modelltest bleiben im Pro-Finder-Paket mit insgesamt fünf Punkten offen.
