---
title: Pro-Finder — GSM/GPS Telemetriemodul
sources:
  - "content/quellen/profinder-ab045-handbuch-rev1.3.pdf"
  - "content/quellen/profinder-ab045-kurz-rev1.3.2.pdf"
  - "content/quellen/profinder-handbuch-rev2.6.pdf"
  - "content/quellen/profinder-faq.pdf"
  - "content/quellen/profinder-kurz-rev1.1.pdf"
  - "sources/pro-finder_ocr_abschrift.pdf"
  - "content/quellen/wipro-iii-installation-rev1.8.pdf"
  - "sources/Pro Finder.docx"
  - "sources/Anbieter.docx"
  - "sources/Handy.docx"
  - "sources/NUR_INTERNER_GEBRAUCH_Pro-finder_Befehle_abV9.1_(V1.1).pdf"
  - "sources/SMS-Konfiguration für Pro-Finder - SMS-Konfiguration für Pro-Finder.csv"
  - "content/wiki/de/app-befehle.md"
  - "content/wiki/de/mobilfunk-sim.md"
  - "content/wiki/de/seriennummern-softwarestaende.md"
  - "content/wiki/de/stoerungsbeseitigung.md"
updated: '2026-09-28'
confidence: high
lang: de
dealerStatus: approved
---

# Pro-Finder — GSM/GPS Telemetriemodul

**Art.-Nr. 100699**

Der Pro-Finder ist ein Mobilfunk- und Ortungsmodul für Freizeitfahrzeuge. Er übermittelt Alarm- und Statusmeldungen per SMS, liefert GPS-Positionen und ermöglicht abhängig von Gerätegeneration, Softwarestand, angeschlossener WiPro und Fahrzeuganbindung ausgewählte Fernsteuerfunktionen.

> **Grundregel:** Vor jeder Aussage zu SIM, Mobilfunk, App, Status-LED oder Anschlüssen die vollständige Seriennummer mit Präfix `0699` erfassen. Führende Nullen dürfen nicht entfallen. `100699` ist die Artikelnummer der Produktfamilie, nicht die Seriennummer.

---

## Schnellüberblick

- Alarmweiterleitung per SMS an bis zu **zehn Zielrufnummern**
- GPS-Position als Koordinaten oder anklickbarer Kartenlink bei einer als Smartphone gekennzeichneten Rufnummer
- Geofencing zur Meldung einer unzulässigen Ortsveränderung
- Statusabfrage mit den für Generation und Betriebsart verfügbaren Werten
- Fernbedienung kompatibler WiPro-Funktionen per SMS oder, in bestimmten Betriebsarten, per Anruf
- Schalten der Ausgänge A und B per SMS
- optionale sichere Fahrzeugstilllegung über Ausgang A und eine fachgerecht installierte Abschalteinrichtung
- Spannungswarnung und Tiefentladeschutz bei Unterspannung

Der Pro-Finder ist kein Live-Tracking-System und zeichnet keine Reiseroute auf. Er kann einen Diebstahl melden und die Wiederauffindung unterstützen, verhindert den Diebstahl aber nicht selbst. Alle Fernfunktionen setzen eine aktive SIM, einen passenden Tarif und Mobilfunkempfang voraus.

---

## Gerätegenerationen und Seriennummern

### SIM- und Mobilfunkgenerationen

| Vollständige Seriennummer | Mobilfunkgeneration | SIM-Format | PIN-Regel |
|---|---|---|---|
| `0699-001` bis `0699-007` | frühe Hardwaregeneration | Mini-SIM | PIN `0000`, PIN-Abfrage aktiv |
| `0699-008` bis `0699-017` | ältere Hardwaregeneration | Micro-SIM | PIN `0000`, PIN-Abfrage aktiv |
| `0699-018` bis `0699-044` | dokumentiertes 2G-/3G-Modem | Micro-SIM | PIN `0000`, PIN-Abfrage aktiv |
| ab `0699-045` | LTE-fähige Hardwaregeneration | Nano-SIM | PIN-Abfrage vollständig deaktivieren |

