---
title: 'Mercedes Sprinter VS30 (BR907/910, depuis 2018)'
sources:
  - sources/wipro_iii_mercedes_sprinter_vs30_01.pdf
  - >-
    sources/Einbauhandbuch_WiPro III safe.lock_Art.Nr.105458(Mercedes Sprinter
    VS30)_Rev 1.0_DE.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
translation_of: de/fahrzeuge/mercedes-sprinter-vs30.md
updated: '2026-07-20'
confidence: high
lang: fr
---

# Mercedes Sprinter VS30 (BR907/910, depuis 2018)

Cet article décrit l'installation d'une WiPro III ou d'une WiPro III safe.lock dans le Mercedes Sprinter VS30 BR907/BR910 à partir de 2018. La notice standard de `03/23` et la notice safe.lock plus récente de `01/24`, rév. `1.0`, documentent deux profils DIP distincts ainsi que le calculateur de carrosserie, les clignotants, le CAN, l'allumage, l'alimentation, les sirènes, les emplacements de montage, les accessoires radio et le contrôle final.

> **Délimitation :** ne mélangez jamais le profil DIP ni la commande de verrouillage centralisé de la WiPro III standard et du kit safe.lock `105458`. La génération du véhicule, le type de phare, le calculateur, le connecteur, la broche, la couleur du fil et la version de l'appareil doivent tous correspondre à la notice choisie.

## Champ d'application

| Caractéristique | WiPro III standard | WiPro III safe.lock |
|---|---|---|
| Véhicule | Mercedes Sprinter VS30, BR907/BR910, depuis 2018 | Mercedes Sprinter VS30, BR907/BR910, depuis 2018 |
| Source véhicule | état `03/23` | état `01/24`, rév. `1.0` |
| Base appareil documentée | WiPro III dès logiciel `V6.8` | kit réf. `105458`, dès SN `5458-001`, logiciel `1.0.0sx` |
| Profil DIP de base | `SW4 + SW6 ON`, tous les autres `OFF` | `SW1–SW8 OFF` |
| Commande | clé radio d'origine du véhicule | clé du véhicule et, en mode camping, accessoires THITRONIK avec commande de verrouillage |
| Phares ILS/LED | commande numérique des clignotants obligatoire | commande numérique des clignotants obligatoire |
| Alarme sonore | sirène supplémentaire ou sirène de secours recommandée | sirène supplémentaire ou sirène de secours recommandée |

La matrice projet validée ajoute pour la version standard le seuil `0823-019 / 6.8` et, pour l'exploitation des quatre clés du véhicule, `0823-034`. Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]] et [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Hiérarchie des sources et anciennes indications corrigées

| Sujet | Décision relative aux sources |
|---|---|
| DIP standard | notice véhicule `03/23` : uniquement `SW4 + SW6 ON` |
| DIP safe.lock | notice véhicule `01/24` : tous les interrupteurs `1–8 OFF` |
| Verrouillage safe.lock | uniquement au module de porte conducteur, connecteur 5 bleu, broche 4, fil véhicule jaune ; l'ancienne indication « connecteur BC blanc, broche 1 » n'est étayée par aucun PDF et a été supprimée |
| Clignotants ILS | rouge/rose via `220 Ω` vers broche 14 jaune/rouge ; débrocher ou isoler séparément les quatre fils gris WiPro |
| Sirène | sirène réf. `100190` ou sirène de secours réf. `100089` recommandée, mais non imposée comme condition de validation |
| Alternative d'allumage `F61` | citée uniquement dans une note Word interne absente ; non reprise comme raccordement prouvé |
| Cas des carrossiers | mode camping Hymer, Eura-Mobil, sièges à mémoire et autres anciennes indications proviennent de notes Word absentes ; ne pas en déduire d'instruction |
| PSM | cité dans l'ancien fonds, mais non documenté comme voie de raccordement dans les PDF contrôlés ; supprimé |

`Mercedes.docx`, `Fahrzeugbesonderheiten.docx` et `WiPro III 8 safe.lock.docx` ne sont pas présents localement et ne servent donc pas de preuve. En cas de contradiction, la notice correspondant à l'appareil réellement monté s'applique ; pour safe.lock, la notice la plus récente prévaut.

