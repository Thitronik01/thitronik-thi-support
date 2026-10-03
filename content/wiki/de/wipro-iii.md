---
title: WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge
sources:
  - "content/quellen/fahrzeug-safelock-upgrade.pdf"
  - "content/quellen/fahrzeug-update-service-2024.pdf"
  - "content/quellen/wipro-iii-installation-rev1.8.pdf"
  - "content/quellen/wipro-iii-faq.pdf"
  - "content/quellen/wipro-iii-safelock-faq.pdf"
  - "content/quellen/wipro-iii-kurzanleitung-rev1.6.pdf"
  - "content/quellen/wipro-iii-safelock-kurzanleitung-rev1.3.pdf"
  - "content/quellen/wipro-iii-safelock-bedienung-rev1.3.pdf"
  - "content/quellen/wipro-iii-safelock-bedienung-rev1.2.pdf"
  - "sources/wipro_deutsche_bedienungsanleitung_abschrift.txt"
  - "sources/Was ist eine Wipro.docx"
  - "sources/FAQ_WiPro-III_DE.md"
  - "sources/WiPro_QuickStart_DE_RAG_Pack/WiPro__QuickStart__Alarm_Ventcheck_Panikalarm_DE.md"
  - "sources/WiPro_QuickStart_DE_RAG_Pack/WiPro__QuickStart__Batterie_Zubehoer_Alarmspeicher_DE.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/05_1_3_safe_lock_key.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/06_1_4_safe_lock_remote.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/18_1_10_alarm_unterbrechen_overview.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/19_1_10_1_einbruchalarm_key.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/22_1_10_4_gasalarm_remote.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/35_3_2_entsorgung.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/36_3_3_konformitaet.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/38_snippets.md"
updated: '2026-10-01'
confidence: medium
lang: de
coverage: complete
dealerStatus: approved
articleType: product
---

# WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge

WiPro III ist ein speziell für **Freizeitfahrzeuge** entwickeltes Alarmsystem. Es verwendet keine Bewegungsmelder. Nachgerüstete Öffnungen werden mit Funk-Magnetkontakten überwacht; fahrzeugeigene Türen können je nach Fahrzeug über den CAN-Bus oder den Innenbeleuchtungseingang eingebunden werden. Weitere Alarmquellen lassen sich über kompatibles Zubehör ergänzen.

**Varianten:**
- **WiPro III** — Standardversion
- **WiPro III safe.lock** — erweitert WiPro III um eine fahrzeugabhängige Zentralverriegelungs- und Zugangslogik. Sie schützt insbesondere davor, dass ein aufgezeichnetes Entriegelungssignal gleichzeitig das Fahrzeug öffnet und die Alarmanlage unscharf schaltet. safe.lock ist keine Wegfahrsperre.

---

## Fahrzeugabhängige Bedienung: Sprinter, Ford und VW

**Mercedes Sprinter safe.lock:** Nach Verriegelung mit dem Originalschlüssel ist das Entriegeln über THITRONIK Handsender, NFC oder App nicht möglich. Ab Software **1.2.0sx** warnen **zehn kurze, schnelle Pieptöne und gleichzeitig schnelle Fahrzeugblinker** vor dem Aussperren. Im Campingbetrieb mit THITRONIK Zubehör verriegeln; danach ist Entriegeln mit dem Originalschlüssel weiterhin möglich und Auto-Close bleibt inaktiv. Bei längerem Abstellen ohne Nachladen empfiehlt die Anleitung den Originalschlüssel für den Sleep Mode. Beleg: Rev. 1.3, PDF-S. 5; der Zehnfach-Warnton fehlt in Rev. 1.2, PDF-S. 5.

**Ford Transit 2019–2024 / Transit Custom bis 2023:** Die Option „Schaltersperre“ muss im Fahrzeugmenü vorhanden und deaktiviert sein.

**Ford Transit 2024+ / Transit Custom 2023+:** Die Schaltersperre lässt sich laut Rev. 1.3 nicht deaktivieren. Nach Verriegeln/Scharfschalten mit dem Originalschlüssel ist Entriegeln/Unscharfschalten über THITRONIK Zubehör nicht möglich. Im Campingbetrieb mit THITRONIK Zubehör verriegeln; danach kann der Originalschlüssel entriegeln, Auto-Close ist inaktiv. Die Jahresbereiche **2024 bzw. 2023 überschneiden sich in der Quelle**: Modellgeneration und Ausstattung klären, keine Monatsgrenze erfinden. Beleg: Rev. 1.3, PDF-S. 6; Rev. 1.2, PDF-S. 5, unterscheidet diese Ford-Generationen noch nicht.

**VW T-Modelle:** Ist nur die Fahrertür geschlossen, kann die Zentralverriegelung bereits schließen. Die Alarmanlage wird erst scharf, wenn **alle Fahrzeugtüren** geschlossen sind. Beleg: Rev. 1.3, PDF-S. 6; Rev. 1.2, PDF-S. 5.

## Technische Daten

### Zentrale

| Parameter | Wert |
|-----------|------|
| Spannungsversorgung | 9–30 V DC |
| Stromaufnahme (Ruhezustand) | ca. 11 mA |
| Sirenenausgang | 9–30 V (= Uin) / max. 1 A |
| Blinkerausgang | max. 60 W |
| Maximal anlernbare Sender | 100 |
| Empfangsfrequenz | 868,35 MHz |
| Anzahl Codes | > 4 Milliarden |
| Betriebstemperatur | –10 °C bis +80 °C |
| Schnittstellen | RJ11 (Pro-Finder), CAN-Bus |

### Funk-Zubehör (Magnetkontakte, Handsender)

| Parameter | Wert |
|-----------|------|
| Sendeleistung | < 10 mW |
| Maximale Reichweite | 75 m (im Freifeld) |
| Batterie | CR2032 (Knopfzelle, 3 V) |
| Batterielebensdauer | ca. 2 Jahre |
| Sendefrequenz | 868,35 MHz |
| Anzahl Codes | > 4 Milliarden |
| Betriebstemperatur | –10 °C bis +60 °C |

> **VORSICHT:** Bei falsch eingesetzter oder ungeeigneter Batterie besteht Explosionsgefahr. Nur den vorgesehenen Batterietyp verwenden und verbrauchte Batterien vorschriftsgemäß entsorgen.

