---
title: WiPro III — système d'alarme radio pour véhicules de loisirs
sources:
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/wipro_iii_safe.lock.pdf
  - sources/wipro_iii.pdf
  - sources/wipro_deutsche_bedienungsanleitung_abschrift.txt
  - sources/Was ist eine Wipro.docx
  - sources/Fragen zu WiPro III.pdf
  - sources/Fragen zu WiPro III safe.lock.pdf
  - sources/FAQ_WiPro-III_DE.md
  - >-
    sources/WiPro_QuickStart_DE_RAG_Pack/WiPro__QuickStart__Alarm_Ventcheck_Panikalarm_DE.md
  - >-
    sources/WiPro_QuickStart_DE_RAG_Pack/WiPro__QuickStart__Batterie_Zubehoer_Alarmspeicher_DE.md
  - sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/05_1_3_safe_lock_key.md
  - >-
    sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/06_1_4_safe_lock_remote.md
  - >-
    sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/18_1_10_alarm_unterbrechen_overview.md
  - >-
    sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/19_1_10_1_einbruchalarm_key.md
  - >-
    sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/22_1_10_4_gasalarm_remote.md
  - sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/35_3_2_entsorgung.md
  - sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/36_3_3_konformitaet.md
  - sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/38_snippets.md
updated: '2026-07-14'
confidence: high
lang: fr
translation_of: sources/wipro-iii.md
dealerStatus: internal_only
---


# WiPro III — système d'alarme radio pour véhicules de loisirs

WiPro III est un système d'alarme spécialement conçu pour les **véhicules de loisirs**. Il n'utilise pas de détecteurs de mouvement. Les ouvertures supplémentaires sont surveillées par des contacts magnétiques radio ; selon le véhicule, les portes d'origine peuvent être intégrées via le CAN-Bus ou l'entrée de l'éclairage intérieur. D'autres sources d'alarme peuvent être ajoutées à l'aide d'accessoires compatibles.

**Variantes :**
- **WiPro III** — version standard
- **WiPro III safe.lock** — ajoute à WiPro III une logique de verrouillage centralisé et d'accès adaptée au véhicule. Elle vise notamment à empêcher qu'un signal de déverrouillage enregistré ouvre le véhicule tout en désarmant le système d'alarme. safe.lock n'est pas un dispositif d'immobilisation.

---

## Caractéristiques techniques

### Centrale

| Paramètre | Valeur |
|-----------|------|
| Alimentation | 9–30 V CC |
| Consommation de courant (veille) | env. 11 mA |
| Sortie sirène | 9–30 V (= Uin) / max. 1 A |
| Sortie des clignotants | max. 60 W |
| Nombre max. d'émetteurs mémorisables | 100 |
| Fréquence de réception | 868,35 MHz |
| Nombre de codes | > 4 milliards |
| Température de fonctionnement | –10 °C à +80 °C |
| Interfaces | RJ11 (Pro-Finder), CAN-Bus |

### Accessoires radio (contacts magnétiques, télécommandes radio)

| Paramètre | Valeur |
|-----------|------|
| Puissance d'émission | < 10 mW |
| Portée maximale | 75 m (en champ libre) |
| Pile | CR2032 (pile bouton, 3 V) |
| Autonomie de la batterie | env. 2 ans |
| Fréquence d'émission | 868,35 MHz |
| Nombre de codes | > 4 milliards |
| Température de fonctionnement | –10 °C à +60 °C |

> **ATTENTION :** Une pile inadaptée ou mal insérée présente un risque d'explosion. Utiliser uniquement le type de pile prescrit et éliminer les piles usagées conformément à la réglementation en vigueur.

---

## Utilisation prévue et limites

- Conçu pour les **véhicules de loisirs** — il n'est pas destiné à sécuriser des bâtiments, des vélos ou des motos.
- Seules les ouvertures détectées par le véhicule via le **CAN-Bus / signal de l'éclairage intérieur** ou équipées de **contacts magnétiques radio** sont surveillées.
- Les ouvertures sans détection côté véhicule et sans contact installé ultérieurement restent **non sécurisées**.
- Le WiPro III signale les événements d'intrusion ou d'alarme, mais il n'**empêche** pas l'intrusion.

