---
title: WiPro III — système d'alarme radio pour véhicules de loisirs
sources:
  - "content/quellen/fahrzeug-safelock-upgrade.pdf"
  - "content/quellen/fahrzeug-update-service-2024.pdf"
  - "content/quellen/wipro-iii-installation-rev1.8.pdf"
  - "content/quellen/wipro-iii-faq.pdf"
  - "content/quellen/wipro-iii-safelock-faq.pdf"
  - "content/quellen/wipro-iii-kurzanleitung-rev1.6.pdf"
  - "content/quellen/wipro-iii-safelock-kurzanleitung-rev1.3.pdf"
  - "content/quellen/wipro-iii-safelock-bedienung-rev1.3.pdf"
  - "content/quellen/wipro-iii-safelock-bedienung-rev1.2.pdf"
  - "sources/wipro_deutsche_bedienungsanleitung_abschrift.txt"
  - "sources/Was ist eine Wipro.docx"
  - "sources/FAQ_WiPro-III_DE.md"
  - "sources/WiPro_QuickStart_DE_RAG_Pack/WiPro__QuickStart__Alarm_Ventcheck_Panikalarm_DE.md"
  - "sources/WiPro_QuickStart_DE_RAG_Pack/WiPro__QuickStart__Batterie_Zubehoer_Alarmspeicher_DE.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/05_1_3_safe_lock_key.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/06_1_4_safe_lock_remote.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/18_1_10_alarm_unterbrechen_overview.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/19_1_10_1_einbruchalarm_key.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/22_1_10_4_gasalarm_remote.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/35_3_2_entsorgung.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/36_3_3_konformitaet.md"
  - "sources/WiPro_safe-lock_DE_FULL_RAG_from_multilang/38_snippets.md"
updated: '2026-10-01'
confidence: medium
lang: fr
translation_of: sources/wipro-iii.md
dealerStatus: internal_only
---


# WiPro III — système d'alarme radio pour véhicules de loisirs

WiPro III est un système d'alarme spécialement conçu pour les **véhicules de loisirs**. Il n'utilise pas de détecteurs de mouvement. Les ouvertures supplémentaires sont surveillées par des contacts magnétiques radio ; selon le véhicule, les portes d'origine peuvent être intégrées via le CAN-Bus ou l'entrée de l'éclairage intérieur. D'autres sources d'alarme peuvent être ajoutées à l'aide d'accessoires compatibles.

**Variantes :**
- **WiPro III** — version standard
- **WiPro III safe.lock** — ajoute à WiPro III une logique de verrouillage centralisé et d'accès adaptée au véhicule. Elle vise notamment à empêcher qu'un signal de déverrouillage enregistré ouvre le véhicule tout en désarmant le système d'alarme. safe.lock n'est pas un dispositif d'immobilisation.

---

## Commande selon le véhicule : Sprinter, Ford et VW

**Mercedes Sprinter safe.lock :** après verrouillage avec la clé d'origine, le déverrouillage par télécommande THITRONIK, NFC ou application est impossible. À partir du logiciel **1.2.0sx**, **dix bips courts et rapides avec clignotement rapide des feux du véhicule** avertissent du risque d'enfermement. En camping, verrouiller avec l'accessoire THITRONIK ; la clé d'origine peut ensuite déverrouiller et Auto-Close reste inactif. Pour un stationnement prolongé sans recharge, la notice recommande la clé d'origine pour le Sleep Mode. Source : rév. 1.3, page PDF 42 ; l'avertissement à dix bips est absent de la rév. 1.2, page PDF 41.

**Ford Transit 2019–2024 / Transit Custom jusqu'en 2023 :** l'option de verrouillage des interrupteurs (« Schaltersperre ») doit être disponible et désactivée dans le menu du véhicule.

**Ford Transit 2024+ / Transit Custom 2023+ :** ce verrouillage des interrupteurs ne peut pas être désactivé selon la rév. 1.3. Après verrouillage/armement avec la clé d'origine, les accessoires THITRONIK ne peuvent pas déverrouiller/désarmer. En camping, verrouiller avec THITRONIK ; la clé d'origine reste utilisable pour déverrouiller et Auto-Close est inactif. Les plages **2024 et 2023 se chevauchent dans la source** : vérifier génération et équipement, sans inventer de mois de transition. Source : rév. 1.3, page PDF 43 ; la rév. 1.2, page PDF 41, ne distingue pas ces générations.

**Modèles VW T :** avec la porte conducteur fermée, le verrouillage centralisé peut déjà fonctionner alors que d'autres portes restent ouvertes. L'alarme ne s'arme qu'après fermeture de **toutes les portes du véhicule**. Sources : rév. 1.3, page PDF 43 ; rév. 1.2, page PDF 42.

## Caractéristiques techniques

### Centrale

| Paramètre | Valeur |
|-----------|------|
| Alimentation | 9–30 V CC |
| Consommation de courant (veille) | env. 11 mA |
| Sortie sirène | 9–30 V (= Uin) / max. 1 A |
| Sortie des clignotants | max. 60 W |
| Nombre max. d'émetteurs mémorisables | 100 |
| Fréquence de réception | 868,35 MHz |
| Nombre de codes | > 4 milliards |
| Température de fonctionnement | –10 °C à +80 °C |
| Interfaces | RJ11 (Pro-Finder), CAN-Bus |

### Accessoires radio (contacts magnétiques, télécommandes radio)

| Paramètre | Valeur |
|-----------|------|
| Puissance d'émission | < 10 mW |
| Portée maximale | 75 m (en champ libre) |
| Pile | CR2032 (pile bouton, 3 V) |
| Autonomie de la batterie | env. 2 ans |
| Fréquence d'émission | 868,35 MHz |
| Nombre de codes | > 4 milliards |
| Température de fonctionnement | –10 °C à +60 °C |

