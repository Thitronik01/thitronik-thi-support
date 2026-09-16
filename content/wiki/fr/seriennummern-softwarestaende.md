---
title: 'Numéros de série et versions logicielles — préfixes, seuils et jalons'
sources:
  - sources/Seriennummern 0823 Wipro III safe.lock.csv
  - sources/WiPro III Seriennummer1050.csv
  - sources/Seriennummer 0699  Pro-finder.csv
  - sources/Seriennummer 5298 Wipro III safe.lock Ford Transit 2019.csv
  - sources/Seriennummer 5458 Wipro III safe.lock Sprinter Set.csv
  - sources/Seriennummer 5832 Wipro III safe.lock Renault Set .csv
  - sources/Seriennummer 1290 Bluetooth-Vernetzungsmodul.csv
  - sources/Seriennummer 6000 BT-connect.csv
  - sources/Seriennummer 5299 NFC Modul.csv
  - sources/Seriennummer 1011 C.A.S. III.csv
  - sources/Seriennummer 0756  Funk-Handsender 868.csv
  - sources/Seriennummer 0089Backup-Sirene.csv
  - sources/Seriennummer 5339 Zusatzhupe inkl. Relaissatz.csv
  - sources/Seriennummer G.A.S.-connect (5750).csv
  - sources/Seriennummer 1052 Umrüstplatine.csv
  - sources/Seriennummern WiPro easy (5237).csv
  - sources/Seriennummer T.S.A. Funk-Rauchmelder weiß (5753).csv
  - sources/Seriennummer T.S.A. Funk-Rauchmelder grau (5754).csv
  - sources/Seriennummer G.A.S.-pro III KW (1286).csv
  - sources/Seriennummer G.A.S.-pro III CO (1287).csv
  - sources/Seriennummer 0001 G.A.S.-pro.csv
  - sources/Seriennummer 0061 GBA-I.csv
  - sources/Seriennummer 0104 GBA-IC (Alarmausgang).csv
  - sources/Seriennummer 0190 Sirene.csv
  - sources/Seriennummer 0686 GPS-pro.csv
  - sources/Seriennummer 0734 24V Sirene.csv
  - sources/Seriennummer 1012 GSM undGPS-Kombimodul.csv
  - sources/Seriennummer Funk-Gaswarner 868 (0759).csv
  - sources/Seriennummer Funk-Kabelschleife 868 (0761).csv
  - sources/Seriennummer Funk-Kabelschleife 868 XL (0944).csv
  - sources/Seriennummer Funk-Kabelschleife 868 XL sw (1074).csv
  - sources/Seriennummer Funk-Kabelschleife 868 sw (1068).csv
  - sources/Seriennummer Funk-Magnetkontakt 868 - 100791.csv
  - sources/Seriennummer Sirene 0095 WiPro easy.csv
  - wiki/wipro-iii.md
  - wiki/pro-finder.md
  - wiki/bt-connect.md
  - wiki/vernetzungsmodul.md
  - wiki/funk-wassermelder.md
  - wiki/app-befehle.md
  - wiki/support-fallaufnahme.md
updated: '2026-07-15'
confidence: high
lang: fr
translation_of: sources/seriennummern-softwarestaende.md
---

# Numéros de série et versions logicielles — préfixes, seuils et jalons

Cette matrice de travail classe les principaux préfixes de numéros de série, les versions de production documentées et les seuils fonctionnels des produits THITRONIK. Elle facilite la saisie des dossiers et le contrôle de compatibilité, mais ne remplace ni la plaque signalétique ni la notice propre au produit et au véhicule.

> **Règle de base :** Toujours relever le numéro de série complet et, s’il est lisible, la version logicielle effectivement installée. Une entrée dans une liste de numéros de série décrit l’affectation documentée lors de la production ; une mise à jour ultérieure peut avoir modifié la version du dispositif concerné.

---

## Lire correctement les numéros de série

