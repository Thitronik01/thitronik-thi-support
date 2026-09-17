# Thi Support — fertige Netlify-App

Technischer Support-Assistent für THITRONIK-Produkte: strukturierte Fallaufnahme,
belegte Antworten aus der THITRONIK-Dokumentation, **deutsch und französisch**.

**Kein Build-Schritt, kein Framework.** Statisches Frontend + zwei Netlify
Functions. Ordner hochladen, drei Umgebungsvariablen setzen, fertig.

> **Weiterarbeiten?** [`NAECHSTE_SCHRITTE.md`](NAECHSTE_SCHRITTE.md) fasst den
> Stand zusammen und sortiert die offenen Punkte nach Nutzen.

---

## Vor dem Hochladen: einmal prüfen

```bash
npm run deploy-pruefen
```

Beantwortet in zwanzig Sekunden die Frage, ob der Ordner so hochgeladen werden
kann — und zwar in der Reihenfolge des möglichen Schadens:

| Geprüft wird | Warum |
|---|---|
| Liegt ein Schlüssel im Klartext im Paket? | Der teuerste denkbare Fehler. `.gitignore` schützt **nur** bei Git-Deploys |
| Ist die Wissensbasis vollständig? | Ein still geschrumpfter Index war der teuerste Fehler des Vorgängers |
| Laden beide Functions? | Ein Tippfehler im Import fällt sonst erst live auf |
| Zeigen Routen und Verzeichnisse ins Leere? | `netlify.toml` gegen die tatsächlichen Dateien |
| Fehlt eine referenzierte Datei? Blockt die CSP eigene Assets? | Lokal unsichtbar, solange der Browser cacht |
| Sind alle Textdateien sauberes UTF-8? | Doppelt kodierte Umlaute werden zu Buchstabensalat |
| Liegt etwas im Ordner, das nicht mit soll? | Symlinks, Altlasten, unnötige Megabytes |

**FEHLER** heißt: nicht hochladen. **WARNUNG** heißt: ansehen und entscheiden.
Exit-Code 1 bei jedem Fehler — damit taugt der Aufruf auch als CI-Gate.

> Die Netlify-Umgebungsvariablen kann das Skript nicht prüfen, die leben im
> Dashboard. Dafür gibt es nach dem Deploy `/api/health?live=1`. Erst beide
> Schritte zusammen sind eine vollständige Prüfung.

---

## In drei Schritten online

### 1. Hochladen

