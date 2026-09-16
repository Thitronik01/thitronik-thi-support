---
title: Dépannage — diagnostic sûr des problèmes fréquents
sources:
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/pro-finder_-_bedienungs-_und_montageanleitung_2.6_01.pdf
  - sources/pro_finder-kurzanleitung-international_sn-045.pdf
  - sources/Stromverbrauch.docx
  - sources/technische_zusatzinformationen_gas-pro_iii.pdf
  - sources/FAQ Allgemeine Fragen.pdf
  - sources/Fragen zu WiPro III.pdf
  - sources/Fragen zu Funk-Magnetkontakt 868.pdf
  - sources/Fragen zu Pro-finder.pdf
  - sources/Fragen zu BT-connect.pdf
  - sources/Fragen zu G.A.S.-pro III.pdf
  - sources/FAQ_Haeufige-Fragen-zur-THITRONIK-App_DE.md
  - wiki/support-fallaufnahme.md
  - wiki/anlernvorgang.md
  - wiki/app-befehle.md
  - wiki/stromversorgung-standzeiten.md
updated: '2026-07-15'
confidence: high
lang: fr
translation_of: sources/stoerungsbeseitigung.md
dealerStatus: internal_only
---

# Dépannage — diagnostic sûr des problèmes fréquents

Cette page propose un premier contrôle sûr à partir d’un symptôme observé. Avant toute évaluation technique, recueillir les informations obligatoires indiquées dans [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]] et tenir compte du numéro de série, du profil du véhicule et de la version logicielle.

> **Règle de base :** contrôler séparément l’armement/désarmement du système d’alarme et le verrouillage/déverrouillage du verrouillage centralisé. N’effectuer une mesure qu’après avoir identifié sans ambiguïté la génération du produit, le véhicule et l’état de l’installation.

---

## Commencer le diagnostic en toute sécurité

1. Consigner le comportement attendu, le comportement réel et l’ordre exact des actions.
2. Relever les numéros de série, versions logicielles, véhicule et année-modèle.
3. Noter si possible le libellé exact de la LED d’état, du code de clignotement, du signal sonore, du message de l’application ou du SMS.
4. Contrôler la tension d’alimentation et les connecteurs visibles sans modifier le câblage lié à la sécurité.
5. N’effectuer qu’une mesure à la fois et en consigner le résultat.

En présence de fumée, d’une odeur de brûlé, d’un fort échauffement ou d’une alarme de gaz, de CO ou de fumée en cours, ne pas suivre ce diagnostic mais appliquer l’escalade immédiate en fin de page.

---

## Centrale WiPro III

| Symptôme | Cause probable | Premier contrôle / mesure sûre |
|----------|----------------|--------------------------------|
| La télécommande d’origine commande le verrouillage centralisé, mais pas la WiPro III | protection contre les attaques par rejeu active, profil de véhicule non compatible, position DIP incorrecte ou connexion CAN défectueuse | Vérifier d’abord si DIP 5 a été délibérément placé sur ON. Dans ce cas, l’absence de commande WiPro par la clé d’origine est normale. Sinon, faire contrôler le profil, les DIP et la connexion CAN par un professionnel. |
| La WiPro III ne réagit à aucun mode d’accès | alimentation, fusible 10 A, connecteur ou centrale défectueux | Contrôler la tension et le fusible sans les endommager ; ne pas retirer le fusible de manière répétée. Faire contrôler l’installation et l’alimentation si la panne se reproduit. |
| La LED d’état clignote **9 fois** après une alarme | la mémoire d’alarme signale un brouilleur ou un événement Anti-Jamming | Consigner le lieu et l’heure et rechercher d’éventuelles perturbations radio. Ne pas désactiver systématiquement l’Anti-Jamming. Ne placer DIP 7 sur ON qu’après une évaluation documentée des conséquences. |
| La LED d’état clignote **11 fois** après une alarme | entrée d’éclairage intérieur déclenchée ; centrale, faisceau ou configuration inadaptés également possibles | Contrôler le signal d’éclairage intérieur, le numéro de série, le profil du véhicule et le faisceau. |
| Un contact magnétique radio fermé est signalé ouvert après une coupure d’alimentation | l’état du contact n’a pas encore été relu | Ouvrir et fermer complètement plusieurs fois tous les contacts concernés. |
| Un composant radio n’est pas reçu | non mémorisé, pile faible, problème de portée ou blindage métallique | Contrôler la mémorisation et l’indication de pile propre au produit ; effectuer un test de portée et vérifier le montage et la position de l’antenne. |
| Le contact de soute arrière fonctionne de manière irrégulière | le support métallique atténue le signal radio | Utiliser l’adaptateur de montage réf. 100428 (noir) ou 100729 (blanc), puis répéter le test de portée. |
| La WiPro III tombe en panne notamment après une charge ou une activité solaire | surtension ou alimentation instable possible | Consigner l’heure, la tension de batterie et les chargeurs concernés. Faire contrôler l’alimentation et la protection contre les surtensions ; ne pas utiliser le retrait du fusible comme solution permanente. |