| Information | Exemple | Signification |
|-------------|---------|---------------|
| Numéro d’article | `100699` | Numéro de commande ou de produit ; ne pas le confondre avec le numéro de série |
| Préfixe du numéro de série | `0699-` | Identifie le produit ou la série |
| Numéro de série complet | `0699-045` | Préfixe suivi du numéro de production ; ne pas omettre les zéros initiaux |
| Version logicielle | `11.0.4` | État fonctionnel du logiciel ; le relever séparément du numéro de série |
| Version minimale | à partir de `0699-045` | La fonction ou la modification matérielle indiquée est documentée à partir de ce seuil ; la famille de produits et toutes les autres conditions restent déterminantes |
| Dernière entrée de la source | p. ex. `0699-072` | Dernière entrée de la liste de numéros de série disponible, pas nécessairement la version la plus récente livrée aujourd’hui |

Un dossier d’assistance doit au minimum contenir la désignation du produit, le numéro de série complet, la version logicielle, le véhicule, l’année modèle et la fonction observée. Si une information manque, aucune compatibilité ne doit être déduite d’un préfixe similaire ou d’une valeur de remplacement utilisée dans l’application. Voir [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]].

> **Important :** Un numéro séquentiel plus élevé indique une production plus récente uniquement au sein d’une même ligne de produits. Les lignes `0823-`, `1050-`, `5298-`, `5458-` et `5832-` disposent de branches logicielles distinctes et ne doivent pas être comparées numériquement entre elles.

---

## Matrice des préfixes

| Préfixe | Famille de produits | Classification | Repère essentiel |
|---------|---------------------|----------------|------------------|
| `0823-` | WiPro III | Centrale standard | Les fonctions d’application, de véhicule et de capteur ont des seuils distincts |
| `1050-` | WiPro III safe.lock | Centrale safe.lock | Historique distinct, documenté principalement pour les véhicules Fiat/Sevel |
| `5298-` | Kit Ford WiPro III safe.lock | Ford Transit / Custom | Branche logicielle Ford distincte |
| `5458-` | Kit Sprinter WiPro III safe.lock | Sprinter / Crafter / TGE | Branche logicielle Mercedes/VW/MAN distincte |
| `5832-` | Kit Renault WiPro III safe.lock | Renault Master 2019–2024 | Branche logicielle Renault distincte |
| `0699-` | Pro-Finder | GSM/GPS, SMS et localisation | Le seuil de l’application et le changement matériel à partir de `0699-045` sont particulièrement importants |
| `0686-` | GPS-pro | Ancienne solution de localisation | Série Legacy indépendante |
| `1012-` | Module combiné GSM/GPS | Ancien module combiné | `1012-002` est indiqué comme version recommandée dans la liste des numéros de série |
| `1290-` | Module Bluetooth de mise en réseau | Prédécesseur de BT-connect | La compatibilité avec les montres connectées dépend du numéro de série et de la version logicielle |
| `6000-` | BT-connect | Module Bluetooth | Ligne de produits distincte ; ne pas la confondre avec `1290-` |
| `5299-` | Module NFC | Accès NFC | Suite de numéros documentée, mais aucune version logicielle propre n’est indiquée |
| `1052-` | Carte de conversion safe.lock | Mise à niveau de la clé | Préfixe de série de la carte de conversion, article 101052 |
| `5237-` | WiPro easy | Ancienne centrale compacte | Branche logicielle distincte de `1.0` à `1.0.1` dans la liste disponible |
| `0001-` | G.A.S.-pro | Ancien avertisseur de gaz | Ancien schéma supplémentaire `SN40/SN50-xxxxx` avant 2013 |
| `1286-` | G.A.S.-pro III KW | Avertisseur de gaz | Branche logicielle distincte de la variante KW |
| `1287-` | G.A.S.-pro III CO | Avertisseur de gaz/CO | Branche logicielle et de capteur distincte |
| `1011-` | C.A.S. III | Ancienne centrale | Pertinent pour le seuil historique du détecteur d’eau |

Les préfixes d’accessoires sans seuil fonctionnel documenté figurent à la section « Accessoires et capteurs ». Les numéros d’article sont répertoriés séparément dans [[Registre des numéros d’article — produits et accessoires THITRONIK documentés]].

---

## WiPro III et safe.lock

### 0823-xxx — WiPro III

