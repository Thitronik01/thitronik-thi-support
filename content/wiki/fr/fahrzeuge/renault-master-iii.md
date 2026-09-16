---
title: Renault Master III / Opel Movano B / Nissan NV400 (à partir de 2011)
sources:
  - sources/wipro_iii_renault_master_ab_2011_01.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
updated: '2026-07-21'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/renault-master-iii.md
---

# Renault Master III / Opel Movano B / Nissan NV400 (à partir de 2011)

Cet article décrit le montage documenté de la WiPro III sur le Renault Master à partir de 2011 ainsi que sur les modèles de même plate-forme Opel Movano B et Nissan NV400 regroupés avec lui dans le projet. La source principale est le manuel THITRONIK de dix pages, état `04/25` ; le manuel général version `1.8` complète le rôle des broches, la sirène et la sécurité.

> **Comparaison obligatoire :** la source primaire actuelle porte uniquement la désignation Renault Master. Sur un Opel Movano B, un Nissan NV400, une autre année, carrosserie ou connectique, confirmer P201, la broche, la couleur et le signal sur le véhicule concerné. En cas d’écart, ne pas poursuivre par similitude ou couleur ; contacter l’assistance THITRONIK.

## Domaine d’application et configuration validée

| Caractéristique | Configuration validée |
|---|---|
| Véhicules | Renault Master III à partir de 2011 ; le projet inclut aussi Opel Movano B et Nissan NV400 de même plate-forme |
| Système | WiPro III Universal Set Art. `100754` |
| Source véhicule | manuel de montage de dix pages, état `04/25` |
| Communication | CAN-High, CAN-Low et commande faible puissance des feux de détresse sur P201 |
| DIP → ON | **SW2 + SW3 + SW6** |
| Commande documentée | télécommande radio THITRONIK 868 ; télécommande d’origine uniquement documentée pour le contrôle préalable et le diagnostic CAN |
| Alarme sonore | avertisseur au connecteur de bague collectrice ; sirène externe facultative |
| Durée d’alarme | environ `30 s` sonore et `180 s` visuelle |
| Version minimale | non indiquée par la source actuelle ; consigner numéro de série et logiciel avant montage |

Le [[Renault Master (2019–2024) — safe.lock|Renault Master 2019–2024 avec safe.lock]] distinct utilise le kit Art. `105832` et une autre logique. Ne pas mélanger raccordements, profil DIP ou déclarations d’utilisation des deux configurations.

## Hiérarchie des sources et ancien contenu corrigé

| Sujet | Décision relative aux sources |
|---|---|
| Profil, kit, dépose, P201, alimentation, avertisseur et essai | priorité au manuel véhicule état `04/25` |
| Rôle des broches WiPro, fusible `10 A` et sirène facultative | compléments du manuel version `1.8` |
| Numéro de série minimal | aucune source disponible n’en indique ; l’ancienne valeur `0823-014` n’est pas validée |
| Ancienne note `0823-001 / 2.1` et logiciel `6.9` | non étayée et à retirer de toutes les matrices |
| Couverture des portes | tester chaque ouverture ; l’ancienne affirmation générale sur portes coulissantes et arrière est infondée |
| Commande | la procédure actuelle impose la télécommande THITRONIK ; aucune garantie de changement d’état par la clé d’origine |
| Essai final page 6 | « répéter l’étape 7 » est un renvoi erroné ; le contenu impose de répéter l’essai initial de l’étape 5 |
| `FAQ_WiPro-III_DE.md` cité auparavant | absent localement et non considéré comme source examinée |

