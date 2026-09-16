---
title: Renault Master II / Opel Movano A / Nissan Interstar (1998–2010)
sources:
  - sources/wipro_iii_renault_master_ii_1998-2010.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
updated: '2026-07-21'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/renault-master-ii.md
---

# Renault Master II / Opel Movano A / Nissan Interstar (1998–2010)

Cet article décrit le montage documenté de la WiPro III sur le Renault Master de 1998 à 2010 ainsi que sur les modèles de même plate-forme Opel Movano A et Nissan Interstar regroupés avec lui dans ce projet. Il repose sur le manuel de montage THITRONIK spécifique au véhicule, état `12/20` ; le manuel d’installation général version `1.8` complète uniquement les règles générales de sécurité et de raccordement.

> **Comparaison obligatoire :** la source primaire porte uniquement la désignation Renault Master. Sur un Opel Movano A, un Nissan Interstar, une autre année-modèle ou un brochage différent, vérifier P202, la position de la broche, le câble et le signal sur le véhicule concerné avant chaque raccordement. En cas d’écart, ne pas poursuivre en se fiant à la couleur ; contacter l’assistance THITRONIK.

## Domaine d’application et configuration validée

| Caractéristique | Configuration validée |
|---|---|
| Véhicules | Renault Master II ; le projet regroupe en plus l’Opel Movano A et le Nissan Interstar de même plate-forme |
| Période | 1998–2010 |
| Système | WiPro III, raccordement analogique ; la source véhicule n’indique aucun raccordement CAN |
| Source spécifique au véhicule | manuel de montage de 11 pages, état `12/20` |
| Matrice du projet | version minimale `0823-001 / 2.1` ; non indiquée dans le manuel véhicule lui-même |
| DIP → ON | **SW1 + SW2 + SW3 + SW6** |
| Alarme sonore | avertisseur du véhicule non pilotable ; prévoir une sirène normale ou de secours dans le compartiment moteur |
| Durée lors de l’essai | environ `30 s` sonore et `180 s` visuelle |

Documenter le numéro de série et la version logicielle avant le montage. La matrice du projet indique `0823-001 / 2.1` comme base, mais le manuel véhicule ne documente que le profil et les raccordements. Une version d’appareil inconnue ou différente doit donc être validée avant le montage. Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## Hiérarchie des sources et ancien contenu corrigé

| Sujet | Décision relative aux sources |
|---|---|
| Profil véhicule, lieu de montage, broches, couleurs et essais | le manuel spécifique état `12/20` prévaut |
| Sécurité générale, alimentation de base et rôle des broches | le manuel d’installation version `1.8` est complémentaire |
| Durée de l’alarme | valeurs spécifiques : `30 s` sonore et `180 s` visuelle ; l’ancienne valeur générale de `120 s` visuelle ne s’applique pas ici |
| Comportement des portes cabine pendant 60 secondes | temporisation d’armement, expressément **pas une temporisation d’alarme** |
| `FAQ_WiPro-III_DE.md` cité dans l’ancien article | fichier absent localement et non considéré comme source consultée |
| Attribution Opel/Nissan | maintenue par le projet ; le brochage doit être confirmé sur le véhicule concerné |

L’ancienne version courte omettait les broches de sirène, l’affectation complète du relais, la mémorisation et des règles essentielles concernant les contacts magnétiques. Ces éléments ont été ajoutés à partir des pages originales contrôlées visuellement.

## Sécurité et contrôles préalables

- Le montage et les interventions sur l’électricité du véhicule sont réservés à un atelier spécialisé qualifié.
- Avant toute intervention électrique, débrancher le pôle négatif de la batterie et les batteries auxiliaires selon les consignes des constructeurs du véhicule et de la cellule. Tenir compte du code autoradio et des réglages volatils.
- Ne pas repiquer ni entraver les systèmes d’airbag, de direction, de freinage, d’antidémarrage ou tout autre système de sécurité.
- Ne jamais identifier une fiche ou une broche par la seule couleur du câble ; désignation, rangée, broche, couleur, tension et type de signal doivent tous correspondre.
- Isoler séparément les entrées et sorties inutilisées. Protéger les câbles du mouvement, du frottement, de la chaleur, de l’humidité et de la traction.
- Avant l’intervention, tester le verrouillage centralisé, l’éclairage intérieur, les feux de détresse, le contact et toutes les portes ; consigner les défauts existants.
- Si un câble manque, si le brochage diffère ou si la variante du véhicule est incertaine, interrompre les travaux et contacter l’assistance.

