---
title: Renault Master (2019–2024) — safe.lock
sources:
  - sources/Fahrzeugbesonderheiten.docx
  - sources/Seriennummer 5832 Wipro III safe.lock Renault Set .csv
  - sources/Wipro III 9 safe.lock.docx
  - 'https://www.thitronik.de/produkte/produkt/wipro-iii-safelock/'
  - >-
    https://www.thitronik.de/news-und-termine/news/neu-verfuegbar-wipro-iii-safelock-fuer-den-renault-master-2019-bis-2024/
  - >-
    https://www.thitronik.de/fileadmin/user_upload/downloads/alarmanlagen/anleitungen/wipro_iii_safe.lock.pdf
updated: '2026-07-21'
confidence: high
lang: fr
translation_of: sources/fahrzeuge/renault-master-2019.md
---

# Renault Master (2019–2024) — safe.lock

Cet article décrit l’état vérifié du projet pour la WiPro III safe.lock dans le Renault Master des années-modèles 2019–2024 avec le kit spécifique au véhicule, réf. `105832`. Il regroupe la page produit du fabricant, la communication du fabricant du 16 juillet 2025, le guide abrégé rév. `1.3` et les registres de projet validés, en délimitant clairement les sources.

> **Limite de validation :** les trois fichiers internes cités dans l’ancienne version ne sont pas disponibles localement. Les sources publiques du fabricant ne contiennent aucun tableau spécifique au véhicule pour les connecteurs, broches, couleurs de fils, fusibles ou réglages DIP. Ces anciennes valeurs ne sont donc pas reprises comme données de montage validées. Le document d’atelier THITRONIK actuel, spécifique au kit `105832`, est indispensable avant le montage.

## Champ d’application et état vérifié

| Caractéristique | État validé |
|---|---|
| Véhicule | Renault Master |
| Période des modèles | 2019–2024 |
| Produit | WiPro III safe.lock, kit spécifique au véhicule réf. `105832` |
| Numéro de série minimal | `5832-001` |
| Version logicielle de base | `1.0.0sr` |
| Disponibilité publique | annonce du fabricant du 16 juillet 2025 |
| Clé d’origine du véhicule | verrouille et déverrouille uniquement le véhicule ; elle ne commande pas l’état de l’alarme |
| Commande simultanée du véhicule et de l’alarme | utiliser la télécommande radio ou un autre accessoire THITRONIK compatible |

Avant le montage, vérifier le numéro de série et la branche logicielle sur l’étiquette signalétique. Un numéro séquentiel supérieur ne peut être considéré comme plus récent qu’au sein de la ligne de produits `5832-`. Voir [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]] et [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]].

## Hiérarchie des sources et ancien contenu corrigé

| Sujet | Décision relative aux sources |
|---|---|
| Période des modèles, kit et version minimale | confirmés par la page produit THITRONIK actuelle |
| Logique de commande particulière | confirmée par la page produit et la communication du fabricant du 16 juillet 2025 |
| Commande générale et valeurs système | confirmées par l’examen visuel du guide abrégé rév. `1.3` |
| Version `5832-001 / 1.0.0sr` | également documentée dans le registre de projet validé |
| Sources internes DOCX/CSV | indisponibles localement ; elles ne sont pas considérées comme des preuves consultées |
| Anciennes données P201, d’alimentation et de klaxon | non validées sans source primaire accessible et volontairement non répétées comme instructions de raccordement |
| Ancienne indication relative au mode camping | non étayée par les informations Renault du fabricant et donc supprimée |

La validation de cet article confirme ainsi le domaine d’utilisation et la logique de commande vérifiés. Elle ne remplace ni le document d’atelier spécifique au véhicule ni les mesures sur le véhicule concerné.

## Sécurité et contrôles préalables

- Le montage et les travaux sur l’installation électrique du véhicule sont réservés aux ateliers qualifiés.
- Avant toute intervention électrique, débrancher la borne négative de la batterie et les éventuelles batteries auxiliaires selon les consignes de Renault et du carrossier.
- Les airbags, la direction, le freinage, l’antidémarrage et les autres systèmes de sécurité ne doivent être ni testés, ni raccordés, ni entravés.
- Ne jamais choisir un raccordement d’après la seule couleur du fil ; le connecteur, la broche, la tension, le type de signal et la fonction doivent tous correspondre.
- Isoler séparément les fils inutilisés contre les courts-circuits ; protéger les câbles contre l’abrasion, la chaleur, les vibrations et les contraintes mécaniques.
- En cas d’année-modèle, de connecteur, de fil ou de document différent, interrompre le travail et contacter l’assistance THITRONIK.

À contrôler et à consigner avant de commencer :

