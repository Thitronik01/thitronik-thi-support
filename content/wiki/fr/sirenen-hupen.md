---
title: Sirènes et klaxons — moyens d'alarme acoustiques
sources:
  - sources/Back-up_Sirene__100089__Guide__Anschluss_DE.md
  - sources/zusatzsirene_anleitung.pdf
  - sources/zusatzhupe.pdf
  - sources/Sirene.docx
  - sources/FAQ_Back-up_Sirene__100089_DE.md
  - sources/FAQ_Zusatzhupe_105339_DE.md
updated: '2026-07-15'
confidence: high
lang: fr
translation_of: sources/sirenen-hupen.md
---

# Sirènes et klaxons — moyens d'alarme acoustiques

Pour l'alarme acoustique, Thitronik propose les produits suivants, qui remplissent chacun un rôle différent.

---

## Vue d'ensemble

| Produit | Réf. | Rôle |
|---------|----------|-------|
| Sirène de secours | 100089 | Sirène avec batterie interne — indépendante de la batterie du véhicule |
| Sirène de secours 24V | 105267 | Comme la 100089, mais pour les véhicules 24V (châssis de camion) |
| Sirène supplémentaire | 100190 | Sirène externe supplémentaire sans batterie propre |
| Klaxon supplémentaire | 105339 | Fonction klaxon pour les véhicules sans klaxon utilisable en cas d'alarme |

---

## Consignes de raccordement importantes

> **⚠️ CRITIQUE — Un raccordement incorrect produit un son continu :**
> Les klaxons supplémentaires (klaxon du véhicule ou klaxon supplémentaire) doivent être raccordés à la **broche 9 (câble rose)** de la WiPro III — et **non** à la broche 15 (câble blanc). En cas de raccordement à la broche 15, le klaxon retentit en **son continu** lors d'une alarme au lieu de l'intervalle souhaité.

> **Relais obligatoire pour les klaxons neufs :** si un nouveau klaxon non monté d'usine est installé, un relais **doit impérativement** être intercalé. Sans relais, le klaxon se déclenche de manière intempestive lors du désarmement du système d'alarme.

---

## Sirène de secours (Art. 100089)

### Fonction

La sirène de secours possède une **batterie intégrée** (autoalimentation). Elle donne l'alarme même lorsque la batterie du véhicule est débranchée ou déchargée.

**États de fonctionnement (affichage LED) :**

| État | LED |
|--------|-----|
| Alarme | rouge |
| Secours (batterie active) | — |
| Charge | — |

### Raccordement

Alimentation : **8–30 V DC**

| Câble | Raccordement |
|-------|-----------|
| Rouge (+12V, borne 30) | Plus permanent — charge en permanence la batterie interne |
| Noir (GND, borne 31) | Masse du véhicule |
| Blanc (déclenchement/alarme) | **WiPro III : broche 15** (sirène +12 V) |
| Bleu (déclenchement négatif) | **Non nécessaire → isoler** |

Sources de déclenchement (au choix) : WiPro III / WiPro III safe.lock, G.A.S.-pro, G.A.S.-pro III, position de clé borne 15

> **Remarque :** **isoler** les fils de déclenchement non utilisés. La sirène de secours ne retentit que si elle a été activée via l'interrupteur à clé.

### Position de la clé — alarme ou charge

L'interrupteur à clé possède deux positions. **Dans les deux positions**, la sirène est déclenchée par la WiPro III en cas d'alarme. La différence réside dans la **fonction batterie/secours :**

