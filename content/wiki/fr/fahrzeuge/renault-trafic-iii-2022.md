---
title: Renault Trafic III / Nissan Primastar (à partir de 2022)
sources:
  - >-
    H:/Thitronik WIKI
    (ml)/wiki/de/wipro_iii_renault_trafic_iii___nissan_primastar_2022_.pdf
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/renault-trafic-iii-2022.md
---

# Renault Trafic III / Nissan Primastar (à partir de 2022)

Cet article décrit l'installation d'une WiPro III dans un Renault Trafic III ou un Nissan Primastar à partir de l'année-modèle 2022. Le manuel spécifique au véhicule, version `08/22`, couvre le profil, le démontage, les raccordements CAN et feux de détresse, l'alimentation, l'allumage, la masse, le klaxon, la LED d'état, le Pro-Finder optionnel, les accessoires radio et le contrôle final.

> **Délimitation :** la version à partir de 2022 n'utilise ni le même réglage DIP de base ni le même point de raccordement CAN que la plate-forme 2014–2021. Contrôler ensemble véhicule, année-modèle, connecteur gris à 40 broches, numéros de broche et couleurs de fil ; voir [[Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento (2014–2021)|Renault Trafic III 2014–2021]].

## Champ d'application

| Caractéristique | Prescription |
|---|---|
| Véhicules | Renault Trafic III et Nissan Primastar |
| Années-modèles | à partir de 2022 |
| Système principal | WiPro III, kit réf. `100754` |
| Logiciel minimal | `6.10.0`, indiqué explicitement dans le manuel du véhicule |
| Numéro de série minimal | non indiqué ; contrôler la version logicielle et la variante de l'appareil avant le montage |
| Configuration du véhicule | `SW1 + SW2 + SW4 + SW5 + SW6` sur `ON` ; `SW3` sur `OFF` |
| Commande lors du contrôle documenté | verrouiller d'abord avec la clé d'origine, puis armer séparément la WiPro avec une télécommande radio THITRONIK |

