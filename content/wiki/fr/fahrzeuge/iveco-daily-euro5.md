---
title: Iveco Daily Euro 5 et plus récent (2011-2024)
sources:
  - sources/WiPro_III_Iveco_Daily_Euro_5_2011-2024_DE.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/ZV - IVECO Daily.pdf
  - sources/Iceco Daily.docx
  - sources/Fahrzeugbesonderheiten.docx
updated: '2026-07-20'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/iveco-daily-euro5.md
dealerStatus: approved
---

# Iveco Daily Euro 5 et plus récent (2011-2024)

Cet article décrit l'installation d'un WiPro III ou WiPro III safe.lock sur les Iveco Daily des années-modèles 2011 à 2024. La notice spécifique au véhicule datée de `01/2026` fait autorité.

> **Limite du champ d'application :** l'année-modèle, l'ordinateur de bord, le connecteur, la broche et le code de câble doivent correspondre à la notice. La remarque sur les couleurs modifiées à partir de 2025 n'autorise pas l'installation sur la génération BCM 2025/2026.

## Champ d'application

| Élément | Exigence |
|---|---|
| Véhicule | Iveco Daily Euro 5 et versions ultérieures de la génération documentée |
| Années-modèles | 2011-2024 ; vérifier la version réelle |
| WiPro III ou safe.lock sans carte de conversion | `SW2 + SW6` sur `ON` |
| WiPro III safe.lock avec carte de conversion | `SW2 + SW5 + SW6` sur `ON` |
| Véhicules semi-intégrés ou intégraux avec carte | `SW2 + SW5 + SW6` ; ne pas raccorder le câble bleu d'ouverture |
| Base de compatibilité | `0823-001 / 2.1` ; vérifier l'appareil et le véhicule exacts |

