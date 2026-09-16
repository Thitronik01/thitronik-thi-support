---
title: Connexion universelle (véhicules anciens / non répertoriés)
sources:
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/universalanschluss.md
---

# Connexion universelle (véhicules anciens / non répertoriés)

Cet article décrit le raccordement conventionnel d'une WiPro III à un véhicule sans intégration CAN exploitable. Il ne s'applique aux véhicules anciens ou non documentés que si chaque signal analogique requis a été mesuré sur le véhicule réel et reconnu électriquement adapté.

> **Limite importante :** « non répertorié » ne signifie pas automatiquement « raccordable en universel ». Sur un véhicule moderne en réseau, ne jamais se fier uniquement à la couleur ou à une fonction supposée. Une instruction THITRONIK spécifique au véhicule reste prioritaire.

## Champ d'application

| Élément | Exigence |
|---|---|
| Type de raccordement | universel, sans analyse CAN |
| Véhicules appropriés | signaux analogiques mesurables d'alimentation, d'allumage, d'éclairage intérieur/contact de porte et de clignotants |
| CAN-High / CAN-Low | broches `17` et `18` inutilisées |
| Réglage DIP de base | `SW1`, `SW2`, `SW3`, `SW4` sur `OFF` |
| Surveillance des portes | éclairage intérieur ou contact adapté via les broches universelles `19` et `20`; protéger séparément les autres ouvrants |
| Version minimale | non indiquée; consigner numéro de série, logiciel et version matérielle |

L'ancienne indication globale « tous les commutateurs OFF » n'est pas démontrée. Le manuel exige explicitement seulement `SW1–SW4 OFF`. `SW5`, `SW7` et `SW8` commandent des fonctions spéciales; aucune fonction universelle de `SW6` n'est indiquée. Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## Sécurité et contrôles préalables

- Les travaux électriques doivent être confiés à un personnel qualifié.
- Débrancher les bornes négatives des batteries moteur et auxiliaires selon les prescriptions du constructeur; tenir compte du code radio et des données volatiles.
- Modifier les DIP uniquement hors tension, connecteurs 20 broches et Pro-Finder débranchés.
- Mesurer tension, polarité, capacité de courant et comportement avant chaque dérivation.
- Vérifier ensemble schéma, connecteur, broche et signal réel; la couleur seule ne suffit pas.
- Isoler séparément chaque fil inutilisé et protéger le câblage du frottement, de la chaleur, de l'humidité, des pédales, airbags et pièces mobiles.
- Arrêter si le véhicule ou le signal diffère du schéma et demander une validation spécifique.

Avant le montage :

1. Rechercher une instruction plus récente spécifique au véhicule.
2. Confirmer qu'aucune intégration CAN WiPro compatible n'existe.
3. Identifier les portes et trappes qui commandent l'éclairage choisi.
4. Déterminer polarité et état de repos du signal de porte.
5. Vérifier que les deux branches de clignotants peuvent être pilotées sans retour de courant interdit.
6. Vérifier le klaxon contact coupé ou prévoir une sirène séparée.
7. Lister les ouvrants nécessitant des contacts radiomagnétiques.

## Réglage des commutateurs DIP

1. Mettre la WiPro entièrement hors tension.
2. Débrancher les connecteurs 20 broches et Pro-Finder.
3. Ouvrir prudemment le boîtier.
4. Régler `SW1`, `SW2`, `SW3` et `SW4` sur `OFF`.
5. N'utiliser `SW5` qu'en connaissance de cause : à partir du numéro `0823-014` ou du logiciel `5.8`, `ON` bloque la commande par la clé radio du véhicule tout en conservant l'analyse des portes.
6. Laisser normalement `SW7 OFF`; `ON` désactive l'alarme anti-brouillage.
7. Laisser normalement `SW8 OFF`; `ON` réduit le volume de la sirène interne.
8. Ne pas reprendre `SW6` d'un autre profil; ne le régler qu'avec une validation actuelle propre à l'appareil ou au véhicule.
9. Consigner positions, numéro de série et logiciel, puis refermer.

