---
title: Détecteur d'eau sans fil 868 — détecteur d'eau sans fil
sources:
  - sources/funk-wassermelder-868.pdf
  - sources/Fragen zu Funk-Wassermelder 868.pdf
  - sources/Seriennummer 1011 C.A.S. III.csv
  - 'https://www.thitronik.de/produkte/produkt/funk-wassermelder-868/'
updated: '2026-07-19'
confidence: high
lang: fr
translation_of: sources/funk-wassermelder.md
---

# Détecteur d'eau sans fil 868 — détecteur d'eau sans fil

Le détecteur d’eau sans fil 868 détecte les fuites d’eau dans les véhicules de camping et les signale par radio à un système d’alarme compatible **WiPro III** ou **WiPro III safe.lock**. L’unité émettrice reste dans une zone sèche et facilement accessible ; le capteur filaire est fixé à l’endroit où l’humidité doit être détectée rapidement.

> **IMPORTANT :** Le détecteur d’eau sans fil n’est pas destiné à fonctionner de manière autonome. Sans système d’alarme compatible et correctement configuré, aucune alerte complète n’est assurée.

---

## Caractéristiques techniques

| Paramètre | Indication du fabricant |
|-----------|-------------------------|
| Alimentation électrique | 3 V, 1 × CR2032 |
| Autonomie de la pile | env. 2 ans |
| Portée radio | env. 75 m en champ libre |
| Fréquence d’émission | 868,35 MHz |
| Puissance d’émission | < 10 mW |
| Dimensions de l’unité électronique (l × H × P) | 52 × 35 × 14 mm |
| Longueur du câble du capteur | 30 cm |
| Poids | env. 35,1 g |
| Indice de protection du boîtier | IP67 |
| Numéro d’article | 106021 |

La portée radio indiquée est une valeur en champ libre. La structure du véhicule, les surfaces métalliques, l’emplacement de montage et d’autres écrans peuvent réduire considérablement la distance réellement atteinte.

---

## Utilisation prévue et limites

Le détecteur d’eau est destiné à l’intérieur des camping-cars, caravanes et véhicules de camping comparables. Les zones de surveillance adaptées sont notamment :

- sous les conduites et raccords d’eau,
- sous les réservoirs d’eau propre et d’eau de service,
- dans les compartiments de rangement contenant des éléments hydrauliques,
- sur le sol sous les zones exposées,
- derrière ou sous les trappes de service.

L’appareil n’est pas homologué pour un montage extérieur, d’autres types de véhicules ou des installations fixes dans des bâtiments. Il ne peut détecter une fuite que si l’eau atteint les broches de contact du capteur. Le détecteur d’eau n’empêche pas les fuites et ne remplace ni les contrôles visuels réguliers ni l’entretien des conduites, réservoirs, joints et évacuations.

Malgré l’indice de protection IP67 du boîtier, la notice impose le montage de l’unité émettrice dans une zone intérieure sèche. Cet indice de protection n’étend pas l’utilisation prévue aux espaces extérieurs ni à une immersion permanente.

---

## Produit et contenu de la livraison

| Composant | Indication |
|-----------|------------|
| Détecteur d’eau sans fil 868 | Réf. 106021 |
| Plaque de montage | Support de l’unité émettrice |
| Pastille adhésive | Fixation de la plaque de montage sur une surface appropriée |
| Vis | 2,9 × 13 mm, tête fraisée A2, pour fixer le capteur |

L’unité émettrice, le capteur au bout d’un câble de 30 cm, la plaque de montage, la pastille adhésive et la vis du capteur constituent le système de montage illustré dans la notice. Pour fixer l’unité émettrice par vissage plutôt que par collage, des vis appropriées doivent être choisies séparément ; elles ne sont pas fournies.

> **AVERTISSEMENT CONCERNANT LES PETITES PIÈCES :** Tenir les matériaux d’emballage et de montage hors de portée des enfants. Les petites pièces avalées ou introduites dans les voies respiratoires peuvent être mortelles. En cas de suspicion, consulter immédiatement un médecin.

---

