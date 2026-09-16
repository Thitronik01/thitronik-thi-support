---
title: Iveco Daily Euro 4 (2006–2011)
sources:
  - sources/wipro_iii_iveco_daily_euro_4.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
updated: '2026-07-20'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/iveco-daily-euro4.md
---

# Iveco Daily Euro 4 (2006–2011)

Cet article décrit l'installation d'une WiPro III dans un Iveco Daily Euro 4 construit entre 2006 et 2011. Le manuel d'installation spécifique au véhicule, version `12/20`, documente les contrôles du véhicule, le démontage, les raccordements CAN et des feux de détresse, l'alimentation, la masse, le klaxon, la LED d'état, la pose de la centrale, le test fonctionnel et le diagnostic.

> **Délimitation :** l'année, la norme antipollution, l'ordinateur de bord, les inserts de connecteur, les broches et l'identification des câbles doivent tous correspondre au manuel. Pour les véhicules à partir de 2011, voir [[Iveco Daily Euro 5 et plus récent (2011-2024)|Iveco Daily Euro 5 et plus récent]].

## Champ d'application

| Caractéristique | Exigence |
|---|---|
| Véhicule | Iveco Daily Euro 4 |
| Années-modèles | 2006–2011 ; vérifier la version réelle du véhicule |
| Système principal | WiPro III avec kit de montage Iveco |
| Configuration du véhicule | `SW4 + SW6` sur `ON` |
| Commande | télécommande radio d'origine du véhicule, si présente et fonctionnelle |
| Base de compatibilité | `0823-001 / 2.1` ; le manuel du véhicule ne précise aucun numéro de série minimal distinct |

Avant la pose, vérifier le numéro de série, la version logicielle et la variante de l'appareil dans [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Priorité des sources et configuration du véhicule

| Source | Indication | Évaluation |
|---|---|---|
| manuel d'installation spécifique au véhicule, version `12/20` | `SW4 + SW6` | réglage obligatoire pour l'Iveco Daily Euro 4 |
| manuel d'installation général, version `1.8` | ancien tableau de groupe indiquant `SW2` parmi les commutateurs 1 à 4 | remplacé par l'instruction spécifique au véhicule, plus récente |

Ne modifier les commutateurs DIP que lorsque le système est hors tension. Ne pas déduire, combiner ni remplacer `SW4 + SW6` à partir de l'ancien tableau général Iveco. Les principes et les autres profils figurent dans [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## Sécurité et contrôle du véhicule

- Confier les travaux sur l'électricité et l'électronique du véhicule à un atelier spécialisé qualifié.
- Couper l'alimentation avant d'ouvrir la WiPro, de modifier les commutateurs DIP ou d'effectuer des travaux électriques.
- Isoler séparément chaque entrée et sortie inutilisée contre les courts-circuits.
- Vérifier sur le véhicule chaque broche, couleur ou code de câble, tension et fonction.
- Si les illustrations, inserts, broches ou identifications de câble diffèrent, arrêter les travaux et contacter le constructeur ou le support THITRONIK.

Avant de commencer, contrôler les fonctions suivantes et consigner les défauts existants :

1. La télécommande radio est présente et fonctionnelle ; insérer une pile bouton si nécessaire et vérifier l'acquittement par les clignotants.
2. Le verrouillage centralisé fonctionne.
3. L'ouverture d'une porte d'origine s'affiche au combiné lorsque le contact est mis.
4. Sur les camping-cars intégraux, déterminer quelles portes ou trappes sont déjà détectées par le CAN.
5. Contrôler le klaxon, l'éclairage, les témoins et l'état actuel de la mémoire de défauts.

Selon la source principale, il faut le kit de montage Iveco, une pince universelle, un tournevis cruciforme, une perceuse sans fil avec foret de `8 mm` et un outil Torx `T25`.

## Apprentissage des accessoires radio et réglage DIP

Effectuer l'apprentissage des contacts magnétiques, détecteurs de gaz et boucles de câble radio avant la pose.

