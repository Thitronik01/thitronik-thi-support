---
title: Contact radiomagnétique 868 — montage et fonctionnement
sources:
  - sources/funk_magnetkontakt_sw.pdf
  - sources/funk_magnetkontakt_ws.pdf
  - sources/funk-magnetkontakte_montieren.pdf
  - sources/funk-magnetkontakt-wasserdicht-868.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/Fragen zu Funk-Magnetkontakt 868.pdf
  - sources/Fragen zu Funk-Magnetkontakt 868 wasserdicht.pdf
  - >-
    https://www.thitronik.de/produkte/produkt/funk-magnetkontakt-868-wasserdicht/
updated: '2026-07-18'
confidence: high
lang: fr
translation_of: sources/funk-magnetkontakt.md
---

# Contact radiomagnétique 868 — montage et fonctionnement

Les contacts magnétiques radio surveillent les portes, fenêtres, trappes, lanterneaux et coffres de toit. Si un ouvrant protégé est ouvert alors que le système d’alarme est armé, le contact envoie un signal radio à la **WiPro III**.

La version standard est disponible en noir et en blanc et convient aux emplacements de montage protégés. Pour les ouvrants exposés à l’humidité ou aux projections d’eau, il existe une version étanche distincte dotée de l’indice de protection **IP67**.

> **IMPORTANT :** Une alarme ne se déclenche que si le contact magnétique radio a été mémorisé dans le système d’alarme, si la liaison radio est établie et si le système d’alarme est armé. Un contact magnétique radio signale une effraction ou une tentative d’effraction, mais ne peut pas l’empêcher mécaniquement.

---

## Caractéristiques techniques

| Paramètre | Standard, réf. 100757/100758 | Étanche, réf. 106020 |
|-----------|-------------------------------|----------------------|
| Alimentation électrique | 1 × pile bouton CR2032, 3 V | 1 × pile bouton CR2032, 3 V |
| Durée de vie typique de la pile | env. 2 ans | env. 2 ans |
| Portée radio | env. 75 m en champ libre | env. 75 m en champ libre |
| Fréquence d’émission | 868,35 MHz | 868,35 MHz |
| Puissance d’émission | < 10 mW | < 10 mW |
| Dimensions de l’unité d’émission (L × H × P) | 44 × 34 × 15 mm | 52 × 35 × 14 mm |
| Dimensions de l’aimant (L × H × P) | non documentées séparément | 52 × 13 × 11 mm |
| Poids | env. 33 g | env. 37 g |
| Indice de protection | aucun indice de protection contre l’eau documenté | IP67 |
| Plage de température | −10 °C à +60 °C | maximum −40 °C à +125 °C selon la page produit actuelle |

La portée radio indiquée est une valeur en champ libre. Les parties métalliques du véhicule, le lieu de montage et d’autres écrans peuvent réduire considérablement la distance réellement atteinte.

La page produit THITRONIK actuelle indique un poids d’environ **37 g** pour la version étanche. La notice imprimée Rev. 1.0 mentionne encore environ **33 g** ; cet article reprend les données produit actuelles.

La WiPro III peut mémoriser au total **100 émetteurs radio** au maximum. Les contacts magnétiques radio partagent cette mémoire avec les télécommandes radio, les boucles de câble radio et les autres accessoires radio.

---

## Versions et domaines d’utilisation

| Version | Couleur | Réf. | Domaine d’utilisation | Compatibilité selon la documentation du produit |
|---------|---------|------|-----------------------|-------------------------------------------------|
| Standard | noire | 100757 | portes, fenêtres, trappes, lanterneaux et coffres de toit protégés | WiPro III, WiPro III safe.lock, WiPro easy |
| Standard | blanche | 100758 | portes, fenêtres, trappes, lanterneaux et coffres de toit protégés | WiPro III, WiPro III safe.lock, WiPro easy |
| Étanche | noire | 106020 | ouvrants exposés à l’humidité ou aux projections d’eau, par exemple trappes de garage, coffres de toit, capots moteur et portes de remorque | WiPro III et WiPro III safe.lock |

La version étanche possède une conception propre. Sa plaque de montage, l’orientation de son boîtier et les distances autorisées ne doivent pas être confondues avec les spécifications de la version standard.

---

## Principe de fonctionnement

Le contact magnétique radio se compose d’une unité d’émission avec capteur Reed et d’un aimant. Lorsque l’ouvrant est fermé, les deux éléments se trouvent dans la limite de distance autorisée. À l’ouverture, l’aimant s’éloigne, le contact émet et le système d’alarme armé déclenche une alarme.

