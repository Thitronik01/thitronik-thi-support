---
title: Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022-2024)
sources:
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/Zusatzanleitung_safe.lock-Upgrade-alleFahrzeuge_2024.pdf
  - 'D:/Texte/de/seriennummern-softwarestaende.md'
  - 'D:/Texte/de/fahrzeugkompatibilitaet.md'
  - 'D:/Thitronik WIKI (ml)/wiki/de/fahrzeuge/fiat-ducato-2022-2024.md'
updated: '2026-07-19'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/fiat-ducato-2022-2024.md
---

# Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022-2024)

Cet article décrit le raccordement d'une WiPro III safe.lock au Fiat Ducato 8/9 et aux modèles équivalents documentés de 2022 à 2024. L'accès au calculateur de carrosserie, les connecteurs, les broches et la détermination des DIP diffèrent de la génération précédente.

> **Délimitation :** la première immatriculation ne suffit pas. Vérifier ensemble carrosserie, année-modèle, calculateur, connecteurs, numéro de série et logiciel WiPro. L'électronique restylée relève de [[Fiat Ducato restylé / Citroën Jumper / Peugeot Boxer / Opel Movano (2024+)|Fiat Ducato à partir de 2024]].

## Domaine d'application

| Caractéristique | Exigence |
|---|---|
| Véhicules | Fiat Ducato 8/9, Citroën Jumper, Peugeot Boxer et Opel Movano |
| Années-modèles | 2022-2024 ; contrôler l'exécution électrique réelle |
| Alarme | WiPro III safe.lock ou WiPro III convertie professionnellement |
| Raccordement | calculateur de carrosserie près de la boîte à fusibles, derrière le vide-poches |
| DIP | selon le véhicule ; contrôler successivement six combinaisons documentées |
| Minimum standard | `1050-016` / logiciel `7.1s` |
| Minimum grand écran tactile Fiat | `1050-042` / logiciel `7.5.2s` |