Un système spécifique peut être préconfiguré. Documenter néanmoins la position réelle. Vérifier numéro de série, logiciel et version sous [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Priorité des sources et correction du réglage DIP

| Source | Indication | Évaluation |
|---|---|---|
| notice véhicule `01/2026` | `SW2 + SW6`, plus `SW5` avec carte de conversion | instruction actuelle obligatoire |
| ancien aperçu et ancien texte | `SW1` ou `SW1 + SW5` | remplacé par le schéma actuel |
| supplément de verrouillage centralisé | positions d'essai `SW1`/`SW3` | uniquement pour la matrice ci-dessous |

Le schéma DIP a été contrôlé visuellement en haute résolution : `SW2` et `SW6` sont sur `ON`, et `SW5` s'ajoute **uniquement si une carte de conversion est montée**. `SW1` et `SW3` ne servent qu'aux douze essais du verrouillage centralisé. Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

Ne pas déduire la présence de la [[Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper|carte de conversion safe.lock]] du seul nom safe.lock. Vérifier la clé et la version, particulièrement à partir de 2019.

## Sécurité et contrôle du véhicule

- Confier les travaux électriques à un atelier qualifié et couper l'alimentation avant toute intervention ou modification DIP.
- Isoler séparément les conducteurs inutilisés contre les courts-circuits.
- Contrôler sur le véhicule le connecteur, la broche, le code, la couleur, la tension et la fonction.
- Arrêter si une illustration, un connecteur, une broche ou un code diffère et contacter le constructeur ou le support THITRONIK.

Avant le montage :

1. Contrôler la télécommande radio d'origine et son acquittement.
2. Contrôler le verrouillage centralisé.
3. Vérifier, contact mis, que l'ouverture d'une porte d'origine apparaît au combiné.
4. Sur un intégral, déterminer quelles portes et trappes sont déjà détectées par CAN.
5. Contrôler klaxon, éclairage, témoins et mémoire de défauts.

## Apprentissage des accessoires radio et profil de base

1. Maintenir la touche à droite du connecteur jusqu'au bip et à l'allumage fixe de la LED.
2. Déclencher chaque contact, détecteur de gaz ou boucle de câble deux ou trois fois.
3. Vérifier l'enregistrement par le bip et la brève extinction de la LED.
4. Couper l'alimentation et ouvrir le boîtier, sauf préconfiguration spécifique.
5. Régler `SW2 + SW6` sur `ON` sans carte de conversion.
6. Ajouter `SW5` uniquement avec une carte confirmée.
7. Fermer le boîtier et poursuivre le montage.

Voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Accès au tableau de bord et à l'ordinateur de bord

1. Déposer les habillages indiqués.
2. Déposer le cache supérieur du volant seulement pour le raccordement du klaxon à cet endroit.
3. Desserrer les vis Torx indiquées pour déplacer l'ordinateur de bord, avec ou sans cadre auxiliaire.
4. Vérifier si les connecteurs arrière sont accessibles sans libération complète.
5. Ne déplacer l'unité que suffisamment pour ne pas solliciter câbles et connecteurs.
6. Identifier sans ambiguïté les deux connecteurs gris à verrou bleu.

Ensuite, réinsérer entièrement les inserts, fermer les verrous bleus et rétablir la décharge de traction.

## Raccordement CAN, feux de détresse et safe.lock

| Connecteur / broche | Câble véhicule | Câble WiPro | Fonction |
|---|---|---|---|
| grand connecteur gris, broche 1 | marron, code `0000` | bleu | ouverture safe.lock / centralisée |
| grand connecteur gris, broche 9 | violet, code `6111` | violet/orange | CAN-Low |
| grand connecteur gris, broche 24 | violet, code `6110` | blanc/orange | CAN-High |
| grand connecteur gris, broche 55 | blanc, code `2507` | rouge/rose | feux de détresse |
| connecteur vert avant, broche 34 | vert, code `0968` | bleu/noir | fermeture safe.lock / centralisée |

- En 2016, CAN-High peut se trouver en `broche 25` et CAN-Low en `broche 10`.
- À partir de 2019, les deux câbles CAN peuvent être gris ; à partir de 2022, ils peuvent être blancs selon l'équipement.
- La broche et le code priment toujours sur la couleur. La remarque « broche 55 blanc/rouge à partir de 2025 » n'est pas une autorisation pour 2025.
- Utiliser les connecteurs de dérivation bleus homologués remplis de gel. Sur les véhicules semi-intégrés et intégraux, ne pas raccorder le câble bleu de la broche 1.

## Alimentation et allumage

| Broche | Câble véhicule | Câble WiPro | Fonction |
|---:|---|---|---|
| 18 | rouge, code `7772` | rouge | `+12 V` / borne 30 ; fusible supérieur gauche `10 A` |
| 17 | vert, code `8373` | jaune | allumage / borne 15 |

Mesurer ou identifier positivement les deux broches, l'alimentation permanente et le fusible. Le WiPro est désactivé lorsque l'allumage est mis.

## Masse et klaxon du véhicule

Raccorder le câble noir à un point de masse approprié clairement identifié.

| Période / version | Raccordement véhicule | Action |
|---|---|---|
| jusqu'à 2017 | câble bleu épais au-dessus de la colonne de direction | câble WiPro rose |
| à partir de 2017 | ordinateur de bord, connecteur E, broche 8, repère `1116` | câble rose après identification |
| 2018/19 avec commande `+12 V` | klaxon non commandé par la masse | inverser la sortie avec un relais automobile approprié |
| à partir de 2019 | commande du klaxon véhicule indisponible selon la source | sirène ou klaxon supplémentaire fortement recommandé |

Les périodes se chevauchent en 2017 : vérifier l'emplacement, le connecteur E, la broche 8, `1116` et le mode de commutation. À partir de 2018, la source recommande une [[Sirènes et klaxons — moyens d'alarme acoustiques|sirène ou un klaxon supplémentaire]].

## Montage de la LED d'état et de la centrale

1. Convenir de la position de la LED avec le client.
2. Contrôler l'espace arrière.
3. Percer un trou de `8 mm`.
4. Insérer et raccorder la LED.
5. Fixer la centrale au sec avec la pastille adhésive arrière.
6. Poser les câbles sans traction et ne ni raccourcir ni enrouler l'antenne.

## Véhicules semi-intégrés et intégraux

Ne **pas raccorder le câble bleu d'ouverture centralisée**. Le profil reste `SW2 + SW6`, plus `SW5` uniquement avec carte confirmée. Les anciens cas « Iveco Daily 4x4 2021 » et « Carthago 2022 » proviennent de fichiers Word absents localement et ne sont donc pas conservés comme solutions approuvées.

## Matrice d'adaptation centralisée avec SW1 et SW3

Conditions constantes : bleu sur connecteur gris broche 1 / marron `0000`, bleu/noir sur connecteur vert broche 34 / vert `0968`, profil `SW2 + SW6` et `SW5` seulement avec carte.

| Étape | Bleu / broche 1 | Bleu-noir / broche 34 | SW1 | SW3 |
|---:|---|---|---|---|
| 1 | raccordé | raccordé | `OFF` | `OFF` |
| 2 | raccordé | raccordé | `ON` | `OFF` |
| 3 | raccordé | raccordé | `OFF` | `ON` |
| 4 | raccordé | raccordé | `ON` | `ON` |
| 5 | débranché | raccordé | `OFF` | `OFF` |
| 6 | débranché | raccordé | `ON` | `OFF` |
| 7 | débranché | raccordé | `OFF` | `ON` |
| 8 | débranché | raccordé | `ON` | `ON` |
| 9 | raccordé | débranché | `OFF` | `OFF` |
| 10 | raccordé | débranché | `ON` | `OFF` |
| 11 | raccordé | débranché | `OFF` | `ON` |
| 12 | raccordé | débranché | `ON` | `ON` |