**Variante A — Drag & Drop (am schnellsten)**
Diesen Ordner (`app/`) auf [app.netlify.com/drop](https://app.netlify.com/drop) ziehen.

> **Vorher die `.env` löschen.** Sie ist nur fürs lokale Testen da und enthält
> Zugangsdaten im Klartext. `.gitignore` schützt nur bei Git-Deploys — bei
> Drag & Drop wandert der Ordnerinhalt mit. Ausgeliefert wird sie zwar nie (nur
> `public/` geht online), aber im Deploy-Paket hat sie nichts verloren.

**Variante B — Git**
Ordner in ein Repository legen und in Netlify verbinden. `netlify.toml` bringt
alle Einstellungen mit; ein Build-Command ist nicht nötig.

### 2. Umgebungsvariablen setzen

In Netlify unter **Site configuration → Environment variables**:

| Variable | Wert | |
|---|---|---|
| `ANYMIZE_API_URL` | Endpunkt-URL von Anymize | Pflicht |
| `ANYMIZE_API_KEY` | API-Schlüssel | Pflicht |
| `THI_MODEL` | `anthropic/claude-sonnet-4.6` | Pflicht |
| `THI_ZUGANGSWORT` | frei gewähltes Wort für alle Händler | **dringend empfohlen** |
| `THI_RATE_LIMIT` | Anfragen pro IP / 5 min (Standard 20) | optional |
| `THI_DAILY_LIMIT` | Anfragen pro Tag (Standard 500) | optional |
| `THI_FEHLVERSUCHE` | falsche Zugangswörter pro IP / 15 min (Standard 8) | optional |
| `THI_GITHUB_TOKEN` | feingranulares Token, nur dieses Repo, nur *Contents: write* | für Support-Korrekturen |
| `THI_FREIGABEWORT` | eigenes Wort für die Freigabe von Korrekturen; leer = Zugangswort gilt | optional |
| `THI_GITHUB_REPO` / `_BRANCH` / `_PFAD` | Ziel der Korrektur-Commits (Standard: dieses Repo, `main`, `app/data`) | optional |

> **Ohne `THI_ZUGANGSWORT` ist die Seite öffentlich** — und damit auch euer
> API-Schlüssel, auf eure Kosten. Alternativ Netlify Password Protection nutzen.

**Zum Zugangswort:** Es wird an alle Händler weitergegeben, muss also merkbar
sein — deshalb ist es naturgemäß kein starkes Geheimnis. Nach `THI_FEHLVERSUCHE`
falschen Versuchen wird die IP für 15 Minuten gesperrt (auch für das richtige
Wort, sonst wäre die Sperre umgehbar). Das macht Durchprobieren unattraktiv.

Zwei Einschränkungen, die man kennen sollte:
- Die Sperre zählt **pro Function-Instanz**. Netlify skaliert diese, ein hartes
  Limit wäre nur mit geteiltem Zähler möglich (Netlify Blobs / Upstash).
- Wer das Wort kennt, kann es weitergeben. Für echte Zugangskontrolle wäre
  Netlify Password Protection oder ein Login pro Händler nötig.

Für den Zweck — verhindern, dass Zufallsbesucher und Crawler euren API-Schlüssel
verbrauchen — reicht es. Eine Wortkombination (`fallobst-schleswig-24`) statt
eines einzelnen Wörterbuchworts erhöht den Aufwand nochmals deutlich.

### 3. Prüfen

```bash
curl -H "x-zugangswort: DEIN-ZUGANGSWORT" "https://DEINE-SITE.netlify.app/api/health?live=1"
```

Das macht einen **echten** Mini-Modellaufruf und meldet jedes Problem im Klartext.
`"status": "ok"` heißt: Wissensbasis geladen, Schlüssel gültig, Modell erreichbar.

> **Ohne Zugangswort** antwortet `/api/health` nur mit `status` und der
> Angabe, ob ein Zugangswort verlangt wird. Modellname, Umfang der
> Wissensbasis, Korrekturstand und Problemliste sind Betriebsinterna und
> kommen nur mit dem Header. Der Live-Test ebenso — sonst könnte jeder, der
> die Adresse kennt, auf eure Rechnung Modellaufrufe auslösen.

> **Nach jedem Deploy einmal aufrufen.** Der Vorgänger-Bot war wochenlang tot,
> weil das Modell beim Anbieter abgekündigt wurde und niemand es merkte.

---

## Lokal ausprobieren

```bash
cp .env.example .env
```

Werte eintragen, dann:

```bash
node dev-server.mjs
```

→ http://localhost:8888 · Kein `npm install` nötig, keine Abhängigkeiten.
Ohne API-Schlüssel läuft alles außer der Modellantwort — Formular, Validierung,
Sicherheits-Gate und Retrieval funktionieren.

Tests — die Bausteine (Gate, Seriennummern, Widersprüche, Gewichtung):

```bash
node netlify/functions/lib/tests.mjs
```

Antwortqualität — ob am Ende auch das Richtige herauskommt:

```bash
THI_RATE_LIMIT=999 THI_DAILY_LIMIT=9999 node dev-server.mjs
npm run eval -- --judge
```

Die Selbsttests sagen nichts darüber, ob die fertige Antwort stimmt. Der
Antwort-Eval stellt dem laufenden Server 41 Gold-Fragen mit hinterlegtem Beleg
und lässt ein Modell beurteilen, ob die Antwort gedeckt ist. Er kostet echte
Modellaufrufe und einige Minuten — also vor Releases, nicht bei jedem Speichern.
Das erhöhte Rate-Limit ist nötig, weil 41 Anfragen über dem Normalwert (20 je
5 Minuten) liegen. Mehr dazu unter „Antwortqualität messen".

---

## Was die App kann

**Strukturierte Fallaufnahme** — Fahrzeug (30 Modelle, über alle Schwestermarken
suchbar), Aufbau, verbaute Produkte (48 Artikel mit echten Artikelnummern),
Seriennummer, Softwarestand, Fehlerbild.

**Live-Validierung während der Eingabe:**
- **Seriennummer → Produkt**: `1050-118` wird sofort als „WiPro III safe.lock" erkannt
- **Seriennummer → Fahrzeug**: eine Ford-Set-Nummer (`5298-`) bei einem Fiat Ducato
  wird als Widerspruch gemeldet
- **Baujahr → Fahrzeuggeneration**: Baujahr außerhalb des dokumentierten Zeitraums
  wird angezeigt, statt still eine falsche DIP-Stellung zu liefern

**Sicherheits-Gate** — Bei Anzeichen akuter Gefahr (Gasgeruch, Rauch, Brandgeruch,
Überhitzung, CO-Alarm, körperliche Symptome) bricht die App ab und zeigt die
Eskalationsanweisung, **ohne** das Modell zu fragen. Produktnamen, die selbst
Gefahrenwörter enthalten (`détecteur de fumée`, `Rauchmelder`, `Gaswarner`),
lösen das Gate nicht aus — eine echte Gefahr im selben Satz aber schon.

**Belegte Antworten** — Jede Aussage stützt sich auf die Dokumentation, mit
Angabe des konkreten Abschnitts. Findet Thi nichts Gesichertes, verweist er auf
den Support statt zu raten.

**Zweisprachig** — Oberfläche, Prompts und Suche auf Deutsch und Französisch.
Reichen die französischen Quellen nicht, wird auf den deutschen Bestand
zurückgegriffen; die Antwort bleibt französisch und die Quelle wird markiert.

---

## Oberfläche — gebaut für die Aufnahme am Telefon

Das Leitbild ist ein THITRONIK-Mitarbeiter, der einen Kunden am Hörer hat und
mitschreibt. Daraus folgt alles Weitere.

**Die Reihenfolge folgt dem Gespräch, nicht dem Aktenformular:**

| | | |
|---|---|---|
| **1 Anliegen** | Was schildert der Kunde? | *er redet zuerst* |
| **2 Produkt** | Welches Gerät ist verbaut? | *erste Rückfrage* |
| **3 Fahrzeug** | Auf welchem Fahrzeug? | *zweite Rückfrage* |
| **4 Gerät** | LED, App-Meldung, bereits geprüft | *Diagnose-Nachfragen* |

Die Seriennummer steht bewusst **nicht** am Anfang: Dafür muss der Kunde
aufstehen und aufs Typenschild schauen. Wer damit beginnt, blockiert das
Gespräch, bevor es angefangen hat.

**Asymmetrisches Layout statt gleicher Spalten.** Links (breiter) wird
mitgeschrieben, was der Kunde erzählt — Fließtext braucht Platz. Rechts stehen
die harten Fakten: Auswahl, Nummern, Typen. Drei gleich breite Karten würden
diesen Unterschied einebnen; auf schmalen Schirmen stapeln sich die Blöcke in
der Reihenfolge 1→2→3→4.

**Nur das Anliegen ist Pflicht.** Am Telefon liegen Fahrzeug oder Seriennummer
oft noch nicht vor. Wer dort blockiert, erzwingt Platzhalter — und die sind
schlimmer als eine Lücke. Fehlende Angaben senken stattdessen sichtbar die
Sicherheit.

**Belastbarkeit live.** Über der Faktenspalte steht ein Prozentwert, der beim
Ausfüllen mitwächst, plus die Liste dessen, was noch fehlt. Der Mitarbeiter
sieht während des Telefonats, ob er genug hat oder noch nachfragen sollte.

### Mitschreiben statt ausfüllen

Das Anliegen-Feld ist ein **Freitextfeld**: einfach mitschreiben, während der
Kunde erzählt. Fahrzeug, Baujahr, Produkt, Seriennummer, Softwarestand und
Blinkcode zieht Thi selbst heraus und bietet sie als Chips zum Übernehmen an —
einzeln oder alle auf einmal.

> *„Kunde hat nen Ducato von 2023, WiPro III safe.lock drin, Seriennummer
> 1050-118. Die Zentralverriegelung geht beim Scharfschalten nicht mit zu.
> LED blinkt 2x rot."*
>
> → erkennt **Fiat Ducato 8/9 (2022–2024)**, **Baujahr 2023**,
> **WiPro III safe.lock**, **1050-118**, **LED 2x rot**

Zwei bewusste Entscheidungen:

- **Ohne Sprachmodell.** Die Erkennung läuft lokal gegen die Kataloge
  (`erkennung.js`): sofort beim Tippen, ohne Aufruf je Tastendruck, und jeder
  Treffer lässt sich auf eine Katalogzeile zurückführen statt auf ein Modell.
  Umgangssprache ist mitgedacht — „Gaswarner", „Handsender", „Alarmanlage".
- **Vorschlagen, nicht setzen.** Erkanntes landet als Chip, den man drückt oder
  ignoriert. Eine falsch erkannte Seriennummer, die niemand gegenliest, wäre
  schlimmer als gar keine Erkennung.

**Diktieren** geht auch — der Knopf erscheint nur, wo der Browser die Web Speech
API beherrscht. Das Diktat schreibt in dasselbe Feld, die Erkennung greift
genauso.

### Fallverlauf

Die letzten 12 Fälle bleiben **lokal auf dem Gerät** (localStorage, keine
Kontaktdaten). Ruft derselbe Kunde zurück, lädt ein Klick den kompletten Fall
zurück ins Formular — Fahrzeug, Produkt, Seriennummer, Mitschrift. Jeder Eintrag
zeigt den erreichten Sicherheitswert, sodass man sieht, welcher Fall noch offen war.

**Nur hell, bewusst leise.** Die App ist ein Arbeitswerkzeug am Telefon, kein
Schaufenster. Die THITRONIK-Palette wird deshalb sparsam eingesetzt: Navy
trägt Handlung und Struktur (Primärknopf, Schrittnummern, Überschriften),
Lime steht ausschließlich für „gut" (Belastbarkeit hoch, kopiert,
freigegeben), Cyan für Information, Rot für Gefahr und Widerspruch. Eine
Flächenebene, Hairline-Rahmen statt Schatten, Schatten nur auf Überlagerungen.
Alle Werte stehen als Token am Anfang von `styles.css`; ein Farb- oder
Abstandswechsel ist eine Zeile, kein Umbau. Ein Dunkelmodus wurde bewusst
gestrichen: zweiter Pflegeaufwand bei jedem Umbau, ohne Nutzen am Arbeitsplatz.