Les anciennes valeurs du projet `SW3 + SW6` et `0823-019 / 7.1` contredisent le manuel spécifique plus récent et ne sont pas reprises pour ce profil. Aucun numéro de série ne doit être déduit de la version `6.10.0`. Consigner la version et la variante selon [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Profil du véhicule et logique de commande

| Interrupteur | Position | Signification |
|---|---|---|
| `SW1`, `SW2`, `SW4`, `SW5`, `SW6` | `ON` | profil complet documenté pour les véhicules à partir de 2022 |
| `SW3` | `OFF` | ne fait pas partie du profil documenté |
| `SW7` | normalement `OFF` | ne mettre sur `ON` que pour désactiver volontairement l'alarme anti-brouillage |
| `SW8` | normalement `OFF` | ne mettre sur `ON` que pour réduire volontairement le volume de la sirène interne |

`SW5` est ici obligatoire. La télécommande d'origine ne commande donc pas la WiPro, mais l'analyse des portes reste active. Le contrôle sépare les deux actions : la clé d'origine verrouille le véhicule, puis une [[Émetteur radio 868 — télécommande pour WiPro III|télécommande radio THITRONIK]] mémorisée arme la WiPro.

Modifier les DIP uniquement hors tension, connecteurs WiPro à 20 broches et Pro-Finder débranchés. Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## Sécurité et préparation au travail

- Les travaux sur l'électricité et l'électronique des véhicules doivent être confiés à un spécialiste qualifié.
- Avant de commencer, vérifiez et documentez les voyants d'avertissement existants, les erreurs d'éclairage et les entrées de la mémoire d'erreurs.
- Coupez l'alimentation électrique avant d'ouvrir le boîtier du WiPro, de changer les commutateurs DIP ou de travailler sur les câbles du véhicule.
- Vérifiez ensemble la forme du connecteur, le numéro de broche, la couleur du fil et le signal sur le véhicule réel.
- Pour CAN, feux de détresse et klaxon, utilisez les connecteurs remplis de gel requis par le manuel du véhicule.
- Isoler individuellement les entrées et sorties inutilisées ; N'écrasez pas les câbles et ne les posez pas sur des pièces pointues ou mobiles.
- Si les conditions du véhicule s'écartent des instructions ou des illustrations, arrêtez le travail et contactez le fabricant ou l'assistance THITRONIK.

Ce dont vous avez besoin est, entre autres, un tournevis Phillips PH2 ou Torx 20/25, une pince adaptée, un appareil de mesure, un oeillet, le porte-fusible inclus et une perceuse `8-mm` pour la LED d'état.

## Apprenez les accessoires radio avant l'installation

Tous les accessoires radio inclus dans la livraison et les accessoires supplémentaires portant la plaque d'immatriculation `868` doivent être formés une seule fois.

1. Appuyez et maintenez enfoncé le bouton à droite de la fiche de connexion jusqu'à ce que le WiPro émette un bip ; la LED d'état est allumée en permanence.
2. Déclenchez deux à trois fois chaque contact radiomagnétique à enregistrer, chaque émetteur radio portatif, chaque boucle de câble radio et chaque alarme de gaz radio.
3. Pour ce faire, retirez l'aimant supérieur au `30 mm` de l'unité émettrice, appuyez sur les boutons de l'émetteur manuel, allumez l'alarme gaz ou retirez la boucle de câble de son support.
4. Attendez que la tonalité de confirmation et la LED d'état de chaque composant s'éteignent brièvement.
5. Pour terminer le mode d'apprentissage, débranchez brièvement le système de l'alimentation électrique ou appuyez brièvement sur le bouton du WiPro.

Le processus général et la différenciation par rapport au mode diagnostic se trouvent sous [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Accéder au tableau de bord et au calculateur de carrosserie

1. Déposer l'habillage du plancher côté conducteur ; l'habillage latéral est clipsé.
2. Retirer le conduit d'aération transversal après avoir enlevé son rivet plastique.
3. Repérer le calculateur de carrosserie à droite de la colonne de direction.
4. Retirer une vis de fixation TX20.
5. Tirer prudemment le calculateur vers le bas sans mettre les câbles ni les connecteurs sous tension mécanique.

## Raccordement CAN sur le connecteur gris à 40 broches

Le point de raccordement se trouve sur le calculateur de carrosserie, à droite de la colonne de direction, sur le **connecteur gris à 40 broches**. Utiliser des connecteurs remplis de gel.

| Fonction | Côté véhicule | Fil WiPro | Faisceau WiPro |
|---|---|---|---|
| CAN-High | vert, broche `26` | blanc/orange | broche `17` |
| CAN-Low | brun, broche `27` | violet/orange | broche `18` |

Les broches 26 et 27 doivent provenir du même connecteur. Ne pas inverser CAN-High et CAN-Low. Ce point diffère de celui de la plate-forme 2014–2021.

## Raccorder les feux de détresse

1. Identifier et mesurer le fil bleu à la broche `13` du même connecteur gris à 40 broches.
2. Le relier au fil rouge/rose de la WiPro avec un connecteur rempli de gel.
3. Selon le brochage général WiPro, le fil Smart Blinker rouge/rose correspond à la broche `6` du faisceau.
4. Protéger le fil contre la traction et le frottement, puis rebrancher complètement le connecteur.

Ce raccordement assure l'alarme visuelle et la confirmation d'armement documentée.

## Raccorder le positif permanent, l'allumage et la masse

Déverrouiller le haut du boîtier de fusibles et le tirer vers le siège conducteur. Ne prélever les positifs que sur des fils d'au moins `1 mm²`.

| Raccordement | Fil véhicule | Fil WiPro | Prescription |
|---|---|---|---|
| Borne 30 / positif permanent | rouge | rouge, broche `11` du faisceau | protéger l'alimentation avec le porte-fusible `10 A` fourni |
| Borne 15 / allumage | jaune | jaune, broche `7` | mesurer le signal avant raccordement |
| Borne 31 / point de masse près du boîtier | masse carrosserie | noir avec cosse annulaire, broche `1` | utiliser un point de masse propre et résistant |

Ne remettre sous tension qu'après contrôle de tous les raccordements. Monter le porte-fusible accessible et protégé du frottement.

## Raccorder le klaxon du véhicule

1. Déposer l'habillage de la colonne de direction.
2. Débrancher le connecteur véhicule à 16 broches situé à gauche sous le volant.
3. Identifier et mesurer le fil bleu à la **broche 10 du connecteur véhicule à 16 broches**.
4. Le relier au fil rose de commande de klaxon de la WiPro avec un connecteur rempli de gel.
5. Rebrancher complètement le connecteur et remonter l'habillage sans contrainte.

> **Distinction des broches :** la `broche 10` appartient au connecteur **du véhicule**. Le fil rose du klaxon se trouve, selon le brochage général WiPro, à la **broche 9 du faisceau**. Ne pas confondre ces deux numéros.

Le klaxon du véhicule, la sirène interne et une éventuelle sirène supplémentaire sont des avertisseurs distincts ; voir [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]].

## LED d'état du montage

1. Vérifiez l'arrière de l'emplacement d'installation prévu pour les câbles et les composants.
2. Percer un trou de diamètre `8 mm`.
3. Insérez la LED d'état.
4. Rebranchez le câble LED rouge/noir avec le connecteur blanc à la contrepartie du jeu de câbles WiPro.

La LED d'état doit rester visible pour le retour de l'opérateur, le diagnostic et la lecture de la mémoire d'alarme.

## Monter le Pro-Finder optionnel

Le manuel recommande l'espace sous le vide-poches situé au-dessus du combiné d'instruments. Après avoir retiré les vis, extraire prudemment l'insert. Placé à gauche ou à droite sous le vide-poches, le [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]] reste accessible pour l'entretien tout en étant dissimulé. Fixer solidement appareil et câbles sans gêner affichages, ventilation ni zones d'airbag.

## Installer des contacts radio-magnétiques

Fixez définitivement les contacts radiomagnétiques après un entraînement et un test de portée. [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]] contient des spécifications détaillées.