Die Tabelle beschreibt dokumentierte Hardwaregrenzen. Ob das jeweils benötigte Netz im Land, beim konkreten Betreiber und am Standort noch verfügbar ist, muss aktuell geprüft werden. Eine als 5G vermarktete SIM kann nur verwendet werden, wenn Tarif und Netz zusätzlich die vom Gerät unterstützte Technik sowie klassische SMS und Telefonie bereitstellen.

### Dokumentierte Meilensteine

| Ab Seriennummer | Dokumentierter Stand | Änderung |
|---|---|---|
| `0699-003` | SW `5.0` | 24-V-Fähigkeit dokumentiert |
| `0699-009` | SW `8.7` | Guthabenabfrage für weitere Prepaid-Anbieter dokumentiert |
| `0699-013` | SW `9.1` | App-Kompatibilität, Alarmanruf und weitere Melderarten |
| `0699-015` | — | Kombifunktion „Verriegeln und Scharfschalten“ als Funktionsschwelle |
| `0699-018` | SW `9.1` | neues 2G-/3G-Modem |
| `0699-029` | SW `10.0.0` | korrigierte französische Befehle und verbesserte Modemkommunikation |
| `0699-045` | SW `11.0.4` | Hardwarewechsel auf 4G LTE, Nano-SIM und deaktivierte PIN-Abfrage |
| `0699-056` | SW `11.0.6` | verbesserte Kompatibilität mit O2-SIM-Karten |
| `0699-065` | SW `11.1.0` | neue obere Platine und neues Lötverfahren |

Ein Seriennummern-Meilenstein beschreibt den dokumentierten Produktionsstand. Nachträgliche Updates können dazu führen, dass der tatsächlich installierte Softwarestand abweicht. Eine in der App eingetragene Ersatz-Seriennummer ändert weder Hardware noch Software. Details stehen unter [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]].

---

## Bestimmungsgemäßer Einsatz und Grenzen

Der Pro-Finder ist für die Standortbestimmung und Überwachung eines Fahrzeugs vorgesehen. Zusammen mit einer kompatiblen [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]] leitet er Einbruch-, Gas-, Panik- und weitere Systemmeldungen weiter. Ohne WiPro stehen insbesondere Ortung, Geofencing, Statusabfragen und die dokumentierten Ein- und Ausgänge zur Verfügung.

- Positionsmeldungen werden per SMS übertragen.
- Die Genauigkeit und Aktualität der Position hängen vom Satellitenempfang ab.
- Mobilfunkbefehle sind nicht für zeitkritische Steuerungen geeignet; Zustellung und Antwort können vom Netz verzögert werden.
- Scharfschalten/Unscharfschalten und Verriegeln/Entriegeln sind getrennte Funktionen. Zentralverriegelungsbefehle setzen eine kompatible WiPro III safe.lock, eine passende Fahrzeuganbindung und geeignete Softwarestände voraus.
- Sicherheitsrelevante Fahrzeugverdrahtung und die Abschalteinrichtung dürfen nur durch qualifiziertes Fachpersonal installiert werden.

---

## Technische Eckdaten

| Merkmal | Dokumentierter Wert / Einordnung |
|---|---|
| Spannungsversorgung | 9–30 V DC; 24-V-Fähigkeit ab `0699-003` dokumentiert |
| Absicherung | 3 A nach produktspezifischer Einbauanleitung |
| Ruhestrom Pro-Finder | Rev. 1.3 ab -045: ca. 16–21 mA im Normalbetrieb; ca. 37 mA bei Netzsuche. Rev. 2.6: ca. 21 mA normal |
| Ausgänge A und B | 12 V, maximal 500 mA je dokumentierter Anleitung |
| Spannungsmesseingänge | U2–U5 auch ab -045 dokumentiert; Pins 2–5, 0–30 V; Anzeige nach Betriebsart (Rev. 1.3, PDF S. 8–11) |
| Satellitennavigation | GPS; ab `0699-045` GPS/QZSS dokumentiert |
| Zielrufnummern | bis zu 10 |
| Betriebstemperatur | –10 °C bis +80 °C |

Die Stromaufnahme des Fahrzeugs setzt sich nicht nur aus dem Pro-Finder zusammen. Fahrzeuggrundlast, WiPro, weitere Verbraucher, Batteriezustand und Selbstentladung müssen getrennt berücksichtigt werden; siehe [[Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis]].

---

## Montage und Anschluss

