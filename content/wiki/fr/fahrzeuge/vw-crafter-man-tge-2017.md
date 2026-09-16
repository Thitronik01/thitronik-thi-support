---
title: 'VW Crafter / MAN TGE (2017-2024, sans bouton de démarrage)'
sources:
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_crafter___man_tge_2017-2024.pdf'
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf'
updated: '2026-07-22'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/vw-crafter-man-tge-2017.md
---

# VW Crafter / MAN TGE (2017-2024, sans bouton de démarrage)

Installation de la WiPro III standard dans les VW Crafter II et MAN TGE 2017–2024. Le manuel véhicule `07/2025` documente la version `V6.8`, le démontage, l'alimentation, le CAN, les feux de détresse, les sirènes, la LED, les accessoires et les essais.

> **Limite :** la source disponible ne décrit pas le kit safe.lock `105458`. Pour les véhicules 2025+ avec bouton, voir [[VW Crafter / MAN TGE (2025+, avec bouton de démarrage)|VW Crafter / MAN TGE à partir de 2025]]. Vérifier ensemble véhicule, année, démarrage et version WiPro.

## Champ d'application

| Élément | Exigence |
|---|---|
| Véhicules | VW Crafter II / MAN TGE, 2017–2024, sans bouton |
| Système | WiPro III standard, logiciel minimal `V6.8` |
| Profil DIP | `SW2 + SW3 + SW4 + SW6 ON`; autres `OFF` |
| Commande | clé radio d'origine ou émetteur THITRONIK 868 appris |
| Alimentation | batterie de démarrage, fil rouge protégé par `5 A` |
| CAN | faisceau de colonne; faisceau de porte seulement si absent pour cause d'équipement |

Aucun numéro de série minimal n'est indiqué. Consigner série, logiciel et matériel; voir [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]].

## Hiérarchie des sources et anciennes indications supprimées

| Ancienne indication | Décision |
|---|---|
| safe.lock `105458`, `SW3`, séries `5458-001`–`5458-013` | absents du PDF; non repris |
| BCM A 16/17, BCM C 42 | aucun connecteur/pin véhicule indiqué; utiliser lieu et couleurs |
| ZV module de porte pin 1 | non documenté; ne pas raccorder |
| test veille huit minutes | source ancienne manquante; absent du PDF |
| cas Knaus/Cobra/trois clés | non vérifiables localement; supprimés |
| klaxon `105339` obligatoire | non démontré; sirène normale ou de secours recommandée |
| fusible `10 A` | remplacé ici par la valeur spécifique `5 A` |

Les deux PDF locaux sont identiques octet par octet. Ne pas reconstruire les DOCX/CSV manquants. Avec un kit safe.lock réel, arrêter et demander sa notice actuelle.

## Sécurité et contrôle du véhicule

- Montage réservé à un atelier qualifié.
- Débrancher les batteries selon le constructeur; protéger airbags, direction et électronique.
- Consigner voyants, mémoire de défauts et erreurs d'éclairage.
- Modifier les DIP uniquement hors tension, fiches 20 broches et Pro-Finder retirées.
- Vérifier ensemble connecteur, lieu, couleur, tension et signal.
- Utiliser les dérivations gélifiées; isoler séparément les fils inutilisés.
- Protéger les câbles du frottement, de la chaleur, de l'eau, des pédales et pièces mobiles.
- En cas d'écart, arrêter et contacter THITRONIK ou le constructeur.

Avant le travail :

1. Confirmer Crafter II/MAN TGE 2017–2024 sans bouton.
2. Tester la télécommande d'origine.
3. Tester la fermeture centralisée.
4. Vérifier l'affichage des portes au combiné, contact mis.
5. Déterminer les ouvrants vus par CAN et ceux nécessitant des contacts radio.
6. Confirmer WiPro standard `V6.8` minimum.

Outils : pinces, PH2/Torx 25, douille `10 mm`, clé Allen `3 mm`, multimètre, foret `8 mm`.

## Réglage du profil

1. Couper l'alimentation.
2. Débrancher les fiches 20 broches et Pro-Finder.
3. Ouvrir prudemment le boîtier.
4. Mettre `SW2`, `SW3`, `SW4`, `SW6` sur `ON`.
5. Laisser `SW1`, `SW5`, `SW7`, `SW8` sur `OFF`.
6. Documenter les positions.
7. Refermer avant de poursuivre.

Ne pas utiliser `SW3` seul ni retirer `SW6`. Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## Dépose des garnitures

