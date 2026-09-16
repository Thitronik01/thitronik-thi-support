---
title: >-
  Adria Coral / Matrix (à partir de l'année modèle 2021) — informations sur le
  montage du camping-car
sources:
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/installationshinweise-wipro-iii-und-wipro-iii-safe.lock-adria-coral-und-matrix-ab-mj-2021.pdf
  - >-
    D:/Anleitungen/Anleitungen/01_Quellanleitungen/WiPro
    III/wipro_iii-installationsanleitung_1.8.pdf
updated: '2026-07-19'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/adria-coral-matrix.md
---

# Adria Coral / Matrix (à partir de l'année modèle 2021) — informations sur le montage du camping-car

Sur les Adria Coral et Matrix à partir de l’année-modèle 2021 équipés de la **nouvelle version de la porte de cellule**, la conception électrique du contact de porte de cellule peut déclencher régulièrement une alarme du bus CAN après l’installation d’une WiPro III ou d’une WiPro III safe.lock. Cet article décrit la modification prévue pour la cellule Adria.

> **Délimitation :** il ne s’agit pas d’une configuration distincte du véhicule de base. Le réglage DIP, le raccordement CAN et toutes les autres affectations de câbles dépendent exclusivement des instructions actuelles du véhicule de base effectivement utilisé et de la version WiPro installée.

## Champ d’application

| Caractéristique | Prescription |
|---|---|
| Constructeur de la cellule | Adria |
| Gammes | Coral et Matrix |
| Année-modèle | à partir de 2021 |
| Version de porte | nouvelle version de la porte de cellule |
| Système d’alarme | WiPro III ou WiPro III safe.lock |
| Version de la source | août 2021 |

Si le véhicule, la cellule, le connecteur, la couleur du câble ou la situation de montage diffère de l’illustration du fabricant, ne pas couper le câble sur la base d’une supposition. Contacter alors le constructeur du véhicule ou l’assistance THITRONIK.

## Symptôme et cause

Après l’installation du système d’alarme, une alarme du bus CAN se déclenche à intervalles réguliers de **15 minutes**, bien qu’aucune intrusion n’ait eu lieu.

La cause réside dans l’installation électrique choisie par Adria pour le contacteur de porte de cellule. Ses signaux sont interprétés par la WiPro III ou la WiPro III safe.lock comme un déclenchement d’alarme.

| Observation | Interprétation |
|---|---|
| Alarme environ toutes les 15 minutes | symptôme typique couvert par cette note relative à la cellule |
| Source de l’alarme | évaluation du contact de porte de cellule via le bus CAN |
| Solution | désactiver la surveillance d’origine par ce contact et la remplacer par un contact radiomagnétique 868 |

## Modification requise

La surveillance d’origine de la porte de cellule via le circuit Adria concerné est désactivée. Un [[Contact radiomagnétique 868 — montage et fonctionnement|contact radiomagnétique 868]] assure ensuite la surveillance de la porte de cellule.

> **Important :** si le contact radiomagnétique n’est pas monté et correctement mémorisé, la porte de cellule n’est plus surveillée par la WiPro après la coupure du câble.

## Sécurité et préparation

- Faire réaliser les travaux sur les systèmes électriques et électroniques du véhicule par un atelier spécialisé qualifié.
- Respecter les consignes générales de sécurité du manuel d’installation WiPro ainsi que les prescriptions du véhicule de base.
- Avant les travaux électriques, mettre le véhicule et le système d’alarme hors tension conformément aux instructions applicables.
- Avant de le couper, identifier clairement le **câble blanc/marron** à l’aide de l’illustration d’origine du fabricant et de la situation de montage réelle.
- Isoler correctement les entrées et sorties inutilisées ainsi que les deux extrémités du câble coupé.
- En cas de différence par rapport à la version documentée, interrompre le travail et obtenir une validation technique.

## Étapes de travail

1. Accéder à l’interface du constructeur de la cellule au niveau du **montant B, côté passager**.
2. Comparer le connecteur et le cheminement des câbles avec l’illustration du fabricant.
3. Identifier clairement le **câble blanc/marron**.
4. Couper le câble blanc/marron à l’endroit documenté.
5. Isoler séparément et durablement les deux extrémités du câble afin de les protéger contre les courts-circuits.
6. Monter un contact radiomagnétique 868 sur la porte de cellule.
7. Mémoriser le contact radiomagnétique dans la WiPro conformément au [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|processus d’apprentissage]].
8. Remettre le système en service et effectuer le contrôle fonctionnel complet.

