---
title: Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento (2014–2021)
sources:
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/wipro_iii_fiat_talento___renault_trafic_iii.pdf
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/renault-trafic-iii-2014.md
---

# Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento (2014–2021)

Cet article décrit l'installation d'un WiPro III dans Renault Trafic III, Opel Vivaro B, Nissan NV300 et Fiat Talento construits entre 2014 et 2021. La version `05/22` du manuel d'installation spécifique au véhicule documente le profil du véhicule, la connexion CAN, les feux de détresse, l'alimentation, l'allumage, la masse, le klaxon du véhicule, la LED d'état, les accessoires radio et le test fonctionnel final.

> **Délimitation :** Renault Trafic III et Nissan Primastar à partir de 2022 utilisent un profil DIP entièrement différent (`SW1 + SW2 + SW4 + SW5 + SW6`) et un autre point CAN ; voir [[Renault Trafic III / Nissan Primastar (à partir de 2022)|Renault Trafic III à partir de 2022]].

## Portée

| fonctionnalité | Défaut |
|---|---|
| Véhicules | Renault Trafic III, Opel Vivaro B, Nissan NV300 et Fiat Talento |
| Années de construction | 2014-2021 |
| Système primaire | WiPro III, article de set `100754` |
| Numéro de série minimal | `0823-014`, expressément mentionné dans le manuel du véhicule |
| Base de compatibilité | `0823-014 / 5.9` selon la matrice de compatibilité publiée ; Le manuel du véhicule indique uniquement le numéro de série |
| Configuration du véhicule | `SW3 + SW6` réglés sur `ON` |
| Fonctionnement dans le test fonctionnel documenté | Verrouillez une fois avec la télécommande d'origine du véhicule |

Le numéro de série, la version du logiciel et la version de l'appareil doivent être vérifiés à l'aide de [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]] avant l'installation.

## Profil de véhicule séparé et protection contre la relecture

| fonction | Exigence | Position DIP | Effet |
|---|---|---|---|
| Profil du véhicule Trafic III / Talento 2014-2021 | manuel d'installation spécifique au véhicule | `SW3 + SW6` | active le profil CAN documenté et le fonctionnement du véhicule |
| Protection générale contre la relecture | à partir du numéro de série `0823-014` ou du logiciel `5.8` | en plus `SW5` | La clé radio d'origine du véhicule ne contrôle plus le WiPro ; L'évaluation des portes du véhicule reste active |

`SW5` ne fait **pas** partie de la position de base spécifique au véhicule et ne peut pas être ajouté à `SW3 + SW6` de manière générale. Le test de fonctionnement du manuel du véhicule avec la télécommande d'origine du véhicule suppose que cette protection générale contre la relecture n'est pas active. Si le `SW5` est utilisé consciemment, le WiPro doit être utilisé via un [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]] formé ou une autre méthode d'exploitation approuvée pour le système spécifique.

[[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]] décrit les bases et d'autres fonctions DIP optionnelles. Changez toutes les positions des interrupteurs uniquement lorsque la tension est coupée ; Ni la fiche WiPro à 20 broches ni la fiche Pro-Finder ne doivent être branchées.

## Sécurité et préparation au travail

- Les travaux sur l'électricité et l'électronique des véhicules doivent être confiés à un spécialiste qualifié.
- Avant de commencer, vérifiez et documentez les voyants d'avertissement existants, les erreurs d'éclairage et les entrées de la mémoire d'erreurs.
- Coupez l'alimentation électrique avant d'ouvrir le boîtier du WiPro, de changer les commutateurs DIP ou de travailler sur les câbles du véhicule.
- Vérifiez ensemble la forme du connecteur, le numéro de broche, la couleur du fil et le signal sur le véhicule réel.
- Pour CAN, feux de détresse et klaxon, utilisez les connecteurs remplis de gel requis par le manuel du véhicule.
- Isoler individuellement les entrées et sorties inutilisées ; N'écrasez pas les câbles et ne les posez pas sur des pièces pointues ou mobiles.
- Si les conditions du véhicule s'écartent des instructions ou des illustrations, arrêtez le travail et contactez le fabricant ou l'assistance THITRONIK.

