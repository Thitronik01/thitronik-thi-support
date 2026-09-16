---
title: VW T6.1 (à partir de 2019)
sources:
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t6_2015_.pdf'
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/vw-t6-1.md
---

# VW T6.1 (à partir de 2019)

Cette page décrit l'installation d'une WiPro III dans le VW T6.1 à partir de l'année-modèle 2019. La source déterminante est le manuel commun T6/T6.1 de dix pages, daté `12/20` ; le manuel d'installation général WiPro III révision `1.8` complète les consignes de sécurité et le brochage du faisceau à 20 broches.

> **Périmètre :** Pour le prédécesseur des années-modèles 2015-2019, voir [[VW T6 (2015-2019)]]. Le manuel commun indique des profils DIP, des numéros de série minimaux et des câbles CAN-High différents pour le T6 et le T6.1. Cette page s'applique uniquement au T6.1 à partir de l'année-modèle 2019.

## Aperçu

| Paramètres | Statut vérifié |
|---|---|
| Véhicule | VW T6.1 |
| Années-modèles | à partir de 2019 |
| Système/Ensemble | WiPro III / kit universel `100754` |
| Numéro de série minimal | `0823-019` |
| Logiciel minimum | non mentionné dans les sources primaires |
| DIP → ON | `SW2 + SW3 + SW4 + SW6` |
| Connexion CAN | Boîte à fusibles et tunnel de câbles dans le plancher du conducteur |
| Commande | télécommande d'origine du véhicule ; émetteur radio portatif 868 également possible |
| Alarme acoustique | sirène normale ou de secours fortement recommandée ; Klaxon du véhicule inactif sans allumage |
| Durée de l'alarme | acoustique env. `30 s`, optiquement env. `180 s` |

## Portée de la source et limites de version

| Sujet | Déclaration publiée |
|---|---|
| Profil véhicule | uniquement T6.1 à partir de l'année-modèle 2019 avec `SW2 + SW3 + SW4 + SW6` |
| Base appareil | kit universel `100754`, WiPro à partir du numéro de série `0823-019` |
| Câbles CAN | T6.1 orange/marron et vert ; ne pas reprendre l'affectation orange/vert du T6 |
| Approvisionnement | points de prise spécifiques au véhicule ; Broches WiPro et protection selon le manuel général |
| Sirène | sirène normale ou de secours selon schéma électrique spécifique au véhicule |
| Véhicule différent | Arrêtez les travaux et obtenez l'approbation actuelle de THITRONIK ou du constructeur du véhicule |

Les fichiers précédemment référencés `VW.docx`, `Fahrzeugbesonderheiten.docx`, `WiPro 13safe.lock.docx` et `WiPro III12safe.lock.docx` ne sont pas disponibles localement. Les affirmations qui en proviennent - notamment les points de raccordement CAN alternatifs, les exclusions DoKa ou les cas particuliers safe.lock - ne sont donc pas conservées comme données d'installation validées.

1. Confirmez le modèle et l'année modèle à l'aide des documents du véhicule.
2. Distinguer clairement le T6.1 du T6 des années-modèles 2015-2019.
3. Confirmer le kit universel `100754` et un numéro de série à partir de `0823-019`.
4. Documentez le numéro d'article, le numéro de série et la version du logiciel.
5. Si les couleurs des câbles ou les positions d'installation diffèrent, ne transférez aucune valeur de cette page.

## Sécurité et pré-inspection du véhicule

Le manuel du véhicule est destiné aux entreprises de services professionnels. Des travaux inappropriés sur le système électrique du véhicule, la zone des airbags ou les panneaux peuvent mettre en danger les personnes et la sécurité routière.

1. Faites effectuer les travaux uniquement par un spécialiste qualifié.
2. Avant l'installation, vérifiez le klaxon du véhicule, l'éclairage, les affichages d'avertissement et la mémoire d'erreur et documentez l'état.
3. Débranchez la batterie conformément aux instructions du constructeur du véhicule ; Faites attention au code radio et aux données volatiles.
4. Changez les commutateurs DIP uniquement lorsqu'il n'y a pas de tension.
5. Isolez individuellement les entrées et sorties inutilisées.
6. Sécurisez les câbles contre les frottements, les tractions, la chaleur et l'humidité.
7. Gardez les pédales, la direction, les airbags et les pièces mobiles dégagés.
8. Préparez les outils nécessaires : pince universelle ou multiprise, tournevis cruciforme PH2, Torx 25 et tournevis sans fil avec perceuse `8-mm` pour la LED d'état.

