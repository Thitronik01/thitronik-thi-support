// ============================================================================
// Sicherheitsbewertung einer Antwort.
// ----------------------------------------------------------------------------
// Beantwortet: „Wie belastbar ist das, was Thi gerade sagt?"
//
// GRUNDSATZ: Die Zahl muss aus NACHVOLLZIEHBAREN Faktoren entstehen, nicht aus
// einer Selbsteinschätzung des Modells. Sprachmodelle schätzen ihre eigene
// Sicherheit notorisch schlecht ein — sie klingen bei erfundenen Antworten
// genauso überzeugt wie bei belegten. Deshalb wiegt hier die Datenlage
// (was wurde erfasst?) und die Quellenlage (was wurde gefunden?) am
// schwersten; die Selbsteinschätzung des Modells fließt nur als kleiner
// Korrekturposten ein.
//
// Jeder Abzug wird begründet zurückgegeben — eine Prozentzahl ohne Erklärung
// wäre Pseudo-Präzision.
// ============================================================================

// Gewichte. Summe der positiven Anteile = 100.
const DATENLAGE_MAX = 40;
const QUELLENLAGE_MAX = 45;
const MODELL_MAX = 15;

// Ab diesem Retrieval-Score gilt ein Treffer als tragfähig. Aus den
// beobachteten Werten abgeleitet: gute Treffer liegen bei 150+, schwache
// unter 60 (siehe docs/05_EVAL_UND_QUALITAET.md).
const SCORE_GUT = 170;
const SCORE_SCHWACH = 55;

