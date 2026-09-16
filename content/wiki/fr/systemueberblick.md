---
title: Vue d’ensemble du système — gamme de produits THITRONIK
sources:
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/handbuch_gas-pro_2.5.pdf
  - sources/GAS-pro-III__QuickGuide__Overview_DE.md
  - sources/pro-finder_-_bedienungs-_und_montageanleitung_2.6_01.pdf
  - sources/pro_finder-kurzanleitung-international_sn-045.pdf
  - sources/BT-connect__Overview_DE.md
  - sources/nfc_modul-kurzanleitung.pdf
  - sources/thitronik_zugang_nur_zugang_v2.pdf
updated: '2026-07-13'
confidence: high
lang: fr
translation_of: sources/systemueberblick.md
---

# Vue d’ensemble du système — gamme de produits THITRONIK

THITRONIK développe des solutions de sécurité et d’accès pour les véhicules de loisirs et les yachts. Les différentes familles de produits peuvent être combinées au sein d’un système global, mais elles se distinguent par leur capacité à fonctionner de manière autonome ou par la nécessité d’utiliser une centrale WiPro III.

## Composants du système et dépendances

| Composant | Fonction | Fonctionnement autonome | Nécessite ou complète |
|-----------|----------|:-----------------------:|-----------------------|
| **WiPro III / WiPro III safe.lock** | centrale d’alarme et traitement central des signaux | oui | base pour les accessoires radio et plusieurs modules d’extension |
| **Pro-Finder** | transmission des alarmes, localisation et commande à distance via le réseau mobile | oui | ajoute à une WiPro III des fonctions de transmission et de localisation |
| **BT-connect** | commande locale par Bluetooth avec l’application THITRONIK® | non | WiPro III ou WiPro III safe.lock ; un Pro-Finder peut également être raccordé |
| **Module NFC** | commande avec KeyCard, KeyTag ou KeyStrap | non | centrale d’alarme compatible ; communication radio avec la centrale à 868 MHz |
| **G.A.S.-connect** | détection de gaz par radio sans sirène intégrée | non | WiPro III ou WiPro III safe.lock |
| **G.A.S.-pro III** | détection de gaz ou de CO avec sirène intégrée | oui | connexion radio optionnelle à WiPro III |
| **G.A.S. / G.A.S.-plug** | détection de gaz autonome | oui | aucune connexion à WiPro |
| **Accessoires radio** | surveillance, commande et détecteurs supplémentaires | non | doivent être mémorisés dans une centrale d’alarme compatible |

---

## Centrale d’alarme — WiPro III / WiPro III safe.lock

La **centrale WiPro III** reçoit les signaux des accessoires radio à 868 MHz, analyse les signaux du CAN-Bus ou de l’éclairage intérieur selon le véhicule et pilote les alarmes sonores et visuelles.

- Tension d’alimentation : 9–30 V CC
- Consommation au repos : env. 11 mA
- Fréquence de réception : 868,35 MHz
- Nombre maximal d’émetteurs mémorisables : 100
- Interfaces : CAN-Bus et RJ11 pour Pro-Finder
- Durée d’alarme habituelle : env. 30 secondes pour l’alarme sonore et env. 180 secondes pour les feux de détresse

**WiPro III safe.lock** complète les fonctions d’alarme par une commande sécurisée de la clé et du verrouillage centralisé pour les véhicules pris en charge.

→ Détails : [[WiPro III — système d'alarme radio pour véhicules de loisirs]]

---

## Systèmes de détection de gaz

| Produit | Gaz détectés | Mode de fonctionnement / connexion |
|---------|--------------|------------------------------------|
| **G.A.S.-pro III** | propane, butane et gaz KO/narcotiques | autonome avec sirène intégrée ; connexion radio 868 MHz optionnelle à WiPro III |
| **G.A.S.-pro III CO** | monoxyde de carbone (CO) | autonome avec sirène intégrée ; connexion radio 868 MHz optionnelle à WiPro III |
| **G.A.S.-pro** | propane, butane et gaz KO/narcotiques ; CO selon les capteurs installés | ancienne gamme filaire |
| **G.A.S.** (réf. 105700) | propane, butane et gaz KO/narcotiques | autonome avec sirène intégrée |
| **G.A.S.-connect** (réf. 105750) | propane, butane et gaz KO/narcotiques | accessoire radio 868 MHz pour WiPro III ; sans sirène intégrée |
| **G.A.S.-plug** (réf. 100042) | propane, butane et gaz KO/narcotiques | appareil mobile autonome pour une prise de véhicule alimentée en permanence |

> **Important :** CO désigne le monoxyde de carbone et non le CO₂. La version standard de G.A.S.-pro III et la version CO sont deux appareils distincts.

→ Détails : [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]], [[G.A.S.-pro (anciennes séries) — Alarme gaz et CO]], [[G.A.S. — Détecteur de gaz autonome avec sirène interne]], [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]], [[G.A.S.-plug « tout en un » — détecteur de gaz mobile]]

---

## Télémétrie et commande à distance — Pro-Finder

Pro-Finder est un module de communication mobile et de localisation. Il peut fonctionner de manière autonome ou être raccordé à une WiPro III.

- Transmission des alarmes par SMS à dix numéros destinataires au maximum
- Localisation GPS et Geofencing
- Commande à distance d’une WiPro III raccordée par SMS ou appel
- Commande de sorties externes
- Fonction « Kill » avec un dispositif d’arrêt installé dans les règles de l’art
- Exigences différentes pour la carte SIM et le réseau mobile avant et à partir du numéro de série 045

**Règles de base pour la carte SIM :**