> **ATTENTION :** Une pile inadaptée ou mal insérée présente un risque d'explosion. Utiliser uniquement le type de pile prescrit et éliminer les piles usagées conformément à la réglementation en vigueur.

---

## Utilisation prévue et limites

- Conçu pour les **véhicules de loisirs** — il n'est pas destiné à sécuriser des bâtiments, des vélos ou des motos.
- Seules les ouvertures détectées par le véhicule via le **CAN-Bus / signal de l'éclairage intérieur** ou équipées de **contacts magnétiques radio** sont surveillées.
- Les ouvertures sans détection côté véhicule et sans contact installé ultérieurement restent **non sécurisées**.
- Le WiPro III signale les événements d'intrusion ou d'alarme, mais il n'**empêche** pas l'intrusion.

---

## Principe de fonctionnement

1. Les portes, fenêtres et trappes supplémentaires sont surveillées par des **contacts magnétiques radio 868**.
2. Selon le véhicule, les portes d'origine sont détectées via le **CAN-Bus** ou l'**entrée de l'éclairage intérieur**.
3. Selon le véhicule et l'équipement, le système est armé et désarmé à l'aide de la clé-télécommande d'origine ou d'un dispositif de commande THITRONIK®.
4. En cas d'alarme, les avertisseurs sonores raccordés, les feux de détresse et la LED d'état sont activés. La sirène et le klaxon du véhicule sont deux avertisseurs distincts.

### Séquences d'alarme

La notice rév. 1.3 (06/2025), chapitres 1.9.2–1.9.3, pages PDF 50–51, décrit les séquences suivantes :

| Type d'alarme | Alarme sonore | Clignotants et LED d'état |
|---|---|---|
| Intrusion | Sirène et, selon le véhicule, klaxon pendant environ **30 secondes** | environ **180 secondes** dans le chapitre détaillé |
| Gaz | Sirène et, selon le véhicule, klaxon pendant environ **30 secondes avec interruptions** | environ **180 secondes** dans le chapitre détaillé |

**Contradiction sur la durée de l'alarme visuelle :** la même révision indique **120 secondes** dans le chapitre général (page PDF 43), mais **180 secondes** dans les chapitres détaillés. La rév. 1.2 contient déjà les deux valeurs (page PDF 42 contre 48–49). Aucune durée universelle pour tous les appareils n'est donc confirmée. Relever la variante et le logiciel et demander une clarification à THITRONIK ; ne pas conclure à une panne sur la seule durée.

Après le cycle d'intrusion et une **pause de 30 secondes**, le système reste armé. Un détecteur de gaz raccordé ou appairé déclenche aussi une alarme lorsque WiPro est **armée ou désarmée** ; si la cause persiste, l'alarme se répète.

---

## Contenu de la livraison (version standard)

- Centrale WiPro III avec câble de raccordement
- 1× télécommande radio 868
- 1× contact magnétique radio 868 avec pastilles adhésives
- Porte-fusible avec fusible de 10 A
- LED d'état avec câble de connexion
- 1× autocollant d'avertissement
- Instructions d'installation et d'utilisation

> **REMARQUE :** Le contenu de la livraison varie selon les kits spécifiques au véhicule : faisceau différent et, le cas échéant, absence de télécommande radio ou de contact magnétique radio.

---

## Installation

### Conditions préalables

- **Débrancher la borne négative de la batterie du véhicule** avant toute intervention sur le circuit électrique.
- Débrancher également la borne négative de toute batterie auxiliaire.
- **Garder le code de l'autoradio à portée de main** ; des données mémorisées du véhicule peuvent être perdues lors du débranchement.
- Outils et matériel nécessaires : tournevis cruciforme, pince à sertir, voltmètre, visseuse sans fil, foret de 8 mm, jeu de clés à douille, ruban isolant, raccords bout à bout, cosse à œillet et serre-câbles.

### Étape 1 : Définir le type de véhicule

Régler les commutateurs DIP de la carte principale en fonction du type de véhicule. Ne modifier leur position que lorsque le système est hors tension ; ni le connecteur à 20 broches ni le connecteur du Pro-Finder ne doivent être branchés.
→ Tableau complet : [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]

### Montage de la centrale

- Choisir un emplacement protégé à l'intérieur du véhicule, si possible à proximité de l'électronique centrale du véhicule afin de limiter la longueur des câbles.
- Fixer solidement la centrale WiPro III à l'aide des pastilles adhésives ou des éléments de fixation prévus. Nettoyer, sécher et dégraisser au préalable la surface de collage.
- Poser les câbles sans tension et les protéger. Les pièces mobiles, les pédales, les arêtes vives et les composants chauds ne doivent pas risquer de les endommager.
- Le bouton de la centrale WiPro III doit rester accessible pour la mémorisation, le test de portée et le diagnostic.

### Étape 2 : Mémoriser les accessoires

> **IMPORTANT :** Aucun accessoire radio n'est mémorisé en usine. Le système ne peut pas évaluer les composants radio non mémorisés ; ceux-ci ne peuvent donc pas déclencher d'alarme.

1. Brancher le connecteur à 20 broches.
2. Maintenir le bouton « B » de la face avant enfoncé jusqu'à ce qu'un long signal sonore retentisse et que la LED d'état s'allume → le mode de mémorisation est actif.
3. Déclencher chaque contact magnétique radio en séparant ses deux parties jusqu'à ce que la LED « C » s'allume brièvement.
4. Appuyer sur une touche de chaque télécommande radio.
5. Allumer chaque détecteur de gaz radio ; retirer chaque boucle de câble radio de son support.
6. Après chaque mémorisation réussie, un bref signal sonore retentit et la LED d'état s'éteint brièvement.
7. Pour quitter le mode de mémorisation, appuyer brièvement sur le bouton « B » → double signal sonore, la LED d'état s'éteint.

