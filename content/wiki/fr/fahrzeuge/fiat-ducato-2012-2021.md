---
title: >-
  Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano
  (2012-2021)
sources:
  - >-
    D:/Anleitungen/Anleitungen/06_Max und KI Handover/Wipro III safe.lock/04
    Einbauanleitungen/Art.Nr.101050/Fiat Ducato und
    baugleiche/Einbauhandbuch_WiPro III safe.lock_Art.Nr.101050_Rev 1.0_DE.pdf
  - >-
    D:/Anleitungen/Anleitungen/01_Quellanleitungen/WiPro
    III/wipro_iii-installationsanleitung_1.8.pdf
  - >-
    D:/Thitronik WIKI
    (ml)/wiki/de/Zusatzanleitung_safe.lock-Upgrade-alleFahrzeuge_2024.pdf
updated: '2026-07-19'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/fiat-ducato-2012-2021.md
---

# Fiat Ducato / Citroën Jumper / Peugeot Boxer / Toyota Proace Max / Opel Movano (2012-2021)

Cet article décrit l'installation d'un WiPro III safe.lock, réf. `101050`, dans la famille de véhicules Sevel documentée. Pour la configuration des commutateurs DIP et la sécurité de la clé, la notice spécifique au véhicule distingue les millésimes **2012-2018** et **2019+**.

> **Limites d'application :** les connecteurs, l'affectation des broches et les couleurs de câble doivent correspondre au véhicule concerné. Si l'équipement, le calculateur de bord ou un câble identifié diffère de la documentation, aucun raccordement ne doit être effectué sur la base d'une supposition. Il faut alors consulter le constructeur du véhicule ou le support THITRONIK.

## Domaine d'application

| Caractéristique | Prescription de la notice spécifique au véhicule |
|---|---|
| Système d'alarme | WiPro III safe.lock |
| Référence | `101050` |
| Plage documentée de numéros de kit/série | à partir de `1050-001` ; ne pas confondre référence et numéro de série |
| Fiat Ducato | 2012-2021 |
| Citroën Jumper / Peugeot Boxer | à partir de 2012 |
| Toyota Proace Max / Opel Movano | à partir de 2021 |
| Version de la source | février 2024, révision 1.0 |

Pour les Fiat Ducato X250 Euro 4 des années 2006-2011, utiliser à la place [[Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006-2011)|Fiat Ducato X250]]. Les véhicules du groupe Ducato 8/9 plus récent nécessitent la notice distincte sous [[Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022-2024)|Fiat Ducato 2022-2024]].

## Sécurité et préparation

- Confier toute intervention sur les systèmes électriques et électroniques du véhicule à un atelier spécialisé qualifié.
- Respecter également les règles générales de sécurité et de raccordement de la notice d'installation WiPro.
- Avant d'ouvrir le WiPro ou d'effectuer des travaux électriques, couper son alimentation conformément aux prescriptions du fabricant.
- Isoler séparément les entrées et sorties inutilisées afin d'éviter tout court-circuit.
- À proximité de la colonne de direction, faire particulièrement attention aux câbles d'airbag existants. Ne pas les endommager ni s'y raccorder.
- Réaliser tous les piquages de manière durable, avec une décharge de traction et conformément aux prescriptions du fabricant.

Avant l'installation, contrôler et documenter les fonctions suivantes du véhicule :

1. Présence et fonctionnement de la télécommande radio du véhicule.
2. Présence et fonctionnement du verrouillage centralisé.
3. Affichage des portes d'origine ouvertes lorsque le contact est mis.
4. Fonctionnement de l'avertisseur sonore du véhicule.
5. Défauts électriques ou électroniques, témoins d'alerte et entrées de mémoire de défaut déjà présents.

Sur les camping-cars intégraux, des portes ou trappes d'origine peuvent déjà être surveillées par le bus CAN. Un contact radiomagnétique supplémentaire n'est donc pas automatiquement nécessaire pour l'ouverture concernée ; la surveillance réelle doit être vérifiée avant le montage.

## Commutateurs DIP et sécurité de la clé

Régler les commutateurs DIP lorsque l'alimentation est coupée. La position **ON** correspond au sens indiqué par la flèche.

| Période du véhicule | Commutateurs DIP sur ON | Tous les autres commutateurs | Configuration de la clé |
|---|---|---|---|
| 2019+ | **SW2 + SW6** | OFF | sans carte de conversion ; l'évaluation de la clé d'origine reste active |
| 2012-2018 | **SW2 + SW5 + SW6** | OFF | SW5 masque la clé radio d'origine ; carte de conversion vivement recommandée |

D'après la documentation du fabricant, les véhicules jusqu'au millésime 2018 présentent une vulnérabilité aux attaques par rejeu visant le signal radio du verrouillage centralisé d'origine. Dans cette configuration, le WiPro III safe.lock masque donc l'évaluation de la clé radio d'origine.

La clé pliante peut conserver sa fonction radio avec la [[Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper|carte de conversion safe.lock]], réf. `101052`. La carte est apprise par le WiPro comme un émetteur radio. Le transpondeur de l'antidémarrage doit être copié par un professionnel **avant le montage** ; sans transpondeur fonctionnel, le moteur ne peut plus démarrer avec la clé transformée.