### Montageort

- Pro-Finder im trockenen Fahrzeuginnenraum montieren, nicht im Motorraum.
- Geräteoberseite nach oben ausrichten und den Montageort so wählen, dass der integrierte GPS-Empfänger möglichst wenig durch Metall abgeschirmt wird.
- Modul gegen unbefugten Zugriff sichern, für Servicearbeiten aber erreichbar halten.
- Kabel zugentlastet, scheuerfrei und fern von heißen oder beweglichen Teilen verlegen.
- Bei Verwendung einer externen GPS-Antenne die Empfangsseite waagerecht nach oben ausrichten und die zur Gerätegeneration gehörende Initialisierungsanweisung beachten.

### Elektrischer Anschluss

Der Anschluss muss nach der mitgelieferten Anleitung der tatsächlichen Gerätegeneration erfolgen. Sowohl Rev. 2.6 als auch Rev. 1.3 ab -045 dokumentieren diesen achtpoligen Hauptanschluss:

| Anschluss | Funktion |
|---|---|
| Pin 1, schwarz | Masse |
| Pins 2–5 | Spannungsmesseingänge U2–U5, je nach Betriebsart mit Zusatzfunktion |
| Pin 6 | Ausgang B |
| Pin 7, gelb | Ausgang A |
| Pin 8, rot | Betriebsspannung |

Bei abweichendem Kabelbaum ausschließlich die passende Geräteanleitung verwenden. **Quellenfehler FR Rev. 1.3, PDF S. 59:** Der Text nennt Pin 1 irrtümlich positiv; die Anschlussgrafik auf S. 56 und der deutsche Text zeigen Pin 1 als Masse und Pin 8 als Plus. Nicht nach der falschen Pluszuordnung anschließen; bei Abweichungen Einbau stoppen und THITRONIK klären lassen. WiPro und Pro-Finder müssen an dieselbe Fahrzeugbatterie angeschlossen sein. Die Verbindung zwischen beiden Modulen erfolgt über das dafür vorgesehene Verbindungskabel.

> **Ausgangslast:** Ausgänge A und B nicht über 500 mA belasten. Für größere oder induktive Lasten ist eine fachgerecht dimensionierte Relaisschaltung mit geeigneter Schutzbeschaltung erforderlich. Unbenutzte Leitungen einzeln isolieren.

SIM-Karte, Stecker und Antenne nur bei spannungsfreiem Pro-Finder einsetzen oder lösen. Wiederholtes Ziehen einer Fahrzeugsicherung ist keine Reparaturmaßnahme; wiederkehrende Ausfälle der Versorgung oder mögliche Spannungsspitzen müssen fachlich untersucht werden.

---

## SIM-Karte und Mobilfunk

Der Pro-Finder benötigt eine SIM mit **klassischen SMS, Telefonie und einer eindeutig erreichbaren Rufnummer**. **Ab SN -045 muss die SIM zusätzlich mobile Daten (4G/LTE) unterstützen**; das verlangen FAQ S. 1 und Kurzfassung Rev. 1.3.2, S. 1. Nur die ältere Micro-SIM-Kurzfassung Rev. 1.1 nennt Daten als nicht erforderlich. **Multi-SIM wird nicht unterstützt**, eine eigene Rufnummer ist erforderlich (FAQ S. 1). Prepaid und Vertrag sind grundsätzlich möglich, wenn Tarif, Guthaben beziehungsweise Vertragsstatus, Netz und PIN-Regel passen.

| Seriennummer | SIM | PIN |
|---|---|---|
| `0699-001` bis `0699-007` | Mini-SIM | `0000`, Abfrage aktiv |
| `0699-008` bis `0699-044` | Micro-SIM | `0000`, Abfrage aktiv |
| ab `0699-045` | Nano-SIM | PIN-Abfrage vollständig aus |

Mailbox, Rufumleitungen und störende Komfortdienste über den Anbieter oder ein Smartphone deaktivieren. Dafür nur vom Anbieter beziehungsweise Endgerät bestätigte Codes verwenden. Für Auslandsnutzung müssen Roaming, Partnernetz, unterstützte Mobilfunktechnik und Kosten vorab geprüft werden.