1. Le véhicule est-il bien un Renault Master des années-modèles 2019–2024 ?
2. Le kit réf. `105832` est-il présent ?
3. Le numéro de série commence-t-il par `5832-` et est-il au moins égal à `5832-001` ?
4. L’appareil affiche-t-il le logiciel `1.0.0sr` ou une version ultérieure validée par THITRONIK pour ce véhicule ?
5. Le document d’atelier actuel, spécifique au véhicule, est-il disponible et sa révision correspond-elle au kit et au véhicule ?
6. La clé du véhicule, le verrouillage centralisé, les feux de détresse, le contact, les portes et les éventuels contacts supplémentaires fonctionnent-ils sans défaut avant l’intervention ?
7. Les défauts mémorisés, transformations et variantes de carrosserie existants ont-ils été consignés ?

## Document d’atelier spécifique au véhicule obligatoire

Avant le premier raccordement, le document actuel du kit `105832` doit indiquer clairement :

| Point de contrôle | Justificatif requis |
|---|---|
| Profil de l’appareil | réglage DIP complet pour la version matérielle et logicielle exacte |
| Communication du véhicule | connecteur, broche, couleur du fil et affectation CAN-High/CAN-Low |
| safe.lock/verrouillage centralisé | sortie prévue, fil du véhicule et mode de commande autorisé |
| Feux de détresse | connecteur, broche, fil et type de signal |
| Alimentation | borne 30, borne 15, borne 31, section de câble et fusible |
| Alarme sonore | circuit de klaxon ou de sirène validé, y compris la charge de sortie |
| Montage | emplacement autorisé, procédure de démontage et cheminement sûr des câbles |

1. Noter dans la fiche de travail le titre, la révision et la source du document.
2. Comparer le véhicule et l’aspect des connecteurs au document.
3. Mesurer chaque fil avant son raccordement et consigner la mesure.
4. Photographier le réglage DIP avant de refermer la centrale.
5. Ne pas remplacer une donnée différente par une valeur provenant d’une autre génération de Renault Master ou d’un véhicule apparenté.
6. Ne pas utiliser l’ancien tableau P201 de cet article comme document de travail.

## Données système générales vérifiées

Les valeurs suivantes proviennent du guide abrégé THITRONIK rév. `1.3` ; elles ne définissent aucun point de raccordement spécifique au véhicule.

| Grandeur | Valeur |
|---|---|
| Alimentation de la centrale | `9–30 V` |
| Consommation | env. `11 mA` |
| Sortie de sirène | `9–30 V` selon la tension d’entrée, max. `1 A` |
| Sortie des clignotants | max. `60 W` |
| Émetteurs enregistrables | max. `100` |
| Fréquence de réception/d’émission | `868,35 MHz` |
| Puissance d’émission des accessoires radio | `<10 mW` |
| Portée en champ libre | jusqu’à `75 m` |
| Pile de l’émetteur | `CR2032`, `3 V`, durée de vie typique env. deux ans |
| Plage de température de la centrale | `−10 °C à +80 °C` |
| Plage de température des accessoires radio | `−10 °C à +60 °C` |

La page produit du fabricant indique également une utilisation sur les véhicules 12 ou 24 V, l’homologation ECE-R10, l’indice de protection `IP 40`, environ `102 dB`, des dimensions de `80 × 29 × 80 mm` et un poids de centrale de `90 g`.

## Logique de commande du Renault Master

Sur le Renault Master 2019–2024, le verrouillage du véhicule et l’état de l’alarme sont distincts lorsque la clé d’origine est utilisée :

- La clé d’origine verrouille ou déverrouille les portes.
- La clé d’origine n’active ni ne désactive la WiPro III safe.lock.
- Le verrouillage et l’activation simultanés, ou le déverrouillage et la désactivation simultanés, nécessitent la télécommande radio ou un autre accessoire THITRONIK compatible.
- Selon la combinaison installée, le module NFC ou l’application THITRONIK peuvent offrir d’autres moyens de commande ; leur configuration est décrite dans les articles correspondants.
- Ne jamais déduire l’état de l’alarme de celui des serrures. Contrôler la LED d’état et la réaction réelle du système.

> **Risque d’enfermement et d’alarme :** selon le fabricant, l’utilisation de la seule clé d’origine ne modifie pas l’état de l’alarme. Avant la remise du véhicule, tous les utilisateurs doivent savoir quel dispositif commande simultanément le véhicule et l’alarme.

## Mise en service et essai fonctionnel

1. Contrôler tous les raccordements, fusibles, points de masse et le profil de l’appareil avec le document d’atelier actuel.
2. Rebrancher la batterie du véhicule et les batteries auxiliaires selon les consignes du fabricant.
3. Vérifier qu’aucun voyant, message d’erreur ou nouveau défaut mémorisé n’est apparu.
4. Fermer toutes les portes et tous les contacts enregistrés.
5. Verrouiller et activer avec un accessoire THITRONIK compatible ; vérifier le verrouillage des portes, une confirmation par les clignotants, la confirmation sonore selon la touche et le clignotement de la LED d’état.
6. Déverrouiller et désactiver avec le même accessoire ; vérifier le déverrouillage, deux confirmations par les clignotants, la confirmation sonore selon la touche et l’extinction de la LED d’état.
7. Verrouiller et déverrouiller avec la clé d’origine ; confirmer que seules les serrures réagissent et que l’état d’alarme précédemment choisi reste inchangé.
8. Activer le système avec un accessoire THITRONIK et ouvrir séparément chaque porte surveillée par le véhicule.
9. Déclencher séparément chaque contact magnétique radio et chaque autre accessoire radio.
10. Déclencher une véritable alarme d’essai et contrôler environ `30 secondes` d’alarme sonore et `180 secondes` d’alarme visuelle, LED d’état comprise.
11. Déclencher l’alarme panique en appuyant simultanément sur les deux touches de la télécommande, puis l’arrêter avec une touche quelconque.
12. Tester la réception, la signalisation d’alarme et la commande à tous les emplacements prévus.
13. Ne fixer définitivement les câbles, remonter les garnitures et remettre le véhicule qu’après réussite de tous les contrôles.

