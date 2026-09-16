---
title: Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth
sources:
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/alarmanlagen/anleitungen/vernetzungsmodul-de_en_fr.pdf
  - 'https://www.thitronik.de/produkte/produkt/bluetooth-vernetzungsmodul/'
  - sources/Vernetzungsmodul.docx
  - sources/Apple Watch app Info von Jan.docx
  - sources/Sicherheitslücken BluetoothSMS; Spoofing.docx
  - sources/Vernetzungsmodul und BT Connect unterschiede.md
  - sources/Vernetzungsmodul_101290__Overview_DE.md
  - sources/Vernetzungsmodul_101290__Reference__Technische_Daten_DE.md
  - sources/Vernetzungsmodul_101290__Reference__Lieferumfang_DE.md
  - sources/Vernetzungsmodul_101290__Guide__Anschluss_Montage_DE.md
  - sources/Vernetzungsmodul_101290__HowTo__App_Anlernen_Koppeln_DE.md
  - sources/Vernetzungsmodul_101290__HowTo__Geraete_loeschen_Reset_DE.md
  - >-
    sources/Vernetzungsmodul_101290__Safety__Spannung_trennen_vor_Massearbeiten_DE.md
  - sources/Vernetzungsmodul_101290__Safety__Wichtiger_Hinweis_Haftung_DE.md
  - sources/Fragen zu Bluetooth-Vernetzungsmodul.pdf
  - >-
    sources/Kompatibilität Smartphone-Smartwatch mit Vernetzungsmodul Stand
    08.23.pdf
  - sources/Seriennummer 1290 Bluetooth-Vernetzungsmodul.csv
  - wiki/bt-connect.md
  - wiki/app-befehle.md
  - wiki/stoerungsbeseitigung.md
updated: '2026-07-16'
confidence: high
lang: fr
translation_of: de/vernetzungsmodul.md
---

# Module Bluetooth de mise en réseau — commande par smartphone via Bluetooth

**Réf. 101290 · Préfixe du numéro de série 1290-**

Le module Bluetooth de mise en réseau connecte un smartphone ou une montre connectée compatible, dans la portée Bluetooth locale, à une WiPro III ou WiPro III safe.lock. Il se commande au moyen de l’application THITRONIK®. Un Pro-Finder déjà installé peut être intégré à la même architecture par la seconde prise RJ10.

> **Produit antérieur :** la documentation du projet indique que le module Bluetooth de mise en réseau est arrêté depuis septembre 2025 et que [[BT-connect — Module Bluetooth pour WiPro III|BT-connect]] lui succède. Vérifier la disponibilité réelle avant toute commande ou promesse de pièce de rechange.

---

## Caractéristiques techniques

| Paramètre | Valeur documentée |
|---|---|
| Référence | `101290` |
| Préfixe du numéro de série | `1290-` |
| Alimentation électrique | 12/24 V CC |
| Consommation électrique | env. 4 mA |
| Liaison radio | Bluetooth® 5.0 Low Energy |
| Portée en champ libre | env. 10 m |
| Interfaces | 2× prises RJ10 équivalentes pour WiPro III (safe.lock) et Pro-Finder |
| Plage de température | –20 °C à +80 °C |
| Dimensions L × H × P | 52 × 25 × 56 mm |
| Poids | env. 72 g |
| Appareils appairables | 8 au maximum |

La portée en champ libre n’est pas garantie dans le véhicule. L’emplacement de montage, les surfaces métalliques, le blindage, les autres sources radio et le terminal utilisé peuvent réduire la portée Bluetooth exploitable.

---

## Contrôle rapide

