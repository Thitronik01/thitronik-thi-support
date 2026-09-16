---
title: G.A.S.-pro (anciennes séries) — Alarme gaz et CO
sources:
  - 'https://www.thitronik.de/produkte/produkt/gas-pro/'
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/anleitungen/handbuch_gas-pro_2.5.pdf
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/sonstiges/co_sensor-de_en_fr.pdf
  - sources/handbuch_gas-pro_2.5.pdf
  - sources/Fragen zu CO-Sensor für G.A.S.-pro und G.A.S.-pro III.pdf
  - sources/Fragen zu G.A.S.-pro.pdf
  - sources/Gaswarner.docx
updated: '2026-07-17'
confidence: high
lang: fr
translation_of: de/gas-pro.md
---

# G.A.S.-pro (anciennes séries) — Alarme gaz et CO

**Numéro d’article de l’appareil principal :** impossible à déterminer sans ambiguïté à partir des documents évalués  
**Désignation du manuel :** Manuel 2.5  
**Révision du document indiquée dans le manuel :** 2.2

G.A.S.-pro est un avertisseur de gaz modulaire à installation fixe, pouvant recevoir jusqu’à trois capteurs externes. Dans sa configuration de base, il détecte le propane, le butane et les gaz narcotiques/anesthésiants ; avec un capteur CO compatible, le système peut également surveiller le monoxyde de carbone. La centrale possède un avertisseur sonore intégré, des entrées AutoSense, une compensation dynamique de la température et un autotest permanent.

THITRONIK classe le manuel parmi les produits archivés, tandis que la page produit reste disponible. G.A.S.-pro III y est présenté comme la nouvelle génération. Avant de commander une pièce de rechange, d’étendre le système ou d’organiser une mise à jour logicielle, identifier clairement le modèle, le numéro de série, la configuration des capteurs et la version logicielle de l’installation existante.

> [!WARNING]
> G.A.S.-pro n’est pas un détecteur de fumée et ne détecte le CO qu’avec un capteur CO compatible prévu à cet effet. Pendant le préchauffage, lorsque l’alimentation est coupée ou lorsqu’un défaut de capteur ou de câble est signalé, la surveillance complète n’est pas confirmée.

## Caractéristiques techniques et distinction des sources

| Paramètre | Valeur documentée |
|---|---|
| Alimentation nominale selon la page produit actuelle | 12/24 V CC |
| Plage d’alimentation selon le manuel | 9–30 V CC |
| Consommation de la centrale selon le manuel | env. 10 mA |
| Consommation d’un capteur GPL/gaz narcotiques selon le manuel | env. 75 mA par capteur |
| Consommation d’un capteur CO selon le manuel | env. 40 mA par capteur |
| Consommation selon la page produit actuelle | env. 80 mA par capteur |
| Entrées de capteur | 3 |
| Sensibilité GPL/gaz narcotiques | à partir de 50 ppm |
| Détection de CO selon le manuel | à partir de 300 ppm, en option |
| Avertisseur sonore interne selon la page produit actuelle | env. 85 dB |
| Sirène optionnelle selon la page produit actuelle | env. 105 dB |
| Plage de température maximale | −20 °C à +80 °C |
| Plage recommandée avec capteur externe GPL/gaz narcotiques | 0 °C à +70 °C |
| Plage recommandée avec capteur CO externe | 0 °C à +50 °C |
| Dimensions (L × H × P) | 100 × 90 × 40 mm |
| Poids | env. 140 g |
| Garantie indiquée dans le manuel | 36 mois à compter de la date d’achat |

Les valeurs n’ont pas été harmonisées silencieusement : le manuel indique la plage d’entrée électrique et des consommations distinctes pour la centrale et les types de capteurs, tandis que la page produit actuelle indique la tension nominale et une valeur arrondie par capteur. Pour le choix du fusible, le dimensionnement des câbles ou le calcul du courant de veille, consulter le manuel fourni avec l’appareil précis, la configuration réelle des capteurs et, si nécessaire, l’assistance THITRONIK. L’existence d’un droit à garantie dans un cas particulier dépend de la date d’achat, du justificatif et des conditions applicables.

