---
title: 'Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006-2011)'
sources:
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/wipro_iii_fiat_ducato_x250_euro_4_safe.lock.pdf
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-19'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/fiat-ducato-x250.md
---

# Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006-2011)

Cet article décrit l'installation d'une WiPro III safe.lock sur les Fiat Ducato X250, Peugeot Boxer et Citroën Jumper Euro 4 de 2006 à 2011. Le manuel d'installation spécifique au véhicule, version `12/20`, documente la connexion CAN, les feux de détresse, le verrouillage centralisé, le klaxon du véhicule, l'allumage, l'alimentation et le test de fonctionnement avec la clé d'origine modifiée.

> **Délimitation :** L'année de construction, le niveau d'émission, l'ordinateur de bord, les couleurs des fiches et des câbles doivent être vérifiés ensemble. Le dernier groupe de véhicules de 2012 appartient à [[Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012-2021)|Fiat Ducato 2012–2021]] ; [[Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper (jusqu'en 2006)|Fiat Ducato 244]] s'applique au prédécesseur.

## Portée

| Fonctionnalité | Par défaut |
|---|---|
| Véhicules | Fiat Ducato X250, Peugeot Boxer et Citroën Jumper |
| Années de construction | 2006-2011, Euro 4 ; vérifier l'exécution réelle |
| système primaire | WiPro III safe.lock avec kit de montage spécifique au véhicule |
| Configuration du véhicule | `SW2 + SW6` à `ON` |
| Reliure safe.lock | Broche 28 et broche 50 pour portes avant et arrière respectivement |
| Fonctionnement dans le test fonctionnel | télécommande de véhicule d'origine convertie |
| Base de compatibilité | `0823-001 / 2.1` ; pas de numéro de série minimum distinct dans le manuel du véhicule |

Le numéro de série, la version du logiciel et la version de l'appareil doivent être vérifiés avant l'installation à l'aide des numéros de série [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Déconnecter la configuration du véhicule et la protection contre la relecture

| Fonction | Exigence | Position DIP | Effet |
|---|---|---|---|
| Profil du véhicule X250 Euro 4 | manuel d'installation spécifique au véhicule | `SW2 + SW6` | Profil CAN et fonctionnement documenté du véhicule |
| Protection générale contre la relecture du WiPro | à partir du numéro de série `0823-014` ou du logiciel `5.8` | `SW5` | La clé radio d'origine du véhicule ne contrôle plus le WiPro ; L'évaluation de la porte reste active |
| Carte de conversion safe.lock, article `101052` | correspondant à WiPro III safe.lock et clé de véhicule adaptée | aucune position DIP supplémentaire dérivée de ceci | Fonctionnement par clé codée via la carte de conversion |

`SW5` n'est **pas un commutateur safe.lock général** et ne peut pas être ajouté au `SW2 + SW6` à tous les niveaux. La source primaire spécifique au véhicule utilise `SW2 + SW6` et vérifie ensuite la télécommande d'origine convertie du véhicule. Une configuration de relecture différente nécessite sa propre approbation basée sur le numéro de série, la version du logiciel, la version WiPro et l'ensemble utilisé. Les principes de base décrivent la compatibilité des véhicules [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## Sécurité et préparation

- Faites effectuer les travaux sur le système électrique et électronique du véhicule uniquement par un atelier spécialisé qualifié.
- Couper l'alimentation électrique avant d'ouvrir le WiPro, de changer les commutateurs DIP ou d'effectuer des travaux électriques.
- N'insérez l'alimentation électrique dans la broche 46 qu'une fois tous les travaux de montage et de connexion terminés.
- Confirmer la borne 30, l'allumage, la masse, les câbles CAN et le fusible par mesure ou à l'aide de la fiche spécifique.
- Isolez individuellement les entrées et sorties inutilisées contre les courts-circuits.
- S'il y a des écarts par rapport aux illustrations, à la forme du connecteur, à l'affectation des broches ou aux couleurs des câbles, arrêtez le travail et contactez le fabricant ou l'assistance THITRONIK.