La LED d’émission confirme chaque transmission. Elle sert également de repère d’orientation lors du montage et signale une pile faible lorsqu’elle reste allumée anormalement longtemps.

---

## Mémorisation dans la WiPro III

Chaque contact magnétique radio doit être mémorisé séparément avant utilisation. La méthode directe suivante nécessite un accès libre à la centrale WiPro III.

### Directement sur la centrale WiPro III

1. Vérifier que le connecteur à 20 broches est branché sur la centrale WiPro III.
2. Maintenir le bouton **« B »** situé à l’avant du boîtier enfoncé jusqu’à ce qu’un long signal sonore retentisse et que la LED d’état reste allumée.
3. Déclencher une transmission : pour la version standard, éloigner l’émetteur de l’aimant jusqu’à ce que la LED d’émission **« C »** clignote. Pour la version étanche, éloigner l’aimant de plus de **30 mm** de l’unité d’émission.
4. Attendre le court signal de confirmation ; la LED d’état s’éteint alors brièvement.
5. Pour terminer, appuyer brièvement sur le bouton **« B »**. Un double signal retentit et la LED d’état s’éteint.

Les autres méthodes de mémorisation, les conditions requises et les procédures d’effacement sont décrites dans [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus de mémorisation]].

---

## Test de portée avant le montage

Effectuer le test de portée après la mémorisation et avant de coller ou de visser définitivement les éléments.

1. Fixer provisoirement l’unité d’émission et l’aimant à l’emplacement de montage prévu.
2. Vérifier qu’en position fermée, les deux éléments sont correctement orientés et respectent la distance autorisée.
3. Armer le système d’alarme.
4. Ouvrir suffisamment l’ouvrant protégé pour que le contact émette. Pour la version étanche, porter la distance à plus de **30 mm**.
5. Vérifier que le système d’alarme se déclenche.

Si l’alarme ne se déclenche pas, vérifier d’abord la mémorisation et la pile. Modifier ensuite la position et exclure tout écran métallique éventuel entre le contact magnétique radio et la centrale. Sur une soute arrière, un adaptateur de montage peut améliorer la liaison radio.

---

## Montage de la version standard

### Orientation et distance

> **ATTENTION :** La platine ne doit pas être orientée avec la LED d’émission vers l’aimant. La mémorisation reste possible dans cette mauvaise orientation, mais aucune alarme ne se déclenche.

La LED d’émission doit être dirigée **à l’opposé de l’aimant**. Insérer la platine dans le boîtier de l’émetteur dans ce sens, puis encliqueter le couvercle.

La notice de montage spécifique au produit indique un rayon de montage maximal de **25 mm**. Le manuel d’installation de la WiPro III mentionne une valeur plus prudente d’environ **22 mm**. Pour un montage fiable, prévoir par conséquent une distance en position fermée de **22 mm au maximum** et vérifier la marge de fonctionnement par un test de portée et d’ouverture.

### Fixation par collage ou vissage

1. Choisir une surface de collage plane et éliminer entièrement la saleté, l’humidité et la graisse.
2. Ne pas appliquer les pastilles adhésives lorsque la température de surface est inférieure à **15 °C**.
3. Sur une surface rugueuse, coller la face non imprimée de la pastille sur le véhicule et la face imprimée sur l’émetteur ou l’aimant.
4. Sur du verre ou du verre acrylique, orienter la face imprimée vers l’extérieur pour son effet dissuasif.
5. Ne pas solliciter les éléments après le collage ; l’adhésif n’atteint sa résistance finale qu’après environ **24 heures**.

Si le collage n’est pas possible, le boîtier de l’émetteur peut être vissé aux emplacements repérés à l’intérieur. Choisir des fixations et des longueurs de vis adaptées afin de ne pas endommager des éléments ou des câbles du véhicule.

### Fenêtres, portes et trappes

- Sur les fenêtres, le boîtier de l’émetteur peut être monté horizontalement à gauche ou à droite selon le profil du cadre et l’espace disponible par rapport au store ou à la vitre. La LED d’émission doit toujours être dirigée à l’opposé de l’aimant.
- Sur les portes et les trappes, fixer si possible le boîtier de l’émetteur sur le cadre fixe et l’aimant sur le battant ou la trappe mobile.
- En présence d’un écart important ou d’une soute arrière métallique, utiliser l’adaptateur de montage approprié : **réf. 100428** en noir ou **réf. 100729** en blanc.

---

## Montage de la version étanche

### Orientation et distance

Sur la version étanche, les petites flèches de l’unité d’émission et de l’aimant doivent **pointer l’une vers l’autre**. En position fermée, la distance entre les deux éléments ne doit pas dépasser **22 mm**. Pour déclencher une transmission lors de la mémorisation et du test de fonctionnement, éloigner l’aimant de plus de **30 mm**.

