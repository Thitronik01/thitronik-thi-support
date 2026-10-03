# WiPro III / safe.lock – Installation, Kurzfassungen und FAQ

Stand: **28.09.2026**. Dokumentengestützter Abgleich; keine Messung am Gerät, keine verbindliche Herstellerfreigabe.

Dieser Durchlauf ergänzt die [Bedienungsprüfung der Revisionen 1.2/1.3](2026-09-28-wipro-safelock.md). Fünf weitere Originaldateien wurden gegen diese Bedienungsmatrix und den deutschen/französischen Wiki-Bestand geprüft. Insgesamt wurden **92 physische PDF-Seiten** visuell gelesen: 37 Installationsseiten einschließlich Deckblatt, 51 deutsche FAQ-Seiten und vier mehrsprachige Faltblattseiten. Bei den Faltblättern wurden die DE-/FR-Spalten und gemeinsamen Piktogramme geprüft; andere Sprachen sind nicht als geprüft gezählt.

## Quellenumfang

Alle Seitenangaben bezeichnen physische PDF-Seiten. Die FAQ enthalten keinen sichtbaren Revisionsstand und kein verlässlich sichtbares Veröffentlichungsdatum. PDF-Metadaten wurden nicht als fachliches Aktualitätsdatum ausgegeben.

| Kürzel | Unveränderte Originalkopie | Umfang der Sichtprüfung |
|---|---|---|
| I | [WiPro III Installation Rev. 1.8](../../content/quellen/wipro-iii-installation-rev1.8.pdf) | 128 Seiten insgesamt; geprüft: Deckblatt 1, DE 2–19, FR 38–55 |
| Q | [FAQ WiPro III](../../content/quellen/wipro-iii-faq.pdf) | DE, alle 20 Seiten |
| S | [FAQ WiPro III safe.lock](../../content/quellen/wipro-iii-safelock-faq.pdf) | DE, alle 31 Seiten |
| K | [Kurzfassung WiPro III Rev. 1.6](../../content/quellen/wipro-iii-kurzanleitung-rev1.6.pdf) | Beide Faltblattseiten, DE/FR und gemeinsame Symbole |
| L | [Kurzfassung safe.lock Rev. 1.3](../../content/quellen/wipro-iii-safelock-kurzanleitung-rev1.3.pdf) | Beide Faltblattseiten, DE/FR und gemeinsame Symbole |

W0/W1 bezeichnen im Folgenden die Bedienungsrevisionen 1.2/1.3 des vorherigen Berichts. Die Quellenkopien sind bytegleich mit dem Inventar; Originalpfade, Umfang und SHA-256 stehen im [Quellenmanifest](2026-09-28-wipro-installation-quellen.json). Die Originale wurden weder verändert noch mit OCR überschrieben.

Die Textebene von I enthält auch unsichtbare/überlagerte Inhalte, etwa schwedischen Alttext auf PDF-S. 2. Die schmalen Fahrzeugtabellen in Q/S laufen teilweise über mehrere Seiten. Deshalb wurden die sichtbaren Seiten und Spaltengrenzen gelesen; kein unkontrollierter Volltextimport. Französische FAQ-Ergänzungen im Wiki sind Übersetzungen der geprüften deutschen FAQ, keine angeblich vorhandene französische Primär-FAQ.

## Aussagenmatrix

„Bestätigt“ bezeichnet eine Übereinstimmung der genannten Dokumentstellen. Der fachliche Geltungsbereich bleibt auf das Dokument, die Variante und den angegebenen Stand begrenzt.

