---
title: Supports d’accès et commande — voies d’accès dans le système THITRONIK
sources:
  - sources/thitronik_zugang_nur_zugang_v2.pdf
  - wiki/wipro-iii.md
  - wiki/funk-handsender.md
  - wiki/nfc-modul.md
  - wiki/bt-connect.md
  - wiki/vernetzungsmodul.md
  - wiki/pro-finder.md
  - wiki/app-befehle.md
  - wiki/safe-lock-umruestplatine.md
  - wiki/fahrzeugkompatibilitaet.md
updated: '2026-07-15'
confidence: high
lang: fr
translation_of: sources/zugang-bedienung.md
---

# Supports d’accès et commande — voies d’accès dans le système THITRONIK

Cette page distingue le **support d’accès**, le **lecteur ou dispositif de commande** et la **commande à distance**. Cette distinction est importante pour le choix, l’utilisation et le support : un `KeyTag` n’est pas la même chose que le `module NFC`, et `BT-connect` n’est pas la même chose que `Pro-Finder`.

> **Principe :** **Armer et désarmer** désignent l’état de surveillance du système d’alarme. **Verrouiller et déverrouiller** désignent le verrouillage centralisé du véhicule. Ces opérations ne peuvent être associées qu’avec une WiPro III safe.lock compatible, un profil de véhicule adapté et des versions logicielles appropriées.

> Pour les termes canoniques, les alias et les fautes fréquentes, voir [[Terminologie et graphies — termes de référence pour les utilisateurs et l’IA]].

---

## Logique de base

| Niveau | Exemples | Classification |
|--------|----------|----------------|
| Technologie d’accès installée dans le véhicule | CampLock Fingerprint, module NFC, BT-connect | Technologie ou lecteur installé dans le véhicule |
| Support d’accès personnel | Empreinte digitale, télécommande radio 868, KeyCard, KeyTag, KeyStrap, smartphone ou montre connectée | Support avec lequel une personne déclenche une commande |
| Commande à distance | Pro-Finder via le réseau mobile | Commande à distance, transmission d’alarme et localisation ; pas un accès de proximité principal |
| Voie d’origine du véhicule | Clé d’origine du véhicule | Commande dépendant du profil du véhicule, du raccordement CAN, de la variante WiPro et de la configuration |

---

## Comparatif rapide

