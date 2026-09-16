---
title: T.S.A. — Détecteur de fumée sans fil pour WiPro III
sources:
  - sources/funk-rauchmelder-t.s.a..pdf
  - sources/T.S.A Rauchmelder.docx
  - sources/Fragen zu T.S.A. Funk-Rauchmelder.pdf
  - 'https://www.thitronik.de/produkte/produkt/tsa-funk-rauchmelder/'
  - 'https://www.thitronik.de/produkte/produkt/montageadapter-tsa/'
  - 'https://www.dinmedia.de/de/norm/din-en-14604/115461758'
updated: '2026-07-19'
confidence: high
lang: fr
translation_of: sources/funk-rauchmelder.md
---

# T.S.A. — Détecteur de fumée sans fil pour WiPro III

Le T.S.A. est un détecteur de fumée sans fil destiné aux véhicules de loisirs. Il peut fonctionner de manière autonome ou être intégré à une **WiPro III** ou **WiPro III safe.lock** compatible. Lorsqu’il détecte de la fumée, il émet une alerte locale ; avec l’intégration radio, les dispositifs d’alarme du véhicule et, le cas échéant, les notifications du Pro-Finder sont également activés.

> **IMPORTANT :** Le T.S.A. détecte la fumée, mais pas les gaz tels que le butane, le propane, les gaz narcotiques ou le monoxyde de carbone. Ces dangers nécessitent un avertisseur de gaz adapté, tel que [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs|G.A.S.-pro III]] ou [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III|G.A.S.-connect]].

---

## Caractéristiques techniques

| Paramètre | Indication du fabricant |
|-----------|--------------------------|
| Références des détecteurs | 105753 (blanc), 105754 (gris) |
| Norme indiquée par le fabricant | DIN EN 14064 (voir la note sur les sources sous le tableau) |
| Alimentation | pile au lithium intégrée à demeure, 3 V (1,6 Ah), type CR123A |
| Consommation moyenne | 13,2 µA sous 2,9 V |
| Niveau sonore | 85 dB à 3 m de distance |
| Portée radio | environ 90 m en champ libre |
| Température de fonctionnement | de −10 °C à +55 °C |
| Résistance thermique de l’adhésif | de −35 °C à +93 °C |
| Dimensions (Ø × H) | 50,8 × 42,5 mm |
| Poids | environ 59 g |
| Échéance de remplacement | au plus tard après 10 ans |
| Voyant et commande | LED bicolore (rouge/verte) et touche de test |

La portée radio est une valeur mesurée en champ libre. La structure du véhicule, les surfaces métalliques, l’emplacement de montage et d’autres écrans peuvent réduire sensiblement la portée réelle.

> **REMARQUE SUR LA NORME CITÉE PAR LES SOURCES :** La notice, révision 1.1, et la page produit THITRONIK actuelle indiquent « DIN EN 14064 ». DIN Media répertorie en revanche la norme **DIN EN 14604** comme norme actuelle relative aux détecteurs de fumée. En l’absence de déclaration corrigée du fabricant, cet article ne revendique pas de manière indépendante la conformité à l’une ou l’autre de ces normes. Pour toute homologation ou justification réglementaire, demander directement à THITRONIK l’indication normative à jour.

---

## Variantes, accessoires et domaines d’utilisation

| Produit | Couleur | Réf. | Utilisation |
|---------|---------|------|-------------|
| Détecteur de fumée sans fil T.S.A. | blanc | 105753 | intérieur, espace de vie et soute arrière du véhicule |
| Détecteur de fumée sans fil T.S.A. | gris | 105754 | intérieur, espace de vie et soute arrière du véhicule |
| Adaptateur de montage T.S.A. | blanc | 105755 | montage mural près du plafond, notamment avec un plafond en tissu |
| Adaptateur de montage T.S.A. | gris | 105756 | montage mural près du plafond, notamment avec un plafond en tissu |

Le détecteur de fumée convient tout particulièrement aux soutes arrière dans lesquelles des vélos électriques sont rangés ou rechargés. Selon la page produit actuelle, le détecteur est livré avec une notice et le matériel de montage ; l’adaptateur de montage est un accessoire distinct.

