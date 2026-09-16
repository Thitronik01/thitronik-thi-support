---
title: G.A.S. — Détecteur de gaz autonome avec sirène interne
sources:
  - 'https://www.thitronik.de/produkte/produkt/gas/'
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/gaswarner/anleitungen/gas.pdf
  - sources/GAS_Familie_DE_RAG_Pack/GAS__105700__Overview_DE.md
  - sources/Fragen zu G.A.S..pdf
  - sources/Seriennummer 5700 G.A.S..csv
updated: '2026-07-16'
confidence: high
lang: fr
translation_of: de/gas.md
dealerStatus: internal_only
---

# G.A.S. — Détecteur de gaz autonome avec sirène interne

**Numéro d’article :** `105700`  
**Révision de la notice :** 1.1

G.A.S. est un détecteur de gaz autonome à montage fixe destiné aux véhicules de loisirs. Il détecte le propane, le butane ainsi que les gaz KO/anesthésiants et déclenche sa sirène interne. Aucune centrale WiPro n’est nécessaire à son fonctionnement. La sortie de commande `Alarm OUT` permet également de piloter une sirène de secours supplémentaire.

> [!WARNING]
> G.A.S. ne détecte ni le monoxyde de carbone (CO), ni la fumée, ni la chaleur et ne remplace pas un détecteur de CO ou de fumée. Un détecteur de gaz réduit les risques, mais ne se substitue pas à l’installation, à l’entretien et à l’utilisation en toute sécurité des appareils à gaz.

## Caractéristiques techniques

| Paramètre | Valeur |
|---|---|
| Tension de service | 12/24 V CC |
| Consommation sous 12 V | env. 28 mA |
| Consommation sous 24 V | env. 15 mA |
| Seuil d’alarme minimal | 5 % de la LIE du butane |
| Sirène interne | 82 dB à 1 m |
| `Alarm OUT` | Commutation à la masse, 0,10 A au maximum |
| Plage maximale de température de service | −20 °C à +80 °C |
| Plage de température recommandée | −10 °C à +55 °C |
| Dimensions (l × H × P) | 30 × 88 × 26 mm |
| Poids | env. 35 g |
| Homologation | ECE R10 |

Ne pas dépasser les valeurs limites de la sortie de commande. `Alarm OUT` n’est pas une alimentation destinée à des consommateurs quelconques.

## Contrôle rapide

| Question | Réponse |
|---|---|
| Fonctionnement autonome possible ? | Oui, sans centrale WiPro |
| Substances détectées | Propane, butane et gaz KO/anesthésiants |
| Le monoxyde de carbone est-il détecté ? | Non |
| Sirène intégrée ? | Oui, 82 dB à 1 m de distance |
| Dispositif d’alarme supplémentaire possible ? | Oui, via `Alarm OUT`, par exemple la sirène de secours, article `100089` |
| Capteurs externes raccordables ? | Non |
| Alimentation | 12 ou 24 V CC par le réseau de bord du véhicule |
| Lieu d’utilisation prévu | Intérieur d’un véhicule de loisirs |
| Hauteur de montage spécifique au produit | Environ 10 cm au-dessus du plancher, sous les couchages |

## Rôle du produit et distinction

| Produit | Rôle | Mode d’alarme / intégration |
|---|---|---|
| **G.A.S.**, article `105700` | Détecteur de gaz autonome à montage fixe | Sirène interne ; sirène de secours en option via `Alarm OUT` ; aucune WiPro requise |
| [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]] | Détecteur de gaz sans fil pour un système WiPro | Nécessite une WiPro III compatible et utilise son mode d’alarme |
| [[G.A.S.-plug « tout en un » — détecteur de gaz mobile]] | Appareil mobile pour prise 12/24 V | Utilisation mobile autonome |
| [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]] | Détecteur de gaz extensible | Logique propre au produit et à ses raccordements ; capteurs supplémentaires en option |
| [[Capteur CO — capteur supplémentaire de monoxyde de carbone]] | Capteur supplémentaire pour systèmes G.A.S.-pro compatibles | N’est pas un accessoire pour G.A.S., article `105700` |

Le nom du produit ne suffit pas à décider d’un accessoire ou d’un raccordement. Le numéro d’article, la plaque signalétique, la notice et le système installé doivent tous correspondre.

## Gaz détectables et limites du système