> **Limite de sécurité :** la protection contre les attaques par rejeu et l’Anti-Jamming sont des fonctions de sécurité. Leur désactivation ne supprime pas la cause et exige une évaluation documentée des conséquences.

---

## Pro-Finder

### Toujours interpréter la LED d’état selon le numéro de série

| État de la LED | Jusqu’au SN 0699-044 | À partir du SN 0699-045 | Mesure |
|----------------|----------------------|--------------------------|--------|
| clignote rouge/jaune | recherche du réseau et aucun numéro destinataire | recherche du réseau et aucun numéro destinataire | Contrôler la couverture et la programmation des numéros destinataires. |
| clignote rouge | recherche du réseau / aucune réception mobile | recherche du réseau / aucune réception mobile | Contrôler l’emplacement et la couverture actuelle de l’opérateur SIM. |
| jaune fixe | connexion du modem en cours | connexion du modem en cours | Attendre au démarrage ; si l’état persiste, contrôler la SIM et la réception. |
| rouge fixe | SIM absente ou défectueuse | SIM absente ou défectueuse | Faire mettre l’appareil hors tension et contrôler la SIM et son format. |
| clignote rouge/vert | le PIN SIM n’est pas `0000` | la demande du PIN SIM n’est pas correctement désactivée | Jusqu’au SN 044 : PIN `0000`, demande active. À partir du SN 045 : désactiver complètement la demande du PIN. |
| clignote jaune | mémoire des numéros destinataires vide | le dernier SMS n’a pas pu être envoyé | Tenir compte du numéro de série ; sur l’ancien matériel contrôler les destinataires, sur le nouveau le numéro, le crédit/forfait et le réseau. |
| vert fixe | envoi d’un SMS | réception ou envoi d’un SMS | État de communication normal de courte durée. |
| clignote jaune/vert (ancien) ou vert/jaune (nouveau) | enregistré sur le réseau, mais aucun destinataire | enregistré sur le réseau, mais aucun destinataire | Programmer les numéros destinataires. |
| clignote vert | fonctionnement normal : enregistré et destinataires présents | fonctionnement normal : enregistré et destinataires présents | Aucune mesure nécessaire. |

> **Important :** le clignotement jaune n’a pas la même signification avant et à partir du SN 0699-045. Un diagnostic univoque est impossible sans numéro de série.

### Problèmes de SIM, de SMS et de sous-tension

| Symptôme | Contrôle / mesure |
|----------|-------------------|
| La SIM ne s’insère pas mécaniquement | SN 0699-001 à -007 : Mini-SIM ; -008 à -044 : Micro-SIM ; à partir de -045 : Nano-SIM. Ne jamais forcer un adaptateur. |
| Le Pro-Finder ne répond pas aux SMS | Contrôler la réception, les destinataires et la syntaxe exacte. Désactiver RCS/messages de chat et utiliser un SMS classique avec alphabet GSM ou ASCII. |
| Les appels atteignent la messagerie | Désactiver la messagerie et les renvois d’appel de la SIM Pro-Finder ; ne pas utiliser de fonctions de confort qui redirigent les appels. |
| Le premier destinataire reçoit le SMS d’alarme, pas les suivants | Les SMS sont envoyés successivement. Lors d’un test contrôlé, ne pas arrêter immédiatement l’alarme. |
| SMS d’avertissement à **11,2 V**, puis aucune réaction | Le Pro-Finder est en veille pour éviter la décharge profonde. Charger la batterie et contrôler l’alimentation ; au-dessus de **12,5 V**, il revient en fonctionnement normal. |

---

## THITRONIK® App et SMS de programmation