Avant le démarrage, la télécommande du véhicule, le verrouillage centralisé, le klaxon, les portes d'origine, les voyants d'avertissement et les entrées de la mémoire d'erreur existantes doivent être vérifiés et documentés.

## Apprentissage des accessoires radio et réglage du DIP

Les contacts radiomagnétiques, les détecteurs de gaz radio et les boucles de câbles radio doivent être formés avant l'installation.

1. Appuyez et maintenez enfoncé le bouton à droite de la fiche de connexion jusqu'à ce que le panneau de commande émette un bip et que la LED d'état s'allume en permanence.
2. Déclenchez chaque contact, alarme de gaz ou boucle de câble à mémoriser deux à trois fois.
3. Vérifiez le bip et la LED brièvement éteinte pour confirmer le stockage.
4. Retirez l'alimentation électrique et ouvrez le boîtier du WiPro.
5. Réglez `SW2` et `SW6` sur `ON` sur le commutateur de codage à 8 voies.
6. Réglez tous les autres interrupteurs uniquement selon la configuration approuvée pour le système spécifique ; N'ajoutez pas `SW5` automatiquement.
7. Fermez le boîtier et poursuivez l'installation.

Le processus d'apprentissage général est également disponible sous [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Rendre accessibles le tableau de bord et l'ordinateur de bord

1. Retirez les trois vis Phillips documentées du panneau du tableau de bord.
2. Retirez les vis à gauche et à droite du volant ainsi que la deuxième vis à gauche du volant.
3. Retirez délicatement le panneau.
4. Débranchez le connecteur bleu situé à l'avant de l'ordinateur de bord ; Pliez le support de sécurité rouge vers l'avant.
5. Déverrouillez et retirez l'insert de fiche noir à l'aide des languettes en plastique sur le côté.
6. Retirez les trois vis de montage de l'ordinateur de bord.
7. Tirez l'ordinateur de bord vers l'avant sans exercer de pression sur les câbles ou les connecteurs.

L'unité centrale WiPro est fixée sur la plaque de montage au point de masse à gauche derrière l'ordinateur de bord. L'espace d'installation doit rester sec ; Ne raccourcissez pas et n’enroulez pas l’antenne.

## Préparer l'alimentation via la broche 46

| Connexion | Spécification du véhicule | WiPro / Mesure | Fonction |
|---|---|---|---|
| connecteur bleu avant de l'ordinateur de bord, broche 46 | protégé par le fusible `F39`, `10 A` | Insérer le câble d'alimentation uniquement après avoir terminé tous les raccordements | Borne 30 / alimentation |
| Broche 46 déjà occupée | ligne possible rouge/jaune ou rouge/noir | Etablir une relation professionnelle avec une agence agréée | approvisionnement partagé |

Selon la source, la broche 46 est numérotée en bas du connecteur. Le fusible `F39` est situé dans la rangée du bas en tant que troisième fusible en partant de la gauche. Avant la connexion, vérifiez la broche, la tension et la valeur du fusible sur le véhicule réel.

## safe.lock câbles de verrouillage centralisé

| Épingle | Gestion des véhicules | Ligne WiPro | Fonction |
|---:|---|---|---|
| 28 | bleu/jaune | bleu/noir | Portes d'entrée |
| 50 | rose/violet | bleu | Portes arrière |

Les deux lignes contrôlent le verrouillage centralisé dans le système documenté safe.lock. Les portes avant et arrière doivent être testées séparément lors du test fonctionnel ; Ne mélangez pas les câbles et ne les laissez pas complètement de côté dans les véhicules intégrés.

## CAN et feux de détresse sur le connecteur bleu arrière

