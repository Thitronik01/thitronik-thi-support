---
title: Capteur CO — capteur supplémentaire de monoxyde de carbone
sources:
  - 'https://www.thitronik.de/produkte/produkt/co-sensor-fuer-gas-pro/'
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/sonstiges/co_sensor-de_en_fr.pdf
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/anleitungen/handbuch_gas-pro_2.5.pdf
  - >-
    https://www.thitronik.de/fileadmin/user_upload/produkte/gas-pro-iii/technische_zusatzinformationen_gas-pro_iii.pdf
  - sources/CO-Sensor__100433__Overview_DE.md
  - sources/CO-Sensor__100433__Reference__Software_Seriennummern_DE.md
  - sources/handbuch_gas-pro_2.5.pdf
  - sources/technische_zusatzinformationen_gas-pro_iii.pdf
  - sources/Seriennummer 0433 CO-Sensor.csv
  - wiki/gas-pro.md
  - wiki/gas-pro-iii.md
  - wiki/stoerungsbeseitigung.md
updated: '2026-07-16'
confidence: high
lang: fr
translation_of: de/co-sensor.md
---

# Capteur CO — capteur supplémentaire de monoxyde de carbone

**Numéro d'article. 100433 · Préfixe du numéro de série 0433-**

Le capteur de CO détecte le **monoxyde de carbone (CO)** et ajoute une surveillance externe du CO à un G.A.S.-pro ou G.A.S.-pro III compatible. Le CO est un gaz de combustion toxique, incolore et inodore et ne doit pas être confondu avec le dioxyde de carbone (CO₂).

> **Capteur supplémentaire dépendant du système :** Le capteur de CO ne fonctionne pas de manière autonome. L'alarme, l'affichage des erreurs et l'alimentation s'effectuent via l'appareil principal connecté.

---

## Données techniques

| Paramètres | Valeur documentée |
|---|---|
| Numéro d'article | `100433` |
| Préfixe du numéro de série | `0433-` |
| Gaz détecté | Monoxyde de carbone (CO) |
| Consommation électrique | env. 6 mA |
| Dimensions | env. 71 × 49 × 19 mm |
| Poids | env. 80 g |
| Câble de connexion | 4 m selon la description actuelle du produit |
| Trou de montage | Ø 12 mm |
| Plage de température recommandée avec G.A.S.-pro | 0 °C à 50 °C |
| Limite de durée de vie | la mention individuelle « Exp. Date » sur la plaque signalétique fait foi |

Les valeurs techniques du capteur CO externe ne doivent pas être confondues avec celles du capteur CO intégré d'un G.A.S.-pro III CO ni avec celles d'un capteur supplémentaire pour GPL/gaz anesthésiants.

---

## Vérification rapide

- Vérifier l'identité du produit : **Art. 100433**, préfixe du numéro de série **0433-**.
- Connectez-vous uniquement à un G.A.S.-pro ou G.A.S.-pro III compatible documenté.
- Avec G.A.S.-pro **utiliser des embouts de fil**.
- Avec G.A.S.-pro III **n'utilisez pas d'embouts de fil** et n'étamez pas les extrémités du câble.
- Pour le capteur type `SNO433-003` sur G.A.S.-pro, assurer au moins le logiciel **1.04i**.
- Montez le capteur juste en dessous du plafond ; Le dessin d'assemblage indique une distance de **10-30 cm**.
- Réaliser un trou **Ø 12 mm** et éviter les colles ou mastics inadaptés.
- Vérifier la date d'expiration **« Exp. Date »** sur le capteur ; Faites remplacer les capteurs périmés.
- Ne testez jamais le capteur de CO avec du gaz plus léger, du propane ou du butane.
- Effectuer les travaux de raccordement uniquement hors tension.

---

## Rôle du produit et limites fonctionnelles

| Fonction | Classement |
|---|---|
| Gaz détecté | Monoxyde de carbone (CO) |
| Fonctionnement indépendant | Non; appareil principal compatible requis |
| Alarme acoustique | via G.A.S.-pro ou G.A.S.-pro III et leurs dispositifs d'alarme connectés |
| Détection de gaz propane, butane ou anesthésiques | Non; Pour cela, un capteur de liquide/gaz KO approprié est nécessaire. |
| Remplacement d'un avertisseur de fumée ou d'incendie | Non; le capteur détecte le CO, mais pas tous les paramètres d'incendie |
| Ventilation des véhicules ou élimination des risques | Non; le capteur avertit seulement et n'élimine pas la cause |

Un avertisseur de CO doit être traité comme un danger réel. Les personnes et les animaux doivent être amenés à l'air frais, les sources possibles de combustion doivent être fermées en toute sécurité et l'intérieur doit être ventilé. N'utilisez à nouveau le véhicule que lorsque la cause a été clarifiée par un professionnel.

---