Pour les versions, voir [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Sécurité et contrôles préalables

- Montage et travaux électriques réservés à un atelier spécialisé qualifié.
- Avant les travaux, débrancher le négatif de la batterie et les batteries auxiliaires selon les constructeurs. Tenir compte du code autoradio et des réglages volatils.
- Sur la colonne de direction, ne jamais tester, repiquer ou gêner les câbles d’airbag, d’angle de braquage, d’antidémarrage ou de sécurité.
- Ne jamais identifier fiche ou broche par la seule couleur ; désignation, broche, couleur, tension et signal doivent tous correspondre.
- Isoler séparément les entrées/sorties inutilisées. Protéger les câbles du mouvement, frottement, chaud, humide et traction.
- Consigner les voyants, défauts mémorisés et pannes électriques présents avant l’intervention.
- Si un câble manque, si la fiche diffère ou si la variante est incertaine, arrêter et contacter l’assistance.

Vérifier sur le véhicule :

1. Une télécommande d’origine est-elle présente et opérationnelle ?
2. Le verrouillage centralisé fonctionne-t-il correctement ?
3. Les portes d’origine ouvertes sont-elles affichées au combiné avec le contact mis ?
4. Quelles portes et trappes d’un intégral sont réellement détectées par le CAN ?
5. L’avertisseur fonctionne-t-il ?
6. Le Universal Set Art. `100754` est-il bien présent ?
7. Renault Master, année et P201 correspondent-ils au manuel état `04/25` ?

## Matériel et préparation

La source cite le Universal Set `100754`, d’éventuels accessoires ou sirènes, pince universelle ou multiprise, cruciforme `PH2` ou Torx `T20`, perceuse et foret de `8 mm` pour la LED. Prévoir aussi multimètre, pince à sertir, connecteurs, isolant et colliers.

1. Comparer kit, accessoires et faisceau complet à la fiche de travail.
2. Consigner fonctions du véhicule et mémoire des défauts.
3. D’abord seulement dégager les raccordements ; ne rien brancher par couleur.
4. Choisir dans l’habitacle un emplacement proche de l’électronique, protégé d’un accès rapide et hors course des pédales et de la colonne.
5. Prévoir les sections appropriées et un fusible d’alimentation WiPro de `10 A`.

## Réglage du profil DIP

1. Mettre la WiPro III entièrement hors tension et ouvrir le boîtier.
2. Mettre **SW2, SW3 et SW6 sur ON**.
3. **SW1, SW4, SW5, SW7 et SW8 restent OFF**, sauf fonction supplémentaire validée séparément.
4. Photographier et comparer le réglage au véhicule, au kit et à la fiche.
5. Fermer le boîtier avant de poursuivre.

> Ne jamais modifier les DIP sous tension. Ne reprendre ni le profil Master II ni le profil safe.lock du kit `105832`.

La protection générale contre la relecture par **SW5** est décrite à partir de `0823-014` ou du logiciel `5.8`, mais ne fait pas partie du profil de base. Utiliser SW5 uniquement sur demande expresse et avec une version compatible ; la détection CAN des portes reste active.

## Dégagement du tableau de bord et du calculateur

1. Retirer le cache de la boîte à fusibles.
2. Retirer la garniture sous la colonne.
3. Retirer le carénage de colonne.
4. Desserrer la vis de fixation du calculateur de carrosserie.
5. Le sortir de son support et le déplacer vers l’arrière et le bas pour travailler en sécurité.
6. Identifier clairement **P201** et le photographier avant raccordement.

Pour l’avertisseur, le carénage est libéré par trois vis Torx `T20`. Respecter strictement les prescriptions relatives à l’airbag et à la colonne.

## Raccordement du CAN et des feux de détresse sur P201

La source exige des connecteurs de dérivation bleus remplis de gel. Mesurer chaque broche et signal et confirmer l’orientation de P201.

| Fonction | Raccordement véhicule | Câble véhicule | Câble WiPro III | Broche WiPro |
|---|---|---|---|---|
| Feux de détresse | P201, broche 11 | lilas/noir | rouge/rose | broche 6, Smart Blinker |
| CAN-Low | P201, broche 19 | naturel | violet/orange | broche 18 |
| CAN-High | P201, broche 39 | orange | blanc/orange | broche 17 |

> **Ne pas inverser le CAN :** le tableau véhicule appelle les deux lignes « CAN ». L’affectation vient du brochage WiPro : blanc/orange = CAN-High, violet/orange = CAN-Low.

## Raccordement de l’alimentation et du contact

Déverrouiller la boîte à fusibles gauche et la pivoter vers la droite. La source ne donne ni numéro de fusible ni point unique ; mesurer des points adaptés et choisir une section suffisante.

| Fonction | Côté véhicule | Câble WiPro III | Broche WiPro | Exigence |
|---|---|---|---|---|
| Plus permanent/borne 30 | câble rouge adapté dans la zone des fusibles | rouge | broche 11 | protéger par `10 A` |
| Contact/borne 15 | câble jaune adapté dans la zone des fusibles | jaune | broche 7 | mesurer contact mis/coupé |
| Masse/borne 31 | point de masse vérifié dans le plancher | noir | broche 1 | contrôler surface et serrage |

Ne reprendre aucune position d’une autre année. Ne rétablir l’alimentation qu’après contrôle du DIP, CAN, feux de détresse, isolation et décharge de traction.

## Raccordement de l’avertisseur

1. Vérifier le fonctionnement initial de l’avertisseur.
2. Débrancher la batterie selon le constructeur et respecter les délais des systèmes d’airbag/colonne.
3. Retirer le carénage en desserrant les trois Torx `T20`.
4. Localiser le connecteur gris de la bague collectrice.
5. Confirmer **broche 9**, câble véhicule **naturel/noir**.
6. Le raccorder au **câble rose WiPro, broche 9**.
7. Fixer le câble sans gêner colonne, bague ni réglage.

La sortie d’avertisseur WiPro est une commande faible puissance. Ne pas y brancher de charge ni substituer un autre câble de colonne.

## Sirène externe facultative

La source véhicule cite les sirènes comme accessoires ; le manuel général documente leur raccordement. Voir [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]].