| Nr. | Thema | Beleg | Ergebnis / Behandlung |
|---|---|---|---|
| I01 | Alarmdauer | I 2/38; K/L 1; W1 7/43 und 13–14/50–51 | I nennt optisch 120 s, K/L zeigen 180 s. Akustisch 30 s übereinstimmend. Bereits dokumentierter 120/180-Konflikt wird bestätigt, nicht aufgelöst. |
| I02 | Fahrzeugtüren und CAN | I 3/39, 11/47 | Anzeige der Tür im Fahrzeug ist Voraussetzung/Hinweis; nicht jede Aufbauöffnung ist automatisch überwacht. Einzelfunktionstest bleibt erforderlich. |
| I03 | Hupe bei ausgeschalteter Zündung | I 3/39 | Sprinter/T5/T6 können zusätzliche Alarmgeber benötigen; Zubehör und Fahrzeugstand separat prüfen. Keine universelle Zubehörfreigabe. |
| I04 | DIP-Sonderfunktionen | I 4/40 | DIP 8 ON reduziert interne Lautstärke; DIP 7 ON deaktiviert Anti-Jamming; DIP 5 ON deaktiviert Originalschlüssel-Schalten ab 0823-014 / 5.8, Türüberwachung bleibt. Bestehende Angaben bestätigt. |
| I05 | DIP nur stromlos | I 5/41 | Sowohl 20-poliger Stecker als auch Pro-Finder-Stecker müssen abgezogen sein. Bestehende Anweisung bestätigt. |
| I06 | Alte Fahrzeug-/DIP-Tabelle | I 5/41; Q 2–14 | Alte Ford- und Master-Zeilen sind keine Freigabe späterer Generationen. Abweichende Jahres-/Softwaregrenzen in Fahrzeugliste unten vorgemerkt. |
| I07 | Direkt anlernen | I 6/42 | Erst 20-poligen Stecker einstecken, dann B bis Dauerton; Status-LED dauerhaft. Pro Sender kurzer Ton/kurzes Erlöschen. Ende B kurz, Doppelton/LED aus. Bestätigt. |
| I08 | Vollständig versus teilweise löschen | I 6/42; W1 18/56 | Beim Einstecken gehaltenes B löscht alle Sender einschließlich Master. I beschreibt nur Gesamtlöschung, W1 zusätzlich Teillöschung mit erhaltenem Master. Methoden in DE/FR ausdrücklich abgegrenzt. |
| I09 | Reichweitentest und Tasterbezeichnung | I 7–8/43–44 | Figur: B=Taster, A=Anschlussstecker. Text zum Verlassen nennt fälschlich Taster A in beiden Sprachen. Fehler direkt beim Diagnoseablauf gekennzeichnet. |
| I10 | Klassischer Magnetkontakt | I 7–9/43–45 | Max. 22 mm, Kleben ab 15 °C, Endfestigkeit nach 24 h, Oberfläche sauber/trocken/fettfrei; Leiterplatte/Deckel nicht beliebig zum Magneten drehen. Nicht auf alle späteren Kontaktvarianten übertragen; Zubehörpaket bleibt offen. |
| I11 | Montageadapter | I 8/44 | 100428 schwarz / 100729 weiß; Abstand und Metallabschirmung beachten. Bestehende WiPro-Zubehörliste bestätigt. |
| I12 | Alter Funk-Gaswarner | I 8/44 | 100759: 10–20 cm Montagehöhe, braun +12 V / weiß Masse. Keine Übertragung auf G.A.S.-connect, G.A.S.-pro oder CO-Sensorik; eigener Prüfdurchlauf folgt. |
| I13 | Zusatz- und Backup-Sirene | I 10/46 | Zusatzsirene Rot→15, Schwarz→16. Backup Rot/Schwarz dauernd versorgt, Weiß positiver Alarm an 15, Blau unbenutzter negativer Eingang isoliert. Der unbelegte pauschale Zusatz „parallel an Pin 16“ entfernt; Unterschiede DE/FR ergänzt. |
| I14 | Zubehörspannung | I 10/46, 17/53 | Zentrale 9–30 V, Sirenenausgang Uin/max. 1 A; Schaltbilder beschriften +12 V. Daraus folgt keine pauschale 24-V-Freigabe jeder Sirene. Einschränkung neben Anschlussbeschreibung ergänzt. |
| I15 | Einbau und Verkabelung | I 10–11/46–47 | Geschützter Innenraum, kurze Leitungen, keine Belastung durch Pedale/Hitze/Scheuern, unbenutzte Enden isolieren. Bestehende Grenzen bestätigt. |
| I16 | 20-polige Tabelle, Pins 2/3 | I 12–15/48–51 | Tabelle: 2 braun NO, 3 grün COM. Universal-/Sprinter-Zeichnungen vertauschen die Farben. Funktion und Farbe nicht zusammenraten; Klärung vor Anschluss erforderlich. Warnung im selben RAG-Abschnitt wie die Tabelle. |
| I17 | Pin 13, französische Abbildung | I 7/43 und 12/48 | FR-Grafik nennt Blinkereingang, Tabellen unbenutzten Universal-Pin 4. Sprach-/Abbildungskonflikt direkt bei Pinbelegung genannt. |
| I18 | Weitere Pins | I 12/48 | Antenne Pin 10 nicht kürzen/aufwickeln, Versorgung Pin 11 abgesichert 10 A, CAN 17/18. Tabelle gilt für diesen WiPro-III-Plan, nicht automatisch für safe.lock-Sets. |
| I19 | Fahrzeugdiagramme | I 13–16/49–52 | Alte Ford-/Ducato-/Iveco-/Master-/Sprinter-/T5-Pläne nur in ihrem Geltungsbereich. Wiederverwendete Sprinter-Abbildung trägt „WiPro all in one“. Keine pauschale Verdrahtungsfreigabe. |
| I20 | CAN-Diagnose | I 11/47 | B kurz; Originalschlüssel oder Warnblinker erzeugt Verkehr, Status-LED reagiert. FR nennt zusätzlich grüne LED, DE nicht; keine allgemeine LED-Farbe ergänzt. |
| I21 | Funktionstest | I 11/47; W1 13/50 | Jeden Sender und jede überwachte Tür einzeln prüfen. 60-s-Verzögerung des Innenlichteingangs nur normale WiPro III; keine allgemeine Verzögerung der Alarmanlage. |
| I22 | Technische Grunddaten | I 17/53; K/L 2 | Zentrale 9–30 V, 11 mA, max. 100 Sender, 868,35 MHz; Handsender-Freifeldreichweite 75 m. Kein Empfangsversprechen für Metall-/Einbauumgebung. |
| I23 | Offene Kontakte nach Stromausfall | I 18/54 | Mehrmals öffnen/schließen übermittelt den Zustand erneut. Stromverlust bedeutet nicht automatisch verlorenes Anlernen. Bestehende Fehlerhilfe bestätigt. |
| I24 | Easy-Add Strompause / Eingabefenster | Q 1; S 30; W1 18–19/56–57 | FAQ ergänzt ca. 10 s stromlos; anschließend innerhalb 30 s fünf Betätigungen. Bedienung legt keine Strompausen-Dauer fest. Kein stiller Widerspruch durch Vermischen beider Zeiten. |
| I25 | Easy-Add Benennung | Q 1; S 30; W1 18–19/56–57 | FAQ nennt beide Zugänge Easy-Add 2.0; Bedienung unterscheidet Handsender 1.0 / CAN 2.0. Dokumentbenennung erklärt; Tasten-/Türabläufe beibehalten. |
| I26 | Vent check | Q 18; S 27; W1 10/47 | FAQ 4 s gegen Bedienung mindestens 5 s; keine belegte Zuordnung zu Softwareständen. Beide Angaben mit offenem Konflikt in DE/FR. |
| I27 | Neun akustische Hinweise | Q 18; S 27; K/L 1 | Neun kurze Töne beim Schärfen bzw. Zündung = offener Kontakt; nicht neun Status-LED-Impulse als Alarmspeicher für Störsender. Neu ausdrücklich unterschieden. |
| I28 | Batteriewarnung | Q 16; S 28; K/L 2 | FAQ: unter 2,6 V, Ton 2 s, Sender-LED 30 s. Faltblatt-Piktogramm: Ton 5 s. W1: langer Ton ohne feste Dauer. Unterschied offen; Diagnose nicht allein aus Tonlänge. |
| I29 | Batterie und Speicherung | Q 16; S 28–29; K/L 2 | Klassischer Handsender/Magnetkontakt/Kabelschleife CR2032; Wechsel löscht Anlernen nicht. FR-Faltblatt schreibt bei Kabelschleife einmal „C2032“; DE und weitere Stellen belegen CR2032. Nicht auf NFC/T.S.A. übertragen. |
| I30 | Originalschlüssel-Blinkzahlen | K/L 1; W1 8–9/45–46 | Kurzfassung 1 beim Schärfen, 2–3 beim Entschärfen; Bedienung fahrzeugabhängig 1–2. Quellenabweichung neben den Tabellen ergänzt. |
| I31 | Panik, Alarmspeicher, Gasalarm | K/L 1–2; W1 13–17/50–55 | Beide Handsendertasten gleichzeitig, LED-Pause 5 s und Alarmcodes bestätigt. Kurzfassung zum Gasalarm weniger differenziert: genaue Trennung Handsender/Originalschlüssel aus W1 bleibt. |
| I32 | App-Referenznummern | Q 19; S 26–27 | 0823-018 / 1050-003 / 0699-012 sind App-Referenzen bei unbekanntem Iststand, keine Aktualisierung. ZV/Easy-Add-3.0-Grenzen 1050-004/5298-001/5458-001 plus Pro-Finder 0699-013 bleiben mit Hardware-/Softwarevorbehalt erhalten. |
| I33 | Upgrade | Q 16–17; S 25–26 | Zentrale einsenden, kein Zubehör/keine Fahrzeugschlüssel; ZV anschließen und Funk-Zubehör neu anlernen. Voraussetzungen und Ablauf in vollständigen FAQ-Abschnitten verfügbar. |
| I34 | Ducato-Softwarekonflikt | S 2–3; bisheriger Wiki-Verlauf | 1050-042: FAQ 7.5.1s, Wiki 7.5.2s; 1050-016: FAQ 7.2s, Wiki 7.1s. Die referenzierten Original-CSV fehlen lokal. In allen vier betroffenen Artikeln pro Sprache als offen gekennzeichnet. |
| I35 | Replay-/Umrüstjahre | S 23–24 | Pauschal 2006–2018, gesonderter Iveco-Hinweis ab 2011 und unterschiedliche 2018/2019-Angaben. Iveco nicht mehr unbesehen derselben Jahresfreigabe zugeordnet; Schlüssel/Modelljahr prüfen. Keine rechtliche/Versicherungszusage abgeleitet. |

