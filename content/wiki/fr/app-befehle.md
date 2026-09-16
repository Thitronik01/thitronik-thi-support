---
title: 'THITRONIK® App — commandes, configuration et dépannage'
sources:
  - sources/App Befehle 1.1.pdf
  - sources/App Befehle 1.1.txt
  - sources/Häufige Fragen zur THITRONIK® App.pdf
  - sources/Häufige Fragen zur THITRONIK® App.txt
  - sources/FAQ_Haeufige-Fragen-zur-THITRONIK-App_DE.md
  - sources/THITRONIK-App__Snippets_DE.md
  - sources/APP.docx
  - sources/UTC.docx
  - >-
    sources/SMS-Konfiguration für Pro-Finder - SMS-Konfiguration für
    Pro-Finder.csv
  - sources/NUR_INTERNER_GEBRAUCH_Pro-finder_Befehle_abV9.1_(V1.1).pdf
  - sources/Pro-finder__Manual__DE__2_7__Ausgänge-per-SMS-steuern.md
  - sources/FAQ_Pro-finder__DE.md
updated: '2026-07-14'
confidence: high
lang: fr
translation_of: sources/app-befehle.md
dealerStatus: internal_only
---

# THITRONIK® App — commandes, configuration et dépannage

La THITRONIK® App permet de commander les appareils compatibles des gammes **WiPro III**, **WiPro III safe.lock** et **Pro-Finder** :

- à proximité via Bluetooth avec [[bt-connect|BT-connect]] ou le [[vernetzungsmodul|module Bluetooth de mise en réseau]]
- à distance par SMS avec [[pro-finder|Pro-Finder]]

Les commandes proposées dans l’application dépendent des appareils saisis, de leurs versions matérielle et logicielle effectives ainsi que du mode d’accès sélectionné. La saisie d’un numéro de série dans l’application n’ajoute aucune fonction au matériel installé.

---

## Commandes SMS de la matrice publique 1.1

Les commandes doivent être envoyées sous forme de texte au numéro de téléphone du Pro-Finder. L’application les prépare en fonction de la langue sélectionnée.

### WiPro et verrouillage centralisé

| Fonction | Allemand | Anglais | Français | Suédois |
|----------|----------|---------|----------|---------|
| Armer | `scharf` | `arm` | `arme` | `skarp` |
| Désarmer | `unscharf` | `disarm` | `desarme` | `oskarp` |
| Activer le mode de mémorisation | `anlernmodus an` | `teach mode on` | `mode d'apprentissage active` | `inlarningslage pa` |
| Désactiver le mode de mémorisation | `anlernmodus aus` | `teach mode off` | `mode d'apprentissage desactive` | `inlarningslage av` |
| Verrouiller le véhicule¹ | `zu` | `lock` | `ferme` | `las` |
| Déverrouiller le véhicule¹ | `auf` | `unlock` | `ouvert` | `las upp` |

¹ Nécessite une WiPro III safe.lock compatible et un raccordement adapté au véhicule. L’armement et le verrouillage, tout comme le désarmement et le déverrouillage, sont des fonctions fondamentalement distinctes.

### Sorties A et B

| Fonction | Allemand | Anglais | Français | Suédois |
|----------|----------|---------|----------|---------|
| Activer la sortie A en permanence | `a an` | `a on` | `a active` | `a pa` |
| Activer la sortie A pendant 1 à 120 minutes | `a N` | `a N` | `a N` | `a N` |
| Désactiver la sortie A | `a aus` | `a off` | `a desactivee` | `a av` |
| Déclencher la fonction kill | `kill` | `kill` | `kill` | `kill` |
| Activer la sortie B en permanence | `b an` | `b on` | `b activee` | `b pa` |
| Activer la sortie B pendant 1 à 120 minutes | `b N` | `b N` | `b N` | `b N` |
| Désactiver la sortie B | `b aus` | `b off` | `b desactivee` | `b av` |