> **ATTENTION :** Les flèches du boîtier et la distance de 22 mm s’appliquent à la version étanche. Ne pas lui appliquer la règle d’orientation de la LED ni le rayon de montage de la version standard.

### Fixation de la plaque de montage et de l’aimant

1. Choisir une surface propre, sèche et exempte de graisse. Ne pas appliquer la pastille adhésive fournie lorsque la température de surface est inférieure à **15 °C** et attendre environ **24 heures** pour qu’elle atteigne sa résistance finale.
2. Orienter la plaque de montage de sorte que ses ergots d’arrêt soient dirigés à l’opposé de l’aimant et que la petite flèche pointe vers l’aimant.
3. Tourner l’unité d’émission de façon que la flèche de son boîtier pointe dans le même sens que celle de la plaque de montage.
4. Placer l’unité d’émission sur les ergots et la faire coulisser dans le sens de la flèche jusqu’à ce qu’elle affleure la plaque de montage.
5. Fixer l’aimant avec les deux vis fournies de sorte que sa flèche pointe vers celle de l’unité d’émission.

Si la plaque de montage ne peut pas être collée, utiliser des **vis à tête fraisée adaptées en acier inoxydable V4A**. Ces vis ne sont pas fournies.

> **AVERTISSEMENT :** Vérifier l’emplacement de montage, le type et la longueur des vis avant de percer. Des vis inadaptées, incorrectes ou trop longues peuvent endommager des éléments et des câbles du véhicule.

---

## Portes déjà surveillées par le CAN-Bus

Les portes du véhicule dont l’état ouvert apparaît sur le combiné d’instruments ou l’écran multifonction sont généralement déjà surveillées par le **CAN-Bus** lorsque la WiPro III est correctement raccordée. Un contact magnétique radio supplémentaire n’est normalement pas nécessaire pour ces portes.