## Connecteur WiPro 20 broches

| Broche | Fil | Fonction en connexion universelle |
|---|---|---|
| `1` | noir | masse, borne 31 |
| `2` / `3` | marron / vert | entrée d'alarme NO / COM, par ex. G.A.S.-pro optionnel |
| `4` / `5` | rouge / noir | LED d'état plus / masse |
| `6` | rouge/rose | clignotant intelligent; inutilisé ici |
| `7` | jaune | allumage, borne 15 |
| `8` | beige | broche universelle 3; inutilisée |
| `9` | rose | sortie klaxon; seulement après vérification électrique spécifique |
| `10` | blanc | antenne; ne pas raccourcir ni enrouler |
| `11` | rouge | `+12/24 V`, borne 30, protection `10 A` |
| `12` / `14` | gris / gris | clignotants gauche / droit |
| `13` | gris/noir | broche universelle 4; inutilisée et isolée |
| `15` / `16` | blanc / blanc-noir | sirène `+12 V` / masse sirène |
| `17` / `18` | blanc-orange / violet-orange | CAN-High / CAN-Low; ne pas utiliser ici |
| `19` / `20` | bleu-noir / bleu | broches universelles 2 / 1 pour le circuit mesuré d'éclairage ou de porte |

Il s'agit des broches WiPro, pas de broches du véhicule. Les fils côté véhicule doivent être déterminés et mesurés pour chaque montage.

## Alimentation, masse et allumage

1. Choisir les points de raccordement dans la documentation du véhicule.
2. Mesurer plus permanent, masse et allumage dans tous les états utiles.
3. Relier la broche noire `1` à une masse fiable, borne 31.
4. Relier la broche rouge `11` à la borne 30 via le porte-fusible fourni et un fusible `10 A`.
5. Relier la broche jaune `7` à un signal d'allumage borne 15 vérifié.
6. Fixer le porte-fusible accessible, au sec et sans frottement.
7. N'alimenter qu'après contrôle des autres raccordements.

## Éclairage intérieur et contacts de porte

Le schéma universel représente un éclairage conventionnel avec contact de porte. Raccorder bleu-noir broche `19` et bleu broche `20` selon l'alimentation et le côté commuté réellement mesurés.

1. Obtenir le schéma électrique du véhicule.
2. Identifier l'alimentation de la lampe et le conducteur commuté par le contact de porte.
3. Raccorder les broches `19` et `20` exactement selon le schéma universel et la polarité mesurée.
4. Ouvrir séparément chaque porte de cabine et vérifier le changement de signal.
5. Tester séparément portes arrière, coulissantes, cellule et coffres.
6. Protéger les ouvrants non surveillés par des contacts filaires ou des [[Contact radiomagnétique 868 — montage et fonctionnement|contacts radiomagnétiques]].
7. Avec l'entrée d'éclairage intérieur, tester les portes de cabine au plus tôt `60 secondes` après l'armement.

Ces `60 secondes` sont un délai d'armement de l'entrée, non la durée de l'alarme.

## Clignotants et klaxon optionnel

1. Identifier et mesurer séparément les branches gauche et droite.
2. Relier la broche grise `12` à une branche.
3. Relier la broche grise `14` à l'autre branche.
4. Vérifier l'absence de retour de courant inadmissible.
5. Ne pas raccorder en plus la broche Smart `6` sans validation séparée.
6. N'utiliser la sortie klaxon rose `9` que si le type de commande, la charge et le fonctionnement contact coupé sont adaptés.
7. Sinon, installer une sirène normale ou de secours selon sa propre notice.

## Sirène, LED d'état et centrale

| Composant | Raccordement / exigence |
|---|---|
| sirène normale | rouge sirène sur blanc broche `15`; noir sirène sur blanc-noir broche `16` |
| sirène de secours | alimentation permanente rouge/noire, déclenchement blanc sur `15`; isoler le fil bleu inutilisé |
| LED d'état | relier la fiche blanche du câble rouge/noir au connecteur des broches `4`/`5` |
| centrale | lieu protégé, sec, accessible et proche de l'électronique |
| antenne | loin du métal écran; ne pas raccourcir ni enrouler |

