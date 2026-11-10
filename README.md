# 🚀 StaticForge – Projet DevOps & CI/CD

**Projet pédagogique d'industrialisation d'une application Full Stack.**

Dépôt de référence : [StaticForge-Jamstack-CICD](https://github.com/Santoudllo/StaticForge-Jamstack-CICD)

## 1. Présentation

StaticForge est une application web de génération de sites statiques (Static Site Generator – SSG), basée sur une architecture inspirée de Jamstack.

L'application permet de gérer des contenus Markdown et de générer automatiquement des pages HTML.

Elle est composée de deux parties :

- **Frontend :** React et Vite.
- **Backend :** Node.js et Express.

Ce projet sert de support à un travail pratique consacré à l'industrialisation logicielle et aux pratiques DevOps.

## 2. Technologies

| Domaine | Technologies |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Contenus | Markdown |
| Tests | Jest, Supertest |
| Qualité | ESLint, SonarQube |
| CI/CD | Jenkins, GitLab CI/CD |
| Conteneurisation | Docker, Docker Compose |
| Infrastructure | Terraform, Ansible |
| Base de données cible | PostgreSQL |

## 3. Architecture générale

```text
       UTILISATEUR
            |
            v
      FRONTEND REACT
            |
            v
       API NODE.JS
            |
            v
      CONTENUS MARKDOWN
            |
            v
     GENERATION HTML
            |
            v
       SITE STATIQUE
```

## 4. Prérequis

Avant de commencer, installer :

- Node.js 20 ou supérieur.
- npm 10 ou supérieur.
- Git.
- Visual Studio Code.
- Un navigateur web.

## 5. Récupération du projet

Chaque étudiant doit travailler sur son propre dépôt GitHub.

**Étape 1 – Fork**

Accéder au dépôt :

https://github.com/Santoudllo/StaticForge-Jamstack-CICD

Cliquer sur **Fork** pour créer une copie personnelle.

**Étape 2 – Clone**

Remplacer `VOTRE-IDENTIFIANT` par son identifiant GitHub :

```bash
git clone https://github.com/VOTRE-IDENTIFIANT/StaticForge-Jamstack-CICD.git
```

Accéder au projet :

```bash
cd StaticForge-Jamstack-CICD
```

**Étape 3 – Installer les dépendances**

```bash
npm install
```

**Étape 4 – Démarrer le backend**

Dans un premier terminal :

```bash
npm run dev:api
```

**Étape 5 – Démarrer le frontend**

Dans un deuxième terminal :

```bash
npm run dev:frontend
```

Accéder à l'application :

http://localhost:5173

API :

http://localhost:3000/api/health

## 6. Dépôt de référence

- **Organisme :** Santou AI Lab
- **Encadrement :** Alimou DIALLO
- **GitHub :** https://github.com/Santoudllo

Les objectifs, les missions techniques, les livrables et les critères d'évaluation sont détaillés dans le fichier `CAHIER-DES-CHARGES.md`.

---

*Projet pédagogique – DevOps, CI/CD et industrialisation logicielle.*