Eine permanente Providerfreigabe oder starre Länder-Abschalttabelle ist nicht belastbar. Auswahl, Vorbereitung und Test sind unter [[Mobilfunk und SIM-Karten — Pro-Finder sicher in Betrieb nehmen]] beschrieben.

---

## Zielrufnummern programmieren

Pro-Finder muss zuerst mit Zielrufnummern programmiert werden. Bis zu **10 Nummern** sind möglich. Die erste ist die **Masternummer**; eine neue Programmier-SMS von ihr **ersetzt die gesamte Rufnummernliste**, sie hängt nicht nur einen Teilnehmer an.

### Programmier-SMS nach Anleitung und Gerätegeneration

Die öffentliche Anleitung ab `0699-045`, Rev. 1.3 (06/2025), zeigt beispielsweise `+S491511142338-491736660456`: erster Teilnehmer autorisiert und als Smartphone gekennzeichnet, zweiter Teilnehmer ohne Steuerungsberechtigung. Die Rufnummern sind Beispiele und müssen ersetzt werden. `+` kennzeichnet autorisierte, `-` nicht autorisierte Empfänger; `S` liefert die Position als Kartenlink. Internationale Landesvorwahl verwenden, nationale führende Null weglassen; **keine Leerzeichen** in die Programmier-SMS.

### Prepaid-Restguthaben abfragen: Grenze SN -044 / -045

Die Anleitung Rev. 2.6 zeigt für ältere Geräte ohne Guthabenabfrage ebenfalls `+S49…`; für geeignete Prepaid-Karten zusätzlich einen anbieterspezifischen Code und `P`, etwa `*100#P+S49…`. Bei **Vertragskarten keinen Guthaben-Abfragecode** verwenden. Laut FAQ ist diese Prepaid-Abfrage **nur bis SN -044** vorgesehen. **Ab SN -045 keine Restguthabenabfrage über Pro-Finder**; Guthaben im Providerportal prüfen. Eine falsche Abfrage kann Alarmmeldungen blockieren.

Die vorhandenen sprachbezogenen Konfigurationsbeispiele mit `DE`/`FR` stammen aus einer anderen Dokumentfamilie. Die öffentliche Anleitung Rev. 1.3 zeigt keinen solchen Präfix. Daraus folgt weder, dass der Präfix immer nötig, noch, dass er generell ungültig ist. Die App mit der tatsächlichen Seriennummer und Gerätesprache verwenden; bei abweichender erzeugter Syntax vor einem Überschreiben THITRONIK hinzuziehen. Keine Syntax aus verschiedenen Revisionen zusammensetzen.

Belege: Rev. 2.6, PDF S. 9–11; Rev. 1.3, PDF S. 14–17; FAQ, PDF S. 1, 4, 7.

### Zielrufnummern löschen mit Stellung E

**Stellung E löscht den gesamten Zielrufnummernspeicher einschließlich Masternummer.** Das ist kein allgemeiner Reparaturreset und kein Löschen der WiPro-Funksender oder Bluetooth-Kopplung. Nur für eine beabsichtigte Neueinrichtung anwenden: SIM muss im Gerät bleiben; Hauptkabelbaum abziehen, Stellung E wählen, wieder anschließen und gelb/grünes Blinken abwarten. Anschließend zur ursprünglichen Betriebsart zurückstellen und alle benötigten Rufnummern neu programmieren. Alternative bei bekanntem Master: vollständige Liste per Programmier-SMS ersetzen. Belege: Rev. 2.6, PDF S. 11; Rev. 1.3, PDF S. 17.

---

## Bedienung per SMS und Anruf

Die gültige Befehlsform hängt von der im Pro-Finder programmierten Sprache ab. Sie wird nicht pauschal durch die Hardwaregeneration bestimmt. Für ein deutsch programmiertes Gerät sind unter anderem folgende Befehle dokumentiert:

| Funktion | Befehl |
|---|---|
| WiPro scharfschalten | `scharf` |
| WiPro unscharfschalten | `unscharf` |
| Status anfordern | `status` |
| Position anfordern | `pos` oder, je nach dokumentiertem Stand, `position` |
| Geofencing einschalten | `fence an` |
| Geofencing ausschalten | `fence aus` |
| Ausgang A dauerhaft einschalten | `a an` |
| Ausgang A für 1–120 Minuten einschalten | `a N`, zum Beispiel `a 30` |
| Ausgang A ausschalten | `a aus` |
| Ausgang A für 1 Sekunde einschalten | `a impuls` |
| Ausgang B entsprechend schalten | `b an`, `b N`, `b aus`, `b impuls` |
| angelernte Komponenten abfragen | `melder` |
| GPS ein- oder ausschalten | `gps an` beziehungsweise `gps aus` |

### Betriebsarten, Anruf und Spannungen in Modus 9

Die App bereitet Befehle passend zur eingestellten Sprache vor. **In Betriebsart 2 und 3 schaltet ein Anruf die WiPro in den jeweils anderen Zustand (scharf/unscharf)** und sendet danach den Status. Ein solcher Anruf ist keine reine Statusabfrage. Betriebsart 0 ist laut FAQ der Standard ohne periodische Meldungen. Rev. 1.3: Modi 4/5/6/7 senden alle 15 Minuten / 60 Minuten / 6 Stunden / 24 Stunden; Modus 9 enthält U1–U5 ohne automatisches Intervall. Die alte Rev. 2.6 zeigt bei Modus 9 keine U-Werte; nicht auf alle Geräte übertragen (PDF S. 5 gegenüber Rev. 1.3 S. 10). Deshalb die Schalterstellung nicht ohne Abgleich mit Seriennummer, Anschlussart und passender Anleitung ändern.

Alarm-SMS an mehrere Rufnummern werden nacheinander versendet. Wird ein kontrollierter Alarmtest sofort beendet, können später gespeicherte Zielrufnummern unbenachrichtigt bleiben.

---

### Französische Befehle sind versionsabhängig

Die alte öffentliche Befehlsmatrix 1.1 und die ältere Rev. 2.6 verwenden andere französische Wörter als die Anleitung ab `0699-045`, Rev. 1.3. Die Gerätesprache und der tatsächliche Softwarestand entscheiden, nicht allein die Sprache der Supportfrage. Befehle nicht frei übersetzen oder mit typografischen Apostrophen verändern.

| Funktion | Ältere öffentliche Matrix 1.1 | Anleitung ab -045, Rev. 1.3 |
|---|---|---|
| Scharf / unscharf | `arme` / `desarme` | `activer` / `desactiver` |
| Status | `statut` | `rapport d etat` |
| Geofencing ein / aus | `gardiennage active` / `gardiennage desactive` | `activer le gardiennage` / `desactiver le gardiennage` |
| Anlernen ein / aus | `mode d'apprentissage active` / `mode d'apprentissage desactive` | `activer le mode d appairage` / `desactiver le mode d appairage` |
| Ausgang A ein / aus | `a active` / `a desactivee` | `activer la sortie A` / `desactiver la sortie A` |
| Ausgang A Impuls | Rev. 2.6: `a impulsion` | `sortie A impulsion` |

Die Rev. 1.3 nennt `position` für den Standort und für die Zeitsteuerung `a %min%` mit 1–120 Minuten; der Platzhalter wird durch eine Zahl ersetzt, zum Beispiel `a 30`. Kein pauschales Alias-Versprechen für ältere Firmware. Belege: öffentliche Befehlsmatrix 1.1, PDF S. 1; Rev. 1.3, FR PDF S. 71–75. Die ältere Matrix gilt nicht als universelle Anleitung für alle Pro-Finder.

---

## Geofencing und Position

Geofencing meldet eine Standortveränderung als **stillen Diebstahlalarm**. Mit angeschlossener WiPro wird es beim Scharfschalten automatisch aktiviert und beim Unscharfschalten deaktiviert. In den Betriebsarten **8 und B** lässt es sich über **Pin 3** steuern: Stellung 8 über 6 V ein / unter 5 V aus; Stellung B über 6 V aus / unter 5 V ein. Für die anderen regulären Betriebsarten beschreibt die Anleitung SMS-Steuerung. Am neuen Standort erst `fence aus`, dann `fence an` senden, damit ein neuer Bezugspunkt gesetzt wird.

### Geofencing-Radius: Original statt OCR