| Élément | Type | Verrouiller/déverrouiller | Armer/désarmer | Portée | Condition | Détails |
|---------|------|---------------------------|----------------|--------|-----------|---------|
| Clé d’origine du véhicule | voie radio du véhicule | fonction du véhicule | selon le véhicule | portée de la clé du véhicule | profil de véhicule pris en charge et raccordement correct ; protection contre le rejeu inactive | [[WiPro III — système d'alarme radio pour véhicules de loisirs]] |
| CampLock Fingerprint | accès biométrique à la porte | oui | si relié à une WiPro compatible | directement à la porte | porte de cellule Hartal avec verrouillage centralisé | — |
| Télécommande radio 868 | radio 868 MHz | uniquement avec un raccordement safe.lock compatible | oui | jusqu’à 75 m en champ libre | WiPro III ou WiPro III safe.lock | [[Émetteur radio 868 — télécommande pour WiPro III]] |
| Module NFC | lecteur NFC relié à la WiPro par radio 868 MHz | uniquement avec un raccordement safe.lock compatible | oui | proximité NFC du module | système compatible et support NFC mémorisé | [[module NFC — Contrôlez le WiPro via NFC]] |
| KeyCard | support d’accès NFC | via le module NFC | via le module NFC | env. 25 mm | module NFC requis | — |
| KeyTag | support d’accès NFC | via le module NFC | via le module NFC | env. 20 mm | module NFC requis | — |
| KeyStrap | support d’accès NFC | via le module NFC | via le module NFC | env. 15 mm | module NFC requis | — |
| BT-connect | voie de proximité Bluetooth/application | uniquement avec un raccordement safe.lock compatible | oui | proximité locale | smartphone ou montre connectée, THITRONIK® App et versions d’appareils/logiciels compatibles | [[BT-connect — Module Bluetooth pour WiPro III]] |
| Pro-Finder | commande à distance par réseau mobile | uniquement avec un raccordement safe.lock compatible | oui | dans la zone de couverture mobile | carte SIM, réception mobile, configuration et versions d’appareils/logiciels compatibles | [[Pro-Finder — Module de télémétrie GSM/GPS]] |

> **Recommandation :** Prévoir au moins **deux voies de commande indépendantes**. Avant de les choisir, vérifier les fonctions prises en charge par le profil du véhicule, la variante WiPro et les versions logicielles installées.

---

## À ne pas confondre

- `KeyCard`, `KeyTag` et `KeyStrap` ne sont **pas des dispositifs de commande autonomes**. Ce sont des supports pour le [[module NFC — Contrôlez le WiPro via NFC]].
- `BT-connect` est une **voie de proximité**. Il ne permet aucun accès sans connexion Bluetooth ou si la batterie du smartphone est déchargée.
- `Pro-Finder` est une **voie de commande à distance, de transmission d’alarme et de localisation**, et non l’accès de proximité privilégié au quotidien.
- `safe.lock` n’est **pas une méthode d’accès distincte**. Il s’agit d’une logique de sécurité concernant les clés et le verrouillage centralisé.

---

## 1. CampLock Fingerprint

**Réf. 106111 (argent) / 106144 (noir)**  
Accès biométrique pour les **portes de cellule Hartal avec verrouillage centralisé**.

### Fonctions et caractéristiques

- déverrouillage et verrouillage de la porte par **empreinte digitale**
- commande simultanée possible du système d’alarme THITRONIK
- compatible avec **WiPro III** et **WiPro III safe.lock**
- **2 empreintes maîtres** et **16 empreintes mémorisables**
- indice de protection **IP67**

### Classification

CampLock Fingerprint est installé directement sur la porte de cellule. Il ne remplace ni Pro-Finder ni le module NFC, mais constitue une voie d’accès biométrique distincte.

---

## 2. Clé d’origine du véhicule

Pour les profils de véhicule compatibles, la clé d’origine peut constituer la voie de commande standard du véhicule :

- `Verrouiller` peut armer la WiPro.
- `Déverrouiller` peut désarmer la WiPro.
- Selon le profil du véhicule et la configuration, la clé peut arrêter une alarme active.

### Limites

- Cette fonction nécessite un profil de véhicule pris en charge et un raccordement correct au véhicule. Sur certains véhicules, la clé d’origine commande uniquement le verrouillage centralisé et ne commande pas la WiPro de manière fiable.
- Si la protection contre le rejeu est activée avec le DIP 5, la clé radio d’origine du véhicule n’arme et ne désarme plus la WiPro. La surveillance des portes par le CAN-Bus reste active.
- En mode camping, la voie utilisée auparavant pour le verrouillage peut déterminer les voies de déverrouillage disponibles ensuite. Les consignes propres au véhicule sont obligatoires.

---

## 3. Télécommande radio 868

**Réf. 101064**  
Une voie de commande THITRONIK® indépendante du smartphone.

### Rôle habituel

- solution de secours physique pour un smartphone ou la clé d’origine du véhicule
- adaptée aux autres utilisateurs autorisés
- peut aussi commander le verrouillage centralisé avec un raccordement safe.lock compatible

### Points importants

- portée jusqu’à **75 m en champ libre**
- fonction panique disponible ; la combinaison de touches dépend de la plage de numéros de série de la télécommande
- fonctionnement indépendant du smartphone
- pile **CR2032** ; aucune nouvelle mémorisation n’est nécessaire après son remplacement

→ [[Émetteur radio 868 — télécommande pour WiPro III]]

---

## 4. Famille NFC : module NFC + KeyCard / KeyTag / KeyStrap

### Module NFC

**Réf. 105299**  
Le module NFC est le **lecteur installé dans le véhicule**, et non le support d’accès lui-même.

- montage sur la face intérieure d’une vitre adaptée ; le module doit rester accessible pour le remplacement des piles
- jusqu’à **14 transpondeurs**
- verrouillage et déverrouillage supplémentaires du verrouillage centralisé avec une `WiPro III safe.lock` compatible
- les supports d’origine THITRONIK® reposent sur **MIFARE DESFire EV2 / ISO 14443-A** ; les supports tiers mémorisés ne sont pas protégés contre la copie

### Supports d’accès pour le module NFC

| Support | Réf. | Forme | Portée | Utilisation habituelle |
|---------|------|-------|--------|------------------------|
| KeyCard | 105300 | format carte | env. 25 mm | portefeuille, porte-cartes |
| KeyTag | 105301 | porte-clés | env. 20 mm | discret, robuste, étanche |
| KeyStrap | 105302 / 105464–105470 | bracelet étanche | env. 15 mm | sport, activités aquatiques, mains libres |

### Variantes KeyStrap

- Taille M : `105302` noir, `105464` blanc, `105466` bleu, `105465` rouge
- Taille L : `105467` noir, `105468` blanc, `105470` bleu, `105469` rouge

### Important en pratique

- `KeyCard`, `KeyTag` et `KeyStrap` fonctionnent **uniquement avec le module NFC**
- le verrouillage centralisé n’est commandé qu’avec un raccordement safe.lock compatible
- le module NFC ne doit **pas être le premier accessoire mémorisé**
- les supports NFC ne peuvent pas être supprimés individuellement ; une réinitialisation efface tous les supports mémorisés

→ [[module NFC — Contrôlez le WiPro via NFC]]

---

## 5. BT-connect et l’application

**Réf. 106000**  
Accès Bluetooth local par smartphone ou montre connectée.

### Avantages

- accès de proximité pratique
- verrouillage et déverrouillage possibles avec une WiPro III safe.lock compatible, un raccordement adapté au véhicule et des versions logicielles appropriées
- jusqu’à **9 appareils appairés**

### Limites

- aucun accès sans connexion Bluetooth
- ne remplace pas une solution de secours physique
- ne pas confondre avec `Pro-Finder` : BT-connect fonctionne à **courte portée**, Pro-Finder permet l’**accès à distance**

### Ancien module

Le [[Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth]] remplit une fonction similaire, mais il a été remplacé par BT-connect en septembre 2025.

→ [[BT-connect — Module Bluetooth pour WiPro III]] · [[THITRONIK® App — commandes, configuration et dépannage]]

---

## 6. Pro-Finder comme voie de commande à distance

Pro-Finder complète les méthodes d’accès locales par la **commande à distance, la transmission d’alarme et la localisation**.

### Rôle habituel

- accès à distance dans la zone de couverture mobile
- localisation et consultation de l’état
- armement et désarmement, Geofencing et commande des sorties ; selon la version du système, verrouillage et déverrouillage également
- immobilisation sûre du véhicule avec `kill` uniquement avec un dispositif d’arrêt installé par un professionnel

### Classification

Pro-Finder n’est **pas une voie d’accès de proximité principale au quotidien**. Son fonctionnement dépend de la réception mobile, de la carte SIM, de la configuration et de la génération du matériel.

> **AVERTISSEMENT — immobilisation du véhicule :** Utiliser exclusivement la commande `kill`. Elle n’active la sortie A que lorsque la vitesse GPS est restée à 0 km/h pendant au moins 5 secondes consécutives. `a an` et les commandes de sortie temporisées ne disposent pas de ce contrôle de sécurité. L’immobilisation est limitée à trois jours au maximum.

→ [[Pro-Finder — Module de télémétrie GSM/GPS]] · [[Communications mobiles et cartes SIM — Pro-Finder, paramètres de l'application et du smartphone]]

---

## 7. safe.lock, mode camping et clé d’origine

`safe.lock` n’est pas un nouveau support d’accès, mais une logique de sécurité des clés et du verrouillage centralisé qui dépend du véhicule. Il empêche notamment qu’un signal de déverrouillage enregistré ouvre le véhicule tout en désarmant le système d’alarme. `safe.lock` n’est pas un dispositif antidémarrage et ne doit pas être confondu avec le dispositif d’arrêt séparé.

### Consignes d’utilisation

- Selon le profil du véhicule et la version logicielle, les accessoires THITRONIK® peuvent constituer une voie de commande distincte pour le système d’alarme et le verrouillage centralisé.
- En mode camping, toujours verrouiller le véhicule avec la voie de commande THITRONIK® prévue à cet effet. Sur certains véhicules, le verrouillage avec la clé d’origine peut empêcher un déverrouillage ultérieur au moyen d’un accessoire.
- Le Sleep Mode est à distinguer de cette fonction : il désigne l’état de veille des calculateurs du véhicule et non une voie d’accès. Il peut toutefois empêcher un déverrouillage ultérieur au moyen d’accessoires THITRONIK®.
- Avant d’enfermer une clé d’origine dans le véhicule, vérifier la combinaison précise du véhicule et de la version logicielle.

→ [[WiPro III — système d'alarme radio pour véhicules de loisirs]] · [[Carte de conversion safe.lock - sécurité de clé pour Ducato/Boxer/Jumper]] · [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]

---

## Combinaisons possibles

Les exemples suivants ne constituent pas des garanties générales de compatibilité. Le profil du véhicule, la variante WiPro, les versions logicielles et une installation professionnelle sont déterminants.

| Profil d’utilisation | Combinaison adaptée |
|----------------------|---------------------|
| Camping-car standard | clé d’origine + télécommande radio 868 + Pro-Finder |
| Utilisation axée sur l’application | BT-connect + télécommande radio 868 ; clé d’origine selon le profil du véhicule |
| Accès de proximité sans clé | module NFC + KeyCard/KeyTag/KeyStrap + télécommande radio 868 |
| Accès biométrique sur une porte Hartal | CampLock Fingerprint + télécommande radio 868 + Pro-Finder en option |
| Sécurité des clés renforcée | WiPro III safe.lock + au moins une voie de commande THITRONIK® compatible + Pro-Finder en option |

---

## Scénarios de secours

| Situation | Solution de secours fiable |
|-----------|-----------------------------|
| Batterie du smartphone déchargée | télécommande radio 868 |
| Clé d’origine indisponible | voie de commande THITRONIK® compatible vérifiée au préalable, par exemple télécommande radio 868, NFC ou BT-connect |
| Support NFC indisponible | télécommande radio 868 ou BT-connect configuré au préalable |
| Aucun réseau mobile | utiliser les voies locales, pas Pro-Finder |
| Véhicule volé | utiliser Pro-Finder pour la localisation ; utiliser `kill` uniquement avec un dispositif d’arrêt et dans les conditions de sécurité indiquées |

---

## Articles associés

- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
- [[Terminologie et graphies — termes de référence pour les utilisateurs et l’IA]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Émetteur radio 868 — télécommande pour WiPro III]]
- [[module NFC — Contrôlez le WiPro via NFC]]
- [[BT-connect — Module Bluetooth pour WiPro III]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[THITRONIK® App — commandes, configuration et dépannage]]
- [[Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »]]
- [[Communications mobiles et cartes SIM — Pro-Finder, paramètres de l'application et du smartphone]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
