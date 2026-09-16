---
title: Ford Transit 7e génération précoce (2014–2015)
sources:
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/wipro_iii_ford_transit_7._generation_2014_2015.pdf
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-19'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/ford-transit-7g-2014.md
---

# Ford Transit 7e génération précoce (2014–2015)

Cet article décrit l'installation d'une WiPro III dans les Ford Transit et Transit Custom de la première 7e génération, de 2014 à 2015. Le manuel véhicule `12/20` documente commande, profil DIP, démontage, calculateur de bord, masse, connecteur C4, klaxon, LED, accessoires radio et essai.

> **Distinction de sécurité :** la télécommande Ford d'origine n'est **pas évaluée** par la WiPro, car son signal ne peut pas être distingué sûrement de celui des serrures mécaniques. Un émetteur radio 868 THITRONIK® est obligatoire pour armer et désarmer.

## Domaine d'application

| Caractéristique | Exigence |
|---|---|
| Véhicules | Ford Transit et Transit Custom, première 7e génération |
| Années | 2014–2015 |
| Système | WiPro III |
| Version minimale | `0823-011 / 4.7` |
| Profil | `SW1 + SW2 + SW3 + SW4 + SW6` sur `ON`; autres sur `OFF` |
| Commande d'alarme | uniquement émetteur radio 868 THITRONIK® |
| Fils de verrouillage | bleu et bleu/noir non raccordés |
| Zone principale | calculateur de bord et connecteur bleu `C4` |