Die Anleitung ab `0699-045`, **Rev. 1.3, Stand 06/2025**, nennt auf Deutsch und Französisch **900 Meter**. In der OCR-Abschrift steht an einer Stelle fälschlich 500 Meter. Maßgeblich ist das gerenderte Original, nicht diese OCR-Zahl.

Die ältere **Rev. 2.6** nennt auf Deutsch **ca. 1 km**, auf Französisch **ca. 1,5 km**. Das ist ein **Quellenwiderspruch**, keine belegte Einstellspanne. Für Altgeräte keinen einheitlichen Radius garantieren; Seriennummer und Softwarestand durch THITRONIK zuordnen lassen. Auch 900 Meter sind keine zentimetergenaue Grenze. GPS-Abschattung und Reflexionen in Gebäuden können unplausible Standortwechsel verursachen.

Belege: Rev. 1.3, PDF S. 19, 21 / FR 70, 72; Rev. 2.6, PDF S. 12, 15 / FR 47, 50. Die OCR-Fassung ist keine unabhängige Quelle.

### GPS-Standby, letzte Position und UTC

**GPS: Standby** bezeichnet den Ruhemodus des GPS-Empfängers; bei einem Ereignis wird er automatisch reaktiviert. Diese Anzeige allein beweist nicht das genaue Alter einer Position. **GPS kein Empfang** bedeutet dagegen, dass keine aktuelle gültige Position verfügbar ist. Pro-Finder wartet bis zu **10 Minuten** und sendet dann gegebenenfalls die **letzte gültige Position**. Die **UTC-Zeit gehört zur letzten empfangenen Position**, nicht zwingend zum Versandzeitpunkt. Einen alten Fix nicht als aktuellen Fahrzeugstandort ausgeben.

Belege: Rev. 2.6, PDF S. 12, 15, 17; Rev. 1.3, PDF S. 19, 22, 24.

---

## Alarm- und Statusmeldungen

| Meldung | Typischer Auslöser / Inhalt |
|---|---|
| Statusbericht | auf Anforderung, per Anruf oder automatisch entsprechend der Betriebsart |
| Einbruchmeldung | Alarmereignis der verbundenen WiPro |
| Gasalarm | Gasmeldung über die verbundene WiPro und kompatible Sensorik |
| manueller Alarm | bewusst ausgelöster Panik-/Notfallalarm |
| Diebstahlmeldung | Geofencing erkennt eine relevante Ortsveränderung; stiller Alarm |
| Notruf-SMS | Eingangssignal in einer entsprechend eingerichteten Betriebsart |
| Spannungswarnung | Versorgung erreicht die Unterspannungsschwelle |
| Positions-SMS | Antwort auf eine Positionsabfrage |
| Hilfe-SMS | Antwort auf einen nicht erkannten Befehl, abhängig vom Softwarestand |

Ab dem dokumentierten Meilenstein `0699-013` ist bei Alarmen zusätzlich ein Signalisierungsanruf an die Masternummer aufgeführt. Der genaue Ablauf hängt von Gerätestand und Konfiguration ab. Der Pro-Finder nimmt kein Gespräch an; der Anruf dient als zusätzliche Aufmerksamkeitssignalisierung.

Ein Statusbericht kann je nach Gerätegeneration, Betriebsart und angeschlossenen Komponenten enthalten:

- Alarmzustand der WiPro
- Zustand des Geofencings
- GPS-Position und Geschwindigkeit
- Zustand der Ausgänge A und B
- Versorgung U1 und Messeingänge U2–U5, auch ab -045; angezeigte Werte hängen von der Betriebsart ab
- Temperatur in unmittelbarer Gerätenähe, bereits in Rev. 2.6 beschrieben; kein garantierter Innenraum-Messwert
- Prepaid-Guthaben nur bei unterstützten Geräten bis -044 und passendem Abfragecode; nicht ab -045

---

## Ausgänge und sichere Fahrzeugstilllegung

Ausgänge A und B können Verbraucher bis zur dokumentierten Lastgrenze schalten. Zeitbefehle `a N` und `b N` verwenden Minuten, nicht Sekunden; zulässig sind **1 bis 120 Minuten**. `a impuls` und `b impuls` schalten für eine Sekunde.

Die Fahrzeugstilllegung setzt eine fachgerecht installierte [[Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder]] an Ausgang A voraus.