1. Mettre le commutateur d'éclairage sur zéro.
2. L'enfoncer, tourner sur veilleuse et l'extraire.
3. Retirer quatre vis.
4. Déposer les garnitures avec précaution.
5. Débrancher éclairage de plancher, OBD et commandes concernées.
6. Repérer et protéger fiches et vis.

## Montage de la centrale

Le manuel montre une surface de collage à gauche au-dessus de la boîte à fusibles.

1. Nettoyer et dégraisser.
2. Garder des câbles courts sans bloquer fusibles ni relais.
3. Fixer la WiPro avec l'adhésif prévu.
4. Éloigner l'antenne du métal; ne pas raccourcir ni enrouler.
5. Tenir les câbles hors des pédales et de la direction.

## Alimentation et allumage

Faire passer les fils derrière la commande de capot jusqu'au coffre batterie du plancher; tirer le couvercle vers la porte conducteur.

| Fonction | Véhicule | WiPro | Exigence |
|---|---|---|---|
| borne 30 | plus batterie | rouge pin `11` | fusible `5 A` |
| borne 31 | moins batterie | noir pin `1` | masse fiable |
| borne 15 | noir/bleu OBD | jaune pin `7` | dérivation gélifiée |

1. Ouvrir le coffre et planifier un chemin protégé.
2. Relier rouge au plus via `5 A`.
3. Relier noir au moins.
4. Identifier et mesurer noir/bleu à l'OBD comme allumage.
5. Relier jaune par dérivation gélifiée.
6. Fixer le fusible accessible et décharger les câbles.
7. N'alimenter qu'après tous les contrôles.

## Raccordement CAN

Prélèvement dans le faisceau de colonne; faisceau de porte uniquement si les fils y manquent. Aucun connecteur ni pin véhicule n'est donné.

| Fonction | Véhicule | WiPro |
|---|---|---|
| CAN-Low | orange/marron | violet/orange pin `18` |
| CAN-High | orange/vert | blanc/orange pin `17` |

1. Libérer le faisceau de colonne.
2. Identifier la paire torsadée orange/marron et orange/vert.
3. Si absente, contrôler à nouveau avant d'utiliser le faisceau de porte.
4. Relier pin `18` à orange/marron.
5. Relier pin `17` à orange/vert.
6. Employer des dérivations gélifiées; ne pas inverser CAN.
7. Refixer le faisceau.

## Feux de détresse

1. Déclipser la baguette grise par dessous.
2. Déclipser le bloc interrupteurs/climatisation par les côtés.
3. Extraire prudemment le bloc.
4. Identifier la fiche bleue du bouton de détresse.
5. Mesurer le fil blanc/jaune.
6. Relier rouge/rose WiPro pin `6` à blanc/jaune.
7. Rebrancher complètement et soulager le fil.

## Sirène normale ou de secours

Passer un tire-fil derrière la batterie moteur par le petit passe-fil vers le plancher, puis tirer le câble. Les goujons montrés constituent un emplacement possible.

| Version | Raccordements |
|---|---|
| normale | blanc WiPro pin `15` vers rouge sirène; blanc/noir pin `16` vers noir |
| secours | blanc pin `15` vers blanc; rouge sirène à `+12 V`, noir à masse; isoler le bleu |
| alimentation secours | rouge WiPro pin `11` ou plus permanent protégé selon la notice |

1. Contrôler étanchéité, chaleur et mouvements.
2. Fixer la sirène solidement, protégée de l'eau directe.
3. Câbler exactement la variante choisie.
4. Isoler le déclenchement bleu de la sirène de secours.
5. Fixer les câbles et étancher le passage.
6. Tester séparément la sirène.

Voir [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]].

## LED d'état

1. Convenir de la position avec le client.
2. Contrôler l'arrière du point de perçage.
3. Percer à `8 mm`.
4. Insérer la LED.
5. Rebrancher la fiche blanche du câble rouge/noir.
6. Garder la LED visible pour commande, diagnostic et mémoire.

## Apprentissage des accessoires

Tous les accessoires `868` doivent être appris une fois.

1. Maintenir le bouton près de la fiche jusqu'au bip et à la LED fixe.
2. Déclencher chaque contact, émetteur, boucle et détecteur deux ou trois fois.
3. Éloigner les aimants de plus de `30 mm`, presser les touches, allumer le détecteur ou retirer la boucle.
4. Attendre bip et brève extinction de LED pour chaque élément.
5. Terminer par brève coupure d'alimentation ou pression du bouton.
6. La mémoire résiste à une longue coupure.
7. Pour effacer, utiliser uniquement la procédure documentée.

Voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]].

## Commande et essai fonctionnel