## Définir le profil DIP

1. Retirez complètement l'alimentation WiPro.
2. Ouvrez le boîtier et rendez accessible le commutateur de codage octuple.
3. Pour le T6.1, placer uniquement `SW2`, `SW3`, `SW4` et `SW6` sur `ON`.
4. Laissez tous les autres interrupteurs dans la position de base indiquée dans le manuel du véhicule.
5. Ne pas reprendre le profil T6 `SW3 + SW4 + SW6` illustré au-dessus.
6. Photographiez ou documentez la position du commutateur.
7. Fermez le boîtier et poursuivez ensuite la connexion.

## Déposer les habillages du tableau de bord

1. Retirez les caches latéraux du tableau de bord.
2. Retirez la boîte à gants en desserrant les sept vis Torx.
3. Appuyez sur l'interrupteur d'éclairage, tournez-le vers le feu de stationnement et retirez-le.
4. Retirez le couvercle de l'interrupteur d'éclairage en desserrant une vis Torx et deux clips.
5. Déclipsez le cache sous le volant.
6. Déclippez le soufflet du levier de vitesses.
7. Retirez la console centrale en desserrant les huit vis Torx.
8. Exposez la boîte à fusibles et le tunnel de câbles dans le plancher du conducteur sans tendre les câbles du véhicule.

## Raccorder le CAN, les feux de détresse et l'allumage

Les instructions du véhicule exigent des connecteurs remplis de gel pour les connexions CAN. Une connexion ne doit jamais être établie uniquement sur la base de la couleur ; La position, la couleur et le signal mesuré doivent correspondre.

| Gestion / localisation des véhicules | Ligne / broche WiPro | Fonction |
|---|---|---|
| orange/marron sur la boîte à fusibles/le tunnel de câbles | violet/orange, broche `18` | CAN-Low |
| vert au niveau de la boîte à fusibles/du tunnel de câbles | blanc/orange, broche `17` | CAN-High |
| blanc/vert sur l'interrupteur des feux de détresse | rouge/rose, broche `6` | Indicateurs intelligents / feux de détresse |
| Broche du connecteur OBD `1`, noir/violet | jaune, broche `7` | Allumage, borne 15 |

1. Localisez la boîte à fusibles et le tunnel de câbles en direction du plancher du conducteur.
2. Mesurez l'orange/marron et connectez-le à la broche violet/orange `18` via un connecteur rempli de gel.
3. Contrôler le câble vert et le raccorder à blanc/orange, broche `17`, avec un connecteur rempli de gel.
4. Retirez le commutateur des feux de détresse.
5. Vérifiez le fil des feux de détresse blanc/vert et connectez-le à la broche rouge/rose `6`.
6. Identifiez le connecteur OBD et déterminez en toute sécurité la broche `1`.
7. Vérifiez le fil noir/violet sur la broche OBD `1` comme borne 15 et connectez-le à la broche jaune `7`.
8. Isolez correctement toutes les connexions et soulagez les tensions.

## Plus permanent, masse et LED d'état

| Fonction | Robinet pour véhicule | Ligne / broche WiPro |
|---|---|---|
| Aérogare 30 | fil rouge sur l'allume cigare ou fil rouge/noir sur le relais en bas à droite de la boîte à fusibles | rouge, broche `11` |
| Aérogare 31 | Point de masse à gauche ou à droite dans le prolongement du montant A ou du câble marron de l'allume-cigare | noir avec œillet annulaire, broche `1` |
| LED d'état | position bien visible coordonnée avec le client | câble LED rouge/noir avec connecteur blanc sur la contrepartie du jeu de câbles WiPro |

1. Mesurez et documentez le point de prise sélectionné sur la borne 30.
2. Connectez la broche rouge de la ligne WiPro `11` via le porte-fusible `10-A` accessible du jeu de câbles.
3. Vérifiez le point de terre sélectionné pour une faible résistance de contact et une faible résilience mécanique.
4. Connectez le câble WiPro noir à la broche `1` avec un œillet annulaire.
5. Coordonnez la position de la LED d'état avec le client avant de percer.
6. Éliminez les airbags, les conduites et les composants situés derrière le site de forage.
7. Percez un trou avec le `8 mm` et insérez la LED d'état.
8. Connectez le câble LED rouge/noir avec le connecteur blanc à la contrepartie du jeu de câbles WiPro.

## Connecter la sirène

Le klaxon du véhicule étant inactif sans allumage et ne disposant pas d'un plus permanent, il ne peut pas être contrôlé dans ce schéma d'installation. Le manuel du véhicule recommande fortement une sirène normale ou de secours.

