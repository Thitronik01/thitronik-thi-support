# Zweisprachigkeit DE / FR — Befund und Strategie

> **Kurzfassung:** Die französische Ausgangslage ist **deutlich besser als erwartet**.
> Die Wiki-Artikel sind vollständig und strukturgleich übersetzt, alle 30
> Fahrzeugartikel liegen auf Französisch vor, und es gibt ein gepflegtes
> DE→FR-Glossar mit 668 Begriffen. Die Lücke liegt woanders: bei den
> **Anleitungen und FAQ-PDFs** — und im **Code**, der heute rein deutsch denkt.

---

## 1. Befund — was auf Französisch vorhanden ist

Gemessen am produktiven Suchindex (Stand 2026-08-13):

| | DE | FR |
|---|---|---|
| Index-Einträge gesamt | 165 | **81** |
| Ø indexierter Textumfang | 9.010 Z. | **11.099 Z.** |
| Wiki-Artikel (`.md`) | 83 | **81** |
| **Fahrzeugartikel** | 30 | **30** ✅ |
| Produkt + Zubehör | 18 | 18 ✅ |
| Reference / tech-doku | 20 | 20 ✅ |
| **FAQ-Einträge** | 62 | **1** ❌ |
| **Anleitungen** | 31 | **0** ❌ |

**Der Ø-Textumfang ist auf Französisch sogar höher** — weil DE durch die vielen
kurzen FAQ-/Anleitungs-Einträge nach unten gezogen wird. Die französischen
**Fachartikel sind inhaltlich vollwertig**, keine Stummel.

Auf Dateiebene fehlen im FR-Wiki genau **zwei** Artikel, beide irrelevant für
Support: `lernen-und-wissenschecks.md` und `uebersetzungs-glossar.md`
(Redaktionswerkzeug, bewusst deutsch).

### 1.1 Strukturgleichheit — der wichtigste Befund

Die Übersetzungen sind **abschnittsparallel**. Beispiel `wipro-iii.md`:

| DE | FR |
|---|---|
| `## Technische Daten` | `## Caractéristiques techniques` |
| `### Zentrale` | `### Centrale` |
| `### Schritt 1: Fahrzeugtyp einstellen` | `### Étape 1 : Définir le type de véhicule` |
| `## Panikfunktion (Manueller Alarm)` | `## Fonction panique (alarme manuelle)` |
| `## Belüftungsfunktion (Vent check)` | `## Fonction de ventilation (Vent check)` |

**Warum das so viel wert ist:**
1. Das **Abschnitts-Chunking funktioniert auf Französisch identisch** — kein
   Sonderweg nötig.
2. DE- und FR-Abschnitte lassen sich **aufeinander abbilden** (gleiche Position im
   Dokument). Das ist die Basis für den Fallback in §3.
