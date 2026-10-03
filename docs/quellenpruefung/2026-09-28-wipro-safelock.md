# WiPro III / safe.lock – Bedienungsprüfung DE/FR

Stand: 28.09.2026. **Dokumentengestützter Abgleich, keine Gerätefreigabe.**

**Fortsetzung desselben Tages:** Der nachfolgend noch offene Installations-/FAQ-Abgleich ist inzwischen [separat dokumentiert](2026-09-28-wipro-installation-faq.md). Der historische Stand dieses Bedienungsberichts bleibt nachvollziehbar; aktueller Gesamtfortschritt **30 %**, WiPro **10/15 Punkte**, 58 lokale WiPro-Belegfälle. Herstellerklärung und Live-Modelltests sind weiter offen.

Die deutschen und französischen Bedienungsteile von Revision 1.2 und 1.3 wurden als gerenderte PDF-Seiten gelesen und miteinander sowie mit den Wiki-Artikeln verglichen. Bestätigte Ergänzungen und ausdrücklich benannte Konflikte sind lokal in acht Wiki-/RAG-Routen übernommen. Die Installationsanleitung, Kurzfassungen und FAQ-Dokumente sind damit noch nicht vollständig gegengeprüft. Andere Sprachfassungen sind nicht als fachlich geprüft gezählt.

## Quellen und Seitenzuordnung

Alle folgenden Seitenzahlen bezeichnen **physische PDF-Seiten**, nicht die aufgedruckte Kapitelzählung. Das französische Kapitel ist länger als das deutsche; ein einheitlicher Seitenoffset wäre falsch.

| Kürzel | Unveränderte Originalkopie | Dokumentstand | Visuell gelesener Sprachumfang |
|---|---|---|---|
| W0 | [Bedienungsanleitung Rev. 1.2](../../content/quellen/wipro-iii-safelock-bedienung-rev1.2.pdf) | 11/2024, 182 PDF-Seiten | DE 2–19, FR 38–56, globales Titelblatt 1 |
| W1 | [Bedienungsanleitung Rev. 1.3](../../content/quellen/wipro-iii-safelock-bedienung-rev1.3.pdf) | 06/2025, 191 PDF-Seiten | DE 2–20, FR 39–58, globales Titelblatt 1 |

Damit wurden **76 Sprachseiten einschließlich Sprachdeckblättern und Inhaltsverzeichnissen** sowie zwei globale Deckblätter gesichtet. Das ist keine Aussage darüber, dass alle 373 PDF-Seiten beider Dateien fachlich geprüft wären. Die überwiegend bildbasierten Seiten wurden nicht anhand der sehr dünnen Textebene freigegeben.

- W0 SHA-256: `b275b6e76b6dc6d8b6d008ffa3eb18f7f72d1d4b059562239d5dc2ce3cae3e01`
- W1 SHA-256: `5976e52fecff6c77e19741be092299c4185c405eaa8547fb54636c6b8f781547`
- Original W0 relativ zum Anleitungen-Ordner: `Anleitungen/01_Quellanleitungen/WiPro III/wipro_iii_safe-lock_bedienungsanleitung_zehn_sprachen.pdf`; bytegleiche Dublette unter `Anleitungen/de/`.
- Original W1: `Anleitungen/01_Quellanleitungen/WiPro III safe.lock/bedienungsanleitung_wipro_iii_safe-lock.pdf`.
- Die kopierten PDFs wurden nicht neu gespeichert oder per OCR verändert. Prüfsummen stimmen mit dem Inventar überein.

## Aussagenmatrix

„Bestätigt“ bedeutet Übereinstimmung der hier benannten Dokumentstellen. Es bedeutet weder Messung am Gerät noch verbindliche Herstellerklärung. Seitenpaare sind jeweils **DE / FR**.