Dans `a N` et `b N`, remplacer `N` par la durée souhaitée, comprise entre **1 et 120 minutes**, par exemple `a 30` pour 30 minutes. Dans la matrice de commandes, la notation `"1-120"` indique la plage de valeurs autorisée ; ne pas envoyer les guillemets ni la plage elle-même.

> ⚠️ **AVERTISSEMENT — immobilisation du véhicule :** Avec le [[abschalteinrichtung|dispositif d’arrêt]], utiliser exclusivement `kill`. La commande `kill` n’active la sortie A que lorsque la vitesse GPS est restée en continu à 0 km/h pendant au moins 5 secondes. Les commandes `a an` et `a N` n’effectuent pas ce contrôle de sécurité et ne doivent jamais servir à immobiliser un véhicule. Envoyer `a aus` pour mettre fin à l’immobilisation.

### Geofencing et interrogations

| Fonction | Allemand | Anglais | Français | Suédois |
|----------|----------|---------|----------|---------|
| Activer le Geofencing | `fence an` | `fence on` | `gardiennage active` | `fence pa` |
| Désactiver le Geofencing | `fence aus` | `fence off` | `gardiennage desactive` | `fence av` |
| Interroger l’état | `status` | `status` | `statut` | `status` |
| Interroger la position | `pos` | `pos` | `pos` | `pos` |

---

## Autres commandes Pro-Finder documentées

La matrice interne répertorie des commandes supplémentaires pour les versions logicielles **9.1**, **9.4** et **10.0.0**. Pour un appareil réglé en allemand, elles comprennent notamment :

| Fonction | Commande |
|----------|----------|
| Déclencher une alarme | `alarm` |
| Interroger la liste des détecteurs ou composants mémorisés | `melder` |
| Activer la sortie A pendant 1 seconde | `a impuls` |
| Activer la sortie B pendant 1 seconde | `b impuls` |
| Activer le GPS | `gps an` |
| Désactiver le GPS | `gps aus` |
| Interroger la position | `position` ou `pos` |

> `alarm` déclenche une alarme. N’utiliser cette commande que lors d’un test contrôlé et informer au préalable toutes les personnes présentes.

Les codes de langue documentés pour le SMS de programmation sont `DE`, `FR`, `DK`, `GB`, `NL`, `IT`, `SE` et `CZ`. D’après la matrice interne, les lettres repérées en couleur dans le **SMS de programmation** ne sont pas sensibles à la casse. Il est néanmoins recommandé de respecter la graphie documentée pour les commandes d’utilisation.

---

## Compatibilité de l’application et numéros de série

### Seuils minimaux documentés

| Fonction | Appareil | À partir du numéro de série |
|----------|----------|-----------------------------|
| Fonctions de base de l’application | WiPro III | `0823-018` |
| Fonctions de base de l’application | WiPro III safe.lock | `1050-004` |
| Fonctions de base de l’application | Pro-Finder | `0699-013` |
| Verrouillage centralisé et mode de mémorisation Easy-Add 3.0 | WiPro III safe.lock | `1050-004`, kit Ford `5298-001` ou kit Sprinter `5458-001` |
| Verrouillage centralisé et mode de mémorisation Easy-Add 3.0 | Pro-Finder | `0699-013` |
| Fonction combinée « verrouiller et armer » | WiPro III safe.lock | `1050-006` |
| Fonction combinée « verrouiller et armer » | Pro-Finder | `0699-015` |

Le numéro de série ne suffit pas toujours à déterminer la compatibilité. Il faut également vérifier la variante de l’appareil, sa version logicielle et son raccordement au véhicule.

### Valeurs à saisir si le numéro de série est inconnu

Si le numéro de série réel n’est pas disponible lors de la configuration de l’application, la FAQ indique les valeurs suivantes afin d’afficher presque toutes les options de l’application :