| Substance ou événement | Détection par G.A.S. |
|---|---|
| Propane | Oui |
| Butane | Oui |
| Gaz KO/anesthésiants | Oui |
| Monoxyde de carbone (CO) | Non |
| Dioxyde de carbone (CO₂) | Non documenté |
| Fumée ou chaleur | Non |
| Manque d’oxygène | Non |

G.A.S. possède un capteur interne avec compensation dynamique de la température et autosurveillance permanente. Aucun capteur supplémentaire ne peut être raccordé. Les solvants, aérosols, vapeurs alcoolisées ou produits de nettoyage peuvent produire des signaux similaires pour le capteur ; toute alarme doit néanmoins être traitée dans un premier temps comme un véritable incident lié au gaz.

## Contenu de la livraison

Le contenu documenté de la livraison comprend :

- détecteur de gaz G.A.S.
- câble de raccordement
- autocollant d’alarme
- matériel de montage
- notice

Avant le montage, vérifier que la livraison est complète et que le boîtier ainsi que le câble ne présentent aucun dommage visible. Ne pas mettre en service un appareil endommagé.

## Lieu de montage et hiérarchie des sources

La notice spécifique au produit fait foi pour cet appareil et prescrit un montage **environ 10 cm au-dessus du plancher**, sous les couchages. Une FAQ générale de THITRONIK indique parfois une plage de 10 à 30 cm pour les détecteurs de gaz. Pour G.A.S., article `105700`, le présent article applique donc la consigne plus précise de la notice correspondante.

| Consigne | Distance / condition |
|---|---|
| Hauteur au-dessus du plancher | environ 10 cm |
| Position | sous les couchages |
| Distance des sorties d’air du chauffage | au moins 1,5 m |
| Distance des batteries au plomb-acide | au moins 1,0 m |
| Environnement | intérieur sec du véhicule |
| Emplacements inadaptés | local humide, extérieur, flux d’air direct du chauffage |

L’emplacement doit permettre à l’air de circuler librement autour de l’appareil. Ne pas couvrir ni obstruer l’appareil et ne pas l’installer dans un compartiment de rangement fermé.

## Montage mécanique

1. Choisir une zone de montage hors tension respectant les distances prescrites et exclure la présence de câbles ou de composants cachés avant de percer.
2. Utiliser le gabarit de perçage de la notice. Prévoir au moins 11 mm d’espace libre au-dessus de l’appareil afin de pouvoir le faire coulisser pour le poser ou le retirer.
3. Poser les vis de fixation de manière à ce que leur tête dépasse d’environ 6,5 mm.
4. Acheminer le câble de raccordement hors tension jusqu’au lieu de montage, sans contrainte mécanique.
5. Placer les évidements à l’arrière du boîtier sur les têtes de vis, puis faire coulisser l’appareil vers le bas.
6. Vérifier la bonne tenue et l’accès de l’air ; le boîtier ne doit subir aucune contrainte.

> [!CAUTION]
> Avant tout perçage ou raccordement, mettre les circuits concernés hors tension et les protéger contre toute remise sous tension. En l’absence de connaissances du réseau de bord du véhicule, confier le montage à un atelier spécialisé.

## Raccordement électrique

| Raccordement | Fonction | Consigne |
|---|---|---|
| `12/24V` | Alimentation positive du réseau de bord | Utiliser une alimentation 12/24 V CC adaptée et protégée par un fusible |
| `AGND` | Masse | Raccorder à une masse appropriée du véhicule |
| `ALARM OUT` | Sortie d’alarme en option | Commutation à la masse, 0,10 A au maximum |

Ouvrir complètement les leviers des bornes, introduire les conducteurs dénudés jusqu’en butée, puis refermer les leviers. Le schéma de raccordement de la notice exige un branchement **sans embouts de câblage**. Contrôler ensuite chaque conducteur en tirant légèrement dessus.

Vérifier la polarité, la protection par fusible et la tension d’alimentation avant la mise en marche. Ne jamais intervenir sur une borne sous tension.

## `Alarm OUT` et sirène de secours

La sirène interne est le dispositif d’alarme principal. `Alarm OUT` permet en complément de piloter la sirène de secours, article `100089`.

| Fil de la sirène de secours | Raccordement |
|---|---|
| Bleu | À `ALARM OUT` de G.A.S. |
| Rouge | À l’alimentation positive prévue du véhicule |
| Noir | À la masse du véhicule |

