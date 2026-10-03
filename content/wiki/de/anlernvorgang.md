---
title: Anlernvorgang — Funk-Zubehör an WiPro III anlernen
sources:
  - "content/quellen/wipro-iii-installation-rev1.8.pdf"
  - "content/quellen/wipro-iii-faq.pdf"
  - "content/quellen/wipro-iii-safelock-faq.pdf"
  - "content/quellen/wipro-iii-kurzanleitung-rev1.6.pdf"
  - "content/quellen/wipro-iii-safelock-kurzanleitung-rev1.3.pdf"
  - "content/quellen/wipro-iii-safelock-bedienung-rev1.3.pdf"
  - "content/quellen/wipro-iii-safelock-bedienung-rev1.2.pdf"
  - "sources/Funk-Magnetkontakt_868__100757__Overview_DE.md"
  - "sources/Funk-Kabelschleife_868__100761__Overview_DE.md"
  - "sources/TSA_Funk-Rauchmelder__105753__Overview_DE.md"
  - "content/quellen/funk-tsa-rauchmelder-rev1.1.pdf"
  - "sources/GAS_Familie_DE_RAG_Pack/GAS-connect__105750__Overview_DE.md"
  - "content/quellen/gas-connect-anleitung-rev1.0.pdf"
  - "sources/Thitronik_FAQ_DE_RAG_Pack/FAQ_WiPro-III_DE.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/30_2_2_1_easy_add_1_0.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/31_2_2_2_zubehoer_loeschen.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/32_2_2_3_easy_add_2_0_can.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/33_2_2_4_easy_add_3_0_app.md"
  - "sources/NFC-Modul_105299__HowTo__Inbetriebnahme_Anlernen_DE.md"
  - "sources/Funk Zubehör.docx"
updated: '2026-09-28'
confidence: medium
lang: de
dealerStatus: approved
---

# Anlernvorgang — Funk-Zubehör an WiPro III anlernen

> **WICHTIG:** Im Auslieferungszustand sind keine Funk-Komponenten gespeichert. Nicht angelernte Funk-Komponenten werden von der WiPro III nicht ausgewertet und können keinen Alarm auslösen.

Jeder Funk-Sender muss einzeln an der WiPro III-Zentrale angelernt werden. Das **Anlernen** von WiPro-Zubehör ist vom Bluetooth-**Koppeln** zu unterscheiden.

---

## Anlernmodus starten

### Methode 1 — Taster an der WiPro III-Zentrale

Diese Methode ist der Standardweg, wenn die WiPro III-Zentrale zugänglich ist.

1. Den 20-poligen Stecker der WiPro III-Zentrale einstecken.
2. Den Taster **„B“** an der Gehäusevorderseite gedrückt halten, bis ein langer Signalton ertönt.
3. Die Status-LED leuchtet dauerhaft: Der Anlernmodus ist aktiv.
4. Die gewünschten Komponenten wie im Abschnitt „Zubehör auslösen und speichern“ auslösen.
5. Zum Beenden den Taster **„B“** kurz drücken. Ein Doppelton ertönt und die Status-LED erlischt.

### Methode 2 — Easy-Add 1.0 mit Funk-Handsender

FAQ WiPro III, PDF-S. 1 / safe.lock, PDF-S. 30: vor diesem Einstieg **ca. 10 Sekunden stromlos**; das **30-Sekunden-Fenster** beginnt erst nach Wiederherstellung. Die Bedienungsrevisionen 1.2/1.3 legen keine feste Strompausen-Dauer fest.

Diese Methode setzt einen bereits angelernten Funk-Handsender 868 voraus und ermöglicht das Nachlernen ohne direkten Zugriff auf die WiPro III-Zentrale.

1. Alle überwachten Öffnungen des Fahrzeugs schließen.
2. Die Spannungsversorgung der WiPro III-Zentrale unterbrechen, beispielsweise über Sicherung oder Stecker.
3. Die Spannungsversorgung wiederherstellen.
4. Innerhalb von **30 Sekunden** die Lautsprechertaste des bereits angelernten Handsenders **5×** drücken.
5. Die WiPro wechselt mehrfach den Zustand; anschließend leuchtet die Status-LED dauerhaft rot. Der Anlernmodus ist aktiv.
6. Die gewünschten Komponenten auslösen und nach jeder Komponente die Bestätigung abwarten.
7. Zum Beenden die Spannungsversorgung erneut unterbrechen und wiederherstellen.