## Compatibilité des appareils principaux

| Unité principale | Compatibilité | Règle de connexion spéciale |
|---|---|---|
| G.A.S.-pro | oui | Utilisez des embouts de fil ; sur `SNO433-003`, vérifier l'état du logiciel |
| G.A.S.-pro III | oui | ne pas utiliser d'embouts de fil ; Ne pas étamer les extrémités du câble |
| G.A.S.-pro III CO | oui, comme capteur externe supplémentaire | ne pas utiliser d'embouts de fil ; vérifier la conception du système pour la zone de surveillance supplémentaire |
| Autres détecteurs de gaz | ne peut pas être dérivé de ces documents | ne se connecte que si l'appareil principal spécifique a été expressément approuvé |
Selon le manuel, le G.A.S.-pro peut fonctionner avec jusqu'à trois capteurs. Le G.A.S.-pro III dispose d'une entrée de capteur interne et externe. La combinaison acceptable et l'emplacement de montage approprié dépendent de l'unité principale, de la configuration du véhicule et des zones à surveiller.

---

## Type de capteur et version du logiciel du G.A.S.-pro

Le type de capteur le plus récent **`SNO433-003`** nécessite au moins le **logiciel 1.04i** sur le G.A.S.-pro :

| Support série G.A.S.-pro | Action pour `SNO433-003` |
|---|---|
| chez `0001-003` | Le logiciel 1.04i est automatiquement disponible selon les instructions du capteur de CO |
| `SN40-XXX` | Envoyer l'appareil principal pour la mise à jour du logiciel |
| `SN0001-001` | Envoyer l'appareil principal pour la mise à jour du logiciel |
| `SN0001-002` | Envoyer l'appareil principal pour la mise à jour du logiciel |
| statut différent ou peu clair | faire vérifier le numéro de série complet et la version du logiciel par le support |

Les instructions officielles du capteur de CO écrivent **1.04i**. Une notation abrégée `1.4i` ne peut pas être traitée comme une version logicielle distincte ou différente. D'autres limites de produits sont disponibles sous [[Numéros de série et versions logicielles — préfixes, seuils et jalons]].

---

## Contenu de la livraison

- Capteur CO pour G.A.S.-pro et G.A.S.-pro III
- Câble de connexion
- Matériel de montage

La description actuelle du produit indique un **câble de connexion de 4 m de long**. Pour les marchandises existantes, vérifiez le contenu réel de la livraison et la longueur du câble avant le montage.

---

## Longueur de ligne et écart de source

Les informations officielles disponibles sur la longueur totale maximale ne sont pas cohérentes :

| Source | Déclaration |
|---|---|
| Description du produit du capteur de CO actuel | Câble de raccordement de 4 m, extensible jusqu'à 7 m |
| Manuel G.A.S.-pro 2.5 | Extension jusqu'à un maximum de 7 m |
| FAQ générale actuelle sur les produits | Extension jusqu'à un total de 8 m avec au moins `3 × 0,14 mm²` |
Pour une conception conservatrice et spécifique au produit, utilisez **longueur totale maximale de 7 m**. N'acceptez une longueur totale plus grande que si les instructions actuelles de l'unité principale spécifique et le support technique le confirment pour la combinaison existante. Les extensions doivent être électriquement fiables et fabriquées avec au moins la même section de conducteur.

---

## Planifiez l'emplacement d'installation

Le monoxyde de carbone est légèrement plus léger que l'air. Le capteur de CO est donc monté sur une surface verticale **juste en dessous du plafond du véhicule**. Le dessin d'installation du capteur indique une distance de **10-30 cm** par rapport au plafond.

- Pensez à surveiller la zone et les lieux de couchage.
- Tenez compte des séparations spatiales au travers des portes ou des rideaux lors de la planification du système.
- Ne couvrez pas le capteur, ne le peignez pas et ne le montez pas dans un meuble fermé.
- Choisissez une zone avec une libre circulation de l'air.
- Gardez vos distances avec les bouches de chauffage et autres courants d'air perturbateurs.
- Évitez les pièces humides et les zones présentant de la condensation ou de l'humidité directe.
- Conserver la date de péremption et l'étiquetage lisibles après l'installation.
- Acheminez le câble jusqu'à l'appareil principal sans tirer, frotter ou meurtrir.

La position du capteur de CO proche du plafond ne doit pas être transférée aux capteurs de propane/butane ou de gaz anesthésiques ; ces gaz nécessitent une hauteur de montage différente.

---

## Monter le capteur

