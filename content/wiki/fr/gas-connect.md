---
title: G.A.S.-connect — alarme de gaz sans fil pour WiPro III
sources:
  - 'https://www.thitronik.de/produkte/produkt/gas-connect/'
  - >-
    https://www.thitronik.de/fileadmin/user_upload/produkte/gas-connect/g.a.s.-connect.pdf
  - sources/Fragen zu G.A.S.-connect.pdf
  - sources/GAS_Familie_DE_RAG_Pack/GAS-connect__105750__Overview_DE.md
  - >-
    sources/GAS_Familie_DE_RAG_Pack/GAS-connect__105750__Reference__Technische_Daten_DE.md
  - sources/Seriennummer G.A.S.-connect (5750).csv
updated: '2026-07-16'
confidence: high
lang: fr
translation_of: de/gas-connect.md
dealerStatus: internal_only
---

# G.A.S.-connect — alarme de gaz sans fil pour WiPro III

**Numéro d’article :** `105750`  
**Préfixe du numéro de série :** `5750-`  
**Révision de la notice :** 1.0

G.A.S.-connect est un détecteur de gaz radio alimenté par le véhicule, conçu pour détecter le propane, le butane et les gaz narcotiques/anesthésiants. Il s’enregistre comme module complémentaire sur une centrale WiPro III ou WiPro III safe.lock compatible et déclenche l’alarme par l’intermédiaire de celle-ci. L’appareil ne possède pas de sirène interne, mais signale son état à l’aide d’une LED. La sortie `Alarm OUT` permet en outre de commander une sirène de secours.

> [!WARNING]
> G.A.S.-connect n’est pas un détecteur de gaz autonome. Sans une WiPro III compatible et opérationnelle, la voie d’alarme principale prévue est absente. L’appareil ne détecte ni le monoxyde de carbone (CO), ni la fumée, ni la chaleur et ne remplace pas un détecteur de CO ou de fumée.

## Caractéristiques techniques et distinction des sources

| Paramètre | Valeur selon la notice propre au produit, rév. 1.0 |
|---|---|
| Numéro d’article | `105750` |
| Préfixe du numéro de série | `5750-` |
| Tension d’alimentation | 12/24 V CC |
| Consommation sous 12 V | env. 15 mA |
| Consommation sous 24 V | env. 25 mA |
| Portée radio en champ libre | env. 75 m |
| Fréquence d’émission | 868,35 MHz |
| Puissance d’émission | < 10 mW |
| Seuil minimal de déclenchement | 5 % de la LIE du butane |
| Plage de température maximale | −20 °C à +80 °C |
| Plage de température recommandée | −10 °C à +55 °C |
| Dimensions (l × H × P) | 30 × 88 × 26 mm |
| Poids | env. 33 g |
| `Alarm OUT` en option | Commutation vers la masse, 0,10 A maximum |
| Conformité radio selon la notice | Directive 2014/53/UE |
| Homologation pour véhicules selon la page produit | ECE R10 |

La page produit officielle actuelle indique toutefois **env. 28/15 mA** et **env. 35 g**. Ces valeurs correspondent aux données du modèle autonome G.A.S. publiées sur cette même page, tandis que la notice de G.A.S.-connect fournit en plus les caractéristiques radio. Le présent document retient donc les valeurs de la notice propre au produit. Si le bilan électrique ou le poids est déterminant pour une validation concrète, comparer la plaque signalétique, la notice fournie et les informations de l’assistance THITRONIK.

## Contrôle rapide

| Question | Réponse |
|---|---|
| Fonctionnement autonome prévu ? | Non |
| Centrale requise | WiPro III ou WiPro III safe.lock compatible |
| Substances détectées | Propane, butane et gaz narcotiques/anesthésiants |
| Monoxyde de carbone détecté ? | Non |
| Sirène interne présente ? | Non |
| Indicateur visuel présent ? | Oui, LED au centre du boîtier |
| Avertisseur supplémentaire possible ? | Oui, sirène de secours réf. `100089` via `Alarm OUT` |
| Capteurs externes raccordables ? | Non |
| Alimentation | 12/24 V CC par le véhicule ; pas de pile CR2032 |
| Radio | 868,35 MHz, moins de 10 mW |
| Hauteur de montage propre au produit | Environ 10 cm au-dessus du plancher, sous les couchages |