> **REMARQUE POUR LES PERSONNES MALENTENDANTES :** Le T.S.A. peut ne pas convenir comme unique moyen d’alerte. Dans ce cas, un dispositif d’alerte complémentaire adapté à la personne concernée est nécessaire.

---

## Principe de fonctionnement et limites

Le T.S.A. fonctionne selon le principe photoélectrique de la **lumière diffusée**. Au repos, le faisceau lumineux de la chambre de détection n’atteint pas la photodiode. Lorsque des particules de fumée pénètrent dans la chambre, elles diffusent la lumière vers la photodiode et déclenchent l’alarme. Ce principe convient particulièrement à la détection des feux couvants produisant une fumée froide.

Un détecteur de fumée ne peut avertir que si la fumée atteint sa chambre de détection. Il n’éteint pas un incendie et ne remplace ni les voies d’évacuation ni un comportement responsable. Choisir l’emplacement de manière à ce que la fumée puisse atteindre l’appareil sans obstacle.

---

## Fonctionnement autonome et compatibilité radio

Le T.S.A. peut être utilisé comme détecteur de fumée autonome, indépendamment des limites de version ci-dessous. D’après la FAQ du fabricant, l’intégration radio au système THITRONIK exige au minimum les versions suivantes :

| Produit | À partir du numéro de série | À partir de la version logicielle |
|---------|------------------------------|-----------------------------------|
| WiPro III | 0823-021 | 6.8 |
| WiPro III safe.lock | 1050-004 | 6.7s |
| WiPro III safe.lock Ford | 5298-001 | 7.4.0s |
| WiPro III safe.lock Sprinterset | 5458-001 | 1.0.5 sx |
| Pro-Finder | 0699-013 | 9.1 |

Si le numéro de série ou la version logicielle est antérieur, une mise à niveau ou une mise à jour est nécessaire avant l’intégration. En fonctionnement autonome, seul le T.S.A. émet une alerte ; le klaxon du véhicule, les feux de détresse, le SMS et l’appel ne sont alors pas déclenchés.

---

## Mémorisation du T.S.A. dans la WiPro III

Avant la mémorisation, contrôler les numéros de série et les versions logicielles des composants présents. La procédure directe suivante nécessite l’accès au détecteur de fumée et à la centrale WiPro III.

1. Placer la WiPro III ou la WiPro III safe.lock en mode de mémorisation conformément à sa notice.
2. Déverrouiller le couvercle du boîtier du T.S.A. en le tournant.
3. Appuyer sur la touche située à l’intérieur du détecteur de fumée.
4. Attendre le signal sonore de confirmation de la WiPro III.
5. Quitter le mode de mémorisation de la WiPro III conformément à sa notice.

Les autres méthodes de mémorisation et les procédures d’effacement sont décrites sous [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d’apprentissage]]. Après la mémorisation, toujours effectuer un test de fonctionnement complet comprenant tous les canaux d’alarme prévus.

---

## Choix de l’emplacement de montage

L’emplacement détermine si la fumée peut pénétrer rapidement et sans obstacle dans la chambre de détection.

- Monter le détecteur de fumée aussi près que possible du centre du plafond du véhicule.
- Dans une soute arrière, choisir un emplacement élevé et dégagé, surtout si des vélos électriques y sont rangés ou rechargés.
- Ne pas l’installer directement dans un angle du véhicule ni à proximité de lampes ou de luminaires.
- Ne pas l’installer juste à côté de la cuisine ou de la salle de bain, car la vapeur peut provoquer de fausses alarmes.
- Éviter les forts courants d’air produits par des ventilateurs ou des installations de ventilation. Arrêter ces dispositifs pendant le sommeil ou les stationnements prolongés s’ils risquent d’éloigner la fumée du détecteur.
- Ne pas coller d’étiquette sur le détecteur, le peindre ni le recouvrir.

