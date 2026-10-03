# Quellenprüfung: Berichte und offene Schritte

Stand: 03.10.2026. Der feste Prüfplan ist zu **71 von 100 Punkten** abgeschlossen.
Die Prozentzahl misst erledigte Arbeitsschritte, nicht die Antwortgenauigkeit.

## Aktueller Einstieg

| Dokument | Zweck |
|---|---|
| [Projektfortschritt](../10_RAG_PRUEFFORTSCHRITT.md) | Gewichtung und Abschlusskriterien aller Pakete |
| [Prüfplan als JSON](projektfortschritt.json) | Verbindliche 100-Punkte-Basis |
| [Hersteller- und Live-Prüfung](2026-10-02-hersteller-live.md) | Jüngster Ausführungsstand, 408 Belegfälle, fehlender Modellzugang |
| [Herstellerfragen](2026-10-02-herstelleranfrage.md) | 47 vorbereitete Fragen; noch nicht versendet oder beantwortet |
| [Quellenpflege](2026-10-02-quellenpflege.md) | Pfadbereinigung, Herkunftsnachweise und verbleibende Quellenlücken |
| [PDF-Register](../11_QUELLENREGISTER.md) | 81 unveränderte PDF-Kopien mit Hashes und Seitenzahlen |
| [Gesamtvergleich](2026-10-02-gesamtvergleich.md) | Importprüfung und historische Regressionen vor der Herstellerhinweis-Ergänzung |

## Produktpakete

| Paket | Fachlicher Prüfbericht |
|---|---|
| CampLock / VanLock | [Fingerprint](2026-09-28-camplock-vanlock.md) |
| WiPro / safe.lock | [Bedienung](2026-09-28-wipro-safelock.md), [Installation und FAQ](2026-09-28-wipro-installation-faq.md) |
| Pro-Finder | [Pro-Finder](2026-09-28-profinder.md) |
| G.A.S. / CO | [Gas und Sensorik](2026-10-01-gas.md) |
| Funk-Zubehör | [Funk, Magnetkontakt und Wasser](2026-10-01-funk.md) |
| Fahrzeuge | [Fahrzeuge und Versionsgrenzen](2026-10-01-fahrzeuge.md) |

Die datierten JSON-/CSV-Dateien sind Nachweise des jeweiligen Laufs und bleiben
erhalten. Frühere Zahlen wie 404 Fälle beschreiben den damaligen Stand; nach der
CampLock-/VanLock-Hinweisergänzung sind es 408. Sie sind keine Live-Antwortnoten.
Lokale Backups, Logdateien und Modell-Rohantworten werden nicht versioniert.

## Die verbleibenden 29 Punkte

| Paket | Herstellerklärung | Live-Antwortprüfung | Gesamt |
|---|---:|---:|---:|
| CampLock / VanLock | 3 | 2 | 5 |
| WiPro / safe.lock | 3 | 2 | 5 |
| Pro-Finder | 3 | 2 | 5 |
| G.A.S. / CO | 2 | 1 | 3 |
| Funk-Zubehör | 2 | 1 | 3 |
| Fahrzeuge / Versionen | 3 | 2 | 5 |
| Produktübergreifende Live-Prüfung und Abnahme | – | 3 | 3 |
| **Summe** | **16** | **13** | **29** |

Für die Herstellerklärung fehlen verbindliche Antworten mit Artikel-/Versionsbezug
und Beleg sowie relevante Originalanleitungen. Danach müssen die Ergebnisse in
DE und FR eingearbeitet und erneut geprüft werden.

Für die Live-Prüfung fehlen ein berechtigter App-Zugang und eine funktionierende
Modellanbindung. Zugangsdaten ausschließlich lokal in `app/.env` beziehungsweise
in der Testumgebung hinterlegen. Der aktuelle Lauf hat **null Modellantworten**
bewertet. 28 DE-/FR-Pilotfälle sind vorbereitet; sie überlappen die Produktfälle.
Die 84 Fahrzeugfälle enthalten bislang Retrieval-Vorgaben, aber noch keine
`beleg`-/`antwort_muss`-Sollwerte für die semantische Antwortbewertung.

Die Gesamtabnahme folgt nach Fehlerkorrekturen und Wiederholungsprüfungen. Sie
hält Modell- und Datenstand fest; sicherheitsrelevante Antworten benötigen die
fachliche Gegenprüfung. Vorbereitung, Anfrageversand und fehlgeschlagene Läufe
erhöhen den Fortschritt nicht.

## Prüfungen reproduzieren

Aus `app/`:

```bash
npm test
npm run test:gesamt
npm run sources:check
```

`npm test` enthält bereits die Quellenprüfung. Der optionale Aufruf
`npm run sources:originals` benötigt zusätzlich den lokalen Ordner
`../../Anleitungen`; er ist keine Voraussetzung für einen frischen Git-Checkout.
Weitere Befehle: [App-Dokumentation](../../app/README.md).