| Appareil | Valeur à saisir |
|----------|-----------------|
| WiPro III | `0823-018` |
| WiPro III safe.lock | `1050-003` |
| Pro-Finder | `0699-012` |

> Ces valeurs **ne constituent pas une preuve de compatibilité** et ne remplacent pas le numéro de série réel. Elles n’activent ni n’ajoutent les fonctions non prises en charge. THITRONIK doit vérifier la version réelle de l’appareil pour déterminer si une mise à jour est possible.

---

## Configurer Pro-Finder par SMS de programmation

Pro-Finder ne répond aux commandes d’utilisation qu’après l’enregistrement d’au moins un numéro de téléphone au moyen d’un **SMS de programmation**. L’application génère ce message en fonction du type de SIM et selon qu’un smartphone est utilisé ou non.

### Exemples de syntaxe

| Type de SIM | Smartphone/application | Standard sans identification smartphone |
|-------------|------------------------|------------------------------------------|
| Prépayée | `*100#PDE+S491701234567` | `*100#PDE+491701234567` |
| Avec abonnement | `DE+S491701234567` | `DE+491701234567` |

### Signification des éléments

| Élément | Signification |
|---------|---------------|
| `*100#` | Exemple de code de consultation du solde propre à l’opérateur ; à utiliser uniquement avec une offre prépayée et à adapter à l’opérateur mobile |
| `P` | Identifie une carte SIM prépayée |
| `DE` | Code de langue ; autres codes documentés : `FR`, `DK`, `GB`, `NL`, `IT`, `SE` et `CZ` |
| `+` | Identifie un numéro de téléphone autorisé ; le premier numéro est le numéro maître |
| `S` | Identifie un numéro de smartphone ; les positions sont présentées sous forme de liens cartographiques cliquables |
| `491701234567` | Exemple de numéro au format international, avec l’indicatif du pays et sans le zéro initial du numéro national |

Ne pas insérer d’espaces dans le SMS de programmation. Dans la syntaxe prépayée pour smartphone, le code de langue se trouve entre `P` et `+S`.

> **Sélectionner le bon type de SIM :** Ne saisir aucun code de consultation du solde pour une SIM avec abonnement. Un code inadapté ou erroné peut amener Pro-Finder à attendre une réponse de l’opérateur lors d’une alarme et ainsi empêcher l’envoi des messages d’alarme.

Des informations complémentaires sur les cartes SIM, les opérateurs et les réglages des smartphones sont disponibles sous [[mobilfunk-sim|Communications mobiles et cartes SIM]].

### Modifier la langue et les données du véhicule dans l’application

1. Ouvrir les **Paramètres** de l’application et sélectionner la langue.
2. Ouvrir le véhicule, puis sélectionner le type de véhicule et le mode d’accès sous **Données techniques**.
3. Enregistrer le véhicule.
4. Générer un nouveau SMS de programmation dans **Paramètres du véhicule**.
5. Vérifier le code de langue, le type de SIM et le numéro de téléphone.
6. Envoyer le SMS et attendre le SMS d’état du Pro-Finder.

---

## Dépannage

### Pro-Finder ne répond pas aux commandes

- Vérifier qu’un SMS de programmation a déjà été envoyé avec succès. Les expéditeurs non enregistrés sont ignorés.
- Si aucun rapport d’état n’est arrivé après la configuration et que la carte SIM avait déjà été installée avant son activation par l’opérateur, couper l’alimentation du Pro-Finder pendant **5 secondes**, la rétablir et attendre environ une minute.
- Vérifier le numéro de téléphone, le type de SIM, le code de langue et le code de consultation du solde dans le SMS de programmation.

### L’interrogation d’état fonctionne, mais les alarmes WiPro sont absentes