## Compatibilité et versions minimales

Selon la page produit actuelle, le détecteur d’eau sans fil peut être utilisé à partir des versions d’appareils suivantes :

| Système | À partir du numéro de série | À partir de la version logicielle |
|---------|-----------------------------|-----------------------------------|
| WiPro III | 0823-021 | 6.8 |
| WiPro III safe.lock | 1050-004 | 6.7s |
| WiPro III safe.lock Set Ford | 5298-001 | 7.4.0s |
| WiPro III safe.lock Set Sprinter | 5458-001 | 1.0.5sx |
| Pro-Finder | 0699-013 | 9.1 |

Les numéros de série ou versions logicielles antérieurs nécessitent une mise à niveau ou une mise à jour avant l’intégration. Toujours contrôler ensemble le numéro de série et la version logicielle ; un numéro correspondant ne suffit pas à confirmer la compatibilité.

La prise en charge est également documentée historiquement pour C.A.S. III à partir du numéro de série `1011-005` avec le logiciel `CAS3.20`. Sur ce système, une alarme d’eau est traitée comme une alarme de gaz. Cette ancienne gamme de produits ne figure pas dans la liste de compatibilité actuelle de la page produit ; de plus amples informations sont disponibles sous [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

---

## Fonctionnement et voies d’alarme

Les deux broches de contact du capteur constituent le point de détection. Lorsque l’eau relie les broches, l’unité émettrice transmet un signal radio au système d’alarme dans lequel elle a été enregistrée. Le détecteur d’eau n’est pas lui-même un dispositif d’alarme sonore autonome.

Les voies d’alarme suivantes sont documentées avec une configuration compatible :

- WiPro III ou WiPro III safe.lock assure l’alerte au moyen des dispositifs d’alarme configurés dans le véhicule.
- Un [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]] installé de manière compatible et correctement configuré envoie en plus une notification d’alarme par SMS.

La page produit actuelle documente expressément une **alerte à distance par SMS** via Pro-Finder. Elle ne garantit pas d’appel supplémentaire pour le détecteur d’eau ; cette fonction n’est donc pas présentée ici comme systématique.

---

## Choix de l’emplacement de montage

L’unité émettrice et le capteur répondent à des exigences différentes :

- Monter l’unité émettrice dans une zone intérieure sèche et facilement accessible pour le remplacement de la pile.
- Placer le capteur au point bas ou au point qui sera mouillé en premier dans la zone à surveiller.
- Veiller à ce que les deux broches de contact touchent le sol.
- Vérifier le cheminement du câble de 30 cm avant la fixation ; ne pas écraser, plier fortement ou tendre le câble.
- Éviter autant que possible les écrans métalliques entre l’unité émettrice et la centrale WiPro.
- Ne pas choisir un emplacement où le nettoyage normal ou une condensation inévitable déclencherait régulièrement le capteur par inadvertance.

Avant le montage définitif, effectuer un essai provisoire de portée et de fonctionnement à l’emplacement prévu.

---

## Montage de l’unité émettrice et du capteur

### Fixation de la plaque de montage avec la pastille adhésive

1. Déterminer des emplacements appropriés pour l’unité émettrice et le capteur.
2. Préparer la surface de collage avec un produit de nettoyage adapté ; elle doit être propre, sèche et exempte de graisse.
3. Appliquer la pastille adhésive sur la plaque de montage, puis fixer la plaque à l’emplacement prévu.
4. Ne pas appliquer la pastille adhésive si la température de surface est inférieure à **15 °C**.
5. Laisser le collage sans charge pendant environ **24 heures**, jusqu’à ce qu’il atteigne sa résistance finale.

Une surface insuffisamment nettoyée peut entraîner le décollement du détecteur d’eau seulement après plusieurs semaines ou plusieurs mois.

### Fixation alternative par vissage

Si le collage n’est pas possible, la notice autorise une fixation par vissage. Les repères correspondants se trouvent à l’intérieur du boîtier de l’émetteur.

