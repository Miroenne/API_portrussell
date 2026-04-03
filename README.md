# API Port Russell

Application Node.js / Express connectee a MongoDB pour la gestion du port de plaisance Russell.

## Description

Ce projet permet de gerer :
- les utilisateurs
- les catways
- les reservations

L'application utilise :
- Express
- EJS
- MongoDB avec Mongoose
- bcrypt pour le hash des mots de passe
- method-override pour simuler certaines methodes HTTP
- Bootstrap pour l'interface

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- Bootstrap
- bcrypt
- nodemon
- env-cmd

## Installation

1. Cloner le projet

```bash
git clone <url-du-repo>
cd API_portrussell/API_portrussell
```

2. Installer les dependances

```bash
npm install
```

3. Configurer les variables d'environnement

Creer ou completer les fichiers dans le dossier `env/` :
- `.env`
- `.env.dev`
- `.env.prod`

Variables attendues :

```env
NODE_ENV=
APP_NAME=
API_URL=
PORT=
DB_URL=
SECRET_KEY=
```

## Lancement du projet

Mode par defaut :

```bash
npm start
```

Mode developpement :

```bash
npm run dev
```

Mode production :

```bash
npm run prod
```

L'application demarre sur le port defini dans `PORT`, ou sur `3000` si aucune valeur n'est fournie.

## Structure du projet

```bash
API_portrussell/
├── app.js
├── bin/
├── db/
│   └── mongo.js
├── env/
├── models/
│   ├── user.js
│   ├── catway.js
│   └── reservation.js
├── public/
├── routes/
│   ├── index.js
│   └── users.js
├── views/
└── package.json
```

## Base de donnees

La connexion MongoDB est initialisee au demarrage de l'application via `mongoose.connect(process.env.DB_URL)`.

Nom de la base utilisee :

```txt
API_portrussell
```

## Modeles disponibles

### User

Champs :
- `userName` : string, requis
- `email` : string, requis, unique, converti en minuscule
- `password` : string, minimum 8 caracteres
- `accessLevel` : number, requis, valeurs autorisees : `0` ou `1`

Fonctionnement :
- le mot de passe est hashe automatiquement avec `bcrypt` avant l'enregistrement

### Catway

Champs :
- `catwayNumber` : number, requis, unique
- `catwayType` : string, requis, valeurs autorisees : `long` ou `short`
- `catwayState` : string, requis

### Reservation

Champs :
- `catwayNumber` : number, requis
- `clientName` : string, requis
- `boatName` : string, requis
- `startDate` : date, requise
- `endDate` : date, requise

## Routes actuellement presentes

### `GET /`

Affiche la page de connexion.

### `GET /users`

Retourne actuellement la reponse texte :

```txt
respond with a resource
```

## Remarques

A ce stade, le projet contient la structure de base de l'application, les modeles MongoDB et une vue de connexion, mais il n'expose pas encore une API REST complete pour les utilisateurs, les catways et les reservations.

Le README pourra etre enrichi plus tard avec :
- la documentation detaillee des endpoints
- les exemples de requetes et de reponses
- l'authentification
- les regles metier
- les jeux de donnees de test

## Auteur

Projet realise dans le cadre d'un exercice de gestion d'un port de plaisance.