**Zahlen sind Daten, keine Prosa.** Seriennummern, Baujahre und Softwarestände
laufen in Monospace mit tabellarischen Ziffern — das macht Stellen vergleichbar
und Tippfehler sichtbar (`0699-045` vs. `0699-O45`).

### Logo austauschen

```bash
node werkzeuge/logo-bauen.mjs pfad/zum/original.png
```

Erwartet das Original mit **transparentem** Hintergrund. Verwendet wird
`logo-hell.webp`; die ebenfalls erzeugte Negativfassung `logo-dunkel.webp`
bleibt als Reserve liegen, seit der Dunkelmodus entfallen ist.

- **Keine farbige Platte** unter das Logo. Ein Logo auf einer eigens gelegten
  Fläche sieht nach Notlösung aus, weil es eine ist.
- **Leerrand wird entfernt.** Die Originaldatei hatte 46 % Rand; bei fester
  CSS-Höhe wirkt das Logo dadurch klein, ohne dass man den Grund sieht.

---

## Wie sicher ist die Antwort?

Jede Antwort trägt einen Prozentwert mit Begründung. Er entsteht aus
**nachvollziehbaren Faktoren**, nicht aus einer Selbsteinschätzung des Modells —
Sprachmodelle klingen bei erfundenen Antworten genauso überzeugt wie bei
belegten.

