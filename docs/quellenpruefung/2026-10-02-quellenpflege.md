# Quellenpflege – 02.10.2026

**Die lokale Quellenpflege ist abgeschlossen. 713 Verweiszuordnungen wurden vereinheitlicht und 144 doppelte Einträge entfernt. Gesamtfortschritt weiterhin 71 %.** Die verbliebenen Quellenlücken, technischen Konflikte und Live-Antwortprüfungen gelten dadurch nicht als erledigt.

## Umfang und Ergebnis

| Prüfung / Änderung | Ergebnis |
|---|---:|
| Wiki-Dateien DE/FR erfasst | 164 |
| Dateien mit bereinigter Quellenliste | 135 |
| Vereinheitlichte Verweisvorkommen | 713 |
| Entfernte doppelte Quellenlisteneinträge | 144 |
| Neu aufgebaute interne Quellenmatrizen | 2 |
| Alle vorhandenen Repository-PDFs mit SHA-256 geprüft | 81 |
| Original-PDF-Dateien im Anleitungen-Ordner verglichen | 114 |
| Unterschiedliche Original-PDF-Inhalte | 97 |
| PDF-Seitenverweise mit Existenz und Seitenobergrenze geprüft | 585 |
| Defekte lokale Markdown-/PDF-Links in Wiki-Fließtexten | 0 |
| Lokale Belegtests / Selbsttests / Modultests | 404 / 179 / 45 bestanden |

Die Original-PDFs bleiben bytegleich; es wurden keine neuen PDFs kopiert oder fachlichen Aussagen daraus abgeleitet. Die vollständigen App-Daten einschließlich Korrekturen bleiben bytegleich zum Stand vor dieser Pflege. Bei Wiki-Fließtexten wurden ausschließlich die beiden internen Quellenmatrizen aktualisiert. Titel, Sprache, Confidence, Übersetzungsbezug und Freigabefelder der Artikel bleiben erhalten.

## Reparaturen und Nachweise

- **274 PDF-Verweisvorkommen:** Der genaue historische Dateiname wurde im bereitgestellten Anleitungen-Bestand gefunden; die zugehörige Repository-Kopie wurde anhand ihres SHA-256 zugeordnet. Gleiche Namen mit unterschiedlichen Hashes werden nicht automatisch aufgelöst. Das belegt die Identität der heute vorhandenen Originalkopie, nicht die Identität einer verlorenen älteren Version.
- **379 Wiki-Verweise:** Sprachlose `wiki/…`-Verweise zeigen jetzt explizit auf `content/wiki/de/…`. Das bewahrt die dokumentierte Semantik des ursprünglichen Importers (`CANONICAL_LANG = 'de'`), auch bei französischen Übersetzungen. Explizite FR-Pfade bleiben FR.
- **12 historische Wiki-Laufwerkspfade:** Eindeutige Pfade mit Sprach- und Seitenteil wurden in Repository-Pfade überführt. Das ist eine Pfadzuordnung zum aktuellen Wiki, kein Beweis identischer historischer Seiteninhalte.
- **48 relative Quellenpfade:** `../../quellen/…` und `quellen/…` wurden in vorhandene `content/quellen/…`-Pfade überführt.
- **Mehrzeilige Quellenlisten:** Der Prüfer liest gefaltete YAML-Pfade vollständig, einschließlich des zweiten Teils langer Dateinamen. Unbekannte YAML-Strukturen brechen die Pflege ab, statt Einträge still abzuschneiden. Alle 135 Änderungen sind im [Änderungsprotokoll](2026-10-02-quellenpflege-aenderungen.json) mit ursprünglichen Werten erhalten; der dortige Zähler beschreibt den Vorher-Stand.
- **Vollständiges PDF-Register:** Die bereits zuvor geprüften WiPro-Bedienungsrevisionen 1.2 und 1.3 fehlten in der bisherigen automatischen Manifestprüfung. Das neue Register erfasst sie ebenfalls. Alle 585 verlinkten physischen Seiten haben nun eine bekannte Seitenobergrenze.
- **Interne Quellenmatrizen:** Die veraltete Aussage „77/77 abgeschlossen“ wurde durch den tatsächlich vorhandenen Bestand je Sprache ersetzt. Verfügbarkeit, externe URLs und offene Herkunft werden getrennt gezählt. Die Matrizen bleiben vom Standard-RAG ausgeschlossen.

Die 713 Zuordnungen und 144 Dubletten sind keine voneinander unabhängigen Mengen: Ein alter Alias kann nach seiner Auflösung mit einem bereits vorhandenen Eintrag zusammenfallen. Entfernt wurden ausschließlich doppelte Quellenlistenwerte, keine Dokumente oder Belege.

Das [lesbare PDF-Register](../11_QUELLENREGISTER.md) verlinkt alle 81 Kopien und ihre bisherigen Prüfberichte; das [maschinenlesbare Register](quellenregister.json) enthält volle Hashes, Seitenzahlen und Originalpfade. Die tatsächliche fachliche Prüftiefe steht weiterhin in den einzelnen Paketberichten.

## Aktueller Verweisbestand

Nach der Dublettenbereinigung und Aktualisierung der Matrix-Indizes bestehen **3053 Quellenverweisvorkommen**: 853 lokal auflösbare Referenzen, 95 externe URL-Vorkommen und 2105 historische, noch nicht im Repository aufgelöste Vorkommen. Die 853 enthalten sowohl Wiki- als auch PDF-Referenzen; 454 PDF-Verweise zeigen auf 80 unterschiedliche PDF-Kopien. Die 81. Kopie bleibt über die Prüfberichte nachgewiesen.

Die 2105 offenen Vorkommen enthalten **993 unterschiedliche Quellwerte**:

| Kategorie | Unterschiedliche Werte | Behandlung |
|---|---:|---|
| Fehlende abgeleitete Markdown-Auszüge | 908 | Alte RAG-/Snippet-Pakete fehlen; keine Ersatzzuordnung aus ähnlichen Dateinamen |
| Fehlende Redaktionsdateien (u. a. CSV, DOCX, TXT) | 70 | Ursprünglichen Redaktionsbestand beschaffen |
| Nicht exakt zuordenbare PDF-Verweise | 4 | Originaldatei oder eindeutigen Versionsnachweis beschaffen |
| PDF vorhanden, nur im Anleitungen-Ordner | 10 | Fundort und Hash sind dokumentiert; noch keine Repository-Kopie |
| Historischer Sammelverweis `fahrzeuge/*.md` | 1 | Als Sammlung kenntlich, nicht als fehlende Einzeldatei gezählt |

**982 Werte sind somit tatsächlich nicht lokal auffindbar.** Die früher gemeldeten 1146 pauschal unaufgelösten Werte sind wegen des alten Parsers und der fehlenden Pfadauflösung nicht direkt als Vorher-/Nachher-Dateizahl vergleichbar. Es wurden nicht 153 verlorene Dokumente wiederhergestellt. Die [vollständige Restliste](2026-10-02-quellenpflege-bestand.json) enthält jeden offenen Wert und sämtliche betroffenen Wiki-Seiten.

Die vier nicht exakt zugeordneten PDF-Verweise sind:

1. `sources/Abschalteinrichtung_einpolig.pdf`
2. `sources/Häufige Fragen zur THITRONIK® App.pdf`
3. historischer D:-Pfad zum `Einbauhandbuch_WiPro III safe.lock_Art.Nr.101050_Rev 1.0_DE.pdf`
4. `sources/Einbauhandbuch_WiPro III safe.lock_Art.Nr.105458(Mercedes Sprinter VS30)_Rev 1.0_DE.pdf`

Ähnliche Unterlagen können vorhanden sein; ohne eindeutige Zuordnung wird daraus kein Versionsnachweis. Diese vier betreffen die expliziten Frontmatter-Verweise, nicht sämtliche fachlichen Dokumentenlücken aus dem Fahrzeugpaket.

Unter den zehn außerhalb des Repositorys vorhandenen PDFs sind unter anderem eine interne Pro-Finder-Befehlsliste, die OCR-Abschrift, allgemeine FAQ, Zusatzsirene/Zusatzhupe und Reiseführer. Ihre Archivierung ist von der fachlichen Bewertung zu trennen. Die 95 externen URL-Vorkommen wurden in dieser lokalen Pflege nicht im Web geprüft.

## Französische Redaktionsstände

Die elf FR-Seiten mit `dealerStatus: internal_only` wurden gegen die mitgelieferten Originalseiten und Git-HEAD verglichen. **Alle elf Originalseiten enthalten keinen expliziten dealerStatus; alle elf HEAD-Seiten enthalten bereits internal_only.** Daraus lässt sich keine Freigabe ableiten. Die vorhandene Abweichung zum Standard-Suchindex bleibt sichtbar; Status und Zugriff wurden nicht geändert. [Einzelnachweise](2026-10-02-fr-redaktionsstatus.json).

## Wiederholbare Prüfung

Aus `app/`:

```powershell
npm run sources:check
npm run sources:originals
npm run sources:matrix
npm test
```

`sources:check` benötigt ausschließlich das Repository und prüft Dateihashes, Registervollständigkeit, Pfade, Dubletten und Seitenanker. Fehlerhafte kanonische Pfade, defekte Links, neue/unregistrierte PDFs oder Hashabweichungen führen zum Abbruch. Vorhandene historische Restlücken werden ausdrücklich gemeldet; ein erfolgreicher Prüflauf bedeutet nicht „alle Quellen vorhanden“.

`sources:originals` benötigt zusätzlich den benachbarten Ordner `Anleitungen`. `sources:pflege` normalisiert neue eindeutige Pfade; für einen dauerhaft gespeicherten Änderungsnachweis kann `-- --report <Datei>` ergänzt werden. `sources:matrix` aktualisiert die beiden internen Matrizen und das lesbare PDF-Register. Nach Erweiterung des Bestands muss das maschinenlesbare Register bewusst mit Herkunft und Prüfsumme gepflegt werden.

Der zweite Pflegelauf meldet **0 Änderungen und 0 Dubletten**. Der vollständige App-Testlauf besteht: 404 Belegfälle, 179 Selbsttests und 45 Modultests einschließlich zehn neuer Quellenpflege-Tests. Der Wiki-Abgleich meldet 0 geänderte Routen; alle sechs App-Datendateien sind bytegleich. [Integritätsbericht](2026-10-02-quellenpflege-integritaet.json), [Erhaltungsnachweis](2026-10-02-quellenpflege-erhaltung.json).

## Fortschritt und nächste Schritte

**71 % Gesamtfortschritt, Planversion 1 unverändert.** Quellenpflege verbessert das bereits bearbeitete Bestands-/Importpaket, erfüllt aber keine der noch offenen gewichteten Positionen für Herstellerklärung und Live-Evaluation. Keine zusätzlichen Fortschrittspunkte wurden vergeben.

Die verbleibenden Arbeiten sind: fehlende Redaktions-/RAG-Pakete aus dem Ursprungsprojekt beschaffen, genaue PDF-Versionszuordnungen und FR-Freigabestatus klären sowie die technischen Herstellerfragen und den vorbereiteten Live-Antwortpiloten abschließen. Es wurden keine externen Nachrichten versendet und keine Änderungen committed, gepusht oder bereitgestellt.