| À partir du numéro de série | SW | Pertinence documentée |
|-----------------------------|----|-----------------------|
| `0823-012` | — | Version minimale pour certains profils de véhicule, dont [[VW T6 (2015-2019)]] |
| `0823-014` | `5.8` | Plusieurs nouveaux profils de véhicule ; protection anti-rejeu documentée à partir de cette combinaison |
| `0823-018` | — | Seuil de référence pour les fonctions de base de l’application |
| `0823-019` | `7.1` | Profils de véhicule plus récents et certaines mises à niveau safe.lock, dont [[Mercedes Sprinter VS30 (BR907/910, à partir de 2018)]] et [[VW T6.1 (à partir de 2019)]] |
| `0823-021` | `6.8` | Prise en charge du [[Détecteur d'eau sans fil 868 — détecteur d'eau sans fil]] |
| `0823-034` | — | Sprinter VS30 : prise en compte des quatre clés documentée comme version à code tournant |

### 1050-xxx — WiPro III safe.lock

| À partir du numéro de série | SW | Pertinence documentée |
|-----------------------------|----|-----------------------|
| `1050-004` | `6.7s` | Fonctions de base de l’application, fonctions de verrouillage centralisé, Easy-Add 3.0 et détecteur d’eau sans fil |
| `1050-006` | `6.7s` | Fonction combinée « verrouiller et armer » ; une anomalie de module récepteur/condensateur est également documentée sur certains dispositifs |
| `1050-016` | `7.1s` | Prise en charge du Fiat Ducato 8 / année modèle 2022 |
| `1050-025` | `7.3.0s` | Compatibilité avec Alphatronics ONE |
| `1050-038` | `7.5.0s` | Anomalie de portée documentée sur certaines télécommandes radio 868 |
| `1050-042` | `7.5.2s` | Numéro de série minimal pour Ducato 8 avec grand système d’infodivertissement à écran tactile |
| `1050-046` | `7.5.3s` | Prise en charge du restylage du Fiat Ducato à partir de 2024 |
| `1050-051` | `7.5.3s` | Marque d’homologation E1 de nouveau documentée sur le boîtier |

En cas de problème de portée dans les lignes `1050-006` ou `1050-038`, ne pas remplacer les accessoires de manière systématique. Relever le numéro de série complet, le composant radio, l’indication de pile, le lieu de montage et le résultat du test de portée, puis faire contrôler le dossier par un spécialiste.

### 5298-xxx — kit Ford WiPro III safe.lock

| À partir du numéro de série | SW | Pertinence documentée |
|-----------------------------|----|-----------------------|
| `5298-001` | `7.4.0s` | Première série de kit Ford régulièrement documentée ; seuil pour l’application, le verrouillage centralisé et le détecteur d’eau |
| `5298-005` | `1.0.1sf` | [[Ford Transit / Tourneo Custom / Transit Custom (2024+)]] ; mode camping et protection contre le verrouillage accidentel |
| `5298-008` | `1.0.3sf` | Correction de la protection contre le verrouillage accidentel en combinaison avec Pro-Finder sur Ford Transit 2019–2024 |
| `5298-009` | `1.0.3sf` | Dernière entrée de la liste de numéros de série Ford disponible |

Pour la combinaison WiPro III safe.lock et Pro-Finder sur Ford Transit 2019–2024, le seuil de correction `5298-008` est important pour la sécurité. Ne pas valider une version de kit plus ancienne sur la seule base d’une compatibilité Ford générale.

### 5458-xxx — kit Sprinter WiPro III safe.lock

| À partir du numéro de série | SW | Pertinence documentée |
|-----------------------------|----|-----------------------|
| `5458-001` | `1.0.5sx` | Première version de kit documentée ; seuil pour l’application, le verrouillage centralisé et le détecteur d’eau |
| `5458-006` | `1.2.0sx` | Correction d’une erreur de logique d’armement et signal d’avertissement de protection contre le verrouillage accidentel |
| `5458-013` | `1.2.1sx` | ancienne entrée d'une liste du kit Sprinter désormais absente localement ; aucune validation véhicule |

### 5832-xxx — kit Renault WiPro III safe.lock

| À partir du numéro de série | SW | Pertinence documentée |
|-----------------------------|----|-----------------------|
| `5832-001` | `1.0.0sr` | Première version pour [[Renault Master (2019-2024) — safe.lock]] |

---

## Pro-Finder