## Sécurité et contrôle du véhicule

- Les travaux électriques et électroniques doivent être réalisés par un atelier qualifié.
- Avant toute intervention, débranchez le pôle négatif de la batterie et les batteries auxiliaires selon les prescriptions du constructeur ; tenez compte du code radio et des données volatiles.
- Avant d'ouvrir la centrale ou de modifier les DIP, débranchez toutes les alimentations et tous les connecteurs supplémentaires.
- Isolez séparément les entrées et sorties inutilisées contre les courts-circuits.
- Protégez les câbles contre le frottement, la chaleur et les efforts mécaniques ; ne gênez ni pédales, ni direction, ni airbags, ni fonctions du véhicule.
- Avant chaque raccordement, contrôlez sur le véhicule le connecteur, la broche, la couleur, la tension et la fonction.
- Si l'équipement, un fil ou le brochage diffère, interrompez le travail et consultez le constructeur ou l'assistance THITRONIK.

Avant de commencer, contrôlez et consignez :

1. S'agit-il bien d'un VS30/BR907/BR910 à partir de 2018 ?
2. Disposez-vous d'une WiPro III standard ou du kit safe.lock réf. `105458` ?
3. Le numéro de série et le logiciel correspondent-ils à la version prévue ?
4. Le véhicule possède-t-il des phares ILS/LED ?
5. La télécommande, le verrouillage, l'éclairage intérieur et tous les clignotants fonctionnent-ils ?
6. Les portes d'origine sont-elles affichées au combiné lorsque le contact est mis ?
7. Quelles portes et trappes de cellule sont réellement détectées par le CAN ?
8. Existe-t-il des témoins, défauts mémorisés ou autres anomalies électriques ?

## Régler la version de l'appareil et le profil DIP

| Version | État minimal selon la source véhicule | Profil DIP |
|---|---|---|
| WiPro III standard | logiciel `V6.8` | `SW4 + SW6 ON` ; `SW1`, `SW2`, `SW3`, `SW5`, `SW7`, `SW8 OFF` |
| Kit WiPro III safe.lock | réf. `105458`, SN `5458-001`, logiciel `1.0.0sx` | `SW1–SW8 OFF` |
| Standard, quatre clés | matrice projet : dès `0823-034` | conserver `SW4 + SW6` |
| Correctif safe.lock | registre projet : dès `5458-006 / 1.2.0sx` | aucun autre DIP véhicule documenté |

1. Relevez et consignez référence, numéro de série et version logicielle.
2. Mettez la centrale entièrement hors tension.
3. Ouvrez prudemment le boîtier.
4. Pour la WiPro III standard, placez uniquement `SW4` et `SW6` sur `ON`.
5. Pour le kit safe.lock `105458`, placez tous les interrupteurs `SW1–SW8` sur `OFF`.
6. Comparez de nouveau la position des interrupteurs avec la version de l'appareil.
7. Refermez le boîtier avant de poursuivre l'installation.

> **Risque de confusion :** dans la notice standard, `SW6` active aussi la fonction sonore/silencieuse de l'émetteur. Cette indication ne doit pas être transférée au profil safe.lock.

## Dégager la planche de bord et le calculateur de carrosserie

1. Retirez les tapis, le couvercle de l'outillage de bord et le tapis en caoutchouc.
2. Sortez l'outillage de bord.
3. Dégagez la batterie de démarrage au plancher, son couvercle et la boîte à fusibles côté passager.
4. Déposez le petit habillage au bas du montant A passager.
5. Vérifiez si le calculateur blanc est visible à droite de la boîte à fusibles.
6. Sinon, cherchez-le sous le tunnel central entre les deux pieds.
7. Pour le tunnel, retirez les deux vis des languettes inférieures et déclipsez le couvercle.
8. Pour la variante du montant A, déposez le couvercle supérieur, la vis, le rivet expansible et la fixation du tapis.
9. Tirez l'habillage hors de la languette inférieure et retirez-le.
10. Photographiez câbles et connecteurs avant de poursuivre.

