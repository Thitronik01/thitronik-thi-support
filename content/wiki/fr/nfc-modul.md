---
title: Module NFC — commande de la WiPro via NFC
sources:
  - 'https://www.thitronik.de/produkte/produkt/nfc-modul/'
  - sources/nfc_modul-kurzanleitung.pdf
  - sources/NFC Modul.docx
  - sources/Fragen zu NFC Modul.pdf
  - sources/FAQ_NFC-Modul_105299_DE.md
  - sources/NFC-Modul_105299__Overview_DE.md
  - sources/NFC-Modul_105299__Reference__Technische_Daten_DE.md
  - sources/NFC-Modul_105299__Reference__Lieferumfang_Zubehoer_DE.md
  - sources/NFC-Modul_105299__Guide__Montage_Position_Reichweite_DE.md
  - sources/NFC-Modul_105299__HowTo__Inbetriebnahme_Anlernen_DE.md
  - sources/NFC-Modul_105299__HowTo__Bedienung_DE.md
  - sources/NFC-Modul_105299__HowTo__Weitere_Tags_anlernen_DE.md
  - sources/NFC-Modul_105299__HowTo__Tags_loeschen_Reset_DE.md
  - sources/NFC-Modul_105299__HowTo__Batteriewechsel_DE.md
  - sources/NFC-Modul_105299__Reference__Kompatible_Tags_Sicherheit_DE.md
  - >-
    sources/NFC_Modul_105299_DE_RAG_Pack/NFC-Modul_105299__Reference__LED-Zustaende_DE.md
  - wiki/anlernvorgang.md
  - wiki/zugang-bedienung.md
  - wiki/stoerungsbeseitigung.md
updated: '2026-07-16'
confidence: high
lang: fr
translation_of: de/nfc-modul.md
dealerStatus: internal_only
---

# Module NFC — commande de la WiPro via NFC

**Réf. 105299**

Le module NFC est le lecteur alimenté par piles installé sur le véhicule pour les KeyCard, KeyTag et KeyStrap. Il transmet par radio à 868 MHz le déclenchement NFC autorisé à un système d’alarme THITRONIK® compatible. Avec une WiPro III safe.lock appropriée et une connexion véhicule adaptée, il peut également commander le verrouillage centralisé.

> **Délimitation :** le module NFC n’est ni le support d’accès personnel ni une fonction pour smartphone. Les KeyCard, KeyTag et KeyStrap ne fonctionnent comme supports d’accès qu’avec le module.

---

## Caractéristiques techniques

| Paramètre | Valeur documentée |
|---|---|
| Référence | `105299` |
| Communication NFC | DESFire® EV2, ISO 14443-A, 13,56 MHz |
| Fréquence de transmission vers la centrale d’alarme | 868,35 MHz |
| Portée radio en champ libre | jusqu’à 75 m entre le module NFC et la centrale d’alarme |
| Alimentation électrique | 3× piles alcalines AAA (LR03) de 1,5 V chacune ; 4,5 V au total |
| Autonomie des piles | jusqu’à 1 an |
| Température de fonctionnement | –10 °C à +70 °C |
| Dimensions Ø × P | 89 × 19,5 mm |
| Poids | 100 g |
| Supports NFC mémorisables | 14 au maximum au total |

La portée en champ libre n’est pas une valeur garantie dans le véhicule. Les surfaces métalliques, les revêtements de vitre, l’emplacement de montage, les blindages et les autres sources radio peuvent réduire la liaison avec la centrale d’alarme.

---

## Contrôle rapide

- Vérifier que le **module NFC, réf. 105299**, est équipé de trois piles alcalines AAA (LR03).
- Ne pas enregistrer le module NFC comme premier composant radio sur la WiPro ; enregistrer d’abord un émetteur radio 868 comme télécommande principale.
- Avant le montage définitif, enregistrer le module sur le système d’alarme et tester la portée ainsi que les fonctions à l’emplacement prévu.
- Lors de l’enregistrement du module sur la WiPro et de l’ajout d’autres supports NFC, tenir compte des deux mémoires distinctes.
- Pour l’accès régulier, utiliser de préférence des tags d’origine THITRONIK® ; un seul clignotement bleu signale un tag tiers enregistré, mais dépourvu de protection contre la copie.
- N’effectuer une réinitialisation complète des tags qu’en connaissance de cause : elle efface tous les supports enregistrés dans le module NFC.
- Tester séparément l’armement/le désarmement et le verrouillage/déverrouillage.
- Conserver un moyen d’accès de secours indépendant, par exemple l’émetteur radio 868.

