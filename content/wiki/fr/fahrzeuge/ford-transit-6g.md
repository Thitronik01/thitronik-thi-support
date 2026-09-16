---
title: Ford Transit 6e génération (2006–2013)
sources:
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/wipro_iii_ford_transit_6._generation_2006-2013.pdf
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-19'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/ford-transit-6g.md
---

# Ford Transit 6e génération (2006–2013)

Ce document décrit le montage d’une WiPro III dans le Ford Transit de 6e génération, de 2006 à 2013. La notice spécifique, version `12/20`, couvre profil DIP, boîte à gants, boîtier de fusibles, masse, CAN, feux de détresse, verrouillage centralisé, klaxon, allumage, alimentation, LED d’état et essai final.

> **Distinction essentielle :** la télécommande d’origine ne commande la WiPro qu’avec la fonction **Deadlock/double verrouillage**. Sans Deadlock, utiliser l’émetteur radio THITRONIK® gris ; le CAN surveille néanmoins les portes de cabine.

## Champ d’application

| Caractéristique | Prescription |
|---|---|
| Véhicule / années | Ford Transit 6e génération, 2006–2013 |
| Système / minimum de la matrice | WiPro III, `0823-001 / 2.1` |
| Profil | `SW1 + SW2 + SW6` sur `ON`, autres sur `OFF` |
| Emplacement | derrière la boîte à gants, près du boîtier électrique central |
| Fusible véhicule | `F73 / 15 A` |
| Télécommande d’origine | uniquement avec Deadlock/double verrouillage |