---

## Principe de fonctionnement

1. Les portes, fenêtres et trappes supplémentaires sont surveillées par des **contacts magnétiques radio 868**.
2. Selon le véhicule, les portes d'origine sont détectées via le **CAN-Bus** ou l'**entrée de l'éclairage intérieur**.
3. Selon le véhicule et l'équipement, le système est armé et désarmé à l'aide de la clé-télécommande d'origine ou d'un dispositif de commande THITRONIK®.
4. En cas d'alarme, les avertisseurs sonores raccordés, les feux de détresse et la LED d'état sont activés. La sirène et le klaxon du véhicule sont deux avertisseurs distincts.

### Séquences d'alarme

| Type d'alarme | Alarme sonore | Feux de détresse + LED d'état |
|---------------|---------------|--------------------------------|
| **Alarme anti-intrusion** | Klaxon du véhicule pendant env. **30 secondes** ; sirène en complément selon le raccordement | Clignotent pendant env. **180 secondes** |
| **Alarme gaz** | Sirène et, le cas échéant, klaxon du véhicule pendant env. **30 secondes avec des interruptions** | Clignotent pendant env. **180 secondes** |

> **REMARQUE :** La surveillance reste active après l'alarme sonore. Une alarme gaz peut se déclencher de nouveau tant que la concentration de gaz demeure dans la plage critique.

---

## Contenu de la livraison (version standard)

- Centrale WiPro III avec câble de raccordement
- 1× télécommande radio 868
- 1× contact magnétique radio 868 avec pastilles adhésives
- Porte-fusible avec fusible de 10 A
- LED d'état avec câble de connexion
- 1× autocollant d'avertissement
- Instructions d'installation et d'utilisation

> **REMARQUE :** Le contenu de la livraison varie selon les kits spécifiques au véhicule : faisceau différent et, le cas échéant, absence de télécommande radio ou de contact magnétique radio.

---

## Installation

### Conditions préalables

- **Débrancher la borne négative de la batterie du véhicule** avant toute intervention sur le circuit électrique.
- Débrancher également la borne négative de toute batterie auxiliaire.
- **Garder le code de l'autoradio à portée de main** ; des données mémorisées du véhicule peuvent être perdues lors du débranchement.
- Outils et matériel nécessaires : tournevis cruciforme, pince à sertir, voltmètre, visseuse sans fil, foret de 8 mm, jeu de clés à douille, ruban isolant, raccords bout à bout, cosse à œillet et serre-câbles.

### Étape 1 : Définir le type de véhicule

Régler les commutateurs DIP de la carte principale en fonction du type de véhicule. Ne modifier leur position que lorsque le système est hors tension ; ni le connecteur à 20 broches ni le connecteur du Pro-Finder ne doivent être branchés.
→ Tableau complet : [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]

### Montage de la centrale

- Choisir un emplacement protégé à l'intérieur du véhicule, si possible à proximité de l'électronique centrale du véhicule afin de limiter la longueur des câbles.
- Fixer solidement la centrale WiPro III à l'aide des pastilles adhésives ou des éléments de fixation prévus. Nettoyer, sécher et dégraisser au préalable la surface de collage.
- Poser les câbles sans tension et les protéger. Les pièces mobiles, les pédales, les arêtes vives et les composants chauds ne doivent pas risquer de les endommager.
- Le bouton de la centrale WiPro III doit rester accessible pour la mémorisation, le test de portée et le diagnostic.

### Étape 2 : Mémoriser les accessoires

> **IMPORTANT :** Aucun accessoire radio n'est mémorisé en usine. Le système ne peut pas évaluer les composants radio non mémorisés ; ceux-ci ne peuvent donc pas déclencher d'alarme.

1. Brancher le connecteur à 20 broches.
2. Maintenir le bouton « B » de la face avant enfoncé jusqu'à ce qu'un long signal sonore retentisse et que la LED d'état s'allume → le mode de mémorisation est actif.
3. Déclencher chaque contact magnétique radio en séparant ses deux parties jusqu'à ce que la LED « C » s'allume brièvement.
4. Appuyer sur une touche de chaque télécommande radio.
5. Allumer chaque détecteur de gaz radio ; retirer chaque boucle de câble radio de son support.
6. Après chaque mémorisation réussie, un bref signal sonore retentit et la LED d'état s'éteint brièvement.
7. Pour quitter le mode de mémorisation, appuyer brièvement sur le bouton « B » → double signal sonore, la LED d'état s'éteint.