## Matériel et préparation

Le manuel véhicule indique quatre manchons bout à bout rouges, quatre connecteurs de dérivation bleus, deux connecteurs de dérivation remplis de graisse silicone, une vis `M8` et environ `1 m` de câble `2 × 0,5 mm²`. Sont également nécessaires : Torx `T20`, pince à sertir, pince universelle, perceuse sans fil, colliers et foret de `8 mm` pour la LED d’état.

Mémoriser de préférence les composants radio **avant le montage** :

1. Maintenir la touche située à droite du connecteur jusqu’au bip de la centrale ; la LED d’état reste allumée.
2. Déclencher deux ou trois fois chaque contact radiomagnétique, détecteur de gaz ou boucle de câble radio.
3. Un bip et la brève extinction de la LED d’état confirment la mémorisation.
4. Noter chaque composant mémorisé et son emplacement sur la fiche de travail.

Voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d’apprentissage]].

## Réglage du profil DIP

1. Couper complètement l’alimentation de la WiPro III.
2. Sur le commutateur de codage à huit positions, mettre **SW1, SW2, SW3 et SW6 sur ON**.
3. **SW4, SW5, SW7 et SW8 restent sur OFF**, sauf exigence contraire d’une fonction supplémentaire validée.
4. Photographier le réglage et le comparer au véhicule, à la version de l’appareil et à la fiche de travail.
5. Fermer le boîtier avant de poursuivre le montage.

> Ne jamais modifier les commutateurs DIP sous tension. Ne pas reprendre le profil d’une autre génération de Renault Master.

## Accès, LED d’état et lieu de montage

1. Déverrouiller et retirer la trappe inférieure du tableau de bord, à gauche sous la colonne de direction.
2. Choisir un emplacement bien visible et sans risque de collision pour la LED d’état, puis percer à `8 mm`.
3. Dégager l’électronique centrale et localiser les connecteurs **P201** et **P202**.
4. Fixer la centrale WiPro sur le boîtier de relais sous la colonne de direction.
5. Poser le câble de la LED et tous les câbles de raccordement sans gêner les pédales, la colonne de direction ni aucune pièce mobile.
6. Ne fixer d’abord les câbles que de manière à préserver l’accès pour les mesures et l’essai fonctionnel.

## Raccordements véhicule sur P202 et la broche 36

Pour P202, le manuel compte **les broches 1 à 9 de gauche à droite dans la rangée A** et **les broches 1 à 6 de gauche à droite dans la rangée B**. Confirmer l’orientation à l’aide de l’illustration du connecteur avant toute dépose de broche ou dérivation.

| Fonction | Câble WiPro III | Raccordement véhicule | Câble véhicule | Remarque |
|---|---|---|---|---|
| Contact de porte, préféré | beige | P202, rangée B, broche 5 | rouge/bleu | vérifier d’abord cette position occupée |
| Contact de porte, variante | beige | P202, rangée A, broche 1 | blanc/orange | seulement si rangée B, broche 5 absente ; l’éclairage intérieur est alors commandé par la masse |
| Signal de verrouillage | bleu/noir | P202, rangée A, broche 6 | marron | entrée de verrouillage centralisé « fermer » |
| Signal de déverrouillage | bleu | P202, rangée A, broche 9 | blanc | entrée de verrouillage centralisé « ouvrir » |
| Contact | jaune | P202, rangée B, broche 3 | jaune | entrée contact/borne 15 |
| Feux de détresse | rouge/rose | broche 36 dans l’insert vert | vert | commande des feux de détresse |

Mesurer le signal avant chaque raccordement. La position de contact de porte alternative n’est pas un second branchement parallèle : utiliser **une seule** variante, celle qui correspond au véhicule.

## Masse et alimentation

| Fonction | Câble WiPro III | Raccordement | Contrôle |
|---|---|---|---|
| Masse/borne 31 | noir | cosse annulaire au point de masse du montant A | contrôler la surface de contact et la fixation ; resserrer correctement la vis |
| Plus permanent/borne 30 | rouge | fusible `15 A` de l’éclairage intérieur | mesurer le plus permanent avant et après le raccordement ; ne pas augmenter le calibre du fusible véhicule |