Vérifier sur le véhicule concerné si une porte est effectivement détectée par le véhicule et interprétée par la WiPro III. Des indications figurent dans [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

---

## Utilisation en service

1. Avant d’armer le système, vérifier que l’unité d’émission et l’aimant sont solidement fixés, correctement orientés et que l’ouvrant est entièrement fermé.
2. Armer le système d’alarme.
3. À l’ouverture de la porte, de la fenêtre ou de la trappe protégée, vérifier que le contact magnétique radio émet et que le système d’alarme se déclenche.
4. Désarmer le système d’alarme avant toute intervention sur le contact ou avant d’ouvrir le boîtier de l’émetteur.

Après le montage, contrôler séparément chaque contact magnétique radio par un test d’alarme. Une simple confirmation pendant la mémorisation ne prouve pas que l’alarme fonctionne de manière fiable si la platine standard est mal orientée.

---

## Contrôle et remplacement de la pile

Les deux versions utilisent une **pile bouton CR2032 de 3 V**. Sa durée de vie typique est d’environ deux ans ; de longues périodes de froid peuvent la raccourcir.

### Signal de pile faible

Lorsque la tension de la pile est inférieure à environ **2,6 V**, la WiPro fournit les indications suivantes au déclenchement du contact magnétique radio :

- La centrale émet un signal sonore pendant environ **2 secondes**.
- La LED d’émission rouge du contact ne s’éteint qu’après environ **30 secondes**.

Si un accessoire radio alimenté par une CR2032 signale une pile faible, il est recommandé de contrôler rapidement les autres piles bouton d’âge similaire.

### Version standard

Pour remplacer la pile de la version standard, utiliser la notice rapide THITRONIK du support correspondant à la version du boîtier. Désarmer auparavant le système d’alarme, utiliser uniquement une CR2032 neuve, respecter la polarité, puis contrôler la fermeture du boîtier, le fonctionnement et la portée.

### Version étanche

1. Désarmer le système d’alarme et faire coulisser l’unité d’émission hors de la plaque de montage.
2. Desserrer les deux vis du boîtier et ouvrir celui-ci.
3. Retirer délicatement la CR2032 usagée du support de pile.
4. Insérer une **CR2032, 3 V** neuve en respectant la polarité.
5. Positionner correctement le joint, refermer et revisser le boîtier, puis remettre l’unité d’émission sur la plaque de montage et contrôler le fonctionnement ainsi que la portée.

> **AVERTISSEMENT :** Un remplacement incorrect de la pile présente un risque d’explosion. Ne pas jeter les piles au feu, les ouvrir ou les court-circuiter. Tenir les piles bouton et les petites pièces hors de portée des enfants ; leur ingestion peut être mortelle. En cas de suspicion, consulter immédiatement un médecin. Éviter tout contact du liquide d’une pile qui fuit avec la peau ou les yeux ; rincer les zones touchées à l’eau et consulter un médecin.

---

## Diagnostic des pannes

| Observation | Cause possible | Mesure |
|-------------|----------------|--------|
| Le contact standard peut être mémorisé, mais ne déclenche aucune alarme | La platine est orientée avec la LED d’émission vers l’aimant | Retourner la platine ; la LED d’émission doit être dirigée à l’opposé de l’aimant |
| Le contact étanche ne se déclenche pas de manière fiable | Les flèches du boîtier ne pointent pas l’une vers l’autre ou la distance en position fermée est trop grande | Corriger l’orientation et limiter la distance à 22 mm au maximum |
| Aucun signal de confirmation ni aucune alarme | Contact non mémorisé, pile déchargée ou liaison radio masquée | Vérifier la mémorisation et la pile ; répéter le test de portée |
| Le contact de la soute arrière fonctionne de manière irrégulière | L’émetteur est monté sur du métal ou la liaison radio est masquée | Modifier la position ; pour la version standard, utiliser l’adaptateur 100428 ou 100729 |
| Le contact se décolle après un certain temps | Surface insuffisamment nettoyée, collage effectué à une température trop basse ou pastille sollicitée avant 24 heures | Préparer de nouveau la surface et respecter les consignes de collage |
| Signal sonore d’environ 2 secondes et LED d’émission rouge allumée longtemps | CR2032 faible | Remplacer la pile, puis contrôler le fonctionnement et la portée |
| Alarme intempestive alors que l’ouvrant surveillé est fermé | Distance trop grande, éléments mobiles ou pastille adhésive qui se décolle | Contrôler la fixation, la distance, l’orientation et le montage |

En cas de problème de réception ou d’alarme non résolu, relever pour le support les numéros de série complets du système d’alarme et du contact magnétique radio, l’état de la pile, les données du véhicule, la version et la situation de montage.

---

## Questions fréquentes (FAQ)

**Quelle version me faut-il ?**  
Les contacts standard noirs et blancs conviennent aux emplacements de montage protégés. La version étanche avec la réf. 106020 et IP67 est prévue pour les ouvrants situés dans des zones exposées à l’humidité ou aux projections d’eau.

**Pourquoi puis-je mémoriser le contact standard alors qu’il ne déclenche ensuite aucune alarme ?**  
Cela se produit souvent lorsque la platine est insérée à l’envers. La LED d’émission doit être dirigée à l’opposé de l’aimant. Toujours effectuer un test d’alarme après avoir corrigé l’orientation.

**Quelle est la distance maximale entre l’émetteur et l’aimant ?**  
22 mm au maximum pour la version étanche. Pour la version standard, la notice spécifique au produit indique 25 mm, tandis que le manuel d’installation de la WiPro III mentionne environ 22 mm. Une distance en position fermée de 22 mm au maximum est donc recommandée pour un fonctionnement fiable.

**Quand ai-je besoin d’un adaptateur de montage ?**  
En présence d’écarts importants ou de soutes arrière métalliques. Pour la version standard, la réf. 100428 est disponible en noir et la réf. 100729 en blanc.

**Puis-je visser la plaque de montage étanche ?**  
Oui. Des vis à tête fraisée adaptées en acier inoxydable V4A sont nécessaires et ne sont pas fournies. Le type et la longueur des vis doivent convenir à la structure du véhicule.

**Ai-je besoin de contacts magnétiques radio sur les portes du véhicule déjà signalées comme ouvertes ?**  
En général non, si la porte est détectée par le CAN-Bus et correctement interprétée par la WiPro III. Cela doit être vérifié sur le véhicule.

**Que signifie le signal sonore de deux secondes après l’ouverture ?**  
La pile du dernier accessoire radio déclenché est faible. Sur le contact magnétique radio concerné, la LED d’émission rouge reste également allumée pendant environ 30 secondes. Remplacer rapidement la CR2032.

---

## Conformité et mise au rebut

Selon le fabricant, les contacts magnétiques radio 868 sont conformes aux exigences de la directive **2014/53/UE**. La déclaration de conformité complète est disponible dans la rubrique d’assistance de THITRONIK : `https://www.thitronik.de/support`

Ne pas jeter les appareils ni les piles usagées avec les ordures ménagères. Déposer séparément les piles bouton dans une filière de recyclage. Tenir les emballages et le matériel de montage hors de portée des enfants.

---

## Articles associés

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus de mémorisation]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Télécommande radio 868]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles|Boucle de câble radio 868]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK|Vue d’ensemble du système]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
