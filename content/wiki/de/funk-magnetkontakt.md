---
title: Funk-Magnetkontakt 868 — Montage und Betrieb
sources:
  - "content/quellen/funk-magnetkontakt-montage-rev1.2.pdf"
  - "content/quellen/funk-magnetkontakt-100757-rev1.3.pdf"
  - "content/quellen/funk-magnetkontakt-100758-rev1.3.pdf"
  - "content/quellen/funk-magnetkontakt-wasserdicht-106020-rev1.0.pdf"
  - "content/quellen/funk-magnetkontakt-faq.pdf"
  - "content/quellen/funk-magnetkontakt-wasserdicht-faq.pdf"
  - "content/quellen/funk-handsender-faq.pdf"
  - "content/quellen/wipro-iii-installation-rev1.8.pdf"
  - "https://www.thitronik.de/produkte/produkt/funk-magnetkontakt-868-wasserdicht/"
updated: '2026-10-01'
confidence: high
lang: de
dealerStatus: approved
---

# Funk-Magnetkontakt 868 — Montage und Betrieb

Funk-Magnetkontakte überwachen Türen, Fenster, Klappen, Dachluken und Dachboxen. Wird eine gesicherte Öffnung bei scharfgeschalteter Alarmanlage geöffnet, sendet der Kontakt ein Funksignal an die **WiPro III**.

Die Standardausführung ist in Schwarz und Weiß erhältlich und eignet sich für geschützte Einbauorte. Für Fahrzeugöffnungen, die Feuchtigkeit oder Nässe ausgesetzt sind, gibt es eine separate wasserdichte Ausführung mit Schutzart **IP67**.

> **WICHTIG:** Ein Alarm wird nur ausgelöst, wenn der Funk-Magnetkontakt an der Alarmanlage angelernt ist, Funkverbindung besteht und die Alarmanlage scharfgeschaltet wurde. Ein Funk-Magnetkontakt meldet einen Einbruch oder Einbruchversuch, verhindert ihn aber nicht mechanisch.

---

## Technische Daten

| Parameter | Standard, Art.-Nr. 100757/100758 | Wasserdicht, Art.-Nr. 106020 |
|-----------|-----------------------------------|-------------------------------|
| Spannungsversorgung | 1 × CR2032-Knopfzelle, 3 V | 1 × CR2032-Knopfzelle, 3 V |
| Typische Batterielebensdauer | ca. 2 Jahre | ca. 2 Jahre |
| Funkreichweite | ca. 75 m im Freifeld | ca. 75 m im Freifeld |
| Sendefrequenz | 868,35 MHz | 868,35 MHz |
| Sendeleistung | < 10 mW | < 10 mW |
| Abmessungen Sendeeinheit (B × H × T) | 44 × 34 × 15 mm | 52 × 35 × 14 mm |
| Abmessungen Magnet (B × H × T) | nicht separat dokumentiert | 52 × 13 × 11 mm |
| Gewicht | ca. 33 g | 33 g laut Anleitung / 37 g laut Produktseite; Zuordnung offen |
| Schutzart | keine Schutzart für Nässe dokumentiert | IP67 |
| Temperaturbereich | −10 °C bis +60 °C | −40 °C bis +125 °C laut Website; Geltungsbereich ungeklärt, siehe Quellenhinweis |

Die Funkreichweite ist ein Freifeldwert. Metallische Fahrzeugteile, der Montageort und andere Abschirmungen können den tatsächlich erreichbaren Abstand deutlich verringern.