## Raccorder les clignotants analogiques et le CAN au calculateur

Cette affectation vaut pour les véhicules sans raccordement numérique ILS. Tous les raccordements se trouvent au calculateur, quel que soit son emplacement.

| Fil WiPro | Connecteur Mercedes | Broche | Fil Mercedes | Fonction |
|---|---|---|---|---|
| gris | RBA1 blue, bleu | 12 | noir/blanc | clignotant arrière gauche |
| gris | RBA2 white, blanc | 61 | noir/vert | clignotant arrière droit |
| gris | MR1 purple, violet | 1 | noir/blanc | clignotant avant gauche |
| gris | MR2 white, blanc | 5, **pas 36** | noir/vert ou noir/gris | clignotant avant droit |
| violet/orange | Stem white | 7 ; sinon 5 si 7 libre | brun | CAN-Low |
| blanc/orange | Stem white | 17 ; sinon 15 si 17 libre | brun/rouge | CAN-High |

1. Identifiez clairement le calculateur et tous les connecteurs indiqués.
2. Vérifiez désignation et broche avant chaque dérivation.
3. Reliez les quatre fils gris aux quatre fils de clignotants documentés.
4. Distinguez explicitement la broche `5` de MR2 de la broche erronée `36`.
5. Reliez CAN-Low violet/orange à Stem white, broche `7`, brun.
6. Uniquement si la broche 7 est libre, utilisez l'alternative documentée `5` du Stem white.
7. Reliez CAN-High blanc/orange à Stem white, broche `17`, brun/rouge.
8. Uniquement si la broche 17 est libre, utilisez l'alternative documentée `15`.
9. Soulagez mécaniquement et isolez les raccordements.

> **Numéro en double :** MR2 broche `5` pour le clignotant avant droit et Stem white broche `5` comme alternative CAN sont deux connecteurs différents. Ne travaillez jamais d'après le seul numéro.

## Commander numériquement les phares ILS/LED

Avec des phares ILS/LED, les clignotants avant ne doivent pas être commandés par les quatre sorties grises de puissance. La variante numérique commande les quatre clignotants ensemble.

| Côté WiPro | Composant | Côté Mercedes | Fonction |
|---|---|---|---|
| rouge/rose | résistance `220 Ω` en série | connecteur blanc à verrou gris, broche 14, jaune/rouge | commande numérique de tous les clignotants |
| quatre fils gris | inutilisés | — | débrocher ou isoler séparément |

1. Confirmez la présence des phares ILS/LED sur le véhicule.
2. Montez la résistance `220 Ω` sur le fil rouge/rose WiPro.
3. Identifiez clairement le connecteur blanc à verrou gris.
4. Raccordez-le à la broche `14`, jaune/rouge.
5. Débrochez ou isolez séparément les quatre fils gris WiPro.
6. Après mise en service, contrôlez tous les clignotants ensemble.

La résistance `220 Ω` est comprise dans le kit safe.lock selon la notice ; elle n'était pas fournie avec la version standard.

## Raccorder l'allumage

| Fil WiPro | Point Mercedes | Fil Mercedes | Fonction |
|---|---|---|---|
| jaune | porte-fusibles gris, quatrième fusible depuis le bas | noir/rouge | borne 15 / allumage |

1. Identifiez le porte-fusibles gris dans le plancher passager.
2. Localisez le quatrième fusible depuis le bas.
3. Mesurez le fil noir/rouge avant raccordement.
4. Raccordez correctement le fil jaune WiPro.
5. Vérifiez si, selon l'équipement, une impulsion de contrôle déclenche un « vent check ».
6. En cas de problème, utilisez un autre point d'allumage identifié sans ambiguïté par mesure ; les sources ne donnent pas de broche alternative fixe.

## Raccorder le verrouillage centralisé safe.lock

Cette section s'applique uniquement au kit WiPro III safe.lock réf. `105458`. La WiPro III standard ne dispose pas de ce raccordement spécifique.