| Nr. | Aussage / Prüffrage | W0 PDF-S. | W1 PDF-S. | Ergebnis und Behandlung |
|---|---|---|---|---|
| W01 | Revision und Sprachgrenzen | 1–2, 38 | 1–2, 39 | Stand anhand Titelblättern; W1-FR beginnt auf 39, nicht 40 |
| W02 | Sprinter: Nach Originalschlüssel-Verriegelung kein THITRONIK-Entriegeln | 5 / 41 | 5 / 42 | Bestätigt; bestehende Einschränkung bleibt |
| W03 | Sprinter-Warnton ab 1.2.0sx: zehn kurze schnelle Töne plus schnelle Fahrzeugblinker | fehlt / fehlt | 5 / 42 | Neu in W1; DE/FR ergänzt, vom Status-LED-Alarmcode 10 unterschieden |
| W04 | Sprinter Camping mit THITRONIK; Originalschlüssel danach möglich; Auto-Close inaktiv; langes Parken ohne Nachladen mit Originalschlüssel/Sleep Mode | 5 / 41 | 5 / 42 | Bestätigt; keine pauschale Empfehlung für jede Parksituation |
| W05 | Ford: deaktivierbare Schaltersperre bei Transit 2019–2024 / Custom bis 2023 | allgemein 2019+ auf 5 / 41 | 6 / 43 | W1 differenziert Modellgenerationen; Jahresüberlappung bleibt offen |
| W06 | Transit 2024+ / Custom 2023+: Schaltersperre nicht deaktivierbar; THITRONIK nach Originalverriegelung gesperrt | fehlt / fehlt | 6 / 43 | Neu in W1; Camping-Bedienweg und Auto-Close ergänzt |
| W07 | VW T: ZV bei geschlossener Fahrertür möglich, Schärfung erst nach Schließen aller Fahrzeugtüren | 5 / 42 | 6 / 43 | Bestätigt; Verriegelung und Alarmzustand nicht gleichsetzen |
| W08 | Freizeitfahrzeuge, nur überwachte Öffnungen; Alarm meldet, verhindert keinen Einbruch | 6 / 42 | 7 / 43–44 | Bestätigt; vorhandenen Geltungsbereich erhalten |
| W09 | Originalschlüssel: fahrzeugabhängig 1–2 Blinkimpulse beim Schärfen UND Entschärfen; Pieper 1 bzw. 2 | 7–8 / 43–44 | 8–9 / 45–46 | Wiki-Werte 1 bzw. 2–3 korrigiert; Blinker von Pieper getrennt |
| W10 | Standard-Handsender: beliebige Taste schaltet; Lautsprecher mit Ton, durchgestrichener Lautsprecher lautlos | 7 / 43 | 8 / 45 | Bestätigt; Standard kann auch bei offenen Fahrzeugtüren scharf schalten |
| W11 | safe.lock-Handsender koppelt ZV und Alarmzustand; Blinkzahl bei Lautsprecher-Schärfung | 8 / 44 | 9 / 46 | DE 1, FR 1–2: Sprachkonflikt ausdrücklich benannt, keine Fehlerdiagnose nur aus Blinkzahl |
| W12 | Panikalarm: beide Tasten gleichzeitig, beliebige Taste beendet, auch unscharf möglich | 9 / 45 | 10 / 47 | Bestätigt; Pro-Finder-Zielnummern/Anrufverhalten bleiben separat zu prüfen |
| W13 | Vent check bei Verriegelung ODER Zündung; offener Funkkontakt hindert übrige Überwachung nicht | 9 / 45 | 10 / 47 | Verriegelungsfall und Lautlos-Bedienung ergänzt |
| W14 | Fenster schließen löst keinen Alarm aus, erneutes Öffnen nach mindestens fünf Sekunden löst aus | 9 / 45 | 10 / 47 | DE/FR belegt; Vier-Sekunden-Angaben in Fahrzeugtexten als Abweichung vorgemerkt, im Sprinter-Abschnitt benannt |
| W15 | Langer Dauerton beim Senderbetätigen = schwache Batterie; betroffener Sender rote LED 30 Sekunden | 10 / 46 | 11 / 48 | Wiki unterschied bisher nicht zuverlässig kurzen Bestätigungston und Batteriewarnung; präzisiert |
| W16 | Batterieaustausch erfordert kein neues Anlernen; nichtflüchtiger Speicher | 10–11 / 46–47 | 11–12 / 48–49 | Bestätigt |
| W17 | Klassischer Handsender/Magnetkontakt/Kabelschleife CR2032; Polung und ESD beachten | 10–11 / 46–47 | 11–12 / 48–49 | Bestätigt; nicht auf wasserfeste Sondervarianten übertragen |
| W18 | Kabelschleifengehäuse zum Batteriewechsel öffnen | 11 / 47 | 12 / 49 | DE zwei Schrauben an Unterseite, FR eine Schraube hinten: Sprachkonflikt; gerätespezifische Zubehöranleitung nachprüfen |
| W19 | NFC: drei AAA-Alkaline LR03, jährlich und vor Wintereinsatz; Tags bleiben gespeichert | 11 / 47 | 12 / 49 | Bestätigt und ergänzt |
| W20 | Anti-Jamming erkennt Funkstörungen; Umgebung kann ungewollte Alarme verursachen | 12 / 48 | 13 / 50 | Bedienungsbeschreibung bestätigt; Abschalt-/DIP-Anleitung nicht neu freigegeben |
| W21 | 60 Sekunden am Innenbeleuchtungseingang nur Standard-WiPro, ausdrücklich nicht safe.lock | 12 / 48 | 13 / 50 | Fehlende Variantenbegrenzung im Wiki ergänzt; andere Öffnungen sofort gesichert |
| W22 | Einbruch: Sirene/fahrzeugabhängige Hupe 30 Sekunden; optisch im Detail 180 Sekunden | 12 / 48 | 13 / 50 | Akustik bestätigt; 120/180-Konflikt direkt an Tabelle dokumentiert |
| W23 | Allgemeines Einsatzkapitel nennt optisch 120 Sekunden | 6 / 42 | 7 / 43 | Widerspruch bereits in W0, nicht durch neuere Revision gelöst |
| W24 | Nach Einbruchalarmzyklus 30 Sekunden Alarmpause; Anlage bleibt scharf | 12 / 48 | 13 / 50 | Bestätigt und ergänzt |
| W25 | Gasalarm wirkt scharf und unscharf, akustisch mit Unterbrechungen; Wiederholung bei fortbestehender Ursache | 13 / 49 | 14 / 51 | Bestätigt; kein Beleg, dass Quittierung die Gasursache beseitigt |
| W26 | Gasalarm mit Originalschlüssel: bei zuvor unscharfer Anlage erst schärfen, dann entriegeln | 13 / 49 | 14 / 51 | DE Kap. 1.10.2 eindeutig Gasalarm; FR falsche Überschrift „intrusion“, Zuordnung im RAG korrigiert |
| W27 | Gasalarm per Handsender: beliebige Taste; safe.lock entriegelt; keine vorgelagerte Schärfung vorgeschrieben | 14 / 50 | 15 / 52 | Von Originalschlüsselablauf getrennt |
| W28 | Gaswarner braucht Verbindung/Appairage zur WiPro; eigenständige G.A.S.-pro III löst sonst nur selbst aus | 14 / 51 | 15 / 53 | Bestätigt; Gas-/CO-Produktfamilie bleibt eigener Prüfblock |
| W29 | Lage der Gaswarner-Bedientaste | 14 / 51 | 15 / 53 | G.A.S.-pro III: DE oben, FR unten; Funk-Gaswarner DE schmale Seite, FR unten. Im Zubehörblock an Einzelanleitung prüfen |
| W30 | Kabelschleife kann scharf/unscharf eingesetzt werden; uneingesetzt kein Kontakt-offen-Signal | 14 / 52 | 15 / 54 | Bestätigt; Einbruchauslösung nur im entsprechenden Alarmzustand verstehen |
| W31 | NFC schaltet lautlos mit angelerntem Tag; Back-up-Sirene reagiert auch auf Versorgungsausfall | 15 / 52 | 16 / 54 | Bestätigt; Zubehör-Einbau/Service separat |
| W32 | Alarmspeicher: lang + zweimal kurz beim Entschärfen; vor erneuter Betätigung LED lesen; nächstes Schärfen löscht | 16 / 53 | 17 / 55 | Löschzeitpunkt ergänzt und von Batteriewarnung getrennt |
| W33 | LED-Codes mit 5-s-Pause: 1 CAN-Türen, 2 Magnet, 3 Funk-Gas/G.A.S.-pro III/CO, 4 Schleife, 5 G.A.S.-pro, 8 Panik, 9 Jamming, 10 Pro-Finder, 11 Innenlicht | 16 / 53 | 17 / 55 | Alle neun Zuordnungen DE/FR abgeglichen; keine Codes 6/7 erfunden |
| W34 | Easy-Add 1.0: nach Spannungswiederkehr in 30 s fünfmal Lautsprecher, danach Zubehör auslösen und Spannungswechsel zum Ende | 17 / 54 | 18 / 56 | Bestätigt; pauschale „10 Sekunden Strom aus“ hier nicht belegt und aus Ablauf entfernt |
| W35 | Teillöschung: erste/master Fernbedienung, fünfmal durchgestrichener Lautsprecher in 30 s; nur Master bleibt | 17 / 54 | 18 / 56 | Ablauf bestätigt; widersprüchlicher Schlusssatz „im Anlernmodus“ nach letztem Spannungswechsel bleibt Klärpunkt |
| W36 | Easy-Add 2.0: Fahrertür fünfmal in 30 s; CAN kann nicht löschen | 18 / 55 | 19 / 57 | Bestätigt |
| W37 | Easy-Add 3.0: passende Pro-Finder-Software oder Vernetzungsmodul, App/SMS/Bluetooth ohne Stromunterbrechung | 18 / 55 | 19 / 57 | Bestätigt; keine nicht genannte Software-Untergrenze ergänzt |
| W38 | Zentrale 9–30 V, ca. 11 mA, Sirenenausgang Uin/1 A, Blinker 60 W, 100 Sender, 868,35 MHz, −10 bis +80 °C | 19 / 56 | 20 / 58 | DE/FR tabellarisch bestätigt |
| W39 | Sender <10 mW, Freifeld 75 m, CR2032, ca. zwei Jahre, −10 bis +60 °C | 19 / 56 | 20 / 58 | Bestätigt; Freifeldreichweite nicht garantierte Einbaureichweite |
| W40 | FR Inhaltsverzeichnis und deutsche Resttexte | 39–40 | 40–41 | W1 enthält „Fehler! Textmarke nicht definiert.“ und veraltete Seitenverweise; keine fachlichen Fakten daraus abgeleitet |

