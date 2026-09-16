---
title: Ford Transit 7e génération (2016-2019)
sources:
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/wipro_iii_ford_transit_7._generation_2016-2019.pdf
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-19'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/ford-transit-7g-2016.md
---

# Ford Transit 7e génération (2016-2019)

Installation d'une WiPro III dans les Ford Transit et Transit Custom 2016–2019. Le manuel `12/20` dit « 2016+ »; ce projet traite le restylage 2019 séparément.

> **Distinction importante :** la télécommande Ford d'origine n'est exploitable que **sans deadlock**. Avec deadlock, l'émetteur radio 868 THITRONIK® est obligatoire.

## Domaine d'application

| Caractéristique | Exigence |
|---|---|
| Véhicules | Transit/Transit Custom 2016–2019 |
| Minimum | `0823-013 / 5.6` |
| Profil | `SW2 + SW4 + SW6` `ON`; autres `OFF` |
| Télécommande Ford | seulement sans deadlock |
| Fils de verrouillage | bleu et bleu/noir non raccordés |
| Zone | calculateur, `J1`, `J2` à insert noir |

Le PDF donne `0823-013`; `5.6` vient de la matrice approuvée. Voir [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Déterminer le deadlock et la commande

| Équipement | Armement | Désarmement/arrêt |
|---|---|---|
| Avec deadlock | verrouiller puis utiliser [[Émetteur radio 868 — télécommande pour WiPro III|émetteur 868]] | émetteur 868 |
| Sans deadlock | « verrouiller » sur Ford arme automatiquement | télécommande exploitable; essai documenté avec émetteur |

Identifier la variante avant montage. Les fils bleu et bleu/noir restent isolés dans les deux cas.

## Régler le profil DIP

L'image du manuel confirme `SW2 + SW4 + SW6` et remplace l'ancienne indication erronée `SW1 + SW2`.

1. Couper l'alimentation et débrancher les connecteurs WiPro 20 pôles et Pro-Finder.
2. Mettre `SW2`, `SW4`, `SW6` `ON`; `SW1`, `SW3`, `SW5`, `SW7`, `SW8` `OFF`.
3. Documenter, refermer et isoler séparément bleu et bleu/noir.

| Fil | Traitement | Motif |
|---|---|---|
| bleu | ne pas raccorder; isoler | verrouillage inutilisé |
| bleu/noir | ne pas raccorder; isoler | verrouillage inutilisé |

## Sécurité et préparation

- Atelier qualifié; contrôler klaxon, voyants, éclairage et défauts.
- Travailler hors tension; vérifier connecteur, insert, broche, couleur et mesure.
- Protéger les câbles et arrêter en cas d'écart.

| Moyen | Usage |
|---|---|
| kit Ford dès `0823-013`, émetteur 868 | raccordement/commande |
| pinces, PH2, Torx 25 | démontage |
| foret `8 mm` | LED |
| multimètre/sertissage | mesure/raccords |

## Dégager tableau de bord et calculateur

Déclipser l'habillage vers le siège conducteur. Retirer les vis de l'armature, y compris sous le porte-gobelet, puis l'armature. Identifier `J1`, `J2` avec **insert noir** et le point CAN séparé sans tendre les faisceaux.

## Établir la masse

Contrôler le point métallique en bas à gauche du calculateur, y fixer l'œillet du fil WiPro noir, puis mesurer continuité et chute de tension.

## Raccorder au calculateur

| Raccord | Fil Ford | Fil WiPro | Fonction |
|---|---|---|---|
| `J1` broche `2` | jaune/marron | jaune | allumage |
| `J1` broche `11` | rouge **ou** violet/rouge | rouge | `+12 V` via fusible `18` |
| `J2`, insert noir, broche `18` | bleu/blanc | rose | klaxon |
| `J2`, insert noir, broche `19` | marron/jaune | rouge/rose | détresse |

Identifier hors tension, mesurer et raccorder selon la table. Tester sous charge J1/11, contrôler le fusible `18`, sécuriser, isoler et verrouiller les connecteurs. Les deux couleurs de J1/11 sont des alternatives, pas deux alimentations à réunir.

## Raccorder le CAN

| Fil Ford | Fil WiPro | Fonction |
|---|---|---|
| violet/orange | violet/orange | CAN-Low |
| blanc/orange **ou** gris/orange | blanc/orange | CAN-High |

Utiliser le point à deux fils illustré, sans broches indiquées. Mesurer, ne pas inverser High/Low, ouvrir la torsade au minimum et sécuriser. Ne pas inventer de numéro de broche.

## Monter la LED d'état

Contrôler le vide-poche rond gauche ou convenir d'un autre emplacement. Percer `8 mm`, insérer la LED, raccorder rouge/noir par fiche blanche et vérifier la visibilité.

## Apprendre les accessoires radio

Maintenir le bouton environ `10 secondes` jusqu'au bip/LED fixe. Déclencher chaque contact 868 2–3 fois avec l'aimant éloigné de plus de `30 mm`; actionner émetteurs, détecteurs de gaz et boucles. Attendre la confirmation, quitter par coupure brève ou bouton et documenter. Voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Monter les contacts radiomagnétiques

Art. `100757`/`100758`; voir [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

| Contrôle | Exigence |
|---|---|
| Carte | LED d'émission opposée à l'aimant |
| Erreur | apprentissage possible, aucune alarme |
| Distance | `22–30 mm` |
| Surface/température | propre, sèche, ≥`15 °C` |
| Adhésif | résistance finale après `24 heures` |
| Adaptateur | `100428` ou `100729` |

Apprendre et tester la portée; ne pas dépasser la limite rouge. Dégraisser, coller au-dessus de `15 °C`, ne pas charger `24 heures`; utiliser vis/adaptateurs si nécessaire.

## Essai fonctionnel et confirmations

### Avec deadlock

Fermer, verrouiller avec Ford, armer avec THITRONIK®, vérifier bip/clignotants/LED. Ouvrir la porte conducteur de l'extérieur avec la clé; vérifier `30 secondes` acoustiques et `180 secondes` optiques. Interrompre avec l'émetteur et lire la mémoire.

### Sans deadlock

Fermer puis appuyer « verrouiller » sur Ford; WiPro doit s'armer automatiquement, biper et clignoter. Ouvrir de l'intérieur ou avec la clé, vérifier `30`/`180` secondes, interrompre avec l'émetteur et tester toutes les portes/capteurs.

## Diagnostic CAN et radio

### CAN

Appuyer brièvement jusqu'au clignotement de la LED, actionner télécommande sans deadlock ou détresse. Sans activité, vérifier couleurs, point et High/Low; appuyer de nouveau pour quitter.

### Radio

Déclencher chaque émetteur sur place; sans confirmation sonore, vérifier apprentissage, métal, antenne, distance et adaptateurs.

## Pannes typiques

| Panne | Contrôle |
|---|---|
| Profil incorrect | `SW2 + SW4 + SW6`, pas `SW1 + SW2` |
| Ford inactive avec deadlock | normal; utiliser THITRONIK® |
| Pas d'armement sans deadlock | variante, CAN, télécommande |
| Pas de CAN | violet/orange et blanc/orange ou gris/orange |
| Pas d'alimentation | J1/11, couleur alternative, fusible `18`, masse |
| Allumage absent | J1/2 jaune/marron/jaune |
| Klaxon/détresse absents | J2 noir 18 ou 19 et couleurs |
| Réaction de verrouillage | bleu et bleu/noir doivent être isolés |
| Contact sans alarme | retourner la carte |
| Radio instable | métal, antenne, `22–30 mm`, adaptateur |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Sources et décision éditoriale

Les neuf pages `12/20` ont été contrôlées textuellement et visuellement: p.2 `0823-013`, deadlock, DIP; p.3–4 masse, J1/J2, fusible `18`, CAN, LED, `10 secondes`; p.5 deux essais et `30`/`180` secondes; p.6–9 contacts, adaptateurs, `22–30 mm`. Le manuel `1.8` complète le diagnostic; `5.6` vient de la matrice. Aucun pin CAN n'a été reconstruit.

## Articles connexes

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur 868]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact 868]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Ford Transit 7e génération précoce (2014–2015)|Ford Transit 7G 2014–2015]]
- [[Ford Transit 7e génération Facelift (2019-07/2024)|Ford Transit Facelift]]