| Version | WiPro III | Sirène | Remarque |
|---|---|---|---|
| Plus sirène normale | broche 15, blanc | rouge | sortie positive, max. `1 A` |
| Moins sirène normale | broche 16, blanc/noir | noir | masse sirène |
| Alimentation sirène de secours | borne 30 et masse | rouge au plus, noir à la masse | raccord permanent selon la sirène |
| Déclenchement sirène de secours | broche 15, blanc | blanc | déclencheur positif |
| Câble inutilisé | — | bleu | isoler séparément |

Fixer solidement la sirène, à l’abri des projections et avec sortie sonore libre. Éloigner les câbles de la chaleur, des pièces mobiles et des arêtes.

## Montage de la LED d’état

1. Choisir un emplacement visible, sans collision, et l’accorder au client si nécessaire.
2. Vérifier l’absence de câbles ou composants derrière le perçage.
3. Percer `8 mm` et poser la LED.
4. Relier le câble rouge/noir au faisceau WiPro via le connecteur blanc.
5. Poser le câble protégé et avec décharge de traction.

## Mémorisation des accessoires radio

Tous les accessoires doivent porter la mention **868** et être mémorisés une fois. Voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d’apprentissage]].

1. Maintenir la touche à droite du connecteur jusqu’au bip ; la LED reste allumée.
2. Déclencher chaque contact 868 deux ou trois fois en éloignant l’aimant de plus de `30 mm`.
3. Actionner les touches de la télécommande 868.
4. Allumer le détecteur de gaz radio 868.
5. Retirer la boucle de câble radio 868 de son support.
6. Après chaque accessoire, contrôler le bip et la brève extinction de la LED.
7. Quitter le mode par brève coupure de tension ou brève pression sur la touche WiPro.
8. Documenter chaque accessoire mémorisé et sa position.

La mémoire est non volatile ; les accessoires restent enregistrés après une longue coupure. Leur suppression exige la procédure complète du manuel général.

## Montage des contacts radiomagnétiques

La source documente les contacts Art. `100757` noirs et `100758` blancs et les adaptateurs Art. `100428` et `100729`.

1. Monter de préférence l’émetteur sur le cadre fixe et l’aimant sur la partie mobile.
2. Placer la carte avec la LED d’émission **à l’opposé de l’aimant**. Une mauvaise orientation permet la mémorisation, mais pas l’alarme.
3. Placer l’aimant dans la plage `22–30 mm` et pas au-delà de la ligne rouge.
4. Pour un écart supérieur ou une mauvaise orientation d’antenne, utiliser `100428` ou `100729`.
5. Nettoyer, sécher et dégraisser ; ne pas coller sous `15 °C` et laisser sans charge environ `24 h`.
6. Si le collage est peu fiable, utiliser les repères internes pour une fixation vissée.
7. Ouvrir et fermer plusieurs fois et vérifier la réaction radio.