| Composant Mercedes | Connecteur / broche | Fil Mercedes | Fil WiPro | Fonction |
|---|---|---|---|---|
| module de porte conducteur | connecteur 5 bleu, broche 4 | jaune | bleu/noir | commande de verrouillage safe.lock |

1. Déposez correctement l'habillage de porte conducteur.
2. Dégagez le module de porte conducteur.
3. Identifiez sans ambiguïté le connecteur bleu `5` et la broche `4`.
4. Contrôlez électriquement le fil jaune du véhicule.
5. Raccordez le fil bleu/noir safe.lock à l'aide d'un connecteur gel.
6. Utilisez le passage de câble existant du montant A vers la porte.
7. Protégez le câble contre le mouvement, le pincement et le frottement.
8. Si module, connecteur ou fil jaune manque, n'improvisez aucune affectation issue de l'ancien fonds ; demandez une validation au support.

## Tenir compte de l'alimentation et de l'hibernation

| Raccordement | Fil WiPro | Point véhicule | Prescription |
|---|---|---|---|
| borne 30 | rouge | directement au pôle positif de batterie | protéger par `10 A` |
| borne 31 | noir | pôle négatif ou masse vérifiée près du calculateur | masse permanente |
| borne 30T | rouge, seulement comme alternative choisie | point commuté du véhicule | WiPro s'éteint puis redémarre désarmée |

1. Retirez le couvercle de batterie et rendez les deux pôles accessibles.
2. Reliez le fil rouge directement au pôle positif par un fusible de `10 A`.
3. Reliez le fil noir au pôle négatif ou à une masse contrôlée près du calculateur.
4. Fixez correctement les cosses et protégez-les contre le desserrage.
5. N'utilisez 30T que si le comportement d'arrêt et de redémarrage désarmé est accepté.
6. Remesurez l'alimentation après tous les états d'économie d'énergie.
7. Tenez compte du mode Hibernation de MBUX : il peut désactiver une partie du CAN et limiter l'alarme.
8. Informez le client des conséquences de 30T et de l'hibernation.

L'alimentation directe aux pôles empêche la coupure de la WiPro, mais ne remplace pas une communication CAN désactivée par l'hibernation.

## Monter la LED d'état

1. Convenez de la position de la LED avec le client.
2. Contrôlez la zone derrière le point de perçage.
3. Dévissez les trois vis inférieures de l'habillage et déclipsez-le.
4. Percez un trou de `8 mm`.
5. Insérez la LED d'état.
6. Reliez le câble rouge/noir à connecteur blanc au faisceau WiPro correspondant.
7. Posez le fil sans traction et contrôlez la LED après mise en service.

## Raccorder une sirène supplémentaire ou de secours

Le klaxon n'a pas de plus permanent contact coupé et ne peut pas être commandé directement ici. Les deux notices recommandent la sirène réf. `100190` ou la sirène de secours réf. `100089` ; un klaxon supplémentaire conforme à sa propre notice reste possible.

| Version | Raccordement WiPro | Avertisseur |
|---|---|---|
| sirène supplémentaire | broche 15, blanc | rouge de la sirène |
| sirène supplémentaire | broche 16, blanc/noir | noir de la sirène |
| sirène de secours | broche 11 / `+12 V` | rouge de la sirène |
| sirène de secours | broche 15, blanc | blanc de la sirène |
| sirène de secours | masse véhicule | noir de la sirène |
| sirène de secours | inutilisé | isoler le bleu |

1. Choisissez l'avertisseur et préparez sa propre notice.
2. Utilisez un passage de câble approprié dans la zone moteur documentée.
3. Fixez l'avertisseur sur une tôle prépercée, à l'abri de la chaleur, de l'eau et des pièces mobiles.
4. Raccordez la variante choisie selon le tableau.
5. Isolez séparément tout fil inutilisé.
6. Testez séparément l'avertisseur sonore.

Voir [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]] et [[Registre des numéros d’article — produits et accessoires THITRONIK documentés|Registre des numéros d’article]].

## Monter la WiPro et le Pro-finder en option