| À partir du numéro de série | SW | Pertinence documentée |
|-----------------------------|----|-----------------------|
| `0699-003` | `5.0` | Compatibilité 24 V |
| `0699-009` | `8.7` | Consultation du solde prépayé documentée pour d’autres opérateurs |
| `0699-013` | `9.1` | Compatibilité avec l’application, appel d’alarme et nouveaux types de détecteurs |
| `0699-015` | — | Seuil fonctionnel de la fonction combinée « verrouiller et armer » |
| `0699-018` | `9.1` | Nouveau modem 2G/3G ; compatibilité 3G documentée pour la Suisse |
| `0699-029` | `10.0.0` | Correction des commandes françaises et amélioration de la communication du modem |
| `0699-045` | `11.0.4` | **Changement matériel :** 4G LTE, Nano-SIM et demande de code PIN de la SIM entièrement désactivée |
| `0699-056` | `11.0.6` | Compatibilité améliorée avec les cartes SIM O2 |
| `0699-065` | `11.1.0` | Nouvelle carte électronique supérieure et nouveau procédé de soudage |
| `0699-072` | `11.1.0` | Dernière entrée de la liste de numéros de série Pro-Finder disponible |

### Règles SIM selon la génération matérielle

| Numéro de série | Format de SIM | Règle du code PIN |
|-----------------|---------------|-------------------|
| `0699-001` à `0699-007` | Mini-SIM | Code PIN `0000`, demande de code PIN activée |
| `0699-008` à `0699-044` | Micro-SIM | Code PIN `0000`, demande de code PIN activée |
| à partir de `0699-045` | Nano-SIM | Désactiver entièrement la demande de code PIN |

Le changement matériel `0699-045` ne met pas fin à l’aptitude générale des cartes prépayées. Prépayé ou abonnement, code de consultation du solde, SMS, téléphonie et couverture réseau doivent être vérifiés séparément. Toujours contrôler la disponibilité actuelle de la 2G/3G pour le pays et l’opérateur. Les détails du produit figurent dans [[Pro-Finder — Module de télémétrie GSM/GPS]].

---

## Bluetooth et NFC

### 1290-xxx — module Bluetooth de mise en réseau

| À partir du numéro de série | SW | Pertinence documentée |
|-----------------------------|----|-----------------------|
| `1290-001` | `V1.6` | Apple Watch prise en charge ; Wear OS 2 et 3 pas encore pris en charge |
| `1290-002` à `1290-009` | `V2.0` | Prise en charge de Wear OS 2 |
| `1290-010` | `V2.1.0` | Prise en charge de Wear OS 3 et mode de mémorisation en deux étapes |
| `1290-012` | `V2.2.2` | Pas de bus CI ; nouvel appairage simplifié après perte de l’appairage |
| `1290-019` | `V2.2.2` | Dernière entrée de la liste de numéros de série disponible |

Le module Bluetooth de mise en réseau et BT-connect sont deux lignes de produits différentes. Ne pas transférer les indications de fonctionnement ou de compatibilité du préfixe `1290-` au préfixe `6000-`. Voir [[Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth]].

### 6000-xxx — BT-connect

| À partir du numéro de série | SW | Pertinence documentée |
|-----------------------------|----|-----------------------|
| `6000-001` | `1.0.2` | Première série documentée |
| `6000-002` | `1.0.2` | Dernière entrée de la liste de numéros de série BT-connect disponible |

Des informations supplémentaires figurent dans [[BT-connect — Module Bluetooth pour WiPro III]].

### 5299-xxx — module NFC

| Plage documentée | Indication |
|------------------|------------|
| `5299-001` à `5299-014` | La liste de numéros de série documente la suite du module NFC ; aucune version logicielle distincte n’y est indiquée. |

---

## Accessoires et capteurs