---

## Bestimmungsgemäßer Einsatz und Grenzen

- Entwickelt für **Freizeitfahrzeuge** — nicht zur Absicherung von Gebäuden, Fahrrädern oder Motorrädern vorgesehen.
- Geschützt sind nur Öffnungen, die entweder fahrzeugseitig über **CAN-Bus / Innenlicht** erfasst oder mit **Funk-Magnetkontakten** ausgerüstet sind.
- Öffnungen ohne fahrzeugseitige Erfassung und ohne nachgerüsteten Kontakt bleiben **ungesichert**.
- Die WiPro III meldet Einbruch- oder Alarmereignisse, sie **verhindert** den Einbruch jedoch nicht.

---

## Funktionsprinzip

1. Nachgerüstete Türen, Fenster und Klappen werden über **Funk-Magnetkontakte 868** überwacht.
2. Fahrzeugeigene Türen werden je nach Fahrzeug über **CAN-Bus** oder den **Innenbeleuchtungseingang** erfasst.
3. Das Scharf- und Unscharfschalten erfolgt abhängig von Fahrzeug und Ausstattung über den Original-Fahrzeugfunkschlüssel oder ein THITRONIK® Bedienteil.
4. Bei einem Alarm werden die angeschlossenen akustischen Alarmgeber sowie Warnblinker und Status-LED angesteuert. Sirene und Fahrzeughupe sind dabei getrennte Alarmgeber.

### Alarmsequenzen

Die Bedienungsanleitung Rev. 1.3 (06/2025), Kapitel 1.9.2–1.9.3, PDF-S. 13–14, beschreibt folgende Alarmsequenzen:

| Alarmtyp | Akustischer Alarm | Warnblinker + Status-LED |
|----------|-------------------|--------------------------|
| **Einbruchalarm** | Sirene und fahrzeugabhängig Hupe ca. **30 Sekunden** | im Detailkapitel ca. **180 Sekunden** |
| **Gasalarm** | Sirene und fahrzeugabhängig Hupe ca. **30 Sekunden mit Unterbrechungen** | im Detailkapitel ca. **180 Sekunden** |

**Quellenwiderspruch zur optischen Alarmdauer:** Dieselbe Revision nennt im allgemeinen Einsatzkapitel auf PDF-S. 7 **120 Sekunden** für den optischen Alarm. Das Detailkapitel nennt **180 Sekunden**. Beide Werte stehen auch in Rev. 1.2 (PDF-S. 6 gegenüber 12–13). Keine der beiden Zeiten ist damit als allgemein verbindlicher Wert für alle Geräte geklärt. Bei abweichender Alarmdauer Gerätevariante und Software erheben und THITRONIK klären lassen; nicht allein anhand der Dauer einen Defekt diagnostizieren.

Nach dem Einbruchalarmzyklus und einer **Alarmpause von 30 Sekunden** bleibt die Anlage scharf. Ein angeschlossener oder angelernter Gaswarner löst bei kritischer Konzentration **bei scharfer und unscharfer WiPro** aus; bleibt die Ursache bestehen, wiederholt sich die Alarmierung.

---

## Lieferumfang (Standardversion)

- WiPro III-Zentrale mit Anschlusskabel
- 1× Funk-Handsender 868
- 1× Funk-Magnetkontakt 868 mit Klebepads
- Sicherungshalter mit 10-A-Sicherung
- Status-LED mit Anschlusskabel
- 1× Warnaufkleber
- Installations- und Bedienungsanleitung

> **HINWEIS:** Bei fahrzeugspezifischen Sets weicht der Lieferumfang ab (anderer Kabelbaum, ggf. ohne Handsender/Magnetkontakt).

---

## Installation

### Voraussetzungen

- Vor Arbeiten an der Fahrzeugelektrik den **Minuspol der Fahrzeugbatterie abklemmen**.
- Bei Zusatzbatterien auch dort den Minuspol abklemmen.
- **Radiocode bereithalten**; beim Abklemmen können gespeicherte Fahrzeugdaten verloren gehen.
- Benötigtes Werkzeug und Material: Kreuzschlitzschraubendreher, Quetschkabelschuhzange, Voltmeter, Akkuschrauber, Bohrer 8 mm, Steckschlüsselsatz, Isolierband, Stoßverbinder, Ringöse und Kabelbinder.

### Schritt 1: Fahrzeugtyp einstellen

DIP-Schalter auf der Hauptplatine entsprechend dem Fahrzeugtyp einstellen. Die Schalterstellung nur im spannungsfreien Zustand ändern; dabei dürfen weder der 20-polige Stecker noch der Pro-Finder-Stecker angeschlossen sein.
→ Vollständige Tabelle: [[Fahrzeugkompatibilität]]

### Montagepraxis für die Zentrale

- Einen geschützten Montageort im Fahrzeuginnenraum wählen, möglichst nahe an der Zentralelektronik, damit die Kabelwege kurz bleiben.
- Die WiPro III-Zentrale sicher mit den vorgesehenen Klebepads oder Befestigungsteilen montieren. Die Klebefläche vorher reinigen, trocknen und entfetten.
- Kabel zugfrei und geschützt verlegen. Bewegliche Teile, Pedale, scharfe Kanten und heiße Bauteile dürfen die Leitungen nicht gefährden.
- Der Taster der WiPro III-Zentrale muss für Anlernen, Reichweitentest und Diagnose erreichbar bleiben.

### Schritt 2: Zubehör anlernen

> **WICHTIG:** Ab Werk ist kein Funk-Zubehör eingelernt. Nicht angelernte Funk-Komponenten können von der Anlage nicht ausgewertet werden und keinen Alarm auslösen.

1. 20-poligen Stecker einstecken.
2. Taste „B“ an der Gerätevorderseite **lange drücken**, bis ein langer Signalton ertönt und die Status-LED leuchtet → Anlernmodus aktiv.
3. Jeden Funk-Magnetkontakt auslösen: beide Teile voneinander trennen, bis die LED „C“ kurz aufleuchtet.
4. Bei jedem Funk-Handsender eine Taste drücken.
5. Funk-Gaswarner einschalten; Funk-Kabelschleife aus der Halterung nehmen.
6. Nach jedem erfolgreichen Anlernvorgang ertönt ein kurzer Signalton und die Status-LED erlischt kurz.
7. Zum Beenden des Anlernmodus Taste „B“ kurz drücken → Doppelton, Status-LED erlischt.