La notice véhicule ne donne aucun minimum ; `0823-001 / 2.1` provient de la matrice homologuée. Voir [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Définir le profil DIP et la commande

La valeur spécifique `SW1 + SW2 + SW6` prévaut sur l’ancien tableau général, qui ne représente que SW1 à SW4.

1. Couper entièrement l’alimentation.
2. Débrancher le connecteur WiPro à 20 broches et celui du Pro-Finder.
3. Ouvrir prudemment le boîtier.
4. Mettre `SW1`, `SW2`, `SW6` sur `ON` et `SW3`, `SW4`, `SW5`, `SW7`, `SW8` sur `OFF`.
5. Photographier le réglage, puis refermer avant la poursuite du montage.

| Équipement | Commande WiPro | CAN |
|---|---|---|
| Deadlock présent | télécommande d’origine ; appuyer deux fois sur « verrouiller » | commande d’origine et portes de cabine |
| Sans Deadlock | [[Émetteur radio 868 — télécommande pour WiPro III|émetteur radio 868]] gris | surveillance des portes maintenue |

Le Deadlock empêche également l’ouverture intérieure des portes de cabine. Identifier la variante avant l’essai.

## Sécurité et préparation

- Réserver les travaux électriques, CAN, airbag et verrouillage centralisé à un atelier qualifié.
- Contrôler et consigner klaxon, voyants, éclairage et mémoire de défauts avant intervention.
- Travailler hors tension et vérifier ensemble connecteur, broche, couleur et signal mesuré.
- Utiliser des raccords de dérivation bleus remplis de gel sur C6 et des raccords rouges sur C2/C5.
- Isoler séparément les fils inutilisés et protéger le faisceau contre traction, arêtes et pièces mobiles.
- Arrêter en cas d’écart par rapport à la notice et contacter le fabricant ou THITRONIK.

La notice cite pince universelle, pince coupante, clé de `8 mm`, perceuse et foret de `8 mm`. Prévoir aussi multimètre et pince à sertir.

## Mémoriser les accessoires radio avant le montage

1. Maintenir le bouton à droite du connecteur jusqu’au signal sonore et à l’allumage fixe de la LED.
2. Déclencher deux à trois fois chaque contact, détecteur de gaz et boucle ; appuyer sur une touche des émetteurs.
3. Attendre après chaque élément le signal et la brève extinction de la LED.
4. Quitter le mode de mémorisation et consigner les composants.

Voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Accéder à la boîte à gants et aux fusibles

1. Ouvrir la boîte à gants et pousser ses deux agrafes vers l’intérieur.
2. Retirer complètement la boîte à gants.
3. Déverrouiller le boîtier de fusibles.
4. Pousser ses agrafes vers l’extérieur et le rabattre.
5. Identifier `C2` marron, `C5` marron clair et `C6` blanc par couleur, position et marquage.

Ne pas mettre les connecteurs ni les faisceaux en traction.

## Fixer la plaque et raccorder la masse

Le point de masse se trouve à droite du boîtier électrique central.

1. Desserrer avec une clé de `8 mm` la vis de masse, signalée comme très serrée.
2. Glisser la plaque de montage en place.
3. Visser ensemble les cosses existantes et l’œillet de masse WiPro dans le support métallique.
4. Serrer fermement, vérifier qu’aucune cosse ne bouge et mesurer continuité et chute de tension.

## Raccorder CAN et feux de détresse sur C6

Utiliser les raccords bleus remplis de gel.

| Broche C6 | Fil Ford | Fil WiPro | Fonction |
|---:|---|---|---|
| `21` | gris/orange | blanc/orange | CAN-High |
| `31` | violet/orange | violet/orange | CAN-Low |
| `19` | marron/jaune | rouge/rose | feux de détresse |

1. Identifier précisément C6 et les trois broches.
2. Réaliser chaque liaison conformément au tableau sans inverser CAN-High/CAN-Low.
3. Ne détorsader le CAN que sur la longueur nécessaire, puis verrouiller C6 et tester la tenue des raccords.

## Raccorder le verrouillage centralisé sur C2

Utiliser les raccords rouges.

| Broche C2 | Fil Ford | Fil WiPro | Fonction |
|---:|---|---|---|
| `24` | gris/marron | bleu | signal de verrouillage 1 |
| `23` | violet/orange | bleu/noir | signal de verrouillage 2 |

1. Identifier le connecteur C2 marron.
2. Réaliser les deux liaisons, les sécuriser séparément et verrouiller C2.

Ne pas inverser, réunir ni traiter ces fils comme des contacts interchangeables.

## Raccorder klaxon, allumage et alimentation sur C5

> **Attention :** C5 marron clair est numéroté **à l’envers**. Ne jamais deviner les broches depuis sa position montée.

| Affectation C5 | Fil Ford | Fil WiPro | Fonction |
|---|---|---|---|
| broche `9` | bleu/blanc, **fil isolé** | rose | klaxon du véhicule |
| broche `5` | gris/orange | jaune | allumage / borne 15 |
| aucune broche indiquée | rouge | rouge | alimentation / borne 30 via F73 |

1. Tourner C5 afin de lire sa numérotation.
2. Relier le fil bleu/blanc isolé de la broche 9 au rose WiPro.
3. Mesurer le gris/orange de la broche 5 et le relier au jaune WiPro.
4. Mesurer sous charge le fil rouge et le relier au rouge WiPro.
5. Utiliser des raccords rouges, contrôler `F73 / 15 A` et l’inscrire dans la notice client.
6. Verrouiller C5 et décharger les fils de toute traction.

La source laisse vide la broche du fil d’alimentation rouge. Aucune broche n’est donc inventée : couleur, mesure et chemin via `F73 / 15 A` doivent concorder.

À la première mise sous tension, le buzzer sonne ; sirène et/ou feux de détresse peuvent aussi s’activer. Couper des feux persistants avec leur interrupteur.

## Monter la LED d’état

1. Choisir l’emplacement sur le tableau de bord et contrôler l’arrière.
2. Percer un trou de `8 mm`, insérer la LED et raccorder son câble à la WiPro.
3. Vérifier sa visibilité depuis la position d’utilisation.

## Monter les contacts radiomagnétiques

La notice concerne les références noire `100757` et blanche `100758`. Voir [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

| Contrôle | Prescription |
|---|---|
| Orientation | LED d’émission opposée à l’aimant |
| Mauvaise orientation | mémorisation possible mais aucune alarme |
| Distance fermée | `22–30 mm` |
| Montage préféré | émetteur sur cadre, aimant sur ouvrant |
| Collage | surface propre, sèche, dégraissée ; au moins `15 °C` ; résistance finale après `24 h` |
| Grand écart / antenne | adaptateur `100428` ou `100729` |

1. Mémoriser et tester la portée avant fixation.
2. Orienter boîtier et carte avec la LED opposée à l’aimant.
3. Positionner l’aimant à `22–30 mm` en fermeture.
4. Nettoyer et dégraisser ; respecter `15 °C` et `24 h`.
5. Utiliser les points de vissage si le collage ne convient pas et un adaptateur si nécessaire.

## Essai fonctionnel et confirmations

### Véhicule avec Deadlock

1. Fermer portes et contacts, puis appuyer deux fois sur « verrouiller ».
2. Vérifier un signal sonore, les clignotants et la LED d’état clignotante.
3. Porte de cabine ouverte, vérifier que le véhicule ne verrouille pas, que son klaxon retentit et que la WiPro reste inactive.
4. Appuyer sur « déverrouiller » pour désarmer ; vérifier deux signaux, les clignotants et l’arrêt de la LED.

### Véhicule sans Deadlock

1. Armer et désarmer avec l’émetteur THITRONIK® gris.
2. Vérifier que le CAN continue de détecter les portes de cabine.

### Alarme d’essai

1. Armer par la méthode adaptée, puis ouvrir une porte ou un contact radio.
2. Contrôler l’alarme acoustique environ `30 secondes` et l’alarme optique environ `180 secondes`.
3. Distinguer klaxon et tonalité de sirène du buzzer interne.
4. Interrompre l’alarme et répéter l’essai avec chaque capteur.

Une série de bips courts à l’armement indique un contact mémorisé ouvert. La WiPro s’arme néanmoins ; rechercher et fermer ce contact.

## Diagnostic CAN et radio

### Diagnostic CAN

1. Appuyer brièvement sur le bouton jusqu’au clignotement de la LED du faisceau.
2. Actionner télécommande d’origine ou feux de détresse pour produire du trafic CAN.
3. Vérifier le scintillement de la LED ; sans réaction, contrôler C6 broches 21/31 et CAN-High/CAN-Low.
4. Appuyer à nouveau brièvement pour quitter.

### Diagnostic radio

Déclencher chaque émetteur à son emplacement définitif. Sans confirmation sonore, contrôler mémorisation, blindage métallique, antenne et adaptateur.

## Défauts typiques

| Défaut | Contrôle / correction |
|---|---|
| Télécommande d’origine sans effet | vérifier la présence du Deadlock ; sinon utiliser l’émetteur gris |
| Un seul appui ne suffit pas | avec Deadlock, appuyer deux fois |
| Pas de CAN / feux | contrôler C6 21/31 ou C6 19 et les raccords bleus |
| Verrouillage non évalué | contrôler C2 24/23, ordre des fils bleus et raccords rouges |
| Klaxon muet | contrôler le fil bleu/blanc isolé à C5 broche 9 et le fil rose |
| Allumage absent | contrôler C5 broche 5, gris/orange et jaune |
| WiPro sans tension | contrôler rouge, mesure borne 30, masse et `F73 / 15 A` ; ne pas supposer une broche C5 |
| Bips courts à l’armement | au moins un contact radio est ouvert |
| Contact mémorisé sans alarme | retourner la carte pour éloigner la LED de l’aimant |
| Réception instable | contrôler emplacement, métal, antenne, distance et adaptateur |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Sources et décision rédactionnelle

- Source principale : notice spécifique de neuf pages, version `12/20`, intégralement analysée et contrôlée visuellement.
- Pages 2–5 : profil DIP, commande, accès, masse, raccordements, fusible, LED et essai ; pages 6–9 : références, orientation, fixation, adaptateurs et `22–30 mm`.
- Le manuel général `1.8` complète sécurité, diagnostics et dépannage.
- `0823-001 / 2.1` vient de la matrice homologuée ; la notice véhicule ne donne aucun minimum.
- `SW1 + SW2 + SW6` prévaut sur l’ancien tableau général.
- Aucune broche n’a été reconstruite pour l’alimentation rouge C5 non numérotée.
- Le double appui a été limité aux véhicules avec Deadlock ; sans Deadlock, l’émetteur gris est obligatoire.

Sources :

- `D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_ford_transit_6._generation_2006-2013.pdf`
- `D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf`

## Articles connexes

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Ford Transit 7e génération précoce (2014-2015)|Ford Transit 7G 2014–2015]]
