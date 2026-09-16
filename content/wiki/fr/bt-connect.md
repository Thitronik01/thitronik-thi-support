---
title: BT-connect — Module Bluetooth pour WiPro III
sources:
  - sources/BT-connect__Overview_DE.md
  - sources/Fragen zu BT-connect.pdf
  - sources/FAQ_BT-connect_DE.md
  - sources/Vernetzungsmodul und BT Connect unterschiede.md
  - >-
    sources/Kompatibilität Smartphone-Smartwatch mit Vernetzungsmodul Stand
    08.23.pdf
  - sources/Seriennummer 6000 BT-connect.csv
  - sources/BT-connect_DE_RAG_Pack/BT-connect__Reference__Technische_Daten_DE.md
  - sources/BT-connect_DE_RAG_Pack/BT-connect__Snippets_DE.md
  - wiki/app-befehle.md
  - wiki/seriennummern-softwarestaende.md
  - wiki/stoerungsbeseitigung.md
  - wiki/zugang-bedienung.md
updated: '2026-07-15'
confidence: high
lang: fr
translation_of: de/bt-connect.md
dealerStatus: internal_only
---

# BT-connect — Module Bluetooth pour WiPro III

**Réf. 106000 · Préfixe du numéro de série `6000-`**

BT-connect relie un smartphone ou une montre connectée compatible, à proximité via Bluetooth, à la THITRONIK® App et à un WiPro III ou WiPro III safe.lock. Un Pro-Finder peut également être intégré au système par la deuxième prise RJ10.

> **Distinction :** BT-connect est un moyen de commande Bluetooth local. Il ne possède ni connexion mobile ni GPS et ne remplace pas la télécommande, la transmission des alarmes et la localisation via le [[Pro-Finder — Module de télémétrie GSM/GPS]].

---

## Caractéristiques techniques

| Paramètre | Valeur documentée |
|---|---|
| Alimentation | 12 / 24 V CC |
| Consommation de courant | inférieure à 1,5 mA |
| Température de fonctionnement | –20 °C à +70 °C |
| Norme radio | Bluetooth® 5.0 Low Energy |
| Portée en champ libre | 50 m au maximum |
| Appareils mémorisables | 9 au maximum |
| Interfaces | 2 prises RJ10 équivalentes |
| Dimensions L × H × P | 53 × 57 × 26 mm |
| Poids | env. 41 g |

La portée en champ libre n’est pas une valeur garantie dans le véhicule. Les surfaces métalliques, l’emplacement de montage, le blindage, les autres sources radio et l’appareil utilisé peuvent réduire sensiblement la portée utile.

---

## Contrôle rapide

- Vérifier que le module installé est bien un **BT-connect, réf. 106000, préfixe `6000-`**.
- Ne pas confondre BT-connect avec l’ancien module Bluetooth de mise en réseau portant le préfixe `1290-`.
- Préparer le smartphone ou la montre connectée, la version actuelle de la THITRONIK® App et activer le Bluetooth.
- Avant l’appairage, s’assurer qu’aucune autre connexion active au module n’existe.
- Maintenir le bouton enfoncé jusqu’à ce que la LED soit **allumée en bleu de façon continue**, puis effectuer l’appairage dans l’application et enregistrer.
- N’effectuer une réinitialisation complète qu’en connaissance de cause : elle efface tous les appareils mémorisés.
- Après la configuration, tester séparément l’armement/désarmement et le verrouillage/déverrouillage.
- Toujours prévoir un moyen d’accès indépendant, par exemple la télécommande radio 868.

---

## Rôle et limites du produit

BT-connect fournit un accès Bluetooth local au système d’alarme raccordé. Les boutons et fonctions réellement proposés par l’application dépendent de l’ensemble du système.

