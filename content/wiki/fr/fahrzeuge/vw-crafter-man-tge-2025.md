---
title: 'VW Crafter / MAN TGE (2025+, avec bouton de démarrage)'
sources:
  - 'https://www.thitronik.de/produkte/produkt/wipro-iii-safelock/'
  - 'H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_safe.lock.pdf'
updated: '2026-07-22'
confidence: medium
lang: fr
translation_of: sources/fahrzeuge/vw-crafter-man-tge-2025.md
---

# VW Crafter / MAN TGE (2025+, avec bouton de démarrage)

Cette page concerne le VW Crafter II et le MAN TGE à partir de l'année-modèle 2025 avec bouton de démarrage. La page THITRONIK actuelle confirme le kit WiPro III safe.lock `105458`, mais précise que la WiPro III safe.lock ne peut actuellement pas commander le verrouillage centralisé des véhicules avec bouton de démarrage.

> **Limite de validation :** aucune notice d'installation actuelle propre à cette génération n'est disponible localement. Cette page ne publie donc volontairement ni DIP, ni broche, ni fil véhicule. Obtenir la notice THITRONIK correspondant exactement au véhicule et à l'appareil avant l'installation.

## Vue d'ensemble

| Paramètre | État vérifié |
|---|---|
| Véhicule | VW Crafter II / MAN TGE avec bouton de démarrage |
| Année-modèle | 2025+ |
| Kit | WiPro III safe.lock, réf. `105458` |
| Verrouillage via accessoires THITRONIK | actuellement indisponible |
| Fonction d'alarme | à contrôler séparément à la réception |
| Alarme acoustique | THITRONIK recommande vivement un klaxon additionnel pour ce type |
| Profil DIP | non indiqué pour cette variante dans la source publique actuelle |
| Série/logiciel minimum | non justifié actuellement pour la variante 2025+ |
| Câblage | uniquement selon la notice véhicule actuelle |

## État des sources et anciennes données rejetées

Les quatre fichiers DOCX/CSV cités auparavant sont absents du projet et de l'archive THITRONIK disponible. Leurs données ne constituent donc pas une validation d'installation.

| Ancienne donnée | Décision éditoriale |
|---|---|
| `SW3 ON` | non vérifié ; ne pas régler sans la notice correspondante |
| `5458-010 / 1.2.1sx` | liste source absente ; ne pas publier comme seuil |
| BCM A broches 20/21 et C broche 42 | notice véhicule absente ; ne pas raccorder |
| couleurs CAN, contact et clignotants | non validées sans schéma associé |
| klaxon additionnel ou sirène de secours « obligatoire » | formulation trop forte ; la FAQ recommande vivement un klaxon additionnel |

## Délimitation par rapport à 2017–2024

1. Cette page vaut seulement pour 2025+ avec bouton.
2. Pour 2017–2024 sans bouton, voir [[VW Crafter / MAN TGE (2017-2024, sans bouton de démarrage)]].
3. Ne pas transférer le profil standard `SW2 + SW3 + SW4 + SW6` à cette version safe.lock.
4. Ne pas reprendre d'anciens seuils, tests de veille ou broches BCM sans validation actuelle.
5. Véhicule, année, démarrage, kit, série et logiciel doivent correspondre ensemble à la notice.

## Verrouillage centralisé : restriction connue

1. Ne pas promettre le verrouillage ou déverrouillage via un accessoire THITRONIK.
2. Tester l'armement, le désarmement et la surveillance séparément du verrouillage.
3. « safe.lock » est le nom du kit, pas la preuve que sa commande de verrouillage fonctionne ici.
4. Informer le client avant la remise du véhicule.

## Contrôles avant installation

1. Identifier Crafter II ou MAN TGE.
2. Confirmer l'année-modèle 2025 ou ultérieure.
3. Documenter le bouton de démarrage.
4. Noter référence, numéro de série et logiciel de la centrale.
5. Confirmer le kit `105458`.
6. Obtenir la notice THITRONIK actuelle de cette variante.
7. Comparer DIP, faisceau, fusible, points de reprise et alarme acoustique.
8. En cas d'absence ou de contradiction, arrêter et contacter THITRONIK ou un revendeur spécialisé.

## DIP, logiciel et câblage

1. Ne pas copier les DIP de la notice 2017–2024.
2. Ne pas activer `SW3` sur la seule foi de l'ancien wiki.
3. Ne pas utiliser `5458-010 / 1.2.1sx` comme seuil.
4. Ne jamais identifier un fil par sa seule couleur ; connecteur, broche, signal et mesure doivent coïncider.
5. Raccorder alimentation, masse, CAN, contact, clignotants, klaxon et sirène uniquement selon la notice actuelle.
6. Revérifier la compatibilité après une mise à jour du véhicule ou de la WiPro.

Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]] et [[Numéros de série et versions logicielles — préfixes, seuils et jalons]].