> **Important :** ne pas choisir la position DIP d'après la seule apparence du véhicule. Le millésime, la version du système et la configuration de clé existante doivent être établis sans ambiguïté.

## Emplacement de montage, calculateur de bord et masse

1. Retirer les trois vis de la garniture du tableau de bord, tirer la garniture vers l'avant puis déposer le petit vide-poche après avoir retiré sa vis supplémentaire.
2. Retirer les trois vis ou écrous du calculateur de bord avec une douille de 10 mm, puis le basculer vers l'avant.
3. Retirer les films de protection des pastilles adhésives du WiPro et coller la centrale sur le calculateur de bord, connecteur orienté vers la porte conducteur.
4. Ajouter le câble noir du WiPro au point de masse situé à gauche dans le prolongement du montant A. Laisser les cosses annulaires existantes en place, puis resserrer correctement l'écrou M10.

Le fusible WiPro à installer est prévu en `7,5 A` ou `10 A`. Noter son emplacement et le numéro de série du WiPro dans la documentation du véhicule.

## Bus CAN et feux de détresse

Débrancher le grand connecteur au dos du calculateur de bord et rendre ses inserts accessibles. Les raccordements dépendent de la broche et de la génération du véhicule :

| Broche | Câble véhicule Euro 5 | Câble véhicule Euro 5+/6 | Câble WiPro | Fonction |
|---:|---|---|---|---|
| 26 | noir/orange | bleu | blanc/orange | CAN High |
| 11 | blanc/orange | blanc | violet/orange | CAN Low |
| 55 | violet/orange, violet/marron ou violet | violet/orange, violet/marron ou violet | rouge/rose | feux de détresse |

La notice illustre des types de connecteurs différents **jusqu'au millésime 2016** et **à partir du millésime 2017**. Si les couleurs des câbles du véhicule aux broches 26 et 11 semblent inversées par rapport à l'affectation attendue, l'affectation des broches et le tableau restent déterminants. Ne pas intervertir CAN High et CAN Low sur la seule base d'une couleur supposée.

## Alimentation et contact

Les raccordements suivants s'appliquent normalement au petit connecteur au dos du calculateur de bord :

| Broche | Câble véhicule | Câble WiPro | Fonction |
|---:|---|---|---|
| 18 | rouge/vert | rouge | borne 30, plus permanent |
| 17 | bleu/noir ou bleu/gris ; deux câbles peuvent être présents | jaune | borne 15, contact |

Dans de rares cas, l'affectation peut différer : la broche 18 est alors vert/bleu et correspond à la borne 15, tandis que la broche 17 est rouge/jaune et correspond à la borne 30. Il faut donc **mesurer électriquement les bornes 30 et 15 avant le raccordement** et ne pas les affecter uniquement d'après leur couleur.

Après le raccordement, remettre complètement en place les deux inserts de connecteur et rétablir la décharge de traction avec un serre-câble. Le retrait du petit connecteur peut imposer un nouveau réglage de l'horloge Fiat.

## Verrouillage centralisé

Pour la commande safe.lock, utiliser le connecteur vert situé en bas à gauche du calculateur de bord :

| Broche | Câble véhicule | Câble WiPro | Fonction |
|---:|---|---|---|
| 53 | bleu/jaune | bleu/noir | verrouillage centralisé avant |
| 27 | gris/blanc | bleu | verrouillage centralisé arrière |

Lors de l'armement ou du désarmement, le WiPro commande l'ensemble du verrouillage centralisé ; les portes avant et arrière sont verrouillées ou déverrouillées ensemble. En cas de problème sur un véhicule intégral LMC ou Bürstner, la notice du fabricant renvoie à une note complémentaire distincte dans l'espace revendeurs. Il n'existe **aucune** règle générale imposant de laisser les deux câbles du verrouillage centralisé non raccordés sur tous les véhicules profilés ou intégraux.

## Avertisseur sonore du véhicule et LED d'état

Après avoir retiré la garniture de la colonne de direction, dégager avec précaution environ 10 cm du faisceau directement sous le volant. Le câble de l'avertisseur côté véhicule peut être **marron/vert, vert/marron, vert ou marron** et se raccorde au **câble rose du WiPro**.

Le câble identifié conduit la masse lorsque le bouton de l'avertisseur est actionné ; une tension de 12 V peut être mesurée au repos. Confirmer ce comportement par une mesure avant le raccordement.

Après avoir convenu de l'emplacement de la LED d'état, percer un trou de 8 mm. Insérer la LED et raccorder son câble rouge/noir au faisceau WiPro à l'aide du connecteur blanc.

## Apprentissage et montage des accessoires radio

Tous les accessoires radio, y compris ceux fournis avec la centrale, doivent être appris une fois et porter la mention **868**.