### Étape 3 : Raccorder la centrale aux systèmes du véhicule

Les schémas de raccordement figurent dans le manuel d'installation à partir de la page 10. Les revendeurs spécialisés peuvent obtenir auprès de THITRONIK des documents de montage spécifiques au véhicule indiquant les affectations des connecteurs et l'emplacement des composants.

#### Connecteur à 20 broches — affectation des broches

| Broche | Couleur | Abrév. | Fonction | Particularités |
|--------|---------|--------|----------|---------------|
| 1 | noir | sw | Masse (borne 31) | — |
| 2 | marron | bn | Entrée d'alarme NO | Contact normalement ouvert du G.A.S.-pro. **Isoler la broche 3 (verte) lorsqu'elle n'est pas utilisée !** |
| 3 | vert | gn | Entrée d'alarme COM | — |
| 4 | rouge | rt | LED d'état + | Relier le connecteur blanc à celui de la LED d'état |
| 5 | noir | sw | LED d'état − | — |
| 6 | rouge/rose | rt/p | Smart Blinker | Commande des clignotants sans puissance ; voir les schémas spécifiques au véhicule |
| 7 | jaune | ge | Allumage (borne 15) | — |
| 8 | beige | be | Broche universelle 3 | Renault Master et modèles équivalents |
| 9 | rose | p | Signal du klaxon | Commande du klaxon sans puissance, spécifique au véhicule |
| 10 | blanc | ws | Antenne | **Ne pas raccourcir ni enrouler !** |
| 11 | rouge | rt | +12/24 V (borne 30) | Utiliser un fusible de 10 A |
| 12 | gris | gr | Clignotant gauche | — |
| 13 | gris/noir | gr/sw | Broche universelle 4 | Non utilisée → **isoler** |
| 14 | gris | gr | Clignotant droit | — |
| 15 | blanc | ws | Sirène +12 V | Relier au câble rouge de la sirène ou au câble blanc de la sirène de secours |
| 16 | blanc/noir | ws/sw | Masse de la sirène | Relier au câble noir de la sirène. Raccorder une sirène supplémentaire en parallèle à la broche 16 |
| 17 | blanc/orange | ws/or | CAN-High | **Raccordement réservé au personnel qualifié !** |
| 18 | violet/orange | vt/or | CAN-Low | — |
| 19 | bleu/noir | bl/sw | Broche universelle 2 | Entrée de l'éclairage intérieur / Ford Transit : évaluation du signal de verrouillage centralisé |
| 20 | bleu | bl | Broche universelle 1 | — |

> **Les revendeurs spécialisés** peuvent obtenir sur demande des documents de montage spécifiques au véhicule avec des informations précises sur le CAN-Bus, le Smart Blinker, le klaxon et l'évaluation du verrouillage centralisé, y compris l'affectation des connecteurs du véhicule.

### Étape 4 : Diagnostic du CAN-Bus

Après le raccordement, vérifier si WiPro reçoit des données du CAN-Bus :

1. Appuyer brièvement sur le bouton « B » → la LED d'état clignote → le mode de diagnostic est actif.
2. Actionner la clé-télécommande du véhicule **ou** allumer les feux de détresse afin de générer un trafic de données CAN.
3. **La LED d'état clignote ou vacille** → des données CAN sont reçues.
4. **Aucune réaction de la LED** → raccordement défectueux ou CAN-High et CAN-Low inversés.

> Le même mode de diagnostic sert au test de portée des accessoires radio : déclencher un émetteur mémorisé → la centrale WiPro III émet un signal sonore.

### Étape 5 : Effectuer un test d'alarme

Une fois l'installation terminée, effectuer un test d'alarme avec **chaque** émetteur mémorisé :

