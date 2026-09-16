---
title: 'Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006-2018)'
sources:
  - sources/wipro_iii_mercedes_sprinter_ncv3_vw_crafter_ab_2006.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/Mercedes.docx
updated: '2026-07-20'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/mercedes-sprinter-ncv3.md
---

# Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006-2018)

Cet article décrit l'installation d'un WiPro III sur le Mercedes Sprinter NCV3/BR906 de 2006 à 2018 et le VW Crafter de première génération de 2006 à 2017. La notice véhicule `06/21` couvre contrôle, DIP, CAN, quatre fils de clignotants, masse, allumage, alimentation, sirène, LED, accessoires radio, essais et diagnostic.

> **Limite :** l'année-modèle, la génération électronique, le répartiteur CAN, l'ordinateur de bord, les connecteurs et les couleurs doivent correspondre. Le Sprinter VS30 dès 2018 et le Crafter II dès 2017 utilisent d'autres instructions.

## Champ d'application

| Élément | Exigence |
|---|---|
| Mercedes | Sprinter NCV3/BR906, 2006-2018 |
| Volkswagen | Crafter I, 2006-2017 |
| Profil WiPro | `SW1 + SW6` sur `ON` |
| CAN | répartiteur CAN devant l'ordinateur de bord |
| Clignotants | quatre fils séparés via répartiteur à diodes réf. `100455` |
| Klaxon | sans tension allumage coupé ; ne pas l'utiliser comme avertisseur d'alarme |
| Compatibilité | `0823-001 / 2.1` ; vérifier l'appareil et le véhicule exacts |

L'électronique réellement présente, et non la seule immatriculation, détermine l'article applicable. Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## Priorité des sources et corrections

| Point | Décision |
|---|---|
| DIP | la notice `06/21` confirme `SW1 + SW6` ; l'ancien tableau général ne montre que les commutateurs 1-4 et donc seulement `SW1` |
| Centrale | sous la colonne de direction derrière l'habillage, pas globalement dans la console ou le plancher passager |
| Sirène | fortement recommandée, mais pas formulée comme condition obligatoire |
| safe.lock | aucun raccordement ni upgrade documenté ; ne rien en déduire |
| `Mercedes.docx` | absent localement ; ses anciennes notes ne sont pas des preuves |

Le manuel général `1.8` complète sécurité, broches, sirènes et diagnostic ; la notice véhicule plus récente prime.

## Sécurité et contrôle du véhicule

- Travaux électriques uniquement par un atelier qualifié.
- Débrancher le négatif de la batterie et des batteries auxiliaires selon le constructeur ; tenir compte des données volatiles et du code radio.
- Mettre WiPro complètement hors tension avant ouverture ou modification DIP, y compris le connecteur Pro-finder.
- Isoler séparément toute entrée ou sortie inutilisée.
- Protéger les câbles du frottement et ne jamais gêner direction, pédales ou fonctions du véhicule.
- Vérifier connecteur, broche, couleur, tension et fonction ; arrêter en cas d'écart et contacter le constructeur ou THITRONIK.

Avant le montage :

1. Contrôler la télécommande d'origine et l'acquittement par clignotement.
2. Contrôler le verrouillage centralisé.
3. Vérifier, allumage mis, l'affichage des portes d'origine ouvertes.
4. Déterminer les portes et trappes déjà détectées par CAN sur les carrosseries intégrées.
5. Relever témoins, défauts mémorisés, anomalies d'éclairage et défauts électriques.

Sur certains intégraux sans centralisation active, la télécommande peut être déprogrammée malgré un clic de relais. Mercedes doit alors reprogrammer la centralisation pour que la clé d'origine agisse sur WiPro via CAN.

## Réglage du profil DIP

1. Couper l'alimentation et débrancher le connecteur WiPro 20 broches ainsi que Pro-finder.
2. Ouvrir prudemment le boîtier WiPro.
3. Mettre `SW1` et `SW6` sur `ON`, tous les autres sur `OFF` pour le profil de base.
4. Ne modifier une centrale préconfigurée qu'après contrôle documenté.
5. Noter la position réelle et refermer le boîtier.

Le schéma véhicule confirme visuellement `SW1 + SW6`. Ne pas activer d'autres fonctions DIP sans vérifier série, logiciel et fonction voulue.

## Dépose de l'habillage du tableau de bord

1. Retirer les trois vis repérées avec un Torx `T25`.
2. Tirer prudemment les habillages vers l'avant.
3. Dégager la zone sous la colonne de direction et devant l'ordinateur de bord.
4. Vérifier que câbles, pédales et éléments d'airbag ne sont ni sollicités ni endommagés.

## Raccordement CAN

Un répartiteur CAN se trouve sur une traverse devant l'ordinateur de bord. Enficher le connecteur terminal des câbles CAN WiPro dans une prise libre adaptée.

