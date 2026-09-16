---
title: "Dispositif d'arrêt - arrêt du moteur via Pro-Finder «\_Kill\_»"
sources:
  - sources/Abschalteinrichtung_einpolig.pdf
  - sources/Abschalteinrichtung_mehrpolig.pdf
  - sources/Abschalteinrichtung_einpolig__Overview_DE.md
  - sources/Abschalteinrichtung_mehrpolig__Overview_DE.md
  - sources/Abschaltrelais.docx
updated: '2026-07-14'
confidence: high
lang: fr
translation_of: sources/abschalteinrichtung.md
---

# Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »

| Variante | Réf. | Alimentation électrique | Courant de commutation |
|----------|------|--------------------------|------------------------|
| Unipolaire | 101283 | 12 V CC | 40 A |
| Multipolaire | 105821 | 12 V CC | 1 A |

Le dispositif d'arrêt se raccorde à la **sortie A** du [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]. La fonction kill lui permet d'interrompre le circuit d'allumage et d'immobiliser le véhicule à distance.

> **Distinction :** Le dispositif d'arrêt est un système d'urgence destiné aux situations d'alarme. Il peut servir temporairement de dispositif d'immobilisation, mais n'est pas conçu pour un fonctionnement permanent. La logique d'accès et de verrouillage centralisé de WiPro III safe.lock, adaptée au véhicule, est une fonction distincte.

---

## Fonctionnement de la fonction kill

1. Envoyer la commande `kill` au Pro-Finder, de préférence à l'aide de la THITRONIK® App.
2. Le Pro-Finder attend que la vitesse déterminée par GPS reste égale à **0 km/h sans interruption pendant au moins 5 secondes**.
3. Le Pro-Finder active la **sortie A**.
4. La sortie A commande le dispositif d'arrêt. Celui-ci interrompt le circuit d'allumage ; un moteur en marche est arrêté et un véhicule déjà à l'arrêt reste immobilisé.
5. Lors de l'arrêt, le Pro-Finder envoie un SMS d'état. Celui-ci indique que la sortie A est activée et contient la position actuelle du véhicule au moment de l'arrêt.

> ⚠️ **AVERTISSEMENT — utiliser exclusivement `kill` :** Ne jamais utiliser la commande `a an`. Elle active immédiatement la sortie A sans contrôler la vitesse du véhicule. Le circuit d'allumage pourrait ainsi être interrompu pendant la conduite, ce qui constituerait une intervention dangereuse dans la circulation routière.

Le dispositif d'arrêt est prévu uniquement en cas d'alarme et pour des périodes de **trois jours maximum**.

---

## Installation et sécurité

Les instructions de montage s'adressent aux ateliers professionnels. Les interventions sur les systèmes électriques et électroniques du véhicule exigent les connaissances techniques correspondantes et doivent être réalisées par un atelier qualifié.

- Le dispositif d'arrêt est inséré dans un circuit d'allumage propre au véhicule ou dans le circuit de commande de la pompe à carburant.
- Des travaux incorrects peuvent perturber les systèmes électroniques, le fonctionnement des airbags et la sécurité routière.
- Tous les raccordements doivent être réalisés de manière à éviter les dysfonctionnements et les dangers.
- Les instructions de montage du [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]] ou de WiPro III safe.lock restent applicables.
- Les entrées et sorties inutilisées doivent être isolées.
- Si la configuration du véhicule diffère de celle qui est documentée, contacter le fabricant ou l'assistance technique avant d'effectuer le raccordement.

Thitronik GmbH décline toute responsabilité en cas de dommages matériels ou corporels résultant d'une installation incorrecte, inappropriée ou incomplète. Elle décline également toute responsabilité quant à l'utilisation de l'arrêt à distance et aux conséquences qui peuvent en résulter.

---

## Raccordement — dispositif d'arrêt unipolaire (101283)

| Broche du relais | Couleur du câble | Fonction |
|------------------|-------------------|----------|
| 30 | bleu | Contact de puissance ; raccordement au câble du véhicule sectionné |
| 87A | noir | Contact normalement fermé (NC) ; raccordement au câble du véhicule sectionné |
| 86 | jaune | Entrée de commande ; raccordement au câble jaune de la sortie A du Pro-Finder |
| 85 | noir, 0,5 mm², cosse annulaire | Masse |
| 87 | non utilisée | Contact normalement ouvert (NO) ; ne pas raccorder |

Sectionner le câble du véhicule à interrompre et le faire passer par les broches 30 et 87A. Les instructions de montage propres au véhicule indiquent le câble et l'emplacement de montage à utiliser.

---

## Raccordement — dispositif d'arrêt multipolaire (105821)