> ⚠️ **WARNUNG — ausschließlich `kill` verwenden:** Zur Fahrzeugstilllegung niemals `a an` oder `a N` senden. Diese Befehle schalten Ausgang A ohne Geschwindigkeitsprüfung. `kill` wartet dagegen, bis die GPS-Geschwindigkeit mindestens **5 Sekunden durchgehend 0 km/h** beträgt, und schaltet erst dann Ausgang A.

Die Stilllegung wird mit `a aus` aufgehoben. Sie ist nur für einen Alarmfall und höchstens **drei Tage** vorgesehen. Der erhöhte Stromverbrauch kann sonst die Starterbatterie entladen. Keine Stilllegungsprüfung bei fahrendem Fahrzeug durchführen und nicht selbst zu einem mutmaßlich gestohlenen Fahrzeug fahren.

---

## Unterspannung und Standby

Die Anleitungen Rev. 2.6 und Rev. 1.3 beschreiben die **Spannungswarnung ausdrücklich nicht in Betriebsart B**. Für die dokumentierte Warnfunktion gilt: Sinkt die Versorgung **dauerhaft unter 11,2 V**, sendet Pro-Finder eine Warnung und geht in Standby. Erst **über 12,5 V** kehrt er in den Normalbetrieb zurück. Die Angabe ist keine Warnung exakt beim Erreichen von 11,2 V und kein Nachweis für dieselben Schwellen in jeder 24-V-Installation.

Bei ausbleibender Reaktion tatsächliche Versorgung am Gerät, Batterie und Ladeanlage prüfen. Keine Unterspannungswarnung in Betriebsart B versprechen. Die Ausnahme nicht als Nachweis dafür interpretieren, dass in B sämtliche Schutzfunktionen fehlen. Wiederholtes Ziehen der Sicherung behebt die Ursache nicht. Belege: Rev. 2.6, PDF S. 12 / FR 47; Rev. 1.3, PDF S. 19 / FR 70.

---

## Status-LED nach Gerätegeneration

| LED-Zustand | Bis `0699-044` | Ab `0699-045` | Sichere Erstprüfung |
|---|---|---|---|
| blinkt rot/gelb | Netzsuche und keine Zielrufnummern | Netzsuche und keine Zielrufnummern | Netzabdeckung und Programmierung prüfen. |
| blinkt rot | Netzsuche / kein Empfang | Netzsuche / kein Empfang | Standort, SIM und aktuelle Netzabdeckung prüfen. |
| leuchtet gelb | Modem stellt Verbindung her | Modem stellt Verbindung her | Beim Start abwarten; bei Dauerzustand SIM und Empfang prüfen. |
| leuchtet rot | SIM fehlt oder ist defekt | SIM fehlt oder ist defekt | Spannungsfrei schalten und SIM sowie Format prüfen. |
| blinkt rot/grün | PIN ist nicht `0000` | PIN-Abfrage nicht korrekt deaktiviert | Generationsabhängige PIN-Regel anwenden. |
| blinkt gelb | Zielrufnummernspeicher leer | letzte SMS konnte nicht gesendet werden | Alt: Zielrufnummern; neu: Tarif, Guthaben, Nummer und Netz prüfen. |
| leuchtet grün | SMS wird versendet | SMS wird empfangen oder versendet | Kurzzeitiger normaler Kommunikationszustand. |
| blinkt gelb/grün beziehungsweise grün/gelb | eingebucht, aber keine Zielrufnummern | eingebucht, aber keine Zielrufnummern | Zielrufnummern programmieren. |
| blinkt grün | Normalbetrieb | Normalbetrieb | eingebucht und Zielrufnummern vorhanden |

> **Wichtig:** Gelbes Blinken bedeutet vor und ab `0699-045` etwas anderes. Ohne vollständige Seriennummer ist keine eindeutige LED-Diagnose möglich.

---

### GPS-Diagnose in Stellung F

In **Stellung F** bedeutet **rot leuchtend: GPS nicht angeschlossen**, **gelb blinkend: GPS-Daten ohne gültige Position**, **grün leuchtend: GPS-Position okay**. Bei weiter gelb blinkender LED nach fünf Minuten Empfang und Montageort prüfen. Danach den Schalter unbedingt auf die ursprüngliche Betriebsart zurückstellen. Im normalen Betrieb bedeutet rotes Dauerlicht dagegen SIM fehlt/defekt. Diagnosemodus und normalen LED-Code nicht verwechseln.

