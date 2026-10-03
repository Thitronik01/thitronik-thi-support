# PDF-Quellenprüfung für Thi – 27.09.2026

## Ergebnis und Prüfgrenzen

Im gesamten bereitgestellten Ordner `THI/Anleitungen/` liegen **114 PDF-Dateien mit 97 byteverschiedenen Inhalten und zusammen 2.219 physischen PDF-Seiten nach Entdoppelung**. Die Seitenzahl enthält mehrsprachige Fassungen und eine separate OCR-Abschrift; sie ist keine Zahl unabhängiger Wissensseiten. Alle Dateien wurden inventarisiert, per SHA-256 zugeordnet und die verfügbaren Texte seitenweise extrahiert. Keine Datei verursachte dabei einen Lesefehler. Bildseiten können trotzdem ohne verwertbaren Text bleiben.

**Die 2.219 Seiten wurden nicht vollständig fachlich oder visuell geprüft.** Die Detailprüfung konzentriert sich auf CampLock/VanLock, die zugehörige Katalogseite und ausgewählte weitere Quellen mit erkennbaren RAG-Lücken. Deutsch und Französisch der gemeinsamen Fingerprint-Anleitung wurden textlich abgeglichen und die Bedienabläufe, Voraussetzungen und technischen Tabellen visuell geprüft. Andere Sprachfassungen sind nicht pauschal freigegeben.

Das [vollständige Inventar](quellenpruefung/2026-09-27-pdf-inventar.csv) enthält alle 97 Dokumente samt 114 Fundpfaden, Prüfsummen, Seitenzahlen, textarmen Seiten und individueller Prüftiefe. „Dateiname im Wiki erwähnt“ bedeutet ausdrücklich **nicht**, dass jede PDF-Aussage korrekt in der App verfügbar ist. Auch ein fehlender Anleitungsextrakt beweist keine inhaltliche Wissenslücke: Mehrere dieser PDFs sind bereits in Wiki-Artikeln verarbeitet.

Diese Prüfung erstellt einen Befundbericht, keinen automatischen Import. Original-PDFs, bestehende Wiki-Inhalte, Laufzeitdaten und bereits vorhandene Änderungen wurden dabei nicht verändert. Es wurden keine neuen Inhalte veröffentlicht und keine Live-Antworten des Modells evaluiert.

## Bezugsstand der Wissensbasis

Verglichen wurden `content/wiki`, `content/anleitungen/anleitungen-und-faq.json`, die lokalen App-Daten `app/data/artikel.json` und `app/data/sektionen.json` sowie der Commit `4584a7958a9f922a7fa4017e204a0d9a54da4150`.

Bereits **vor dieser Prüfung** lagen nicht committierte CampLock-/VanLock-Überarbeitungen vor, einschließlich Quellenkopien, DE-/FR-Artikeln, Laufzeitdaten und `docs/08_QUELLANLEITUNGEN_ABGLEICH.md`. Diese Vorarbeit ist umfangreicher als der zuletzt gepushte Commit. Der schreibfreie Lauf `node app/werkzeuge/fingerprint-wiki-sync.mjs --check` bestätigt für alle zehn davon erfassten DE-/FR-Artikel die Übereinstimmung mit den lokalen Wissensdaten. Das ist eine Synchronitätsprüfung, kein Nachweis korrekter Modellantworten oder eines produktiven Deployments.

Der frühere Bericht erfasste nur `Anleitungen/01_Quellanleitungen/`: 47 Dateien, 45 verschiedene Inhalte. Die jetzt zusätzlich berücksichtigten PDFs unter `Anleitungen/de/` erklären den größeren Umfang. Beispielsweise liegt `handbuch_gas-pro_2.5.pdf` dort tatsächlich vor; seine Abwesenheit im früheren Unterordner bedeutet keine Abwesenheit im Gesamtbestand.

## Quellen für die Detailprüfung

Alle folgenden Seitenangaben sind **physische PDF-Seiten ab 1**, sofern nicht ausdrücklich als gedruckte Seiten bezeichnet. Vollständige SHA-256-Werte stehen im Inventar.

