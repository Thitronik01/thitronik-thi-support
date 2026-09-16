---
title: Pro-Finder — Module de télémétrie GSM/GPS
sources:
  - sources/pro-finder_-_bedienungs-_und_montageanleitung_2.6_01.pdf
  - sources/pro_finder-kurzanleitung-international.pdf
  - sources/pro_finder-kurzanleitung-international_sn-045.pdf
  - >-
    sources/pro-finder_ab_sn045_bedienungs_und_installationsanleitung_zehn_sprachen.pdf
  - sources/pro-finder_ocr_abschrift.pdf
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/Fragen zu Pro-finder.pdf
  - sources/Pro Finder.docx
  - sources/Anbieter.docx
  - sources/Handy.docx
  - sources/NUR_INTERNER_GEBRAUCH_Pro-finder_Befehle_abV9.1_(V1.1).pdf
  - >-
    sources/SMS-Konfiguration für Pro-Finder - SMS-Konfiguration für
    Pro-Finder.csv
  - wiki/app-befehle.md
  - wiki/mobilfunk-sim.md
  - wiki/seriennummern-softwarestaende.md
  - wiki/stoerungsbeseitigung.md
updated: '2026-07-15'
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
| Courant de repos du Pro-Finder | env. 16–25 mA selon l’état de fonctionnement du module mobile |
| Sorties A et B | 12 V, 500 mA maximum selon les instructions documentées |
| Entrées de mesure de tension | U2–U5 sur les anciennes versions ; affectation exacte selon le numéro de série et les instructions |
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

Le raccordement doit être réalisé selon les instructions fournies pour la génération réelle de l’appareil. L’ancien faisceau principal documente notamment :

| Raccordement | Fonction |
|---|---|
| Broche 1, noire | masse |
| Broches 2–5 | entrées de mesure de tension U2–U5, avec fonctions supplémentaires selon le mode |
| Broche 6 | sortie B |
| Broche 7, jaune | sortie A |
| Broche 8, rouge | tension de fonctionnement |

Si le faisceau est différent ou si l’appareil est à partir de `0699-045`, seules les instructions correspondantes font foi. La WiPro et le Pro-Finder doivent être raccordés à la même batterie du véhicule. Les deux modules sont reliés par le câble prévu à cet effet.

> **Charge des sorties :** ne pas charger les sorties A et B au-delà de 500 mA. Les charges plus importantes ou inductives nécessitent un circuit de relais correctement dimensionné avec une protection appropriée. Isoler séparément les fils inutilisés.

Insérer ou débrancher la carte SIM, les connecteurs et l’antenne uniquement lorsque le Pro-Finder est hors tension. Le retrait répété d’un fusible du véhicule n’est pas une méthode de réparation ; les défaillances d’alimentation récurrentes ou les éventuelles surtensions doivent être examinées par un professionnel.

---

## Carte SIM et réseau mobile

Le Pro-Finder nécessite une SIM avec **SMS classiques, téléphonie et numéro clairement joignable**. Les données mobiles ne sont pas nécessaires à sa commande par SMS. Les cartes prépayées et les abonnements sont tous deux possibles si le forfait, le crédit ou l’état du contrat, le réseau et la règle PIN conviennent.

| Numéro de série | SIM | PIN |
|---|---|---|
| `0699-001` à `0699-007` | Mini-SIM | `0000`, demande activée |
| `0699-008` à `0699-044` | Micro-SIM | `0000`, demande activée |
| à partir de `0699-045` | Nano-SIM | demande de PIN complètement désactivée |

Désactiver la messagerie vocale, les renvois d’appel et les services complémentaires gênants auprès de l’opérateur ou au moyen d’un smartphone. Utiliser uniquement les codes confirmés par l’opérateur ou l’appareil. Pour l’utilisation à l’étranger, vérifier au préalable l’itinérance, le réseau partenaire, la technologie mobile prise en charge et les coûts.

Une homologation permanente d’un opérateur ou un tableau statique des arrêts de réseau par pays ne sont pas fiables. Le choix, la préparation et le test sont décrits dans [[Réseaux mobiles et cartes SIM — mise en service sûre du Pro-Finder]].

---

## Programmation des numéros destinataires

Le Pro-Finder ne répond aux commandes qu’après la programmation réussie d’au moins un numéro. Le premier numéro est le **numéro maître**. Il peut ensuite remplacer le bloc de numéros enregistré au moyen d’un nouveau SMS de programmation.

### Exemples de syntaxe

| Type de SIM | Marquage smartphone | SMS de programmation |
|---|---|---|
| Prépayée | oui | `*100#PDE+S491701234567` |
| Prépayée | non | `*100#PDE+491701234567` |
| Abonnement | oui | `DE+S491701234567` |
| Abonnement | non | `DE+491701234567` |