### Methode 3 — Easy-Add 2.0 über CAN-Bus

FAQ WiPro III, PDF-S. 1 / safe.lock, PDF-S. 30: vor diesem Einstieg **ca. 10 Sekunden stromlos**; das **30-Sekunden-Fenster** beginnt erst nach Wiederherstellung. Die Bedienungsrevisionen 1.2/1.3 legen keine feste Strompausen-Dauer fest.

Diese Methode setzt eine aktive, kompatible CAN-Bus-Anbindung voraus.

1. Die Spannungsversorgung der WiPro III-Zentrale unterbrechen und wiederherstellen.
2. Innerhalb von **30 Sekunden** die Fahrertür **5× öffnen und schließen**.
3. Die WiPro wechselt mehrfach den Zustand; anschließend leuchtet die Status-LED dauerhaft rot. Der Anlernmodus ist aktiv.
4. Die gewünschten Komponenten auslösen und nach jeder Komponente die Bestätigung abwarten.
5. Zum Beenden die Spannungsversorgung erneut unterbrechen und wiederherstellen.

> **WICHTIG:** Über Easy-Add 2.0 beziehungsweise die CAN-Bus-Methode können Komponenten nur angelernt, aber nicht gelöscht werden.

### Methode 4 — Easy-Add 3.0 über die THITRONIK® App

Bei kompatiblem Softwarestand kann der Anlernmodus über die THITRONIK® App gestartet werden, ohne die Spannungsversorgung zu unterbrechen. Voraussetzung ist ein geeigneter [[Pro-Finder — GSM/GPS Telemetriemodul|Pro-Finder]] oder ein [[Bluetooth-Vernetzungsmodul — Smartphone-Steuerung via Bluetooth|Bluetooth-Vernetzungsmodul]].

1. In der THITRONIK® App die Anlernfunktion für das Fahrzeug starten.
2. Die gewünschte Komponente auslösen.
3. Die akustische Bestätigung der WiPro III-Zentrale abwarten.
4. Den Anlernmodus anschließend über die App beenden.

Die Verfügbarkeit und die angezeigten Bedienschritte hängen von den verbauten Geräten und deren Softwareständen ab.

---

Quellen Easy-Add 1.0/2.0/3.0: Rev. 1.3, PDF-S. 18–19; Rev. 1.2, PDF-S. 17–18. Die Bedienungskapitel schreiben Spannungsunterbrechung und Wiederherstellung vor, ohne feste Unterbrechungsdauer. **Ergänzung der FAQ:** WiPro III, PDF-S. 1, und safe.lock, PDF-S. 30, nennen für Handsender- und CAN-Einstieg **ca. 10 Sekunden stromlos**. Danach innerhalb von **30 Sekunden** fünf Lautsprecher-Tastendrücke oder fünf Türzyklen ausführen. Zehn Sekunden betreffen die Strompause, dreißig Sekunden das folgende Eingabefenster; beides nicht verwechseln. Die FAQ bezeichnet beide Wege zusammen als Easy-Add 2.0, die Bedienungsanleitung trennt Handsender 1.0 und CAN 2.0.

## Unterschiede der Verfahren

| Verfahren | Auslöser | Voraussetzung | Löschen über dieses Verfahren |
|-----------|----------|---------------|-------------------------------|
| Taster „B“ | Taster an der WiPro III-Zentrale | Direkter Zugang zur Zentrale | Gesamtspeicher kann mit gesondertem Ablauf gelöscht werden |
| Easy-Add 1.0 | Lautsprechertaste **5×** | Bereits angelernter Funk-Handsender 868 | Teilweises Löschen mit gesondertem Tastenablauf; nur der Master-Handsender bleibt erhalten |
| Easy-Add 2.0 | Fahrertür **5×** öffnen und schließen | Kompatible CAN-Bus-Anbindung | **Nein** |
| Easy-Add 3.0 | THITRONIK® App | Pro-Finder oder Bluetooth-Vernetzungsmodul; kompatible Software | Kein Ersatz für Teil- oder Gesamtlöschung |

---

## Zubehör auslösen und speichern

| Komponente | Auslösen im Anlernmodus |
|------------|-------------------------|
| **Funk-Magnetkontakt 868** | Sender und Magnet voneinander trennen, bis die Sende-LED kurz aufleuchtet |
| **Funk-Handsender 868** | Eine Taste am Handsender drücken |
| **Funk-Kabelschleife 868** | Elektronikeinheit aus der Halterung nehmen |
| **G.A.S.-connect** | Gerät einschalten |
| **T.S.A. Funk-Rauchmelder** | Gehäusedeckel durch Drehen lösen und die Taste im Inneren drücken |
| **NFC Modul** | Batteriesicherung entfernen und die mitgelieferte KeyCard an das Modul halten; nicht als erste Komponente anlernen |