Voir [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

## Contrôle de la couverture des portes et trappes

L’affichage au combiné est un indice important de détection CAN, mais ne remplace pas l’essai d’alarme. Sur un intégral, des portes ou trappes de cellule peuvent aussi être sur le CAN.

1. Ouvrir séparément chaque porte cabine, coulissante, arrière et de cellule ainsi que chaque trappe à protéger.
2. Contact mis, vérifier l’affichage de chaque ouverture au combiné.
3. Armer WiPro et effectuer un véritable essai pour chaque ouverture.
4. Ne documenter comme surveillée par le véhicule qu’une ouverture qui déclenche réellement l’alarme par CAN.
5. Poser et tester séparément un contact radio sur chaque ouverture non détectée.

Cette vérification remplace l’ancienne affirmation générale sur les portes coulissantes et arrière.

## Premier essai fonctionnel et diagnostic CAN

1. Contrôler les raccordements et rétablir l’alimentation.
2. Fermer toutes les portes et tous les contacts.
3. Armer avec une touche quelconque de la **télécommande radio THITRONIK 868**.
4. Contrôler un bip, le clignotement des indicateurs et la LED d’état clignotante.
5. Ouvrir mécaniquement la porte conducteur de l’intérieur.
6. Vérifier environ `30 s` d’alarme sonore et `180 s` visuelle.
7. Désarmer ou interrompre avec une touche quelconque de la télécommande THITRONIK.
8. Documenter la séquence de mémoire d’alarme sur la LED.

Si une porte détectée ne déclenche pas :

1. Appuyer brièvement sur la touche WiPro ; la LED indique le mode diagnostic.
2. Actionner la télécommande du véhicule ou les feux de détresse pour générer du trafic CAN.
3. Si la LED scintille, WiPro reçoit des données CAN.
4. Sans réaction, contrôler broches P201, sertissages et CAN-High/CAN-Low.
5. Sans aucune réaction ni bip à l’alimentation, mesurer la tension au connecteur WiPro et contrôler fusible et contact. Contact mis, l’installation est désactivée.

## Commande et distinction SW5

L’essai actuel documente la télécommande THITRONIK 868 : une touche quelconque active ou désactive le système. La télécommande d’origine sert au contrôle préalable et à produire du trafic CAN ; cela ne valide pas une modification fiable de l’état d’alarme.

- À la remise, démontrer l’état par la LED et une réaction réelle.
- Tester et documenter séparément clé d’origine et télécommande THITRONIK.
- **Ne pas activer SW5 dans le profil de base.** La fonction générale contre la relecture dépend de l’appareil et bloque la commande par clé d’origine, pas la détection CAN des portes.
- Ne pas appliquer de règle spéciale non étayée à partir du logiciel `6.9`.

Voir [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]].

## Essai fonctionnel final

Le renvoi « répéter l’étape 7 » doit être compris comme la répétition du premier essai de l’étape 5. Après raccordement de l’avertisseur et mémorisation, vérifier :

1. Armement et désarmement avec la télécommande THITRONIK 868.
2. Chaque porte et trappe détectée par CAN, séparément.
3. Avertisseur et éventuelle sirène externe.
4. Feux de détresse et LED, mémoire d’alarme comprise.
5. Chaque contact magnétique immédiatement après armement.
6. Boucle de câble en la retirant du support ; voir [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles|Boucle de câble radio 868]].
7. Détecteur de gaz seulement après environ `4 min` de préchauffage et selon sa notice actuelle ; il peut alerter WiPro armée ou désarmée.
8. Alarme panique de la télécommande décrite, en maintenant les deux touches environ `1 s` ; les anciennes versions suivent leur propre notice.
9. Mettre le contact et confirmer la désactivation de l’alarme.

Si l’on arme avec des contacts ouverts, plusieurs bips précèdent le bip d’armement. Ces contacts sont d’abord exclus ; après fermeture ils redeviennent actifs après environ `4 s`. Tester cette fonction vent-check pour chaque contact concerné.