- **Contact magnétique radio :** armer WiPro, ouvrir le contact → la sirène retentit, les feux de détresse clignotent et, le cas échéant, le klaxon du véhicule retentit.
- **Boucle de câble radio :** armer WiPro, retirer la boucle de son support.
- **Détecteur de gaz radio :** armer WiPro, allumer le détecteur, attendre la fin de la phase de préchauffage puis le tester avec un gaz d'essai adapté conformément à sa notice. Ne pas utiliser de flamme nue et bien aérer ensuite.
- **Portes de cabine (CAN-Bus) :** armer WiPro, ouvrir une porte de l'intérieur.

> **IMPORTANT :** Pour les portes de cabine raccordées via l'**entrée de l'éclairage intérieur** et non via le CAN-Bus, un test d'alarme n'est possible **qu'au plus tôt 60 secondes après l'armement**.

---

## Fonctions spéciales

| Fonction | Paramètre |
|----------|------------|
| Réduire le volume de la sirène | DIP 8 → ON |
| Désactiver l'alarme Anti-Jamming | DIP 7 → ON (en présence de brouilleurs dans les environs) |
| Activer la protection anti-rejeu | DIP 5 → ON (à partir de SN 0823-014 / SW 5.8) — la clé-télécommande du véhicule n'arme et ne désarme plus WiPro ; l'évaluation des portes reste active |

## Fonction panique (alarme manuelle)

WiPro III prend en charge le déclenchement d'une **alarme manuelle (fonction panique)** :

- **Activer :** appuyer **simultanément** sur les deux touches de la télécommande radio.
- **Désactiver :** appuyer sur n'importe quelle touche de la télécommande radio.

Si un Pro-Finder est raccordé et configuré en conséquence, il envoie un SMS « Alarme manuelle » et appelle le numéro maître.

---

## Fonction de ventilation (Vent check)

Cette fonction permet de laisser une fenêtre ouverte dans le véhicule armé sans déclencher d'alarme :

1. Ouvrir la fenêtre souhaitée **avant d'armer** le système.
2. Armer le système → le contact ouvert est toléré et ne déclenche pas d'alarme.

**Avertissement « contact ouvert » :** Si le **contact d'allumage** est mis alors qu'un contact magnétique est ouvert, une série de **signaux sonores** retentit.

**Reprise de la surveillance :** Lorsqu'un contact laissé ouvert est refermé, WiPro le surveille de nouveau après **au moins 5 secondes**. Une nouvelle ouverture déclenche alors une alarme.

---

## Signaux d'armement/désarmement

### Avec la clé-télécommande du véhicule

| Action | Condition | Signal |
|--------|--------------|--------|
| Armer (touche « Verrouiller ») | Portes de cabine **fermées** | Feux de détresse 1×, 1 signal sonore, LED d'état clignotante |
| Désarmer (touche « Déverrouiller ») | — | Feux de détresse 2–3×, 2 signaux sonores, LED d'état éteinte |

> **IMPORTANT :** L'armement avec la clé-télécommande du véhicule n'est **possible que lorsque les portes de la cabine sont fermées** !

### Avec la télécommande radio

