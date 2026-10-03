---
title: VanLock Fingerprint - acces biometrique
sources:
  - https://www.thitronik.de/news-und-termine/news/wichtige-information-zu-camplock-und-vanlock-fingerprint/
  - content/quellen/camplock-vanlock-fingerprint.pdf
  - content/quellen/katalog_thitronik_de.pdf
updated: 2026-10-02
confidence: medium
dealerStatus: approved
lang: fr
translation_of: wiki/de/vanlock-fingerprint.md
---

# VanLock Fingerprint - acces biometrique

VanLock Fingerprint donne accès par empreinte digitale aux camping-cars et fourgons aménagés. La notice commune à CampLock et VanLock présente les références **106259 et 106260** comme des accessoires de la **WiPro III safe.lock** : après appairage, une empreinte reconnue verrouille ou déverrouille le véhicule tout en armant ou désarmant l'alarme. Le catalogue indique aussi la WiPro III sans safe.lock pour VanLock ; cette divergence est détaillée plus bas, dans la section « Divergence entre les sources et vérification de la version ». (Notice, p. 20–21 et 25 du PDF ; catalogue, p. 25 du PDF)

## Avis constructeur : garder la clé du véhicule

Avis constructeur du **27.07.2026** : des conditions de tension défavorables peuvent perturber le verrouillage centralisé. **Garder la clé du véhicule sur soi.** Cet avis ne précise ni les séries concernées ni une version de mise à jour disponible. ([THITRONIK, Abruf 02.10.2026](https://www.thitronik.de/news-und-termine/news/wichtige-information-zu-camplock-und-vanlock-fingerprint/))

## Portée et conditions préalables

- La notice cite VanLock **106259/106260**. Elle cite également CampLock **106111-002/106144-002**, qui est un autre produit ; elle ne permet pas de conclure au fonctionnement des anciennes versions de CampLock sans suffixe `-002`. (Notice, p. 20 du PDF)
- Pour la commande conjointe par empreinte du verrouillage centralisé et de l'alarme décrite ici, la notice exige une WiPro III safe.lock installée. Le catalogue cite aussi la WiPro III pour les mêmes références VanLock ; cette divergence de compatibilité reste non résolue. Il faut vérifier sur le véhicule quelles portes peuvent effectivement être commandées. (Notice, p. 21 et 24 du PDF ; catalogue, p. 25 du PDF)
- Avant la première utilisation, enregistrer au moins une empreinte sur le capteur, puis appairer séparément VanLock avec l'alarme. (Notice, p. 22 et 24 du PDF)
- Cette notice ne donne ni emplacement de montage ni brochage propre à un véhicule. Pour l'installation, suivre la notice de montage et les prescriptions du véhicule. (Notice, p. 21 du PDF)

## Enregistrer les empreintes et appairer l'alarme

1. À la première mise en service, le voyant du capteur est jaune. Poser le premier doigt **15 fois de suite** sur le capteur. Cinq clignotements verts confirment l'enregistrement. Les deux premières empreintes enregistrées deviennent automatiquement des **empreintes maîtres**. (Notice, p. 22 du PDF)
2. Pour ajouter une empreinte, maintenir un doigt maître déjà enregistré sur le capteur pendant cinq secondes, jusqu'à ce que le voyant devienne jaune. Poser ensuite le nouveau doigt 15 fois de suite ; cinq clignotements verts confirment l'enregistrement. La capacité est de **16 empreintes au total, dont les deux empreintes maîtres**. (Notice, p. 22–23 et 28 du PDF)
3. Activer le mode d'appairage de la WiPro III safe.lock conformément à sa notice. Actionner le capteur VanLock avec un doigt déjà enregistré. Un bref signal sonore et l'extinction du voyant d'état de la WiPro pendant environ une seconde confirment l'appairage radio. Quitter ensuite le mode d'appairage. (Notice, p. 24 du PDF)
4. Pour le contrôle, fermer toutes les portes, verrouiller avec une empreinte enregistrée et vérifier l'état de l'alarme ainsi que toutes les portes commandables. Déverrouiller ensuite par empreinte et vérifier que l'alarme se désarme. (Notice, p. 24 du PDF)

## Utilisation et voyants

| Voyant | Signification |
|---|---|
| Cinq clignotements verts | Empreinte reconnue : le véhicule est verrouillé ou déverrouillé et la WiPro III safe.lock est armée ou désarmée en conséquence. |
| Clignotement rouge | Empreinte non reconnue : le verrouillage et l'état de l'alarme ne changent pas. |
| Voyant jaune fixe | Mode d'enregistrement actif ou attente d'une nouvelle empreinte maître après l'effacement. |

Pour une utilisation normale, poser un doigt enregistré sur le capteur. La portée de 150 m correspond à la liaison radio en champ libre ; elle ne représente pas la distance à laquelle on peut présenter le doigt au capteur. (Notice, p. 22–23, 25 et 28 du PDF)

## Effacer toutes les empreintes

La notice ne décrit pas l'effacement sélectif d'une empreinte : **la procédure supprime toujours toutes les empreintes enregistrées.** (Notice, p. 26–27 du PDF)

1. Laisser un doigt maître enregistré sur le capteur pendant dix secondes. Le voyant devient jaune après cinq secondes, puis rouge après cinq autres secondes.
2. Retirer le doigt. Le voyant clignote en rouge.
3. Dans les dix secondes, présenter de nouveau le même doigt maître pour confirmer l'effacement. Sans cette confirmation, la procédure est annulée.
4. Après l'effacement, le voyant passe au jaune : enregistrer une nouvelle empreinte maître.

Cette procédure nécessite une empreinte maître enregistrée. Si aucune n'est disponible, la notice ne décrit pas d'autre méthode de réinitialisation ; contacter l'assistance THITRONIK. (Notice, p. 26–27 du PDF)

## Données techniques

| Caractéristique | Valeur de la notice commune |
|---|---|
| Références VanLock | 106259 (noir), 106260 (argent) ; couleurs d'après le catalogue, p. 25 du PDF |
| Alimentation | 12/24 V CC |
| Consommation | 1,2 mA sous 12 V CC. **Divergence sous 24 V :** notice 1,7 mA, catalogue 0,6 mA pour les mêmes références ; non résolue. |
| Radio | 868,35 MHz ; portée maximale de 150 m en champ libre |
| Boîtier de commande | 100 × 71 × 22 mm |
| Capteur VanLock | diamètre 50 mm ; longueur 13 mm |
| Poids | **Divergence :** notice env. 219 g, catalogue env. 151 g pour les mêmes références ; non résolue. |
| Mémoire | 16 empreintes au total, dont les deux premières sont maîtres |
| Indice de protection | IP67 |

Les données de la notice figurent à sa p. 28 physique ; les couleurs et les valeurs divergentes du catalogue à sa p. 25 physique, p. 48 imprimée. Les divergences de poids et de consommation sous 24 V restent non résolues ; consulter THITRONIK avant de retenir une valeur définitive.

## Sécurité et premiers contrôles

- Le capteur d'empreintes ne remplace pas une ouverture mécanique de secours. Prévoir un autre moyen d'ouvrir le véhicule, notamment si sa batterie est déchargée. (Notice, p. 21 du PDF)
- Confier le montage et le raccordement à du personnel qualifié. Débrancher la batterie avant l'installation, l'entretien ou une intervention ; protéger les câbles de l'humidité, de la chaleur et des dommages mécaniques. (Notice, p. 21 du PDF)
- Si le voyant du capteur clignote en rouge, l'empreinte n'a pas été reconnue. Utiliser un doigt enregistré ou en ajouter un à l'aide d'une empreinte maître. (Notice, p. 23 et 25 du PDF)
- Si la WiPro ne confirme pas l'appairage par un signal sonore et une brève extinction de son voyant d'état, vérifier son mode d'appairage et l'enregistrement du doigt utilisé. Contrôler séparément le verrouillage, le déverrouillage et l'état de l'alarme. (Notice, p. 24 du PDF)

## Divergence entre les sources et vérification de la version

Le catalogue allemand (p. 25 du PDF, p. 48 imprimée) indique pour **les mêmes références VanLock** une compatibilité avec la WiPro III **et** la WiPro III safe.lock, un poids d'environ **151 g** et une consommation de **0,6 mA sous 24 V**. La notice commune (rév. 1.0 ; p. 21 et 28 du PDF) présente VanLock **uniquement comme accessoire de la WiPro III safe.lock**, avec environ **219 g** et **1,7 mA sous 24 V**. Les documents ne résolvent pas cette contradiction. La notice ne porte aucune date d'édition visible ; la date de création du PDF ne suffit pas à établir une modification matérielle.

Pour une installation donnée, comparer la référence et la version de la notice fournie avec l'appareil. En cas d'écart de compatibilité ou de caractéristiques, demander une confirmation à THITRONIK avant le raccordement. Les procédures d'utilisation et les valeurs techniques ci-dessus suivent la notice commune.

## Voir aussi

- [[WiPro III safe.lock]]
- [[CampLock Fingerprint]]
- [[Anlernvorgang]]
- [[Zugangsmedien & Bedienung]]
