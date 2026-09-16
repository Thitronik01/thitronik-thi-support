---
title: Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper
sources:
  - sources/safe-lock_umruestplatine.pdf
  - sources/FAQ_safe-lock_Umruestplatine__101052_DE.md
  - >-
    sources/safe-lock_Umruestplatine__101052__Legal__Konformitaet_2014-53-EU_DE.md
  - sources/Fragen zu safe.lock Umrüstplatine.pdf
updated: '2026-07-15'
confidence: high
lang: fr
translation_of: sources/safe-lock-umruestplatine.md
---

# Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper

Réf. : 101052 | Révision : 1.3

En combinaison avec la **WiPro III safe.lock**, la carte de conversion safe.lock comble une **faille de sécurité** côté véhicule, causée par des clés de véhicule non codées.

> **Délimitation :** la carte de conversion n'est **pas un produit d'alarme autonome**. Elle complète uniquement une **WiPro III safe.lock** déjà présente ou installée en même temps.

---

## Caractéristiques techniques

| Paramètre | Valeur |
|-----------|------|
| Alimentation électrique | 3 V (CR2032) |
| Durée de vie de la pile | env. 2 ans (selon l'utilisation) |
| Fréquence d'émission | 868,35 MHz |
| Puissance d'émission | < 10 mW |
| Plage de température | –20 à +80 °C |

---

## Véhicules concernés

| Véhicule | Classification |
|----------|------------|
| Fiat Ducato / Peugeot Boxer / Citroën Jumper | Notice de base : **2006–2012** ; une FAQ de support ultérieure étend la famille de véhicules concernée jusqu'à l'**année-modèle 2018** |
| Iveco Daily (et modèles identiques) | Notice de base : **2006–2012** ; pris en charge par THITRONIK à partir de l'**année de construction 2011** |

> **À partir de l'année-modèle 2019 :** selon une note de support, la clé d'origine du véhicule utilise un **code tournant**. Cela se reconnaît à un **anneau porte-clé en plastique noir** au lieu de l'ancien œillet métallique chromé.

**Le problème :** le verrouillage centralisé de ces véhicules est commandé via une **liaison radio non sécurisée** de la clé d'origine. Un signal de **« déverrouillage »** enregistré peut être rejoué sous forme d'attaque par rejeu ; le véhicule s'ouvre alors sans trace d'effraction, et les systèmes d'alarme basés sur le CAN sont désarmés au passage.

**La solution :** la carte de conversion fait en sorte que le verrouillage centralisé ne soit **plus commandé que de manière codée via la carte de conversion** — et non plus via la radio de clé d'origine, non sécurisée.

---

## Conditions requises

- **WiPro III safe.lock** (la version standard WiPro III n'est pas suffisante)
- **Partenaire premium safe.lock THITRONIK®** pour la copie du transpondeur

---

## Étapes de montage

### Étape 1 : faire copier le transpondeur de l'antidémarrage

> **CRITIQUE :** cette étape **doit être réalisée avant le montage**. Sans transpondeur copié, le moteur ne peut plus être démarré avec la clé !

Trouver un partenaire premium : `www.thitronik.de/haendlerfinder`

### Étape 2 : insérer la carte de conversion dans la clé du véhicule

1. Ouvrir le boîtier de la clé
2. Retirer l'électronique d'origine
3. Fixer le transpondeur copié dans le boîtier de la clé (utiliser de la colle)
4. Insérer la carte de conversion
5. Remonter la clé du véhicule

### Étape 3 : mémoriser et supprimer les cartes de conversion

Comme décrit dans le manuel de la WiPro III safe.lock.

---

## Utilisation après la conversion

Le véhicule peut être utilisé **comme d'habitude** avec la clé convertie.

**Exception pour les clés à 3 boutons :**
- Le déverrouillage séparé de l'espace de chargement n'est **techniquement plus possible**
- Les deux boutons de déverrouillage déverrouillent l'**ensemble du véhicule**

---

## Comportement de la clé d'origine

- Côté véhicule, **rien** n'est modifié au niveau du verrouillage centralisé d'origine
- Si **aucune** carte de conversion n'est utilisée pour l'instant sur un système safe.lock, la télécommande d'origine continue en principe de fonctionner
- La **WiPro III safe.lock** ignore toutefois délibérément ces signaux radio d'origine ; un déverrouillage mécanique ne désarme donc pas non plus automatiquement le système d'alarme
- Note de support pour les clés pliantes non sécurisées sans rééquipement safe.lock : retirer la pile bouton et n'ouvrir le véhicule que **manuellement**

---

## Délimitation du produit et conformité

- Nécessite toujours une **WiPro III safe.lock** comme centrale
- Sert à la **sécurité de la clé**, et non à une détection d'alarme autonome
- Les informations de conformité et de radio sont régies par les documents fournis avec le produit
- Le montage et la copie du transpondeur reviennent à des partenaires premium safe.lock expérimentés

---

## Questions fréquentes (FAQ)

**Pourquoi le transpondeur de l'antidémarrage doit-il être copié ?**
Sans cette copie, le moteur **ne peut plus être démarré** avec la clé convertie. Cette étape est impérative.

**Avec quoi fixer le transpondeur copié dans le boîtier de la clé ?**
Il est expressément recommandé d'utiliser de la **colle**.

**Comment mémoriser ou supprimer la carte de conversion ?**
Comme décrit dans le manuel de l'appareil concerné (module safe.lock ou WiPro III safe.lock) — procédure identique à celle des autres accessoires radio.

**Que faut-il observer pour les véhicules équipés d'une clé à 3 boutons ?**
Le déverrouillage séparé de l'espace de chargement n'est **plus possible** — les deux boutons de déverrouillage déverrouillent l'**ensemble du véhicule**.

**Comment reconnaître les véhicules dotés d'une génération de clé plus récente, moins critique ?**
Selon une note de support, à partir de l'**année-modèle 2019**, à l'**œillet en plastique noir** de la clé d'origine. Les clés plus anciennes ont généralement à cet endroit un œillet métallique chromé.

**Quel est le danger d'une attaque par rejeu ?**
Le véhicule accepte un signal de **déverrouillage** enregistré comme un signal d'origine. Il peut ainsi être **ouvert sans laisser de trace** ; les systèmes d'alarme sur CAN-Bus sont eux aussi désarmés au passage.

---

## Articles associés

- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
