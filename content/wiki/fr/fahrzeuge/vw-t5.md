---
title: VW T5 (2006-2009)
sources:
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t5_2006-2009.pdf'
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/vw-t5.md
---

# VW T5 (2006-2009)

Cette page couvre l'installation du WiPro III dans le VW T5 avant restylage de 2006 à 2009. La source principale est le guide du véhicule de dix pages daté de `12/20` ; Le guide d'installation général Rev. `1.8` complète les données de sécurité et du faisceau à 20 broches.

> ** Limite : ** À partir de l'année modèle 2010, utilisez [[VW T5 facelift (à partir de MY 2010)]]. L'année, le connecteur, les couleurs des fils et les signaux doivent correspondre à cette version avant restylage.

## Aperçu

| Paramètre | Statut vérifié |
|---|---|
| Véhicule | avant restylage VW T5 |
| Années | 2006-2009 |
| Système | WiPro III |
| DIP → ON | `SW1 + SW3 + SW6` |
| Connecteur de véhicule | connecteur G noir à 18 broches, trois rangées de six |
| Surveillance CAN | toutes les portes et capot d'origine contact |
| Opération | véhicule à distance ; les accessoires sans fil peuvent également être mémorisés en |
| Série/logiciel minimum | non indiqué dans les sources primaires |
| Durée de l'alarme | audible env. `30 secondes`, visuel env. `180 secondes` |

## Portée de la source et limites de version

| Sujet | Déclaration approuvée |
|---|---|
| Profil du véhicule | T5 2006–2009 avec `SW1 + SW3 + SW6` uniquement |
| Point de raccordement | identifier le connecteur G par boîtier, disposition des rangées, couleur et signal |
| Alimentation | connexion de la batterie selon le guide du véhicule ; Broches WiPro `1`, `7` et `11` selon le guide général |
| Sirène | sirène normale ou de secours selon schéma véhicule |
| Seuil série/logiciel | `0823-001 / 2.1` n'est pas pris en charge et n'est pas conservé |
| Véhicule différent | arrêter et obtenir l'approbation actuelle |

1. Confirmez le modèle et l'année à partir des documents.
2. Distinguez-le du lifting 2010+.
3. Enregistrez l'article WiPro, la série et le logiciel.
4. Confirmez les couleurs du connecteur G et des fils.
5. Ne transférez pas de données si quelque chose diffère.

## Sécurité et préparation

Le guide est destiné aux ateliers de services professionnels. Des travaux incorrects autour du système électrique, des airbags ou des garnitures du véhicule peuvent mettre en danger les personnes et la sécurité routière.

1. Faites appel à un technicien qualifié.
2. Débranchez la batterie selon les instructions du fabricant.
3. Changez les commutateurs DIP uniquement sans alimentation.
4. Isolez chaque entrée et sortie inutilisée.
5. Protéger le câblage contre l'abrasion, la tension, la chaleur et l'humidité.
6. Gardez les pédales, la direction, les airbags et les pièces mobiles dégagés.
7. Préparez le kit de montage, les pinces, le tournevis Phillips, le Torx 20, la perceuse et l'embout LED d'état `8 mm`.
8. Mémorisez les accessoires sans fil avant le montage final.

## Profil DIP et surveillance CAN

CAN est intéressant même sans verrouillage centralisé car il surveille toutes les portes d'origine et le contact du capot.

1. Retirez toute l'alimentation WiPro.
2. Ouvrez le boîtier et exposez l'interrupteur à huit voies.
3. Réglez `SW1`, `SW3` et `SW6` sur `ON`.
4. Laissez les autres interrupteurs comme indiqué dans le guide du véhicule.
5. Photographiez ou enregistrez le réglage.
6. Fermez le boîtier avant le câblage.

Incluez l'interrupteur du capot dans les tests : un faux état « ouvert » peut produire un avertissement de contact lors de l'armement.

## Ouvrir le tableau de bord et monter l'unité de contrôle

1. Retirez délicatement la garniture latérale du tableau de bord.
2. Relâchez la garniture autour de l'interrupteur d'éclairage.
3. Retirez les vis Torx 20 marquées.
4. Retirez les vis inférieures du tableau de bord.
5. Déclipsez la garniture du tunnel central.
6. Retirez la vis derrière le panneau central.
7. Déclipsez le panneau et exposez l'calculateur de bord vers l'avant.
8. Montez l'unité de commande WiPro III au sec, protégée, accessible et dégagée des airbags et des pédales.