| Action | Signal |
|--------|--------|
| Armer (n'importe quelle touche) | Feux de détresse 1× ; selon la touche, 1 signal sonore ou mode silencieux ; LED d'état clignotante |
| Désarmer (n'importe quelle touche) | Feux de détresse 2× ; selon la touche, 2 signaux sonores ou mode silencieux ; LED d'état éteinte |

### Particularité de WiPro III safe.lock

Avec **WiPro III safe.lock**, deux opérations distinctes peuvent être couplées : le système d'alarme est armé ou désarmé, tandis que le verrouillage centralisé verrouille ou déverrouille le véhicule. La logique exacte dépend du véhicule et de la version logicielle :

- **Clé d'origine du véhicule :** sur les profils de véhicule compatibles, elle commande simultanément le système d'alarme et le verrouillage centralisé. Les portes surveillées via le CAN-Bus doivent être fermées avant l'armement.
- **Télécommande radio 868 :** elle arme safe.lock et verrouille le véhicule, ou désarme le système et déverrouille le véhicule.
- **Module NFC, THITRONIK® App et BT-connect :** ne les utiliser que si les appareils installés, les versions logicielles et le profil du véhicule prennent en charge le mode de commande concerné.
- **Protection anti-rejeu :** lorsque DIP 5 est activé, la clé-télécommande d'origine n'arme et ne désarme plus WiPro. La surveillance des portes via le CAN-Bus reste active.

Les conditions et restrictions propres au véhicule figurent sous [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]].

### Mémoire d'alarme

Après une alarme, la **LED d'état** clignote pour signaler la mémoire d'alarme. Cela indique qu'une alarme s'est produite.

**Indication sonore :** Lors du désarmement après une alarme, **un signal long et deux signaux courts** indiquent qu'une alarme a été mémorisée.

La séquence de clignotement de la LED d'état se répète après une **pause de 5 secondes** et indique la cause de l'alarme :

| Séquence de clignotement | Cause de l'alarme |
|-------------|-----------|
| **1×** | Portes de cabine (CAN-Bus) |
| **2×** | Contact magnétique radio |
| **3×** | Détecteur de gaz radio / G.A.S.-pro III / G.A.S.-pro III CO |
| **4×** | Boucle de câble radio |
| **5×** | G.A.S.-pro |
| **8×** | Alarme panique |
| **9×** | Brouilleur |
| **10×** | Pro-Finder (SMS « Alarme ») |
| **11×** | Entrée de l'éclairage intérieur |

> **CONSEIL :** Si un Pro-Finder est raccordé et configuré, la cause de l'alarme est également transmise par SMS en toutes lettres.

---

## Signal de pile faible (accessoires)

Si le ronfleur interne émet un signal sonore lors de l'utilisation d'un accessoire radio, la pile de l'émetteur qui vient d'être actionné doit être remplacée. Sur cet émetteur, la LED d'émission rouge ne s'éteint qu'après 30 secondes. L'accessoire **ne doit pas être mémorisé de nouveau** après le remplacement de la pile.

---

## Interrompre une alarme

Selon le type d'alarme, une alarme active peut être interrompue à l'aide de différents dispositifs de commande :

| Type d'alarme | Interrompre l'alarme / désarmer le système |
|---------------|---------------------------------------------|
| Alarme anti-intrusion | Appuyer sur la touche « Déverrouiller » de la clé-télécommande du véhicule ou sur n'importe quelle touche de la télécommande radio ; une commande NFC/application compatible peut également désarmer le système |
| Alarme gaz | Appuyer sur la touche « Déverrouiller » de la clé-télécommande du véhicule ou sur n'importe quelle touche de la télécommande radio ; il peut être nécessaire d'armer d'abord le système pour pouvoir interrompre l'alarme |
| Alarme panique | Appuyer sur n'importe quelle touche de la télécommande radio |

> **IMPORTANT :** Selon le véhicule, il peut être nécessaire de refermer au préalable les portes ouvertes surveillées via le CAN-Bus. L'interruption de l'alarme sonore ne dispense pas d'en rechercher la cause. Après une alarme gaz ou anti-intrusion, toujours contrôler la mémoire d'alarme, les contacts ouverts et l'état des capteurs.

---

## Accessoires / extensions

| Accessoire | Réf. | Fonction |
|---------|----------|-------|
| Contacts magnétiques radio supplémentaires (noirs) | 100757 | Trappes de rangement, lanterneaux, coffres de toit |
| Contacts magnétiques radio supplémentaires (blancs) | 100758 | Fenêtres et surfaces claires |
| Télécommande radio | 101064 | Télécommande supplémentaire |
| Boucle de câble radio | 100761 | Vélos, mobilier de camping, scooters |
| Boucle de câble radio XL | 101074 | Objets extérieurs plus grands |
| G.A.S.-pro III / G.A.S.-connect | — | Détection de gaz en réseau |
| Pro-Finder | 100699 | Alerte par SMS + localisation GPS |
| BT-connect | 106000 | Commande Bluetooth via la THITRONIK® App |
| Module NFC | 105299 | Commande avec KeyCard, KeyTag ou KeyStrap |
| Sirène de secours | 100089 | Avertisseur supplémentaire, notamment lorsque le klaxon du véhicule ne peut pas être commandé |
| Détecteur de fumée radio T.S.A. (blanc / gris) | 105753 / 105754 | Détection précoce des incendies |
| Répartiteur à diodes | 100455 | Répartition sur quatre clignotants commandés séparément sur Sprinter/Crafter |
| Adaptateur de montage (noir) | 100428 | Pour les trappes présentant un écart important |
| Adaptateur de montage (blanc) | 100729 | Pour les trappes présentant un écart important |

---

## Historique des versions WiPro III safe.lock (1050-xxx)

Principales étapes de la variante Fiat Ducato ; les séries 5298, 5458 et 5832 sont gérées séparément :

| À partir du SN | Version logicielle | Date | Modification importante |
|-------|-----------|-------|-------------------|
| 1050-001 | 6.3s | 07/2017 | Première série numérotée ; fonction de DIP 6 modifiée |
| 1050-004 | 6.7s | 09/2018 | Compatibilité avec l'application ; fonctions de verrouillage centralisé et Easy-Add 3.0 |
| 1050-006 | 6.7s | 04/2019 | Anomalie documentée du module récepteur/condensateur ; un contrôle par le service d'assistance est recommandé en cas de problème de portée |
| 1050-016 | 7.1s | 10/2021 | Prise en charge du Ducato 8 (2022) |
| 1050-025 | 7.3.0s | 03/2022 | Compatibilité Alphatronics ONE |
| 1050-038 | 7.5.0s | 01/2024 | Anomalie de portée documentée sur certaines télécommandes radio ; un contrôle par le service d'assistance est recommandé |
| 1050-042 | 7.5.2s | 06/2024 | Version minimale pour Ducato 8 avec grand système d'infodivertissement tactile |
| 1050-046 | 7.5.3s | 10/2024 | Prise en charge du Fiat Ducato restylé à partir de 2024 |
| 1050-051 | 7.5.3s | 01/2025 | Marquage d'homologation E1 de nouveau présent sur le boîtier |

> Kit Ford Transit : SN 5298-xxx ; kit Sprinter/Crafter : SN 5458-xxx ; kit Renault Master : SN 5832-xxx. Les versions correspondantes sont documentées sous [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]].