**Offener Quellenwiderspruch zum wasserdichten Magnetkontakt 106020:** Anleitung Rev. 1.0 nennt **33 g**, die Produktseite **37 g**. Eine Zuordnung zu Geräteständen fehlt; keiner der Werte ist als verbindlich aufgelöst. Beleg: [MW, PDF 17](../../quellen/funk-magnetkontakt-wasserdicht-106020-rev1.0.pdf#page=17) und [Produktseite](https://www.thitronik.de/produkte/produkt/funk-magnetkontakt-868-wasserdicht/), geprüft am 01.10.2026.

Die Website nennt außerdem −40 °C bis +125 °C als maximalen Temperaturbereich. Die Anleitung belegt diesen Bereich nicht. Offen bleibt, ob er für das vollständige betriebsbereite Gerät einschließlich CR2032 gilt. Daraus keine Freigabe für Batterie, Klebepad oder Dauerbetrieb bei diesen Extremtemperaturen ableiten.

Die WiPro III kann insgesamt höchstens **100 Funksender** speichern. Funk-Magnetkontakte teilen sich diesen Speicher mit Funk-Handsendern, Funk-Kabelschleifen und anderem Funk-Zubehör.

---

## Varianten und Einsatzbereiche

| Ausführung | Farbe | Art.-Nr. | Einsatzbereich | Kompatibilität laut Produktunterlagen |
|------------|-------|----------|----------------|---------------------------------------|
| Standard | schwarz | 100757 | geschützte Türen, Fenster, Klappen, Dachluken und Dachboxen | WiPro III, WiPro III safe.lock, WiPro easy |
| Standard | weiß | 100758 | geschützte Türen, Fenster, Klappen, Dachluken und Dachboxen | WiPro III, WiPro III safe.lock, WiPro easy |
| Wasserdicht | schwarz | 106020 | feuchte- oder spritzwassergefährdete Öffnungen, beispielsweise Garagenklappen, Dachboxen, Motorhauben und Anhängertüren | WiPro III und WiPro III safe.lock |

Die wasserdichte Ausführung ist konstruktiv eigenständig. Ihre Montageplatte, Gehäuseausrichtung und zulässigen Abstände dürfen nicht mit den Vorgaben der Standardausführung vermischt werden.

---

## Funktionsprinzip

Der Funk-Magnetkontakt besteht aus einer Sendeeinheit mit Reed-Sensor und einem Magneten. Bei geschlossener Öffnung liegen beide Teile innerhalb des zulässigen Abstands. Beim Öffnen entfernt sich der Magnet, der Kontakt sendet und die scharfgeschaltete Alarmanlage löst aus.

Die Sende-LED bestätigt einen Sendevorgang. Sie dient zugleich als Orientierungshilfe bei der Montage und zeigt durch ungewöhnlich langes Leuchten eine schwache Batterie an.

---

## Anlernen an die WiPro III

Jeden Funk-Magnetkontakt vor der Verwendung einzeln anlernen. Die folgende direkte Methode setzt freien Zugang zur WiPro-III-Zentrale voraus.

### Direkt an der WiPro-III-Zentrale

1. Sicherstellen, dass der 20-polige Stecker an der WiPro-III-Zentrale eingesteckt ist.
2. Den Taster **„B“** an der Gehäusevorderseite gedrückt halten, bis ein langer Signalton ertönt und die Status-LED dauerhaft leuchtet.
3. Einen Sendevorgang auslösen: Bei der Standardausführung Sender und Magnet voneinander entfernen, bis die Sende-LED **„C“** blinkt. Bei der wasserdichten Ausführung den Magneten mehr als **30 mm** von der Sendeeinheit entfernen.
4. Den kurzen Bestätigungston abwarten; die Status-LED erlischt dabei kurz.
5. Zum Beenden den Taster **„B“** kurz drücken. Ein Doppelton ertönt und die Status-LED erlischt.

Weitere Anlernwege, Voraussetzungen und Löschverfahren stehen unter [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]].

---

## Reichweitentest vor der Montage

Den Reichweitentest nach dem Anlernen und vor dem endgültigen Kleben oder Verschrauben durchführen.

1. Sendeeinheit und Magnet vorübergehend am vorgesehenen Montageort fixieren.
2. Sicherstellen, dass beide Teile im geschlossenen Zustand richtig ausgerichtet sind und innerhalb des zulässigen Abstands liegen.
3. Alarmanlage scharfschalten.
4. Gesicherte Öffnung so weit öffnen, dass der Kontakt sendet: bei der wasserdichten Ausführung den Abstand auf mehr als **30 mm** vergrößern.
5. Prüfen, ob die Alarmanlage auslöst.

Bleibt der Alarm aus, zunächst Anlernstatus und Batterie prüfen. Danach die Position verändern und mögliche Metallabschirmungen zwischen Funk-Magnetkontakt und Zentrale ausschließen. Bei einer Heckgarage kann ein Montageadapter die Funkverbindung verbessern.

