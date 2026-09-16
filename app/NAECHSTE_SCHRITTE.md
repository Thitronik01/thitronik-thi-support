# Thi Support — Stand und nächste Schritte

> **Für den Einstieg in eine neue Arbeitssitzung.** Beschreibt, was fertig ist,
> was bewusst offen blieb und was als Nächstes den größten Unterschied macht.
> Stand: 15.09.2026

---

## In einem Satz

Die App ist **fertig und läuft** — lokal wie deploybar. Sie beantwortet echte
Supportfälle belegt, mit Prozentangabe zur Verlässlichkeit. Seit dem
Antwort-Eval ist sie auch **gemessen**: 34 von 41 Gold-Fällen belegt korrekt
(82,9 %). Die Messung hat drei benennbare Ursachen für die Fehlschläge zutage
gefördert — **A und B sind behoben**, C ist eine Feinjustierung.

Beide Reparaturen wurden **deterministisch** belegt, ohne Modellaufrufe: Gold-
Fragen mit Gate-Fehlalarm 2 → 0, Gold-Belege im Kontext 11/24 → 16/24. Ein
erneuter Eval-Lauf steht noch aus; er kostet echte Aufrufe und lohnt erst, wenn
auch C angefasst wird.

---

## Das Wichtigste zuerst: die eine echte Lücke

### Es gibt keinen einzigen französischen Testfall

Die deutschen Antworten sind gegen 106 Gold-Fälle abgesichert. Für Französisch
existiert **nichts**. Die FR-Antworten *sehen* im Test gut aus — aber „sieht gut
aus" ist exakt das, was dieses Projekt an anderer Stelle als unzureichend
beschreibt (`../docs/05_EVAL_UND_QUALITAET.md`).

**Vor einem Einsatz in Frankreich ist das der wichtigste Punkt — wichtiger als
jede weitere Funktion.**

Weg dorthin, zweistufig:
1. **Spiegel** — die deutschen Gold-Fälle übersetzen, `expected`-Routen von
   `/de/…` auf `/fr/…` umschreiben (maschinell ableitbar, weil die Artikel
   strukturgleich sind), Anker aus dem FR-Abschnittsindex neu holen.
2. **Echte Fälle** — Fragen so, wie ein französischer Monteur sie stellt.
   Idiomatisch, nicht übersetztes Deutsch. Falls vorhanden: echte französische
   Supportanfragen als Quelle.

Zweite Messgröße: die **Fallback-Rate** FR→DE. Steigt sie, ist das ein
Content-Signal — diese Themen gehören auf Französisch ergänzt.

---

## Was fertig ist

| Bereich | Stand |
|---|---|
| Fallaufnahme im Telefonablauf (1 Anliegen → 2 Produkt → 3 Fahrzeug → 4 Gerät) | ✅ |
| Freitext-Mitschrift mit automatischer Erkennung (Fahrzeug, Produkt, SN, LED, Baujahr, Software) | ✅ |
| Diktat über die Web Speech API | ✅ |
| Widerspruchsprüfung SN ↔ Produkt ↔ Fahrzeug ↔ Baujahr | ✅ |
| Sicherheits-Gate bei akuter Gefahr (DE/FR, mit Produktnamen-Maskierung) | ✅ |
| Sicherheitsangabe in Prozent, mit Begründung und Deckel bei Widersprüchen | ✅ |
| Belegstellen aufklappbar mit Originaltext | ✅ |
| Fall + Antwort als Klartext kopieren | ✅ |
| Support-Korrekturen: anlegen, Sperrliste, Freigabe, Deckel im Prozentwert, Prüfwerkzeug (`../docs/07_…`) | ✅ gebaut — **wartet auf GitHub-Token in Netlify** |
| Fallverlauf (12 Fälle, lokal, wiederherstellbar) | ✅ |
| Hell/Dunkel, Logo in beiden Fassungen, Favicons, Web-Manifest | ✅ |
| Zweisprachig DE/FR, vollständig | ✅ |
| 115 Selbsttests (inkl. Textfensterwahl) | ✅ |
| Antwort-Eval gegen 41 Gold-Fälle, mit LLM-Judge (`npm run eval -- --judge`) | ✅ |
| Deploy-Prüfung vor dem Upload (`npm run deploy-pruefen`) | ✅ |