Nach jedem erfolgreichen Speichervorgang ertönt ein kurzer Signalton aus der WiPro III-Zentrale und die Status-LED erlischt kurz.

> **Reihenfolge beim NFC Modul:** Das NFC Modul darf nicht als erste Komponente angelernt werden. Andernfalls kann es als Master-Funk-Handsender erkannt werden.

---

## Speichergrenze

Die WiPro III kann höchstens **100 Sender** speichern. Funk-Magnetkontakte, Funk-Handsender, Funk-Kabelschleifen und weitere Funk-Komponenten teilen sich diesen Speicher.

---

## Funk-Komponenten löschen

### Teilweises Löschen — Master-Handsender bleibt erhalten

Dieser Ablauf löscht sämtliche angelernten Funk-Komponenten außer dem zuerst angelernten Funk-Handsender. Dieser bleibt als **Master-Handsender** gespeichert.

1. Alle überwachten Öffnungen des Fahrzeugs schließen.
2. Die Spannungsversorgung der WiPro III-Zentrale unterbrechen und wiederherstellen.
3. Innerhalb von **30 Sekunden** die Taste **„Durchgestrichener Lautsprecher“** des Master-Handsenders **5×** drücken.
4. Die WiPro wechselt mehrfach den Zustand und bestätigt das Löschen mit einem langen Signalton.
5. Die Anlage befindet sich anschließend im Anlernmodus. Neue Komponenten können unmittelbar angelernt werden.
6. Zum Beenden die Spannungsversorgung erneut unterbrechen und wiederherstellen.

> Danach müssen alle gelöschten Komponenten neu angelernt werden. Auch weitere Funk-Handsender werden gelöscht; nur der Master-Handsender bleibt gespeichert.

### Vollständiges Löschen — Gesamtspeicher

Die Installationsanleitung Rev. 1.8, PDF-S. 6, beschreibt nur dieses vollständige Löschen und bezeichnet Einzellöschung als unmöglich. Daraus folgt nicht, dass die in den Bedienungsrevisionen 1.2/1.3 dokumentierte **Teillöschung mit erhaltenem Master-Handsender** unmöglich wäre. Die Verfahren nicht vermischen: **Taster B beim Einstecken gehalten löscht auch den Master**.

Dieser Ablauf löscht **alle** angelernten Sender einschließlich des Master-Handsenders.

1. Den 20-poligen weißen Stecker von der WiPro III-Zentrale abziehen.
2. Den Taster **„B“** gedrückt halten.
3. Den 20-poligen Stecker wieder einstecken und den Taster weiter gedrückt halten, bis ein langer Signalton ertönt.
4. Der gesamte Senderspeicher ist nun gelöscht.

> **ACHTUNG:** Nach dem Gesamtlöschen zuerst einen Funk-Handsender 868 anlernen. Dieser wird zum neuen Master-Handsender. Anschließend alle weiteren Komponenten neu anlernen; das NFC Modul darf nicht zuerst angelernt werden.

---

## Anlernen und Reichweite vor der Montage prüfen

**Redaktioneller Fehler der Quelle:** Rev. 1.8, PDF-S. 8, nennt zum Verlassen des Diagnosemodus „Taster A“. In der Geräteabbildung auf PDF-S. 7 ist **B der Taster, A der Anschlussstecker**; derselbe Widerspruch steht in FR, PDF-S. 43–44. Keine Bedienhandlung am Anschlussstecker aus der falschen Buchstabenangabe ableiten.

Funk-Zubehör möglichst vor der endgültigen Montage anlernen und am vorgesehenen Einbauort testen.

1. Die bereits angelernte Komponente provisorisch am geplanten Montageort positionieren.
2. Den Diagnosemodus der WiPro III-Zentrale durch kurzes Drücken des Tasters „B“ starten; die Status-LED blinkt.
3. Die Komponente auslösen. Die WiPro III-Zentrale muss den empfangenen Sendevorgang mit einem akustischen Signal bestätigen.
4. Erfolgt keine Bestätigung, den Montageort verändern und auf Abschirmung durch Metallteile prüfen.
5. Nach der endgültigen Montage mit jeder Komponente einen vollständigen Testalarm durchführen.