## Übernahme in die Wissensbasis

- `wipro-iii` DE/FR: Originalschlüssel-Signale, Variantenbegrenzung der 60 Sekunden, Batterie-/Alarmunterscheidung, NFC-Batterien, Alarmspeicher-Löschung, getrennte Gasalarm-Bedienwege, Ford/Sprinter/VW-Hinweise und Quellenkonflikte.
- `anlernvorgang` DE/FR: belastbare Seitenbelege, keine unbelegte feste Unterbrechungsdauer, Widerspruch beim Abschluss der Teillöschung.
- `fahrzeuge/ford-transit-2024plus` DE/FR: nicht deaktivierbare Schaltersperre und überlappende Jahresgrenzen direkt im Campingabschnitt.
- `fahrzeuge/mercedes-sprinter-vs30` DE/FR: Softwaregrenze und Zehnfach-Warnton in eigenem kurzen Abschnitt; 4-/5-Sekunden-Abweichung direkt im Prüfablauf.

`wipro-wiki-sync.mjs` synchronisiert nur diese acht bestehenden Routen. Der vorhandene Fingerprint-Sync nutzt nun denselben Parser und bleibt unverändert ausführbar. Sichtbarkeiten, sonstige Metadaten und andere Routen werden erhalten; gemischte Abschnittssichtbarkeiten oder besondere Händlerfelder führen zum Abbruch. Die vorhandene Abweichung zwischen FR-Frontmatter `dealerStatus: internal_only` und Runtime `visibility: standard` wurde nicht als neue Freigabe interpretiert oder umklassifiziert; sie gehört in die abschließende Import-/Berechtigungsprüfung.