- avant SN 045 : Micro-SIM, code PIN 0000 et demande de code PIN activée
- à partir de SN 045 : Nano-SIM et demande de code PIN désactivée
- désactiver la messagerie vocale et les renvois d’appel

→ Détails : [[Pro-Finder — Module de télémétrie GSM/GPS]], [[Communications mobiles et cartes SIM — Pro-Finder, paramètres de l'application et du smartphone]], [[Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »]]

---

## Connectivité locale

| Produit | Fonction | Distinction importante |
|---------|----------|------------------------|
| **BT-connect** | commande par Bluetooth avec l’application THITRONIK® | aucune commande par BT-connect sans connexion Bluetooth active |
| **Module NFC** | commande avec KeyCard, KeyTag ou KeyStrap | la NFC identifie localement le support d’accès ; le module transmet ensuite le signal à la centrale d’alarme |
| **Module Bluetooth de mise en réseau** | prédécesseur de BT-connect | produit existant avec ses propres exigences de compatibilité et de logiciel |

→ Détails : [[BT-connect — Module Bluetooth pour WiPro III]], [[module NFC — Contrôlez le WiPro via NFC]], [[Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth]]

---

## Accès et commande

| Mode d’accès | Catégorie | Utilisation habituelle |
|--------------|-----------|------------------------|
| Clé d’origine du véhicule | commande côté véhicule par les signaux CAN-Bus ou de verrouillage centralisé pris en charge | utilisation quotidienne sur les véhicules compatibles |
| CampLock Fingerprint | accès biométrique à la porte | portes de cellule Hartal avec verrouillage centralisé pris en charge |
| Télécommande radio 868 | télécommande indépendante à 868 MHz | solution de secours, utilisateurs supplémentaires et alarme panique |
| Module NFC avec KeyCard, KeyTag ou KeyStrap | accès NFC local | commande directement sur le véhicule |
| BT-connect | accès Bluetooth local | commande par smartphone ou montre connectée à proximité du véhicule |
| Pro-Finder | commande à distance via le réseau mobile | interrogation à distance, commutation et localisation |

> Armer n’est pas synonyme de verrouiller, et désarmer n’est pas synonyme de déverrouiller. Selon le système et le véhicule, ces opérations peuvent être effectuées ensemble ou séparément.

→ Détails : [[Supports d'accès & utilisation — modes d'accès dans le système THITRONIK]]

---

## Accessoires radio à 868 MHz

| Produit | Réf. | Utilisation | Alimentation |
|---------|------|-------------|--------------|
| Contact magnétique radio 868, noir | 100757 | portes, fenêtres et trappes | CR2032 |
| Contact magnétique radio 868, blanc | 100758 | portes, fenêtres et trappes | CR2032 |
| Télécommande radio 868 | 101064 | armement, désarmement et alarme panique | CR2032 |
| Boucle de câble radio 868 | 100761 | protection des objets mobiles à l’extérieur du véhicule | CR2032 |
| Boucle de câble radio 868 XL | 101074 | protection des objets volumineux à l’extérieur du véhicule | CR2032 |
| Détecteur de fumée radio T.S.A., blanc / gris | 105753 / 105754 | détection précoce d’incendie | pile longue durée CR123A intégrée |
| Détecteur d’eau radio 868 | — | détection d’une infiltration d’eau | CR2032 |
| G.A.S.-connect | 105750 | détection de gaz par radio via WiPro III | 12 / 24 V CC |

La portée radio habituelle atteint 75 m en champ libre. Dans le véhicule, les surfaces métalliques et l’emplacement de montage peuvent réduire considérablement cette portée.

→ Détails : [[Contact radiomagnétique 868 — montage et fonctionnement]], [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles]], [[Émetteur radio 868 — télécommande pour WiPro III]], [[T.S.A. — Détecteur de fumée sans fil pour WiPro III]], [[Détecteur d'eau sans fil 868 — détecteur d'eau sans fil]], [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]]

---

## Sirènes et klaxons

| Produit | Réf. | Fonction |
|---------|------|----------|
| Sirène de secours 12 V | 100089 | sirène avec batterie intégrée et fonction antisabotage lorsque le mode de secours est activé |
| Sirène de secours 24 V | 105267 | version 24 V pour les plateformes de véhicule correspondantes |
| Sirène supplémentaire | 100190 | sirène externe supplémentaire sans batterie propre |
| Klaxon supplémentaire | 105339 | avertisseur supplémentaire pour les plateformes dont le klaxon d’origine n’est pas utilisable en cas d’alarme |

Une sirène et le klaxon du véhicule sont deux dispositifs d’alarme différents. Leurs raccordements diffèrent et ils ne doivent pas être confondus dans les instructions de montage.

→ Détails : [[Sirènes et klaxons — moyens d'alarme acoustiques]]

---

## Accessoires de sécurité spécifiques

| Produit | Réf. | Application |
|---------|------|-------------|
| Dispositif d’arrêt unipolaire | 101283 | arrêt du moteur avec la fonction « Kill » de Pro-Finder |
| Dispositif d’arrêt multipolaire | 105821 | arrêt du moteur spécifique au véhicule avec la fonction « Kill » de Pro-Finder |
| Carte de conversion safe.lock | 101052 | commande codée de la clé pour les modèles Ducato, Boxer, Jumper et Iveco Daily pris en charge |

> Les dispositifs d’arrêt et toute intervention sur l’installation électrique ou les clés du véhicule doivent être confiés à un atelier qualifié et réalisés conformément à la notice de montage correspondante.

→ Détails : [[Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »]], [[Carte de conversion safe.lock - sécurité de clé pour Ducato/Boxer/Jumper]]

---

## Articles associés

- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]]
- [[Supports d'accès & utilisation — modes d'accès dans le système THITRONIK]]