| Fonction | Condition / classification |
|---|---|
| Armer et désarmer le WiPro | WiPro III ou WiPro III safe.lock compatible et configuration appropriée de l’application |
| Verrouiller et déverrouiller le véhicule | WiPro III safe.lock compatible, raccordement au véhicule pris en charge et version logicielle appropriée |
| Autres fonctions de l’application | dépendent des appareils raccordés, des accessoires, des versions logicielles et du profil du véhicule |
| Commande hors de portée Bluetooth | impossible ; utiliser éventuellement le Pro-Finder |

L’armement/désarmement et le verrouillage/déverrouillage sont des fonctions distinctes. La présence d’un bouton dans l’application ne confirme pas automatiquement que le véhicule prend en charge la fonction au niveau matériel.

Sans connexion Bluetooth active, ce moyen de commande n’est pas disponible. Une batterie de smartphone déchargée, un Bluetooth désactivé, un problème de système d’exploitation ou un appairage perdu peuvent donc empêcher l’accès local.

---

## Gamme de produits et versions de série documentées

| Caractéristique | BT-connect |
|---|---|
| Référence | `106000` |
| Préfixe du numéro de série | `6000-` |
| `6000-001` | logiciel `1.0.2`, première série documentée |
| `6000-002` | logiciel `1.0.2`, dernière entrée de la liste de numéros de série disponible |

La dernière entrée d’une liste disponible indique uniquement la fin de cette source et non l’appareil le plus récent actuellement commercialisé. Consigner séparément le numéro de série complet et, s’il peut être déterminé, la version logicielle ; voir [[Numéros de série et versions logicielles — préfixes, seuils et jalons]].

### Distinction par rapport au module Bluetooth de mise en réseau

| Caractéristique | Module Bluetooth de mise en réseau | BT-connect |
|---|---|---|
| Référence | `101290` | `106000` |
| Préfixe du numéro de série | `1290-` | `6000-` |
| Rôle du produit | ancien module Bluetooth | successeur documenté pour les nouvelles installations |
| Consommation de courant | env. 4 mA | inférieure à 1,5 mA |
| Appareils mémorisables | 8 au maximum | 9 au maximum |
| Portée documentée en champ libre | env. 10 m | 50 m au maximum |

La documentation indique que le module Bluetooth de mise en réseau est arrêté depuis septembre 2025 et que BT-connect lui succède. Vérifier la disponibilité réelle avant toute commande. Les indications relatives aux versions de série, aux montres connectées et à la réinitialisation de la gamme `1290-` ne doivent pas être appliquées sans vérification à la gamme `6000-` ; voir [[Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth]].

---

## Conditions requises et compatibilité

La configuration nécessite :

- un BT-connect dont l’alimentation est correctement raccordée ;
- un WiPro III ou WiPro III safe.lock compatible ;
- la version actuelle de la THITRONIK® App ;
- un smartphone ou une montre connectée avec Bluetooth activé ;
- pour les fonctions de verrouillage centralisé, un raccordement safe.lock compatible au véhicule.

La compatibilité de l’application, des smartphones et des montres connectées peut évoluer avec les versions du système d’exploitation et de l’application. Avant toute confirmation ferme, vérifier ensemble l’appareil concret, le système d’exploitation, la THITRONIK® App installée et la fonction souhaitée. Les anciennes versions minimales ou la matrice des montres connectées de l’ancien module de mise en réseau ne constituent pas une validation permanente de BT-connect.

La sélection d’une option de véhicule ou d’appareil dans l’application n’étend pas les capacités du matériel installé. Les seuils fonctionnels du WiPro et du Pro-Finder figurent sous [[THITRONIK® App — commandes, configuration et dépannage]].

---

## Montage et raccordement électrique

Installer BT-connect dans l’habitacle sec du véhicule et à proximité du WiPro. Le bouton et la LED doivent rester accessibles pour l’appairage et la maintenance. Poser les câbles avec une décharge de traction, à l’abri des frottements et loin des pièces chaudes ou mobiles.