### Étape 3 : Raccorder la centrale aux systèmes du véhicule

Les schémas de raccordement figurent dans le manuel d'installation à partir de la page 10. Les revendeurs spécialisés peuvent obtenir auprès de THITRONIK des documents de montage spécifiques au véhicule indiquant les affectations des connecteurs et l'emplacement des composants.

### Connecteur à 20 broches — affectation des broches

**Portée :** tableau WiPro III, notice d'installation rév. 1.8, page PDF 48 ; pas un brochage universel des kits safe.lock. **Contradiction :** tableau : broche 2 marron / NO, broche 3 verte / COM ; les schémas pages PDF 49 et 51 inversent les couleurs. Le dessin FR page PDF 43 appelle la broche 13 « Entrée Clignotants », les tableaux la déclarent inutilisée. Faire confirmer le câblage de la variante par THITRONIK avant tout raccordement ; ne pas choisir une couleur contradictoire.

| Broche | Couleur | Abrév. | Fonction | Particularités |
|--------|---------|--------|----------|---------------|
| 1 | noir | sw | Masse (borne 31) | — |
| 2 | marron | bn | Entrée d'alarme NO | Contact normalement ouvert du G.A.S.-pro. **Isoler la broche 3 (verte) lorsqu'elle n'est pas utilisée !** |
| 3 | vert | gn | Entrée d'alarme COM | — |
| 4 | rouge | rt | LED d'état + | Relier le connecteur blanc à celui de la LED d'état |
| 5 | noir | sw | LED d'état − | — |
| 6 | rouge/rose | rt/p | Smart Blinker | Commande des clignotants sans puissance ; voir les schémas spécifiques au véhicule |
| 7 | jaune | ge | Allumage (borne 15) | — |
| 8 | beige | be | Broche universelle 3 | Renault Master et modèles équivalents |
| 9 | rose | p | Signal du klaxon | Commande du klaxon sans puissance, spécifique au véhicule |
| 10 | blanc | ws | Antenne | **Ne pas raccourcir ni enrouler !** |
| 11 | rouge | rt | +12/24 V (borne 30) | Utiliser un fusible de 10 A |
| 12 | gris | gr | Clignotant gauche | — |
| 13 | gris/noir | gr/sw | Broche universelle 4 | Non utilisée → **isoler** |
| 14 | gris | gr | Clignotant droit | — |
| 15 | blanc | ws | Sirène +12 V | Relier au câble rouge de la sirène ou au câble blanc de la sirène de secours |
| 16 | blanc/noir | ws/sw | Masse de la sirène | Relier au câble noir de la sirène. |
| 17 | blanc/orange | ws/or | CAN-High | **Raccordement réservé au personnel qualifié !** |
| 18 | violet/orange | vt/or | CAN-Low | — |
| 19 | bleu/noir | bl/sw | Broche universelle 2 | Entrée de l'éclairage intérieur / Ford Transit : évaluation du signal de verrouillage centralisé |
| 20 | bleu | bl | Broche universelle 1 | — |

> **Les revendeurs spécialisés** peuvent obtenir sur demande des documents de montage spécifiques au véhicule avec des informations précises sur le CAN-Bus, le Smart Blinker, le klaxon et l'évaluation du verrouillage centralisé, y compris l'affectation des connecteurs du véhicule.

### Alimentation de la sirène et de la sirène de secours

La rév. 1.8, page PDF 46, raccorde la sirène supplémentaire ordinaire par le fil rouge à la broche 15 et le noir à la broche 16. Pour la sirène de secours, rouge/noir assurent l'alimentation permanente, le blanc est l'entrée d'alarme positive sur la broche 15 ; isoler le fil bleu d'entrée négative inutilisé. Vérifier séparément la tension autorisée de la sirène : **9–30 V sur la centrale ne prouvent pas que chaque accessoire accepte 24 V**. Respecter sa notice, les limites de courant et le plan du véhicule concerné.

### Étape 4 : Diagnostic du CAN-Bus

Après le raccordement, vérifier si WiPro reçoit des données du CAN-Bus :

1. Appuyer brièvement sur le bouton « B » → la LED d'état clignote → le mode de diagnostic est actif.
2. Actionner la clé-télécommande du véhicule **ou** allumer les feux de détresse afin de générer un trafic de données CAN.
3. **La LED d'état clignote ou vacille** → des données CAN sont reçues.
4. **Aucune réaction de la LED** → raccordement défectueux ou CAN-High et CAN-Low inversés.

> Le même mode de diagnostic sert au test de portée des accessoires radio : déclencher un émetteur mémorisé → la centrale WiPro III émet un signal sonore.

### Étape 5 : Effectuer un test d'alarme

Une fois l'installation terminée, effectuer un test d'alarme avec **chaque** émetteur mémorisé :

- **Contact magnétique radio :** armer WiPro, ouvrir le contact → la sirène retentit, les feux de détresse clignotent et, le cas échéant, le klaxon du véhicule retentit.
- **Boucle de câble radio :** armer WiPro, retirer la boucle de son support.
- **Détecteur de gaz radio :** armer WiPro, allumer le détecteur, attendre la fin de la phase de préchauffage puis le tester avec un gaz d'essai adapté conformément à sa notice. Ne pas utiliser de flamme nue et bien aérer ensuite.
- **Portes de cabine (CAN-Bus) :** armer WiPro, ouvrir une porte de l'intérieur.