| ID | Quelle | Geltungsbereich / geprüfter Teil |
|---|---|---|
| C1 · `41507cb7e7db` | [CampLock-Kurzanleitung](../content/quellen/camplock-fingerprint.pdf) | Art. 106111 / 106144, Rev. 1.0; zwei Faltblattseiten. Anfang auf PDF-S. 2, Fortsetzung auf PDF-S. 1. |
| C2 · `2ee4a19ec758` | [Gemeinsame CampLock-/VanLock-Anleitung](../content/quellen/camplock-vanlock-fingerprint.pdf) | Camp 106111-002 / 106144-002; Van 106259 / 106260; Rev. 1.0; 91 Seiten, zehn Sprachen. DE S. 2–10, FR S. 20–28. |
| K1 · `b78e48aba47d` | [Deutscher Katalog](../content/quellen/katalog_thitronik_de.pdf) | PDF-S. 25: gedruckt S. 48 VanLock und S. 49 CampLock. |
| W1 · `5976e52fecff` | [WiPro-Bedienungsanleitung Rev. 1.3](<../../Anleitungen/Anleitungen/01_Quellanleitungen/WiPro III safe.lock/bedienungsanleitung_wipro_iii_safe-lock.pdf>) | Deckblatt: Stand 06/2025; 191 Seiten. Inhaltsverzeichnis und DE-Fahrzeughinweise S. 3–7 geprüft. |
| W0 · `b275b6e76b6d` | [WiPro-Bedienungsanleitung Rev. 1.2](<../../Anleitungen/Anleitungen/01_Quellanleitungen/WiPro III/wipro_iii_safe-lock_bedienungsanleitung_zehn_sprachen.pdf>) | Stand 11/2024; 182 Seiten. Zum Vergleich insbesondere S. 3–6. |
| M1 · `08d590b1d101` | [Funk-Magnetkontakt 868 wasserdicht](<../../Anleitungen/Anleitungen/01_Quellanleitungen/Funk-Magnetkontakt 868 wasserdicht/funk-magnetkontakt-wasserdicht-868.pdf>) | Art. 106020, Rev. 1.0; DE S. 2–6, technische Daten S. 17. |
| A1 · `1c7466a1e68b` | [Funk-Wassermelder 868](<../../Anleitungen/Anleitungen/01_Quellanleitungen/Funk-Wassermelder 868/funk-wassermelder-868.pdf>) | Art. 106021, Rev. 1.0; DE S. 2–6, technische Daten S. 17. |

PDF-Erstellungsdaten wurden im Inventar erfasst. Sie sind **kein Nachweis einer Hardwareänderung oder einer fachlichen Freigabe**. Die beiden Fingerprint-Anleitungen tragen beide Rev. 1.0; ihre Artikelnummern sind deshalb die wichtigere Unterscheidung.

## CampLock und VanLock: bestätigtes, nutzbares Wissen

### Ausführungen müssen getrennt bleiben

| Ausführung | Belegte Aussage | Quelle | Bestehende Abdeckung |
|---|---|---|---|
| CampLock **106111 / 106144** | Für viele Hartal-Aufbautüren mit Zentralverriegelung. Mit WiPro III: Aufbautür ver-/entriegeln und Alarm scharf-/unscharf. Mit safe.lock: gesamtes Fahrzeug ver-/entriegeln und Alarm scharf-/unscharf. | C1, S. 2 | Lokaler Entwurf korrekt differenziert. Der gepushte Artikel formuliert die safe.lock-Voraussetzung für Ver-/Entriegeln zu pauschal. |
| CampLock **106111-002 / 106144-002** | C2 beschreibt ausschließlich den Einsatz als Zubehör der WiPro III safe.lock. Die Hartal-Türfunktion und Türzustandsmeldung aus C1 sind damit nicht automatisch auch für -002 belegt. | C2, DE S. 2–3; FR S. 20–21 | Lokal bereits getrennt; im gepushten Artikel fehlt die Variantenabgrenzung. |
| VanLock **106259 / 106260** | C2 beschreibt safe.lock als Voraussetzung; der Katalog nennt zusätzlich WiPro III. Das ist ein offener Quellenkonflikt für dieselben Artikelnummern. | C2, S. 3; K1, S. 25 | Lokal bereits als Konflikt dokumentiert; im gepushten Artikel noch pauschale Kompatibilitätsaussage. |