## Vérification rapide

| Question | Réponse |
|---|---|
| Fonctionnement autonome possible ? | Oui, grâce à l’avertisseur sonore intégré |
| Intégration dans un système d’alarme de véhicule ? | Oui, par liaison filaire via `NC`/`NO` et `COM` |
| Intégration directe à WiPro III ? | La page produit actuelle indique qu’une liaison filaire est possible ; vérifier les entrées et sorties concrètes des deux appareils |
| Gaz détectés dans la configuration de base | Propane, butane et gaz narcotiques/anesthésiants |
| Monoxyde de carbone détecté ? | Uniquement avec le capteur CO compatible, article `100433` |
| Nombre d’entrées de capteur | jusqu’à 3 capteurs |
| Capteur dans la centrale | Non |
| Temps de préchauffage | env. 4 minutes |
| Prêt à détecter les gaz | Le témoin de fonctionnement clignote périodiquement |
| Embouts de câble | À utiliser avec G.A.S.-pro |

## Rôle du produit et distinction

| Produit | Rôle | Différence essentielle |
|---|---|---|
| **G.A.S.-pro** | Système modulaire à installation fixe de l’ancienne série | Centrale sans capteur de gaz intégré ; jusqu’à trois capteurs externes ; contacts d’alarme filaires |
| [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]] | Nouvelle génération | L’équipement des capteurs et les fonctions système diffèrent ; utiliser son propre manuel et ses règles de raccordement |
| [[Capteur CO — capteur supplémentaire de monoxyde de carbone]] | Capteur CO optionnel, article `100433` | Ne fonctionne pas de manière autonome ; vérifier la compatibilité logicielle et celle de l’appareil principal |
| [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]] | Module complémentaire radio pour WiPro III | Pas de fonctionnement autonome ; ne constitue pas une extension de capteur G.A.S.-pro |
| [[G.A.S.-plug « tout en un » — détecteur de gaz mobile]] | Détecteur de gaz mobile autonome | Alimentation par prise ; aucun capteur externe |

« Ancienne série » ne signifie pas que toute installation existante est hors service. Cela signifie que l’entretien, les accessoires et les règles de raccordement doivent être vérifiés pour la version précise de l’appareil et ne doivent pas être repris sans contrôle de G.A.S.-pro III.

## Gaz détectables et limites du système

| Substance ou événement | Détection par G.A.S.-pro |
|---|---|
| Propane | Oui, avec capteur GPL/gaz narcotiques |
| Butane | Oui, avec capteur GPL/gaz narcotiques |
| Gaz narcotiques/anesthésiants | Oui, avec capteur GPL/gaz narcotiques |
| Monoxyde de carbone (CO) | En option, avec capteur CO compatible |
| Dioxyde de carbone (CO₂) | Non documenté |
| Fumée ou chaleur | Non |
| Manque d’oxygène | Non |

Les déodorants, lotions après-rasage, produits nettoyants agressifs, l’alcool dans l’haleine, les vapeurs de cuisson et d’autres substances similaires à des gaz peuvent également déclencher une réaction du capteur. Il faut néanmoins traiter d’abord toute alarme comme un événement gazeux réel et n’en rechercher la cause que depuis un endroit sûr.

## Configuration du système et équipement en capteurs

La centrale ne contient aucun capteur de gaz. Selon le manuel, jusqu’à trois capteurs peuvent être raccordés à ses entrées AutoSense :

- capteurs GPL/gaz narcotiques, article `100456`
- capteurs CO, article `100433`
- combinaison appropriée des deux types de capteurs

Le nombre de capteurs doit être adapté à l’agencement du véhicule, aux séparations intérieures et aux couchages. Un seul capteur de gaz monté en partie basse ne remplace pas un capteur CO proche du plafond ; inversement, le capteur CO ne détecte ni le propane, ni le butane, ni les gaz narcotiques.

