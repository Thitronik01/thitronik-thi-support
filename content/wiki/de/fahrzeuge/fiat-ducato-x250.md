---
title: 'Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006–2011)'
sources:
  - "content/quellen/fahrzeug-ducato-x250.pdf"
  - "content/quellen/wipro-iii-installation-rev1.8.pdf"
updated: '2026-10-01'
confidence: high
lang: de
dealerStatus: approved
---

# Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006–2011)

Dieser Artikel beschreibt den Einbau einer WiPro III safe.lock in Fiat Ducato X250, Peugeot Boxer und Citroën Jumper der Euro-4-Ausführung von 2006 bis 2011. Das fahrzeugspezifische Einbauhandbuch Stand `12/20` dokumentiert CAN-Anschluss, Warnblinker, Zentralverriegelung, Fahrzeughupe, Zündung, Versorgung und den Funktionstest mit dem umgerüsteten Originalschlüssel.

> **Abgrenzung:** Baujahr, Abgasstufe, Bordcomputer, Stecker und Leitungsfarben müssen gemeinsam geprüft werden. Die spätere Fahrzeuggruppe ab 2012 gehört zu [[Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012–2021)|Fiat Ducato 2012–2021]]; für den Vorgänger gilt [[Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper (bis 2006)|Fiat Ducato 244]].

## Geprüfte Fahrzeuggrenzen und Quellenstand

Ducato X250 Euro 4, 2006–2011: `SW2 + SW6 ON`. CAN am grünen Einsatz Pin 5 (Low) / Pin 6 (High), alternativ am schwarzen Einsatz Pin 25 (Low) / Pin 24 (High). Beide Adern müssen aus derselben belegten Anschlussvariante stammen. Die Anleitung 12/20 allein belegt keine zusätzliche SW5-Stellung für jede als safe.lock bezeichnete Anlage; Schlüssel, Umrüstplatine und Gerätestand gesondert zuordnen.

Belege: [ducato-x250, PDF 2](../../../quellen/fahrzeug-ducato-x250.pdf#page=2), [ducato-x250, PDF 4](../../../quellen/fahrzeug-ducato-x250.pdf#page=4).



> **Zeitangaben:** Die Fahrzeug-PDF nennt 180 Sekunden optischen Alarm; die allgemeine Bedienungsanleitung nennt 120 Sekunden. Die Zuordnung nach Gerätestand bleibt offen. 180 Sekunden hier als Quellenangabe, nicht als verbindliches Abnahmekriterium verwenden. Dasselbe gilt für übernommene 4-Sekunden-Lüftungsangaben gegenüber 5 Sekunden im Bedienhandbuch.

## Geltungsbereich

| Merkmal | Vorgabe |
|---|---|
| Fahrzeuge | Fiat Ducato X250, Peugeot Boxer und Citroën Jumper |
| Baujahre | 2006–2011, Euro 4; tatsächliche Ausführung prüfen |
| Primärsystem | WiPro III safe.lock mit fahrzeugspezifischem Montagekit |
| Fahrzeugkonfiguration | `SW2 + SW6` auf `ON` |
| safe.lock-Anbindung | Pin 28 und Pin 50 für vordere beziehungsweise hintere Türen |
| Bedienung im Funktionstest | umgerüstete Original-Fahrzeugfernbedienung |
| Kompatibilitätsbasis | `0823-001 / 2.1`; keine eigene Mindestseriennummer im Fahrzeughandbuch |

Seriennummer, Softwarestand und Geräteausführung sind vor dem Einbau über [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]] zu prüfen.

## Fahrzeugkonfiguration und Replay-Schutz trennen

| Funktion | Voraussetzung | DIP-Stellung | Wirkung |
|---|---|---|---|
| Fahrzeugprofil X250 Euro 4 | fahrzeugspezifisches Einbauhandbuch | `SW2 + SW6` | CAN-Profil und dokumentierte Fahrzeugbedienung |
| Allgemeiner Replay-Schutz der WiPro | ab Seriennummer `0823-014` beziehungsweise Software `5.8` | `SW5` | Original-Fahrzeugfunkschlüssel steuert die WiPro nicht mehr; Türauswertung bleibt aktiv |
| safe.lock-Umrüstplatine Art. `101052` | passende WiPro III safe.lock und geeigneter Fahrzeugschlüssel | keine daraus abgeleitete zusätzliche DIP-Stellung | codierte Schlüsselbedienung über die Umrüstplatine |