Für das erstmalige Anschließen der optionalen externen GPS-Antenne nennen beide Anleitungen: spannungsfrei verbinden, anschließend bei freier Satellitensicht mindestens fünf Minuten Versorgung **über 13,5 V**. Das ist die dokumentierte Antenneninitialisierung, keine allgemeine Mindestbetriebsspannung für jeden Pro-Finder. Belege: Rev. 2.6, PDF S. 6–7; Rev. 1.3, PDF S. 11–12.

---

## Systematische Fehlerprüfung

| Beobachtung | Prüfung |
|---|---|
| keine Reaktion auf SMS | Programmierung, Absenderberechtigung, Empfang, Tarif, Guthaben und exakte Befehlssyntax prüfen; klassische SMS statt RCS/iMessage verwenden |
| Statusabfrage funktioniert, WiPro-Alarme fehlen | Verbindungskabel und WiPro-Zustand im Statusbericht prüfen; falschen Prepaid-Abfragecode ausschließen |
| Mailbox nimmt einen Testanruf an | Mailbox oder Rufumleitung über Anbieter beziehungsweise Endgerät deaktivieren |
| erste Zielnummer erhält Alarm, spätere nicht | berücksichtigen, dass SMS nacheinander versendet werden; kontrollierten Alarm nicht sofort beenden |
| gelbes Blinken | immer anhand der Schwelle `0699-045` bewerten |
| keine aktuelle Position | Montageort, Abschirmung und GPS-Empfang prüfen; Kennzeichnung einer alten Position beachten |
| Gerät nach Unterspannung ohne Reaktion | Spannung messen, Batterie laden und Rückkehrschwelle über `12,5 V` beachten |
| wiederkehrender Ausfall nach Lade-/Solarereignissen | Versorgung und möglichen Überspannungseinfluss durch Fachpersonal prüfen; Sicherungsreset nicht als Dauerlösung verwenden |

Android-Nachrichten-Apps können Befehle als RCS-/Chatnachricht statt als SMS versenden. Für die Einrichtung RCS bei Bedarf vorübergehend deaktivieren und den Nachrichtentyp kontrollieren. Auf einem iPhone darf der Befehl nicht als iMessage gesendet werden; eine zuvor mit iMessage verknüpfte Pro-Finder-Nummer muss gegebenenfalls abgemeldet werden.

Weitere Diagnosewege und generationsabhängige Maßnahmen stehen unter [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]. Für eine Eskalation vollständige Seriennummer, Softwarestand, SIM-Anbieter, Tarif, Land, Hostnetz, LED-Zustand, Versorgungsspannung und exakten Ablauf gemäß [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]] dokumentieren.

---

## App-Kompatibilität und Updates

Die dokumentierte App-Kompatibilität des Pro-Finders beginnt bei `0699-013`, nicht erst beim LTE-Hardwarewechsel `0699-045`. Welche Schaltflächen tatsächlich funktionieren, hängt zusätzlich von Pro-Finder-Softwarestand, WiPro-Variante, Fahrzeuganbindung und eingebautem Zubehör ab.

Bei unbekannter Seriennummer kann die App einen Ersatz-Eingabewert anbieten. Dieser dient nur zur Darstellung von Optionen und ist weder eine Kompatibilitätsbestätigung noch ein Update. Auch das manuelle Eintragen von `0699-045` rüstet kein LTE-Modem nach.

Ob für ein bestimmtes Gerät ein Hardware- oder Softwareupdate angeboten wird, muss THITRONIK anhand der vollständigen Seriennummer und des tatsächlichen Gerätestands prüfen. Historische Preislisten, Rabattaktionen und pauschale Upgrade-Zusagen werden nicht als aktuelle Kondition geführt.

---

## Querverweise

- [[Mobilfunk und SIM-Karten — Pro-Finder sicher in Betrieb nehmen]]
- [[THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]]
- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]]
- [[Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder]]
- [[Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]
- [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]]
- [[Systemüberblick — THITRONIK-Produktwelt]]