## Contenu de la livraison

Le contenu de la livraison documenté comprend :

- centrale G.A.S.-pro
- capteur de propane, de butane et de gaz narcotiques/anesthésiants
- autocollant d’avertissement
- manuel
- matériel de montage

Avant la mise en service d’un système existant ou d’occasion, vérifier que son équipement en capteurs et son contenu sont complets. Un capteur CO optionnel ne fait pas partie de la configuration de base documentée.

## Divergence des sources sur la longueur du câble de capteur

| Source | Indication |
|---|---|
| Manuel G.A.S.-pro 2.5 | Câble de capteur extensible jusqu’à 7 m maximum avec un câble de section identique ou supérieure |
| FAQ produit actuelle | Longueur totale jusqu’à 8 m avec une section d’au moins `3 × 0,14 mm²` ou supérieure |

Pour une conception prudente et spécifique au produit, utiliser une **longueur totale maximale de 7 m**. N’utiliser une longueur totale supérieure que si les documents actuels ou l’assistance technique la confirment pour la combinaison et la version précises de l’appareil et du capteur. Toute rallonge doit être électriquement fiable, protégée mécaniquement et réalisée avec une section de conducteur au moins identique.

## Emplacement des capteurs

Le GPL et les gaz narcotiques sont plus lourds que l’air. Monter le capteur correspondant sous les couchages, sur une surface verticale et aussi près que possible du plancher. La FAQ THITRONIK actuelle précise une hauteur d’environ **10 à 30 cm au-dessus du plancher**.

| Capteur / situation | Exigence |
|---|---|
| Capteur GPL/gaz narcotiques | environ 10 à 30 cm au-dessus du plancher |
| Distance du couchage à protéger | 1 m maximum selon le manuel |
| Plusieurs couchages à des hauteurs différentes | envisager des capteurs supplémentaires près des couchages |
| Séparation par une porte ou un rideau | envisager un point de détection supplémentaire |
| Capteur CO | aussi près que possible du plafond ; respecter les instructions de montage du capteur |
| Sortie de chauffage | distance d’au moins 1 m |
| Batterie au plomb-acide | distance d’au moins 1,5 m |
| Cabinet de toilette | inadapté |

Ne pas couvrir les ouvertures des capteurs. Les solvants, le silicone, les aérosols puissants, le flux direct d’air chaud et les zones durablement humides peuvent perturber la mesure ou endommager le capteur.

## Montage des capteurs

1. Mettre entièrement le système hors tension.
2. Vérifier l’emplacement prévu et l’espace libre derrière la paroi.
3. Percer un trou de **Ø 20 mm** pour le capteur de gaz standard ou de **Ø 12 mm** pour le capteur CO.
4. Enfoncer la douille fournie depuis l’extérieur.
5. Fixer le capteur depuis l’intérieur à l’aide des vis fournies.
6. Acheminer le câble de manière protégée jusqu’à la centrale et le raccorder conformément au schéma de l’appareil précis.
7. Avec G.A.S.-pro, **utiliser des embouts de câble**.

> [!WARNING]
> Ne pas utiliser de colles contenant des solvants ni de mastics contenant du silicone à proximité du capteur. Ils peuvent endommager ou empoisonner l’élément sensible.

## Montage de la centrale

Comme la centrale ne contient aucun capteur de gaz, elle peut généralement être installée dans un placard. Ne pas la monter juste à côté d’un chauffage ou d’un chauffe-eau, car cela peut perturber la compensation dynamique de la température.

En cas de montage dissimulé, respecter les points suivants :

- L’avertisseur sonore intégré doit rester clairement audible dans toute la zone protégée.
- Si nécessaire, installer la sirène supplémentaire article `100190`.
- Le témoin de fonctionnement doit rester visible ; si nécessaire, installer le témoin externe article `100034`.
- Les bornes, le fusible et le cheminement des câbles doivent rester accessibles pour un diagnostic professionnel.

## Raccordement électrique