Si le véhicule possède un plafond en tissu, ne pas coller le T.S.A. directement sur le tissu. Le support adhésif fourni n’y adhère pas de manière fiable. Utiliser l’adaptateur de montage approprié et fixer le détecteur sur un élément latéral en plastique proche du plafond.

---

## Activation et montage du détecteur de fumée

### Préparation

1. Vérifier l’emplacement, le matériau du plafond et la nécessité éventuelle d’un adaptateur de montage.
2. Activer le détecteur en appuyant sur la plaque de montage tout en la tournant dans le sens des aiguilles d’une montre.
3. S’assurer que le couvercle du boîtier s’enclenche de manière audible ; le détecteur n’est activé et alimenté qu’après cet enclenchement.
4. Préparer toutes les surfaces de collage afin qu’elles soient lisses, propres, sèches et exemptes de graisse.

### Variante 1 : montage direct sur un plafond en plastique

1. Retirer le film protecteur blanc de la pastille adhésive ronde double face 3M.
2. Coller la pastille sur la surface de montage dégraissée du détecteur de fumée.
3. Retirer le film protecteur rouge et dégraisser la zone choisie sur le plafond du véhicule.
4. Presser fermement le détecteur contre le plafond pendant au moins **60 secondes**.

### Variante 2 : montage avec l’adaptateur

1. Dégraisser la surface de montage arrondie de l’adaptateur.
2. Retirer le film protecteur rouge de la pastille adhésive ronde double face du détecteur.
3. Poser le détecteur sur la surface arrondie de l’adaptateur et presser fermement les deux pièces l’une contre l’autre pendant au moins **60 secondes**.
4. Dégraisser la surface rectangulaire de l’adaptateur et la zone choisie sur la paroi du véhicule.
5. Retirer le film protecteur d’un côté de la pastille adhésive rectangulaire.
6. Coller la pastille rectangulaire au dos de l’adaptateur de montage.
7. Retirer le second film protecteur.
8. Presser fermement l’adaptateur avec le détecteur contre la paroi du véhicule pendant au moins **60 secondes**.

> **IMPORTANT :** Ne pas coller le détecteur directement sur un plafond en tissu. La chute de l’appareil peut blesser des personnes et le détecteur ne se trouve alors plus à l’emplacement prévu pour détecter la fumée.

---

## Test final après le montage

1. Vérifier que le couvercle du boîtier est enclenché et que le détecteur est activé.
2. Maintenir la face inférieure ou la touche de test enfoncée pendant au moins **1 seconde**.
3. Vérifier que le T.S.A. émet un signal sonore et que la LED clignote en continu.
4. En cas d’intégration radio, vérifier également que la WiPro III actionne le klaxon du véhicule et les feux de détresse et qu’un Pro-Finder compatible transmet la notification prévue.
5. Relâcher la touche de test ; le signal d’alerte local s’arrête après quelques secondes.
6. Arrêter l’alarme du véhicule avec la [[Émetteur radio 868 — télécommande pour WiPro III|télécommande radio 868]].

Le test n’est achevé que lorsque tous les canaux d’alarme prévus pour le système concerné ont fonctionné.

---

## États de fonctionnement et signaux

| État | LED | Signal sonore |
|------|-----|---------------|
| Veille | la LED rouge clignote toutes les 344 secondes | aucun |
| Alarme de fumée | la LED rouge clignote en continu | signal d’alarme |
| Pile en fin de vie | aucun signal LED distinct n’est documenté | un signal bref toutes les 43 secondes |
| Mode de défaut | aucun signal LED distinct n’est documenté | trois signaux brefs toutes les 43 secondes |

La notice décrit une LED bicolore rouge et verte, mais elle ne documente que les signaux rouges ci-dessus pour le fonctionnement normal. Un signal vert ne doit donc pas être interprété à des fins de diagnostic sans information complémentaire du fabricant.

---

## Conduite à tenir en cas d’alarme de fumée

