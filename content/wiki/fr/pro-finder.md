---
title: Pro-Finder — Module de télémétrie GSM/GPS
sources:
  - "content/quellen/profinder-ab045-handbuch-rev1.3.pdf"
  - "content/quellen/profinder-ab045-kurz-rev1.3.2.pdf"
  - "content/quellen/profinder-handbuch-rev2.6.pdf"
  - "content/quellen/profinder-faq.pdf"
  - "content/quellen/profinder-kurz-rev1.1.pdf"
  - "sources/pro-finder_ocr_abschrift.pdf"
  - "content/quellen/wipro-iii-installation-rev1.8.pdf"
  - "sources/Pro Finder.docx"
  - "sources/Anbieter.docx"
  - "sources/Handy.docx"
  - "sources/NUR_INTERNER_GEBRAUCH_Pro-finder_Befehle_abV9.1_(V1.1).pdf"
  - "sources/SMS-Konfiguration für Pro-Finder - SMS-Konfiguration für Pro-Finder.csv"
  - "content/wiki/de/app-befehle.md"
  - "content/wiki/de/mobilfunk-sim.md"
  - "content/wiki/de/seriennummern-softwarestaende.md"
  - "content/wiki/de/stoerungsbeseitigung.md"
updated: '2026-09-28'
confidence: high
lang: fr
translation_of: de/pro-finder.md
dealerStatus: internal_only
---

# Pro-Finder — Module de télémétrie GSM/GPS

**Réf. article 100699**

Le Pro-Finder est un module de communication mobile et de localisation destiné aux véhicules de loisirs. Il transmet des messages d’alarme et d’état par SMS, fournit des positions GPS et permet certaines commandes à distance selon la génération de l’appareil, la version logicielle, la WiPro raccordée et l’intégration au véhicule.

> **Règle fondamentale :** avant toute déclaration concernant la SIM, le réseau mobile, l’application, la LED d’état ou les raccordements, relever le numéro de série complet avec le préfixe `0699`. Les zéros initiaux doivent être conservés. `100699` est la référence article de la famille de produits, et non le numéro de série.

---

## Vue d’ensemble rapide

- Transmission des alarmes par SMS à un maximum de **dix numéros destinataires**
- Position GPS sous forme de coordonnées ou de lien cartographique cliquable pour un numéro identifié comme smartphone
- Geofencing pour signaler un déplacement non autorisé par rapport à la position initiale
- Demande d’état avec les valeurs disponibles pour la génération et le mode de fonctionnement concernés
- Commande à distance des fonctions WiPro compatibles par SMS ou, dans certains modes, par appel téléphonique
- Commutation des sorties A et B par SMS
- Immobilisation sûre du véhicule en option via la sortie A et un dispositif d’arrêt installé par un professionnel
- Avertissement de tension et protection contre la décharge profonde en cas de sous-tension

Le Pro-Finder n’est pas un système de suivi en direct et n’enregistre pas les itinéraires. Il peut signaler un vol et faciliter la localisation du véhicule, mais il n’empêche pas le vol lui-même. Toutes les fonctions à distance nécessitent une SIM active, un forfait adapté et une réception mobile.

---

## Générations d’appareils et numéros de série

### Générations de SIM et de communication mobile

| Numéro de série complet | Génération mobile | Format SIM | Règle relative au PIN |
|---|---|---|---|
| `0699-001` à `0699-007` | première génération matérielle | Mini-SIM | PIN `0000`, demande de PIN activée |
| `0699-008` à `0699-017` | ancienne génération matérielle | Micro-SIM | PIN `0000`, demande de PIN activée |
| `0699-018` à `0699-044` | modem 2G/3G documenté | Micro-SIM | PIN `0000`, demande de PIN activée |
| à partir de `0699-045` | génération matérielle compatible LTE | Nano-SIM | désactiver complètement la demande de PIN |

Le tableau décrit des seuils matériels documentés. Il faut vérifier au moment de l’utilisation si le réseau nécessaire est encore disponible dans le pays, chez l’opérateur concerné et sur le lieu prévu. Une SIM commercialisée comme 5G ne peut être utilisée que si le forfait et le réseau fournissent également la technologie prise en charge par l’appareil, ainsi que les SMS classiques et la téléphonie.

### Jalons documentés