Für die ältere CampLock-Ausführung meldet die Hartal-Tür ihren geöffneten/geschlossenen Zustand an die gekoppelte Alarmanlage; dort ist laut C1 kein zusätzlicher Funk-Magnetkontakt nötig. Diese Aussage gilt für die beschriebene Tür und Ausführung, nicht pauschal für jede Fahrzeugtür oder -002. (C1, S. 2.)

### Bedienabläufe mit hoher Support-Relevanz

| Thema | Verifizierter Kern für RAG-Antworten | Fundstelle |
|---|---|---|
| Erstes Anlernen | Neuer Finger 15-mal auflegen; fünf grüne Blinksignale bestätigen. Die ersten zwei gespeicherten Finger werden automatisch Master-Finger. Bei alter Camp-Ausführung zuerst Hartal-Aufbautür schließen. | C1, S. 2; C2, DE S. 4 / FR S. 22 |
| Kapazität | Höchstens **16 Finger insgesamt**, einschließlich der ersten zwei Master-Finger. Keine 16 zusätzlichen Benutzerfinger. | C1, S. 2; C2, DE S. 4–5 und 10 / FR S. 22–23 und 28 |
| Weitere Finger | Master etwa fünf Sekunden bis Gelb auflegen, neuen Finger 15-mal auflegen, fünf grüne Blinksignale. Bei C1 beginnt auch dieser Ablauf ausdrücklich mit dem Schließen der Aufbautür. | C1, S. 2, Abschnitt „Weitere Finger anlernen“; C2, DE S. 5 / FR S. 23 |
| Kopplung an die WiPro | Fingerregistrierung und Funkkopplung sind getrennte Schritte. WiPro in den Anlernmodus, mit registriertem Finger senden, Bestätigungston und etwa eine Sekunde erloschene Status-LED prüfen. | C2, DE S. 6 / FR S. 24 |
| Besonderheit alte Camp-Ausführung | Kopplung auch durch Öffnen/Schließen der Hartal-Tür möglich. Ein Sendevorgang über den Fingerprint-Sensor funktioniert laut C1 nur bei geschlossener Tür. | C1, S. 1–2 |
| Rote Sensor-LED | Finger nicht erkannt; Verriegelungs- und Alarmzustand bleiben unverändert. Rot allein ist kein Beleg für eine leere Fahrzeugbatterie. | C1, S. 1; C2, DE S. 7 / FR S. 25 |
| Löschen | Beschrieben ist das Löschen **aller** Finger einschließlich der Master-Finger. Registrierten Master zehn Sekunden halten: nach fünf Sekunden Gelb, nach weiteren fünf Rot; abheben; innerhalb zehn Sekunden mit Master bestätigen. Ohne Bestätigung Abbruch. Danach neuen Master anlernen. | C1, S. 1; C2, DE S. 8–9 / FR S. 26–27 |
| Verlorener Master | Die geprüften Anleitungen nennen keinen alternativen Sensor-Reset ohne registrierten Master. Kein Verfahren erfinden oder aus einem anderen Produkt übernehmen. | C1, S. 1; C2, DE S. 8–9 / FR S. 26–27 |
| Notzugang | Der Sensor ersetzt keine mechanische Notentriegelung. Eine alternative Öffnungsmöglichkeit muss bestehen; die Fahrzeugbatterie ist relevant. | C1, S. 2; C2, DE S. 3 / FR S. 21 |
| Montagegrenze | Die Bedienungsanleitungen enthalten keine fahrzeugspezifische Anschlussbelegung. Sie verweisen auf Installation durch Fachpersonal und die passenden Installationsvorgaben. | C1, S. 2; C2, DE S. 3 / FR S. 21 |

Die meisten dieser Abläufe sind im bestehenden lokalen Entwurf bereits enthalten. **Zusätzliche Präzisierung:** Im Abschnitt „Weitere Finger anlernen“ fehlt dort bislang der explizite erste Schritt „Aufbautür schließen“ für CampLock ohne -002. Der Schritt ist im Original C1 vorhanden und sollte direkt beim betreffenden Ablauf stehen.