| Anteil | Was zählt |
|---|---|
| **Datenlage** (max. 40) | Problembeschreibung, Produkt, Fahrzeug, Seriennummer, LED |
| **Quellenlage** (max. 45) | Score des besten Treffers, Anzahl tragfähiger Quellen |
| **Modell** (max. 15) | Selbsteinschätzung über einen unsichtbaren Marker in der Antwort |

**Abzüge** für Widersprüche und für französische Anfragen, die auf deutsche
Quellen zurückfallen mussten.

> **Widersprüche deckeln, statt nur abzuziehen.** Passt die Seriennummer nicht
> zum Fahrzeug, ist eine der Grundannahmen falsch — dann kann die Antwort auch
> bei perfekter Quellenlage nicht „sicher" sein. Ein Widerspruch begrenzt auf
> 60 %, zwei auf 45 %. Ohne diesen Deckel käme ein widersprüchlicher Fall mit
> starken Quellen auf 85 % — die gefährlichste Kombination überhaupt:
> überzeugend und falsch.

Darunter steht, was die Antwort sicherer machen würde — als konkrete Liste, nicht
als Floskel.

**Belegstellen sind aufklappbar.** Es gibt hier keine Wiki-Seite zum Verlinken,
also reist der Originaltext mit der Antwort: ein Klick auf die Quelle zeigt den
Abschnitt, auf den Thi sich stützt. Standardmäßig zugeklappt, damit die Antwort
die Aufmerksamkeit behält. Eine Quellenangabe, die man nicht nachlesen kann,
wäre bloß Dekoration.

**Fall + Antwort kopieren.** Der nächste Arbeitsschritt nach dem Telefonat ist
fast immer „ins Ticketsystem übertragen". Ein Klick legt alles als sauber
formatierten Klartext in die Zwischenablage — inklusive Sicherheitswert. Fällt
die Clipboard-API aus (über HTTP im LAN gibt es sie nicht), greift ein Fallback.

---

## Aufbau

```
app/
├─ netlify.toml              Konfiguration (Redirects, Header, Function-Timeout)
├─ .env.example              Vorlage für die Umgebungsvariablen
├─ dev-server.mjs            lokaler Server, bildet Netlify nach
│
├─ public/                   das Frontend (wird statisch ausgeliefert)
│   ├─ index.html
│   └─ assets/
│       ├─ css/styles.css      THITRONIK-CI, hell + dunkel, responsiv ab 375 px
│       ├─ js/app.js           Formular, Validierung, Chat, Streaming
│       ├─ js/i18n.js          alle Texte DE/FR
│       ├─ js/erkennung.js     Freitext → Strukturfelder (ohne Sprachmodell)
│       ├─ js/kataloge.js      30 Fahrzeuge, 48 Produkte, 11 SN-Präfixe
│       └─ img/logo.png
│
├─ netlify/functions/
│   ├─ chat.mjs              Hauptendpunkt: Gate → Validierung → RAG → Modell
│   ├─ health.mjs            Konfigurations- und Modellprüfung
│   ├─ korrektur.mjs         Support-Korrekturen: anlegen, freigeben (Commit per GitHub-API)
│   └─ lib/
│       ├─ fall.mjs            Sicherheits-Gate, Widersprüche, Gewichtung
│       ├─ korrekturen.mjs     Korrektur-Notizen: Schema, Sperrliste, Lebenszyklus
│       ├─ prompts.mjs         System-Prompts DE/FR
│       ├─ search-core.js      Retrieval-Kern (aus dem produktiven Vorgänger)
│       ├─ sicherheit.mjs      Prozentwert der Antwort
│       └─ tests.mjs           163 Selbsttests
│
├─ werkzeuge/
│   ├─ antwort-eval.mjs     misst die Antwortqualität gegen das Gold-Set
│   ├─ deploy-pruefen.mjs   prüft vor dem Upload auf Schlüssel, Lücken, Altlasten
│   ├─ korrekturen-pruefen.mjs prüft den Korrektur-Bestand offline (Bezug, Sperrliste, Flutung)
│   ├─ daten-bauen.mjs       erzeugt data/*.mjs aus data/*.json
│   ├─ logo-bauen.mjs        erzeugt beide Logo-Fassungen aus einem Original
│   └─ favicon-bauen.mjs     erzeugt alle Favicon-Größen aus dem App-Logo
│
└─ data/                     Wissensbasis
    ├─ artikel.mjs             ← wird importiert (224 Artikel, 2,9 MB)
    ├─ sektionen.mjs           ← wird importiert (2.591 Abschnitte, 2,5 MB)
    ├─ artikel.json            lesbare Zwischenstufe
    ├─ sektionen.json          lesbare Zwischenstufe
    ├─ korrekturen.mjs         ← wird importiert (Support-Korrekturen)
    └─ korrekturen.json        die Quelle dazu; wird von korrektur.mjs per Commit geschrieben
```

