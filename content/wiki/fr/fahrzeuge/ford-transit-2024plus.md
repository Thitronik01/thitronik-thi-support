---
title: Ford Transit / Tourneo Custom / Transit Custom (2024+)
sources:
  - sources/Seriennummer 5298 Wipro III safe.lock Ford Transit 2019.csv
  - sources/Fahrzeugbesonderheiten.docx
  - sources/WiPro III 5 safe.lock.docx
  - sources/WiPro III 6 safe.lock.docx
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-19'
confidence: medium
lang: fr
translation_of: sources/fahrzeuge/ford-transit-2024plus.md
---

# Ford Transit / Tourneo Custom / Transit Custom (2024+)

Cet article décrit le montage du **kit WiPro III safe.lock Ford** dans la nouvelle électronique du Ford Transit, du Ford Tourneo Custom et du Ford Transit Custom. La variante, la période de production, les désignations des connecteurs, le numéro de série du kit et la version logicielle doivent tous correspondre.

> **Limitation critique :** ce profil est documenté uniquement pour le **mode camping**. Verrouiller le véhicule avec un moyen de commande THITRONIK® pris en charge. Un verrouillage préalable avec la clé d’origine peut bloquer le déverrouillage ultérieur avec les accessoires THITRONIK®.

## Champ d’application

| Caractéristique | Prescription |
|---|---|
| Véhicules | Ford Transit ; Ford Tourneo Custom ; Ford Transit Custom |
| Ford Transit | à partir de `07/2024` |
| Tourneo Custom / Transit Custom | à partir de `08/2023` |
| Système | kit WiPro III safe.lock Ford, réf. `105298` |
| Version minimale | `5298-005 / 1.0.1sf` |
| Profil véhicule | `SW1` à `SW8` tous sur `OFF` |
| Mode de fonctionnement | uniquement mode camping ; fonctionnement normal non documenté |
| Signes distinctifs | combiné d’instruments numérique et, selon la version automatique, sélecteur rotatif de vitesses |

Ces signes aident à identifier le modèle, mais ne remplacent pas le contrôle du modèle, de la date de production, de la forme des connecteurs et de l’affectation des broches. Pour le Ford Transit jusqu’à `07/2024`, voir [[Ford Transit 7e génération Facelift (2019-07/2024)|Ford Transit 7G Facelift]].

## Distinguer numéro de série, logiciel et faisceau

| À partir du numéro de série | Logiciel / version | Importance pour ce montage |
|---|---|---|
| `5298-005` | `1.0.1sf` | minimum pour Ford Transit dès `07/2024` et Tourneo Custom / Transit Custom dès `08/2023` ; mode camping et protection anti-enfermement |
| `5298-006` | modification du faisceau | les fils safe.lock bleus possèdent des contacts directs pour J4 broches 9 et 23 |
| `5298-008` | `1.0.3sf` | correction documentée de la protection anti-enfermement avec Pro-Finder pour Ford Transit `2019–2024` ; ne pas en faire un minimum général pour tous les véhicules 2024+ sans contrôler la variante |