1. Maintenir le bouton à droite du connecteur jusqu'au bip de la centrale et à l'allumage fixe de la LED d'état.
2. Déclencher chaque contact, détecteur de gaz ou boucle de câble deux à trois fois.
3. Vérifier la mémorisation par le bip et la brève extinction de la LED.
4. Couper l'alimentation et ouvrir le boîtier de la WiPro.
5. Placer `SW4` et `SW6` du commutateur à 8 positions sur `ON`.
6. Laisser les autres commutateurs dans la position homologuée pour la configuration de l'appareil.
7. Refermer le boîtier et poursuivre la pose.

La procédure générale figure aussi dans [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Dépose des garnitures de colonne et de l'ordinateur de bord

1. Défaire les fixations documentées de la garniture de colonne de direction et du cache de la boîte à fusibles.
2. Retirer les garnitures avec précaution.
3. Défaire les points de fixation documentés de l'ordinateur de bord.
4. Faire pivoter légèrement l'ordinateur de bord sans solliciter les câbles ni les connecteurs.
5. Retirer les connecteurs bleus, les amener vers l'avant et enlever le cache noir.
6. Déverrouiller et retirer les inserts.

Lors du remontage, remettre impérativement le cache noir du connecteur bleu et verrouiller complètement tous les connecteurs.

## CAN et feux de détresse sur l'ordinateur de bord

| Insert / broche | Câble du véhicule | Câble WiPro | Fonction |
|---|---|---|---|
| insert blanc, broche 29 ou 34 | bleu clair | rose/rouge | feux de détresse |
| insert vert, broche 5 | violet | violet/orange | CAN-Low |
| insert vert, broche 6 | violet | blanc/orange | CAN-High |
| insert noir, broche 25 | violet | violet/orange | autre raccordement CAN-Low |
| insert noir, broche 24 | violet | blanc/orange | autre raccordement CAN-High |

CAN-Low et CAN-High doivent provenir du **même insert** : soit les broches 5/6 de l'insert vert, soit les broches 25/24 de l'insert noir. Ne pas mélanger les deux variantes. Pour les feux de détresse, relier le câble rose/rouge de la WiPro à la broche 29 ou 34 de l'insert blanc avec un connecteur de dérivation bleu rempli de gel.

## Masse et alimentation

| Raccordement | Spécification du véhicule | Action |
|---|---|---|
| point de masse sur la colonne de direction | filetage `M8` | réaliser une masse correcte et vérifier son serrage |
| ordinateur de bord, broche 46 | protégée par `F39`, `10 A` | insérer un contact serti dans la broche 46 libre ou utiliser un connecteur de dérivation homologué si elle est occupée |

Mesurer ou identifier sans ambiguïté la broche 46, le plus permanent, le fusible et la masse avant le raccordement. Ne rétablir l'alimentation qu'après avoir contrôlé le réglage DIP et tous les branchements.

## Klaxon du véhicule

| Période | Câble du véhicule | Câble WiPro | Raccordement |
|---|---|---|---|
| jusqu'en 2010 | câble jaune au connecteur du commodo clignotants/klaxon | rose | relier avec un connecteur de dérivation bleu rempli de gel |
| à partir de 2010 | code de câble `1116`, câble bleu clair | rose | relier avec un connecteur de dérivation bleu rempli de gel |

Confirmer ensemble l'année-modèle, le code, la couleur et la fonction du klaxon avant toute dérivation. Le klaxon et la sirène intégrée ou supplémentaire sont des avertisseurs distincts.

## LED d'état et montage de la centrale

1. Vérifier l'absence de câbles et de composants derrière l'emplacement prévu pour la LED.
2. Percer un trou de `8 mm`.
3. Insérer la LED d'état et la relier au faisceau WiPro.
4. Fixer la WiPro III dans la garniture de colonne avec l'adaptateur de montage et les pastilles adhésives.
5. Guider le faisceau vers le bas comme dans la source principale sans pincer les câbles.
6. Garantir une position sèche et protégée de la centrale et un cheminement libre de l'antenne.

Le titre « Réaliser la commande du klaxon » de l'étape 8 de la source est manifestement une erreur rédactionnelle : le texte et l'image montrent le **montage de la WiPro III**, et non un second raccordement du klaxon.

## Test fonctionnel final

1. Fermer les portes et armer le système avec le bouton de verrouillage de la télécommande radio d'origine.
2. Si la WiPro ne réagit pas immédiatement, verrouiller et déverrouiller plusieurs fois pour synchroniser les données CAN.
3. Vérifier l'armement par un bip, le clignotement des indicateurs de direction et la LED d'état clignotante.
4. Laisser une porte de cabine ouverte et vérifier que le véhicule ne se verrouille pas et que la WiPro ne s'arme pas.
5. Verrouiller correctement le véhicule et déclencher un test par chaque porte de cabine détectée et chaque accessoire radio appris.
6. Vérifier un signal acoustique d'environ `30 secondes`.
7. Vérifier un signal optique par les clignotants d'environ `180 secondes`, sauf arrêt anticipé.
8. Désarmer ou interrompre l'alarme avec le bouton de déverrouillage.
9. Tester séparément la détection CAN, les feux de détresse, le klaxon, la LED d'état et chaque détecteur supplémentaire.
10. Vérifier enfin qu'aucun nouveau témoin, défaut électrique ou code défaut n'est apparu.

Une série de bips courts à l'armement signale un contact magnétique appris resté ouvert ; selon la source, le système s'arme néanmoins. Les contacts exigent l'orientation correcte du circuit imprimé, une plage magnétique de `22–30 mm`, une surface propre et dégraissée, une température d'application d'au moins `15 °C` et environ `24 heures` jusqu'à l'adhérence finale. Voir [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

## Diagnostic

| Symptôme | Contrôle et remède |
|---|---|
| Aucune réaction à la télécommande, mais bip lors du raccordement de l'alimentation | Contrôler le CAN ; activer brièvement le mode diagnostic avec le bouton du circuit imprimé et observer le scintillement de la LED verte gauche lors d'une commande ou d'un autre trafic CAN. |
| Aucun trafic CAN en mode diagnostic | Bus inactif ou branchement défectueux ; contrôler la paire de broches, l'utilisation du même insert et les raccordements. |
| Aucune réaction et aucun bip à la mise sous tension | Contrôler l'alimentation, la broche 46, le sertissage ou la dérivation, l'état du contact et le fusible `F39`. Le système est désactivé lorsque le contact est mis. |
| Contact ouvert signalé malgré toutes les ouvertures fermées | Contrôler l'écart de l'aimant et l'orientation du circuit, actionner plusieurs fois les contacts puis, si nécessaire, couper brièvement l'alimentation ou `F39` avec tous les contacts fermés. |
| Feux de détresse ou klaxon sans fonction | Contrôler l'insert blanc et la broche 29/34, ou le câble de klaxon correspondant à la période ; tester la fonction du véhicule et la dérivation. |
| Véhicule ou connecteur différent du manuel | Arrêter les travaux et obtenir une validation spécifique auprès du constructeur ou du support THITRONIK. |

Pour les contrôles généraux, voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Décision relative aux sources

- Le manuel spécifique de dix pages *WiPro III – Iveco Daily Euro 4 (2006–2011)*, version `12/20`, a été entièrement contrôlé textuellement et visuellement.
- Les pages 1 à 6 documentent la sécurité, les contrôles, `SW4 + SW6`, le démontage, les raccordements, la pose, le test et le diagnostic ; les pages 7 à 10 contiennent les prescriptions de montage des contacts radiomagnétiques 868.
- Le manuel général version `1.8` complète les bases de sécurité, de diagnostic et de raccordement. Son ancien réglage de groupe Iveco `SW2` est remplacé par l'exigence spécifique `SW4 + SW6`.
- Pour la durée d'alarme, la source spécifique s'applique : environ `30 secondes` acoustiques et `180 secondes` optiques. L'ancienne valeur générale de `120 secondes` pour les clignotants n'est pas reprise.
- La base `0823-001 / 2.1` provient de la matrice homologuée ; le manuel spécifique ne précise aucun numéro de série minimal distinct.

## Références croisées

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Iveco Daily Euro 5 et plus récent (2011-2024)|Iveco Daily Euro 5 et plus récent]]