## Dépannage

| Symptôme | Contrôle et mesure |
|---|---|
| La clé d’origine verrouille le véhicule, mais l’état de l’alarme ne change pas | comportement Renault attendu ; utiliser un accessoire THITRONIK pour activer ou désactiver |
| L’accessoire THITRONIK modifie l’état de l’alarme, mais pas les serrures | contrôler le raccordement spécifique du verrouillage centralisé, le document d’atelier actuel, le fusible et le signal |
| Aucune réaction CAN | contrôler le connecteur et l’affectation CAN-High/CAN-Low uniquement d’après le document d’atelier actuel et les mesures |
| Aucune confirmation par les clignotants | contrôler le raccordement validé aux feux de détresse, la charge de sortie et la fonction du véhicule |
| Aucune alarme sonore | contrôler le circuit de klaxon/sirène documenté et la charge de sortie maximale autorisée |
| Un accessoire radio ne réagit pas | contrôler l’apprentissage, la pile, le marquage de fréquence `868`, la portée et les écrans métalliques |
| Le véhicule ou le connecteur diffère du document | interrompre le travail ; ne reprendre aucune broche ni couleur de l’ancien contenu ou d’une autre génération |
| La version logicielle ou le numéro de série n’est pas clair | photographier l’étiquette signalétique et transmettre le dossier à l’assistance THITRONIK avec la fiche de travail |

Voir [[Dépannage — diagnostic sûr des problèmes fréquents|Dépannage]] et [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade|Saisie d’un dossier d’assistance]].

## Remise et documentation

Consigner dans la fiche de travail :

- modèle, année-modèle, VIN et variante de carrosserie pertinente
- kit réf. `105832`, numéro de série complet et version logicielle
- titre et révision du document d’atelier spécifique au véhicule utilisé
- réglage DIP confirmé et photos avant fermeture de la centrale
- mesures et emplacement de chaque raccordement réellement utilisé
- calibre du fusible, emplacements de montage et cheminements des câbles
- accessoires enregistrés et chaque source d’alarme testée séparément
- résultat des essais avec la clé d’origine et les accessoires THITRONIK
- durée de l’alarme sonore et visuelle ainsi que tout écart éventuel
- état de la mémoire des défauts avant et après le montage

Lors de la remise, montrer que la clé d’origine ne fait que verrouiller et déverrouiller le véhicule. Le véhicule et l’alarme se commandent ensemble avec la télécommande radio ou un autre accessoire THITRONIK correctement configuré.

## Décision relative aux sources

- La page produit THITRONIK actuelle confirme Renault Master 2019–2024, le kit réf. `105832`, la version minimale `5832-001 / 1.0.0sr` et la logique de commande distincte de la clé d’origine.
- La communication du fabricant du 16 juillet 2025 confirme la disponibilité et l’obligation d’utiliser la télécommande radio ou un autre accessoire THITRONIK pour activer et désactiver.
- Le guide abrégé WiPro III safe.lock de deux pages, rév. `1.3`, a été vérifié textuellement et visuellement ; les valeurs système, confirmations, Vent-check, alarme panique et durées d’alarme en sont issus.
- Le registre de projet confirme la branche logicielle distincte `5832-` et la première version documentée `5832-001 / 1.0.0sr`.
- Les fichiers `Fahrzeugbesonderheiten.docx`, `Seriennummer 5832 Wipro III safe.lock Renault Set .csv` et `Wipro III 9 safe.lock.docx` sont introuvables localement. Aucune broche, couleur de fil, position DIP ou procédure de montage spécifique au véhicule provenant de l’ancien contenu n’est donc validée.
- L’ancienne indication relative au mode camping n’était pas étayée par les sources Renault accessibles du fabricant et a été supprimée.

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Émetteur radio 868 — télécommande pour WiPro III|Émetteur radio 868]]
- [[Module NFC — commande de la WiPro via NFC|Module NFC]]
- [[BT-connect — Module Bluetooth pour WiPro III|BT-connect]]
- [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP|Compatibilité des véhicules]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons|Numéros de série et versions logicielles]]
- [[Registre des numéros d’article — produits et accessoires THITRONIK documentés|Registre des numéros d’article]]
- [[Renault Master III / Opel Movano B / Nissan NV400 (à partir de 2011)|Renault Master III]] — génération précédente
