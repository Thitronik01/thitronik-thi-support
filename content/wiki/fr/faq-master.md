---
title: FAQ Master — Aperçu de toutes les questions fréquemment posées
sources:
  - wiki/support-fallaufnahme.md
  - wiki/stoerungsbeseitigung.md
  - wiki/seriennummern-softwarestaende.md
  - wiki/artikelnummern.md
  - wiki/zugang-bedienung.md
  - wiki/anlernvorgang.md
  - wiki/stromversorgung-standzeiten.md
  - wiki/wipro-iii.md
  - wiki/pro-finder.md
  - wiki/mobilfunk-sim.md
  - wiki/bt-connect.md
  - wiki/nfc-modul.md
  - wiki/vernetzungsmodul.md
  - wiki/gas.md
  - wiki/gas-pro.md
  - wiki/gas-pro-iii.md
  - wiki/gas-connect.md
  - wiki/gas-plug.md
  - wiki/co-sensor.md
  - wiki/zusatzsensor-gas-pro-iii.md
  - wiki/funk-handsender.md
  - wiki/funk-magnetkontakt.md
  - wiki/funk-kabelschleife.md
  - wiki/funk-rauchmelder.md
  - wiki/funk-wassermelder.md
  - wiki/safe-lock-umruestplatine.md
  - wiki/app-befehle.md
  - wiki/sirenen-hupen.md
  - sources/FAQ Allgemeine Fragen.pdf
  - sources/Fragen zu WiPro III.pdf
  - sources/Fragen zu Pro-finder.pdf
  - sources/Fragen zu BT-connect.pdf
  - sources/Fragen zu G.A.S.-pro III.pdf
  - sources/Häufige Fragen zur THITRONIK® App.pdf
updated: '2026-07-15'
confidence: high
lang: fr
translation_of: sources/faq-master.md
---


# FAQ Master — Aperçu de toutes les questions fréquemment posées

Ouvrage de référence central pour tout le contenu de la FAQ. Chaque section est un lien vers la section FAQ complète de la page produit respective. Les **principales questions** reçoivent une réponse directe ici.


> **Note de sécurité et correction:** Les réponses courtes ne remplacent pas les instructions du produit. En cas de gaz, CO, fumée ou chaleur, quittez le véhicule et appelez les secours si nécessaire. Ne désactivez pas globalement la protection Replay ni l’Anti-Jamming ; pour un dispositif d’arrêt monté par un professionnel, utilisez `kill`, jamais `a an`.

---

## Table des matières