| Préfixe | Produit / domaine | Plage visible dans la source | Remarque pour l’assistance |
|---------|-------------------|------------------------------|----------------------------|
| `0001-` | G.A.S.-pro | `001` à `013` | Ligne Legacy ; ancien schéma supplémentaire `SN40/SN50-xxxxx` avant 2013 |
| `0061-` | GBA-I | `001` à `031` | Suite de numéros sans jalons logiciels documentés |
| `0104-` | GBA-IC (sortie d’alarme) | `002` à `006` | Petite série Legacy sans colonne SW propre |
| `0686-` | GPS-pro | `001` à `014` | Ancienne solution de localisation autonome |
| `1012-` | Module combiné GSM/GPS | sans suffixe / `001` à `003` | `1012-002` indiqué comme version recommandée, `1012-003` comme compatible 2G/3G |
| `0756-` | Télécommande radio 868 | `001` à `062` | Suite de numéros sans colonne SW propre |
| `0759-` | Avertisseur de gaz radio 868 | `002` à `026` | `0759-003` comporte une mention de rappel dans la source |
| `0761-` | Boucle de câble radio 868 | `001` à `020` | WiPro SW `3.4` ou version ultérieure documentée à partir de `0761-008` |
| `0944-` | Boucle de câble radio 868 XL | `001` à `017` | WiPro SW `3.4` ou version ultérieure documentée à partir de `0944-004` |
| `1068-` | Boucle de câble radio 868 noire | `001` à `020` | WiPro SW `3.4` ou version ultérieure documentée à partir de `1068-003` |
| `1074-` | Boucle de câble radio 868 XL noire | `001` à `029` | WiPro SW `3.4` ou version ultérieure documentée à partir de `1074-003` |
| `0791-` | Liste de série du contact magnétique radio 868 | `001` à `056` | Confirmer l’affectation du produit sur la plaque signalétique ou dans le registre des articles avant toute réponse d’assistance |
| `0089-` | Sirène de secours 12 V | `001` à `012` | Suite de numéros sans colonne SW propre |
| `0190-` | Sirène supplémentaire 12 V | sans suffixe régulier jusqu’à `012` | Ancienne version documentée sans suffixe régulier |
| `0734-` | Sirène de secours 24 V | sans suffixe / `002` à `008` | La première série commence par une ancienne version sans suffixe |
| `0095-` | Sirène WiPro easy | `001` à `004` | Petite série d’accessoires de la ligne WiPro easy |
| `5339-` | Klaxon supplémentaire avec kit de relais | `001` à `014` | Les premières lignes de la source contiennent la faute `5539-` ; `5339-` est cohérent à partir de `003` |
| `5750-` | G.A.S.-connect | `001` à `006` | Avertisseur de gaz radio alimenté par le véhicule ; pas de pile CR2032 |
| `5753-` | Détecteur de fumée radio T.S.A. blanc | `001` à `007` | Ligne de série propre à la couleur |
| `5754-` | Détecteur de fumée radio T.S.A. gris | `001` à `006` | Ligne de série propre à la couleur |
| `1052-` | Carte de conversion safe.lock | `001` à `019` | Logiciel `V1.0` à `1.7` ; la dernière entrée de la source mentionne un point jaune sur le sachet ESD |
| `5237-` | WiPro easy | `001` à `004` | Logiciel `1.0` à `1.0.1` dans la source |
| `1286-` | G.A.S.-pro III KW | `001` à `046` | Logiciel `V1.2` à `1.7.8` dans la source |
| `1287-` | G.A.S.-pro III CO | jusqu’à `018` | Premier enregistrement incomplet ; branche logicielle documentée jusqu’à `1.7.8` |

### G.A.S.-pro III — seuil fonctionnel

| À partir du numéro de série | Fonction |
|-----------------------------|----------|
| `1286-010` / `1287-010` | Redémarrage automatique au retour de l’alimentation principale, à condition que l’appareil ait été allumé avant l’interruption |

Les plages de numéros sans colonne SW servent surtout à identifier le produit, la variante, l’âge et la garantie. Ne pas en déduire une compatibilité fonctionnelle non documentée. Les détails sur l’avertisseur de gaz figurent dans [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]].

---

## Cas Legacy et cas particuliers

### 0001-xxx / ancien schéma SN40/SN50 — G.A.S.-pro

| Version | Pertinence documentée |
|---------|-----------------------|
| `SN40/SN50-xxxxx` avant 2013 | Ancien schéma des préséries et premières séries ; les appareils jusqu’à `SN40-24000` nécessitent une mise à jour logicielle si le capteur standard signale une erreur de capteur |
| `0001-003` / `1.04i` | Décrit comme logiciel recommandé dans la source ; détection du capteur CO documentée à partir de 2017 |
| `0001-013` | Dernière entrée visible de la liste de numéros de série disponible |

### 1011-xxx — C.A.S. III