### Schritt 3: Anschluss an Fahrzeugsysteme

Anschlusspläne stehen im Installationshandbuch ab Seite 10. Fahrzeugspezifische Einbauunterlagen mit Steckerbelegungen und Einbauorten erhalten Fachhändler über THITRONIK.

### 20-poliger Anschlussstecker — Pinbelegung

**Geltungsbereich:** Tabelle der WiPro-III-Installationsanleitung Rev. 1.8, PDF-S. 12; keine allgemeine Pinfreigabe für safe.lock-Fahrzeugsets. **Quellenkonflikt:** Tabelle: Pin 2 braun / NO, Pin 3 grün / COM; Zeichnungen auf PDF-S. 13 und 15 vertauschen die Farben. Die FR-Grafik auf PDF-S. 43 bezeichnet Pin 13 als Blinkereingang, die Tabellen als unbenutzten Universal-Pin. Vor einem Anschluss die konkrete Leitung/Variante mit THITRONIK klären; nicht anhand einer widersprüchlichen Farbe verdrahten.

| Pin | Farbe | Kürzel | Funktion | Besonderheiten |
|-----|-------|--------|---------|----------------|
| 1 | schwarz | sw | Masse (Klemme 31) | — |
| 2 | braun | bn | Alarmeingang NO | G.A.S.-pro-Schließerkontakt. **Pin 3 (grün) bei Nichtgebrauch isolieren!** |
| 3 | grün | gn | Alarmeingang COM | — |
| 4 | rot | rt | Status-LED + | Weißen Steckverbinder mit Gegenstück der Status-LED verbinden |
| 5 | schwarz | sw | Status-LED − | — |
| 6 | rot/pink | rt/p | Smart Blinker | Leistungslose Blinkersteuerung (fahrzeugspezifische Anschlusspläne) |
| 7 | gelb | ge | Zündung (Klemme 15) | — |
| 8 | beige | be | Universalpin 3 | Renault Master und baugleiche |
| 9 | pink | p | Hupensignal | Leistungslose Hupensteuerung (fahrzeugspezifisch) |
| 10 | weiß | ws | Antenne | **Nicht kürzen oder aufwickeln!** |
| 11 | rot | rt | +12/24 V (Klemme 30) | 10-A-Sicherung verwenden |
| 12 | grau | gr | Blinker links | — |
| 13 | grau/schwarz | gr/sw | Universalpin 4 | Nicht verwendet → **isolieren** |
| 14 | grau | gr | Blinker rechts | — |
| 15 | weiß | ws | Sirene +12 V | Mit rotem Sirenenkabel oder weißem Kabel der Back-up Sirene verbinden |
| 16 | weiß/schwarz | ws/sw | Sirene Masse | Mit schwarzem Sirenenkabel verbinden. |
| 17 | weiß/orange | ws/or | CAN-High | **Nur durch Fachpersonal!** |
| 18 | violett/orange | vt/or | CAN-Low | — |
| 19 | blau/schwarz | bl/sw | Universalpin 2 | Innenbeleuchtungseingang / Ford Transit: Signalauswertung der Zentralverriegelung |
| 20 | blau | bl | Universalpin 1 | — |

> **Fachhändler** erhalten auf Anfrage fahrzeugspezifische Einbauunterlagen mit genauen Angaben zu CAN-Bus, Smart Blinker, Hupe und Auswertung der Zentralverriegelung einschließlich fahrzeugseitiger Steckerbelegungen.

### Versorgung von Sirene und Backup-Sirene

Die normale Zusatzsirene wird in Rev. 1.8, PDF-S. 10, mit Rot an Pin 15 und Schwarz an Pin 16 angeschlossen. Bei der Backup-Sirene dienen Rot/Schwarz der ständigen Versorgung, Weiß dem positiven Alarmeingang an Pin 15; den unbenutzten blauen negativen Alarmeingang isolieren. Die Spannungsfreigabe der jeweiligen Sirene separat prüfen: **9–30 V an der Zentrale bestätigen keine 24-V-Eignung jedes Zubehörs**. Maßgeblich sind die konkrete Sirenenanleitung, Stromgrenzen und das fahrzeugspezifische Anschlussblatt.

### Schritt 4: CAN-Bus-Diagnose

Nach dem Anschluss prüfen, ob WiPro CAN-Bus-Daten empfängt:

1. Taste „B“ kurz drücken → Status-LED blinkt → Diagnosemodus aktiv
2. Fahrzeugfunkschlüssel betätigen **oder** Warnblinker einschalten (erzeugt CAN-Datenverkehr)
3. **Status-LED blinkt/flackert** → CAN-Daten werden empfangen ✓
4. **Keine LED-Reaktion** → Verbindung fehlerhaft oder CAN-High und CAN-Low vertauscht

> Der gleiche Diagnosemodus wird auch für den Reichweitentest von Funk-Zubehör genutzt: Angelernten Sender auslösen → WiPro III-Zentrale gibt ein akustisches Signal.

### Schritt 5: Testalarm durchführen

Nach abgeschlossener Montage mit **jedem** angelernten Sender einen Testalarm durchführen:

- **Funk-Magnetkontakt:** WiPro scharf schalten, Kontakt öffnen → Sirene ertönt, Warnblinker blinken, ggf. Fahrzeughupe.
- **Funk-Kabelschleife:** WiPro scharf schalten, Schleife aus der Halterung nehmen.
- **Funk-Gaswarner:** WiPro scharf schalten, Gaswarner einschalten, Vorheizphase abwarten und nach dessen Anleitung mit geeignetem Prüfgas testen. Keine offene Flamme verwenden und anschließend gut lüften.
- **Fahrerhaustüren (CAN-Bus):** WiPro scharf schalten, Tür von innen öffnen.

> **WICHTIG:** Die Wartezeit von **60 Sekunden** für den Test über den **Innenbeleuchtungseingang** betrifft laut Rev. 1.3, PDF-S. 13, **nur WiPro III, nicht WiPro III safe.lock**. Alle anderen überwachten Öffnungen sind unmittelbar nach dem Scharfschalten gesichert. Keine pauschale 60-Sekunden-Verzögerung für die gesamte Anlage annehmen.