Effectuer tous les raccordements hors tension. Le schéma de raccordement, les désignations des bornes et la version de l’appareil priment sur les indications générales de couleur.

| Raccordement | Fonction |
|---|---|
| Entrées de capteur | jusqu’à trois capteurs AutoSense |
| `IGN` | activation/désactivation automatique par l’allumage ou commande manuelle par interrupteur |
| `NC` et `COM` | contact normalement fermé en série avec l’entrée d’un système d’alarme compatible |
| `NO` et `COM` | contact normalement ouvert en parallèle avec le contact d’alarme d’un système compatible |
| Raccordement de sirène | sirène externe optionnelle selon le schéma de raccordement propre au produit |
| LED externe | témoin de fonctionnement optionnel, article `100034` |

La FAQ du fabricant indique des couleurs de câbles différentes pour les anciens capteurs :

| Signal | Couleur actuelle | Ancienne couleur |
|---|---|---|
| `GND` | blanc | noir |
| `Ub` | marron | marron |
| Signal du capteur | vert | bleu |

Ne jamais utiliser les couleurs seules comme autorisation de raccordement. Contrôler la désignation des bornes, la continuité et le schéma de raccordement précis.

## Raccordement à l’allumage et autorisation de fonctionnement

La variante recommandée dans le manuel utilise `IGN` pour la commande automatique :

| État du véhicule | G.A.S.-pro |
|---|---|
| Allumage coupé | actif |
| Allumage mis | inactif |

Il est également possible d’appliquer `+12 V` sur `IGN` par l’intermédiaire d’un interrupteur. Une désactivation pendant la conduite ne doit pas être confondue avec un défaut. Après chaque réactivation, attendre la fin du préchauffage puis confirmer le clignotement périodique du témoin de fonctionnement.

## Mise en service et phase de préchauffage

1. Vérifier le montage, la configuration des capteurs, les positions des bornes, l’alimentation et la protection par fusible.
2. Mettre le système en marche.
3. Trois signaux sonores confirment le démarrage ; le témoin de fonctionnement reste d’abord allumé en continu.
4. Attendre la phase de préchauffage d’environ quatre minutes.
5. Le système n’est prêt à détecter les gaz que lorsque le témoin de fonctionnement clignote périodiquement.
6. Après l’installation, effectuer un test contrôlé de chaque capteur GPL/gaz narcotiques raccordé.

Le manuel ne fournit aucune attribution fiable de couleur au témoin de fonctionnement. Pour le diagnostic, utiliser donc « allumé en continu » et « clignote périodiquement », sans reprendre la couleur d’une autre version de G.A.S.-pro.

## Déroulement de l’alarme

| Événement | Déroulement documenté de l’alarme |
|---|---|
| Propane, butane ou gaz narcotiques/anesthésiants | avertisseur sonore intégré et éventuelle sirène externe pendant environ 30 secondes ; puis pause de 30 secondes ; répétition tant que le gaz reste présent |
| Monoxyde de carbone | le manuel documente 10 secondes pour la sirène externe ; l’indication concrète et les autres voies d’alarme dépendent de la version et de la configuration |
| Défaut du capteur ou du câble | signal sonore intermittent jusqu’à la correction du défaut |

Ne pas transposer la durée de 10 secondes pour le CO à G.A.S.-pro III ou à d’autres dispositifs d’alarme. La logique de sortie et la durée du signal sont propres au produit.

## Comportement en cas d’alarme gaz ou CO

1. Prendre l’alarme au sérieux et faire immédiatement sortir toutes les personnes et tous les animaux.
2. En cas de suspicion de CO, ne pas perdre de temps à chercher la source ; les symptômes peuvent constituer une urgence médicale.
3. Ne pas fumer et ne pas actionner d’interrupteurs électriques, de prises ou d’autres sources possibles d’inflammation.
4. Ne fermer l’arrivée de gaz que si cela peut être fait sans danger.
5. Ouvrir portes et fenêtres depuis une position sûre et aérer soigneusement le véhicule.
6. En cas de symptômes, de concentration élevée ou de situation incertaine, appeler les services d’urgence ou les autorités compétentes.
7. Ne réutiliser le véhicule et les appareils à gaz qu’après résolution professionnelle de la cause et confirmation d’une atmosphère sûre.

