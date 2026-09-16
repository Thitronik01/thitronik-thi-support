# Die Formatvorlage — Feldschema und Retrieval-Wirkung

> **Die Leitfrage:** Welche Angaben braucht das Formular, damit der RAG die
> Knowledge Base **bestmöglich** durchsucht?
>
> Die Antwort ist nicht „möglichst viele". Jedes Feld muss sich rechtfertigen —
> entweder es **verändert das Retrieval** oder es ist nur Ticket-Metadatum.
> Dieses Dokument trennt beides sauber.

---

## 0. Gute Nachricht vorweg: Die Vorlage existiert bereits

`daten/support-fallaufnahme.de.md` (und `.fr.md`) ist ein **redaktionell gepflegter,
in 11 Sprachen übersetzter** Wiki-Artikel: „Support-Fallaufnahme — Pflichtangaben
und Eskalationsprüfung", Stand 2026-07-15, `confidence: high`.

Er enthält bereits:
- Pflichtangaben nach Kontakt / Fahrzeug / System / Fehlerbild / Belege
- eine **Themen-Matrix**: was pro Produktbereich *zusätzlich* zu erfassen ist
- eine Copy/Paste-Ticketvorlage
- Eskalations- und Sicherheitsgrenzen

> **Empfehlung: Nicht neu erfinden.** Dieser Artikel ist die fachliche Autorität.
> Das Formular ist seine **strukturierte, maschinenlesbare Fassung**. Änderungen am
> Fachinhalt gehören ins Wiki, nicht ins Formular — sonst driften beide auseinander.

---

## 1. Das Prinzip: Retrieval-wirksam vs. Ticket-Metadatum

Der entscheidende Denkfehler wäre, alle Formularfelder in einen Prompt-Block zu
kippen. Dann verwässern Name, Telefonnummer und E-Mail die Retrieval-Query und
verschlechtern die Suche messbar (jeder zusätzliche Begriff senkt den
Coverage-Faktor — siehe `01_RAG_WISSENSTRANSFER.md` §2.6).

**Drei Klassen von Feldern:**

| Klasse | Wirkung | Beispiele |
|---|---|---|
| **A — Retrieval-Steuerung** | filtert/boostet den Index **vor** der Suche | Fahrzeug, Produkt, Seriennummer, Sprache |
| **B — Query-Anreicherung** | fließt als Text in die Suchanfrage | Fehlerbild, LED/Blinkcode, Auslöser |
| **C — Ticket-Metadatum** | erreicht das Retrieval **nie** | Name, Telefon, E-Mail, Einbaubetrieb |

**Klasse C gehört niemals in die Retrieval-Query** — und bei anonymisierter API
ohnehin nicht ins Modell. Sie bleibt im Ticket.

---

## 2. Klasse A — die Felder, die das Retrieval wirklich steuern

Das sind die „KPIs" der Vorlage im eigentlichen Sinn: Angaben, die den Suchraum
**verkleinern** oder **umgewichten**.

### A1 — Fahrzeug (Hersteller / Modell / Baujahr)

**Warum es das wichtigste Feld ist:** Der bestehende RAG wertet Fahrzeugartikel um
Faktor **0,35 ab**, wenn die Frage kein Fahrzeug nennt — weil sie sonst mit ihren
langen Einbauanleitungen alles verdrängen (`01_…` §2.2). Diese Abwertung ist ein
**Notbehelf gegen Ratlosigkeit**.

> **Mit strukturiertem Fahrzeugfeld dreht sich das um:** `vehicleIntent` ist kein
> Ratespiel mehr, sondern ein harter Fakt. Statt abzuwerten, kann der passende
> Fahrzeugartikel **hochgewichtet oder hart als Quelle gesetzt** werden — und alle
> *anderen* Fahrzeugartikel werden abgewertet. Das ist der größte einzelne
> Retrieval-Gewinn, den die Formatvorlage bringt.

**Datenquelle:** `daten/fahrzeug-matrix.json` — 30 Basisfahrzeuge, **alle 30 auch
auf Französisch vorhanden**, mit `route_de`, `route_fr`, Herstellern, Baujahren
und Badge-Varianten.

Abgedeckte Hersteller (13): Adria · Citroën · Fiat · Ford · Iveco · MAN ·
Mercedes · Nissan · Opel · Peugeot · Renault · Toyota · VW

**Wichtig — Badge-Engineering:** Ein Artikel deckt oft mehrere Marken ab, z. B.
„Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento (2014–2021)".
Die Auswahl muss deshalb über **alle Varianten** suchbar sein, nicht nur über den
erstgenannten Hersteller. Das Feld `badge_varianten` in der Matrix ist dafür da.