Lorsque le T.S.A. détecte de la fumée, il émet un signal d’alarme et la LED rouge clignote en continu. S’il est mémorisé dans une WiPro III compatible, le **klaxon du véhicule** et les **feux de détresse** sont également activés. Si un [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]] compatible est installé et configuré, un SMS et un appel sont aussi déclenchés.

Ne pas réinitialiser l’alarme avant d’avoir vérifié la situation. S’il n’est pas possible d’exclure un incendie, quitter immédiatement la zone dangereuse.

1. Appuyer sur la touche de test du T.S.A. pour couper l’alarme sur le détecteur.
2. Désarmer l’alarme de la WiPro III avec la télécommande radio.

En cas d’incendie réel, quitter immédiatement le véhicule, avertir les autres personnes et appeler les sapeurs-pompiers. Ne pas tenter d’éteindre le feu si cela met une personne en danger.

---

## Test de fonctionnement en service

Pour le test de fonctionnement décrit par le fabricant, utiliser uniquement la touche de test :

1. Maintenir la face inférieure ou la touche de test enfoncée pendant plus de **1 seconde**.
2. Vérifier le signal sonore d’alarme de fumée et le clignotement continu de la LED.
3. En cas d’intégration radio, vérifier la réaction de la WiPro III et du Pro-Finder.
4. Relâcher la touche de test ; le signal d’alerte local s’arrête après quelques secondes.
5. Arrêter l’alarme du véhicule avec la télécommande radio.

Ne pas tester le détecteur avec une flamme nue. Effectuer un nouveau test complet après des travaux sur le véhicule, un changement d’emplacement ou une modification du système d’alarme.

---

## Pile, durée de vie de l’appareil et mode de défaut

La pile au lithium CR123A de 3 V est intégrée à demeure et ne peut pas être remplacée. La durée d’utilisation prévue peut atteindre dix ans. Le détecteur complet doit ensuite être remplacé, car, outre la pile, l’encrassement de la chambre de détection, notamment par la poussière domestique, peut nuire à sa fiabilité.

### Avertissement de pile en fin de vie

1. Un signal bref toutes les **43 secondes** indique que la pile a atteint la fin de sa durée de vie.
2. Maintenir la touche de test enfoncée pendant **3 secondes** pour couper l’avertissement pendant **8 heures**.
3. Remplacer le détecteur dès que l’avertissement a été émis plus de quatre fois ; la mise en sourdine ne dispense pas de remplacer l’appareil.

> **AVERTISSEMENT :** Une mauvaise manipulation des piles au lithium peut provoquer une explosion ou un incendie. Ne pas retirer ni endommager la pile intégrée ; ne pas démonter, court-circuiter ou chauffer l’appareil et ne pas le jeter au feu.

### Mode de défaut

1. Reconnaître trois signaux brefs toutes les **43 secondes** comme une indication de défaut.
2. Nettoyer la surface avec un chiffon sec et non pelucheux.
3. Si l’indication persiste, considérer le T.S.A. comme défectueux et le remplacer.

### Entretien et remplacement

Maintenir l’extérieur du détecteur sec et exempt de peluches. Ne pas utiliser de peinture, d’étiquette, de cache ni de liquide de nettoyage susceptible d’altérer les ouvertures ou la chambre de détection. Remplacer l’appareil complet au plus tard après dix ans et chaque fois qu’un avertissement de pile ou de défaut persiste.

---

## Dépannage