| À partir du numéro de série | Version documentée | Modification |
|---|---|---|
| `0699-003` | logiciel `5.0` | compatibilité 24 V documentée |
| `0699-009` | logiciel `8.7` | consultation du crédit documentée pour d’autres opérateurs prépayés |
| `0699-013` | logiciel `9.1` | compatibilité avec l’application, appel d’alarme et autres types de détecteurs |
| `0699-015` | — | fonction combinée « Verrouiller et armer » documentée comme seuil fonctionnel |
| `0699-018` | logiciel `9.1` | nouveau modem 2G/3G |
| `0699-029` | logiciel `10.0.0` | correction des commandes françaises et amélioration de la communication avec le modem |
| `0699-045` | logiciel `11.0.4` | passage matériel à la 4G LTE, à la Nano-SIM et à la demande de PIN désactivée |
| `0699-056` | logiciel `11.0.6` | meilleure compatibilité avec les cartes SIM O2 |
| `0699-065` | logiciel `11.1.0` | nouvelle carte électronique supérieure et nouveau procédé de soudage |

Un jalon de numéro de série décrit la version de production documentée. Des mises à jour ultérieures peuvent entraîner un écart avec le logiciel effectivement installé. La saisie d’un numéro de série de remplacement dans l’application ne modifie ni le matériel ni le logiciel. Voir [[Numéros de série et versions logicielles — préfixes, seuils et jalons]] pour plus de détails.

---

## Utilisation conforme et limites

