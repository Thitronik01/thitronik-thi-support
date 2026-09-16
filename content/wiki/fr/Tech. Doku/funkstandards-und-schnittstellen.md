---
title: Normes radio et interfaces — limites techniques
sources:
  - sources/nfc_modul-kurzanleitung.pdf
  - sources/thitronik_zugang_nur_zugang_v2.pdf
  - sources/BT-connect__Reference__Technische_Daten_DE.md
  - sources/Vernetzungsmodul_101290__Reference__Technische_Daten_DE.md
  - sources/wipro_deutsche_bedienungsanleitung_abschrift.txt
  - sources/wipro_iii-installationsanleitung_1.8.pdf
updated: '2026-07-22'
confidence: high
lang: fr
translation_of: sources/Tech. Doku/funkstandards-und-schnittstellen.md
---

# Normes radio et interfaces — limites techniques

Cette référence distingue normes radio, fréquences, connecteurs et bus véhicule. Ce n’est pas un guide de montage et un terme commun ne prouve aucune compatibilité.

---

## Objectif et limite des preuves

Les six sources du frontmatter sont absentes localement. Les articles de base validés font foi ; produit, génération, logiciel, véhicule et fonction doivent être évalués ensemble.

---

## Vue d’ensemble

| Term | Class | Documented for | Meaning |
|---|---|---|---|
| `ISO 14443-A` | NFC standard | NFC module and media | near-field protocol |
| `DESFire® EV2` | chip platform | THITRONIK® original tags | documented copy protection |
| `13.56 MHz` | frequency | medium ↔ NFC module | near field |
| `868.35 MHz` | frequency | WiPro and accessories | alarm radio layer |
| `433 MHz` | legacy frequency | older systems only | not interchangeable |
| Bluetooth Low Energy | radio protocol | BT-connect/networking module | local app access |
| `RJ10` / `RJ11` | wired connectors | module links | product-specific pinout |
| `CAN-Bus` | vehicle bus | vehicle integration | vehicle-specific evaluation |

---

## Canaux et limites du système

| Channel | Layer | Do not confuse with |
|---|---|---|
| NFC | medium ↔ module | 868 MHz |
| 868 MHz | accessory ↔ alarm centre | Bluetooth/GSM |
| Bluetooth | phone/watch ↔ module | Pro-Finder remote control |
| GSM/SMS/GPS | Pro-Finder remote channel | Bluetooth |
| CAN-Bus | vehicle ↔ WiPro | radio or power supply |

---

## NFC : ISO 14443-A et DESFire EV2

Le module NFC communique à `13,56 MHz` selon `ISO 14443-A`. Les tags originaux utilisent `DESFire® EV2` avec protection documentée ; un tag tiers ne l’offre pas automatiquement. Le module transmet séparément à `868,35 MHz`.

---

## 868,35 MHz

`868,35 MHz` est une fréquence, pas un numéro de norme ni une promesse de compatibilité. Les systèmes `868,35 MHz` et anciens `433 MHz` ne sont pas interchangeables. La portée dépend du montage et des perturbations.

---

## Bluetooth Low Energy

Bluetooth Low Energy est un canal local, distinct de la radio 868 MHz et du GSM/SMS/GPS. Un appairage réussi ne prouve pas la liaison d’alarme.

---

## RJ10 et RJ11

BT-connect possède deux prises `RJ10` équivalentes ; WiPro III indique `RJ11` pour Pro-Finder. Une forme proche n’autorise aucun échange libre.

---

## CAN-Bus

Le `CAN-Bus` est le bus véhicule. Profil, DIP, CAN-H/CAN-L et point de connexion sont propres au véhicule. Ne pas ajouter de numéro ISO non prouvé ni déduire le câblage d’une liste générique.

---

## Règles de sécurité et de réponse

Séparer fréquence, protocole, connecteur et fonction. Ne promettre ni portée ni interopérabilité sans preuve. Ne pas désactiver Replay/Anti-Jamming par défaut. CAN et réseau de bord exigent un professionnel.

---

## QA et renvois

Verify six unchanged source paths, eight overview entries, all required values and negations, 10 H2, two tables, five local wiki links, title/H1, metadata, UTF-8 and placeholders.

- [[Documentation technique — vue d'ensemble]]
- [[Normes, directives et approbations]]
- [[Module NFC — commande de la WiPro via NFC]]
- [[BT-connect — Module Bluetooth pour WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