L’arrêt du signal sonore ne confirme pas que l’atmosphère est sûre et n’élimine pas la source de gaz.

## Test de fonctionnement sûr

Le manuel G.A.S.-pro exige un test de chaque capteur GPL/gaz narcotiques raccordé après l’installation :

1. Mettre le système en marche et attendre la fin complète du préchauffage.
2. Ne tester que lorsque le témoin de fonctionnement clignote périodiquement.
3. Dans un environnement bien ventilé et loin de toute source d’inflammation, appliquer brièvement une quantité contrôlée de gaz de briquet au capteur 1, sans flamme nue.
4. L’alarme doit se déclencher après quelques secondes.
5. Attendre environ 30 secondes, aérer complètement, puis répéter successivement la procédure avec les autres capteurs GPL/gaz narcotiques.

Ne pas approcher de flamme du capteur et ne pas utiliser de bouteille de propane, d’alcool à brûler ou de gaz d’essai libéré sans contrôle. En cas de doute, faire effectuer le test par un atelier spécialisé.

Le capteur CO ne réagit pas au gaz de briquet. Le manuel n’exige aucun test utilisateur distinct pour ce capteur. Un contrôle au CO ne doit être effectué que par du personnel qualifié avec une méthode appropriée et contrôlée ; ne jamais introduire de gaz d’échappement ou de combustion ouverte dans l’habitacle.

## Défauts du capteur et signaux sonores

L’autotest permanent peut signaler des erreurs de câblage, des défauts de capteur et certaines variations du logiciel ou du capteur.

| Observation | Interprétation / action suivante |
|---|---|
| Signal sonore intermittent | défaut du capteur ou du câble ; ne pas considérer le système comme totalement opérationnel |
| Signal irrégulier simple, double ou triple | selon la FAQ du fabricant, possible variation de qualité du capteur ; contacter l’assistance technique avec les données de l’appareil et des capteurs |
| Signal sonore ininterrompu juste après l’installation | les fils du capteur sont souvent décalés d’une position de borne vers `IGN` |
| Aucune alarme pendant le test | vérifier le câblage, l’affectation du capteur, l’état de préchauffage et la procédure de test |
| Alarme immédiatement après le premier préchauffage | le capteur peut être affecté par un stockage incorrect ou une contamination ; suivre la procédure du fabricant et contacter l’assistance en cas de répétition |

Dans les sources du fabricant évaluées, le nombre de signaux sonores **n’est pas une attribution confirmée aux emplacements de capteur 1, 2 ou 3**. Ne pas établir de diagnostic d’emplacement à partir du nombre de signaux.

## Dépannage sûr

1. Documenter le schéma d’alarme et de défaut : témoin, séquence sonore, moment et capteurs raccordés.
2. Mettre le système hors tension.
3. Vérifier les positions des bornes à l’aide du schéma, en portant une attention particulière au passage entre `IGN` et la première borne de capteur.
4. Contrôler les embouts de câble, la décharge de traction, les ruptures de câble et toutes les jonctions de rallonge.
5. Comparer les types de capteurs, les numéros de série et, pour les capteurs CO, la version logicielle requise.
6. Après correction, rétablir l’alimentation et attendre la fin complète du préchauffage.
7. Si le défaut persiste, ne pas valider le système comme dispositif de protection et contacter un revendeur spécialisé ou l’assistance THITRONIK.

Ne pas ponter de fusible, déplacer de bornes sous tension ni appliquer de tension externe aux entrées de capteur. D’autres procédures figurent dans [[Dépannage — diagnostic sûr des problèmes fréquents]].

## Capteur CO article 100433 et version logicielle

Le [[Capteur CO — capteur supplémentaire de monoxyde de carbone]] externe ajoute la détection du CO à une G.A.S.-pro compatible. Les règles suivantes s’appliquent au type de capteur `SNO433-003` :

