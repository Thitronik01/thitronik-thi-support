---
title: G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs
sources:
  - 'https://www.thitronik.de/produkte/produkt/gas-pro-iii/'
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/anleitungen/gas_pro_iii-kurzanleitung.pdf
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/anleitungen/gas_pro_iii_co-kurzanleitung.pdf
  - >-
    https://www.thitronik.de/fileadmin/user_upload/produkte/gas-pro-iii/technische_zusatzinformationen_gas-pro_iii.pdf
  - 'https://www.thitronik.de/recall/'
  - 'https://www.thitronik.de/produkte/produkt/zusatzsensor-fuer-gas-pro-iii/'
  - sources/GAS-pro-III__QuickGuide__Overview_DE.md
  - sources/technische_zusatzinformationen_gas-pro_iii.pdf
  - sources/zusatzsensor_gas-pro_iii_de_en_fr.pdf
  - sources/GAS-pro-III-CO__QuickGuide__Overview_DE.md
  - sources/Fragen zu G.A.S.-pro III.pdf
  - sources/Gaswarner.docx
updated: '2026-07-17'
confidence: high
lang: fr
translation_of: de/gas-pro-iii.md
---

# G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs

**Numéro d’article G.A.S.-pro III :** `101286`  
**Numéro d’article G.A.S.-pro III CO :** `101287`  
**Numéro d’article du capteur de gaz externe :** `101289`

G.A.S.-pro III est un avertisseur de gaz modulaire destiné à une installation fixe dans les véhicules de loisirs et les yachts. L’appareil principal contient une sirène, une interface radio et exactement un capteur intégré. Il existe en deux versions distinctes : G.A.S.-pro III surveille le propane, le butane et les gaz narcotiques/anesthésiants ; G.A.S.-pro III CO surveille le monoxyde de carbone. Les deux versions possèdent une entrée pour un capteur externe de gaz ou de CO approprié.

> [!WARNING]
> Les deux versions de l’appareil principal ne sont pas équivalentes. Un G.A.S.-pro III équipé d’un capteur GPL/gaz narcotiques intégré ne détecte pas le monoxyde de carbone sans capteur CO externe. Un G.A.S.-pro III CO ne détecte ni le propane, ni le butane, ni les gaz narcotiques/anesthésiants sans capteur de gaz externe. Vérifier clairement la plaque signalétique, le numéro d’article, la hauteur de montage et la configuration des capteurs avant la mise en service.

## Caractéristiques techniques

| Paramètre | G.A.S.-pro III | G.A.S.-pro III CO |
|---|---:|---:|
| Numéro d’article | `101286` | `101287` |
| Alimentation | 12/24 V CC | 12/24 V CC |
| Consommation selon la page produit | 26 mA | 9 mA |
| Entrées de capteur | 1 interne, 1 externe | 1 interne, 1 externe |
| Sensibilité indiquée sur la page produit | 700 ppm de butane | 50 ppm de CO |
| Sirène interne | 94 dB | 94 dB |
| Plage de température maximale | −20 °C à +60 °C | −20 °C à +60 °C |
| Humidité de fonctionnement selon le guide rapide | 0–90 % HR, sans condensation | 0–90 % HR, sans condensation |
| Dimensions (L × H × P) | 61 × 97 × 35 mm | 61 × 97 × 35 mm |
| Poids | environ 74 g | environ 74 g |
| Homologation | conformément au règlement ECE R10 | conformément au règlement ECE R10 |

Le guide rapide indique un maximum de 0,50 A sous 12 V ou de 0,25 A sous 24 V pour la sortie commutant le positif. Les charges raccordées, le fusible, la section des conducteurs et la logique de sortie doivent correspondre à la configuration DIP réelle. Ne pas raccorder directement une charge si son courant de démarrage ou son courant permanent dépasse la valeur admise pour la sortie.

## Vérification rapide