- Vérifier l’identité du produit : **réf. 101290**, préfixe du numéro de série **1290-**.
- Ne pas le confondre avec BT-connect, réf. `106000` et préfixe `6000-`.
- Contrôler la WiPro III ou WiPro III safe.lock, l’alimentation électrique et la liaison RJ10.
- Pour le premier appairage, préparer le smartphone ou la montre connectée, activer le Bluetooth et disposer de l’application THITRONIK®.
- Choisir un emplacement où le bouton et la LED bleue restent accessibles pour l’appairage et la réinitialisation.
- Si un Pro-Finder est installé, utiliser les deux prises RJ10 équivalentes dans n’importe quel ordre.
- N’effectuer une réinitialisation complète qu’en connaissance de cause : elle efface **tous** les terminaux enregistrés dans le module.
- Ne pas prévoir le smartphone ou la montre connectée comme unique moyen d’accès au véhicule.
- Tester séparément l’armement/désarmement et le verrouillage/déverrouillage.

---

## État du produit et distinction par rapport à BT-connect

| Caractéristique | Module Bluetooth de mise en réseau | BT-connect |
|---|---:|---:|
| Référence | `101290` | `106000` |
| Préfixe du numéro de série | `1290-` | `6000-` |
| Classification | ancien produit en parc | successeur documenté |
| Consommation électrique | env. 4 mA | env. 1,5 mA |
| Appareils appairables | 8 au maximum | 9 au maximum |
| Tableaux de compatibilité et logiciels | versions propres à la gamme 1290- | versions propres à la gamme 6000- |

Les informations relatives aux versions de série, aux montres connectées, aux LED et à la réinitialisation ne doivent pas être transférées d’une gamme à l’autre. Une indication isolée sur un site web ou une boutique ne suffit pas à identifier le produit sans comparaison de la référence, de la plaque signalétique et du numéro de série.

---

## Rôle du produit et limites fonctionnelles

| Fonction | Condition / classification |
|---|---|
| Armer et désarmer la WiPro III | WiPro III compatible, module de mise en réseau opérationnel et application appairée |
| Armer et désarmer la WiPro III safe.lock | système safe.lock compatible et application appairée |
| Verrouiller et déverrouiller le véhicule | WiPro III safe.lock compatible, connexion véhicule prise en charge et version logicielle appropriée |
| Commande par smartphone ou montre connectée | terminal compatible, versions appropriées du système d’exploitation et de l’application, et appairage réussi |
| Commande à distance hors de la portée Bluetooth | impossible avec le module de mise en réseau ; une voie séparée via Pro-Finder peut être disponible |
| Déverrouillage automatique à l’approche | non documenté ; la commande nécessite une action volontaire dans l’application ou sur la montre |

L’armement/désarmement et le verrouillage/déverrouillage sont des fonctions distinctes. Une liaison Bluetooth fonctionnelle ne confirme pas automatiquement que le verrouillage centralisé du véhicule concerné peut être commandé. Les voies d’accès sont classées sous [[Supports d’accès et commande — voies d’accès dans le système THITRONIK]].

---

## Architecture avec WiPro et Pro-Finder

Le module de mise en réseau possède deux prises RJ10 équivalentes :

| Connexion | Raccordement / fonction |
|---|---|
| Prise RJ10 1 | WiPro III, WiPro III safe.lock ou Pro-Finder |
| Prise RJ10 2 | WiPro III, WiPro III safe.lock ou Pro-Finder |
| GND | masse du véhicule |
| 12/24 V | alimentation permanente en parallèle avec la WiPro III et/ou le Pro-Finder |

Avec une combinaison de WiPro et de Pro-Finder, l’affectation des deux prises RJ10 est indifférente. Le module de mise en réseau assure alors la commande Bluetooth locale ; selon sa configuration, le Pro-Finder fournit une voie de commande mobile/SMS séparée. Les deux voies doivent être traitées séparément sur les plans technique et diagnostique.

---

## Contenu de la livraison

- Module Bluetooth de mise en réseau
- Faisceau de câbles
- Câble RJ10
- Matériel de montage

Pour les appareils existants, vérifier le contenu réel de la livraison. Ne pas remplacer les câbles ou éléments de montage manquants par des pièces non vérifiées qui ne font que s’adapter mécaniquement.

---

## Raccordement et montage