3. Geschützte Begriffe („Vent check", „CAN-Bus", „safe.lock") bleiben **unübersetzt**
   — die Terminologie-Pflege hat funktioniert.

> **Achtung:** Die **Anker unterscheiden sich** naturgemäß
> (`#technische-daten` vs. `#caracteristiques-techniques`). Deep-Links müssen
> pro Sprache aus dem jeweiligen Index kommen — niemals den DE-Anker an eine
> FR-Route hängen.

### 1.2 Die echte Lücke: Anleitungen und FAQ

**0 von 31 Anleitungen und 1 von 62 FAQ-Einträgen** sind auf Französisch indexiert.
Für einen **Support-Bot für Monteure** ist das die schmerzhafteste Lücke — genau
dort stehen Installationsdetails.

**Aber — und das ist der wichtigste Befund dieses Dokuments:** Der französische
Text **existiert bereits**. Er ist nur unter `/de/` vergraben.

Gemessen am tatsächlichen Textinhalt (nicht am Dateinamen) mit
`code/sprachanteil-analyse.mjs`:

> **23 von 31 Anleitungen enthalten substanziellen französischen Text** —
> zwischen 22 % und 75 % Sprachanteil. **Alle 23 sind ausschließlich unter
> `lang='de'` indexiert** und damit für französische Nutzer heute unauffindbar.

Auszug der Messung:

| FR-Anteil | Dokument |
|---|---|
| 75 % | Zusatzsirene Anleitung |
| 68 % | safe.lock Umrüstplatine |
| 64 % | NFC Modul Kurzanleitung |
| 62 % | G.A.S.-pro III Kurzanleitung |
| 58 % | WiPro III · Zusatzhupe |
| 55 % | CO-Sensor (DE/EN/FR) · Funk-Kabelschleife 868 |
| 54 % | Abschalteinrichtung einpolig · WiPro III safe.lock |
| 51 % | BT-connect · G.A.S.-plug all-in-one · Pro-Finder ab SN 045 |

Es sind also **nicht** die fünf Dokumente, die im Dateinamen `_de_en_fr` oder
`zehn_sprachen` tragen — es sind **fast alle**. Die PDFs sind durchgängig
mehrsprachig aufgebaut; nur der Ingest behandelt sie als deutsch.

> **Das ist keine Übersetzungsaufgabe, sondern eine Ingest-Aufgabe.** Der Ingest
> muss den PDF-Extrakt **in Sprachblöcke segmentieren** und jeden Block der
> richtigen Sprache zuordnen. Das ist der **mit Abstand günstigste große Gewinn**
> für den französischen Bot: 23 Anleitungen ohne einen einzigen Satz Übersetzung.

**Umsetzungshinweis:** Die Analyse oben arbeitet **pro Dokument** und beantwortet
nur „enthält Französisch?". Für die Segmentierung braucht es dieselbe Auszählung
**pro Abschnitt/Seite** — mehrsprachige PDFs sind blockweise aufgebaut
(erst alles Deutsch, dann alles Englisch, dann alles Französisch), sodass die
Blockgrenzen gut erkennbar sind. Danach unbedingt stichprobenhaft gegenlesen:
Ein falsch segmentierter Sicherheitshinweis ist schlimmer als ein fehlender.

Die **Rohtexte liegen im Paket**: `content/anleitungen/anleitungen-und-faq.json`
(93 Dokumente, 0,7 MB).

**Randbefund:** Ein **französischer FAQ-Master ist bereits korrekt zugeordnet**
(„FAQ Master — Aperçu de toutes les questions fréquemment posées", 100 % FR) —
das ist der eine FR-FAQ-Eintrag aus der Tabelle oben. Für IT, ES, PL und CS
existieren die Pendants ebenfalls.

---

## 2. Was am Code angepasst werden muss

Der bestehende Retrieval-Kern (`code/search-core.js`) ist **monolingual deutsch**.
Drei Stellen sind betroffen:

### 2.1 Normalisierung

Heute:
```js
.replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
.normalize('NFD').replace(/[̀-ͯ]/g,'')
```

Der NFD-Strip erledigt französische Akzente (é, è, ê, à, ù, î, ô) **und** die
Cedille (ç → c) bereits korrekt. **Zwei Ergänzungen fehlen:**

```js
// Französische Ligaturen — NFD zerlegt sie NICHT:
.replace(/œ/g,'oe').replace(/æ/g,'ae')
// Apostroph-Varianten vereinheitlichen (typografisch vs. gerade):
.replace(/[''`]/g,"'")
```

Der Apostroph ist auf Französisch kein Detail: `l'alarme`, `d'urgence`,
`s'active`. Wird er nicht vereinheitlicht, matcht die getippte gerade Variante
den typografischen Text im Wiki nicht.

> **Offene Entscheidung: Elision auflösen?** `l'alarme` → Token `alarme`.
> Empfehlung: ja, Apostroph als Worttrenner behandeln — sonst ist `l'alarme`
> ein anderes Token als `alarme`, und die Trefferquote bricht ein.

**Die deutsche Umlaut-Regel darf bleiben**, auch im FR-Modus: Sie ist harmlos für
französischen Text (keine Umlaute) und wird gebraucht, sobald FR-Queries auf den
DE-Index zurückfallen (§3).

### 2.2 Stoppwörter

`STOPWORDS_DE` und `MATCH_STOPWORDS` sind rein deutsch. Ohne FR-Pendant zählen
`le, la, les, de, du, des, un, une, et, ou, est, sont, pour, avec, dans, sur,
que, qui, ne, pas, je, il, elle, mon, ma, ce, cette, comment, pourquoi, quand,
où, quel, quelle` als bedeutungstragende Begriffe — und verwässern jeden Score
über den Coverage-Faktor.

