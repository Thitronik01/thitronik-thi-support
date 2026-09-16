---
title: VW T5 facelift (à partir de MY 2010)
sources:
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t5_facelift_2009_.pdf'
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/vw-t5-facelift.md
---

# VW T5 facelift (à partir de MY 2010)

Cette page décrit l'installation d'un WiPro III dans le VW T5 Facelift à partir de l'année modèle 2010. Le manuel d'installation de neuf pages spécifique au véhicule, statut `12/20`, est pertinent ; la révision générale du manuel d'installation WiPro III `1.8` ajoute la sécurité et le brochage du jeu de câbles à 20 broches.

> **Délimitation :** [[VW T5 (2006-2009)]] s'applique au T5 construit entre 2006 et 2009. L'année modèle, l'emplacement d'installation, les couleurs des câbles et les signaux doivent tous correspondre à la version facelift décrite ici.

## Aperçu

| Paramètres | Statut vérifié |
|---|---|
| véhicule | VW T5 lifting |
| Année modèle | à partir de 2010 |
| Système | WiPro III |
| DIP → ON | `SW1 + SW4 + SW6` |
| Connexion CAN | orange/marron et orange/vert dans la zone de ligne derrière la boîte à gants |
| Commande | télécommande d’origine du véhicule ; accessoires radio également programmables |
| Alarme acoustique | sirène normale ou de secours fortement recommandée ; Klaxon du véhicule inactif sans allumage |
| Numéro de série minimum/logiciel | non mentionné dans les sources primaires |
| Durée de l'alarme | acoustique env. `30 s`, optiquement env. `180 s` |

## Portée de la source et limites de version

| Sujet | Déclaration publiée |
|---|---|
| Profil du véhicule | exclusivement lifting T5 à partir de l'année modèle 2010 avec `SW1 + SW4 + SW6` |
| Prise de ligne | Identifier ensemble la position d'installation, la couleur du véhicule et le signal mesuré |
| Alimentation | Raccordement de la batterie selon les instructions du véhicule ; Broches WiPro `1`, `7` et `11` selon le manuel général |
| Sirène | sirène normale ou sirène de secours selon schéma électrique spécifique au véhicule |
| Limite série/logiciel | `0823-001 / 2.1` n'est pas documenté et n'est pas retenu comme exigence minimale |
| Véhicule différent | Arrêtez les travaux et obtenez l'approbation actuelle de THITRONIK ou du constructeur du véhicule |

1. Confirmez le modèle et l'année modèle à l'aide des documents du véhicule.
2. Différencier la version facelift du T5 construit entre 2006 et 2009.
3. Documentez le numéro d'article, le numéro de série et le logiciel WiPro.
4. Comparez les couleurs des câbles et la situation d'installation avec les instructions.
5. En cas d'écarts, ne transférez aucune valeur de cette page.

## Sécurité et préparation

Le manuel du véhicule est destiné aux entreprises de services professionnels. Des travaux inappropriés sur le système électrique du véhicule, la zone des airbags ou les panneaux peuvent mettre en danger les personnes et la sécurité routière.

1. Faites effectuer les travaux uniquement par un spécialiste qualifié.
2. Débranchez la batterie conformément aux instructions du constructeur du véhicule ; Faites attention au code radio et aux données volatiles.
3. Changez les commutateurs DIP uniquement lorsqu'il n'y a pas de tension.
4. Isolez individuellement les entrées et sorties inutilisées.
5. Sécurisez les câbles contre les frottements, les tractions, la chaleur et l'humidité.
6. Gardez les pédales, la direction, les airbags et les pièces mobiles dégagés.
7. Entraînez les accessoires radio avant l'assemblage final.

## Définir le profil DIP

1. Retirez complètement l'alimentation WiPro.
2. Ouvrez le boîtier et rendez accessible le commutateur de codage octuple.
3. Réglez `SW1`, `SW4` et `SW6` sur `ON`.
4. Laissez tous les autres interrupteurs dans la position de base indiquée dans les instructions du véhicule.
5. Photographiez ou documentez la position du commutateur.
6. Fermez le boîtier et poursuivez ensuite la connexion.

## Déposer la boîte à gants et monter la centrale

1. Retirez cinq vis : une de chaque côté, deux à l'intérieur à l'avant et une au milieu à l'arrière.
2. Soulevez délicatement la boîte à gants.
3. Débranchez l'entrée AUX existante ou une interface iPod à l'arrière.
4. Desserrez le capot avant ou le boîtier.
5. Retirez la boîte à gants sans exercer de pression sur les câbles ou les clips.
6. Fixez WiPro III devant la boîte à gants, sous le conduit de ventilation, de manière sèche et accessible à l'entretien, à l'aide d'un ruban adhésif double face approprié.
7. Fixez un Pro-Finder en option à la même zone de montage protégée si nécessaire.