1. Choisir un emplacement approprié à proximité de la WiPro III.
2. S’assurer que le bouton, la LED bleue et les connecteurs restent accessibles après le montage.
3. Raccorder la WiPro III ou WiPro III safe.lock à l’une des deux prises avec le câble RJ10 fourni.
4. Si nécessaire, raccorder un Pro-Finder existant à la seconde prise RJ10.
5. Raccorder GND et l’alimentation permanente 12/24 V conformément au faisceau de câbles documenté.
6. Brancher l’alimentation en parallèle avec la WiPro III et/ou le Pro-Finder.
7. Avant la fixation définitive, tester l’appairage, la commande de l’alarme et, le cas échéant, le verrouillage centralisé.
8. Poser les câbles avec un dispositif anti-traction et les protéger contre l’abrasion, l’écrasement et l’humidité.

> **Avertissement pour les travaux sur la masse :** avant toute intervention sur la connexion à la masse de la WiPro III et/ou du Pro-Finder, débrancher d’abord la fiche d’alimentation du module de mise en réseau.

Les interventions sur le système électrique du véhicule exigent des connaissances spécialisées. Si l’affectation des fils est incertaine, si la protection manque ou si le faisceau diffère, le montage doit être effectué par du personnel qualifié.

---

## Préparer l’appairage

- Vérifier sans ambiguïté que l’appareil porte la réf. `101290` ou le préfixe `1290-`.
- Contrôler l’alimentation et la liaison RJ10.
- Utiliser la version actuellement disponible de l’application THITRONIK®.
- Activer le Bluetooth sur le smartphone ou la montre connectée.
- Garder le terminal déverrouillé et à portée.
- Consigner les entrées existantes telles que « Thitronik NM » dans les réglages Bluetooth avant de les effacer.
- Vérifier si un autre terminal est actuellement connecté au module.
- Avant une réinitialisation complète, déterminer quels autres utilisateurs devront rétablir leur appairage.

La compatibilité de l’application, du smartphone et de la montre connectée peut changer après une mise à jour du système d’exploitation ou de l’application. Les versions minimales historiques ne constituent donc pas une preuve de fonctionnement permanente.

---

## Appairer un smartphone ou une montre connectée

La procédure de base documentée dans la notice est la suivante :

1. Ouvrir l’application THITRONIK®.
2. Ouvrir les **réglages du véhicule**.
3. Sélectionner le **module de mise en réseau** ou cocher sa case.
4. Suivre les instructions à l’écran et placer le module en mode d’appairage lorsque l’application le demande.
5. Confirmer l’appairage Bluetooth affiché sur le smartphone ou la montre connectée.
6. Terminer la procédure dans l’application.
7. **Enregistrer les paramètres** à la fin.
8. Tester séparément l’armement/désarmement et, le cas échéant, le verrouillage/déverrouillage.

Avec une montre connectée, une confirmation ou un appairage supplémentaire dans l’application de la montre peut être nécessaire. L’interface exacte dépend de l’application, du système d’exploitation et de la version de l’appareil ; ne pas supposer que les libellés restent toujours identiques. Les fonctions générales de l’application sont décrites sous [[THITRONIK® App — commandes, configuration et dépannage]].

---

## Effacer tous les appareils enregistrés

Une réinitialisation complète supprime tous les smartphones et montres connectées enregistrés dans le module :

1. Couper l’alimentation du module de mise en réseau.
2. Maintenir le bouton du module enfoncé.
3. Rétablir l’alimentation tout en maintenant le bouton enfoncé.
4. Continuer à maintenir le bouton jusqu’à ce que la LED bleue **reste allumée**.
5. Relâcher le bouton ; tous les appareils initialisés sont effacés et le mode d’initialisation est simultanément actif.
6. Effacer également le module de mise en réseau dans les réglages Bluetooth des terminaux concernés.
7. Appairer ensuite individuellement chaque smartphone et montre connectée requis via l’application THITRONIK®.
8. Tester toutes les fonctions de commande de manière contrôlée.

Il n’est pas documenté que les appareils enregistrés dans le module puissent être effacés individuellement. Une réinitialisation peut donc également supprimer les appairages d’autres utilisateurs autorisés.

---

## LED et état de la mémoire