---

## Sonderfunktionen

| Funktion | Einstellung |
|----------|------------|
| Sirene leiser schalten | DIP 8 → ON |
| Anti-Jamming-Alarm deaktivieren | DIP 7 → ON (bei Störsendern in der Umgebung) |
| Replay-Schutz aktivieren | DIP 5 → ON (ab SN 0823-014 / SW 5.8) — der Fahrzeugfunkschlüssel schaltet WiPro nicht mehr scharf oder unscharf; die Auswertung der Fahrzeugtüren bleibt aktiv |

## Panikfunktion (Manueller Alarm)

WiPro III unterstützt das Auslösen eines **manuellen Alarms (Panikfunktion)**:

- **Aktivieren:** Beide Tasten des Funk-Handsenders **gleichzeitig** drücken
- **Deaktivieren:** Beliebige Taste des Funk-Handsenders drücken

Bei angeschlossenem und entsprechend konfiguriertem Pro-Finder wird eine SMS mit „Manueller Alarm“ gesendet und die Masternummer angerufen.

---

## Belüftungsfunktion (Vent check)

**FAQ-Abweichung und neun Hinweistöne:** Die FAQ WiPro III, PDF-S. 18, und die safe.lock-FAQ, PDF-S. 27, nennen **4 Sekunden** bis zur erneuten Überwachung; die Bedienungsrevisionen 1.2/1.3 nennen **mindestens 5 Sekunden** bis zum erneuten Öffnen mit Alarmauslösung. Das ist ein offener Quellenwiderspruch, keine bestätigte Softwaregrenze. Die FAQ beschreiben **9 kurze Signaltöne** vor dem tieferen Scharfschaltton als Kontakt-offen-Hinweis. Diese akustische Vent-check-Meldung ist nicht der Alarmspeicher-Code **9× Blinken der Status-LED** für einen Störsender.

Ermöglicht das Öffnen eines Fensters im gesicherten Fahrzeug ohne Alarmauslösung:

1. Gewünschtes Fenster **vor dem Scharfschalten** öffnen
2. Anlage scharfschalten → offener Kontakt wird toleriert (kein Alarm)

**Kontakt-offen-Warnung:** Beim **Verriegeln oder Einschalten der Zündung** ertönt eine Reihe kurzer Hinweistöne, wenn ein Funk-Magnetkontakt offen erkannt wird. Die Anlage wird dennoch scharf; die übrigen gesicherten Öffnungen bleiben überwacht. Mit der Lautlos-Taste des Funk-Handsenders kann ohne diese akustische Rückmeldung scharfgeschaltet werden.

**Wiederaufnahme der Überwachung:** Das Schließen des zuvor offenen Fensters löst keinen Alarm aus. Wird es nach **mindestens 5 Sekunden** wieder geöffnet, löst es Alarm aus. Belegt in Rev. 1.3, PDF-S. 10, und Rev. 1.2, PDF-S. 9. Abweichende Vier-Sekunden-Angaben in Fahrzeug-/Installationsunterlagen nicht ohne Prüfung der Version gleichsetzen.

---

## Scharf-/Unscharfschalten — Signale

### Über Fahrzeugfunkschlüssel

**Abweichende Kurzfassungen:** WiPro III Rev. 1.6 und safe.lock Rev. 1.3, jeweils PDF-S. 1, nennen beim Originalschlüssel einen Blinkimpuls zum Schärfen und 2–3 zum Entschärfen. Die folgende Tabelle gibt dagegen die Bedienungsrevisionen 1.2/1.3 wieder. Das Blinkmuster ist damit nicht dokumentübergreifend einheitlich; es ist allein kein verlässlicher Defektnachweis.

| Aktion | Voraussetzung | Signal |
|--------|--------------|--------|
| Scharf (Taste „Verriegeln“) | Fahrzeugtüren **geschlossen** | fahrzeugabhängig 1–2× Blinker, 1× Signalton, Status-LED blinkt |
| Unscharf (Taste „Entriegeln“) | — | fahrzeugabhängig 1–2× Blinker, 2× Signaltöne, Status-LED aus |

> **WICHTIG:** Scharfschalten über den Fahrzeugfunkschlüssel ist **nur bei geschlossenen Fahrerhaustüren** möglich!

Beleg: Rev. 1.3, Kapitel 1.1/1.3, PDF-S. 8–9; Rev. 1.2, PDF-S. 7–8. Die Fahrzeugblinker sind nicht mit den internen Pieptönen gleichzusetzen.

### Über Funk-Handsender

| Aktion | Signal |
|--------|--------|
| Scharf (beliebige Taste) | 1× Blinker, je nach Taste 1× Signalton oder lautlos, Status-LED blinkt |
| Unscharf (beliebige Taste) | 2× Blinker, je nach Taste 2× Signaltöne oder lautlos, Status-LED aus |

Die Tabelle folgt den deutschen Kapiteln 1.2/1.4 (Rev. 1.3, PDF-S. 8–9). **Sprachwiderspruch:** Die französische safe.lock-Passage auf PDF-S. 46 nennt beim Scharfschalten mit der Lautsprecher-Taste 1–2 Blinkimpulse statt 1. Die normale WiPro-III-Passage ist übereinstimmend. Bei safe.lock keine Diagnose allein aus dieser abweichenden Blinkzahl ableiten.

### Besonderheit bei WiPro III safe.lock

Bei **WiPro III safe.lock** können zwei unterschiedliche Vorgänge gekoppelt sein: die Alarmanlage wird scharf oder unscharf geschaltet und die Zentralverriegelung wird verriegelt oder entriegelt. Die konkrete Logik ist fahrzeug- und softwareabhängig:

- **Original-Fahrzeugschlüssel:** schaltet bei unterstützten Fahrzeugprofilen die Alarmanlage und die Zentralverriegelung gemeinsam. CAN-überwachte Fahrzeugtüren müssen zum Scharfschalten geschlossen sein.
- **Funk-Handsender 868:** schaltet safe.lock scharf und verriegelt das Fahrzeug beziehungsweise schaltet die Anlage unscharf und entriegelt das Fahrzeug.
- **NFC Modul, THITRONIK® App und BT-connect:** nur verwenden, wenn die installierten Geräte, Softwarestände und das Fahrzeugprofil diese Bedienart unterstützen.
- **Replay-Schutz:** Ist DIP 5 aktiv, dient der Original-Fahrzeugfunkschlüssel nicht mehr zum Scharf- oder Unscharfschalten der WiPro. Die Türüberwachung über den CAN-Bus bleibt bestehen.