| Question | Réponse |
|---|---|
| Fonctionnement autonome possible ? | Oui, avec la sirène intégrée |
| Alimentation | alimentation permanente de 12/24 V CC |
| Capteur intégré | gaz ou CO selon la version |
| Entrées pour capteur externe | 1 |
| Intégration dans les systèmes d’alarme THITRONIK | par radio ; vérifier la compatibilité concrète et la procédure de mémorisation |
| Sirène interne | 94 dB |
| Montage du G.A.S.-pro III | verticalement, à environ 10–20 cm au-dessus du plancher |
| Montage du G.A.S.-pro III CO | verticalement, à environ 10–20 cm sous le plafond |
| Câble du capteur supplémentaire | par prudence, longueur totale maximale de 7 m |
| Embouts de câble | ne pas en utiliser sur les bornes de raccordement |
| Test utilisateur avec un gaz d’essai | non prévu ; ne pas utiliser de gaz de briquet |

## Versions du produit et distinction

| Version | Capteur intégré | Numéro d’article de l’appareil principal | Extension appropriée |
|---|---|---|---|
| **G.A.S.-pro III** | propane, butane et gaz narcotiques/anesthésiants | `101286` | capteur CO externe ou autre capteur de gaz |
| **G.A.S.-pro III CO** | monoxyde de carbone | `101287` | capteur de gaz externe ou autre capteur CO |

Les numéros d’article proviennent de la page produit officielle actuelle. Les numéros de série tels que `1286-…` ou `1287-…` ne sont pas des numéros de commande. Ne pas identifier un appareil installé uniquement d’après sa hauteur de montage ; contrôler la plaque signalétique et le numéro d’article.

| Produit | Rôle | Différence essentielle |
|---|---|---|
| **G.A.S.-pro III / G.A.S.-pro III CO** | avertisseur de gaz autonome et extensible | capteur intégré, sirène propre, radio et une entrée de capteur externe |
| [[G.A.S.-pro (anciennes séries) — Alarme gaz et CO]] | système modulaire de l’ancienne série | centrale sans capteur de gaz intégré ; règles différentes pour les capteurs, les raccordements et les tests |
| [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]] | module complémentaire radio pour WiPro III | aucune sirène propre et aucun fonctionnement autonome |
| [[G.A.S.-plug « tout en un » — détecteur de gaz mobile]] | détecteur de gaz mobile autonome | alimentation par prise ; aucun capteur externe |

## Substances détectées et limites du système

| Substance ou événement | G.A.S.-pro III | G.A.S.-pro III CO |
|---|---:|---:|
| Propane | Oui | uniquement avec un capteur de gaz externe approprié |
| Butane | Oui | uniquement avec un capteur de gaz externe approprié |
| Gaz narcotiques/anesthésiants | Oui | uniquement avec un capteur de gaz externe approprié |
| Monoxyde de carbone (CO) | uniquement avec un capteur CO externe approprié | Oui |
| Dioxyde de carbone (CO₂) | Non documenté | Non documenté |
| Fumée ou chaleur | Non | Non |
| Manque d’oxygène | Non | Non |

Selon la page produit, l’appareil principal GPL/gaz narcotiques possède un capteur d’humidité qui optimise la mesure et un filtre à alcool qui réduit les fausses alarmes provoquées par l’alcool. Cela ne signifie pas que toute influence d’une substance étrangère est exclue. Traiter d’abord toute alarme comme un événement gazeux réel et n’en rechercher la cause que depuis un endroit sûr.

## Éléments et interfaces

- sirène intégrée
- une LED d’état pour le capteur interne
- une LED d’état pour un éventuel capteur externe
- entrée pour un capteur externe de gaz ou de CO
- interface radio pour les systèmes d’alarme THITRONIK compatibles
- sortie `SIR+` pour une sirène externe ou une fonction d’alarme configurée
- raccordement CI-BUS optionnel préparé
- entrée `IGN` pour la mise en sourdine commandée par le contact
- autotest automatique des capteurs

Les guides rapides mentionnent WiPro III, WiPro III safe.lock et C.A.S. III comme systèmes radio compatibles. Vérifier dans les documents de chaque appareil si un système d’alarme, une version logicielle ou un accessoire précis est compatible ; ne pas le déduire uniquement de la famille de produits.

