---
title: Fiat Ducato restylé / Citroën Jumper / Peugeot Boxer / Opel Movano (2024+)
sources:
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/Zusatzanleitung_safe.lock-Upgrade-alleFahrzeuge_2024.pdf
  - 'D:/Texte/de/seriennummern-softwarestaende.md'
  - 'D:/Texte/de/fahrzeugkompatibilitaet.md'
  - 'D:/Thitronik WIKI (ml)/wiki/de/fahrzeuge/fiat-ducato-2024plus.md'
updated: '2026-07-19'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/fiat-ducato-2024plus.md
---

# Fiat Ducato restylé / Citroën Jumper / Peugeot Boxer / Opel Movano (2024+)

Cet article décrit le raccordement d'une WiPro III safe.lock au Fiat Ducato restylé et aux modèles équivalents documentés à partir de 2024. Plusieurs couleurs de fils et les broches du connecteur gris diffèrent de la génération 2022-2024.

> **Délimitation :** la première immatriculation ne suffit pas. Vérifier année-modèle, calculateur, connecteurs, couleurs, numéro de série et logiciel WiPro. Si l'électricité correspond à l'ancienne version, utiliser [[Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022-2024)|Fiat Ducato 2022-2024]].

## Domaine d'application

| Caractéristique | Exigence |
|---|---|
| Véhicules | Fiat Ducato restylé, Citroën Jumper, Peugeot Boxer et Opel Movano |
| Années-modèles | à partir de 2024 ; contrôler l'exécution électrique réelle |
| Alarme | WiPro III safe.lock ou WiPro III convertie professionnellement |
| Raccordement | calculateur de carrosserie près de la boîte à fusibles, derrière le vide-poches |
| DIP | selon la variante ; utiliser uniquement la notice actuelle spécifique au véhicule |
| Numéro de série minimal | `1050-046` |
| Logiciel minimal | `7.5.3s` |