---

## Rôle du produit et limites fonctionnelles

Le module NFC utilise deux niveaux radio :

1. Le support personnel communique avec le module en champ proche NFC à **13,56 MHz**.
2. Le module envoie la commande à la centrale d’alarme à **868,35 MHz**.

| Fonction | Condition préalable / classification |
|---|---|
| Armer et désarmer le système d’alarme | système d’alarme compatible, module NFC enregistré sur la centrale et support NFC mémorisé dans le module |
| Verrouiller et déverrouiller le véhicule | WiPro III safe.lock compatible, connexion véhicule prise en charge et version logicielle appropriée |
| Commande sans smartphone | possible ; le support NFC déclenche directement la commande sur le module |
| Commande à une plus grande distance | impossible ; le support doit être placé dans le champ proche NFC du module |

L’armement/le désarmement et le verrouillage/déverrouillage sont des fonctions distinctes. Une détection NFC réussie ne confirme pas automatiquement que le verrouillage centralisé du véhicule concerné peut être commandé.

---

## Compatibilité

La documentation technique du produit mentionne les systèmes d’alarme suivants :

| Système | Fonction de base documentée |
|---|---|
| WiPro III | armement/désarmement |
| WiPro III safe.lock | armement/désarmement ; verrouillage centralisé uniquement avec une connexion véhicule adaptée |
| WiPro easy | commande NFC selon la configuration du système |
| C.A.S. III | répertorié dans les données techniques de compatibilité ; vérifier au préalable l’étendue exacte des fonctions |

Pour obtenir une réponse ferme, il faut vérifier conjointement la variante du système, le profil du véhicule, la connexion et la version logicielle. La commande des portes dépend notamment du véhicule ; une simple désignation de produit ou un élément de commande visible ne suffit pas comme validation. Voir [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]].

---

## Deux mémoires distinctes

| Mémoire | Contenu enregistré | Limite | Opération d’effacement concernée |
|---|---|---|---|
| Mémoire des émetteurs de la WiPro | le module NFC en tant que composant radio 868 MHz | au maximum 100 émetteurs au total avec les autres accessoires radio | effacement partiel ou complet sur la WiPro |
| Mémoire des tags du module NFC | KeyCard, KeyTag, KeyStrap ou tag tiers compatible | au maximum 14 supports NFC au total | réinitialisation complète des tags sur le module NFC |

L’effacement de la mémoire des tags ne doit pas être confondu avec celui de la mémoire des émetteurs de la WiPro. Le remplacement des piles n’efface ni les supports NFC enregistrés ni l’affectation du module à la WiPro.

> **Important après un effacement complet de la WiPro :** enregistrer d’abord un émetteur radio 868. Celui-ci devient la nouvelle télécommande principale. Le module NFC ne doit pas être le premier composant radio nouvellement enregistré ; voir [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]].

---

## Supports NFC et accessoires

| Support | Réf. | Forme | Portée NFC documentée | Sécurité |
|---|---:|---|---:|---|
| KeyCard | `105300` | carte transpondeur | env. 25 mm | tag d’origine THITRONIK® avec protection DESFire® contre la copie |
| KeyTag | `105301` | porte-clés robuste et étanche | env. 20 mm | tag d’origine THITRONIK® avec protection DESFire® contre la copie |
| KeyStrap | `105302`, `105464`–`105470` | bracelet étanche | 15 mm maximum | tag d’origine THITRONIK® avec protection DESFire® contre la copie |
| tag tiers compatible | aucune réf. THITRONIK® | selon le support | selon le tag et le montage | peut être enregistrable, mais reste en principe copiable |