Die fahrzeugspezifischen Voraussetzungen und Einschränkungen stehen unter [[Fahrzeugkompatibilität]].

### Alarmspeicher

Nach einem Alarm blinkt die **Status-LED** als Alarmspeicher-Anzeige. Das zeigt an, dass ein Alarm stattgefunden hat.

**Akustische Anzeige:** Beim Unscharfschalten nach einem Alarm ertönen **ein langer und zwei kurze Signaltöne**. Dies weist auf einen gespeicherten Alarm hin.

Das Blinkmuster der Status-LED wiederholt sich mit einer **Pause von 5 Sekunden** und zeigt den Alarmgrund:

| Blinkmuster | Alarmgrund |
|-------------|-----------|
| **1×** | Kabinentüren (CAN-Bus) |
| **2×** | Funk-Magnetkontakt |
| **3×** | Funk-Gaswarner / G.A.S.-pro III / G.A.S.-pro III CO |
| **4×** | Funk-Kabelschleife |
| **5×** | G.A.S.-pro |
| **8×** | Panikalarm |
| **9×** | Störsender |
| **10×** | Pro-Finder (SMS „Alarm“) |
| **11×** | Eingang Innenbeleuchtung |

Den Blinkcode **vor erneuter Betätigung** ablesen. Nach der akustischen Alarmmeldung beim Unscharfschalten wird der Alarmspeicher beim **nächsten Scharfschalten gelöscht**. Beleg: Rev. 1.3, PDF-S. 17; Rev. 1.2, PDF-S. 16. Zehn Blinkimpulse der Status-LED mit Fünf-Sekunden-Pause bedeuten Pro-Finder/SMS-Alarm; dies ist nicht der schnelle Zehnfach-Warnton des Sprinter-Aussperrschutzes.

> **TIPP:** Pro-Finder-Besitzer erhalten den Alarmgrund zusätzlich als Klartext-SMS.

---

## Batterie-Warnsignal (Zubehör)

### Batteriewarnsignal: Signalton und rote Sender-LED

**Dauer nicht eindeutig:** Die FAQ WiPro III, PDF-S. 16, und safe.lock, PDF-S. 28, nennen bei einer Senderbatterie unter **2,6 V** einen **2 Sekunden** langen Ton und die rote Sender-LED für **30 Sekunden**. Die Kurzanleitungen WiPro III Rev. 1.6 und safe.lock Rev. 1.3 zeigen auf PDF-S. 2 dagegen ein **5-Sekunden-Signal**. Die Bedienungsanleitung beschreibt einen langen Ton ohne feste Dauer. Diese Quellenabweichung ist ungeklärt; weder zwei noch fünf Sekunden allein sind ein sicherer Fehlercode. Auslösezeitpunkt, betroffenen Sender und rote LED prüfen; nach dem Batteriewechsel ist kein erneutes Anlernen nötig.

Ein **langer, durchgehender Ton beim Betätigen eines Funksenders** weist auf eine schwache Senderbatterie hin. Nicht jeder kurze Bestätigungston ist eine Batteriewarnung. Sender einzeln auslösen; beim betroffenen Sender erlischt die rote Sende-LED erst nach **30 Sekunden**. Nach dem Batteriewechsel ist **kein erneutes Anlernen** nötig. Das unterscheidet sich von **einem langen und zwei kurzen Tönen beim Unscharfschalten**: Diese melden einen gespeicherten Alarm.

Handsender 868, klassischer Funk-Magnetkontakt 868 und Funk-Kabelschleife verwenden **CR2032**. Das **NFC Modul** verwendet dagegen **drei AAA-Alkaline-Batterien (LR03)**; nur diesen Typ einsetzen. Der Hersteller empfiehlt den jährlichen Wechsel, bei Winternutzung zusätzlich vor der kalten Jahreszeit. Bereits angelernte NFC-Tags bleiben gespeichert.

Beleg: Rev. 1.3, PDF-S. 11–12 und 17; Rev. 1.2, PDF-S. 10–11 und 16. Diese Angaben ersetzen keine gerätespezifische Anleitung anderer Zubehörvarianten.

---

## Unterbrechen eines Gasalarms oder Einbruchalarms mit Funk-Handsender und Fahrzeugschlüssel

Ein aktiver Alarm kann je nach Alarmart mit unterschiedlichen Bedienteilen beendet werden:

| Alarmart | Alarm beenden / Anlage unscharf schalten |
|----------|------------------------------------------|
| Einbruchalarm | Taste „Entriegeln“ des Fahrzeugfunkschlüssels oder eine beliebige Taste des Funk-Handsenders drücken; unterstützte NFC-/App-Bedienung kann ebenfalls unscharf schalten |
| Gasalarm, Original-Fahrzeugschlüssel | „Entriegeln“ drücken. Wurde der Gasalarm bei **unscharfer** Anlage ausgelöst, zunächst scharf schalten, dann mit „Entriegeln“ unterbrechen (Kap. 1.10.2) |
| Gasalarm, Funk-Handsender | Beliebige Taste drücken; safe.lock entriegelt zusätzlich. Für diese Bedienart schreibt Kap. 1.10.4 kein vorheriges Scharfschalten vor |
| Panikalarm | Beliebige Taste am Funk-Handsender drücken |

> **WICHTIG:** Je nach Fahrzeug müssen zuvor geöffnete, über den CAN-Bus überwachte Türen geschlossen werden. Das Beenden des akustischen Alarms ersetzt nicht die Ursachenprüfung. Nach einem Gas- oder Einbruchalarm immer Alarmspeicher, offene Kontakte und Sensorzustände kontrollieren.

---

Beleg: Rev. 1.3, PDF-S. 14–15. In der französischen Fassung heißt Kapitel 1.10.2 irrtümlich Einbruchalarm; die Zuordnung zum Gasalarm ist durch das deutsche Kapitel belegt.

## Zubehör / Erweiterungen