**Feldaufbau:**
```
fahrzeug: {
  slug:            <aus fahrzeug-matrix.json>   // → hartes Routing
  hersteller:      <Auswahl>                    // abgeleitet
  modell:          <Auswahl>                    // abgeleitet
  baujahr:         <Zahl>                       // → Plausibilisierung
  nicht_gelistet:  <bool>                       // → Fallback universalanschluss
}
```

**Fallback:** Es gibt `/de/fahrzeuge/universalanschluss` („ältere / nicht gelistete
Fahrzeuge"). Das Formular braucht die Option „Fahrzeug nicht in der Liste" — sonst
raten Nutzer und wählen das falsche Modell, was schlimmer ist als keine Angabe.

**Baujahr validieren, nicht nur erfassen:** Die Matrix enthält `baujahr_von`,
`baujahr_bis` und `baujahr_offenes_ende`. Passt das eingegebene Baujahr nicht zum
gewählten Modell, ist das ein **Widerspruch**, der sofort auffallen muss — sonst
liefert der Bot eine DIP-Stellung für die falsche Generation. Das ist
sicherheitsrelevant.

Drei Grenzfälle, die die Matrix bereits abbildet:
- **offenes Ende** (`baujahr_offenes_ende: true`) — „ab 2011", „2025+":
  `baujahr_bis` ist `null` und bedeutet *kein* fehlender Wert, sondern *läuft weiter*.
- **offener Anfang** — „bis 2006": `baujahr_von` ist `null`, `baujahr_bis: 2006`.
- **Fallback** (`ist_fallback: true`) — `universalanschluss` hat bewusst **keine**
  Baujahrsgrenzen und darf nie gegen ein Baujahr geprüft werden.

> Die Baujahre sind aus den Artikeltiteln abgeleitet und maschinell plausibilisiert
> (0 Widersprüche über alle 30). Vor dem produktiven Einsatz als **Validierungsregel**
> sollten sie dennoch fachlich gegengelesen werden — der Titel ist die Quelle, nicht
> eine gepflegte Stammdatentabelle.

---

### A2 — Aufbauhersteller und Aufbauart

Hier ist eine **ehrliche Lücke zu benennen:** Die Knowledge Base kennt aktuell
genau **einen** Aufbauhersteller-Artikel (Adria Coral/Matrix ab MJ 2021). Alle
anderen 29 Fahrzeugartikel sind **Basisfahrzeuge/Chassis**.

> **Konsequenz:** Ein Pflichtfeld „Aufbauhersteller" mit Dropdown wäre heute eine
> Attrappe — es gibt nichts dahinter zu durchsuchen. Empfehlung:
> - **Aufbauart** als strukturiertes Feld (Kastenwagen / teilintegriert /
>   vollintegriert / Alkoven / Liner) — das steht bereits im Fallaufnahme-Artikel
>   und ist retrieval-relevant (Türen, Klappen, Magnetkontakt-Anzahl).
> - **Aufbauhersteller** als **Freitext mit Autovervollständigung**, erfasst fürs
>   Ticket (Klasse C→B), nicht als harter Retrieval-Filter.
> - Sobald Aufbauhersteller-Artikel entstehen, wird das Feld zu Klasse A
>   hochgestuft. **Das ist der wertvollste Content-Ausbau** für diesen Bot.

Ebenfalls aus dem Fallaufnahme-Artikel und retrieval-relevant:
Aufbau-/Hecktür, **Startknopf ja/nein**, nachgerüstete Zentralverriegelung. Der
Startknopf trennt z. B. „VW Crafter / MAN TGE (2025+, **mit** Startknopf)" von
„(2017–2024, **ohne** Startknopf)" — zwei verschiedene Artikel.

---

### A3 — Verbaute THITRONIK-Produkte

**Kontrolliertes Vokabular, kein Freitext.** `daten/produkt-katalog.json` enthält
**48 Artikel mit produktiven, verifizierten Artikelnummern** in 6 Gruppen
(Alarmsystem, Zubehör, Gaswarnsystem, Rauchmelder, Fahrzeugortung,
Fahrzeugortung Zubehör).

> **Eine Lücke, die auffallen wird:** Ausgerechnet **WiPro III** und **WiPro III
> safe.lock** tragen in der Quelle *keine* Artikelnummer (die Zentralen werden als
> fahrzeugspezifische Sets geliefert). Für das Formular ist das unkritisch — die
> Identifikation läuft ohnehin über die **Seriennummer** (§A4), die hier sogar
> aussagekräftiger ist als eine Artikelnummer.

Wirkung im Retrieval: Die Produktauswahl wird auf den **kanonischen Slug**
abgebildet (`wipro-iii`, `pro-finder`, `gas-pro-iii` …) und boostet exakt diese
Artikel. Das ersetzt die Alias-Rateschleife des bestehenden RAG
(`PRODUCT_ALIASES`) durch eine Tatsache.

**Die Variantenfalle — der häufigste Support-Irrtum:**
- WiPro III **vs.** WiPro III **safe.lock**
- G.A.S.-pro **vs.** G.A.S.-pro **III** **vs.** G.A.S.-pro III **CO**
- BT-connect **vs.** Bluetooth-Vernetzungsmodul (zwei verschiedene Produkte!)

Der produktive Prompt weist das Modell ausdrücklich an, bei unklarer Variante
**nachzufragen statt aufzuzählen**. Das Formular muss die Variante deshalb
**erzwingen** — kein gemeinsamer Eintrag „WiPro III (alle)".

---

### A4 — Seriennummer: das stärkste Disambiguierungs-Signal

Das ist der Befund, der die Formatvorlage am meisten aufwertet. Aus
`content/wiki/de/seriennummern-softwarestaende.md`:

| Präfix | Produktfamilie | verrät zusätzlich |
|---|---|---|
| `0823-` | WiPro III | Standardzentrale |
| `1050-` | WiPro III safe.lock | v. a. Fiat/Sevel |
| `5298-` | WiPro III safe.lock **Ford-Set** | → Ford Transit/Custom |
| `5458-` | WiPro III safe.lock **Sprinter-Set** | → Sprinter/Crafter/TGE |
| `5832-` | WiPro III safe.lock **Renault-Set** | → Renault Master 2019–2024 |
| `0699-` | Pro-Finder | **Schwelle ab `0699-045`** (Hardwarewechsel + App) |
| `1290-` | Bluetooth-Vernetzungsmodul | ≠ BT-connect |
| `6000-` | BT-connect | eigene Linie |
| `5299-` | NFC Modul | — |

**Drei Regeln, die das Formular durchsetzen muss:**

1. **Präfix → Produktvariante automatisch ableiten.** Wer `1050-…` eingibt, hat
   safe.lock — auch wenn er im Produktfeld „WiPro III" angeklickt hat. Widerspruch
   anzeigen, nicht still überschreiben.

2. **Präfix → Fahrzeug kreuzvalidieren.** `5298-` (Ford-Set) bei gewähltem
   „Fiat Ducato" ist ein Widerspruch. Das früh zu fangen, verhindert die
   folgenschwerste Fehlerklasse: eine korrekte Antwort für das falsche System.

3. **Niemals numerisch über Reihen hinweg vergleichen.** Der Artikel sagt es
   ausdrücklich: Die Reihen `0823-`, `1050-`, `5298-`, `5458-`, `5832-` haben
   **eigene Softwarezweige**. „5832 > 1050" bedeutet **nichts**. Eine naive
   Größer-Kleiner-Logik im Formular oder im Prompt produziert hier falsche
   Kompatibilitätsaussagen.

**Format:** Präfix + laufender Stand, **führende Nullen erhalten** (`0699-045`).
Eingabemaske entsprechend, sonst geht die Null verloren und das Präfix stimmt nicht.

**Abgrenzung im UI erzwingen:** Artikelnummer (`100699`) ≠ Seriennummer
(`0699-045`). Die Verwechslung ist laut Wiki-Artikel ein bekanntes Problem.

---

### A5 — Softwarestand

Separat von der Seriennummer erfassen (Format `11.0.4`). Begründung aus dem Wiki:
Ein Seriennummerneintrag beschreibt die Zuordnung **bei Produktion** — ein späteres
Update kann den tatsächlichen Stand verändert haben.

Retrieval-Wirkung: Funktionsschwellen („Funktion X ab Stand Y") sind im Wiki
dokumentiert. Ohne Softwarestand kann der Bot Feature-Fragen nicht sicher
beantworten — und muss laut Prompt nachfragen. Das Feld spart diesen Turn.

Als **optional** kennzeichnen, mit „unbekannt/nicht ablesbar" als gültiger Antwort.
Ein Pflichtfeld, das Nutzer nicht ausfüllen können, produziert erfundene Werte.

---

### A6 — Sprache

`de` | `fr`. Steuert Index-Sprache, Antwortsprache und Terminologie. Siehe
`04_MEHRSPRACHIGKEIT_DE_FR.md` — dort auch die wichtige Regel, dass die
FR-Suche auf den **DE-Index zurückfallen** können muss.

---

## 3. Klasse B — Query-Anreicherung (das Fehlerbild)

Diese Felder werden **Text** in der Retrieval-Query. Der Fallaufnahme-Artikel
strukturiert das Fehlerbild bereits vorbildlich:

| Feld | Warum es das Retrieval verbessert |
|---|---|
| **Erwartetes vs. tatsächliches Verhalten** | getrennt erfassen — der Artikel betont das ausdrücklich |
| **Status-LED / Blinkcode / Signalton** | **hochspezifisch**, matcht Diagnosetabellen fast punktgenau |
| **App-Meldung / SMS-Wortlaut** | wörtlich erfassen — exakte Strings sind im Wiki dokumentiert |
| **Auslöser / Bedienreihenfolge** | trennt Bedienfehler von Defekt |
| **Reproduzierbarkeit** | dauerhaft / sporadisch / reproduzierbar |
| **Erstes Auftreten** | zusammen mit Einbaudatum → Einlauf- vs. Alterungsfehler |
| **Bisherige Maßnahmen + Ergebnis** | verhindert, dass der Bot Erfolgloses wiederholt |

> **Der stärkste einzelne Query-Begriff ist der Blinkcode/LED-Status.** Er ist
> lexikalisch selten (hoher IDF-Wert, `01_…` §2.5) und steht im Wiki in
> Diagnosetabellen. Wenn ein Feld im Formular prominent sein soll, dann dieses.

**Zustand vor/nach dem Fehler** — und hier eine Fachregel, die der Bot kennen muss:

> **Scharf-/Unscharfschalten der Alarmanlage und Ver-/Entriegeln der
> Zentralverriegelung sind unterschiedliche Vorgänge.**

Das steht als Grundregel im Fallaufnahme-Artikel. Das Formular sollte beide
**getrennt** abfragen, statt ein gemeinsames „Status"-Feld anzubieten — sonst
vermischt schon die Eingabe, was fachlich getrennt gehört.

---

## 4. Klasse C — Ticket-Metadaten (nicht ins Retrieval)

Name, Telefon, E-Mail, Einbaubetrieb, Einbaudatum¹, Land/Mobilfunknetz².

¹ *Einbaudatum* ist Grenzfall: Es geht nicht in die Suchquery, dient aber der
**Plausibilisierung** (Seriennummer vs. Einbaujahr) und ist damit A-nah.

² *Land/Mobilfunknetz* wird zu Klasse A, **sobald** der Fall Pro-Finder/SIM/SMS
betrifft — dann ist es retrieval-relevant (Roaming, Netzabschaltungen). Also:
**bedingtes Feld**, eingeblendet bei Produktauswahl Pro-Finder.

> **Datenschutz — steht so im Wiki-Artikel und gilt verschärft bei externer API:**
> Keine Passwörter, keine vollständigen SIM-PINs, keine Zugangsdaten. Bei
> anonymisierter API-Weitergabe gehört Klasse C **gar nicht** in den Payload.
> Das ist nicht nur Datensparsamkeit, sondern verbessert wie gezeigt auch die
> Retrieval-Qualität.

---

## 5. Bedingte Felder — die Themen-Matrix

Der Fallaufnahme-Artikel enthält eine Tabelle „Zusätzliche Angaben nach
Themenbereich". **Das ist die Blaupause für dynamische Formularfelder.** Auszug:

| Ausgewähltes Produkt | Zusätzlich einblenden |
|---|---|
| WiPro III / safe.lock | Fahrzeugvariante, **DIP-Stellung**, Zugangsweg, Blinkcode, getrenntes Verhalten Alarm/ZV |
| fahrzeugspez. ZV | Basisfahrzeug + Modelljahr, Original-/Aufbautüren, Startknopf, Verhalten von ZV/Blinker/Hupe/Sirene |
| Pro-Finder / SIM | SIM-Anbieter, Kartenformat, **PIN-Abfrage aktiv?**, Mailbox-/Rufumleitungsstatus, LED, Spannung, Befehl + Antwort wörtlich |
| BT-connect / Vernetzungsmodul | **Modultyp eindeutig**, Smartphone-Modell, OS- und App-Version, LED, bestehende Kopplungen |
| NFC Modul | Zugangsmedium, LED, Batteriezustand, Anlern-Reihenfolge |
| Funk-Zubehör | Montageort, **Entfernung zur Zentrale**, Untergrund, Batteriezustand, Anzahl betroffener Sender |
| Gaswarner | Produktvariante, Alarmart, LED+Ton, **Montagehöhe**, Spannung, IGN/Klemme 15 |
| Stromversorgung | gemessene Spannung, Batterietyp/-kapazität, Standzeit, Ladeerhaltung, weitere Verbraucher |
| Abschalteinrichtung | Artikelnummer, Pro-Finder-SN, Einbauzustand, Prüfanlass |

Vollständig in `daten/support-fallaufnahme.de.md`.

> Diese Felder sind **Gold fürs Retrieval**, weil sie hochspezifische Begriffe
> liefern (Montagehöhe, Kabelquerschnitt, DIP, Klemme 15) — genau die Begriffe,
> die im Chunk-Scoring die **Überschriften-Treffer** auslösen (`01_…` §3).

---

## 6. Sicherheitsregeln, die das Formular durchsetzen muss

Aus dem Fallaufnahme-Artikel — **nicht optional**, sie schützen Personen:

- Bei **Rauch, Brandgeruch, starker Erwärmung, akutem Gas-/CO-/Rauchalarm**: zuerst
  Personen und Tiere aus dem Gefahrenbereich. **Nicht** durch weitere Schalt- oder
  Funktionstests diagnostizieren.
  → **Das Formular muss hier abbrechen und sofort eskalieren**, nicht in den
  RAG-Flow laufen. Ein Chatbot, der bei akutem Gasalarm eine Wiki-Antwort
  generiert, ist ein Produktfehler.
- Arbeiten an Bordnetz, CAN-Bus, Klemme 15/30/31 → qualifizierte Fachkraft.
- **Keine Funktionsprüfung der Abschalteinrichtung bei fahrendem Fahrzeug.**
- Abschalteinrichtung: ausschließlich Befehl `kill`; `a an` ist **unzulässig**.
- **Ohne belastbare Seriennummer und genaue Fahrzeugangabe keine definitive
  Kompatibilitäts-, Software- oder Verdrahtungsaussage.**

> Die letzte Regel ist zugleich die Rechtfertigung der ganzen Formatvorlage: Sie
> beschafft genau die Angaben, ohne die eine verbindliche Aussage fachlich
> unzulässig wäre.

---

## 7. Vorschlag: Was ins Modell geht

Klasse A **nicht** als Fließtext in die Query kippen, sondern als **Filter/Boost
vor** der Suche und als **separater Fakten-Block** im Prompt:

```
<fall>
Sprache: de
Fahrzeug: Fiat Ducato 8/9 (2022–2024)  [slug: fiat-ducato-2022-2024]
Aufbauart: teilintegriert | Startknopf: nein
Produkt: WiPro III safe.lock  [slug: wipro-iii]
Seriennummer: 1050-118   → safe.lock-Zweig bestätigt
Softwarestand: unbekannt
Einbau: 03/2023 (Fachbetrieb)
</fall>

<fehlerbild>
Erwartet: ZV verriegelt beim Scharfschalten.
Beobachtet: Alarm wird scharf, ZV reagiert nicht.
LED: 2× rot blinkend, dann Pause. Sporadisch, ca. jedes 3. Mal.
Bisher: Handsender-Batterie getauscht — ohne Änderung.
</fehlerbild>
```

**Retrieval-Query** wird daraus gebildet aus: Fehlerbild-Text
+ Produkt-Slug + Fahrzeug-Slug — **ohne** Kontaktdaten, **ohne** Feldlabels.

**Der Fakten-Block bleibt trotzdem im Prompt**, damit das Modell die
Fallaufnahme-Regeln anwenden kann (Variante bekannt → nicht mehr nachfragen;
Softwarestand unbekannt → bei Feature-Frage nachfragen oder Einschränkung nennen).

---

## 8. Offene Entscheidungen für dich

1. **Aufbauhersteller** — Freitext jetzt, oder erst Content aufbauen und dann
   Dropdown? (Empfehlung: Freitext jetzt, Content-Ausbau als Folgeprojekt — es ist
   der größte inhaltliche Hebel.)
2. **Pflicht vs. optional** — je strenger, desto besser das Retrieval, desto höher
   die Abbruchquote. Empfehlung: Fahrzeug + Produkt + Fehlerbild Pflicht;
   Seriennummer „stark empfohlen" mit sichtbarer Begründung; Softwarestand optional.
3. **Anonyme Nutzung?** Wenn das Formular ohne Login erreichbar ist, greifen
   Rate-Limit und Tageslimit als einzige Kostenbremse — siehe `02_ZIELARCHITEKTUR.md`.