### Variantes KeyStrap

- Taille M : `105302` noir, `105464` blanc, `105466` bleu, `105465` rouge ; tour de poignet maximal de 216 mm.
- Taille L : `105467` noir, `105468` blanc, `105470` bleu, `105469` rouge ; tour de poignet maximal documenté de 232 mm.
- Le KeyStrap est prévu pour les fenêtres ou vitres à simple paroi d’une épaisseur maximale de 15 mm.

Les portées sont des valeurs approximatives. Le matériau et l’épaisseur de la vitre, la position de montage, l’orientation et le support utilisé influencent la détection.

---

## Contenu de la livraison

- Module NFC
- KeyCard THITRONIK®
- Tampon adhésif
- 3× piles alcalines AAA (LR03)
- Guide de démarrage rapide

Les KeyCard, KeyTag et KeyStrap supplémentaires sont des accessoires vendus séparément. Les références et variantes figurent également dans le [[Registre des numéros d’article — produits et accessoires]].

---

## Enregistrer le module NFC sur le système d’alarme

Faire d’abord fonctionner provisoirement le module à l’emplacement de montage prévu. La procédure de base documentée est la suivante :

1. S’assurer qu’un émetteur radio 868 est déjà enregistré comme télécommande principale sur la WiPro.
2. Retirer la languette de protection des piles du module NFC.
3. Démarrer le mode d’apprentissage de la centrale d’alarme compatible. Selon la version du système, cette opération peut être effectuée directement sur la centrale, via Easy-Add ou l’application THITRONIK®.
4. Déclencher le module NFC avec la KeyCard fournie.
5. Attendre la confirmation sonore de la centrale d’alarme.
6. Quitter correctement le mode d’apprentissage de la centrale d’alarme.
7. Tester séparément l’armement/le désarmement et, le cas échéant, le verrouillage/déverrouillage.
8. Ne procéder au montage définitif qu’après un test concluant.

Les désignations dans l’application et la disponibilité d’Easy-Add 3.0 dépendent du système, des accessoires et de la version logicielle. Les procédures complètes pour démarrer et quitter le mode d’apprentissage de la WiPro sont décrites sous [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]].

---

## Montage

- Monter le module NFC dans l’habitacle sec du véhicule, sur la face intérieure d’une vitre appropriée.
- Choisir un emplacement facilement accessible où le support NFC peut être placé de l’extérieur directement devant le lecteur.
- Nettoyer la surface de montage et fixer le module avec le tampon adhésif prévu.
- Laisser le boîtier accessible pour le remplacement des piles, l’enregistrement des tags et la réinitialisation.
- Avant le collage, tester la détection NFC et la liaison 868 MHz à l’emplacement prévu.
- Les vitres épaisses, à parois multiples ou métallisées peuvent nuire à la détection.
- Un pare-brise chauffant peut entraîner une consommation électrique plus élevée et une autonomie réduite des piles.

> **Aucune garantie de portée :** les valeurs indiquées pour les KeyCard, KeyTag et KeyStrap ainsi que les 75 m en champ libre sont des valeurs d’essai ou d’orientation et non une garantie pour un véhicule donné.

---

## Utilisation en fonctionnement normal

1. Placer le support NFC autorisé directement devant la position extérieure du module.
2. Attendre la confirmation par LED, puis retirer le support.
3. Contrôler l’état réel de l’alarme et du verrouillage sur le véhicule.

Après la détection d’un tag, le module NFC attend environ **2 secondes** avant de permettre un nouveau déclenchement. Cela évite qu’une brève présentation du support ne déclenche immédiatement deux commandes opposées.

| Réaction de la LED | Signification en fonctionnement normal |
|---|---|
| clignote 2× en bleu | tag d’origine THITRONIK® enregistré reconnu ; la commande est déclenchée |
| clignote 1× en bleu | tag tiers enregistré reconnu ; la commande est déclenchée, mais le support n’est pas protégé contre la copie |
| clignote rapidement et brièvement en rouge | le support NFC détecté n’est pas enregistré |
| émet 1× un bref éclair bleu | modification du champ détectée, mais aucun support NFC trouvé |
| reste rouge pendant 20 secondes | piles déchargées ou trop faibles ; remplacer les trois piles |

