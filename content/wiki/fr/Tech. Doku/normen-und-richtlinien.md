---
title: 'Normes, directives et approbations'
sources:
  - sources/technische_zusatzinformationen_gas-pro_iii.pdf
  - sources/FAQ_WiPro-III_DE.md
  - sources/FAQ_WiPro-III-safelock_DE.md
  - sources/wipro_deutsche_bedienungsanleitung_abschrift.txt
  - sources/Funk-Handsender_868__101064__Legal__Konformitaet_2014-53-EU_DE.md
  - sources/Funk-Kabelschleife_868__100761__Legal__Konformitaet_DE.md
  - >-
    sources/safe-lock_Umruestplatine__101052__Legal__Konformitaet_2014-53-EU_DE.md
  - sources/Was ist eine Wipro.docx
updated: '2026-07-22'
confidence: high
lang: fr
translation_of: sources/Tech. Doku/normen-und-richtlinien.md
---


# Normes, directives et approbations

Page de collecte centrale pour les **références formelles aux normes et lignes directrices** dans l'inventaire des sources locales.

> **Important :** Cette page ne documente que ce qui est explicitement documenté dans les sources locales. Il ne comble pas les nombres standard manquants par conjecture.

---

## Limite des preuves

Les huit fichiers du frontmatter sont absents du fonds local actuel. Les articles validés, la déclaration et le marquage du produit concret font foi. Cette page n’est ni un conseil juridique ni une interprétation complète des normes.

---

## Aperçu rapide

| Référence | Tapez | Éprouvé pour | Avantages du wiki |
|----------|-----|------------|-------------|
| `2014/53/EU` | Directive européenne (RED) | plusieurs produits radio | Base des déclarations radio/conformité et des références DoC |
| `ECE R10` | Homologation véhicule/CEM | WiPro III safe.lock | Classification pour une utilisation dans l'environnement du véhicule |
| `DIN EN 50194-1` | Norme de produit | G.A.S.-pro III | Référence au seuil d'avertissement DIP 5 selon informations techniques complémentaires |
| `DIN EN 50194-2` | Norme de produit | G.A.S.-pro III | Référence au seuil d'avertissement DIP 5 selon informations techniques complémentaires |
| `EMV-geprüft` | note d'essai technique | WiPro III | Référence à la compatibilité électromagnétique avec les systèmes du véhicule |

---

## Directive 2014/53/UE

Les sources font référence à plusieurs reprises à la **Directive 2014/53/UE** comme base de conformité des produits radio.

### Directement documenté dans l'inventaire local pour

- WiPro III safe.lock
- Émetteur radio 868
- Boucle de câble radio 868
- carte de conversion safe.lock

### Signification pratique dans le wiki

- Les pages de produits peuvent faire référence à la **Déclaration de conformité** existante.
- La DoC détaillée est régulièrement fournie dans les sources via la **zone support/téléchargement** de THITRONIK.
- La directive est une **référence de conformité**, pas un manuel d'utilisation ni une approbation d'installation pour chaque cas de véhicule.

---

## Règlement ECE R10

Dans la FAQ, WiPro III ou WiPro III safe.lock est décrit comme approuvé selon le **règlement ECE R10**.

### Einordnung

- Référence à l'utilisation du véhicule ou à la compatibilité électromagnétique dans l'environnement du véhicule
- pertinent pour la classification technique en tant que solution de rénovation ou de véhicule liée au constructeur OEM

### Règle éditoriale

- `ECE R10` est une **approbation et déclaration CEM**, pas avec la directive radio `2014/53/EU` mélanger
- Les pages de produits peuvent utiliser la déclaration, mais doivent créer un lien vers cette documentation technique pour des preuves plus approfondies.

---

## DIN EN 50194-1 / DIN EN 50194-2

Dans les informations techniques complémentaires pour G.A.S.-pro III `DIP 5 = ON` lié à un avertissement selon **DIN EN 50194-1** et **DIN EN 50194-2**.

### Dérivable de manière fiable dans le Wiki

- La source mentionne explicitement ces normes à propos d'un **seuil d'alerte accru**.
- L'instruction appartient au contexte de la **logique du commutateur DIP** du G.A.S.-pro III.
- Le site [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]] peut se référer à ces références normatives sans répéter les textes normatifs eux-mêmes.

### Ne pas compléter artificiellement

- L'inventaire local **ne fournit pas de commentaire standard complet**.
- Par conséquent, **aucune** interprétation supplémentaire du champ d’application de la norme n’est ajoutée ici.

---

## Testé CEM

`Was ist eine Wipro.docx` décrit WiPro III comme **Testé CEM** et un sous-ensemble électronique qui n'est pas destiné à interférer avec d'autres systèmes du véhicule.

### Einordnung

- `EMV-geprüft` est une **note de test technique** dans l'inventaire local
- il complète la description du produit et de l'agrément
- il **ne remplace pas** la déclaration de conformité spécifique au produit ou l'homologation du véhicule

---

## Référence produit en un coup d'œil

| Produit/Famille | Références formelles dans l'inventaire local |
|-------------------|----------------------------------------|
| WiPro III | `ECE R10`, technical EMC statement |\n| WiPro III safe.lock | `2014/53/EU`, `ECE R10`, technical EMC statement |
| Émetteur radio 868 | `2014/53/EU` |
| Boucle de câble radio 868 | `2014/53/EU` |
| carte de conversion safe.lock | `2014/53/EU` |
| G.A.S.-pro III | `DIN EN 50194-1`, `DIN EN 50194-2` |

---

## Règles rédactionnelles et de sécurité

Séparer directive, norme, homologation ECE, référence CE/DoC et mention CEM. Toujours nommer produit, variante, révision et source. Ne déduire aucune conformité ni autorisation de la similitude.

---

## Contrôle qualité et validation

Vérifier huit chemins inchangés, attribution de `2014/53/EU`, `ECE R10`, `DIN EN 50194-1`, `DIN EN 50194-2` et CEM, négations, liens, titre/H1, métadonnées et UTF-8.

---

## Querverweise

- [[Documentation technique — vue d'ensemble]]
- [[Normes radio et interfaces — limites techniques]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]]