`Alarm OUT` ne fournit pas de tension d’alimentation, mais commute à la masse en cas d’alarme. Les fils rouge et noir de la sirène nécessitent donc leur propre alimentation du véhicule correctement protégée par un fusible. Ne jamais appliquer une charge supérieure à 0,10 A à cette sortie. Les autres variantes de sirènes et de klaxons sont décrites sous [[Sirènes et klaxons — moyens d'alarme acoustiques]].

## Mise en marche et phase de préchauffage

1. Appuyer pendant au moins 2 secondes sur le bouton situé sous l’appareil.
2. Trois bips brefs confirment la mise en marche.
3. Le voyant s’allume en jaune pendant la phase de préchauffage.
4. Cette phase dure normalement environ 3 minutes ; lors de la première mise en service, elle peut durer jusqu’à 20 minutes.
5. Le clignotement vert du voyant indique que l’appareil est opérationnel.

L’état opérationnel n’est pas encore confirmé pendant le préchauffage. Ne compter sur la surveillance qu’une fois le voyant vert clignotant.

## États de fonctionnement et du voyant

| État | Voyant / signal | Signification et action |
|---|---|---|
| Confirmation de mise en marche | Trois bips brefs | Commande de mise en marche acceptée |
| Phase de préchauffage | Jaune fixe | Attendre ; normalement env. 3 minutes, jusqu’à 20 minutes lors de la première mise en service |
| Opérationnel | Vert clignotant | Surveillance normale active |
| Alarme gaz | Rouge clignotant et sirène | Suivre la procédure de sécurité |
| Défaut du capteur | Jaune clignotant et signal continu | Éteindre l’appareil et contacter l’assistance |
| Confirmation de l’arrêt | Un bip, le voyant s’éteint | Appareil éteint |

Un voyant éteint ne signifie pas que l’appareil est opérationnel. Avant le départ et avant de dormir dans le véhicule, vérifier que le voyant clignote en vert.

## Séquence d’alarme et mise en sourdine

Lorsque le seuil d’alarme est dépassé pendant plus de 30 secondes, la séquence documentée commence :

1. Le voyant clignote en rouge.
2. La sirène interne retentit à plein volume pendant 30 secondes.
3. Un appui bref sur le bouton met la sirène interne en sourdine ; le voyant rouge continue de clignoter.
4. Après 30 secondes supplémentaires, l’appareil revient au fonctionnement normal.
5. Si le seuil est de nouveau dépassé pendant plus de 30 secondes, la séquence d’alarme recommence.

> [!WARNING]
> La mise en sourdine ne confirme pas que l’atmosphère est sûre et ne supprime pas la source de gaz. À chaque alarme, mettre les personnes et les animaux en sécurité et rechercher la cause depuis un endroit sûr.

## Arrêt

Maintenir le bouton situé sous l’appareil enfoncé pendant plus de 4 secondes. Un bip confirme l’arrêt ; le voyant s’éteint.

Ne pas éteindre l’appareil pour neutraliser durablement une alarme inexpliquée ou un défaut du capteur. Avant de dormir dans le véhicule, rétablir l’état opérationnel et faire déterminer la cause.

## Autosurveillance et défaut du capteur

G.A.S. surveille le capteur en permanence. Un voyant jaune clignotant accompagné d’un signal continu indique un défaut du capteur.

1. Éteindre l’appareil.
2. Vérifier l’alimentation, les dommages visibles du câble et les connecteurs ou bornes uniquement hors tension.
3. Remettre l’appareil en marche et attendre la fin complète du préchauffage.
4. Si le défaut persiste, ne pas compter sur l’appareil comme système de protection et contacter l’assistance THITRONIK ou un atelier spécialisé.

Une méthode de diagnostic systématique est décrite sous [[Dépannage — diagnostic sûr des problèmes fréquents]].

## Contrôle fonctionnel sûr

La confirmation de mise en marche, les états du voyant et l’autosurveillance interne indiquent que les procédures de démarrage et de surveillance fonctionnent. Ils ne remplacent toutefois pas un essai ciblé du capteur.

La notice spécifique au produit ne décrit aucun test improvisé du capteur par l’utilisateur avec du gaz de briquet, une flamme nue ou une libération incontrôlée de gaz d’essai. Ne pas effectuer de tels tests. Si un contrôle complet du capteur est nécessaire, utiliser une méthode d’essai validée par THITRONIK ou par un atelier spécialisé.

| Contrôle | Résultat attendu |
|---|---|
| Mise en marche | Trois bips brefs |
| Préchauffage | Voyant jaune fixe |
| État opérationnel | Voyant vert clignotant |
| Contrôle visuel | Entrée d’air dégagée, aucun dommage, fixation sûre |
| État de défaut | Aucun voyant jaune clignotant avec signal continu |

## Comportement en cas d’alarme gaz

1. Prendre l’alarme au sérieux et faire immédiatement sortir toutes les personnes et tous les animaux.
2. Éteindre les flammes nues si cela est possible sans se mettre en danger. Ne pas fumer.
3. Ne pas actionner les interrupteurs électriques, les prises ni toute autre source d’inflammation potentielle.
4. Fermer l’arrivée de gaz uniquement si cela ne présente aucun danger.
5. Ouvrir les portes et les fenêtres depuis un endroit sûr et aérer le véhicule.
6. En cas de symptômes, de forte concentration de gaz ou de situation incertaine, appeler les services d’urgence ou les intervenants compétents.
7. Ne rentrer dans le véhicule et ne réutiliser les appareils à gaz qu’après identification professionnelle de la cause et confirmation d’une atmosphère sûre.

En cas de suspicion de gaz KO/anesthésiants, ne pas minimiser les symptômes. Amener les personnes concernées à l’air libre et demander une assistance médicale.

## Causes fréquentes et diagnostic sûr

| Observation | Cause possible | Prochaine action sûre |
|---|---|---|
| Le voyant reste jaune après la mise en marche | Phase de préchauffage normale | Attendre jusqu’à 20 minutes lors de la première mise en service |
| Le voyant clignote en vert | Fonctionnement normal | Aucune action nécessaire |
| Voyant rouge clignotant et sirène | Gaz ou vapeur similaire détecté | Suivre la procédure d’alarme, aérer et déterminer la cause |
| Alarme après l’utilisation d’un aérosol ou d’un produit de nettoyage | Présence possible d’une vapeur provoquant une réponse similaire du capteur | Traiter malgré tout la situation comme une véritable alarme ; retirer le produit et aérer complètement |
| Voyant jaune clignotant et signal continu | Défaut du capteur | Éteindre, contrôler hors tension et contacter l’assistance |
| Aucun voyant | Appareil éteint ou absence d’alimentation | Faire contrôler correctement l’actionnement du bouton, le fusible, la tension et la polarité |
| La sirène de secours reste silencieuse | Défaut d’alimentation, de câblage ou de `Alarm OUT` | Contrôler hors tension l’alimentation propre de la sirène et le fil de commande bleu ; ne pas surcharger la sortie |

Ne pas ponter un fusible, court-circuiter un fil de sortie à titre d’essai ni libérer une source de gaz pour effectuer un test.

## Informations pour un dossier d’assistance

Préparer les informations suivantes afin de permettre une évaluation rapide :

| Information | Exemple / emplacement |
|---|---|
| Produit et numéro d’article | G.A.S., `105700` |
| Numéro de série complet | Plaque signalétique ; pas seulement un préfixe supposé |
| Tension d’alimentation | Valeur mesurée entre `12/24V` et `AGND` |
| État du voyant et du signal | Couleur, fixe/clignotant, signal unique/continu |
| Moment et durée | Immédiatement après la mise en marche, après le préchauffage ou en fonctionnement |
| Lieu de montage | Hauteur, distance du chauffage et de la batterie, circulation de l’air |
| Environnement de l’événement | Appareils à gaz, aérosols, produits de nettoyage, alcool ou autres vapeurs |
| Sortie supplémentaire | Raccordement et charge sur `ALARM OUT` |
| Contrôles déjà effectués | Étapes précises réalisées hors tension |

Le modèle complet figure sous [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]. Les correspondances entre articles et accessoires peuvent être vérifiées dans le [[Registre des numéros d’article — produits et accessoires]].

## Renvois

- [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]]
- [[G.A.S.-plug « tout en un » — détecteur de gaz mobile]]
- [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]]
- [[Capteur CO — capteur supplémentaire de monoxyde de carbone]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
- [[Registre des numéros d’article — produits et accessoires]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
- [[Glossaire — Termes techniques du système THITRONIK]]