1. Avant de percer, vérifier les conduites, réservoirs, éléments électriques et l’épaisseur du matériau derrière le point de fixation.
2. Choisir des vis à tête fraisée appropriées en acier inoxydable **V4A** et de longueur adaptée ; ces vis ne sont pas fournies.
3. Utiliser uniquement les repères prévus et fixer le boîtier sans le mettre sous contrainte.

> **IMPORTANT :** La vis A2 de 2,9 × 13 mm fournie est destinée au capteur. Ne pas l’utiliser sans vérification comme vis de fixation pour l’unité émettrice ou des éléments du véhicule. Des vis inadaptées ou trop longues peuvent endommager le véhicule ou des composants dissimulés.

### Fixation du capteur et mise en place de l’unité émettrice

1. Positionner le boîtier du capteur situé au bout du câble de 30 cm sur le point exposé prévu.
2. Fixer le capteur à travers l’orifice prévu avec la vis fournie.
3. S’assurer que les broches de contact touchent le sol et ne sont pas soulevées de la surface.
4. Orienter la plaque de montage avec ses ergots d’encliquetage dirigés vers le haut.
5. Placer l’unité émettrice sur les ergots et la faire coulisser vers le bas jusqu’à ce que la plaque et le boîtier soient parfaitement alignés.
6. Contrôler l’orientation : la LED d’émission se trouve en haut à droite et le câble du capteur sort vers le bas de l’unité émettrice.
7. Poser le câble sans tension et vérifier que l’unité émettrice reste accessible pour le remplacement ultérieur de la pile.

---

## Enregistrement dans WiPro III

Le détecteur d’eau se déclenche lorsque ses broches de contact sont reliées. La notice prévoit son enregistrement après le montage.

1. Placer WiPro III ou WiPro III safe.lock en mode d’apprentissage conformément à sa notice.
2. Relier les broches de contact du capteur avec un chiffon humide ou un autre matériau conducteur.
3. Vérifier que l’unité émettrice transmet un signal radio.
4. Attendre le signal sonore de confirmation de WiPro III indiquant la réussite de l’apprentissage.
5. Libérer les broches de contact et les sécher.
6. Quitter le mode d’apprentissage de WiPro III conformément à sa notice.

Les autres méthodes d’apprentissage et procédures de suppression sont décrites sous [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d’apprentissage]]. Toujours effectuer un test de fonctionnement complet après l’apprentissage.

---

## Test de fonctionnement final

1. S’assurer que WiPro III ou WiPro III safe.lock est armé.
2. Relier de nouveau les broches de contact du capteur avec un chiffon humide ou un matériau conducteur.
3. Vérifier que le système d’alarme déclenche l’alarme d’eau.
4. Si un Pro-Finder est installé, vérifier la réception de la notification d’alarme par SMS prévue.
5. Libérer les broches de contact et les sécher.
6. Arrêter l’alarme, par exemple avec l’[[Émetteur radio 868 — télécommande pour WiPro III|émetteur radio 868]].

Le test n’est réussi que si toutes les voies d’alarme prévues pour le système concerné fonctionnent. Le répéter après toute intervention sur le circuit d’eau, tout changement d’emplacement, tout remplacement de la pile ou toute modification du système d’alarme.

---

## Conduite à tenir en cas d’alarme d’eau

Une alarme d’eau indique qu’une humidité conductrice relie les broches de contact. Même une petite fuite peut provoquer d’importants dommages consécutifs.

1. Couper l’arrivée d’eau ou la pompe s’il est possible de le faire sans danger.
2. Contrôler la zone exposée et recueillir ou éliminer l’eau qui s’échappe.
3. À proximité d’installations électriques, ne pas toucher les éléments mouillés et faire couper correctement l’alimentation électrique.
4. Éliminer la cause de l’humidité ou la faire réparer par un atelier spécialisé.
5. Sécher le capteur et les broches de contact.
6. Arrêter l’alarme sur le système WiPro.
7. Effectuer un test de fonctionnement complet après avoir remédié au problème.