| Position de la clé | Alarme via WiPro | Fonction de secours interne | La batterie se charge |
|-------------------|:---------------:|:------------------------:|:-----------------:|
| Position **« Arrêt/Charge »** | ✅ | ❌ (pas d'alarme autonome en cas de coupure du câble) | ✅ |
| Position **« Actif/Armé »** | ✅ | ✅ (en cas de sabotage ou de coupure du câble, la sirène se déclenche d'elle-même) | ❌ |

> **Important :** avant de partir en voyage, tourner la clé en position active afin que la fonction antisabotage soit armée. Pour les immobilisations prolongées avec chargeur branché (hiver), laisser l'interrupteur en position de charge afin d'éviter une décharge profonde de la batterie interne.

---

## Sirène supplémentaire (Art. 100190)

### Fonction

Sirène supplémentaire externe sans batterie propre. Fonctionne en parallèle de la sirène de la WiPro III.

Alimentation : **8–30 V DC**

### Raccordement

- WiPro III : broches 15 et 16
- WiPro III safe.lock : broches 15 et 16
  - > La broche 16 est déjà occupée → **raccorder en parallèle**
- G.A.S.-pro : broche 16
- G.A.S.-pro III : broche 16

---

## Klaxon supplémentaire (Art. 105339)

### Fonction

Pour les véhicules dont le **klaxon ne peut pas être commandé en cas d'alarme** (p. ex. Sprinter, T5, T6 — klaxon actif uniquement avec le contact mis).

> **IMPORTANT :** la notice de montage s'adresse aux **ateliers de service professionnels**. Des connaissances appropriées en électronique automobile sont requises. Des interventions non conformes peuvent entraîner des dommages matériels et corporels.

### Consigne de sécurité

Les travaux sur l'électronique du véhicule (en particulier le système d'airbag) sont dangereux et ne doivent être effectués que par un **atelier spécialisé qualifié**.

### Contenu de la livraison

- Relais précâblé (plus permanent déjà ponté entre la broche 30 et la broche 86)
- Câble rouge avec cosse à œillet M8 (pour le raccordement à la batterie du véhicule + fusible 15A)
- Klaxon prémonté avec support

**Matériel supplémentaire nécessaire :** câble FLY 2,5 mm², gaine flexible (∅ intérieur 8,5 mm), fusible 15A

### Raccordement

| Broche du relais | Fonction | Raccordement |
|-----------|---------|-----------|
| Broche 30 | Plus permanent | Batterie du véhicule + (via fusible 15A) — déjà pontée avec la broche 86 à la livraison |
| Broche 86 | Bobine du relais | Plus permanent (déjà ponté avec la broche 30) |
| Broche 85 | Bobine du relais | **Broche 9 de la WiPro III** (signal du klaxon, câble rose) |
| Broche 87 | Sortie commutée | Klaxon |

> **ATTENTION :** la disposition des cosses peut varier selon le relais — c'est la **numérotation** des cosses qui fait foi, pas leur position !

### Caractéristiques techniques

| Paramètre | Valeur |
|-----------|------|
| Alimentation électrique | 12 V DC |
| Consommation de courant | env. 8 A |
| Niveau sonore | 115 dB |
| Dimensions (l × H × P) | 90 × 85 × 80 mm |
| Poids | env. 433 g |

---

## Sirène de secours 24V (Art. 105267)

Pour les véhicules avec un **réseau de bord 24V** (p. ex. châssis de camion). Principe de fonctionnement identique à la réf. 100089. Article spécial — absent du catalogue standard.

---

## Types de véhicules sans klaxon utilisable

Véhicules connus dont le klaxon n'est **pas** disponible en cas d'alarme :

| Véhicule | Problème |
|----------|---------|
| Mercedes Sprinter | Klaxon uniquement avec le contact mis |
| VW T5 | Klaxon uniquement avec le contact mis |
| VW T6 | Klaxon uniquement avec le contact mis |
| Mercedes Sprinter VS30 | Klaxon uniquement avec le contact ; de plus : forte insonorisation du compartiment moteur — la sirène interne est souvent peu audible |
| MAN TGE / VW Crafter (2017+) | Klaxon uniquement avec le contact mis |
| Iveco Daily à partir de l'AM 2019 | Klaxon ne pouvant plus être commandé |

**Recommandation :** monter la sirène de secours dans le compartiment moteur **ou** installer un klaxon supplémentaire. Sur les véhicules fortement insonorisés (p. ex. Sprinter), une **sirène supplémentaire externe** (réf. 100190) est souvent plus efficace qu'un klaxon supplémentaire.

---

## Test / validation

Après le montage d'une sirène ou d'un klaxon, effectuer au minimum les vérifications suivantes :

1. Armer le système et déclencher une véritable alarme de test.
2. Vérifier que l'alarme retentit **par intervalles** et non en son continu.
3. Pour la sirène de secours, contrôler délibérément la position de l'interrupteur à clé :
   - Position **Actif/Armé** pour la protection antisabotage en voyage
   - Position **Arrêt/Charge** pour la charge ou l'hivernage
4. Pour le klaxon supplémentaire, s'assurer que le relais est correctement câblé et que le klaxon ne se déclenche **pas** de manière intempestive lors du désarmement.

---

## Articles associés

- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[G.A.S.-pro III — Avertisseur de gaz pour véhicules de loisirs]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
