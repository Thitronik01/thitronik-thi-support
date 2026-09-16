---
title: Réseaux mobiles et cartes SIM — mise en service sûre du Pro-Finder
sources:
  - sources/APP.docx
  - sources/Anbieter.docx
  - sources/Handy.docx
  - sources/Pro-finder_Update_2018.docx
updated: '2026-07-15'
confidence: high
lang: fr
translation_of: de/mobilfunk-sim.md
---

# Réseaux mobiles et cartes SIM — mise en service sûre du Pro-Finder

Cette page explique comment choisir, préparer et tester une carte SIM pour le Pro-Finder. Les critères déterminants sont le numéro de série complet du Pro-Finder, les services inclus dans le forfait et le réseau mobile actuellement disponible — et non la seule mention « 4G » ou « 5G » sur l’emballage de la SIM.

---

## Contrôle rapide

- Relever le numéro de série complet du Pro-Finder en conservant les zéros initiaux.
- Choisir le bon format de SIM et le réglage du code PIN d’après le tableau.
- Utiliser un forfait avec **SMS classiques et téléphonie**. Une SIM réservée aux données ne convient pas.
- Activer la carte et vérifier son numéro ainsi que, le cas échéant, son crédit.
- Désactiver la messagerie vocale, les renvois d’appel et les services complémentaires gênants via le compte client, l’opérateur ou un smartphone.
- Tester d’abord la SIM dans un smartphone avec un appel et un SMS classique, puis l’insérer dans le Pro-Finder hors tension.
- Pour une utilisation à l’étranger, vérifier au préalable l’itinérance, le réseau partenaire et les coûts auprès de l’opérateur.
- Configurer ensuite seulement le Pro-Finder par SMS de programmation.

> **Important :** l’enregistrement réussi dans un smartphone ne prouve pas que le forfait et le réseau au lieu d’installation sont compatibles avec le Pro-Finder.

---

## Format de SIM et code PIN selon le numéro de série

`100699` est la référence article de la famille de produits. La génération de l’appareil est en revanche déterminée par le numéro de série portant le préfixe `0699`.

| Numéro de série du Pro-Finder | Matériel mobile | Format de SIM | Réglage du code PIN |
|---|---|---|---|
| `0699-001` à `0699-007` | ancienne génération | Mini-SIM | PIN `0000`, demande de PIN activée |
| `0699-008` à `0699-044` | ancienne génération | Micro-SIM | PIN `0000`, demande de PIN activée |
| à partir de `0699-045` | génération compatible LTE | Nano-SIM | désactiver complètement la demande de PIN |

- Ne jamais forcer la SIM et éviter autant que possible les adaptateurs pour cartes découpées.
- À partir de `0699-045`, connaître le PIN ne suffit pas : la demande de PIN doit réellement être désactivée dans un smartphone.
- Sur les appareils plus anciens, la demande de PIN reste activée et le PIN est réglé exactement sur `0000`.
- Les détails sur le matériel et les logiciels figurent dans [[Numéros de série et versions logicielles — préfixes, seuils et jalons]].

---

## Exigences relatives à la carte et au forfait

### Services requis

| Fonction | Exigence |
|---|---|
| SMS | L’envoi et la réception de SMS classiques doivent être possibles. |
| Téléphonie | Les appels entrants et sortants doivent être disponibles. |
| Numéro propre | Le numéro doit être connu et joignable sans ambiguïté. |
| Données mobiles | Inutiles pour la commande du Pro-Finder par SMS ; le smartphone peut en avoir besoin pour l’application et les cartes. |
| Prépayé ou abonnement | Les deux conviennent si toutes les autres exigences sont remplies. |

Une SIM commercialisée comme 5G n’est pas automatiquement inadaptée. Le forfait doit également fournir la technologie mobile prise en charge par le Pro-Finder concerné, ainsi que les SMS et la téléphonie. Un forfait 5G uniquement, données uniquement ou IoT sans SMS ne convient pas.

Une solution Multi-SIM ne doit être utilisée qu’après examen du cas particulier. Pour une distribution claire des messages et un diagnostic simple, il est préférable d’attribuer un numéro dédié au Pro-Finder.

### Cartes prépayées et consultation du crédit

- Organiser le crédit, la durée de validité et la recharge automatique afin d’éviter un blocage inaperçu de la carte.
- Utiliser la lettre `P` dans le SMS de programmation uniquement pour une carte prépayée.
- Un code de consultation tel que `*100#` n’est qu’un exemple propre à un opérateur et doit correspondre au fournisseur.
- Aucun code de consultation du crédit ne doit être programmé pour une carte avec abonnement. Une requête incorrecte peut retarder ou bloquer les messages d’alarme pendant que le Pro-Finder attend la réponse de l’opérateur.
- La syntaxe SMS exacte est décrite dans [[THITRONIK® App — commandes, configuration et dépannage]].

---

## Vérifier la compatibilité actuelle du réseau

Les réseaux mobiles et les accords d’itinérance évoluent. Il n’existe donc ni liste permanente d’opérateurs agréés ni tableau statique des arrêts de réseau par pays.