| Réaction de la LED | Signification documentée |
|---|---|
| reste allumée en bleu | mode d’initialisation/d’appairage actif ; après la séquence de réinitialisation, tous les appareils enregistrés sont également effacés |

Ne pas déduire d’autres couleurs ou modes de clignotement des informations relatives à BT-connect. Pour une demande d’assistance, consigner aussi littéralement que possible la couleur, le mode d’éclairage, le moment et la séquence bouton/fiche précédente.

Le module enregistre au maximum **8 terminaux**. Le remplacement de la batterie du véhicule ou une brève interruption de l’alimentation ne correspond pas à la réinitialisation complète documentée ; si l’état de la mémoire est incertain, vérifier d’abord les appairages existants.

---

## Compatibilité historique des smartphones et montres connectées

Les informations suivantes constituent un état de compatibilité documenté en **août 2023**, et non une validation permanente pour les systèmes d’exploitation actuels :

| Version du produit | Logiciel | iPhone | Android | Apple Watch | Wear OS 2 | Wear OS 3 |
|---|---|---|---|---|---|---|
| toutes les versions 1290 documentées | toutes | iOS 12.0 ou supérieur | Android 5.1.1 ou supérieur | selon la version série/logicielle | selon la version série/logicielle | selon la version série/logicielle |
| `1290-001` | `V1.6` | ✓ | ✓ | watchOS 7.0 ou supérieur | — | — |
| `1290-002` à `1290-009` | `V2.0` | ✓ | ✓ | watchOS 7.0 ou supérieur | ✓ | — |
| `1290-010` et versions ultérieures | `V2.1.0` | ✓ | ✓ | watchOS 7.0 ou supérieur | ✓ | ✓ |

Une note interne Apple Watch antérieure indiquait watchOS 6 ou supérieur pour un déploiement à l’époque. Pour l’état documenté d’août 2023, le tableau avec watchOS 7.0 ou supérieur fait foi. Avant toute promesse actuelle, toujours évaluer conjointement le terminal, le système d’exploitation, la version de l’application, le numéro de série, la version logicielle et la fonction souhaitée.

Les montres Garmin ne sont pas validées dans la matrice de compatibilité documentée. Une version de développement non publiée ne permet pas de déduire une compatibilité produit.

---

## Numéros de série et versions logicielles

| Numéro de série / seuil | Version logicielle | Classification documentée |
|---|---|---|
| `1290-001` | `V1.6` | prise en charge de l’Apple Watch ; Wear OS 2 et 3 pas encore pris en charge |
| `1290-002` à `1290-009` | `V2.0` | prise en charge de Wear OS 2 |
| à partir de `1290-010` | `V2.1.0` | prise en charge de Wear OS 3 et mode d’initialisation à deux étapes |
| à partir de `1290-012` | `V2.2.2` | pas de bus CI ; nouvel appairage simplifié après la perte d’un appairage |
| `1290-019` | `V2.2.2` | dernière entrée de la liste interne de numéros de série disponible |

Ce tableau décrit les seuils documentés de la gamme 1290-. Il ne prouve pas que chaque version ultérieure du système d’exploitation reste compatible. Les autres préfixes et seuils figurent sous [[Numéros de série et versions logicielles — préfixes, seuils et jalons]].

---

## Sécurité et accès indépendant

- Le module de mise en réseau fonctionne dans la portée Bluetooth locale et ne déverrouille pas le véhicule du seul fait qu’un terminal appairé se trouve à proximité.
- La commande nécessite une action volontaire dans l’application ou sur la montre connectée.
- N’effectuer l’appairage Bluetooth qu’avec des terminaux clairement autorisés.
- En cas de perte ou de cession d’un terminal, réinitialiser tous les appareils enregistrés et appairer de nouveau les appareils toujours autorisés.
- Ne pas prévoir le smartphone ou la montre connectée comme unique moyen d’accès au véhicule.
- Si la liaison Bluetooth ne peut pas être établie, le véhicule ne peut pas être déverrouillé via le module de mise en réseau.
- Emporter un moyen d’accès indépendant, par exemple un émetteur radio 868 ou la clé d’origine, à condition que son comportement ait été vérifié pour le profil du véhicule.
- Avant de quitter le véhicule, contrôler l’état réel de l’alarme et du verrouillage.