---

## Support-Korrekturen — gebaut am 16.09.2026, noch nicht deployt

Mitarbeiter können falsche Antworten korrigieren; die Korrektur wird als
eigener Eintrag per Commit ins Repository geschrieben und wirkt nach dem
Deploy (Entwurf A in `../docs/07_KORREKTUREN_ENTWUERFE.md`; README-Abschnitt
„Support-Korrekturen"). Alles ist lokal gebaut und gemessen, aber **nicht
committet, nicht gepusht**.

Was noch zu tun ist, bevor es wirkt:
1. Änderungen sichten, committen, pushen (ein Deploy).
2. In Netlify `THI_GITHUB_TOKEN` (feingranular, nur dieses Repo, Contents:
   write) setzen. Ein eigenes Freigabewort ist nicht nötig — das Zugangswort
   gilt, die Vier-Augen-Regel (Freigeber ≠ Autor) ist die Sicherung.
3. `/api/health` zeigt danach `korrekturen.speicherKonfiguriert: true`.
4. Eine Testkorrektur einreichen und die **Deploy-Dauer messen** — sie ist die
   Latenz bis zur Wirkung und wurde noch nie gemessen.
5. Sperrliste fachlich gegenlesen: `node netlify/functions/lib/tests.mjs`
   druckt die 20 gesperrten DE-Artikel im Abschnitt 9.

Offen geblieben, bewusst: Der Name ist selbst erklärt (kein Login). Wer
Nachweis braucht, kann Netlify Identity nachrüsten (verfügbar, nicht
abgekündigt). Und: Es gibt im Repo keinen Ingest `content/wiki` →
`artikel.json` — bevor „Wiki neu einlesen" ein Vorgang ist, muss der Weg
gebaut werden. Die Korrekturen selbst überleben ihn, weil sie außerhalb liegen.

---

## Bewusst offen

**Retrieval ist rein lexikalisch.** Der ausgemessene Kern des Vorgängers wurde
übernommen und um die Formular-Steuerung erweitert — das ist der große Gewinn.
Embeddings fehlen aber. Für Synonym- und Umschreibungsfragen bleibt das die
bekannte Obergrenze (`../docs/01_RAG_WISSENSTRANSFER.md` §2.7).

**23 Anleitungen sind nur auf Deutsch indexiert**, obwohl sie 22–75 %
französischen Text enthalten. Das ist eine Ingest-Aufgabe (Sprachsegmentierung),
keine Übersetzungsaufgabe — und der günstigste große Gewinn für den
französischen Bot (`../docs/04_MEHRSPRACHIGKEIT_DE_FR.md` §1.2).

**Rate-Limit und Fehlversuchs-Sperre zählen pro Function-Instanz.** Netlify
skaliert die; ein hartes Limit bräuchte einen geteilten Zähler (Netlify Blobs /
Upstash). Der eigentliche Schutz ist das Zugangswort.

---

## Was die Messung gefunden hat

`npm run eval -- --judge` stellt dem laufenden Server die 41 Gold-Fragen und
lässt ein Modell prüfen, ob die Antwort durch den hinterlegten Beleg gedeckt ist.
Ergebnis: **34/41 korrekt (82,9 %)**, Quellenbeleg **38/39 (97 %)**. Das
Retrieval ist also nicht das Problem — die Quelle liegt fast immer vor.
Entscheidend war die Frage, was von dieser Quelle beim Modell ankommt (siehe B).

Die Fehlschläge verteilen sich auf drei Ursachen. In dieser Reihenfolge
abarbeiten:

### A. ~~Das Sicherheits-Gate eskaliert bei jeder CO-Frage~~ — behoben

Die Regel unterschied nicht zwischen einem **CO-Alarm** (Ereignis) und dem
**Wort „Kohlenmonoxid"** (Thema). Beides stand in derselben Regex, beides
eskalierte. Jetzt sind es drei getrennte Fälle:

| Eingabe | Verhalten |
|---|---|
| „Der CO-Alarm geht seit einer Stunde" | eskaliert — **unverändert** |
| „Mein CO-Melder piept ununterbrochen" | eskaliert — **neu**, war eine Lücke |
| „Warnt der T.S.A. auch vor Kohlenmonoxid?" | antwortet — **neu** |

Die Ausnahme ist bewusst eng: Nur wer erkennbar nach einer *Fähigkeit* **fragt**
(Fragezeichen + Fähigkeitsverb) und dabei **kein Ereignis** schildert, kommt
durch. „Mein CO-Melder piept, warnt der auch vor Gas?" hat ein Fragezeichen und
ein Fähigkeitsverb — eskaliert aber trotzdem, weil „piept" ein Ereignis ist.
Der Grundsatz „im Zweifel eskalieren" bleibt; ausgenommen wird nur ein klar
erkennbarer Nicht-Zweifel.

**Zwei weitere Lücken fielen dabei auf, beide älter als diese Änderung:**

1. **`/\bübel\b/` traf nie.** `\b` ist in JavaScript auf ASCII-Wortzeichen
   definiert — „ü" ist keines. „Mir ist übel." lief am Gate vorbei. Der
   Selbsttest hatte es verdeckt, weil sein Beispielsatz zusätzlich
   „schwindelig" enthielt und darüber ansprang. Übelkeit ist ein Leitsymptom
   der CO-Vergiftung; das war ein echtes Loch.
2. **Ein anschlagendes CO-Gerät zählte nicht als Alarm.** „Mein CO-Melder piept
   ununterbrochen" eskalierte nicht: CO_ALARM traf nicht (kein „CO-Alarm" im
   Wortlaut), und nach der Produktnamen-Maskierung blieb nichts übrig.

