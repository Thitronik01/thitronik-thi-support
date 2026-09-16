---
title: Émetteur radio 868 — télécommande pour WiPro III
sources:
  - sources/einleger_funk_handsender_2_101064_ce.pdf
  - sources/Funk-Handsender_868__101064__Overview_DE.md
  - sources/Funk-Handsender_868__101064__Reference__Technische_Daten_DE.md
  - sources/wipro_iii-installationsanleitung_1.8.pdf
  - sources/Funk Zubehör.docx
  - sources/Fragen zu Funk-Handsender 868.pdf
updated: '2026-07-18'
confidence: high
lang: fr
translation_of: sources/funk-handsender.md
---

# Télécommande radio 868 — commande à distance de WiPro III

**Réf. 101064**

La télécommande radio 868 est un dispositif de commande à distance alimenté par pile destiné à la **gamme WiPro III**. Elle permet d’armer ou de désarmer le système d’alarme et de déclencher une alarme panique. Elle n’est pas compatible avec d’autres systèmes radio.

Avec une **WiPro III safe.lock**, la télécommande peut également commander le verrouillage centralisé. Le verrouillage ou le déverrouillage effectif du véhicule dépend du profil du véhicule, du raccordement et de la version logicielle.

> **IMPORTANT :** L’armement/désarmement et le verrouillage/déverrouillage sont des opérations distinctes. Avec une WiPro III standard, la télécommande commande le système d’alarme. Le verrouillage centralisé n’est commandé qu’avec un raccordement safe.lock compatible.

---

## Caractéristiques techniques

| Paramètre | Valeur |
|-----------|--------|
| Alimentation électrique | 1 × pile bouton CR2032, 3 V |
| Fréquence d’émission | 868,35 MHz |
| Puissance d’émission | < 10 mW |
| Portée | jusqu’à 75 m en champ libre |
| Autonomie de la pile | généralement environ 2 ans |
| Nombre de codes | > 4 milliards |
| Température de fonctionnement | −10 °C à +60 °C |
| Poids | environ 20 g |
| Dimensions | 67 × 35 × 15 mm |

La portée indiquée est une valeur mesurée en champ libre. Les structures métalliques, la position de montage et d’autres obstacles peuvent réduire considérablement la portée à l’intérieur ou autour du véhicule.

---

## Touches et signaux de confirmation

La télécommande possède une touche avec un symbole de haut-parleur et une touche avec un symbole de haut-parleur barré. Chacune des deux touches permet d’armer ou de désarmer WiPro ; elles se distinguent par la confirmation sonore.

| État initial | Action | Résultat | Confirmation habituelle |
|--------------|--------|----------|-------------------------|
| Système désarmé | appuyer sur l’une des deux touches | le système est armé | 1 clignotement des feux de détresse ; la touche avec haut-parleur produit également 1 signal sonore ; la LED d’état clignote |
| Système armé | appuyer sur l’une des deux touches | le système est désarmé | 2 clignotements des feux de détresse ; la touche avec haut-parleur produit également 2 signaux sonores ; la LED d’état s’éteint |

La confirmation par les feux de détresse et la commande du verrouillage centralisé nécessitent une installation adaptée au véhicule.

### Particularité de WiPro III safe.lock

Avec un raccordement safe.lock compatible, deux opérations sont généralement associées :

- armement et verrouillage
- désarmement et déverrouillage

La fonction exacte dépend du véhicule et de la version logicielle. En mode camping notamment, il faut tenir compte de la méthode de verrouillage utilisée auparavant ; les instructions spécifiques au véhicule font foi.

---

## Alarme panique

L’alarme panique peut être déclenchée lorsque le système est armé ou désarmé. Elle active la sirène, les feux de détresse et — selon le véhicule — éventuellement le klaxon du véhicule.

| Numéro de série de la télécommande | Déclenchement de l’alarme panique |
|------------------------------------|----------------------------------|
| à partir de `0756-063` | appuyer simultanément sur les deux touches |
| avant `0756-063` | maintenir une touche enfoncée, puis appuyer sur la seconde |

Pour arrêter l’alarme panique, appuyer sur l’une des deux touches de la télécommande radio.

Si un Pro-Finder est raccordé et configuré en conséquence, l’alarme manuelle est également transmise.

---

## Mémorisation de la télécommande dans WiPro III

Une nouvelle télécommande doit être mémorisée dans WiPro III avant son utilisation. Tant qu’elle n’est pas mémorisée, la centrale ne peut pas interpréter ses signaux radio.

### Directement sur la centrale WiPro III

1. Vérifier que le connecteur à 20 broches est branché sur la centrale WiPro III.
2. Maintenir le bouton **« B »** de la face avant du boîtier enfoncé jusqu’à ce qu’un long signal sonore retentisse et que la LED d’état reste allumée.
3. Appuyer sur une touche de la télécommande radio.
4. Attendre le bref signal sonore de confirmation ; la LED d’état s’éteint brièvement.
5. Pour terminer, appuyer brièvement sur le bouton **« B »**. Un double signal sonore retentit et la LED d’état s’éteint.