## Contenu de la livraison

Le contenu documenté comprend :

- G.A.S.-pro III ou G.A.S.-pro III CO avec sirène intégrée et capteur intégré correspondant
- câble de raccordement
- vis ou matériel de montage
- autocollant d’avertissement
- guide rapide
- porte-fusible avec fusible de 3 A selon le guide rapide

Un capteur supplémentaire externe, un capteur CO externe et une sirène externe sont des accessoires optionnels. Pour une installation d’occasion ou déjà montée, vérifier intégralement le contenu, le fusible et la configuration des capteurs.

## Divergences entre les sources

| Sujet | Guide spécifique au produit | FAQ produit générale actuelle | Valeur utilisée dans cet article |
|---|---|---|---|
| Hauteur de montage du capteur de gaz | environ 10–20 cm au-dessus du plancher | environ 10–30 cm au-dessus du plancher | 10–20 cm |
| Hauteur de montage du capteur CO | environ 10–20 cm sous le plafond | aussi haut que possible ou près du plafond | 10–20 cm sous le plafond |
| Câble du capteur supplémentaire | longueur totale maximale de 7 m | longueur totale jusqu’à 8 m | par prudence, 7 m au maximum |

Les guides rapides spécifiques au produit et les informations techniques complémentaires actuelles sont prioritaires pour le montage et le raccordement. N’utiliser une hauteur ou une longueur de câble supérieure que si des documents actuels ou THITRONIK la confirment pour la combinaison précise d’appareil et de capteur.

Les documents divergent également sur l’orientation de l’appareil : le guide rapide G.A.S.-pro III montre l’interrupteur ON/OFF vers le bas, tandis que le guide rapide CO le montre vers le haut ; les informations complémentaires communes plus récentes indiquent de manière générale « vers le bas ». Ne pas reprendre l’orientation de l’autre version. Comparer le gabarit de perçage, les marquages de l’appareil et le guide correspondant à l’appareil précis ; clarifier toute incertitude avec THITRONIK avant le montage.

## Planification du montage

| Capteur / situation | Exigence ou recommandation |
|---|---|
| G.A.S.-pro III | sur une surface verticale, à environ 10–20 cm au-dessus du plancher |
| G.A.S.-pro III CO | sur une surface verticale, à environ 10–20 cm sous le plafond |
| Armoire | ne pas monter l’appareil principal dans une armoire |
| Sorties d’air chaud | ne pas monter l’appareil ou le capteur supplémentaire directement en face |
| Batteries et pièce humide | respecter une distance de sécurité d’au moins 1 m |
| Véhicule de moins de 6,5 m de longueur intérieure sans séparation | un capteur principal correctement placé peut suffire dans l’exemple du fabricant |
| Véhicule de plus de 6,5 m de longueur intérieure | prévoir un capteur supplémentaire approprié |
| Porte coulissante, rideau ou zones séparées | prévoir un point de détection supplémentaire de l’autre côté |

La position de montage dépend du gaz à détecter et non du chemin de câble le plus pratique. Un capteur de gaz monté en partie basse ne remplace pas un capteur CO proche du plafond ; un capteur CO proche du plafond ne remplace pas un capteur de gaz. Maintenir les ouvertures des capteurs dégagées et ne pas couvrir, peindre ou asperger l’appareil de produit nettoyant.

## Montage de l’appareil principal

1. Identifier la version précise d’après la plaque signalétique.
2. Mettre le circuit électrique du véhicule hors tension et choisir une source permanente de 12/24 V correctement protégée.
3. Utiliser le gabarit correspondant à la version : gabarit de perçage 1 pour G.A.S.-pro III, gabarit de perçage 2 pour G.A.S.-pro III CO.
4. Dégager le support mural et le fixer d’équerre sur une surface verticale, à la distance prescrite du plancher ou du plafond.
5. Protéger le cheminement des câbles et laisser une réserve suffisante pour une dépose ultérieure.
6. Effectuer le raccordement électrique selon le marquage des bornes et le schéma propre à l’appareil.
7. Enfoncer l’appareil sur le support jusqu’à son enclenchement sûr.
8. Vérifier l’orientation de l’appareil à l’aide du guide et des marquages correspondant à la version précise.