| Composant | Connexion |
|---|---|
| sirène normale | Broche blanche WiPro `15` vers sirène rouge ; WiPro blanc/noir pin `16` vers sirène noir |
| Alimentation sirène de secours | rouge en permanence sur `+12 V`, noir à la masse |
| Déclencheur de sirène de secours | blanc sur broche blanche WiPro `15` ; Ne pas utiliser de bleu et isoler |

1. Prolongez le câble WiPro blanc et blanc/noir dans le compartiment moteur sans frotter.
2. Fixez la sirène de manière protégée selon l'emplacement d'installation indiqué dans le manuel.
3. Connectez la sirène normale exclusivement selon la variante de broche `15`/`16`.
4. Alternativement, alimentez la sirène de secours en permanence et connectez sa ligne de déclenchement blanche à la broche `15`.
5. Isolez individuellement le fil bleu de la sirène de secours.
6. Scellez l'entrée de câble et sécurisez tous les câbles contre la chaleur et les mouvements.
7. Insérez le fusible uniquement une fois que toutes les connexions ont été vérifiées.

Autres bases : [[Sirènes et klaxons — moyens d'alarme acoustiques]].

## Programmer les accessoires radio

Tous les accessoires radio - y compris les composants inclus dans la livraison - doivent être formés une seule fois et porter l'ajout `868`.

1. Fournissez à WiPro une couverture stable.
2. Appuyez et maintenez enfoncé le bouton à droite de la fiche de connexion jusqu'à ce que le système émette un bip.
3. Vérifiez que la LED d'état est allumée en permanence.
4. Déclenchez plusieurs fois le contact radiomagnétique 868 `2–3×` en retirant l'aimant de plus de `30 mm`.
5. Pour l'émetteur portatif radio 868, appuyez sur les boutons, pour l'alarme gaz radio 868 pour l'allumer et pour la boucle du câble radio 868 pour la retirer du support, déclenchez `2–3×`.
6. Attendez que la tonalité de confirmation et la LED d'état s'éteignent brièvement pour chaque accessoire.
7. Terminez le mode d'apprentissage en débranchant brièvement l'alimentation ou en appuyant brièvement sur le bouton WiPro.
8. Étiquetez clairement chaque accessoire et attribuez-lui son emplacement d'installation.
9. Comparez le processus complet avec [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]].

## Monter les contacts magnétiques radio

La source du véhicule décrit les éléments `100757` et `100758`.

| Fonctionnalité | Par défaut |
|---|---|
| Orientation du conseil d'administration | La LED émettrice doit pointer loin de l'aimant |
| Zone magnétique | lorsqu'il est fermé, dans la zone jaune, typique `22–30 mm` |
| Surface adhésive | propre, sec et sans graisse |
| Température de traitement | pas sous `15 °C` |
| Tampon adhésif de résistance finale | après environ `24 h` |
| Adaptateur de montage | Art. `100428` ou `100729` pour de plus grandes distances ou un alignement d'antenne |

1. Si possible, montez le boîtier du transmetteur sur le cadre fixe.
2. Alignez l'aimant sur la fenêtre mobile, la porte ou la partie rabattable.
3. Insérez le circuit imprimé de manière à ce que la LED de transmission soit éloignée de l'aimant.
4. Éliminez toute direction incorrecte du tableau : sinon, l'apprentissage peut fonctionner, mais il n'y a pas d'alarme.
5. Placez l'aimant uniquement dans la zone de travail indiquée et ne le montez pas au-delà de la ligne de démarcation rouge.
6. Nettoyer, sécher et dégraisser les surfaces adhésives.
7. Ne collez pas sous `15 °C` et attendez que `24 h` soit complètement solide.
8. Si la surface adhésive n'est pas adaptée, utilisez les marquages ​​de vis fournis.
9. Utilisez l'adaptateur `100428` ou `100729` pour les grandes distances.
10. Après l'assemblage, testez chaque contact avec l'ouverture fermée et ouverte.

Voir [[Contact radiomagnétique 868 — montage et fonctionnement]] et [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles]].

## Mise en service et tests fonctionnels