- [Général](#general)
- [WiPro III & safe.lock](#wipro-iii-and-safelock)
- [Pro-Finder](#pro-finder)
- [BT-connect et module réseau](#bt-connect-et-module-reseau)
- [module NFC et application](#module-nfc-et-application)
- [Détecteur de gaz (GAS / GAS-pro / GAS-pro III / GAS-connect / GAS-plug)](#detecteur-de-gaz)
- [Accessoires radio 868 MHz](#accessoires-radio-868-mhz)
- [Capteurs](#capteurs)
- [carte de conversion safe.lock](#safelock-carte-de-conversion)
- [Thèmes relatifs aux batteries (transversaux)](#themes-relatifs-aux-batteries-transversaux)
- [Apprentissage, perturbations, compatibilité](#apprentissage-perturbations-compatibilite)

---

## Général

**Où puis-je acheter les produits Thitronik ?**
Confirmez la disponibilité, le contenu de la livraison et le canal d’achat dans les documents THITRONIK actuels ou auprès d’une entreprise spécialisée. Le montage en usine est un canal de service distinct.

**Est-ce que Thitronik installe les produits lui-même ?**
Oui, via le **service d'installation en usine** (sur rendez-vous) ainsi que des partenaires d'installation et premium formés. Contact: `kontakt@thitronik.de`.

**Les produits sont-ils fabriqués en Allemagne ?**
Oui — développement et production à **Eckernförde** (Schleswig-Holstein). Les pièces du boîtier, les circuits imprimés, les instructions et les emballages proviennent également de la région.

**Comment fonctionne un retour/garantie ?**
Contactez d’abord l’émetteur de la facture ou l’entreprise de montage. Fournissez une description précise, le justificatif d’achat et, si nécessaire, des photos de la plaque et du montage ; ne transmettez jamais de mot de passe ni de code PIN SIM complet.

**Existe-t-il des pièces de rechange pour les appareils plus anciens ?**
La disponibilité des pièces doit être vérifiée pour la génération exacte ; cette FAQ ne donne aucune garantie générale.

→ compléter : [[Dépannage — diagnostic sûr des problèmes fréquents]] (« Questions générales sur la THITRONIK »)

---

## WiPro III & safe.lock

**Quel véhicule est compatible ?**
Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]] — là avec les bons [[Glossaire — Termes techniques du système THITRONIK]]-Paramètres par série de véhicules (Fiat Ducato, Ford Transit, Mercedes Sprinter, VW T5/T6/T6.1/Crafter, Iveco Daily, Renault Master, MAN TGE…).

**WiPro ne répond pas à la clé du véhicule - pourquoi ?**
Si la protection Replay a été activée volontairement, ce comportement peut être normal. Sinon, faites vérifier le profil véhicule, les DIP et le raccordement CAN par un spécialiste ; ne désactivez pas globalement la protection.

**Quelle est la différence entre WiPro III et WiPro III safe.lock ?**
safe.lock est une logique de sécurité de clé et de verrouillage central dépendante du véhicule. Ce n’est ni un moyen d’accès distinct, ni un antidémarrage général, ni le dispositif d’arrêt Pro-Finder.

**La LED d'état clignote 9 fois - qu'est-ce que cela signifie ?**
Neuf clignotements enregistrent un événement Anti-Jamming ou brouilleur. Notez le lieu, l’heure et les perturbations possibles ; ne modifiez DIP 7 qu’après une évaluation documentée.

**Puis-je convertir d'anciens systèmes WiPro en safe.lock ?**
Uniquement pour les variantes véhicule/clé documentées et avec WiPro III safe.lock. L’article `101052` n’est pas une alarme autonome et le transpondeur d’antidémarrage doit être copié par un partenaire qualifié avant le montage.

→ compléter : [[WiPro III — système d'alarme radio pour véhicules de loisirs]] (Section *Foire aux questions*)

---

## Pro-Finder

**De quelle carte SIM ai-je besoin ?**
| Numéro de série complet | Format SIM | Règle PIN |
|---|---|---|
| `0699-001`–`0699-007` | Mini-SIM | `0000`; demande du PIN active |
| `0699-008`–`0699-044` | Micro-SIM | `0000`; demande du PIN active |
| à partir de `0699-045` | Nano-SIM | demande du PIN entièrement désactivée |

Conservez les zéros initiaux. `100699` est le numéro d’article ; `0699-045` est un numéro de série complet et le seuil matériel 4G LTE documenté. Une Multi-SIM doit être évaluée selon son numéro, ses services SMS/voix et ses renvois.

**Quels fournisseurs fonctionnent (ne fonctionnent pas) ?**
N’utilisez pas une liste statique d’opérateurs comme autorisation permanente. Vérifiez séparément SMS, voix, numéro, crédit, messagerie/renvois, itinérance et réseau actuel sur le lieu d’utilisation.

**Pourquoi le Pro-Finder ne répond-il pas à mon SMS ?**
*Android :* Fonctions RCS/Chat **désactivées**, définissez le mode d'entrée sur GSM/ASCII.
*iOS :* **Désactivez iMessage** avant de placer la carte SIM Pro-Finder dans l'iPhone.
→ [[Dépannage — diagnostic sûr des problèmes fréquents]] · [[Communications mobiles et cartes SIM — Pro-Finder, paramètres de l'application et du smartphone]]

**Que signifient les états des LED ?**
Vert clignotant = **Fonctionnement normal**. Toutes les autres conditions et diagnostics → [[Pro-Finder — Module de télémétrie GSM/GPS]] / [[Dépannage — diagnostic sûr des problèmes fréquents]].

**Mon ancien Pro-Finder peut-il être mis à niveau vers la 4G ?**
Cette FAQ ne promet ni mise à niveau ni prix actuel. Faites confirmer le numéro de série et le service actuellement disponible.

**Quand la 2G/3G sera-t-elle désactivée ?**
Vérifiez toujours la disponibilité 2G/3G pour le pays et l’opérateur concernés ; les dates statiques d’arrêt sont volontairement omises.

**Pro-Finder plante (Fiat + système solaire) ?**
En cas de panne avec une installation solaire ou de charge, consignez tension, câblage et état du montage et faites diagnostiquer les pics de tension. Ne prescrivez pas un composant à partir du seul symptôme.

**Que se passe-t-il à 11,2 V ?**
À `11.2 V`, le Pro-Finder envoie un avertissement et passe en veille de sous-tension. Après recharge et une alimentation supérieure à `12.5 V`, il revient au fonctionnement normal.

→ compléter : [[Pro-Finder — Module de télémétrie GSM/GPS]] (Section *Foire aux questions*)

---

## BT-connect et module réseau

**Quelle est la différence ?**
Les documents indiquent l’article `101290` comme abandonné depuis 09/2025 ; l’article `106000` BT-connect est le successeur documenté. Vérifiez la disponibilité réelle.

**L'application peut-elle ouvrir le véhicule sans connexion Bluetooth ?**
**Non.** BT-connect ne peut pas être utilisé sans une connexion Bluetooth active. Emportez une télécommande sans fil en guise de secours !

**La connexion Bluetooth échoue ?**
Supprimez l'appairage existant sur le smartphone **et** sur le module, relancez le mode appairage (LED bleue fixe). → [[Dépannage — diagnostic sûr des problèmes fréquents]]

→ compléter : [[BT-connect — Module Bluetooth pour WiPro III]] · [[Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth]]

---

## module NFC et application

**Quels systèmes d'alarme sont compatibles ?**
WiPro III, WiPro III safe.lock, WiPro easy, C.A.S. III.

**Le module NFC peut-il être formé comme premier accessoire ?**
**Non** - sinon il sera reconnu comme une télécommande sans fil radio principal. Au moins un premier [[Émetteur radio 868 — télécommande pour WiPro III]] apprendre.

**Combien de tags puis-je stocker ?**
Jusqu'à **14 balises NFC** (KeyCard / KeyStrap / KeyTag).

**Comment reconnaître une journée sécuritaire ?**
Lorsqu'elle est déclenchée, la LED bleue clignote **2×** → THITRONIK® tag original (crypté, anticopie). S'il ne clignote que **1×** → jour étranger (entraîné, mais peut être copié).

**Quelles batteries pour le module NFC ?**
En exclusivité **3 × alcalines AAA (LR03)**. Pas de piles, pas de piles au lithium.

→ compléter : [[module NFC — Contrôlez le WiPro via NFC]] · [[THITRONIK® App — commandes, configuration et dépannage]]

---

## Détecteur de gaz

### Différences entre les modèles de détecteurs de gaz

| produit | Radio vers WiPro | Propre sirène | Autonome | taper |
|---------|:------------:|:-------------:|:----------:|-----|
| [[G.A.S. — Détecteur de gaz autonome avec sirène interne]] | ❌ | ✅ | ✅ | Installation fixe |
| [[G.A.S.-pro (anciennes séries) — Alarme gaz et CO]] | ❌ (câblé à WiPro) | ✅ | ❌ | Installation fixe |
| [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]] | ✅ | ✅ | ✅ | Installation fixe ; vérifier la version |
| [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]] | ✅ | ❌ | ❌ | Installation fixe, nécessite WiPro III |
| [[G.A.S.-plug « tout en un » — détecteur de gaz mobile]] | ❌ | ✅ | ✅ | Mobile (allume-cigare) |

### Questions fréquemment posées

**Où le capteur doit-il être monté ?**
Utilisez la hauteur, les distances et l’orientation indiquées pour le détecteur exact. Ne transposez pas les valeurs d’un détecteur de gaz à un autre ni à un capteur CO.

**Fausses alarmes en cuisinant ou en conduisant ?**
- Alarme de cuisson : appuyez sur le bouton → **muet pendant 60 minutes**
- Alarme de conduite (échappement moteur) : [[Glossaire — Termes techniques du système THITRONIK]] Connectez-vous à la borne 15
→ [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]]

**Pourquoi ne puis-je pas tester avec de l'essence à briquet ?**
Le [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]] utilise un algorithme d'évaluation complexe, pas un simple seuil. L'autotest s'exécute automatiquement, les erreurs sont automatiquement alertées.

**Que sont les déclencheurs de fausses alarmes ?**
Déodorants, après-rasage, produits de nettoyage, gaz corporels des animaux domestiques, alcool respiratoire. Une hauteur d'installation correcte réduit considérablement ce phénomène.

**À quoi sert la sortie « Alarm OUT » ?**
Pour connecter un **sirène de secours** (Art. 100089) — recommandé pour les véhicules de grande taille ou fortement isolés. → [[Sirènes et klaxons — moyens d'alarme acoustiques]]

**Qu'est-ce qu'un raid au gaz ?**
Réveillez les personnes, quittez le véhicule, évitez les sources d’allumage et appelez les secours si nécessaire. Un alarmement réel ou incertain ne doit pas être classé à distance comme fausse alerte.

→ compléter : [[G.A.S. — Détecteur de gaz autonome avec sirène interne]] · [[G.A.S.-pro (anciennes séries) — Alarme gaz et CO]] · [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]] · [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]] · [[G.A.S.-plug « tout en un » — détecteur de gaz mobile]]

---

## Accessoires radio 868 MHz

**Contact radiomagnétique - le contact est reconnu mais pas d'alarme ?**
La LED sur l'émetteur pointe **vers l'aimant** au lieu de **loin de lui**. Retournez la carte - la LED doit pointer **loin de l'aimant**. → [[Dépannage — diagnostic sûr des problèmes fréquents]]

**Le tampon adhésif ne colle pas ?**
Dégraisser la surface, traiter à **> 15 °C**, laisser **durcir pendant 24 heures**. Pour abattants métalliques : adaptateur de montage article 100428 (noir) ou 100729 (blanc). → [[Contact radiomagnétique 868 — montage et fonctionnement]]

**Combien de composants sans fil maximum ?**
Jusqu'à **100 émetteurs radio** par WiPro III.

**Comment remplacer un émetteur ?**
Après avoir changé la pile **aucun réapprentissage n'est nécessaire**. Uniquement si toute la mémoire a été supprimée → recycler tous les composants. → [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]]

**Détecteur d'eau sans fil — quelle version WiPro ?**
Au moins WiPro III du SN 0823-021 (v6.8) ou WiPro III safe.lock du SN 1050-004 (v6.7s). → [[Détecteur d'eau sans fil 868 — détecteur d'eau sans fil]]

**Détecteur de fumée radio T.S.A. — Changer la batterie ?**
**Pas possible** — Pile au lithium longue durée (CR123A) installée en permanence, env. Durée de vie de 10 ans. Après l'avertissement de batterie : **remplacez** l'appareil. → [[T.S.A. — Détecteur de fumée sans fil pour WiPro III]]

→ compléter : [[Émetteur radio 868 — télécommande pour WiPro III]] · [[Contact radiomagnétique 868 — montage et fonctionnement]] · [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles]] · [[T.S.A. — Détecteur de fumée sans fil pour WiPro III]] · [[Détecteur d'eau sans fil 868 — détecteur d'eau sans fil]]

---

## Capteurs

**À quoi sert le capteur CO ?**
Ajout pour [[G.A.S.-pro (anciennes séries) — Alarme gaz et CO]] et [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]] — détecte le **monoxyde de carbone** (gaz de combustion incolore et inodore). → [[capteur CO — Capteur de monoxyde de carbone auxiliaire]]

**Capteur supplémentaire G.A.S.-pro III — pourquoi ?**
Sonde externe pour gaz **propane / butane / KO** pour couvrir une deuxième pièce (ex. garage arrière + coin nuit). → [[Capteur additionnel G.A.S.-pro III — capteur de gaz externe]]

→ compléter : [[capteur CO — Capteur de monoxyde de carbone auxiliaire]] · [[Capteur additionnel G.A.S.-pro III — capteur de gaz externe]]

---

## carte de conversion safe.lock

**À quels véhicules est destinée la carte de conversion ?**
Instructions de base : Fiat Ducato / Peugeot Boxer / Citroën Jumper et Iveco Daily **2006-2012**. Les informations d'assistance ultérieures couvrent la famille Ducato/Boxer/Jumper concernée jusqu'à **l'année modèle 2018** ; à partir de **2019**, une clé à code tournant est appelée. → [[Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper]]

**Que fait exactement safe.lock ?**
La carte n’est pas une alarme autonome et exige WiPro III safe.lock. Le transpondeur d’antidémarrage doit être copié avant le montage, sinon le moteur ne démarrera plus avec la clé modifiée.

→ compléter : [[Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper]]

---

## Thèmes relatifs aux batteries (transversaux)

**Quelle batterie pour quel appareil ?**

| Composant | Alimentation | Maintenance |
|---|---|---|
| [[Émetteur radio 868 — télécommande pour WiPro III]], [[Contact radiomagnétique 868 — montage et fonctionnement]], [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles]] | CR2032, 3 V | environ deux ans ; aucune nouvelle mémorisation |
| [[Détecteur d'eau sans fil 868 — détecteur d'eau sans fil]] | CR2032 | respecter l’avertissement du produit |
| [[module NFC — Contrôlez le WiPro via NFC]] | 3× alkaline AAA (LR03) | ni accus ni piles lithium |
| [[T.S.A. — Détecteur de fumée sans fil pour WiPro III]] | CR123A | remplacer l’appareil après l’avertissement |
| [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]] | 12/24 V | pas de CR2032 ; vérifier alimentation et raccordement |

**Marques recommandées pour le CR2032 ?** Panasonic ou Varta. **Duracell déconseillé** (la tension nominale chute trop tôt).

**Quand changer la pile ?** En cas de déclenchement :
- LED jaune 5 secondes → en 2-6 semaines
- LED rouge 30 sec. → **immédiat**
- Bip du bip WiPro pendant le fonctionnement de l'émetteur → Batterie faible

**Doit-il être recyclé après avoir changé la batterie ?**
**Non** — la station est toujours connue.

**Si une télécommande sans fil ou une boucle de câble signale « batterie faible » : changez uniquement cette cellule ?**
Mieux vaut pas. Le support recommande de **remplacer les piles bouton d'un âge similaire en tant que groupe**, car d'autres composants CR2032 s'affaiblissent souvent également peu de temps après.

**Pourquoi la batterie de démarrage est-elle vide après une longue période d'inactivité ?**
Il n'y a pas que le système d'alarme qui compte : les composants THITRONIK, la charge de base du véhicule et l'autodécharge s'additionnent. Cela devient critique après quelques semaines, surtout si la batterie est faible ou petite. → [[Alimentation électrique & temps d'immobilisation — courant de repos, sous-tension et pratique de charge]]

**Quelle est approximativement la valeur du courant de repos THITRONIK ?**
La valeur indicative du support est d'env. **11 mA** pour WiPro III safe.lock et env. **16-25 mA** pour le Pro-Finder ; Ensemble, cela signifie environ **27-36 mA** — hors consommation du véhicule. → [[Alimentation électrique & temps d'immobilisation — courant de repos, sous-tension et pratique de charge]]

→ [[Détecteur d'eau sans fil 868 — détecteur d'eau sans fil]] (« Batterie / Entretien »)

---

## Apprentissage, perturbations, compatibilité

**Comment puis-je apprendre de nouveaux composants radio ?**
Activer mode d'apprentissage (bouton "B" sur la carte WiPro → bip long), déclencher l'émetteur, terminer mode d'apprentissage. Jusqu'à **100 chaînes** possibles. → [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]]

**Comment supprimer tous les composants entraînés ?**
La suppression partielle conserve uniquement la première télécommande maître. La suppression totale efface tous les émetteurs ; mémorisez ensuite d’abord une télécommande, puis les autres composants. La suppression via CAN est impossible.

**WiPro ne reconnaît pas le contact magnétique malgré l'apprentissage ?**
Direction de la LED incorrecte : la LED doit pointer **loin de l'aimant**. → [[Dépannage — diagnostic sûr des problèmes fréquents]]

**Garage arrière - contact peu fiable ?**
Le métal souterrain amortit la radio. Utilisez l'adaptateur de montage article 100428 (noir) / 100729 (blanc).

**Quel véhicule a quel CAN-Bus ?**
Tableau complet avec [[Glossaire — Termes techniques du système THITRONIK]], couleurs des câbles et informations spécifiques au véhicule : → [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]

**Tout sur le processus d'apprentissage :** → [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]]
**Tout sur les dysfonctionnements :** → [[Dépannage — diagnostic sûr des problèmes fréquents]]

---

## Références croisées

- [[Supports d’accès et commande — voies d’accès dans le système THITRONIK]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
- [[Glossaire — Termes techniques du système THITRONIK]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]]
