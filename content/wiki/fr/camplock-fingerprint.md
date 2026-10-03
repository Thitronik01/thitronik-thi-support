---
title: CampLock Fingerprint - acces biometrique
sources:
  - https://www.thitronik.de/news-und-termine/news/wichtige-information-zu-camplock-und-vanlock-fingerprint/
  - content/quellen/camplock-fingerprint.pdf
  - content/quellen/camplock-vanlock-fingerprint.pdf
  - content/quellen/katalog_thitronik_de.pdf
updated: 2026-10-02
confidence: medium
dealerStatus: approved
lang: fr
translation_of: wiki/de/camplock-fingerprint.md
---

# CampLock Fingerprint - acces biometrique

CampLock Fingerprint permet de verrouiller et de déverrouiller par empreinte digitale. Les portes commandées et le système WiPro prévu dépendent de la **référence de l’appareil**. Le verrouillage et l’alarme sont deux fonctions distinctes ; elles fonctionnent ensemble après l’appairage de CampLock avec la WiPro compatible.

## Avis constructeur : garder la clé du véhicule

Avis constructeur du **27.07.2026** : des conditions de tension défavorables peuvent perturber le verrouillage centralisé. **Garder la clé du véhicule sur soi.** Cet avis ne précise ni les séries concernées ni une version de mise à jour disponible. ([THITRONIK, Abruf 02.10.2026](https://www.thitronik.de/news-und-termine/news/wichtige-information-zu-camplock-und-vanlock-fingerprint/))

## Quelle version est installée ?

| Référence CampLock | Notice et fonction décrite |
|---|---|
| **106111 / 106144** | Le guide rapide CampLock décrit de nombreuses portes de cellule Hartal à verrouillage centralisé. Avec **WiPro III** : verrouillage/déverrouillage de la porte et activation/désactivation de l’alarme. Avec **WiPro III safe.lock** : verrouillage/déverrouillage de l’ensemble du véhicule et activation/désactivation de l’alarme. |
| **106111-002 / 106144-002** | La notice commune CampLock/VanLock décrit l’utilisation avec **WiPro III safe.lock** : verrouillage/déverrouillage du véhicule et activation/désactivation de l’alarme. Elle ne confirme ni la compatibilité avec une WiPro III sans safe.lock, ni celle avec un modèle précis de porte Hartal. |

L’ancien guide rapide précise aussi que CampLock transmet à l’alarme associée l’état ouvert ou fermé de la porte de cellule Hartal. Un contact magnétique radio supplémentaire n’est alors pas nécessaire sur cette porte. La notice commune ne formule pas cette indication pour la version **-002**. (Guide rapide, p. 2 du PDF physique ; notice commune, p. 20–21 du PDF physique.)

## Enregistrer les doigts et appairer la WiPro

1. **Vérifier la référence et la configuration du véhicule.** Le montage et le raccordement électrique doivent être effectués par du personnel qualifié. Ces notices d’utilisation ne donnent pas de brochage propre au véhicule ; il faut suivre la notice d’installation correspondante. (Guide rapide, p. 2 du PDF ; notice commune, p. 21 du PDF.)
2. **Enregistrer au moins un doigt.** Pour les références 106111/106144, fermer d’abord la porte de cellule Hartal : la LED du capteur s’allume en jaune. Pour les références 106111-002/106144-002, elle s’allume automatiquement en jaune lors de la première mise en service. Poser le nouveau doigt **15 fois de suite** sur le capteur. Après l’enregistrement, la LED clignote cinq fois en vert. Les deux premiers doigts enregistrés deviennent automatiquement des **doigts maîtres**. (Guide rapide, p. 2 du PDF ; notice commune, p. 22 du PDF.)
3. **Enregistrer d’autres doigts.** Pour **106111/106144 sans -002, fermer d’abord la porte de cellule Hartal**. Maintenir un doigt maître déjà enregistré sur le capteur pendant environ cinq secondes, jusqu’à ce que la LED s’allume en jaune. Poser le nouveau doigt 15 fois de suite ; cinq clignotements verts confirment l’enregistrement. La mémoire accepte **16 doigts au maximum au total**, y compris les deux doigts maîtres : il ne s’agit pas de 16 utilisateurs supplémentaires. (Guide rapide, p. 2 du PDF ; notice commune, p. 23 et 28 du PDF.)
4. **Appairer CampLock avec la WiPro.** Activer le mode d’appairage de la WiPro prise en charge en suivant sa notice. Avec les références **-002**, déclencher une transmission en utilisant un doigt déjà enregistré. Avec les références sans suffixe **-002**, l’ouverture ou la fermeture de la porte Hartal peut également déclencher une transmission ; la transmission **par le capteur** exige toutefois que la porte soit fermée. Un bref signal sonore de la WiPro et l’extinction de sa LED d’état pendant environ une seconde confirment l’appairage. Quitter ensuite le mode d’appairage de la WiPro. (Guide rapide, p. 1–2 du PDF ; notice commune, p. 24 du PDF.)

Pour tester la version **-002**, fermer toutes les portes, verrouiller avec un doigt enregistré, vérifier toutes les portes commandées et le clignotement de la LED d’état de la WiPro, puis déverrouiller avec le doigt et contrôler la désactivation de l’alarme. L’ancien guide rapide propose aussi un test d’alarme : verrouiller la porte de cellule avec le doigt, puis l’ouvrir avec la clé mécanique ; son ouverture doit déclencher l’alarme. (Guide rapide, p. 1 du PDF ; notice commune, p. 24 du PDF.)

## Utilisation et signaux lumineux

| LED du capteur | Signification et réaction |
|---|---|
| **Cinq clignotements verts** | Doigt reconnu ou enregistrement réussi. En fonctionnement, le verrouillage change d’état et l’alarme appairée s’active ou se désactive. |
| **Clignotement rouge après la lecture** | Doigt non reconnu. Le verrouillage et l’alarme conservent leur état. |
| **Voyant jaune pendant l’enregistrement** | Le capteur est prêt à enregistrer un doigt. |

(Guide rapide, p. 1–2 du PDF ; notice commune, p. 22–23 et 25 du PDF.)

## Effacer tous les doigts

Les notices ne décrivent **aucun effacement individuel** : tous les doigts enregistrés, y compris les doigts maîtres, sont supprimés. Un doigt maître déjà enregistré est nécessaire. Pour les références sans suffixe **-002**, fermer d’abord la porte de cellule. (Guide rapide, p. 1 du PDF ; notice commune, p. 26–27 du PDF.)

1. Maintenir le doigt maître sur le capteur pendant **dix secondes**. La LED devient jaune après environ cinq secondes, puis rouge cinq secondes plus tard.
2. Retirer le doigt ; la LED clignote en rouge.
3. Dans les **dix secondes**, reposer le même doigt maître pour confirmer l’effacement. Sans confirmation, l’opération est annulée.
4. Après l’effacement, la LED devient jaune. Enregistrer un nouveau doigt maître comme lors de la première mise en service.

(Guide rapide, p. 1 du PDF ; notice commune, p. 26–27 du PDF.) Si aucun doigt maître n’est encore disponible, ces notices ne décrivent pas d’autre effacement depuis le capteur ; consulter THITRONIK ou un professionnel qualifié.

## Sécurité et caractéristiques techniques

Le capteur d’empreintes **ne remplace pas un déverrouillage mécanique de secours**. Une autre possibilité d’ouverture doit rester disponible à tout moment ; une batterie de véhicule déchargée peut empêcher l’accès électronique. Débrancher la batterie du véhicule avant toute installation, maintenance ou intervention de service. Pour la porte Hartal décrite dans le guide rapide, maintenir les broches de contact propres et conductrices. Pour le câblage et la fixation, respecter les notices d’installation et les consignes propres au véhicule. (Guide rapide, p. 2 du PDF ; notice commune, p. 21 du PDF.)

| Caractéristique | Valeur |
|---|---|
| Alimentation | 12–24 V CC |
| Consommation | 1,2 mA sous 12 V. **Divergence non résolue sous 24 V pour 106111/106144 :** guide rapide 1,7 mA, catalogue 0,6 mA. Pour -002, la notice commune indique 1,7 mA. Aucune valeur de 24 V confirmée sans ambiguïté pour la version sans -002. |
| Radio | 868,35 MHz ; jusqu’à 150 m en champ libre |
| Boîtier de commande / capteur | 100 × 71 × 22 mm ; capteur CampLock Ø 41 mm, longueur 53 mm |
| Mémoire / indice de protection | Jusqu’à 16 doigts au total, dont les deux premiers deviennent maîtres ; IP67 |
| Poids selon l’ancien guide rapide | Environ 156 g **sans le deuxième faisceau de câbles** |
| Poids selon la notice commune pour CampLock -002 | Environ 213 g |

(Guide rapide, p. 1 du PDF ; notice commune, p. 28 du PDF.) Seule l’ancienne valeur précise qu’elle exclut le deuxième faisceau de câbles. Ces deux indications de poids ne doivent pas être fusionnées.

## Divergence : consommation sous 24 V

Pour **CampLock 106111/106144 sans -002**, le guide rapide indique **1,7 mA sous 24 V**, contre **0,6 mA sous 24 V** dans le catalogue allemand. Les deux indications concernent les mêmes références. La notice commune indique également 1,7 mA pour **106111-002/106144-002**. La divergence ne peut donc pas être expliquée simplement par une évolution entre l’ancienne version et la version -002. (Guide rapide, p. 1 physique du PDF ; catalogue, p. 25 physique, p. 49 imprimée ; notice commune, p. 28 du PDF.)

Cette divergence entre les sources reste **non résolue**. Avant de donner une valeur définitive, vérifier la référence et la version de la notice fournie avec l’appareil, puis faire confirmer la consommation par THITRONIK. La date de création d’un PDF ne prouve pas une modification matérielle.

## Étape d’effacement différente dans le guide anglais

Dans la version anglaise de l’ancien guide rapide, le voyant devient jaune après dix secondes lors de l’effacement. Les versions allemande et française indiquent **cinq secondes jusqu’au jaune, puis cinq secondes supplémentaires jusqu’au rouge**. La version anglaise de la notice commune confirme aussi cinq plus cinq secondes. La procédure décrite ici suit les versions DE/FR concordantes ; la ligne anglaise divergente ne justifie pas un délai supplémentaire. (Guide rapide, p. 1 physique du PDF, panneau imprimé 11 ; notice commune, FR p. 26–27, DE p. 8–9, EN p. 17–18.)

## Sources et versions

- `camplock-fingerprint.pdf` : guide rapide CampLock de deux pages, références **106111/106144**, révision 1.0, PDF créé le 18/03/2026. La p. 2 physique contient le début de la notice ; la p. 1 en poursuit les étapes.
- `camplock-vanlock-fingerprint.pdf` : notice commune multilingue, références CampLock **106111-002/106144-002**, révision 1.0, PDF créé le 02/07/2026. Partie française aux p. 20–28 physiques du PDF ; partie allemande aux p. 2–10.
- `katalog_thitronik_de.pdf` : CampLock 106111/106144 à la p. 25 physique, p. 49 imprimée ; consommation divergente sous 24 V. Le catalogue ne prouve pas une modification matérielle.

## Voir aussi

- [[Zugangsmedien & Bedienung]]
- [[WiPro III]]
- [[Funk-Handsender]]
- [[VanLock Fingerprint]]