| Insert de connecteur / broche | Gestion des véhicules | Ligne WiPro | Fonction |
|---|---|---|---|
| insert blanc, broche 34 | rose/rouge | rose/rouge | Feux de détresse |
| insert vert, broche 5 | rose/blanc | violet/orange | CAN-Low |
| insert vert, broche 6 | rose/noir, éventuellement violet/noir à partir de l'année modèle 2010 | blanc/orange | CAN-High |
| insert noir, broche 25 | rose/blanc | violet/orange | connexion alternative CAN-Low |
| insert noir, broche 24 | rose/noir, éventuellement violet/noir à partir de l'année modèle 2010 | blanc/orange | connexion alternative CAN-High |

CAN-Low et CAN-High doivent être prélevés sur **le même insert de connecteur** : soit les broches 5/6 de l'insert vert, soit les broches 25/24 de l'insert noir. Verrouiller complètement les inserts de connecteur ; le support rouge maintient le connecteur en position verticale.

## Klaxon et allumage du véhicule

| Emplacement de connexion | Gestion des véhicules | Ligne WiPro | Fonction |
|---|---|---|---|
| Faisceau de câbles sous la colonne de direction, broche 8 | marron/vert ; déviation possible vert, à partir de l'année modèle 2010 éventuellement vert/marron | rose | Klaxon du véhicule |
| fiche verte au dos de l'ordinateur de bord | blanc/noir | jaune | Allumage |

Pour le raccordement du klaxon, retirez le couvercle de la colonne de direction avec quatre vis et une douille hexagonale de 3 mm. Le klaxon du véhicule et la sirène séparée sont des dispositifs d'alarme différents. Mesurez le câble d’allumage avant la connexion ; Lorsque le contact est actif, le système reste désactivé selon le diagnostic d'erreur.

## LED d'état, plaque de montage et assemblage

1. Vérifiez l'espace d'installation arrière de l'emplacement LED prévu pour les câbles et les composants.
2. Percez un trou de diamètre `8 mm`, insérez la LED et connectez le câble LED rouge/noir via le connecteur blanc.
3. Fixez la plaque de montage au point de masse à gauche derrière l'ordinateur de bord et serrez fermement la vis.
4. Insérez maintenant seulement le câble d'alimentation préparé dans la broche 46.
5. Réinstallez les inserts de fiche, les fiches et l'ordinateur de bord ; Laissez le levier rouge s'enclencher verticalement.

Avant de fermer le panneau, vérifiez toutes les dérivations, l'isolation, les serrures, les fusibles et les connexions à la terre.

## safe.lock Carte de conversion et fonctionnement des touches

La carte de conversion [[Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper|Carte de conversion safe.lock]] article `101052` remplace la transmission radio d'origine non sécurisée dans la clé du véhicule appropriée par une connexion codée au WiPro III safe.lock. Ce n'est pas un produit d'alarme indépendant et ne détermine pas lui-même une position DIP.

La **télécommande d'origine du véhicule convertie** est utilisée dans le test de fonctionnement spécifique au véhicule. Sans conversion éprouvée ou avec protection générale active contre la relecture `SW5`, ce test ne peut pas être utilisé pour dériver une autorisation de fonctionnement pour la clé radio d'origine inchangée. Selon le système, l'émetteur radio portatif [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]] ou le module [[Module NFC — commande de la WiPro via NFC|Module NFC]] peuvent être utilisés comme méthodes de fonctionnement supplémentaires.

## Test fonctionnel final

1. Fermez toutes les portes et armez-les à l'aide du bouton de verrouillage de la télécommande d'origine convertie du véhicule.
2. Si le WiPro ne répond pas initialement, verrouillez-le et déverrouillez-le plusieurs fois afin que les données du CAN se synchronisent.
3. Recherchez un bip, des indicateurs de direction clignotants et une LED d'état clignotante pour confirmer l'activation.
4. Laissez une porte de cabine ouverte et vérifiez que le véhicule n'est pas verrouillé et que le WiPro n'est pas activé.
5. Verrouillez à nouveau correctement le véhicule et déclenchez l'alarme en ouvrant mécaniquement la porte conducteur : à l'intérieur à l'aide de la poignée de porte ou à l'extérieur à l'aide de la clé mécanique.
6. Vérifiez l'alarme sonore pour environ `30 secondes`.
7. Vérifiez l'alarme visuelle via les clignotants du véhicule pendant environ `180 secondes` si l'alarme n'est pas arrêtée au préalable.
8. Désarmez ou interrompez l'alarme à l'aide du bouton de déverrouillage.
9. Testez les portes avant et arrière, la détection CAN, les feux de détresse, le klaxon du véhicule et chaque accessoire sans fil individuellement.
10. Enfin, vérifiez qu'aucun nouveau voyant d'avertissement, erreur électrique ou entrée dans la mémoire d'erreurs ne se soit produit.