La WiPro et le Pro-finder optionnel peuvent être installés sous le vide-poches entre l'airbag passager et le pare-brise. Le véhicule possède un vide-poches fermé ou ouvert.

1. Pour un vide-poches fermé, ouvrez-le.
2. Retirez deux vis Torx et déclipsez la pièce vers le haut.
3. Pour un vide-poches ouvert, déclipsez le cache du tweeter.
4. Retirez dessous la vis Torx de la baguette étroite.
5. Déclipsez la baguette et retirez les deux autres vis.
6. Déclipsez la pièce vers le haut.
7. Fixez la WiPro et, le cas échéant, le Pro-finder à gauche ou à droite sous le vide-poches.
8. Gardez une distance suffisante des airbags, zones de frottement et pièces mobiles.
9. Montez les appareils accessibles pour l'entretien, mais non directement depuis l'extérieur.
10. Ne raccourcissez ni n'enroulez les antennes et ne les placez pas derrière du métal faisant écran.

Pour le module de localisation optionnel, voir [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]].

## Programmer les accessoires radio

1. Préparez tous les accessoires marqués `868` avant le montage définitif.
2. Maintenez la touche à droite du connecteur WiPro jusqu'au bip et à l'allumage fixe de la LED.
3. Déclenchez deux à trois fois chaque contact, émetteur, détecteur de gaz et boucle radio.
4. Pour programmer un contact, séparez aimant et émetteur de plus de `30 mm`.
5. Confirmez l'enregistrement par le bip et la brève extinction de la LED.
6. Quittez le mode par une brève coupure d'alimentation ou un bref appui.
7. Vérifiez que la mémoire non volatile conserve les émetteurs après coupure.
8. Si un effacement est requis, notez que la procédure documentée concerne la mémoire radio.

Voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Monter les contacts magnétiques radio

Pour les contacts réf. `100757` et `100758` :

1. Alignez le boîtier de l'émetteur avec cadre, store et fenêtre.
2. Placez la carte de sorte que la LED d'émission soit orientée à l'opposé de l'aimant.
3. Évitez l'orientation inverse : la programmation fonctionne alors, mais pas l'alarme.
4. Placez l'aimant dans la plage `22–30 mm` et pas au-delà de la limite rouge.
5. Contrôlez réception et fonction à l'emplacement prévu avant collage.
6. Nettoyez, séchez et dégraissez la surface.
7. Ne collez pas sous `15 °C` et attendez environ `24 heures` pour la résistance finale.
8. En cas d'écart trop grand ou d'antenne défavorable, utilisez l'adaptateur réf. `100428` ou `100729`.
9. Si les adhésifs ne conviennent pas, vissez uniquement aux repères prévus du boîtier.
10. Testez individuellement chaque contact après montage définitif.