Die französischen Originalseiten bestätigen die wesentlichen Schritte. Für französische Belege sollten möglichst S. 20–28 angegeben werden. Beim Funktionstest spricht DE von allen **ansteuerbaren** Türen, während FR allgemeiner von allen Fahrzeugtüren spricht; daraus keine pauschale Ansteuerbarkeit jeder Tür ableiten. (C2, S. 6 und 24.)

## Offene Widersprüche und Quellenfehler

### Neu festgestellt: CampLock-Stromaufnahme

Für **106111 / 106144 ohne -002** nennt C1 auf S. 1 **1,7 mA bei 24 V**, K1 auf S. 25 / gedruckt S. 49 dagegen **0,6 mA bei 24 V**. C2 nennt für die -002-Ausführung ebenfalls 1,7 mA bei 24 V, S. 10 / FR S. 28.

Der lokale CampLock-Artikel nennt bislang 1,7 mA als eindeutigen Wert und behandelt nur die unterschiedlichen Gewichte. Der Stromkonflikt fehlt. Er kann **nicht** durch die bloße Gegenüberstellung „alt gegen -002“ aufgelöst werden, weil sich schon C1 und K1 für dieselben Artikelnummern widersprechen. Für eine eindeutige technische Angabe ist eine Herstellerklärung oder eindeutig dem Gerät zugeordnete Dokumentation nötig. Bis dahin beide Werte mit Quellen nennen.

### Bereits lokal erfasst: VanLock-Konflikt bestätigt

| Merkmal | C2, DE S. 3/10 bzw. FR S. 21/28 | K1, S. 25 / gedruckt S. 48 |
|---|---|---|
| Kompatibilität | ausschließlich Zubehör der WiPro III safe.lock | WiPro III und WiPro III safe.lock |
| Gewicht | ca. 219 g | ca. 151 g |
| Stromaufnahme bei 24 V | 1,7 mA | 0,6 mA |

Beide Quellen beziehen sich auf 106259/106260. Keine der Quellen erklärt die Abweichungen. Ein RAG-Kontext muss **beide Aussagen gemeinsam mit dem Konflikthinweis** liefern, statt einen einzelnen Zahlenabschnitt ohne Einschränkung zu verwenden.

### CampLock-Gewichte sind unterschiedlich abgegrenzt

C1 nennt ca. **156 g ohne zweiten Kabelbaum**, C2 für CampLock -002 ca. **213 g**. Die unterschiedliche Artikelnummer und die Einschränkung beim Wiegen gehören zum Wert. Daraus lässt sich keine exakte Gewichtszunahme einer Hardwaregeneration berechnen. (C1, S. 1; C2, S. 10.)

### Übersetzungsfehler in der älteren Kurzanleitung

Im englischen Löschschritt auf C1, PDF-S. 1, gedrucktes Faltblattfeld 11, steht der Wechsel zu Gelb nach **zehn** Sekunden. DE und FR nennen dort **fünf** Sekunden und anschließend weitere fünf Sekunden bis Rot. C2 beschreibt auch auf Englisch, S. 17, fünf plus fünf Sekunden. Die englische Passage aus C1 daher als abweichend markieren; nicht unkommentiert in eine mehrsprachige Antwort mischen. Der Ablauf „fünf plus fünf“ ist durch die verglichenen DE-/FR-Fassungen belegt.

### Zusammenstellung nicht als Herstelleroriginal behandeln

`Anleitungen/de/thitronik_zugang_nur_zugang_v2.pdf` (ID `124c20a1acf1`) erklärt auf S. 1, eigens auf einen Hinweis hin aus Webseiten und Katalog zusammengestellt worden zu sein. Der Text selbst bestätigt keine Originalherausgabe durch THITRONIK. S. 3 nennt unter anderem **202 g** und **alle Hartal-Türen**; diese Aussagen sind durch die hier geprüften Originalanleitungen so nicht gedeckt. Der Seitenstand ist 21.04.2026, die Preisbasis 01.01.2025.

Diese Datei ist als Sekundärquelle zu kennzeichnen. Sie eignet sich zur Quellensuche, aber nicht als gleichrangiger Ersatz für C1/C2 oder als Beleg aktueller Preise. Die dort verlinkten Webseiten wurden in dieser lokalen Prüfung nicht erneut abgerufen.