Cet article distingue volontairement la **prise en charge du véhicule** dès `5298-005` et la **version du faisceau** dès `5298-006`. Relever le numéro de série complet, le logiciel et le type de contacts avant de commencer. Voir [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Régler le profil DIP en toute sécurité

Pour cette nouvelle génération Ford, les **huit commutateurs DIP doivent être sur `OFF`**.

1. Mettre le véhicule hors tension et empêcher toute remise sous tension involontaire.
2. Vérifier que ni le connecteur WiPro à 20 broches ni celui du Pro-Finder ne sont branchés.
3. Ouvrir prudemment le boîtier WiPro.
4. Placer `SW1`, `SW2`, `SW3`, `SW4`, `SW5`, `SW6`, `SW7` et `SW8` sur `OFF`.
5. Photographier les positions ou les consigner sur la fiche de travail.
6. Fermer le boîtier avant de rétablir l’alimentation.

> **Ne pas transposer :** l’ancien manuel général indique `SW1 + SW2` pour « Ford Transit à partir de 2006 ». Ce réglage historique générique ne s’applique pas ici. La matrice homologuée indiquant **tous sur OFF** prévaut.

Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## Sécurité et préparation

- Confier les travaux électriques, CAN et de verrouillage centralisé à un technicien qualifié.
- Relever avant démontage les voyants, défauts d’éclairage et entrées de mémoire de défauts existants.
- Maintenir le véhicule et la WiPro hors tension pendant les raccordements.
- Contrôler ensemble désignation du connecteur, numéro de broche, couleur et signal mesuré.
- Ne jamais se fier à la seule couleur : C214 possède deux fils bleu/blanc voisins.
- Ne pas rallonger, inverser ni détorsader inutilement les fils CAN.
- Isoler séparément les fils inutilisés et protéger le câblage contre frottement, traction et pièces mobiles.
- En cas de différence de connecteur, broche ou équipement, arrêter et consulter la notice actuelle ou l’assistance THITRONIK.

Prévoir les outils de dépose adaptés, un multimètre, une pince à sertir, des raccords homologués, de l’isolant et des moyens de décharge de traction. Le parcours de démontage exact n’est pas établi par les sources locales et n’est donc pas reconstitué.

## Vue d’ensemble des raccordements

| Raccord véhicule | Fil véhicule | Fil WiPro | Fonction |
|---|---|---|---|
| J6, broche 17 | marron/jaune | rouge/rose | feux de détresse |
| J6, broche 3 | blanc/orange | jaune | allumage / borne 15 |
| J4, broche 9 | violet/gris | bleu | verrouillage centralisé / safe.lock |
| J4, broche 23 | gris/jaune | bleu/noir | verrouillage centralisé / safe.lock |
| contre-connecteur noir, broche 20 | rouge, via fusible F8 `10 A` | rouge | plus permanent / borne 30 |
| contre-connecteur noir, broche 10 | violet/orange | violet/orange | CAN-Low |
| contre-connecteur noir, broche 9 | gris/orange | blanc/orange | CAN-High |
| C214, broche 17 | bleu/blanc | rose | klaxon du véhicule |
| point de masse approprié | masse carrosserie | noir | masse / borne 31 |

Ces points proviennent du fonds rédactionnel spécifique au véhicule. Confirmer chaque affectation sur le véhicule réel avant tout raccordement.

## Feux de détresse et allumage sur J6

1. Identifier sans ambiguïté `J6` et le rendre accessible hors tension.
2. Sur `J6 broche 17`, relier le fil marron/jaune au fil WiPro rouge/rose avec un raccord homologué.
3. Mesurer le fil blanc/orange sur `J6 broche 3` et le relier au fil WiPro jaune.
4. Vérifier que la broche 3 fournit bien le signal d’allumage et n’a pas été confondue avec un fil de même couleur ailleurs.
5. Verrouiller complètement le connecteur et assurer la décharge de traction.

## Verrouillage centralisé et safe.lock sur J4

1. Identifier sans ambiguïté le connecteur `J4`.
2. Affecter le fil violet/gris de `J4 broche 9` au fil WiPro bleu.
3. Affecter le fil gris/jaune de `J4 broche 23` au fil WiPro bleu/noir.
4. Avec un faisceau à partir de `5298-006`, insérer les contacts directs existants aux positions prévues et vérifier leur maintien.
5. Avec `5298-005` ou un autre type de contact, ne pas improviser ; utiliser la notice ou l’homologation correspondant au kit.
6. Contrôler le verrouillage du connecteur et la décharge de traction des deux fils safe.lock.

Les deux fils constituent ensemble la liaison safe.lock/verrouillage centralisé. Ne pas les inverser, les réunir ni les traiter comme des contacts de fermeture librement interchangeables.

## Plus permanent, CAN et masse

Le plus permanent et le CAN occupent trois broches distinctes du contre-connecteur noir.

1. Identifier le fil rouge sur la `broche 20` et contrôler le fusible `F8` de `10 A`.
2. Relier le fil WiPro rouge au fil véhicule rouge de la `broche 20`.
3. Relier le fil violet/orange de la `broche 10` au fil WiPro violet/orange comme CAN-Low.
4. Relier le fil gris/orange de la `broche 9` au fil WiPro blanc/orange comme CAN-High.
5. Relier le fil WiPro noir à un point de masse solide du véhicule.
6. N’ouvrir la paire torsadée CAN que sur la longueur nécessaire puis la sécuriser mécaniquement.
7. Ne rétablir l’alimentation qu’après contrôle de tous les raccordements.

Ne pas inverser CAN-High et CAN-Low. L’affectation générale WiPro confirme blanc/orange pour CAN-High, violet/orange pour CAN-Low, rouge pour la borne 30 et noir pour la borne 31.

## Klaxon du véhicule sur C214

1. Identifier sans ambiguïté le connecteur `C214`.
2. Repérer la `broche 17` à l’aide du marquage.
3. Mesurer le fil bleu/blanc situé exactement sur cette broche.
4. Le relier au fil WiPro rose.
5. Isoler, décharger la traction et verrouiller complètement le connecteur.

> **Risque de confusion :** C214 possède deux fils bleu/blanc côte à côte. Utiliser uniquement celui de la **broche 17** ; la couleur seule ne suffit pas.

Le klaxon du véhicule, la sirène interne et une éventuelle sirène auxiliaire sont distincts. Voir [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]].