1. Éteignez l'appareil principal et les circuits concernés.
2. Déterminez un emplacement d'installation approprié à proximité du plafond et vérifiez le cheminement des câbles.
3. Faites un trou de **Ø 12 mm**.
4. Insérez le manchon fourni depuis l'extérieur selon le plan de montage.
5. Fixez le capteur de l'intérieur à l'aide des vis fournies.
6. N'utilisez pas d'adhésifs à base de solvants ni de produits d'étanchéité à base de silicone sur le capteur.
7. Acheminez le câble de raccordement vers l'appareil principal de manière protégée et sans contrainte.
8. Ne rétablissez l'alimentation qu'après un câblage complet et une inspection visuelle.

Les travaux de perçage et d'électricité sur le véhicule nécessitent des connaissances spécialisées appropriées. Avant de percer, vérifiez les lignes cachées, les zones porteuses et l'extérieur.

---

## Connexion à G.A.S.-pro

Les règles de base suivantes s'appliquent à G.A.S.-pro :

- **Utilisez des embouts de fil.**
- Utilisez une entrée de capteur libre et documentée.
- Respectez les désignations des bornes et le schéma de raccordement de la version G.A.S.-pro concernée.
- Ne connectez pas accidentellement le capteur à une autre position de borne ; portez une attention particulière au terminal voisin `IGN`.
- Pour `SNO433-003`, confirmez au moins le logiciel **1.04i** avant la mise en service.
- Documenter la combinaison d'un maximum de trois capteurs connectés.

Les couleurs de câbles historiquement documentées ne servent qu'à titre d'aide au test :

| Signalisation | Couleur actuelle du câble | Couleur du câble ancien |
|---|---|---|
| GND | blanc | noir |
| Ub | marron | marron |
| Capteur | vert | bleu |

La désignation des bornes et le schéma de raccordement spécifique au produit prévalent sur la couleur du câble. Si les couleurs diffèrent, ne vous connectez pas sur la base de suppositions.

---

## Connexion au G.A.S.-pro III

Des règles de terminal différentes s'appliquent au G.A.S.-pro III et à l'ancien G.A.S.-pro :

- **Ne pas utiliser d'embouts de fil.**
- Les extrémités des câbles **ne sont pas étamées**.
- Section de conducteur admissible : **0,2–0,75 mm²**.
- Dénudez les extrémités des fils **7 à 9 mm** d'isolant.
- Ouvrir la pince à ressort uniquement avec une légère pression et un objet pointu approprié ; Force de fonctionnement maximale de **1 kg**.
- Connectez le capteur de CO à l'entrée du capteur externe documentée.
- Faites attention au schéma de connexion et à l'étiquetage des bornes de la version spécifique de l'appareil.

La règle de raccordement « pas d'embouts de câble » est expressément spécifique au produit et ne peut pas être transférée au G.A.S.-pro.

---

## Mise en service

1. Vérifiez le produit, l'appareil principal, la version du logiciel et la date d'expiration.
2. Vérifiez la hauteur d'installation, la fixation, l'affectation des câbles et des bornes.
3. Assurez-vous qu'aucune règle de virole n'a été confondue entre les principaux appareils.
4. Rétablissez l'alimentation de l'unité principale.
5. Attendez que l'appareil principal démarre ou préchauffe complètement.
6. Faites attention aux erreurs du capteur, à la tonalité continue ou à l'affichage d'état différent.
7. Vérifiez le dispositif d'alarme et, si nécessaire, les connexions du système externe conformément aux instructions du dispositif principal.
8. Documentez le numéro d'article, le numéro de série du capteur, la « date d'expiration », l'appareil principal et la date d'installation.

Un démarrage sans erreur ne remplace pas le contrôle de la date de péremption ou des contrôles fonctionnels réguliers de l'ensemble du système.

---

## Test fonctionnel et comportement des alarmes

| Examen / Événement | Classement sûr |
|---|---|
| Test avec du gaz plus léger | inadapté au capteur de CO et ne doit pas être effectué |
| Test avec du propane ou du butane | inadapté et ne fonctionne pas |
| Tests avec du monoxyde de carbone | uniquement avec des procédures de test appropriées et contrôlées par du personnel qualifié |
| Alarme CO sur G.A.S.-pro | Le manuel documente l'activation de la sirène externe pendant 10 secondes |
| Sortie `SIR+` sur G.A.S.-pro III en position DIP standard | Informations techniques supplémentaires documentées sur CO `2 × 10 s` avec 12/24 V |

Les instructions de G.A.S.-pro ne nécessitent pas de test séparé du fonctionnement du gaz du briquet pour le capteur de CO, car celui-ci ne réagit qu'au monoxyde de carbone. N'introduisez jamais de gaz d'échappement, de flammes nues ou de combustion incontrôlée dans le véhicule à des fins de test.

---

## Date d'expiration et remplacement

Les capteurs de CO ont une durée de vie limitée. La **« Date d'expiration »** indiquée sur la plaque signalétique est déterminante :