---

## Standardausführung montieren

### Ausrichtung und Abstand

> **ACHTUNG:** Die Platine darf nicht mit der Sende-LED zum Magneten ausgerichtet sein. In dieser falschen Ausrichtung ist das Anlernen zwar möglich, eine Alarmierung erfolgt jedoch nicht.

Die Sende-LED muss **vom Magneten weg** zeigen. Die Platine wird entsprechend in das Sendergehäuse eingelegt und der Senderdeckel eingerastet.

**Offener Abstandskonflikt bei Standard-Magnetkontakten:** Die Montageanleitungen Rev. 1.2/1.3 nennen **25 mm**, die WiPro-III-Installation Rev. 1.8 etwa **22 mm**. Die Beschränkung auf höchstens 22 mm im geschlossenen Zustand ist hier eine vorsichtige redaktionelle Zwischenregel, keine belegte Auflösung nach Gerätestand. Am Fahrzeug Reichweite und Öffnungsalarm prüfen; bei abweichendem Einbau Herstellerzuordnung einholen. Belege: [M0, PDF 2](../../quellen/funk-magnetkontakt-montage-rev1.2.pdf#page=2), [M1, PDF 2](../../quellen/funk-magnetkontakt-100757-rev1.3.pdf#page=2), [M2, PDF 2](../../quellen/funk-magnetkontakt-100758-rev1.3.pdf#page=2); WiPro-Installation Rev. 1.8, PDF-Seite 7, Skizze 6; siehe [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]].

### Klebe- oder Schraubbefestigung

1. Eine ebene Klebefläche wählen und vollständig von Schmutz, Feuchtigkeit und Fett befreien.
2. Klebepads nicht bei Oberflächentemperaturen unter **15 °C** verarbeiten.
3. Auf rauen Oberflächen die unbedruckte Padseite auf die Fahrzeugoberfläche und die bedruckte Seite auf Sender beziehungsweise Magnet kleben.
4. Auf Glas oder Acrylglas die bedruckte Seite für die abschreckende Wirkung nach außen zeigen lassen.
5. Die Teile nach dem Kleben nicht belasten; die Endfestigkeit wird erst nach etwa **24 Stunden** erreicht.

Ist eine Klebemontage nicht möglich, kann das Sendergehäuse an den innen markierten Stellen verschraubt werden. Geeignete Befestigungsmittel und Schraubenlängen so wählen, dass keine Fahrzeugteile oder Leitungen beschädigt werden.

### Fenster, Türen und Klappen

- An Fenstern kann das Sendergehäuse je nach Rahmenprofil und Abstand zu Rollo oder Scheibe liegend links oder rechts montiert werden. Entscheidend ist stets, dass die Sende-LED vom Magneten weg zeigt.
- An Türen und Klappen das Sendergehäuse möglichst am festen Rahmen und den Magneten am beweglichen Türblatt oder an der Klappe befestigen.
- Bei größeren Spaltmaßen oder metallischen Heckgaragen den passenden Montageadapter verwenden: **Art.-Nr. 100428** in Schwarz oder **Art.-Nr. 100729** in Weiß.

---

## Wasserdichte Ausführung montieren

### Ausrichtung und Abstand

Bei der wasserdichten Ausführung müssen die kleinen Pfeile auf Sendeeinheit und Magnet **zueinander zeigen**. Im geschlossenen Zustand darf der Abstand zwischen beiden Teilen höchstens **22 mm** betragen. Ein Sendevorgang wird für Anlernen und Funktionstest ausgelöst, indem der Magnet auf mehr als **30 mm** Abstand gebracht wird.

> **ACHTUNG:** Für die wasserdichte Ausführung gelten die Gehäusepfeile und der Abstand von 22 mm. Die LED-Ausrichtungsregel und der Montageradius der Standardausführung dürfen nicht darauf übertragen werden.

### Montageplatte und Magnet befestigen

1. Eine saubere, trockene und fettfreie Fläche wählen. Das mitgelieferte Klebepad nicht unter **15 °C** Oberflächentemperatur verarbeiten und etwa **24 Stunden** bis zur Endfestigkeit warten.
2. Montageplatte so ausrichten, dass ihre Rastnasen vom Magneten weg und der kleine Pfeil zum Magneten zeigen.
3. Sendeeinheit so drehen, dass ihr Gehäusepfeil in dieselbe Richtung wie der Pfeil auf der Montageplatte zeigt.
4. Sendeeinheit auf die Rastnasen setzen und in Pfeilrichtung schieben, bis sie bündig auf der Montageplatte sitzt.
5. Magneten mit den beiden mitgelieferten Schrauben so befestigen, dass sein Pfeil zum Pfeil der Sendeeinheit zeigt.

Kann die Montageplatte nicht geklebt werden, geeignete Senkkopfschrauben aus **V4A-Edelstahl** verwenden. Diese Schrauben gehören nicht zum Lieferumfang.

> **VORSICHT:** Befestigungsort, Schraubenart und Schraubenlänge vor dem Bohren prüfen. Ungeeignete, falsche oder zu lange Schrauben können Fahrzeugteile und Leitungen beschädigen.

---

## Bereits über CAN-Bus überwachte Türen

Fahrzeugtüren, deren geöffneter Zustand im Kombiinstrument oder in der Multifunktionsanzeige erscheint, werden bei korrekt angeschlossener WiPro III in der Regel bereits über den **CAN-Bus** überwacht. Für diese Türen ist normalerweise kein zusätzlicher Funk-Magnetkontakt erforderlich.

Ob eine Tür tatsächlich vom Fahrzeug und von der WiPro III ausgewertet wird, muss am konkreten Fahrzeug geprüft werden. Hinweise stehen unter [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen|Fahrzeugkompatibilität]].