| Zubehör | Art.-Nr. | Zweck |
|---------|----------|-------|
| Weitere Funk-Magnetkontakte (schwarz) | 100757 | Stauklappen, Dachluken, Dachboxen |
| Weitere Funk-Magnetkontakte (weiß) | 100758 | Fenster, helle Oberflächen |
| Funk-Handsender | 101064 | Zusätzliche Fernbedienung |
| Funk-Kabelschleife | 100761 | Fahrräder, Campingmöbel, Motorroller |
| Funk-Kabelschleife XL | 101074 | Größere Außenobjekte |
| G.A.S.-pro III / G.A.S.-connect | — | Gaswarnung im Verbund |
| Pro-Finder | 100699 | SMS-Alarm + GPS-Ortung |
| BT-connect | 106000 | Bluetooth-Steuerung über die THITRONIK® App |
| NFC Modul | 105299 | Bedienung mit KeyCard, KeyTag oder KeyStrap |
| Back-up Sirene | 100089 | Zusätzlicher Alarmgeber, insbesondere wenn die Fahrzeughupe nicht angesteuert werden kann |
| Funk-Rauchmelder T.S.A. (weiß / grau) | 105753 / 105754 | Brandfrüherkennung |
| Diodenverteiler | 100455 | Aufteilung auf vier getrennt angesteuerte Blinkleuchten bei Sprinter/Crafter |
| Montageadapter (schwarz) | 100428 | Für Klappen mit großem Spaltmaß |
| Montageadapter (weiß) | 100729 | Für Klappen mit großem Spaltmaß |

---

## Versionshistorie WiPro III safe.lock (1050-xxx)

### Ducato 8 und Infotainment: Softwaregrenzen 1050-016 und 1050-042

**Quellenwiderspruch, ungeklärt:** Die undatierte [safe.lock-FAQ](../../quellen/wipro-iii-safelock-faq.pdf), PDF-S. 2–3, nennt für **1050-042 / Ducato 8–9 mit großem Infotainment 7.5.1s** und für **1050-016 / Ducato 8 7.2s**. Der bisherige Wiki-Versionsverlauf nennt **7.5.2s** beziehungsweise **7.1s**. Die dort referenzierten CSV-Originale sind im lokalen Quellenordner nicht vorhanden; die Bezeichnung „freigegeben“ im Wiki löst diesen Primärquellenkonflikt nicht. Vor einer Kompatibilitätszusage Seriennummer, tatsächliche Software und Fahrzeugausstattung durch **THITRONIK** bestätigen lassen. Keine der abweichenden Softwareangaben ist durch diesen Abgleich verbindlich als Mindeststand freigegeben.

### Versionsverlauf der 1050-Serie

Wichtige Meilensteine der Fiat-Ducato-Variante; die Baureihen 5298, 5458 und 5832 werden separat geführt:

| Ab SN | SW-Version | Datum | Wichtige Änderung |
|-------|-----------|-------|-------------------|
| 1050-001 | 6.3s | 07/2017 | Erste nummerierte Serie; Funktion von DIP 6 geändert |
| 1050-004 | 6.7s | 09/2018 | App-Kompatibilität; Zentralverriegelungsfunktionen und Easy-Add 3.0 |
| 1050-006 | 6.7s | 04/2019 | Dokumentierte Empfängermodul-/Kondensator-Auffälligkeit; bei Reichweitenproblemen Supportprüfung empfohlen |
| 1050-016 | 7.1s im bisherigen Versionsverlauf; FAQ: 7.2s, ungeklärt | 10/2021 | Ducato 8 (2022) Unterstützung |
| 1050-025 | 7.3.0s | 03/2022 | Alphatronics ONE Kompatibilität |
| 1050-038 | 7.5.0s | 01/2024 | Dokumentierte Reichweiten-Auffälligkeit einzelner Funk-Handsender; Supportprüfung empfohlen |
| 1050-042 | 7.5.2s im bisherigen Versionsverlauf; FAQ: 7.5.1s, ungeklärt | 06/2024 | Mindeststand für Ducato 8 mit großem Touch-Infotainment-System |
| 1050-046 | 7.5.3s | 10/2024 | Unterstützung für Fiat Ducato Facelift ab 2024 |
| 1050-051 | 7.5.3s | 01/2025 | E1-Zulassungszeichen wieder auf Gehäuse |

> Ford-Transit-Set: SN 5298-xxx; Sprinter-/Crafter-Set: SN 5458-xxx; Renault-Master-Set: SN 5832-xxx. Die zugehörigen Versionsstände sind unter [[Fahrzeugkompatibilität]] dokumentiert.

---

## Entsorgung und Konformität

- Elektronik, Funk-Zubehör und Batterien nicht über den Hausmüll entsorgen.
- Knopfzellen und andere Batterien getrennt sammeln und entsprechend der lokalen Vorgaben abgeben.
- THITRONIK erklärt für WiPro III safe.lock die Übereinstimmung mit den Anforderungen der Richtlinie **2014/53/EU**. Maßgeblich ist die Konformitätserklärung des konkreten Produkts.
- Maßgeblich bleiben die dem Produkt beiliegenden Konformitäts- und Entsorgungshinweise des jeweiligen Geräts.

---

## Problembehandlung

| Problem | Mögliche Ursache | Lösung |
|---------|-----------------|--------|
| WiPro reagiert nicht auf den Fahrzeugfunkschlüssel, Zentralverriegelung funktioniert | Fahrzeugprofil nicht unterstützt / falsche DIP-Schalterstellung / CAN-High und CAN-Low vertauscht | DIP-Einstellungen und CAN-Anschluss prüfen; [[Fahrzeugkompatibilität]] |
| Status-LED zeigt **11× Blinken** | Innenbeleuchtungseingang meldet unerwartet oder falsche Zentrale / falscher Kabelbaum für Fahrzeugtyp verbaut | Innenlichtsignal, Seriennummer, Fahrzeugprofil und Kabelbaum prüfen |
| Offener Magnetkontakt wird gemeldet, obwohl alle geschlossen sind | WiPro wurde von der Betriebsspannung getrennt | Alle Kontakte mehrmals öffnen und schließen |
| Kontakt wird trotz geringer Entfernung nicht empfangen | Nicht angelernt / Abschirmung durch Metall | Anlernen prüfen; Lage der Zentrale/Antenne ändern |
| Heckgaragenklappe wird unzuverlässig überwacht | Sender auf Metall montiert | Montageadapter Art.-Nr. 100428 verwenden |

