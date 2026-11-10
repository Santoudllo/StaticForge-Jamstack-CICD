---
title: CI/CD et publication web
description: Du commit au déploiement automatisé d'un site statique.
date: 2026-11-09
---

# Du code à la production

Une chaîne CI/CD automatise les contrôles et la livraison.

## Intégration continue

À chaque Pull Request, le pipeline peut installer les dépendances, vérifier le style, exécuter les tests et construire le projet.

## Déploiement continu

Lorsque les contrôles réussissent, les fichiers du dossier `public/generated` peuvent être publiés sur GitHub Pages, Netlify ou un serveur web.

> Un build réussi ne signifie pas automatiquement que le site est correctement déployé : il faut aussi vérifier l'URL publiée.
