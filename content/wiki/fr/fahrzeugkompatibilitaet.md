---
title: >-
  Compatibilité des véhicules — Matrice de présentation et principes de base du
  DIP
sources:
  - >-
    D:/Anleitungen/Anleitungen/01_Quellanleitungen/WiPro
    III/wipro_iii-installationsanleitung_1.8.pdf
  - >-
    D:/Anleitungen/Anleitungen/06_Max und KI Handover/Wipro III safe.lock/02
    Bedienungsanleitung/bedienungsanleitung_zehn_sprachen/2025-05-05_Bedienungsanleitung_WiPro_III_WiPro_III_safe-lock_010_01_DE_original.docx
  - 'https://www.thitronik.de/support/faq-produkte/produkt/wipro-iii/'
  - 'https://www.thitronik.de/support/faq-produkte/produkt/wipro-iii-safelock/'
  - fahrzeuge/*.md
updated: '2026-07-22'
confidence: high
lang: fr
translation_of: sources/fahrzeugkompatibilitaet.md
dealerStatus: approved
---

# Compatibilité des véhicules — Matrice de présentation et principes de base du DIP

Cette page fournit une orientation centrale pour sélectionner le véhicule et comprendre les principes de base des commutateurs DIP de la WiPro III. Les **instructions d’installation actuelles correspondant exactement au véhicule et à la version du système** prévalent toujours pour le montage, l’affectation des câbles et le codage. Le numéro de série, la version logicielle, l’année-modèle et l’équipement doivent tous correspondre.

> **Sécurité :** l’installation et le raccordement doivent être effectués par un spécialiste qualifié. Ne jamais déduire les réglages DIP de ceux d’une variante de véhicule similaire. Identifier clairement le véhicule, l’année-modèle, la version du système, le numéro de série et la version logicielle avant de commencer.

## Commutateurs DIP — principes de base

Le commutateur DIP à huit positions configure la centrale WiPro III pour le véhicule et pour certaines fonctions.

> **Important :** modifier les réglages DIP uniquement lorsque le système est hors tension. Ni le connecteur à 20 broches ni le connecteur du Pro-Finder ne doivent être branchés.

| Commutateur | Fonction documentée |
|---|---|
| SW1–SW4 | Profil de base du véhicule. La combinaison est indiquée dans le tableau des véhicules ou dans les instructions détaillées actuelles. |
| SW5 | À partir du numéro de série `0823-014` ou de la version logicielle `5.8` : sur ON, la WiPro III ne peut plus être commandée par la clé radio d’origine du véhicule ; la détection des portes du véhicule reste active. SW5 n’est **pas un commutateur safe.lock universel**. |
| SW6 | Commutateur de profil supplémentaire propre au véhicule, explicitement requis par de nombreuses instructions détaillées. Le manuel d’installation général n’attribue aucune fonction spéciale universelle à SW6. |
| SW7 | ON désactive l’alarme anti-brouillage. |
| SW8 | ON réduit le volume de la sirène interne. |

La colonne **« DIP → ON »** indique les commutateurs de profil prescrits par les instructions d’installation correspondantes. SW7 et SW8 n’y figurent pas, car ils concernent des fonctions optionnelles. Tous les commutateurs non indiqués restent sur OFF, sauf instruction contraire dans la notice spécifique.

## Vue d’ensemble des véhicules par constructeur

### Fiat / Peugeot / Citroën / Opel / Toyota

| Véhicule | Année-modèle | DIP → ON | Version minimale / kit | Page détaillée |
|---|---:|---|---|---|
| Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper | jusqu’en 2006 | SW6 | `0823-001` / `2.1` | [[Fiat Ducato 244 / Peugeot Boxer / Citroën Jumper (jusqu'en 2006)|Fiat Ducato 244]] |
| Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper, Euro 4 | 2006–2011 | SW2 + SW6 | `0823-001` / `2.1` | [[Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006-2011)|Fiat Ducato X250]] |
| Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano | 2012–2021 | selon la version | à partir du kit `1050-001` ; voir la page détaillée | [[Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012-2021)|Fiat Ducato 2012–2021]] |
| Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano | 2022–2024 | selon le véhicule ; tester six combinaisons conformément aux instructions | `1050-016` / `7.1s` ; grand système d’infodivertissement : `1050-042` / `7.5.2s` | [[Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022-2024)|Fiat Ducato 2022–2024]] |
| Fiat Ducato restylé / Citroën Jumper / Peugeot Boxer / Opel Movano | à partir de 2024 | selon la variante | `1050-046` / `7.5.3s` | [[Fiat Ducato restylé / Citroën Jumper / Peugeot Boxer / Opel Movano (2024+)|Fiat Ducato à partir de 2024]] |
| Fiat Talento / Renault Trafic III / Opel Vivaro B / Nissan NV300 | 2014–2021 | SW3 + SW6 | `0823-014` / `5.9` | [[Fiat Talento/Renault Trafic III/Opel Vivaro B/Nissan NV300 (2014-2021)|Fiat Talento]] |

### Iveco

| Véhicule | Année-modèle | DIP → ON | Version minimale / kit | Page détaillée |
|---|---:|---|---|---|
| Iveco Daily Euro 4 | 2006–2011 | SW4 + SW6 | `0823-001` / `2.1` | [[Iveco Daily Euro 4 (2006-2011)|Iveco Daily Euro 4]] |
| Iveco Daily Euro 5 et plus récent | 2011–2024 | sans carte de conversion : SW2 + SW6 ; avec carte : SW2 + SW5 + SW6 | `0823-001` / `2.1` ; vérifier la version exacte | [[Iveco Daily Euro 5 et plus récent (2011-2024)|Iveco Daily Euro 5 et plus récent]] |
| Iveco Daily | à partir de l’année-modèle 2025/2026 | — | aucune installation homologuée actuellement en raison des modifications du BCM | — |

### Mercedes-Benz

| Véhicule | Année-modèle | DIP → ON | Version minimale / kit | Page détaillée |
|---|---:|---|---|---|
| Mercedes Sprinter T1N | 2000–2006 | tous désactivés | `0823-001` / `2.1` | [[Mercedes Sprinter T1N (2000–2006)|Mercedes Sprinter T1N]] |
| Mercedes Sprinter NCV3 / VW Crafter, BR906 | Sprinter 2006–2018 ; Crafter I 2006–2017 | SW1 + SW6 | `0823-001` / `2.1` | [[Mercedes Sprinter NCV3 / VW Crafter (BR906, 2006-2018)|Mercedes Sprinter NCV3 / VW Crafter]] |
| Mercedes Sprinter VS30, BR907/910 | depuis 2018 | Standard : SW4 + SW6 ; kit 5458 : tous sur OFF | Standard : `0823-019` / `6.8` ; quatre clés : `0823-034` ; safe.lock : `5458-001` / `1.0.0sx` | [[Mercedes Sprinter VS30 (BR907/910, depuis 2018)|Mercedes Sprinter VS30]] |
| Mercedes-Benz Vito / Classe V W447 | 2014–06/2023 | SW1 + SW3 + SW4 + SW6 | `0823-014` / `6.2` | [[Mercedes Benz Vito W447 (2014-06/2023)|Mercedes-Benz Vito W447]] |

### Renault / Opel / Nissan

| Véhicule | Année-modèle | DIP → ON | Version minimale / kit | Page détaillée |
|---|---:|---|---|---|
| Renault Master II / Opel Movano A / Nissan Interstar | 1998–2010 | SW1 + SW2 + SW3 + SW6 | `0823-001` / `2.1` | [[Renault Master II / Opel Movano A / Nissan Interstar (1998–2010)|Renault Master II]] |
| Renault Master III / Opel Movano B / Nissan NV400 | à partir de 2011 | SW2 + SW3 + SW6 | Set `100754` ; version minimale non indiquée dans la source véhicule | [[Renault Master III / Opel Movano B / Nissan NV400 (à partir de 2011)|Renault Master III]] |
| Renault Master safe.lock | 2019–2024 | selon le kit | kit `105832` ; `5832-001` / `1.0.0sr` | [[Renault Master (2019–2024) — safe.lock|Renault Master safe.lock]] |
| Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento | 2014–2021 | SW3 + SW6 | `0823-014` / `5.9` | [[Renault Trafic III / Opel Vivaro B / Nissan NV300 / Fiat Talento (2014-2021)|Renault Trafic III 2014–2021]] |
| Renault Trafic III / Nissan Primastar | à partir de 2022 | SW1 + SW2 + SW4 + SW5 + SW6 | logiciel `6.10.0` au minimum ; aucun numéro de série minimal indiqué | [[Renault Trafic III / Nissan Primastar (à partir de 2022)|Renault Trafic III à partir de 2022]] |

### Ford

| Véhicule | Année-modèle | DIP → ON | Version minimale / kit | Page détaillée |
|---|---:|---|---|---|
| Ford Transit 6e génération | 2006–2013 | SW1 + SW2 + SW6 | `0823-001` / `2.1` | [[Ford Transit 6e génération (2006-2013)|Ford Transit 6G]] |
| Ford Transit 7e génération, première version | 2014–2015 | SW1 + SW2 + SW3 + SW4 + SW6 | `0823-011` / `4.7` | [[Ford Transit 7e génération précoce (2014-2015)|Ford Transit 7G 2014–2015]] |
| Ford Transit 7e génération | 2016–2019 | **SW2 + SW4 + SW6** | `0823-013` / `5.6` | [[Ford Transit 7e génération (2016-2019)|Ford Transit 7G 2016–2019]] |
| Ford Transit 7e génération restylé | 2019–07/2024 | selon le véhicule ; voir la page détaillée | Standard : `0823-016` / `6.1` ; safe.lock : `5298-001` / `7.4.0s` | [[Ford Transit 7e génération Facelift (2019-07/2024)|Ford Transit restylé]] |
| Ford Transit / Tourneo Custom / Transit Custom | à partir de 2024 ou 08/2023 | tous sur OFF | `5298-005` / `1.0.1sf` | [[Ford Transit / Tourneo Custom / Transit Custom (2024+)|Ford Transit à partir de 2024]] |

### Volkswagen / MAN

| Véhicule | Année-modèle | DIP → ON | Version minimale / kit | Page détaillée |
|---|---:|---|---|---|
| VW T5 | 2006–2009 | SW1 + SW3 + SW6 | aucun numéro de série ni logiciel minimum indiqué dans les sources primaires | [[VW T5 (2006-2009)|VW T5]] |
| VW T5 restylé | à partir de l’année-modèle 2010 | SW1 + SW4 + SW6 | aucun numéro de série ni logiciel minimum indiqué dans les sources primaires | [[VW T5 facelift (à partir de MY 2010)|VW T5 restylé]] |
| VW T6 | 2015–2019 | **SW3 + SW4 + SW6** | minimum `0823-012` ; aucun logiciel minimum indiqué dans les sources primaires | [[VW T6 (2015-2019)|VW T6]] |
| VW T6.1 | à partir de 2019 | **SW2 + SW3 + SW4 + SW6** | minimum `0823-019` ; aucun logiciel minimum propre au véhicule indiqué dans la source primaire | [[VW T6.1 (à partir de 2019)|VW T6.1]] |
| VW Crafter / MAN TGE sans bouton de démarrage | 2017–2024 | Standard : SW2 + SW3 + SW4 + SW6 | minimum `V6.8` ; aucun numéro de série minimal ; safe.lock uniquement avec la notice actuelle du kit | [[VW Crafter / MAN TGE (2017-2024, sans bouton de démarrage)|VW Crafter / MAN TGE 2017–2024]] |
| VW Crafter / MAN TGE avec bouton de démarrage | à partir de 2025 | non justifié publiquement | kit safe.lock `105458` ; aucun seuil minimum public actuel ; commande du verrouillage centralisé indisponible | [[VW Crafter / MAN TGE (2025+, avec bouton de démarrage)|VW Crafter / MAN TGE à partir de 2025]] |

### Cellules et variantes universelles

| Cas | Information essentielle | Page détaillée |
|---|---|---|
| Adria Coral / Matrix à partir de l’année-modèle 2021 | Le contact de porte de la cellule peut déclencher une fausse alarme après environ 15 minutes ; utiliser une protection radio séparée conformément aux instructions détaillées. | [[Adria Coral / Matrix (à partir de l'année modèle 2021) — informations sur le montage du camping-car|Adria Coral / Matrix]] |
| Véhicules anciens ou non répertoriés | N’utiliser la connexion universelle qu’après contrôle de l’adéquation ; SW1–SW4 restent sur OFF conformément aux instructions générales. | [[Connexion universelle (véhicules anciens / non répertoriés)|Connexion universelle]] |

## Bus CAN — raccordement et diagnostic

Les instructions propres au véhicule déterminent si les portes d’origine sont surveillées via le bus CAN. Un affichage au combiné d’instruments constitue un indice utile, mais ne remplace pas la vérification des instructions. Les ouvrants qui ne sont pas détectés via le bus CAN nécessitent une entrée séparée ou un contact magnétique radio.

| Câble WiPro III | Fonction | Exemple VW T5/T6 |
|---|---|---|
| violet/orange | CAN Low | orange/marron |
| blanc/orange | CAN High | orange/vert |

Les couleurs des câbles du véhicule ne sont données qu’à titre d’exemple. Les mesures et les instructions de raccordement actuelles prévalent.

### Diagnostic du bus CAN

1. Appuyer brièvement sur le bouton de la centrale.
2. Vérifier que la LED d’état du faisceau de câbles clignote.
3. Actionner la clé radio d’origine ou les feux de détresse.
4. Lors de la réception de données CAN, la LED d’état doit scintiller.

En l’absence de réaction, contrôler le raccordement CAN et l’affectation des câbles ; CAN High et CAN Low peuvent être inversés ou mal connectés. Les instructions générales ne précisent aucune couleur de LED pour ce diagnostic.

## safe.lock — configuration et post-équipement

### Aucune formule DIP safe.lock universelle

SW5 ne doit pas être simplement ajouté aux commutateurs du véhicule. Sa position dépend du véhicule, de la version de la WiPro, du numéro de série, du logiciel et du kit utilisé. Les configurations spéciales explicitement documentées comprennent notamment :

| Version | Prescription documentée |
|---|---|
| Iveco Daily Euro 5 et plus récent | sans carte SW2 + SW6 ; avec carte SW2 + SW5 + SW6 |
| Ford Transit restylé | Kit propre au véhicule à partir de `5298-001` / `7.4.0s` ; utiliser les instructions détaillées. |
| Sprinter VS30 et Crafter / MAN TGE | Kit 5458 avec son propre réglage DIP ; utiliser les instructions détaillées. |
| Renault Master 2019–2024 | Kit `105832`, centrale à partir de `5832-001` / `1.0.0sr` ; la clé d’origine commande uniquement les serrures ; utiliser la télécommande radio ou un autre accessoire THITRONIK compatible pour verrouiller/activer et déverrouiller/désactiver simultanément. |

> **Règle :** la seule désignation « safe.lock » ne détermine aucune position de commutateur. Une carte de conversion, réf. `101052`, ne permet pas non plus de déduire une combinaison standard.

### Post-équipement d’une WiPro III existante

Pour le post-équipement classique bénéficiant d’une validation spécifique au véhicule, trois câbles sont ajoutés au connecteur à 20 broches :

1. Broche 20 : bleu — déverrouillage centralisé.
2. Broche 19 : bleu/noir — verrouillage centralisé.
3. Broche 16 : blanc/noir — sortie sirène ; si la broche est déjà occupée, effectuer un branchement en parallèle.
4. Raccorder les câbles conformément aux instructions propres au véhicule et utiliser des connecteurs adaptés remplis de gel.
5. Après la mise à niveau, réapprendre tous les accessoires radio, car la mémoire est effacée.
6. Tester intégralement le verrouillage centralisé, l’armement/le désarmement et toutes les voies d’alarme.

## Restrictions importantes et tests préalables

| Sujet | Véhicules / versions | Conséquence |
|---|---|---|
| Klaxon du véhicule indisponible sans contact | notamment Sprinter, VW T5 restylé/T6/T6.1, Crafter/MAN TGE et Iveco Daily à partir de l’année-modèle 2019 | Selon les instructions, utiliser la sirène de secours réf. `100089` ou le klaxon supplémentaire réf. `105339`. |
| Quatre clignotants commandés séparément | Sprinter NCV3 / VW Crafter jusqu’en 2017 | Répartiteur à diodes réf. `100455` requis. |
| Attaques par rejeu sur la clé d’origine | certaines versions Ducato/Boxer/Jumper et Iveco | Selon le véhicule et le système, vérifier la [[Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper|conversion safe.lock]] ou la solution de kit actuelle. |
| Superverrouillage | certaines versions du Ford Transit 7G | La télécommande d’origine peut ne pas être détectable ; utiliser l’[[Émetteur radio 868 — télécommande pour WiPro III|émetteur radio 868]] conformément aux instructions détaillées. |
| Bouton de démarrage | VW Crafter / MAN TGE | safe.lock ne peut actuellement pas commander le verrouillage centralisé. |
| Option « Schaltsperre » | Ford Transit restylé 2019–2024 | L’option correspondante dans l’ordinateur de bord doit être disponible, sélectionnable et désactivée. |
| Équipement ILS/LED | Sprinter VS30 / Vito W447 | Monter la résistance ou la sortie de clignotant conformément aux instructions détaillées ; les clignotants avant peuvent ne pas être commandables sur le Vito. |
| Modification du BCM | Iveco Daily à partir de l’année-modèle 2025/2026 | Aucune installation homologuée en janvier 2026. |

## Durée de l’alarme

| Voie d’alarme | Durée selon le chapitre détaillé relatif aux alarmes dans la notice d’utilisation actuelle |
|---|---:|
| Sirène ou klaxon du véhicule | environ 30 secondes |
| Feux de détresse | environ 180 secondes |
| LED d’état lors d’une alarme d’intrusion ou de gaz | environ 180 secondes |

> **Remarque sur les sources :** la notice d’utilisation actuelle n’est pas cohérente sur la durée de l’alarme visuelle : la présentation fonctionnelle indique 120 secondes, tandis que le chapitre détaillé relatif aux alarmes indique 180 secondes. Cette page suit le chapitre détaillé et rend l’écart visible. Si la durée exacte est importante pour la réception ou le diagnostic, utiliser la documentation de l’appareil effectivement installé.

## Contrôle final après l’installation

1. Contrôler le réglage DIP lorsque le système est hors tension.
2. Consigner le numéro de série, la version logicielle et la version du kit.
3. Contrôler la réception CAN.
4. Tester séparément chaque porte du véhicule et de la cellule.
5. Tester l’armement et le désarmement avec tous les dispositifs de commande prévus.
6. Si safe.lock est utilisé, tester le verrouillage centralisé, y compris le mode veille.
7. Tester la sirène ou le klaxon ainsi que tous les clignotants.
8. Si une mise à niveau a effacé la mémoire, réapprendre chaque accessoire et déclencher chacun séparément.

## Documentation actuelle et assistance

- [FAQ WiPro III](https://www.thitronik.de/support/faq-produkte/produkt/wipro-iii/)
- [FAQ WiPro III safe.lock](https://www.thitronik.de/support/faq-produkte/produkt/wipro-iii-safelock/)
- [Téléchargements et instructions](https://www.thitronik.de/support/downloads/bereich/alarmanlagen/anleitungen/)
- Assistance THITRONIK : +49 (0)4351 76744-112

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper|Carte de conversion safe.lock]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d’apprentissage]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK|Vue d’ensemble du système]]
- [[Matrice source]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