`SW5` ist **kein allgemeiner safe.lock-Schalter** und darf nicht pauschal zu `SW2 + SW6` addiert werden. Die fahrzeugspezifische Primärquelle verwendet `SW2 + SW6` und prüft anschließend die umgerüstete Original-Fahrzeugfernbedienung. Eine abweichende Replay-Konfiguration benötigt eine eigene Freigabe anhand Seriennummer, Softwarestand, WiPro-Ausführung und verwendetem Set. Grundlagen beschreibt [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]].

## Sicherheit und Vorbereitung

- Arbeiten an Fahrzeugelektrik und -elektronik nur durch eine qualifizierte Fachwerkstatt ausführen lassen.
- Vor dem Öffnen der WiPro, dem Umstellen von DIP-Schaltern oder elektrischen Arbeiten die Spannungsversorgung trennen.
- Spannungsversorgung erst nach Abschluss aller Montage- und Anschlussarbeiten in Pin 46 einsetzen.
- Klemme 30, Zündung, Masse, CAN-Leitungen und Sicherung messtechnisch beziehungsweise anhand des konkreten Steckers bestätigen.
- Ungenutzte Ein- und Ausgänge einzeln gegen Kurzschluss isolieren.
- Bei Abweichungen von Abbildungen, Steckerform, Pinbelegung oder Leitungsfarben die Arbeit stoppen und Hersteller oder THITRONIK Support einbeziehen.

Vor Beginn sind Fahrzeug-Fernbedienung, Zentralverriegelung, Hupe, Originaltüren, Warnlampen und vorhandene Fehlerspeichereinträge zu prüfen und zu dokumentieren.

## Funk-Zubehör anlernen und DIP einstellen

Funk-Magnetkontakte, Funk-Gaswarner und Funk-Kabelschleifen sollen vor dem Einbau angelernt werden.

1. Taster rechts neben dem Anschlussstecker gedrückt halten, bis die Zentrale piept und die Status-LED dauerhaft leuchtet.
2. Jeden zu speichernden Kontakt, Gaswarner oder jede Kabelschleife zwei- bis dreimal auslösen.
3. Piepton und kurz erlöschende LED als Speicherbestätigung prüfen.
4. Spannungsversorgung entfernen und WiPro-Gehäuse öffnen.
5. Am 8-fach-Codierschalter `SW2` und `SW6` auf `ON` stellen.
6. Alle übrigen Schalter nur nach der für das konkrete System freigegebenen Konfiguration einstellen; `SW5` nicht automatisch ergänzen.
7. Gehäuse schließen und mit der Installation fortfahren.

Der allgemeine Lernablauf steht zusätzlich unter [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]].

## Armaturenbrett und Bordcomputer zugänglich machen

1. Drei dokumentierte Kreuzschlitzschrauben der Armaturenbrettverkleidung lösen.
2. Schrauben links und rechts neben dem Lenkrad sowie die zweite Schraube links neben dem Lenkrad entfernen.
3. Verkleidung vorsichtig abnehmen.
4. Blauen Stecker auf der Vorderseite des Bordcomputers lösen; roten Sicherungsbügel nach vorn klappen.
5. Schwarzen Steckereinsatz über die seitlichen Kunststofflaschen entriegeln und entfernen.
6. Drei Befestigungsschrauben des Bordcomputers entfernen.
7. Bordcomputer nach vorn ziehen, ohne Leitungen oder Stecker zu belasten.

Die WiPro-Zentrale wird mit der Montageplatte am Massepunkt links hinter dem Bordcomputer befestigt. Der Einbauraum muss trocken bleiben; Antenne nicht kürzen oder aufwickeln.

## Spannungsversorgung über Pin 46 vorbereiten

| Anschluss | Fahrzeugvorgabe | WiPro / Maßnahme | Funktion |
|---|---|---|---|
| vorderer blauer Bordcomputerstecker, Pin 46 | über Sicherung `F39`, `10 A` abgesichert | Spannungsversorgungsleitung erst nach allen Anschlussarbeiten einsetzen | Klemme 30 / Versorgung |
| Pin 46 bereits belegt | mögliche Leitung rot/gelb oder rot/schwarz | Verbindung fachgerecht mit freigegebenem Abzweig herstellen | gemeinsame Versorgung |

Pin 46 ist laut Quelle am Stecker unten nummeriert. Sicherung `F39` sitzt in der unteren Reihe als dritte Sicherung von links. Vor dem Anschluss Pin, Spannung und Sicherungswert am tatsächlichen Fahrzeug prüfen.

## safe.lock-Leitungen der Zentralverriegelung