Ce dont vous avez besoin est, entre autres, un tournevis Phillips PH2 ou Torx 25, une pince adaptée, un appareil de mesure, un oeillet, le porte-fusible inclus et une perceuse `8-mm` pour la LED d'état.

## Apprenez les accessoires radio avant l'installation

Tous les accessoires radio inclus dans la livraison et les accessoires supplémentaires portant la plaque d'immatriculation `868` doivent être formés une seule fois.

1. Appuyez et maintenez enfoncé le bouton à droite de la fiche de connexion jusqu'à ce que le WiPro émette un bip ; la LED d'état est allumée en permanence.
2. Déclenchez deux à trois fois chaque contact radiomagnétique à enregistrer, chaque émetteur radio portatif, chaque boucle de câble radio et chaque alarme de gaz radio.
3. Pour ce faire, retirez l'aimant supérieur au `30 mm` de l'unité émettrice, appuyez sur les boutons de l'émetteur manuel, allumez l'alarme gaz ou retirez la boucle de câble de son support.
4. Attendez que la tonalité de confirmation et la LED d'état de chaque composant s'éteignent brièvement.
5. Pour terminer le mode d'apprentissage, débranchez brièvement le système de l'alimentation électrique ou appuyez brièvement sur le bouton du WiPro.

Le processus général et la différenciation par rapport au mode diagnostic se trouvent sous [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Supprimer la garniture du tableau de bord

1. Desserrez délicatement le panneau latéral du tableau de bord clipsé.
2. Retirez le compartiment pliable.
3. Retirez un morceau de la garniture de la console centrale.
4. Retirez les deux vis exposées.
5. Retirez le panneau inférieur et rendez l'ordinateur de bord accessible au niveau des pieds du conducteur.

Les clips, câbles et connecteurs ne doivent pas être endommagés ou mis sous tension lors du retrait.

## Connexion CAN sur connecteur S1

Le robinet CAN se trouve sur l'ordinateur de bord, au niveau des pieds du conducteur, au niveau du **connecteur S1**.

| Emplacement de connexion | Gestion des véhicules | Ligne WiPro | fonction |
|---|---|---|---|
| Ordinateur de bord, connecteur S1, broche 4 | gris | blanc/orange | CAN-High |
| Ordinateur de bord, connecteur S1, broche 3 | vert | violet/orange | CAN-Low |

Les deux lignes CAN doivent provenir du même connecteur S1. Vérifiez l'affectation des broches, la couleur et le signal avant de vous connecter ; Ne mélangez pas CAN-High et CAN-Low.

## Connecter les feux de détresse

1. Retirer l'interrupteur des feux de détresse.
2. Identifiez et mesurez le câble du véhicule de couleur naturelle ou beige au niveau de l'interrupteur.
3. Connectez cette ligne à la ligne rouge/rose du WiPro à l'aide d'un connecteur rempli de gel.
4. Réinstallez l'interrupteur des feux de détresse et sécurisez le câble contre l'écrasement.

La connexion est utilisée pour une alarme visuelle et un retour documenté lors de l'affûtage.

## Connectez le positif permanent, l'allumage et la masse

Déverrouillez la boîte à fusibles en haut et tirez-la vers le siège conducteur. Tapez le plus continu et le plus d'allumage uniquement sur des câbles d'une section appropriée d'au moins `1 mm²`.

| Connexion | Gestion des véhicules | Ligne WiPro | Défaut |
|---|---|---|---|
| Borne 30 / plus permanent | rouge | rouge | Fusible WiPro alimenté avec `10 A` à l'aide du porte-fusible fourni |
| Borne 15 / allumage | jaune | jaune | Mesurer l'allumage plus avant de connecter |
| Borne 31 / point de masse au dessus de la boîte à fusibles | Masse | noir avec œillet annulaire | Utilisez un point de terre nu et porteur et vissez-le fermement. |

N'établissez l'alimentation qu'une fois tous les travaux de raccordement terminés et vérifiés. Installez le porte-fusible de manière accessible et sans frottement.

## Connecter le klaxon du véhicule

1. Retirez le couvercle de la colonne de direction.
2. Débranchez le connecteur à deux broches sous le volant.
3. Identifiez le fil noir du véhicule sur la fiche.
4. Connectez le câble noir du véhicule au câble gris WiPro à la **broche 12** à l'aide d'un connecteur rempli de gel.
5. Insérez complètement le bouchon et installez le couvercle de la colonne de direction sans aucune tension.

L'avertisseur sonore du véhicule, la sirène interne et, si nécessaire, une sirène supplémentaire séparée sont des dispositifs d'alarme différents. [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]] contient des informations sur leur différenciation.