| Symptôme | Contrôle / mesure sûre |
|----------|------------------------|
| Le SMS de programmation est refusé | Régénérer le SMS dans l’application, l’envoyer comme SMS classique et désactiver RCS/chat. Ne pas ajouter de guillemets typographiques ni d’espaces aux commandes. |
| L’iPhone n’envoie pas de SMS efficace | Désactiver temporairement iMessage sur l’iPhone utilisé pour la configuration et renvoyer explicitement le message comme SMS. |
| Le bouton de couplage ou de configuration n’est pas visible | Réduire temporairement la taille de police ou le zoom, rouvrir l’application et recommencer. |
| Une fonction manque ou diffère de la description | Comparer les numéros de série et versions de la WiPro III, du Pro-Finder ou du module Bluetooth avec les conditions de [[THITRONIK® App — commandes, configuration et dépannage]]. Les numéros de remplacement saisis dans l’application ne confirment pas la compatibilité matérielle. |

---

## BT-connect et module de mise en réseau Bluetooth

| Symptôme | Contrôle / mesure sûre |
|----------|------------------------|
| Couplage impossible | Identifier d’abord précisément le module. Supprimer le couplage sur le smartphone et le module, puis relancer le mode d’appairage propre au produit. |
| BT-connect ne lance pas le mode d’appairage | Vérifier qu’aucune connexion n’est active ; maintenir le bouton jusqu’à ce que la LED reste bleue. Une réinitialisation complète supprime tous les appareils enregistrés. |
| Impossible de déverrouiller le véhicule par Bluetooth | Contrôler la connexion, la batterie du smartphone et la fonction prise en charge par le véhicule. Sans connexion active, BT-connect est inutilisable ; garder une télécommande radio 868 comme accès indépendant. |
| La connexion échoue après changement de smartphone ou de système | Supprimer les anciens couplages des deux côtés et refaire le couplage dans la THITRONIK® App. Consigner les versions de l’application et du système. |

---

## Accessoires radio

### Contact magnétique radio

| Symptôme | Cause / mesure |
|----------|----------------|
| Le contact se mémorise, mais n’alarme pas à l’ouverture | Contrôler la carte : la LED d’émission doit être orientée **à l’opposé de l’aimant**. Si elle pointe vers l’aimant, retourner la carte et retester. |
| Le contact se détache de l’adhésif | Préparer une surface propre, sèche et dégraissée ; ne pas coller sous 15 °C et attendre environ 24 heures avant la résistance finale. |
| Le contact fonctionne mal sur du métal | Utiliser un adaptateur et tester la portée à l’emplacement définitif. |

### Attribuer correctement les avertissements de pile

| Composant | Alimentation / diagnostic |
|-----------|---------------------------|
| Télécommande radio 868, contact magnétique radio, boucle de câble radio, détecteur d’eau radio | CR2032. Un signal WiPro d’environ 2 secondes lors du déclenchement et une LED rouge restant allumée environ 30 secondes signalent une pile faible. Aucun nouvel apprentissage après remplacement. |
| Détecteur de fumée radio T.S.A. | pile longue durée CR123A intégrée ; remplacer l’appareil après l’avertissement, pas la pile. |
| G.A.S.-connect | alimenté par le véhicule ; **pas de CR2032**. Contrôler alimentation et raccordement en cas de panne. |

---

## G.A.S.-pro III

| Symptôme | Contrôle / mesure sûre |
|----------|------------------------|
| Alarme active de gaz, de CO ou de fumée | Éloigner les personnes et animaux et n’aérer que sans danger. Identifier la cause avant de réutiliser le véhicule ; ne pas traiter l’alarme comme une simple panne. |
| Alarme pendant la cuisson sans danger présent | Une pression brève coupe le son pendant 60 minutes ; une nouvelle pression y met fin. Les LED restent actives. Une concentration de CO très élevée a priorité sur la sourdine de la version CO. |
| Alarme en roulant due aux gaz d’échappement | Faire contrôler par un professionnel le raccordement IGN à la borne 15. L’appareil est automatiquement silencieux lorsque la tension d’allumage est présente. |
| Une LED de capteur clignote jaune avec environ un son par seconde | Erreur de capteur ; contacter le revendeur ou l’assistance. |
| Les deux LED pulsent jaune ; un triple signal est répété trois fois | Sous-tension sous **11,1 V** ; l’appareil s’éteint. Rétablir l’alimentation, puis rallumer le G.A.S.-pro III. |
| Test envisagé avec du gaz de briquet | Ne pas effectuer ce test. L’algorithme ne s’y prête pas ; l’appareil possède un autotest automatique des capteurs. |
| Toutes les couleurs clignotent | Surtempérature au-dessus d’environ **60 °C** ; contrôler la source de chaleur et le montage, laisser refroidir et escalader si cela se reproduit. |

