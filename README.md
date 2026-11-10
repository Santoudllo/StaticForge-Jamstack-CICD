# StaticForge — Static Site Generator Jamstack

**Projet fil rouge CI/CD — Master Développement**

StaticForge est une application full-stack pédagogique. Le frontend React/Vite permet de visualiser les contenus et de lancer une génération. Le backend Node.js/Express lit des fichiers Markdown et produit un site HTML statique.

## Architecture

```text
staticforge-jamstack/
├── frontend/                 # React + Vite : interface d'administration
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
├── backend/                  # API Node.js / Express
│   ├── content/              # Sources Markdown
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   └── tests/
├── public/generated/         # Site statique généré (non versionné)
├── .github/workflows/        # CI et déploiement GitHub Pages
├── Dockerfile
└── docker-compose.yml
```

## Objectifs pédagogiques

À la fin du projet, les étudiants sauront :
- forker et cloner un dépôt Git ;
- installer et exécuter une application frontend/backend ;
- comprendre et compléter des tests unitaires et d'intégration ;
- mettre en place des contrôles qualité avec ESLint et SonarQube ;
- construire un pipeline CI avec GitHub Actions ;
- générer un artefact statique ;
- construire une image Docker et publier/déployer le site ;
- vérifier un déploiement et documenter un rollback.

## Prérequis

- Git
- Node.js 20 ou supérieur et npm
- Navigateur web
- Docker Desktop ou Docker Engine pour les ateliers conteneurisation
- Compte GitHub

Vérifier :

```bash
git --version
node --version
npm --version
docker --version
```

## 1. Fork, clone et exploration

1. Ouvrir le dépôt GitHub communiqué par l'enseignant.
2. Cliquer sur **Fork**.
3. Cloner votre fork :

```bash
git clone https://github.com/VOTRE-UTILISATEUR/staticforge-jamstack.git
cd staticforge-jamstack
ls -la
find . -maxdepth 4 -type f | sort
```

Repérer le frontend, le backend, les contenus Markdown, les tests et les workflows.

## 2. Installer les dépendances

À la racine du projet :

```bash
npm install
```

Les dépendances principales :
- React et Vite : interface frontend.
- Express : API backend.
- gray-matter : lecture des métadonnées YAML des fichiers Markdown.
- marked : conversion Markdown vers HTML.
- Jest et Supertest : tests backend.
- ESLint : qualité du code.

## 3. Démarrer le projet en développement

Dans un terminal :

```bash
npm run dev:api
```

Dans un second terminal :

```bash
npm run dev:frontend
```

Ouvrir `http://localhost:5173`.

L'API est accessible sur `http://localhost:3000`.

Endpoints disponibles :

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Santé de l'API |
| GET | `/api/pages` | Liste des pages Markdown |
| GET | `/api/pages/:slug` | Détail d'une page |
| POST | `/api/build` | Générer le site statique |
| GET | `/api/build/status` | Dernier build |

Tester l'API :

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/pages
curl http://localhost:3000/api/build/status
```

## 4. Comprendre le contenu Markdown

Les fichiers sont dans `backend/content/`. Chaque fichier contient des métadonnées YAML puis du Markdown :

```markdown
---
title: Mon nouvel article
description: Description courte de l'article.
date: 2026-11-10
---

# Mon article