---

## Enregistrer d’autres supports NFC

1. Ouvrir le boîtier du module NFC en le faisant tourner.
2. Maintenir le bouton noir étroit enfoncé pendant au moins **3 secondes**, jusqu’à ce que la LED bleue reste allumée.
3. Présenter individuellement le nouveau support NFC devant le lecteur.
4. Attendre la confirmation de la LED et l’interpréter à l’aide du tableau suivant.
5. Enregistrer les autres supports successivement de la même manière.
6. Pour terminer, appuyer brièvement sur le bouton ; la LED bleue s’éteint.
7. Fermer le boîtier et tester de manière contrôlée chaque support nouvellement enregistré.

| Réaction de la LED en mode d’apprentissage | Signification |
|---|---|
| reste allumée en bleu | mode d’apprentissage actif |
| clignote 2× en bleu | tag d’origine THITRONIK® enregistré avec succès |
| clignote 1× en bleu | tag tiers compatible enregistré ; aucune protection contre la copie |
| clignote rapidement et brièvement en rouge | tag tiers détecté, mais impossible à enregistrer |
| clignote en rouge en continu | mémoire pleine ; aucun support supplémentaire ne peut être enregistré |

Il est possible d’enregistrer au maximum **14 supports NFC** au total. La KeyCard fournie est comprise dans ce nombre ; lorsque la mémoire est pleine, une réinitialisation complète des tags est nécessaire avant l’enregistrement d’un nouveau support.

---

## Effacer tous les supports NFC

Il n’est pas possible d’effacer sélectivement un support enregistré sur le module NFC. En cas de perte d’un support, de support inconnu ou qui n’est plus autorisé, tous les tags doivent être effacés, puis les supports encore nécessaires doivent être enregistrés à nouveau.

1. Ouvrir le boîtier.
2. Maintenir le bouton enfoncé pendant au moins **10 secondes**, jusqu’à ce que la LED bleue clignote rapidement.
3. Relâcher le bouton ; tous les supports enregistrés dans le module NFC sont effacés et le module passe en mode d’apprentissage.
4. Enregistrer ensuite à nouveau, un par un, les KeyCard, KeyTag et KeyStrap nécessaires.
5. Tester de manière contrôlée tous les supports nouvellement enregistrés, puis refermer le boîtier.

> **Respecter la limite de la mémoire :** cette procédure efface la mémoire des tags du module NFC. Elle ne remplace ni l’effacement ni le nouvel enregistrement du module dans la mémoire des émetteurs de la WiPro.

---

## Remplacer les piles

- Utiliser exclusivement **3× piles alcalines AAA (LR03) de 1,5 V chacune**.
- Ne pas utiliser de piles rechargeables ni de piles primaires au lithium.
- Remplacer les trois piles en même temps et respecter la polarité.
- Prévoir un remplacement au moins une fois par an, de préférence avant l’hiver ; les vitres chauffantes et les températures défavorables peuvent nécessiter un remplacement plus précoce.
- Après le remplacement, fermer le boîtier et tester le module avec un support autorisé.
- Éliminer les piles usagées conformément à la réglementation.

Après un déclenchement, la LED rouge reste allumée pendant **20 secondes** lorsque les piles doivent être remplacées. La mémoire est non volatile : après le remplacement des piles, il n’est pas nécessaire de réenregistrer les supports NFC ni le module sur la WiPro.

---

## Sécurité et accès de secours

Les tags d’origine THITRONIK® utilisent DESFire® EV2 sur la base de la norme ISO 14443-A, avec un chiffrement 128 bits et une protection contre la copie. Les tags tiers enregistrés peuvent déclencher une commande, mais n’offrent pas automatiquement cette protection.