> **Remarque :** la sourdine de 60 minutes supprime aussi le signal radio et la sortie d’alarme. Elle ne remplace pas un contrôle de danger.

---

## Alimentation électrique et temps d’immobilisation

| Symptôme | Contrôle / mesure sûre |
|----------|------------------------|
| Batterie de démarrage vide après une longue immobilisation | Évaluer ensemble le courant de repos THITRONIK, la charge de base du véhicule, l’état de la batterie et son autodécharge. Recharger complètement et prévoir un maintien de charge. |
| Pannes répétées pendant la charge ou avec le solaire | Consigner tension et heure ; faire contrôler chargeur, régulateur solaire, masses et protection contre les surtensions. |
| L’appareil ne redémarre pas immédiatement après une sous-tension | Respecter le seuil et la condition propres au produit : Pro-Finder revient au-dessus de 12,5 V ; G.A.S.-pro III doit être rallumé après rétablissement de l’alimentation. |

Valeurs de courant de repos et exemples : [[Alimentation électrique & temps d'immobilisation — courant de repos, sous-tension et pratique de charge]].

---

## Arrêter une alarme en sécurité et rechercher la cause

| Situation | Procédure |
|-----------|-----------|
| Alarme intrusion | Désarmer par un mode d’accès pris en charge par le véhicule et la version logicielle. Le seul déverrouillage n’arrête pas l’alarme dans toutes les configurations. |
| Alarme panique | Appuyer sur n’importe quelle touche d’une télécommande radio 868 mémorisée. |
| Alarme gaz | Quitter d’abord la zone dangereuse et identifier la cause. Commander ensuite séparément système d’alarme et détecteur ; l’alarme peut se redéclencher si la concentration persiste. |
| Le son cesse, mais les feux de détresse ou la LED restent actifs | La durée sonore et l’affichage visuel diffèrent. La surveillance reste active ; contrôler la mémoire d’alarme et le composant déclencheur. |

> **Règle pratique :** arrêter une alarme ne corrige pas la panne. Contrôler les contacts ouverts, la mémoire, l’état des capteurs et la cause.

---

## Mémorisation et suppression

| Symptôme / opération | Contrôle / mesure sûre |
|----------------------|------------------------|
| Aucun signal de confirmation pendant la mémorisation | Vérifier que le mode de mémorisation est actif, que le composant est correctement déclenché et assez proche de la centrale WiPro III. |
| Le composant fonctionne sur table, mais pas à son emplacement | Effectuer un test de portée à l’emplacement définitif avant montage ; tenir compte du blindage métallique et de l’antenne. |
| Easy-Add 1.0 ne fonctionne pas | Une télécommande radio 868 déjà mémorisée est requise ; dans les 30 secondes après le retour de l’alimentation, appuyer 5 fois sur la touche haut-parleur. |
| Easy-Add 2.0 doit servir à supprimer | Impossible. La méthode CAN-Bus permet uniquement la mémorisation, pas la suppression. |
| Seul l’émetteur maître doit rester | Effectuer la suppression partielle selon [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]] ; tous les autres émetteurs sont supprimés et doivent être remémorisés. |
| Toute la mémoire a été effacée | Mémoriser d’abord une télécommande radio 868 comme nouvel émetteur maître, puis tous les autres composants. Ne pas mémoriser le NFC Modul en premier. |

---

## Escalade immédiate

- Fumée, odeur de brûlé, fort échauffement ou alarme active de gaz, CO ou fumée.
- Câbles endommagés, fusibles qui sautent de manière répétée ou travaux sur le CAN-Bus et les bornes 15, 30 ou 31.
- Enfermement à l’extérieur, immobilisation involontaire du véhicule ou alarme incontrôlée.
- Panne récurrente après sous-tension, charge ou activité solaire.
- Numéro de série, variante du véhicule ou câblage incertains pour une fonction de sécurité.

Pour le dispositif d’arrêt, utiliser exclusivement la commande documentée `kill` ; `a an` est interdite pour immobiliser le véhicule. Ne jamais effectuer de test fonctionnel en roulant. Voir [[Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »]].

---

## Renvois

- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[THITRONIK® App — commandes, configuration et dépannage]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]]
- [[Alimentation électrique & temps d'immobilisation — courant de repos, sous-tension et pratique de charge]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Supports d’accès et commande — voies d’accès dans le système THITRONIK]]