## Weitere relevante Funde im Gesamtordner

### WiPro Rev. 1.3: relevante Bildseiten fehlen im Textextrakt

W1 trägt sichtbar Rev. 1.3 / Stand 06/2025, W0 Rev. 1.2 / Stand 11/2024. Die direkte Extraktion findet in W1 auf **170 von 191 Seiten** weniger als 40 Zeichen, in W0 auf **161 von 182 Seiten**. Diese Schwelle ist ein OCR-Hinweis, kein Beweis, dass alle betreffenden Seiten inhaltlich leer oder bildlos sind.

Visuell belegte Ergänzungen in W1:

- **Sprinter, PDF-S. 5 / gedruckt S. 4:** ab Software **1.2.0sx** spezieller Warnhinweis mit **zehn kurzen Pieptönen schnell hintereinander und gleichzeitig schnellem Blinken der Fahrzeugblinker** bei der beschriebenen Aussperrgefahr. Dieser Zusatz steht im verglichenen Absatz von W0 noch nicht. Das Serienregister im Wiki erwähnt den Aussperrschutzwarnton bereits; die konkrete Zehnerfolge wurde in DE-Wiki und lokalen App-Texten bei der gezielten Suche nicht gefunden. Das ist ein gut belegbarer neuer Diagnosehinweis. Nicht mit dem zweisekündigen Niederbatterieton verwechseln.
- **Ford, PDF-S. 6 / gedruckt S. 5:** unterscheidet Transit 2019–2024 / Transit Custom bis 2023 von Transit 2024+ / Transit Custom 2023+. Für die jüngere Gruppe ist die Schaltersperre laut Anleitung nicht deaktivierbar; nach Verriegeln/Scharfschalten mit Originalschlüssel ist Entriegeln/Unscharfschalten über das genannte THITRONIK-Zubehör nicht möglich. W0, S. 5, formuliert noch allgemein für Transit 2019+. Das vorhandene Ford-Wiki beschreibt Teile der Bedienlogik bereits; W1 liefert die präzisere Primärquelle und Modellabgrenzung. Die überlappenden Jahresgrenzen im Dokument nicht durch erfundene Monatsgrenzen ersetzen.

Die Inhaltsverzeichnisse wurden verglichen; daraus allein lässt sich keine vollständige Liste aller Änderungen zwischen den beiden Revisionen ableiten. Vor einer vollständigen Ablösung von W0 sollten die übrigen DE-/FR-Kapitel geprüft werden.

### Wasserdichter Magnetkontakt: bereits gut vertreten, Quellenbelege verbessern

M1 bestätigt auf S. 4–5: **maximal 22 mm im geschlossenen Montagezustand**, **mehr als 30 mm zum Auslösen für Anlernen/Funktionstest**. Die kleinen Gehäusepfeile müssen zueinander zeigen. Die beiden Abstände haben unterschiedliche Zwecke und widersprechen sich nicht. Montagezeichnung und Text wurden gegengeprüft.

S. 3 bestätigt mindestens 15 °C Verarbeitungstemperatur und etwa 24 Stunden bis zur Endfestigkeit der Klebepads; S. 6 CR2032, ca. zwei Jahre, zweisekündigen Signalton und etwa 30 Sekunden Sende-LED bei schwacher Batterie. Die wesentlichen Angaben stehen bereits in `funk-magnetkontakt.md` und die 22-/30-mm-Unterscheidung in den App-Daten. Primärer Nutzen ist hier der erreichbare, seitenbezogene Originalbeleg statt weiterer doppelter Wissensabschnitte.

### Wassermelder: bereits gut vertreten, keine Außenfreigabe aus IP ableiten

A1, S. 2–5, bestätigt Innenbereich, trockene und zugängliche Sendeeinheit, Sensor am 30-cm-Kabel mit Bodenkontakt sowie Anlernen durch Überbrücken der Kontaktstifte. Beim Funktionstest muss die WiPro laut S. 5 scharfgeschaltet sein. Diese Inhalte stehen bereits im Wiki.