---

## Häufige Fragen (FAQ)

### Welche Zulassung hat die WiPro III?
Die Produkt-FAQ nennt für WiPro III und WiPro III safe.lock eine Zulassung nach **ECE-Regelung R10**. Für WiPro III safe.lock erklärt THITRONIK außerdem die Übereinstimmung mit der Funkanlagenrichtlinie **2014/53/EU**. Maßgeblich sind stets das Kennzeichen am konkreten Gerät und die zugehörige Konformitätserklärung.

### Warum hat die WiPro III keine Bewegungsmelder?
Bewegungsmelder können in Freizeitfahrzeugen unter anderem auf flatternde Gardinen, Erschütterungen, Insekten oder Bewegungen von Personen und Haustieren reagieren. THITRONIK setzt deshalb auf die Überwachung definierter Öffnungen. Die Anlage muss beim Aufenthalt im Fahrzeug nicht wegen eines Innenraum-Bewegungsmelders teilweise abgeschaltet werden. Eine vollständig fehlalarmfreie Alarmanlage kann daraus jedoch nicht abgeleitet werden.

### Kann ich die WiPro III selbst einbauen?
Der Einbau setzt ausreichende Kenntnisse der Fahrzeugelektrik, passendes Werkzeug und die Beachtung der Herstellervorgaben voraus. Besonders der Anschluss an CAN-Bus, Zentralverriegelung, Hupe und Warnblinker ist fahrzeugspezifisch. Ein fehlerhafter Anschluss kann Gerät und Fahrzeug beschädigen. Bei fehlender Fachqualifikation muss der Einbau durch einen geschulten Fachbetrieb erfolgen.

### Was ist ein CAN-Bus — greift THITRONIK in den CAN-Bus ein?
Der CAN-Bus verbindet elektronische Steuergeräte über eine zweiadrige Kommunikationsleitung. WiPro wertet daraus unter anderem Zustände fahrzeugeigener Türen und der Funkfernbedienung aus. Für diese Überwachung liest die Anlage die Informationen passiv und sendet keine steuernden CAN-Botschaften. Das ersetzt nicht den fachgerechten Anschluss: Vertauschte oder fehlerhaft angeschlossene Leitungen können zu Fehlfunktionen oder Schäden führen.

### Kann ich meine Zentrale auf safe.lock upgraden?

**Hardwareupgrade: zwei oder drei Leitungen?** Die Zusatzanleitung safe.lock-Upgrade Rev. 2.0 beschreibt drei Leitungen am 20-poligen WiPro-Stecker: Pin 20 blau, Pin 19 blau/schwarz, Pin 16 weiß/schwarz. Ist Pin 16 bereits belegt, parallel abgreifen. Das Serviceformular 2024 nennt dagegen nur zwei neue Leitungen. Keine Ader eigenmächtig weglassen; tatsächlichen Kabelsatz mit der Fahrzeugunterlage abgleichen. Es handelt sich um eine Hardwareergänzung und nicht allein um ein Softwareupdate. Wegen gelöschten Speichers Funkzubehör anschließend neu anlernen.