Suivez la séquence d’images de la page 3 pour connaître les positions exactes.

## Connecteur G et câblage du véhicule

Le connecteur G est noir avec 18 cavités réparties sur trois rangées de six. La source montre une vue de dessus avec le loquet en bas et ne donne aucune broche numérique du véhicule. Vérifiez ensemble le boîtier, la vue, la cavité, la couleur et le signal mesuré.

| Fil du véhicule au connecteur G | Fil / broche WiPro | Fonction |
|---|---|---|
| orange/marron | violet/orange, épingle `18` | CAN-Low |
| orange/vert | blanc/orange, broche `17` | CAN-High |
| blanc/vert | rouge/rose, broche `6` | sortie intelligente d'avertissement de danger |

1. Localisez le connecteur G derrière l'ordinateur du corps.
2. Confirmez le boîtier noir et les 3 × 6 cavités.
3. Orientez la vue de dessus avec le loquet en dessous.
4. Mesurez orange/marron et connectez-vous à la broche `18`.
5. Mesurez orange/vert et connectez-vous à la broche `17`.
6. Vérifiez le blanc/vert comme signal d'avertissement de danger et connectez-le à la broche `6`.
7. Sertissez et détendez chaque joint.
8. Ne vous connectez jamais uniquement par couleur.

## Alimentation et sirène

Le guide du véhicule place l'alimentation et le support de sirène dans la zone de la batterie et utilise le boulon de retenue de la batterie pour le support.

| Composant | Connexion |
|---|---|
| Terre WiPro | broche noire `1` vers masse fiable/négatif de la batterie |
| Allumage WiPro | broche jaune `7` au signal d'allumage vérifié |
| WiPro positif permanent | broche rouge `11` via le fusible `10 A` accessible au positif de la batterie |
| sirène normale | broche blanche `15` à sirène rouge ; broche blanche/noire `16` pour sirène noire |
| fourniture de sirène de secours | rouge en permanence sur `+12 V`, noir sur terre |
| déclenchement de la sirène de secours | blanc vers broche blanche WiPro `15` ; isoler le bleu |

1. Mesurez le positif, le négatif et l'allumage de la batterie.
2. Montez le porte-fusible au sec et accessible.
3. Effectuez une connexion à la terre à faible résistance.
4. Câblez une sirène normale uniquement via les broches `15`/`16`.
5. Alternativement, alimentez la sirène de secours en permanence et déclenchez-la à partir de la broche `15`.
6. Isolez son fil bleu individuellement.
7. Utilisez le boulon de retenue de la batterie sans coincer les câbles.
8. Insérez le fusible seulement après toutes les vérifications.

Voir [[Sirènes et klaxons — moyens d'alarme acoustiques]].

## Mémoriser les accessoires sans fil

Mémorisez les contacts magnétiques sans fil, les détecteurs de gaz et les boucles de câbles avant l'installation.

1. Fournit une alimentation WiPro stable.
2. Maintenez le bouton à droite du connecteur jusqu'à ce qu'un bip retentisse.
3. Vérifiez que le voyant d'état reste allumé.
4. Déclenchez chaque contact magnétique sans fil `2–3 fois`.
5. Déclenchez chaque détecteur de gaz ou boucle de câble `2–3 fois`.
6. Attendez un bip de confirmation et une brève extinction de la LED.
7. Étiquetez chaque accessoire et emplacement de montage.
8. Testez la réception à l'endroit prévu en mode diagnostic.
9. Comparez avec [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]].

## Monter des contacts magnétiques sans fil

La source du véhicule couvre les articles `100757` et `100758`.

| Fonctionnalité | Exigence |
|---|---|
| Orientation du conseil d'administration | transmettre les points LED loin de l'aimant |
| Gamme d'aimants | position fermée dans la zone jaune, généralement `22–30 mm` |
| Surface adhésive | propre, sec et sans graisse |
| Température d'application | pas en dessous de `15 °C` |
| Force d'adhérence finale | après env. `24 heures` |
| Adaptateurs de montage | articles `100428` ou `100729` pour des espaces/alignement d'antenne plus grands |

1. Montez le boîtier du transmetteur sur le cadre fixe si possible.
2. Alignez l'aimant sur la partie mobile.
3. Insérez la carte avec la LED de transmission loin de l'aimant.
4. Exclure la mauvaise orientation : l'apprentissage peut fonctionner même si le déclenchement de l'alarme échoue.
5. Gardez l'aimant dans la zone de travail indiquée.
6. Nettoyer, sécher et dégraisser les surfaces adhésives.
7. Ne collez pas en dessous de `15 °C` ; attendez `24 heures`.
8. Utilisez les positions de vis marquées si l'adhésif ne convient pas.
9. Utilisez l'adaptateur `100428` ou `100729` pour les grands espaces.
10. Testez chaque contact fermé et ouvert.

Voir [[Contact radiomagnétique 868 — montage et fonctionnement]] et [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles]].