---

## Verwendung im Betrieb

1. Vor dem Scharfschalten prüfen, ob Sendeeinheit und Magnet fest sitzen, richtig ausgerichtet sind und die Öffnung vollständig geschlossen ist.
2. Alarmanlage scharfschalten.
3. Beim Öffnen der gesicherten Tür, des Fensters oder der Klappe prüfen, ob der Funk-Magnetkontakt sendet und die Alarmanlage auslöst.
4. Vor Arbeiten am Kontakt oder vor dem Öffnen des Sendergehäuses die Alarmanlage unscharf schalten.

Nach der Montage jeden Funk-Magnetkontakt einzeln mit einem Testalarm prüfen. Eine bloße Bestätigung während des Anlernens beweist bei falsch ausgerichteter Standardplatine noch keine zuverlässige Alarmfunktion.

---

## Batterie prüfen und wechseln

Beide Ausführungen verwenden eine **CR2032-Knopfzelle mit 3 V**. Die typische Lebensdauer beträgt etwa zwei Jahre; längere Kälteperioden können sie verkürzen.

### Niederbatterie-Signal

**Quellenstand zum Batteriewarnton:** Die Zubehör-FAQ nennt 2 Sekunden; die WiPro-Bedienungsanleitung nennt 5 Sekunden. Die Zuordnung zu Geräte-/Softwareständen ist offen. Den zuletzt ausgelösten Sender, seine LED und die CR2032 prüfen; nicht allein aus der Tondauer auf einen Defekt schließen. Siehe [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]].

Bei einer schwachen Batterie von weniger als etwa **2,6 V** zeigt die WiPro beim Auslösen des Funk-Magnetkontakts folgende Hinweise:

- Aus der Zentrale ertönt etwa **2 Sekunden** lang ein Signalton.
- Die rote Sende-LED am Kontakt erlischt erst nach ungefähr **30 Sekunden**.

Wenn eine CR2032-Funkkomponente wegen schwacher Batterie auffällt, empfiehlt sich die zeitnahe Prüfung weiterer Knopfzellen ähnlichen Alters.

### Standardausführung