**Gemessen, ohne Modellaufruf:**

| | vorher | jetzt |
|---|---|---|
| Gold-Fragen, die das Gate fälschlich auslösen | 2 von 41 | **0 von 41** |
| Selbsttests | 91 | **115** |

Die 24 neuen Tests prüfen beide Richtungen: zehn Sätze, die eskalieren **müssen**,
acht Sachfragen, die durchkommen müssen, und sechs Symptomsätze **ohne** zweites
Stichwort — damit der Umlaut-Fallstrick nicht zurückkehrt.

*Erledigt. Lehre: Der alte Test war grün, weil sein Beispielsatz zufällig zwei
Auslöser enthielt. Ein Testsatz sollte genau das prüfen, was er zu prüfen
vorgibt — sonst deckt er die Lücke zu, statt sie zu finden.*

### B. ~~Das Modell verweigert, obwohl der Beleg vorliegt~~ — behoben

Vier Antworten sagten „dazu macht die Dokumentation keine Aussage", während die
erwartete Quelle nachweislich im Kontext lag. Der Verdacht fiel zuerst auf das
1400-Zeichen-Snippet ab Rang 3. **Der war falsch.** Nachgesehen statt gedreht —
und es lagen zwei andere Ursachen vor, beide eine Ebene höher:

1. **Die Top-2-Quellen bekamen `body.slice(0, 6000)`** — die ersten 6000
   Zeichen, unabhängig von der Frage. Der Median-Artikel hat 11.873 Zeichen,
   75 % liegen über 6000. Bei drei von vier Artikeln ging also immer dieselbe
   erste Hälfte mit, ganz gleich, wonach gefragt wurde. Die gesuchten Sätze
   standen bei Zeichen 7264 bis 10356.
2. **`extractSnippet` sprang zur ERSTEN Fundstelle des längsten Suchbegriffs.**
   Der längste Begriff ist meist der Produktname, und der steht im Titel.
   Auch das Passagenfenster landete damit verlässlich am Textanfang:
   „funk-magnetkontakt" kommt im WiPro-Artikel 9× vor — gewählt wurde
   Position 201.