| Champ d'essai | Défaut |
|---|---|
| Variantes de montage | couchée à gauche, couchée à droite, verticale ou, si nécessaire, sur la vitre |
| Emplacement du tableau | Alignez la LED de transmission de l'aimant pour indiquer le chemin |
| Assemblage incorrect | Si la LED de transmission pointe vers l'aimant, l'apprentissage est possible, mais aucune alarme ne se produit. |
| Position de l'aimant | une fois fermé, dans la plage documentée d'environ `22–30 mm` |
| surface adhésive | propre, sec et sans graisse |
| Température de traitement | pas sous `15 °C` |
| Résistance finale des pastilles adhésives | après environ `24 heures` |
| Grandes distances / emplacement d'antenne défavorable | Vérifiez l'article d'adaptateur de montage `100428` ou `100729`. |

Si possible, fixez le boîtier de l'émetteur au cadre et l'aimant au vantail ou au battant de porte mobile. Lors de la fixation avec des vis, utilisez uniquement les points marqués à l'intérieur du boîtier de l'émetteur.

## Effectuer le contrôle fonctionnel

1. Fermer les portes et tous les contacts mémorisés.
2. Appuyer sur la touche de verrouillage de la télécommande d'origine et vérifier le verrouillage du véhicule.
3. Armer ensuite la WiPro avec une télécommande radio THITRONIK mémorisée.
4. Contrôler le signal sonore de la centrale et la confirmation par les feux de détresse.
5. Ouvrir mécaniquement la porte conducteur de l'intérieur avec la poignée.
6. Contrôler l'alarme sonore pendant environ `30 secondes`.
7. Contrôler l'alarme visuelle pendant environ `180 secondes`.
8. Appuyer sur une touche quelconque de la télécommande THITRONIK et vérifier le désarmement ou l'arrêt de l'alarme.
9. Contrôler la séquence de clignotement de la mémoire d'alarme sur la LED d'état.
10. Répéter le test avec chaque contact, boucle de câble et autre capteur radio mémorisé.