1. Vérifier à nouveau la position DIP `SW2 + SW3 + SW4 + SW6` et un numéro de série à partir de `0823-019`.
2. Vérifiez toutes les connexions à sertir, les connecteurs en gel, l'isolation, le serre-câble et le fusible `10-A`.
3. Connectez l'alimentation et écoutez le bip de mise en marche.
4. Fermez les portes du véhicule.
5. Appuyez sur le bouton de verrouillage de la télécommande d'origine du véhicule.
6. Vérifiez que le WiPro est armé, que le véhicule est verrouillé et que les clignotants répondent.
7. Ouvrir mécaniquement la porte conducteur de l'intérieur avec la poignée de porte ou de l'extérieur avec la clé mécanique et déclencher l'alarme.
8. Vérifiez la sirène normale ou de secours avec la véritable alarme.
9. Vérifiez la durée de l'alarme sonore d'environ `30 s` et la durée de l'alarme visuelle d'environ `180 s`.
10. Terminez l'alarme avec n'importe quel bouton de l'émetteur radio ou le bouton d'ouverture de la télécommande d'origine du véhicule.
11. Observez la séquence de clignotement de la mémoire d'alarme via la LED d'état après l'interruption de l'alarme.
12. Vérifiez individuellement toutes les autres ouvertures surveillées par le véhicule ou les accessoires radio.

## Fonctionnement et commentaires

- Le verrouillage avec les télécommandes d'origine du véhicule contrôle le WiPro et verrouille le véhicule ; les indicateurs fournissent un feedback.
- L'ouverture avec la télécommande d'origine du véhicule ou n'importe quel bouton de l'émetteur radio met fin à une alarme en cours.
- Après une alarme interrompue, la LED d'état affiche la mémoire d'alarme sous forme d'une séquence clignotante.
- Chaque véritable porte, volet et chaque accessoire radio doivent être vérifiés individuellement à la livraison ; une couverture ne peut pas uniquement provenir de l’équipement du véhicule.

## Diagnostic

| Image d'erreur | Test/mesure |
|---|---|
| pas de bip de mise sous tension | Broche d'alimentation `11`, broche de terre `1`, `10-A` vérifier le fusible et les sertissages |
| la WiPro ne réagit pas à la télécommande du véhicule | contrôler les câbles CAN et le profil DIP ; ne pas confondre les couleurs du T6.1 avec celles du T6 |
| aucune activité CAN en mode diagnostic | contrôler l'état du bus, les connecteurs remplis de gel, orange/marron broche `18` et vert broche `17` |
| Système désactivé à la mise du contact | Vérifiez l'allumage au niveau de la broche OBD `1` et de la broche WiPro `7` ; Le comportement est systémique |
| Les clignotants ne reconnaissent pas | Vérifiez le fil blanc/vert du commutateur de feux de détresse et la broche rouge/rose `6` |
| La sirène reste silencieuse | Broche `15`/`16`, vérifier le positif/terre continu de la sirène de secours et le fil bleu isolé |
| Les accessoires peuvent être entraînés, mais ne déclenchent pas d'alarme | Vérifiez le circuit imprimé du contact radio-magnétique ; La LED émettrice doit pointer loin de l'aimant |

Pour le mode de diagnostic CAN, appuyez brièvement sur le bouton du circuit imprimé. Le fonctionnement de la télécommande du véhicule ou tout autre trafic de données CAN doit faire clignoter la LED verte gauche. Autres tests systématiques : [[Dépannage — diagnostic sûr des problèmes fréquents]].

## Documentation

1. Entrez le modèle du véhicule, l'année modèle et le VIN.
2. Définissez le `100754`, notez le numéro d'article WiPro, le numéro de série et la version du logiciel.
3. Documenter la position DIP `SW2 + SW3 + SW4 + SW6`.
4. Photographie CAN, feux de détresse, OBD, prises positives continues et masse.
5. Enregistrez la valeur du fusible, la position de la LED d'état et la variante de sirène.
6. Enregistrez individuellement toutes les ouvertures surveillées et tous les contacts radio.
7. Documentez les heures d'alarme, l'affichage de la mémoire d'alarme et le transfert au client.

## Sources

- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t6_2015_.pdf` — manuel d'installation commun spécifique au véhicule pour T6/T6.1, statut `12/20` ; Les dix pages ont été entièrement vérifiées textuellement et visuellement.
- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf` — manuel d'installation général, révision `1.8` ; Section allemande complète déjà vérifiée textuellement et visuellement.
- L'indication logicielle `6.8` de la matrice n'est pas retenue comme minimum propre au véhicule, car la source primaire du T6.1 mentionne uniquement le numéro de série minimal `0823-019`.

## Références croisées

- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]]
- [[Contact radiomagnétique 868 — montage et fonctionnement]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[VW T6 (2015-2019)]]