## Connexions de véhicules

Les instructions du véhicule ne mentionnent aucun numéro de fiche ou de broche du véhicule. Par conséquent, la position d'installation, la couleur du câble et le signal mesuré doivent être vérifiés ensemble ; Ne connectez jamais un câble uniquement en fonction de sa couleur.

| Gestion des véhicules | Ligne / broche WiPro | Fonction |
|---|---|---|
| orange/marron | violet/orange, broche `18` | CAN-Low |
| orange/vert | blanc/orange, broche `17` | CAN-High |
| noir/jaune | jaune, broche `7` | Allumage, borne 15 |
| blanc/vert, fin, marquage vert fort | rouge/rose, broche `6` | Indicateurs intelligents / feux de détresse |

1. Localisez la paire de câbles CAN dans la zone de câble illustrée derrière la boîte à gants.
2. Mesurez orange/marron et connectez-vous à la broche violet/orange `18`.
3. Mesurez orange/vert et connectez-vous à la broche blanche/orange `17`.
4. Vérifiez le noir/jaune comme borne 15 et connectez-vous à la broche jaune `7`.
5. Identifiez le faisceau de câbles fin en direction de l'interrupteur des feux de détresse.
6. Vérifiez le câble fin blanc/vert avec un marquage vert fort et connectez-le à la broche rouge/rose `6`.
7. Sertissez, isolez et tendez correctement les connexions.

## Alimentation, passage de câbles et sirène

Le klaxon du véhicule étant inactif sans allumage et ne pouvant alors être activé, les instructions du véhicule recommandent fortement une sirène normale ou de secours.

| Composant | Connexion |
|---|---|
| Masse WiPro | broche noire `1` au négatif de la batterie / masse fiable du véhicule |
| WiPro permanent plus | broche rouge `11` via le porte-fusible au positif de la batterie |
| sirène normale | Broche blanche WiPro `15` vers sirène rouge ; WiPro blanc/noir pin `16` vers sirène noir |
| Alimentation sirène de secours | rouge en permanence sur `+12 V`, noir à la masse |
| Déclencheur de sirène de secours | blanc sur la broche blanche WiPro `15` ; Ne pas utiliser de bleu et isoler |

1. Déployez la broche de câble rouge `11` et la broche de câble noire `1` dans le compartiment moteur.
2. Utilisez le bouchon de traversée vers le boîtier de tringlerie d'essuie-glace situé à droite sous la boîte à gants.
3. Depuis le compartiment moteur, ouvrez le couvercle métallique amovible situé sous la lèvre supérieure en caoutchouc du capot.
4. Faites passer les câbles sans frotter et refermez bien la traversée.
5. Connectez le positif permanent au positif de la batterie via un porte-fusible accessible ; Concevez la valeur du fusible conformément au manuel général.
6. Rendre la masse à faible résistance et mécaniquement résiliente.
7. Connectez la sirène normale selon la variante de la broche `15`/`16` ou alimentez en permanence la sirène de secours et connectez sa ligne de déclenchement blanche à la broche `15`.
8. Isolez individuellement le fil bleu de la sirène de secours.
9. Insérez le fusible uniquement une fois que toutes les connexions ont été vérifiées.

Autres bases : [[Sirènes et klaxons — moyens d'alarme acoustiques]].

## Apprendre les accessoires radio

Les contacts radiomagnétiques, les détecteurs de gaz et les boucles de câbles radio doivent être conservés avant l'installation.

1. Fournissez à WiPro une couverture stable.
2. Appuyez et maintenez enfoncé le bouton à droite de la fiche de connexion jusqu'à ce que le système émette un bip.
3. Vérifiez que la LED d'état est allumée en permanence.
4. Déclenchez chaque contact radio magnétique `2–3×` à enregistrer.
5. Déclenchez également l'alarme de gaz ou la boucle du câble radio `2–3×`.
6. Attendez que la tonalité de confirmation et la LED d'état s'éteignent brièvement.
7. Étiquetez clairement chaque accessoire et attribuez-lui son emplacement d'installation.
8. Comparez le processus complet avec [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]].

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
9. Pour les grandes distances, utilisez l'adaptateur `100428` ou `100729`.
10. Après l'assemblage, testez chaque contact avec l'ouverture fermée et ouverte.

Voir [[Contact radiomagnétique 868 — montage et fonctionnement]] et [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles]].