| Pin | Fahrzeugleitung | WiPro-Leitung | Funktion |
|---:|---|---|---|
| 28 | blau/gelb | blau/schwarz | Türen vorn |
| 50 | rosa/violett | blau | Türen hinten |

Die beiden Leitungen steuern die Zentralverriegelung im dokumentierten safe.lock-System. Vorder- und Hintertüren müssen im Funktionstest getrennt geprüft werden; Leitungen nicht vertauschen oder bei integrierten Fahrzeugen pauschal weglassen.

## CAN und Warnblinker am hinteren blauen Stecker

| Steckereinsatz / Pin | Fahrzeugleitung | WiPro-Leitung | Funktion |
|---|---|---|---|
| weißer Einsatz, Pin 34 | rosa/rot | rosa/rot | Warnblinker |
| grüner Einsatz, Pin 5 | rosa/weiß | violett/orange | CAN-Low |
| grüner Einsatz, Pin 6 | rosa/schwarz, ab Modelljahr 2010 möglicherweise violett/schwarz | weiß/orange | CAN-High |
| schwarzer Einsatz, Pin 25 | rosa/weiß | violett/orange | alternative CAN-Low-Verbindung |
| schwarzer Einsatz, Pin 24 | rosa/schwarz, ab Modelljahr 2010 möglicherweise violett/schwarz | weiß/orange | alternative CAN-High-Verbindung |

CAN-Low und CAN-High müssen **vom selben Steckereinsatz** abgegriffen werden: entweder Pin 5/6 des grünen oder Pin 25/24 des schwarzen Einsatzes. Steckereinsätze vollständig verriegeln; der rote Bügel sichert den Stecker in senkrechter Stellung.

## Fahrzeughupe und Zündung

| Anschlussort | Fahrzeugleitung | WiPro-Leitung | Funktion |
|---|---|---|---|
| Kabelbaum unter der Lenksäule, Pin 8 | braun/grün; mögliche Abweichung grün, ab Modelljahr 2010 eventuell grün/braun | rosa | Fahrzeughupe |
| grüner Stecker auf der Rückseite des Bordcomputers | weiß/schwarz | gelb | Zündung |

Für den Hupenanschluss die Lenksäulenverkleidung mit vier Schrauben und 3-mm-Innensechskant entfernen. Fahrzeughupe und separate Sirene sind unterschiedliche Alarmgeber. Zündungsleitung vor dem Anschluss messen; bei aktiver Zündung bleibt die Anlage laut Fehlerdiagnose deaktiviert.

## Status-LED, Montageplatte und Zusammenbau

1. Rückwärtigen Bauraum der vorgesehenen LED-Position auf Leitungen und Bauteile prüfen.
2. Loch mit `8 mm` Durchmesser bohren, LED einsetzen und rot/schwarzes LED-Kabel über den weißen Steckverbinder verbinden.
3. Montageplatte am Massepunkt links hinter dem Bordcomputer befestigen und Schraube fest anziehen.
4. Erst jetzt die vorbereitete Spannungsversorgungsleitung in Pin 46 einsetzen.
5. Steckereinsätze, Stecker und Bordcomputer wieder montieren; roten Hebel senkrecht einrasten lassen.

Vor dem Schließen der Verkleidung alle Abzweige, Isolierungen, Verriegelungen, Sicherung und Masseverbindung kontrollieren.

## safe.lock-Umrüstplatine und Schlüsselbedienung

Die [[safe.lock Umrüstplatine — Schlüsselsicherheit für Ducato/Boxer/Jumper|safe.lock Umrüstplatine]] Art. `101052` ersetzt im geeigneten Fahrzeugschlüssel die unsichere ursprüngliche Funkübertragung durch eine codierte Verbindung zur WiPro III safe.lock. Sie ist kein eigenständiges Alarmprodukt und bestimmt allein keine DIP-Stellung.

Im fahrzeugspezifischen Funktionstest wird die **umgerüstete Original-Fahrzeugfernbedienung** verwendet. Ohne nachgewiesene Umrüstung oder bei aktivem allgemeinen `SW5`-Replay-Schutz darf aus diesem Test keine Bedienfreigabe für den unveränderten Originalfunkschlüssel abgeleitet werden. Als zusätzliche Bedienwege kommen je nach System [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]] oder [[NFC Modul — Steuerung der WiPro via NFC|NFC Modul]] infrage.

## Abschließende Funktionsprüfung

> **Zeitkonflikt:** Messwert protokollieren. Die hier genannten 180 Sekunden stammen aus der Fahrzeugquelle; 120 Sekunden stehen in der allgemeinen Anleitung. Ohne Gerätestand-Zuordnung kein verbindliches Abnahmekriterium.