Le fabricant exclut toute responsabilité pour les dégâts des eaux et dommages consécutifs survenant malgré l’utilisation du détecteur. Celui-ci doit donc être considéré comme un dispositif d’alerte précoce, et non comme un dispositif technique de coupure ou de protection contre les fuites.

---

## Pile et indication de pile faible

Le détecteur d’eau sans fil utilise une **pile bouton CR2032 de 3 V** remplaçable. Son autonomie typique est d’environ deux ans ; les longues périodes de froid ont davantage d’influence que le nombre de signaux émis. Selon le fabricant, les piles bouton inutilisées peuvent être stockées jusqu’à dix ans ; respecter les indications et la date de péremption inscrites sur la pile.

La FAQ actuelle du fabricant recommande les piles Panasonic. Il convient de remplacer la pile environ tous les deux ans, par exemple à l’occasion du contrôle technique ou d’un contrôle de l’installation de gaz.

Lorsque la tension de la pile est inférieure à environ **2,6 V**, les indications suivantes sont documentées au déclenchement :

| Indication | Signification | Mesure |
|------------|---------------|--------|
| WiPro émet un signal sonore pendant environ 2 secondes | La pile de l’émetteur radio qui vient d’être déclenché doit être remplacée | Remplacer rapidement la pile |
| La LED d’émission rouge ne s’éteint qu’après environ 30 secondes | Indication visuelle complémentaire d’une pile faible | Remplacer la pile et contrôler le fonctionnement |

Si un accessoire radio signale une pile faible, les autres piles bouton CR2032 d’âge comparable sont souvent dans un état similaire. Les contrôler rapidement ; un remplacement préventif groupé peut être judicieux.

---

## Remplacement de la pile

1. Faire coulisser l’unité émettrice vers le haut pour la retirer de la plaque de montage.
2. Desserrer les deux vis du boîtier de l’unité émettrice.
3. Ouvrir prudemment le boîtier ; la carte électronique et le support de pile se trouvent à l’intérieur.
4. Faire glisser avec précaution la pile CR2032 usagée hors de son support.
5. Insérer une pile CR2032 neuve de même type en respectant la polarité.
6. Refermer le boîtier et serrer uniformément les deux vis.
7. Replacer l’unité émettrice sur la plaque de montage et l’enclencher complètement.
8. Déclencher le détecteur d’eau et effectuer le test de fonctionnement complet.

L’affectation radio est conservée après un remplacement normal de la pile ; il n’est pas nécessaire de réenregistrer le détecteur d’eau.

> **AVERTISSEMENT CONCERNANT LA PILE :** Ne pas ouvrir, court-circuiter, chauffer ou jeter les piles au feu. Les conserver hors de portée des enfants. En cas de fuite, éviter tout contact avec la peau et les yeux ; en cas de contact avec le liquide de la pile, rincer à l’eau et consulter un médecin. Éliminer immédiatement les piles usagées dans le respect de l’environnement.

---

## Entretien et contrôle régulier

- Maintenir l’unité émettrice au sec et facilement accessible.
- Maintenir les broches de contact exemptes de saletés, de revêtements et de résidus isolants.
- Contrôler régulièrement le capteur, le câble, la fixation et la plaque de montage pour vérifier leur bon maintien et l’absence de dommages.
- Ne pas utiliser de produits de nettoyage agressifs sur le capteur, le câble ou le boîtier.
- Effectuer un test de fonctionnement après toute intervention sur les conduites, réservoirs, pompes ou évacuations.
- Remplacer la pile au plus tard après environ deux ans ou en cas d’indication de pile faible.

Toute modification technique du produit ou du système d’alarme peut compromettre la fiabilité du fonctionnement et ne relève pas de l’utilisation prévue.

---

## Dépannage