> **IMPORTANT :** Le délai de **60 secondes** pour tester l'**entrée de l'éclairage intérieur** concerne **uniquement WiPro III, pas WiPro III safe.lock** (rév. 1.3, page PDF 50). Les autres ouvertures surveillées sont protégées immédiatement après l'armement. Ne pas appliquer ce délai à toute l'installation.

---

## Fonctions spéciales

| Fonction | Paramètre |
|----------|------------|
| Réduire le volume de la sirène | DIP 8 → ON |
| Désactiver l'alarme Anti-Jamming | DIP 7 → ON (en présence de brouilleurs dans les environs) |
| Activer la protection anti-rejeu | DIP 5 → ON (à partir de SN 0823-014 / SW 5.8) — la clé-télécommande du véhicule n'arme et ne désarme plus WiPro ; l'évaluation des portes reste active |

## Fonction panique (alarme manuelle)

WiPro III prend en charge le déclenchement d'une **alarme manuelle (fonction panique)** :

- **Activer :** appuyer **simultanément** sur les deux touches de la télécommande radio.
- **Désactiver :** appuyer sur n'importe quelle touche de la télécommande radio.

Si un Pro-Finder est raccordé et configuré en conséquence, il envoie un SMS « Alarme manuelle » et appelle le numéro maître.

---

## Fonction de ventilation (Vent check)

**Divergence des FAQ et neuf bips :** la FAQ WiPro III, page PDF 18, et la FAQ safe.lock, page PDF 27, indiquent **4 secondes** avant la reprise de la surveillance ; les notices rév. 1.2/1.3 prescrivent **au moins 5 secondes** avant une réouverture déclenchant l'alarme. Cette contradiction n'établit aucune limite logicielle confirmée. Les FAQ décrivent **9 bips courts** avant le son d'armement plus grave pour signaler un contact ouvert. Ce signal sonore Vent check est distinct du code mémoire **9 clignotements de la LED d'état**, qui indique un brouilleur.

Cette fonction permet de laisser une fenêtre ouverte dans le véhicule armé sans déclencher d'alarme :

1. Ouvrir la fenêtre souhaitée **avant d'armer** le système.
2. Armer le système → le contact ouvert est toléré et ne déclenche pas d'alarme.

**Avertissement « contact ouvert » :** une série de bips courts au **verrouillage ou à la mise du contact** indique un contact magnétique radio ouvert. Le système s'arme malgré tout et protège les autres ouvertures surveillées. La touche silencieuse de la télécommande permet l'armement sans ce signal sonore.

**Reprise de la surveillance :** refermer la fenêtre laissée ouverte ne déclenche pas d'alarme. Une réouverture après **au moins 5 secondes** déclenche l'alarme. Sources : rév. 1.3, page PDF 47 ; rév. 1.2, page PDF 45. Les indications de quatre secondes dans certaines notices d'installation/véhicule nécessitent un contrôle de version.

---

## Signaux d'armement/désarmement

### Signaux des clignotants à l'armement et au désarmement avec la clé d'origine

**Différence des guides rapides :** WiPro III rév. 1.6 et safe.lock rév. 1.3, page PDF 1, indiquent un clignotement à l'armement par clé d'origine et 2–3 au désarmement. Le tableau suivant reprend les notices d'utilisation rév. 1.2/1.3. Le nombre de clignotements diffère donc selon le document et ne permet pas, à lui seul, de diagnostiquer une panne.

| Action | Condition | Signal |
|--------|--------------|--------|
| Armer (touche « Verrouiller ») | Portes du véhicule **fermées** | Clignotants 1–2× selon le véhicule, 1 signal sonore, LED d'état clignotante |
| Désarmer (touche « Déverrouiller ») | — | Clignotants 1–2× selon le véhicule, 2 signaux sonores, LED d'état éteinte |

> **IMPORTANT :** L'armement avec la clé-télécommande du véhicule n'est **possible que lorsque les portes de la cabine sont fermées** !

Sources : rév. 1.3, chapitres 1.1/1.3, pages PDF 45–46 ; rév. 1.2, pages PDF 43–44. Ne pas confondre clignotants du véhicule et bips internes.

### Avec la télécommande radio

