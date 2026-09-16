/* ==========================================================================
   Mitschrift auswerten — Freitext → Strukturfelder.
   --------------------------------------------------------------------------
   Am Telefon tippt man mit, während der Kunde redet. Niemand springt dabei
   zwischen Dropdowns. Also: mitschreiben lassen und die Fakten selbst
   herausziehen.

   BEWUSST OHNE SPRACHMODELL. Die Erkennung läuft lokal gegen die Kataloge
   (30 Fahrzeuge, 48 Produkte, 11 Seriennummern-Präfixe):
     — sofort, ohne Wartezeit beim Tippen
     — kostenlos, kein Aufruf je Tastendruck
     — nachvollziehbar: jeder Treffer lässt sich auf eine Katalogzeile
       zurückführen, statt aus einem Modell zu stammen

   Der Mensch behält das letzte Wort: Erkanntes wird VORGESCHLAGEN, nie still
   gesetzt. Eine falsch erkannte Seriennummer, die niemand bemerkt, wäre
   schlimmer als gar keine Erkennung.
   ========================================================================== */
(function () {
  'use strict';

  var K = window.THI_KATALOGE || { fahrzeuge: [], produkte: [], praefixe: [] };

  function normal(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  /* ─── Seriennummer ──────────────────────────────────────────────────── */
  // Vierstelliges Präfix + laufender Stand. Verlangt einen Trenner oder
  // Wortgrenzen, damit lange Ziffernfolgen (Artikelnummern, Telefonnummern)
  // nicht fälschlich als Seriennummer gelesen werden.
  function seriennummer(text) {
    var treffer = String(text || '').match(/\b(\d{4})\s*[-./]\s*(\d{1,4})\b/);
    if (!treffer) return null;
    var praefix = treffer[1];
    var bekannt = K.praefixe.some(function (p) { return p.p === praefix; });
    return {
      wert: praefix + '-' + treffer[2],
      praefix: praefix,
      bekannt: bekannt,
    };
  }

  /* ─── Baujahr ───────────────────────────────────────────────────────── */
  function baujahr(text) {
    var jahre = [];
    var re = /\b(19[89]\d|20[0-3]\d)\b/g;
    var m;
    var t = String(text || '');
    while ((m = re.exec(t)) !== null) {
      // Ziffern, die Teil einer Seriennummer sind, überspringen
      var davor = t.slice(Math.max(0, m.index - 6), m.index);
      if (/\d[-./]\s*$/.test(davor)) continue;
      jahre.push(Number(m[0]));
    }
    return jahre.length ? jahre[0] : null;
  }

  /* ─── Fahrzeug ──────────────────────────────────────────────────────── */
  // Sucht die Badge-Varianten aus dem Katalog im Text. Längere Begriffe zuerst,
  // damit „Ducato 8/9" vor „Ducato" greift. Ein zusätzlich genanntes Baujahr
  // entscheidet zwischen Generationen desselben Modells.
  // Wörter, die für sich genommen kein Fahrzeug bestimmen — sie kommen in
  // fast jeder Variante vor und würden sonst alles auf einmal treffen.
  var UNSPEZIFISCH = /^(?:und|oder|generation|facelift|frueh|mit|ohne|startknopf|wohnmobil|aufbauhinweis|modelljahr|bis|seit|euro|max|pro)$/;

  function fahrzeug(text, jahr) {
    var t = normal(text);
    var kandidaten = [];

    K.fahrzeuge.forEach(function (f) {
      if (f.fallback) return;
      var beste = 0;

      // Am Telefon fällt der Modellname allein („Ducato", „Sprinter",
      // „Vivaro") — nie die vollständige Badge-Zeile. Deshalb wird jede
      // Variante in Wörter zerlegt und jedes für sich gesucht.
      (f.varianten || []).forEach(function (variante) {
        normal(variante).split(/[\s/]+/).forEach(function (wort) {
          var w = wort.replace(/[^a-z0-9.-]/g, '');
          if (w.length < 4 || UNSPEZIFISCH.test(w) || /^\d+$/.test(w)) return;
          if (new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(t) && w.length > beste) {
            beste = w.length;
          }
        });
      });

      // Herstellername allein ist ein schwächeres Signal — er unterscheidet
      // die Generationen nicht, grenzt aber immerhin ein.
      if (!beste) {
        (f.hersteller || []).forEach(function (h) {
          var n = normal(h).trim();
          if (!n) return;
          var gefunden = n.length <= 3
            ? new RegExp('\\b' + n + '\\b').test(t)
            : t.indexOf(n) >= 0;
          if (gefunden && n.length > beste) beste = Math.min(n.length, 3);
        });
      }

      if (beste) kandidaten.push({ fahrzeug: f, staerke: beste });
    });

    if (!kandidaten.length) return null;

    // Baujahr als Entscheider zwischen Generationen
    if (jahr) {
      var passend = kandidaten.filter(function (k) {
        var f = k.fahrzeug;
        var abVon = f.von == null || jahr >= f.von;
        var bisBis = f.bis == null || f.offen || jahr <= f.bis;
        return abVon && bisBis;
      });
      if (passend.length) kandidaten = passend;
    }

    kandidaten.sort(function (a, b) { return b.staerke - a.staerke; });
    return {
      fahrzeug: kandidaten[0].fahrzeug,
      mehrdeutig: kandidaten.length > 1,
      anzahl: kandidaten.length,
    };
  }

  /* ─── Produkte ──────────────────────────────────────────────────────── */
  // Umgangssprache mitdenken: Niemand sagt „G.A.S.-pro III" am Telefon,
  // sondern „der Gaswarner". Die Aliasse spiegeln die PRODUCT_ALIASES des
  // Retrieval-Kerns (lib/search-core.js).
  var ALIASSE = [
    { muster: /\bwipro\s*-?\s*(?:3|iii)\b.*safe|safe\.?lock/i, artikel: 'WiPro III safe.lock' },
    { muster: /\bwipro\s*-?\s*(?:3|iii)\b|\bwipro3\b/i, artikel: 'WiPro III' },
    { muster: /alarmanlage|alarmsystem|funk-?alarm|zentrale/i, artikel: 'WiPro III' },
    { muster: /handsender|fernbedienung/i, artikel: 'Funk-Handsender 868' },
    { muster: /magnetkontakt|tuer-?kontakt|fensterkontakt/i, artikel: 'Funk-Magnetkontakt 868, weiß' },
    { muster: /g\.?\s?a\.?\s?s\.?[\s-]*pro\s*(?:3|iii)\s*co/i, artikel: 'G.A.S.-pro III CO' },
    { muster: /g\.?\s?a\.?\s?s\.?[\s-]*pro\s*(?:3|iii)/i, artikel: 'G.A.S.-pro III' },
    { muster: /gaswarner|gasmelder|gassensor|gasalarm/i, artikel: 'G.A.S.-pro III' },
    { muster: /\bt\.?\s?s\.?\s?a\.?\b|rauchmelder|brandmelder/i, artikel: 'T.S.A. Funk-Rauchmelder, weiß' },
    { muster: /pro-?finder|ortung|\bgps\b|tracker|peilsender/i, artikel: 'Pro-finder' },
    { muster: /bt-?connect|bluetooth/i, artikel: 'BT-connect / Vernetzungsmodul' },
    { muster: /\bnfc\b|keycard|schluesselkarte/i, artikel: 'NFC-Modul' },
    { muster: /zusatzsirene|zweitsirene/i, artikel: 'Zusatzsirene' },
    { muster: /abschalteinrichtung|motorsperre|stilllegung/i, artikel: 'Abschalteinrichtung einpolig' },
    { muster: /umruestplatine|umbauplatine/i, artikel: 'Umrüstplatine' },
  ];

  function produkte(text) {
    var t = String(text || '');
    var gefunden = [];

    // 1) Exakte Produktnamen aus dem Katalog
    K.produkte.forEach(function (p) {
      if (normal(t).indexOf(normal(p.name)) >= 0) gefunden.push(p.name);
    });

    // 2) Umgangssprache
    ALIASSE.forEach(function (a) {
      if (!a.muster.test(t)) return;
      if (gefunden.indexOf(a.artikel) < 0) gefunden.push(a.artikel);
    });

    // 3) Artikelnummern
    K.produkte.forEach(function (p) {
      if (!p.nr) return;
      if (new RegExp('\\b' + p.nr + '\\b').test(t) && gefunden.indexOf(p.name) < 0) {
        gefunden.push(p.name);
      }
    });

    // safe.lock schlägt die Standardvariante: Wer „safe.lock" sagt, meint nicht
    // beide Zentralen gleichzeitig.
    if (gefunden.indexOf('WiPro III safe.lock') >= 0) {
      gefunden = gefunden.filter(function (n) { return n !== 'WiPro III'; });
    }
    return gefunden;
  }

  /* ─── LED / Blinkcode ───────────────────────────────────────────────── */
  function blinkcode(text) {
    var t = String(text || '');
    var muster = [
      /\b\d+\s*[x×]\s*(?:kurz|lang)?\s*(?:rot|gruen|grün|gelb|orange|blau)[a-zäöü]*\s*(?:blink\w*|auf\w*|piep\w*)?/i,
      /(?:led|lampe|leuchte)\s+(?:blinkt|leuchtet|zeigt)\s+[^.,;]{3,40}/i,
      /\b\d+\s*[x×]\s*piep\w*/i,
    ];
    for (var i = 0; i < muster.length; i++) {
      var m = t.match(muster[i]);
      if (m) return m[0].trim();
    }
    return null;
  }

  /* ─── Softwarestand ─────────────────────────────────────────────────── */
  function software(text) {
    var m = String(text || '').match(/\b(?:sw|software|version|stand)\W{0,12}(\d{1,2}\.\d{1,2}(?:\.\d{1,2})?)\b/i);
    return m ? m[1] : null;
  }

  /* ─── Gesamtauswertung ──────────────────────────────────────────────── */
  window.THI_ERKENNUNG = {
    auswerten: function (text) {
      var jahr = baujahr(text);
      var fz = fahrzeug(text, jahr);
      return {
        seriennummer: seriennummer(text),
        baujahr: jahr,
        fahrzeug: fz,
        produkte: produkte(text),
        led: blinkcode(text),
        software: software(text),
      };
    },
  };
})();