## LED d'état du montage

1. Vérifiez l'arrière de l'emplacement d'installation prévu pour les câbles et les composants.
2. Percer un trou de diamètre `8 mm`.
3. Insérez la LED d'état.
4. Rebranchez le câble LED rouge/noir avec le connecteur blanc à la contrepartie du jeu de câbles WiPro.

La LED d'état doit rester visible pour le retour de l'opérateur, le diagnostic et la lecture de la mémoire d'alarme.

## Installer des contacts radio-magnétiques

Fixez définitivement les contacts radiomagnétiques après un entraînement et un test de portée. [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]] contient des spécifications détaillées.

| Champ d'essai | Défaut |
|---|---|
| Emplacement du tableau | Alignez la LED de transmission de l'aimant pour indiquer le chemin |
| Assemblage incorrect | Si la LED de transmission pointe vers l'aimant, l'apprentissage est possible, mais aucune alarme ne se produit. |
| Position de l'aimant | une fois fermé, dans la plage documentée d'environ `22–30 mm` |
| surface adhésive | propre, sec et sans graisse |
| Température de traitement | pas sous `15 °C` |
| Résistance finale des pastilles adhésives | après environ `24 heures` |
| Grandes distances / emplacement d'antenne défavorable | Vérifiez l'article d'adaptateur de montage `100428` ou `100729`. |

Si possible, fixez le boîtier de l'émetteur au cadre et l'aimant au vantail ou au battant de porte mobile. Lors de la fixation avec des vis, utilisez uniquement les points marqués à l'intérieur du boîtier de l'émetteur.

## Réaliser un test fonctionnel

La procédure suivante correspond au manuel spécifique au véhicule avec **`SW5` non activé** :

1. Fermez les portes du véhicule et tous les contacts formés.
2. Appuyez une fois sur le bouton de verrouillage de la télécommande d'origine du véhicule.
3. Vérifiez si le WiPro s'allume, verrouille le véhicule et si les clignotants fournissent un retour d'information.
4. Ouvrez la porte conducteur mécaniquement de l'intérieur avec la poignée de porte ou de l'extérieur avec la clé mécanique.
5. Vérifiez l'alarme sonore pour environ `30 secondes`.
6. Vérifiez l'alarme visuelle via les indicateurs du véhicule pour environ `180 secondes`.
7. Appuyez sur le bouton d'ouverture de la clé d'origine ou sur n'importe quel bouton d'un émetteur portatif THITRONIK qualifié et vérifiez si le WiPro est désarmé ou si l'alarme est interrompue.
8. Vérifiez la séquence de clignotement de la mémoire d'alarme via la LED d'état.
9. Répétez le test d'alarme avec chaque contact radiomagnétique formé, chaque boucle de câble radio et chaque capteur radio supplémentaire.

Le manuel général d'installation mentionne `120 secondes` pour l'alarme visuelle dans son aperçu des fonctions, mais `180 secondes` dans le chapitre de test détaillé. Les informations spécifiques `180 secondes` du manuel spécifique au véhicule le plus récent s'appliquent à ce véhicule.

## CAN et diagnostic radio

### Diagnostic CAN