| Action | Signal |
|--------|--------|
| Armer (n'importe quelle touche) | Feux de détresse 1× ; selon la touche, 1 signal sonore ou mode silencieux ; LED d'état clignotante |
| Désarmer (n'importe quelle touche) | Feux de détresse 2× ; selon la touche, 2 signaux sonores ou mode silencieux ; LED d'état éteinte |

Le tableau suit les chapitres allemands 1.2/1.4 (rév. 1.3, pages PDF 8–9). **Divergence linguistique :** le paragraphe français safe.lock (page PDF 46) indique 1–2 clignotements à l'armement par la touche haut-parleur, contre 1 en allemand. Le paragraphe WiPro III standard concorde. Pour safe.lock, ne pas diagnostiquer une panne à partir de cette seule différence.

### Particularité de WiPro III safe.lock

Avec **WiPro III safe.lock**, deux opérations distinctes peuvent être couplées : le système d'alarme est armé ou désarmé, tandis que le verrouillage centralisé verrouille ou déverrouille le véhicule. La logique exacte dépend du véhicule et de la version logicielle :

- **Clé d'origine du véhicule :** sur les profils de véhicule compatibles, elle commande simultanément le système d'alarme et le verrouillage centralisé. Les portes surveillées via le CAN-Bus doivent être fermées avant l'armement.
- **Télécommande radio 868 :** elle arme safe.lock et verrouille le véhicule, ou désarme le système et déverrouille le véhicule.
- **Module NFC, THITRONIK® App et BT-connect :** ne les utiliser que si les appareils installés, les versions logicielles et le profil du véhicule prennent en charge le mode de commande concerné.
- **Protection anti-rejeu :** lorsque DIP 5 est activé, la clé-télécommande d'origine n'arme et ne désarme plus WiPro. La surveillance des portes via le CAN-Bus reste active.

Les conditions et restrictions propres au véhicule figurent sous [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]].

### Mémoire d'alarme

Après une alarme, la **LED d'état** clignote pour signaler la mémoire d'alarme. Cela indique qu'une alarme s'est produite.

**Indication sonore :** Lors du désarmement après une alarme, **un signal long et deux signaux courts** indiquent qu'une alarme a été mémorisée.

La séquence de clignotement de la LED d'état se répète après une **pause de 5 secondes** et indique la cause de l'alarme :

| Séquence de clignotement | Cause de l'alarme |
|-------------|-----------|
| **1×** | Portes de cabine (CAN-Bus) |
| **2×** | Contact magnétique radio |
| **3×** | Détecteur de gaz radio / G.A.S.-pro III / G.A.S.-pro III CO |
| **4×** | Boucle de câble radio |
| **5×** | G.A.S.-pro |
| **8×** | Alarme panique |
| **9×** | Brouilleur |
| **10×** | Pro-Finder (SMS « Alarme ») |
| **11×** | Entrée de l'éclairage intérieur |

Lire le code **avant toute nouvelle commande**. Après le signal d'alarme mémorisée au désarmement, la mémoire est **effacée au prochain armement**. Sources : rév. 1.3, page PDF 55 ; rév. 1.2, page PDF 53. Dix clignotements de la LED d'état avec une pause de cinq secondes indiquent Pro-Finder/SMS ; ne pas les confondre avec les dix bips rapides anti-enfermement du Sprinter.

> **CONSEIL :** Si un Pro-Finder est raccordé et configuré, la cause de l'alarme est également transmise par SMS en toutes lettres.

---

## Signal de pile faible (accessoires)

**Durée non univoque :** la FAQ WiPro III, page PDF 16, et la FAQ safe.lock, page PDF 28, indiquent un son de **2 secondes** et la LED rouge de l'émetteur pendant **30 secondes** lorsque sa pile est sous **2,6 V**. Les guides rapides WiPro III rév. 1.6 et safe.lock rév. 1.3 montrent au contraire un **signal de 5 secondes**, page PDF 2. La notice d'utilisation décrit un son long sans durée fixe. Cette divergence reste ouverte : deux ou cinq secondes ne suffisent pas à identifier une panne. Vérifier le moment du signal, l'émetteur concerné et sa LED rouge ; aucun nouvel apprentissage n'est nécessaire après le remplacement de la pile.

Un **long bip continu lors de l'actionnement d'un émetteur radio** indique une pile faible. Un bref bip de confirmation ne suffit pas à ce diagnostic. Actionner les émetteurs séparément ; la LED rouge de l'émetteur concerné ne s'éteint qu'après **30 secondes**. **Aucun nouvel appairage** n'est nécessaire après changement de pile. À distinguer d'**un bip long suivi de deux bips courts au désarmement**, qui signale une alarme mémorisée.

La télécommande 868, le contact magnétique 868 classique et la boucle de câble utilisent une **CR2032**. Le **module NFC** utilise **trois piles alcalines AAA (LR03)**, exclusivement de ce type. Remplacement recommandé chaque année et, en cas d'utilisation hivernale, également avant la saison froide. Les tags NFC restent mémorisés.

Sources : rév. 1.3, pages PDF 48–49 et 55 ; rév. 1.2, pages PDF 46–47 et 53. Ne pas appliquer ces données à d'autres variantes d'accessoires sans leur notice propre.

---

## Interrompre une alarme gaz ou intrusion avec la clé ou la télécommande radio

Selon le type d'alarme, une alarme active peut être interrompue à l'aide de différents dispositifs de commande :

| Type d'alarme | Interrompre l'alarme / désarmer le système |
|---------------|---------------------------------------------|
| Alarme anti-intrusion | Appuyer sur la touche « Déverrouiller » de la clé-télécommande du véhicule ou sur n'importe quelle touche de la télécommande radio ; une commande NFC/application compatible peut également désarmer le système |
| Gaz, clé d'origine | Appuyer sur « Déverrouiller ». Si l'alarme gaz a commencé alors que WiPro était **désarmée**, armer d'abord puis déverrouiller (chap. 1.10.2) |
| Gaz, télécommande radio | Appuyer sur une touche ; safe.lock déverrouille aussi le véhicule. Le chapitre 1.10.4 ne prescrit pas d'armement préalable pour cette commande |
| Alarme panique | Appuyer sur n'importe quelle touche de la télécommande radio |

> **IMPORTANT :** Selon le véhicule, il peut être nécessaire de refermer au préalable les portes ouvertes surveillées via le CAN-Bus. L'interruption de l'alarme sonore ne dispense pas d'en rechercher la cause. Après une alarme gaz ou anti-intrusion, toujours contrôler la mémoire d'alarme, les contacts ouverts et l'état des capteurs.

---

Sources : rév. 1.3, pages PDF 51–52 et chapitre allemand 1.10.2, page PDF 14. Le titre français du chapitre 1.10.2 indique à tort l'intrusion ; son affectation au gaz est établie par le chapitre allemand.

## Accessoires / extensions

| Accessoire | Réf. | Fonction |
|---------|----------|-------|
| Contacts magnétiques radio supplémentaires (noirs) | 100757 | Trappes de rangement, lanterneaux, coffres de toit |
| Contacts magnétiques radio supplémentaires (blancs) | 100758 | Fenêtres et surfaces claires |
| Télécommande radio | 101064 | Télécommande supplémentaire |
| Boucle de câble radio | 100761 | Vélos, mobilier de camping, scooters |
| Boucle de câble radio XL | 101074 | Objets extérieurs plus grands |
| G.A.S.-pro III / G.A.S.-connect | — | Détection de gaz en réseau |
| Pro-Finder | 100699 | Alerte par SMS + localisation GPS |
| BT-connect | 106000 | Commande Bluetooth via la THITRONIK® App |
| Module NFC | 105299 | Commande avec KeyCard, KeyTag ou KeyStrap |
| Sirène de secours | 100089 | Avertisseur supplémentaire, notamment lorsque le klaxon du véhicule ne peut pas être commandé |
| Détecteur de fumée radio T.S.A. (blanc / gris) | 105753 / 105754 | Détection précoce des incendies |
| Répartiteur à diodes | 100455 | Répartition sur quatre clignotants commandés séparément sur Sprinter/Crafter |
| Adaptateur de montage (noir) | 100428 | Pour les trappes présentant un écart important |
| Adaptateur de montage (blanc) | 100729 | Pour les trappes présentant un écart important |

---

## Historique des versions WiPro III safe.lock (1050-xxx)

### Ducato 8 et grand écran : versions 1050-016 et 1050-042

**Contradiction de sources, non résolu :** la [FAQ safe.lock](../../quellen/wipro-iii-safelock-faq.pdf) non datée, pages PDF 2–3, indique **1050-042 / Ducato 8–9 avec grand écran : 7.5.1s** et **1050-016 / Ducato 8 : 7.2s**. L'ancien historique du wiki donne **7.5.2s** et **7.1s** respectivement. Les CSV originaux cités n'existent pas dans le dossier local ; la mention « validé » du wiki ne résout pas ce conflit avec la source primaire. Faire confirmer numéro de série, logiciel réel et équipement par **THITRONIK** avant de promettre la compatibilité. Cette comparaison ne valide aucune des versions divergentes comme minimum définitif.

### Historique de la série 1050

Principales étapes de la variante Fiat Ducato ; les séries 5298, 5458 et 5832 sont gérées séparément :

| À partir du SN | Version logicielle | Date | Modification importante |
|-------|-----------|-------|-------------------|
| 1050-001 | 6.3s | 07/2017 | Première série numérotée ; fonction de DIP 6 modifiée |
| 1050-004 | 6.7s | 09/2018 | Compatibilité avec l'application ; fonctions de verrouillage centralisé et Easy-Add 3.0 |
| 1050-006 | 6.7s | 04/2019 | Anomalie documentée du module récepteur/condensateur ; un contrôle par le service d'assistance est recommandé en cas de problème de portée |
| 1050-016 | Ancien historique : 7.1s ; FAQ : 7.2s, non résolu | 10/2021 | Prise en charge du Ducato 8 (2022) |
| 1050-025 | 7.3.0s | 03/2022 | Compatibilité Alphatronics ONE |
| 1050-038 | 7.5.0s | 01/2024 | Anomalie de portée documentée sur certaines télécommandes radio ; un contrôle par le service d'assistance est recommandé |
| 1050-042 | Ancien historique : 7.5.2s ; FAQ : 7.5.1s, non résolu | 06/2024 | Version minimale pour Ducato 8 avec grand système d'infodivertissement tactile |
| 1050-046 | 7.5.3s | 10/2024 | Prise en charge du Fiat Ducato restylé à partir de 2024 |
| 1050-051 | 7.5.3s | 01/2025 | Marquage d'homologation E1 de nouveau présent sur le boîtier |

> Kit Ford Transit : SN 5298-xxx ; kit Sprinter/Crafter : SN 5458-xxx ; kit Renault Master : SN 5832-xxx. Les versions correspondantes sont documentées sous [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]].