export function bewerteSicherheit({ fall, sn, quellen = [], hinweise = [], rueckfallDe = false, modellStufe = null, sprache = 'de' }) {
  const fehlt = [];
  const gruende = [];

  // ── 1) Datenlage: Was wurde überhaupt erfasst? ────────────────────────────
  let daten = 0;
  const f = fall.fehlerbild || {};

  if (String(f.beobachtet || '').trim().length >= 15) daten += 10;
  else fehlt.push(sprache === 'fr' ? 'description plus détaillée du problème' : 'ausführlichere Problembeschreibung');

  if (fall.produkte && fall.produkte.length) daten += 10;
  else fehlt.push(sprache === 'fr' ? 'produit concerné' : 'betroffenes Produkt');

  if (fall.fahrzeug && fall.fahrzeug.slug && !fall.fahrzeug.fallback) daten += 8;
  else fehlt.push(sprache === 'fr' ? 'véhicule de base' : 'Basisfahrzeug');

  if (sn && sn.bekannt) daten += 7;
  else if (sn && sn.praefix) daten += 2;
  else fehlt.push(sprache === 'fr' ? 'numéro de série' : 'Seriennummer');

  if (String(f.led || '').trim() || String(f.meldung || '').trim()) daten += 5;
  else fehlt.push(sprache === 'fr' ? 'LED d\'état / code de clignotement' : 'Status-LED / Blinkcode');

  daten = Math.min(DATENLAGE_MAX, daten);

  // ── 2) Quellenlage: Wie gut ist gefunden worden? ──────────────────────────
  let quellenPunkte = 0;
  const echteTreffer = quellen.filter((q) => !q.ausFallangabe);
  const bester = echteTreffer.length ? Math.max(...echteTreffer.map((q) => q.score || 0)) : 0;
  const tragfaehige = echteTreffer.filter((q) => (q.score || 0) >= SCORE_SCHWACH).length;

  if (bester >= SCORE_GUT) quellenPunkte += 30;
  else if (bester > 0) quellenPunkte += Math.round(30 * (bester / SCORE_GUT));

  quellenPunkte += Math.min(15, tragfaehige * 5);
  quellenPunkte = Math.min(QUELLENLAGE_MAX, quellenPunkte);

  if (bester < SCORE_SCHWACH) {
    gruende.push(sprache === 'fr'
      ? 'Aucune source clairement pertinente trouvée.'
      : 'Keine eindeutig einschlägige Quelle gefunden.');
  }

  // ── 3) Selbsteinschätzung des Modells (kleiner Korrekturposten) ───────────
  var modell = 8; // neutral, wenn das Modell nichts sagt
  if (modellStufe === 'hoch') modell = MODELL_MAX;
  else if (modellStufe === 'mittel') modell = 8;
  else if (modellStufe === 'gering') modell = 2;

  let wert = daten + quellenPunkte + modell;

  // ── 4) Abzüge ─────────────────────────────────────────────────────────────
  const widersprueche = hinweise.filter((h) => h.schwere === 'warnung').length;
  if (widersprueche) {
    wert -= Math.min(30, widersprueche * 15);
    // DECKEL, nicht nur Abzug: Widersprechen sich Seriennummer, Produkt und
    // Fahrzeug, ist eine der Grundannahmen falsch — dann kann die Antwort auch
    // bei perfekter Quellenlage nicht „sicher" sein. Ohne Deckel käme ein Fall
    // mit starken Quellen trotz Widerspruch noch auf 85 % („hoch"), und genau
    // das wäre die gefährlichste Kombination: überzeugend und falsch.
    const deckel = widersprueche >= 2 ? 45 : 60;
    if (wert > deckel) wert = deckel;
    gruende.push(sprache === 'fr'
      ? `${widersprueche} contradiction(s) dans les données — vérifier avant toute affirmation.`
      : `${widersprueche} Widerspruch in den Angaben — vor einer verbindlichen Aussage prüfen.`);
  }

  if (rueckfallDe) {
    wert -= 10;
    gruende.push('Une partie des sources n\'existe qu\'en allemand.');
  }

  // ── Support-Korrekturen im Kontext ────────────────────────────────────────
  // Eine eingepflegte Falschaussage bekäme sonst denselben Wert wie eine
  // geprüfte Wiki-Aussage (docs/07_KORREKTUREN_ENTWUERFE.md, Frage 5).
  // UNGEPRÜFT → derselbe Deckel wie bei einem Widerspruch: Die Antwort mag
  // stimmen, aber niemand hat es bestätigt — „hoch" darf sie nicht heißen.
  // FREIGEGEBEN → kein Deckel, aber die Herkunft bleibt in den Gründen sichtbar.
  const korrekturen = quellen.filter((q) => q.korrektur);
  const ungeprueft = korrekturen.filter((q) => q.korrektur.status === 'ungeprueft');
  const freigegeben = korrekturen.filter((q) => q.korrektur.status === 'freigegeben');
  if (ungeprueft.length) {
    if (wert > 60) wert = 60;
    gruende.push(sprache === 'fr'
      ? `S'appuie sur ${ungeprueft.length} correction(s) du support non encore validée(s).`
      : `Stützt sich auf ${ungeprueft.length} ungeprüfte Support-Korrektur${ungeprueft.length > 1 ? 'en' : ''}.`);
  }
  if (freigegeben.length) {
    const k = freigegeben[0].korrektur;
    gruende.push(sprache === 'fr'
      ? `Inclut une correction du support validée (${k.autor}, ${String(k.freigegebenAm || '').slice(0, 10)}).`
      : `Enthält eine freigegebene Support-Korrektur (${k.autor}, ${String(k.freigegebenAm || '').slice(0, 10)}).`);
  }

  // ── Gewichtung der Wissensmanager ─────────────────────────────────────────
  // Eine als VERALTET markierte Quelle unter den tragenden Treffern: derselbe
  // Deckel wie bei einer ungeprüften Korrektur. Sie wurde bewusst abgewertet,
  // aber nicht gestrichen — wenn sie trotzdem vorn liegt, gab es nichts
  // Besseres, und das soll der Prozentwert sagen.
  const veraltet = quellen.filter((q) => q.gewichtung?.status === 'veraltet' && (q.score || 0) >= SCORE_SCHWACH);
  if (veraltet.length) {
    if (wert > 60) wert = 60;
    gruende.push(sprache === 'fr'
      ? `S'appuie sur ${veraltet.length} source(s) marquée(s) comme obsolète(s).`
      : `Stützt sich auf ${veraltet.length} als veraltet markierte Quelle${veraltet.length > 1 ? 'n' : ''}.`);
  }

  wert = Math.max(3, Math.min(97, Math.round(wert)));

  // ── 5) Einordnung ─────────────────────────────────────────────────────────
  let stufe = 'gering';
  if (wert >= 75) stufe = 'hoch';
  else if (wert >= 50) stufe = 'mittel';

  return {
    wert,
    stufe,
    fehlt: fehlt.slice(0, 4),
    gruende,
    teile: { datenlage: daten, quellenlage: quellenPunkte, modell },
    korrekturen: korrekturen.length ? { ungeprueft: ungeprueft.length, freigegeben: freigegeben.length } : undefined,
  };
}

// Liest den Marker [[SICHERHEIT: hoch|mittel|gering]] aus der Modellantwort
// und entfernt ihn aus dem Text. Der Marker ist bewusst maschinenlesbar und
// nicht Teil der sichtbaren Antwort.
export function leseModellStufe(text) {
  const treffer = String(text || '').match(/\[\[\s*SICHERHEIT\s*:\s*(hoch|mittel|gering|haute|moyenne|faible)\s*\]\]/i);
  if (!treffer) return { stufe: null, text };
  const roh = treffer[1].toLowerCase();
  const karte = { haute: 'hoch', moyenne: 'mittel', faible: 'gering' };
  return {
    stufe: karte[roh] || roh,
    text: String(text).replace(treffer[0], '').trim(),
  };
}
