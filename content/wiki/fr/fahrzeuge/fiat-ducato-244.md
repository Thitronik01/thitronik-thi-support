---
title: Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper (jusqu'en 2006)
sources:
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii_fiat_ducato_244.pdf'
  - 'D:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-19'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/fiat-ducato-244.md
---

# Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper (jusqu'en 2006)

Cet article décrit l'installation d'un WiPro III sur Fiat Ducato 244, Peugeot Boxer et Citroën Jumper construits jusqu'en 2006. Les instructions spécifiques au véhicule à partir de `12/20` utilisent des connexions directes pour les clignotants, les portes de cabine, l'alimentation et la masse ; Une connexion CAN pour le WiPro n'est pas prévue dans ce schéma d'installation.

> **Délimitation :** L'année de construction, le tableau de bord, le compteur de vitesse, la prise et les couleurs des câbles doivent correspondre aux instructions. Pour la génération X250 suivante, [[Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006-2011)|Fiat Ducato X250 2006-2011]] s'applique.

## Portée

| Fonctionnalité | Par défaut |
|---|---|
| Véhicules | Fiat Ducato 244, Peugeot Boxer et Citroën Jumper |
| Années de construction | jusqu'en 2006 ; Vérifier la conception réelle du véhicule |
| Système d'alarme | WiPro III avec connexion directe spécifique au véhicule |
| Configuration DIP | exclusivement `SW6` sur `ON` ; commutateurs restants selon la configuration de base `OFF` |
| Fonctionnement dans le test fonctionnel documenté | Émetteur portatif radio WiPro ; Ne pas utiliser la clé radio du véhicule |
| Surveillance des portes de la cabine du conducteur | déclenchement d'alarme direct sur la fiche blanche à 6 broches |
| Connecteur WiPro-CAN | non utilisé dans ce schéma d'installation |

La matrice de compatibilité contient la base de la série de modèles `0823-001 / 2.1` pour ce groupe de véhicules. Cependant, le manuel spécifique au véhicule ne précise pas son propre numéro de série minimum. Le numéro de série, la version du logiciel et la version actuelle de l'appareil doivent donc également être vérifiés à l'aide des numéros de série [[Numéros de série et versions logicielles — préfixes, seuils et jalons| et des versions du logiciel ]].

## Etat de la source et décision d'exploitation

| Source | déclaration | Décision éditoriale |
|---|---|---|
| Contrôle préliminaire à la page 2 | La fonctionnalité d'une télécommande radio de véhicule existante doit être vérifiée ; puis une éventuelle opération WiPro est évoquée. | document comme note d'examen préliminaire générale mais contradictoire |
| Test fonctionnel spécifique en page 7 | La clé radio du véhicule n'est expressément pas utilisée pour l'activation ou la désactivation. | crucial pour l'installation, les tests et la remise |
| Instruction DIP à la page 2 | Interrupteur 6 sur l'interrupteur de codage à 8 voies sur `ON`. | configuration contraignante du véhicule |

En raison d'une contradiction interne, le système d'alarme présenté dans cet article est uniquement testé avec l'émetteur radio portatif WiPro. Les méthodes de contrôle à distance optionnelles ne peuvent être publiées que conformément aux instructions de votre propre produit et à un véritable test fonctionnel.

## Sécurité et vérification préliminaire

- Faites effectuer les travaux sur le système électrique et électronique du véhicule uniquement par un atelier spécialisé qualifié.
- Couper l'alimentation électrique avant d'ouvrir le panneau de commande, de changer le commutateur DIP ou d'effectuer des travaux électriques.
- Isolez individuellement les entrées et sorties inutilisées contre les courts-circuits.
- Ne connectez pas les câbles uniquement en fonction de la couleur ; Confirmez la fiche, la broche et la fonction sur le véhicule.
- Documentez les voyants d'avertissement existants, les entrées de mémoire d'erreur et les erreurs électriques avant l'installation.
- S'il y a des écarts par rapport aux illustrations, à la forme de la fiche ou aux couleurs des câbles, arrêtez le travail et contactez le fabricant ou l'assistance THITRONIK.

Avant de démarrer, vérifier la télécommande de l'autoradio, le verrouillage centralisé, l'avertisseur sonore du véhicule et l'afficheur de porte contact mis. Dans les véhicules entièrement intégrés, les portes ou volets individuels peuvent être enregistrés électroniquement du côté du véhicule ; Cela n’entraîne pas une libération globale de la connexion CAN pour le WiPro.

## Apprentissage des accessoires radio et réglage du DIP

Les contacts radiomagnétiques, les détecteurs de gaz radio et les boucles de câbles radio doivent être formés avant l'installation. Les contacts déjà enregistrés sont conservés pendant le processus d'apprentissage décrit.

1. Ouvrez le boîtier du panneau de commande WiPro.
2. Branchez la tension d'alimentation.
3. Maintenez le bouton à droite du connecteur à 20 broches jusqu'à ce que le panneau de commande émette un bip et que la LED d'état rouge s'allume.
4. Déclenchez chaque contact, alarme de gaz ou boucle de câble à mémoriser deux à trois fois ; Un bip et une LED brièvement éteinte confirment la sauvegarde.
5. Retirez à nouveau le bloc d'alimentation.
6. Réglez uniquement `SW6` sur `ON` sur le commutateur de codage à 8 voies.
7. Vérifiez que les autres commutateurs liés au véhicule dans la configuration de base sont réglés sur `OFF`.
8. Fermez le boîtier et poursuivez ensuite l'installation.

​​​​Le processus d'apprentissage inter-systèmes est également décrit sous [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Learning process]].

## Tableau de bord et emplacement de montage

1. Retirez les quatre vis documentées de la garniture du tableau de bord et tirez la garniture vers l'avant.
2. Retirez les panneaux à gauche et à droite du volant et desserrez les vis Torx en dessous.
3. Retirez les trois vis Torx devant l'unité de compteur de vitesse.
4. Retirez soigneusement l'unité de compteur de vitesse et n'exercez aucune contrainte sur les câbles de prise.
5. Fixez définitivement la centrale de contrôle WiPro et, si nécessaire, le module GSM dans l'espace libre sous le boîtier compteur de vitesse.

Le lieu d'installation doit rester sec, accessible et exempt de pièces mobiles ou chaudes du véhicule. Ne raccourcissez pas l’antenne et ne la montez pas enroulée.

## Raccordement clignotant sur le boîtier compteur de vitesse

| Emplacement de connexion | Gestion des véhicules | Ligne WiPro | Fonction |
|---|---|---|---|
| fiche bleue sur le compteur de vitesse | rose/blanc | gris | Clignotant gauche |
| fiche bleue sur le compteur de vitesse | bleu/noir | gris | Clignotant à droite |

Les deux câbles du véhicule sont chacun connectés à l'un des deux câbles gris WiPro. Les deux chemins distincts des clignotants doivent être testés ensemble lors du test final de l'alarme.

## Sirène et alarme sonore

| Exécution | Spécifications de montage et de connexion |
|---|---|
| sirène incluse | peut être monté dans l'espace libre sous l'unité de compteur de vitesse ; Raccordement exactement selon le schéma de câblage spécifique au véhicule |
| Sirène de secours | soit à l'intérieur, soit à l'abri des éclaboussures dans le compartiment moteur, pas sur les pièces chaudes du moteur ; Raccordement exactement selon le schéma électrique |

Les sirènes standard et de secours ont des schémas de connexion différents. Les lignes ne peuvent pas être transférées uniquement sur la base d'une affectation générale de sirène. Le klaxon du véhicule et la sirène séparée sont des dispositifs d'alarme différents.

## Déclencheur d'alarme de porte de cabine

La fiche blanche à 6 broches est utilisée sur la boîte à fusibles côté passager :

| Épingle | Gestion des véhicules | Ligne WiPro | Fonctionnement selon le manuel d'installation |
|---:|---|---|---|
| 1 | rouge/noir | bleu | Portes de cabine à déclenchement d'alarme |
| 4 | violet/noir | bleu/noir | Portes de cabine à déclenchement d'alarme |

Ces deux lignes sont documentées dans le manuel spécifique au véhicule comme déclencheurs d'alarme pour les portes de la cabine. Ils ne peuvent pas être traités comme des sorties de verrouillage centralisé librement utilisables sans preuve individuelle ou simplement omis de manière générale dans les véhicules intégrés.

## Alimentation, allumage et masse sur l'autoradio

| Connexion véhicule | Ligne WiPro | Fonction |
|---|---|---|
| Terminal 30 à l'autoradio | rouge | Plus permanent |
| Terminal 15 à l'autoradio | jaune | Allumage |
| Sol sur l'autoradio | noir | Masse du véhicule |

Déverrouillez et retirez l'autoradio. Mesurez la borne 30, la borne 15 et la masse avant la connexion et vérifiez par rapport à l'occupation réelle du véhicule. Rendre toutes les connexions permanentes, isolées et avec décharge de traction.

## LED d'état du montage

Pour la position indiquée dans la notice, un trou de diamètre `8 mm` est percé côté passager. Avant de percer, l'espace d'installation arrière doit être vérifié pour les câbles, les dispositifs de commande et autres composants.

Insérez la LED et reconnectez le câble LED rouge/noir avec le connecteur blanc à la contrepartie du jeu de câbles WiPro. Après le montage, la LED d'état doit être visible dans la direction de visualisation prévue.

## Test fonctionnel final

1. Fermez toutes les portes et armez le WiPro à l'aide du bouton de verrouillage de l'émetteur radio portatif WiPro.
2. Vérifiez s'il y a un bip, un clignotement des indicateurs de direction et une LED d'état clignotante pour confirmer l'armement.
3. Attendez au moins `60 secondes` ; Il s'agit d'un délai d'armement des portes de la cabine et non d'un délai d'alarme.
4. Après 60 secondes, ouvrez une porte de cabine et vérifiez la réponse de l'alarme.
5. Vérifiez les portes et fenêtres sécurisées avec des contacts radiomagnétiques immédiatement après l'armement ; le délai de 60 secondes ne s'applique pas à eux.
6. Vérifiez que la sirène et le bip interne émettent une alarme sonore telle que `30 secondes`.
7. Vérifiez que les clignotants du véhicule émettent une alarme visuelle concernant `180 secondes` si l'alarme n'est pas arrêtée au préalable.
8. Désarmez ou interrompez l'alarme à l'aide de n'importe quel bouton de l'émetteur portatif radio WiPro.
9. Vérifiez que deux bips, deux clignotements et que la LED d'état arrêtent de clignoter pour confirmer le désarmement.
10. Enfin, vérifiez qu'aucun nouveau témoin d'avertissement, erreur électrique ou entrée dans la mémoire d'erreurs ne s'est produit.

Une série de bips courts lors de l'armement indique un contact magnétique ouvert et formé ; Selon la source, le système fonctionne toujours. Tous les contacts doivent donc être ouverts et fermés individuellement avant la remise. Les accessoires appropriés sont décrits dans le contact radiomagnétique [[Contact radiomagnétique 868 — montage et fonctionnement| 868]].

## Voies opérationnelles et accessoires

La source principale utilise l'émetteur radio portatif [[Émetteur radio 868 — télécommande pour WiPro III| 868]] pour le test de fonctionnement obligatoire. Selon la version du système, un [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]] peut fournir des fonctions supplémentaires de reporting et de contrôle à distance, mais ne remplace pas l'installation de base correcte ni les tests sur site.

Les accessoires radio supplémentaires doivent être formés avant l'installation et déclenchés individuellement après l'installation. La génération du produit, le numéro d'article et la compatibilité réelle doivent être vérifiés avant la sortie.

## Diagnostic des pannes

| Image d'erreur | Test et action |
|---|---|
| Les commandes de la télécommande sont reconnues, mais les portes de la cabine ne déclenchent pas d'alarme | Vérifiez le déclencheur d'alarme sur le connecteur blanc à 6 broches, broche 1 et broche 4, ainsi que les deux connexions. |
| Aucune réponse à l'émetteur portatif et aucun bip lorsque la tension est appliquée | Vérifiez les connexions d'alimentation, de fusible, de masse et de sertissage. |
| Un contact ouvert est signalé malgré des ouvertures fermées | Vérifiez la distance de l'aimant, appuyez plusieurs fois sur tous les contacts et armez-les à nouveau ; Si nécessaire, débranchez brièvement et rétablissez l'alimentation lorsque les contacts sont fermés. |
| Un seul côté du véhicule clignote | Vérifiez les deux câbles gris WiPro et le câble du véhicule rose/blanc ou bleu/noir sur la fiche bleue du compteur de vitesse. |
| La porte de la cabine s'ouvre immédiatement ou pas du tout | Attendez la fin du délai d'armement de 60 secondes et vérifiez la connexion du déclencheur. |
| La clé radio du véhicule se comporte différemment que prévu | Ne pas utiliser comme preuve de sortie ; Effectuer un test obligatoire avec l'émetteur portatif radio WiPro. |
| Le véhicule diffère des images ou des fiches | Arrêtez les travaux et obtenez l’homologation spécifique au véhicule. |

D'autres vérifications inter-systèmes sont décrites dans [[Dépannage — diagnostic sûr des problèmes fréquents|Troubleshooting]].

## Source décision

- Le manuel d'installation de onze pages spécifique au véhicule *WiPro III - Fiat Ducato 244*, statut `12/20`, a été entièrement vérifié ; Les pages 1 à 7, qui concernent l'installation et le fonctionnement, ont également été vérifiées visuellement.
- La version générale du manuel d'installation `1.8` a été consultée pour les règles de sécurité et les bases du DIP. Son tableau de véhicules à partir de 2006 ne remplace pas l'instruction spéciale `SW6` pour le Ducato 244 jusqu'en 2006.
- L'essai fonctionnel spécifique de la page 7, selon lequel la clé radio du véhicule ne sert pas à l'activation ou à la désactivation, prime sur la phrase contradictoire de l'essai préliminaire général de la page 2.
- L'ancienne déclaration générale « Bus CAN : non » a été clarifiée : Le WiPro ne reçoit pas de connexion CAN dans ce schéma ; Les portes ou volets individuels peuvent toujours être enregistrés électroniquement du côté du véhicule.
- L'instruction générale précédente de ne pas connecter les câbles bleus de verrouillage centralisé sur les véhicules intégrés n'a pas été maintenue car la source principale les utilise explicitement sur les broches 1 et 4 comme déclencheur d'alarme pour les portes de la cabine.

## Références croisées

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions du logiciel]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio portatif 868]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact magnétique radio 868]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Lprocessus d'apprentissage]]
- [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]
- [[Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006-2011)|Fiat Ducato X250 2006-2011]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Tdépannage]]