---

## Élimination et conformité

- Ne pas jeter les appareils électroniques, les accessoires radio ni les piles avec les ordures ménagères.
- Collecter séparément les piles bouton et les autres piles, puis les déposer conformément à la réglementation locale.
- THITRONIK déclare que WiPro III safe.lock satisfait aux exigences de la directive **2014/53/UE**. La déclaration de conformité du produit concerné fait foi.
- Les consignes de conformité et d'élimination fournies avec le dispositif concerné restent déterminantes.

---

## Dépannage

| Problème | Cause possible | Solution |
|---------|-----------------|--------|
| WiPro ne réagit pas à la clé-télécommande du véhicule, mais le verrouillage centralisé fonctionne | Profil de véhicule non pris en charge / position incorrecte des commutateurs DIP / CAN-High et CAN-Low inversés | Vérifier les réglages DIP et le raccordement CAN ; [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]] |
| La LED d'état clignote **11×** | L'entrée de l'éclairage intérieur transmet un signal inattendu / centrale ou faisceau incorrect pour le type de véhicule | Vérifier le signal de l'éclairage intérieur, le numéro de série, le profil du véhicule et le faisceau |
| Un contact magnétique est signalé ouvert alors qu'ils sont tous fermés | WiPro a été déconnecté de l'alimentation | Ouvrir et refermer plusieurs fois tous les contacts |
| Un contact n'est pas reçu malgré la faible distance | Contact non mémorisé / blindage métallique | Vérifier la mémorisation ; déplacer la centrale ou l'antenne |
| La trappe de la soute arrière est surveillée de manière peu fiable | Émetteur monté directement sur du métal | Utiliser l'adaptateur de montage réf. 100428 |

---

## Questions fréquemment posées (FAQ)