| Observation | Cause possible | Mesure |
|-------------|----------------|--------|
| Aucune réaction locale lors de l’appui sur la touche de test | détecteur non activé, pile épuisée ou appareil défectueux | enclencher correctement le couvercle et répéter le test ; si l’appareil ne réagit toujours pas, le remplacer |
| Le test local fonctionne, mais la WiPro III ne réagit pas | T.S.A. non mémorisé ou version minimale requise non atteinte | contrôler le numéro de série et le logiciel ; mémoriser de nouveau le T.S.A. |
| Le klaxon et les feux de détresse réagissent, mais aucun SMS ou appel n’est reçu | Pro-Finder absent, incompatible ou incomplètement configuré | contrôler la version du Pro-Finder, la connexion au réseau mobile et la configuration |
| Fausses alarmes répétées près de la cuisine ou de la salle de bain | de la vapeur pénètre dans la chambre de détection | déplacer le détecteur vers un emplacement adapté, hors de la zone de vapeur immédiate |
| L’intégration radio fonctionne de manière peu fiable | liaison radio masquée par du métal ou emplacement inadapté | changer l’emplacement et répéter le test complet |
| Le détecteur se détache d’un plafond en tissu | montage direct par collage inadapté | utiliser l’adaptateur 105755 ou 105756 sur un élément latéral en plastique |
| Un signal bref toutes les 43 secondes | pile en fin de vie | remplacer le T.S.A. ; ne couper l’avertissement pendant 8 heures qu’à titre provisoire |
| Trois signaux brefs toutes les 43 secondes | mode de défaut | nettoyer la surface avec un chiffon sec et non pelucheux ; remplacer l’appareil si le défaut persiste |

Si le problème reste inexpliqué, documenter pour le support les numéros de série et versions logicielles complets du T.S.A., de la WiPro III et, le cas échéant, du Pro-Finder, ainsi que l’emplacement, la séquence de signaux et le résultat du test. D’autres contrôles portant sur l’ensemble du système sont décrits sous [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

---

## Questions fréquentes (FAQ)

**Puis-je utiliser le T.S.A. sans WiPro III ?**  
Oui. En fonctionnement autonome, le T.S.A. émet une alerte locale. Le klaxon du véhicule, les feux de détresse, le SMS et l’appel ne sont pas disponibles sans intégration au système.

**Quelle version du système est nécessaire pour l’intégration radio ?**  
Les versions minimales figurent dans le tableau de compatibilité. Les appareils plus anciens nécessitent une mise à niveau ou une mise à jour.

**Le T.S.A. avertit-il de la présence de butane, de propane, de gaz narcotiques ou de monoxyde de carbone ?**  
Non. Ces dangers nécessitent un avertisseur de gaz adapté.

**Puis-je utiliser le détecteur dans une soute arrière contenant des vélos électriques ?**  
Oui. Le fabricant recommande expressément cette utilisation, surtout lorsque des vélos électriques y sont rangés ou rechargés. La fumée doit pouvoir atteindre le détecteur sans obstacle.

**La pile peut-elle être remplacée ?**  
Non. La CR123A est intégrée à demeure. Remplacer l’appareil complet dès l’émission d’un avertissement de pile ou au plus tard après dix ans.

**Comment distinguer l’avertissement de pile et le mode de défaut ?**  
Un signal bref toutes les 43 secondes indique que la pile est en fin de vie. Trois signaux brefs toutes les 43 secondes indiquent le mode de défaut.

**Puis-je coller le T.S.A. directement sur un plafond en tissu ?**  
Non. Utiliser l’adaptateur 105755 en blanc ou 105756 en gris et le fixer sur un élément latéral en plastique proche du plafond.

**Le T.S.A. suffit-il pour avertir une personne malentendante ?**  
Pas nécessairement. Son aptitude et un dispositif d’alerte complémentaire doivent être évalués individuellement.

---

## Conformité et élimination

Dans la notice, THITRONIK déclare que le produit est conforme à la directive **2014/53/EU**. La déclaration de conformité détaillée est disponible dans la rubrique d’assistance du fabricant : `https://www.thitronik.de/support`

La divergence de désignation de la norme dans les documents du fabricant est décrite dans la section « Caractéristiques techniques » et doit être résolue avant toute utilisation à des fins d’homologation ou de preuve.

Comme le T.S.A. contient une pile au lithium intégrée à demeure, ne pas le jeter avec les ordures ménagères. Remettre l’appareil complet à un point de collecte approprié pour les équipements électriques et les piles. Conserver les emballages et le matériel de montage hors de portée des enfants.

---

## Références croisées

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d’apprentissage]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Télécommande radio 868]]
- [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]
- [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs|G.A.S.-pro III]]
- [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III|G.A.S.-connect]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK|Vue d’ensemble du système]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