## Alarme acoustique

THITRONIK indique que le klaxon du véhicule ne fonctionne qu'avec le contact et recommande donc vivement un klaxon additionnel.

1. Vérifier le klaxon contact coupé.
2. Choisir et protéger l'alarme selon la notice actuelle.
3. Ne pas confondre klaxon additionnel et sirène de secours.
4. Déclencher une alarme réelle contact coupé.
5. Contrôler l'audibilité à l'extérieur et consigner le résultat.

Voir [[Sirènes et klaxons — moyens d'alarme acoustiques]].

## Ordre d'installation sûr

1. Respecter les prescriptions batterie et constructeur.
2. Mettre hors tension avant les travaux électriques.
3. Monter la centrale au sec, protégée et accessible.
4. Protéger les câbles de l'abrasion, traction, chaleur et humidité.
5. Poser le fusible après contrôle complet.
6. Régler les DIP uniquement selon la notice actuelle.
7. Mesurer et documenter chaque reprise avec connecteur et broche.
8. Ne pas raccorder la centralisation sans validation explicite de cette variante.
9. Mémoriser les accessoires radio après stabilisation de l'alimentation.
10. Tester chaque voie d'alarme.

## Mise en service et réception

1. Contrôler tension et courant de veille.
2. Tester contact ON/OFF et détection du bouton.
3. Tester séparément chaque porte de cabine.
4. Tester portes de cellule, arrière, coulissantes et coffres.
5. Ajouter des contacts magnétiques radio aux ouvrants non détectés par le bus.
6. Tester séparément télécommande et module NFC.
7. Répéter armement et désarmement.
8. Tester la centralisation et consigner l'absence de commande connue.
9. Tester clignotants et alarme acoustique contact coupé.
10. Tester alarme panique et interruption.
11. Contrôler la mise en veille de la batterie selon les prescriptions véhicule.
12. Remettre le véhicule avec le périmètre fonctionnel documenté.

## Consignes d'utilisation

La notice rapide rév. `1.3` décrit télécommande, alarme panique, Vent-check, déroulement et mémoire d'alarme. La restriction véhicule prévaut : l'actionnement d'un accessoire THITRONIK ne prouve pas que les portes sont verrouillées.

- Contrôler l'état réel du véhicule.
- Expliquer [[Émetteur radio 868 — télécommande pour WiPro III]] et [[Module NFC — commande de la WiPro via NFC]] uniquement dans le périmètre validé.
- Après une alarme, lire la mémoire et supprimer la cause.

## Données techniques du produit

Valeurs générales de la notice rapide WiPro III safe.lock rév. `1.3`, sans valeur de validation du câblage véhicule.

| Caractéristique | Valeur |
|---|---|
| Alimentation centrale | `9–30 V` |
| Consommation | env. `11 mA` |
| Sortie sirène | `9–30 V (Uin) / 1 A` |
| Sortie clignotants | `60 W` |
| Fréquence | `868,35 MHz` |
| Émetteurs appairables | `100` |
| Portée en champ libre | jusqu'à `75 m` |
| Pile émetteur | `CR2032`, env. 2 ans |

## Diagnostic

| Observation | Contrôle / mesure |
|---|---|
| Alarme active, portes immobiles | restriction publiée ; ne pas la masquer comme défaut de câblage |
| Klaxon muet lors de l'alarme | contact coupé ; contrôler le klaxon additionnel validé |
| Une porte ne déclenche rien | tester seule ; clarifier détection CAN ou contact radio |
| Comportement modifié après mise à jour | relever les logiciels et obtenir une validation actuelle |
| DIP ou seuil incertain | ne pas deviner ; arrêter et obtenir la notice véhicule |

## Documentation

1. Véhicule, année-modèle, VIN et système de démarrage.
2. Référence WiPro, série et logiciel.
3. Révision de la notice véhicule utilisée.
4. DIP réel et chaque reprise avec connecteur, broche et signal.
5. Alarme acoustique installée.
6. Résultat des tests portes, radio, clignotants, alarme et centralisation.
7. Information écrite au client sur l'absence actuelle de commande de centralisation.

## Sources

- Page THITRONIK actuelle « WiPro III safe.lock », liste véhicules, données et FAQ ; vérifiée le 22/07/2026.
- `H:/Thitronik WIKI (ml)/wiki/de/wipro_iii_safe.lock.pdf` — notice rapide générale rév. `1.3`, deux pages contrôlées textuellement et visuellement.
- Les anciens fichiers CSV/DOCX manquent localement et n'ont pas servi de preuve.

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons]]
- [[Sirènes et klaxons — moyens d'alarme acoustiques]]
- [[Émetteur radio 868 — télécommande pour WiPro III]]
- [[Module NFC — commande de la WiPro via NFC]]
- [[VW Crafter / MAN TGE (2017-2024, sans bouton de démarrage)]]
