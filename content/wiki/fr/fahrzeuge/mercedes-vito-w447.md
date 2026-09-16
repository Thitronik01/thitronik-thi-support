---
title: Mercedes Benz Vito W447 (2014-06/2023)
sources:
  - sources/WiPro III Mercedes Vito W447 2014+.idml
  - sources/wipro_iii-installationsanleitung_1.8.pdf
translation_of: de/fahrzeuge/mercedes-vito-w447.md
updated: '2026-07-20'
confidence: high
lang: fr
---

# Mercedes Benz Vito W447 (2014-06/2023)

Cet article décrit l'installation d'une WiPro III dans les Mercedes-Benz Vito et Classe V W447 de 2014 à 06/2023 inclus. Il combine la source véhicule `04/20`, la matrice projet validée et le manuel général version `1.8`, avec une délimitation claire des sources.

> **Limite :** cette validation ne couvre pas automatiquement les véhicules postérieurs à `06/2023`, les calculateurs ou connecteurs différents, ni WiPro III safe.lock. Contrôler équipement, connecteur, couleur, tension et fonction sur le véhicule réel.

## Champ d'application et versions

| Caractéristique | Base validée |
|---|---|
| Véhicule | Mercedes-Benz Vito / Classe V W447 |
| Période | 2014-06/2023 selon la matrice projet |
| Source véhicule | manuel IDML `04/20`, métadonnées modifiées le 04.11.2020 |
| Kit documenté | kit WiPro réf. `100754` ; vérifier statut et contenu avant commande |
| Numéro de série minimum | `0823-014` selon la source véhicule |
| Base logicielle | `6.2`, complément de la matrice projet |
| Profil projet actuel | `SW1 + SW3 + SW4 + SW6 ON` ; `SW2`, `SW5`, `SW7`, `SW8 OFF` |
| Phares ILS/LED | raccorder uniquement les clignotants arrière ; les avant ne sont pas commandables |
| Alarme sonore | sirène supplémentaire ou de secours dans le moteur vivement recommandée |

Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]] et [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Priorité des sources et corrections

| Sujet | Décision |
|---|---|
| Raccordements | l'IDML *WiPro III Mercedes Vito W447 2014+* `04/20` est la source primaire |
| DIP | l'IDML indique `SW1 + SW3 + SW4` ; la matrice validée ajoute `SW6` et constitue le profil projet actuel |
| Logiciel `6.2` | provient de la matrice, pas de l'IDML |
| Désignation CAN | blanc/orange = broche 17 / CAN-High ; violet/orange = broche 18 / CAN-Low ; ancienne inversion corrigée |
| Connecteur M | brun selon l'IDML, pas violet ; fil noir/blanc, pas noir/gris |
| Broches de clignotants | connecteurs et couleurs seulement ; aucune broche n'est reconstruite |
| ILS avant/arrière | seuls les arrière sont autorisés, mais le texte ne distingue pas les couleurs en double ; identifier par mesure |
| Réf. `100754` | citée comme kit, non confirmée comme article généralement commandable dans le registre |
| Sources absentes | `WiiPro III 1.docx` et `FAQ_WiPro-III_DE.md` sont absents et ne servent pas de preuve |

Une ligne IDML comporte la coquille « W477 » ; fichier, couverture et reste du texte confirment W447. Les photos, PSD et TIFF liés sont absents. Les valeurs ci-dessous figurent néanmoins dans les textes ou tableaux ; aucune broche dépendant d'une image n'est ajoutée.

## Sécurité et contrôle du véhicule

- Les travaux électriques doivent être réalisés par un atelier qualifié.
- Débrancher le négatif et les batteries auxiliaires selon le constructeur ; tenir compte du code radio et des données volatiles.
- Avant ouverture ou modification des DIP, débrancher connecteur 20 broches, alimentation et Pro-Finder optionnel.
- Isoler séparément les entrées et sorties inutilisées.
- Protéger les câbles contre frottement, chaleur, vibration et traction ; ne gêner ni pédales, ni direction, ni airbags.
- Ne jamais choisir un raccordement d'après la seule couleur ; contrôler aussi connecteur, tension et fonction.
- En cas d'écart, arrêter et consulter le constructeur ou l'assistance THITRONIK.

Avant de commencer, contrôler et consigner :

1. S'agit-il bien d'un Vito ou Classe V W447 de 2014-06/2023 ?
2. Référence, numéro de série et logiciel correspondent-ils à la version prévue ?
3. Le numéro de série est-il au moins `0823-014` ?
4. Le véhicule possède-t-il des phares ILS/LED ?
5. Télécommande, verrouillage, éclairage intérieur et tous les clignotants fonctionnent-ils ?
6. Les portes de cabine sont-elles affichées contact mis ?
7. Quelles portes et trappes de cellule sont réellement détectées par CAN ?
8. Existe-t-il des témoins, défauts mémorisés ou anomalies électriques ?

## Régler le profil et les DIP

| Réglage | Position | Signification |
|---|---|---|
| Profil Vito actuel | `SW1 + SW3 + SW4 + SW6 ON` | profil de la matrice projet validée |
| Autres commutateurs | `SW2`, `SW5`, `SW7`, `SW8 OFF` | aucune fonction générale supplémentaire |
| IDML véhicule `04/20` | `SW1 + SW3 + SW4 ON` | texte plus ancien sans mention de `SW6` |
| Protection anti-rejeu optionnelle | ajouter `SW5 ON` dès `0823-014 / 5.8` | la clé d'origine ne commande plus WiPro ; détection des portes conservée |

1. Relever référence, numéro de série et logiciel.
2. Mettre la centrale hors tension et débrancher les connecteurs supplémentaires.
3. Ouvrir prudemment le boîtier.
4. Pour le profil validé, placer `SW1`, `SW3`, `SW4` et `SW6` sur `ON`.
5. Laisser `SW2`, `SW5`, `SW7` et `SW8` sur `OFF`.
6. N'activer `SW5` qu'après décision explicite et mise en place d'une autre commande.
7. Si la documentation de l'appareil diffère pour `SW6`, ne pas deviner ; demander la validation THITRONIK actuelle.
8. Photographier les DIP, fermer le boîtier puis poursuivre.

> **Important :** `SW5` n'est pas un commutateur safe.lock général. Avec `SW5 ON`, la clé radio d'origine n'arme ni ne désarme la WiPro III.

## Dégager la planche de bord et la boîte à gants

1. Mettre le véhicule hors tension et protéger la zone.
2. Déclipser prudemment le cache latéral de planche de bord.
3. Déclipser l'habillage du montant A dans le plancher passager.
4. Retirer les six vis Torx `T20` de la boîte à gants.
5. Retirer la boîte sans charger câbles ni éléments d'airbag.
6. Dégager le répartiteur CAN près du montant A vu depuis le plancher passager.
7. Identifier le calculateur de carrosserie au montant A droit et la boîte à fusibles.
8. Photographier câbles et connecteurs avant dérivation.

## Raccorder et diagnostiquer le CAN

| Fil véhicule | Fil WiPro | Broche WiPro | Signal |
|---|---|---|---|
| brun/rouge | blanc/orange | 17 | CAN-High |
| brun | violet/orange | 18 | CAN-Low |

1. Identifier clairement le répartiteur CAN du montant A.
2. Vérifier brun/rouge et brun comme paire CAN avant raccordement.
3. Relier brun/rouge à blanc/orange, broche `17`.
4. Relier brun à violet/orange, broche `18`.
5. Utiliser des connecteurs remplis de gel et soulager les fils.
6. Activer le diagnostic par bref appui sur la touche près du connecteur, puis actionner clé ou feux de détresse.
7. Si la LED ne scintille pas avec le trafic CAN, contrôler les raccordements et exclure une inversion High/Low.

## Raccorder les clignotants analogiques

La source utilise un répartiteur à diodes pour quatre fils. Les sorties WiPro sont les broches `12` et `14` ; la réf. `100455` les répartit sur quatre fils du véhicule. Vérifier sa présence dans le kit réel.

| Connecteur calculateur | Fil véhicule | Côté WiPro | Affectation |
|---|---|---|---|
| A, bleu | noir/blanc | gris du répartiteur | fil 1 |
| A, bleu | noir/vert | gris du répartiteur | fil 2 |
| M, brun | noir/blanc | gris du répartiteur | fil 3 |
| M, brun | noir/vert | gris du répartiteur | fil 4 |

1. Identifier clairement le calculateur au montant A droit.
2. Vérifier connecteur A bleu et connecteur M brun par désignation et forme.
3. Identifier le répartiteur réf. `100455` et ses quatre sorties grises.
4. Raccorder les deux fils du connecteur A selon le tableau.
5. Raccorder les deux fils du connecteur M selon le tableau.
6. Ne reprendre aucune broche d'une autre série Mercedes.
7. Avec ILS/LED, ne raccorder que les deux fils mesurés sans ambiguïté comme clignotants arrière.
8. Isoler séparément les fils avant inutilisés.
9. Tester chaque côté et surveiller les défauts du véhicule.

> **Avertissement ILS :** les clignotants avant ne sont pas commandables. Noir/blanc et noir/vert apparaissant deux fois, ne jamais distinguer avant et arrière par la seule couleur.

## Raccorder alimentation, allumage et masse

| Fonction | Point véhicule | Fil véhicule | Fil / broche WiPro |
|---|---|---|---|
| borne 30 | goujon `M6` dans boîte à fusibles | — | rouge, broche `11`, via `10 A` |
| borne 15 | bas arrière de boîte à fusibles | noir/rose | jaune, broche `7` |
| borne 31 | masse au montant A | — | noir, broche `1`, cosse annulaire |

1. Libérer et basculer la boîte à fusibles sans tirer sur ses fils.
2. Mesurer noir/rose en bas arrière comme plus après contact.
3. Raccorder le jaune avec une section minimale de `1 mm²`.
4. Fixer le rouge directement au goujon `M6` par cosse annulaire.
5. Protéger près du point de prise avec le porte-fusible fourni et `10 A`.
6. Fixer le noir à la masse vérifiée du montant A.
7. Protéger cosses contre desserrage et fils contre traction ou frottement.
8. Remesurer permanent, allumage et chute de tension sous charge avant remontage.

## Raccorder une sirène supplémentaire ou de secours

Le klaxon n'est pas alimenté contact coupé et ne convient pas à la commande directe. La source recommande vivement une sirène dans le moteur ; un passage existe côté conducteur près de la tirette de capot.

| Version | Raccordement WiPro | Avertisseur |
|---|---|---|
| sirène normale | broche `15`, blanc | rouge |
| sirène normale | broche `16`, blanc/noir | noir |
| sirène de secours | plus permanent | rouge |
| sirène de secours | masse véhicule | noir |
| sirène de secours | broche `15`, blanc | blanc, déclenchement positif |
| sirène de secours | inutilisé | isoler le bleu |

1. Choisir la variante et préparer sa notice.
2. Contrôler le passage de cloison près de la tirette de capot.
3. Monter l'avertisseur à l'abri de chaleur, eau et pièces mobiles.
4. Pour la sirène normale, relier blanc à rouge et blanc/noir à noir.
5. Alimenter en permanence la sirène de secours par rouge et noir.
6. Relier son blanc au blanc WiPro, broche `15`.
7. Isoler son fil bleu de déclenchement négatif.
8. Sécuriser les fils et tester par une alarme réelle.

Voir [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]] et [[Registre des numéros d’article — produits et accessoires THITRONIK documentés|Registre des numéros d’article]].

