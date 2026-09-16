---
title: Mercedes Sprinter T1N (2000–2006)
sources:
  - sources/wipro_iii_mercedes_sprinter_t1n.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
updated: '2026-07-20'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/mercedes-sprinter-t1n.md
---

# Mercedes Sprinter T1N (2000–2006)

Cet article décrit le raccordement universel d'une WiPro III dans le Mercedes Sprinter T1N des années-modèles 2000 à 2006. La notice de montage spécifique au véhicule, version `12/20`, documente le profil DIP de base, la reprise de l'éclairage intérieur et les deux fils de clignotants. L'alimentation, la masse, l'allumage, la sirène et les règles générales de contrôle sont complétés par le manuel d'installation WiPro III `1.8`.

> **Délimitation :** le T1N est raccordé sans CAN. Des articles distincts, d'autres profils DIP et d'autres points de raccordement s'appliquent au Mercedes Sprinter NCV3/BR906 à partir de 2006 et au VS30/BR907/910 à partir de 2018. L'électronique réellement présente est déterminante, et non la seule date de première immatriculation.

## Champ d'application

| Caractéristique | Prescription |
|---|---|
| véhicule | Mercedes Sprinter T1N |
| années-modèles documentées | 2000–2006 |
| type de raccordement | schéma de raccordement universel, sans bus CAN |
| profil véhicule | `SW1–SW4 OFF` ; source spécifique : « tous les commutateurs désactivés » |
| signal de porte | éclairage intérieur au connecteur à six broches vers le montant A, côté conducteur |
| clignotants | deux fils véhicule séparés |
| source spécifique au véhicule | version `12/20` |
| base de compatibilité | `0823-001 / 2.1` ; vérifier la version réelle de l'appareil et du véhicule |