La sécurité SMS et la commande mobile à distance appartiennent à la voie de commande séparée du Pro-Finder et ne doivent pas être évaluées comme des propriétés Bluetooth du module de mise en réseau.

---

## Cerner systématiquement les défauts

| Observation | Contrôle sûr / mesure |
|---|---|
| le module n’est pas trouvé dans l’application | vérifier l’identité du produit, l’alimentation 12/24 V, la liaison RJ10, le Bluetooth et les autorisations de l’application ; exclure une autre connexion active |
| la LED bleue ne reste pas allumée | vérifier la séquence bouton/alimentation ; pour une réinitialisation complète, couper l’alimentation, maintenir le bouton et rétablir l’alimentation |
| l’appairage échoue après un changement d’appareil ou de système d’exploitation | supprimer l’ancienne entrée dans l’application et les réglages Bluetooth ; si nécessaire, effectuer une réinitialisation complète et appairer à nouveau tous les appareils requis |
| l’appareil Android ne trouve pas le module pendant l’appairage | à titre de mesure d’assistance dépendante de la version, désactiver temporairement le Wi-Fi, redémarrer le smartphone et répéter l’appairage |
| la montre Wear OS ne se connecte plus après une mise à jour | vérifier l’autorisation **Appareils à proximité** de l’application THITRONIK® sur la montre, puis recommencer l’appairage |
| la nouvelle Apple Watch ne reprend pas l’ancien appairage | supprimer les anciennes entrées « Thitronik NM » de l’iPhone et de la Watch ; réinitialiser le module si nécessaire et reconfirmer l’appairage dans l’application et l’app Watch |
| le smartphone est appairé, mais la WiPro ne réagit pas | vérifier la liaison RJ10, l’état de la WiPro et l’affectation du module ; ne pas assimiler un appairage Bluetooth réussi à une liaison d’alarme opérationnelle |
| l’armement fonctionne, mais pas le verrouillage | vérifier séparément la variante safe.lock, la connexion véhicule, le profil du véhicule et la version logicielle |
| la portée est très courte ou instable | vérifier l’emplacement de montage, le métal/blindage, l’environnement radio et le terminal ; déplacer le module en conservant son accessibilité si nécessaire |
| l’état de la mémoire est inconnu | identifier les utilisateurs concernés avant la réinitialisation ; effacer ensuite ensemble les huit emplacements possibles et appairer à nouveau les appareils requis |

La désactivation du Wi-Fi et l’attribution manuelle des autorisations Wear OS sont des mesures d’assistance dépendantes de la version, et non des exigences techniques générales. D’autres procédures de diagnostic figurent sous [[Dépannage — diagnostic sûr des problèmes fréquents]].

---

## Informations à fournir à l’assistance

Pour une évaluation technique, consigner :

- la désignation du produit et la référence `101290`
- le numéro de série complet avec le préfixe `1290-`
- la version logicielle du module de mise en réseau
- la variante WiPro et son numéro de série complet
- le Pro-Finder installé et l’affectation des deux prises RJ10
- le véhicule, son année-modèle et la fonction souhaitée
- le modèle du smartphone ou de la montre connectée
- la version du système d’exploitation et de l’application THITRONIK®
- l’état exact de la LED et le moment de l’indication
- les entrées Bluetooth existantes, le nombre d’appairages connus et le résultat après la réinitialisation
- les résultats séparés pour l’armement/désarmement et le verrouillage/déverrouillage
- la tension d’alimentation, l’emplacement de montage et le résultat du test de portée
- le moyen d’accès indépendant utilisé

La saisie structurée est décrite sous [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]].

---

## Renvois

- [[BT-connect — Module Bluetooth pour WiPro III]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[THITRONIK® App — commandes, configuration et dépannage]]
- [[Supports d’accès et commande — voies d’accès dans le système THITRONIK]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons]]
- [[Normes et interfaces radio]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
- [[Registre des numéros d’article — produits et accessoires]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