Belege: [Upgrade Rev. 2.0, PDF 2](../../quellen/fahrzeug-safelock-upgrade.pdf#page=2), [Serviceformular 2024, PDF 1](../../quellen/fahrzeug-update-service-2024.pdf#page=1).

Die Produkt-FAQ bezeichnet alle WiPro III-Zentralen als für ein Upgrade geeignet. Wegen der unterschiedlichen fahrzeugspezifischen Sets sollte THITRONIK vor dem Ausbau bestätigen, welche safe.lock-Lösung und welcher Kabelsatz für das Fahrzeug benötigt werden. Der dokumentierte Ablauf umfasst:

1. WiPro III-Zentrale ausbauen lassen.
2. Aktuelles Upgrade-Formular ausfüllen und zusammen mit der WiPro III-Zentrale einsenden; kein weiteres Zubehör und keine Fahrzeugschlüssel beilegen.
3. Nach dem Upgrade die WiPro III-Zentrale wieder einbauen und die Leitungen zur Zentralverriegelung anschließen.
4. Funk-Zubehör neu anlernen und vollständige Ein- und Ausgangstests durchführen.
5. In der THITRONIK® App das zum aktualisierten Gerät passende Seriennummernprofil verwenden.

### Was tun bei Fehlalarmen?
Der **Alarmspeicher** der WiPro III zeigt nach dem Unscharfschalten über einen Blinkcode der Status-LED, was den Alarm ausgelöst hat. Die Blinkcodes stehen im Abschnitt „Alarmspeicher“. Bei angeschlossenem und konfiguriertem Pro-Finder wird der Alarmgrund zusätzlich als Klartext-SMS übermittelt.

### Welche Seriennummer soll ich in der THITRONIK® App eingeben?
Wenn die genauen Seriennummern nicht bekannt sind, nennt die Produkt-FAQ folgende Referenzwerte für die Geräteauswahl in der App:

| Gerät | Standard-Seriennummer |
|-------|-----------------------|
| WiPro III | 0823-018 |
| WiPro III safe.lock | 1050-003 |
| Pro-Finder | 0699-012 |

Für die Funktionen „Zentralverriegelung ver-/entriegeln“ und „Easy-Add 3.0“ nennt die FAQ folgende Mindeststände:

| Gerät | Min.-Seriennummer |
|-------|-------------------|
| WiPro III safe.lock | 1050-004 / 5298-001 / 5458-001 |
| Pro-Finder | 0699-013 |

> **WICHTIG:** Die Eingabe eines Referenzwerts in der App aktualisiert weder Hardware noch Software. Funktionen dürfen nur verwendet werden, wenn der tatsächliche Geräte- und Softwarestand sie unterstützt.

---

## safe.lock — Häufige Fragen

Die undatierte safe.lock-FAQ, PDF-S. 23–24, nennt für Iveco im Replay-Kontext zusätzlich **ab 2011**; daneben stehen pauschale 2006–2018-Angaben und unterschiedliche 2018/2019-Grenzen der Schlüsselumrüstung. Das ist keine Freigabe für jede Schlüsselvariante. Fahrzeug, Modelljahr und Schlüssel vor einer Umrüstung einzeln prüfen.

### Was ist der THITRONIK® Campingmodus?
Bei bestimmten Fahrzeugen, beispielsweise Mercedes Sprinter ab 2018, Ford Transit ab 2024 sowie Ford Transit/Tourneo Custom ab 2023, kann der Originalschlüssel sicher verwahrt und das Fahrzeug mit unterstütztem **THITRONIK® Zubehör** ver- und entriegelt werden. Dazu zählen je nach Ausstattung THITRONIK® App, Funk-Handsender 868, KeyCard, KeyTag und KeyStrap. Wird das Fahrzeug mit dem **Originalschlüssel** verriegelt, kann die spätere Entriegelung mit THITRONIK® Zubehör blockiert sein. Nach dem Verriegeln mit THITRONIK® Zubehör bleibt die Entriegelung mit dem Originalschlüssel möglich.

**Aussperrschutz im Campingmodus (Warnton):** Aus Sicherheitsgründen werden Verriegeln und Scharfschalten in den folgenden Fällen **nicht** ausgeführt. Stattdessen ertönt ein Warnton und die Warnblinker blinken im gleichen Rhythmus:

- Verriegeln mit dem Originalschlüssel und anschließendes Öffnen einer Tür von innen.
- Automatische Wiederverriegelung nach dem Entriegeln mit dem Originalschlüssel und anschließendes Öffnen einer Tür von innen.

### Was ist eine Replay-Attacke und welche Fahrzeuge sind betroffen?
Bei einer Replay-Attacke wird ein zuvor aufgezeichnetes Entriegelungssignal der originalen Fahrzeugfernbedienung erneut gesendet. Erkennt das Fahrzeug dieses Signal als gültig, kann es entriegeln; eine Alarmanlage, die das gleiche Signal zum Unscharfschalten auswertet, würde dann ebenfalls unscharf. Die Produkt-FAQ nennt als betroffene Baureihen **Fiat Ducato, Peugeot Boxer und Citroën Jumper der Baujahre 2006–2018; Iveco Daily mit gesondert zu prüfender Jahresgrenze**. Ab Modelljahr 2019 beschreibt die FAQ einen Originalschlüssel mit Rolling Code, also einem wechselnden Funkcode, erkennbar an einer schwarzen Kunststofföse. Modelljahr, Schlüsselvariante und Fahrzeugkompatibilität müssen dennoch einzeln geprüft werden.

### Funktioniert der Originalschlüssel nach dem Einbau noch?
Ohne Umrüstplatine bleibt die originale Zentralverriegelung grundsätzlich funktionsfähig. In der für den Replay-Schutz vorgesehenen Konfiguration wertet WiPro III safe.lock das Funksignal des Originalschlüssels jedoch nicht zum Unscharfschalten aus. Entriegeln und Unscharfschalten sind damit getrennte Vorgänge.

### Für welche Fahrzeuge ist die safe.lock Umrüstplatine gedacht?
Die Umrüstplatine (Art. 101052) ist laut Produkt-FAQ für **Fiat Ducato, Peugeot Boxer und Citroën Jumper der Baujahre 2006–2018; Iveco Daily mit gesondert zu prüfender Jahresgrenze** vorgesehen. Bei neueren safe.lock-kompatiblen Fahrzeugen kann eine andere Lösung ohne Schlüsselumrüstung eingesetzt werden. Für das Übergangsjahr 2018 sind Modelljahr und Schlüsselvariante vor der Auswahl ausdrücklich zu prüfen.

### Wann ist bei neueren Fahrzeugen keine Umrüstplatine mehr nötig?
Bei Fahrzeugen mit **Rolling-Code-Schlüssel** ist die klassische Umrüstplatine in der Regel nicht erforderlich. Dort wird safe.lock über die passende fahrzeugspezifische WiPro III-Zentrale beziehungsweise das entsprechende Set umgesetzt. Entscheidend sind Fahrzeug, Baujahr, Schlüsselvariante, Seriennummer und Softwarestand.

> Fahrzeugspezifische Besonderheiten (Ford Transit 2019+, VW Crafter/MAN TGE, Mercedes Sprinter, VW T6.1) → [[Fahrzeugkompatibilität]]

---

## Support

- Tel: +49 (0)4351 76744-112
- Support und Downloads: `www.thitronik.de/support`

---

## Querverweise

- [[Systemüberblick]]
- [[Fahrzeugkompatibilität]]
- [[Funk-Magnetkontakt]]
- [[Funk-Kabelschleife]]
- [[Funk-Handsender]]
- [[Pro-Finder]]
- [[BT-connect]]
- [[NFC-Modul]]
- [[Funk-Rauchmelder]]
- [[GAS-connect]]
- [[Sirenen und Hupen]]
- [[safe.lock Umrüstplatine]]

## Quellenstand der Bedienungsprüfung

Bedienung DE/FR am 28.09.2026 visuell gegen [Rev. 1.3, 06/2025](../../quellen/wipro-iii-safelock-bedienung-rev1.3.pdf) und [Rev. 1.2, 11/2024](../../quellen/wipro-iii-safelock-bedienung-rev1.2.pdf) geprüft. Ergänzender Abgleich: [Installation Rev. 1.8](../../quellen/wipro-iii-installation-rev1.8.pdf), [FAQ WiPro III](../../quellen/wipro-iii-faq.pdf), [FAQ safe.lock](../../quellen/wipro-iii-safelock-faq.pdf), [Kurzfassung WiPro III Rev. 1.6](../../quellen/wipro-iii-kurzanleitung-rev1.6.pdf) und [Kurzfassung safe.lock Rev. 1.3](../../quellen/wipro-iii-safelock-kurzanleitung-rev1.3.pdf). Alle Seitenangaben sind physische PDF-Seiten. Die FAQ haben keinen sichtbaren Revisionsstand; die französischen FAQ-Abschnitte sind geprüfte Übertragungen dieser deutschen Quellen. Konflikte und Fahrzeugausnahmen: docs/quellenpruefung/2026-09-28-wipro-installation-faq.md. Keine pauschale Freigabe aller Einbaupläne oder Fahrzeugvarianten.