| Élément | Signification |
|---|---|
| `*100#` | exemple propre à un opérateur pour consulter le crédit ; uniquement pour une carte prépayée et à adapter au fournisseur |
| `P` | marquage d’une carte prépayée |
| `DE` | langue allemande de l’appareil |
| `+` | numéro autorisé ; le premier numéro est le numéro maître |
| `-` | numéro destinataire non autorisé, sans droit de commande |
| `S` | marquage smartphone pour obtenir un lien cartographique cliquable |
| `491701234567` | exemple au format international, avec indicatif du pays et sans le zéro national initial |

Ne pas ajouter d’espaces, de guillemets typographiques ni de formatage automatique dans le SMS de programmation. Aucun code de consultation du crédit ne doit être programmé pour une SIM avec abonnement. Un code incorrect peut retarder ou bloquer les messages d’alarme pendant que l’appareil attend la réponse de l’opérateur.

Les codes de langue documentés sont `DE`, `FR`, `DK`, `GB`, `NL`, `IT`, `SE` et `CZ`. La procédure complète est décrite dans [[THITRONIK® App — commandes, configuration et dépannage]].

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

L’application prépare les commandes en fonction de la langue configurée. La commande par appel dépend du mode sélectionné : un appel peut demander un rapport d’état ou, avec une commande WiPro configurée en conséquence, modifier l’état d’alarme. Ne pas modifier la position du sélecteur sans vérifier le numéro de série, le type de raccordement et les instructions correspondantes.

Les SMS d’alarme destinés à plusieurs numéros sont envoyés successivement. Si un test d’alarme contrôlé est arrêté immédiatement, les numéros enregistrés plus loin dans la séquence peuvent ne recevoir aucune notification.

---

## Geofencing et position

Le geofencing surveille le déplacement du véhicule stationné par rapport à sa position initiale et le signale comme une alarme antivol silencieuse. Selon la documentation du produit, le geofencing est activé automatiquement lorsqu’une WiPro raccordée est armée. Il peut également être commandé par SMS ou, dans certains anciens modes configurés en conséquence, par une entrée de tension.

Les documents de différentes générations indiquent des distances de déclenchement approximatives comprises entre **500 m et 1 km**. Ces valeurs ne constituent pas une limite géographique précise. La réception satellite, la version de l’appareil et le déroulement du déplacement influencent le déclenchement. Dans les bâtiments ou en présence de fortes réflexions GPS, un changement de position incohérent peut se produire ; si nécessaire, désactiver volontairement le geofencing à cet endroit avec `fence aus`, puis le réactiver ultérieurement.

Si aucune position GPS actuelle n’est disponible, le Pro-Finder attend jusqu’à environ **10 minutes**, selon la version, puis peut envoyer la dernière position valide. La mention `GPS: Standby` signifie que la position transmise n’est pas actuelle. L’heure UTC affichée correspond alors à la dernière position valide et pas nécessairement à l’heure d’envoi du message.

Les positions servent à l’orientation et ne remplacent ni un système de localisation certifié ni l’intervention de la police. Ne pas intervenir soi-même en cas de vol.

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
- l’alimentation U1 et, sur les anciens appareils, les entrées de mesure U2–U5 disponibles
- la température de l’appareil à partir de `0699-045`
- le crédit prépayé si un code de consultation adapté est programmé

---

## Sorties et immobilisation sûre du véhicule

Les sorties A et B peuvent commuter des consommateurs jusqu’à la limite de charge documentée. Les commandes temporisées `a N` et `b N` utilisent des minutes, et non des secondes ; la plage autorisée est de **1 à 120 minutes**. `a impuls` et `b impuls` activent la sortie pendant une seconde.

L’immobilisation du véhicule nécessite un [[Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »]] installé par un professionnel sur la sortie A.

> ⚠️ **AVERTISSEMENT — utiliser exclusivement `kill` :** ne jamais envoyer `a an` ou `a N` pour immobiliser un véhicule. Ces commandes activent la sortie A sans contrôler la vitesse. À l’inverse, `kill` attend que la vitesse GPS soit restée à 0 km/h pendant au moins **5 secondes consécutives** avant d’activer la sortie A.

L’immobilisation est annulée avec `a aus`. Elle est prévue uniquement pour une situation d’alarme et pour une durée maximale de **trois jours**. La consommation accrue risquerait sinon de décharger la batterie de démarrage. Ne jamais tester l’immobilisation sur un véhicule en mouvement et ne pas se rendre soi-même auprès d’un véhicule présumé volé.

---

## Sous-tension et veille

- À une tension d’alimentation de **11,2 V**, le Pro-Finder envoie un avertissement de tension.
- Il passe ensuite en veille pour protéger la batterie contre la décharge profonde et cesse temporairement de répondre aux commandes.
- Après la recharge et avec une alimentation supérieure à **12,5 V**, il revient au fonctionnement normal.
- Après un avertissement de sous-tension, contrôler la batterie, le système de charge et la charge permanente totale.

Un Pro-Finder qui ne répond pas n’est donc pas automatiquement défectueux. Contrôler d’abord la tension d’alimentation réelle au niveau de l’appareil et la capacité de charge de la batterie. Des réinitialisations répétées par le fusible ne corrigent pas la cause.

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