1. Maintenir le bouton situé à droite du connecteur enfoncé jusqu'à ce que la centrale émette un bip et que la LED d'état reste allumée.
2. Déclencher deux ou trois fois chaque contact radiomagnétique, émetteur radio, boucle de câble radio et détecteur de gaz radio.
3. Pour chaque composant, attendre le bip de confirmation et la brève extinction de la LED.
4. Pour quitter le mode d'apprentissage, couper brièvement l'alimentation du système ou appuyer brièvement sur le bouton du WiPro.

La mémoire est non volatile. Les procédures détaillées, les conditions requises et les méthodes d'effacement figurent sous [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]. La position de montage et l'orientation des contacts sont décrites sous [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]. L'[[Émetteur radio 868 — télécommande pour WiPro III|émetteur radio 868]] doit être intégré au concept d'accès, en particulier lorsque l'évaluation de la clé d'origine est masquée.

## Contrôle fonctionnel final

1. Contrôler tous les connecteurs, les décharges de traction, les câbles isolés, le raccordement à la masse, le fusible et les positions DIP.
2. Vérifier que le véhicule n'affiche aucun témoin d'alerte ni aucune entrée de mémoire de défaut provoqués par l'installation.
3. Armer le WiPro et vérifier que le système ainsi que l'ensemble du verrouillage centralisé réagissent comme prévu.
4. Ouvrir mécaniquement une porte d'origine surveillée et vérifier le déclenchement de l'alarme.
5. Désarmer le WiPro et contrôler le déverrouillage simultané des portes avant et arrière.
6. Déclencher séparément chaque contact radio appris et tous les autres composants 868 MHz.
7. Contrôler la fonction d'aération avec un contact radio ouvert pendant l'armement : le contact est d'abord exclu de l'alarme, puis redevient actif environ quatre secondes après sa fermeture.
8. Tester l'alarme panique en appuyant pendant environ une seconde sur les deux boutons de l'émetteur radio.
9. Sur les véhicules de 2012-2018, vérifier que la clé d'origine, l'émetteur radio THITRONIK et, le cas échéant, la carte de conversion se comportent exactement selon la configuration de sécurité choisie.
10. Pour terminer, contrôler la sirène ou l'avertisseur sonore du véhicule, les clignotants, la LED d'état ainsi que toutes les méthodes de verrouillage et de déverrouillage.

Évaluer séparément l'armement/désarmement et le verrouillage/déverrouillage, même si le WiPro III safe.lock exécute ces deux processus en parallèle avec ce raccordement.

## Diagnostic des défauts

| Symptôme | Contrôle et mesure corrective |
|---|---|
| Toutes les portes se verrouillent, mais ni les portes avant ni les portes arrière ne se déverrouillent | Vérifier si les câbles WiPro bleu et bleu/noir ont été intervertis et corriger le raccordement si nécessaire. |
| Toutes les portes se verrouillent, mais seules les portes avant se déverrouillent | Contrôler et réparer le raccordement entre le câble WiPro bleu et la broche 27. |
| Les portes ne se verrouillent pas | Contrôler et réparer le raccordement entre le câble WiPro bleu/noir et la broche 53. |
| Le WiPro ne réagit pas à la clé du véhicule ou à l'émetteur radio | Contrôler méthodiquement l'alimentation, la masse, le fusible, la position DIP, l'état d'apprentissage et les raccordements CAN. |
| Le fonctionnement CAN reste incertain | Contrôler les broches 26 et 11 ainsi que CAN High/CAN Low d'après la version du véhicule et l'illustration du fabricant ; ne pas intervertir les câbles sur la base d'une supposition. |
| Le comportement d'un véhicule intégral LMC ou Bürstner diffère | Arrêter les modifications et consulter la note complémentaire spécifique au véhicule ou le support THITRONIK. |

D'autres contrôles communs à plusieurs systèmes sont décrits sous [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Décision concernant les sources

- La source principale est le document THITRONIK de douze pages *Notice d'installation WiPro III safe.lock — Fiat Ducato 2012-2021, Citroën Jumper / Peugeot Boxer 2012+, Toyota Proace Max / Opel Movano 2021+*, version `02/24`, révision `1.0`.
- La notice d'installation générale du WiPro reste contraignante pour les règles générales de sécurité, de raccordement et de fonctionnement du système.
- La notice complémentaire *WiPro III safe.lock Upgrade*, révision `2.0`, ne s'applique qu'aux systèmes WiPro III ayant reçu l'extension matérielle safe.lock correspondante et ne remplace pas l'affectation des broches spécifique au véhicule.
- L'ancienne notice `wipro_iii_fiat_ducato_x250_euro_4_safe.lock.pdf` concerne uniquement les véhicules Euro 4 de 2006-2011 et ne constitue **pas une source de raccordement** pour cet article.

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Carte de conversion safe.lock — sécurité de la clé pour Ducato/Boxer/Jumper|Carte de conversion safe.lock]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Fiat Ducato X250 / Peugeot Boxer / Citroën Jumper (Euro 4, 2006-2011)|Fiat Ducato X250]]
- [[Fiat Ducato 8/9 / Citroën Jumper / Peugeot Boxer / Opel Movano (2022-2024)|Fiat Ducato 2022-2024]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