| Fil véhicule | Fil WiPro / broche | Fonction |
|---|---|---|
| marron | violet/orange, broche 18 | CAN-Low |
| marron/rouge | blanc/orange, broche 17 | CAN-High |

Ne pas travailler d'après la couleur seule : fil véhicule, couleur WiPro, broche et répartiteur doivent tous correspondre. Ne pas inverser CAN-High et CAN-Low.

## Raccordement des quatre clignotants

L'ordinateur de bord est sous le répartiteur CAN. Déverrouiller les étriers, retirer les connecteurs, raccorder les quatre fils aux quatre fils gris du répartiteur à diodes, puis remettre les connecteurs entièrement.

| Connecteur / broche | Fil véhicule | Côté WiPro | Fonction |
|---|---|---|---|
| X3, broche 15 | noir/blanc | gris du répartiteur | clignotant |
| X3, broche 16 | noir/vert | gris du répartiteur | clignotant |
| X9, broche 13 | noir/blanc | gris du répartiteur | clignotant |
| X9, broche 24 | noir/vert | gris du répartiteur | clignotant |

> **Risque de confusion :** ne pas confondre X9 `broche 24` avec la `broche 25` voisine, également noir/vert mais plus épaisse.

Le répartiteur à diodes réf. `100455` est requis pour répartir les deux sorties WiPro sur quatre fils ; il est inclus dans le kit spécifique selon le schéma général. Voir [[Registre des numéros d’article — produits et accessoires THITRONIK documentés|Registre des numéros d’article]].

## Masse, allumage et alimentation

| Raccordement | Côté véhicule | Côté WiPro | Exigence |
|---|---|---|---|
| masse / borne 31 | point de masse au prolongement gauche du montant A, écrou `M10` | noir, broche 1 | conserver les cosses d'origine, ajouter WiPro et resserrer |
| allumage / borne 15 | OBD broche 8, rose/noir | jaune, broche 7 | dérivateur bleu rempli de gel |
| permanent / borne 30 | fil rouge arrière du fusible `F10 / 15 A` dans le porte-fusibles auxiliaire | rouge, broche 11 | sortir le porte-fusibles et utiliser un dérivateur bleu |

Si la broche d'allumage manque sur l'OBD, utiliser un autre fil de borne 15 clairement identifié. Cette information empêche une alarme en roulant. Mesurer ou identifier masse, permanent, fusible et allumage.

## Raccordement d'une sirène ou sirène de secours

Le klaxon n'est pas alimenté allumage coupé. La notice recommande fortement une sirène dans le compartiment moteur, protégée de la chaleur, de l'eau et des pièces mobiles.

| Version | WiPro | Sirène |
|---|---|---|
| sirène normale | broche 15, blanc | rouge |
| sirène normale | broche 16, blanc/noir | noir |
| sirène de secours | broche 11 / `+12 V` | rouge |
| sirène de secours | broche 15, blanc | blanc |
| sirène de secours | masse véhicule | noir |
| sirène de secours | non utilisé | isoler séparément le bleu |

1. Fixer l'étrier à un emplacement approprié du compartiment moteur.
2. Tirer un câble à deux conducteurs par le passage existant à l'aide d'un tire-fil.
3. Raccorder selon le type de sirène et le schéma.
4. Isoler tout fil inutilisé et protéger mécaniquement le câblage.
5. Tester séparément la sirène.

Voir [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]].

## Premier contrôle fonctionnel

1. Fermer les portes cabine et armer avec la touche de verrouillage d'origine.
2. Si nécessaire, verrouiller/déverrouiller plusieurs fois pour synchroniser CAN.
3. Vérifier bip, clignotants et LED clignotante.
4. Avec une porte cabine ouverte, vérifier l'absence de verrouillage et d'armement.
5. Armer correctement puis ouvrir mécaniquement la porte conducteur de l'intérieur ou avec la clé mécanique.
6. Vérifier l'alarme acoustique d'environ `30 secondes`.
7. Vérifier l'alarme optique d'environ `180 secondes`.
8. Désarmer ou interrompre avec la touche de déverrouillage.
9. Observer la séquence mémoire de la LED.

## Montage de la LED, des accessoires et de la centrale

1. Convenir de la position de LED avec le client et contrôler l'arrière.
2. Percer `8 mm`, insérer la LED et raccorder son câble rouge/noir à connecteur blanc.
3. Apprendre tout accessoire marqué `868` avant le montage définitif.
4. Maintenir la touche à droite du connecteur jusqu'au bip et à l'allumage fixe de la LED.
5. Déclencher chaque contact, émetteur, détecteur de gaz et boucle deux ou trois fois.
6. Pour un contact magnétique, éloigner aimant et émetteur de plus de `30 mm`.
7. Confirmer l'enregistrement par le bip et la brève extinction de la LED.
8. Quitter le mode par brève coupure d'alimentation ou pression courte.
9. Fixer la centrale sous la colonne de direction derrière l'habillage avec les pastilles arrière.
10. Décharger les câbles de toute traction, ne rien laisser près des pédales et ne ni raccourcir ni enrouler l'antenne.

