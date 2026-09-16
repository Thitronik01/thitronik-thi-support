---
title: >-
  Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant
  escalade
sources:
  - sources/Support Fragen.csv
  - wiki/seriennummern-softwarestaende.md
  - wiki/stoerungsbeseitigung.md
  - wiki/fahrzeugkompatibilitaet.md
  - wiki/zugang-bedienung.md
  - wiki/app-befehle.md
  - wiki/abschalteinrichtung.md
updated: '2026-07-15'
confidence: high
lang: fr
translation_of: sources/support-fallaufnahme.md
---

# Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade

Modèle interne destiné à la saisie structurée d’un nouveau dossier d’assistance technique. Il permet de limiter les demandes d’informations complémentaires et d’évaluer le dossier de manière fiable à partir du véhicule, des produits, des numéros de série et du comportement observé.

> **Règle de base :** consigner séparément les observations, le comportement attendu et les mesures déjà effectuées. Armer/désarmer le système d’alarme et verrouiller/déverrouiller le verrouillage centralisé sont deux opérations distinctes.

---

## Informations obligatoires avant l’évaluation technique

### Contact

- nom et prénom
- numéro de téléphone joignable
- adresse e-mail si des documents ou des images doivent être échangés
- pays et réseau mobile actuels si le dossier concerne le Pro-Finder, la carte SIM ou les SMS

### Véhicule

- constructeur et désignation exacte du véhicule de base ou du châssis
- année-modèle ainsi qu’année de fabrication ou date de première immatriculation
- type de carrosserie : fourgon, profilé, intégral, capucine ou liner
- particularités pertinentes, par exemple porte de cellule ou porte arrière, bouton de démarrage ou verrouillage centralisé ajouté ultérieurement

### Système THITRONIK

- désignation exacte de tous les produits THITRONIK concernés
- numéro de série de chaque composant pertinent
- versions logicielles connues
- date et entreprise d’installation, si elles sont connues
- modifications, réparations ou extensions effectuées depuis l’installation

### Description du dysfonctionnement

- comportement attendu et comportement réellement observé
- date de la première apparition
- problème permanent, intermittent ou reproductible de manière fiable
- déclencheur exact et ordre des actions effectuées
- état avant et après le défaut : armé/désarmé et verrouillé/déverrouillé
- si possible, libellé exact de la LED d’état, du code de clignotement, du signal sonore, du message de l’application ou du SMS
- contrôles et mesures déjà effectués, avec leurs résultats

### Éléments justificatifs

- photos lisibles des numéros de série et, le cas échéant, des commutateurs DIP
- photos ou courtes vidéos des indications LED et du comportement reproductible
- pour les questions d’installation, photos des connexions et couleurs de câbles concernées

> **Protection des données :** ne pas enregistrer de mots de passe, de codes PIN SIM complets ni d’autres identifiants dans le dossier. Ne consigner les numéros de téléphone et les images que dans la mesure nécessaire au traitement du dossier.

---

## Informations complémentaires selon le sujet

| Sujet | Informations à relever en plus |
|-------|--------------------------------|
| WiPro III / safe.lock | variante exacte du véhicule, position des commutateurs DIP, mode d’accès utilisé, code de clignotement de la LED d’état et comportement distinct du système d’alarme et du verrouillage centralisé |
| verrouillage centralisé spécifique au véhicule | véhicule de base et année-modèle, portes d’origine et de cellule, bouton de démarrage, clé ou mode d’accès THITRONIK utilisé, ainsi que comportement du verrouillage centralisé, des feux de détresse, du klaxon et de la sirène |
| Pro-Finder / SIM / SMS | numéro de série, opérateur SIM, format de carte, demande du code PIN activée ou désactivée, état de la messagerie et des renvois d’appel, état de la LED, tension d’alimentation, ainsi que libellé exact de la commande envoyée et de la réponse |
| BT-connect / module de mise en réseau Bluetooth | type de module sans ambiguïté, numéro de série, modèle de smartphone, versions du système d’exploitation et de l’application, état de la LED ainsi que couplages existants ou supprimés |
| NFC Modul | numéro de série, type de support d’accès, indication LED, état des piles et ordre des composants déjà mémorisés |
| accessoires radio | composant exact, numéro de série, emplacement de montage, distance par rapport à la centrale WiPro III, support de montage, état de la pile uniquement pour les émetteurs alimentés par pile et nombre d’émetteurs concernés |
| détecteurs de gaz / capteurs | variante exacte du produit, type d’alarme, signaux LED et sonore, emplacement et hauteur de montage, tension d’alimentation ainsi qu’état de l’entrée IGN ou de la borne 15, si présente |
| alimentation électrique / immobilisation prolongée | tension mesurée, type et capacité de la batterie, durée d’immobilisation, état de charge, dispositif de maintien de charge et autres consommateurs du véhicule |
| application / SMS de programmation | versions du système d’exploitation et de l’application, module concerné avec numéro de série, parcours de commande ou commande SMS exacts, message affiché et résultat |
| dispositif d’arrêt | référence du dispositif d’arrêt, numéro de série du Pro-Finder, état de l’installation et motif du contrôle ; ne pas effectuer de test fonctionnel lorsque le véhicule roule |