Selon le guide, le support mural se dégage en appuyant légèrement des deux côtés dans les ouvertures du boîtier avec un objet pointu approprié. Ne pas endommager le boîtier, les conducteurs ou les ouvertures des capteurs.

## Raccordement électrique

Effectuer tous les raccordements hors tension. Le marquage des bornes et le schéma de l’appareil concerné priment sur les couleurs générales des câbles.

| Borne | Fonction |
|---|---|
| `12/24V` | alimentation positive permanente |
| `GND` | masse |
| `SIR+` | sortie de sirène/d’alarme configurable |
| `CI-BUS` | raccordement de bus optionnel |
| capteur externe | un capteur supplémentaire de gaz ou de CO approprié |
| `IGN` | contact ou borne 15 pour la mise en sourdine |

Les exigences suivantes s’appliquent aux bornes à ressort :

- section de conducteur admise : 0,2–0,75 mm²
- câble fourni : 0,5 mm²
- longueur de dénudage : 7–9 mm
- ne pas étamer les extrémités des conducteurs
- ne pas utiliser d’embouts de câble
- ouvrir la borne avec un objet pointu approprié en exerçant une pression maximale d’environ 1 kg

Assurer la décharge de traction et la protection contre les contacts. Ne pas ouvrir une borne sous tension, ponter un fusible ou court-circuiter la sortie `SIR+` pour effectuer un essai.

## Commutateurs DIP

Les huit commutateurs DIP se trouvent au dos de l’appareil. Ne modifier leurs positions que hors tension et après avoir documenté le réglage initial.

| DIP | OFF | ON |
|---:|---|---|
| 1 | volume maximal | volume réduit |
| 2 | les LED pulsent en vert en fonctionnement normal | les LED restent vertes en continu mais avec une luminosité réduite en fonctionnement normal |
| 3 | `SIR+` : tension d’alimentation pendant 30 s lors d’une alarme propane/butane/gaz narcotiques ; 2 × 10 s lors d’une alarme CO | `SIR+` : tension d’alimentation pendant toute la durée de l’alarme, par exemple pour un tapis vibrant, un feu à éclats ou un ventilateur homologué |
| 4 | comportement de sortie selon DIP 3 | sortie inversée : tension d’alimentation au repos, 0 V pendant toute la durée de l’alarme ; prévue pour commander une vanne appropriée |
| 5 | avertissement dès de faibles concentrations de propane, de butane et de gaz narcotiques ; réglage standard | avertissement selon DIN EN 50194-1 et DIN EN 50194-2 |
| 6 | non utilisé | non utilisé |
| 7 | non utilisé | non utilisé |
| 8 | non utilisé | non utilisé |

Le commutateur DIP 5 concerne l’évaluation du GPL et des gaz narcotiques, pas la détection du CO. La réduction du volume, la mise en sourdine ou une logique de sortie modifiée ne doivent pas rendre une alarme imperceptible dans les zones de couchage ou de séjour. Ne raccorder vannes, ventilateurs ou autres actionneurs qu’après une conception professionnelle du système.

## Mise en marche, arrêt et préchauffage

| Commande | Procédure |
|---|---|
| Mise en marche | maintenir la touche jusqu’à l’émission d’une suite de tonalités ascendantes et à l’allumage des LED quelques secondes plus tard |
| Arrêt | maintenir la touche jusqu’à l’émission d’une suite de tonalités descendantes et à l’extinction des LED |
| Démarrage du mode pause | appuyer brièvement sur la touche |
| Mise en sourdine d’une alarme sonore | appuyer brièvement sur la touche pendant une alarme ; respecter les règles de sécurité et la priorité du CO |

Une phase de préchauffage d’environ quatre minutes suit la mise en marche. L’indicateur pulse en bleu pendant cette période. Seul l’état normal vert confirme que l’appareil est prêt à fonctionner. Attendre la totalité de la phase de démarrage après chaque coupure d’alimentation, entretien ou modification.