### De quelle homologation le WiPro III dispose-t-il ?
La FAQ produit indique que WiPro III et WiPro III safe.lock sont homologués conformément au **règlement ECE R10**. THITRONIK déclare également que WiPro III safe.lock satisfait aux exigences de la directive sur les équipements radio **2014/53/UE**. Le marquage du dispositif concerné et sa déclaration de conformité font toujours foi.

### Pourquoi WiPro III n'utilise-t-il pas de détecteur de mouvement ?
Dans un véhicule de loisirs, les détecteurs de mouvement peuvent notamment réagir aux rideaux qui bougent, aux vibrations, aux insectes ou aux mouvements des personnes et des animaux. THITRONIK privilégie donc la surveillance d'ouvertures définies. Il n'est pas nécessaire de désactiver partiellement le système à cause d'un détecteur volumétrique lorsque des occupants restent dans le véhicule. Cela ne permet toutefois pas de garantir qu'un système d'alarme sera totalement exempt de fausses alarmes.

### Puis-je installer WiPro III moi-même ?
L'installation exige des connaissances suffisantes en électricité automobile, un outillage adapté et le respect des prescriptions du constructeur du véhicule. Les raccordements au CAN-Bus, au verrouillage centralisé, au klaxon et aux feux de détresse sont particulièrement spécifiques au véhicule. Un raccordement incorrect peut endommager le dispositif et le véhicule. En l'absence de qualification suffisante, l'installation doit être confiée à un atelier spécialisé et formé.

### Qu'est-ce qu'un CAN-Bus — THITRONIK intervient-il dans le CAN-Bus ?
Le CAN-Bus relie les calculateurs électroniques au moyen d'une ligne de communication à deux fils. WiPro exploite notamment l'état des portes d'origine et les signaux de la télécommande. Pour cette surveillance, le système lit les informations de manière passive et n'émet aucun message de commande sur le CAN-Bus. Cela ne dispense pas d'un raccordement correct : des fils inversés ou mal raccordés peuvent provoquer des dysfonctionnements ou des dommages.

### Puis-je faire évoluer ma centrale vers safe.lock ?

**Conversion matérielle : deux ou trois fils et réappairage des accessoires ?** La notice safe.lock Upgrade rév. 2.0 prescrit trois fils au connecteur WiPro 20 pôles : broche 20 bleue, broche 19 bleu/noir, broche 16 blanc/noir. Si la broche 16 est occupée, effectuer une dérivation parallèle. Le formulaire de service 2024 cite seulement deux nouveaux fils. Ne pas supprimer un fil arbitrairement ; comparer le faisceau réel à la notice véhicule. Il s’agit d’une modification matérielle, pas seulement logicielle. La mémoire ayant été effacée, le réappairage des accessoires est nécessaire.

