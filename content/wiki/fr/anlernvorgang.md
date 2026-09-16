---
title: Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III
sources:
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/Funk-Magnetkontakt_868__100757__Overview_DE.md
  - sources/Funk-Kabelschleife_868__100761__Overview_DE.md
  - sources/TSA_Funk-Rauchmelder__105753__Overview_DE.md
  - sources/funk-rauchmelder-t.s.a..pdf
  - sources/GAS_Familie_DE_RAG_Pack/GAS-connect__105750__Overview_DE.md
  - sources/g.a.s.-connect.pdf
  - sources/Thitronik_FAQ_DE_RAG_Pack/FAQ_WiPro-III_DE.md
  - sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/30_2_2_1_easy_add_1_0.md
  - >-
    sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/31_2_2_2_zubehoer_loeschen.md
  - >-
    sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/32_2_2_3_easy_add_2_0_can.md
  - >-
    sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/33_2_2_4_easy_add_3_0_app.md
  - sources/NFC-Modul_105299__HowTo__Inbetriebnahme_Anlernen_DE.md
  - sources/Funk Zubehör.docx
updated: '2026-07-14'
confidence: high
lang: fr
translation_of: sources/anlernvorgang.md
dealerStatus: internal_only
---

# Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III

> **IMPORTANT :** À la livraison, aucun composant radio n’est mémorisé. WiPro III ne peut pas interpréter les signaux des composants radio non mémorisés ; ceux-ci ne peuvent donc pas déclencher d’alarme.

Chaque émetteur radio doit être mémorisé individuellement dans la centrale WiPro III. La **mémorisation** des accessoires WiPro ne doit pas être confondue avec l’**appairage** Bluetooth.

---

## Lancer le mode de mémorisation

### Méthode 1 — Bouton de la centrale WiPro III

Il s’agit de la méthode standard lorsque la centrale WiPro III est accessible.

1. Brancher le connecteur à 20 broches de la centrale WiPro III.
2. Maintenir le bouton **« B »** de la face avant du boîtier enfoncé jusqu’à ce qu’un long signal sonore retentisse.
3. La LED d’état reste allumée : le mode de mémorisation est actif.
4. Déclencher les composants souhaités comme indiqué à la section « Déclencher et mémoriser les accessoires ».
5. Pour terminer, appuyer brièvement sur le bouton **« B »**. Un double signal sonore retentit et la LED d’état s’éteint.

### Méthode 2 — Easy-Add 1.0 avec une télécommande radio

Cette méthode nécessite une télécommande radio 868 déjà mémorisée et permet d’ajouter des accessoires sans accéder directement à la centrale WiPro III.

1. Fermer toutes les ouvertures surveillées du véhicule.
2. Couper l’alimentation électrique de la centrale WiPro III pendant environ 10 secondes, par exemple en retirant le fusible ou en débranchant le connecteur.
3. Rétablir l’alimentation électrique.
4. Dans un délai de **30 secondes**, appuyer **5×** sur la touche portant le symbole du haut-parleur de la télécommande déjà mémorisée.
5. WiPro change plusieurs fois d’état ; la LED d’état reste ensuite allumée en rouge. Le mode de mémorisation est actif.
6. Déclencher les composants souhaités et attendre la confirmation après chacun d’eux.
7. Pour terminer, couper puis rétablir de nouveau l’alimentation électrique.

### Méthode 3 — Easy-Add 2.0 via le CAN-Bus

Cette méthode nécessite une connexion CAN-Bus active et compatible.

1. Couper puis rétablir l’alimentation électrique de la centrale WiPro III.
2. Dans un délai de **30 secondes**, **ouvrir et fermer la porte conducteur 5×**.
3. WiPro change plusieurs fois d’état ; la LED d’état reste ensuite allumée en rouge. Le mode de mémorisation est actif.
4. Déclencher les composants souhaités et attendre la confirmation après chacun d’eux.
5. Pour terminer, couper puis rétablir de nouveau l’alimentation électrique.