## États des LED et avertissements

L’appareil possède des LED distinctes pour le capteur interne et le capteur externe. Elles permettent d’identifier le capteur qui signale une alarme ou un défaut.

| État | Indication visuelle | Indication sonore ou autre |
|---|---|---|
| Phase de mise en marche | rouge, vert, puis bleu fixe pendant quelques secondes | suite de tonalités ascendantes à la mise en marche |
| Phase de préchauffage | pulsation bleue pendant environ 4 minutes | appareil pas encore confirmé comme prêt à fonctionner |
| Fonctionnement normal, DIP 2 OFF | pulsation vert clair | aucune alarme |
| Fonctionnement normal, DIP 2 ON | vert fixe avec luminosité réduite | aucune alarme |
| Alarme gaz ou CO | la LED concernée clignote rapidement en rouge puis s’estompe | sirène interne ; radio et `SIR+` selon l’état de fonctionnement |
| Défaut de capteur | la LED du capteur concerné clignote en jaune | une tonalité par seconde |
| Sous-tension | les deux LED pulsent en jaune | trois séries de trois tonalités en une minute, puis arrêt |
| Surchauffe | les deux LED clignotent successivement en rouge, vert, magenta, bleu, jaune et turquoise | tonalité continue montante et descendante |
| Arrêt | bleu, vert, rouge, puis extinction | suite de tonalités descendantes |

Toujours interpréter la couleur des LED avec la suite de tonalités, la phase de fonctionnement et le symbole du capteur. L’absence d’éclairage peut signifier que l’appareil est arrêté, hors tension ou incorrectement alimenté ; elle ne confirme aucune surveillance.

## Intégration radio et voies d’alarme

Pour mémoriser l’appareil, placer le système d’alarme THITRONIK compatible en mode de mémorisation, puis mettre le G.A.S.-pro III en marche. La centrale d’alarme confirme la mémorisation réussie par une tonalité. La procédure exacte de démarrage et de fin du mode de mémorisation dépend du système d’alarme et de son application ou manuel.

Selon l’état de fonctionnement et la configuration, une alarme G.A.S.-pro III peut être transmise par les voies suivantes :

- LED rouge du capteur
- sirène interne
- sortie `SIR+`
- message radio envoyé au système d’alarme THITRONIK mémorisé
- actions consécutives configurées dans ce système, éventuellement via [[Pro-Finder — Module de télémétrie GSM/GPS]]

