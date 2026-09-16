---
title: Ford Transit 7e génération Facelift (2019-07/2024)
sources:
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_ford_transit_2019.pdf'
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
  - sources/Seriennummer 5298 Wipro III safe.lock Ford Transit 2019.csv
  - sources/Fahrzeugbesonderheiten.docx
  - sources/WiPro III 7safe.lock.docx
updated: '2026-07-20'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/ford-transit-7g-facelift.md
---

# Ford Transit 7e génération Facelift (2019-07/2024)

Cet article décrit l'installation d'une WiPro III dans les Ford Transit et Transit/Tourneo Custom restylés de septième génération. Dans ce projet, il couvre le Transit de 2019 à 07/2024 inclus et le Transit/Tourneo Custom de 2019 jusqu'au changement de modèle en 2023.

> **Distinction importante :** la télécommande Ford d'origine ne peut commander la WiPro en toute sécurité que sur les véhicules **sans deadlock**. Avec deadlock, armer et désarmer l'alarme avec un émetteur radio THITRONIK® 868.

## Domaine d'application

| Caractéristique | Exigence |
|---|---|
| Véhicules | Ford Transit et Transit/Tourneo Custom 7G Facelift |
| Limites du projet | Transit 2019–07/2024 ; Transit/Tourneo Custom 2019–2023 |
| Système | WiPro III ou WiPro III safe.lock après contrôle de l'équipement |
| Version minimale WiPro III | `0823-016 / 6.1` selon la matrice validée |
| Base matérielle selon la notice véhicule | kit Ford pour WiPro à partir du n° `0823-013` |
| Version minimale WiPro III safe.lock | kit `5298-001 / 7.4.0s` |
| Profil véhicule | `SW2 + SW4 + SW6` sur `ON` ; tous les autres sur `OFF` |
| Télécommande d'origine | exploitable uniquement sans deadlock |
| Zones principales | calculateur de carrosserie, colonne de direction et arrière de la prise OBD |

Le PDF véhicule n'indique que la base matérielle `0823-013`. Les seuils validés `0823-016 / 6.1` et `5298-001 / 7.4.0s` proviennent de la [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|matrice de compatibilité]].

Pour la nouvelle génération Transit à partir de 07/2024 et Transit/Tourneo Custom à partir de 08/2023, utiliser l'article [[Ford Transit / Tourneo Custom / Transit Custom (2024+)|Ford Transit 2024+]]. Identifier la génération réelle ; la première immatriculation ne suffit pas.

## Déterminer le système et la version

| Application | Version minimale | Signification |
|---|---|---|
| WiPro III, Facelift 2019–07/2024 | `0823-016 / 6.1` | seuil validé pour la version standard |
| Kit Ford WiPro III safe.lock | `5298-001 / 7.4.0s` | première version safe.lock validée pour Transit 2019–2024 |
| safe.lock avec Pro-Finder, Transit 2019–2024 | au moins `5298-008 / 1.0.3sf` | correction de la protection anti-enfermement pour cette combinaison |
| Nouvelle génération | à partir de `5298-005 / 1.0.1sf` ; article séparé | ne pas reprendre ce profil véhicule |