1. Vérifier le câble de connexion côté WiPro et côté Pro-Finder.
2. Vérifier que la première ligne du rapport d’état indique l’état de la WiPro.
3. Si c’est le cas, contrôler la configuration de la SIM : aucun code de consultation prépayé ne doit être programmé pour une SIM avec abonnement ; pour une offre prépayée, le code doit correspondre à l’opérateur.
4. Générer dans l’application un nouveau SMS de programmation avec les données corrigées.

### Un deuxième numéro destinataire ne reçoit pas de SMS d’alarme

Pro-Finder envoie les SMS d’alarme les uns après les autres. Si le système est rapidement désarmé, les numéros destinataires enregistrés plus loin dans la liste risquent de ne pas être avertis. Prévoir suffisamment de temps lors d’un test d’alarme contrôlé.

### Android affiche « Commande invalide » ou n’envoie pas le SMS

- Désactiver les messages RCS ou de chat dans l’application de messagerie et forcer l’envoi sous forme de SMS classique.
- Si ce réglage est disponible, sélectionner l’**alphabet GSM** ou **ASCII** comme mode de saisie des SMS ; Unicode peut modifier la syntaxe de la commande.
- Générer ensuite un nouveau SMS de programmation dans la THITRONIK® App.

### L’iPhone affiche « Commande invalide » ou Pro-Finder ne répond pas

Désactiver temporairement iMessage sur l’iPhone utilisé pour la configuration initiale, puis renvoyer le message sous forme de SMS.

### Utiliser Pro-Finder sans WiPro

Pro-Finder peut également fonctionner sans WiPro. Les fonctions disponibles comprennent notamment :

- la localisation GPS
- le Geofencing par SMS ou entrée de tension
- les entrées de mesure de tension
- les sorties A et B

La fonction kill nécessite en plus un [[abschalteinrichtung|dispositif d’arrêt]] correctement installé sur la sortie A.

### L’appairage Bluetooth ou une commande n’est pas visible

Une police système ou un zoom d’affichage trop grand peut masquer des commandes :

- Android : **Paramètres → Affichage → Taille et style de police ou Zoom**
- iOS : **Réglages → Luminosité et affichage → Taille du texte**

Réduire provisoirement la taille de police ou le zoom, puis recommencer l’appairage. Des informations propres à chaque appareil sont disponibles sous [[bt-connect|BT-connect]] et [[vernetzungsmodul|module Bluetooth de mise en réseau]].

### L’application se ferme après une mise à jour du système d’exploitation

1. Fermer complètement l’application, puis la rouvrir.
2. Redémarrer le smartphone.
3. Si le problème persiste, envoyer les données de diagnostic à THITRONIK et contacter le support avant de réinstaller l’application.

### Envoyer les données de diagnostic

Dans l’application, toucher l’icône en forme de roue dentée en haut à droite, puis sélectionner **Contact → Écrire un e-mail**. Selon les instructions de l’application, les numéros de téléphone qui y sont saisis ne sont pas transmis.

### L’horodatage diffère d’une ou deux heures

THITRONIK utilise l’**UTC** comme base de temps fixe ; celle-ci n’est pas réglée manuellement. En Allemagne, l’heure normale d’Europe centrale est en avance d’une heure sur l’UTC en hiver ; l’heure d’été d’Europe centrale est en avance de deux heures en été. Ce décalage n’est pas un défaut de l’appareil.

---

## Articles associés

- [[pro-finder|Pro-Finder]] — télécommande par SMS, numéros de téléphone et GPS
- [[bt-connect|BT-connect]] — commande Bluetooth à proximité
- [[vernetzungsmodul|Module Bluetooth de mise en réseau]] — ancien adaptateur Bluetooth
- [[wipro-iii|WiPro III]] — générations d’appareils et versions logicielles
- [[anlernvorgang|Processus de mémorisation]] — procédures Easy-Add
- [[abschalteinrichtung|Dispositif d’arrêt]] — utilisation sûre de la fonction kill
- [[mobilfunk-sim|Communications mobiles et cartes SIM]] — informations sur la SIM, l’opérateur et le réseau
