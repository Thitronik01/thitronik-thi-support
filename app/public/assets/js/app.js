/* ==========================================================================
   THITRONIK Thi Support — Oberflächenlogik.
   --------------------------------------------------------------------------
   Kein Framework, keine Abhängigkeiten. Bewusst einfach gehalten, damit die
   App ohne Build-Schritt deploybar bleibt.
   ========================================================================== */
(function () {
  'use strict';

  var K = window.THI_KATALOGE || { fahrzeuge: [], produkte: [], praefixe: [] };
  var TEXTE = window.THI_TEXTE || {};
  var sprache = 'de';
  var T = TEXTE.de;

  var zustand = {
    fahrzeug: null,
    produkte: [],          // [{name, nr, slug, gruppe}]
    verlauf: [],           // [{rolle:'nutzer'|'thi', text}]
    laeuft: false,
    zugangswort: '',
    fallGesendet: false,
  };

  var $ = function (id) { return document.getElementById(id); };
  var el = function (tag, klasse, text) {
    var n = document.createElement(tag);
    if (klasse) n.className = klasse;
    if (text != null) n.textContent = text;
    return n;
  };

  // Enter in einem einzeiligen Feld muss das Formular abschicken. Das
  // "implicit submission" des Browsers ist hier nicht verlässlich (in
  // eingebetteten/sandboxed Kontexten kommt das keydown an, ohne dass ein
  // submit-Event folgt — live nachgewiesen). Deshalb explizit auslösen.
  // requestSubmit() statt submit(): Es durchläuft die HTML-Validierung und
  // feuert das submit-Event, auf dem die ganze Logik hängt.
  function enterSendetAb(feld, formular) {
    if (!feld || !formular) return;
    feld.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' || e.shiftKey || e.isComposing) return;
      e.preventDefault();
      if (typeof formular.requestSubmit === 'function') formular.requestSubmit();
      else formular.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
  }

  /* ─── Mitschrift auswerten ──────────────────────────────────────────── */
  // Erkanntes wird VORGESCHLAGEN, nie still übernommen. Eine falsch erkannte
  // Seriennummer, die niemand bemerkt, wäre schlimmer als gar keine Erkennung.
  var erkennungTimer = null;

  function erkennungAnwenden() {
    var box = $('erkannt');
    var text = $('beobachtet').value;
    if (!window.THI_ERKENNUNG || text.trim().length < 12) { box.hidden = true; return; }

    var e = window.THI_ERKENNUNG.auswerten(text);
    var vorschlaege = [];

    if (e.fahrzeug && (!zustand.fahrzeug || zustand.fahrzeug.slug !== e.fahrzeug.fahrzeug.slug)) {
      vorschlaege.push({
        art: 'fahrzeug',
        text: fahrzeugTitel(e.fahrzeug.fahrzeug),
        zusatz: e.fahrzeug.mehrdeutig ? T.erkMehrdeutig : '',
        anwenden: function () { fahrzeugWaehlen(e.fahrzeug.fahrzeug); },
      });
    }
    if (e.baujahr && String(e.baujahr) !== $('baujahr').value) {
      vorschlaege.push({
        art: 'baujahr', text: T.fBaujahr + ' ' + e.baujahr,
        anwenden: function () { $('baujahr').value = e.baujahr; ampelnAktualisieren(); widersprueche(); },
      });
    }
    e.produkte.forEach(function (name) {
      if (zustand.produkte.some(function (p) { return p.name === name; })) return;
      var katalog = K.produkte.filter(function (p) { return p.name === name; })[0];
      if (!katalog) return;
      vorschlaege.push({
        art: 'produkt', text: name,
        anwenden: function () {
          zustand.produkte.push(katalog);
          chipsRendern(); produkteRendern($('produktSuche').value);
          ampelnAktualisieren(); widersprueche();
        },
      });
    });
    if (e.seriennummer && e.seriennummer.wert !== $('seriennummer').value.trim()) {
      vorschlaege.push({
        art: 'sn', text: T.fSeriennummer + ' ' + e.seriennummer.wert,
        zusatz: e.seriennummer.bekannt ? '' : T.erkSnUnbekannt,
        anwenden: function () {
          $('seriennummer').value = e.seriennummer.wert;
          seriennummerPruefen(); ampelnAktualisieren(); widersprueche();
        },
      });
    }
    if (e.software && e.software !== $('softwarestand').value.trim()) {
      vorschlaege.push({
        art: 'sw', text: T.fSoftware + ' ' + e.software,
        anwenden: function () { $('softwarestand').value = e.software; ampelnAktualisieren(); },
      });
    }
    if (e.led && !$('led').value.trim()) {
      vorschlaege.push({
        art: 'led', text: T.fLed + ': ' + e.led,
        anwenden: function () { $('led').value = e.led; ampelnAktualisieren(); },
      });
    }

    box.innerHTML = '';
    if (!vorschlaege.length) { box.hidden = true; return; }

    var kopf = el('div', 'erkannt-kopf');
    kopf.appendChild(el('span', null, T.erkTitel));
    var alle = el('button', 'erkannt-alle', T.erkAlle);
    alle.type = 'button';
    alle.addEventListener('click', function () {
      vorschlaege.forEach(function (v) { v.anwenden(); });
      erkennungAnwenden();
    });
    kopf.appendChild(alle);
    box.appendChild(kopf);

    var liste = el('div', 'erkannt-liste');
    vorschlaege.forEach(function (v) {
      var chip = el('button', 'erkannt-chip');
      chip.type = 'button';
      chip.setAttribute('data-art', v.art);
      chip.appendChild(el('span', 'erkannt-text', v.text));
      if (v.zusatz) chip.appendChild(el('span', 'erkannt-zusatz', v.zusatz));
      chip.addEventListener('click', function () { v.anwenden(); erkennungAnwenden(); });
      liste.appendChild(chip);
    });
    box.appendChild(liste);
    box.hidden = false;
  }

  /* ─── Diktat ────────────────────────────────────────────────────────── */
  // Web Speech API — am Telefon tippt es sich schlecht mit. Nur einblenden,
  // wo der Browser sie wirklich kann; sonst bleibt das Textfeld wie es ist.
  var erkenner = null;
  var diktatLaeuft = false;

  function diktatEinrichten() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return; // Knopf bleibt versteckt
    var btn = $('diktat');
    btn.hidden = false;

    btn.addEventListener('click', function () {
      if (diktatLaeuft) { if (erkenner) erkenner.stop(); return; }

      erkenner = new SR();
      erkenner.lang = sprache === 'fr' ? 'fr-FR' : 'de-DE';
      erkenner.continuous = true;
      erkenner.interimResults = false;

      var feld = $('beobachtet');
      erkenner.onresult = function (ereignis) {
        var neu = '';
        for (var i = ereignis.resultIndex; i < ereignis.results.length; i++) {
          if (ereignis.results[i].isFinal) neu += ereignis.results[i][0].transcript;
        }
        if (!neu) return;
        feld.value = (feld.value ? feld.value.replace(/\s*$/, ' ') : '') + neu.trim();
        feld.dispatchEvent(new Event('input', { bubbles: true }));
      };
      erkenner.onend = function () {
        diktatLaeuft = false;
        btn.classList.remove('ist-aktiv');
        btn.querySelector('span:last-child').textContent = T.diktatStart;
      };
      erkenner.onerror = erkenner.onend;

      try {
        erkenner.start();
        diktatLaeuft = true;
        btn.classList.add('ist-aktiv');
        btn.querySelector('span:last-child').textContent = T.diktatStop;
      } catch (e) { /* bereits aktiv */ }
    });
  }

  /* ─── Fallverlauf ───────────────────────────────────────────────────── */
  // Bewusst nur lokal (localStorage) und ohne Kontaktdaten: Der Verlauf soll
  // beim Rückruf Tipparbeit sparen, nicht eine Kundendatei anlegen.
  var VERLAUF_KEY = 'thi_verlauf';
  var VERLAUF_MAX = 12;

  function verlaufLesen() {
    try { return JSON.parse(localStorage.getItem(VERLAUF_KEY) || '[]'); } catch (e) { return []; }
  }

  function verlaufSpeichern(antwortText, sicherheit) {
    var d = nutzdaten('');
    var eintrag = {
      zeit: Date.now(),
      sprache: sprache,
      fahrzeug: d.fahrzeug,
      baujahr: d.baujahr,
      aufbauart: d.aufbauart,
      aufbauhersteller: d.aufbauhersteller,
      startknopf: d.startknopf,
      produkte: d.produkte,
      produktSlugs: d.produktSlugs,
      seriennummer: d.seriennummer,
      softwarestand: d.softwarestand,
      einbau: d.einbau,
      fehlerbild: d.fehlerbild,
      sicherheit: sicherheit ? sicherheit.wert : null,
      antwortKurz: String(antwortText || '').replace(/\s+/g, ' ').slice(0, 180),
    };
    var liste = verlaufLesen();
    liste.unshift(eintrag);
    try { localStorage.setItem(VERLAUF_KEY, JSON.stringify(liste.slice(0, VERLAUF_MAX))); } catch (e) { /* voll */ }
  }

  function verlaufLaden(eintrag) {
    $('fallFormular').reset();
    zustand.produkte = [];
    zustand.fahrzeug = null;
    zustand.verlauf = [];

    if (eintrag.fahrzeug && eintrag.fahrzeug.slug) {
      var f = K.fahrzeuge.filter(function (x) { return x.slug === eintrag.fahrzeug.slug; })[0];
      if (f) fahrzeugWaehlen(f);
    }
    (eintrag.produkte || []).forEach(function (name) {
      var p = K.produkte.filter(function (x) { return x.name === name; })[0];
      if (p) zustand.produkte.push(p);
    });

    $('baujahr').value = eintrag.baujahr || '';
    $('aufbauart').value = eintrag.aufbauart || '';
    $('aufbauhersteller').value = eintrag.aufbauhersteller || '';
    $('startknopf').value = eintrag.startknopf || '';
    $('seriennummer').value = eintrag.seriennummer || '';
    $('softwarestand').value = eintrag.softwarestand || '';
    $('einbau').value = eintrag.einbau || '';

    var f = eintrag.fehlerbild || {};
    $('beobachtet').value = f.beobachtet || '';
    $('erwartet').value = f.erwartet || '';
    $('led').value = f.led || '';
    $('meldung').value = f.meldung || '';
    $('ausloeser').value = f.ausloeser || '';
    $('reproduzierbar').value = f.reproduzierbar || '';
    $('bisher').value = f.bisher || '';

    chipsRendern();
    produkteRendern('');
    seriennummerPruefen();
    ampelnAktualisieren();
    widersprueche();
    erkennungAnwenden();
    $('chatVerlauf').innerHTML = '';
    $('nachfrageFormular').hidden = true;
    $('verlaufOverlay').hidden = true;
    ansichtZeigen('fall');
  }

  function verlaufRendern() {
    var liste = verlaufLesen();
    var box = $('verlaufListe');
    box.innerHTML = '';

    if (!liste.length) {
      box.appendChild(el('p', 'verlauf-leer', T.verlaufLeer));
      return;
    }

    liste.forEach(function (eintrag, i) {
      var karte = el('button', 'verlauf-eintrag');
      karte.type = 'button';

      var kopf = el('div', 'verlauf-zeile');
      kopf.appendChild(el('span', 'verlauf-titel',
        eintrag.fahrzeug ? eintrag.fahrzeug.titel : (eintrag.produkte || []).join(', ') || T.verlaufOhneTitel));
      if (eintrag.sicherheit != null) {
        kopf.appendChild(el('span', 'verlauf-wert', eintrag.sicherheit + ' %'));
      }
      karte.appendChild(kopf);

      var meta = [];
      if ((eintrag.produkte || []).length) meta.push(eintrag.produkte.join(', '));
      if (eintrag.seriennummer) meta.push(eintrag.seriennummer);
      if (meta.length) karte.appendChild(el('span', 'verlauf-meta', meta.join('  ·  ')));

      if (eintrag.fehlerbild && eintrag.fehlerbild.beobachtet) {
        karte.appendChild(el('span', 'verlauf-text', eintrag.fehlerbild.beobachtet.slice(0, 130)));
      }

      karte.appendChild(el('span', 'verlauf-zeit',
        new Date(eintrag.zeit).toLocaleString(sprache === 'fr' ? 'fr-FR' : 'de-DE')));

      karte.addEventListener('click', function () { verlaufLaden(eintrag); });
      box.appendChild(karte);
    });

    var leeren = el('button', 'verlauf-leeren', T.verlaufLeeren);
    leeren.type = 'button';
    leeren.addEventListener('click', function () {
      try { localStorage.removeItem(VERLAUF_KEY); } catch (e) { /* egal */ }
      verlaufRendern();
    });
    box.appendChild(leeren);
  }

  /* ─── Hell / Dunkel ─────────────────────────────────────────────────── */
  function themaSetzen(thema) {
    if (thema === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    $('verlaufOeffnen').addEventListener('click', function () {
    verlaufRendern();
    $('verlaufOverlay').hidden = false;
  });
  $('verlaufSchliessen').addEventListener('click', function () { $('verlaufOverlay').hidden = true; });
  $('verlaufOverlay').addEventListener('click', function (e) {
    if (e.target === $('verlaufOverlay')) $('verlaufOverlay').hidden = true;
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !$('verlaufOverlay').hidden) $('verlaufOverlay').hidden = true;
    if (e.key === 'Escape' && !$('korrekturenOverlay').hidden) $('korrekturenOverlay').hidden = true;
  });
  $('korrekturenOeffnen').addEventListener('click', function () {
    $('korrekturenOverlay').hidden = false;
    $('koName').value = nameLesen();
    korrekturenLaden();
  });
  $('korrekturenSchliessen').addEventListener('click', function () { $('korrekturenOverlay').hidden = true; });
  $('korrekturenOverlay').addEventListener('click', function (e) {
    if (e.target === $('korrekturenOverlay')) $('korrekturenOverlay').hidden = true;
  });
  diktatEinrichten();

  document.querySelectorAll('[data-thema]').forEach(function (b) {
      var aktiv = b.getAttribute('data-thema') === thema;
      b.classList.toggle('ist-aktiv', aktiv);
      b.setAttribute('aria-pressed', aktiv ? 'true' : 'false');
    });
    try { localStorage.setItem('thi_thema', thema); } catch (e) { /* egal */ }
  }

  function themaLesen() {
    try { return localStorage.getItem('thi_thema') || 'light'; } catch (e) { return 'light'; }
  }

  /* ─── Ansichtswechsel ───────────────────────────────────────────────── */
  // Die Fallaufnahme bekommt die volle Breite, die Antwort eine lesbare
  // Spalte. Statt beides nebeneinander zu quetschen, wird umgeschaltet.
  function ansichtZeigen(welche) {
    var fall = welche === 'fall';
    $('ansichtFall').hidden = !fall;
    $('ansichtAntwort').hidden = fall;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  /* ─── Sprache ───────────────────────────────────────────────────────── */
  function spracheSetzen(neu) {
    sprache = (neu === 'fr') ? 'fr' : 'de';
    T = TEXTE[sprache];
    document.documentElement.lang = sprache;

    document.querySelectorAll('[data-i18n]').forEach(function (n) {
      var wert = T[n.getAttribute('data-i18n')];
      if (wert != null) n.textContent = wert;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (n) {
      var wert = T[n.getAttribute('data-i18n-ph')];
      if (wert != null) n.setAttribute('placeholder', wert);
    });

    document.querySelectorAll('.sprach-btn').forEach(function (b) {
      var aktiv = b.getAttribute('data-sprache') === sprache;
      b.classList.toggle('ist-aktiv', aktiv);
      b.setAttribute('aria-pressed', aktiv ? 'true' : 'false');
    });

    if (zustand.fahrzeug) fahrzeugAnzeigen(zustand.fahrzeug);
    produkteRendern($('produktSuche').value);
    chipsRendern();
    seriennummerPruefen();
    widersprueche();
    try { localStorage.setItem('thi_sprache', sprache); } catch (e) { /* egal */ }
  }

  function fahrzeugTitel(f) {
    if (!f) return '';
    if (f.fallback) return T.nichtGelistet;
    return (sprache === 'fr' && f.fr) ? f.fr : f.de;
  }

  /* ─── Zugang ────────────────────────────────────────────────────────── */
  function zugangPruefen() {
    var gespeichert = '';
    try { gespeichert = localStorage.getItem('thi_zugang') || ''; } catch (e) { /* egal */ }
    zustand.zugangswort = gespeichert;

    fetch('/api/health').then(function (r) { return r.json(); }).then(function (d) {
      if (d && d.konfiguration && d.konfiguration.zugangswortAktiv && !gespeichert) {
        $('zugangOverlay').hidden = false;
        $('zugangWort').focus();
      }
    }).catch(function () { /* Health optional */ });
  }

  $('zugangForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var wort = $('zugangWort').value.trim();
    if (!wort) return;
    zustand.zugangswort = wort;
    try { localStorage.setItem('thi_zugang', wort); } catch (e2) { /* egal */ }
    $('zugangOverlay').hidden = true;
  });

  /* ─── Fahrzeug-Autocomplete ─────────────────────────────────────────── */
  var fzSuche = $('fahrzeugSuche');
  var fzListe = $('fahrzeugListe');
  var fzIndex = -1;

  function fahrzeugeFiltern(text) {
    var q = text.trim().toLowerCase();
    if (!q) return K.fahrzeuge.slice(0, 8);
    return K.fahrzeuge.filter(function (f) {
      // Über ALLE Badge-Varianten suchbar: ein Artikel deckt mehrere Marken ab
      // (Ducato = Jumper = Boxer = Movano) — docs/03_FALLAUFNAHME_SCHEMA.md §A1.
      var heu = [f.de, f.fr, (f.hersteller || []).join(' '), (f.varianten || []).join(' ')]
        .join(' ').toLowerCase();
      return q.split(/\s+/).every(function (teil) { return heu.indexOf(teil) >= 0; });
    }).slice(0, 12);
  }

  function zeitraum(f) {
    if (f.fallback) return '—';
    var von = f.von != null ? f.von : '…';
    var bis = f.offen ? T.bisHeute : (f.bis != null ? f.bis : '…');
    return von + '–' + bis;
  }

  function fzListeZeigen(treffer) {
    fzListe.innerHTML = '';
    fzIndex = -1;
    if (!treffer.length) {
      var leer = el('li', 'ac-leer', sprache === 'fr' ? 'Aucun résultat' : 'Keine Treffer');
      leer.setAttribute('role', 'presentation');
      fzListe.appendChild(leer);
    } else {
      treffer.forEach(function (f, i) {
        var li = el('li');
        li.setAttribute('role', 'option');
        li.setAttribute('data-i', String(i));
        li.appendChild(el('span', 'ac-titel', fahrzeugTitel(f)));
        li.appendChild(el('span', 'ac-meta',
          (f.hersteller || []).join(' · ') + (f.fallback ? '' : '  ·  ' + zeitraum(f))));
        li.addEventListener('mousedown', function (ev) {
          ev.preventDefault();
          fahrzeugWaehlen(f);
        });
        fzListe.appendChild(li);
      });
    }
    fzListe.hidden = false;
    fzSuche.setAttribute('aria-expanded', 'true');
  }

  function fzListeSchliessen() {
    fzListe.hidden = true;
    fzSuche.setAttribute('aria-expanded', 'false');
    fzIndex = -1;
  }

  function fahrzeugAnzeigen(f) {
    var box = $('fahrzeugGewaehlt');
    box.innerHTML = '';
    var text = el('div', 'gewaehlt-text');
    text.appendChild(el('span', 'gewaehlt-titel', fahrzeugTitel(f)));
    text.appendChild(el('span', 'gewaehlt-meta',
      (f.hersteller || []).join(' · ') + (f.fallback ? '' : '  ·  ' + zeitraum(f))));
    var weg = el('button', 'gewaehlt-weg', '×');
    weg.type = 'button';
    weg.setAttribute('aria-label', sprache === 'fr' ? 'Retirer' : 'Entfernen');
    weg.addEventListener('click', function () {
      zustand.fahrzeug = null;
      box.hidden = true;
      fzSuche.value = '';
      ampelnAktualisieren();
      widersprueche();
    });
    box.appendChild(text);
    box.appendChild(weg);
    box.hidden = false;
  }

  function fahrzeugWaehlen(f) {
    zustand.fahrzeug = f;
    fzSuche.value = '';
    fzListeSchliessen();
    fahrzeugAnzeigen(f);
    ampelnAktualisieren();
    widersprueche();
  }

  fzSuche.addEventListener('input', function () { fzListeZeigen(fahrzeugeFiltern(fzSuche.value)); });
  fzSuche.addEventListener('focus', function () { fzListeZeigen(fahrzeugeFiltern(fzSuche.value)); });
  fzSuche.addEventListener('blur', function () { setTimeout(fzListeSchliessen, 120); });
  fzSuche.addEventListener('keydown', function (e) {
    var punkte = fzListe.querySelectorAll('li[role="option"]');
    if (!punkte.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      fzIndex += (e.key === 'ArrowDown' ? 1 : -1);
      if (fzIndex < 0) fzIndex = punkte.length - 1;
      if (fzIndex >= punkte.length) fzIndex = 0;
      punkte.forEach(function (p, i) { p.classList.toggle('ist-aktiv', i === fzIndex); });
      punkte[fzIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && fzIndex >= 0) {
      e.preventDefault();
      fahrzeugWaehlen(fahrzeugeFiltern(fzSuche.value)[fzIndex]);
    } else if (e.key === 'Escape') {
      fzListeSchliessen();
    }
  });

  /* ─── Produkte ──────────────────────────────────────────────────────── */
  // Die Liste öffnet und schließt wie die Fahrzeug-Autovervollständigung.
  // Sie ist absolut positioniert, verdrängt also keinen Platz mehr — vorher
  // stand sie dauerhaft offen und kostete 232 px, auch ungenutzt.
  function produktListeOeffnen() {
    var b = $('produktAuswahl');
    if (!b.children.length) return;          // nichts zu zeigen, nicht öffnen
    b.hidden = false;
    $('produktSuche').setAttribute('aria-expanded', 'true');
  }

  function produktListeSchliessen() {
    $('produktAuswahl').hidden = true;
    $('produktSuche').setAttribute('aria-expanded', 'false');
  }

  function produkteRendern(filter) {
    var behälter = $('produktAuswahl');
    behälter.innerHTML = '';
    var q = (filter || '').trim().toLowerCase();
    var gefiltert = K.produkte.filter(function (p) {
      if (!q) return true;
      return (p.name + ' ' + (p.nr || '') + ' ' + p.gruppe).toLowerCase().indexOf(q) >= 0;
    });

    var letzteGruppe = null;
    gefiltert.forEach(function (p) {
      if (p.gruppe !== letzteGruppe) {
        behälter.appendChild(el('div', 'produkt-gruppe', p.gruppe));
        letzteGruppe = p.gruppe;
      }
      var zeile = el('label', 'produkt-zeile');
      var box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = zustand.produkte.some(function (x) { return x.name === p.name; });
      box.addEventListener('change', function () {
        if (box.checked) {
          if (!zustand.produkte.some(function (x) { return x.name === p.name; })) zustand.produkte.push(p);
        } else {
          zustand.produkte = zustand.produkte.filter(function (x) { return x.name !== p.name; });
        }
        chipsRendern();
        ampelnAktualisieren();
        widersprueche();
      });
      zeile.appendChild(box);
      zeile.appendChild(el('span', 'produkt-name', p.name));
      if (p.nr) zeile.appendChild(el('span', 'produkt-nr', p.nr));
      behälter.appendChild(zeile);
    });

    if (!gefiltert.length) {
      behälter.appendChild(el('div', 'ac-leer', sprache === 'fr' ? 'Aucun produit' : 'Kein Produkt gefunden'));
    }
  }

  function chipsRendern() {
    var behälter = $('produktChips');
    behälter.innerHTML = '';
    zustand.produkte.forEach(function (p) {
      var chip = el('span', 'chip');
      chip.appendChild(document.createTextNode(p.name));
      var weg = el('button', null, '×');
      weg.type = 'button';
      weg.setAttribute('aria-label', (sprache === 'fr' ? 'Retirer ' : 'Entfernen ') + p.name);
      weg.addEventListener('click', function () {
        zustand.produkte = zustand.produkte.filter(function (x) { return x.name !== p.name; });
        chipsRendern();
        produkteRendern($('produktSuche').value);
        ampelnAktualisieren();
        widersprueche();
      });
      chip.appendChild(weg);
      behälter.appendChild(chip);
    });
  }

  $('produktSuche').addEventListener('input', function (e) {
    produkteRendern(e.target.value);
    produktListeOeffnen();
  });
  // Anklicken zeigt den ganzen Katalog — die Liste bleibt durchstöberbar,
  // sie liegt nur nicht mehr dauerhaft offen herum.
  $('produktSuche').addEventListener('focus', function (e) {
    produkteRendern(e.target.value);
    produktListeOeffnen();
  });
  // Verzögert schließen, sonst verschluckt der Blur den Klick aufs Kästchen.
  $('produktSuche').addEventListener('blur', function () { setTimeout(produktListeSchliessen, 160); });
  $('produktSuche').addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { produktListeSchliessen(); e.stopPropagation(); }
  });

  /* ─── Seriennummer ──────────────────────────────────────────────────── */
  function snLesen(roh) {
    var t = String(roh || '').trim();
    if (!t) return null;
    var m = t.match(/^(\d{4})\s*[-.\s/]?\s*(\d{1,4})?$/);
    if (!m) return { roh: t, praefix: null, bekannt: false };
    var eintrag = null;
    for (var i = 0; i < K.praefixe.length; i++) {
      if (K.praefixe[i].p === m[1]) { eintrag = K.praefixe[i]; break; }
    }
    var stand = m[2] ? parseInt(m[2], 10) : null;
    var schwelle = eintrag && eintrag.schwelle ? parseInt(String(eintrag.schwelle).split('-')[1], 10) : null;
    return {
      roh: t, praefix: m[1], stand: stand, bekannt: !!eintrag,
      produkt: eintrag ? eintrag.produkt : null,
      variante: eintrag ? eintrag.variante : null,
      fahrzeug: eintrag ? eintrag.fahrzeug : null,
      schwelle: schwelle,
      ueber: (schwelle != null && stand != null) ? (stand >= schwelle) : null,
    };
  }

  function seriennummerPruefen() {
    var box = $('snErkennung');
    var sn = snLesen($('seriennummer').value);
    if (!sn || !sn.praefix) { box.hidden = true; return; }

    box.innerHTML = '';
    if (sn.bekannt) {
      box.setAttribute('data-status', 'ok');
      var zeile = el('div');
      zeile.appendChild(el('span', 'sn-marke', T.snErkannt + ' '));
      zeile.appendChild(document.createTextNode(
        sn.produkt + (sn.variante ? ' (' + sn.variante + ')' : '')));
      if (sn.ueber === true) {
        zeile.appendChild(document.createTextNode(' — ' + T.snSchwelleUeber));
      } else if (sn.ueber === false) {
        zeile.appendChild(document.createTextNode(' — ' + T.snSchwelleUnter));
      }
      box.appendChild(zeile);
    } else {
      box.setAttribute('data-status', 'unbekannt');
      box.appendChild(el('div', null, T.snUnbekannt));
    }
    box.hidden = false;
  }

  $('seriennummer').addEventListener('input', function () {
    seriennummerPruefen();
    widersprueche();
    // Die Seriennummer hat einen eigenen Handler und war deshalb aus der
    // Sammelregistrierung ausgenommen — ohne diesen Aufruf blieb die
    // Belastbarkeitsanzeige bei ihrer Eingabe stehen.
    ampelnAktualisieren();
  });

  /* ─── Widerspruchsprüfung (Sofort-Feedback) ─────────────────────────── */
  function widersprueche() {
    var box = $('warnungen');
    box.innerHTML = '';
    var liste = [];
    var sn = snLesen($('seriennummer').value);
    var fz = zustand.fahrzeug;

    // SN-Präfix ↔ Produktauswahl
    if (sn && sn.bekannt && zustand.produkte.length) {
      var passt = zustand.produkte.some(function (p) {
        var a = p.name.toLowerCase(), b = String(sn.produkt).toLowerCase();
        return a.indexOf(b) >= 0 || b.indexOf(a) >= 0
          || (a.indexOf('wipro') >= 0 && b.indexOf('wipro') >= 0)
          || (a.indexOf('pro-finder') >= 0 && b.indexOf('pro-finder') >= 0);
      });
      if (!passt) {
        liste.push({ schwere: 'warnung', text: sprache === 'fr'
          ? 'Le préfixe ' + sn.praefix + ' correspond à « ' + sn.produkt + ' » — cela ne concorde pas avec les produits sélectionnés.'
          : 'Das Präfix ' + sn.praefix + ' gehört zu „' + sn.produkt + '" — das passt nicht zur Produktauswahl.' });
      }
      var waehlteSafelock = zustand.produkte.some(function (p) { return /safe\.?lock/i.test(p.name); });
      var istSafelock = /safe\.?lock/i.test(sn.produkt || '');
      if (istSafelock !== waehlteSafelock) {
        liste.push({ schwere: 'warnung', text: sprache === 'fr'
          ? 'Variante incohérente : le préfixe ' + sn.praefix + ' indique ' + (istSafelock ? 'safe.lock' : 'la version standard') + '. Les variantes diffèrent fonctionnellement.'
          : 'Variante widersprüchlich: Präfix ' + sn.praefix + ' steht für ' + (istSafelock ? 'safe.lock' : 'die Standardvariante') + '. Die Varianten unterscheiden sich funktional.' });
      }
    }

    // SN-Präfix ↔ Fahrzeug (der wertvollste Check)
    if (sn && sn.bekannt && sn.fahrzeug && fz && !fz.fallback) {
      var muster = {
        ford: /ford|transit|tourneo/i,
        'sprinter-crafter-tge': /sprinter|crafter|tge/i,
        'renault-master': /renault|master/i,
        'fiat-sevel': /fiat|ducato|jumper|boxer|movano/i,
      }[sn.fahrzeug];
      if (muster && !muster.test(fz.de)) {
        liste.push({ schwere: 'warnung', text: sprache === 'fr'
          ? 'La série ' + sn.praefix + ' est documentée comme ' + sn.variante + ' — cela ne correspond pas au véhicule choisi.'
          : 'Die Reihe ' + sn.praefix + ' ist als ' + sn.variante + ' dokumentiert — das passt nicht zum gewählten Fahrzeug.' });
      }
    }

    // Baujahr ↔ Fahrzeugartikel
    var bj = parseInt($('baujahr').value, 10);
    if (fz && !fz.fallback && !isNaN(bj)) {
      var zuFrueh = (fz.von != null && bj < fz.von);
      var zuSpaet = (fz.bis != null && !fz.offen && bj > fz.bis);
      if (zuFrueh || zuSpaet) {
        liste.push({ schwere: 'warnung', text: sprache === 'fr'
          ? 'L\'année ' + bj + ' est hors de la période documentée (' + zeitraum(fz) + '). Un changement de génération implique d\'autres schémas et positions DIP.'
          : 'Baujahr ' + bj + ' liegt außerhalb des dokumentierten Zeitraums (' + zeitraum(fz) + '). Ein Generationswechsel bedeutet andere Anschlusspläne und DIP-Stellungen.' });
      }
    }

    liste.forEach(function (w) {
      var n = el('div', 'warnung');
      n.setAttribute('data-schwere', w.schwere);
      n.appendChild(el('span', 'warnung-glyph', '⚠'));
      n.appendChild(el('span', null, w.text));
      box.appendChild(n);
    });
  }

  /* ─── Ampeln ────────────────────────────────────────────────────────── */
  function ampelSetzen(block, zustandName) {
    var n = document.querySelector('.block[data-block="' + block + '"] .block-ampel');
    if (n) n.setAttribute('data-ampel', zustandName);
  }

  // Spiegelt die Gewichtung aus netlify/functions/lib/sicherheit.mjs, damit die
  // Vorschau während der Aufnahme dieselbe Zahl zeigt wie später die Antwort.
  // Hier bewusst nur der Anteil DATENLAGE (max. 40 von 100) — die Quellenlage
  // kennt erst der Server. Die Vorschau skaliert ihn deshalb auf 100 % und
  // benennt, dass sie die Vollständigkeit der Aufnahme misst, nicht die Antwort.
  function datenlageBerechnen() {
    var punkte = 0;
    var offen = [];
    var erledigt = [];

    function pruefe(erfuellt, wert, text) {
      if (erfuellt) { punkte += wert; erledigt.push(text); }
      else offen.push(text);
    }

    pruefe($('beobachtet').value.trim().length >= 15, 10, T.svProblem);
    pruefe(zustand.produkte.length > 0, 10, T.svProdukt);
    pruefe(!!(zustand.fahrzeug && !zustand.fahrzeug.fallback), 8, T.svFahrzeug);

    var sn = snLesen($('seriennummer').value);
    if (sn && sn.bekannt) { punkte += 7; erledigt.push(T.svSeriennummer); }
    else if (sn && sn.praefix) { punkte += 2; offen.push(T.svSeriennummer); }
    else offen.push(T.svSeriennummer);

    pruefe(!!($('led').value.trim() || $('meldung').value.trim()), 5, T.svLed);

    return { prozent: Math.round((Math.min(40, punkte) / 40) * 100), offen: offen, erledigt: erledigt };
  }

  function vorschauAktualisieren() {
    var d = datenlageBerechnen();
    var box = $('sicherheitVorschau');
    box.setAttribute('data-stufe', d.prozent >= 75 ? 'hoch' : (d.prozent >= 45 ? 'mittel' : 'gering'));
    $('svWert').firstChild.nodeValue = String(d.prozent);
    $('svFuellung').style.width = d.prozent + '%';

    var liste = $('svListe');
    liste.innerHTML = '';
    // Offene Punkte zuerst — sie sind die Handlungsaufforderung.
    d.offen.slice(0, 4).forEach(function (t) { liste.appendChild(el('li', null, t)); });
    d.erledigt.slice(0, 2).forEach(function (t) {
      var li = el('li', 'ist-erfuellt', t);
      liste.appendChild(li);
    });
  }

  function ampelnAktualisieren() {
    var beob = $('beobachtet').value.trim();
    ampelSetzen('anliegen', (beob.length >= 15 && $('reproduzierbar').value) ? 'voll'
      : (beob ? 'teil' : 'leer'));

    var prVoll = zustand.produkte.length > 0;
    var snDa = !!$('seriennummer').value.trim();
    ampelSetzen('produkt', (prVoll && snDa) ? 'voll' : (prVoll || snDa ? 'teil' : 'leer'));

    var fzVoll = !!zustand.fahrzeug;
    ampelSetzen('fahrzeug', (fzVoll && $('baujahr').value) ? 'voll'
      : (fzVoll || $('baujahr').value ? 'teil' : 'leer'));

    var led = !!($('led').value.trim() || $('meldung').value.trim());
    ampelSetzen('beobachtung', (led && $('bisher').value.trim()) ? 'voll' : (led ? 'teil' : 'leer'));

    vorschauAktualisieren();
  }

  $('beobachtet').addEventListener('input', function () {
    // Entprellt: die Auswertung soll beim Tippen nicht bei jedem Zeichen laufen.
    clearTimeout(erkennungTimer);
    erkennungTimer = setTimeout(erkennungAnwenden, 350);
  });

  ['baujahr', 'aufbauart', 'aufbauhersteller', 'startknopf', 'softwarestand', 'einbau',
    'beobachtet', 'erwartet', 'led', 'meldung', 'ausloeser', 'reproduzierbar', 'bisher']
    .forEach(function (id) {
      var n = $(id);
      if (n) n.addEventListener('input', function () { ampelnAktualisieren(); widersprueche(); });
      if (n && n.tagName === 'SELECT') n.addEventListener('change', ampelnAktualisieren);
    });

  /* ─── Markdown (minimal und sicher) ─────────────────────────────────── */
  // Bewusst KEIN innerHTML mit Modelltext: Es werden ausschließlich Textknoten
  // und bekannte Elemente erzeugt. Kein Weg für eingeschleustes Markup.
  function inlineRendern(ziel, text) {
    // **fett**, *kursiv*, `code`
    var muster = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;
    var pos = 0, treffer;
    while ((treffer = muster.exec(text)) !== null) {
      if (treffer.index > pos) ziel.appendChild(document.createTextNode(text.slice(pos, treffer.index)));
      var stueck = treffer[0];
      if (stueck.indexOf('**') === 0) ziel.appendChild(el('strong', null, stueck.slice(2, -2)));
      else if (stueck.charAt(0) === '`') ziel.appendChild(el('code', null, stueck.slice(1, -1)));
      else ziel.appendChild(el('em', null, stueck.slice(1, -1)));
      pos = treffer.index + stueck.length;
    }
    if (pos < text.length) ziel.appendChild(document.createTextNode(text.slice(pos)));
  }

  function markdownRendern(behälter, quelltext) {
    behälter.innerHTML = '';
    var zeilen = String(quelltext || '').split('\n');
    var liste = null, listenTyp = null;
    var tabelle = null, tabelleKopfOffen = false;

    function listeSchliessen() { liste = null; listenTyp = null; }
    function tabelleSchliessen() { tabelle = null; tabelleKopfOffen = false; }

    zeilen.forEach(function (zeile) {
      var eingerueckt = /^\s{2,}\S/.test(zeile);
      var t = zeile.trim();

      if (!t) { listeSchliessen(); tabelleSchliessen(); return; }

      // Eingerückte Fortsetzungszeile gehört zum VORHERIGEN Listenpunkt.
      // Ohne das bricht die Liste ab und die Nummerierung beginnt erneut bei 1 —
      // bei einer Sicherheitsanweisung in Schritten ist das irreführend.
      if (eingerueckt && liste && liste.lastChild) {
        liste.lastChild.appendChild(document.createTextNode(' '));
        inlineRendern(liste.lastChild, t);
        return;
      }

      // H1 mitnehmen: Das Modell beginnt Analysen oft mit „# …". Ohne diesen
      // Fall stand die Raute sichtbar im Text.
      if (/^#{1,3}\s/.test(t)) {
        listeSchliessen();
        tabelleSchliessen();
        var h = el(t.startsWith('### ') ? 'h3' : 'h2');
        inlineRendern(h, t.replace(/^#{1,3}\s+/, ''));
        behälter.appendChild(h);
        return;
      }

      // Tabellen: Pin-Belegungen, DIP-Stellungen und Blinkcodes kommen als
      // Markdown-Tabelle. Als Rohtext („| 9 | blau/gelb | …") sind sie genau
      // dort unlesbar, wo Genauigkeit zählt.
      if (/^\|.*\|$/.test(t)) {
        listeSchliessen();
        var zellen = t.slice(1, -1).split('|').map(function (c) { return c.trim(); });
        // Trennzeile (|---|---|) überspringen, aber die Tabelle offen halten
        if (zellen.every(function (c) { return /^:?-{2,}:?$/.test(c); })) return;
        if (!tabelle) {
          tabelle = el('table', 'antwort-tabelle');
          tabelleKopfOffen = true;
          behälter.appendChild(tabelle);
        }
        var zeile = el('tr');
        zellen.forEach(function (c) {
          var z = el(tabelleKopfOffen ? 'th' : 'td');
          inlineRendern(z, c);
          zeile.appendChild(z);
        });
        tabelle.appendChild(zeile);
        tabelleKopfOffen = false;
        return;
      }
      tabelleSchliessen();
      if (/^(-{3,}|_{3,})$/.test(t)) { listeSchliessen(); behälter.appendChild(el('hr')); return; }

      var ul = t.match(/^[-*]\s+(.*)$/);
      var ol = t.match(/^(\d+)[.)]\s+(.*)$/);
      if (ul || ol) {
        var typ = ul ? 'ul' : 'ol';
        if (!liste || listenTyp !== typ) {
          liste = el(typ);
          listenTyp = typ;
          behälter.appendChild(liste);
        }
        var li = el('li');
        inlineRendern(li, ul ? ul[1] : ol[2]);
        liste.appendChild(li);
        return;
      }

      listeSchliessen();
      var p = el('p');
      inlineRendern(p, t);
      behälter.appendChild(p);
    });
  }

  /* ─── Nachrichten ───────────────────────────────────────────────────── */
  function nachrichtAnlegen(von, titel) {
    var n = el('div', 'nachricht');
    n.setAttribute('data-von', von);
    var kopf = el('div', 'nachricht-kopf');
    kopf.appendChild(el('span', 'nachricht-punkt'));
    kopf.appendChild(el('span', null, titel));
    n.appendChild(kopf);
    var körper = el('div', 'nachricht-körper');
    n.appendChild(körper);
    $('chatVerlauf').appendChild(n);
    scrollen();
    return { wurzel: n, körper: körper };
  }

  // Die Antwortansicht scrollt mit der Seite (kein eigener Scroll-Container
  // mehr), damit lange Antworten den ganzen Bildschirm nutzen können.
  function scrollen() {
    var letzte = $('chatVerlauf').lastElementChild;
    if (letzte) letzte.scrollIntoView({ block: 'end', behavior: 'auto' });
  }

  function fallNachrichtZeigen(daten) {
    var m = nachrichtAnlegen('nutzer', T.vonNutzer);
    var liste = el('div', 'fall-liste');
    function zeile(schluessel, wert) {
      if (!wert) return;
      var z = el('div', 'fall-zeile');
      z.appendChild(el('span', 'fall-schluessel', schluessel));
      z.appendChild(el('span', 'fall-wert', wert));
      liste.appendChild(z);
    }
    zeile(T.fFahrzeug, daten.fahrzeug ? daten.fahrzeug.titel : '');
    zeile(T.fBaujahr, daten.baujahr);
    zeile(T.fAufbau, [daten.aufbauart, daten.aufbauhersteller].filter(Boolean).join(' · '));
    zeile(T.fStartknopf, daten.startknopf);
    zeile(T.fProdukte, (daten.produkte || []).join(', '));
    zeile(T.fSeriennummer, daten.seriennummer);
    zeile(T.fSoftware, daten.softwarestand);
    zeile(T.fEinbau, daten.einbau);
    zeile(T.fBeobachtet, daten.fehlerbild.beobachtet);
    zeile(T.fErwartet, daten.fehlerbild.erwartet);
    zeile(T.fLed, daten.fehlerbild.led);
    zeile(T.fMeldung, daten.fehlerbild.meldung);
    zeile(T.fAusloeser, daten.fehlerbild.ausloeser);
    zeile(T.fRepro, daten.fehlerbild.reproduzierbar);
    zeile(T.fBisher, daten.fehlerbild.bisher);
    m.körper.appendChild(liste);
  }

  // Fall + Antwort als Klartext — der nächste Arbeitsschritt nach dem Telefonat
  // ist fast immer „ins Ticketsystem übertragen". Ohne Kopierfunktion tippt man
  // alles zweimal.
  function fallAlsKlartext(antwortText, s) {
    var d = nutzdaten('');
    var z = [];
    function feld(k, v) { if (v) z.push(k + ': ' + v); }

    z.push('THITRONIK — ' + T.fallTitel);
    z.push(new Date().toLocaleString(sprache === 'fr' ? 'fr-FR' : 'de-DE'));
    z.push('');
    feld(T.fFahrzeug, d.fahrzeug ? d.fahrzeug.titel : '');
    feld(T.fBaujahr, d.baujahr);
    feld(T.fAufbau, [d.aufbauart, d.aufbauhersteller].filter(Boolean).join(' · '));
    feld(T.fStartknopf, d.startknopf);
    feld(T.fProdukte, (d.produkte || []).join(', '));
    feld(T.fSeriennummer, d.seriennummer);
    feld(T.fSoftware, d.softwarestand);
    feld(T.fEinbau, d.einbau);
    z.push('');
    feld(T.fBeobachtet, d.fehlerbild.beobachtet);
    feld(T.fErwartet, d.fehlerbild.erwartet);
    feld(T.fLed, d.fehlerbild.led);
    feld(T.fMeldung, d.fehlerbild.meldung);
    feld(T.fAusloeser, d.fehlerbild.ausloeser);
    feld(T.fRepro, d.fehlerbild.reproduzierbar);
    feld(T.fBisher, d.fehlerbild.bisher);

    if (antwortText) {
      z.push('');
      z.push('─────────────────────────────');
      z.push(T.vonThi + (s ? '  (' + T.siLabel + ': ' + s.wert + ' %)' : ''));
      z.push('');
      z.push(antwortText);
    }
    return z.join('\n');
  }

  function kopierKnopf(körper, antwortText, s) {
    var btn = el('button', 'btn-kopieren');
    btn.type = 'button';
    var beschriftung = el('span', null, T.kopieren);
    btn.appendChild(beschriftung);
    btn.addEventListener('click', function () {
      var text = fallAlsKlartext(antwortText, s);
      function erfolg() {
        beschriftung.textContent = T.kopiert;
        btn.classList.add('ist-kopiert');
        setTimeout(function () {
          beschriftung.textContent = T.kopieren;
          btn.classList.remove('ist-kopiert');
        }, 2200);
      }
      // Clipboard-API braucht einen sicheren Kontext; über HTTP im LAN fehlt
      // sie. Deshalb ein Fallback, statt den Nutzer ins Leere laufen zu lassen.
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(erfolg, function () { ersatzKopie(text, erfolg); });
      } else {
        ersatzKopie(text, erfolg);
      }
    });
    körper.appendChild(btn);
  }

  function ersatzKopie(text, danach) {
    var feld = document.createElement('textarea');
    feld.value = text;
    feld.setAttribute('readonly', '');
    feld.style.position = 'fixed';
    feld.style.opacity = '0';
    document.body.appendChild(feld);
    feld.select();
    try { document.execCommand('copy'); danach(); } catch (e) { /* stillschweigend */ }
    document.body.removeChild(feld);
  }

  function sicherheitZeigen(körper, s) {
    if (!s) return;
    var box = el('div', 'sicherheit');
    box.setAttribute('data-stufe', s.stufe);

    var kopf = el('div', 'si-kopf');
    var wert = el('span', 'si-wert', s.wert + ' %');
    kopf.appendChild(wert);
    kopf.appendChild(el('span', 'si-label', T.siLabel));
    box.appendChild(kopf);

    var balken = el('div', 'si-balken');
    var f = el('div', 'si-fuellung');
    f.style.width = s.wert + '%';
    balken.appendChild(f);
    box.appendChild(balken);

    box.appendChild(el('p', 'si-text', T.siStufe[s.stufe] || ''));

    if (s.gruende && s.gruende.length) {
      s.gruende.forEach(function (g) { box.appendChild(el('p', 'si-text', '— ' + g)); });
    }

    if (s.fehlt && s.fehlt.length) {
      var t = el('p', 'si-text', T.siFehlt);
      box.appendChild(t);
      var ul = el('ul', 'si-fehlt');
      s.fehlt.forEach(function (x) { ul.appendChild(el('li', null, x)); });
      box.appendChild(ul);
    }

    körper.appendChild(box);
  }

  // Belegstellen sind aufklappbar: Ein Klick zeigt den Originaltext, auf den
  // sich Thi stützt. Es gibt hier keine Wiki-Seite zum Verlinken — also reist
  // der Beleg mit. Ohne Nachlesemöglichkeit wäre die Quellenangabe bloß Zierde.
  function quellenZeigen(körper, quellen) {
    if (!quellen || !quellen.length) return;
    var mitBeleg = quellen.filter(function (q) { return q.auszug; });
    if (!mitBeleg.length) return;

    var box = el('details', 'quellen');
    var kopf = el('summary', 'quellen-kopf');
    kopf.appendChild(el('span', null, T.quellenTitel));
    kopf.appendChild(el('span', 'quellen-zahl', String(mitBeleg.length)));
    box.appendChild(kopf);

    mitBeleg.forEach(function (q) {
      var eintrag = el('details', 'quelle-eintrag');
      var titel = el('summary', 'quelle');
      titel.appendChild(el('span', 'quelle-titel', q.title));
      if (q.headingPath) titel.appendChild(el('span', 'quelle-abschnitt', '— ' + q.headingPath));
      if (q.fremdsprachig) titel.appendChild(el('span', 'quelle-flagge', String(q.lang).toUpperCase()));
      // Korrekturen tragen ihren Status sichtbar — „ungeprüft" muss man sehen,
      // bevor man die Antwort weitergibt.
      if (q.korrektur) {
        var flagge = el('span', 'quelle-flagge quelle-korrektur', T.koQuelleFlagge + ' · ' + (T.koStatus[q.korrektur.status] || q.korrektur.status));
        flagge.setAttribute('data-status', q.korrektur.status);
        titel.appendChild(flagge);
      }
      eintrag.appendChild(titel);
      eintrag.appendChild(el('p', 'quelle-auszug', q.auszug));
      box.appendChild(eintrag);
    });

    körper.appendChild(box);
  }

  function hinweiseZeigen(körper, hinweise) {
    if (!hinweise || !hinweise.length) return;
    hinweise.forEach(function (h) {
      var n = el('div', 'warnung');
      n.setAttribute('data-schwere', h.schwere || 'hinweis');
      n.appendChild(el('span', 'warnung-glyph', h.schwere === 'kritisch' ? '⛔' : '⚠'));
      n.appendChild(el('span', null, h.text));
      körper.appendChild(n);
    });
  }

  /* ─── Support-Korrekturen ───────────────────────────────────────────── */
  // Ein Mitarbeiter korrigiert eine falsche Antwort. Die Korrektur wird als
  // eigener Eintrag versioniert gespeichert (Git), NICHT in den Wiki-Text
  // geschrieben — Entwurf A in ../docs/07_KORREKTUREN_ENTWUERFE.md. Sie wirkt
  // nach dem nächsten Deploy, gekennzeichnet als „ungeprüft"; Sicherheits-
  // themen erst nach Freigabe. Der Name ist ein Formularfeld, kein Nachweis.
  function nameLesen() { try { return localStorage.getItem('thi_name') || ''; } catch (e) { return ''; } }
  function nameMerken(n) { try { localStorage.setItem('thi_name', n); } catch (e) { /* egal */ } }

  function korrekturApi(methode, daten) {
    var kopf = { 'content-type': 'application/json' };
    if (zustand.zugangswort) kopf['x-zugangswort'] = zustand.zugangswort;
    return fetch('/api/korrektur', { method: methode, headers: kopf, body: daten ? JSON.stringify(daten) : undefined })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (d) { return { status: r.status, daten: d }; });
      });
  }

  function meldungSetzen(ziel, text, art) {
    ziel.textContent = text;
    ziel.hidden = !text;
    if (art) ziel.setAttribute('data-art', art); else ziel.removeAttribute('data-art');
  }

  function korrekturFehlertext(antwort) {
    var d = antwort.daten || {};
    if (antwort.status === 503 && d.fehler === 'nicht_konfiguriert') return T.koNichtKonfiguriert;
    if (antwort.status === 401) return T.zugangFalsch;
    if (d.fehlerliste && d.fehlerliste.length) return d.fehlerliste.join(' ');
    return (d.meldung || T.koFehler) + (d.detail ? ' (' + d.detail + ')' : '');
  }

  function korrekturKnopf(körper, frage, antwortText, quellen) {
    var btn = el('button', 'btn-kopieren btn-korrektur');
    btn.type = 'button';
    btn.appendChild(el('span', null, T.koKnopf));
    var form = null;
    btn.addEventListener('click', function () {
      if (form) { form.hidden = !form.hidden; return; }
      form = korrekturFormular(frage, antwortText, quellen);
      körper.appendChild(form);
      form.querySelector('textarea').focus();
    });
    körper.appendChild(btn);
  }

  function feldMit(label, eingabe) {
    var g = el('label', 'feld-gruppe');
    g.appendChild(el('span', 'feld-label', label));
    g.appendChild(eingabe);
    return g;
  }

  function korrekturFormular(frage, antwortText, quellen) {
    var form = el('form', 'ko-form');
    form.appendChild(el('h4', null, T.koTitel));
    form.appendChild(el('p', 'ko-hinweis', T.koHinweis));

    var titel = el('input', 'feld'); titel.type = 'text'; titel.maxLength = 120; titel.required = true;
    form.appendChild(feldMit(T.koFeldTitel, titel));

    // Bezug: eine der Belegstellen dieser Antwort. Korrekturen selbst sind
    // kein gültiger Bezug — eine Korrektur der Korrektur wäre eine neue zum
    // selben Artikel.
    var bezug = el('select', 'feld');
    quellen.filter(function (q) { return !q.korrektur; }).forEach(function (q) {
      var o = document.createElement('option');
      o.value = JSON.stringify({ route: q.route, anchor: q.anchor || '' });
      o.textContent = q.title + (q.headingPath ? ' — ' + q.headingPath : '');
      bezug.appendChild(o);
    });
    form.appendChild(feldMit(T.koFeldBezug, bezug));

    var text = el('textarea', 'feld feld-gross'); text.maxLength = 2000; text.required = true; text.rows = 4;
    form.appendChild(feldMit(T.koFeldText, text));

    var widerspricht = el('textarea', 'feld'); widerspricht.maxLength = 600; widerspricht.rows = 2;
    form.appendChild(feldMit(T.koFeldWiderspricht, widerspricht));

    var name = el('input', 'feld'); name.type = 'text'; name.maxLength = 60; name.required = true;
    name.value = nameLesen(); name.autocomplete = 'name';
    form.appendChild(feldMit(T.koFeldName, name));

    var meldung = el('p', 'ko-meldung'); meldung.hidden = true;
    form.appendChild(meldung);

    var aktionen = el('div', 'ko-aktionen');
    var absenden = el('button', 'btn-primaer'); absenden.type = 'submit'; absenden.appendChild(el('span', null, T.koAbsenden));
    var abbrechen = el('button', 'btn-klein', T.koAbbrechen); abbrechen.type = 'button';
    abbrechen.addEventListener('click', function () { form.hidden = true; });
    aktionen.appendChild(absenden); aktionen.appendChild(abbrechen);
    form.appendChild(aktionen);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!bezug.value) return;
      nameMerken(name.value.trim());
      absenden.disabled = true;
      meldungSetzen(meldung, T.koLaeuft, null);
      korrekturApi('POST', {
        aktion: 'anlegen',
        notiz: {
          lang: sprache,
          titel: titel.value.trim(),
          text: text.value.trim(),
          widerspricht: widerspricht.value.trim(),
          autor: name.value.trim(),
          bezug: JSON.parse(bezug.value),
          ausloeser: { frage: String(frage || '').slice(0, 600), antwortAuszug: String(antwortText || '').slice(0, 800) },
        },
      }).then(function (antwort) {
        if (antwort.status === 201) {
          var w = antwort.daten.wirkt;
          meldungSetzen(meldung,
            w === 'nach-freigabe' ? T.koErfolgFreigabe : (w === 'sofort-lokal' ? T.koErfolgLokal : T.koErfolgDeploy),
            w === 'nach-freigabe' ? 'warten' : null);
          form.querySelectorAll('input, textarea, select, button').forEach(function (n) { n.disabled = true; });
        } else {
          meldungSetzen(meldung, korrekturFehlertext(antwort), 'fehler');
          absenden.disabled = false;
        }
      }).catch(function () {
        meldungSetzen(meldung, T.fehlerNetz, 'fehler');
        absenden.disabled = false;
      });
    });
    return form;
  }

  // ── Liste mit Statuswechsel ──
  function korrekturenLaden() {
    var liste = $('korrekturenListe');
    var meldung = $('koListeMeldung');
    liste.innerHTML = '';
    meldungSetzen(meldung, '', null);
    liste.appendChild(el('p', 'verlauf-leer', T.koLaden));
    korrekturApi('GET').then(function (antwort) {
      liste.innerHTML = '';
      if (antwort.status !== 200) { meldungSetzen(meldung, korrekturFehlertext(antwort), 'fehler'); return; }
      var d = antwort.daten;
      if (!d.schreibenMoeglich) meldungSetzen(meldung, T.koNichtKonfiguriert, 'warten');
      else if (d.warnung) meldungSetzen(meldung, d.warnung, 'warten');
      var eintraege = (d.korrekturen || []).slice().reverse();
      if (!eintraege.length) { liste.appendChild(el('p', 'verlauf-leer', T.koLeer)); return; }
      eintraege.forEach(function (k) { liste.appendChild(korrekturEintrag(k, d)); });
    }).catch(function () {
      liste.innerHTML = '';
      meldungSetzen(meldung, T.fehlerNetz, 'fehler');
    });
  }

  function korrekturEintrag(k, konfig) {
    var karte = el('div', 'verlauf-eintrag ko-eintrag');
    var zeile = el('div', 'verlauf-zeile');
    zeile.appendChild(el('span', 'verlauf-titel', k.titel));
    var status = el('span', 'ko-status', T.koStatus[k.status] || k.status);
    status.setAttribute('data-status', k.status);
    zeile.appendChild(status);
    karte.appendChild(zeile);

    var meta = T.koVon + ' ' + k.autor + ' · ' + String(k.erstellt || '').slice(0, 10)
      + (k.freigegebenVon ? ' · ' + T.koStatus.freigegeben + ' ' + T.koVon + ' ' + k.freigegebenVon : '');
    karte.appendChild(el('div', 'verlauf-meta', meta));
    if (k.sicherheitsrelevant) karte.appendChild(el('div', 'ko-sicher', '⚠ ' + T.koSicher + (k.sicherheitsgrund ? ' — ' + k.sicherheitsgrund : '')));
    karte.appendChild(el('div', 'verlauf-meta', T.koBezug + ': ' + (k.bezug ? k.bezug.route + (k.bezug.anchor ? '#' + k.bezug.anchor : '') : '')));
    karte.appendChild(el('div', 'verlauf-text', k.text));
    if (k.widerspricht) karte.appendChild(el('div', 'verlauf-text', '≠ ' + k.widerspricht));

    var offen = k.status === 'ungeprueft' || k.status === 'wartet-freigabe' || k.status === 'freigegeben';
    if (!offen) return karte;

    var begruendung = el('input', 'feld'); begruendung.type = 'text'; begruendung.maxLength = 400;
    begruendung.placeholder = T.koBegruendung;
    karte.appendChild(begruendung);

    var aktionen = el('div', 'ko-aktionen');
    var meldung = el('p', 'ko-meldung'); meldung.hidden = true;

    function aktion(name, beschriftung, brauchtFreigabe) {
      var b = el('button', 'btn-klein', beschriftung); b.type = 'button';
      if (brauchtFreigabe && !konfig.freigabeMoeglich) { b.disabled = true; b.title = 'THI_FREIGABEWORT'; }
      b.addEventListener('click', function () {
        var von = $('koName').value.trim();
        if (!von) { $('koName').focus(); return; }
        nameMerken(von);
        aktionen.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
        korrekturApi('POST', {
          aktion: name, id: k.id, von: von,
          begruendung: begruendung.value.trim(),
          freigabewort: $('koFreigabewort').value,
        }).then(function (antwort) {
          if (antwort.status === 200) { korrekturenLaden(); return; }
          meldungSetzen(meldung, korrekturFehlertext(antwort), 'fehler');
          aktionen.querySelectorAll('button').forEach(function (x) { x.disabled = false; });
        }).catch(function () { meldungSetzen(meldung, T.fehlerNetz, 'fehler'); });
      });
      aktionen.appendChild(b);
    }
    if (k.status !== 'freigegeben') aktion('freigeben', T.koFreigeben, true);
    if (k.status !== 'wartet-freigabe') aktion('im-wiki', T.koImWiki, true);
    aktion('zurueckziehen', T.koZurueck, false);
    karte.appendChild(aktionen);
    karte.appendChild(meldung);
    return karte;
  }

  /* ─── Anfrage senden ────────────────────────────────────────────────── */
  function nutzdaten(frage) {
    return {
      sprache: sprache,
      frage: frage || '',
      verlauf: zustand.verlauf.slice(-8),
      fahrzeug: zustand.fahrzeug ? {
        slug: zustand.fahrzeug.slug,
        titel: zustand.fahrzeug.de,
        von: zustand.fahrzeug.von,
        bis: zustand.fahrzeug.bis,
        offen: zustand.fahrzeug.offen,
        fallback: zustand.fahrzeug.fallback,
      } : null,
      baujahr: $('baujahr').value,
      aufbauart: $('aufbauart').value,
      aufbauhersteller: $('aufbauhersteller').value,
      startknopf: $('startknopf').value,
      produkte: zustand.produkte.map(function (p) { return p.name; }),
      produktSlugs: zustand.produkte.map(function (p) { return p.slug; }).filter(Boolean),
      seriennummer: $('seriennummer').value,
      softwarestand: $('softwarestand').value,
      einbau: $('einbau').value,
      fehlerbild: {
        beobachtet: $('beobachtet').value,
        erwartet: $('erwartet').value,
        led: $('led').value,
        meldung: $('meldung').value,
        ausloeser: $('ausloeser').value,
        reproduzierbar: $('reproduzierbar').value,
        bisher: $('bisher').value,
      },
    };
  }

  async function senden(frage) {
    if (zustand.laeuft) return;
    zustand.laeuft = true;

    var knopf = $('absenden');
    var knopfText = knopf.querySelector('span');
    knopf.disabled = true;
    knopfText.textContent = T.absendenLaeuft;

    var m = nachrichtAnlegen('thi', T.vonThi);

    // ─── Ladeanzeige mit echten Phasen ──────────────────────────────────
    // Der Strom hat drei unterscheidbare Abschnitte, und die Anzeige nennt
    // sie beim Namen, statt nur zu pulsieren:
    //   1. bis 'meta'  — Gate, Widerspruchsprüfung, Suche über die Artikel
    //   2. ab  'meta'  — die QUELLEN STEHEN FEST, das Modell formuliert noch
    //   3. ab  'text'  — Wörter erscheinen, Anzeige verschwindet
    //
    // Abschnitt 2 ist der wichtige: Er dauert am längsten, und vorher stand
    // dort ein leerer Kasten — die Punkte wurden bei 'meta' entfernt. Genau
    // daran war beim Modellwechsel nicht zu erkennen, ob noch etwas läuft
    // oder die Function längst abgebrochen war.
    var tippt = el('div', 'lade-status');
    var ladePunkte = el('span', 'tippt');
    ladePunkte.appendChild(el('span')); ladePunkte.appendChild(el('span')); ladePunkte.appendChild(el('span'));
    var ladeText = el('span', 'lade-text', T.ladeSuche);
    tippt.appendChild(ladePunkte);
    tippt.appendChild(ladeText);
    tippt.setAttribute('role', 'status');
    tippt.setAttribute('aria-live', 'polite');
    m.körper.appendChild(tippt);

    var antwortText = '';
    var antwortBox = null;

    try {
      var kopfzeilen = { 'content-type': 'application/json' };
      if (zustand.zugangswort) kopfzeilen['x-zugangswort'] = zustand.zugangswort;

      var res = await fetch('/api/chat', {
        method: 'POST',
        headers: kopfzeilen,
        body: JSON.stringify(nutzdaten(frage)),
      });

      if (res.status === 401) {
        try { localStorage.removeItem('thi_zugang'); } catch (e) { /* egal */ }
        zustand.zugangswort = '';
        tippt.remove();
        $('zugangFehler').textContent = T.zugangFalsch;
        $('zugangFehler').hidden = false;
        $('zugangOverlay').hidden = false;
        m.wurzel.remove();
        return;
      }

      if (!res.ok || !res.body) {
        var fehlerDaten = await res.json().catch(function () { return null; });
        tippt.remove();
        antwortBox = el('div', 'antwort');
        markdownRendern(antwortBox, (fehlerDaten && fehlerDaten.meldung) || T.fehlerAllgemein);
        m.körper.appendChild(antwortBox);
        m.wurzel.setAttribute('data-kritisch', '1');
        return;
      }

      var leser = res.body.getReader();
      var dekodierer = new TextDecoder();
      var puffer = '';
      var quellen = [];
      var sicherheit = null;

      for (;;) {
        var stueck = await leser.read();
        if (stueck.done) break;
        puffer += dekodierer.decode(stueck.value, { stream: true });
        var zeilen = puffer.split('\n');
        puffer = zeilen.pop() || '';

        for (var i = 0; i < zeilen.length; i++) {
          var roh = zeilen[i].trim();
          if (!roh) continue;
          var ereignis;
          try { ereignis = JSON.parse(roh); } catch (e) { continue; }

          if (ereignis.typ === 'meta') {
            quellen = ereignis.quellen || [];
            // NICHT entfernen — ab hier läuft die längste Phase. Stattdessen
            // melden, was schon feststeht: die Zahl der Belegstellen.
            hinweiseZeigen(m.körper, ereignis.hinweise);
            if ((ereignis.hinweise || []).some(function (h) { return h.schwere === 'kritisch'; })) {
              m.wurzel.setAttribute('data-kritisch', '1');
            }
            ladeText.textContent = quellen.length
              ? T.ladeBelege.replace('{n}', String(quellen.length))
              : T.ladeSchreibt;
            antwortBox = el('div', 'antwort');
            m.körper.appendChild(antwortBox);
            m.körper.appendChild(tippt);   // unter die Antwort schieben
          } else if (ereignis.typ === 'text') {
            tippt.remove();                // erstes Wort da — Anzeige weg
            if (!antwortBox) { antwortBox = el('div', 'antwort'); m.körper.appendChild(antwortBox); }
            antwortText += ereignis.text;
            markdownRendern(antwortBox, antwortText);
            scrollen();
          } else if (ereignis.typ === 'sicherheit') {
            sicherheit = ereignis.sicherheit;
          } else if (ereignis.typ === 'fehler') {
            if (antwortBox) antwortBox.appendChild(el('p', null, '⚠ ' + ereignis.text));
          }
        }
      }

      tippt.remove();
      if (antwortText) {
        zustand.verlauf.push({ rolle: 'nutzer', text: frage || fallAlsText() });
        zustand.verlauf.push({ rolle: 'thi', text: antwortText });
      }
      sicherheitZeigen(m.körper, sicherheit);
      quellenZeigen(m.körper, quellen);
      kopierKnopf(m.körper, antwortText, sicherheit);
      if (antwortText && quellen.length) korrekturKnopf(m.körper, frage || fallAlsText(), antwortText, quellen);
      if (!frage) verlaufSpeichern(antwortText, sicherheit);
      $('nachfrageFormular').hidden = false;
      scrollen();

    } catch (fehler) {
      tippt.remove();
      var box = el('div', 'antwort');
      markdownRendern(box, T.fehlerNetz);
      m.körper.appendChild(box);
      m.wurzel.setAttribute('data-kritisch', '1');
    } finally {
      zustand.laeuft = false;
      knopf.disabled = false;
      knopfText.textContent = T.absenden;
    }
  }

  function fallAlsText() {
    var d = nutzdaten('');
    return [
      d.fahrzeug ? d.fahrzeug.titel : '',
      d.produkte.join(', '),
      d.seriennummer,
      d.fehlerbild.beobachtet,
      d.fehlerbild.led,
    ].filter(Boolean).join(' | ');
  }

  /* ─── Formular absenden ─────────────────────────────────────────────── */
  $('fallFormular').addEventListener('submit', function (e) {
    e.preventDefault();
    // NUR das Anliegen ist Pflicht. Am Telefon liegen Fahrzeug, Seriennummer
    // oder Softwarestand oft noch gar nicht vor — wer dort blockiert, zwingt
    // zu Platzhaltern. Fehlende Angaben senken stattdessen sichtbar die
    // Sicherheit der Antwort, und Thi fragt gezielt nach.
    if (!$('beobachtet').value.trim()) {
      var box = $('warnungen');
      var n = el('div', 'warnung');
      n.setAttribute('data-schwere', 'warnung');
      n.appendChild(el('span', 'warnung-glyph', '⚠'));
      n.appendChild(el('span', null, T.fehlerPflicht));
      box.insertBefore(n, box.firstChild);
      $('beobachtet').focus();
      setTimeout(function () { n.remove(); }, 6000);
      return;
    }
    ansichtZeigen('antwort');
    fallNachrichtZeigen(nutzdaten(''));
    zustand.fallGesendet = true;
    senden('');
  });

  $('zurueckZumFall').addEventListener('click', function () { ansichtZeigen('fall'); });

  $('nachfrageFormular').addEventListener('submit', function (e) {
    e.preventDefault();
    var frage = $('nachfrage').value.trim();
    if (!frage || zustand.laeuft) return;
    $('nachfrage').value = '';
    var m = nachrichtAnlegen('nutzer', T.vonNachfrage);
    m.körper.appendChild(el('div', 'antwort', frage));
    senden(frage);
  });

  /* ─── Neuer Fall ────────────────────────────────────────────────────── */
  $('neuerFall').addEventListener('click', function () {
    zustand.fahrzeug = null;
    zustand.produkte = [];
    zustand.verlauf = [];
    zustand.fallGesendet = false;
    $('fallFormular').reset();
    $('fahrzeugGewaehlt').hidden = true;
    $('snErkennung').hidden = true;
    $('warnungen').innerHTML = '';
    $('chatVerlauf').innerHTML = '';
    $('nachfrageFormular').hidden = true;
    chipsRendern();
    produkteRendern('');
    ampelnAktualisieren();
    ansichtZeigen('fall');
  });

  /* ─── Start ─────────────────────────────────────────────────────────── */
  document.querySelectorAll('.sprach-btn').forEach(function (b) {
    b.addEventListener('click', function () { spracheSetzen(b.getAttribute('data-sprache')); });
  });

  document.querySelectorAll('[data-thema]').forEach(function (b) {
    b.addEventListener('click', function () { themaSetzen(b.getAttribute('data-thema')); });
  });

  var gespeicherteSprache = 'de';
  try { gespeicherteSprache = localStorage.getItem('thi_sprache') || 'de'; } catch (e) { /* egal */ }

  // Enter absenden — für Zugangswort und Nachfrage.
  enterSendetAb($('zugangWort'), $('zugangForm'));
  enterSendetAb($('nachfrage'), $('nachfrageFormular'));

  themaSetzen(themaLesen());
  produkteRendern('');
  spracheSetzen(gespeicherteSprache);
  ampelnAktualisieren();
  ansichtZeigen('fall');
  zugangPruefen();
})();