Ne rétablir l’alimentation qu’après contrôle du profil DIP, des connecteurs, de l’isolation et de la décharge de traction.

## Raccordement de la sirène

Selon la source primaire, l’avertisseur du véhicule ne peut pas être piloté. Monter donc une sirène normale ou de secours dans le compartiment moteur ; la vis `M8` fournie est prévue à cet effet. Les câbles peuvent rejoindre l’habitacle par le boîtier à fusibles du compartiment moteur. Voir [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]].

| Version | WiPro III | Sirène | Remarque |
|---|---|---|---|
| Plus de la sirène normale | broche 15, blanc | rouge | sortie sirène positive |
| Moins de la sirène normale | broche 16, blanc/noir | noir | retour commuté |
| Alimentation de la sirène de secours | borne 30/+12 V et masse | rouge sur +12 V, noir à la masse | raccorder séparément, de manière sûre et conformément aux consignes |
| Déclenchement de la sirène de secours | broche 15, blanc | blanc | déclencheur d’alarme positif |
| Câble inutilisé de la sirène de secours | — | bleu | isoler séparément |

Fixer solidement la sirène, à l’abri des projections et avec une sortie sonore dégagée. Protéger les câbles du compartiment moteur de la chaleur et du frottement.

## Verrouillage automatique au démarrage

Si le Master se verrouille automatiquement au démarrage, le signal de verrouillage peut armer la WiPro III pendant le trajet et provoquer une alarme après la sortie des occupants. La fonction de confort peut être conservée en interrompant l’entrée de verrouillage WiPro lorsque le contact est mis, au moyen d’un relais à contact normalement fermé commandé par le contact.

| Contact du relais | Raccordement | Câble/fonction |
|---|---|---|
| 85, bobine | contact | jaune WiPro ou signal de contact vérifié |
| 86, bobine | masse | noir WiPro ou point de masse vérifié |
| 30, COM | verrouillage provenant du Master | signal de verrouillage côté véhicule |
| 87a, NF | entrée de verrouillage WiPro | bleu/noir |
| 87, NO | inutilisé | isoler séparément |

Après le montage, tester séparément l’arrêt, le contact mis/coupé, le verrouillage automatique en roulant, puis le déverrouillage et la sortie.

## Montage des contacts radiomagnétiques

La source véhicule documente les contacts Art. `100757` en noir et `100758` en blanc ainsi que les adaptateurs de montage Art. `100428` et `100729`.

1. Monter de préférence l’émetteur sur le cadre fixe et l’aimant sur la porte, la fenêtre ou la trappe mobile.
2. Placer la carte dans le boîtier avec la LED d’émission orientée **à l’opposé de l’aimant**. Une mauvaise orientation permet la mémorisation, mais pas le déclenchement de l’alarme.
3. Positionner l’aimant dans la plage recommandée de `22–30 mm` et ne pas le monter au-delà de la ligne rouge.
4. Si l’écart est plus grand ou si l’orientation de l’antenne est défavorable, utiliser un adaptateur approprié `100428` ou `100729`.
5. Nettoyer, sécher et dégraisser les surfaces ; ne pas poser les adhésifs en dessous de `15 °C` et les laisser sans charge environ `24 h` pour atteindre leur résistance maximale.
6. Si le collage n’est pas fiable, utiliser les repères prévus dans le boîtier de l’émetteur pour la fixation par vis.
7. Après le montage, ouvrir et fermer plusieurs fois le contact et contrôler la réaction radio.

Voir [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]] et [[Registre des numéros d’article — produits et accessoires THITRONIK documentés|Registre des numéros d’article]].

## Mise en service et essai fonctionnel

1. Contrôler à nouveau toutes les broches, couleurs, connexions, protections, masses, conducteurs isolés et le profil DIP.
2. Rebrancher les batteries selon les consignes des constructeurs et vérifier l’absence de nouveaux voyants ou défauts véhicule.
3. Fermer toutes les portes et tous les contacts radio mémorisés.
4. Armer avec la touche « Verrouiller » du véhicule. Un bip de la centrale et les feux de détresse doivent confirmer l’activation.
5. Ouvrir une porte cabine avant puis après `60 s`. La source qualifie cette période de **temporisation d’armement** : l’ouverture d’une porte cabine ne déclenche l’alarme qu’après son expiration.
6. Tester séparément chaque contact radiomagnétique. Ces contacts réagissent immédiatement après l’armement et n’ont pas de temporisation de 60 secondes.
7. Déclencher une véritable alarme d’essai et vérifier environ `30 s` d’alarme sonore et `180 s` d’alarme visuelle.
8. Désarmer ou arrêter une alarme en cours avec la touche « Déverrouiller » du véhicule.
9. Retester séparément le verrouillage centralisé, le contact, les feux de détresse, l’éclairage intérieur et chaque source d’alarme.
10. En présence du verrouillage en roulant, tester le relais dans des conditions réalistes ; l’installation ne doit pas s’armer involontairement pendant le trajet.
11. Ne fixer définitivement les câbles et ne remonter les garnitures qu’après réussite de tous les essais.