> **Warum `.mjs` statt die `.json` zur Laufzeit zu lesen?** Ein `readFileSync` in
> einer Netlify Function hängt daran, dass `included_files` greift, dass der
> Bundler die Pfade erhält und dass `process.cwd()` das ist, was man erwartet —
> und das fällt je nach Deploy-Methode (Git-Build vs. Drag & Drop)
> unterschiedlich aus. Ein `import` ist für den Bundler dagegen eine **harte
> Abhängigkeit**: Er nimmt die Daten immer mit. Verifiziert, indem die Functions
> aus einem fremden Arbeitsverzeichnis heraus gestartet wurden.

---

## Wissensbasis aktualisieren

`data/*.json` entsteht aus dem THITRONIK-Wiki (Ablauf:
`../docs/02_ZIELARCHITEKTUR.md` §5). Danach die Importmodule neu bauen:

```bash
node werkzeuge/daten-bauen.mjs
```

Das Skript meldet Einträge, Sprachverteilung und die **durchschnittliche
Textlänge**. Fällt letztere gegenüber dem Vorlauf unerwartet, hat der Ingest
still Text verloren — der teuerste Fehler des Vorgängersystems
(`../docs/01_RAG_WISSENSTRANSFER.md` §1.1). Nach dem Deploy bestätigt
`/api/health` dieselben Zahlen aus der laufenden Function.

---

## Login und Rollen

Seit 17.09.2026 meldet sich jede Person mit E-Mail und Passwort an. Zugang
gibt es nur per Einladung durch einen Admin; das Passwort setzt jede Person
selbst über den Link in der Mail. Nutzer, Rollen und Audit-Log liegen in
Supabase (Projekt `thitronik-thi`, Frankfurt, Schema `thi`,
`supabase/migrations/0001_grundgeruest.sql`).

| Rolle | darf |
|---|---|
| Mitarbeiter | Fälle aufnehmen, interne Artikel lesen, Korrekturen einreichen, eigene zurückziehen |
| Wissensmanager | zusätzlich freigeben, fremde zurückziehen, „im Wiki“ setzen |
| Admin | zusätzlich Nutzer einladen, sperren, Rollen setzen |

**Einrichten.** `THI_SUPABASE_URL`, `THI_SUPABASE_SECRET_KEY` und
`THI_ERSTADMIN` in Netlify setzen. Beim ersten Aufruf der Seite wird die
Erstadmin-Adresse angelegt und bekommt die Mail zum Passwort-Setzen. In
Supabase muss das Schema `thi` unter Data API als „Exposed schema“ stehen,
die Site URL auf die App zeigen und die Selbstregistrierung aus sein.

**Was sich geändert hat.** Der Browser spricht nie mit Supabase, nur mit
`/api/auth`; der Secret Key bleibt in der Function. Die Vier-Augen-Regel bei
Korrekturen prüft die Nutzer-ID, nicht mehr ein Namensfeld. Rate-Limit und
Tageslimit zählen in der Datenbank über alle Instanzen, je Person statt je
IP. Jede Freigabe, Sperre und Rollenänderung steht in `thi.audit`.

**Übergang.** Ohne die Supabase-Variablen läuft das alte gemeinsame
Zugangswort weiter, und der Health-Check meldet das als Übergangsbetrieb.

**Rechte prüfen:** `lib/auth.mjs` hat die Rechte-Matrix an einer Stelle.
Ein neues Recht ist eine Zeile dort, kein verstreutes `if`.

## Support-Korrekturen

Das Wissen der Support-Mitarbeiter steht zu großen Teilen nicht im Wiki. Wenn
Thi falsch antwortet, kann ein Mitarbeiter die Antwort direkt korrigieren —
Knopf **„Antwort korrigieren"** unter jeder Antwort. Die Entwürfe mit
Messungen und der Begründung der Entscheidungen stehen in
`../docs/07_KORREKTUREN_ENTWUERFE.md`.

**Was eine Korrektur ist — und was nicht.** Sie verändert **nie** den Wiki-Text.
Sie ist ein eigener kleiner Eintrag mit Titel, Korrekturtext, Bezug auf die
Belegstelle, Name und Datum. Thi durchsucht diese Einträge wie Artikel und legt
sie garantiert bei, sobald ihr Bezugsartikel im Kontext liegt. Im Kontextblock
steht sie als „SUPPORT-KORREKTUR (Status: …), erfasst von …" — das Modell
nennt sie deshalb als das, was sie ist, nicht als „laut Wiki".