Voir aussi [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## Priorité des sources et anciennes indications corrigées

| Indication | Décision fondée sur les sources |
|---|---|
| profil DIP | La notice spécifique exige « tous les commutateurs désactivés ». L'ancien profil `SW1` était erroné et appartient, selon le tableau général, aux Sprinter à partir de 2006. |
| années-modèles | Le PDF véhicule limite explicitement le T1N décrit à `2000–2006` ; l'ancienne indication « jusqu'en 2006 » était trop imprécise. |
| bus CAN | Le montage suit le schéma universel sans CAN. Les broches 17 et 18 ne sont pas utilisées ici. |
| surveillance des portes | Le PDF véhicule documente uniquement la reprise de l'éclairage intérieur sur un connecteur à six broches ; aucun contact de porte véhicule séparé n'y est indiqué. |
| alarme acoustique | Le manuel général recommande une sirène dans le compartiment moteur ou une sirène de secours, car le klaxon ne fonctionne qu'avec le contact sur certaines versions du Sprinter. Le caractère « obligatoire » n'est pas étayé. |
| sirène de secours, art. `100089` | documentée dans l'article produit, mais non imposée ni désignée par son numéro dans le PDF T1N |

En cas de contradiction, la notice spécifique au véhicule, plus récente, prévaut. Ne pas reprendre de connecteurs, couleurs de fils ou fonctions non documentés provenant de générations ultérieures du Sprinter.

## Sécurité et contrôle du véhicule

- Les travaux sur l'électricité et l'électronique du véhicule doivent être réalisés uniquement par un atelier qualifié.
- Avant les travaux électriques, débrancher la borne négative de la batterie et des éventuelles batteries auxiliaires selon les prescriptions du constructeur ; tenir compte du code radio et des données volatiles.
- Mettre la WiPro entièrement hors tension avant de l'ouvrir ou de modifier un commutateur DIP. Le connecteur à 20 broches et tout connecteur Pro-finder doivent également être débranchés.
- Isoler séparément chaque entrée et sortie inutilisée contre les courts-circuits.
- Protéger les câbles contre le frottement, la chaleur et les contraintes mécaniques ; ne pas gêner la direction, les pédales, les éléments d'airbag ni aucune autre fonction du véhicule.
- Avant chaque reprise, mesurer ou identifier sans ambiguïté le connecteur, la broche, la couleur, la tension et le comportement de commutation sur le véhicule réel.
- Si le véhicule, le connecteur ou les couleurs diffèrent de la notice, arrêter les travaux et contacter le constructeur ou l'assistance THITRONIK.

Avant de commencer, contrôler et documenter :

1. Le véhicule correspond-il au T1N et à la période documentée `2000–2006` ?
2. L'éclairage intérieur, les deux branches de clignotants et l'allumage fonctionnent-ils correctement ?
3. Quels contacts de cabine, d'habitation et de coffre commandent réellement l'éclairage intérieur ?
4. Existe-t-il des témoins, défauts d'éclairage ou autres défauts électriques ?
5. Quelles ouvertures supplémentaires doivent recevoir des contacts radiomagnétiques ?

## Réglage du profil véhicule

1. Déconnecter complètement la WiPro de son alimentation.
2. Vérifier que ni le connecteur à 20 broches ni un Pro-finder ne sont raccordés.
3. Ouvrir prudemment le boîtier de la centrale.
4. Pour le raccordement universel, placer `SW1`, `SW2`, `SW3` et `SW4` sur `OFF`.
5. Ne modifier les autres commutateurs DIP que pour une fonction spéciale expressément souhaitée et autorisée pour le numéro de série et la version logicielle.
6. Documenter les positions réelles et refermer le boîtier.

> **Risque de confusion :** `SW1 ON` est le profil de base des Mercedes Sprinter à partir de 2006 dans l'ancien tableau général. Il ne s'applique pas au T1N décrit ici.

## Préparation de l'alimentation, de la masse et de l'allumage

Le PDF T1N spécifique ne désigne aucun connecteur ni couleur de fil du véhicule pour ces fonctions. Les points appropriés doivent donc être déterminés à l'aide de la documentation du véhicule et contrôlés électriquement.

| Fonction | Fil / broche WiPro | Prescription du schéma universel |
|---|---|---|
| masse / borne 31 | noir, broche 1 | raccorder à un point de masse fiable du véhicule |
| allumage / borne 15 | jaune, broche 7 | utiliser un fil d'allumage vérifié ; aucune reprise T1N spécifique n'est documentée |
| alimentation / borne 30 | rouge, broche 11 | `+12/24 V` via le fusible `10 A` fourni |

1. Choisir des points appropriés à partir de la documentation du véhicule.
2. Mesurer le plus permanent, la masse et l'allumage avant raccordement.
3. Monter le porte-fusible à un endroit accessible.
4. Réaliser les connexions dans les règles de l'art, les soulager mécaniquement et les isoler.
5. Ne pas encore alimenter la WiPro avant le contrôle de tous les autres raccordements.

## Raccordement de l'éclairage intérieur

Repérer le connecteur à six broches dirigé vers le montant A côté conducteur. Ne pas se fier à la seule couleur : connecteur, broche WiPro, fil véhicule et comportement mesuré doivent tous correspondre.

| Fil / broche WiPro | Fil Mercedes | Fonction |
|---|---|---|
| bleu, broche 20 | rouge/jaune | plus permanent de l'éclairage intérieur |
| bleu/noir, broche 19 | marron/blanc | masse commutée de l'éclairage intérieur |

1. Identifier sans ambiguïté le connecteur à six broches.
2. Vérifier le plus permanent de l'éclairage intérieur sur `rouge/jaune`.
3. Vérifier que `marron/blanc` commute à la masse à l'ouverture d'une porte surveillée.
4. Raccorder le fil bleu, broche 20, à `rouge/jaune`.
5. Raccorder le fil bleu/noir, broche 19, à `marron/blanc`.
6. Ouvrir séparément chaque porte concernée et vérifier le déclenchement du signal.

Les ouvertures de la cellule qui ne commandent pas cet éclairage nécessitent un contact de porte séparé ou un contact radiomagnétique appris. Voir [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

## Raccordement des clignotants

| Fil / broche WiPro | Fil Mercedes | Fonction |
|---|---|---|
| gris, broche 12 | noir/vert | branche de clignotants |
| gris, broche 14 | noir/blanc | branche de clignotants |

1. Identifier clairement les deux fils du véhicule avant de les couper ou de les raccorder.
2. À l'aide des feux de détresse ou des clignotants, vérifier quelle branche est commutée.
3. Raccorder le fil gris, broche 12, à `noir/vert`.
4. Raccorder le fil gris, broche 14, à `noir/blanc`.
5. Isoler les connexions et les protéger contre la traction et le frottement.
6. Après la mise en service, tester séparément les deux côtés puis ensemble pendant une alarme.

Le PDF véhicule documente deux raccordements directs pour le T1N ; il n'exige pas de répartiteur à diodes.

## Prévoir une sirène ou une sirène de secours

Sur certains Sprinter, le klaxon d'origine ne fonctionne que lorsque l'allumage est activé. La WiPro ne peut alors pas l'utiliser comme alarme à l'arrêt. Le manuel général recommande donc une sirène dans le compartiment moteur ou une sirène de secours.

| Version | Raccordement WiPro | Remarque |
|---|---|---|
| sirène standard | blanc, broche 15 | sirène `+12 V` |
| sirène standard | blanc/noir, broche 16 | masse de la sirène |
| sirène de secours | selon sa propre notice | contrôler l'alimentation, le déclenchement et la position de l'interrupteur à clé |

1. Avant le montage, vérifier si le klaxon fonctionne réellement contact coupé.
2. Sinon, choisir une sirène ou une sirène de secours appropriée.
3. Monter l'alarme dans le compartiment moteur, à l'abri de la chaleur, de l'eau et des pièces mobiles.
4. Effectuer le câblage selon la notice de la sirène concernée.
5. Isoler séparément chaque fil inutilisé.
6. Tester séparément l'alarme acoustique après le montage.

La sirène de secours art. `100089` est une option 12 V possible, mais le PDF T1N ne l'impose pas. Choix et raccordement : [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]] et [[Registre des numéros d’article — produits et accessoires THITRONIK documentés|Registre des numéros d’article]].

## Montage de la centrale, de la LED d'état et des accessoires radio

Le PDF véhicule ne définit pas l'emplacement de la centrale WiPro. Choisir un endroit protégé, sec et accessible pour le diagnostic ; ne pas placer l'antenne derrière du métal faisant écran, ne pas la raccourcir ni l'enrouler.

1. Définir l'emplacement de la centrale et de la LED d'état.
2. Contrôler la zone derrière la surface avant de percer et vérifier le diamètre avec la LED réellement fournie ou sa consigne de montage.
3. Apprendre tous les accessoires portant le marquage `868` avant leur montage définitif.
4. Vérifier la bonne réception de chaque émetteur à son emplacement prévu.
5. Fixer la centrale et les câbles de façon qu'aucun élément ne puisse atteindre le pédalier ou une pièce mobile.
6. Ne fixer définitivement les contacts radiomagnétiques qu'après un essai de portée et de fonctionnement réussi.

Détails de l'apprentissage : [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Mise en service et essai fonctionnel

1. Recontrôler tous les raccordements, les isolations et le fusible `10 A`.
2. Confirmer que `SW1–SW4` sont sur `OFF`.
3. Alimenter la WiPro et observer sa réaction au démarrage.
4. Armer le système et vérifier la confirmation par la LED d'état et les clignotants.
5. Ouvrir chaque porte de cabine séparément et vérifier que le signal d'éclairage intérieur déclenche une alarme.
6. Tester individuellement chaque ouverture d'habitation et de coffre équipée de son propre contact.
7. Tester les deux branches de clignotants à l'armement et pendant l'alarme.
8. Tester la sirène ou la sirène de secours avec une véritable alarme d'essai.
9. Désarmer le système et vérifier l'arrêt fiable de l'alarme.
10. Mettre l'allumage et vérifier que l'installation ne déclenche pas d'alarme pendant la conduite.
11. Vérifier enfin que l'éclairage intérieur, les clignotants et toute l'électricité du véhicule fonctionnent toujours correctement.
12. Documenter les positions DIP, points de raccordement, fusible et accessoires installés dans le dossier client.

## Dépannage

| Symptôme | Contrôle et mesure corrective |
|---|---|
| La WiPro ne réagit pas | Contrôler l'alimentation à la broche 11, la masse à la broche 1, le fusible `10 A` et les connecteurs directement sur l'appareil. |
| Comportement incorrect ou instable | `SW1–SW4` doivent être sur `OFF` pour le T1N ; mettre l'installation hors tension avant correction. |
| L'ouverture d'une porte ne déclenche pas d'alarme | Mesurer le connecteur à six broches, les broches 19/20, `rouge/jaune`, `marron/blanc` et le signal de masse commutée de la porte concernée. |
| Seules certaines ouvertures sont détectées | Vérifier quelles portes commandent réellement l'éclairage intérieur ; protéger séparément les autres ouvertures. |
| Les clignotants manquent d'un côté | Contrôler séparément les broches 12/14 et les fils `noir/vert` et `noir/blanc`. |
| Le klaxon reste muet pendant l'alarme | Vérifier son fonctionnement sans allumage ; sinon utiliser la sirène ou sirène de secours installée et contrôler son câblage. |
| Un contact radio fermé est signalé ouvert | Après une coupure d'alimentation, ouvrir et fermer plusieurs fois tous les contacts. |
| Un contact radio n'est pas reçu | Contrôler l'apprentissage, la distance de l'aimant, la position de l'antenne et l'écran métallique. |
| Le véhicule ou les fils diffèrent de la notice | Arrêter les travaux et obtenir une validation spécifique du constructeur ou de l'assistance THITRONIK. |

Autres contrôles systématiques : [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Décision relative aux sources

- La notice spécifique de deux pages *WiPro III – Mercedes Sprinter T1N 2000–2006*, version `12/20`, a été contrôlée intégralement, textuellement et visuellement.
- Elle confirme « tous les commutateurs désactivés », la reprise de l'éclairage intérieur sur le connecteur à six broches et les deux fils de clignotants.
- Le manuel général WiPro III `1.8` confirme le raccordement universel, les règles de sécurité, l'affectation des broches, le fusible `10 A`, la recommandation de sirène et les principes de diagnostic.
- L'ancien profil `SW1` a été supprimé parce que le tableau général l'attribue aux Sprinter à partir de 2006.
- L'ancienne formulation obligatoire concernant la sirène externe a été remplacée par la recommandation fidèle à la source.
- Aucun point de raccordement spécifique non étayé pour la masse, l'allumage, l'alimentation ou la centrale n'est inventé ; il faut les déterminer sur le véhicule réel.

## Références croisées

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Registre des numéros d’article — produits et accessoires THITRONIK documentés|Registre des numéros d’article]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006-2018)|Mercedes Sprinter NCV3 / VW Crafter]]
- [[Mercedes Sprinter VS30 (BR907/910, à partir de 2018)|Mercedes Sprinter VS30]]
