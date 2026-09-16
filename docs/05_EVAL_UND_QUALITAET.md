# Evaluation — wie man RAG-Qualität misst statt sie zu behaupten

> **Die zentrale Einsicht aus dem Vorgängerprojekt:**
> **Quelle gefunden ≠ Antwort korrekt.**
> Wer nur Retrieval misst, übersieht die häufigste Fehlerklasse. Es braucht
> **zwei** Messebenen — und sie messen wirklich Verschiedenes.

---

## 1. Warum eine Ebene nicht reicht

Der Auslöserfall des ganzen Vorgängerprojekts:

> „Brauche ich eine WiPro III, um einen T.S.A. Funk-Rauchmelder zu betreiben?"

- **Retrieval-Eval:** ✅ bestanden — der richtige Artikel war auf Platz 1.
- **Tatsächliche Antwort:** ❌ „Ja, zwingend." Das Wiki sagt: **standalone immer
  nutzbar.** Das Modell schloss vom Artikeltitel („… für WiPro III") auf eine
  Voraussetzung.

Ein reiner Hit@k-Test hätte dieses System als gesund gemeldet, während es
Monteuren falsche Auskünfte gab.

---

## 2. Ebene 1 — Retrieval (offline, schnell, billig)

**Frage:** Landet die richtige Quelle im Kontextfenster?

**Metriken:** Hit@3, Hit@8, MRR — plus, seit dem Abschnitts-Chunking,
**Anker-Hit@3/@8**: Ist auch der richtige *Abschnitt* getroffen?

**Läuft ohne Modellaufruf** → schnell, kostenlos, CI-tauglich. Referenz:
`code/thi-rag-eval.mjs`.

**Erreichte Werte (Händler-Sicht, DE):**

| Metrik | Wert |
|---|---|
| Artikel-Hit@8 | **72,6 %** (von 57,7 %) |
| Anker über Chip-Pfad | **66 %** (von 55 %) |
| Anker standalone `searchSections` | 52 % |

> **Zur Interpretation von „nur 72 %":** Das Gold-Set ist **strikt** — es
> akzeptiert genau eine Route. In mehreren Fällen liefert das Retrieval die
> *spezifischere* Quelle (z. B. `mobilfunk-sim`), während das Gold auf einen
> Aggregator (`faq-master`) zeigt. Das zählt als Miss, ist aber fachlich richtig.
> **Empfehlung für das neue Gold-Set: `altAnchors`/`altRoutes` vorsehen**, damit
> mehrere gültige Ziele erlaubt sind. Sonst misst man Strenge statt Qualität.

---

## 3. Ebene 2 — Grounding (mit Modell, teurer, entscheidend)

**Frage:** Ist die Antwort faktisch korrekt **und** durch die Quelle gedeckt?

Referenz: `code/thi-answer-eval.mjs`. Bildet den echten Client-Fluss nach
(Retrieval → Kontext → API-Aufruf) und bewertet die Antwort.

**Zwei Modi:**

| Modus | Verfahren | Bewertung |
|---|---|---|
| **Substring** (Standard) | prüft `antwort_muss` / `antwort_darf_nicht` | billig, aber **spröde** — Synonyme und Verneinungen erzeugen False-Fails |
| **`--judge`** (empfohlen) | ein LLM bewertet semantisch „korrekt + belegt?" | keine Formulierungsartefakte |

**Erreicht:** 39/41 = **95,1 %** (effektiv ~40/41).

### Die wichtigste Regel beim Gold-Pflegen

> **Findet der Judge einen „Fehler", zuerst prüfen, ob der Bot tatsächlich
> falschliegt — oder ob der Gold-Beleg unvollständig ist.**

Genau das ist passiert (Panik-Fall): **Der Bot war korrekter als das Gold-Set.**
Wer solche Fälle blind als Regression behandelt, optimiert das System in die
falsche Richtung.

---

## 4. Aufbau eines Gold-Falls

Aus `daten/thi-eval-gold.de.json`:

```json
{
  "id": "wipro-iii-keine-bewegungsmelder-01",
  "question": "Hat die WiPro III eingebaute Bewegungsmelder zur Innenraumüberwachung?",
  "expected": ["/de/wipro-iii"],
  "antwort_muss": ["keine bewegungsmelder", "magnetkontakt", "can-bus"],
  "antwort_darf_nicht": ["ja, bewegungsmelder", "infrarot-bewegungsmelder eingebaut"],
  "beleg": "Es verwendet keine Bewegungsmelder — die Absicherung erfolgt ausschließlich über Funk-Magnetkontakte …",
  "source": "wipro-iii.md:32",
  "kategorie": "negation"
}
```

**Nicht verhandelbar:** `beleg` (wörtliches Zitat) **und** `source`
(`datei.md:zeile`). Ein Gold-Fall ohne nachprüfbaren Beleg ist eine Meinung, kein
Testfall — und beim ersten Streitfall wertlos.

Und aus `daten/thi-anchor-gold.de.json` zusätzlich `route` + `anchor` für die
Deep-Link-Messung.

### Die Kategorien — bewusst gewählt

`negation` · `voraussetzung` · `fakt` · `standalone` · `kompatibilitaet` ·
`wert` · `vorgehen` · `sicherheit`

> **`negation` und `voraussetzung` sind die wertvollsten Kategorien.** Genau dort
> überschreiben Modelle den Wortlaut mit Vorannahmen („Zubehör *für* X ⇒ *braucht* X").
> Ein Gold-Set ohne Negations- und Voraussetzungsfälle testet den einfachen Teil.

---

## 5. Wie die Gold-Sets entstanden sind

Nicht ausgedacht, sondern:

1. **Aus den Artikeln geschürft** — Kandidaten mit wörtlichem Beleg + Fundstelle.
2. **Adversarial verifiziert** — beim Anker-Gold: 69 Kandidaten generiert, **47
   bestätigt**. Ein Drittel fiel durch.
3. **Maschinell validiert** — jede `route#anker` gegen den Abschnittsindex geprüft.
4. **Realistisch verteilt** — über alle 35 Kernartikel und alle Kategorien,
   formuliert wie echte Händler-/Monteurfragen.

> **Für den Support-Bot gibt es eine bessere Quelle als geschürfte Fälle: echte
> Supportanfragen.** Die Formatvorlage erzeugt strukturierte Fälle — jeder
> abgeschlossene Supportfall mit bekannter richtiger Antwort ist ein Gold-Kandidat.
> Das ist der nachhaltigste Weg, das Set wachsen zu lassen.

---

## 6. Messen aus der richtigen Perspektive

**Beide Evals laufen mit `canViewInternal: false`** — also aus Händler-Sicht.

Das ist bewusst: Ein Test mit interner Sicht misst einen Index, den der reale
Nutzer nie sieht, und meldet grün, während Händler eine Lücke haben. Wenn der
neue Bot Rollen kennt, **jede Rolle separat messen**.

---

## 7. CI-Gates

Beide Runner unterstützen Schwellwerte:

```bash
npm run thi:eval -- --min-hit8 70 --min-anchor8 60
npm run thi:answer-eval -- --judge --min 90
```

> **Konservativ ansetzen — unter dem aktuellen Wert.** Ein Gate, das bei jeder
> Content-Änderung rot wird, wird abgeschaltet. Ein Gate, das nur bei echten
> Regressionen anschlägt, überlebt.

Ebene 1 gehört in **jeden** CI-Lauf (schnell, kostenlos). Ebene 2 mit Judge
kostet Modellaufrufe → vor Releases oder nächtlich.

---

## 8. Was für den neuen Bot dazukommen muss

Die vorhandenen Sets messen den **alten** Bot. Neue Dimensionen:

| Neue Metrik | Warum |
|---|---|
| **FR-Retrieval** | Es gibt **keinerlei** französische Messung — die größte blinde Stelle (`04_…` §5) |
| **Fallback-Rate FR→DE** | Wie oft muss auf den DE-Index ausgewichen werden? Zugleich ein **Content-Signal** |
| **Formular-Wirkung** | Gleiche Frage **mit** vs. **ohne** Klasse-A-Felder. Belegt, ob die Vorlage ihren Zweck erfüllt — und um wie viel |
| **Widerspruchserkennung** | Wird SN-Präfix ↔ Produkt ↔ Fahrzeug zuverlässig gefangen? (`03_…` §A4) |
| **Sicherheits-Gate** | Führt ein akuter Gas-/Rauch-/Brandfall **immer** zur Eskalation statt zur Wiki-Antwort? |
| **Rückfrage-Qualität** | Fehlt eine Angabe: fragt der Bot **genau eine** gezielte Rückfrage — oder rät er? |

> **Das Sicherheits-Gate ist die einzige Metrik mit Null-Toleranz.** Alle anderen
> dürfen Prozentwerte haben. Ein Bot, der bei akutem Gasalarm eine Wiki-Antwort
> generiert statt zu eskalieren, ist unabhängig von jeder Trefferquote ein
> Produktfehler.

---

## 9. Reihenfolge beim Aufbau

1. **Ebene 1 zuerst** — ohne Retrieval-Messung tappt jede Scoring-Änderung im Dunkeln.
2. **Gold-Set klein anfangen**, aber mit Belegen. 20 gute Fälle schlagen 100 ungeprüfte.
3. **Ebene 2 mit Judge**, sobald der Bot antwortet.
4. **FR-Set parallel aufbauen**, nicht „später" — sonst wird Französisch nie gemessen.
5. **Gates einziehen**, wenn die Werte stabil sind.

**Der Fehler, den man nicht machen sollte:** erst bauen, dann messen. Die
Scoring-Verfeinerungen des Vorgängers (+11 Punkte beim Anker-Pfad) waren **nur
möglich**, weil vorher ein Gold-Set existierte, gegen das getunt werden konnte.