| Couleur du câble | Quantité | Raccordement |
|-------------------|----------|--------------|
| jaune | 1 | Câble jaune de la sortie A du Pro-Finder |
| noir | 1 | Masse (−) |
| vert | 2 | Câblage du véhicule conformément aux instructions de montage propres au véhicule |
| bleu | 2 | Câblage du véhicule conformément aux instructions de montage propres au véhicule |

La variante multipolaire commute plusieurs circuits du véhicule. Son affectation exacte dépend du véhicule et doit être réalisée exclusivement conformément aux instructions de montage applicables.

> Des instructions de montage détaillées pour chaque véhicule sont disponibles dans l'espace revendeurs sur `www.thitronik.de`.

---

## Câbles et emplacements de montage propres aux véhicules

Le tableau suivant est fourni uniquement à titre indicatif. Les instructions de montage les plus récentes pour le véhicule concerné restent toujours déterminantes.

| Véhicule | Modèle / année | Couleur du câble | Emplacement de montage / remarque |
|----------|----------------|-------------------|-----------------------------------|
| Fiat / Citroën / Peugeot | Ducato / Jumper / Boxer jusqu'en 2006 | orange/noir | — |
| Fiat / Citroën / Peugeot | Ducato / Jumper / Boxer 2007–2011 | blanc/orange ou orange/blanc | — |
| Fiat / Citroën / Peugeot | Ducato / Jumper / Boxer à partir de 2012 | blanc/noir | — |
| Ford | Transit 2014–2016 | marron/jaune | Connecteur gris |
| Ford | Transit à partir de 2016 | orange/blanc ou marron/jaune | Même couleur que le positif après contact du WiPro |
| Ford | Transit à partir de 2022 | blanc/orange | — |
| Mercedes-Benz | Sprinter NCV3 2006–2018 | noir/blanc | Arrière de la boîte à fusibles, connecteur H3, broche 5 |
| Mercedes-Benz | Sprinter VS30 à partir de 2018 | noir/blanc | Arrière du calculateur, connecteur H3, broche 5 |
| Volkswagen | T6 2015–2019 | noir/bleu | Section 2,5 mm² |
| Volkswagen | T6.1 à partir de 2019 | marron/rouge | — |
| Volkswagen / MAN | Crafter II / TGE à partir de 2017 | gris/rouge | Porte-fusibles, broche 91 |
| Renault | Master à partir de 2010 | jaune | Position 1 du contacteur d'allumage ; rouge = plus permanent, fil de couleur naturelle = démarreur |
| Iveco | Daily à partir de 2014 | vert | Respecter les instructions de montage de l'espace revendeurs |

---

## Configurer le bouton kill dans la THITRONIK® App

Ce réglage ne fait pas partie de la configuration initiale guidée.

1. Sur l'écran d'accueil, toucher les trois points et sélectionner **« Paramètres du véhicule »**.
2. Faire défiler l'écran jusqu'aux boutons, puis sélectionner **« Sortie A »**.
3. Toucher l'icône en forme de crayon.
4. Activer **« Dispositif de désactivation connecté »**. Les données nécessaires sont saisies automatiquement.
5. Toucher **« Prêt »** pour appliquer le réglage.
6. Toucher **« Enregistrer le véhicule »**. Le bouton kill apparaît ensuite sur l'écran d'accueil.

---

## Immobiliser et réactiver le véhicule

### Immobiliser le véhicule

1. Après réception d'un SMS ou d'une notification push « Vol », ouvrir la THITRONIK® App.
2. Toucher l'**icône STOP**.
3. Sélectionner **« Immobiliser le véhicule »**.
4. Envoyer la commande `kill` préparée.

### Réactiver le véhicule

1. Dans l'application, toucher l'**icône STOP**.
2. Sélectionner **« Réactiver le véhicule »**.
3. Envoyer la commande `a aus` préparée. La sortie A est alors désactivée et l'immobilisation est levée.
4. Le changement d'état du relais peut produire un clic audible dans le véhicule.

> **Consommation électrique :** La consommation augmente nettement lorsque la sortie A est activée et que le dispositif d'arrêt fonctionne. Une immobilisation prolongée peut décharger la batterie de démarrage au point qu'il ne soit plus possible de démarrer le véhicule. Réactiver celui-ci dès que possible et ne pas dépasser la durée maximale de trois jours.

---

## Dépannage après une immobilisation

Selon l'équipement du véhicule, des messages peuvent apparaître sur le combiné d'instruments après l'immobilisation et la réactivation. Sauf indication contraire dans les instructions de montage propres au véhicule :

1. Mettre le contact.
2. Démarrer le moteur.
3. Laisser tourner le moteur pendant quelques minutes.
4. Couper le moteur.
5. Attendre 15 secondes.
6. Effectuer les étapes 1 à 5 **cinq fois au total**.

Si les messages persistent ou si le véhicule se comporte de manière inattendue, ne pas reprendre la route et contacter un atelier qualifié ou l'assistance technique.

---

## Sujets connexes

- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