Les préfixes et jalons figurent dans [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]. Voir aussi [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## État des sources et seuil logiciel

| Version du véhicule | Numéro de série minimal | Logiciel associé | Classement |
|---|---|---|---|
| Ducato restylé et modèles équivalents documentés à partir de 2024 | `1050-046` | `7.5.3s` | première prise en charge validée de cette électronique |

La combinaison **`1050-046` et au moins `7.5.3s`** est documentée dans l'historique validé pour le Fiat Ducato restylé à partir de 2024. Ne pas confondre référence, numéro de série complet et logiciel installé.

## Sécurité et préparation

- Confier les travaux électriques à un atelier qualifié.
- Couper l'alimentation selon le constructeur avant d'ouvrir la WiPro, de modifier les DIP ou de câbler.
- Mesurer bornes 30 et 15 et masse ; ne jamais se fier uniquement à la couleur.
- Isoler séparément chaque entrée ou sortie inutilisée.
- Comparer connecteurs, broches et couleurs au véhicule réel.
- En cas d'écart, arrêter et consulter le constructeur ou le support THITRONIK.

Avant intervention, documenter télécommande, verrouillage centralisé, klaxon, affichage des portes, témoins et défauts existants.

## Détermination sûre de la configuration DIP

Le fonds conservé qualifie le réglage DIP de dépendant du véhicule ou de la variante, sans tableau complet fiable. Reprendre le réglage de la notice actuelle correspondant exactement au véhicule.

1. Noter le numéro de série WiPro complet et le logiciel installé.
2. Identifier le véhicule, l'année-modèle, l'infotainment et le calculateur.
3. Sélectionner la notice actuelle spécifique à partir de ces données.
4. Mettre la WiPro hors tension et ouvrir le boîtier.
5. Régler uniquement la position DIP qui y est documentée.
6. Fermer le boîtier et rétablir l'alimentation.
7. Tester séparément armement/désarmement et verrouillage/déverrouillage.
8. Documenter durablement réglage réussi, véhicule, numéro de série et logiciel.

> **Important :** ne jamais modifier les DIP sous tension. Ne pas reconstruire ni tester des combinaisons non documentées.

## Accès au calculateur et raccordement de base

1. Déposer le vide-poches et les garnitures selon les instructions du véhicule.
2. Dégager le calculateur près de la boîte à fusibles.
3. Documenter position et verrouillage des connecteurs avant débranchement.
4. Raccorder le fil WiPro noir à un point de masse homologué.
5. Traiter les connecteurs brun et gris à l'arrière ; raccorder le vert après basculement du calculateur.

Réaliser des dérivations durables avec décharge de traction. Les tableaux nomment d'abord le fil du véhicule, puis celui de la WiPro.

## Connecteur brun : feux de détresse et klaxon

| Broche | Fil véhicule | Fil WiPro | Fonction |
|---:|---|---|---|
| 59 | blanc/bleu | rouge/rose | feux de détresse |
| 11 | vert/violet | rose | klaxon du véhicule |

Sirène et klaxon sont distincts. Le fil rose sur la broche 11 commande le klaxon, pas une sortie de sirène.

## Connecteur gris : alimentation et contact

| Broche | Fil véhicule | Fil WiPro | Fonction |
|---:|---|---|---|
| 5 | rouge/violet | rouge | borne 30, plus permanent |
| 3 | rose/vert | jaune | borne 15, contact |

Mesurer les deux bornes. Cette affectation diffère expressément de celle de 2022-2024 ; ne pas mélanger les schémas.

## Connecteur vert : verrouillage centralisé et CAN

| Broche | Fil véhicule | Fil WiPro | Fonction |
|---:|---|---|---|
| 9 | beige/violet | bleu/noir | verrouillage avant |
| 41 | vert/bleu | bleu | verrouillage arrière |
| 42 | blanc/noir | violet/orange | CAN Low |
| 43 | blanc | blanc/orange | CAN High |

Ne pas inverser CAN High/Low ni les fils de verrouillage. Vérifier individuellement la détection des portes sur les véhicules semi- ou entièrement intégrés.

## safe.lock native ou mise à niveau safe.lock

Distinguer une WiPro III safe.lock d'origine d'une WiPro III transformée matériellement. La notice de mise à niveau prescrit les nouveaux fils suivants :

| Broche WiPro | Nouveau fil | Signification |
|---:|---|---|
| 20 | bleu | fil de verrouillage centralisé |
| 19 | bleu/noir | fil de verrouillage centralisé |
| 16 | blanc/noir | dériver en parallèle si déjà occupée |

Après le contrôle des entrées/sorties d'une mise à niveau, la mémoire radio est vide. Réapprendre tous les accessoires via [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]. La notice de mise à niveau ne remplace pas l'affectation des connecteurs du véhicule.

## Réglages requis du véhicule

Activer dans le menu du véhicule :

- « Clignotants lors du verrouillage »
- « Déverrouillage des portes en quittant le véhicule »

Les libellés varient selon langue et logiciel. Tester réellement verrouillage, déverrouillage, clignotants et réaction WiPro.

## Contrôle fonctionnel final

1. Contrôler connecteurs, verrouillages, dérivations, isolation, masse, fusible et DIP.
2. Documenter numéro de série, logiciel, combinaison DIP et infotainment.
3. Armer la WiPro et vérifier la confirmation de l'état d'alarme.
4. Verrouiller le véhicule et tester ensemble portes avant et arrière.
5. Déverrouiller et retester les deux voies de verrouillage.
6. Ouvrir séparément chaque porte d'origine surveillée par CAN et vérifier l'alarme.
7. Tester les feux via la broche 59 et le klaxon via la broche 11.
8. Vérifier les deux réglages requis du véhicule.
9. Après mise à niveau, déclencher séparément chaque accessoire réappris.
10. Vérifier l'absence de nouveau témoin ou code défaut.

Selon le système, [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]] et [[Module NFC — commande de la WiPro via NFC|Module NFC]] servent de commandes indépendantes. Leur action sur le verrouillage dépend du raccordement safe.lock correct.

## Dépannage

| Symptôme | Contrôle et action |
|---|---|
| Réaction WiPro incorrecte | Contrôler série `1050-046`, logiciel `7.5.3s` et réglage DIP validé. |
| Verrouillage seulement avant ou arrière | Contrôler broches 9/41 et fils bleu/bleu-noir. |
| Portes d'origine sans alarme CAN | Contrôler CAN Low broche 42 et CAN High broche 43 ; ne pas les inverser au hasard. |
| Pas de feux de détresse | Contrôler broche 59 vers rouge/rose et réglage véhicule. |
| Klaxon inactif | Contrôler broche 11 vers rose et klaxon du véhicule. |
| Accessoire radio inactif après mise à niveau | Tout réapprendre ; le contrôle a vidé la mémoire. |
| Connecteur gris conforme à l'ancienne affectation | Refaire l'identification de génération et arrêter jusqu'à attribution certaine. |

Pour les contrôles généraux, voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Décision sur les sources

- Les broches et fils du restylage proviennent du fonds rédactionnel conservé ; les DOCX primaires cités ne sont plus présents localement.
- Le seuil `1050-046 / 7.5.3s` suit [[Numéros de série et versions logicielles — préfixes, seuils et jalons|l'historique validé]].
- Les quatre pages de *WiPro III safe.lock Upgrade*, révision `2.0`, ont été contrôlées textuellement et visuellement. Elles confirment les broches 20, 19 et 16 et le nouvel apprentissage.
- La notice de mise à niveau n'est pas une notice de câblage véhicule. Ne pas reconstruire ni deviner DIP ou fils manquants.

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Module NFC — commande de la WiPro via NFC|Module NFC]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022-2024)|Fiat Ducato 2022-2024]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