Pour la génération précédente, voir [[Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012-2021)|Fiat Ducato 2012-2021]]. Les préfixes et jalons complets figurent dans [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## État des sources et seuil logiciel

| Version du véhicule | Numéro de série minimal | Logiciel associé | Classement |
|---|---|---|---|
| Ducato 8, année-modèle 2021/2022 | `1050-016` | `7.1s` | première prise en charge documentée |
| Ducato 8/9 avec grand écran tactile Fiat | `1050-042` | `7.5.2s` | minimum fiable de l'historique validé |

L'ancienne page véhicule indique `7.5.1S` pour le grand écran. L'historique validé associe toutefois `1050-042` à `7.5.2s` et le définit comme minimum. La règle est donc **`1050-042` et au moins `7.5.2s`**. Ne pas confondre référence, numéro de série complet et logiciel installé.

## Sécurité et préparation

- Confier les travaux électriques à un atelier qualifié.
- Couper l'alimentation selon le constructeur avant d'ouvrir la WiPro, de modifier les DIP ou de câbler.
- Mesurer bornes 30 et 15 et masse ; ne jamais se fier uniquement à la couleur.
- Isoler séparément chaque entrée ou sortie inutilisée.
- Comparer connecteurs, broches et couleurs au véhicule réel.
- En cas d'écart, arrêter et consulter le constructeur ou le support THITRONIK.

Avant intervention, documenter télécommande, verrouillage centralisé, klaxon, affichage des portes, témoins et défauts existants.

## Détermination sûre de la configuration DIP

Reprendre les six combinaisons de la notice actuelle spécifique au véhicule. Ne jamais tester une position non documentée.

1. Noter le numéro de série WiPro complet et le logiciel installé.
2. Identifier véhicule, année-modèle, infotainment et fonctions de verrouillage.
3. Mettre la WiPro hors tension et ouvrir le boîtier.
4. Régler la première combinaison documentée ; laisser les autres commutateurs selon la notice.
5. Fermer le boîtier et rétablir l'alimentation.
6. Exécuter **« 8× verrouiller/déverrouiller »**, avec au moins **8 secondes** entre chaque action.
7. Contrôler la détection fiable de l'armement/désarmement et la réaction du véhicule.
8. En cas d'échec, couper de nouveau l'alimentation avant la combinaison suivante.
9. Documenter durablement le réglage réussi, le véhicule, le numéro de série et le logiciel.

> **Important :** ne jamais modifier les DIP sous tension. Armement/désarmement et verrouillage/déverrouillage sont des fonctions distinctes.

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
| 59 | violet/orange | rouge/rose | feux de détresse |
| 11 | vert/blanc | rose | klaxon du véhicule |

Sirène et klaxon sont deux avertisseurs distincts. Le fil rose sur la broche 11 commande ici le klaxon, pas une sortie de sirène.

## Connecteur gris : alimentation et contact

| Broche | Fil véhicule | Fil WiPro | Fonction |
|---:|---|---|---|
| 18 | rouge/vert | rouge | borne 30, plus permanent |
| 17 | bleu/gris | jaune | borne 15, contact |

Mesurer les deux bornes. Après débranchement du connecteur gris, **l'horloge du véhicule peut devoir être réglée** ; ce n'est pas un défaut WiPro.

## Connecteur vert : verrouillage centralisé et CAN

| Broche | Fil véhicule | Fil WiPro | Fonction |
|---:|---|---|---|
| 9 | bleu/jaune | bleu/noir | verrouillage avant |
| 41 | gris/blanc | bleu | verrouillage arrière |
| 42 | blanc | violet/orange | CAN Low |
| 43 | bleu | blanc/orange | CAN High |

Ne pas inverser CAN High/Low ni les deux fils de verrouillage. Vérifier la détection réelle des portes sur les véhicules semi- ou entièrement intégrés.

## safe.lock native ou mise à niveau safe.lock

Distinguer une WiPro III safe.lock d'origine d'une WiPro III transformée matériellement. La notice de mise à niveau prescrit les nouveaux fils suivants :

| Broche WiPro | Nouveau fil | Signification |
|---:|---|---|
| 20 | bleu | fil de verrouillage centralisé |
| 19 | bleu/noir | fil de verrouillage centralisé |
| 16 | blanc/noir | dériver en parallèle si déjà occupée |

Après le contrôle des entrées/sorties d'une mise à niveau, la mémoire radio est vide. Réapprendre tous les accessoires via [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]. La notice de mise à niveau ne remplace pas l'affectation des connecteurs du véhicule.

## Réglages du véhicule avec grand infotainment

Sur les Ducato 8/9 de 2023-2024 avec grand écran tactile Fiat, activer :

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
8. Vérifier les deux réglages requis du grand infotainment.
9. Après mise à niveau, déclencher séparément chaque accessoire réappris.
10. Vérifier l'absence de nouveau témoin ou code défaut.

Selon le système, [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]] et [[Module NFC — commande de la WiPro via NFC|Module NFC]] servent de commandes indépendantes. Leur action sur le verrouillage dépend du raccordement safe.lock correct.

## Dépannage

| Symptôme | Contrôle et action |
|---|---|
| Verrouillage mal reconnu | Contrôler série/logiciel et répéter l'apprentissage DIP avec 8 secondes minimum. |
| Verrouillage seulement avant ou arrière | Contrôler broches 9/41 et fils bleu/bleu-noir. |
| Portes d'origine sans alarme CAN | Contrôler CAN Low broche 42 et CAN High broche 43 ; ne pas les inverser au hasard. |
| Pas de feux de détresse | Contrôler broche 59 vers rouge/rose et le réglage du véhicule. |
| Klaxon inactif | Contrôler broche 11 vers rose et le klaxon du véhicule. |
| Accessoire radio inactif après mise à niveau | Tout réapprendre ; le contrôle a vidé la mémoire. |
| Véhicule ou connecteur différent | Arrêter et obtenir une validation spécifique. |

Pour les contrôles généraux, voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Décision sur les sources

- Broches, fils et six combinaisons DIP proviennent du fonds rédactionnel conservé ; les fichiers DOCX primaires cités n'existent plus localement.
- Les seuils `1050-016 / 7.1s` et `1050-042 / 7.5.2s` suivent [[Numéros de série et versions logicielles — préfixes, seuils et jalons|l'historique validé]].
- Les quatre pages de *WiPro III safe.lock Upgrade*, révision `2.0`, ont été contrôlées textuellement et visuellement. Elles confirment les broches 20, 19 et 16 et le nouvel apprentissage.
- Sans notice actuelle spécifique au véhicule, ne jamais reconstruire ni deviner les DIP ou des fils différents.

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Module NFC — commande de la WiPro via NFC|Module NFC]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012-2021)|Fiat Ducato 2012-2021]]
- [[Fiat Ducato restylé / Citroën Jumper / Peugeot Boxer / Opel Movano (2024+)|Fiat Ducato à partir de 2024]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
