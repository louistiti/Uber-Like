Uber-Like
==============================

Juste un projet perso' pour se familiariser avec d'autres technos en créant un petit prototype Uber, serveur et client.

Ce projet fera l'objet d'une série longue sur [ma chaîne YouTube](https://www.youtube.com/c/louistitifr) j'ai nommé "Let's Play".

Ci-dessous mes notes / idées permettant de structurer cette série de vidéos.

## 1- Introduction
Courant juillet 2016, Uber a communiqué sur les technologies utilisées au seins de son service :
https://eng.uber.com/tech-stack-part-one/
https://eng.uber.com/tech-stack-part-two/

- Code de prototypage, ne pas utiliser en production
- Juste un "Let's Play" donc pour le fun, c'est souvent fait dans les jeux vidéos,
pourquoi pas le faire avec le dev Web
- Se lancer dans l'aventure Node.js, alors lancez-vous avec moi (je débute, donc il y aura sûrement de meilleurs pratique, n'hésitez pas d'ailleurs à les poster en commentaire tout au long du let's play)
- Explication du projet fini
(faire un Uber-Like et avec l'angouement de Pokémon GO l'été dernier, développement d'un système de géocalisation in real time, ici ce sera pour connaître la position de nos entités, chauffeurs et passagers (driver & rider)) :
    - Inscription / Connexion des clients (riders)
    - Déclenchement d'une course par le client
    - Estimated Time of Arrival (ETA) ?
    - Acceptation de la course par un chauffeur (driver)
    - Récupération du rider
    - Dépôt du rider
    - Finalisation de la course (Calcule du coût en fonction du nombre de km)
    - **peut-être faire schéma ?**
- Les technologies qui seront utilisées :
    - Ionic Framework (app hybrid), donc derrière ce sera du JavaScript avec AngularJS côté front,
    - Node.js côté back avec le micro-framework ExpressJS
    - MongoDB pour des data nécessitant du temps réel (temporaire)
    - Socket.io pour la MàJ de la position du rider par exemple et la boucle globale d'une commande en cours (le tout saved dans MongoDB le temps de la course)
    - MySQL pour la persistence à la fin de la commande pour préserver les données
    - J'ai hésité à partir sur Ionic 2 / Angular 2, mais il y a déjà Node.js à prendre en compte, donc c'est pas pour tout de suite. Ici c'est l'apprentissage de Node.js qui sera mis en avant pour ce "let's play".

## 2- Installation & Pré-requis

### Backend

#### Installation
1. Installer Node.js en allant sur : https://nodejs.org/

2. Initialisation (nom du projet : u-like)
    ```sh
    $ npm init
    ```
    
3. Installation de nodemon (globalement car pas besoin de préciser un chemin dans package.json pour le start)
    ```sh
    $ npm install -g nodemon
    ```
    
4. ~~Installation de babel-cli (--save-dev transpiler du code c'est purement développement http://stackoverflow.com/questions/22891211/what-is-difference-between-save-and-save-dev)~~
    ```sh
    $ npm install --save-dev babel-cli
    ```
    
5. ~~Installation du preset ES6 (https://github.com/babel/example-node-server)~~
    ```sh
    $ npm install --save-dev babel-preset-es2015
    ```

    **Plus besoin de Babel dans les nouvelles versions de Node.js cf: http://node.green/**

    On aura besoin d'autres dépendances, mais pour le moment ça ira, on installera les autres au fur et à mesure que le projet avance.

6. Ajouter start dans scripts pour le développement ; Ajouter serve pour la production ; Le package.json devrait être similaire à :
    ```json
    {
      "name": "u-like",
      "version": "1.0.0",
      "description": "Just a let's play!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon src/index.js --use_strict",
        "serve": "node src/index.js"
      },
      "author": "Louistiti",
      "license": "MIT",
      "dependencies": {},
      "devDependencies": {}
    }
    ```

Car pas de nodemon en production, donc il suffira de faire
```sh
$ node run serve
```

6. ~~Editer package.json (
    "start": "nodemon src/index.js --exec babel-node --presets es2015",
    "build": "babel src -d dist --presets es2015",
    "serve": "node dist/index.js"
    Dans le cas où on veut tout passer en production et tester notre serveur (build & serve).
)~~

#### Configuration de l'IDE (PhpStorm)
1. IDE Settings > languages & framework > node.js & npm > enable core module
2. IDE Settings > languages & framework > JavaScript > ECMAScript 6
2. mark :
    - api/node_modules
    - app/node_modules
    - app/platforms
    - app/plugins
    - as exclude directory et changer en "Project Files" dans l'arbre
    (de cette façon lorsque l'on effectue une recherche, ce sera plus simple de retrouver les fichiers que l'on veut)

3. ~~Seulement mettre le 'use strict'; côté client, non serveur, car c'est le moteur qui interprète le code JS. Si vous pensez qu'il faut le mettre côté serveur, dites-le moi en commentaire avec une petite explication. :)~~

#### Structure
- api/
    - node_modules/
    - src/
        - config/
            - database.js
            - server.js
            - ...
        - feature-name/
            - index.js ??? Load models, etc.
            - ...
        - rides/
            - index.js ??? Load models, etc.
            - ride.controller.js
            - ride.model.js
            - ride.routes.js
        - users/
            - index.js ??? Load models, etc.
            - rider.spec.js
            - rider.controller.js
            - rider.model.js
            - driver.controller.js
            - driver.model.js
            - user.routes.js
        - index.js
        - ...
    - package.json

##### A savoir
- index.js point d'entrée (chargement des confs, appel du serveur)
- server.js (initialisation et conf du serveur)

### Frontend

#### Installation
http://ionicframework.com/docs/guide/installation.html (réindenter code)

#### Structure
- app/
    - www/
        - components/
            - component-name.directive.js
            - component-name.directive.html
            - ...
        - layout/
            - header.html
            - footer.html
            - header.controller.js
            - footer.controller.js
        - services/
            - localstorage.service.js
            - loader.service.js
        - users/
            - rider.controller.js
            - driver.controller.js
            - rider.html
            - rider-detail.html
            - driver.html
            - driver-detail.html
            - user.routes.js
            - feature.model.js ???
        - feature-name/
            - ...
        - app.config.js
        - ...
    - index.html

**angular-ui-router est déjà inclu dans Ionic, pas besoin d'injecter le module.**

## 3- Création du serveur (et début des tests)
1. Installer Express (--save car c'est une dépendance pour faire tourner notre application)
    ```sh
    $ npm install express --save
    ```

2. Setup configs + middlewares
3. Installer Jasmine (--save-dev car dépendance qu'on a besoin seulement en phase de dev)
    ```sh
    $ npm install jasmine-node --save-dev 
    ```

4. Installer Request (exécuter des requêtes pour tester notre API avec Jasmine)
    ```sh
    $ npm install request --save
    ```

SEULEMENT FAIRE TESTS POUR L'API, CAR TROP LONG EN VIDEO DE FAIRE FRONTEND EN PLUS ?
OU FAIRE LES TESTS FRONT EN OFF

[*En cours*]

https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha

# Notes
VOIR POUR UTILISER WEBPACK POUR ANGULARJS POUR NE PAS CHARGER PLEINS DE SCRIPT VIA L'INDEX.HTML

FIXER PROBLEMATIQUE : "La boucle qui controle le temps d’annulation tourne bien sur le serveur et n’attend pas la mise à jour de la webapp ? parceque la il ne s’est rien passé pendant 20 min, jusqu’a ce que le Majordome relance son navigateur"
Rendre le serveur autonomme. Node.js corrige déjà ça ? Passer par les websockets (socket.io) ?

UTILISER LES WEBSOCKETS AVEC SOCKET.IO POUR ACTUALISER LA POSITION DU DRIVER
cf http://stackoverflow.com/questions/31715179/differences-between-websockets-and-long-polling-for-turn-based-game-server

FAIRE BARRE DE PROGRESSION ANNIME (PLUS LE DRIVER APPROCHE, PLUS LA COULEUR DEVIENT FONCE)

VOIR POUR FAIRE LES TESTS AVEC JASMINE, ET UTILISER LE RUNNER KARMA
http://jasmine.github.io/
https://karma-runner.github.io
https://www.distelli.com/docs/tutorials/test-your-nodejs-with-jasmine

# Liens utiles
## Structure
- https://code.tutsplus.com/tutorials/build-a-complete-mvc-website-with-expressjs--net-34168
- https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/
- https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

# Liens plugins
- ngCordova : module Cordova pour Angular pour profiter des composants natifs
http://ngcordova.com/docs/install/ (bower install ngCordova)
- http://ngcordova.com/docs/plugins/geolocation/ (cordova plugin add cordova-plugin-geolocation)
- Utiliser Sass avec Ionic : http://ionicframework.com/docs/cli/sass.html (ionic setup sass)
- Package plumber (npm install --save-dev gulp-plumber) de cette façon ça stoppera pas la tâche, mais affichera les erreurs liées à notre style
- expressjs : http://expressjs.com/fr/ (micro-framework)
- Nodemon : https://github.com/remy/nodemon (recharge automatiquement application node lorsqu'un fichier est modifié)
- ~~(babeljs : https://babeljs.io/ (transformer ES6 (ECMAScript 2015) en ES5))~~ (plus besoin dans les nouvelles versions de Node.js cf: http://node.green/)

# Auteur
**Louis Grenard** : https://www.louistiti.fr

# Licence
MIT License

Copyright (c) 2016 Louistiti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.