Sources : [Upgrade rév. 2.0, PDF 2 et 4](../../quellen/fahrzeug-safelock-upgrade.pdf#page=2), [Formulaire 2024, PDF 1](../../quellen/fahrzeug-update-service-2024.pdf#page=1).

La FAQ produit indique que toutes les centrales WiPro III peuvent faire l'objet d'une mise à niveau. Comme les kits spécifiques aux véhicules diffèrent, THITRONIK doit confirmer avant le démontage la solution safe.lock et le faisceau requis pour le véhicule. La procédure documentée comprend les étapes suivantes :

1. Faire déposer la centrale WiPro III.
2. Remplir le formulaire de mise à niveau en vigueur et l'envoyer avec la centrale WiPro III ; ne joindre aucun autre accessoire ni aucune clé du véhicule.
3. Après la mise à niveau, remonter la centrale WiPro III et raccorder les fils du verrouillage centralisé.
4. Mémoriser de nouveau les accessoires radio et effectuer des tests complets des entrées et des sorties.
5. Dans la THITRONIK® App, sélectionner le profil de numéro de série correspondant au dispositif mis à jour.

### Que faire en cas de fausses alarmes ?
Après le désarmement, la **mémoire d'alarme** de WiPro III indique la cause de l'alarme au moyen d'un code de clignotement de la LED d'état. Ces codes figurent dans la section « Mémoire d'alarme ». Si un Pro-Finder est raccordé et configuré, la cause de l'alarme est également transmise par SMS en toutes lettres.

### Quel numéro de série dois-je saisir dans la THITRONIK® App ?
Si les numéros de série exacts ne sont pas connus, la FAQ produit indique les valeurs de référence suivantes pour sélectionner les dispositifs dans l'application :

| Dispositif | Numéro de série standard |
|-------|-----------------------|
| WiPro III | 0823-018 |
| WiPro III safe.lock | 1050-003 |
| Pro-Finder | 0699-012 |

Pour les fonctions de « verrouillage/déverrouillage centralisé » et « Easy-Add 3.0 », la FAQ indique les versions minimales suivantes :

| Dispositif | Numéro de série minimal |
|-------|-------------------|
| WiPro III safe.lock | 1050-004 / 5298-001 / 5458-001 |
| Pro-Finder | 0699-013 |

> **IMPORTANT :** La saisie d'une valeur de référence dans l'application ne met à jour ni le matériel ni le logiciel. Une fonction ne doit être utilisée que si elle est prise en charge par le dispositif et la version logicielle réellement installés.

---

## safe.lock — Questions fréquemment posées

La FAQ safe.lock non datée, pages PDF 23–24, ajoute **à partir de 2011** pour Iveco dans le contexte du rejeu, à côté d'indications générales 2006–2018 et de limites 2018/2019 différentes pour la conversion de clé. Ce n'est pas une validation pour toutes les clés ; contrôler séparément véhicule, année modèle et clé avant conversion.

### Qu'est-ce que le mode camping THITRONIK® ?
Sur certains véhicules, par exemple Mercedes Sprinter à partir de 2018, Ford Transit à partir de 2024 et Ford Transit/Tourneo Custom à partir de 2023, la clé d'origine peut être rangée en lieu sûr tandis que le véhicule est verrouillé et déverrouillé avec des **accessoires THITRONIK®** compatibles. Selon l'équipement, il peut s'agir de la THITRONIK® App, de la télécommande radio 868, de la KeyCard, du KeyTag ou du KeyStrap. Si le véhicule est verrouillé avec la **clé d'origine**, le déverrouillage ultérieur avec un accessoire THITRONIK® peut être bloqué. Après un verrouillage avec un accessoire THITRONIK®, le déverrouillage avec la clé d'origine reste possible.

**Protection contre le verrouillage accidentel en mode camping (signal sonore) :** Pour des raisons de sécurité, le véhicule **n'est pas verrouillé et le système n'est pas armé** dans les cas suivants. Un signal d'avertissement retentit et les feux de détresse clignotent au même rythme :

- Verrouillage avec la clé d'origine, puis ouverture d'une porte de l'intérieur.
- Reverrouillage automatique après le déverrouillage avec la clé d'origine, puis ouverture d'une porte de l'intérieur.

### Qu'est-ce qu'une attaque par rejeu et quels véhicules sont concernés ?
Lors d'une attaque par rejeu, un signal de déverrouillage précédemment enregistré de la télécommande d'origine est retransmis. Si le véhicule reconnaît ce signal comme valide, il peut se déverrouiller ; un système d'alarme qui exploite le même signal pour se désarmer serait alors lui aussi désarmé. La FAQ produit cite comme séries concernées les **Fiat Ducato, Peugeot Boxer et Citroën Jumper des années modèles 2006–2018 ; Iveco Daily avec limite annuelle à vérifier séparément**. À partir de l'année modèle 2019, la FAQ décrit une clé d'origine à code tournant, c'est-à-dire avec un code radio variable, reconnaissable à son œillet en plastique noir. L'année modèle, la variante de clé et la compatibilité du véhicule doivent néanmoins être vérifiées au cas par cas.

### La clé d'origine fonctionne-t-elle encore après l'installation ?
Sans carte de conversion, le verrouillage centralisé d'origine reste en principe fonctionnel. Toutefois, dans la configuration prévue pour la protection anti-rejeu, WiPro III safe.lock n'utilise pas le signal radio de la clé d'origine pour désarmer le système. Déverrouiller et désarmer sont donc deux opérations distinctes.

### À quels véhicules la carte de conversion safe.lock est-elle destinée ?
Selon la FAQ produit, la carte de conversion (réf. 101052) est destinée aux **Fiat Ducato, Peugeot Boxer et Citroën Jumper des années modèles 2006–2018 ; Iveco Daily avec limite annuelle à vérifier séparément**. Une autre solution sans conversion de la clé peut être utilisée sur des véhicules plus récents compatibles avec safe.lock. Pour l'année de transition 2018, l'année modèle et la variante de clé doivent être vérifiées explicitement avant de choisir la solution.

### Quand une carte de conversion n'est-elle plus nécessaire sur les véhicules récents ?
Sur les véhicules équipés d'une **clé à code tournant**, la carte de conversion classique n'est généralement plus nécessaire. safe.lock est alors mis en œuvre au moyen de la centrale WiPro III ou du kit spécifique au véhicule. Le véhicule, l'année modèle, la variante de clé, le numéro de série et la version logicielle sont déterminants.

> Particularités spécifiques au véhicule (Ford Transit 2019+, VW Crafter/MAN TGE, Mercedes Sprinter, VW T6.1) → [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]

---

## Assistance

- Tél : +49 (0)4351 76744-112
- Assistance et téléchargements : `www.thitronik.de/support`

---

## Renvois

- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact magnétique radio 868 — montage et fonctionnement]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Télécommande radio 868 — commande de WiPro III]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[BT-connect — Module Bluetooth pour WiPro III]]
- [[module NFC — Contrôlez le WiPro via NFC|Module NFC — commander WiPro par NFC]]
- [[T.S.A. — Détecteur de fumée sans fil pour WiPro III|T.S.A. — détecteur de fumée radio pour WiPro III]]
- [[G.A.S.-connect — alarme de gaz sans fil pour WiPro III]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques]]
- [[Carte de conversion safe.lock - sécurité de clé pour Ducato/Boxer/Jumper]]

## Sources de la vérification du fonctionnement

Contrôle visuel DE/FR du 28.09.2026 sur la [rév. 1.3, 06/2025](../../quellen/wipro-iii-safelock-bedienung-rev1.3.pdf) et la [rév. 1.2, 11/2024](../../quellen/wipro-iii-safelock-bedienung-rev1.2.pdf). Comparaison complémentaire : [installation rév. 1.8](../../quellen/wipro-iii-installation-rev1.8.pdf), [FAQ WiPro III](../../quellen/wipro-iii-faq.pdf), [FAQ safe.lock](../../quellen/wipro-iii-safelock-faq.pdf), [guide WiPro III rév. 1.6](../../quellen/wipro-iii-kurzanleitung-rev1.6.pdf) et [guide safe.lock rév. 1.3](../../quellen/wipro-iii-safelock-kurzanleitung-rev1.3.pdf). Références aux pages physiques du PDF. Les FAQ n'ont pas de révision visible ; leurs passages français sont des traductions vérifiées de ces sources allemandes. Conflits et exceptions : docs/quellenpruefung/2026-09-28-wipro-installation-faq.md. Aucun accord global sur tous les plans et variantes de véhicules.
