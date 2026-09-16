// ============================================================================
// Fallprüfung — Sicherheits-Gate, Widerspruchserkennung, Retrieval-Steuerung.
// ----------------------------------------------------------------------------
// Läuft VOR jedem Modellaufruf. Zwei Aufgaben:
//   1. SICHERHEIT: akute Gefahrenlagen brechen den RAG-Fluss ab (nie eine
//      Wiki-Antwort generieren, wenn jemand Gas riecht).
//   2. QUALITÄT: Widersprüche zwischen Seriennummer, Produkt und Fahrzeug
//      früh fangen — eine korrekte Antwort für das falsche System ist die
//      folgenschwerste Fehlerklasse (docs/03_FALLAUFNAHME_SCHEMA.md §A4).
// ============================================================================

// ─── Seriennummern-Präfixe ──────────────────────────────────────────────────
// Quelle: wiki/de/seriennummern-softwarestaende.md (Präfix-Matrix).
// WICHTIG: Die Reihen haben EIGENE Softwarezweige und dürfen NIE numerisch
// miteinander verglichen werden („5832 > 1050" bedeutet nichts).
export const SN_PRAEFIXE = {
  '0823': { produkt: 'WiPro III', variante: 'Standardzentrale', fahrzeugHinweis: null },
  1050: { produkt: 'WiPro III safe.lock', variante: 'safe.lock', fahrzeugHinweis: /fiat|ducato|jumper|boxer|movano/i },
  5298: { produkt: 'WiPro III safe.lock', variante: 'Ford-Set', fahrzeugHinweis: /ford|transit|tourneo/i },
  5458: { produkt: 'WiPro III safe.lock', variante: 'Sprinter-Set', fahrzeugHinweis: /sprinter|crafter|tge/i },
  5832: { produkt: 'WiPro III safe.lock', variante: 'Renault-Set', fahrzeugHinweis: /renault|master/i },
  '0699': { produkt: 'Pro-finder', variante: 'GSM/GPS', fahrzeugHinweis: null, schwelle: 45 },
  '0686': { produkt: 'GPS-pro', variante: 'Legacy-Ortung', fahrzeugHinweis: null },
  1012: { produkt: 'GSM/GPS-Kombimodul', variante: 'Legacy', fahrzeugHinweis: null },
  1290: { produkt: 'Bluetooth-Vernetzungsmodul', variante: 'Vorgänger von BT-connect', fahrzeugHinweis: null },
  6000: { produkt: 'BT-connect', variante: 'eigene Produktlinie', fahrzeugHinweis: null },
  5299: { produkt: 'NFC-Modul', variante: null, fahrzeugHinweis: null },
};

// ─── Sicherheits-Gate ───────────────────────────────────────────────────────
// Aus wiki/de/support-fallaufnahme.md, Abschnitt „Sofortige Eskalation":
// Bei Rauch, Brandgeruch, starker Erwärmung oder akutem Gas-/CO-/Rauchalarm
// zuerst Personen und Tiere aus dem Gefahrenbereich — den Fall NICHT durch
// weitere Schalt- oder Funktionstests am Fahrzeug diagnostizieren.
// GRUNDSATZ: im Zweifel eskalieren. Ein Fehlalarm kostet eine unnötige
// Sicherheitsmeldung — und die Meldung sagt ausdrücklich, wie man den Fall ohne
// Gefahrenbeschreibung neu formuliert. Ein übersehener Gasgeruch kostet mehr.
// Deshalb tolerant formuliert: Füllwörter zwischen Verb und Objekt („riecht ES
// nach Gas", „es riecht hier drinnen nach Gas") dürfen nicht durchrutschen.
// Bis zu 5 Füllwörter: „riecht hier drinnen ganz stark nach Gas" sind bereits
// vier — knapp bemessene Lücken lassen genau die umgangssprachlichen Sätze
// durch, in denen Menschen eine Gefahr tatsächlich beschreiben.
const LUECKE = '(?:\\s+\\S+){0,5}\\s+';

