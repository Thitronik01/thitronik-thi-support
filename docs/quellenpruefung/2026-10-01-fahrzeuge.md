# Fahrzeuganleitungen und Versionsgrenzen – Quellenprüfung

Stand: 01.10.2026. **Dokumentabgleich und lokale Integration abgeschlossen; fachliche Herstellerfreigabe und Live-Antwortprüfung offen. Gesamtfortschritt: 64 %.**

## Umfang und Nachweis

- 24 zusätzliche, unterschiedliche PDF-Inhalte aus dem Ordner `Anleitungen` mit **128 ausgewählten Originalseiten** textlich und visuell geprüft. Wiederholte Funkzubehör-Anhänge und weitere Sprachfassungen zählen nicht als erneut vollständig geprüft.
- Drei vorhandene Primärquellen wiederverwendet: WiPro-FAQ, safe.lock-FAQ und Installationshandbuch Rev. 1.8. Deren Seiten werden nicht nochmals zu den 128 Seiten addiert.
- **33 Befundgruppen** in der [Aussagenmatrix](2026-10-01-fahrzeuge-aussagen.json). Eine Gruppe kann mehrere zusammengehörige Aussagen enthalten; dies ist keine Zählung unabhängig freigegebener Einzelaussagen.
- **68 Wiki-Routen** aktualisiert: 30 Fahrzeugprofile sowie Fahrzeugübersicht, Versionsregister, Umrüstplatine und WiPro-Upgrade, jeweils DE/FR. Fremde Routen und bestehende Sichtbarkeits-/Artikelmetadaten bleiben gegenüber der Sicherung dieses Durchlaufs unverändert.
- 24 bytegleiche Originalkopien nach `content/quellen/fahrzeug-*.pdf` übernommen; SHA-256 und ausgewählte physische PDF-Seiten im [Quellenmanifest](2026-10-01-fahrzeuge-quellen.json). Die Originaldateien wurden nicht verändert.