Die technische Tabelle auf A1, S. 17, nennt CR2032, ca. zwei Jahre, ca. 75 m Freifeld, 868,35 MHz / unter 10 mW, 52 × 35 × 14 mm und ca. 35,1 g. **Eine IP67-Angabe steht in dieser Tabelle nicht.** Der bestehende Wiki-Artikel nutzt zusätzlich eine Produktseite; deren IP-Angabe wurde hier nicht extern nachgeprüft. Die Montagevorgabe „trockener Innenbereich“ bleibt aus der Anleitung eindeutig. Keine Außenmontagefreigabe aus Symbolen oder Schutzart ableiten.

### Pro-Finder: OCR-Fassung als Hilfsmittel vorhanden

Das 247-seitige Original ab SN 045 (ID `a1e1ae9b1a6e`) besitzt **236 textarme Seiten**. Zusätzlich liegt `Anleitungen/de/pro-finder_ocr_abschrift.pdf` mit 248 Seiten vor (ID `bdf15a3b2f43`). Die zusätzliche erste Seite beschreibt ausdrücklich eine OCR-/Abschrift-Version; danach entspricht OCR-PDF-Seite N der Originalseite N−1.

Schon die ersten OCR-Seiten enthalten erkennbare Erkennungsfehler in Überschriften und Nummerierungen. Die Abschrift erleichtert die Suche, ersetzt aber bei SMS-Befehlen, Anschlussbelegungen, Zahlen oder Versionsgrenzen nicht die Sichtprüfung des Originals. Sie ist außerdem keine zweite unabhängige Bestätigung einer Aussage. Eine vollständige Validierung der OCR wurde hier nicht durchgeführt.

### Weitere Quellen vor einem Import klassifizieren

- Farb-/XL-Varianten der Funk-Kabelschleife und weiße Magnetkontakte sind vorhanden und teilweise bereits als Wiki-Quellen genannt. Kein automatischer Wissenszuwachs allein durch zusätzlichen Dateinamen; zunächst Funktions- und Maßunterschiede prüfen.
- Französischer und Schweizer Katalog sind bytegleich und teilen einen Hash. Im RAG nicht als zwei unabhängige Belege zählen.
- `NUR_INTERNER_GEBRAUCH_Pro-finder_Befehle_abV9.1_(V1.1).pdf` bleibt als interne Quelle zu behandeln. Die Bezeichnung darf nicht beim Import verloren gehen.
- Upgrade-Formular 2024 und Smartphone-/Smartwatch-Kompatibilitätsliste Stand 08/2023 sind historische Stände. Sie wurden inventarisiert, aber nicht als aktuelle Freigaben oder aktuelle Preise bestätigt.
- Die weiteren Fahrzeug-PDFs und FAQs sind im Inventar erfasst und vielfach schon im Wiki namentlich erwähnt; ein vollständiger fachlicher Neuabgleich dieser Dokumente steht aus.

## Technische Lücken der RAG-Quellenanbindung

1. **Abgeschnittene Extrakte:** `content/anleitungen/anleitungen-und-faq.json` enthält 93 Einträge, davon 31 vom Typ `anleitung`. **24 dieser 31 Texte haben exakt 12.000 Zeichen.** Das passt zur Begrenzung `text.substring(0, 12000)` in `code/wiki-ingest.mjs`, Funktion `buildAnleitungenLibrary`. Ein solcher Auszug darf nicht als vollständig gelesenes Handbuch gelten.
2. **Bild-PDFs mit geringer Abdeckung:** Der vorhandene Pro-Finder-SN045-Eintrag hat 2.148 Zeichen, der WiPro-Rev.-1.2-Eintrag nur 1.841. Der lesbare Deckblatttext kann den Eindruck einer erfolgreichen Extraktion erzeugen, obwohl die Bedienkapitel fehlen. Seitenbezogene OCR-Abdeckung erfassen.
3. **Zu starke Metadaten:** Der genannte Builder setzt pauschal `confidence: 'high'` und `coverage: 'complete'`, unabhängig von OCR-Abdeckung und Textkürzung. Vollständigkeit muss aus geprüfter Abdeckung folgen, nicht aus dem Vorhandensein eines PDF-Dateinamens.
4. **Sprachtrennung:** Anleitungseinträge werden dort pauschal mit `lang: 'de'` angelegt. Mehrsprachige Originaltexte vor dem Indexieren in Sprachabschnitte zerlegen und Quellen-Seiten erhalten. Sonst können Übersetzungsfehler wie in C1 unbemerkt konkurrieren.
5. **Erreichbare Quellen:** Einige Wiki-Frontmatter verweisen auf `sources/*.pdf`, obwohl dieses Verzeichnis im Repo fehlt. Für jeden aufgenommenen Beleg einen erreichbaren Quellenpfad oder eine stabile Dokument-ID mit Hash und Seitenbezug hinterlegen. Die drei lokalen Fingerprint-Quellen unter `content/quellen/` sind bereits ein besseres Muster.
6. **Konflikt am Einzelbeleg erhalten:** Zahlenabschnitte zu VanLock dürfen beim Retrieval nicht vom zugehörigen Quellenkonflikt getrennt werden. Dasselbe gilt neu für die CampLock-Stromaufnahme. Artikelnummer, Geltungsbereich, Revision und Konflikt-ID sollten unmittelbar am jeweiligen Wissensabschnitt stehen.