> **Konkret:** Eine Stoppwortliste pro Sprache, ausgewählt über das Sprachfeld
> des Formulars. Der `salientTerms()`-Filter (≥ 3 Zeichen, keine Stoppwörter)
> bleibt sonst unverändert.

### 2.3 Produkt-Aliasse

`PRODUCT_ALIASES` bildet **deutsche** Umgangssprache auf kanonische Slugs ab
(`alarmanlage|alarmsystem|funk-?alarm` → `wipro-iii`). Französische Nutzer
schreiben:

| FR-Umgangssprache | kanonisch |
|---|---|
| `alarme, système d'alarme, antivol` | `wipro-iii` |
| `détecteur de gaz, avertisseur de gaz` | `gas-pro-iii` |
| `traceur, localisation, suivi GPS, balise` | `pro-finder` |
| `télécommande, émetteur` | `funk-handsender` |
| `contact magnétique, contact de porte` | `funk-magnetkontakt` |
| `détecteur de fumée` | `funk-rauchmelder` |
| `sirène, avertisseur sonore, klaxon` | `sirenen-hupen` |
| `appairage, apprentissage, mémorisation` | `anlernvorgang` |

**Die Slugs bleiben deutsch** — auch im FR-Wiki (`/fr/wipro-iii`,
`/fr/gas-pro-iii`). Das ist ein Glücksfall: Die Alias-Mechanik funktioniert
sprachübergreifend, es braucht nur eine zweite Mustertabelle.

> Eine erste FR-Alias-Liste lässt sich aus `daten/glossar-de-fr.json`
> **generieren** statt von Hand zu schreiben: 668 Begriffspaare mit
> `aliasse`-Feld und `geschuetzt`-Flag liegen dort bereits vor.

---

## 3. Cross-lingualer Fallback — die Kernentscheidung

**Problem:** Eine französische Frage zu einem Detail, das nur in einer deutschen
Anleitung steht (31 Anleitungen, 62 FAQ), findet auf Französisch **nichts**.

**Drei Optionen:**

| | Ansatz | Bewertung |
|---|---|---|
| **A** | Strikt einsprachig — FR-Query nur gegen FR-Index | Sauber, aber der Bot sagt bei Anleitungsfragen systematisch „nichts gefunden" |
| **B** | **Zweistufig mit Fallback** | FR-Index zuerst; bei schwachem Ergebnis zusätzlich DE durchsuchen, Fundstelle auf FR **antworten** und als DE-Quelle kennzeichnen |
| **C** | Immer beide Indizes, Ergebnisse fusionieren | Maximale Abdeckung, aber deutsche Treffer verdrängen gute französische |

> **Empfehlung: B.** Begründung: Die französischen Fachartikel sind vollwertig —
> für die allermeisten Fragen ist der FR-Index die **bessere** Quelle, weil
> Terminologie und Formulierung zur Frage passen. Der DE-Fallback greift genau
> dort, wo FR eine echte Lücke hat.
>
> **Schwelle definieren, nicht raten:** Fallback auslösen, wenn der beste
> FR-Score unter einem Schwellwert liegt **oder** kein Treffer eine
> Mindest-Begriffsdeckung erreicht. Die Schwelle gegen das FR-Gold-Set tunen
> (§5), nicht nach Gefühl setzen.

**Der Weg von FR-Query zu DE-Index** führt über das Glossar: FR-Begriffe per
`daten/glossar-de-fr.json` auf den deutschen Kanon heben, dann normal suchen.
Das Glossar hat 668 Paare, davon **200 echte Fachbegriffe/geschützte
Schreibweisen**.