Avant l’achat ou un voyage, vérifier auprès de l’opérateur :

1. Quelle technologie mobile le Pro-Finder concerné prend-il en charge d’après son numéro de série ?
2. Sur quel réseau le forfait fonctionne-t-il réellement ? Pour un opérateur virtuel, le réseau hôte compte également.
3. Les SMS et la téléphonie sont-ils disponibles avec ce forfait et au lieu d’utilisation ?
4. À l’étranger, la SIM s’enregistrera-t-elle sur un réseau partenaire compatible ?
5. L’itinérance, les SMS et la téléphonie sont-ils activés et entraînent-ils des frais supplémentaires ?
6. La SIM reste-t-elle active ou existe-t-il des délais de recharge et d’utilisation ?

Les anciennes expériences internes avec certains opérateurs ne sont que des indices de diagnostic correspondant à l’époque, et non des homologations actuelles. Si la communication par SMS est incertaine, effectuer un essai comparatif avec une SIM de référence connue pour fonctionner.

---

## Préparer la SIM dans un smartphone

1. Activer la SIM et terminer l’éventuelle vérification d’identité.
2. Régler le PIN conformément au tableau des numéros de série.
3. Désactiver la messagerie vocale, les renvois d’appel et les services complémentaires. Les codes nécessaires dépendent de l’opérateur et de l’appareil ; utiliser uniquement les instructions confirmées par l’opérateur.
4. Vérifier le numéro, l’état du forfait et, pour une carte prépayée, le crédit.
5. Tester un appel sortant et un appel entrant.
6. Envoyer et recevoir un SMS classique.
7. Pour un voyage, activer l’itinérance uniquement après vérification du forfait, du réseau partenaire et des coûts.
8. Éteindre le smartphone, retirer la SIM et ne l’insérer que dans un Pro-Finder hors tension.

### Android et RCS

Les commandes de programmation doivent être envoyées sous forme de SMS classiques. Si Google Messages ou une autre application envoie le texte sous forme de message RCS/chat, désactiver temporairement les chats RCS pendant la configuration puis contrôler le type d’envoi. Éviter les caractères spéciaux, le formatage automatique et les espaces dans le SMS de programmation.

### iPhone et iMessage

Les commandes de programmation ne doivent pas être envoyées par iMessage. Pendant la configuration, s’assurer de l’envoi par SMS. Si le numéro du Pro-Finder était auparavant lié à iMessage, désactiver iMessage pour ce numéro ou désenregistrer le numéro auprès d’Apple.

---

## Installation et test de fonctionnement

1. Mettre le Pro-Finder hors tension.
2. Insérer la SIM dans le bon sens sans forcer.
3. Rétablir l’alimentation et attendre l’enregistrement sur le réseau.
4. Envoyer le SMS de programmation exactement, sans espaces supplémentaires.
5. Contrôler le SMS de réponse.
6. Appeler le Pro-Finder et effectuer un test d’alarme contrôlé.
7. Pour une SIM prépayée, vérifier le crédit restant après le test.

Un appel de test ne fournit qu’un indice :

| Observation | Cause possible / étape suivante |
|---|---|
| La messagerie vocale répond | La messagerie ou un renvoi d’appel est encore actif. |
| Annonce indiquant que le numéro n’est pas attribué | Vérifier l’activation, le numéro et l’état de la SIM auprès de l’opérateur. |
| Immédiatement injoignable | Vérifier la réception, l’enregistrement réseau, la compatibilité réseau et l’alimentation. |
| L’appel atteint l’appareil, mais aucun SMS de réponse n’arrive | Vérifier le service SMS, la programmation, le crédit et le format du message. |

Le comportement exact de l’appel peut varier selon l’opérateur et ne constitue pas à lui seul une preuve de fonctionnement.

---

## Isoler systématiquement les défauts

- Revérifier le numéro de série, le format de SIM et la règle relative au PIN.
- Tester la carte dans un smartphone pour les appels et les SMS classiques.
- Vérifier l’état du forfait, le crédit, les blocages, la messagerie, les renvois et l’itinérance.
- Exclure RCS ou iMessage comme mode de transmission.
- Comparer caractère par caractère le SMS de programmation avec l’exemple valide.
- Contrôler la réception et l’état des LED au lieu d’installation réel.
- Si possible, tester séparément la SIM et le Pro-Finder avec une SIM de référence ou un appareil dont le fonctionnement est connu.
- Consigner le numéro de série complet, l’opérateur, le forfait, le pays, le réseau hôte, l’état des LED et la description exacte du défaut.

Les états des LED propres à chaque génération et les autres contrôles sont décrits dans [[Dépannage — diagnostic sûr des problèmes fréquents]]. Pour une escalade, utiliser les informations de [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]].

---

## Références croisées

- [[Pro-Finder — Module de télémétrie GSM/GPS]]
- [[THITRONIK® App — commandes, configuration et dépannage]]
- [[Numéros de série et versions logicielles — préfixes, seuils et jalons]]
- [[Dépannage — diagnostic sûr des problèmes fréquents]]
- [[Saisie d’un dossier d’assistance — informations obligatoires et contrôle avant escalade]]