| Connexion | Raccordement |
|---|---|
| GND, noir | masse du véhicule |
| 12/24 V, rouge | plus permanent protégé par fusible conformément à la notice de montage |
| Prise RJ10 1 | WiPro III / WiPro III safe.lock ou Pro-Finder |
| Prise RJ10 2 | WiPro III / WiPro III safe.lock ou Pro-Finder |

Les deux prises RJ10 sont équivalentes. En cas d’association d’un WiPro et d’un Pro-Finder, l’appareil raccordé à la prise 1 ou 2 n’a donc aucune importance.

> ⚠️ **Travaux électriques :** avant toute intervention sur la masse, l’alimentation ou les appareils raccordés, débrancher le connecteur d’alimentation du BT-connect. Ne modifier le câblage que conformément à la notice de montage correspondante et uniquement par des personnes qualifiées. Isoler les fils inutilisés.

---

## Premier appairage avec la THITRONIK® App

Le nom de certains menus de l’application peut changer selon sa version. La procédure documentée est la suivante :

1. Activer le Bluetooth sur le smartphone ou la montre connectée.
2. Ouvrir la THITRONIK® App et sélectionner le véhicule concerné.
3. Ouvrir les paramètres du véhicule et sélectionner BT-connect comme module installé.
4. Vérifier que BT-connect n’est pas déjà connecté activement à un autre appareil.
5. Maintenir le bouton du BT-connect enfoncé jusqu’à ce que la LED soit **allumée en bleu de façon continue**.
6. Sélectionner **Appairer** dans l’application et confirmer les étapes affichées.
7. Enregistrer le véhicule ou les paramètres.
8. Tester de manière contrôlée la connexion et les fonctions souhaitées à proximité du véhicule.

Si BT-connect apparaît déjà dans les paramètres Bluetooth de l’appareil comme un appairage ancien ou défectueux, supprimer cette entrée avant une nouvelle tentative. Effectuer l’appairage dans la THITRONIK® App et non uniquement dans le menu Bluetooth général du système d’exploitation.

> **Distinguer le mode d’appairage de la réinitialisation :** l’activation du mode d’appairage ne supprime pas automatiquement tous les appareils mémorisés. La réinitialisation complète décrite dans la section suivante les supprime.

---

## Supprimer tous les appareils mémorisés

Une réinitialisation complète est utile après un changement d’appareil, la perte d’un appairage ou un état de la mémoire qui ne peut plus être identifié. Elle supprime **tous** les appareils mémorisés dans BT-connect.

1. Couper l’alimentation du BT-connect.
2. Maintenir le bouton du module enfoncé.
3. Rétablir l’alimentation tout en maintenant le bouton enfoncé.
4. Maintenir le bouton enfoncé jusqu’à ce que la LED soit allumée en bleu de façon continue.
5. Relâcher le bouton ; tous les appareils mémorisés sont supprimés et le mode d’appairage est actif.
6. Supprimer également les anciennes entrées BT-connect des paramètres Bluetooth des smartphones et montres connectées concernés.
7. Appairer ensuite individuellement chaque appareil nécessaire via la THITRONIK® App.

La documentation n’indique pas que des appareils mémorisés puissent être supprimés individuellement sur le module. Avant la réinitialisation, déterminer quels autres utilisateurs devront ensuite reconfigurer leur appairage.

---

## Indication de la LED

| État de la LED | Signification documentée |
|---|---|
| allumée en bleu de façon continue | mode d’appairage actif ; après une réinitialisation complète, la mémoire a également été effacée et le mode d’appairage a démarré |
| état différent ou persistant inconnu | vérifier l’alimentation, la connexion active, la procédure dans l’application et l’observation exacte ; ne pas interpréter sans source |

Consigner aussi fidèlement que possible la couleur de la LED, son type d’allumage et le moment de l’observation. Ne pas appliquer automatiquement à BT-connect les indications de LED de l’ancien module Bluetooth de mise en réseau.

---

## Utilisation sûre et accès de secours