Une série de bips courts lors de l'armement indique un contact magnétique ouvert et appris ; Selon la source, le système fonctionne toujours. Le contact radiomagnétique [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]] contient des spécifications d'assemblage et de test appropriées.

## Diagnostic d'erreur

| Image d'erreur | Test et action |
|---|---|
| Commandes par touches radio sans réaction WiPro, bip lorsque la tension est connectée | Vérifiez CAN-Low/Élevé ; Activez brièvement le mode diagnostic à l'aide du bouton du circuit imprimé et faites attention au scintillement de la LED verte gauche pendant le trafic de données CAN. |
| Pas de trafic CAN en mode diagnostic | Bus inactif ou connexion défectueuse ; Vérifiez la paire de broches et le même insert de connecteur. |
| Aucune réaction et aucun bip lors de la connexion à la tension | Vérifier l'alimentation, la broche 46, la connexion à sertir, l'allumage et le fusible `F39`. |
| Le système reste inactif à la mise du contact | comportement documenté ; Vérifiez la connexion de l'allumage et l'état du véhicule. |
| Contact magnétique ouvert malgré les ouvertures fermées | Vérifiez la distance de l'aimant, appuyez plusieurs fois sur les contacts ; Si nécessaire, débranchez brièvement et rétablissez l'alimentation du `F39` lorsque les contacts sont fermés. |
| Seules les portes avant ou arrière répondent à safe.lock | Vérifiez la broche 28/50 et le câble WiPro bleu ou bleu/noir. |
| Les véhicules de l'année modèle 2010 diffèrent en couleur de CAN-High | vérifier l'alternative violet/noir documentée ; ne remplacez jamais les câbles CAN en cas de suspicion. |
| Le système utilise une configuration WiPro/clé différente | Arrêtez le travail et obtenez l'approbation DIP, de réglage et de fonctionnement basée sur le numéro de série et le logiciel. |

D'autres vérifications inter-systèmes sont décrites dans [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Source décision

- Le manuel d'installation de onze pages spécifique au véhicule *WiPro III + safe.lock - Fiat Ducato X250, Euro 4*, statut `12/20`, a été entièrement vérifié ; Les pages 1 à 7, qui concernent l'installation et le fonctionnement, ont également été vérifiées visuellement.
- La version générale du manuel d'installation `1.8` a été utilisée pour les règles de sécurité et la fonction autonome `SW5` de `0823-014 / 5.8`.
- La source principale occupe uniquement `SW2 + SW6`. L'ancienne mention « avec safe.lock en plus SW5 » a été supprimée car le nom safe.lock à lui seul ne justifie pas une position de commutateur supplémentaire.
- La base de compatibilité `0823-001 / 2.1` provient de l'aperçu publié ; le manuel spécifique au véhicule ne précise pas son propre numéro de série minimum.
- Le dossier `Fahrzeugbesonderheiten.docx` référencé dans l'ancien inventaire est introuvable localement et n'a pas été utilisé comme preuve.

## Références croisées

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- Carte de conversion [[Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper|Carte de conversion safe.lock]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- Module [[Module NFC — commande de la WiPro via NFC|Module NFC]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper (jusqu'en 2006)|Fiat Ducato 244]]
- [[Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012-2021)|Fiat Ducato 2012–2021]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