Le PDF indique `0823-011`, mais pas le logiciel; `4.7` vient de la matrice approuvée. Voir [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Concept de commande et limite de sécurité

| Action | Commande autorisée | Effet |
|---|---|---|
| Verrouiller/déverrouiller le véhicule | télécommande Ford ou clé mécanique | véhicule uniquement |
| Armer/désarmer WiPro | [[Émetteur radio 868 — télécommande pour WiPro III|émetteur radio 868]] appris | alarme uniquement |
| Interrompre l'alarme | émetteur THITRONIK® | désarme WiPro |

D'abord verrouiller le véhicule avec la télécommande Ford, puis armer WiPro avec l'émetteur THITRONIK®. Désarmer WiPro ne déverrouille pas automatiquement le véhicule. Cette séparation est voulue; ne jamais raccorder les fils bleus comme solution de contournement.

## Régler le profil DIP

1. Couper complètement l'alimentation WiPro et débrancher les connecteurs WiPro 20 pôles et Pro-Finder.
2. Ouvrir le boîtier avec précaution.
3. Mettre `SW1`, `SW2`, `SW3`, `SW4` et `SW6` sur `ON`.
4. Mettre `SW5`, `SW7` et `SW8` sur `OFF`, sauf fonction optionnelle documentée séparément.
5. Documenter les positions et refermer avant de poursuivre.
6. Isoler séparément les fils bleu et bleu/noir, présents mais inutilisés.

| Fil WiPro | Traitement | Motif |
|---|---|---|
| bleu | ne pas raccorder; isoler | commande de verrouillage inutilisée |
| bleu/noir | ne pas raccorder; isoler | commande de verrouillage inutilisée |

## Sécurité et préparation

- Confier électricité, CAN, zone airbag, colonne de direction et verrouillage à un atelier qualifié.
- Contrôler auparavant klaxon, voyants, éclairage et mémoire des défauts.
- Travailler hors tension et vérifier ensemble connecteur, broche, couleur et signal mesuré.
- Isoler les fils inutilisés et les protéger des pièces coupantes ou mobiles.
- **Ne pas débrancher** le connecteur du contacteur tournant utilisé pour le klaxon.
- En cas d'écart avec le manuel, arrêter et contacter THITRONIK.

| Outil/pièce | Utilisation |
|---|---|
| kit Ford pour WiPro dès `0823-011` | raccordement véhicule |
| émetteur radio 868 | commande obligatoire |
| pinces, PH2 et Torx 25 | démontage |
| douille `10 mm` | trois fixations du calculateur |
| perceuse et foret `8 mm` | LED |
| multimètre et pince à sertir | mesures et raccords |

## Dégager le tableau de bord et le calculateur

1. Déclipser l'habillage vers l'avant et retirer le porte-bouteille.
2. Dévisser l'armature et la déplacer vers le siège; les dernières vis en haut à droite sont difficiles d'accès.
3. Retirer le vide-poche rond gauche et la vis située dessous.
4. Retirer les trois écrous/vis du calculateur avec une douille `10 mm`.
5. Basculer prudemment le calculateur vers l'avant.
6. Identifier `C4` bleu par couleur, position et marquage sans tendre les faisceaux.

## Établir la masse

Le point documenté se trouve sur la structure métallique à gauche du calculateur.

1. Identifier le point réel, contrôler fixation, corrosion et peinture.
2. Y fixer l'œillet du fil WiPro noir.
3. Serrer sans vriller l'œillet, puis mesurer continuité et chute de tension.

## Raccorder détresse, CAN, alimentation et allumage sur C4

| Broche C4 | Fil Ford | Fil WiPro | Fonction |
|---:|---|---|---|
| `13` | marron/jaune | rouge/rose | feux de détresse |
| `53` | gris/orange | blanc/orange | CAN-High |
| `54` | violet/orange | violet/orange | CAN-Low |
| `64` | violet/rouge | rouge | `+12 V (radio)` / alimentation |
| `76` | jaune/marron | jaune | allumage |

1. Identifier C4 et ses broches sans tension.
2. Raccorder 13 à rouge/rose, 53 à blanc/orange et 54 à violet/orange WiPro.
3. Mesurer sous charge le violet/rouge de 64 et le raccorder au rouge WiPro.
4. Mesurer le jaune/marron de 76 et le raccorder au jaune WiPro.
5. N'ouvrir la paire CAN que sur la longueur nécessaire; ne pas inverser High/Low.
6. Tester la traction, isoler, verrouiller C4 et soulager les câbles.

La source nomme la broche 64 `+12 V (radio)`; ne pas la réinterpréter sans mesure comme une borne 30 quelconque.

## Raccorder le klaxon au contacteur tournant

> **Attention :** identifier le connecteur, mais **ne pas le débrancher**.

| Raccord | Fil Ford | Fil WiPro | Fonction |
|---|---|---|---|
| broche `4` du connecteur du contacteur tournant | bleu/blanc | rose | klaxon |

1. Déposer correctement l'habillage de colonne.
2. Identifier sans le débrancher le connecteur, la broche `4` et le fil bleu/blanc.
3. Mesurer, puis raccorder bleu/blanc au rose WiPro.
4. Sécuriser, isoler et remonter seulement après le test.

## Monter la LED d'état

1. Choisir l'emplacement, montré dans le vide-poche rond gauche, et contrôler l'arrière.
2. Percer `8 mm`, insérer la LED et raccorder son câble rouge/noir à fiche blanche au faisceau WiPro.
3. Vérifier sa visibilité; convenir auparavant de tout autre emplacement avec le client.

## Apprendre les accessoires radio

1. Maintenir le bouton à droite du connecteur jusqu'au bip et à l'allumage fixe de la LED.
2. Déclencher chaque contact 868 deux ou trois fois en éloignant l'aimant de plus de `30 mm`.
3. Appuyer deux ou trois fois sur chaque émetteur; allumer les détecteurs de gaz et retirer les boucles de leur support.
4. Après chaque composant, attendre bip et bref extinction de la LED.
5. Quitter par une brève coupure d'alimentation ou un appui bref, puis documenter les composants.

Voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Monter les contacts radiomagnétiques

Le manuel couvre les contacts 868 `100757` et `100758`. Voir [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

| Contrôle | Exigence |
|---|---|
| Orientation | LED d'émission opposée à l'aimant |
| Mauvaise orientation | apprentissage possible, mais aucune alarme |
| Distance fermée | `22–30 mm` |
| Montage préféré | émetteur sur cadre, aimant sur partie mobile |
| Surface | propre, sèche et dégraissée |
| Température | au moins `15 °C` |
| Résistance finale | après environ `24 heures` |
| Grand écart/antenne | adaptateurs `100428` ou `100729` |

1. Apprendre et tester la portée avant fixation.
2. Orienter la carte avec la LED loin de l'aimant et placer celui-ci à `22–30 mm`, sans dépasser la limite rouge documentée.
3. Nettoyer et dégraisser; coller au-dessus de `15 °C` et ne pas charger pendant `24 heures`.
4. Utiliser si nécessaire les points de vis ou adaptateurs; monter gaz et boucles selon leurs notices.

## Essai fonctionnel et confirmations

### Armement et déclenchement

1. Fermer portes et contacts, puis verrouiller avec la télécommande Ford.
2. Armer WiPro avec l'émetteur THITRONIK® appris.
3. Vérifier un bip, les clignotants et la LED clignotante.
4. Déverrouiller mécaniquement la porte conducteur de l'intérieur ou avec la clé et l'ouvrir.
5. Vérifier environ `30 secondes` d'alarme sonore et `180 secondes` d'alarme optique.

### Désarmement et mémoire

1. Appuyer sur l'émetteur THITRONIK® pour désarmer ou interrompre l'alarme.
2. Observer la séquence de mémoire sur la LED et l'interpréter avec le chapitre 2 de la notice.
3. Répéter avec chaque porte CAN et capteur radio, puis tester séparément verrouillage et état WiPro.

La télécommande Ford ne doit jamais modifier l'état WiPro.

## Diagnostic CAN et radio

### Diagnostic CAN

1. Appuyer brièvement sur le bouton WiPro jusqu'au clignotement de la LED du faisceau.
2. Actionner les feux de détresse; la LED doit clignoter selon les données.
3. Sinon contrôler C4 53/54 et CAN-High/Low; appuyer de nouveau pour quitter.

### Diagnostic radio

Déclencher chaque émetteur à son emplacement final. WiPro confirme acoustiquement la réception. Sinon vérifier apprentissage, métal, antenne, distance et adaptateurs.

## Pannes typiques

| Panne | Contrôle / remède |
|---|---|
| Télécommande Ford n'arme pas WiPro | comportement correct; utiliser l'émetteur THITRONIK® |
| WiPro armée, véhicule déverrouillé | verrouiller séparément avec la télécommande Ford |
| Ouverture mécanique sans alarme | armement, C4 53/54, CAN et portes |
| Pas de CAN | C4 53/54, gris/orange, violet/orange, High/Low |
| Pas de détresse | C4 13, marron/jaune, rouge/rose |
| Pas d'alimentation | C4 64, violet/rouge, `+12 V (radio)` réel et masse |
| Allumage non détecté | C4 76, jaune/marron et jaune WiPro |
| Klaxon muet | ne pas débrancher; broche 4, bleu/blanc et rose |
| Réaction de verrouillage indésirable | bleu et bleu/noir doivent être isolés |
| LED inactive | trou `8 mm`, câble rouge/noir et fiche blanche |
| Accessoire non appris | marquage `868`, séquence, mode et confirmation |
| Appris sans alarme | retourner la carte, LED opposée à l'aimant |
| Réception instable | lieu, métal, antenne, `22–30 mm`, adaptateur |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Sources et décision éditoriale

- Source primaire : manuel véhicule de neuf pages `12/20`, intégralement contrôlé dans le texte et les images.
- La page 2 établit émetteur obligatoire, `0823-011`, DIP et fils inutilisés; les pages 3–4 démontage, masse, C4, klaxon, LED et apprentissage.
- La page 5 établit commandes séparées, test mécanique, `30`/`180` secondes et mémoire; les pages 6–9 `100757`/`100758`, orientation, montage, adhésif, adaptateurs et `22–30 mm`.
- Le manuel général `1.8` complète travail hors tension et diagnostics. `4.7` vient de la matrice approuvée.
- C4 64 reste `+12 V (radio)`; aucune désignation non étayée n'a été ajoutée.

Sources primaires :

- `D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_ford_transit_7._generation_2014_2015.pdf`
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
- [[Ford Transit 6e génération (2006–2013)|Ford Transit 6G]]
- [[Ford Transit 7e génération (2016-2019)|Ford Transit 7G 2016–2019]]