Nicht jede Kürzung bedeutet automatisch Verlust in der gesamten App: Es gibt zusätzlich thematische Wiki-Artikel und `sektionen.json`. Diese sind bei einem konkreten Befund mitzuprüfen. Hier wurden die Fingerprint-Artikel und ausgewählte Montage-/Fahrzeughinweise abgeglichen; kein vollständiger Ende-zu-Ende-Test aller RAG-Themen vorgenommen.

## Empfohlene Übernahmen in sinnvoller Reihenfolge

| Priorität | Konkrete Arbeit | Akzeptanzkriterium |
|---|---|---|
| 1 | Lokalen CampLock-Entwurf um Stromkonflikt C1/K1 und geschlossene Tür beim weiteren Anlernen ergänzen; EN-Quellenfehler kennzeichnen. | DE und FR geben bei unbekannter Ausführung keine pauschale Kompatibilitätsantwort; 24-V-Wert wird mit Konflikt benannt. |
| 1 | Vorbereitete Camp-/Van-Variantenartikel vor Veröffentlichung zusammen mit App-Daten prüfen. | Frage zu 106111 erlaubt laut C1 die Hartal-Türbedienung mit WiPro III; Frage zu -002 erhält C2-Geltungsbereich; Van-Konflikt bleibt sichtbar. |
| 2 | W1-Sprinterwarnung und präzise Ford-Abgrenzung als belegte Abschnitte übernehmen; übrige DE-/FR-Seiten vor kompletter Migration lesen. | Zehn kurze Pieptöne plus schnelle Blinker werden im passenden Sprinter-/Softwarekontext erklärt; nicht als CR2032-Warnung. |
| 2 | PDF-Abdeckung, Sprachgrenzen und Kürzungen im Import sichtbar machen. | Bild-PDFs und gekürzte Texte erhalten keine pauschale Kennzeichnung „vollständig“. |
| 3 | Originalbelege für Wasser-/Magnetkontakt an bereits vorhandene Artikel anbinden. | Quelle mit Hash, Seite und Produktausführung erreichbar; keine inhaltlichen Dubletten. |
| 3 | Pro-Finder-OCR an kritischen Befehlen und Tabellen gegen Original prüfen. | Keine unbestätigte OCR-Zeichenfolge als ausführbarer Befehl oder Anschlussangabe. |

Für spätere Antworttests besonders geeignete Fragen: „Gehen 16 Benutzerfinger zusätzlich zu zwei Master-Fingern?“, „Kann ich einen einzelnen Finger löschen?“, „106111 ohne -002: Muss die Tür zum weiteren Anlernen zu sein?“, „CampLock bei 24 V: 0,6 oder 1,7 mA?“, „VanLock mit normaler WiPro III?“, „Sprinter piept zehnmal kurz und blinkt schnell – ist die Senderbatterie leer?“. Diese Fragen sind Prüfempfehlungen; ein bestandener Live-Modelltest wird mit diesem Bericht nicht behauptet.