## Mise en service et test fonctionnel complet

1. Vérifiez à nouveau la position DIP `SW1 + SW4 + SW6`.
2. Vérifiez toutes les connexions à sertir, l'isolation, le serre-câble et le fusible.
3. Connectez l'alimentation et écoutez le bip de mise en marche.
4. Coupez le contact ; A la mise du contact, le système est désactivé.
5. Fermez toutes les portes de la cabine. Si la porte de la cabine est ouverte, le véhicule ne se verrouille pas et le système ne sera pas activé.
6. Verrouillez le véhicule à l'aide du bouton de verrouillage de la clé à télécommande et armez le système.
7. Vérifiez la tonalité d'accusé de réception, les indicateurs de direction clignotants et la LED d'état clignotante.
8. Si le système ne répond pas initialement, verrouillez et déverrouillez plusieurs fois afin que les données CAN se synchronisent.
9. Déclenchez individuellement toutes les ouvertures surveillées par le véhicule et les accessoires radio.
10. Vérifiez la sirène normale ou de secours avec une alarme réelle.
11. Vérifiez la durée de l'alarme sonore d'environ `30 s` et la durée de l'alarme visuelle d'environ `180 s`.
12. Désarmez ou interrompez l'alarme à l'aide du bouton de déverrouillage.

## Fonctionnement et commentaires

- Verrouillage des bras du système ; La centrale confirme par un bip et un clignotement, la LED d'état clignote.
- Le déverrouillage désarme le système ou interrompt une alarme.
- Une porte de cabine ouverte empêche le verrouillage du véhicule et donc l'activation du système d'alarme.
- Plusieurs bips courts lors de l'armement signifient qu'un contact radiomagnétique formé est ouvert ; Selon la source, le système fonctionne toujours.
- Après l'installation, plusieurs opérations de verrouillage et de déverrouillage peuvent être nécessaires pour la synchronisation CAN.

## Diagnostic

| Image d'erreur | Test/mesure |
|---|---|
| Bip d'allumage présent, mais aucune réponse à la clé-télécommande | Vérifiez les lignes CAN blanc/orange et violet/orange ; Activer le mode diagnostic |
| la LED verte gauche clignote en mode diagnostic | Le trafic de données CAN est présent |
| la LED verte gauche reste éteinte pendant le fonctionnement | Bus inactif ou connexion CAN défectueuse |
| ni réaction ni bip d'allumage | Vérifier l'alimentation, le sertissage, l'état d'allumage et le fusible |
| Avertissement de contact malgré des ouvertures fermées | Vérifiez la distance entre l'émetteur et l'aimant ; ouvrir et fermer tous les contacts plusieurs fois |
| L'avertissement de contact reste en vigueur | Si les contacts sont fermés, débrancher et rétablir l'alimentation |
| Les accessoires peuvent être entraînés, mais ne déclenchent pas d'alarme | vérifier le circuit imprimé ; La LED émettrice doit pointer loin de l'aimant |

Pour le mode de diagnostic CAN, appuyez brièvement sur le bouton du circuit imprimé. L'utilisation de la clé radio ou d'un autre trafic de données CAN doit faire clignoter la LED verte gauche. Autres tests systématiques : [[Dépannage — diagnostic sûr des problèmes fréquents]].

## Documentation

1. Entrez le modèle du véhicule, l'année modèle et le VIN.
2. Notez le numéro d'article WiPro, le numéro de série et la version du logiciel.
3. Documentez la position DIP `SW1 + SW4 + SW6`.
4. Photographiez les couleurs des fils et les emplacements réels des prises.
5. Enregistrez la valeur du fusible, le point de terre, l'entrée de câble et la variante de sirène.
6. Enregistrez individuellement toutes les ouvertures surveillées et tous les contacts radio.
7. Documentez les heures d'alarme, les affichages de diagnostic et le transfert au client.

## Sources

- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_t5_facelift_2009_.pdf` — manuel d'installation spécifique au véhicule, statut `12/20` ; Les neuf pages ont été entièrement vérifiées textuellement et visuellement.
- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf` — manuel d'installation général, révision `1.8` ; Section allemande complète déjà vérifiée textuellement et visuellement.
- L'ancienne indication de la matrice `0823-001 / 2.1` ne sont pas conservées comme niveau minimum car elles ne sont pas mentionnées dans ces sources primaires.

## Références croisées

- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]]
- [[Contact radiomagnétique 868 — montage et fonctionnement]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[VW T5 (2006-2009)]]
- [[VW T6 (2015-2019)]]