## Diagnostic des défauts

| Observation | Contrôle et mesure |
|---|---|
| aucune alarme sur une porte | contrôler affichage au combiné, détection CAN réelle, P201 broches 19/39 et essai individuel |
| aucune activité CAN en diagnostic | contrôler CAN-High/CAN-Low, broches, sertissage et alimentation ; ne pas permuter à titre d’essai |
| aucune confirmation par feux de détresse | contrôler P201 broche 11 lilas/noir et WiPro rouge/rose broche 6 |
| aucune réaction ni bip d’alimentation | contrôler tension au connecteur, fusible `10 A`, masse, contact et connecteurs |
| impossible d’armer | couper le contact ; il désactive la WiPro |
| aucun avertisseur | contrôler connecteur gris, broche 9 naturel/noir, câble rose WiPro et fonction initiale |
| contact signalé ouvert malgré fermeture | ouvrir/fermer tous les contacts plusieurs fois ; vérifier écart et orientation |
| contact radio non reçu | contrôler mémorisation, pile, antenne, métal de blindage et adaptateur `100428` |
| clé d’origine ne change pas l’état d’alarme | aucune panne déductible de la source actuelle ; utiliser la télécommande THITRONIK documentée |
| fiche, broche ou couleur différente | arrêter et ouvrir un dossier avec photos, mesures, numéro de série et logiciel |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]] et [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade|Saisie d’un dossier d’assistance]].

## Remise et documentation

Consigner sur la fiche :

- modèle, année, VIN et variante de carrosserie
- kit Art. `100754`, numéro de série WiPro complet et logiciel
- titre et état `04/25` du manuel utilisé
- réglage `SW2 + SW3 + SW6` et état de SW5
- mesures et position réelle de tous les raccordements P201, alimentation, masse et avertisseur
- fusible utilisé et sections de câble
- emplacements de centrale, LED, sirène et accessoires radio
- état CAN/alarme de chaque porte et trappe
- résultats séparés avec clé d’origine et télécommande THITRONIK
- résultats avertisseur, sirène, feux, panique, vent-check et chaque accessoire
- durées `30 s`/`180 s` et mémoire de défauts avant/après

À la remise, montrer commande documentée, état d’alarme, couverture des ouvertures et comportement contact mis. Inscrire emplacement du fusible et numéro de série dans les documents client.

## Décision relative aux sources

- Le manuel THITRONIK de dix pages *WiPro III (New) Renault Master à partir de 2011*, état `04/25`, a été entièrement contrôlé comme texte et visuellement. Il documente kit `100754`, contrôles préalables, `SW2 + SW3 + SW6`, dépose, P201, alimentation, avertisseur, LED, mémorisation, essais et contacts magnétiques.
- Le manuel général version `1.8` complète le rôle des broches, le fusible `10 A`, les sirènes et le diagnostic. La source véhicule actuelle prévaut.
- Les durées applicables sont donc `30 s` sonore et `180 s` visuelle, pas l’ancienne valeur générale `120 s`.
- La source actuelle ne donne aucun minimum. Ni `0823-014`, ni `0823-001 / 2.1`, ni une règle à partir de `6.9` ne sont conservés comme validation véhicule.
- La source primaire ne documente que Renault Master. Opel Movano B et Nissan NV400 restent des attributions de projet avec comparaison obligatoire.
- L’ancienne affirmation générale sur portes coulissantes/arrière est remplacée par le contrôle individuel CAN demandé.
- Le mauvais renvoi « étape 7 » est traité comme répétition de l’essai initial de l’étape 5.
- `FAQ_WiPro-III_DE.md` est introuvable localement et n’a pas servi de preuve.

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d’apprentissage]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles|Boucle de câble radio 868]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade|Saisie d’un dossier d’assistance]]
- [[Renault Master II / Opel Movano A / Nissan Interstar (1998–2010)|Renault Master II]] — génération précédente
- [[Renault Master (2019–2024) — safe.lock|Renault Master 2019–2024 avec safe.lock]] — configuration distincte