1. Appuyez brièvement sur le bouton du WiPro jusqu'à ce que la LED d'état du faisceau de câbles clignote.
2. Utilisez la télécommande d'origine du véhicule ou les feux de détresse pour générer un trafic de données CAN.
3. Vérifiez si la LED de diagnostic verte clignote ou scintille en fonction du débit de données.
4. S'il n'y a pas de réponse, vérifiez la broche 3/4, la fiche S1, le connecteur et l'affectation des CAN-High et CAN-Low.
5. Quittez le mode diagnostic en appuyant à nouveau brièvement sur le bouton.

### Diagnostic radio

En mode diagnostic, déclenchez chaque composant radio formé à l'emplacement d'installation prévu. Le WiPro reconnaît acoustiquement chaque signal reçu. Si l'acquittement manque, vérifiez l'état d'apprentissage, le lieu d'installation, les pièces métalliques de blindage et, si nécessaire, un adaptateur de montage.

## Modèles d'erreur typiques

| Image d'erreur | Tester/mesurer |
|---|---|
| La clé radio d'origine du véhicule verrouille le véhicule, mais ne contrôle pas le WiPro | Vérifier le profil DIP `SW3 + SW6`, `SW5` activé en option, CAN-High/Low et la connexion à S1 |
| Aucune activité CAN en mode diagnostic | Cochez la broche 4 gris/blanc-orange et la broche 3 vert/violet-orange ; Ne mélangez pas les câbles CAN |
| Aucune alarme visuelle | Vérifiez le fil beige sur l'interrupteur des feux de détresse et le fil rouge/rose WiPro. |
| Le klaxon du véhicule reste silencieux | Vérifiez le fil noir du véhicule sur le connecteur à deux broches du volant, le fil gris WiPro et la broche 12. |
| WiPro sans fonction | Vérifier le positif continu, le fusible `10-A`, le point de masse, l'œillet annulaire et les connexions enfichables. |
| Contact radiomagnétique ouvert malgré la fermeture de l'ouverture | Ouvrir et fermer des contacts plusieurs fois ; Vérifiez la distance de l'aimant et la direction de la carte |
| Le contact peut être appris, mais ne déclenche pas d'alarme | La LED de transmission peut être pointée vers l'aimant ; Alignez correctement la carte |
| Le contact radio n'est pas reçu de manière fiable sur le lieu d'installation | Vérifiez les pièces métalliques de blindage, la position de l'antenne, la position du panneau de commande et l'adaptateur de montage. |

[[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]] décrit d'autres tests à l'échelle du système.

## Base source et décision éditoriale

- Le manuel d'installation de neuf pages spécifique au véhicule *WiPro III - Fiat Talento/Renault Trafic/Opel Vivaro/Nissan NV300, année de construction 2014-2021*, statut `05/22`, a été entièrement vérifié textuellement et visuellement.
- Les pages 2 à 5 couvrent l'ensemble, le numéro de série minimum, la position DIP, le démontage, toutes les connexions électriques, la formation et le test fonctionnel.
- Pages 6 à 9, assemblage du couvercle, sens de la carte, espacement des aimants, instructions de collage et adaptateurs pour les contacts radio-magnétiques.
- La version générale du manuel d'installation `1.8` ajoute des règles de sécurité, une protection contre la relecture, des diagnostics et une vérification des erreurs inter-systèmes.
- Le manuel du véhicule indique explicitement au moins `0823-014` ; La version du logiciel `5.9` provient également de la matrice de compatibilité du projet publiée.
- En cas d'informations générales contradictoires sur la durée de l'alarme visuelle, les instructions spécifiques et plus récentes du véhicule avec `180 secondes` prévalent.

Sources primaires utilisées :

- `D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_fiat_talento___renault_trafic_iii.pdf`
- `D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf`

## Articles connexes

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles|Boucle de câble radio 868]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Fiat Talento / Renault Trafic III / Opel Vivaro B / Nissan NV300 (2014–2021)|Fiat Talento 2014–2021]]
- [[Renault Trafic III / Nissan Primastar (à partir de 2022)|Renault Trafic III / Nissan Primastar (à partir de 2022)]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