## Monter la LED d'état

1. Convenir de la position avec le client.
2. Contrôler derrière le perçage câbles, airbag et espace libre.
3. Protéger la surface et repérer le trou.
4. Percer à `8 mm`.
5. Insérer la LED.
6. Relier son câble rouge/noir à fiche blanche au faisceau WiPro.
7. Poser sans traction et tester dans tous les états.

## Monter la centrale et le Pro-Finder optionnel

La source montre la dépose côté passager, sans imposer un point de collage unique. Choisir un emplacement adapté dans la zone dégagée.

1. Choisir un point sec, accessible au service et non directement de l'extérieur.
2. Garder une distance des airbags, chauffage, pièces mobiles et arêtes.
3. Placer près de l'électronique pour raccourcir les câbles.
4. Utiliser les adhésifs fournis et fixer en plus les brides plastique au boîtier.
5. Poser sans traction ; n'enrubanner définitivement qu'après le test réussi.
6. Ne pas raccourcir, enrouler ni placer les antennes derrière du métal.

Pour le module de localisation, prévoir montage, alimentation et masse au même moment ; voir [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]].

## Programmer les accessoires radio

1. Préparer tous les accessoires marqués `868` avant le montage définitif.
2. Brancher le connecteur 20 broches et maintenir la touche voisine jusqu'au bip et à l'allumage fixe de la LED.
3. Déclencher deux ou trois fois chaque contact, émetteur, détecteur de gaz et boucle.
4. Séparer aimant et émetteur de plus de `30 mm`.
5. Confirmer l'enregistrement par bip et brève extinction de la LED.
6. Quitter par bref appui ou courte coupure d'alimentation.
7. Tester chaque émetteur et sa conservation après coupure.
8. Noter que la procédure d'effacement retire tous les composants radio ensemble.

Voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Monter les contacts magnétiques radio

Pour les contacts réf. `100757` noir et `100758` blanc :

1. Aligner le boîtier avec cadre, porte ou trappe.
2. Insérer la carte avec LED d'émission opposée à l'aimant.
3. Éviter l'orientation inverse : programmation possible, mais pas d'alarme.
4. Placer l'aimant dans la plage `22-30 mm`, pas au-delà de la limite rouge.
5. Tester réception et fonction avant collage.
6. Nettoyer, sécher et dégraisser la surface.
7. Ne pas coller sous `15 °C` et attendre environ `24 heures`.
8. Utiliser l'adaptateur réf. `100428` ou `100729` si nécessaire.
9. Si l'adhésif ne convient pas, visser seulement aux repères du boîtier.
10. Tester chaque contact séparément après montage.

Plus d'informations : [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

## Logique de commande et test final

Dans le profil de base, la clé d'origine arme au verrouillage et désarme au déverrouillage. La source Vito ne documente aucun raccordement séparé des fils WiPro bleu ou bleu/noir de verrouillage ; les isoler s'ils sont inutilisés.

1. Contrôler raccordements, fusible, masse et DIP.
2. Fermer toutes les portes et tous les contacts programmés.
3. Verrouiller avec la télécommande d'origine.
4. Contrôler armement, verrouillage, LED et retour des clignotants.
5. Ouvrir mécaniquement la porte conducteur depuis l'intérieur ou avec la clé mécanique.
6. Confirmer le déclenchement de l'alarme.
7. Contrôler environ `30 secondes` d'alarme sonore.
8. Contrôler environ `180 secondes` d'alarme optique.
9. Arrêter avec une touche de l'émetteur ou la touche d'ouverture d'origine.
10. Consigner le code clignotant de mémoire sur la LED.
11. Tester séparément chaque autre porte détectée par CAN.
12. Ouvrir séparément chaque contact radio avec système armé.
13. Préchauffer le détecteur de gaz environ `4 minutes` et le tester selon sa notice.
14. Tester la boucle radio en la retirant de son support.
15. Tester quatre clignotants analogiques ou, avec ILS, uniquement les arrière raccordés.
16. Tester la sirène supplémentaire ou de secours par une alarme réelle.
17. Vérifier l'absence de nouveaux témoins, défauts d'éclairage ou codes.
18. Remonter les habillages et compléter la documentation client.