Éloigner sirène et câbles des pièces chaudes, coupantes et mobiles. Une sirène de secours ne réagit à la perte d'alimentation que si son interrupteur à clé est activé. Voir [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]].

## Apprentissage et montage des accessoires radio

1. Apprendre contacts radiomagnétiques, [[Émetteur radio 868 — télécommande pour WiPro III|émetteurs radio]], boucles de câble et détecteurs de gaz avant montage définitif.
2. Maintenir le bouton de la centrale jusqu'au long signal et à l'allumage fixe de la LED.
3. Déclencher chaque composant et attendre le bref signal et l'extinction momentanée de la LED.
4. Terminer par une courte pression; un double signal confirme la sortie.
5. Tester chaque émetteur à son emplacement en mode diagnostic.
6. Positionner les contacts magnétiques à environ `22 mm` maximum lorsqu'ils sont fermés.
7. Préparer des surfaces propres, sèches et dégraissées; ne pas coller sous `15 °C` et attendre environ `24 heures`.
8. En cas d'écran métallique ou d'écart excessif, vérifier les adaptateurs `100428` ou `100729`.

Procédure complète : [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Mise en service et essai

1. Contrôler raccordements, isolations, décharges de traction et fusible `10 A`.
2. Vérifier les DIP et chaque fil inutilisé isolé séparément.
3. Alimenter et observer le démarrage.
4. Armer la WiPro avec le dispositif prévu pour la configuration réelle.
5. Contrôler LED, signal sonore et les deux branches de clignotants.
6. Après au moins `60 secondes`, ouvrir séparément chaque porte surveillée par l'éclairage.
7. Déclencher séparément tous les autres contacts et accessoires appris.
8. Vérifier sirène et, si adapté, klaxon par une véritable alarme d'essai.
9. Vérifier environ `30 secondes` d'alarme acoustique et jusqu'à `120 secondes` d'alarme optique selon ce manuel général.
10. Arrêter l'alarme, vérifier l'entrée d'allumage et toutes les fonctions électriques du véhicule.
11. Documenter points de raccordement, fusible, DIP, numéro de série et accessoires.

## Diagnostic

| Symptôme | Contrôle / action |
|---|---|
| WiPro inactive | broches `11` et `1`, fusible `10 A`, connecteurs |
| comportement inattendu après DIP | mettre hors tension; vérifier `SW1–SW4 OFF` et chaque fonction spéciale |
| porte sans déclenchement | mesurer broches `19`/`20`, polarité, contact et couverture de chaque porte |
| alarme immédiate à l'armement | vérifier logique et état de repos du signal d'éclairage/porte |
| un seul côté clignote | tester séparément broches `12`/`14` et les deux branches |
| klaxon muet | vérifier contact coupé, type de commande et broche `9`; employer une sirène si nécessaire |
| contact radio non reçu | vérifier apprentissage, emplacement, écran métallique et adaptateur |
| signal complexe ou pulsé | ne pas improviser; obtenir une validation spécifique |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Décision relative aux sources

- La totalité de la partie allemande du *Manuel d'installation WiPro III*, révision `1.8`, couverture et pages 1–18, a été contrôlée textuellement et visuellement.
- La page 4 exige le schéma universel conventionnel et explicitement `SW1–SW4 OFF`.
- Les pages 6, 11 et 12 établissent le connecteur, les fonctions des broches, `10 A`, l'éclairage/contact, deux branches de clignotants, la sirène, la LED et les fils CAN inutilisés.
- Les pages 5–10 établissent apprentissage, montage, diagnostic, sirène et délai de `60 secondes`.
- L'ancien « tous les commutateurs OFF » a été corrigé; aucune position universelle non démontrée n'est inventée pour `SW6`.

Source primaire :

- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf`

## Articles connexes

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles|Boucle de câble radio 868]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
