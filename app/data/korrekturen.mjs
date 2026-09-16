// AUTOMATISCH ERZEUGT aus korrekturen.json — nicht von Hand bearbeiten.
// Support-Korrekturen; geschrieben von netlify/functions/korrektur.mjs oder
// node werkzeuge/daten-bauen.mjs. Historie: git log -- app/data/korrekturen.json
export default [
  {
    "id": "2026-09-16-testkorrektur-75b2",
    "status": "zurueckgezogen",
    "sicherheitsrelevant": false,
    "sicherheitsgrund": null,
    "lang": "de",
    "bezug": {
      "route": "/de/funk-handsender",
      "anchor": "häufige-fragen-faq"
    },
    "titel": "Testkorrektur",
    "text": "Dies ist ein Test der Korrekturfunktion, bitte ignorieren.",
    "widerspricht": "",
    "autor": "Max",
    "erstellt": "2026-09-16T14:11:48.239Z",
    "freigegebenVon": null,
    "freigegebenAm": null,
    "ausloeser": {
      "frage": "Kunde fragt, welche Batterie in den Funk-Handsender kommt",
      "antwortAuszug": "## Batterie im Funk-Handsender\n\nDer Funk-Handsender verwendet eine **CR2032-Knopfzelle mit 3 V**.\n\n**Wichtige Hinweise zum Wechsel:**\n- Auf korrekte Polung achten\n- Knopfzelle möglichst nicht an den Kontaktflächen mit bloßen Fingern berühren\n- Nach dem Wechsel **kein erneutes Anlernen** erforderlich\n- Funktion anschließend am Fahrzeug prüfen\n- Verbrauchte Knopfzelle dem Batterierecycling zuführen\n\n> ⚠️ Bei unsachgemäßem Batteriewechsel besteht Explosionsgefahr. Ausschließlich den vorgesehenen Batterietyp verwenden.\n\n**Typische Lebensdauer:** ca. zwei Jahre – längere Kälteperioden können sie verkürzen.\n\n---\n\nQuellen: Funk-Handsender — Batterie prüfen und wechseln; Zugangsmedien & Bedienung — Funk-Handsender, Wichtige Punkte"
    },
    "historie": [
      {
        "status": "ungeprueft",
        "von": "Max",
        "am": "2026-09-16T14:11:48.239Z",
        "begruendung": ""
      },
      {
        "status": "zurueckgezogen",
        "von": "Max",
        "am": "2026-09-16T14:19:02.033Z",
        "begruendung": ""
      }
    ]
  },
  {
    "id": "2026-09-16-sunrise-ist-kein-funktionierender-provider-mehr-517e",
    "status": "im-wiki",
    "sicherheitsrelevant": false,
    "sicherheitsgrund": null,
    "lang": "de",
    "bezug": {
      "route": "/de",
      "anchor": "telemetrie-und-fernsteuerung"
    },
    "titel": "Sunrise ist kein funktionierender Provider mehr",
    "text": "Sunrise ist kein funktionierender Provider mehr in der Schweiz.",
    "widerspricht": "Provider Sunrise funktioniert in der Schweiz ohne Probleme.",
    "autor": "Max",
    "erstellt": "2026-09-16T16:23:35.763Z",
    "freigegebenVon": null,
    "freigegebenAm": null,
    "ausloeser": {
      "frage": "kennst du die provider in der schweiz?",
      "antwortAuszug": "# SIM-Karten-Kompatibilität in der Schweiz\n\nJa, dazu gibt es konkrete Angaben in der Dokumentation:\n\n**Funktionieren NICHT:**\n- Normale Swisscom\n- Swisscom-Prepaid\n- M-Budget\n- Orange\n\n**Sicher funktionieren:**\n- Salt PrePay\n- Sunrise Prepaid airbag\n- Sunrise Prepaid Unlimited\n\n---\n\n**Wichtiger Hinweis:** Die Seriennummer des Pro-Finders ist nicht bekannt. Das ist hier relevant, weil laut Dokumentation die **3G-Kompatibilität für die Schweiz** erst ab einem bestimmten Softwarestand dokumentiert ist, und ab Seriennummer 0699-045 ein **4G-LTE-Modem** verbaut ist.\n\n> Ohne die Seriennummer des Pro-Finders kann ich nicht sagen, welches Mobilfunknetz (2G/3G/4G) das Gerät unterstützt – das beeinflusst, welche SIM-Karte in der Schweiz überhaupt funktionieren kann.\n\n**Bitte Seriennummer des Pro-Fin"
    },
    "historie": [
      {
        "status": "ungeprueft",
        "von": "Max",
        "am": "2026-09-16T16:23:35.763Z",
        "begruendung": ""
      },
      {
        "status": "im-wiki",
        "von": "Max",
        "am": "2026-09-16T16:44:06.849Z",
        "begruendung": "das 2g netz wurde von diesem Provider abgeschaltet"
      }
    ]
  }
];