## Mise en service et test de fonctionnement complet

1. Revérifiez `SW1 + SW3 + SW6`.
2. Vérifiez les sertissages, l'isolation, le serre-câble et le fusible `10 A`.
3. Mettez sous tension et écoutez le bip de démarrage.
4. Coupez le contact ; l'allumage actif désactive le système.
5. Verrouillez avec la télécommande du véhicule pour armer.
6. Vérifiez le bip d'acquittement, les indicateurs de direction et la LED d'état clignotante.
7. S'il est initialement inactif, verrouillez/déverrouillez à plusieurs reprises pour la synchronisation CAN.
8. Testez séparément les portes conducteur, passager, coulissantes et arrière.
9. Ouvrez le capot séparément et vérifiez la surveillance CAN.
10. Déclenchez chaque contact et accessoire sans fil.
11. Testez la sirène normale ou de secours avec une alarme réelle.
12. Vérifiez env. Alarme sonore `30 secondes` et alarme visuelle `180 secondes`.
13. Désarmez ou arrêtez l'alarme avec déverrouillage.

## Utilisation et signalisations

- Verrouiller l'armement du système ; Le bip, les indicateurs et la LED d'état le reconnaissent.
- Déverrouiller désarme ou arrête une alarme.
- Des bips courts et répétés pendant l'armement signifient qu'un contact appris est ouvert ; la source dit que le système est toujours armé.
- CAN reste utile sans verrouillage centralisé pour les portes et capot d'origine.
- Testez chaque ouverture réelle lors de la remise.

## Diagnostic

| Symptôme | Contrôle/action |
|---|---|
| bip de démarrage mais pas de réponse à distance | vérifiez le CAN blanc/orange et violet/orange ; utiliser le mode diagnostic |
| la LED verte gauche scintille | Le trafic CAN est présent |
| la LED verte gauche reste sombre pendant le fonctionnement | bus inactif ou connexion CAN incorrecte |
| pas de réponse et pas de bip de démarrage | vérifier l'alimentation, les sertissages, l'état d'allumage et le fusible |
| avertissement de contact ouvert avec tout fermé | vérifier l'écartement des aimants et l'interrupteur du capot ; contacts cycles |
| l'avertissement demeure | couper et rétablir l'alimentation avec les contacts fermés |
| l'accessoire apprend mais ne peut pas déclencher l'alarme | La LED de transmission de la carte doit pointer loin de l'aimant |

Appuyez brièvement sur le bouton de la carte pour le mode de diagnostic CAN ; l'utilisation à distance ou tout autre trafic doit faire clignoter la LED verte gauche. Voir [[Dépannage — diagnostic sûr des problèmes fréquents]].

## Documentation

1. Enregistrez le véhicule, l'année et le VIN.
2. Enregistrez l'article WiPro, la série et le logiciel.
3. Enregistrez `SW1 + SW3 + SW6`.
4. Photographiez le connecteur G, les couleurs et les robinets.
5. Enregistrez la version du fusible, de la masse et de la sirène.
6. Enregistrez chaque porte, capot et contact sans fil surveillés.
7. Enregistrez les heures d'alarme, les diagnostics et le transfert du client.

## Sources

- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t5_2006-2009.pdf` — guide du véhicule daté de `12/20` ; les dix pages ont été vérifiées textuellement et visuellement.
- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf` — guide d'installation général Rév. `1.8` ; section allemande complète préalablement vérifiée.
- `0823-001 / 2.1` n'est pas retenu au minimum car aucune source ne le précise.

## Références croisées

- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]]
- [[Contact radiomagnétique 868 — montage et fonctionnement]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[VW T5 facelift (à partir de MY 2010)]]