La première télécommande radio mémorisée devient la **télécommande maître**. Elle est nécessaire pour certaines procédures Easy-Add et d’effacement.

Les autres méthodes de mémorisation, leurs conditions et les procédures d’effacement sont décrites dans [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus de mémorisation]].

---

## Contrôle et remplacement de la pile

La télécommande radio utilise une **pile bouton CR2032 de 3 V**. Sa durée de vie habituelle est d’environ deux ans ; de longues périodes de froid peuvent la réduire.

### Signal de pile faible

Lorsque la pile de la télécommande est faible, WiPro fournit les indications suivantes après l’utilisation de la télécommande :

- Un signal d’avertissement retentit pendant environ **2 secondes** au niveau de la centrale WiPro III.
- La LED d’émission rouge de la télécommande ne s’éteint qu’après environ **30 secondes**.

### Remplacement de la pile

1. Retirer les vis du boîtier et ouvrir la télécommande.
2. Retirer la pile bouton usagée.
3. Insérer une pile neuve **CR2032, 3 V** en respectant la polarité.
4. Éviter de toucher les surfaces de contact de la pile bouton avec les doigts nus.
5. Refermer le boîtier et remettre les vis en place.
6. Contrôler le fonctionnement sur le véhicule.

Il n’est **pas nécessaire de mémoriser à nouveau** la télécommande après le remplacement de la pile.

> **ATTENTION :** Un remplacement incorrect de la pile présente un risque d’explosion. Utiliser uniquement le type de pile prévu, respecter la polarité et déposer les piles bouton usagées dans un point de collecte pour piles.

Si un composant radio alimenté par une pile CR2032 signale une pile faible, contrôler rapidement les autres piles bouton du même âge. Cela concerne notamment les télécommandes radio, les contacts magnétiques radio et les boucles de câble radio ; d’autres accessoires peuvent utiliser une alimentation différente.

---

## Dépannage

| Observation | Cause possible | Mesure à prendre |
|-------------|----------------|------------------|
| Aucune réaction lorsque l’on appuie sur une touche | télécommande non mémorisée | mémoriser la télécommande selon la procédure prévue |
| Signal de 2 secondes ; la LED d’émission rouge reste longtemps allumée | pile CR2032 faible | remplacer la pile et contrôler le fonctionnement |
| Fonctionnement uniquement à courte distance | pile faible ou liaison radio masquée | contrôler la pile ; modifier la distance et la position par rapport à WiPro III |
| Le système d’alarme peut être commandé, mais le véhicule ne se verrouille ou ne se déverrouille pas | raccordement safe.lock absent ou incompatible | faire contrôler le profil du véhicule, le câblage et la version logicielle |
| L’alarme panique ne démarre pas | la combinaison de touches ne correspond pas à la plage de numéros de série | vérifier le numéro de série et utiliser la séquence de touches correspondante |

Si un problème de portée ou de commande persiste, relever à l’intention du service d’assistance les numéros de série complets de WiPro III et de la télécommande, l’état de la pile, les données du véhicule et les informations sur l’installation.

---

## Questions fréquentes (FAQ)

**Avec quels systèmes la télécommande radio 868 est-elle compatible ?**  
Avec la gamme WiPro III. Son utilisation avec d’autres systèmes radio n’est pas prévue.

**La télécommande verrouille-t-elle toujours également le véhicule ?**  
Non. Elle arme ou désarme le système d’alarme. Le verrouillage centralisé n’est commandé qu’avec un raccordement WiPro III safe.lock compatible et un profil de véhicule adapté.

**Quelle pile faut-il utiliser ?**  
Une pile bouton CR2032 de 3 V. Sa durée de vie habituelle est d’environ deux ans.

**Faut-il mémoriser à nouveau la télécommande après le remplacement de la pile ?**  
Non. Après le remplacement, il suffit de contrôler la polarité, le montage du boîtier et le fonctionnement.

**Comment reconnaître une pile faible ?**  
Lors de l’utilisation de la télécommande, un signal retentit pendant environ 2 secondes au niveau de la centrale WiPro III et la LED d’émission rouge reste allumée pendant environ 30 secondes.

**Comment arrêter une alarme panique ?**  
Appuyer sur l’une des deux touches de la télécommande radio.

---

## Conformité et mise au rebut

Selon le fabricant, la télécommande radio est conforme aux exigences de la directive **2014/53/UE**. La déclaration de conformité est disponible dans la rubrique d’assistance de THITRONIK : `https://www.thitronik.de/support`

Ne pas jeter l’appareil ni les piles usagées avec les ordures ménagères. Déposer séparément les piles bouton dans un point de collecte pour piles.

---

## Articles associés

- [[WiPro III — système d'alarme radio pour véhicules de loisirs|WiPro III]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III|Processus de mémorisation]]
- [[Supports d’accès et commande — voies d’accès dans le système THITRONIK|Supports d’accès et commande]]
- [[Contact radiomagnétique 868 — montage et fonctionnement|Contact magnétique radio 868]]
- [[Boucle de câble radio 868 — sécurité externe pour marchandises mobiles|Boucle de câble radio 868]]
- [[Pro-Finder — Module de télémétrie GSM/GPS|Pro-Finder]]