**Transparenz-Regel:** Stammt die Antwort aus einer deutschen Quelle, muss das
**sichtbar** sein („Quelle liegt nur auf Deutsch vor"). Ein französischer Monteur,
der einem Deep-Link auf einen deutschen Artikel folgt, darf nicht überrascht werden.

---

## 4. Terminologie — geschützte Schreibweisen

`daten/glossar-de-fr.json` führt pro Begriff ein Flag `geschuetzt`. Beispiel:

```json
{ "de": "0001-xxx / Alt-Schema SN40/SN50 — G.A.S.-pro",
  "fr": "0001-xxx / ancien schéma SN40/SN50 — G.A.S.-pro",
  "geschuetzt": true }
```

> **Geschützt heißt: nie übersetzen, nie normalisieren.** Produktnamen wie
> `G.A.S.-pro`, `WiPro III`, `safe.lock`, `Pro-Finder`, `BT-connect`,
> `Vent check`, `CAN-Bus` bleiben in **jeder** Sprache identisch.

Zwei Konsequenzen:

1. **Im Prompt:** Das Modell muss angewiesen werden, diese Schreibweisen exakt zu
   übernehmen — auch mitten im französischen Satz. Sonst entsteht „système GAZ-pro"
   oder „WiPro 3", und der Nutzer findet das Produkt nicht wieder.
2. **In der Normalisierung:** Die Akronym-Entpunktung (`G.A.S.` → `gas`,
   `T.S.A.` → `tsa`) gilt **nur für die Suche**, nie für die Ausgabe.

Zusätzlich existiert ein Terminologie-Artikel im Wiki
(`terminologie-und-schreibweisen`) mit den kanonischen Formen — u. a. **Pro-Finder**
(nicht „Pro-finder") und **NFC Modul** (nicht „NFC-Modul"). In den Altdaten stehen
teils die falschen Varianten; beim Aufbau bereinigen.

---

## 5. Evaluation auf Französisch — der fehlende Baustein

**Ehrlicher Stand:** Alle vorhandenen Gold-Sets sind **deutsch**
(`thi-eval-gold.de.json` 41 Fälle, `thi-anchor-gold.de.json` 47 Fälle,
`thi-eval-extra.de.json` 18 Fälle). Für Französisch existiert **keine Messung**.

> **Ohne FR-Gold-Set ist jede Aussage über die französische Qualität eine
> Vermutung.** Das ist die größte offene Baustelle der Zweisprachigkeit.

**Pragmatischer Weg — zwei Stufen:**

1. **Übersetzungs-Spiegel (schnell):** Die bestehenden DE-Fälle übersetzen und die
   `expected`-Routen von `/de/…` auf `/fr/…` umschreiben. Weil die Artikel
   strukturgleich sind, sind die Zielrouten **maschinell ableitbar**; die Anker
   müssen aus dem FR-Abschnittsindex neu geholt werden (andere Slugs!).
   Das misst, ob das Retrieval sprachneutral funktioniert.

2. **Echte FR-Fälle (wichtiger):** Fragen so, wie ein französischer Monteur sie
   stellt — nicht übersetztes Deutsch. Idiomatische Kurzformen, Elisionen,
   Umgangssprache. Erst das misst den realen Fall.
   Quelle: echte französische Supportanfragen, falls vorhanden.

**Zusätzliche FR-Metrik:** Fallback-Rate — wie oft muss auf den DE-Index
ausgewichen werden? Steigt sie, ist das ein **Content-Signal**: Diese Themen
gehören auf Französisch ergänzt.

---

## 6. Prioritätenliste Französisch

| # | Maßnahme | Aufwand | Wirkung |
|---|---|---|---|
| 1 | FR-Stoppwörter + Ligaturen/Apostroph in der Normalisierung | klein | **hoch** — ohne das ist jeder FR-Score verzerrt |
| 2 | FR-Produkt-Aliasse (aus Glossar generieren) | klein | **hoch** |
| 3 | FR-Gold-Set Stufe 1 (Spiegel) | mittel | **hoch** — ohne Messung kein Fortschritt |
| 4 | **Anleitungen sprachsegmentiert indexieren** | mittel | **sehr hoch** — hebt 23 Anleitungen ohne eine Zeile Übersetzung (§1.2) |
| 5 | Cross-lingualer Fallback (Variante B) + Kennzeichnung | mittel | mittel |
| 6 | FR-Gold-Set Stufe 2 (echte Fragen) | mittel | mittel |
| 7 | FAQ-Inhalte auf Französisch ergänzen | groß | mittel (FAQ wird ohnehin abgewertet) |

**Punkte 1 und 2 zuerst** — sie sind klein, und ohne sie misst Punkt 3 das Falsche.