## Mode camping et moyens de commande

| Action | Comportement documenté / prescription |
|---|---|
| Verrouillage avec accessoire THITRONIK® | moyen prévu en mode camping ; la fonction Auto-Close du véhicule est ensuite inactive |
| Déverrouillage avec la clé d’origine après verrouillage THITRONIK® | reste possible selon la description générale du mode camping |
| Verrouillage avec la clé d’origine | peut bloquer ensuite l’accessoire THITRONIK® ; à éviter en mode camping |
| Protection anti-enfermement | dans certaines situations, verrouillage et armement ne s’effectuent pas ; un signal sonore et les feux de détresse avertissent |

Selon l’équipement homologué, la commande THITRONIK® peut utiliser l’[[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]], le [[Module NFC — commande de la WiPro via NFC|Module NFC]] ou l’application. Voir [[Supports d’accès et commande — voies d’accès dans le système THITRONIK|Supports d’accès et commande]].

Avec le [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]], relever numéro de série et logiciel complets. Le seuil `5298-008 / 1.0.3sf` corrige la protection anti-enfermement sur Ford Transit `2019–2024` ; son application à la nouvelle variante doit être contrôlée sur le kit concerné.

## Mémoriser et contrôler les accessoires radio

Mémoriser les accessoires avant leur montage définitif et contrôler leur portée à l’emplacement prévu.

1. Brancher le connecteur à 20 broches seulement après le réglage correct des DIP.
2. Maintenir le bouton WiPro jusqu’au signal sonore long et à l’allumage fixe de la LED d’état.
3. Déclencher chaque contact magnétique en séparant émetteur et aimant ; appuyer sur une touche de chaque émetteur radio.
4. Attendre le bref signal de confirmation et la courte extinction de la LED pour chaque composant.
5. Quitter le mode de mémorisation par une nouvelle pression brève ; contrôler le double signal et l’extinction de la LED.
6. Activer le mode diagnostic par une pression brève et déclencher chaque accessoire à son emplacement définitif.
7. Sans confirmation, contrôler la mémorisation, le blindage, l’antenne et l’emplacement.