## Fahrzeugausnahmen für die anschließende Einzelprüfung

Diese Fundstellen sind geprüftes Dokumentwissen, aber noch keine vollständige Prüfung sämtlicher Fahrzeugartikel, Steckerbilder, Leitungen und aktueller Herstellerfreigaben. Sie werden im Fahrzeugpaket weiterverfolgt, nicht doppelt als erledigt gezählt.

| Fundstelle | Abgrenzung / offene Gegenprüfung |
|---|---|
| I 5/41 gegenüber Q 6–7, 11–12 | Renault-Master-Übergang 2011 in I gegenüber 2010 in Q; nicht aus einer Jahreszahl allein DIP ableiten. |
| Q 5 gegenüber Q 13 | Vito W447: Kompatibilität nennt 0823-014 / 6.2, DIP-Tabelle 0823-013 / 5.6. Interner FAQ-Konflikt, keine verbindliche Mindestversion aus dieser FAQ ableiten. |
| Q 3–4 | Ford 2006–2013 nur mit Doppelverriegelung; 2014–2015 nur THITRONIK-Handsender; 2016–2018 nur ohne Doppelverriegelung; 2019–2024 weitere FordPass-Grenze. Nicht mit safe.lock-Ford-Sets gleichsetzen. |
| Q 6–7 | Master 2010+ bis 6.8: Heck-/Schiebetür nicht mitüberwacht, zusätzliche Kontakte; Originalschlüssel steuert die Alarmanlage nicht. Eine ausgelassene Einschränkung in der 6.9-Zeile beweist nicht ihre Behebung. |
| S 1–3 | Ducato-Facelift 1050-046 / 7.5.3s; ältere 1050-016/-042-Zuordnungen widersprüchlich zum Wiki (I34). Infotainment und Fahrzeugeinstellungen gesondert erfassen. |
| S 3–5, 16–17, 20–22 | Ford 5298-006 / 1.0.1sf versus ältere 5298-001 / 7.4.0.s; neue Schaltersperre nicht deaktivierbar. Allgemeiner FAQ-Satz „ab 2019 deaktivieren“ ist überbreit. Bedienungsmatrix W1 mit Generationstrennung bleibt maßgebliche Darstellung. |
| S 5 | Iveco Daily ab 2018 nennt externe Sirene zwingend; andere Bestandsseiten nennen Modelljahr 2019. Fahrzeug-/Softwarebezug vor Vereinheitlichung klären. |
| S 8–9, 21 | Nach Fahrzeug-Softwareupdates können Blink-/Entriegelungseinstellungen zurückgesetzt sein. Toyota-Proace-Max-Jahreszeile ist kein geprüfter fahrzeughistorischer Nachweis. |
| S 11 | Master-Set 5832-001 / 1.0.0sr für 2019–2024, Steuerung der Alarmanlage mit THITRONIK; nicht mit Standard-WiPro-Masterprofil gleichsetzen. |
| S 12–13, 18 | Crafter/TGE mit Startknopf: ZV-Steuerung ausgeschlossen. Ohne Startknopf individueller Test: Original-Funkschlüssel verriegeln, 8 Minuten warten, mechanisch öffnen; öffnet nur die Fahrertür, keine entsprechende ZV-Unterstützung. |
| S 15–16, 21 | T6.1-Prüfung unterscheidet sich: mechanisch verriegeln, 3 Minuten warten, mechanisch öffnen. Nicht mit dem 8-Minuten-Crafter-Test vermischen. |
| S 19–20 | Knaus auf Crafter und Eura-Mobil/Sprinter: Fahrerhaus und Aufbau können unterschiedlich ver-/entriegeln; Komfortsitze, fehlendes Türmodul und Herstellerumbauten erfordern gesonderte Freigabe. |
| K/L 2 | G.A.S.-connect mit unterem Schalter, vier Minuten Aufwärmphase. Keine Verallgemeinerung auf alle Gas- oder CO-Produkte; Sensorikpaket offen. |