> **IMPORTANT :** Easy-Add 2.0, c’est-à-dire la méthode via CAN-Bus, permet uniquement de mémoriser des composants. Elle ne permet pas de les effacer.

### Méthode 4 — Easy-Add 3.0 via la THITRONIK® App

Avec une version logicielle compatible, le mode de mémorisation peut être lancé depuis la THITRONIK® App sans couper l’alimentation électrique. Cette fonction nécessite un [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]] approprié ou un [[Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth|module Bluetooth de mise en réseau]].

1. Dans la THITRONIK® App, lancer le mode de mémorisation du véhicule.
2. Déclencher le composant souhaité.
3. Attendre la confirmation sonore de la centrale WiPro III.
4. Quitter ensuite le mode de mémorisation depuis l’application.

La disponibilité de la fonction et les étapes affichées dépendent des appareils installés et de leurs versions logicielles.

---

## Différences entre les méthodes

| Méthode | Déclencheur | Condition requise | Effacement avec cette méthode |
|---------|-------------|-------------------|--------------------------------|
| Bouton « B » | Bouton de la centrale WiPro III | Accès direct à la centrale | La totalité de la mémoire peut être effacée au moyen d’une procédure distincte |
| Easy-Add 1.0 | Appuyer **5×** sur la touche portant le symbole du haut-parleur | Télécommande radio 868 déjà mémorisée | Effacement partiel avec une séquence distincte ; seule la télécommande maître reste mémorisée |
| Easy-Add 2.0 | Ouvrir et fermer la porte conducteur **5×** | Connexion CAN-Bus compatible | **Non** |
| Easy-Add 3.0 | THITRONIK® App | Pro-Finder ou module Bluetooth de mise en réseau ; logiciel compatible | Ne remplace ni l’effacement partiel ni l’effacement total de la mémoire |

---

## Déclencher et mémoriser les accessoires

| Composant | Déclenchement en mode de mémorisation |
|-----------|---------------------------------------|
| **Contact magnétique radio 868** | Éloigner l’émetteur de l’aimant jusqu’à ce que la LED d’émission s’allume brièvement |
| **Télécommande radio 868** | Appuyer sur une touche de la télécommande |
| **Boucle de câble radio 868** | Retirer l’unité électronique de son support |
| **G.A.S.-connect** | Allumer l’appareil |
| **Détecteur de fumée radio T.S.A.** | Desserrer le couvercle du boîtier en le tournant, puis appuyer sur le bouton intérieur |
| **Module NFC** | Retirer la languette isolante de la pile et présenter la KeyCard fournie devant le module ; ne pas le mémoriser comme premier composant |

Après chaque mémorisation réussie, la centrale WiPro III émet un bref signal sonore et la LED d’état s’éteint brièvement.

> **Ordre de mémorisation du module NFC :** Le module NFC ne doit pas être mémorisé comme premier composant. Sinon, il risque d’être identifié comme une télécommande radio maître.

---

## Capacité de la mémoire

WiPro III peut mémoriser au maximum **100 émetteurs**. Les contacts magnétiques radio, télécommandes radio, boucles de câble radio et autres composants radio se partagent cette mémoire.

---

## Effacer les composants radio

### Effacement partiel — la télécommande maître reste mémorisée

Cette procédure efface tous les composants radio mémorisés, à l’exception de la première télécommande radio mémorisée. Celle-ci reste mémorisée comme **télécommande maître**.

1. Fermer toutes les ouvertures surveillées du véhicule.
2. Couper puis rétablir l’alimentation électrique de la centrale WiPro III.
3. Dans un délai de **30 secondes**, appuyer **5×** sur la touche portant le **symbole du haut-parleur barré** de la télécommande maître.
4. WiPro change plusieurs fois d’état et confirme l’effacement par un long signal sonore.
5. Le système passe ensuite en mode de mémorisation. De nouveaux composants peuvent être mémorisés immédiatement.
6. Pour terminer, couper puis rétablir de nouveau l’alimentation électrique.