Le Pro-Finder est destiné à localiser et surveiller un véhicule. Associé à un [[WiPro III — système d'alarme radio pour véhicules de loisirs]] compatible, il transmet les alertes d’effraction, de gaz, de panique et d’autres notifications du système. Sans WiPro, la localisation, le geofencing, les demandes d’état ainsi que les entrées et sorties documentées restent notamment disponibles.

- Les positions sont transmises par SMS.
- La précision et l’actualité de la position dépendent de la réception satellite.
- Les commandes via le réseau mobile ne conviennent pas aux opérations critiques en temps réel ; le réseau peut retarder la remise et la réponse.
- Armer/désarmer et verrouiller/déverrouiller sont des fonctions distinctes. Les commandes de verrouillage centralisé nécessitent une WiPro III safe.lock compatible, une intégration adaptée au véhicule et des versions logicielles appropriées.
- Le câblage du véhicule lié à la sécurité et le dispositif d’arrêt doivent être installés uniquement par du personnel qualifié.

---

## Principales caractéristiques techniques

| Caractéristique | Valeur documentée / classement |
|---|---|
| Alimentation | 9–30 V CC ; compatibilité 24 V documentée à partir de `0699-003` |
| Protection par fusible | 3 A conformément aux instructions d’installation propres au produit |
| Courant de repos du Pro-Finder | Rév. 1.3 à partir de -045 : env. 16–21 mA en fonctionnement normal ; env. 37 mA en recherche réseau. Rév. 2.6 : env. 21 mA normal |
| Sorties A et B | 12 V, 500 mA maximum selon les instructions documentées |
| Entrées de mesure de tension | U2–U5 également à partir de -045 ; broches 2–5, 0–30 V ; affichage selon le mode (rév. 1.3, PDF p. 56–59) |
| Navigation par satellite | GPS ; GPS/QZSS documenté à partir de `0699-045` |
| Numéros destinataires | jusqu’à 10 |
| Température de fonctionnement | –10 °C à +80 °C |

La consommation du véhicule ne se limite pas au Pro-Finder. La charge de base du véhicule, la WiPro, les autres consommateurs, l’état de la batterie et l’autodécharge doivent être pris en compte séparément ; voir [[Alimentation électrique & temps d'immobilisation — courant de repos, sous-tension et pratique de charge]].

---

## Montage et raccordement

### Emplacement de montage

- Monter le Pro-Finder dans l’habitacle sec du véhicule, jamais dans le compartiment moteur.
- Orienter la face supérieure de l’appareil vers le haut et choisir un emplacement où le récepteur GPS intégré est le moins possible masqué par du métal.
- Protéger le module contre les accès non autorisés tout en le maintenant accessible pour la maintenance.
- Poser les câbles avec une décharge de traction, à l’abri des frottements et loin des éléments chauds ou mobiles.
- Si une antenne GPS externe est utilisée, orienter sa face de réception horizontalement vers le haut et respecter les instructions d’initialisation propres à la génération de l’appareil.

### Raccordement électrique

Le raccordement doit être réalisé selon les instructions fournies pour la génération réelle de l’appareil. Les rév. 2.6 et 1.3 à partir de -045 documentent toutes deux ce raccordement principal à huit broches :

| Raccordement | Fonction |
|---|---|
| Broche 1, noire | masse |
| Broches 2–5 | entrées de mesure de tension U2–U5, avec fonctions supplémentaires selon le mode |
| Broche 6 | sortie B |
| Broche 7, jaune | sortie A |
| Broche 8, rouge | tension de fonctionnement |

Si le faisceau diffère, utiliser uniquement la notice correspondante. **Erreur de source, rév. 1.3 FR, PDF p. 59 :** le texte appelle à tort la broche 1 positive. Le schéma p. 56 et le texte allemand montrent la broche 1 à la masse et la broche 8 au positif. Ne pas câbler d’après cette phrase erronée ; arrêter le montage et faire confirmer par THITRONIK en cas d’écart. La WiPro et le Pro-Finder doivent être raccordés à la même batterie du véhicule. Les deux modules sont reliés par le câble prévu à cet effet.

> **Charge des sorties :** ne pas charger les sorties A et B au-delà de 500 mA. Les charges plus importantes ou inductives nécessitent un circuit de relais correctement dimensionné avec une protection appropriée. Isoler séparément les fils inutilisés.

Insérer ou débrancher la carte SIM, les connecteurs et l’antenne uniquement lorsque le Pro-Finder est hors tension. Le retrait répété d’un fusible du véhicule n’est pas une méthode de réparation ; les défaillances d’alimentation récurrentes ou les éventuelles surtensions doivent être examinées par un professionnel.

---

## Carte SIM et réseau mobile

Le Pro-Finder nécessite une SIM avec **SMS classiques, téléphonie et numéro clairement joignable**. **À partir du SN -045, la SIM doit aussi prendre en charge les données mobiles (4G/LTE)** selon la FAQ p. 1 et la notice abrégée rév. 1.3.2 p. 1. Seule l’ancienne notice Micro-SIM rév. 1.1 indique que les données ne sont pas nécessaires. **Multi-SIM non prise en charge** : un numéro propre est nécessaire (FAQ p. 1). Les cartes prépayées et les abonnements sont tous deux possibles si le forfait, le crédit ou l’état du contrat, le réseau et la règle PIN conviennent.

| Numéro de série | SIM | PIN |
|---|---|---|
| `0699-001` à `0699-007` | Mini-SIM | `0000`, demande activée |
| `0699-008` à `0699-044` | Micro-SIM | `0000`, demande activée |
| à partir de `0699-045` | Nano-SIM | demande de PIN complètement désactivée |

Désactiver la messagerie vocale, les renvois d’appel et les services complémentaires gênants auprès de l’opérateur ou au moyen d’un smartphone. Utiliser uniquement les codes confirmés par l’opérateur ou l’appareil. Pour l’utilisation à l’étranger, vérifier au préalable l’itinérance, le réseau partenaire, la technologie mobile prise en charge et les coûts.

Une homologation permanente d’un opérateur ou un tableau statique des arrêts de réseau par pays ne sont pas fiables. Le choix, la préparation et le test sont décrits dans [[Réseaux mobiles et cartes SIM — mise en service sûre du Pro-Finder]].

---

## Programmation des numéros destinataires

Programmer d’abord les numéros destinataires du Pro-Finder : **10 numéros maximum**. Le premier est le **numéro maître**. Un nouveau SMS de programmation envoyé par ce maître **remplace toute la liste** ; il n’ajoute pas simplement un destinataire.

### SMS de programmation selon la génération

La notice publique à partir de `0699-045`, rév. 1.3 (06/2025), donne par exemple `+S491511142338-491736660456` : premier numéro autorisé avec marquage smartphone, deuxième numéro sans droit de commande. Remplacer les numéros d’exemple. `+` désigne un destinataire autorisé, `-` un destinataire non autorisé, `S` le lien cartographique. Utiliser l’indicatif international sans zéro national initial et **sans espaces** dans le SMS.

### Consulter le crédit prépayé : limite SN -044 / -045

La rév. 2.6 montre également `+S49…` sans interrogation du crédit ; pour les anciennes cartes prépayées compatibles, elle ajoute un code propre à l’opérateur et `P`, par exemple `*100#P+S49…`. **Aucun code de crédit pour un abonnement.** Selon la FAQ, l’interrogation du solde est prévue **uniquement jusqu’au SN -044**. **À partir du SN -045, pas de consultation du crédit par Pro-Finder** : utiliser le portail de l’opérateur. Une interrogation incorrecte peut bloquer les alarmes.

Les exemples de configuration avec préfixe linguistique `DE`/`FR` viennent d’une autre famille documentaire. La notice publique rév. 1.3 ne montre pas ce préfixe. On ne peut donc affirmer ni qu’il est toujours obligatoire, ni qu’il est toujours invalide. Utiliser l’application avec le vrai numéro de série et la langue de l’appareil ; en cas de syntaxe différente, faire confirmer par THITRONIK avant de remplacer la liste. Ne pas combiner des syntaxes de révisions différentes.

Sources : rév. 2.6, PDF p. 44–46 ; rév. 1.3, PDF p. 63–67 ; FAQ allemande, PDF p. 1, 4, 7.

### Effacer les destinataires en position E

**La position E efface tous les numéros destinataires, y compris le numéro maître.** Ce n’est ni une réparation générale, ni l’effacement des émetteurs WiPro ou d’un appairage Bluetooth. Pour une réinitialisation volontaire de la liste uniquement : laisser la SIM dans l’appareil, débrancher le faisceau principal, choisir E, rebrancher et attendre le clignotement jaune/vert. Revenir au mode initial et reprogrammer tous les destinataires nécessaires. Le maître connu peut aussi remplacer la liste entière par SMS. Sources : rév. 2.6, PDF p. 46 ; rév. 1.3, PDF p. 67.

---

## Commande par SMS et appel téléphonique

La forme de commande valide dépend de la langue programmée dans le Pro-Finder. Elle n’est pas déterminée uniquement par la génération matérielle. Pour un appareil programmé en allemand, les commandes suivantes sont notamment documentées :

| Fonction | Commande |
|---|---|
| Armer la WiPro | `scharf` |
| Désarmer la WiPro | `unscharf` |
| Demander l’état | `status` |
| Demander la position | `pos` ou, selon la version documentée, `position` |
| Activer le geofencing | `fence an` |
| Désactiver le geofencing | `fence aus` |
| Activer durablement la sortie A | `a an` |
| Activer la sortie A pendant 1–120 minutes | `a N`, par exemple `a 30` |
| Désactiver la sortie A | `a aus` |
| Activer la sortie A pendant 1 seconde | `a impuls` |
| Commander de manière analogue la sortie B | `b an`, `b N`, `b aus`, `b impuls` |
| Interroger les composants mémorisés | `melder` |
| Activer ou désactiver le GPS | `gps an` ou `gps aus` |

### Modes de fonctionnement, appel et tensions en mode 9

L’application prépare les commandes en fonction de la langue configurée. **En modes 2 et 3, un appel fait basculer la WiPro entre armée et désarmée**, puis envoie le rapport : ce n’est pas une simple interrogation d’état. Le mode 0 est le réglage standard selon la FAQ, sans envoi périodique. Rév. 1.3 : modes 4/5/6/7, intervalles de 15 minutes / 60 minutes / 6 heures / 24 heures ; mode 9, U1–U5 sans intervalle automatique. La rév. 2.6 ne montre aucune tension en mode 9 : ne pas généraliser à toutes les générations (PDF p. 40 contre rév. 1.3 p. 58). Ne pas modifier la position du sélecteur sans vérifier le numéro de série, le type de raccordement et les instructions correspondantes.

Les SMS d’alarme destinés à plusieurs numéros sont envoyés successivement. Si un test d’alarme contrôlé est arrêté immédiatement, les numéros enregistrés plus loin dans la séquence peuvent ne recevoir aucune notification.

---

### Commandes françaises selon la version

L’ancienne matrice publique 1.1 et la rév. 2.6 ne donnent pas les mêmes commandes françaises que la notice à partir de `0699-045`, rév. 1.3. Utiliser la langue programmée dans l’appareil et son logiciel réel, pas simplement la langue de la question. Ne pas traduire librement les commandes ni ajouter des apostrophes typographiques.

| Fonction | Ancienne matrice publique 1.1 | Notice à partir de -045, rév. 1.3 |
|---|---|---|
| Armer / désarmer | `arme` / `desarme` | `activer` / `desactiver` |
| État | `statut` | `rapport d etat` |
| Geofencing actif / inactif | `gardiennage active` / `gardiennage desactive` | `activer le gardiennage` / `desactiver le gardiennage` |
| Appairage actif / inactif | `mode d'apprentissage active` / `mode d'apprentissage desactive` | `activer le mode d appairage` / `desactiver le mode d appairage` |
| Sortie A active / inactive | `a active` / `a desactivee` | `activer la sortie A` / `desactiver la sortie A` |
| Impulsion sortie A | Rév. 2.6 : `a impulsion` | `sortie A impulsion` |

La rév. 1.3 donne `position` pour la localisation et `a %min%` pour une durée de 1 à 120 minutes. Remplacer le paramètre par un nombre, par exemple `a 30` ; ne pas envoyer le paramètre littéral. Ne pas garantir la compatibilité de ces formes avec une ancienne version logicielle. Sources : matrice publique 1.1, PDF p. 1 ; rév. 1.3, PDF p. 71–75. L’ancienne matrice n’est pas une procédure universelle pour tous les Pro-Finder.

---

## Geofencing et position

Le geofencing signale le déplacement par une **alarme antivol silencieuse**. Avec une WiPro raccordée, l’armement l’active et le désarmement le désactive automatiquement. Les modes **8 et B** utilisent la **broche 3** : mode 8, plus de 6 V active / moins de 5 V désactive ; mode B, plus de 6 V désactive / moins de 5 V active. Pour les autres modes normaux, la notice décrit la commande SMS. Pour changer le point de référence, envoyer d’abord `desactiver le gardiennage`, puis `activer le gardiennage` sur un appareil configuré en français selon la rév. 1.3.

### Rayon du geofencing : original et erreur OCR

La notice à partir de `0699-045`, **rév. 1.3, édition 06/2025**, indique **900 mètres** en allemand et en français. La transcription OCR lit par erreur 500 mètres à un endroit : retenir l’original visuel.

L’ancienne **rév. 2.6** indique **environ 1 km** en allemand et **environ 1,5 km** en français. C’est une **contradiction documentaire**, pas une plage réglable démontrée. Pour les anciens appareils, faire confirmer l’affectation par THITRONIK avec numéro de série et logiciel ; ne pas garantir un rayon unique. Même 900 mètres ne constituent pas une frontière géographique exacte. Les réflexions GPS dans les bâtiments peuvent produire des déplacements apparents.

Sources : rév. 1.3, PDF p. 70, 72 / DE 19, 21 ; rév. 2.6, PDF p. 47, 50 / DE 12, 15. L’OCR n’est pas une source indépendante.

### GPS en veille, dernière position et UTC

**GPS: Standby** désigne la veille du récepteur, automatiquement réactivé lors d’un événement. Cette mention ne prouve pas à elle seule l’âge exact de la position. **Pas de position** dans la rév. 1.3 indique l’absence de position actuelle valide. Pro-Finder attend jusqu’à **10 minutes**, puis peut transmettre la **dernière position valide**. L’heure **UTC correspond à la dernière position reçue**, pas nécessairement à l’envoi du SMS. Ne pas présenter une ancienne position comme la position actuelle du véhicule.

Sources : rév. 2.6, PDF p. 47, 50, 52 ; rév. 1.3, PDF p. 70, 73, 75.

---

## Messages d’alarme et d’état

| Message | Déclencheur / contenu typique |
|---|---|
| Rapport d’état | sur demande, par appel ou automatiquement selon le mode de fonctionnement |
| Message d’effraction | événement d’alarme de la WiPro raccordée |
| Alarme de gaz | message de gaz transmis par la WiPro et des capteurs compatibles |
| Alarme manuelle | alarme de panique/d’urgence déclenchée volontairement |
| Message de vol | le geofencing détecte un déplacement significatif ; alarme silencieuse |
| SMS d’urgence | signal d’entrée dans un mode configuré en conséquence |
| Avertissement de tension | l’alimentation atteint le seuil de sous-tension |
| SMS de position | réponse à une demande de position |
| SMS d’aide | réponse à une commande non reconnue, selon la version logicielle |

À partir du jalon documenté `0699-013`, un appel de signalisation supplémentaire vers le numéro maître est indiqué en cas d’alarme. Le déroulement exact dépend de la version de l’appareil et de la configuration. Le Pro-Finder n’établit pas de conversation ; l’appel sert uniquement de signal d’attention supplémentaire.

Selon la génération, le mode de fonctionnement et les composants raccordés, un rapport d’état peut contenir :

- l’état d’alarme de la WiPro
- l’état du geofencing
- la position GPS et la vitesse
- l’état des sorties A et B
- l’alimentation U1 et les entrées U2–U5, également à partir de -045 ; affichage selon le mode
- la température à proximité immédiate de l’appareil, déjà décrite en rév. 2.6 ; pas une mesure garantie de l’habitacle
- le crédit prépayé uniquement sur les appareils compatibles jusqu’à -044 avec le bon code ; pas à partir de -045

---

## Sorties et immobilisation sûre du véhicule

Les sorties A et B peuvent commuter des consommateurs jusqu’à la limite de charge documentée. Les commandes temporisées `a N` et `b N` utilisent des minutes, et non des secondes ; la plage autorisée est de **1 à 120 minutes**. `a impuls` et `b impuls` activent la sortie pendant une seconde.

L’immobilisation du véhicule nécessite un [[Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »]] installé par un professionnel sur la sortie A.

> ⚠️ **AVERTISSEMENT — utiliser exclusivement `kill` :** ne jamais envoyer `a an` ou `a N` pour immobiliser un véhicule. Ces commandes activent la sortie A sans contrôler la vitesse. À l’inverse, `kill` attend que la vitesse GPS soit restée à 0 km/h pendant au moins **5 secondes consécutives** avant d’activer la sortie A.

L’immobilisation est annulée avec `a aus`. Elle est prévue uniquement pour une situation d’alarme et pour une durée maximale de **trois jours**. La consommation accrue risquerait sinon de décharger la batterie de démarrage. Ne jamais tester l’immobilisation sur un véhicule en mouvement et ne pas se rendre soi-même auprès d’un véhicule présumé volé.

---

## Sous-tension et veille

Les notices rév. 2.6 et rév. 1.3 excluent explicitement le **mode B de l’avertissement de tension**. Pour la fonction décrite, une alimentation **durablement inférieure à 11,2 V** déclenche un avertissement et la mise en veille. Le retour au fonctionnement normal se fait **au-dessus de 12,5 V**. Ce n’est pas un déclenchement exactement à 11,2 V ni une validation des mêmes seuils pour toute installation 24 V.

En cas d’absence de réponse, contrôler l’alimentation à l’appareil, la batterie et la charge. Ne pas promettre un SMS de sous-tension en mode B ; cette exception ne prouve pas non plus l’absence de toutes les protections dans ce mode. Retirer plusieurs fois le fusible ne corrige pas la cause. Sources : rév. 2.6, PDF p. 47 / DE 12 ; rév. 1.3, PDF p. 70 / DE 19.

---

## LED d’état selon la génération

| État de la LED | Jusqu’à `0699-044` | À partir de `0699-045` | Premier contrôle sûr |
|---|---|---|---|
| clignote rouge/jaune | recherche du réseau et aucun numéro destinataire | recherche du réseau et aucun numéro destinataire | Contrôler la couverture et la programmation. |
| clignote rouge | recherche du réseau / aucune réception | recherche du réseau / aucune réception | Contrôler l’emplacement, la SIM et la couverture actuelle. |
| allumée en jaune | le modem établit une connexion | le modem établit une connexion | Attendre au démarrage ; si l’état persiste, contrôler la SIM et la réception. |
| allumée en rouge | SIM absente ou défectueuse | SIM absente ou défectueuse | Mettre hors tension et contrôler la SIM ainsi que son format. |
| clignote rouge/vert | le PIN n’est pas `0000` | la demande de PIN n’est pas correctement désactivée | Appliquer la règle PIN correspondant à la génération. |
| clignote en jaune | mémoire des numéros destinataires vide | le dernier SMS n’a pas pu être envoyé | Ancien : numéros ; nouveau : forfait, crédit, numéro et réseau. |
| allumée en vert | envoi d’un SMS | réception ou envoi d’un SMS | État normal et bref de communication. |
| clignote jaune/vert ou vert/jaune | enregistré sur le réseau, mais aucun numéro | enregistré sur le réseau, mais aucun numéro | Programmer les numéros destinataires. |
| clignote en vert | fonctionnement normal | fonctionnement normal | enregistré sur le réseau et numéros présents |

> **Important :** un clignotement jaune a une signification différente avant et à partir de `0699-045`. Un diagnostic précis de la LED est impossible sans le numéro de série complet.

---

### Diagnostic GPS en position F

En **position F**, **rouge fixe : GPS non connecté**, **jaune clignotant : données GPS sans position valide**, **vert fixe : position GPS correcte**. Si le jaune clignote encore après cinq minutes, contrôler la réception et l’emplacement. Revenir ensuite au mode initial. En fonctionnement normal, le rouge fixe signifie au contraire SIM absente/défectueuse. Ne pas confondre les codes du diagnostic GPS avec ceux du fonctionnement normal.

Pour le raccordement initial de l’antenne GPS externe optionnelle, les deux notices demandent une connexion hors tension puis au moins cinq minutes **au-dessus de 13,5 V** avec une réception satellite dégagée. Il s’agit de l’initialisation de l’antenne, pas d’une tension minimale universelle de fonctionnement. Sources : rév. 2.6, PDF p. 41–42 ; rév. 1.3, PDF p. 60–61.

---

## Contrôle systématique des défauts

| Observation | Contrôle |
|---|---|
| aucune réponse au SMS | Contrôler la programmation, l’autorisation de l’expéditeur, la réception, le forfait, le crédit et la syntaxe exacte ; utiliser un SMS classique plutôt que RCS/iMessage. |
| la demande d’état fonctionne, mais les alarmes WiPro manquent | Contrôler le câble et l’état WiPro dans le rapport ; exclure un code de crédit prépayé incorrect. |
| la messagerie répond à un appel test | Désactiver la messagerie ou le renvoi auprès de l’opérateur ou sur l’appareil. |
| le premier numéro reçoit l’alarme, les suivants non | Tenir compte de l’envoi successif des SMS ; ne pas arrêter immédiatement un test contrôlé. |
| clignotement jaune | Toujours l’évaluer par rapport au seuil `0699-045`. |
| aucune position actuelle | Contrôler l’emplacement, le masquage et la réception GPS ; tenir compte du marquage d’une ancienne position. |
| aucune réaction après une sous-tension | Mesurer la tension, charger la batterie et respecter le seuil de retour supérieur à `12,5 V`. |
| panne récurrente après une charge ou un événement solaire | Faire contrôler l’alimentation et d’éventuelles surtensions par un professionnel ; ne pas utiliser le fusible comme solution permanente. |

Les applications de messagerie Android peuvent envoyer les commandes sous forme de message RCS/chat plutôt que de SMS. Si nécessaire, désactiver temporairement RCS pour la configuration et contrôler le type de message. Sur un iPhone, la commande ne doit pas être envoyée par iMessage ; un numéro Pro-Finder précédemment associé à iMessage peut devoir être désenregistré.

Les autres procédures de diagnostic et mesures propres aux générations figurent dans [[Dépannage — diagnostic sûr des problèmes fréquents]]. Pour une escalade, documenter le numéro de série complet, la version logicielle, l’opérateur SIM, le forfait, le pays, le réseau hôte, l’état de la LED, la tension d’alimentation et le déroulement exact conformément à [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]].

---

## Compatibilité de l’application et mises à jour

La compatibilité documentée du Pro-Finder avec l’application commence à `0699-013`, et non seulement au passage au matériel LTE à `0699-045`. Les boutons réellement fonctionnels dépendent également de la version logicielle du Pro-Finder, de la variante WiPro, de l’intégration au véhicule et des accessoires installés.

Si le numéro de série est inconnu, l’application peut proposer une valeur de remplacement. Celle-ci sert uniquement à afficher des options et ne constitue ni une confirmation de compatibilité ni une mise à jour. La saisie manuelle de `0699-045` n’ajoute pas de modem LTE.

THITRONIK doit vérifier, à partir du numéro de série complet et de la version réelle de l’appareil, si une mise à jour matérielle ou logicielle est proposée pour un appareil donné. Les anciennes listes de prix, promotions et promesses générales de mise à niveau ne sont pas présentées comme des conditions actuelles.

---

## Références croisées

- [[Réseaux mobiles et cartes SIM — mise en service sûre du Pro-Finder]]
- [[THITRONIK® App — commandes, configuration et dépannage]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »]]
- [[Alimentation électrique & temps d'immobilisation — courant de repos, sous-tension et pratique de charge]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