| À partir du numéro de série | SW | Pertinence documentée |
|-----------------------------|----|-----------------------|
| `1011-005` | `CAS3.20` | Prise en charge du détecteur d’eau sans fil documentée pour la première fois ; une alarme d’eau est traitée comme une alarme de gaz |
| `1011-007` | `CAS3.21` | Remarque 2G/3G ajoutée |

Dans les listes disponibles, les préfixes `0061-` et `0104-` servent principalement à déterminer l’âge et la garantie. Aucun jalon logiciel propre et fiable n’y est documenté.

---

## Seuils fonctionnels documentés

| Fonction / sujet | Produit | Version minimale |
|------------------|---------|------------------|
| Fonctions de base de l’application | WiPro III | `0823-018` |
| Fonctions de base de l’application | WiPro III safe.lock | `1050-004` |
| Verrouillage centralisé et Easy-Add 3.0 | WiPro III safe.lock / kit Ford / kit Sprinter | `1050-004` / `5298-001` / `5458-001` |
| Fonction combinée « verrouiller et armer » | WiPro III safe.lock | `1050-006` |
| Fonctions de base de l’application et Easy-Add 3.0 | Pro-Finder | `0699-013` |
| Fonction combinée « verrouiller et armer » | Pro-Finder | `0699-015` |
| 4G LTE et Nano-SIM | Pro-Finder | `0699-045` |
| Détecteur d’eau sans fil | WiPro III | `0823-021` / `6.8` |
| Détecteur d’eau sans fil | WiPro III safe.lock | `1050-004` / `6.7s` |
| Détecteur d’eau sans fil | Kit Ford | `5298-001` / `7.4.0s` |
| Détecteur d’eau sans fil | Kit Sprinter | `5458-001` / `1.0.5sx` |
| Ford Transit / Custom 2024+ safe.lock | Kit Ford | `5298-005` / `1.0.1sf` |
| Correction de la protection contre le verrouillage accidentel pour Ford Transit 2019–2024 avec Pro-Finder | Kit Ford | `5298-008` / `1.0.3sf` |
| Mise à niveau safe.lock du Mercedes Sprinter VS30 | WiPro III | `0823-019` |
| Mercedes Sprinter VS30 avec quatre clés | WiPro III | `0823-034` |
| VW Crafter / MAN TGE 2025+ avec bouton de démarrage | kit Sprinter `105458` | aucun seuil minimum public actuel ; validation spécifique au véhicule requise |
| Redémarrage automatique | G.A.S.-pro III KW / CO | `1286-010` / `1287-010` |

Les détails fonctionnels et les conditions supplémentaires figurent dans [[THITRONIK® App — commandes, configuration et dépannage]], [[WiPro III — système d'alarme radio pour véhicules de loisirs]] et [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]].

---

## Contrôle par l’assistance et escalade

1. Relever la désignation du produit et le numéro de série complet directement sur la plaque signalétique.
2. Relever séparément la version logicielle réelle dans l’application, l’affichage d’état, le diagnostic ou les documents de service.
3. Ajouter le véhicule, l’année modèle, la variante de clé et l’état de l’installation.
4. Rechercher la fonction souhaitée dans le tableau « Seuils fonctionnels documentés ».
5. Vérifier les autres conditions sur la page du produit ou du véhicule.
6. En cas de marquage contradictoire, de plaque illisible ou d’écart lié à la sécurité, ne pas émettre d’hypothèse. Procéder à une escalade avec une photo et les données complètes du dossier.

> **Aucune déclaration de compatibilité fondée uniquement sur une valeur de remplacement :** Les numéros de série de référence utilisables dans l’application pour un appareil inconnu servent uniquement à choisir un profil. Ils ne mettent à jour ni le matériel ni le logiciel et n’activent aucune fonction.

Un contrôle par l’assistance est requis en présence d’une mention de rappel, d’un risque connu de verrouillage accidentel, d’une immobilisation du véhicule mal définie ou d’un écart entre le numéro de série et la version logicielle affichée.

---

## Renvois

- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
- [[Registre des numéros d’article — produits et accessoires THITRONIK documentés]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[THITRONIK® App — commandes, configuration et dépannage]]
- [[BT-connect — Module Bluetooth pour WiPro III]]
- [[Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth]]
- [[Détecteur d'eau sans fil 868 — détecteur d'eau sans fil]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