Das Standardgehäuse an der Einkerbung der langen Seite vorsichtig aufhebeln, Platine entnehmen und CR2032 polrichtig wechseln. Beim Wiedereinsetzen muss die LED weiterhin vom Magneten weg zeigen. Dieses Aufhebeln gilt nicht für das verschraubte wasserdichte Gehäuse. Beleg: [QH, PDF 2](../../quellen/funk-handsender-faq.pdf#page=2) und [M1, PDF 2](../../quellen/funk-magnetkontakt-100757-rev1.3.pdf#page=2).

Für den Batteriewechsel der Standardausführung die zum Gehäusestand passende THITRONIK-Kurzanleitung aus dem Supportbereich verwenden. Alarmanlage vorher unscharf schalten, ausschließlich eine neue CR2032 einsetzen, die Polarität beachten und danach Gehäusesitz, Funktion und Reichweite prüfen.

### Wasserdichte Ausführung

1. Alarmanlage unscharf schalten und Sendeeinheit von der Montageplatte schieben.
2. Die beiden Gehäuseschrauben lösen und das Gehäuse öffnen.
3. Verbrauchte CR2032 vorsichtig aus der Batteriehalterung schieben.
4. Neue **CR2032, 3 V** mit korrekter Polung einsetzen.
5. Dichtung korrekt einsetzen, Gehäuse schließen und verschrauben; danach Sendeeinheit wieder auf die Montageplatte schieben und Funktion sowie Reichweite prüfen.

> **VORSICHT:** Bei unsachgemäßem Batteriewechsel besteht Explosionsgefahr. Batterien nicht ins Feuer werfen, öffnen oder kurzschließen. Knopfzellen und Kleinteile von Kindern fernhalten; Verschlucken kann tödlich sein. Bei Verdacht sofort ärztliche Hilfe hinzuziehen. Ausgelaufene Batterieflüssigkeit nicht mit Haut oder Augen in Kontakt bringen; betroffene Stellen mit Wasser spülen und ärztliche Hilfe suchen.

---

## Störungen eingrenzen

| Beobachtung | Mögliche Ursache | Maßnahme |
|-------------|------------------|----------|
| Standardkontakt lässt sich anlernen, löst aber keinen Alarm aus | Platine zeigt mit der Sende-LED zum Magneten | Platine drehen; Sende-LED muss vom Magneten weg zeigen |
| Wasserdichter Kontakt löst nicht zuverlässig aus | Gehäusepfeile zeigen nicht zueinander oder Abstand im geschlossenen Zustand ist zu groß | Ausrichtung korrigieren und Abstand auf höchstens 22 mm begrenzen |
| Kein Bestätigungston oder Alarm | Kontakt nicht angelernt, Batterie leer oder Funkweg abgeschirmt | Anlernstatus und Batterie prüfen; Reichweitentest wiederholen |
| Kontakt an der Heckgarage arbeitet unzuverlässig | Sender sitzt auf Metall oder Funkweg ist abgeschirmt | Position ändern; bei Standardausführung Montageadapter 100428 oder 100729 verwenden |
| Kontakt fällt nach einiger Zeit ab | Klebefläche unzureichend gereinigt, zu kalt verarbeitet oder vor Ablauf von 24 Stunden belastet | Fläche neu vorbereiten und Klebevorgaben einhalten |
| Etwa 2 Sekunden Signalton, rote Sende-LED leuchtet lange | CR2032 schwach | Batterie ersetzen und anschließend Funktion sowie Reichweite prüfen |
| Unbeabsichtigter Alarm bei geschlossener Öffnung | Abstand zu groß, Bauteile bewegen sich oder Klebepad löst sich | Sitz, Abstand, Ausrichtung und Befestigung kontrollieren |

Bei ungeklärten Empfangs- oder Alarmproblemen vollständige Seriennummern von Alarmanlage und Funk-Magnetkontakt, Batteriezustand, Fahrzeugdaten, Ausführung und Einbausituation für den Support dokumentieren.

---

## Häufige Fragen (FAQ)

### Welche Ausführung benötige ich?
Für geschützte Einbauorte stehen Standardkontakte in Schwarz und Weiß zur Verfügung. Für Öffnungen im Feucht- oder Spritzwasserbereich ist die wasserdichte Ausführung mit Art.-Nr. 106020 und IP67 vorgesehen.

### Warum kann ich den Standardkontakt anlernen, obwohl später kein Alarm ausgelöst wird?
Das geschieht häufig bei falsch herum eingesetzter Platine. Die Sende-LED muss vom Magneten weg zeigen. Nach der Korrektur immer einen Testalarm durchführen.

### Wie groß darf der Abstand zwischen Sender und Magnet sein?
Beim wasserdichten Funk-Magnetkontakt 106020 geschlossen höchstens 22 mm, zum Anlernen und Testen auf mehr als 30 mm trennen. Die Gehäusepfeile müssen zueinander zeigen. Für die Standardausführung nennt die produktspezifische Anleitung 25 mm, das WiPro-III-Installationshandbuch etwa 22 mm. Höchstens 22 mm ist hier eine redaktionelle Zwischenregel; der Quellenwiderspruch bleibt offen.

### Wann brauche ich einen Montageadapter?
Bei großen Spaltmaßen oder metallischen Heckgaragen. Für die Standardausführung gibt es Art.-Nr. 100428 in Schwarz und Art.-Nr. 100729 in Weiß.

### Darf ich die wasserdichte Montageplatte verschrauben?
Ja. Dafür sind geeignete V4A-Senkkopfschrauben erforderlich; sie sind nicht im Lieferumfang enthalten. Schraubenart und -länge müssen zum Fahrzeugaufbau passen.

### Brauche ich Funk-Magnetkontakte an bereits angezeigten Fahrzeugtüren?
In der Regel nicht, wenn die Tür über den CAN-Bus erfasst und von der WiPro III korrekt ausgewertet wird. Dies muss am Fahrzeug geprüft werden.

### Was bedeutet der zweisekündige Signalton nach dem Öffnen?
Die Batterie des zuletzt betätigten Funk-Zubehörs ist schwach. Beim betroffenen Funk-Magnetkontakt bleibt zusätzlich die rote Sende-LED etwa 30 Sekunden sichtbar. Die CR2032 sollte zeitnah ersetzt werden.

---

## Konformität und Entsorgung

Die Funk-Magnetkontakte 868 entsprechen laut Hersteller den Anforderungen der Richtlinie **2014/53/EU**. Die vollständige Konformitätserklärung ist im Supportbereich von THITRONIK verfügbar: `https://www.thitronik.de/support`

Geräte und verbrauchte Batterien nicht über den Hausmüll entsorgen. Knopfzellen getrennt dem Batterierecycling zuführen. Verpackungs- und Montagematerialien von Kindern fernhalten.

---

## Querverweise

- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge|WiPro III]]
- [[Anlernvorgang — Funk-Zubehör an WiPro III anlernen|Anlernvorgang]]
- [[Funk-Handsender 868 — Fernbedienung für WiPro III|Funk-Handsender 868]]
- [[Funk-Kabelschleife 868 — Außensicherung für mobile Güter|Funk-Kabelschleife 868]]
- [[Systemüberblick — THITRONIK-Produktwelt|Systemüberblick]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme|Störungsbeseitigung]]