- La clé d'origine arme au verrouillage et désarme au déverrouillage avant ou arrière.
- Un [[Émetteur radio 868 — télécommande pour WiPro III|émetteur 868]] appris passe à l'état logique suivant.
- Le manuel parle de « jumper 6 » pour le bip; `SW6` appartient au profil et ne doit pas être modifié sans instruction actuelle.
- Maintenir les deux touches environ une seconde pour l'alarme panique.
- Arrêter toute alarme par une touche de l'émetteur ou Ouvrir de la télécommande d'origine; la LED affiche ensuite la mémoire.

Essai :

1. Fermer toutes les portes, trappes et contacts.
2. Verrouiller avec la télécommande et contrôler l'armement.
3. Ouvrir séparément de l'intérieur chaque porte détectée par CAN.
4. Désarmer et répéter pour chaque ouvrant détecté.
5. Ouvrir chaque contact radio appris.
6. Armer avec un contact ouvert et vérifier le mode aération: plusieurs bips puis bip armé.
7. Fermer le contact; il doit redevenir actif après environ `4 secondes`.
8. Préchauffer le détecteur de gaz environ `4 minutes`; tester à LED verte clignotante, armé et désarmé.
9. Appuyer en bas de la boucle et la sortir vers le haut.
10. Tester panique et arrêt par les deux commandes.
11. Vérifier environ `30 secondes` acoustiques et jusqu'à `120 secondes` optiques selon le manuel général.
12. Remonter les garnitures en ordre inverse après réussite.

## Montage des contacts radiomagnétiques

| Contrôle | Exigence |
|---|---|
| Articles | `100757` noir, `100758` blanc |
| Carte | LED d'émission opposée à l'aimant; inversée, apprentissage possible mais pas d'alarme |
| Variantes | couché gauche/droite, debout ou sur vitre |
| Aimant | plage fermée `22–30 mm` |
| Surface | propre, sèche, dégraissée |
| Collage | pas sous `15 °C`; résistance finale après `24 heures` |
| Adaptateurs | `100428` / `100729` pour écart ou antenne |

Placer de préférence l'émetteur sur le cadre et l'aimant sur l'ouvrant. Apprendre et tester la portée avant collage ou vissage aux repères. Voir [[Contact radiomagnétique 868 — montage et fonctionnement|Contact radiomagnétique 868]].

## Diagnostic

| Symptôme | Contrôle / action |
|---|---|
| WiPro inactive | fusible `5 A`, batterie, pins `11`/`1`, fiches |
| clé sans action | `V6.8`, `SW2 + SW3 + SW4 + SW6`, télécommande, CAN |
| pas de CAN | orange/vert pin `17`, orange/marron pin `18`; ne pas inverser; porte seulement après mesure |
| pas de détresse | fiche bleue, blanc/jaune, rouge/rose pin `6` |
| sirène muette | pins `15`/`16`, variante, alimentation et bleu isolé |
| une porte manque | affichage combiné et couverture CAN; ajouter un contact si besoin |
| contact appris sans alarme | corriger la carte si LED orientée vers l'aimant |
| radio faible | position centrale/antenne, métal, distance, adaptateur |
| appareil safe.lock `105458` | arrêter; obtenir la notice du kit; ne pas copier ce câblage standard |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]].

## Base documentaire et décision

- Les 11 pages du manuel *WiPro III – VW Crafter/MAN TGE 2017–2024*, `07/2025`, ont été vérifiées textuellement et visuellement.
- Page 2: standard `V6.8`, `SW2 + SW3 + SW4 + SW6`.
- Pages 3–5: démontage, emplacement, batterie, `5 A`, OBD, CAN et détresse.
- Pages 6–7: sirènes, pins `11`/`15`/`16`, `8 mm`, apprentissage, commande, panique, aération, `4 secondes`, `4 minutes`.
- Pages 8–11: `100757`/`100758`, orientation, variantes, `100428`/`100729`, `15 °C`, `24 heures`, `22–30 mm`.
- Le manuel général `1.8` complète sécurité, pins et durées 30/120 secondes.
- Les deux PDF sont identiques; les DOCX/CSV manquants n'ont pas été reconstruits. Les données safe.lock, veille, BCM, module de porte, Knaus et versions non prouvées ont été supprimées.
- La valeur spécifique `5 A` prévaut ici.

Sources primaires :

- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_vw_crafter___man_tge_2017-2024.pdf`
- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii-installationsanleitung_1.8.pdf`

## Articles connexes

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus d'apprentissage]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur 868]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact 868]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles|Boucle 868]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques|Sirènes et klaxons]]
- [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]
- [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]]
- [[VW Crafter / MAN TGE (2025+, avec bouton de démarrage)|VW Crafter / MAN TGE à partir de 2025]]