1. Alle Türen schließen und mit der Verriegeln-Taste der umgerüsteten Original-Fahrzeugfernbedienung scharfschalten.
2. Falls die WiPro zunächst nicht reagiert, mehrmals ver- und entriegeln, damit sich die CAN-Daten synchronisieren.
3. Einen Piepton, Blinken der Fahrtrichtungsanzeiger und blinkende Status-LED als Aktivierungsbestätigung prüfen.
4. Eine Fahrerhaustür geöffnet lassen und prüfen, dass das Fahrzeug nicht verriegelt und die WiPro nicht aktiviert wird.
5. Fahrzeug erneut korrekt verriegeln und Alarm durch mechanisches Öffnen der Fahrertür auslösen: innen über den Türgriff oder außen mit dem mechanischen Schlüssel.
6. Akustischen Alarm für etwa `30 Sekunden` prüfen.
7. Optischen Alarm über die Fahrzeugblinker für etwa `180 Sekunden` prüfen, sofern der Alarm nicht vorher beendet wird.
8. Mit der Entriegeln-Taste entschärfen beziehungsweise den Alarm unterbrechen.
9. Vorder- und Hintertüren, CAN-Erkennung, Warnblinker, Fahrzeughupe und jedes Funk-Zubehör einzeln testen.
10. Abschließend kontrollieren, dass keine neuen Warnlampen, elektrischen Fehler oder Fehlerspeichereinträge entstanden sind.

Eine Folge kurzer Pieptöne beim Scharfschalten weist auf einen offenen angelernten Magnetkontakt hin; die Anlage schaltet laut Quelle trotzdem scharf. Geeignete Montage- und Prüfvorgaben enthält [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]].

## Fehlerdiagnose

| Fehlerbild | Prüfung und Maßnahme |
|---|---|
| Funkschlüsselbefehle ohne WiPro-Reaktion, Piepton bei Spannungsanschluss vorhanden | CAN-Low/High prüfen; Diagnosemodus kurz per Platinentaster aktivieren und bei CAN-Datenverkehr auf Flackern der grünen linken LED achten. |
| Kein CAN-Datenverkehr im Diagnosemodus | Bus inaktiv oder Verbindung fehlerhaft; Pinpaar und gleichen Steckereinsatz prüfen. |
| Keine Reaktion und kein Piepton beim Spannungsanschluss | Versorgung, Pin 46, Crimpverbindung, Zündung und Sicherung `F39` prüfen. |
| System bleibt bei eingeschalteter Zündung inaktiv | dokumentiertes Verhalten; Zündungsanschluss und Fahrzeugzustand prüfen. |
| Offener Magnetkontakt trotz geschlossener Öffnungen | Magnetabstand prüfen, Kontakte mehrfach betätigen; falls nötig bei geschlossenen Kontakten Versorgung beziehungsweise `F39` kurz trennen und wiederherstellen. |
| Nur Vorder- oder Hintertüren reagieren auf safe.lock | Pin 28/50 und blaue beziehungsweise blau/schwarze WiPro-Leitung prüfen. |
| Fahrzeug ab Modelljahr 2010 weicht bei CAN-High farblich ab | dokumentierte Alternative violett/schwarz prüfen; niemals auf Verdacht CAN-Leitungen tauschen. |
| System verwendet eine andere WiPro-/Schlüsselkonfiguration | Arbeit stoppen und DIP-, Set- und Bedienfreigabe anhand Seriennummer und Software einholen. |

Weitere systemübergreifende Prüfungen beschreibt [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]].

## Quellenentscheidung

Prüfung vom 01.10.2026: Die im Quellenmanifest genannten Fahrzeugseiten wurden am PDF-Text und an den Originalabbildungen geprüft. Wiederholte Zubehöranhänge wurden in diesem Block nicht erneut vollständig geprüft. Frühere Projektangaben außerhalb dieses Umfangs gelten nicht als neue Herstellerbestätigung. Belege: [ducato-x250, PDF 2](../../../quellen/fahrzeug-ducato-x250.pdf#page=2), [ducato-x250, PDF 4](../../../quellen/fahrzeug-ducato-x250.pdf#page=4).

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[safe.lock Umrüstplatine — Schlüsselsicherheit für Ducato/Boxer/Jumper|safe.lock Umrüstplatine]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine|Seriennummern und Softwarestände]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]
- [[NFC Modul — Steuerung der WiPro via NFC|NFC Modul]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper (bis 2006)|Fiat Ducato 244]]
- [[Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012–2021)|Fiat Ducato 2012–2021]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]]