| Plage de numéros de série G.A.S.-pro | Mesure requise |
|---|---|
| à partir de `0001-003` | le logiciel 1.04i est automatiquement présent selon le document du capteur CO |
| `SN40-XXX` | envoyer l’appareil principal pour une mise à jour logicielle |
| `SN0001-001` | envoyer l’appareil principal pour une mise à jour logicielle |
| `SN0001-002` | envoyer l’appareil principal pour une mise à jour logicielle |

Avant le raccordement, poser des embouts de câble et vérifier l’entrée de capteur libre ainsi que la configuration totale admissible. Ne pas considérer les préfixes de numéros de série comme des numéros d’article.

## Accessoires

| N° d’article | Produit | Remarque d’utilisation |
|---|---|---|
| `100456` | Capteur supplémentaire G.A.S.-pro | propane, butane et gaz narcotiques/anesthésiants |
| `100433` | Capteur CO | vérifier la compatibilité et la version logicielle |
| `100190` | Sirène supplémentaire | améliore l’audibilité ; sans batterie interne |
| `100034` | Témoin de fonctionnement externe | pour montage dissimulé de la centrale |
| `100089` | Sirène de secours 12 V | vérifier l’autorisation de raccordement propre au produit |

Utiliser uniquement des accessoires d’origine ou des composants expressément homologués. Ne pas déduire le numéro d’article de l’appareil principal G.A.S.-pro installé à partir des numéros d’accessoires ou des numéros de série ; voir [[Registre des numéros d’article — produits et accessoires]] et [[Sirènes et klaxons — moyens d'alarme acoustiques]].

## Différences avec G.A.S.-pro III

| Caractéristique | G.A.S.-pro | G.A.S.-pro III |
|---|---|---|
| Génération du produit | ancienne série | nouvelle génération |
| Capteur dans la centrale | non | intégré selon la variante |
| Capacité de capteurs externes | jusqu’à trois capteurs | entrée de capteur externe propre au produit |
| Intégration au système d’alarme | contacts filaires `NC`/`NO` | interfaces radio et filaires propres au produit |
| Embouts de câble sur le capteur externe | utiliser | ne pas utiliser ; ne pas étamer les extrémités des conducteurs |
| Détection du CO | capteur CO externe optionnel | G.A.S.-pro III CO ou capteur CO externe compatible selon la variante |
| Alarme sonore intégrée | oui | oui |

Ne jamais transposer entre les générations les schémas de raccordement, les règles des capteurs, les durées d’alarme, les états des LED ou les procédures de test.

## Informations pour un dossier d’assistance

| Information | Exemple / emplacement |
|---|---|
| Désignation du produit | G.A.S.-pro, et non G.A.S.-pro III |
| Numéro de série complet de l’appareil principal | plaque signalétique |
| Version logicielle | affichage, étiquette ou information de l’assistance |
| Capteurs | type, numéro d’article, numéro de série complet et entrée utilisée |
| Type de capteur CO | notamment `SNO433-003` |
| Alimentation | tension mesurée avec allumage mis et coupé |
| Témoin de fonctionnement | allumé en continu ou clignotant ; moment après la mise en marche |
| Signal sonore | continu, intermittent ou nombre de signaux irréguliers |
| Câblage | photos des bornes, embouts de câble et couleurs des fils |
| Emplacement de montage | hauteur du capteur et distances du couchage, du chauffage et de la batterie |
| Rallonge de câble | longueur totale, section et jonctions |
| Contrôles déjà effectués | contrôles concrets réalisés hors tension |

Le modèle complet est disponible sous [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]].

## Renvois

- [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]]
- [[Capteur CO — capteur supplémentaire de monoxyde de carbone]]
- [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]]
- [[G.A.S.-plug « tout en un » — détecteur de gaz mobile]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
- [[Registre des numéros d’article — produits et accessoires]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
- [[Glossaire — Termes techniques du système THITRONIK]]