Le contenu est écrit en **Markdown**.
```

Travail demandé :
1. Créer un fichier `backend/content/mon-article.md`.
2. Ajouter un titre, une description et une date.
3. Écrire un contenu avec titres, listes et liens.
4. Actualiser l'interface et vérifier que le nouvel article apparaît.

## 5. Générer le site statique

Depuis l'interface, cliquer sur **Générer le site**.

Ou utiliser la commande :

```bash
npm run build:site
```

Le site est généré dans :

```text
public/generated/
├── index.html
├── styles.css
├── sitemap.xml
├── welcome.html
└── cicd.html
```

Après génération, ouvrir `public/generated/index.html` dans un navigateur ou servir ce dossier avec un serveur HTTP statique.

## 6. Tests automatisés avec Jest et Supertest

Les dépendances sont déclarées dans `package.json`. Pour comprendre leur installation, observer notamment :

```bash
npm install --save-dev jest supertest
```

Exécuter :

```bash
npm test
npm run test:coverage
```

Travail demandé :
- Ajouter un test pour vérifier le contenu d'une page.
- Ajouter un test pour le cas d'un slug inconnu.
- Ajouter un test pour vérifier que le build génère une page correspondant à un nouveau fichier Markdown.
- Ajouter au moins deux tests de cas limites.
- Consulter le rapport de couverture dans `coverage/`.

Exemple :

```javascript
test('une page connue est accessible', async () => {
  const response = await request(app).get('/api/pages/welcome');

  expect(response.statusCode).toBe(200);
  expect(response.body.slug).toBe('welcome');
});
```

**Expérience de régression :** modifier temporairement une fonction pour provoquer l'échec d'un test. Observer le résultat, corriger puis relancer la suite.

## 7. Qualité du code avec ESLint

```bash
npm run lint
```

Travail demandé :
- Introduire volontairement une variable inutilisée.
- Lancer ESLint et lire le diagnostic.
- Corriger l'anomalie.
- Vérifier que le contrôle passe.

## 8. Git et Pull Request

Créer une branche :

```bash
git checkout -b feature/add-content-tests
```

Commit et push :

```bash
git add .
git commit -m "test: add content generation tests"
git push -u origin feature/add-content-tests
```

Créer une Pull Request vers `main`. Observer les contrôles automatiques dans l'onglet **Actions**.

## 9. Intégration continue — GitHub Actions

Le fichier `.github/workflows/ci.yml` exécute :
1. Checkout du dépôt.
2. Installation de Node.js.
3. Installation des dépendances.
4. Analyse ESLint.
5. Tests automatisés avec couverture.
6. Build frontend et génération du site.
7. Publication du dossier généré comme artefact téléchargeable.

Travail demandé :
- Faire échouer volontairement un test et pousser le changement.
- Introduire une erreur ESLint.
- Comparer les exécutions dans GitHub Actions.
- Corriger les erreurs et obtenir une pipeline verte.

## 10. Analyse statique avec SonarQube

Le fichier `sonar-project.properties` fournit une configuration initiale.

Avec un serveur SonarQube accessible et SonarScanner installé :

```bash
sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=VOTRE_TOKEN
```

Ne jamais committer un token. Pour une intégration GitHub Actions, utiliser un secret GitHub (`SONAR_TOKEN`) et adapter le workflow à l'instance mise à disposition par l'enseignant.

## 11. Docker : servir le site généré

Le Dockerfile utilise deux étapes :
- une étape Node.js pour construire le frontend et générer le site ;
- une étape Nginx pour servir uniquement les fichiers statiques.

Construire :

```bash
docker build -t staticforge-jamstack:local .
```

Démarrer :

```bash
docker run -d --name staticforge -p 8080:80 staticforge-jamstack:local
```

Vérifier :

```bash
docker ps
docker logs staticforge
curl -I http://localhost:8080
```

Arrêter :

```bash
docker stop staticforge
docker rm staticforge
```

Avec Docker Compose :

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f
docker compose down
```

Ouvrir `http://localhost:8080`.

## 12. Déploiement Jamstack sur GitHub Pages

Le workflow `.github/workflows/deploy-pages.yml` :
- installe les dépendances ;
- exécute ESLint et les tests ;
- construit le frontend et le site statique ;
- publie `public/generated/` sur GitHub Pages.

Pour l'activer :
1. Ouvrir **Settings → Pages** dans le dépôt.
2. Choisir **GitHub Actions** comme source de déploiement.
3. Vérifier les permissions Pages du dépôt.
4. Pousser sur `main` ou lancer le workflow manuellement.
5. Consulter l'URL de déploiement dans l'exécution GitHub Actions.

Note : pour un projet publié sous une URL de type `https://utilisateur.github.io/nom-du-depot/`, il peut être nécessaire de configurer `base` dans `vite.config.js` et d'adapter les chemins absolus du site généré. Ce point constitue un exercice de configuration de déploiement.

## 13. Staging, production et rollback — extension encadrée

Pour approfondir le CD, déployer d'abord l'image Docker sur un environnement staging.

Vérifications :
- le site répond en HTTP ;
- la page d'accueil est accessible ;
- les pages générées sont accessibles ;
- les ressources CSS sont chargées ;
- le sitemap est présent.

Pour le rollback, conserver l'image de la version précédente avec un tag immuable (par exemple le SHA Git). Si le nouveau déploiement échoue, redéployer le tag précédent et refaire les smoke tests.

Ne pas utiliser uniquement le tag `latest` pour le rollback.

## 14. Livrables attendus

1. URL du dépôt GitHub forké.
2. Code frontend et backend modifié.
3. Nouveaux fichiers Markdown.
4. Tests ajoutés et rapport de couverture.
5. Historique Git et Pull Request.
6. Captures d'une pipeline réussie et d'une pipeline en échec.
7. Rapport ou capture SonarQube.
8. Dockerfile et preuve d'exécution.
9. URL du site publié sur GitHub Pages.
10. Procédure de vérification et de rollback documentée.

## 15. Barème indicatif sur 20

| Critère | Points |
|---|---:|
| Fork, clone, structure et compréhension | 2 |
| Fonctionnalités et contenus Markdown | 3 |
| Tests Jest / Supertest | 3 |
| ESLint et analyse SonarQube | 2 |
| Pipeline CI GitHub Actions | 4 |
| Build statique et artefact | 2 |
| Docker et déploiement Jamstack | 3 |
| Documentation, smoke tests et rollback | 1 |
| **Total** | **20** |

## Extensions possibles

- Ajouter une prévisualisation HTML d'un article dans le frontend.
- Permettre l'ajout d'un contenu Markdown depuis l'interface.
- Ajouter des catégories et des tags.
- Générer des pages de catégories.
- Ajouter un flux RSS.
- Ajouter des tests de sécurité et un scan des dépendances.
- Ajouter une étape d'approbation manuelle avant la production.

---

**Consigne enseignant :** le dépôt est un starter fonctionnel. Les étudiants doivent d'abord l'exécuter et comprendre son architecture, puis enrichir les tests et construire progressivement les contrôles et les étapes de livraison. Le pipeline fourni sert de base de travail, pas de résultat final à recopier.