Autres informations : [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

## Logique de commande et contrôle fonctionnel final

Avec la WiPro III standard, la clé radio d'origine arme au verrouillage et désarme au déverrouillage. En mode camping, safe.lock peut en plus commander le verrouillage avec l'émetteur THITRONIK, le module NFC, le Pro-finder ou le module Bluetooth.

> **Protection contre l'enfermement :** après un verrouillage avec la clé d'origine, la notice safe.lock indique que seule cette clé peut rouvrir le véhicule, pas un accessoire THITRONIK. Ne laissez jamais la clé dans le véhicule.

1. Contrôlez raccordements, fusible, masse et profil DIP correspondant à l'appareil.
2. Fermez les portes d'origine et tous les contacts de cellule.
3. Verrouillez avec la clé radio et contrôlez armement, LED et clignotants.
4. Déverrouillez avec la clé radio et contrôlez le désarmement.
5. Avec safe.lock en mode camping, verrouillez et déverrouillez avec chaque commande THITRONIK prévue.
6. Confirmez que l'émetteur commute ensemble état d'alarme et verrouillage.
7. Appuyez environ `1 seconde` sur les deux touches et contrôlez l'alarme panique.
8. Arrêtez l'alarme avec une touche ou la touche d'ouverture de la clé du véhicule.
9. Ouvrez séparément chaque porte d'origine et chaque contact lorsque le système est armé.
10. Armez avec un contact ouvert et contrôlez ventilation et exclusion du contact.
11. Fermez le contact et contrôlez sa réactivation après environ `4 secondes`.
12. Préchauffez le détecteur de gaz environ `4 minutes` et testez-le selon sa notice.
13. Testez la boucle radio en la retirant de son support.
14. Contrôlez complètement la commande analogique à quatre voies ou numérique ILS.
15. Contrôlez la sirène supplémentaire ou de secours avec une alarme réelle.
16. Testez hibernation et économies d'énergie de façon contrôlée, puis reconfirmez l'état opérationnel.
17. Vérifiez qu'aucun nouveau témoin, défaut d'éclairage ou code défaut n'est apparu.
18. Remontez les habillages dans l'ordre inverse et complétez la documentation client.

## Diagnostic des défauts

| Symptôme | Contrôle et mesure |
|---|---|
| Aucune réaction à la clé | contrôler version, logiciel, DIP, CAN 7/17 ou alternatives 5/15 et couleurs CAN |
| Seuls certains clignotants fonctionnent | sans ILS contrôler les quatre fils RBA1/RBA2/MR1/MR2 ; ne pas confondre MR2 broche 5 et 36 |
| Défaut clignotant avec ILS | contrôler rouge/rose, `220 Ω`, broche 14 jaune/rouge et fils gris isolés |
| « vent check » ou impulsion indésirable | mesurer le raccordement au quatrième fusible et choisir au besoin une autre borne 15 clairement mesurée |
| safe.lock ne verrouille pas | contrôler connecteur 5 bleu, broche 4, fil jaune et fil WiPro bleu/noir au module de porte |
| Accessoire THITRONIK ne déverrouille pas après la clé d'origine | logique safe.lock documentée ; déverrouiller avec la clé d'origine |
| WiPro éteinte ou désarmée après stationnement | contrôler utilisation de 30T et coupure par un état d'économie |
| Alimentation présente, aucune réaction CAN | contrôler hibernation, activité CAN et raccordement ; l'alimentation directe ne remplace pas un CAN coupé |
| Klaxon muet | comportement attendu sans contact ; contrôler la sirène ou le klaxon supplémentaire installé |
| Contact radio non reconnu | contrôler programmation, orientation, distance, antenne et écran métallique |
| Véhicule, connecteur ou fil différent | interrompre le travail et obtenir l'autorisation spécifique du constructeur ou du support THITRONIK |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Décision relative aux sources

- La notice standard de 14 pages *WiPro III – Mercedes Sprinter VS30*, état `03/23`, a été contrôlée intégralement par extraction de texte et examen visuel.
- La notice safe.lock de 14 pages pour le kit réf. `105458`, état `01/24`, rév. `1.0`, a également été contrôlée intégralement et prévaut pour cette version.
- Le profil standard `SW4 + SW6` et le profil safe.lock `SW1–SW8 OFF` sont documentés séparément.
- Les deux sources confirment les variantes de calculateur, clignotants, CAN, allumage, batterie directe, hibernation, LED `8 mm`, sirènes, emplacement, accessoires radio et valeurs des contacts.
- La source safe.lock récente ajoute la commande de verrouillage uniquement au module de porte conducteur, connecteur 5 bleu, broche 4.
- `0823-019`, `0823-034` et `5458-006 / 1.2.0sx` sont identifiés comme matrice et registre projet validés, et non comme contenu du PDF véhicule `01/24`.
- Les notes Word absentes n'ont pas servi de preuve ; les instructions relatives aux carrossiers, sièges confort, PSM et `F61` ont été supprimées.

## Références croisées

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Registre des numéros d’article — produits et accessoires THITRONIK documentés|Registre des numéros d’article]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]
- [[Module NFC — commande de la WiPro via NFC|Module NFC]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006-2018)|Mercedes Sprinter NCV3 / VW Crafter]]
- [[Mercedes Benz Vito W447 (2014-06/2023)|Mercedes Benz Vito W447]]