**Wo sie gespeichert wird.** In `data/korrekturen.json`, per Commit ins
Repository — Git ist die Datenbank. Die Function schreibt JSON und das daraus
gebaute `korrekturen.mjs` atomar in einen Commit auf `main`; Netlify deployt.
Damit gibt es Historie (`git log -- app/data/korrekturen.json`), Diff, `git
revert` und Netlify-Rollback, ohne Datenbank und ohne npm-Paket.
**Konsequenz: Eine Korrektur wirkt erst nach dem Deploy**, nicht sofort. Die
Oberfläche sagt das.

**Lebenszyklus.**

| Status | wirkt? | Prozentwert | wer setzt ihn |
|---|---|---|---|
| `ungeprueft` | ja, gekennzeichnet | **Deckel 60 %** | automatisch beim Anlegen |
| `wartet-freigabe` | **nein** | — | automatisch bei Sicherheitsthemen |
| `freigegeben` | ja | kein Deckel, Herkunft in den Gründen | Freigabewort |
| `zurueckgezogen` | nein | — | jeder mit Zugangswort |
| `im-wiki` | nein — Inhalt steht jetzt im Wiki | — | Freigabewort |

Der Zielzustand ist `im-wiki`: Thi ist nicht das Wiki. Eine Korrektur ist eine
Warteschlange für die Wiki-Redaktion, die sofort in Thi wirkt. Ohne diesen
Rückweg entstünden zwei Wahrheiten.

**Sicherheitsthemen wirken nie sofort.** Korrekturen zu Gas, CO, Rauchmelder
und Abschalteinrichtung (Sperrliste über den Bezugsartikel: 20 DE-Artikel,
gemessen) sowie jeder Korrekturtext, der diese Begriffe nennt oder das
Gefahren-Gate auslösen würde, starten als `wartet-freigabe`. Die Freigabe
verlangt eine Begründung. Das Gate selbst ist Code, keine Daten — es lässt sich
per Korrektur nicht verändern.

**Freigeben.** Kopfzeile → **Korrekturen** öffnet die Liste. Freigeben und „Im
Wiki übernommen" verlangen das Freigabewort — `THI_FREIGABEWORT`, oder, wenn
das leer ist, das Zugangswort. Fehlen beide, sind Freigaben deaktiviert
(fail-closed), nicht offen. **Vier-Augen-Regel:** Wer eine Korrektur eingereicht
hat, kann sie nicht selbst freigeben; der Kollege muss es tun. Der Name ist ein
Formularfeld und wird im Commit als Autor eingetragen — eine Angabe, kein
Nachweis.

**Einrichten.** Ein feingranulares GitHub-Token (nur dieses Repository, nur
*Contents: Read and write*) als `THI_GITHUB_TOKEN` in Netlify hinterlegen.
Ohne Token läuft alles, nur Speichern meldet HTTP 503 im Klartext.

**Prüfen, ohne Modell.**

```bash
node werkzeuge/korrekturen-pruefen.mjs
```

Prüft Schema und Bezug (verwaist nach einem Wiki-Neuimport?), Status gegen
Sperrliste, Flutung gegen die 41 Gold-Fragen, ob der Korrekturtext inzwischen
wörtlich im Wiki steht (→ `im-wiki`), und Wiedervorlage nach 60 Tagen. Der
Health-Check meldet überfällige Korrekturen ebenfalls. `deploy-pruefen`
verlangt, dass `korrekturen.mjs` und `.json` inhaltsgleich sind.

**Gemessen (16.09.2026, ohne Modellaufruf):** Ein Korrektur-Eintrag zur
Handsender-Batterie landet bei der passenden Frage auf Platz 2 hinter dem
Wiki-Artikel (Score 77 zu 100), taucht bei 1 von 41 Gold-Fragen in fremden
Top-8 auf, und eine ungeprüfte Korrektur senkt einen sonst starken Fall auf
höchstens 60 %.

---

## Antwortqualität messen

Die 115 Selbsttests prüfen die **Bausteine**. Ob am Ende die richtige Auskunft
herauskommt, sagen sie nicht — und genau dort lag der Auslöserfall des
Vorgängerprojekts: Quelle gefunden, Antwort trotzdem falsch.

```bash
THI_RATE_LIMIT=999 THI_DAILY_LIMIT=9999 node dev-server.mjs   # Terminal 1
npm run eval -- --judge                                        # Terminal 2
```

Der Eval stellt dem laufenden Server die 41 Gold-Fragen aus
`../daten/thi-eval-gold.de.json` — jede mit wörtlichem Beleg aus dem Wiki — und
lässt ein Modell beurteilen, ob die Antwort davon gedeckt ist. Er misst die
echte Kette: Frage rein, Antwort raus, kein nachgebauter Kontext.

| Schalter | Wirkung |
|---|---|
| `--judge` | LLM bewertet semantisch statt per Substring. **Empfohlen** |
| `--min 80` | Gate: Exit 1, wenn die Quote darunter liegt |
| `--limit 10` | nur die ersten n Fälle (zum Ausprobieren) |
| `--verbose` | alle Fehlschläge im Detail statt der ersten 20 |
| `--sprache fr` | FR-Lauf — **es gibt noch kein FR-Gold-Set** |

