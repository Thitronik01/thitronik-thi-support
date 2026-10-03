---
title: 'Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis'
sources:
  - "content/quellen/profinder-ab045-handbuch-rev1.3.pdf"
  - "content/quellen/profinder-ab045-kurz-rev1.3.2.pdf"
  - "content/quellen/profinder-handbuch-rev2.6.pdf"
  - "content/quellen/profinder-faq.pdf"
  - "sources/Stromverbrauch.docx"
  - "content/wiki/de/wipro-iii.md"
  - "content/wiki/de/pro-finder.md"
updated: '2026-09-28'
confidence: high
lang: de
dealerStatus: approved
---

# Stromversorgung & Standzeiten — Ruhestrom, Unterspannung und Ladepraxis

Querschnittsseite für Supportfälle rund um **leere Starterbatterien**, **längere Standzeiten** und das Unterspannungsverhalten des [[Pro-Finder]].

---

## Richtwerte für THITRONIK-Komponenten im Standby

| Komponente | Richtwert | Einordnung |
|------------|-----------|------------|
| WiPro III safe.lock | ca. **11 mA** | Ruhestrom der Alarmzentrale im Standby |
| Pro-Finder ab -045, Rev. 1.3 | ca. **16–21 mA** normal; ca. **37 mA** bei Netzsuche | PDF S. 25; nicht mit einem niedrigen GPS-Standby-Verbrauch gleichsetzen |
| Pro-Finder, ältere Rev. 2.6 | ca. **21 mA** normal | PDF S. 18 |
| Kombination mit angenommener WiPro-Last 11 mA | rechnerisch **27–32 mA** im normalen Pro-Finder-Betrieb | 11 + 16–21 mA; kein gemessener Gesamtwert, **ohne** Fahrzeuggrundlast |

> **Wichtig:** Diese Werte beschreiben nur die THITRONIK-Komponenten. Wegfahrsperre, Steuergeräte, Funkempfänger, Türsysteme oder andere Kriechströme des Fahrzeugs kommen zusätzlich hinzu.

---

## Warum die Starterbatterie trotzdem leer werden kann

- Moderne Fahrzeuge haben auch ohne Alarmanlage eine eigene Dauerlast.
- Jede Blei-Batterie entlädt sich zusätzlich selbst.
- Die praktisch nutzbare Kapazität liegt oft nur bei etwa **50–80 %** der Nennkapazität.

### Selbstentladung als Faustwert

| Batterietyp | Typischer Wert |
|-------------|----------------|
| Nass-/Blei-Säure | ca. **5–10 %** Kapazitätsverlust pro Monat bei Raumtemperatur |
| AGM | etwa **halb so schnell** |

---

## Beispielrechnung

Bei einer Dauerlast von **50 mA** werden pro Tag etwa **1,2 Ah** verbraucht.

| Annahme | Ergebnis |
|---------|----------|
| 60 Ah rein rechnerisch | ca. **50 Tage** bis vollständig entladen |
| 30 Ah praktisch nutzbar | ca. **25 Tage** |
| 48 Ah praktisch nutzbar | ca. **40 Tage** |

> **Praxis:** Diese Beispielrechnung ist idealisiert. Batteriezustand, Temperatur, Batterietyp und zusätzliche Fahrzeuglasten verkürzen die reale Standzeit oft deutlich.

---

## Unterspannung beim Pro-Finder

Die Anleitungen Rev. 2.6 und Rev. 1.3 beschreiben die **Spannungswarnung ausdrücklich nicht in Betriebsart B**. Für die dokumentierte Warnfunktion gilt: Sinkt die Versorgung **dauerhaft unter 11,2 V**, sendet Pro-Finder eine Warnung und geht in Standby. Erst **über 12,5 V** kehrt er in den Normalbetrieb zurück. Die Angabe ist keine Warnung exakt beim Erreichen von 11,2 V und kein Nachweis für dieselben Schwellen in jeder 24-V-Installation.

Bei ausbleibender Reaktion tatsächliche Versorgung am Gerät, Batterie und Ladeanlage prüfen. Keine Unterspannungswarnung in Betriebsart B versprechen. Die Ausnahme nicht als Nachweis dafür interpretieren, dass in B sämtliche Schutzfunktionen fehlen. Wiederholtes Ziehen der Sicherung behebt die Ursache nicht. Belege: Rev. 2.6, PDF S. 12 / FR 47; Rev. 1.3, PDF S. 19 / FR 70.

---

## Praxisempfehlungen für längere Standzeiten

- Fahrzeug vor der Standzeit mit möglichst voller Starterbatterie abstellen.
- Ladeerhaltung je nach Batteriezustand **spätestens nach etwa zwei Wochen** einplanen.
- Bei regelmäßig langen Standzeiten größere Batterie, zusätzliche Kapazität oder Ladeerhaltung über Solar/Ladegerät prüfen.
- Nach einer 11,2-V-Warnung die Batterie nicht weiter unbeaufsichtigt stehen lassen.

---

## Einordnung für Supportfälle

| Aussage | Bedeutung |
|---------|-----------|
| „Nur die Alarmanlage hat die Batterie leergezogen." | In der Regel zu kurz gegriffen; entscheidend ist die Summe aus THITRONIK-Verbrauch, Fahrzeuggrundlast, Selbstentladung und Batteriezustand. |
| „Der Pro-Finder reagiert plötzlich nicht mehr." | Nach Unterspannung kann das Gerät im Standby sein; zuerst Batteriespannung prüfen. |
| „Das Fahrzeug steht viele Wochen ohne Bewegung." | Ohne Ladeerhaltung ist das ein generelles Batteriethema, nicht nur ein Thema der Alarmanlage. |

---

## Querverweise

- [[WiPro III]]
- [[Pro-Finder]]
- [[Störungsbeseitigung]]
