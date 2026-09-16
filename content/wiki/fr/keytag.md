---
title: KeyTag - support d acces NFC
sources:
  - https://www.thitronik.de/produkte/produkt/keytag/
  - https://www.thitronik.de/produkte/produkt/nfc-modul/
  - sources/nfc_modul-kurzanleitung.pdf
  - wiki/nfc-modul.md
  - wiki/zugang-bedienung.md
updated: 2026-07-07
confidence: high
dealerStatus: approved
lang: fr
translation_of: wiki/de/keytag.md
---

# KeyTag - support d acces NFC

KeyTag est un support d acces NFC pour le THITRONIK NFC Modul. Il sert de transpondeur a courte distance pour armer/desarmer et, avec safe.lock adapte, verrouiller/deverrouiller.

## Compatibilite

- Un [[NFC Modul]] monte et appaire est necessaire.
- Les systemes compatibles suivent le NFC Modul: WiPro III, WiPro III safe.lock, WiPro easy et C.A.S. III.
- Le verrouillage central ne peut etre commande qu avec WiPro III safe.lock et une connexion vehicule adaptee.
- Jusqu a 14 supports NFC peuvent etre memorises par NFC Modul.

## Donnees techniques

| Parameter | Valeur |
|-----------|------|
| Article no. | 105301 |
| Compatibilité | THITRONIK NFC Modul |
| Frequency | 13,56 MHz |
| NFC range | ca. 20 mm |
| Dimensions | 45 x 30 x 4 mm |
| Poids | 4,5 g |

## Cas d utilisation

- Small tag for bag, belt or key ring.
- Robust, waterproof medium for activities without the vehicle key.
- Discreet backup alongside radio remote control or BT-connect.

## Montage / configuration

1. Mettre le NFC Modul en mode appairage.
2. Tenir le support directement sur la zone NFC marquee.
3. Attendre la confirmation du NFC Modul.
4. Tester au vehicule: armer/desarmer et, avec WiPro III safe.lock, verrouiller/deverrouiller.

## Limites et erreurs typiques

- KeyTag n est pas un emetteur autonome et fonctionne uniquement via le NFC Modul.
- Les vitrages metallises, chauffants ou epais peuvent reduire la portee NFC.
- Des tags tiers peuvent etre copiables selon le type; utiliser les supports originaux THITRONIK pour la securite.
- Si le vehicule est verrouille avec la cle d origine, la logique safe.lock peut limiter l acces ulterieur par accessoires THITRONIK.

## FAQ

**KeyTag peut-il commander WiPro directement?**
Non. Le NFC Modul evalue le support puis envoie la commande a WiPro via 868,35 MHz.

**Peut-il commander le verrouillage central?**
Oui, mais seulement avec WiPro III safe.lock et une connexion vehicule adaptee.

**Quel est le principal controle support?**
Verifier d abord si le NFC Modul est correctement appaire et si le support est reconnu de facon fiable au point de montage.

## References article

| Art.-Nr. | Variant |
|---------|---------|
| 105301 | KeyTag |

## Note de source

Les donnees techniques et portees proviennent des pages produit THITRONIK officielles et de la documentation locale NFC Modul.

## Liens associes

- [[NFC Modul]]
- [[Zugangsmedien & Bedienung]]
- [[WiPro III]]
- [[KeyCard]]
- [[KeyTag]]
- [[KeyStrap]]
