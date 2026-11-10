
# StaticForge – Projet DevOps & CI/CD

**Projet pédagogique d'industrialisation d'une application Full Stack.**

Dépôt de référence :
https://github.com/Santoudllo/StaticForge-Jamstack-CICD

## 1. Présentation

StaticForge est une application web de génération de sites statiques (Static Site Generator – SSG), basée sur une architecture inspirée de Jamstack.

Elle permet de gérer des contenus Markdown et de générer automatiquement des pages HTML.

L'application repose sur :
- Frontend : React et Vite.
- Backend : Node.js et Express.

## 2. Technologies

| Domaine | Technologies |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Tests | Jest, Supertest |
| Qualité | ESLint, SonarQube |
| CI/CD | Jenkins, GitLab CI/CD |
| Conteneurisation | Docker, Docker Compose |
| Infrastructure | Terraform, Ansible |
| Base de données cible | PostgreSQL |

## 3. Architecture

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

- Node.js 20 ou supérieur
- npm 10 ou supérieur
- Git
- Visual Studio Code
- Navigateur web

## 5. Récupération du projet

Chaque étudiant doit travailler sur son propre fork GitHub.

### Étape 1 – Fork

Accéder au dépôt :

https://github.com/Santoudllo/StaticForge-Jamstack-CICD

Cliquer sur Fork pour créer une copie personnelle.

### Étape 2 – Clone

Remplacer VOTRE-IDENTIFIANT par son identifiant GitHub :

```bash
git clone https://github.com/VOTRE-IDENTIFIANT/StaticForge-Jamstack-CICD.git
cd StaticForge-Jamstack-CICD
```

### Étape 3 – Basculer sur dev

```bash
git fetch origin
git switch --track origin/dev
```

### Étape 4 – Installer les dépendances

```bash
npm install
```

### Étape 5 – Démarrer le backend

```bash
npm run dev:api
```

### Étape 6 – Démarrer le frontend

Dans un deuxième terminal :

```bash
npm run dev:frontend
```

Application : http://localhost:5173

API : http://localhost:3000/api/health

## 6. Informations

**Organisme :** Santou AI Lab

**Encadrement :** Alimou DIALLO

**Dépôt GitHub :**
https://github.com/Santoudllo/StaticForge-Jamstack-CICD

Les missions techniques, les livrables et les critères d'évaluation seront détaillés dans le cahier des charges.