Die offiziellen [WiPro-FAQ](https://www.thitronik.de/support/faq-produkte/produkt/wipro-iii/) und [safe.lock-FAQ](https://www.thitronik.de/support/faq-produkte/produkt/wipro-iii-safelock/) wurden ergänzend abgeglichen. Detaillierte Aussagen und Seitenbelege beziehen sich auf die lokalen Primär-PDFs. Widersprüchliche Dokumente werden nicht durch eine unbelegte Vorrangregel aufgelöst.

## Wichtige Korrekturen

| Bereich | Ergebnis und Konsequenz |
|---|---|
| Iveco Euro 5, vollintegriert | Die dritte DIP-Abbildung der Anleitung 01/2026 zeigt **SW1 + SW2 + SW5 + SW6 ON**. SW1 fehlte im Wiki. SW5 bleibt an die Umrüstplatine gebunden; die blaue ZV-Leitung wird bei dieser Variante nicht angeschlossen. |
| VW T5/T5 FL/T6/T6.1 | FAQ ergänzt die bislang im Wiki zu Unrecht verneinten Mindeststände: T5/T5 FL `0823-001 / 2.1`, T6 `0823-012 / 5.1`, T6.1 `0823-019 / 6.8`. Die T6-/T6.1-Angaben schließen DoKa aus. |
| Crafter/MAN TGE 2017–2024 | Standard-WiPro `0823-019 / 6.8`; safe.lock ist ein eigener Zweig `5458-001 / 1.0.0sx`. Standard-Anschlüsse dürfen nicht als safe.lock-Einbauanleitung dienen. Die Fahrzeug-PDF verlangt hier 5 A, nicht den Sprinter-Wert 10 A. |
| Sleep-Tests | Crafter: Funkverriegelung mit Originalschlüssel, **acht Minuten**, mechanisches Öffnen. T6.1 ab Modelljahr 2021: mechanisch verriegeln, **drei Minuten**, mechanisch öffnen. Die Abläufe sind nicht austauschbar. |
| Master III | FAQ `2.1–6.8`: keine CAN-Überwachung von Schiebe-/Hecktür. Ab `6.9` fehlt dieser Vorbehalt; daraus folgt keine bestätigte Überwachung jeder Tür. Jede Tür einzeln prüfen. „New Master“ im älteren Handbuch gibt Master IV nicht frei. |
| Sprinter T1N und Universalanschluss | T1N-Fahrzeugblatt „alle OFF“ nicht mit den alten Universal-Grundlagen SW1–4 OFF vermischen. Universalanschluss belegt weder jede Zentrale noch eine universelle safe.lock-Kompatibilität. |
| Adria Coral/Matrix 2021 | Der Hinweis zu CAN-Alarm etwa alle 15 Minuten ist an die neue Aufbautür gebunden. Die dokumentierte Leitungsmaßnahme erfordert anschließend separate Überwachung durch Funkkontakt; keine allgemeine Stilllegung der Türüberwachung ableiten. |
| Trafic/Talento und Sprinter | Generationen, Stecker und Pin-Nummern getrennt: Trafic 2014 Hupenanschluss versus Trafic 2022, NCV3 X9 Pin 24 statt 25, VS30 MR2 Pin 5 sowie die jeweils dokumentierten CAN-Alternativen. Fahrzeugpin 10 ist nicht WiPro-Pin 10. |
| Magnetkontakt in Fahrzeugartikeln | Die bisher als Montageempfehlung übernommenen 22–30 mm sind korrigiert. Vorläufiger geschlossener Abstand höchstens 22 mm; 22/25-mm-Quellenkonflikt bleibt offen. Größeres Öffnen beim Anlernen ist kein Montageabstand. |
| Umrüstplatine | FAQ PDF 24 erlaubt WiPro III safe.lock **oder Modul 101051** als Gegenstelle. Die bisherige ausschließliche WiPro-Pflicht ist falsch. Die Platine ist weiterhin kein eigenständiges Alarmprodukt. |
| Historische Zeitangaben | 180/120 Sekunden optischer Alarm bleiben ungelöst. Hinweise stehen auch in den einzeln abrufbaren Testabschnitten; Messwerte protokollieren, keine neue pauschale Abnahmegrenze behaupten. |

## Offene Herstellerfragen und Quellenlücken

1. **Ford Deadlock:** Die älteren Fahrzeug-PDFs beschreiben alternative THITRONIK-Bedienung. Die FAQ schließt Standard-WiPro ohne Deadlock beim Transit 2006–2013 bzw. mit Deadlock bei 2016/2019 aus. Aus den alten Bedienwegen folgt keine Freigabe für die ausgeschlossene Variante.
2. **Ford 2019/2024+:** Facelift-PDF `0823-013` gegenüber FAQ `0823-016 / 6.1`. Für 2024+ nennt die FAQ `5298-006 / 1.0.1sf`, der Altbestand `5298-005`. Monatsgrenzen und `5298-008 / 1.0.3sf` sind durch die fehlenden Detailunterlagen nicht neu bestätigt.
3. **Vito W447:** Innerhalb der FAQ widersprechen sich `0823-014 / 6.2` und `0823-013 / 5.6`. Die vollständige Fahrzeuganleitung fehlt im hier geprüften PDF-Bestand.
4. **Ducato:** `1050-016` mit `7.1` gegenüber `7.2s`, `1050-042` mit `7.5.2` gegenüber `7.5.1s`. Die neueren Originalanleitungen fehlen. Beim Ducato 244 widerspricht die allgemeine Vorprüfung der ausdrücklich ausgeschlossenen Originalschlüssel-Bedienung im Funktionstest.
5. **VS30/ILS:** Die Standard-PDF beschreibt vordere digitale Ansteuerung mit 220 Ohm, die FAQ begrenzt die optische Signalisierung auf hinten. Hardware, Ausstattung und Anschlussvariante müssen zugeordnet werden.
6. **Master II/III:** Master-II-Blatt benennt zwei unterschiedliche Steckverbinder als P202; Pin 36 am grünen Einsatz nicht durch eine erfundene Umbenennung korrigieren. Master-III-Türüberwachung ab 6.9 gesondert bestätigen.
7. **Iveco:** Hupenjahresgrenzen überlappen 2017/2019. Die Farbnotiz ab 2025 gibt keine neue gesamte Fahrzeuggeneration frei.
8. **safe.lock-Upgrade:** Rev. 2.0 verlangt drei zusätzliche Leitungen: Pin 20 blau, Pin 19 blau/schwarz und Pin 16 weiß/schwarz. Das Serviceformular 2024 nennt zwei Leitungen. Die Servicegrenze `0823-019` nicht als generelles technisches Upgrade-Verbot älterer Geräte auslegen; Umfang und Gerätestand bestätigen lassen.
9. **Umrüstplatine:** Anleitung 2006–2012 gegenüber FAQ 2006–2018 und Iveco ab 2011. Genaue Schlüsselzuordnung erforderlich; die englische Frequenzangabe „86835MHz“ enthält zudem einen fehlenden Dezimaltrenner.
10. **Übergreifende Konflikte:** Optische Alarmdauer 120/180 Sekunden, Lüftungswartezeit 4/5 Sekunden und Magnetabstand 22/25 mm bleiben den bereits offenen Herstellerfragen zugeordnet.

Sieben Fahrzeugprofile besitzen keine vollständig neu geprüfte fahrzeugspezifische Primäranleitung: Ducato 2012–2021, 2022–2024 und 2024+, Ford 2024+, Vito W447, Master 2019 safe.lock sowie Crafter/MAN TGE ab 2025. Die vorhandenen Wiki-Alttexte wurden als solche abgegrenzt; fehlende Dateien wurden nicht rekonstruiert. Auch die geprüften Standard-PDFs für VS30 und Crafter 2017–2024 ersetzen keine fehlenden safe.lock-Set-Anleitungen. Eine FAQ-Mindestversion bestätigt nicht automatisch jeden darin nicht beschriebenen Anschluss.

Keine Herstelleranfrage wurde versendet. Diese Fragen sind dokumentiert, nicht verbindlich geklärt.

## Integration und Prüfergebnis

Die begrenzte Synchronisierung erfolgt mit `app/werkzeuge/fahrzeuge-wiki-sync.mjs`; anschließend wurden die ausgelieferten JSON- und MJS-Daten neu gebaut. `daten/fahrzeug-matrix.json` enthält die Fahrzeugauswahl, keine DIP-/Firmwaretabelle, und wurde in diesem Paket nicht verändert. Bestehende Korrekturen und der Laufzeitkern bleiben gegenüber der Sicherung unverändert.

| Prüfung | Ergebnis |
|---|---|
| Neue DE-/FR-Fahrzeugfälle | **84/84**, einschließlich Versionsgrenzen, Pin-Zuordnung, Negationen, Quellenlücken und kompatibler Gegenstelle der Umrüstplatine |
| Vorherige Paketfälle | **320/320**: Camp/Van 24, WiPro 58, Pro-Finder 58, Gas 80, Funk 100 |
| Selbsttests | **179/179** |
| Kontext-/Sprach-/Importmodule | **19/19** |
| Fingerprint-Erkennung | **6/6** |
| Allgemeiner Katalog, 82 Fragen | Erwarteter Artikel in Top 8 unverändert **77 → 77** |
| Historische Literalbelege | Strikt **11 → 10**, leerzeichennormalisiert **15 → 14**; eine begründete Quellkorrektur, siehe unten |
| Integrität | 224 Artikel / 2837 Sektionen; nur die 68 vorgesehenen Routen verändert, vorhandene Anker und Artikelmetadaten bewahrt, Originalhashes geprüft, JSON und MJS identisch |

Die neue Belegprüfung verlangt einen erwarteten Artikel unter den ersten drei Treffern, die Pflichtangaben im tatsächlich zusammengestellten Artikelkontext und einen passenden Abschnittsanker. Sie bewertet **keine generierte Modellantwort**. Die 84 neuen und 320 bestehenden Fälle sind damit **404 lokale Belegfälle**, keine Quote vollständig fachlich richtiger Bot-Antworten.

Die französische Altfrage `safe-lock-platine-kein-standalone-03` erwartete wörtlich, dass die Platine ausschließlich WiPro ergänzt. Diese falsche Exklusivität wurde gemäß FAQ PDF 24 entfernt. Die historische Frage und ihr gesunkener Literalwert bleiben im Vergleich erhalten; der aktuelle Kontext wird zusätzlich auf fehlende Eigenständigkeit **und** die kompatible Gegenstelle 101051 geprüft. Dies ist eine dokumentierte fachliche Korrektur, keine stillschweigend gelockerte Erfolgsmetrik.

Einige lange Gesamtartikel erreichen die bestehende Körpertextgrenze. Ihre Einzelabschnitte bleiben vollständig unter der Sektionsgrenze von 4000 Zeichen; der Integritätslauf prüft dies sowie den Erhalt aller vorherigen Anker. Suchkern und Kontextbudget wurden für diesen Block nicht verändert.

Nachweise: [Belegfälle](2026-10-01-fahrzeuge-retrieval.json), [Integrität und historischer Vergleich](2026-10-01-fahrzeuge-regression.json), [Quellenmanifest](2026-10-01-fahrzeuge-quellen.json), [Aussagenmatrix](2026-10-01-fahrzeuge-aussagen.json).

## Geprüfte zusätzliche PDFs

Seitenzahlen sind physische, einsbasierte PDF-Seiten. Vollständige Dateipfade und Hashes stehen im Manifest.

| Quelle | Dokumentstand | Ausgewählte Seiten |
|---|---|---|
| [adria-2021](../../content/quellen/fahrzeug-adria-2021.pdf) | 08/21 | 1–2 |
| [ducato-244](../../content/quellen/fahrzeug-ducato-244.pdf) | 12/20 | 1–7 |
| [ducato-x250](../../content/quellen/fahrzeug-ducato-x250.pdf) | 12/20 | 1–7 |
| [talento-trafic-2014](../../content/quellen/fahrzeug-talento-trafic-2014.pdf) | 05/22 | 1–5 |
| [ford-2019](../../content/quellen/fahrzeug-ford-2019.pdf) | 12/20 | 1–7 |
| [ford-2006](../../content/quellen/fahrzeug-ford-2006.pdf) | 12/20 | 1–5 |
| [ford-2014](../../content/quellen/fahrzeug-ford-2014.pdf) | 12/20 | 1–5 |
| [ford-2016](../../content/quellen/fahrzeug-ford-2016.pdf) | 12/20 | 1–5 |
| [iveco-euro4](../../content/quellen/fahrzeug-iveco-euro4.pdf) | 12/20 | 1–6 |
| [iveco-euro5](../../content/quellen/fahrzeug-iveco-euro5.pdf) | 01/2026 | 1–6 |
| [sprinter-ncv3](../../content/quellen/fahrzeug-sprinter-ncv3.pdf) | 06/21 | 1–9 |
| [sprinter-t1n](../../content/quellen/fahrzeug-sprinter-t1n.pdf) | 12/20 | 1–2 |
| [sprinter-vs30](../../content/quellen/fahrzeug-sprinter-vs30.pdf) | 03/23 | 1–10 |
| [master-iii](../../content/quellen/fahrzeug-master-iii.pdf) | 04/25 | 1–6 |
| [master-ii](../../content/quellen/fahrzeug-master-ii.pdf) | 12/20 | 1–7 |
| [trafic-2022](../../content/quellen/fahrzeug-trafic-2022.pdf) | 08/22 | 1–6 |
| [crafter-2017](../../content/quellen/fahrzeug-crafter-2017.pdf) | 07/2025 | 1–7 |
| [t5](../../content/quellen/fahrzeug-t5.pdf) | 12/20 | 1–6 |
| [t5-facelift](../../content/quellen/fahrzeug-t5-facelift.pdf) | 12/20 | 1–5 |
| [t6-t61](../../content/quellen/fahrzeug-t6-t61.pdf) | 12/20 | 1–6 |
| [safelock-upgrade](../../content/quellen/fahrzeug-safelock-upgrade.pdf) | 2.0 | 1, 2, 4 |
| [iveco-zv](../../content/quellen/fahrzeug-iveco-zv.pdf) | ohne sichtbare Revision | 1–1 |
| [safelock-platine](../../content/quellen/fahrzeug-safelock-platine.pdf) | 1.3 | 1, 2, 4, 12 |
| [update-service-2024](../../content/quellen/fahrzeug-update-service-2024.pdf) | 2024 | 1–1 |

## Fortschritt und nächster Block

Fahrzeugpaket: **10/15 Punkte (rund 67 %)** für Quellen-/Aussagenmatrix 5, DE/FR-Integration 3 und lokale Belegtests 2. Live-Modellprüfung 2 und Herstellerklärung einschließlich fehlender Detailquellen 3 bleiben offen. Im unveränderten Gesamtplan steigt der Stand damit von **54 % auf 64 %**. Das ist Projektfortschritt, keine fachliche Freigabequote.

Nächster unabhängiger Block: abschließender Gesamtvergleich und Importqualität. Insbesondere den Vollimporter auf den Erhalt von SMS-Steuerzeichen, Pin-/Versionsangaben und Negationen absichern, anschließend produktübergreifende Lücken prüfen und die Live-Antwort-Evaluation vorbereiten.

Alle Änderungen dieses Durchlaufs liegen lokal; kein Commit, Push oder Deployment ausgeführt.