---

## Batteriehinweise für Funk-Zubehör

### Austauschbare CR2032-Knopfzellen

Funk-Handsender 868, Funk-Magnetkontakt 868 und Funk-Kabelschleife 868 verwenden eine **CR2032-Knopfzelle mit 3 V**. Die typische Lebensdauer beträgt etwa **zwei Jahre**.

- Panasonic oder Varta werden empfohlen.
- Duracell, No-Name- und Billigbatterien werden wegen möglicher Spannungs- oder Lebensdauerprobleme nicht empfohlen.
- Beim Wechsel die Knopfzelle nicht mit bloßen Fingern berühren, auf richtige Polung achten und verbrauchte Batterien vorschriftsgemäß entsorgen.
- Nach einem Batteriewechsel ist kein erneutes Anlernen erforderlich.

### Batteriewarnungen

**Dauer nicht eindeutig:** Die FAQ WiPro III, PDF-S. 16, und safe.lock, PDF-S. 28, nennen bei einer Senderbatterie unter **2,6 V** einen **2 Sekunden** langen Ton und die rote Sender-LED für **30 Sekunden**. Die Kurzanleitungen WiPro III Rev. 1.6 und safe.lock Rev. 1.3 zeigen auf PDF-S. 2 dagegen ein **5-Sekunden-Signal**. Die Bedienungsanleitung beschreibt einen langen Ton ohne feste Dauer. Diese Quellenabweichung ist ungeklärt; weder zwei noch fünf Sekunden allein sind ein sicherer Fehlercode. Auslösezeitpunkt, betroffenen Sender und rote LED prüfen; nach dem Batteriewechsel ist kein erneutes Anlernen nötig.

Je nach Sendergeneration werden unterschiedliche Warnstufen angezeigt:

| Anzeige | Bedeutung | Maßnahme |
|---------|-----------|----------|
| Gelbe Anzeige für etwa **5 Sekunden** | Batterie wird schwach | Innerhalb von **2–6 Wochen** wechseln |
| Langer Signalton bei Senderbetätigung und rote Sende-LED für etwa **30 Sekunden**; Tonlänge laut Quellen unterschiedlich | Batterie kritisch | Batterie sofort wechseln |

Meldet eine Komponente eine schwache Batterie, sind gleich alte Knopfzellen häufig ebenfalls bald verbraucht. Ein gemeinsamer Austausch ist daher sinnvoll.

### Abweichende Versorgungsarten

- **G.A.S.-connect** wird mit **12 V oder 24 V** aus dem Fahrzeug versorgt und verwendet keine CR2032-Knopfzelle.
- Der **T.S.A. Funk-Rauchmelder** besitzt eine fest eingebaute **3-V-Lithium-Langzeitbatterie CR123A** mit einer Lebensdauer von bis zu **zehn Jahren**. Die Batterie kann nicht gewechselt werden; sobald die Batteriewarnung mehr als viermal ausgegeben wurde, muss der Rauchmelder ersetzt werden.

---

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[Funk-Magnetkontakt 868 — Montage und Betrieb|Funk-Magnetkontakt 868]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]
- [[Funk-Kabelschleife 868 — Außensicherung für mobile Güter|Funk-Kabelschleife 868]]
- [[T.S.A. — Funk-Rauchmelder für WiPro III|T.S.A. Funk-Rauchmelder]]
- [[G.A.S.-connect — Funk-Gaswarner für WiPro III|G.A.S.-connect]]
- [[NFC Modul — Steuerung der WiPro via NFC|NFC Modul]]
- [[Systemüberblick — THITRONIK-Produktwelt|Systemüberblick]]

## Quellenhinweis zum Abschluss der Teillöschung

Rev. 1.3, Kapitel 2.2.2, PDF-S. 18, beschreibt nach dem Löschton den Anlernmodus und als letzten Schritt einen erneuten Spannungswechsel. Der Schlusssatz bezeichnet die Anlage trotzdem als im Anlernmodus. Derselbe Widerspruch steht in Rev. 1.2, PDF-S. 17, und in FR (Rev. 1.3, PDF-S. 56). Den Anlernmodus nach dem Abschluss anhand der Status-LED prüfen; bei dauerhaft leuchtender LED den Zustand durch THITRONIK klären lassen. Der Master-Handsender bleibt bei dieser Teillöschung erhalten. Das ist nicht die vollständige Löschung über den Zentralentaster.