## Rôle du produit et délimitation

| Produit | Rôle | Voie d’alarme / intégration |
|---|---|---|
| **G.A.S.-connect**, réf. `105750` | Détecteur de gaz radio servant de module complémentaire à WiPro | LED sur l’appareil ; alarme via WiPro ; `Alarm OUT` en option ; pas de fonctionnement autonome |
| [[G.A.S. — Détecteur de gaz autonome avec sirène interne]] | Détecteur de gaz autonome à montage fixe | Sirène interne ; aucune WiPro requise |
| [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]] | Détecteur de gaz autonome et extensible | Sirène propre et raccordements spécifiques pour capteurs supplémentaires |
| [[Capteur CO — capteur supplémentaire de monoxyde de carbone]] | Capteur de CO complémentaire pour les systèmes G.A.S.-pro compatibles | Non raccordable à G.A.S.-connect |
| [[WiPro III — système d'alarme radio pour véhicules de loisirs]] | Centrale d’alarme réceptrice | G.A.S.-connect doit y être enregistré et la centrale doit être opérationnelle |

G.A.S.-connect ne possède pas de sirène interne, mais dispose bien d’une sortie d’alarme électrique en option. Il ne faut donc pas confondre « sans sirène propre » et « sans sortie d’alarme propre ».

## Conditions système et voies d’alarme

| Élément | Requis ? | Fonction |
|---|---|---|
| WiPro III / WiPro III safe.lock | Oui | Reçoit le signal radio et commande les avertisseurs prévus |
| Alimentation du véhicule 12/24 V CC | Oui | Alimente G.A.S.-connect en permanence |
| Enregistrement radio | Oui | Associe le détecteur de gaz à la bonne WiPro |
| Sirène WiPro | Élément du système | Alarme acoustique principale selon la configuration WiPro |
| Klaxon et clignotants du véhicule | Selon le raccordement et le véhicule | Alarme supplémentaire si elle est disponible et correctement intégrée au système concerné |
| [[Pro-Finder — Module de télémétrie GSM/GPS]] | Facultatif | Envoie, s’il est intégré au système, un SMS indiquant le déclenchement du détecteur de gaz |
| Sirène de secours réf. `100089` | Facultatif | Alarme acoustique supplémentaire via `Alarm OUT` |

Avant de confirmer le fonctionnement, vérifier les numéros de série, la variante WiPro, le profil du véhicule, l’enregistrement et les avertisseurs présents. La portée radio indiquée en champ libre ne garantit pas la portée à l’intérieur du véhicule.

## Gaz détectables et limites du système

| Substance ou événement | Détection par G.A.S.-connect |
|---|---|
| Propane | Oui |
| Butane | Oui |
| Gaz narcotiques/anesthésiants | Oui |
| Monoxyde de carbone (CO) | Non |
| Dioxyde de carbone (CO₂) | Non documenté |
| Fumée ou chaleur | Non |
| Manque d’oxygène | Non |

Le capteur interne fonctionne avec une compensation dynamique de la température et un autocontrôle permanent. Aucun autre capteur ne peut être raccordé. Les solvants, aérosols, vapeurs contenant de l’alcool ou produits de nettoyage peuvent produire des signaux similaires ; il faut néanmoins commencer par traiter toute alarme comme un événement gazeux réel.

## Contenu de la livraison

Le contenu documenté de la livraison comprend :

- G.A.S.-connect
- câble de raccordement de 1,5 m
- autocollant d’avertissement gaz
- vis ou matériel de montage
- notice

Avant le montage et l’enregistrement, vérifier que le contenu est complet et que le boîtier ainsi que le câble ne présentent aucun dommage visible. Ne pas mettre en service un appareil endommagé.

## Emplacement de montage et distinction des sources

La notice propre au produit impose pour G.A.S.-connect un montage **à environ 10 cm au-dessus du plancher**, sous les couchages. Une FAQ générale de THITRONIK indique parfois 10 à 30 cm. Pour la réf. `105750`, la consigne plus précise de la notice de l’appareil prévaut.

| Consigne | Distance / condition |
|---|---|
| Hauteur au-dessus du plancher | environ 10 cm |
| Position | sous les couchages |
| Distance des sorties de chauffage | au moins 1,5 m |
| Distance des batteries au plomb-acide | au moins 1,0 m |
| Condition radio | Liaison stable avec la WiPro prévue depuis l’emplacement définitif |
| Environnement | intérieur sec du véhicule |
| Emplacements inadaptés | cabinet de toilette, extérieur, flux d’air direct du chauffage, coffre fermé |

Lorsque des rideaux ou des portes coulissantes séparent les espaces, un autre détecteur de gaz autonome ou un autre détecteur radio correctement intégré peut être nécessaire. Aucun capteur supplémentaire externe ne peut être raccordé directement à G.A.S.-connect.

## Contrôle radio avant le montage définitif

La liaison radio doit être contrôlée à l’emplacement prévu avant de percer :

1. Alimenter provisoirement G.A.S.-connect en 12/24 V CC à cet emplacement.
2. Placer la WiPro III ou la WiPro III safe.lock en mode d’apprentissage.
3. Allumer G.A.S.-connect et faire confirmer sa détection par le signal sonore de la WiPro.
4. Quitter à nouveau le mode d’apprentissage de la WiPro.
5. Ne déterminer l’emplacement définitif et ne percer qu’après confirmation de la liaison.

La portée d’environ 75 m en champ libre ne tient compte ni de la structure du véhicule, ni des surfaces métalliques, câbles, équipements ou perturbations radio. Un enregistrement réussi juste à côté de la centrale ne valide donc pas automatiquement l’emplacement de montage ultérieur.

## Montage mécanique

1. Déterminer un emplacement hors tension conforme aux distances et aux contraintes radio ; exclure la présence de câbles ou de composants cachés avant de percer.
2. Utiliser le gabarit de perçage de la notice. Prévoir au moins 11 mm de dégagement au-dessus de l’appareil pour pouvoir le faire coulisser ou le retirer.
3. Poser les vis de fixation de façon que leurs têtes dépassent d’environ 6,5 mm.
4. Acheminer le câble de raccordement sans contrainte à travers l’habillage du véhicule jusqu’à l’alimentation.
5. Placer les évidements arrière du boîtier sur les têtes de vis, puis tirer légèrement l’appareil vers le bas.
6. Contrôler la bonne fixation, la libre circulation de l’air et la stabilité persistante de la liaison radio.

> [!CAUTION]
> Avant tout perçage ou raccordement, mettre hors tension les circuits concernés et empêcher toute remise sous tension. Si le réseau de bord du véhicule n’est pas maîtrisé, confier le montage à un atelier spécialisé.

## Raccordement électrique

| Borne | Fonction | Consigne |
|---|---|---|
| `12/24V` | Alimentation positive du véhicule | Utiliser une alimentation 12/24 V CC adaptée et protégée par fusible |
| `AGND` | Masse | Relier à une masse appropriée du véhicule |
| `ALARM OUT` | Sortie d’alarme facultative | Commutation vers la masse, 0,10 A maximum |

Abaisser complètement les leviers du bornier, introduire les conducteurs dénudés jusqu’en butée, puis refermer le bornier. Le schéma de raccordement de la notice exige un branchement **sans embouts de câblage**. Contrôler ensuite chaque conducteur en tirant légèrement dessus.

Vérifier la polarité, la protection par fusible et la tension d’alimentation avant la mise sous tension. G.A.S.-connect est alimenté par le véhicule et ne possède aucune pile bouton CR2032 à remplacer.

## `Alarm OUT` et sirène de secours

La sortie `Alarm OUT` permet de commander en supplément la sirène de secours réf. `100089`.

| Fil de la sirène de secours | Raccordement |
|---|---|
| Bleu | À la borne `ALARM OUT` de G.A.S.-connect |
| Rouge | À l’alimentation positive du véhicule prévue à cet effet |
| Noir | À la masse du véhicule |

`Alarm OUT` ne fournit aucune tension d’alimentation : en cas d’alarme, cette sortie commute vers la masse. Les fils rouge et noir de la sirène nécessitent donc leur propre raccordement, correctement protégé, à l’alimentation du véhicule. Ne jamais charger la sortie au-delà de 0,10 A. D’autres avertisseurs sont décrits sous [[Sirènes et klaxons — moyens d'alarme acoustiques]].

## Mise en marche et phase de préchauffage

1. Appuyer au moins 2 secondes sur le bouton situé sous l’appareil.
2. Pendant la phase de préchauffage d’environ 3 minutes, le témoin de fonctionnement reste allumé en jaune.
3. Lors de la première mise en service, le préchauffage peut durer jusqu’à 20 minutes.
4. Le clignotement vert du témoin indique que l’appareil est opérationnel.

Contrairement au modèle autonome G.A.S., la notice ne documente aucune confirmation par trois signaux sonores lors de la mise en marche de G.A.S.-connect. Pendant la phase jaune de préchauffage, l’état opérationnel n’est pas encore confirmé.

## Enregistrement sur WiPro III

1. Placer la WiPro III ou la WiPro III safe.lock en mode d’apprentissage conformément à sa notice.
2. Allumer G.A.S.-connect.
3. Dès que la WiPro a reconnu le détecteur de gaz, elle confirme l’apprentissage par un signal sonore.
4. Désactiver à nouveau le mode d’apprentissage de la WiPro.
5. Documenter l’état opérationnel du détecteur et son affectation au système.

La mise en marche déclenche ici le signal d’apprentissage. Si l’appareil est déjà allumé, l’éteindre si nécessaire, puis le rallumer après avoir activé le mode d’apprentissage. Les règles générales relatives à la mémoire, à la suppression et à l’apprentissage figurent sous [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]].

## États de fonctionnement et de la LED

| État | Indication / signal | Signification et mesure |
|---|---|---|
| Phase de préchauffage | Jaune fixe | Attendre ; normalement env. 3 minutes, jusqu’à 20 minutes lors de la première mise en service |
| Opérationnel | Vert clignotant | Surveillance par le capteur active |
| Alarme gaz | Rouge clignotant | Voies d’alarme WiPro et, le cas échéant, `Alarm OUT` actives |
| Défaut du capteur | Jaune clignotant | Contacter l’assistance ; aucun signal sonore continu de l’appareil n’est documenté |
| Éteint / sans alimentation | Témoin éteint | Aucune surveillance confirmée |
| Confirmation d’apprentissage | Signal sonore de la WiPro | Affectation radio reconnue ; ne pas confondre avec un test du capteur |

Avant le départ et avant de passer la nuit dans le véhicule, vérifier le clignotement vert ainsi que l’état opérationnel de la WiPro.

## Déroulement de l’alarme via WiPro

Si le seuil d’alarme du capteur est dépassé pendant plus de 30 secondes, la séquence documentée commence :

1. Le témoin de fonctionnement de G.A.S.-connect clignote en rouge.
2. La sirène interne de la WiPro III ou WiPro III safe.lock retentit à plein volume pendant 30 secondes.
3. Le klaxon du véhicule est commandé pendant 30 secondes s’il est disponible et correctement raccordé dans le système concerné.
4. Les clignotants du véhicule sont commandés pendant 180 secondes si l’intégration au véhicule offre cette fonction.
5. Un Pro-Finder intégré envoie un SMS indiquant que le détecteur de gaz s’est déclenché.
6. Après 30 secondes supplémentaires, G.A.S.-connect revient au fonctionnement normal.
7. Si le seuil est de nouveau dépassé pendant plus de 30 secondes, la séquence recommence.

Les avertisseurs réellement activés dépendent de la version de la WiPro, du profil du véhicule, du raccordement et de la configuration. La sirène, le klaxon du véhicule et les clignotants sont des composants distincts et ne doivent pas être confondus.

## Arrêt de l’alarme et identification de l’événement

La notice indique deux moyens de mettre fin à l’alarme :

- appuyer sur la touche **« Déverrouiller »** de la clé du véhicule correctement intégrée ;
- appuyer sur n’importe quelle touche d’une télécommande radio enregistrée.

Dès que la concentration de gaz repasse sous le seuil, l’alarme s’arrête automatiquement et la LED de l’appareil clignote de nouveau en vert. La LED d’état de la WiPro indique, par le code de clignotement prévu, qu’une alarme gaz s’est déclenchée.

> [!WARNING]
> L’arrêt ou la mise en sourdine de l’alarme ne confirme pas que l’atmosphère est sûre et n’élimine aucune source de gaz. Mettre d’abord les personnes et les animaux en sécurité ; ne pas se contenter d’acquitter l’alarme et de rester ensuite dans le véhicule.

## Mise à l’arrêt

Maintenir le bouton situé sous l’appareil enfoncé pendant plus de 4 secondes, jusqu’à ce que le témoin de fonctionnement s’éteigne.

La notice ne documente aucun signal sonore de confirmation lors de la mise à l’arrêt. Un témoin éteint ne signifie pas que l’appareil est opérationnel. Ne pas éteindre l’appareil pour neutraliser durablement une alarme ou un défaut de capteur non élucidé.

## Autocontrôle et défaut du capteur

G.A.S.-connect contrôle son capteur en permanence. Un clignotement jaune signale un défaut du capteur ; aucun signal sonore continu propre à cet appareil n’est documenté.

1. Éteindre l’appareil.
2. Contrôler l’alimentation du véhicule, le fusible, les dommages visibles du câble et les bornes uniquement lorsque le circuit est hors tension.
3. Rallumer l’appareil et attendre la fin complète de la phase de préchauffage.
4. Contrôler l’état opérationnel de la WiPro et l’affectation radio.
5. Si le défaut persiste, ne pas utiliser l’appareil comme système de protection et contacter l’assistance THITRONIK ou un atelier spécialisé.

Une procédure de diagnostic systématique figure sous [[Dépannage — diagnostic sûr des problèmes fréquents]].

## Contrôle sûr du fonctionnement et de la radio

| Contrôle | Résultat attendu | Limite de l’interprétation |
|---|---|---|
| Mise en marche | Témoin jaune de préchauffage | Ne confirme pas encore l’état opérationnel |
| Fin du préchauffage | LED verte clignotante | Surveillance par le capteur opérationnelle |
| Apprentissage | Confirmation sonore par la WiPro | Confirme l’affectation radio, pas la sensibilité au gaz |
| Contrôle à l’emplacement de montage | Liaison avec la WiPro prévue | La portée en champ libre ne garantit pas le fonctionnement après montage |
| Contrôle visuel | Entrée d’air dégagée, aucun dommage, fixation sûre | Ne constitue pas un contrôle complet du capteur |
| État de défaut | Aucun clignotement jaune | L’absence de message de défaut ne prouve pas à elle seule la réaction au gaz |

La notice propre au produit ne décrit aucun test improvisé du capteur au gaz de briquet, avec une flamme nue ou par libération incontrôlée de gaz d’essai. Ne pas effectuer de tels essais. Pour contrôler l’ensemble du capteur et de la chaîne d’alarme, utiliser uniquement une méthode approuvée par THITRONIK ou par un atelier spécialisé.

## Comportement en cas d’alarme gaz

1. Prendre l’alarme au sérieux et faire immédiatement sortir toutes les personnes et tous les animaux.
2. Éteindre les flammes nues uniquement si cela est possible sans se mettre en danger. Ne pas fumer.
3. N’actionner aucun interrupteur, aucune fiche ni aucune autre source d’inflammation potentielle.
4. Fermer l’arrivée de gaz seulement si cela peut être fait sans danger.
5. Ouvrir portes et fenêtres depuis une position sûre et aérer le véhicule.
6. En cas de symptômes, de forte concentration de gaz ou de situation incertaine, appeler les services d’urgence compétents.
7. Ne réutiliser le véhicule et les appareils à gaz qu’après identification professionnelle de la cause et confirmation que l’atmosphère est sûre.

En cas de suspicion de gaz narcotiques/anesthésiants, ne pas minimiser les symptômes. Amener les personnes concernées à l’air libre et solliciter une aide médicale.

## Causes fréquentes et diagnostic sûr

| Observation | Cause possible | Prochaine mesure sûre |
|---|---|---|
| Le témoin reste jaune après la mise en marche | Phase de préchauffage normale | Attendre jusqu’à 20 minutes lors de la première mise en service |
| Le témoin clignote en vert, mais la WiPro ne réagit pas | Appareil non enregistré, mauvaise centrale ou problème radio | Contrôler l’apprentissage et la liaison radio à l’emplacement de montage |
| Le témoin clignote en rouge | Gaz ou vapeur similaire détecté | Suivre la procédure de sécurité, aérer et rechercher la cause |
| Alarme après l’utilisation d’un aérosol ou d’un produit de nettoyage | Vapeur pouvant produire un signal similaire | Traiter néanmoins l’événement comme une alarme réelle ; retirer le produit et aérer complètement |
| Le témoin clignote en jaune | Défaut du capteur | Éteindre, contrôler hors tension et contacter l’assistance |
| Aucun témoin | Appareil éteint ou alimentation du véhicule absente | Faire contrôler correctement le bouton, le fusible, la tension, la polarité et les bornes |
| Radio fonctionnelle au point d’essai, mais pas à l’emplacement de montage | Blindage ou emplacement défavorable | Changer l’emplacement et confirmer à nouveau la liaison |
| La sirène de secours reste silencieuse | Alimentation, câblage ou `Alarm OUT` défectueux | Contrôler hors tension l’alimentation propre de la sirène et le fil de commande bleu ; ne pas surcharger la sortie |
| Aucun SMS | Pro-Finder absent, non opérationnel ou non intégré au système | Contrôler l’état du Pro-Finder séparément de l’alarme locale |

Ne jamais ponter un fusible, court-circuiter une sortie, désactiver globalement une fonction de sécurité radio ni libérer du gaz à des fins d’essai.

## Informations à fournir à l’assistance

| Information | Exemple / emplacement |
|---|---|
| Produit et numéro d’article | G.A.S.-connect, `105750` |
| Numéro de série complet | Plaque signalétique, préfixe habituel `5750-` ; ne pas communiquer uniquement le préfixe |
| Version et numéro de série de la WiPro | WiPro III ou WiPro III safe.lock, numéro de série complet |
| Véhicule et année | Constructeur, modèle, année-modèle |
| Tension d’alimentation | Valeur mesurée entre `12/24V` et `AGND` |
| État de la LED | Couleur, fixe ou clignotante, moment et durée |
| État de l’apprentissage | Quand et comment la WiPro l’a confirmé |
| Emplacement de montage | Hauteur, distance du chauffage/de la batterie, distance et obstacles jusqu’à la WiPro |
| Avertisseurs | Sirène WiPro, klaxon du véhicule, clignotants, sirène de secours |
| Pro-Finder | Présent, opérationnel, SMS reçu ou non |
| `Alarm OUT` | Affectation et charge raccordée |
| Environnement au moment de l’événement | Appareils à gaz, aérosols, produits de nettoyage, alcool ou autres vapeurs |
| Contrôles déjà effectués | Étapes concrètes réalisées hors tension |

Le modèle complet figure sous [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]. L’affectation des produits et accessoires peut être vérifiée dans le [[Registre des numéros d’article — produits et accessoires]].

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]]
- [[G.A.S. — Détecteur de gaz autonome avec sirène interne]]
- [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]]
- [[Capteur CO — capteur supplémentaire de monoxyde de carbone]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
- [[Registre des numéros d’article — produits et accessoires]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
- [[Glossaire — Termes techniques du système THITRONIK]]
