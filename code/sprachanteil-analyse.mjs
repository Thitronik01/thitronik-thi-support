// ============================================================================
// Sprachanteil-Analyse der Anleitungs-/FAQ-Extrakte.
// ----------------------------------------------------------------------------
// Belegt quantitativ, wie viel FRANZÖSISCHER Text in Dokumenten steckt, die
// aktuell ALLE unter lang='de' indexiert sind. Grundlage für die Empfehlung in
// docs/04_MEHRSPRACHIGKEIT_DE_FR.md §1.2: Die FR-Anleitungslücke ist eine
// INGEST-Aufgabe (Sprachsegmentierung), keine Übersetzungsaufgabe.
//
//     node code/sprachanteil-analyse.mjs
//
// Verfahren: Auszählen sprachtypischer Funktionswörter (Artikel, Hilfsverben,
// Präpositionen). Bewusst grob — es geht um die Größenordnung „enthält das
// Dokument nennenswert Französisch?", nicht um exakte Sprachanteile. Für die
// eigentliche Segmentierung beim Ingest braucht es eine Analyse pro ABSCHNITT,
// nicht pro Dokument (mehrsprachige PDFs sind blockweise aufgebaut).
// ============================================================================

import fs from 'fs';
import path from 'path';

const QUELLE = path.join(
  import.meta.dirname, '..', 'content', 'anleitungen', 'anleitungen-und-faq.json',
);

// Funktionswörter, die in der jeweiligen Sprache hochfrequent und in der
// anderen praktisch nicht vorkommen. `des` ist bewusst nur FR zugeordnet —
// im Deutschen ist es deutlich seltener als im Französischen.
const FR = /\b(?:le|la|les|des|une|est|sont|avec|pour|dans|vous|votre|nous|cette|ce|qui|que|sur|par|plus|tous|toute|lors|apres|avant|selon|ainsi|doit|peut|etre|avoir)\b/gi;
const DE = /\b(?:der|die|das|und|ist|sind|mit|für|nicht|eine|einen|auf|von|bei|dem|den|wird|werden|kann|muss|sich|auch|nach|über)\b/gi;

const MIN_LAENGE = 400;   // zu kurze Extrakte sind statistisch wertlos
const SCHWELLE = 0.12;    // ab hier „enthält nennenswert Französisch"

const daten = JSON.parse(fs.readFileSync(QUELLE, 'utf8'));
const befunde = [];

for (const doc of daten.dokumente) {
  const text = String(doc.text || '');
  if (text.length < MIN_LAENGE) continue;
  const fr = (text.match(FR) || []).length;
  const de = (text.match(DE) || []).length;
  const anteil = fr / Math.max(1, fr + de);
  if (anteil > SCHWELLE) {
    befunde.push({ titel: doc.titel, typ: doc.typ, lang: doc.lang, anteil, laenge: text.length });
  }
}

befunde.sort((a, b) => b.anteil - a.anteil);

const anleitungen = befunde.filter((b) => b.typ === 'anleitung');
const gesamtAnleitungen = daten.dokumente.filter((d) => d.typ === 'anleitung').length;

console.log(`Quelle: ${daten.anzahl} Dokumente (${gesamtAnleitungen} Anleitungen, `
  + `${daten.anzahl - gesamtAnleitungen} FAQ)\n`);
console.log(`Dokumente mit nennenswertem FR-Anteil: ${befunde.length}`);
console.log(`davon Anleitungen: ${anleitungen.length} von ${gesamtAnleitungen}\n`);

for (const b of befunde) {
  const pct = `${Math.round(b.anteil * 100)}%`.padStart(4);
  console.log(`  ${pct} | ${b.typ.padEnd(9)} | lang=${b.lang} | ${b.titel.slice(0, 60)}`);
}

// Der entscheidende Punkt: Wie viele davon sind fälschlich NUR als 'de' geführt?
const falschZugeordnet = befunde.filter((b) => b.lang === 'de');
console.log(`\n${'─'.repeat(70)}`);
console.log(`FR-haltige Dokumente, die NUR unter lang='de' indexiert sind: `
  + `${falschZugeordnet.length}`);
console.log('→ Diese Inhalte sind für französische Nutzer heute unauffindbar,');
console.log('  obwohl der Text vorliegt. Lösung: Sprachsegmentierung beim Ingest');
console.log('  (docs/04_MEHRSPRACHIGKEIT_DE_FR.md §1.2, Priorität 4).');