Die bisherigen Importgrenzen von 16.000 Zeichen pro Artikel und 4.000 pro Abschnitt bleiben bestehen. WiPro und Sprinter sind länger; der vollständige geprüfte Fachabschnitt wird über den Abschnittsindex in den Kontext geholt. Eine FR-FAQ-Sektion überschreitet weiterhin 4.000 Zeichen (4.131); dieser ältere, hier nicht vollständig geprüfte FAQ-Import ist offen. Deshalb keine pauschale Vollständigkeitsfreigabe des WiPro-Artikels.

## Lokale Verifikation

Die Belegfälle prüfen den ausgelieferten MJS-Bestand mit `searchWiki`, `searchSections` und dem tatsächlich verwendeten `artikelKontext`. Keine Modellantwort wurde dabei erzeugt oder fachlich bewertet. Fall-/Admin-Gewichtung und individuelle Korrekturzustände sind nicht Bestandteil dieses isolierten Grundbestandslaufs.

- 34 WiPro-Fälle, je 17 DE/FR: erwartete Route in den ersten drei Treffern, verlinkbarer Abschnitt und erforderliche Aussagen im Kontext.
- 24 vorhandene Camp-/Van-Belegfälle als Regression.
- 179 vorhandene Selbsttests sowie 9 Kontext- und 5 neue Sprachsuchtests.
- Fingerprint-Sync (10 Routen) und WiPro-Sync (8 Routen) ohne Drift.