> Tous les composants effacés doivent ensuite être mémorisés de nouveau. Les télécommandes radio supplémentaires sont également effacées ; seule la télécommande maître reste mémorisée.

### Effacement complet — totalité de la mémoire

Cette procédure efface **tous** les émetteurs mémorisés, y compris la télécommande maître.

1. Débrancher le connecteur blanc à 20 broches de la centrale WiPro III.
2. Maintenir le bouton **« B »** enfoncé.
3. Rebrancher le connecteur à 20 broches et maintenir le bouton enfoncé jusqu’à ce qu’un long signal sonore retentisse.
4. La totalité de la mémoire des émetteurs est alors effacée.

> **ATTENTION :** Après l’effacement complet, mémoriser d’abord une télécommande radio 868. Elle devient la nouvelle télécommande maître. Mémoriser ensuite tous les autres composants ; le module NFC ne doit pas être mémorisé en premier.

---

## Mémoriser et contrôler la portée avant le montage

Dans la mesure du possible, mémoriser les accessoires radio avant leur montage définitif et les tester à l’emplacement prévu.

1. Placer provisoirement le composant déjà mémorisé à l’emplacement de montage prévu.
2. Appuyer brièvement sur le bouton « B » pour lancer le mode de diagnostic de la centrale WiPro III ; la LED d’état clignote.
3. Déclencher le composant. La centrale WiPro III doit confirmer la réception de l’émission par un signal sonore.
4. En l’absence de confirmation, changer l’emplacement de montage et vérifier si des pièces métalliques font écran aux ondes radio.
5. Après le montage définitif, effectuer un test d’alarme complet avec chaque composant.

---

## Informations sur les piles des accessoires radio

### Piles bouton CR2032 remplaçables

La télécommande radio 868, le contact magnétique radio 868 et la boucle de câble radio 868 utilisent une **pile bouton CR2032 de 3 V**. Leur durée de vie habituelle est d’environ **deux ans**.

- Les marques Panasonic ou Varta sont recommandées.
- Les piles Duracell, sans marque ou premier prix ne sont pas recommandées en raison de possibles problèmes de tension ou de durée de vie.
- Lors du remplacement, ne pas toucher la pile bouton à mains nues, respecter la polarité et éliminer la pile usagée conformément à la réglementation.
- Il n’est pas nécessaire de mémoriser de nouveau l’accessoire après le remplacement de la pile.

### Avertissements de pile faible

Les niveaux d’avertissement affichés dépendent de la génération de l’émetteur :

| Signalisation | Signification | Mesure à prendre |
|---------------|---------------|------------------|
| Voyant jaune pendant environ **5 secondes** | La pile commence à faiblir | La remplacer dans un délai de **2–6 semaines** |
| Signal sonore de la centrale WiPro III pendant environ **2 secondes** et LED d’émission rouge pendant environ **30 secondes** | Pile critique | Remplacer immédiatement la pile |

Lorsqu’un composant signale une pile faible, les autres piles bouton du même âge sont souvent elles aussi proches de leur fin de vie. Il est donc conseillé de les remplacer ensemble.

### Autres types d’alimentation

- **G.A.S.-connect** est alimenté par le véhicule en **12 V ou 24 V** et n’utilise pas de pile bouton CR2032.
- Le **détecteur de fumée radio T.S.A.** contient une **pile longue durée au lithium de 3 V de type CR123A**, intégrée à demeure, dont la durée de vie peut atteindre **dix ans**. La pile ne peut pas être remplacée ; le détecteur de fumée doit être remplacé dès que l’avertissement de pile faible a été émis plus de quatre fois.

---

## Articles associés

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact magnétique radio 868]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Télécommande radio 868]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles|Boucle de câble radio 868]]
- [[T.S.A. — Détecteur de fumée sans fil pour WiPro III|Détecteur de fumée radio T.S.A.]]
- [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III|G.A.S.-connect]]
- [[module NFC — Contrôlez le WiPro via NFC|Module NFC]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK|Vue d’ensemble du système]]