## Umsetzung in Wiki und RAG

- Zehn bestehende Routen geändert: DE/FR jeweils `wipro-iii`, `anlernvorgang`, `fahrzeuge/fiat-ducato-2022-2024`, `fahrzeugkompatibilitaet` und `seriennummern-softwarestaende`. Die sechs zusätzlichen Querverweise tragen nur die bekannten Softwarekonflikte; sie sind nicht als vollständig neu geprüfte Fahrzeugartikel freigegeben.
- Die WiPro-FAQ ist jetzt in einzelne H3-Antworten unterteilt. Der vorher abgeschnittene französische FAQ-Block mit 4.131 Zeichen entfällt; der Warnhinweis zur App-Referenznummer bleibt im selben Abschnitt wie ihre Tabelle. Alle Abschnitte der zehn geänderten Routen liegen unter 4.000 Zeichen, maximal 2.791 Zeichen.
- Der 16.000-Zeichen-Artikelkörper bleibt begrenzt. Vollständige relevante Fachabschnitte werden über den Abschnittsindex geliefert. Das ist keine Behauptung, dass ein langer Artikel immer vollständig im Modellkontext liegt.
- Leere Gliederungsüberschriften werden nicht mehr als Belegquelle gewertet. Exakte Artikelnummern/Serienschwellen wie `106111-002` erhalten auch im Abschnittstext mehr Gewicht; eine Jahreszahl wie 2024 oder eine Softwareversion erhält diesen Zuschlag nicht. Die Änderung ist in beiden Suchkern-Kopien identisch. Anlass war ein bestehender CampLock-Test, dessen passender Abschnitt durch zusätzliche allgemeine WiPro-Überschriften verdrängt wurde.
- Der französische mehrzeilige YAML-Titel der Kompatibilitätsseite wurde semantisch unverändert einzeilig geschrieben, damit der bestehende gezielte Import den Titel korrekt liest. Der Metadatenvergleich bestätigt unveränderte Runtime-Titel, Sichtbarkeit, Typen und übrige Metadaten. `dealerStatus` wurde nicht verändert; vorhandene Differenzen zwischen Frontmatter und Runtime-Sichtbarkeit sind keine neue fachliche Freigabe.
- Die fünf neuen PDF-Kopien dienen als Belege. Ihr gesamter mehrsprachiger Rohtext wurde nicht in die deutschsprachige RAG-Suche geladen.