## Diagnostic des défauts

| Symptôme | Contrôle et mesure |
|---|---|
| Aucune réaction à la clé | contrôler SN, logiciel, DIP et `SW5` activé par erreur |
| Aucune réaction CAN | contrôler paire, connecteurs gel et blanc/orange = High, violet/orange = Low |
| Armement mais porte sans alarme | vérifier affichage et détection CAN ; sinon ajouter un contact radio |
| Certains clignotants seulement | contrôler A bleu, M brun, répartiteur `100455` et quatre fils |
| Défaut ILS ou avant éteints | ne pas commander l'avant ; raccorder seulement l'arrière mesuré |
| WiPro sans alimentation | contrôler `M6`, `10 A`, rouge pin 11, masse noire pin 1 et cosses |
| Allumage non détecté | mesurer noir/rose en bas arrière et contrôler jaune pin 7 |
| Klaxon muet | normal contact coupé ; contrôler la sirène installée |
| Sirène de secours continue | blanc = déclenchement positif ; isoler bleu négatif |
| Contact radio non détecté | contrôler programmation, orientation, écart, antenne et écran métallique |
| Véhicule, connecteur ou fil différent | arrêter et obtenir une validation spécifique |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Décision relative aux sources

- L'IDML *WiPro III Mercedes Vito W447 2014+* a été entièrement contrôlé : textes, tableaux, affectation des pages, métadonnées et graphiques liés.
- Il documente `04/20`, kit `100754`, SN `0823-014`, `SW1 + SW3 + SW4`, dépose, couleurs CAN, quatre fils de clignotants, alimentation, masse, sirènes, LED, programmation, durées et contacts.
- La matrice validée complète la période jusqu'à `06/2023`, le logiciel `6.2` et `SW6`, tous signalés comme compléments.
- Le manuel général `1.8` fournit sécurité, broches 20 pôles, anti-rejeu, diagnostic et logique des sirènes ; ses 15 pages allemandes ont été contrôlées textuellement et visuellement.
- Les images IDML absentes empêchent de reconstruire les broches de clignotants et l'affectation avant/arrière des couleurs en double ; seuls connecteurs et couleurs textuellement prouvés sont validés.
- L'inversion CAN et les anciennes données « M violet » et « noir/gris » ont été corrigées.

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
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Mercedes Sprinter VS30 (BR907/910, depuis 2018)|Mercedes Sprinter VS30]]
- [[Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006-2018)|Mercedes Sprinter NCV3 / VW Crafter]]
