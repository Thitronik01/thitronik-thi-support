---
title: Glossaire — Termes techniques du système THITRONIK
sources:
  - wiki/_index.md
  - wiki/wipro-iii.md
  - wiki/pro-finder.md
  - wiki/gas-pro-iii.md
  - wiki/fahrzeugkompatibilitaet.md
  - wiki/anlernvorgang.md
  - wiki/nfc-modul.md
  - wiki/funk-rauchmelder.md
  - wiki/sirenen-hupen.md
  - sources/37_faq.md
  - sources/Renault Traffic III.docx
  - >-
    sources/WiPro_QuickStart_DE_RAG_Pack/WiPro__QuickStart__Alarm_Ventcheck_Panikalarm_DE.md
  - sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/01_index.md
updated: '2026-07-14'
confidence: high
lang: fr
translation_of: sources/glossar.md
dealerStatus: internal_only
---


# Glossaire — Termes techniques du système THITRONIK

Répertoire des termes récurrents employés dans les notices, les FAQ et les pages du wiki. Chaque entrée renvoie vers une page contenant des informations détaillées.

> **Remarque à l'attention de la rédaction et des systèmes d'IA :** pour les graphies canoniques, les variantes et les erreurs fréquentes, consulter également [[Terminologie et graphies — termes de référence pour les utilisateurs et l’IA|Terminologie et orthographe]].

---

## Table des matières

