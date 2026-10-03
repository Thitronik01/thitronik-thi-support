# Thi — THITRONIK Support

Technischer Support-Assistent mit strukturierter Fallaufnahme, Quellenangaben und
Wissenspflege auf Deutsch und Französisch. Die App nutzt ein statisches Frontend,
Netlify Functions und eine Modellanbindung über Anymize.

## Aktueller Arbeitsstand

Stand: **03.10.2026**. Die dokumentengestützte Fachprüfung ist zu **71 %**
abgeschlossen. Die übrigen 29 Punkte entfallen auf Herstellerklärungen,
Live-Antwortprüfungen und die Gesamtabnahme. Die Quote misst abgeschlossene
Arbeitsschritte, nicht die Antwortgenauigkeit.

| Bestand / Prüfung | Stand |
|---|---|
| App-Wissensbasis | 224 Artikel, 2.841 Abschnitte |
| Wiki-Quelldateien | 164, Deutsch und Französisch |
| Hersteller-PDFs im Quellenregister | 81 Kopien mit SHA-256 und Seitenzahlen |
| Produktbezogene Retrieval-/Belegfälle | 408 bestanden |
| Selbsttests / Modultests | 179 / 45 bestanden |
| Modellantworten für den aktuellen Prüfstand | 0 bewertet; Testzugang fehlt |
| Herstellerklärung | 47 Fragen vorbereitet, Antworten offen |

Der [Wegweiser durch die Prüfberichte](docs/quellenpruefung/README.md) erklärt
Quellenlücken, Versionskonflikte und die konkreten Abschlusskriterien. Frühere
Prüfberichte bleiben als datierte Nachweise erhalten.

## Lokal starten und prüfen

Node.js ab 20.11; die App benötigt kein `npm install`.

```bash
cd app
npm test
npm run test:gesamt
npm run dev
```

Die Oberfläche läuft unter `http://localhost:8888`. Echte Antworten benötigen die
Provider- und Zugangskonfiguration aus der [App-Dokumentation](app/README.md).
Für lokale Einstellungen dient `app/.env.example` als Vorlage für `app/.env`.
Zugangsdaten und rohe Live-Eval-Ergebnisse werden nicht versioniert.

## Orientierung im Repository

| Pfad | Inhalt |
|---|---|
| [app/](app/README.md) | Frontend, Functions, gebündelte Wissensbasis und Prüfwerkzeuge |
| [content/wiki/](content/wiki/) | Bearbeitbare DE-/FR-Wiki-Quellen |
| [content/quellen/](content/quellen/) | Unveränderte Hersteller-PDFs; Zuordnung im [Register](docs/11_QUELLENREGISTER.md) |
| [content/anleitungen/](content/anleitungen/) | Historischer Anleitungs-/FAQ-Textexport |
| [daten/](daten/) | Produkt-/Fahrzeugkataloge, Glossar und Evaluationsfälle |
| [docs/quellenpruefung/](docs/quellenpruefung/README.md) | Fachprüfberichte, maschinenlesbare Nachweise und offene Fragen |
| [code/](code/) | Referenzcode und gemeinsam verwendete Ingest-/Suchbausteine |
| [referenz/](referenz/) | Ursprüngliche RAG-Entwicklungsdokumentation |

`app/data/` ist absichtlich versioniert: Die Functions verwenden diese Daten
unmittelbar. JSON- und Moduldateien sind benötigte Ausgabeformate, keine temporären
Dubletten. Nach Wiki-Änderungen aktualisiert `npm run wiki:sync` aus `app/` das
App-Bündel; `npm run wiki:check` kontrolliert den Abgleich ohne Schreibzugriff.
Die geprüften PDF-Originalkopien bleiben unverändert.

Lokale Arbeitskopien, Logs, Caches und Modell-Rohantworten bleiben außerhalb der
Versionsverwaltung. Die optionalen Original-PDFs unter `../Anleitungen` werden
für `npm run sources:originals` benötigt; die normale Testreihe prüft die
versionierten Quellen und benötigt diesen Ordner nicht.

## Weiterführende Dokumentation

- [Projektfortschritt und feste Gewichtung](docs/10_RAG_PRUEFFORTSCHRITT.md)
- [Herstellerfragen zur fachlichen Klärung](docs/quellenpruefung/2026-10-02-herstelleranfrage.md)
- [Quellenregister](docs/11_QUELLENREGISTER.md)
- [App-Konfiguration und Werkzeuge](app/README.md)
- [RAG-Wissenstransfer](docs/01_RAG_WISSENSTRANSFER.md)
- [Zielarchitektur](docs/02_ZIELARCHITEKTUR.md)
- [Fallaufnahme](docs/03_FALLAUFNAHME_SCHEMA.md)
- [Mehrsprachigkeit](docs/04_MEHRSPRACHIGKEIT_DE_FR.md)
- [Evaluation und Qualität](docs/05_EVAL_UND_QUALITAET.md)
- [Ursprünglicher Paketumfang](docs/06_VOLLSTAENDIGKEIT.md)

Die Architektur- und Übergabedokumente beschreiben teilweise frühere Projektstände.
Für den aktuellen Fachprüfstand gelten der Prüfplan und die datierten Prüfberichte.