---

## Élimination et conformité

- Ne pas jeter les appareils électroniques, les accessoires radio ni les piles avec les ordures ménagères.
- Collecter séparément les piles bouton et les autres piles, puis les déposer conformément à la réglementation locale.
- THITRONIK déclare que WiPro III safe.lock satisfait aux exigences de la directive **2014/53/UE**. La déclaration de conformité du produit concerné fait foi.
- Les consignes de conformité et d'élimination fournies avec le dispositif concerné restent déterminantes.

---

## Dépannage

| Problème | Cause possible | Solution |
|---------|-----------------|--------|
| WiPro ne réagit pas à la clé-télécommande du véhicule, mais le verrouillage centralisé fonctionne | Profil de véhicule non pris en charge / position incorrecte des commutateurs DIP / CAN-High et CAN-Low inversés | Vérifier les réglages DIP et le raccordement CAN ; [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]] |
| La LED d'état clignote **11×** | L'entrée de l'éclairage intérieur transmet un signal inattendu / centrale ou faisceau incorrect pour le type de véhicule | Vérifier le signal de l'éclairage intérieur, le numéro de série, le profil du véhicule et le faisceau |
| Un contact magnétique est signalé ouvert alors qu'ils sont tous fermés | WiPro a été déconnecté de l'alimentation | Ouvrir et refermer plusieurs fois tous les contacts |
| Un contact n'est pas reçu malgré la faible distance | Contact non mémorisé / blindage métallique | Vérifier la mémorisation ; déplacer la centrale ou l'antenne |
| La trappe de la soute arrière est surveillée de manière peu fiable | Émetteur monté directement sur du métal | Utiliser l'adaptateur de montage réf. 100428 |

---

## Questions fréquemment posées (FAQ)

**De quelle homologation le WiPro III dispose-t-il ?**
La FAQ produit indique que WiPro III et WiPro III safe.lock sont homologués conformément au **règlement ECE R10**. THITRONIK déclare également que WiPro III safe.lock satisfait aux exigences de la directive sur les équipements radio **2014/53/UE**. Le marquage du dispositif concerné et sa déclaration de conformité font toujours foi.