- [Électricité et connexions du véhicule](#électricité-et-connexions-du-véhicule)
- [WiPro III — Centrale et fonctions d'alarme](#wipro-iii--centrale-et-fonctions-dalarme)
- [Mémorisation et système radio](#mémorisation-et-système-radio)
- [Détection de gaz et de fumée](#détection-de-gaz-et-de-fumée)
- [Pro-Finder — GSM/GPS et télémétrie](#pro-finder--gsmgps-et-télémétrie)
- [Bluetooth/NFC/Application](#bluetoothnfcapplication)
- [Piles et composants](#piles-et-composants)

---

## Électricité et connexions du véhicule

### Alarm OUT
Sortie de [[G.A.S. — Détecteur de gaz autonome avec sirène interne|GAS]] / [[G.A.S.-pro (anciennes séries) — Alarme gaz et CO|GAS-pro]] / [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs|GAS-pro III]] qui commute à la masse en cas d'alarme (0,10 A max. sur G.A.S.). Elle est souvent reliée au fil de déclenchement bleu de la [sirène de secours](sirenen-hupen.md#sirène-de-secours-art-100089). → [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]

### CAN-Bus (Controller Area Network)
Bus de données série permettant aux calculateurs du véhicule de communiquer, notamment pour le verrouillage centralisé, le contact et les clignotants. WiPro III y lit les signaux de la clé et commande les clignotants ou le klaxon du véhicule. Les [commutateurs DIP](#commutateurs-dip-sw1sw8) permettent de sélectionner le protocole CAN approprié. → [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]

### CAN-H / CAN-L
Les deux **fils de données torsadés** du CAN-Bus. CAN-H présente la tension de signal la plus élevée et CAN-L la plus faible. **L'inversion de CAN-H et CAN-L** est l'une des causes les plus fréquentes lorsque WiPro III ne réagit pas à la clé du véhicule. → [[Dépannage — problèmes fréquents & solutions|Dépannage]]

### Entrée IGN (Ignition)
Entrée de contact (borne 15) de [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs|GAS-pro III]] et d'autres composants. Lorsque le contact est mis, certaines alarmes sont automatiquement mises en sourdine, par exemple une alarme au gaz provoquée par les gaz d'échappement pendant la conduite.

### Borne 15 (Kl. 15, « plus après contact »)
+12 V présent **uniquement lorsque le contact est mis**. Il s'agit du raccordement principal de l'entrée IGN de G.A.S.-pro III et des fonctions WiPro III dépendantes du contact.

### Borne 30 (Kl. 30, « plus permanent »)
+12 V permanent provenant directement de la batterie du véhicule, même lorsque la clé de contact est retirée. Cette borne alimente WiPro III, Pro-Finder, la sirène de secours et les autres composants d'alarme.

### Borne 31 (Kl. 31, « masse » / GND)
Masse du véhicule (0 V). Réaliser un raccordement en étoile à un point de masse central ; ne pas chaîner les liaisons de masse à travers le véhicule.

### Connecteur OBD
**Connecteur de diagnostic embarqué** standardisé (généralement sous le tableau de bord). Sur certains véhicules, CAN-H/CAN-L et borne 15 y sont exploités (par exemple VW T6/T6.1). → [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]

### Dispositif de protection contre les surtensions
Composant de protection, par exemple le LAS 16585, qui supprime les pics de tension provenant d'une installation solaire ou de l'alternateur. Recommandé sur un Fiat Ducato équipé d'une installation solaire si Pro-Finder cesse de fonctionner sans raison apparente. → [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]

### Antidémarrage
Système antivol d'origine du véhicule. Le **[[Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »|Dispositif d'arrêt]]** THITRONIK® (réf. 101283 / 105821) le complète par une [fonction kill](#fonction-kill) commandée à distance par SMS.

---

## WiPro III — Centrale et fonctions d'alarme

### Mémoire d'alarme
Après une alarme, la **LED d'état** de WiPro III clignote selon une séquence indiquant la cause, par exemple 9 clignotements pour [Anti-Jamming](#anti-jamming). La mémoire est effacée au prochain armement. → [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]

### Anti-Jamming
Détection des **brouilleurs** qui tentent de bloquer la liaison radio entre la centrale et les accessoires radio. Si le brouillage persiste, WiPro déclenche une alarme et la LED d'état clignote 9 fois. En cas de fausses alarmes répétées dans un environnement radio perturbé, la fonction peut être désactivée avec **DIP 7 = ON**. → [[Dépannage — problèmes fréquents & solutions|Dépannage]]

### Commutateurs DIP (SW1–SW8)
Petits sélecteurs placés dans le couvercle du boîtier WiPro III et servant à régler le type de véhicule et les fonctions spéciales :

- **SW1–SW4** = protocole CAN-Bus / famille de véhicules
- **SW5–SW8** = fonctions spéciales, par exemple SW5 = protection contre les attaques par rejeu et SW7 = désactivation d'Anti-Jamming

→ Matrice complète : [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]

### Easy-Add (1.0 / 2.0 / 3.0)
Procédures de mémorisation d'accessoires radio tels que les contacts magnétiques, télécommandes, boucles de câble et détecteurs de fumée :

- **Easy-Add 1.0** — après une coupure d'alimentation, appuyer **5 fois** en moins de 30 secondes sur la touche « haut-parleur » d'une télécommande déjà mémorisée.
- **Easy-Add 2.0** — avec une connexion CAN compatible, ouvrir et fermer la porte conducteur **5 fois** en moins de 30 secondes après une coupure d'alimentation.
- **Easy-Add 3.0** — lancer le mode de mémorisation depuis l'application THITRONIK® ; nécessite Pro-Finder ou un module Bluetooth compatible ainsi que la version logicielle appropriée.

→ Détaillé : [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]

### Alarme panique
Alarme déclenchée volontairement en **appuyant simultanément sur les deux touches** de la [[Émetteur radio 868 — télécommande pour WiPro III|Télécommande sans fil]]. Elle active la sirène et les clignotants. Appuyer sur l'une des touches de la télécommande pour l'arrêter. → [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]

### Protection contre la relecture
Empêche la réémission d'un signal enregistré de la clé du véhicule afin de désarmer WiPro. Activation avec **DIP 5 = ON**. La clé d'origine ne commande alors plus WiPro ; utiliser la [[Émetteur radio 868 — télécommande pour WiPro III|Télécommande sans fil]], [[BT-connect — Module Bluetooth pour WiPro III|BT-connect]] ou [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]. → [[Dépannage — problèmes fréquents & solutions|Dépannage]]

### safe.lock
Variante WiPro offrant une **sécurité de clé** supplémentaire. Elle empêche qu'un signal non sécurisé ou enregistré de la clé d'origine ouvre le véhicule tout en désarmant l'alarme. Selon le véhicule, le verrouillage centralisé est commandé par une solution safe.lock appropriée ou par une carte de conversion. → [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]] · [[Carte de conversion safe.lock - sécurité de clé pour Ducato/Boxer/Jumper|carte de conversion safe.lock]]

### Mode camping
Mode de fonctionnement de certains véhicules safe.lock dans lequel la clé d'origine peut rester à bord et les accessoires THITRONIK servent à commander le système. Important : la logique de déverrouillage dépend du moyen d'accès utilisé lors du dernier verrouillage. → [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]] · [[Supports d'accès & utilisation — modes d'accès dans le système THITRONIK|Accès aux médias et fonctionnement]]

### Alarme silencieuse (constat de vol)
Alarme **sans** sirène ni clignotants : seule une notification SMS est envoyée par Pro-Finder. Elle se déclenche lorsque le véhicule s'éloigne de **plus de 1 km** de son point d'origine ([Geofencing](#geofencing)). La commande SMS `alarm` permet d'activer ensuite la sirène et les clignotants. → [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]

### Sleep Mode
État d'économie d'énergie ou de veille de certains calculateurs du véhicule. Sur certains véhicules, il peut empêcher safe.lock de commander ultérieurement le verrouillage centralisé. Respecter les essais de temporisation propres au véhicule avant l'installation. → [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]

### Vent-check (« Contact ouvert » / fonction ventilation)
Fonction d'avertissement lors de l'armement si un contact magnétique, par exemple sur une fenêtre ou un lanterneau, a été **volontairement laissé ouvert** pour aérer. Une série de bips le signale lorsque le contact est mis. Pour aérer, ouvrir la fenêtre **avant d'armer**. → [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]

---

## Mémorisation et système radio

### 433 MHz (obsolète)
Fréquence des **anciens** accessoires radio THITRONIK®. Ils ne sont plus commercialisés depuis plusieurs années et aucune pièce de rechange n'est disponible. Les systèmes actuels utilisent [868 MHz](#868-mhz).

### 868 MHz
Fréquence radio des accessoires THITRONIK® actuels : télécommande, contact magnétique, boucle de câble, détecteur de fumée, détecteur d'eau et module NFC. Utilisation autorisée sans licence dans toute l'Europe. Portée maximale approximative : 75 m.

### Mode de mémorisation
État de WiPro dans lequel de nouveaux composants radio peuvent être enregistrés. Pour le lancer, maintenir la touche « B » de la carte enfoncée jusqu'au bip long. La mémoire accepte au maximum **100 émetteurs**. → [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]

### Effacer la mémoire
Réinitialisation complète de la mémoire radio avec suppression de tous les composants mémorisés. Tous les composants doivent ensuite être **mémorisés de nouveau**. → [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]

---

## Détection de gaz et de fumée

### CO (monoxyde de carbone)
**Gaz de combustion toxique**, incolore et inodore. Le [[capteur CO — Capteur de monoxyde de carbone auxiliaire|capteur CO]] séparé sert de capteur supplémentaire pour [[G.A.S.-pro (anciennes séries) — Alarme gaz et CO|GAS-pro]] et [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs|GAS-pro III]].

### Gaz KO / gaz anesthésiques
Produits chimiques liquides, par exemple chloroforme, éther ou solvants industriels, susceptibles d'être introduits à travers les joints lors d'une **attaque au gaz** et de s'évaporer dans l'habitacle pour former un mélange narcotique. Ils sont détectés par [[G.A.S. — Détecteur de gaz autonome avec sirène interne|GAS]], [[G.A.S.-pro (anciennes séries) — Alarme gaz et CO|GAS-pro]], [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs|GAS-pro III]], [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III|GAS-connect]] et [[G.A.S.-plug « tout en un » — détecteur de gaz mobile|GAS-plug]]. → [[G.A.S. — Détecteur de gaz autonome avec sirène interne|GAS]]

### Propane / butane
Gaz de pétrole liquéfiés (GPL), plus lourds que l'air. Le gaz qui s'échappe s'accumule au niveau du plancher du véhicule ; installer le détecteur **10–30 cm au-dessus du sol**. → [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs|GAS-pro III]]

### Principe de la lumière diffusée (photoélectrique)
Principe de mesure du [[T.S.A. — Détecteur de fumée sans fil pour WiPro III|détecteur de fumée radio]] T.S.A. : au repos, le faisceau lumineux n'atteint pas la photodiode. Les particules de fumée diffusent la lumière vers la diode, ce qui déclenche l'alarme. Ce principe est particulièrement sensible aux **feux couvants** produisant une fumée froide.

### LIE (Limite inférieure d'explosivité)
Concentration de gaz la plus faible dans l'air à laquelle un mélange inflammable peut se former. La gamme [[G.A.S. — Détecteur de gaz autonome avec sirène interne|GAS]] déclenche une alarme à **5 % de la LIE du butane**, soit bien avant d'atteindre le seuil d'explosion.

### Ventcheck
→ voir [Vent-check](#vent-check--contact-ouvert---fonction-ventilation) dans la section WiPro III.

---

## Pro-Finder — GSM/GPS et télémétrie

### 2G/3G/4G LTE
Générations de réseaux mobiles. Les Pro-Finder **antérieurs à SN045** utilisent la 2G/3G ; les appareils **à partir de SN045** prennent également en charge la 4G LTE. La disponibilité de la 2G et de la 3G varie selon le pays et l'opérateur et continue d'évoluer. Avant un voyage ou un changement de carte SIM, vérifier la couverture actuelle auprès de l'opérateur. → [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]] · [[Communications mobiles et cartes SIM — Pro-Finder, paramètres de l'application et du smartphone|Téléphonie mobile et cartes SIM]]

### Geofencing
« Clôture virtuelle » fondée sur le GPS autour du véhicule. Si celui-ci s'éloigne de **plus d'environ 1 km** de sa position d'origine, Pro-Finder envoie une [alarme silencieuse](#alarme-silencieuse-constat-de-vol). La fonction est **activée automatiquement** lorsque WiPro est armé. La désactiver avec la commande SMS `fence aus` avant de stationner dans un bâtiment, car les réflexions GPS peuvent provoquer une fausse alarme. → [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]

### GNSS (Système mondial de navigation par satellite)
Terme générique désignant tous les systèmes de navigation par satellite (GPS, GLONASS, Galileo, QZSS). Pro-Finder prend en charge **GPS + QZSS** à partir de SN045.

### GSM
Global System for Mobile Communications : réseau mobile 2G classique utilisé pour les SMS et la téléphonie. Il constitue la base de toutes les fonctions SMS de Pro-Finder.

### Fonction kill
**Arrêt du moteur** commandé à distance par le SMS `kill`. Nécessite le [[Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »|Dispositif d'arrêt]] (réf. 101283 unipolaire / 105821 multipolaire) raccordé à la sortie A de Pro-Finder. Le moteur n'est arrêté que lorsque la vitesse GPS reste égale à 0 km/h pendant au moins 5 secondes. → [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]

### Numéro maître
**Premier numéro de téléphone** enregistré dans Pro-Finder. Il peut programmer de nouveaux numéros sans accès physique à l'appareil. En cas d'alarme intrusion, gaz, panique ou vol, ce numéro est **également appelé** ; l'appel peut être facturé, même si Pro-Finder raccroche immédiatement. → [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]

### Micro-SIM/Nano-SIM
Formats de carte SIM. **Avant SN045** : Micro-SIM ; **à partir de SN045** : **Nano-SIM**. Vérifier le numéro de série au préalable, car un format incorrect ne peut pas être inséré. → [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]

### Carte prépayée / avec abonnement
Pro-Finder accepte les deux types de carte SIM et peut **interroger le crédit** d'une carte prépayée avec le code `100#` ou `101#` dans le SMS de programmation. La carte prépayée doit pouvoir être rechargée **sans être retirée de l'appareil**.

### QZSS
Le **Quasi-Zenith Satellite System** est un système régional japonais qui améliore la couverture GPS en Asie. Il constitue uniquement un complément ; le GPS reste la source principale dans le monde.

### Fonctions RCS/Chat
Rich Communication Services : successeur moderne du SMS sur Android. Pro-Finder ne traite pas les messages RCS. Il faut donc **désactiver RCS/Chat** dans l'application de messagerie, sinon les SMS de programmation ne parviennent pas à l'appareil. → [[Dépannage — problèmes fréquents & solutions|Dépannage]]

### Itinérance
Utilisation d'un réseau mobile étranger. L'itinérance doit être explicitement **activée** auprès de l'opérateur de la carte SIM, sinon Pro-Finder n'envoie aucun SMS à l'étranger.

### Code PIN de la carte SIM
**Jusqu'au SN 0699-044 :** régler le code PIN sur **0000** et laisser la demande de code PIN activée.
**À partir du SN 0699-045 :** **désactiver complètement la demande de code PIN.**
→ [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]

### Numéro de smartphone
Numéro de téléphone marqué de l'identifiant **« S »** dans la mémoire de Pro-Finder. Il reçoit la position GPS sous forme de **lien Google Maps cliquable** plutôt que de coordonnées textuelles. → [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]

### Rapport de situation
SMS ou message vocal automatique ou demandé indiquant : état de WiPro, état du Geofencing, position GPS, vitesse, sorties A/B, tensions U1–U5, température de l'appareil (à partir de SN045) et crédit prépayé. → [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]

---

## Bluetooth/NFC/Application

### BT-connect
**Module Bluetooth** actuel permettant de commander WiPro III depuis l'application. Il remplace le [[Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth|Module réseau]] depuis septembre 2025. → [[BT-connect — Module Bluetooth pour WiPro III|BT-connect]]

### KeyCard / KeyStrap / KeyTag
Transpondeurs NFC (ISO 14443-A, MIFARE DESFire EV2) permettant d'armer et de désarmer WiPro au moyen du [[module NFC — Contrôlez le WiPro via NFC|module NFC]] :

- **KeyCard** — format carte de crédit
- **KeyStrap** — bracelet étanche utilisable à travers une vitre simple jusqu'à 15 mm
- **KeyTag** — petit porte-clés étanche

### MIFARE DESFire EV2
Famille de puces NFC chiffrées utilisée par les [supports d'accès THITRONIK® d'origine](#keycard--keystrap--keytag). Contrairement aux tags NFC simples, ils sont protégés contre la copie.

### Bague collectrice
Composant électrique qui transmet **des signaux ou de l'énergie électrique entre des pièces fixes et mobiles**. Dans un véhicule, la bague collectrice se trouve généralement dans le module du volant et sert notamment au **klaxon, à l'airbag et aux commandes au volant**. Certaines installations WiPro spécifiques au véhicule y prélèvent le signal du klaxon, par exemple sur le [[Renault Master III / Opel Movano B / Nissan NV400 (à partir de 2011)|Renault Master III]].

### THITRONIK® App
Application pour smartphone Android/iOS permettant de commander et de configurer WiPro III (safe.lock), Pro-Finder (à partir de SN045) et BT-connect. Depuis SN045, l'application constitue le **principal moyen de configuration** de Pro-Finder. → [[THITRONIK® App — Commandes, configuration et FAQ|Commandes d'application]]

### Module réseau
**Ancien** module Bluetooth (réf. 101290, V1.6–V2.1), **retiré de la gamme** depuis septembre 2025. Il est remplacé par [[BT-connect — Module Bluetooth pour WiPro III|BT-connect]]. → [[Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth|Module réseau]]

---

## Piles et composants

### Alcaline LR03 (AAA)
Pile standard du [[module NFC — Contrôlez le WiPro via NFC|module NFC]] (3 piles nécessaires). **Ne pas utiliser d'accumulateurs ni de piles primaires au lithium.** Remplacer les piles chaque année, de préférence avant l'hiver.

### CR123A
Pile au lithium longue durée de 3 V du [[T.S.A. — Détecteur de fumée sans fil pour WiPro III|Détecteur de fumée sans fil]] T.S.A. Elle est **intégrée à demeure** et ne peut pas être remplacée. Durée de vie approximative de l'appareil : 10 ans.

### CR2032
Pile bouton au lithium de 3 V pour tous les émetteurs radio 868 MHz : télécommande, contact magnétique, boucle de câble, détecteur d'eau et G.A.S.-connect. Autonomie approximative : 2 ans. Marques recommandées : Panasonic ou Varta. **Duracell n'est pas recommandée**, car sa tension nominale baisse trop tôt. → [[Détecteur d'eau sans fil 868 — détecteur d'eau sans fil|Détecteur d'eau sans fil]]

### Câble RJ
Câble à connecteurs RJ, semblables à des fiches téléphoniques, reliant WiPro III à Pro-Finder. Il est fourni avec Pro-Finder.

### Déclaration de conformité
Document du fabricant sur la radio et la sécurité des produits d'un appareil. Les documents de conformité et les instructions d'élimination attribués au produit s'appliquent toujours à l'installation et à l'exploitation. → [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]] · [[Carte de conversion safe.lock - sécurité de clé pour Ducato/Boxer/Jumper|carte de conversion safe.lock]]

---

## Glossaire contextualisé des systèmes d'alarme pour camping-cars

Ce tableau rassemble les termes clés propres aux systèmes d'alarme pour camping-cars. Il sert d'aide à la traduction et à la rédaction lorsque l'usage diffère du vocabulaire général de l'automobile, de l'électronique ou de l'informatique.

| Terme | Type | Contexte dans le système THITRONIK | Distinction | Exemple |
|---|---|---|---|---|
| Mémoriser | Processus | Enregistrer un accessoire radio ou un support NFC dans la mémoire de WiPro III ou du module NFC. | Ne pas confondre avec l'appairage Bluetooth, qui utilise le mode d'appairage. | Mémoriser le contact magnétique radio, puis le tester. |
| Mode de mémorisation | Processus | État dans lequel le système accepte de nouveaux émetteurs ou moyens d'accès. | Ce n'est ni le fonctionnement normal ni un état d'alarme. | Lancer le mode de mémorisation, déclencher l'émetteur et attendre la confirmation. |
| Easy-Add | Processus | Procédure simplifiée pour mémoriser des accessoires radio supplémentaires selon la version du système et le produit. | Easy-Add reste le nom de la fonction et ne se traduit pas librement. | Utiliser Easy-Add 3.0 pour le nouvel accessoire. |
| Alarme panique | Fonction | Alarme déclenchée volontairement pour dissuader ou demander de l'aide, généralement au moyen d'une télécommande. | Ce n'est ni une alarme intrusion déclenchée par un capteur ni une alarme de défaut technique. | L'alarme panique active la sirène ou le klaxon sans ouverture d'un contact. |
| Alarm OUT | Interface | Sortie de commutation d'un détecteur de gaz ou d'un système d'alarme qui transmet un signal à d'autres composants. | Il s'agit d'une sortie électrique, et non d'une alarme sonore. | Relier Alarm OUT à la sirène de secours. |
| Vent-check | Fonction | Fonction WiPro III permettant de maintenir sous surveillance une ouverture laissée en position d'aération. | Fonction produit ; conserver cette graphie. | Utiliser Vent-check lorsqu'une fenêtre reste ouverte pour aérer. |
| safe.lock | Fonction/caractéristique du produit | Protection contre les scénarios non sécurisés liés à la télécommande d'origine et au verrouillage centralisé du véhicule. | Nom de marque et de fonction avec un point ; ne pas le traduire comme une serrure de porte générique. | Utiliser WiPro III safe.lock en mode camping. |
| Pro-Finder | Produit | Module GSM/GPS pour les alertes par SMS, la localisation, le Geofencing et les fonctions à distance. | Le nom du produit reste inchangé. | Pro-Finder envoie la position sous forme de lien Google Maps. |
| Fonction kill | Fonction | Coupure du moteur ou du démarrage commandée à distance par Pro-Finder et le dispositif d'arrêt. | Ne pas la présenter comme un endommagement du moteur ; il s'agit d'un arrêt ou d'un blocage contrôlé. | Déclencher la fonction kill par SMS. |
| Geofencing | Fonction | Zone virtuelle autour du véhicule ; sa sortie peut déclencher une notification. | Ne pas confondre avec le suivi GPS : le suivi interroge une position, tandis que le Geofencing surveille une zone. | Activer le Geofencing après avoir stationné le véhicule. |
| CAN-Bus | Technologie automobile | Bus de données du véhicule sur lequel WiPro III peut lire le contact, le verrouillage ou les clignotants. | Ne pas le décrire comme une alimentation électrique. | Raccorder correctement CAN-H et CAN-L. |
| Borne 15 | Technologie automobile | Plus après contact présent uniquement lorsque le contact est mis. | Ne pas confondre avec le plus permanent de la borne 30. | Raccorder l'entrée IGN à la borne 15. |
| Borne 30 | Technologie automobile | Plus permanent provenant du réseau de bord ou de la batterie. | Ne dépend pas du contact et reste actif sans clé. | Alimenter WiPro III en permanence par la borne 30. |
| Borne 31 | Technologie automobile | Masse du véhicule/GND servant de conducteur de retour électrique. | Ne pas la chaîner arbitrairement comme un fil négatif ; utiliser des points de masse propres. | Relier la masse en étoile à la borne 31. |
| Contact magnétique radio | Capteur | Capteur 868 MHz destiné aux portes, fenêtres, trappes et lanterneaux. | Ce n'est pas un simple contact Reed, mais un accessoire radio comportant un émetteur. | Poser le contact magnétique radio sur la porte du compartiment de rangement. |
| Boucle de câble radio | Capteur/accessoire | Protection extérieure 868 MHz pour des objets mobiles tels que les vélos ou le mobilier de camping. | Ce n'est ni un câble de charge ni un câble de données. | Passer la boucle dans le cadre et la roue du vélo. |
| Sirène de secours | Dispositif d'alarme | Sirène supplémentaire disposant de sa propre alimentation ou produisant un effet d'alarme distinct selon le produit. | Ne pas la confondre avec un klaxon supplémentaire ; la sirène et le klaxon du véhicule sont deux dispositifs distincts. | Commander la sirène de secours par Alarm OUT. |
| G.A.S.-pro III | Produit | Détecteur de gaz fixe pour le propane, le butane, les gaz KO/narcotiques et, selon la variante, le CO. | Conserver le nom du produit ; ne pas le remplacer par une désignation générique. | Relier G.A.S.-pro III à WiPro III. |
| Capteur CO | Capteur | Capteur de monoxyde de carbone destiné à G.A.S.-pro ou G.A.S.-pro III. | CO signifie monoxyde de carbone, et non dioxyde de carbone/CO2. | Installer le capteur CO à la hauteur appropriée. |
| Module NFC | Accès/commande | Module commandé avec une KeyCard, un KeyStrap ou un KeyTag. | Ne pas le décrire comme un module Bluetooth ou une fonction de l'application. | Désarmer WiPro avec une KeyCard et le module NFC. |

---

## Renvois

- [[Vue d’ensemble du système — gamme de produits THITRONIK|Présentation du système]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Dépannage — problèmes fréquents & solutions|Dépannage]]

