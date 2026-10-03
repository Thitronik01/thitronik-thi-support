# Abgleich der bereitgestellten Quellanleitungen (25.09.2026)

## Bestand und aktueller Stand

Der bereitgestellte Ordner `../../Anleitungen/Anleitungen/01_Quellanleitungen/` enthält 47 PDF-Dateien mit 45 unterschiedlichen Inhalten. Die CampLock-Kurzanleitung, die gemeinsame CampLock-/VanLock-Anleitung und der deutsche Katalog wurden bytegleich nach `content/quellen/` übernommen. Die daraus belegten CampLock- und VanLock-Artikel sind in DE und FR aktualisiert und in die App-Wissensdaten synchronisiert.

Von 31 Anleitungseinträgen in `content/anleitungen/anleitungen-und-faq.json` lassen sich 30 über den Dateinamen einem bereitgestellten PDF zuordnen. 24 dieser 31 Textextrakte enden bei genau 12.000 Zeichen. Die Länge ist eine technische Grenze und kein Beleg für vollständige Handbücher. Der dortige Gas-pro-2.5-Eintrag hat in diesem bereitgestellten Ordner keine gleichnamige PDF.

## Nächste Quellenarbeiten

| Priorität | Quelle im bereitgestellten Ordner | Befund und nächster Schritt |
|---|---|---|
| 1 | `WiPro III safe.lock/bedienungsanleitung_wipro_iii_safe-lock.pdf` | Bedienungsanleitung Rev. 1.3, 06/2025, 191 Seiten. Sie fehlt im JSON und in direkten Wiki-Quellenverweisen. Der vorhandene JSON-Eintrag zu Rev. 1.2 (11/2024, 182 Seiten) enthält nur 1.841 Zeichen. Änderungen zwischen beiden Ausgaben prüfen, sicherheits- und funktionsrelevante Kapitel in Wiki und App übernehmen. |
| 2 | `funk-magnetkontakt-wasserdicht-868.pdf`, `funk-wassermelder-868.pdf` | Beide 2026er Anleitungen fehlen im JSON, obwohl DE/FR-Wiki-Artikel sie bereits nennen. Quellen und Artikel auf Vollständigkeit prüfen und belegte Inhalte in die App synchronisieren. |
| 3 | `funk-kabelschleife_868_schwarz.pdf`, `funk-kabelschleife_868_xl_weiss.pdf`, `funk_magnetkontakt_ws.pdf` | Varianten sind in Wiki-Artikeln zitiert, fehlen aber als JSON-Anleitungsextrakte. Relevante Unterschiede je Variante prüfen. |
| 4 | `WiPro III/wipro_iii_upgrade_update_service_2024-de.pdf` | Einseitiges Formular liegt im Ordner zweimal bytegleich vor. Technische Voraussetzungen können historischen Kontext liefern; Preise und Zahlungsdaten von 2024 nur nach aktueller Bestätigung verwenden. |
| 5 | Kataloge | Sieben Katalogdateien fehlen als JSON-Extrakte. Der deutsche Katalog ist wegen des VanLock-Quellenkonflikts bereits unter `content/quellen/` aufgenommen. Französischer und Schweizer Katalog sind bytegleich und können als eine Quelle behandelt werden. |

Bei älteren Wiki-Einträgen zeigen Frontmatter-Verweise auf `sources/*.pdf`, obwohl dieses Verzeichnis im Repo fehlt. Vor einer weiteren Inhaltsübernahme die tatsächlich verfügbaren PDFs mit Seitenbelegen unter `content/quellen/` oder einem gleichwertigen erreichbaren Quellenpfad referenzieren.

## Offener VanLock-Quellenkonflikt

Die gemeinsame Bedienungsanleitung beschreibt VanLock 106259/106260 als Zubehör der WiPro III safe.lock und nennt 219 g sowie 1,7 mA bei 24 V (physische PDF-Seiten 3 und 10). Der deutsche Katalog nennt für dieselben Artikelnummern auch WiPro III sowie 151 g und 0,6 mA bei 24 V (physische PDF-Seite 25). Die Dokumente klären den Unterschied nicht. Kompatibilität und technische Daten vor einer konkreten Installation mit THITRONIK beziehungsweise der dem Gerät beiliegenden Dokumentversion abgleichen.