Ne pas supposer que le klaxon du véhicule, les feux de détresse, un message ou un actionneur externe réagissent toujours. Ces voies dépendent du système relié, de son état d’armement, des accessoires, du câblage et de la configuration. Détails sous [[WiPro III — système d'alarme radio pour véhicules de loisirs]].

## Mode pause et mise en sourdine

Un appui bref sur la touche démarre le mode pause de 60 minutes. Une double tonalité aiguë–grave confirme le début ; une double tonalité grave–aiguë confirme le retour automatique au fonctionnement normal. Un nouvel appui bref met fin au mode pause avant son terme.

Selon les informations techniques complémentaires, G.A.S.-pro III inhibe les éléments suivants pendant le mode pause :

- le signal sonore de la sirène interne
- son propre message radio envoyé à WiPro III ou WiPro III safe.lock
- l’activation de `SIR+`

Une éventuelle alarme reste visible sur les LED. Le système d’alarme dans lequel l’appareil est mémorisé reste lui-même actif indépendamment ; s’il doit être entièrement désactivé, il faut le faire séparément.

> [!WARNING]
> Uniquement sur G.A.S.-pro III CO, une concentration de CO très élevée est prioritaire : la sirène interne n’est alors pas mise en sourdine malgré le mode pause. La mise en sourdine n’élimine ni le gaz ni le CO et ne confirme pas que l’atmosphère est sûre.

## Entrée de contact `IGN`

`IGN` se raccorde à la borne 15 du véhicule. Tant qu’une tension y est présente, G.A.S.-pro III est mis en sourdine :

- aucun message radio propre envoyé au système d’alarme relié
- aucun signal sonore de la sirène interne
- aucune activation de `SIR+`
- une alarme reste uniquement visible sur les LED

L’avertisseur de gaz reste néanmoins raccordé à une alimentation permanente. `IGN` ne remplace pas une protection électrique appropriée et n’est pas une borne d’alimentation. Après le montage, contrôler le comportement avec le contact mis et coupé.

## Sous-tension, surchauffe et défaut de capteur

| Avertissement | Déclencheur / indication | Réaction sûre |
|---|---|---|
| Sous-tension | moins de 11,1 V ; trois séries de trois tonalités en une minute, les deux LED pulsent en jaune | faire contrôler correctement l’alimentation de bord et la batterie ; l’appareil s’arrête pour éviter une décharge profonde |
| Surchauffe | température de l’appareil supérieure à 60 °C ; tonalité continue montante et descendante, LED multicolores clignotantes | vérifier la source de chaleur et le lieu de montage, puis laisser refroidir l’appareil ; aucun message d’alarme gaz normal via WiPro III |
| Défaut de capteur | une tonalité par seconde et la LED du capteur concerné clignote en jaune | ne pas considérer le système comme entièrement opérationnel ; contacter le revendeur ou le support THITRONIK |

Après un arrêt pour sous-tension, les informations techniques complémentaires actuelles exigent de remettre l’appareil en marche une fois la tension d’alimentation rétablie. Ne pas appliquer à un appareil précis une ancienne indication ou une information dépendant de la version concernant un redémarrage automatique sans confirmation.

Selon le guide, un avertissement de surchauffe n’est pas transmis par une WiPro III ou WiPro III safe.lock reliée. Ne pas confondre un avertissement de surchauffe avec une alarme gaz ; vérifier si le lieu de montage est exposé directement à l’air chaud, à une accumulation de chaleur ou à une température ambiante hors plage admise.

## Durée de vie des capteurs CO

G.A.S.-pro III CO et le capteur CO externe possèdent une date d’expiration. Elle est indiquée avec le mois et l’année sur la plaque signalétique sous la mention `Exp. Date`. Le capteur CO doit être remplacé par THITRONIK au plus tard à cette date ; les informations techniques complémentaires décrivent ce remplacement comme un service payant.

Ne pas tenter de remettre en service un appareil expiré par une réinitialisation, un nettoyage ou un essai improvisé. Contacter le revendeur ou le support THITRONIK en indiquant le produit, le numéro d’article, le numéro de série et l’`Exp. Date`. Détails sous [[Capteur CO — capteur supplémentaire de monoxyde de carbone]].

## Capteur supplémentaire externe

Les deux versions de l’appareil principal possèdent exactement une entrée de capteur externe. Selon la combinaison souhaitée, il est possible d’y raccorder un capteur de gaz ou de CO approprié.

Le [[Capteur additionnel G.A.S.-pro III — capteur de gaz externe]], article `101289`, détecte le propane, le butane et les gaz narcotiques/anesthésiants. La page produit indique une consommation d’environ 21 mA, un câble de raccordement de 2 m, un poids d’environ 50 g et des dimensions d’environ 52 × 32 × 15 mm. THITRONIK recommande un capteur supplémentaire pour les véhicules de plus de 6,5 m de longueur intérieure ou les zones séparées.

Pour les rallonges, utiliser par prudence une **longueur totale maximale de 7 m**. Employer une section de conducteur au moins égale à celle du câble de capteur existant, réaliser une jonction électriquement fiable et protégée mécaniquement, et ne pas poser le câble de capteur avec des câbles de puissance perturbateurs. N’utiliser la valeur générale de 8 m indiquée dans la FAQ qu’après confirmation pour la combinaison précise.

## Mise en service et contrôle fonctionnel

1. Vérifier la version, le numéro d’article, la hauteur de montage et une éventuelle implication dans le rappel.
2. Contrôler le support, l’orientation de l’appareil, la réserve de câble, les bornes et le fusible.
3. Documenter les positions DIP et les comparer à la fonction de sortie prévue.
4. Rétablir l’alimentation et mettre l’appareil en marche.
5. Attendre la totalité de la séquence de démarrage et des quatre minutes environ de préchauffage.
6. Contrôler l’état normal vert de chaque capteur effectivement utilisé.
7. Contrôler le mode pause, `IGN`, la mémorisation radio et les voies d’alarme raccordées selon la configuration.
8. Documenter la date, le numéro de série, la configuration des capteurs et, pour les capteurs CO, l’`Exp. Date`.

Selon les deux guides rapides, il n’est pas possible d’effectuer sur place un test de fonctionnement avec du gaz de briquet ou un autre gaz d’essai en raison de l’algorithme d’évaluation. L’appareil possède un autotest automatique des capteurs et a été contrôlé en production.

> [!CAUTION]
> Ne pas exposer l’appareil à du gaz de briquet, des gaz d’échappement, de la fumée, des solvants ou une flamme nue pour le tester. Ne faire effectuer un contrôle technique que selon une procédure du fabricant expressément homologuée pour cette version de l’appareil.

## Comportement en cas d’alarme gaz ou CO

1. Prendre l’alarme au sérieux et faire immédiatement sortir à l’air libre toutes les personnes et tous les animaux.
2. En cas de suspicion de CO, ne pas perdre de temps à rechercher la source ; les symptômes peuvent constituer une urgence médicale.
3. Ne pas fumer et ne pas actionner d’interrupteurs, de fiches, de moteurs ou de sources d’inflammation possibles.
4. Ne fermer l’arrivée de gaz que si cela est possible sans danger personnel.
5. N’ouvrir les portes et fenêtres que depuis un endroit sûr et aérer complètement le véhicule.
6. En cas de symptômes, de concentration élevée ou de situation incertaine, appeler les services d’urgence ou les intervenants compétents.
7. Ne pas réutiliser le véhicule, le chauffage ou les appareils à gaz avant que la cause ait été élucidée par un professionnel et que l’atmosphère soit sûre.

L’acquittement ou la mise en sourdine de la sirène ne supprime pas la source du danger. Ne pas reprendre le fonctionnement normal après la fin de l’indication rouge sans avoir recherché la cause.

## Rappel volontaire

La page de rappel THITRONIK actuelle concerne une combinaison précisément définie :

| Caractéristique | Version concernée |
|---|---|
| Appareil principal | G.A.S.-pro III, article `101286`, pour propane, butane et gaz narcotiques/anesthésiants |
| Capteur externe | capteur supplémentaire, article `101289` |
| Numéros de série concernés de l’appareil principal | `1286-008`, `1286-009`, `1286-010`, `1286-011`, `1286-012` |
| Période de vente documentée | du 01/01/2023 au 14/02/2024 |
| Motif | l’évaluation du capteur ou des défauts de capteur peut, dans certaines circonstances, ne pas fonctionner correctement avec cette combinaison |
| Action | mise à jour logicielle gratuite par THITRONIK |

Si la combinaison est concernée, photographier tout le dos de l’appareil en veillant à ce que le numéro de série soit lisible, puis l’enregistrer sur la page de rappel officielle. Ne pas débrancher soi-même les câbles et attendre la réponse de THITRONIK avant toute dépose supplémentaire. Ne pas classer d’autres versions ou numéros de série comme concernés ou non concernés uniquement en raison d’une désignation similaire.

## Dépannage sûr

| Observation | Évaluation / action suivante |
|---|---|
| Aucune LED | vérifier l’alimentation permanente, le fusible, la masse, l’état de mise en marche et l’arrêt pour sous-tension |
| Pulsation bleue pendant environ 4 minutes | phase normale de préchauffage ; appareil pas encore confirmé comme prêt à fonctionner |
| LED du capteur clignotant en jaune, une tonalité par seconde | défaut de capteur ; hors tension, vérifier l’affectation du capteur, le câble et le connecteur, puis contacter le support |
| Les deux LED pulsent en jaune | sous-tension ; mesurer l’alimentation sous charge |
| LED multicolores, tonalité montante et descendante | surchauffe ; vérifier la source de chaleur et le lieu de montage |
| Alarme pendant la cuisson ou le nettoyage | exclure d’abord un événement gazeux réel et aérer ; n’utiliser le mode pause que délibérément et à titre préventif |
| Aucun message radio | vérifier le mode pause, `IGN`, la mémorisation, l’état de la centrale d’alarme et la compatibilité radio |
| L’actionneur externe réagit incorrectement | vérifier DIP 3/4, la tension au repos, la tension d’alarme et la charge de sortie admise |
| Alarmes répétées sans cause apparente | documenter l’environnement, l’air chaud, les aérosols, l’alimentation et les défauts de capteur ; ne pas effectuer de procédure non documentée de « brûlage » du capteur |

D’autres procédures de diagnostic figurent sous [[Dépannage — diagnostic sûr des problèmes fréquents]]. Si un défaut persiste, ne pas valider l’appareil comme système de protection et ne pas effectuer de réparation interne ou de nettoyage des capteurs.

## Informations pour un dossier d’assistance

| Information | Exemple / emplacement |
|---|---|
| Désignation exacte du produit | G.A.S.-pro III ou G.A.S.-pro III CO |
| Numéro d’article | `101286`, `101287` ou capteur supplémentaire `101289` |
| Numéro de série complet | dos de l’appareil principal |
| Vérification du rappel | combinaison et plage de numéros de série contrôlées ; documenter le résultat |
| Capteur externe | type, numéro d’article, numéro de série et `Exp. Date` pour le CO |
| Montage | hauteur au-dessus du plancher ou distance sous le plafond ; photographies |
| Environnement | distance du chauffage, de la batterie et de la pièce humide ; séparations intérieures |
| Alimentation | tension avec contact mis et coupé ainsi qu’au moment du défaut |
| Positions DIP | photographie des commutateurs 1–8 |
| Indication | LED du capteur interne ou externe, couleur et séquence de clignotement |
| Signal sonore | suite de tonalités, durée et répétition |
| Système radio associé | modèle, numéro de série, version logicielle et état de mémorisation |
| `SIR+` | charge raccordée et tension mesurée au repos/en alarme |
| Câble du capteur | longueur totale, section et jonctions |
| Historique du défaut | heure, fréquence, cuisson/chauffage/nettoyage et contrôles déjà effectués |

Le modèle complet figure sous [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]. Vérifier également les numéros d’article et l’affectation des accessoires dans le [[Registre des numéros d’article — produits et accessoires]].

## Différences par rapport à l’ancien G.A.S.-pro

| Caractéristique | G.A.S.-pro III | Ancienne série G.A.S.-pro |
|---|---|---|
| Appareil principal | capteur intégré selon la version | centrale sans capteur de gaz intégré |
| Entrées de capteur externe | 1 | jusqu’à 3 |
| Intégration au système d’alarme | interface radio intégrée et `SIR+` | contacts filaires de relais/d’alarme |
| Embouts de câble | ne pas utiliser | utiliser conformément au manuel |
| Test de gaz par l’utilisateur | impossible avec du gaz de briquet | le manuel décrit un test des capteurs GPL/gaz narcotiques |
| Lieu de montage de l’appareil principal | dépend du capteur intégré | la centrale peut être placée indépendamment de la hauteur des capteurs |

Ne jamais reprendre d’une génération à l’autre les capteurs, les couleurs de câble, les fonctions DIP, les durées d’alarme, les procédures de test ou les indications de défaut.

## Références croisées

- [[G.A.S.-pro (anciennes séries) — Alarme gaz et CO]]
- [[Capteur additionnel G.A.S.-pro III — capteur de gaz externe]]
- [[Capteur CO — capteur supplémentaire de monoxyde de carbone]]
- [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]]
- [[G.A.S.-plug « tout en un » — détecteur de gaz mobile]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
- [[Registre des numéros d’article — produits et accessoires]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
- [[Glossaire — Termes techniques du système THITRONIK]]