La position de montage, les distances et le mode de fixation du contact radiomagnétique sont indiqués dans [[Contact radiomagnétique 868 — montage et fonctionnement|ses propres instructions de montage]].

## Configuration DIP et véhicule de base

La note relative à la cellule Adria ne prescrit **aucune combinaison DIP distincte**. Cette modification ne justifie pas une modification générale de la position des commutateurs.

1. Identifier le véhicule de base et son année-modèle.
2. Consigner le numéro de série et la version logicielle de la WiPro.
3. Reprendre le réglage DIP des instructions actuelles propres au véhicule.
4. Pour un Fiat Ducato 8/9 de 2022–2024, respecter également les indications de la page [[Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022-2024)|Fiat Ducato 2022–2024]].

D’autres profils figurent dans la [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## Résultat de la modification

Selon la note du fabricant, les fonctions suivantes sont assurées après une installation correcte :

- Le verrouillage centralisé d’origine reste entièrement fonctionnel.
- Les portes avant du véhicule peuvent également être verrouillées lorsque la porte de cellule est ouverte.
- Le contact radiomagnétique 868 rétablit la surveillance de la porte de cellule par le système d’alarme.
- Le déclenchement récurrent de l’alarme du bus CAN provoqué par le contact de porte de cellule d’origine est supprimé.

## Contrôle fonctionnel

1. Fermer toutes les portes du véhicule et de la cellule.
2. Armer la WiPro et vérifier que le système accepte le contact radiomagnétique fermé.
3. Ouvrir la porte de cellule et vérifier que le contact radiomagnétique déclenche une alarme.
4. Laisser la porte de cellule ouverte et vérifier que les portes avant du véhicule peuvent toujours être verrouillées.
5. Tester séparément chaque autre porte surveillée et chaque accessoire radio.
6. Déclencher une alarme d’essai complète et contrôler la sirène ou le klaxon ainsi que les clignotants.
7. Laisser le système armé plus longtemps que l’ancien intervalle de 15 minutes et vérifier qu’aucune alarme injustifiée du bus CAN ne se produit.

## Si le défaut persiste

| Contrôle | Mesure |
|---|---|
| L’alarme se déclenche toujours toutes les 15 minutes | Vérifier que le bon câble blanc/marron a été sélectionné et complètement sectionné. |
| La porte de cellule ne déclenche aucune alarme | Vérifier le montage, la distance, la pile et l’état de mémorisation du contact radiomagnétique. |
| Le verrouillage centralisé se comporte de manière inattendue | Cesser toute modification et contrôler les extrémités isolées ainsi que les raccordements propres au véhicule ; ne couper aucun autre câble sur la base d’une supposition. |
| Le véhicule diffère de l’illustration | Contacter le constructeur ou l’assistance THITRONIK et obtenir une validation spécifique au véhicule. |

D’autres contrôles portant sur l’ensemble du système sont décrits sous [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Source

- THITRONIK, *Instructions d’installation pour WiPro III et WiPro III safe.lock — Adria, Coral et Matrix à partir de l’année-modèle 2021, nouvelle version de la porte de cellule*, version `08/21`, deux pages.

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d’apprentissage]]
- [[Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022-2024)|Fiat Ducato 2022–2024]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