---

## Modèle à copier-coller dans les dossiers internes

```text
Contact
Nom :
Téléphone :
E-mail :
Pays / réseau mobile :

Véhicule
Constructeur / modèle :
Année-modèle :
Année de fabrication / première immatriculation :
Type de carrosserie / particularités :

Système THITRONIK
Produits installés :
Numéros de série :
Versions logicielles :
Date / entreprise d’installation :
Modifications depuis l’installation :

Description du dysfonctionnement
Comportement attendu :
Comportement réel :
Première apparition :
Reproductibilité :
Déclencheur / ordre des actions :
LED d’état / code de clignotement / signal sonore :
Message de l’application / libellé exact du SMS :
Mesures déjà effectuées et résultats :

Justificatifs / pièces jointes :
```

---

## Contrôle initial avant escalade

1. Vérifier que toutes les informations obligatoires sont présentes.
2. Classer le numéro de série et la version logicielle à l’aide de [[Numéros de série & versions logicielles]].
3. Comparer le profil du véhicule, l’année-modèle et la position des commutateurs DIP avec [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]] et la page du véhicule concerné.
4. Consulter les symptômes courants et les contrôles sûrs dans [[Dépannage — problèmes fréquents & solutions]].
5. Consigner le résultat de chaque contrôle ; ne pas répéter une mesure infructueuse sans modification préalable d’une condition requise.

---

## Escalade immédiate et limites de sécurité

- En présence de fumée, d’une odeur de brûlé, d’un fort échauffement ou d’une alarme de gaz, de CO ou de fumée en cours, éloigner d’abord les personnes et les animaux de la zone dangereuse. Ne pas poursuivre le diagnostic par d’autres essais de commutation ou de fonctionnement sur le véhicule.
- Les interventions sur le réseau de bord, le CAN-Bus, les bornes 15, 30 ou 31 et les sorties liées à la sécurité doivent être confiées à un professionnel qualifié.
- Ne pas désactiver la protection contre les attaques par rejeu, l’Anti-Jamming ou d’autres fonctions de sécurité sans cause documentée ni évaluation des conséquences.
- En cas d’enfermement à l’extérieur, d’immobilisation involontaire du véhicule ou d’alarme incontrôlée, escalader immédiatement le dossier et ne pas lancer d’autres tentatives de commutation à distance.
- Pour le dispositif d’arrêt, utiliser exclusivement la commande documentée `kill` ; `a an` est interdite à cet usage. Toutes les conditions de sécurité indiquées dans [[Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »]] s’appliquent.
- Ne pas donner de réponse définitive sur la compatibilité, le logiciel ou le câblage sans numéro de série fiable ni identification exacte du véhicule.

---

## Renvois

- [[Dépannage — problèmes fréquents & solutions]]
- [[Numéros de série & versions logicielles]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Supports d’accès et commande — voies d’accès dans le système THITRONIK]]
- [[THITRONIK® App — commandes, configuration et dépannage]]
- [[Dispositif d'arrêt - arrêt du moteur via Pro-Finder « Kill »]]
- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