Beim Erstlauf bestanden 30/34 Belegfälle. Ein Fall hatte lediglich eine grammatisch abweichende Testerwartung („durchgestrichenen Lautsprechers“ statt des Tastenlabels „Durchgestrichener Lautsprecher“). Drei echte Kontextprobleme wurden durch präzisere Abschnittsüberschriften, einen eigenen kurzen Sprinter-Warntonabschnitt und französische Suchnormalisierung behoben. Französische Elisionen mit geraden/typografischen Apostrophen werden nun gleich behandelt; häufige französische Fragewörter verdrängen die Sachbegriffe nicht mehr. Das deutsche Fachwort „Quelle“ bleibt ausdrücklich suchbar. An den Modell-Kontextbudgets wurde nichts vergrößert.

Reproduzierbare Aufrufe ab Repositorywurzel:

```text
node app/werkzeuge/wipro-wiki-sync.mjs --check
node app/werkzeuge/fingerprint-wiki-sync.mjs --check
node app/netlify/functions/lib/tests.mjs
node --test app/netlify/functions/lib/kontext.test.mjs app/netlify/functions/lib/search-sprache.test.mjs
node app/werkzeuge/fingerprint-belege-pruefen.mjs
node app/werkzeuge/wipro-belege-pruefen.mjs --ergebnis docs/quellenpruefung/2026-09-28-wipro-retrieval.json
```

Ergebnisse: [WiPro-Belegtests](2026-09-28-wipro-retrieval.json) und [Datenintegrität/Regression](2026-09-28-wipro-regression.json). Im zusätzlichen Vergleich von 82 allgemeinen Goldfragen liegt die erwartete Route vorher und nachher bei 78 Fragen im Top-8-Fenster, ohne verlorene Route. Vollständige wörtliche Belege steigen von 7 auf 12. Ein alter französischer Vent-check-Beleg wird nach der Umformulierung nicht mehr wortgleich gefunden; der neue Kontext enthält weiterhin die entscheidenden mindestens fünf Sekunden und die erneute Alarmauslösung (separater Belegfall bestanden). Das sind Such-/Textmaße, keine 78 oder 82 fachlich bestandenen Antworten.

Andere Artikel-/Abschnittsrouten und Metadaten der acht bearbeiteten Artikel sind gegenüber der lokalen Ausgangsbasis unverändert; beide Korrekturdateien sind bytegleich. Original-PDFs und Kopien haben die inventarisierten Hashes. Der Live-Modellzugang ist lokal weiterhin nicht konfiguriert; eine bestandene Suche zählt nicht als bestandene Antwortprüfung.

## Offene Klärungen und nächster Durchlauf

1. **Hersteller:** Welche optische Alarmdauer gilt je Geräte-/Softwarevariante? 120 und 180 Sekunden stehen in beiden Revisionen, jeweils auch DE/FR.
2. **Hersteller/Einzelanleitungen:** safe.lock-Blinkzahl DE 1 vs. FR 1–2, Kabelschleife zwei Schrauben unten vs. eine hinten, Gaswarner-Bedientaste oben/seitlich vs. unten.
3. **Hersteller:** Zustand nach letztem Spannungswechsel bei Teillöschung und Zuordnung der überlappenden Ford-Jahrgänge.
4. **Fahrzeug-/Installationsabgleich:** Vier-/Fünf-Sekunden-Angaben zum Vent check und 120-/180-Sekunden-Angaben im restlichen Wiki systematisch abgleichen. Andere Fahrzeugartikel sind noch keine geprüften Ausnahmen.
5. **Noch unabhängige Arbeit:** WiPro-Installationsanleitung, Kurzfassungen und FAQ mit dieser Bedienungsmatrix abgleichen; verbleibende Importkürzungen prüfen. Danach Pro-Finder-Befehle und Versionsgrenzen bearbeiten.
6. **Live-Evaluation:** Die 34 Goldfälle mit konfiguriertem Modell ausführen und die Antworten einschließlich Quellen-/Konfliktbehandlung beurteilen.

Es wurde keine Herstelleranfrage versendet. Die Änderungen dieses Durchlaufs liegen lokal, ohne Commit, Push oder Deployment.

## Fortschrittsbuchung

WiPro/safe.lock: **9 von 15 Punkten**. Davon Bedienungs-Aussagenmatrix 4, DE/FR-Integration 3, lokale Belegtests 2. Offen: Installations-/FAQ-Gegenprüfung 1, Live-Antworttest 2, verbindliche Herstellerklärung 3. Das konkretisiert das bestehende 15-Punkte-Paket, ohne dessen Gewicht zu ändern.

Zusammen mit den bisherigen 20 Punkten ergibt das **29 % Gesamtfortschritt**. Die Zahl misst erledigte Arbeitsschritte, nicht den Prozentsatz fachlich garantierter Bot-Antworten.