**Pourquoi WiPro III n'utilise-t-il pas de détecteur de mouvement ?**
Dans un véhicule de loisirs, les détecteurs de mouvement peuvent notamment réagir aux rideaux qui bougent, aux vibrations, aux insectes ou aux mouvements des personnes et des animaux. THITRONIK privilégie donc la surveillance d'ouvertures définies. Il n'est pas nécessaire de désactiver partiellement le système à cause d'un détecteur volumétrique lorsque des occupants restent dans le véhicule. Cela ne permet toutefois pas de garantir qu'un système d'alarme sera totalement exempt de fausses alarmes.

**Puis-je installer WiPro III moi-même ?**
L'installation exige des connaissances suffisantes en électricité automobile, un outillage adapté et le respect des prescriptions du constructeur du véhicule. Les raccordements au CAN-Bus, au verrouillage centralisé, au klaxon et aux feux de détresse sont particulièrement spécifiques au véhicule. Un raccordement incorrect peut endommager le dispositif et le véhicule. En l'absence de qualification suffisante, l'installation doit être confiée à un atelier spécialisé et formé.

**Qu'est-ce qu'un CAN-Bus — THITRONIK intervient-il dans le CAN-Bus ?**
Le CAN-Bus relie les calculateurs électroniques au moyen d'une ligne de communication à deux fils. WiPro exploite notamment l'état des portes d'origine et les signaux de la télécommande. Pour cette surveillance, le système lit les informations de manière passive et n'émet aucun message de commande sur le CAN-Bus. Cela ne dispense pas d'un raccordement correct : des fils inversés ou mal raccordés peuvent provoquer des dysfonctionnements ou des dommages.

**Puis-je faire évoluer un WiPro III existant vers safe.lock ?**
La FAQ produit indique que toutes les centrales WiPro III peuvent faire l'objet d'une mise à niveau. Comme les kits spécifiques aux véhicules diffèrent, THITRONIK doit confirmer avant le démontage la solution safe.lock et le faisceau requis pour le véhicule. La procédure documentée comprend les étapes suivantes :

1. Faire déposer la centrale WiPro III.
2. Remplir le formulaire de mise à niveau en vigueur et l'envoyer avec la centrale WiPro III ; ne joindre aucun autre accessoire ni aucune clé du véhicule.
3. Après la mise à niveau, remonter la centrale WiPro III et raccorder les fils du verrouillage centralisé.
4. Mémoriser de nouveau les accessoires radio et effectuer des tests complets des entrées et des sorties.
5. Dans la THITRONIK® App, sélectionner le profil de numéro de série correspondant au dispositif mis à jour.

**Que faire en cas de fausses alarmes ?**
Après le désarmement, la **mémoire d'alarme** de WiPro III indique la cause de l'alarme au moyen d'un code de clignotement de la LED d'état. Ces codes figurent dans la section « Mémoire d'alarme ». Si un Pro-Finder est raccordé et configuré, la cause de l'alarme est également transmise par SMS en toutes lettres.

**Quel numéro de série dois-je saisir dans la THITRONIK® App ?**
Si les numéros de série exacts ne sont pas connus, la FAQ produit indique les valeurs de référence suivantes pour sélectionner les dispositifs dans l'application :

| Dispositif | Numéro de série standard |
|-------|-----------------------|
| WiPro III | 0823-018 |
| WiPro III safe.lock | 1050-003 |
| Pro-Finder | 0699-012 |

Pour les fonctions de « verrouillage/déverrouillage centralisé » et « Easy-Add 3.0 », la FAQ indique les versions minimales suivantes :

| Dispositif | Numéro de série minimal |
|-------|-------------------|
| WiPro III safe.lock | 1050-004 / 5298-001 / 5458-001 |
| Pro-Finder | 0699-013 |

> **IMPORTANT :** La saisie d'une valeur de référence dans l'application ne met à jour ni le matériel ni le logiciel. Une fonction ne doit être utilisée que si elle est prise en charge par le dispositif et la version logicielle réellement installés.

---

### safe.lock — Questions fréquemment posées