Cette matrice ne remplace pas le profil de base.

1. Documenter l'état initial et le profil de base.
2. Couper l'alimentation avant **chaque** modification de `SW1` ou `SW3`.
3. Appliquer une seule ligne du tableau à la fois.
4. Contrôler complètement verrouillage, déverrouillage, armement et désarmement.
5. Ne conserver qu'une combinaison clairement fonctionnelle ; en cas de doute, arrêter et contacter le support THITRONIK.

## Contrôle fonctionnel final

1. Fermer les portes et armer avec la touche de verrouillage de la télécommande autorisée.
2. Si nécessaire, verrouiller/déverrouiller plusieurs fois pour synchroniser le CAN.
3. Contrôler bip, clignotants et LED clignotante.
4. Avec une porte cabine ouverte, vérifier l'absence de verrouillage et d'armement.
5. Déclencher chaque porte détectée et chaque accessoire appris.
6. Vérifier l'alarme acoustique d'environ `30 secondes`.
7. Vérifier l'alarme optique d'environ `180 secondes`.
8. Désarmer ou interrompre avec la touche de déverrouillage.
9. Tester séparément CAN, feux de détresse, centralisation, LED et sirène/klaxon.
10. Vérifier l'absence de nouveaux témoins ou codes défauts.

Une série de bips courts à l'armement signale un contact magnétique appris ouvert ; le système s'arme néanmoins selon la source.

## Contacts radio magnétiques

- Orienter la LED de transmission de la carte à l'opposé de l'aimant.
- Respecter une distance de `22-30 mm` et la ligne limite rouge.
- Coller sur une surface propre, sèche et dégraissée, au-dessus de `15 °C`, puis attendre environ `24 heures`.
- Pour un écart plus grand ou une meilleure orientation d'antenne, utiliser l'adaptateur `100428` ou `100729`.

Voir [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

## Dépannage

| Symptôme | Contrôle / remède |
|---|---|
| Pas de réaction à la télécommande, mais bip à la mise sous tension | Contrôler CAN blanc/orange et violet/orange ; activer brièvement le diagnostic et observer la LED lors du trafic CAN. |
| Aucun trafic CAN | Contrôler les broches et codes ; ne pas déduire la fonction des couleurs grise/blanche 2019/2022. |
| Ni réaction ni bip | Contrôler alimentation, broche 18, `7772`, dérivation, état d'allumage et fusible `10 A`. |
| Système inactif avec allumage | comportement documenté ; contrôler broche 17, `8373`, borne 15. |
| Contact ouvert signalé à tort | Contrôler distance et orientation, actionner plusieurs fois et couper brièvement l'alimentation si nécessaire. |
| Centralisation incorrecte | Contrôler profil, carte, broches 1/34, `0000`/`0968` et câbles bleu/bleu-noir ; appliquer la matrice hors tension. |
| Klaxon sans fonction | Contrôler année, connecteur E broche 8, `1116` et commutation masse/`+12 V` ; utiliser une sirène séparée à partir de 2019. |
| Véhicule différent de la notice | Arrêter et obtenir une validation spécifique du constructeur ou du support THITRONIK. |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Décision sur les sources

- La notice véhicule de dix pages `01/2026` et le supplément ZV d'une page ont été intégralement contrôlés textuellement et visuellement.
- Le schéma confirme `SW2 + SW6`, plus `SW5` seulement avec carte ; les anciennes valeurs `SW1` / `SW1 + SW5` sont corrigées.
- Le supplément ZV est repris uniquement comme matrice de douze essais de `SW1`, `SW3` et des deux sorties.
- La notice générale `1.8` complète la sécurité et le diagnostic sans primer sur l'instruction spécifique.
- `Iceco Daily.docx` et `Fahrzeugbesonderheiten.docx` ne sont pas disponibles localement ; leurs affirmations 4x4/Carthago et l'interprétation fonctionnelle de `SW1`/`SW3` ne constituent pas des preuves.
- La remarque 2025 est séparée du champ 2011-2024 et n'autorise pas la nouvelle génération BCM.

## Références croisées

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper|Carte de conversion safe.lock]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Iveco Daily Euro 4 (2006–2011)|Iveco Daily Euro 4]]
