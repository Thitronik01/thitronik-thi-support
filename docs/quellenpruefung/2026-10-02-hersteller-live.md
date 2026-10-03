# Herstellerklärung und Live-Prüfung – Ausführungsstand 02.10.2026

**Die verfügbaren Arbeiten sind ausgeführt; eine abgeschlossene Herstellerklärung oder Live-Antwortfreigabe liegt noch nicht vor. Gesamtfortschritt: 71 %.**

## Herstellerklärung

Die offenen Fragen aus allen sechs Produktgruppen sind in einer [Herstelleranfrage mit 47 Prüfpunkten](2026-10-02-herstelleranfrage.md) und einem [Antwortregister mit stabilen IDs](2026-10-02-herstellerfragen.json) gebündelt. Übergreifende Themen sind teilweise bewusst in mehreren Produktgruppen enthalten. Die Zahl bezeichnet Prüfpunkte, nicht 47 unabhängig bestätigte Fehler. Antworten sollen Artikel, Hardware-/Serienbereich, Softwarestand und eine freigegebene Quelle mit Revision und Fundstelle nennen.

Zehn offizielle Fundstellen wurden gezielt erneut geprüft. Die gefundenen Aussagen ersetzen keine Herstellerantwort zu den weiterhin widersprüchlichen Dokumentständen. [Web-Abgleich mit URLs und Befunden](2026-10-02-hersteller-webabgleich.json).

Ein zusätzlicher [Herstellerhinweis zu CampLock/VanLock](https://www.thitronik.de/news-und-termine/news/wichtige-information-zu-camplock-und-vanlock-fingerprint/) wurde in vier DE-/FR-Artikel übernommen. Die offene Versionsklärung ist als `CAMP-UPDATE` in der Anfrage enthalten. Eine erfolglose Suche nach einem Update ist kein Nachweis, dass keines existiert.

Es wurden **keine Herstellerantworten erhalten und keine E-Mails versendet**. Im Chat ist die Entscheidung zwischen interner Fachklärung und einem Versand an den vorgeschlagenen Herstellerkontakt angefragt. Vor externem Versand müssen Empfänger, Absender und die erreichbaren Beleganhänge feststehen. Die bereitgestellten lokalen Berichtlinks allein sind keine E-Mail-Anhänge.

## Live-Antwortprüfung tatsächlich gestartet

Die Prozessumgebung sowie `.env`/`.env.local` im Repository und `app/` sowie `THI/.env` wurden gezielt auf vorhandene Konfiguration geprüft. Es wurde nicht nach Zugangsdaten in fremden Projekten oder Konten gesucht und kein Schlüssel ausgegeben. Alle genannten lokalen Konfigurationsdateien fehlen; die relevanten Provider-/Eval-Variablen sind nicht gesetzt.

Der lokale Entwicklungsserver wurde für die Prüfung gestartet. `GET /api/health?live=1` antwortete mit **HTTP 503** und den fehlenden Werten `ANYMIZE_API_URL` und `ANYMIZE_API_KEY`. Die Wissensbasis wurde gefunden. Anschließend wurde der echte Evaluator mit dem DE-Piloten, `--judge` und einem Fall gestartet. Er brach mit **Exitcode 1 vor dem ersten Modellaufruf** wegen derselben fehlenden Konfiguration ab.

**Bewertete echte Modellantworten: 0. Provider-Aufrufe: 0.** Der fehlgeschlagene Start ist kein Modelltest und kein Urteil über die Antwortqualität. [Maschinenlesbarer Ausführungsbefund](2026-10-02-live-ausfuehrung.json).

Der für die Diagnose gestartete Server wurde anschließend beendet. Der Health-Befund stammt noch vom Datenstand vor der Hinweisergänzung (2837 Abschnitte). Der finale Stand umfasst 224 Artikel und 2841 Abschnitte; seine Hashes stehen im Ausführungsbefund. Für die echte Evaluation ist mit diesem Stand frisch zu starten.

## Bereit für den nächsten Lauf

Die Pilotdateien enthalten jetzt **28 Fälle, 14 je Sprache**: die 24 bisherigen Fälle mit unveränderten eingefrorenen Belegen und vier zusätzliche Herstellerhinweis-Fälle. Kein Pilotfall ist als ausgeführt markiert.

Für einen lokalen Test werden die bereits vorgesehenen Provider-Werte in `app/.env` benötigt. Zugangsdaten gehören nicht in Chat, Git oder Ergebnisberichte. Alternativ kann eine vorhandene Test-App über `THI_EVAL_URL` und eine autorisierte Sitzung (`THI_EVAL_BEARER_TOKEN`, beim alten Modus `THI_ZUGANGSWORT`) geprüft werden. Für den semantischen Judge sind weiterhin Provider-Konfiguration oder `THI_JUDGE_URL`/`THI_JUDGE_KEY` erforderlich. Der Nutzer ist nach Testumgebung beziehungsweise Konfigurationsort gefragt.

Nach Einrichtung aus `app/`:

```powershell
node dev-server.mjs
```

In einem zweiten Terminal ebenfalls aus `app/`:

```powershell
node werkzeuge/antwort-eval.mjs --sprache de --gold ../daten/thi-eval-gesamt-live.de.json --judge --ergebnis ../docs/quellenpruefung/live-pilot-de.json
node werkzeuge/antwort-eval.mjs --sprache fr --gold ../daten/thi-eval-gesamt-live.fr.json --judge --ergebnis ../docs/quellenpruefung/live-pilot-fr.json
```

Die API- und Tageslimits gelten weiter. Ein unterbrochener Lauf kann mit `--fortsetzen` fortgeführt werden. Die aufgerufene Testumgebung muss den geprüften Datenstand verwenden; ein Lauf gegen eine ältere produktive Wissensbasis wäre separat auszuweisen. Nach dem Pilot sind die Antwortfehler gegen Originalquellen zu prüfen und anschließend die noch offenen vollständigen Produktpakete auszuwerten. Ein Pilot allein bedeutet keine vollständige Abnahme.

## Validierung und Fortschritt

- **408/408 lokale Belegfälle** bestanden, darunter vier neue Hinweisfälle; kein Live-Modelltest.
- **179 Selbsttests und 45 Modultests** bestanden.
- Historische Vergleichsfragen unverändert: 77/82 erwartete Artikel in Top 8; 10 strikte beziehungsweise 14 leerzeichennormalisierte Belege. Keine neue Regression.
- Ausschließlich vier öffentliche Wiki-Routen geändert; vorhandene Anker und 81 PDF-/FAQ-Exporte bewahrt. [Importbericht](2026-10-02-hersteller-import.json), [Regressionsvergleich](2026-10-02-hersteller-regression.json).
- Quellenprüfung weiterhin grün: 81 registrierte PDF-Kopien und 585 gültige Seitenverweise; Herkunftslücken bleiben separat offen. Beide internen Quellenmatrizen wurden nachgezogen.

**71 % bleiben korrekt**, weil weder eine verbindliche fachliche Rückmeldung noch eine bewertete echte Modellantwort vorliegt. Die Herstellerfragebogen-Erstellung, Webprüfung und der fehlgeschlagene Live-Start werden nicht als abgeschlossene Freigabe gerechnet. Änderungen bleiben lokal; kein Commit, Push oder Deployment.