| Observation | Cause possible | Mesure |
|-------------|----------------|--------|
| Aucune réaction lorsque les broches de contact sont reliées | pile déchargée, broches non reliées de manière conductrice ou appareil défectueux | insérer une CR2032 neuve ; relier correctement les contacts avec un chiffon humide ; recommencer le test |
| L’unité émettrice réagit, mais WiPro ne déclenche aucune alarme | détecteur d’eau non enregistré, système non armé ou version minimale non atteinte | contrôler l’apprentissage, l’armement, le numéro de série et le logiciel |
| WiPro déclenche une alarme, mais aucun SMS n’arrive | Pro-Finder absent, incompatible ou incomplètement configuré | contrôler la version du Pro-Finder, la connexion au réseau mobile et la configuration |
| Le capteur ne réagit qu’à une quantité d’eau importante | les broches de contact ne touchent pas le sol ou ne sont pas placées au point mouillé en premier | repositionner le capteur et répéter le test de fonctionnement |
| Fausses alarmes répétées | condensation, eau de nettoyage ou surface de montage constamment humide | déterminer la cause et repositionner le capteur à un emplacement approprié |
| Connexion radio peu fiable | le métal ou l’emplacement de montage fait écran au signal radio | déplacer l’unité émettrice et effectuer un test de portée complet |
| La plaque de montage se décolle | surface insuffisamment nettoyée, collage sous 15 °C ou mise en charge avant 24 heures | préparer de nouveau la surface et respecter toutes les consignes de montage |
| WiPro émet un signal sonore pendant environ 2 secondes au déclenchement | tension de la pile du détecteur d’eau inférieure à environ 2,6 V | remplacer la CR2032 et effectuer un test de fonctionnement |

Si le problème persiste, documenter pour l’assistance les numéros de série et versions logicielles complets du détecteur d’eau, de WiPro III et, le cas échéant, du Pro-Finder, ainsi que l’emplacement de montage, les signaux et le résultat du test. D’autres contrôles portant sur l’ensemble du système sont décrits sous [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

---

## Questions fréquentes (FAQ)

**Le détecteur d’eau sans fil peut-il fonctionner de manière autonome ?**  
Non. Il s’agit d’un accessoire pour les systèmes d’alarme WiPro III compatibles, dont il utilise les dispositifs d’alerte.

**Quel est le numéro d’article du détecteur d’eau sans fil ?**  
La notice et la page produit actuelles indiquent **106021**.

**Où le capteur doit-il être monté ?**  
Au point exposé, de manière à ce que les deux broches de contact touchent le sol. L’unité émettrice reste au bout du câble de 30 cm dans une zone sèche et facilement accessible.

**L’unité émettrice peut-elle être montée à l’extérieur puisqu’elle est classée IP67 ?**  
Non. La notice limite l’utilisation prévue à l’intérieur des véhicules de camping et exige une zone de montage sèche pour l’unité émettrice.

**Quelle version de WiPro est requise ?**  
Les versions minimales figurent dans le tableau de compatibilité. Les appareils plus anciens nécessitent une mise à niveau ou une mise à jour.

**Comment le détecteur d’eau est-il déclenché et enregistré ?**  
En reliant les broches de contact avec un matériau conducteur, par exemple un chiffon humide. WiPro doit alors se trouver en mode d’apprentissage.

**Quelle notification Pro-Finder transmet-il ?**  
La page produit actuelle documente une notification d’alarme par SMS. Un appel supplémentaire n’est pas expressément garanti pour ce capteur.

**Combien de temps la pile dure-t-elle ?**  
La pile CR2032 dure généralement environ deux ans. Lorsque sa tension descend sous environ 2,6 V, WiPro signale au déclenchement qu’elle doit être remplacée.

**Le détecteur d’eau doit-il être réenregistré après le remplacement de la pile ?**  
Non. Un test de fonctionnement complet reste toutefois nécessaire ensuite.

---

## Conformité et élimination

THITRONIK déclare que le produit est conforme à la directive **2014/53/UE**. La déclaration de conformité complète est disponible dans la rubrique Assistance du fabricant : `https://www.thitronik.de/support`

Ne pas jeter l’appareil ni la pile usagée avec les ordures ménagères. Déposer séparément la CR2032 dans un point de collecte de piles et l’unité émettrice dans un point de collecte adapté aux appareils électriques. Respecter les réglementations locales en matière d’élimination.

---

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d’apprentissage]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK|Vue d’ensemble du système]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