## Acquittements et diagnostic

| Observation | Signification et action |
|---|---|
| un bip et les feux de détresse au verrouillage | l’installation est armée |
| série de bips courts au verrouillage | un contact magnétique mémorisé est détecté ouvert ; l’installation s’arme néanmoins |
| la porte cabine ne déclenche rien avant 60 s | temporisation d’armement attendue ; refaire l’essai après son expiration |
| un contact radio ne déclenche pas immédiatement après l’armement | contrôler l’orientation de la carte, l’écart, la mémorisation et la pile |
| un contact ouvert est signalé alors que l’ouverture est fermée | contrôler l’écart, ouvrir et fermer plusieurs fois tous les contacts, puis armer de nouveau |
| le contact reste faussement signalé ouvert | débrancher le connecteur d’alimentation de la WiPro III et le rebrancher avec tous les contacts fermés |
| alarme après verrouillage automatique en roulant | contrôler l’entrée bleu/noir et les contacts 30/87a/85/86 du relais normalement fermé |
| aucune alarme sonore | contrôler la sirène aux broches 15/16 ou l’alimentation de la sirène de secours ; l’avertisseur du véhicule n’est pas prévu ici |
| connecteur ou câble différent | arrêter les travaux, ne transférer ni couleur ni position et ouvrir un dossier d’assistance avec photos et mesures |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]] et [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade|Saisie d’un dossier d’assistance]].

## Remise au client et documentation

Consigner sur la fiche de travail :

- modèle, année-modèle, VIN et variante de carrosserie pertinente
- numéro de série WiPro III complet et version logicielle
- titre et état `12/20` du manuel véhicule utilisé
- réglage DIP confirmé `SW1 + SW2 + SW3 + SW6`
- variante de contact de porte réellement utilisée et mesures de tous les raccordements
- emplacements de la centrale, de la LED et de la sirène, ainsi que les parcours de câbles
- version de sirène et, le cas échéant, affectation du relais de verrouillage en roulant
- numéros d’article et positions de tous les contacts radio
- résultat de chaque essai, y compris `60 s`, `30 s` et `180 s`
- état de la mémoire des défauts et fonctions du véhicule avant et après le montage

Lors de la remise, montrer la temporisation d’armement de 60 secondes des portes cabine, la réaction immédiate des contacts radio et la commande d’armement et de désarmement.

## Décision relative aux sources

- Le manuel THITRONIK de 11 pages *WiPro III Renault Master 1998–2010*, état `12/20`, a été intégralement contrôlé textuellement et visuellement. Il documente le profil DIP, le lieu de montage, tous les raccordements véhicule, les deux variantes de sirène, l’alimentation, le relais, l’essai et le montage des contacts magnétiques.
- Le manuel d’installation général version `1.8` complète la sécurité, les raccordements de base et le diagnostic. En cas de contradiction, la source spécifique plus récente prévaut.
- La durée visuelle applicable ici est donc de `180 s`, et non l’ancienne valeur générale de `120 s`.
- Selon la source primaire, les 60 secondes des portes cabine constituent une temporisation d’armement et non celle d’une alarme déjà déclenchée.
- La matrice du projet indique `0823-001 / 2.1` ; le manuel spécifique n’indique lui-même aucune version minimale. Cette limite ne doit donc pas être généralisée à des matériels inconnus.
- Le fichier `FAQ_WiPro-III_DE.md` cité par l’ancien article est introuvable localement et n’a pas servi de preuve.

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d’apprentissage]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade|Saisie d’un dossier d’assistance]]
- [[Renault Master III / Opel Movano B / Nissan NV400 (à partir de 2011)|Renault Master III]] — génération suivante
