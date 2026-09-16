# Korrekturen durch Mitarbeiter — Entwürfe (Stand 16.09.2026, nicht umgesetzt)

> **Zweck:** Drei Entwürfe, wie Support-Mitarbeiter falsche Thi-Antworten
> korrigieren können und die Wissensbasis diese Korrekturen versioniert
> übernimmt. Alle Zahlen unten sind gemessen, nicht geschätzt — wo nicht,
> steht es dabei. Es wurde kein Modellaufruf ausgelöst.

---

## 0. Befunde vor dem Entwerfen

| # | Befund | Beleg |
|---|---|---|
| 1 | **Produktion fährt exakt den lokalen Datenstand.** | `/api/health` live: 224 Artikel, 2.591 Abschnitte, Ø 9.876 Zeichen — lokal identisch |
| 2 | **Git versioniert die Wissensbasis bereits.** `app/data/*.json` und `*.mjs` sind getrackt (247 Dateien im Repo), jeder Push auf `main` deployt. | `git ls-files app/data` |
| 3 | **Es gibt im Repo KEINEN Ingest, der `content/wiki` → `artikel.json` erzeugt.** `daten-bauen.mjs` wandelt nur JSON → MJS. Die JSON kamen aus dem Vorgängersystem (`code/wiki-ingest.mjs` schreibt andere Dateien). „Wiki neu einlesen" ist heute also nicht reproduzierbar. | `grep -rl artikel.json` trifft nur README und daten-bauen |
| 4 | **Abschnitte sind nicht aus dem Artikel-Body ableitbar.** 905 von 2.591 Abschnitts-Texten stehen nicht im Artikel-Body (33 Artikel sind bei 16.000 Zeichen gekappt; `wipro-iii` hat 24.076 Zeichen in Abschnitten, 16.000 im Body). Eine Korrektur, die in den Wiki-Text gepatcht würde, müsste zwei Bestände konsistent halten. | Messskript, siehe Sitzung |
| 5 | **Der Kontext fürs Modell kommt aus `artikel.body`**, nicht aus den Abschnitten (Abschnitte liefern nur Anker/Deep-Link und Zusatztreffer). | `chat.mjs` Schritt 6 |
| 6 | **Ein eigener Korrektur-Eintrag wird gefunden und flutet nicht.** Testeintrag „Korrektur: Funk-Handsender Batterie" zur Frage „Welche Batterie kommt in den Funk-Handsender…": Platz 2 (Score 76 hinter dem Wiki-Artikel mit 100). Bei den 41 Gold-Fragen taucht er in 1 Fall in den Top-8 auf. | Messskript ohne Modell |
| 7 | **Import der Wissensbasis kostet 37 ms** (16 + 21 ms, 77 MB RSS). Ein Laden aus einem externen Speicher zur Laufzeit wäre nicht schneller, nur anders. | `performance.now()` um die Imports |
| 8 | **Es gibt keine Identität.** Ein gemeinsames Zugangswort für alle. „Wer hat geändert" ist heute prinzipiell nicht feststellbar. | `chat.mjs` Zugangsschutz |
| 9 | **GitHub: ein Mitwirkender, kein Branch-Schutz möglich** (privates Repo im Free-Tarif: HTTP 403 „Upgrade to GitHub Pro"). Eine Freigabe per Pull-Request-Review lässt sich technisch nicht erzwingen, nur vereinbaren. | `gh api …/branches/main/protection` |
| 10 | **Netlify Blobs** braucht das npm-Paket `@netlify/blobs` (keine REST-API dokumentiert), ist standardmäßig *eventually consistent* (Änderungen binnen 60 s überall), site-weite Stores überleben Deploys. Tarifgrenzen stehen weder in Doku noch Preisseite. | docs.netlify.com/build/data-and-storage/netlify-blobs |
| 11 | **Netlify Identity ist nicht abgekündigt** (Abkündigung Februar 2026 zurückgenommen), auf allen Tarifen verfügbar. Abgekündigt ist nur Git Gateway. | netlify.com/blog/auth0-extension-identity-changes |
| 12 | **Deploy-Dauer nicht gemessen.** Kein Netlify-CLI, keine Deploy-Statusmeldungen auf GitHub. Messbar nur mit einem Test-Push — der deployt Produktion, deshalb nicht ohne Rücksprache. | — |
| 13 | **Der Prozentwert kennt keine Herkunft.** `sicherheit.mjs` bewertet Datenlage, Score, Trefferzahl und Modell-Selbsteinschätzung; ein Korrektur-Eintrag bekäme denselben Wert wie ein Wiki-Artikel. Es gibt aber einen passenden Anschlusspunkt: den Deckel-Mechanismus bei Widersprüchen (60 % / 45 %). | `sicherheit.mjs` §4 |
| 14 | **Sicherheitsrelevante Artikel sind identifizierbar:** 14 DE-Artikel tragen Gas/CO/Rauch/Brand im Titel (gas-pro, gas-pro-iii, co-sensor, gas-plug, gas-connect, zusatzsensor, 6 Anleitungen, 1 FAQ) plus funk-rauchmelder und abschalteinrichtung. | Messskript |

**Selbsttests:** 115/115 grün, unverändert.

---

## 1. Gemeinsamer Kern aller Entwürfe: Korrekturen sind eigene Einträge, kein Patch

Unabhängig vom Speicherort empfehle ich, den Wiki-Text **nie** zu verändern.
Eine Korrektur ist ein **eigener kleiner Eintrag** („Korrektur-Notiz") mit:

```json
{
  "id": "2026-09-16-handsender-batterie",
  "status": "ungeprueft | freigegeben | zurueckgezogen | im-wiki",
  "lang": "de",
  "bezug": { "route": "/de/funk-handsender", "anchor": "batterie" },
  "titel": "Funk-Handsender: Batterielaufzeit",
  "text": "Die Laufzeit beträgt bei normaler Nutzung etwa zwei Jahre …",
  "widerspricht": "… nicht ein Jahr wie im Wiki angegeben",
  "autor": "M. Behrens", "erstellt": "2026-09-16T11:40:00Z",
  "freigegebenVon": null, "freigegebenAm": null,
  "ausloeser": { "frage": "…", "antwortAuszug": "…" }
}
```

Warum so, und nicht in den Artikel schreiben:

- **Rausnehmen** ist ein Statuswechsel oder ein `git revert` auf eine Datei — kein Suchen in 16.000 Zeichen Artikeltext (Frage 2).
- **Herkunft bleibt sichtbar** — im Kontextblock steht „[Support-Korrektur, ungeprüft, M. Behrens, 16.09.2026]" statt „laut Wiki" (Frage 5).
- **Der Ingest kann sie nicht überschreiben**, weil sie nicht im Wiki-Bestand liegt (Frage 6).
- **Sie wird gefunden** (Befund 6) und verdrängt den Wiki-Artikel nicht — beide erreichen das Modell, das den Widerspruch benennen kann.
- **Sperrlisten** greifen am `bezug`, nicht am Text (Frage 7).

Dazu gehört ein Lebenszyklus, der die Idee ehrlich macht: **Thi ist nicht das Wiki.** Eine
Korrektur ist eine *Warteschlange für die Wiki-Redaktion*, die sofort in Thi wirkt.
Ziel-Status ist `im-wiki` — dann ist die Notiz archiviert und der Wiki-Text die Wahrheit.
Ohne diesen Rückweg entstehen zwei Wahrheiten, die über Jahre auseinanderdriften.

---

## 2. Die drei Entwürfe

### Entwurf A — Git ist die Datenbank (empfohlen)

**Mechanik.** Eine neue Function `korrektur.mjs` nimmt die Notiz entgegen und schreibt sie
per GitHub-Contents-API (reines `fetch`, keine Abhängigkeit) als
`app/data/korrekturen/<id>.json` plus neu gebautes `app/data/korrekturen.mjs` in einen
Commit. Der Push löst den Netlify-Deploy aus. `chat.mjs` importiert `korrekturen.mjs`
statisch — genau wie heute die Wissensbasis, mit denselben Bundler-Garantien.

**Freigabe.** Zwei Varianten, beide über dieselbe Function:
- *sofort + gekennzeichnet:* Commit auf `main`, Status `ungeprueft`, Prozentwert
  gedeckelt (60 %), Kennzeichnung in Antwort und Quellenliste. Freigabe später per
  Klick (zweites Zugangswort „Freigabe") → Status `freigegeben`, Deckel entfällt.
- *strikt:* Commit auf Branch `korrektur/<id>`; Netlify baut automatisch eine
  **Deploy-Preview-URL**, auf der die Freigeberin die Korrektur live gegen Thi testet;
  „Freigeben" merged per API in `main`. Bis dahin wirkt nichts.

**Versionierung.** `git log -- app/data/korrekturen/` ist die Historie: wer (Name im
Commit-Text), wann, was (Diff). Rückkehr: `git revert` **oder** Netlify „Rollback to
deploy" — ein Klick, und die ganze Site steht auf jedem früheren Stand.

| | |
|---|---|
| **Architektur umgeworfen** | nichts. Kein Build-Schritt, keine npm-Abhängigkeit, kein Laufzeit-Zustand, kein Dateizugriff. |
| **Neue Konfiguration** | ein feingranulares GitHub-Token (nur dieses Repo, nur `contents: write`) als Netlify-Umgebungsvariable; optional zweites Zugangswort für Freigabe |
| **Betriebskosten** | 0 €. GitHub-API-Aufrufe und Netlify-Deploys sind im Kontingent. |
| **Latenz bis Wirkung** | Deploy-Dauer — **nicht gemessen** (Befund 12). Für eine Support-Korrektur sind Minuten unkritisch; für „sofort nochmal fragen" nicht. |
| **Risiken** | Zwei Mitarbeiter korrigieren zeitgleich → SHA-Konflikt bei GitHub, Function muss einmal neu lesen und wiederholen. Bei dutzenden Korrekturen am Tag: dutzende Deploys (kein Problem der Plattform, aber die Deploy-Liste wird lang). Kein erzwungener Review (Befund 9) — die Function selbst ist das Gate, weil nur sie das Token hält. |
| **Eingriff (Schätzung)** | `korrektur.mjs` neu (~150 Z.), `chat.mjs` +40, `sicherheit.mjs` +15, `prompts.mjs` +1 Regel, `app.js` +120 (Knopf „Antwort korrigieren", Formular), `tests.mjs` +20, `werkzeuge/korrekturen-pruefen.mjs` neu (~100) |

### Entwurf B — Netlify Blobs als Laufzeit-Overlay

**Mechanik.** Korrekturen liegen in einem site-weiten Blob-Store. `chat.mjs` holt das
Overlay je Anfrage (in der Instanz 60 s gecacht) und legt es über den statischen Index.
Wirkung sofort, kein Deploy.

| | |
|---|---|
| **Architektur umgeworfen** | zwei bewusste Entscheidungen: „keine npm-Abhängigkeit" (Paket `@netlify/blobs` nötig, Befund 10) und „kein geteilter Zustand". Der Bundler braucht dann `node_modules` — bei Drag&Drop-Deploys ein neuer Stolperstein. |
| **Versionierung** | selbst gebaut: Append-only-Log im Blob, Rollback = Log zurückspielen. Nicht im Repo sichtbar, kein Diff, kein `git revert`, kein Netlify-Rollback (Blobs sind kein Deploy-Asset). Backup/Export muss man dazubauen. |
| **Freigabe** | Status-Feld wie in A; Deploy-Previews sehen dieselben Live-Daten — kein isoliertes Testen. Doku warnt ausdrücklich, dass Branch-Deploys Blobs löschen können, von denen Produktion abhängt. |
| **Betriebskosten** | Blobs sind im Free-Tarif enthalten, Grenzen nicht dokumentiert. Plus eine Netzwerkrunde je Chat-Anfrage (nicht gemessen; gegen 37 ms Import). |
| **Konsistenz** | 60 s eventual; „strong" optional und langsamer. |
| **Risiken** | Zwei Datenquellen (Repo + Blob) driften; Produktion ist nicht mehr aus dem Repo reproduzierbar. Genau das gilt laut Befund 3 heute schon für das Wiki — man würde es verdoppeln. |
| **Eingriff (Schätzung)** | wie A plus `package.json`-Abhängigkeit, Overlay-Merge in `chat.mjs` (+60), eigenes Log-Format, Export-Werkzeug (~150) |

### Entwurf C — Externe Datenbank (Supabase Postgres) als Wissens- und Korrekturspeicher

**Mechanik.** Artikel, Abschnitte und Korrekturen in Tabellen; Function liest per REST
(`fetch`, kein Paket nötig); Redaktions-UI mit echten Benutzerkonten, Rollen, Audit-Tabelle;
Trigger schreiben Historie. Bereitet den offenen Punkt „hybrides Retrieval" vor (pgvector).

| | |
|---|---|
| **Architektur umgeworfen** | fast alles, was das Projekt bewusst ausgeschlossen hat: Datenbank, Laufzeit-Datenzugriff, Auth pro Person, externer Dienst im Anfragepfad. |
| **Versionierung** | sauber (Historientabelle, Zeitstempel, Benutzer), aber eigene Implementierung; Rollback per SQL. |
| **Freigabe** | vollständig abbildbar (Rollen, RLS). |
| **Betriebskosten** | Supabase-Tarif; Doku 02 §2.3 warnt vor dem Projektlimit im Free-Tarif. Netzwerkrunde je Anfrage (nicht gemessen). Ein weiterer Dienst, der still sterben kann — der Vorgänger war wochenlang tot, weil niemand einen Dienst überwachte. |
| **Risiken** | Groß für die eine Aufgabe „Korrekturen". Sinnvoll nur, wenn Embeddings/Hybrid-Retrieval ohnehin beschlossen sind — dann ist die DB sowieso da. |
| **Eingriff (Schätzung)** | Wochen, nicht Tage. Ingest, Function, UI, Auth, Monitoring. |

### Empfehlung: A, mit dem Kern aus §1

Begründung: Git versioniert die Wissensbasis **heute schon** (Befund 2), Netlify deployt
**heute schon** bei jedem Push, und der Import ist die einzige Ladeart, die das Projekt aus
Erfahrung für verlässlich hält. A fügt eine Function und eine Datei hinzu und bekommt
Historie, Diff, Revert, Rollback und Deploy-Previews geschenkt. B kauft „sofort" mit zwei
gebrochenen Grundsätzen und einer zweiten Wahrheit. C ist die richtige Antwort auf eine
andere Frage (Hybrid-Retrieval).

Was A **nicht** löst: Wirkung erst nach dem Deploy. Wenn das im Betrieb stört, ist B der
Aufstieg — die Notiz-Struktur aus §1 bleibt gleich, nur der Speicher wechselt.

---

## 3. Antworten auf die sieben Fragen (unter Entwurf A)

**1. Durchführbar?** Ja, ohne Umbau. Der Eingriff ist die Function, ein Import, ein
Gewichtungs-/Deckel-Faktor und ein Knopf. Voraussetzung: ein GitHub-Token in Netlify.

**2. Falsch eingepflegt — wie raus, wie merken?**
Raus: Status `zurueckgezogen` per Klick (neuer Commit) oder Netlify-Rollback.
Merken, in dieser Reihenfolge:
- *Beim Einpflegen, kostenlos und deterministisch:* `werkzeuge/korrekturen-pruefen.mjs`
  läuft die 41 Gold-Fragen offline durch (kein Modell) und meldet, ob die neue Notiz in
  deren Top-8 auftaucht (Befund 6: Testeintrag 1/41) und ob ein Gold-Beleg aus dem
  Kontext fällt. Als GitHub Action bei jedem Korrektur-Commit ausführbar (privates Repo:
  2.000 Minuten/Monat im Free-Tarif; ein Lauf: Sekunden).
- *In der Antwort:* Das Modell wird angewiesen, eine Korrektur-Notiz **als solche zu
  nennen** („laut Support-Korrektur vom 16.09.2026, ungeprüft"). Wer die Antwort liest,
  sieht die Herkunft — das ist der eigentliche Frühwarner, weil Kollegen widersprechen.
- *Wiedervorlage:* Notizen, die nach N Monaten weder `freigegeben` noch `im-wiki` sind,
  listet `health` als Warnung.
- *Teuer, vor Releases:* `npm run eval -- --judge` wie bisher.

**3. Versionierung konkret.** Eine Datei je Korrektur, ein Commit je Statuswechsel,
Autor-Name im Commit-Text und im JSON. `git log --follow` zeigt die Kette
ungeprüft → freigegeben → im-wiki. Zurück: `git revert <sha>` (eine Korrektur) oder
Netlify-Rollback (ganzer Stand). **Einschränkung (Befund 8):** Der Name ist
selbst erklärt, kein Nachweis. Für echten Nachweis: Netlify Identity (verfügbar, Befund
11) oder ein Zugangswort je Person. Das ist eine eigene Entscheidung.

**4. Freigabe vorher oder nachher?** Empfehlung: **beides, nach Thema.**
Normale Korrekturen (Artikelnummern, Laufzeiten, Vorgehen) wirken sofort als
`ungeprueft` mit Deckel und Kennzeichnung — sonst erstickt die Idee am Flaschenhals
Freigabe. Sicherheitsrelevante Themen (Frage 7) wirken **erst** nach Freigabe. Freigeben
darf, wer das Freigabe-Zugangswort kennt; das ist die Rolle, die ihr benennen müsst.

**5. Prozentwert.** Drei Regeln in `sicherheit.mjs` und `prompts.mjs`:
- Trägt der Kontext eine `ungeprueft`-Notiz, greift der bestehende Deckel (60 %), mit
  Begründungszeile „stützt sich auf eine ungeprüfte Support-Korrektur".
- `freigegeben`: kein Deckel, aber Herkunftszeile in den Gründen.
- Eine Notiz mit `widerspricht` erzeugt einen Hinweis in der Quellenliste, und das
  Modell muss beide Aussagen nennen, solange die Notiz nicht freigegeben ist.
Der Retrieval-Score bleibt unangetastet — gemessen liegt die Notiz ohnehin hinter dem
Wiki-Artikel (76 zu 100), verdrängt ihn also nicht.

**6. Wiki neu einlesen.** Korrekturen liegen außerhalb des Wiki-Bestands, der Ingest
berührt sie nicht. Nach jedem Ingest prüft `korrekturen-pruefen.mjs` jeden `bezug`
(existiert `route#anchor` noch?) und meldet Verwaiste. Steht der Korrekturtext inzwischen
im Wiki, schlägt es `im-wiki` vor. **Vorbefund 3 ist hier der eigentliche Punkt:** Es gibt
im Repo keinen Ingest. Bevor „neu einlesen" ein Vorgang ist, muss der Weg
`content/wiki` → `artikel.json` überhaupt existieren. Das ist eine eigene Aufgabe.

**7. Sicherheitsrelevantes.** Empfehlung: eine **Sperrliste** über `articleType` und
Slug (gas*, co-sensor, zusatzsensor-gas-pro-iii, funk-rauchmelder, abschalteinrichtung,
die sechs Gas-Anleitungen, das CO-FAQ; Befund 14) plus alle Notizen, deren Text das
Gefahren-Gate auslösen würde. Für sie gilt: nie sofort, nur nach Freigabe, und die Freigabe
verlangt eine Begründung. Das Gate selbst ist Code, keine Daten — es kann per Korrektur
nicht verändert werden, und das soll so bleiben.

---

## 4. Offene Entscheidungen

1. Entwurf A, B oder C.
2. Freigabe-Modell: sofort+Deckel für Normales (Empfehlung) oder strikt für alles.
3. Identität: Namensfeld (selbst erklärt) oder Netlify Identity / Zugangswort je Person.
4. Deploy-Dauer messen — erfordert einen Test-Push auf `main`.
5. Sperrliste aus Frage 7 fachlich gegenlesen.
6. Ingest-Weg `content/wiki` → `artikel.json` nachbauen (Voraussetzung für Frage 6).

---

## 5. Umsetzungsstand — Entwurf A gebaut (16.09.2026, lokal, nicht deployt)

Auf „bereite alles vor" hin wurde Entwurf A mit den empfohlenen Vorgaben
umgesetzt: sofort + Deckel für Normales, Freigabepflicht für Sicherheitsthemen,
Namensfeld statt Login. Abweichung zu §1: **eine Datei** `app/data/korrekturen.json`
(Array) statt einer Datei je Korrektur — die Function liest so mit einem
API-Aufruf den aktuellen Stand; die Historie je Korrektur liefert `git log -p`
trotzdem.

| Baustein | Datei |
|---|---|
| Kern: Schema, Sperrliste, Lebenszyklus, Kontexttext | `app/netlify/functions/lib/korrekturen.mjs` |
| Endpunkt: anlegen, freigeben, zurückziehen, im-wiki; Commit per Git-Data-API | `app/netlify/functions/korrektur.mjs` |
| Retrieval-Einbindung + garantierte Beilage zum Bezugsartikel | `app/netlify/functions/chat.mjs` |
| Deckel 60 % bei ungeprüft, Herkunftszeile bei freigegeben | `app/netlify/functions/lib/sicherheit.mjs` |
| Prompt-Regel „SUPPORT-KORREKTUREN" (DE/FR) | `app/netlify/functions/lib/prompts.mjs` |
| Wiedervorlage im Health-Check | `app/netlify/functions/health.mjs` |
| Oberfläche: Knopf unter der Antwort, Liste mit Freigabe | `app/public/…` |
| Offline-Prüfung des Bestands | `app/werkzeuge/korrekturen-pruefen.mjs` |
| 48 neue Selbsttests (163 gesamt) | `app/netlify/functions/lib/tests.mjs` |

**Gemessen nach dem Bau, ohne Modellaufruf:**
- Sperrliste über den Bezugsartikel: genau **20 DE-Artikel** (9 Artikel, 9 Anleitungen, 2 FAQ), 9 FR-Artikel. WiPro, Handsender, BT-connect, Pro-Finder frei.
- Korrektur zur Handsender-Batterie: Platz 2 (77 zu 100) bei der passenden Frage; bei 1 von 41 Gold-Fragen in fremden Top-8.
- Ungeprüfte Korrektur senkt einen Fall mit starken Quellen von >60 % auf **60 %**; freigegeben bleibt der Wert unverändert.
- `wartet-freigabe` erreicht das Retrieval nicht (Gas-Frage: keine Korrektur im Kontext); nach Freigabe mit Begründung wird sie gefunden.
- Falsches Freigabewort: 403. Freigabe einer Gas-Korrektur ohne Begründung: 400.

**Deploy-Dauer, gemessen am 16.09.2026:** Push beendet 13:11:47 UTC, neue
Function live um 13:12:24 UTC — **37 Sekunden** vom Push bis zur Wirkung
(Polling des Health-Endpunkts alle 10 s, kein Build-Schritt). Das ist die
Latenz einer Korrektur. Damit ist die Sorge aus Entwurf A („Minuten") kleiner
als angenommen; Entwurf B (Blobs) bringt gegenüber 37 s keinen Gewinn mehr.

**Erster echter Durchlauf in Produktion, 16.09.2026 (Max, aus der
Oberfläche):**

| Schritt | Zeit |
|---|---|
| Korrektur eingereicht | 14:11:48 UTC |
| Commit `222b900` aus der Function (beide Dateien, Autor „Max") | 14:11:49 UTC |
| Function trägt die Korrektur (`gesamt: 1, ungeprueft: 1`) | ~70 s nach dem Klick |
| „Zurückziehen" in der Liste → Commit `76763e5` | 14:19:03 UTC |
| Function meldet `zurueckgezogen: 1` | ~35 s nach dem Klick |

Ein Stolperstein dabei: Ein **leerer Commit löst keinen Deploy aus**. Netlify
bricht ab, wenn sich unter dem Base-Verzeichnis nichts geändert hat — eine
neue Umgebungsvariable zählt nicht. Nach dem Eintragen des Tokens muss
deshalb einmal manuell **Trigger deploy → Deploy project** geklickt werden.

**Entscheidungen vom 16.09.2026 (Max):** Commit und Push freigegeben. Kein
eigenes Freigabewort — das Zugangswort gilt auch für Freigaben, dafür
Vier-Augen-Regel (Freigeber ≠ Autor). Sperrliste bleibt auf dem gemessenen
Stand (20 DE-Artikel), Lockerung bei Bedarf.