**Warum das erhöhte Rate-Limit?** 41 Anfragen liegen über dem Normalwert (20 je
5 Minuten). Ohne die Anhebung bricht der Lauf ab — der Eval sagt das dann auch.

### Was der Bericht außer der Quote noch zeigt

- **Quellenbeleg** — lag die erwartete Quelle überhaupt im Kontext? Das trennt
  „Retrieval hat sie nicht gefunden" von „Retrieval hatte sie, das Modell hat
  sie ignoriert". Zwei Fehler, zwei völlig verschiedene Gegenmittel.
- **Kalibrierung** — liegt die Prozentanzeige bei falschen Antworten niedriger
  als bei richtigen? Eine falsche Antwort mit hoher Sicherheit ist der einzige
  Fehler, der aktiv schadet: Ohne die Anzeige hätte der Monteur selbst
  nachgesehen.
- **Gate-Fehlalarm** — hat das Sicherheits-Gate bei einer reinen Sachfrage
  ausgelöst? Solche Fälle bekommen die Notfallantwort statt einer Auskunft.
- **Routen-Drift** — zeigt ein Gold-Fall noch auf einen Artikel, den es gibt?
  Ein Gold-Set veraltet leiser als Code.

> **Bevor ein Fehlschlag als Regression gilt:** prüfen, ob der Bot falschliegt —
> oder ob der Gold-Beleg unvollständig ist bzw. der Judge sich geirrt hat. Beides
> ist vorgekommen (`../docs/05_EVAL_UND_QUALITAET.md` §3).

### Wie genau ist die Quote?

**Ein Unterschied von ein bis zwei Fällen ist Rauschen.** Der Chat-Endpunkt legt
keine feste Temperatur fest, die App formuliert also jedes Mal etwas anders, und
bei Grenzfällen kippt das Urteil. Gemessen: Zwischen zwei Läufen über dasselbe
Gold-Set wandern drei bis vier Fälle in beide Richtungen, während die Gesamtquote
gleich bleibt. Der Judge selbst läuft mit `temperature: 0`, damit wenigstens
seine Seite reproduzierbar ist.

