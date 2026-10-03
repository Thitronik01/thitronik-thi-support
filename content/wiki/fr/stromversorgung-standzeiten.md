---
title: "Alimentation électrique & temps d'immobilisation — courant de repos, sous-tension et pratique de charge"
sources:
  - "content/quellen/profinder-ab045-handbuch-rev1.3.pdf"
  - "content/quellen/profinder-ab045-kurz-rev1.3.2.pdf"
  - "content/quellen/profinder-handbuch-rev2.6.pdf"
  - "content/quellen/profinder-faq.pdf"
  - "sources/Stromverbrauch.docx"
  - "content/wiki/de/wipro-iii.md"
  - "content/wiki/de/pro-finder.md"
updated: '2026-09-28'
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
| Pro-Finder à partir de -045, rév. 1.3 | env. **16–21 mA** normal ; env. **37 mA** en recherche réseau | PDF p. 76 ; ne pas assimiler à une faible consommation GPS en veille |
| Pro-Finder, ancienne rév. 2.6 | env. **21 mA** normal | PDF p. 53 |
| Combinaison avec hypothèse WiPro 11 mA | calcul **27–32 mA** en fonctionnement normal du Pro-Finder | 11 + 16–21 mA ; pas une mesure globale, **sans** charge de base du véhicule |

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

Les notices rév. 2.6 et rév. 1.3 excluent explicitement le **mode B de l’avertissement de tension**. Pour la fonction décrite, une alimentation **durablement inférieure à 11,2 V** déclenche un avertissement et la mise en veille. Le retour au fonctionnement normal se fait **au-dessus de 12,5 V**. Ce n’est pas un déclenchement exactement à 11,2 V ni une validation des mêmes seuils pour toute installation 24 V.

En cas d’absence de réponse, contrôler l’alimentation à l’appareil, la batterie et la charge. Ne pas promettre un SMS de sous-tension en mode B ; cette exception ne prouve pas non plus l’absence de toutes les protections dans ce mode. Retirer plusieurs fois le fusible ne corrige pas la cause. Sources : rév. 2.6, PDF p. 47 / DE 12 ; rév. 1.3, PDF p. 70 / DE 19.

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