La valeur spécifique de `180 secondes` du manuel véhicule plus récent prévaut sur l'indication générale de `120 secondes`.

## Diagnostic CAN et radio

### Diagnostic CAN

1. Appuyer brièvement sur le bouton WiPro jusqu'à ce que la LED d'état du faisceau clignote.
2. Actionner la télécommande d'origine ou les feux de détresse afin de générer du trafic CAN.
3. Vérifier que la LED clignote ou papillote selon le débit du bus.
4. Sans réaction, contrôler le connecteur gris à 40 broches, les broches 26/27, les raccords et l'affectation CAN-High/CAN-Low.
5. Appuyer de nouveau brièvement pour quitter le diagnostic.

### Diagnostic radio

En mode diagnostic, déclencher chaque composant radio mémorisé à son emplacement prévu. La WiPro confirme chaque signal reçu par un son. En l'absence de confirmation, contrôler la mémorisation, l'emplacement, les pièces métalliques faisant écran et, si nécessaire, un adaptateur de montage.

## Défauts typiques

| Symptôme | Contrôle / mesure |
|---|---|
| La télécommande d'origine verrouille le véhicule sans armer la WiPro | comportement normal de ce profil ; armer la WiPro avec une télécommande THITRONIK mémorisée |
| Aucune activité CAN en diagnostic | contrôler le connecteur gris, broche 26 verte / blanc-orange et broche 27 brune / violet-orange ; ne pas inverser le CAN |
| Aucune alarme visuelle | contrôler le fil bleu broche 13 et le fil WiPro rouge/rose |
| Le klaxon reste muet | contrôler le fil bleu broche 10 du connecteur véhicule à 16 broches et le fil rose WiPro ; ne pas confondre broche véhicule 10 et broche faisceau 9 |
| WiPro sans fonction | contrôler positif permanent, fusible `10 A`, masse, cosse annulaire et connecteurs |
| Contact radio ouvert malgré l'ouvrant fermé | actionner plusieurs fois ; contrôler distance de l'aimant et orientation de la carte |
| Contact mémorisable mais sans alarme | la LED d'émission est peut-être orientée vers l'aimant ; corriger la carte |
| Réception radio peu fiable | contrôler pièces métalliques, antenne, position de la centrale et adaptateurs |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Sources et décision éditoriale

- Le manuel véhicule de dix pages *WiPro III – Renault Trafic III, Nissan Primastar, année 2022+*, version `08/22`, a été contrôlé intégralement, texte et illustrations.
- La page 2 confirme le kit `100754`, le logiciel minimal `6.10.0` et le profil `SW1 + SW2 + SW4 + SW5 + SW6`.
- Les pages 3–5 confirment démontage, connecteur gris, broches véhicule 13/26/27, alimentation, masse, broche véhicule 10 du klaxon, LED et emplacement du Pro-Finder.
- La page 6 confirme mémorisation, commande séparée, durées 30/180 secondes et contrôle.
- Les pages 7–10 confirment montage et positionnement des contacts radio.
- Le manuel général `1.8` complète sécurité, effet de `SW5`, broches de faisceau 6/7/9/11/17/18 et diagnostics.
- La broche `10` est celle du connecteur véhicule ; la broche `9` du faisceau suit le brochage WiPro général.
- Les anciennes valeurs `SW3 + SW6` et `0823-019 / 7.1` sont remplacées ; aucun numéro de série minimal n'est prouvé.
- La durée spécifique de `180 secondes` prévaut sur l'indication générale de `120 secondes`.

Sources primaires :

- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_renault_trafic_iii___nissan_primastar_2022_.pdf`
- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf`

## Articles connexes

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles|Boucle de câble radio 868]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]
- [[Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento (2014–2021)|Renault Trafic III 2014–2021]]