## Prüfungen und Grenzen

Nach der letzten Änderung bestanden:

- **58/58 WiPro-Belegfälle**: bisher 34 plus 24 neue DE-/FR-Fälle, einschließlich Zeiten, Pinfarben, Sirenenversorgung, Easy-Add, App-/Upgrade-Grenzen, Diagnosebuchstaben und Versionskonflikten.
- **24/24 CampLock-/VanLock-Belegfälle**, **6/6 Produkterkennungsfälle**.
- **179/179 Selbsttests** und **16/16 Kontext-/Suchtests**.
- Versionskonflikt in **8/8 direkt geprüften Artikelkontexten** vorhanden, damit kein Querverweis die Abweichung verschweigt.
- Datenintegrität: 224 Artikel, 2.634 Abschnitte; unveränderte Artikel/Abschnitte außerhalb der zehn Routen, unveränderte Metadaten und Support-Korrekturen, JSON und ausgelieferte Module identisch, Original-Prüfsummen bestätigt.
- Vorher/nachher für 82 allgemeine Goldfragen: erwartete Route jeweils **78/82** im Top-8-Fenster, vollständiger wörtlicher Beleg jeweils **12/82**; keine verlorene Route oder verlorener wörtlicher Beleg. Dies sind Such-/Textmaße, keine 82 geprüften Modellantworten.