**Qu'est-ce que le mode camping THITRONIK® ?**
Sur certains véhicules, par exemple Mercedes Sprinter à partir de 2018, Ford Transit à partir de 2024 et Ford Transit/Tourneo Custom à partir de 2023, la clé d'origine peut être rangée en lieu sûr tandis que le véhicule est verrouillé et déverrouillé avec des **accessoires THITRONIK®** compatibles. Selon l'équipement, il peut s'agir de la THITRONIK® App, de la télécommande radio 868, de la KeyCard, du KeyTag ou du KeyStrap. Si le véhicule est verrouillé avec la **clé d'origine**, le déverrouillage ultérieur avec un accessoire THITRONIK® peut être bloqué. Après un verrouillage avec un accessoire THITRONIK®, le déverrouillage avec la clé d'origine reste possible.

**Protection contre le verrouillage accidentel en mode camping (signal sonore) :** Pour des raisons de sécurité, le véhicule **n'est pas verrouillé et le système n'est pas armé** dans les cas suivants. Un signal d'avertissement retentit et les feux de détresse clignotent au même rythme :

- Verrouillage avec la clé d'origine, puis ouverture d'une porte de l'intérieur.
- Reverrouillage automatique après le déverrouillage avec la clé d'origine, puis ouverture d'une porte de l'intérieur.

**Qu'est-ce qu'une attaque par rejeu et quels véhicules sont concernés ?**
Lors d'une attaque par rejeu, un signal de déverrouillage précédemment enregistré de la télécommande d'origine est retransmis. Si le véhicule reconnaît ce signal comme valide, il peut se déverrouiller ; un système d'alarme qui exploite le même signal pour se désarmer serait alors lui aussi désarmé. La FAQ produit cite comme séries concernées les **Fiat Ducato, Peugeot Boxer, Citroën Jumper et Iveco Daily des années modèles 2006–2018**. À partir de l'année modèle 2019, la FAQ décrit une clé d'origine à code tournant, c'est-à-dire avec un code radio variable, reconnaissable à son œillet en plastique noir. L'année modèle, la variante de clé et la compatibilité du véhicule doivent néanmoins être vérifiées au cas par cas.

**La clé d'origine fonctionne-t-elle encore après l'installation ?**
Sans carte de conversion, le verrouillage centralisé d'origine reste en principe fonctionnel. Toutefois, dans la configuration prévue pour la protection anti-rejeu, WiPro III safe.lock n'utilise pas le signal radio de la clé d'origine pour désarmer le système. Déverrouiller et désarmer sont donc deux opérations distinctes.

**À quels véhicules la carte de conversion safe.lock est-elle destinée ?**
Selon la FAQ produit, la carte de conversion (réf. 101052) est destinée aux **Fiat Ducato, Peugeot Boxer, Citroën Jumper et Iveco Daily des années modèles 2006–2018**. Une autre solution sans conversion de la clé peut être utilisée sur des véhicules plus récents compatibles avec safe.lock. Pour l'année de transition 2018, l'année modèle et la variante de clé doivent être vérifiées explicitement avant de choisir la solution.

**Quand une carte de conversion n'est-elle plus nécessaire sur les véhicules récents ?**
Sur les véhicules équipés d'une **clé à code tournant**, la carte de conversion classique n'est généralement plus nécessaire. safe.lock est alors mis en œuvre au moyen de la centrale WiPro III ou du kit spécifique au véhicule. Le véhicule, l'année modèle, la variante de clé, le numéro de série et la version logicielle sont déterminants.

> Particularités spécifiques au véhicule (Ford Transit 2019+, VW Crafter/MAN TGE, Mercedes Sprinter, VW T6.1) → [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]

---

## Assistance

- Tél : +49 (0)4351 76744-112
- Assistance et téléchargements : `www.thitronik.de/support`

---

## Renvois

- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact magnétique radio 868 — montage et fonctionnement]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Télécommande radio 868 — commande de WiPro III]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[BT-connect — Module Bluetooth pour WiPro III]]
- [[module NFC — Contrôlez le WiPro via NFC|Module NFC — commander WiPro par NFC]]
- [[T.S.A. — Détecteur de fumée sans fil pour WiPro III|T.S.A. — détecteur de fumée radio pour WiPro III]]
- [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques]]
- [[Carte de conversion safe.lock - sécurité de clé pour Ducato/Boxer/Jumper]]