- Avant de quitter le véhicule, vérifier que l’état d’alarme et de verrouillage souhaité a bien été atteint.
- Contrôler séparément l’armement et le verrouillage ainsi que le désarmement et le déverrouillage.
- Ne pas prévoir le smartphone ou la montre connectée comme unique moyen d’accès.
- Emporter une télécommande radio 868 préalablement testée ou un autre moyen d’accès compatible et indépendant.
- Après un changement de smartphone, une mise à jour du système d’exploitation ou une réinstallation de l’application, tester l’appairage avant le départ.
- BT-connect ne convient pas à la télécommande hors de la portée Bluetooth locale ; utiliser éventuellement le Pro-Finder.

La classification des autres supports d’accès et solutions de secours figure sous [[Supports d’accès et commande — voies d’accès dans le système THITRONIK]].

---

## Dépannage systématique

| Observation | Contrôle / mesure sûre |
|---|---|
| BT-connect n’est pas détecté dans l’application | Vérifier l’alimentation et le Bluetooth, exclure une connexion active à un autre appareil et activer le mode d’appairage jusqu’à ce que la LED soit allumée en bleu de façon continue. |
| Une ancienne entrée empêche le nouvel appairage | Supprimer l’entrée sur l’appareil et recommencer l’appairage dans la THITRONIK® App. |
| Le mode d’appairage ne démarre pas | S’assurer qu’aucune connexion active n’existe ; maintenir à nouveau le bouton jusqu’à ce que la LED soit allumée en bleu de façon continue. |
| La connexion échoue après un changement de smartphone ou de système d’exploitation | Supprimer l’ancien appairage des deux côtés ; si nécessaire, effectuer une réinitialisation complète et appairer de nouveau tous les appareils requis. |
| Un bouton manque dans l’application | Vérifier la sélection de l’appareil, la version de l’application, la variante du WiPro, la version logicielle et le profil du véhicule ; si des commandes sont masquées, réduire temporairement la taille de police ou le zoom de l’écran. |
| L’armement fonctionne, mais pas le verrouillage | Évaluer les fonctions séparément ; vérifier la variante safe.lock, le raccordement au véhicule et la version logicielle. |
| Le véhicule ne peut pas être ouvert par Bluetooth | Vérifier la connexion Bluetooth et la batterie du smartphone, puis utiliser un moyen d’accès indépendant ; ne pas déduire la prise en charge d’une fonction de la simple présence d’un bouton dans l’application. |
| La portée est nettement inférieure à 50 m | Ne pas assimiler l’indication en champ libre à l’utilisation dans le véhicule ; vérifier l’emplacement de montage, le blindage métallique, l’appareil et l’environnement radio. |

D’autres procédures de diagnostic figurent sous [[Dépannage — diagnostic sûr des problèmes fréquents]].

---

## Informations destinées à l’assistance

Pour une évaluation technique, consigner :

- la désignation du produit et la référence `106000` ;
- le numéro de série complet avec le préfixe `6000-` ;
- la version logicielle visible, si disponible ;
- la variante du WiPro et son numéro de série complet ;
- la présence éventuelle d’un Pro-Finder et l’affectation des prises RJ10 ;
- le véhicule, l’année modèle et la fonction souhaitée ;
- le modèle du smartphone ou de la montre connectée ;
- les versions du système d’exploitation et de la THITRONIK® App ;
- l’état de la LED et l’ordre exact des actions ;
- les appairages déjà supprimés ou encore présents ;
- le résultat obtenu avec un autre moyen d’accès.

La saisie structurée est décrite sous [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]].

---

## Références croisées

- [[THITRONIK® App — commandes, configuration et dépannage]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth]]
- [[module NFC — Contrôlez le WiPro via NFC]]
- [[Supports d’accès et commande — voies d’accès dans le système THITRONIK]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
- [[Registre des numéros d’article — produits et accessoires THITRONIK documentés]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