const GEFAHR = {
  de: [
    // Feuer / Hitze
    /\bbrennt\b/i, /\bfeuer\b/i, /\bflamme/i, /\bexplo/i,
    /brandgeruch/i, /\bqualm/i, /verschmort/i, /schmorgeruch/i, /geschmolzen/i,
    /\bschmilzt\b/i, /\bglüht\b/i, /\bfunken\b/i,
    new RegExp(`riecht${LUECKE}(?:verbrannt|verschmort|nach\\s+(?:rauch|feuer|verbrannt))`, 'i'),
    // \brauch\b mit Wortgrenzen: trifft „kommt Rauch" und „Rauch tritt aus" in
    // JEDER Wortstellung, aber NICHT „Rauchmelder" oder „nicht rauchen" — das
    // wäre der häufigste Fehlalarm in diesem Produktumfeld.
    /\brauch\b/i, /rauchentwicklung/i,
    /(?:starke?|stark)\s*(?:erwärmung|erhitzung)/i,
    /(?:sehr|extrem|zu)\s+hei(?:ss|ß)/i, /hei(?:ss|ß)\s+geworden/i,
    // Gas / CO
    /gas(?:\s*)geruch/i, /geruch\s+nach\s+gas/i, /gasaustritt/i, /gas\s*leck/i,
    new RegExp(`riecht${LUECKE}nach\\s+gas`, 'i'),
    new RegExp(`stinkt${LUECKE}nach\\s+gas`, 'i'),
    /gas\s+(?:strömt|entweicht|austritt)/i, /propan\s*geruch/i, /butan\s*geruch/i,
    // Gas-/Rauchalarm-Erwähnungen stehen NICHT hier: sie werden in
    // pruefeGefahr() gesondert behandelt (nur mit Akut-Signal), weil
    // Fehlalarme der häufigste Gaswarner-Supportfall sind. CO ebenso —
    // aber dort umgekehrt: CO eskaliert immer.
    /(?:akut|aktuell)\w*\s+(?:gas|co|rauch|brand)/i,
    // Personengefahr — Flexionsformen mitnehmen („schwindelig", „mir ist übel")
    // ⚠️ KEIN \b vor Umlauten! `\b` ist in JavaScript auf ASCII-Wortzeichen
    // definiert; „ü" ist keines. `/\bübel\b/` traf deshalb NIE — der Satz
    // „Mir ist übel." lief am Gate vorbei. Gefunden am 16.09.2026; der
    // Selbsttest hatte es verdeckt, weil sein Beispielsatz zusätzlich
    // „schwindelig" enthielt und darüber ansprang. Die übrigen Muster in
    // dieser Liste kommen deshalb ohne Wortgrenzen aus.
    /übel/i, /schwindel/i, /bewusstlos/i, /atemnot/i,
    /\bbenommen\b/i, /kopfschmerz/i,
  ],
  fr: [
    /brûle/i, /\bincendie\b/i, /\bflamme/i, /explos/i,
    /odeur\s+de\s+brûlé/i, /\bfumée\b/i, /\bfondu\b/i, /\bfond\b/i,
    /surchauffe/i, /(?:très|trop)\s+chaud/i, /étincelle/i,
    new RegExp(`odeur${LUECKE}(?:de\\s+)?gaz`, 'i'),
    /fuite\s+de\s+gaz/i, /\bgaz\s+s['’]échappe/i,
    new RegExp(`sent${LUECKE}le\\s+gaz`, 'i'),
    /alarme\s+incendie/i,
    /\bnausée/i, /\bvertige/i, /inconscient/i, /difficulté\s+à\s+respirer/i,
  ],
};

// ─── Produktbezeichnungen maskieren ─────────────────────────────────────────
// KRITISCH: Die Produktnamen enthalten selbst Gefahrenwörter. „détecteur de
// fumée" ist der T.S.A. Funk-Rauchmelder — ohne Maskierung eskaliert JEDE
// französische Rauchmelder-Frage, und das Gate wird unbrauchbar.
// Die Namen werden vor der Prüfung entfernt, nicht per Lookaround
// ausgeklammert: So greifen die Muster weiterhin, wenn im selben Satz eine
// echte Gefahr steht („Der Rauchmelder piept UND es riecht verbrannt").
const PRODUKTBEGRIFFE = [
  /détecteurs?\s+de\s+fumée/gi, /detecteurs?\s+de\s+fumee/gi,
  /détecteurs?\s+de\s+gaz/gi, /detecteurs?\s+de\s+gaz/gi,
  /avertisseurs?\s+de\s+gaz/gi, /alarmes?\s+(?:de\s+)?fumée/gi,
  /funk[-\s]?rauchmelder/gi, /\brauchmelder\b/gi, /\bbrandmelder\b/gi,
  /gaswarn(?:er|anlage|system|gerät)\w*/gi, /\bgasmelder\b/gi,
  /\bgassensor\w*/gi, /\bco[-\s]?sensor\w*/gi, /kohlenmonoxid[-\s]?sensor\w*/gi,
  /\bt\.?s\.?a\.?\b/gi, /g\.?a\.?s\.?-?\s?pro\s*(?:iii)?(?:\s*co)?/gi,
];

// Ein reiner Gas-/CO-Alarm-Hinweis ist NICHT automatisch akut: Fehlalarme sind
// der häufigste Supportfall bei Gaswarnern. Er eskaliert nur zusammen mit einem
// zweiten Signal (Geruch, Symptom, Rauch, Hitze) oder einem Akut-Wort.
const ALARM_ERWAEHNUNG = /\b(?:gasalarm|gaswarnung|alarme\s+(?:de\s+)?gaz)\b/i;
const AKUT = /\b(?:akut|gerade|jetzt|sofort|immer\s+noch|dauernd|actuellement|maintenant|en\s+ce\s+moment)\b/i;
// ─── Kohlenmonoxid ──────────────────────────────────────────────────────────
// CO ist geruchlos und tödlich: Ein CO-ALARM eskaliert IMMER, ohne Zweitsignal.
// Das bleibt so. Geprüft wird vor der Maskierung, damit kein Produktname ihn
// verdeckt („der CO-Sensor schlägt Alarm").
const CO_ALARM = /\b(?:co[-\s]?alarm|kohlenmonoxid[-\s]?alarm|alarme\s+(?:co|monoxyde))\b/i;

// Das bloße SUBSTANTIV ist etwas anderes. Bis 16.09.2026 stand es in derselben
// Liste — dadurch eskalierte JEDE Frage, in der das Wort vorkam, auch die reine
// Sachfrage „Warnt der T.S.A. auch vor Kohlenmonoxid?". Die Wissensbasis hat
// darauf eine klare Antwort („warnt NICHT vor … Kohlenmonoxid"), und sie
// erreichte den Nutzer nie. Das ist derselbe Fehler, vor dem PRODUKTBEGRIFFE
// weiter oben warnt, nur für CO statt für „détecteur de fumée".
//
// Die Ausnahme ist BEWUSST eng gefasst: Nur wer erkennbar nach einer Fähigkeit
// FRAGT (Fragezeichen + Fähigkeitsverb) und dabei KEIN Ereignis schildert,
// kommt durch. Alles andere eskaliert weiter. Der Grundsatz „im Zweifel
// eskalieren" bleibt damit unangetastet — es wird nur ein klar erkennbarer
// Nicht-Zweifel ausgenommen.
const CO_BEGRIFF = /\b(?:kohlenmonoxid|monoxyde\s+de\s+carbone)\b/i;

// Ein CO-GERÄT, das anschlägt, IST ein CO-Alarm — auch wenn niemand das Wort
// „Alarm" benutzt. „Mein CO-Melder piept ununterbrochen" lief bisher durch:
// Weder traf CO_ALARM (kein „CO-Alarm" im Wortlaut) noch blieb nach der
// Maskierung etwas übrig, denn „CO-Sensor" steht in PRODUKTBEGRIFFE. Eine
// Lücke, die es schon vor der Trennung oben gab.
const CO_GERAET = /\b(?:co[-\s]?(?:melder|warner|sensor|detektor|alarmgeber)|kohlenmonoxid[-\s]?(?:melder|warner|sensor)|d[ée]tecteur\s+(?:de\s+)?(?:co|monoxyde))\b/i;
const CO_FAEHIGKEITSFRAGE = /\b(?:warnt|warnen|erkennt|erkennen|meldet|melden|misst|messen|detektiert|reagiert|unterscheidet|geeignet|kompatibel|détecte|détecter|avertit|signale|reconna(?:ît|it)|convient)\b/i;
// Schildert der Satz ein laufendes Ereignis, ist es KEINE Sachfrage — auch dann
// nicht, wenn ein Fragezeichen darin steht („Mein CO-Melder piept, was tun?").
const CO_EREIGNIS = /\b(?:alarm\w*|piept|piepst|piepen|ausgelöst|löst\s+aus|schlägt\s+an|geht\s+los|ununterbrochen|dauernd|blinkt\s+rot|se\s+déclenche|déclench\w*|sonne)\b/i;

function istCoSachfrage(text) {
  return text.includes('?')
    && CO_FAEHIGKEITSFRAGE.test(text)
    && !CO_EREIGNIS.test(text)
    && !AKUT.test(text);
}

export function pruefeGefahr(text, sprache = 'de') {
  const roh = String(text || '');
  if (!roh.trim()) return { gefahr: false, ausloeser: null };

  // CO zuerst — vor der Maskierung, damit kein Produktname ihn verdeckt.
  // 1) Ein ausdrücklicher CO-Alarm eskaliert immer.
  const coAlarm = roh.match(CO_ALARM);
  if (coAlarm) return { gefahr: true, ausloeser: coAlarm[0].trim() };

  // 2) Ein CO-Gerät, das anschlägt, zählt als CO-Alarm.
  const coGeraet = roh.match(CO_GERAET);
  if (coGeraet && CO_EREIGNIS.test(roh)) {
    return { gefahr: true, ausloeser: coGeraet[0].trim() };
  }

  // 3) Das bloße Wort „Kohlenmonoxid" eskaliert ebenfalls — außer es ist
  //    erkennbar eine Frage nach der Erkennungsfähigkeit eines Produkts.
  const coBegriff = roh.match(CO_BEGRIFF);
  if (coBegriff && !istCoSachfrage(roh)) {
    return { gefahr: true, ausloeser: coBegriff[0].trim() };
  }

  let t = roh;
  for (const re of PRODUKTBEGRIFFE) t = t.replace(re, ' ');

  // IMMER beide Sprachlisten prüfen: Eingaben mischen sich in der Praxis, und
  // eine übersehene Gefahr ist teurer als ein Fehlalarm.
  for (const re of [...GEFAHR.de, ...GEFAHR.fr]) {
    const treffer = t.match(re);
    if (treffer) return { gefahr: true, ausloeser: treffer[0].trim() };
  }

  // Gas-/Rauchalarm nur mit Akut-Signal.
  const alarm = t.match(ALARM_ERWAEHNUNG);
  if (alarm && AKUT.test(t)) return { gefahr: true, ausloeser: alarm[0].trim() };

  return { gefahr: false, ausloeser: null };
}

// ─── Seriennummer auswerten ─────────────────────────────────────────────────
// Erwartetes Format: Präfix + laufender Stand, führende Nullen erhalten
// („0699-045"). Toleriert Leerzeichen, Punkt und fehlenden Trenner.
export function leseSeriennummer(sn) {
  const roh = String(sn || '').trim();
  if (!roh) return null;
  const m = roh.match(/^(\d{4})\s*[-.\s/]?\s*(\d{1,4})?$/);
  if (!m) return { roh, praefix: null, stand: null, bekannt: false };
  const praefix = m[1];
  const stand = m[2] ? Number(m[2]) : null;
  const eintrag = SN_PRAEFIXE[praefix];
  return {
    roh, praefix, stand,
    bekannt: !!eintrag,
    produkt: eintrag?.produkt || null,
    variante: eintrag?.variante || null,
    fahrzeugHinweis: eintrag?.fahrzeugHinweis || null,
    schwelle: eintrag?.schwelle ?? null,
    ueberSchwelle: eintrag?.schwelle != null && stand != null ? stand >= eintrag.schwelle : null,
  };
}

// ─── Widerspruchsprüfung ────────────────────────────────────────────────────
// Meldet, statt still zu überschreiben: Der Nutzer soll den Widerspruch sehen.
export function pruefeWidersprueche({ fahrzeug, produkte = [], seriennummer, baujahr }) {
  const hinweise = [];
  const sn = leseSeriennummer(seriennummer);

  if (sn && sn.praefix && !sn.bekannt) {
    hinweise.push({
      art: 'sn_unbekannt', schwere: 'hinweis',
      text: `Das Seriennummern-Präfix ${sn.praefix} ist in der hinterlegten Matrix nicht verzeichnet. Bitte die vollständige Seriennummer vom Typenschild prüfen (Artikelnummer ist NICHT die Seriennummer).`,
    });
  }

  // 1) Präfix ↔ gewähltes Produkt
  if (sn?.bekannt && produkte.length) {
    const passt = produkte.some((p) => {
      const a = String(p).toLowerCase();
      const b = String(sn.produkt).toLowerCase();
      return a.includes(b) || b.includes(a)
        || (a.includes('wipro') && b.includes('wipro'))
        || (a.includes('pro-finder') && b.includes('pro-finder'));
    });
    if (!passt) {
      hinweise.push({
        art: 'sn_produkt', schwere: 'warnung',
        text: `Die Seriennummer ${sn.roh} gehört laut Präfix ${sn.praefix} zu „${sn.produkt}"${sn.variante ? ` (${sn.variante})` : ''} — das passt nicht zur getroffenen Produktauswahl.`,
      });
    }
    // Variante: safe.lock vs. Standard
    const nenntSafelock = produkte.some((p) => /safe\.?lock/i.test(p));
    const istSafelock = /safe\.?lock/i.test(sn.produkt || '');
    if (istSafelock && !nenntSafelock) {
      hinweise.push({
        art: 'variante', schwere: 'warnung',
        text: `Präfix ${sn.praefix} steht für WiPro III safe.lock, ausgewählt wurde die Standard-Variante. Die Varianten unterscheiden sich funktional — bitte prüfen.`,
      });
    }
    if (!istSafelock && nenntSafelock && /^0823$/.test(sn.praefix)) {
      hinweise.push({
        art: 'variante', schwere: 'warnung',
        text: `Präfix 0823 steht für die WiPro III Standardzentrale, ausgewählt wurde safe.lock. Bitte prüfen.`,
      });
    }
  }

  // 2) Präfix ↔ Fahrzeug (der wertvollste Check)
  if (sn?.fahrzeugHinweis && fahrzeug?.titel) {
    if (!sn.fahrzeugHinweis.test(fahrzeug.titel)) {
      hinweise.push({
        art: 'sn_fahrzeug', schwere: 'warnung',
        text: `Die Seriennummern-Reihe ${sn.praefix} ist als ${sn.variante} dokumentiert — das passt nicht zum gewählten Fahrzeug „${fahrzeug.titel}". Bitte Seriennummer und Fahrzeug gegenprüfen.`,
      });
    }
  }

  // 3) Baujahr ↔ Fahrzeugartikel
  if (baujahr && fahrzeug && !fahrzeug.fallback) {
    const jahr = Number(baujahr);
    if (Number.isFinite(jahr)) {
      const zuFrueh = fahrzeug.von != null && jahr < fahrzeug.von;
      const zuSpaet = fahrzeug.bis != null && !fahrzeug.offen && jahr > fahrzeug.bis;
      if (zuFrueh || zuSpaet) {
        const bereich = `${fahrzeug.von ?? '…'}–${fahrzeug.offen ? 'heute' : (fahrzeug.bis ?? '…')}`;
        hinweise.push({
          art: 'baujahr', schwere: 'warnung',
          text: `Baujahr ${jahr} liegt außerhalb des dokumentierten Zeitraums für „${fahrzeug.titel}" (${bereich}). Generationswechsel bedeuten andere Anschlusspläne und DIP-Stellungen — bitte Modellvariante prüfen.`,
        });
      }
    }
  }

  return { hinweise, sn };
}

// ─── Retrieval-Query aus dem strukturierten Fall bauen ──────────────────────
// KERNPUNKT (docs/03_FALLAUFNAHME_SCHEMA.md §1): Kontaktdaten und Feldlabels
// gehören NICHT in die Suchquery — jeder zusätzliche Begriff senkt den
// Coverage-Faktor und verschlechtert das Retrieval messbar.
export function baueSuchanfrage({ fehlerbild = {}, produkte = [], produktSlugs = [] }) {
  const teile = [];
  // Das Fehlerbild ist der eigentliche Informationsträger.
  for (const feld of ['beobachtet', 'erwartet', 'led', 'meldung', 'ausloeser', 'bisher']) {
    if (fehlerbild[feld]) teile.push(String(fehlerbild[feld]));
  }
  // Produktbezeichnungen + kanonische Slugs (ersetzt die Alias-Rateschleife).
  for (const p of produkte) teile.push(String(p));
  for (const s of produktSlugs) if (s) teile.push(s);
  // ⚠️ Der FAHRZEUG-SLUG gehört BEWUSST NICHT in die Textquery.
  // Live gemessen: „fiat ducato 2022 2024" als Suchtext zieht ALLE Ducato-
  // Artikel hoch — auch die falschen Generationen (2012-2021, 2024plus, x250) —
  // und verdrängt den fachlich richtigen Artikel. Das Fahrzeug wirkt stattdessen
  // als gezielte Gewichtung über fahrzeugGewichten() — die strukturierte Angabe
  // ist ein FILTER, kein Suchbegriff (docs/02_ZIELARCHITEKTUR.md §2.3).
  return teile.filter(Boolean).join(' ').slice(0, 1200);
}

// ─── Fahrzeug-Gewichtung ────────────────────────────────────────────────────
// Der Vorgänger musste Fahrzeugartikel pauschal abwerten (Faktor 0,35), weil er
// nicht wusste, ob ein Fahrzeug gemeint ist. Mit der Fallaufnahme ist das ein
// Fakt: Der EINE passende Artikel wird hochgewichtet, alle ANDEREN Fahrzeug-
// artikel werden fast vollständig verdrängt. Das ist der größte einzelne
// Retrieval-Gewinn der Formatvorlage (docs/03_FALLAUFNAHME_SCHEMA.md §A1).
export function fahrzeugGewichten(treffer, fahrzeugSlug) {
  if (!Array.isArray(treffer)) return [];
  return treffer
    .map((t) => {
      if (t.articleType !== 'vehicle') return t;
      if (!fahrzeugSlug) return t; // ohne Angabe bleibt die Abwertung aus search-core
      const passt = t.slug === fahrzeugSlug || t.route.endsWith(`/${fahrzeugSlug}`);
      return { ...t, score: t.score * (passt ? 3 : 0.1) };
    })
    .sort((a, b) => b.score - a.score);
}