La mémoire est non volatile ; une suppression efface tous les émetteurs. Voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Montage et contrôle des accessoires radio

Pour les contacts réf. `100757` et `100758` :

- Orienter la LED d'émission à l'opposé de l'aimant ; une mauvaise orientation permet l'apprentissage mais empêche l'alarme.
- Respecter `22-30 mm` et la ligne limite rouge.
- Tester la portée avant collage.
- Surface propre, sèche et dégraissée ; pas sous `15 °C`, puis environ `24 heures` de prise.
- Utiliser l'adaptateur `100428` ou `100729` si l'écart ou l'orientation l'exige.
- Si le collage convient mal, utiliser les repères de vissage du boîtier.

Voir [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

## Contrôle fonctionnel final

1. Répéter le premier essai avec toutes les portes.
2. Ouvrir séparément chaque contact appris lorsque WiPro est armé.
3. Tester activation/désactivation avec chaque touche de l'émetteur THITRONIK 868.
4. Maintenir les deux touches environ `1 seconde` et tester l'alarme panique.
5. Armer avec un contact ouvert et vérifier les bips multiples puis le bip armé ; ce contact est d'abord exclu.
6. Fermer le contact et vérifier sa réactivation après environ `4 secondes`.
7. Préchauffer le détecteur de gaz environ `4 minutes`, attendre le vert clignotant et tester selon sa notice ; il peut alerter armé ou désarmé.
8. Tester la boucle radio en appuyant légèrement sur le bord inférieur puis en la retirant du support.
9. Contrôler séparément CAN, centralisation, quatre clignotants, LED et sirène.
10. Noter `F10 / 15 A` et le numéro de série WiPro dans les documents client.
11. Vérifier l'absence de nouveaux témoins, défauts électriques et codes diagnostic.

## Dépannage

| Symptôme | Contrôle / remède |
|---|---|
| Pas de réaction à la clé, mais bip à la mise sous tension | contrôler couleurs CAN, broches 17/18 et répartiteur ; activer brièvement le diagnostic et observer la LED avec la clé ou les feux de détresse |
| Pas d'activité CAN | bus inactif, connexion erronée ou CAN-High/Low inversés ; corriger hors tension |
| Ni réaction ni bip | mesurer au connecteur WiPro ; contrôler dérivations, allumage et `F10 / 15 A` |
| Télécommande inactive sur un intégral | centralisation potentiellement déprogrammée ; faire reprogrammer par Mercedes |
| Clignotants incomplets | contrôler `100455`, X3 15/16 et X9 13/24 ; ne pas confondre 24 et 25 |
| Pas de verrouillage porte cabine ouverte | comportement normal ; fermer la porte et répéter |
| Pas d'alarme par le klaxon | attendu allumage coupé ; tester la sirène installée |
| Contact fermé signalé ouvert | après coupure, ouvrir et fermer tous les contacts plusieurs fois |
| Contact radio non reçu | contrôler apprentissage, orientation, écart, métal, antenne et adaptateurs `100428`/`100729` |
| Véhicule différent | arrêter et obtenir une validation du constructeur ou de THITRONIK |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Décision sur les sources

- La notice véhicule de 13 pages `06/21` a été entièrement contrôlée textuellement et visuellement.
- Son schéma confirme `SW1 + SW6` ; l'ancien tableau limité aux commutateurs 1-4 ne permet pas de supprimer `SW6`.
- La PDF établit répartiteur CAN, quatre clignotants, masse `M10`, OBD 8, `F10 / 15 A`, deux sirènes, centrale et essais.
- Le manuel `1.8` confirme les broches WiPro 1/7/11/12/14/15/16/17/18, `100455`, sécurité et diagnostic ; le spécifique prime.
- « Sirène obligatoire » devient « fortement recommandée » ; safe.lock et l'ancien emplacement générique sont supprimés faute de preuve.
- `Mercedes.docx` est absent localement et non utilisé.

## Références croisées

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Registre des numéros d’article — produits et accessoires THITRONIK documentés|Registre des numéros d’article]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Mercedes Sprinter T1N (2000–2006)|Mercedes Sprinter T1N]]
- [[Mercedes Sprinter VS30 (BR907/910, à partir de 2018)|Mercedes Sprinter VS30]]
- [[VW Crafter / MAN TGE (2017-2024, sans bouton de démarrage)|VW Crafter / MAN TGE 2017-2024]]