- Pour les autorisations d’accès régulières, utiliser de préférence une KeyCard, un KeyTag ou un KeyStrap de THITRONIK®.
- En cas de clignotement bleu unique, consigner le support comme tag tiers copiable.
- En cas de perte d’un support, ne pas se contenter de le rayer d’une liste : effectuer une réinitialisation complète des tags et réenregistrer tous les supports autorisés.
- Avant de quitter le véhicule, vérifier que le système d’alarme et le verrouillage centralisé ont atteint l’état souhaité.
- Emporter au moins un moyen d’accès indépendant, par exemple un émetteur radio 868 ou la clé d’origine, à condition que son utilisation ait été vérifiée pour le profil du véhicule.
- En mode camping et avec des profils de véhicule particuliers, respecter les consignes propres au véhicule concernant la clé d’origine, le mode veille et le verrouillage centralisé.

Les autres voies d’accès et solutions de secours sont répertoriées sous [[Supports d’accès et commande — voies d’accès dans le système THITRONIK]].

---

## Cerner systématiquement les défauts

| Observation | Contrôle sûr / mesure |
|---|---|
| aucune réaction de la LED | vérifier la languette de protection, les trois piles alcalines AAA, leur polarité et leur état |
| émet seulement 1× un bref éclair bleu | recentrer le support et le rapprocher du lecteur ; vérifier l’épaisseur et le matériau de la vitre ainsi que l’orientation |
| clignote rapidement et brièvement en rouge en fonctionnement normal | le support n’est pas enregistré ; vérifier l’autorisation et l’enregistrer si nécessaire dans le module NFC |
| impossible d’enregistrer un tag tiers | ne pas présumer de sa compatibilité ; utiliser un tag d’origine THITRONIK® |
| clignote en rouge en continu en mode d’apprentissage | mémoire des tags occupée par 14 supports ; clarifier les autorisations et effectuer une réinitialisation complète si nécessaire |
| le support est détecté, mais la WiPro ne réagit pas | vérifier si le module NFC est enregistré dans la mémoire des émetteurs de la WiPro ; tester la portée 868 MHz et l’état de la WiPro |
| l’armement fonctionne, mais pas le verrouillage | évaluer les fonctions séparément ; vérifier la variante safe.lock, la connexion véhicule, le profil du véhicule et la version logicielle |
| la LED rouge reste allumée pendant 20 secondes | remplacer les trois piles alcalines AAA, puis effectuer un test de fonctionnement |
| la portée n’est pas fiable à l’emplacement de montage | déplacer le module avant le collage définitif ; vérifier le revêtement de la vitre, les éléments métalliques, le chauffage et l’environnement radio |

D’autres procédures générales de diagnostic figurent sous [[Dépannage — diagnostic sûr des problèmes fréquents]].

---

## Informations à fournir à l’assistance

Pour une évaluation technique, consigner :

- la désignation du produit et la référence `105299`
- le système d’alarme compatible, sa variante et son numéro de série complet
- le véhicule, son année-modèle et la fonction souhaitée
- la version logicielle, si elle peut être déterminée
- le support utilisé : KeyCard, KeyTag, KeyStrap ou tag tiers
- la référence du support d’origine, si disponible
- la couleur exacte de la LED, le nombre de clignotements et l’état de fonctionnement
- le nombre de supports NFC déjà enregistrés
- les résultats séparés pour l’armement/le désarmement et le verrouillage/déverrouillage
- l’emplacement de montage, le type de vitre et son épaisseur approximative
- le type et l’âge des piles ainsi que le résultat après leur remplacement
- le résultat obtenu avec un deuxième tag d’origine et un moyen d’accès indépendant

La saisie structurée est décrite sous [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]].

---

## Renvois

- [[WiPro III — système d'alarme radio pour véhicules de loisirs]]
- [[Processus d'apprentissage — apprentissage des accessoires radio sur WiPro III]]
- [[Émetteur radio 868 — télécommande pour WiPro III]]
- [[Supports d’accès et commande — voies d’accès dans le système THITRONIK]]
- [[Compatibilité des véhicules — Matrice de présentation et principes de base du DIP]]
- [[Normes et interfaces radio]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
- [[Registre des numéros d’article — produits et accessoires]]
- [[Vue d’ensemble du système — gamme de produits THITRONIK]]