---

## Quellenprüfung und Dokumentstand

Dokumentabgleich vom 01.10.2026, physische PDF-Seiten: [M0, PDF 2](../../quellen/funk-magnetkontakt-montage-rev1.2.pdf#page=2), [M1, PDF 2](../../quellen/funk-magnetkontakt-100757-rev1.3.pdf#page=2), [M2, PDF 2](../../quellen/funk-magnetkontakt-100758-rev1.3.pdf#page=2), [MW, PDF 3](../../quellen/funk-magnetkontakt-wasserdicht-106020-rev1.0.pdf#page=3), [MW, PDF 4](../../quellen/funk-magnetkontakt-wasserdicht-106020-rev1.0.pdf#page=4), [MW, PDF 5](../../quellen/funk-magnetkontakt-wasserdicht-106020-rev1.0.pdf#page=5), [MW, PDF 6](../../quellen/funk-magnetkontakt-wasserdicht-106020-rev1.0.pdf#page=6), [QM, PDF 1](../../quellen/funk-magnetkontakt-faq.pdf#page=1), [QMW, PDF 1](../../quellen/funk-magnetkontakt-wasserdicht-faq.pdf#page=1).

Bestätigte Angaben und offene Abweichungen sind im [Prüfprotokoll](../../../docs/quellenpruefung/2026-10-01-funk.md).
