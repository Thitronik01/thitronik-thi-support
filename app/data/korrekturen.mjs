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
  },
  {
    "id": "2026-09-16-sunrise-2g-abschaltung-61d6",
    "status": "freigegeben",
    "sicherheitsrelevant": false,
    "sicherheitsgrund": null,
    "lang": "de",
    "bezug": {
      "route": "/de/mobilfunk-sim",
      "anchor": "schnellcheck"
    },
    "titel": "Sunrise 2g abschaltung",
    "text": "Sunrise können wir nicht mehr empfehlen als funktionierenden Provider für den Pro-Finder. Darunter fallen Sunrise Prepaid Airbag, Sunrise Prepaid Unlimited. Beide haben aufgrund der Abschaltung des 2-G-Netzes keine Verbindung mehr.",
    "widerspricht": "Sunrise Prepaid-Airbag können wir empfehlen. \nSunrise Prepaid Unlimited können wir empfehlen.",
    "autor": "Max",
    "erstellt": "2026-09-16T16:51:44.955Z",
    "freigegebenVon": "Dennis",
    "freigegebenAm": "2026-09-16T16:53:16.838Z",
    "ausloeser": {
      "frage": "Kann ich einem Kunden den Provider Sunrise empfelen?",
      "antwortAuszug": "## Empfehlung zu Sunrise für den Pro-Finder\n\nJa, Sunrise kann für den Einsatz in der **Schweiz** empfohlen werden. Die Dokumentation nennt konkret zwei geeignete Tarife:\n\n- **Sunrise Prepaid airbag**\n- **Sunrise Prepaid Unlimited**\n\nBeide sind laut FAQ als funktionierend dokumentiert.\n\n---\n\n### Wichtige Hinweise für die Einrichtung\n\n1. **Guthaben-Abfragecode** für Sunrise (CH): `*121#` – dieser muss in der Programmier-SMS korrekt eingetragen werden (nur bei Prepaid).\n2. **Automatische Guthabenabfrage** funktioniert bei Sunrise möglicherweise **nicht** vollständig – das FAQ weist darauf hin, dass die automatisierte Abfrage des Restguthabens bei manchen Anbietern (wie A1 Prepaid) nicht klappt; für Sunrise ist das nicht explizit ausgeschlossen, aber im Zweifel prüfen.\n3. **5G-SIM-Karten** müs"
    },
    "historie": [
      {
        "status": "ungeprueft",
        "von": "Max",
        "am": "2026-09-16T16:51:44.955Z",
        "begruendung": ""
      },
      {
        "status": "freigegeben",
        "von": "Dennis",
        "am": "2026-09-16T16:53:16.838Z",
        "begruendung": "Sunrise hat sein 2g Netz abgeschaltet und kann keine Verbindung zum Pro-finder herstellen."
      }
    ]
  },
  {
    "id": "2026-09-16-einbauort-des-g-a-s-plug-5cc5",
    "status": "wartet-freigabe",
    "sicherheitsrelevant": true,
    "sicherheitsgrund": "Korrekturtext nennt „GAS\".",
    "lang": "de",
    "bezug": {
      "route": "/de/pro-finder",
      "anchor": "montageort"
    },
    "titel": "Einbauort des G.A.S.-plug",
    "text": "Einbauort des G.A.S.-plug ist der Zigarettenanzünder am Armaturenbrett.",
    "widerspricht": "keine Angaben zum Einbauort des G.A.S.-plug",
    "autor": "Max",
    "erstellt": "2026-09-16T18:42:25.664Z",
    "freigegebenVon": null,
    "freigegebenAm": null,
    "ausloeser": {
      "frage": "den genauen Einbau ort",
      "antwortAuszug": "Im bereitgestellten Kontext finden sich leider **keine Angaben zum Einbauort des G.A.S.-plug**.\n\nDie Kontexteinträge betreffen andere Produkte (Pro-Finder, WiPro III, BT-connect etc.) – eine belegte Aussage zur Montagehöhe oder Position des G.A.S.-plug ist darin nicht enthalten.\n\nBitte wende dich direkt an den THITRONIK-Support – die können dir die passende Einbauanleitung nennen oderzusenden:\n\n📞 **+49 (0)4351 76744-112**"
    },
    "historie": [
      {
        "status": "wartet-freigabe",
        "von": "Max",
        "am": "2026-09-16T18:42:25.664Z",
        "begruendung": ""
      }
    ]
  }
];