**Für die Bewertung einer Retrieval-Änderung ist dieser Lauf deshalb zu grob.**
Besser deterministisch messen: „Steht der Gold-Beleg im Kontextblock?" — das
braucht keinen Modellaufruf, ist exakt wiederholbar und trifft genau die Frage.
So wurde die Fensterwahl geprüft (siehe „Bekannte Grenzen").

---

## Was geprüft ist — und was nicht

**Geprüft (lokal):**
- 115 Selbsttests (Sicherheits-Gate, Seriennummern, Widersprüche, Gewichtung,
  Textfensterwahl)
- Durchlauf im Browser in beiden Sprachen, Desktop und 375 px
- Retrieval liefert für DE- und FR-Fragen die richtigen Abschnitte
- Functions laufen **aus einem fremden Arbeitsverzeichnis** — also ohne die
  Annahme, dass `process.cwd()` stimmt
- `netlify.toml` enthält nur dokumentierte Schlüssel
- **Antwortqualität gegen das Gold-Set** — 41 Fälle, LLM-Judge, echter
  Modellaufruf: **34/41 belegt korrekt (82,9 %)**. Ohne die zwei Fälle, die das
  Sicherheits-Gate abfängt (siehe unten), 34/39 = 87 %. Quellenbeleg 38/39
  (97 %). Kalibrierung: 54 % bei richtigen gegen 44 % bei falschen Antworten,
  **kein einziger Fall hoch-und-falsch**.
- **Fensterwahl im Kontext** — deterministisch, ohne Modellaufruf: Der Gold-Beleg
  liegt jetzt in **16 von 24** prüfbaren Fällen im Kontext statt in 11.

**Nicht geprüft — hier braucht es einen echten Deploy:**
- Der tatsächliche Netlify-Build (kein Netlify-Konto in der Entwicklung verfügbar)
- **Französisch, in jeder Hinsicht.** Es existiert kein FR-Gold-Set; die
  FR-Antworten sind nie gegen Belege gemessen worden.

> **Deshalb nach dem ersten Deploy zuerst `/api/health?live=1` aufrufen.** Das
> beantwortet beide offenen Punkte in einem Schritt: Es meldet, ob die
> Wissensbasis in der Function angekommen ist **und** ob der Modellaufruf
> durchgeht.

---

## Bekannte Grenzen

- **Retrieval ist lexikalisch**, nicht hybrid. Der ausgemessene Kern des
  Vorgängers wurde übernommen und um die Formular-Steuerung erweitert (das ist
  der große Gewinn), aber Embeddings fehlen. Für Synonym- und
  Umschreibungsfragen ist das die bekannte Obergrenze — siehe
  `../docs/01_RAG_WISSENSTRANSFER.md` §2.7.
- **Die Modellwahl ist durch das Function-Zeitbudget begrenzt.** Netlify bricht
  eine normale Function nach **30 Sekunden** ab — das ist eine Obergrenze der
  Plattform, keine Einstellung. Ein Modellwechsel muss diese Grenze einhalten,
  und der reale Prüfstein ist ein *echter* Fall mit acht Quellen (rund 20.000
  Zeichen Kontext), nicht eine kurze Testfrage.

  Gemessen am 16.09.2026 in Produktion: `anthropic/claude-sonnet-4.6` antwortet
  in etwa vier Sekunden. Das **Reasoning-Modell `waterfall-2.0` riss die 30
  Sekunden** und wurde abgebrochen — im Log steht dann glatt `Duration: 30000 ms`,
  und der Nutzer sieht nur die Belegstellen ohne Antwort und ohne Prozentwert
  (die Quellenliste geht sofort raus, der Text kommt nie). Eine kurze Testfrage
  lief davor in 8,7 Sekunden durch und hätte das Problem nicht gezeigt.

  Wer das Modell wechselt: danach `/api/health?live=1` **und** einen echten Fall
  in der Oberfläche prüfen. Bleibt der Antworttext leer, ist es das Zeitbudget —
  nachzusehen unter Cloud compute → Functions → `chat` → Function log.

- **Rate-Limit zählt pro Function-Instanz**, ist also nur eine grobe Bremse.
  Der eigentliche Schutz ist das Zugangswort. Der Live-Health-Check verlangt
  es seit 17.09.2026 ebenfalls; sein Ergebnis wird zusätzlich 60 Sekunden je
  Instanz zwischengespeichert.
- **Ein gemeinsames Zugangswort ist keine Identität.** Es lässt sich nicht pro
  Person entziehen, und der Name bei Korrekturen ist ein Formularfeld. Die
  Zugangsprüfung ist deshalb in `lib/zugang.mjs` gebündelt — der Wechsel auf
  ein Login mit Rollen (Mitarbeiter, Wissensmanager, Admin) ist an genau einer
  Stelle vorgesehen und in Planung.
- **Anleitungen und FAQ liegen nur auf Deutsch** im Index. Der französische Text
  existiert in den Quell-PDFs, ist aber noch nicht sprachgetrennt indexiert —
  siehe `../docs/04_MEHRSPRACHIGKEIT_DE_FR.md` §1.2.
- **Kein französisches Gold-Set**: Die französische Antwortqualität ist nicht
  systematisch gemessen. Vor breitem Einsatz in Frankreich nachholen.

Vom Antwort-Eval aufgedeckt (Lauf über 41 Fälle, siehe oben):

- ~~**Das Sicherheits-Gate eskaliert bei jeder Frage, in der „Kohlenmonoxid"
  vorkommt.**~~ **Behoben.** Die Regel unterschied nicht zwischen dem *Ereignis*
  („der CO-Alarm geht") und dem *Thema* („warnt der T.S.A. vor Kohlenmonoxid?").
  Ein CO-Alarm eskaliert unverändert immer; ausgenommen ist nur, wer erkennbar
  nach einer Fähigkeit **fragt** und dabei **kein** Ereignis schildert. Dabei
  fielen zwei ältere Lücken auf: `/\bübel\b/` traf **nie** (`\b` ist auf ASCII
  definiert, „ü" ist keines — „Mir ist übel." lief am Gate vorbei), und ein
  anschlagendes CO-Gerät zählte nicht als Alarm. Gold-Fragen, die das Gate
  fälschlich auslösen: **2 von 41 → 0 von 41**.
- ~~**Das Modell verweigert die Auskunft, obwohl der Beleg im Kontext liegt.**~~
  **Behoben.** Vier Antworten sagten „dazu macht die Dokumentation keine
  Aussage", obwohl die richtige Quelle mitgeliefert wurde — der Satz selbst war
  nur nicht dabei. Ursache war die Wahl des Textausschnitts, an zwei Stellen:
  Die beiden besten Quellen bekamen **die ersten 6000 Zeichen** des Artikels,
  unabhängig von der Frage (Median-Artikel: 11.873 Zeichen), und `extractSnippet`
  sprang zur **ersten** Fundstelle des längsten Suchbegriffs — und der steht im
  Titel. Beide Fenster landeten damit verlässlich am Textanfang, während die
  Antwort bei Zeichen 7264 bis 10356 stand. Jetzt wird das Fenster nach der
  Begriffsdichte gesetzt, seltene Begriffe wiegen schwerer. Deterministisch
  gemessen: Belege im Kontext **11/24 → 16/24**, fünf gewonnen, keiner verloren.
- **Die Sicherheitsanzeige ist ehrlich, aber zu leise.** Sie zeigt bei falschen
  Antworten zuverlässig weniger als bei richtigen (47 % gegen 53 %) und lag in
  keinem einzigen Fall hoch-und-falsch — die gefährliche Ecke ist leer. Nur
  liegt auch der Normalfall bei ~53 %: 6 von 34 korrekten Antworten wurden unter
  50 % ausgewiesen. Wer richtige Auskünfte dauerhaft mit „gering" beschriftet,
  bringt niemandem bei, auf den Wert zu achten.