Noter le numéro de série et la version logicielle, identifier le véhicule et le deadlock, puis choisir WiPro III standard ou safe.lock. Ne pas valider une installation sous le seuil applicable. Voir [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Déterminer le deadlock et le mode de commande

| Équipement | Armement | Désarmement / arrêt d'alarme | Portée de sécurité |
|---|---|---|---|
| Avec deadlock | verrouiller le véhicule, puis armer avec l'[[Émetteur radio 868 — télécommande pour WiPro III|émetteur 868]] | émetteur 868 | les signaux de la télécommande et de la serrure mécanique ne sont pas distinguables avec certitude |
| Sans deadlock | la touche de verrouillage Ford arme automatiquement la WiPro | télécommande d'origine exploitable ; le test documenté s'arrête avec l'émetteur | commandes véhicule et alarme peuvent être couplées |

Avec deadlock, l'emploi de la télécommande Ford comme unique commande d'alarme pourrait permettre à une intrusion par la serrure mécanique de désarmer l'alarme. Pour safe.lock, l'option véhicule **« Schaltsperre »** doit être présente, sélectionnable et désactivée. Ne pas valider safe.lock si cette condition n'est pas claire.

## Régler le profil DIP

L'illustration de la notice montre clairement `SW2 + SW4 + SW6`. Ce réglage confirmé visuellement remplace l'ancienne indication erronée `SW1`.

1. Couper complètement l'alimentation et débrancher les connecteurs WiPro 20 pôles et Pro-Finder.
2. Ouvrir le boîtier avec précaution.
3. Mettre `SW2`, `SW4` et `SW6` sur `ON`.
4. Mettre `SW1`, `SW3`, `SW5`, `SW7` et `SW8` sur `OFF`, sauf fonction optionnelle documentée séparément.
5. Documenter le réglage, fermer le boîtier puis poursuivre.

| Commutateurs | Position |
|---|---|
| `SW2`, `SW4`, `SW6` | `ON` |
| `SW1`, `SW3`, `SW5`, `SW7`, `SW8` | `OFF` |

## Distinguer version standard et safe.lock

Le PDF véhicule documente le branchement standard. Ses fils bleus de verrouillage centralisé ne sont pas utilisés.

| Version | Fils WiPro bleus | Base de validation |
|---|---|---|
| WiPro III standard selon le PDF | ne pas brancher bleu ni bleu/noir ; isoler séparément | branchement standard complet documenté |
| WiPro III safe.lock | brancher uniquement avec le faisceau safe.lock adapté et une affectation véhicule vérifiée | seuils et conditions connus, mais notice détaillée référencée absente localement |

Ne pas appliquer l'instruction standard « isoler bleu et bleu/noir » à un branchement safe.lock validé et ne pas reconstruire des broches manquantes à partir d'une autre génération Ford. Le projet mentionne une forme de contact modifiée à partir du kit `5298-006` ; obtenir la notice correspondante avant toute modification.

## Sécurité et préparation

- Les travaux sur l'électricité du véhicule, le CAN, les airbags et le calculateur de carrosserie relèvent d'un atelier qualifié.
- Contrôler et consigner klaxon, témoins, éclairage et mémoire de défauts avant l'intervention.
- Travailler hors tension et vérifier ensemble connecteur, insert, broche, couleur et signal mesuré.
- Isoler séparément les fils inutilisés et protéger les câbles des pièces coupantes ou mobiles.
- Arrêter les travaux et contacter le fabricant ou l'assistance THITRONIK si le véhicule diffère de la notice.

| Outil ou pièce | Utilisation |
|---|---|
| Kit Ford pour WiPro à partir de `0823-013` | branchement standard spécifique au véhicule |
| Émetteur 868 | obligatoire avec deadlock et pour le test d'alarme |
| Pince, PH2 et Torx 25 | démontage et montage |
| Perceuse et foret `8 mm` | LED d'état |
| Multimètre et pince à sertir adaptée | contrôle des signaux et connexions sûres |

## Dégager le tableau de bord et le calculateur

1. Déclipser la garniture et la tirer vers le siège conducteur.
2. Retirer toutes les vis du cadre, y compris celle située sous le porte-gobelet.
3. Tirer le cadre vers le siège conducteur.
4. Dégager le calculateur et identifier `J1` ainsi que `J2` avec son **insert noir**.
5. Ne pas mettre les faisceaux ou connecteurs en tension mécanique.

## Brancher la masse et le calculateur de carrosserie

| Connexion | Fil Ford | Fil WiPro | Fonction |
|---|---|---|---|
| `J1` broche `11` | rouge **ou** violet/rouge | rouge | `+12 V` via fusible `18` |
| `J2`, insert noir, broche `18` | bleu/blanc | rose | klaxon du véhicule |
| `J2`, insert noir, broche `19` | brun/jaune | rouge/rose | feux de détresse |
| masse carrosserie, borne `31` | point de masse | noir avec cosse annulaire | masse |

Hors tension, identifier J1/J2 et l'insert noir. Tester en charge J1 broche 11, relier le fil Ford rouge ou violet/rouge applicable au rouge WiPro et contrôler le fusible `18`. Relier J2 broche 18 au rose et la broche 19 au rouge/rose. Nettoyer et contrôler le point de masse, fixer la cosse noire puis mesurer continuité et chute de tension. Les deux couleurs possibles à J1 broche 11 sont des alternatives.

## Brancher l'allumage à la colonne de direction

| Connexion | Fil Ford | Fil WiPro | Fonction |
|---|---|---|---|
| connecteur de colonne broche `1` | orange/blanc **ou** brun/jaune | jaune | allumage |

Dégager le connecteur hors tension, identifier la broche `1`, confirmer le signal sur la couleur présente et la relier au jaune WiPro. Isoler, soulager la traction et contrôler le mouvement de la colonne.

## Brancher le CAN à la prise OBD

La source situe le raccord CAN à l'arrière de la prise OBD sans indiquer de numéros de broche ; aucun numéro n'est ajouté.

| Fil Ford | Fil WiPro | Fonction |
|---|---|---|
| violet/orange | violet/orange | CAN-Low |
| gris/orange | blanc/orange | CAN-High |

Identifier la paire torsadée réelle et vérifier High/Low par mesure. Brancher selon le tableau, ne détorsader que le strict nécessaire, sécuriser les raccords puis reprotéger la paire.

## Monter la LED d'état

Contrôler l'arrière de l'emplacement visible convenu, percer à `8 mm`, insérer la LED et brancher son câble rouge/noir par la fiche blanche. Vérifier visibilité et fonctionnement.

## Monter le Pro-Finder

La notice montre un emplacement possible derrière la garniture démontée, avec fixation du module par le dessous. Vérifier emplacement sec et stable, réception des antennes et cheminement ; monter et tester le Pro-Finder selon sa notice. Avec safe.lock dans Transit 2019–2024, utiliser au minimum `5298-008 / 1.0.3sf`. Voir [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]].