- Lire la date d'expiration lors de l'installation et de chaque maintenance.
- Faire remplacer le capteur avant ou au plus tard lorsque cette date est atteinte.
- En cas d'erreur du capteur, ne continuez pas à fonctionner jusqu'à la date d'expiration.
- Les plages de numéros de série telles que `0433-001` à `0433-007` peuvent faciliter l'attribution de l'âge, mais ne remplacent pas la vérification de la plaque signalétique.
- Ne réutilisez pas un capteur périmé, endommagé ou contaminé chimiquement.
- Faire effectuer le remplacement et, si nécessaire, l'évaluation par THITRONIK ou une entreprise spécialisée qualifiée.

Une date de péremption dépassée peut affecter la détection fiable du CO. L'absence de message d'erreur ne constitue pas une preuve qu'un capteur périmé fonctionne toujours en toute sécurité.

---

## Sécurité en cas d'alarme

- N'ignorez pas l'alarme et ne la reconnaissez pas comme une fausse alarme.
- Amener immédiatement toutes les personnes et tous les animaux à l'air frais.
- Si cela est sécuritaire, éteignez les appareils à combustion et ouvrez les portes ou les fenêtres.
- Ne pas créer de flamme nue et ne pas rechercher la cause dans l'intérieur contaminé.
- En cas de plainte ou de suspicion d'intoxication au CO, contactez les services d'urgence.
- Faire clarifier la cause par du personnel spécialisé qualifié.
- N'utilisez à nouveau le véhicule et le système de gaz qu'après autorisation.
- Faites vérifier le capteur après un événement pour détecter les indications d'erreur, les dommages et la date de péremption.

Des maux de tête, des étourdissements, des nausées, une somnolence et des troubles de la conscience peuvent être des signes d'intoxication au CO. Ne laissez pas les personnes concernées seules.

---

## Limiter systématiquement les erreurs

| observation | Test/mesure sécurisé |
|---|---|
| L'unité principale ne reconnaît pas le capteur | établir une liberté face aux tensions ; Vérifier l'affectation des bornes, le câble, les points de connexion/bornes et la compatibilité des principaux appareils |
| G.A.S.-pro émet un bip continu après l'installation, vérifiez si tous les câbles de capteur ont été accidentellement connectés décalés d'une position dans la direction de `IGN` |
| `SNO433-003` ne fonctionne pas sur les anciens G.A.S.-pro | Vérifiez le numéro de série et le logiciel ; pour `SN40-XXX`, `SN0001-001` ou `SN0001-002`, envoyez une mise à jour |
| Erreur de capteur après rallonge de câble | Vérifiez chaque point de connexion, section transversale, longueur totale et résistance de contact |
| G.A.S.-pro III signale une erreur de capteur | exclure les viroles ou les extrémités étamées ; Vérifiez la longueur de dénudage et la pince à ressort |
| Alarme sans source de CO détectable | Sécurisez et aérez les personnes en premier ; Vérifiez professionnellement les sources possibles de combustion, ne classez pas prématurément le capteur comme défectueux |
| Date d'expiration dépassée | Faire remplacer le capteur ; Ne continuez pas à fonctionner en réinitialisant ou en reconnectant |
| Numéro de série ou type de capteur incertain | Prenez une photo de la plaque signalétique et faites-la attribuer par le support avant de commander, de mettre à jour ou de remplacer |

D'autres méthodes de diagnostic fiables sont disponibles sur [[Dépannage — diagnostic sûr des problèmes fréquents]].

---

## Informations pour l'assistance
Pour une évaluation technique, documentez :

- Nom du produit et numéro d'article `100433`
- numéro de série complet du capteur avec préfixe `0433-`
- Type de capteur, notamment `SNO433-003`
- « Exp. Date » sur la plaque signalétique
- Appareil principal : G.A.S.-pro, G.A.S.-pro III ou G.A.S.-pro III CO
- numéro de série complet et version du logiciel de l'appareil principal
- Entrée de capteur utilisée et autres capteurs connectés
- Raccordement avec ou sans embouts de fils
- Couleurs des câbles, longueur totale, section transversale et points d'extension existants
- Emplacement de montage et distance par rapport au plafond
- séquence de tonalité exacte, affichage LED et heure d'erreur ou d'alarme
- Tests déjà effectués, sans tests de gaz dangereux

L'enregistrement structuré des cas est décrit sous [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]].

---

## Références croisées

-[[G.A.S.-pro (anciennes séries) — Alarme gaz et CO]]
-[[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]]
-[[Capteur additionnel G.A.S.-pro III — capteur de gaz externe]]
-[[Numéros de série et versions logicielles — préfixes, seuils et jalons]]
-[[Dépannage — diagnostic sûr des problèmes fréquents]]
-[[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
-[[Registre des numéros d’article — produits et accessoires]]
-[[Glossaire — Termes techniques du système THITRONIK]]
-[[Vue d’ensemble du système — gamme de produits THITRONIK]]
