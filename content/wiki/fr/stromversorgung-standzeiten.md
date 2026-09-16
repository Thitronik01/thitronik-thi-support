---
title: >-
  Alimentation électrique & temps d'immobilisation — courant de repos,
  sous-tension et pratique de charge
sources:
  - sources/Stromverbrauch.docx
  - wiki/wipro-iii.md
  - wiki/pro-finder.md
updated: '2026-07-15'
confidence: high
lang: fr
translation_of: sources/stromversorgung-standzeiten.md
---

# Alimentation électrique & temps d'immobilisation — courant de repos, sous-tension et pratique de charge

Page transversale pour les cas de support concernant les **batteries de démarrage déchargées**, les **immobilisations prolongées** et le comportement en sous-tension du [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]].

---

## Valeurs indicatives pour les composants THITRONIK en veille

| Composant | Valeur indicative | Classification |
|------------|-----------|------------|
| WiPro III safe.lock | env. **11 mA** | courant de repos de la centrale d'alarme en veille |
| Pro-Finder | env. **16–25 mA** | selon l'état de fonctionnement du module de téléphonie mobile |
| Combinaison | env. **27–36 mA** | composants THITRONIK uniquement, **sans** la charge de base du véhicule |

> **Important :** ces valeurs ne décrivent que les composants THITRONIK. L'antidémarrage, les calculateurs, les récepteurs radio, les systèmes de porte ou d'autres courants de fuite du véhicule s'y ajoutent.

---

## Pourquoi la batterie de démarrage peut malgré tout se décharger

- Même sans système d'alarme, les véhicules modernes ont leur propre charge permanente.
- Chaque batterie au plomb se décharge en plus d'elle-même.
- La capacité réellement utilisable n'est souvent que d'environ **50–80 %** de la capacité nominale.

### Autodécharge à titre indicatif

| Type de batterie | Valeur typique |
|-------------|----------------|
| Plomb-acide ouverte | env. **5–10 %** de perte de capacité par mois à température ambiante |
| AGM | environ **deux fois plus lente** |

---

## Exemple de calcul

Avec une charge permanente de **50 mA**, environ **1,2 Ah** sont consommés par jour.

| Hypothèse | Résultat |
|---------|----------|
| 60 Ah en calcul pur | env. **50 jours** jusqu'à décharge complète |
| 30 Ah réellement utilisables | env. **25 jours** |
| 48 Ah réellement utilisables | env. **40 jours** |

> **En pratique :** cet exemple de calcul est idéalisé. L'état de la batterie, la température, le type de batterie et les charges supplémentaires du véhicule raccourcissent souvent nettement l'autonomie réelle.

---

## Sous-tension sur le Pro-Finder

- À une tension d'alimentation de **11,2 V**, le Pro-Finder envoie un SMS d'avertissement.
- L'appareil passe ensuite dans un **état de pause / de veille** et n'envoie ni ne reçoit plus de commandes.
- À partir de ce moment, la batterie doit être rechargée rapidement afin d'éviter des dommages aux cellules.
- Pour les autres seuils de tension et le retour au fonctionnement normal, voir [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]].

---

## Recommandations pratiques pour les immobilisations prolongées

- Garer le véhicule avant l'immobilisation avec une batterie de démarrage aussi pleine que possible.
- Selon l'état de la batterie, prévoir une charge de maintien **au plus tard après environ deux semaines**.
- En cas d'immobilisations longues et régulières, envisager une batterie plus grande, une capacité supplémentaire ou une charge de maintien par solaire/chargeur.
- Après un avertissement à 11,2 V, ne pas laisser la batterie sans surveillance plus longtemps.

---

## Classification pour les cas de support

| Affirmation | Signification |
|---------|-----------|
| « Seul le système d'alarme a vidé la batterie. » | En règle générale trop réducteur ; ce qui est déterminant, c'est la somme de la consommation THITRONIK, de la charge de base du véhicule, de l'autodécharge et de l'état de la batterie. |
| « Le Pro-Finder ne réagit soudainement plus. » | Après une sous-tension, l'appareil peut être en veille ; vérifier d'abord la tension de la batterie. |
| « Le véhicule reste immobilisé pendant de nombreuses semaines. » | Sans charge de maintien, c'est un problème général de batterie, et pas seulement un problème du système d'alarme. |

---

## Articles associés

- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[Dépannage — problèmes fréquents & solutions]]