## Mémoriser les accessoires radio

1. Maintenir le bouton près du connecteur environ `10 secondes` jusqu'au bip et à l'allumage fixe de la LED.
2. Déclencher chaque contact deux ou trois fois en éloignant l'aimant de plus de `30 mm`.
3. Actionner chaque émetteur, allumer les détecteurs de gaz et retirer les boucles de câble de leur support.
4. Attendre le bip et la brève extinction de la LED après chaque composant.
5. Quitter par une brève coupure d'alimentation ou une pression et consigner les composants.

Voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Monter les contacts radiomagnétiques

La notice couvre les articles `100757` et `100758` ; voir [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

| Contrôle | Exigence |
|---|---|
| Orientation de la carte | LED d'émission opposée à l'aimant |
| Mauvaise orientation | mémorisation possible, mais pas d'alarme |
| Écart fermé | `22–30 mm`, sans dépasser la limite rouge |
| Porte/trappe | émetteur sur le cadre, aimant sur la partie mobile |
| Surface | propre, sèche et dégraissée |
| Mise en œuvre | pas sous `15 °C` |
| Résistance finale de la colle | après environ `24 heures` |
| Grand écart / orientation d'antenne | envisager les adaptateurs `100428` ou `100729` |

Mémoriser et tester la portée avant montage. Orienter correctement la carte, positionner l'aimant, préparer la surface et ne pas charger complètement le collage pendant 24 heures. Utiliser les points de vissage ou adaptateurs si nécessaire, puis tester chaque contact en alarme.

## Essai fonctionnel et confirmations

### Véhicule avec deadlock

1. Fermer les portes, verrouiller avec la télécommande Ford puis armer la WiPro avec l'émetteur 868.
2. Contrôler un bip, un éclair des clignotants et le clignotement de la LED d'état.
3. Déverrouiller de l'extérieur avec la clé mécanique et ouvrir la porte conducteur.
4. Contrôler environ `30 secondes` d'alarme sonore et `180 secondes` d'alarme optique.
5. Arrêter avec l'émetteur et analyser le clignotement de la mémoire d'alarme.

### Véhicule sans deadlock

1. Fermer les portes et appuyer sur verrouillage de la télécommande Ford.
2. Contrôler armement automatique, un bip et LED clignotante.
3. Ouvrir la porte conducteur par la poignée intérieure ou la clé mécanique extérieure.
4. Contrôler `30` secondes sonores et `180` secondes optiques.
5. Arrêter avec l'émetteur, lire la mémoire et tester les autres portes et capteurs radio.

## Diagnostic CAN, radio et système

### Diagnostic CAN

Appuyer brièvement sur le bouton WiPro jusqu'au clignotement de la LED du faisceau. Actionner la télécommande sur un véhicule sans deadlock ou les feux de détresse. Sans scintillement dépendant du CAN, contrôler le raccord arrière OBD, les couleurs et High/Low. Appuyer à nouveau pour quitter.

### Diagnostic radio

Déclencher chaque émetteur mémorisé à son emplacement final. Sans confirmation sonore, contrôler mémorisation, blindage métallique, antenne, distance d'aimant et adaptateurs.

### Contrôle final

Contrôler la mémoire de défauts puis klaxon, feux de détresse, allumage, LED et chaque capteur. Si présent, tester réseau mobile, GPS et transmission d'alarme du Pro-Finder. Pour safe.lock, tester verrouillage, déverrouillage, mode camping et protection anti-enfermement selon sa notice. Reposer les garnitures sans pincer de câble et expliquer le mode deadlock à l'utilisateur.

## Défauts typiques

| Défaut | Contrôle / remède |
|---|---|
| Profil véhicule inopérant | utiliser `SW2 + SW4 + SW6` ; ne pas utiliser l'ancien `SW1` |
| Télécommande Ford sans action avec deadlock | normal ; utiliser l'émetteur 868 |
| Pas d'armement automatique sans deadlock | contrôler affectation deadlock, CAN et télécommande |
| Pas d'activité CAN | contrôler violet/orange et gris/orange derrière OBD ; vérifier High/Low |
| Pas d'alimentation | J1 broche 11, rouge ou violet/rouge, fusible `18` et masse |
| Allumage non détecté | colonne broche 1, orange/blanc ou brun/jaune, et jaune WiPro |
| Klaxon muet | J2 insert noir broche 18, bleu/blanc et rose |
| Feux de détresse inopérants | J2 insert noir broche 19, brun/jaune et rouge/rose |
| Verrouillage intempestif avec WiPro standard | bleu et bleu/noir doivent rester débranchés et isolés |
| Affectation safe.lock incertaine | obtenir la notice adaptée ; ne pas la déduire d'une autre génération Ford |
| Protection anti-enfermement défaillante avec safe.lock et Pro-Finder | au moins `5298-008 / 1.0.3sf` pour Transit 2019–2024 |
| Contact mémorisé sans alarme | retourner la carte ; LED d'émission opposée à l'aimant |
| Radio peu fiable | contrôler métal, antenne, `22–30 mm` et adaptateurs |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Sources et décision éditoriale

- Les onze pages de la notice véhicule `12/20` ont été analysées textuellement et visuellement.
- La page 2 prouve `0823-013`, la distinction deadlock, `SW2 + SW4 + SW6` et les fils bleus inutilisés en standard.
- Les pages 3–7 prouvent démontage, J1/J2, masse, colonne broche 1, CAN derrière OBD, LED, emplacement possible du Pro-Finder, mémorisation et deux essais.
- Les pages 8–11 prouvent `100757`/`100758`, orientation de la carte, montage, adaptateurs `100428`/`100729` et `22–30 mm`.
- La notice générale `1.8` complète sécurité et diagnostic. La matrice/historique validée fournit `0823-016 / 6.1`, `5298-001 / 7.4.0s`, `5298-008 / 1.0.3sf` et la condition de l'option « Schaltsperre ».
- Les trois fichiers internes ci-dessous sont absents localement. Leurs références sont conservées ; aucune broche safe.lock ni modification de contact non vérifiée n'a été reconstruite.
- L'ancienne indication erronée `SW1` est remplacée par `SW2 + SW4 + SW6`, confirmé visuellement.

Sources disponibles :

- `D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_ford_transit_2019.pdf`
- `D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf`

Référencés mais absents localement :

- `sources/Seriennummer 5298 Wipro III safe.lock Ford Transit 2019.csv`
- `sources/Fahrzeugbesonderheiten.docx`
- `sources/WiPro III 7safe.lock.docx`

## Articles connexes

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Ford Transit 7e génération (2016-2019)|Ford Transit 7G 2016–2019]]
- [[Ford Transit / Tourneo Custom / Transit Custom (2024+)|Ford Transit 2024+]]