Nachweise: [58 Belegfälle](2026-09-28-wipro-installation-retrieval.json), [Datenintegrität und Regression](2026-09-28-wipro-installation-regression.json). Reproduzierbare Fachfälle liegen in `daten/thi-eval-wipro.de.json` und `.fr.json`; Ausführung über `node app/werkzeuge/wipro-belege-pruefen.mjs`. Die lokalen Integritätsprüfungen verwenden zusätzlich die gesicherte Ausgangsfassung dieses Durchlaufs.

Kein Live-Modelltest: der lokale Modellzugang ist nicht konfiguriert. Keine Herstellerklärung oder Geräteprüfung vorgetäuscht. Originaldokumente, noch offene Widersprüche und vorhandene fachliche Freigaben werden nicht durch grüne Suchtests ersetzt. Änderungen dieses Durchlaufs liegen lokal, ohne Commit, Push oder Deployment.

## Offene Herstellerfragen

1. Welche optische Alarmdauer gilt je Geräte-/Softwarevariante: 120 oder 180 Sekunden?
2. Wie sind 4/5 Sekunden beim Vent check und 2/5 Sekunden beim Batteriewarnton einzuordnen? Gibt es belegte Varianten-/Versionsgrenzen?
3. Welche Kabelfarben gelten an Pin 2/3, und welche Funktion hat Pin 13 in der betreffenden FR-Abbildung? Welcher Buchstabe ist im Diagnoseabschluss korrekt?
4. Welche Softwarezuordnungen gelten verbindlich für 1050-016 und 1050-042? Die lokal fehlenden Original-CSV bzw. eine aktuelle Herstellerbestätigung werden benötigt.
5. Welche Fahrzeug-/Schlüsselgrenzen gelten für Vito, Master, Iveco und die Ford-Übergangsmodelle? Wie werden die unterschiedlichen Standzeit-/ZV-Tests den Fahrzeugvarianten zugeordnet?
6. Weiterhin offen aus W0/W1: Sprachabweichungen der Blinksignale und tatsächlicher Zustand nach Abschluss der Teillöschung.

Es wurde keine externe Nachricht versendet. Diese Fragen sind vorbereitet, nicht beantwortet.

## Fortschritt

Der Schritt **„Installation-/FAQ-Abgleich“ erhält 1 von 1 Punkten**. WiPro/safe.lock steht damit bei **10/15 Punkten (rund 67 %)**. Gesamtstand: **30/100 = 30 %** nach dem bestehenden festen Arbeitsplan. Live-Antwortprüfung und verbindliche Herstellerklärung bleiben offen. Der nächste unabhängig bearbeitbare Block ist **Pro-Finder: Befehle, Konfiguration, Rückmeldungen und Versionsgrenzen**.