Jetzt wird beides an der Frage ausgerichtet, nach **Begriffsdichte** statt
erster Fundstelle, und seltene Begriffe wiegen schwerer als häufige („scharf"
kommt 30× vor und taugt nicht zum Auffinden, „fahrerhaustuer" 4×).

**Gemessen, deterministisch und ohne Modellaufruf** — steht der Gold-Beleg im
Kontextblock?

| | Belege im Kontext |
|---|---|
| vorher | 11 / 24 |
| jetzt | **16 / 24** |

Fünf gewonnen, **keiner verloren**. Die Gesamtquote des Antwort-Evals blieb
dabei bei 34/41: Drei der vier Zielfälle sind jetzt richtig, dafür kippten drei
Grenzfälle in die andere Richtung — das ist die normale Streuung zwischen zwei
Läufen (siehe README, „Wie genau ist die Quote?"). Sichtbar wurde der Gewinn
woanders: Kategorie `fakt` von 8/10 auf 10/10, und die Kalibrierung trennt jetzt
mit 10 statt 6 Punkten.

*Erledigt. Die eigentliche Lehre: Vor dem Drehen an einer Stellschraube
ausgeben, was tatsächlich beim Modell ankommt. Die erste Hypothese war falsch,
und ohne den Blick in den Kontext wäre sie „behoben" worden.*

### C. Die Sicherheitsanzeige ist ehrlich, aber zu leise

Sie zeigt bei falschen Antworten verlässlich weniger als bei richtigen
(44 % gegen 54 %), und **kein einziger Fall** war hoch-und-falsch — die
gefährliche Ecke ist leer. Das ist das Wichtigste und es stimmt. Seit B ist die
Trennung deutlicher geworden: 10 Punkte Abstand statt 6.

Nur liegt auch der Normalfall bei ~54 %: 6 von 34 korrekten Antworten wurden
unter 50 % ausgewiesen, also als „gering". Wer richtige Auskünfte dauerhaft so
beschriftet, bringt niemandem bei, auf den Wert zu achten — und dann nützt er
auch im gefährlichen Fall nichts. Die Spreizung ist das Thema, nicht die
Richtung.

*Aufwand: klein (Gewichte in `lib/sicherheit.mjs`). Achtung: Erst A beheben —
ein Gate-Fehlalarm drückt den Wert zu Recht. Danach neu messen.*

---

## Vorschläge, nach Nutzen sortiert

### 1. Content-Lücken mitschreiben
Wenn Thi nichts Belastbares findet, ist das ein Signal fürs Wiki — kein Fehler
der App. Aktuell verpufft dieses Signal. Ein Log der Fälle mit niedriger
Sicherheit zeigt nach wenigen Wochen, **wo die Dokumentation wirklich Lücken
hat**. Das Hauptprojekt hat so etwas bereits (`/admin/content-gaps`).

*Aufwand: klein. Wirkung: wächst mit der Zeit und verbessert die Quelle selbst.*

### 2. Vorlagen für Standardfälle
„Gaswarner Fehlalarm", „ZV verriegelt nicht", „Handsender ohne Funktion" als
Startpunkt — füllt die Mitschrift vor, der Rest kommt aus dem Gespräch. Spart am
Telefon die immer gleichen ersten Sätze.

*Aufwand: klein. Wirkung: spürbar im Alltag.*

### 3. ~~Antwortqualität messen statt vermuten~~ — erledigt
`werkzeuge/antwort-eval.mjs` misst gegen die 41 Gold-Fälle, mit LLM-Judge.
Befunde siehe oben. Was noch fehlt, ist ein **Schwellwert im Betrieb**:
`npm run eval -- --judge --min 80` bricht ab, wenn die Quote fällt. Konservativ
ansetzen, unter dem aktuellen Wert — ein Gate, das bei jeder Content-Änderung rot
wird, wird abgeschaltet.

### 4. Hybrides Retrieval (Embeddings)
Der größte inhaltliche Hebel, aber auch der größte Eingriff: Vektor-Store,
Embedding-Modell für DE **und** FR, Fusion per Reciprocal Rank Fusion
(`../docs/02_ZIELARCHITEKTUR.md` §4). Der Eval steht jetzt — damit ist dieser
Schritt überhaupt erst beurteilbar. **Vorher aber A und B abarbeiten:** Einen
Vektor-Store gegen ein System zu messen, das die gefundene Quelle noch verwirft,
misst das Falsche.

*Aufwand: groß. Wirkung: hebt die bekannte lexikalische Decke.*

### 5. Eskalation ins Ticketsystem
Aktuell endet der Fall mit „kopieren". Mit einer Ticket-API könnte Thi den Fall
direkt anlegen — inklusive Sicherheitswert und Belegstellen. Lohnt sich, sobald
klar ist, welches System zum Einsatz kommt.

*Aufwand: mittel, abhängig vom Zielsystem.*

### 6. Aufbauhersteller-Inhalte
Die Wissensbasis kennt genau **einen** Aufbauhersteller-Artikel (Adria
Coral/Matrix). Alle anderen 29 Fahrzeugartikel sind Basisfahrzeuge. Solange das
so ist, bleibt das Feld ein Freitext ohne Retrieval-Wirkung
(`../docs/03_FALLAUFNAHME_SCHEMA.md` §A2). Das ist **Redaktionsarbeit, keine
Programmierung** — aber der größte inhaltliche Ausbau für diesen Bot.

---

## Womit man anfangen sollte

Wenn nur eines: **Befund A** — die CO-Frage. Sie ist der einzige Punkt, an dem
die App einem Monteur eine Notfallmeldung zeigt, wo eine belegte Antwort im Wiki
steht. Klein im Aufwand, aber eine Entscheidung über das Sicherheits-Gate, und
die gehört bewusst getroffen.

Wenn Zeit für zwei da ist: **Befund B** — vier Fälle, in denen die Quelle vorlag
und trotzdem nichts ankam. Dort steckt die meiste Qualität pro Aufwand.

Wenn Frankreich ansteht: **das FR-Gold-Set**, und zwar vorher. Der Eval kann
Französisch bereits (`--sprache fr`), es fehlt nur das Set.

Und nach jeder dieser Änderungen: **neu messen.** Dafür ist das Werkzeug da.

---

## Einstieg in den Code

```bash
node dev-server.mjs                      # → http://localhost:8888
node netlify/functions/lib/tests.mjs     # 115 Selbsttests (Bausteine)
npm run eval -- --judge                  # 41 Gold-Fälle (Antwortqualität)
npm run deploy-pruefen                   # vor jedem Upload
```

Für den Eval den Server mit angehobenem Limit starten, sonst bricht er nach
20 Fällen ab — er sagt das dann auch:

```bash
THI_RATE_LIMIT=999 THI_DAILY_LIMIT=9999 node dev-server.mjs
```

| Frage | Datei |
|---|---|
| Wie wird gesucht? | `netlify/functions/lib/search-core.js` |
| Was macht das Sicherheits-Gate? | `netlify/functions/lib/fall.mjs` |
| Wie entsteht der Prozentwert? | `netlify/functions/lib/sicherheit.mjs` |
| Was sagt das Modell? | `netlify/functions/lib/prompts.mjs` |
| Wie läuft eine Anfrage? | `netlify/functions/chat.mjs` |
| Freitext → Felder | `public/assets/js/erkennung.js` |
| Oberfläche | `public/assets/js/app.js` · `public/index.html` |
| Texte DE/FR | `public/assets/js/i18n.js` |

Das **Warum** hinter den Entscheidungen steht in `../docs/` — sechs Dokumente,
beginnend mit `01_RAG_WISSENSTRANSFER.md`. Wer am Retrieval oder an den Prompts
arbeitet, sollte die vorher gelesen haben: Dort steht, was schon einmal
schiefging.