Procédure complète : [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Contrôle fonctionnel final

1. Relever encore une fois numéro de série, logiciel, véhicule et réglage `tous sur OFF`.
2. Contrôler tous les connecteurs, broches, fusibles, la masse et les décharges de traction.
3. Remettre véhicule et système en état normal de test et observer les messages de défaut.
4. Activer le diagnostic CAN et générer du trafic avec les feux de détresse ou une commande adaptée.
5. Vérifier que la LED d’état clignote ou scintille selon le débit CAN.
6. Verrouiller par un moyen THITRONIK® homologué et vérifier armement, verrouillage centralisé et confirmation visuelle.
7. Contrôler le klaxon par une alarme d’essai maîtrisée.
8. Ouvrir séparément chaque porte surveillée par CAN et chaque contact radio mémorisé.
9. Désarmer et déverrouiller avec le moyen THITRONIK® prévu.
10. Tester la clé d’origine séparément après verrouillage THITRONIK® ; ne pas verrouiller d’abord avec la clé d’origine.
11. Contrôler enfin la mémoire de défauts et les fonctions du véhicule, puis consigner le résultat.

## Défauts typiques

| Défaut | Contrôle / correction |
|---|---|
| Aucune réaction ou réaction erronée | contrôler variante et production ; tous les DIP doivent être `OFF` |
| Aucune activité CAN | contrôler contre-connecteur noir, broches 9/10, couleurs, raccords et CAN-High/CAN-Low |
| Feux de détresse inactifs | contrôler J6 broche 17, fil marron/jaune et fil WiPro rouge/rose |
| Allumage non détecté | mesurer J6 broche 3, fil blanc/orange et fil WiPro jaune |
| Verrouillage centralisé incorrect | contrôler J4 broches 9/23, ordre des fils bleus, contacts dès `5298-006` et verrouillage |
| Klaxon muet | identifier C214 broche 17 par son numéro, pas le fil bleu/blanc voisin |
| WiPro inactive | contrôler broche 20, fil rouge, fusible F8 `10 A`, masse et connecteur 20 broches |
| Accessoire THITRONIK® sans déverrouillage après la clé d’origine | respecter la séquence du mode camping ; ne pas verrouiller d’abord avec la clé d’origine |
| Signal sonore et feux synchrones au lieu du verrouillage | situation possible de protection anti-enfermement ; contrôler portes, commande précédente, version et Pro-Finder |
| Accessoire radio non reçu | contrôler mémorisation, diagnostic, blindage et antenne |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Base documentaire et décision rédactionnelle

- L’ancienne version allemande cite quatre sources internes : liste des numéros de série Ford, `Fahrzeugbesonderheiten.docx` et deux documents safe.lock datés `12/2025`.
- Ces quatre fichiers sont introuvables dans le projet accessible. Leurs références restent dans le frontmatter pour la traçabilité ; aucun chemin fictif ne les remplace.
- Les limites des véhicules, le profil DIP et le minimum ont été comparés aux articles allemands homologués sur la compatibilité et les versions.
- L’ancien article conservé fournit les connecteurs, broches, couleurs et l’avertissement concernant les deux fils bleu/blanc de C214.
- Le manuel général version `1.8` a été analysé textuellement ; les pages allemandes pertinentes sur DIP, mémorisation, diagnostics radio/CAN, alarme d’essai, brochage, données techniques et dépannage ont aussi été contrôlées visuellement.
- L’ancien réglage Ford général `SW1 + SW2` n’est pas appliqué à cette génération. Aucun emplacement de dépose ni démontage non prouvé n’a été ajouté.

Avant un montage réel, comparer impérativement la **notice de montage actuelle spécifique au véhicule** avec le véhicule concerné.

## Articles connexes

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Supports d’accès et commande — voies d’accès dans le système THITRONIK|Supports d’accès et commande]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Module NFC — commande de la WiPro via NFC|Module NFC]]
- [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Ford Transit 7e génération Facelift (2019-07/2024)|Ford Transit 7G Facelift]]
