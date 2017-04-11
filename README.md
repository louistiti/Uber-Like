Uber-Like
=========

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/Louistiti/Uber-Like/blob/master/LICENSE.md)

![Uber-Like Logo](http://image.noelshack.com/fichiers/2016/50/1482054576-logo-small.png "Uber-Like Logo")

Juste un projet perso' pour se familiariser avec d'autres technos en créant un petit prototype Uber, serveur et client.

Ce projet fera l'objet d'une série longue sur [ma chaîne YouTube](https://www.youtube.com/c/louistitifr) j'ai nommé "Let's Play".

Ci-dessous mes notes / idées permettant de structurer cette série de vidéos.

**/!\\** Je ne merge pas les pull requests pour le moment. :)

## 1- Introduction
Courant juillet 2016, Uber a communiqué sur les technologies utilisées au sein de son service :
https://eng.uber.com/tech-stack-part-one/
https://eng.uber.com/tech-stack-part-two/

**/!\ Le code actuel de l'app est réalisé en tant que web app, plus tard je passerais en mobile via une techno ci-dessous.**
Par la suite, peut-être voir pour une PWA ? https://github.com/angular/mobile-toolkit ; https://www.youtube.com/watch?v=vAb-2d1vcg8

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
    - ~~Ionic Framework (app hybrid), donc derrière ce sera du JavaScript avec AngularJS côté front~~
    - Angular 2 côté front et NativeScript ou React Native pour profiter des performances native du mobile
    - Node.js côté back avec le micro-framework Express
    - ~~MongoDB pour des data nécessitant du temps réel (temporaire)~~
    - Redis pour des data nécessitant du temps réel (temporaire ; queue à dépiler au fur et à mesure)
    - Socket.io pour la MàJ de la position du rider par exemple et la boucle globale d'une commande en cours (le tout saved dans Redis le temps de la course)
    - MySQL pour la persistence à la fin de la commande pour préserver les données

## 2- Installation & Pré-requis

**/!\ [Yarn](https://yarnpkg.com) sera utilisé à la place d'npm durant la série.** Son système de caching n'est pas négligeable, ainsi que
son système de version matching utilisé par défaut (yarn.lock)

### Back-End

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
    
4. Installation de babel-cli (--save-dev transpiler du code c'est purement développement)
On utilise Babel ici, car actuellement (08 novembre 2016) le moteur V8 de Google (utilisé par Node.js) ne comprend pas les import de modules ES6.
    ```sh
    $ npm install --save-dev babel-cli
    ```
    
5. Installation du preset ES6
    ```sh
    $ npm install --save-dev babel-preset-es2015
    ```
    
6. ESLint pour suivre des normes de développement JavaScript (ici ce sera le style guide d'Airbnb)

7. Aujourd'hui il y a un conflict entre les différentes dépendances : https://github.com/eslint/eslint/issues/7338.
Solution
    ```sh
    $ npm install eslint-config-airbnb --save-dev
    $ npm info eslint-config-airbnb peerDependencies --json
    $ npm install --save-dev eslint@^3.9.1 eslint-plugin-jsx-a11y@^2.2.3 eslint-plugin-import@^2.1.0 eslint-plugin-react@^6.6.0
    $ ./node_modules/.bin/eslint --init
    ```

- "Use a popular style guide"
- "Airbnb"
- "JSON"

8. Désactiver certaines règles par défaut d'ESLint via .eslintrc et ajouter env node et mocha (mocha on verra par la suite
mais en gros ce sera l'outil nous permettant de faire nos tests)

9. Ajouter "lint": "node_modules/.bin/eslint src/**/*.js" à package.json pour check toutes les sources et modifier "build"

10. IDE Settings > rechercher ESLint > Activer ESLint + renseigner package dans node_modules + ajouter config ESLint de notre projet et non de node_modules/

11. Installation de shx pour clean "dist/" avant de build et pour d'autres commandes à venir
    ```sh
    $ npm install --save-dev shx
    ```

12. Ajouter start dans scripts pour le développement ; Ajouter serve pour la production ; Le package.json devrait être similaire à
    ```json
    {
      "name": "u-like",
      "version": "1.0.0",
      "description": "Just a let's play!",
      "main": "./src/index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon --use_strict ./src/index.js --exec babel-node",
        "lint": "./node_modules/.bin/eslint ./src/**/*.js",
        "delete-dist": "shx rm -rf ./dist",
        "build": "npm run lint && npm run delete-dist && babel ./src -d ./dist",
        "serve": "node ./dist/index.js"
      },
      "author": "Louistiti",
      "license": "MIT",
      "dependencies": {
        "express": "^4.14.0"
      },
      "devDependencies": {
        "babel-cli": "^6.18.0",
        "babel-preset-es2015": "^6.18.0",
        "eslint": "^3.9.1",
        "eslint-config-airbnb": "^13.0.0",
        "eslint-plugin-import": "^2.1.0",
        "eslint-plugin-jsx-a11y": "^2.2.3",
        "eslint-plugin-react": "^6.6.0"
      }
    }
    ```

13. Fichier de configuration Babel ".babelrc", on indique que l'on utilisera le preset es2015
    ```json
    {
      "presets": ["es2015"]
    }
    ```

Car pas de nodemon, ni de Babel en production, donc il suffira de faire
```sh
$ npm run build
$ npm run serve
```

De cette façon on transpile notre code ES6 en ES5, et on lance le serveur avec le code transpilé de la même manière que sur le serveur de production.

On aura besoin d'autres dépendances, mais pour le moment ça ira, on installera les autres au fur et à mesure que le projet avance.

#### Configuration de l'IDE (PhpStorm)
1. IDE Settings > languages & framework > node.js & npm > enable core module
2. IDE Settings > languages & framework > JavaScript > ECMAScript 6
3. mark :
    - api/node_modules
    - api/dist
    - app/node_modules
    - app/platforms
    - app/plugins
    - as exclude directory et changer en "Project Files" dans l'arbre
    (de cette façon lorsque l'on effectue une recherche, ce sera plus simple de retrouver les fichiers que l'on veut)

#### Structure
Ci-dessous la structure des dossiers / fichiers constituant le serveur.
Le code transpilé (à passer en production) est dans le répertoire dist/.

- api/
    - node_modules/
    - sql/
    - dist/
        - ...
    - src/
        - config/
            - config.js
            - database.js
            - server.js
            - ...
        - feature-name/
            - ...
        - helpers/
            - ...
        - rides/
            - ride.controller.js
            - ride.model.js
            - ride.routes.js
            - ride.spec.js
        - users/
            - rider.controller.js
            - rider.model.js
            - rider.routes.js
            - rider.spec.js
            - driver.controller.js
            - driver.model.js
            - driver.routes.js
            - driver.spec.js
        - validators/
            - ...
        - index.js
        - ...
    - package.json

##### A savoir
- index.js point d'entrée (chargement des confs, appel du serveur)
- server.js (initialisation et conf du serveur)

### Front-End (faire nouvelle vidéo ici)

#### Installation
On va utiliser Angular CLI qui va nous permettre de générer divers ressources pour notre projet tout en respectant le style guide que l'équipe d'Angular recommande
(Par la suite on utilisera : https://www.npmjs.com/package/react-native-cli ou : https://github.com/NathanWalker/nativescript-ng2-magic)

Bien expliquer ce que fais un "generate", etc. d'Angular-CLI pour ne pas perdre les viewers

1. Installer Angular CLI :
    ```sh
    $ npm install -g angular-cli
    ```

2. Modifier "spec" object dans angular-cli.json en passant tout à "false", car nous ne voulons pas faire de tests côté app (pas bien)

3. Créer un nouveau projet Angular :
    ```sh
    $ ng new u-like --style=sass
    ```
(réindenter)
(modifier le sélecteur du composant root par "uberlike" et ajouter dans les custom tags de l'IDE, de même pour les composants futures)

4. Modifier attribue préfix par "uberlike" dans "tslint.json" (+ "angular-cli.json" (si utilisé))

5. Renommer dossier "u-like" par "app"

6. Supprimer app/README.md

7. Activer TSLint dans l'IDE
Settings > TSLint > Enable + renseigner dossier tslint dans node_modules

8. Créer "core/config.ts" pour les constantes utiles à notre projet

9. Editer app.component.html avec le nécessaire pour commencer

10. Créer nouveau composant "home" :
    ```sh
    $ ng g c home
    ```
(réindenter)
(delete home.component.spec.ts)

11. Importer le router d'Angular dans app.module.ts

12. Importer le style des composants "globaux" / shared SCSS (que j'ai déjà dev' en amont)

13. Importer "assets/scss/_includes/base/all" et styliser le "body" dans styles.scss

#### Structure
A REDEFINIR APRES AVOIR CHOISI ENTRE NATIVESCRIPT ET REACT NATIVE (mais toujours en respectant une structure recommandée par la team Angular)

- app/
    - dist/
    - node_modules/
    - src/
        - app/
            - core/
                - config.ts
                - http.service.ts
                - ...
            - home/
                - home.component.html
                - home.component.scss
                - home.component.ts
            - register/
                - register-rider/
                    - register-rider.component.html
                    - register-rider.component.ts
                - register-routing.module.ts 
                - register.component.html
                - register.component.ts
                - register.module.ts
            - users/
                - rider-detail/
                    - rider-detail.component.html
                    - rider-detail.component.scss
                    - rider-detail.component.ts
                - rider.model.ts
                - rider.service.ts
                - riders-routing.module.ts
                - riders.module.ts
            - app-routing.module.ts
            - app.component.html
            - app.component.scss
            - app.component.ts
            - app.module.ts
            - index.ts
            - not-found.component.ts
            - ...
        - assets/
            - images/
            - scss/
        - index.html
        - main.ts
        - polyfills.ts
        - styles.scss
        - ...
    - ...
    
## 3- Création du serveur
1. Installer Express (--save car c'est une dépendance pour faire tourner notre application)
    ```sh
    $ npm install express --save
    ```

2. Setup configs + middlewares (server class, ...)
Utilisation de import ES6 au lieu des requires, pour sélectionner la partie des modules qui nous intéresse.
Plus performant, on a une mémoire plus libre.

3. First middleware
    ```js
    // Disable from the header, else it makes hacker's life easier to know more about our system
    res.removeHeader('X-Powered-By');
    console.log('request', `${req.method} ${req.url}`);
    ```

## 4- Création et connexion à la base de données
### Création de la base de données
1. Vérifier que le démon (serveur) MySQL est lancé (Windows : services ; mysqld). Sinon le lancer (possible répertoire Wamp, etc.)
2. Se connecter au serveur MySQL (vos identifiants, ici pas de password) :
    ```sh
    $ mysql -h localhost -u root
    ```
    
3. Créer la BDD (utf8mb4_unicode_ci)
    ```sql
    > CREATE DATABASE uberlike COLLATE utf8mb4_unicode_ci;
    > exit
    ```

### Structure
1. Connexion via PhpStorm (ou autre database manager)
2. Création de la table "rider" (passagers) https://i.gyazo.com/b484423d7fa08914cb473631b6f620d7.png

### Code
1. Installer MySQL dans le projet
    ```sh
    $ npm install mysql --save
    ```

2. Configurer la connexion à MySQL
A savoir que nous nous connectons qu'une fois à la base de données, au lancement du serveur.
Ensuite le serveur attend de nouvelle requêtes (http://i.imgur.com/Hqv5LlG.gifv :D )

Créer config/database.js

## 5- POST /riders
1. Ajouter middleware dans bootstrap() de config/server.js
2. Création de l'entité "rider"
    - users/
        - rider.controller.js
        - rider.model.js
        - rider.routes.js
3. Travailler les paramètres sur des requêtes ayant un verb autre que GET
    ```sh
    $ npm install body-parser --save
    ```

    ```js
    // Parse input values in JSON format
    app.use(bodyParser.json());
    // Parse from x-www-form-urlencoded, which is the universal content type
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    ```
    
4. On installe un package pour la validation de nos données
    ```sh
    $ npm install validator --save
    ```

5. On installe un package pour générer des uuids (pour identifier nos entités)
    ```sh
    $ npm install uuid --save
    ```

6. On va chiffrer le mot de passe
    ```sh
    $ npm install bcrypt --save
    ```
    
Ajouter dossier helpers avec premier helper pour les problématiques de temps (ici datetime()).
Faire logique d'ajout en base de données + errors handling (avec EventEmitter) + tester requête avec Postman.

## 6- Uniformiser nos retours JSON
Créer structure des retours endpoints (succès et erreur) via helper "response.js"

### Erreurs
![alt text](https://i.gyazo.com/2a4ab0fe6a766c7b6b29aed628aac77c.png "Retour erreurs")

### Succès
![alt text](https://i.gyazo.com/2ad6741ae8309a1d36fca9670879f997.png "Retour succès")

## 7- Environnements
Nous allons bientôt attaquer nos premiers tests. Pour ce faire nous allons d'abord créer nos différents environnements
afin d'agir en conséquence. Ici nous aurons : test ; dev ; prod.
L'env' de dev étant celui par défaut.
1. Séparer les configs pour la connexion à la base de données et initialiser "process.env.NODE_ENV" : api/config/config.js

2. Remplacer appel de "db" qui est maintenant une fonction

3. Créer dossier api/sql et ajouter le script de reset de la BDD test "reset-test-db.sql"

4. Modifier les scripts du package.json pour créer une BDD dédiée aux tests en clonant la structure de la BDD dev à la volée
    ```
    "scripts": {
        "clone-db-test": "mysql -h localhost -u root < ./sql/reset-test-db.sql && mysqldump --no-data uberlike -h localhost -u root > ./sql/uberlike.sql && shx sed -i AUTO_INCREMENT=[0-9] AUTO_INCREMENT=0 ./sql/uberlike.sql && mysql uberlike_test -h localhost -u root < ./sql/uberlike.sql",
        "test": "set NODE_ENV=test&& npm run clone-db-test && node ./dist/index.js",
        "start": "nodemon --use_strict ./src/index.js --exec babel-node",
        "lint": "./node_modules/.bin/eslint ./src/**/*.js",
        "build": "npm run lint && babel ./src -d ./dist && npm test",
        "serve": "set NODE_ENV=prod&& node ./dist/index.js"
      }
    ```

## 8- Configuration de nos tests
On vient de prendre conscience de nos différents environnements
et de créer notre premier endpoint,maintenant automatisons son test. En effet ces tests vont nous assurer que notre projet
est périn dans le temps. Imaginons que demain nous ajoutons une feature Y qui impact une feature X, il est pas impossible
que cette feature X ne fonctionne plus (effet de bord) et que nous le remarquons pas. Les tests vont nous permettre de
répondre à cette problématique.

Ici nous allons seulement faire des tests sur l'API, des tests d'intégrations qui regroupent nos petites briques 
(qui elles devraient être testées via des tests unitaires), donc tester nos endpoints.
Si l'on fait tests unitaires + tests d'intégrations + tests de validations ce serait trop long à tout démontrer.
Libre à vous de les ajouter. ;)

1. Installer Mocha : framework pour nos tests (--save-dev car dépendance qu'on a besoin seulement en phase de dev)
    ```
    $ npm install mocha --save-dev
    ```

2. Installer Chai (pour les assertions)
    ```sh
    $ npm install chai --save-dev
    ```
    
3. Installer Chai HTTP (exécuter des requêtes pour tester notre API et coupler nos assertions avec)
    ```sh
    $ npm install chai-http --save-dev
    ```

4. Installer Chai Things (ajoute du support aux assertions sur les tableaux. Utile pour nous car nous avons un tableau d'erreurs)
    ```sh
    $ npm install chai-things --save-dev
    ```
    
5. Modifier règle "import/no-extraneous-dependencies" dans .eslintrc seulement pour les tests

6. Modifier le script de test dans "package.json" en exécutant Mocha, en précisant que l'on est sur de l'ES6 et parce qu'on aime les chats alors avoir le reporter Nyan Cat (on exécute init et riders en priorité)
    ```json
    "test": "set NODE_ENV=test&& npm run clone-db-test && mocha --compilers js:babel-register --reporter nyan ./src/init.spec.js ./src/users/rider.spec.js ./src/**/*.spec.js",
    ```

7. Nous allons donc découper nos tests par feature, ici on va commencer par "init.spec.js" et "rider.spec.js" (seulement créer les fichiers)

## 9- Notre premier test

Utilisation d'expect() au lieu de should(), son import ES6 est plus propre à mon sens car should() doit patch les objets
avant de pouvoir être utilisé. Après ce sont les goûts et les couleurs.

1. Ajout du helper "log" pour avoir de jolies couleurs dans notre console

2. Remplacer tous les console.log()

3. Remplir "init.spec.js"

4. Remplir "rider.spec.js" pour POST /v1/riders

Here we go

![alt text](http://img11.hostingpics.net/pics/792410nyan.gif "Tests POST /v1/riders")

## 10- Vue d'inscription

1. Faire le squelette de l'application, avec un routing enfant (riders), composant "register", "register-rider", "riders" dans dossier "users"
Car on aura un module routing spécifique et un module de chargement à chaque feature / composant "métier" de notre application.
Préparer module "core/core.module.ts" pour les ressources que l'on utilise souvent (loader, ...)

2. Editer le composant (rendu + style) Home et Register, tout ce dont on a besoin pour inscrire un utilisateur (voir pour faire rider + driver, pas sûr)

3. Logique métier (validations de form, avec patterns, maxlength, minlength) + créer model "users/rider.model.ts" et binder les données formulaire avec [(ngModel)]
Utiliser variable locale (#foo) pour faire les validations + styliser les validations.

## 11- Envoyer la requête d'inscription

Maintenant que le formulaire est prêt, il ne nous manque plus qu'à envoyer les données à notre API. Pour ce faire on utilisera le client HTTP d'Angular.

1. Créer un client HTTP custom qui va surcharger celui fournis par Angular, de cette façon on n'aura pas à répéter notre code pour le catch d'erreur, authentification, etc.
(étant abstrait, le type de "back-end" est un XHRBackend et non ConnectionBackend pour le constructeur parent de notre client HTTP custom)

2. Structurer comme il faut le client HTTP dans le projet en utilisant un service dédié à chaque "feature" / modèle

3. Faire requête d'inscription

4. Back : créer nouvel objet literal "app" dans la config api

5. Back : configurer le CORS dans un middleware en fonction de l'environnement actuel

6. Afficher messages retournés par le serveur en créant le composant "ResponseMessageComponent"

7. Styliser le nouveau composant

## 12- Composant Loader + page 404

1. Faire composant "NotFound" + styliser un peu avec des GIFs random

2. Faire composant "Loader" et binder "isLoading" quand nécessaire, ici avec le composant parent "RegisterRider"

Loader : http://image.noelshack.com/fichiers/2016/51/1482167158-button-loader.gif

![Home + Register Rider](http://image.noelshack.com/fichiers/2016/51/1482165749-home-register-rider.gif "Home + Register Rider")

## 13- Lazy loading

Commit : https://github.com/Louistiti/Uber-Like/tree/7f54794826c90ef9887ba8b090e8cdf9d3c5375a

(si problème de chargement de module durant cette partie, alors refaire un "ng serve" car Webpack peut avoir des conflits
pour charger des modules Angular "on the fly")

1. A l'avenir l'application va devenir plus importante, Angular-CLI utilise Webpack pour séparer notre code en "bundle", lors du premier
chargement de page nous avons pour le moment 3.6MB de chargé (non minifié) : https://i.gyazo.com/f9ed604aad00451f50c9dca3f0941b88.png

2. On va séparer notre composant "Register" de notre application, car actuellement il est chargé via "app.module".
Dans "app.module" on ne charge seulement ce dont on a besoin pour nos composants "racine". On va créer un module de chargement +
un module routing pour chaque feature métiers de notre application. De cette façon, notre code sera bien séparé et 
via le lazy loading on piochera seulement le nécessaire au moment du changement de route. Ce qui donnera un premier chargement
de l'application (sans cache) plus performant.

3. Déroulement : app.module > app-routing.module (indique quelles routes doient être lazy loaded) > feature.module > feature-routing.module

4. Pour info', la team Angular a vraiment bien pensée les choses car nous pouvons également faire du pre-loading,
cf https://angular.io/docs/ts/latest/guide/router.html#!#preloading. En fonction de la stratégie choisie, il est possible
de preloaded les modules lorsque les modules nécessaires pour la feature ou route en cours ont correctement été chargés.
Mais on verra ça plus tard.


Maintenant voici un screenshot avec le lazy loading lors du premier chargement de page : https://i.gyazo.com/d1c1f22606ec1a6a8867d98ece16c436.png.
Remarquons la différence de taille des données transferées, ici on est à 3.4MB au lieu de 3.6MB.

Lorsque l'on appel notre route "register" : https://i.gyazo.com/d426d391b73b32461d6570000fecf9a5.png on peut voir qu'un chunk est chargé.
Ce chunk correspond à notre "RegisterModule" qui lui va s'occuper de charger les dépendances nécessaires à ses composants.

## 14- Préparation à l'authentification

Commit : https://github.com/Louistiti/Uber-Like/tree/d1be1a36634bab1a3cbf26faf13e2e669646e17d

On retourne maintenant côté back.

- On utilisera un JWT (Json Web Token) pour authentifier nos utilisateurs.
- Grâce à une clé secrète (donc seulement connue par le serveur), on va pouvoir signer ce token, voyez-y comme un certificat.
- Les JWT protègent directement contre les failles CSRF étant stateless (pas de sessions, mais un token).
- Permet de ne pas stocker les identifiants en local (donc pas de mot de passe, etc.), et le token a une durée de vie (ici 1 heure).
- Si désactivation de compte : clear tokens de l'app + révoquer tous les devices de l'utilisateur
- Si déconnexion : clear tokens de l'app + révoquer device courant de l'utilisateur
- Si changement de mot de passe : révoquer tous les devices de l'utilisateur excepté le device courant

- Imaginez un refresh token comme étant l'option "se souvenir de moi" dans une SPA.
- Un refresh token réduira le champs d'action sur la durée pour un attaquant. En effet l'access_token est valide 1h, le refresh_token peut être valide bcp plus longtemps, même "à vie". J'ai tout de même préféré lui donner une durée de vie de 7 jours.
- On pourra révoquer un refresh token, donc l'accès à un device spécifique.
- Notre système d'authentification est multi-devices, il est possible d'être connecté sur un même compte via plusieurs clients car chaque device a son propre refresh_token

1. Expliquer ce qu'est un JWT (composé de 3 parties, https://jwt.io, etc.)
 Par conséquent on pourra créer des "gardes" (sous forme de middleware) pour dire "t'es un rider, donc tu peux ou ne peux pas accèder à cette ressource" sans tapper dans la BDD
 On pourra aussi connaître l'utilisateur qui demande l'accès à la ressource (via l'uuid)
 Et par convention, quel device (via client_id / deviceId) via le claim "sub" pour "Subject"
Générer access_token et refresh_token, donc créer table "device"

2. Expliquer comment fonctionne l'authentification pour notre projet.
 On va utiliser le même process que le protocol OAuth 2.0 (cf "Figure 2" : https://tools.ietf.org/html/rfc6749#section-1.5)
 On veut que notre projet soit multi-devices, donc possibilité d'être authentifié sur plusieurs appareils en même temps.
 Par conséquent on par du principe qu'un utilisateur peut avoir plusieurs devices, qui eux vont être authentifié
    1. Requête : /auth/token (email=xxx&password=xxx&user_typer=rider|driver&grant_type=password)
    2. Réponse : https://i.gyazo.com/2f697fb402116b23c9a8f128982ba6c4.png
    3. Requête : /ressource-protégée (Authorization: Bearer access_token)
    4. Réponse : infos de la ressource protégée
    5. Reproduire étape 3 et 4 jusqu'à ce que access_token expire (ou anticiper l'expiration avec expires_in retournée dans l'étape 2, à l'heure actuelle je ne sais pas encore ce que je vais faire ici)
    6. Dans le cas où il n'y a pas d'anticipation, et que access_token a expiré. Réponse : https://i.gyazo.com/c18dc14c932b271a7f1c9eebd6a04f13.png
    7. Requête : /auth/token (refresh_token=xxx&grant_type=refresh_token&client_id=xxx)
    8. Réponse : pareil que l'étape 2 avec un nouveau access_token et refresh_token
   
- Il est primordial d'utiliser HTTPS pour les échanges client / serveurs.
- Sauvegarder access_token et refresh_token dans un cookie "Secure", "HttpOnly" et "path".
- Secure : HTTPS
- HttpOnly : Contre les XSS par exemple (pas d'accès au cookie via un script par exemple),
- accès au cookie seulement via le protocol HTTP.
- Path: "/auth/token" pour restreindre le cookie à ce path

3. Package express-jwt (middleware pour décoder les JWT)
    ```
    $ npm install express-jwt --save
    ```

4. Package jsonwebtoken (générer les JWT)
    ```
    $ npm install jsonwebtoken --save
    ```

5. Ajouter objet "access_token" et attribues "secret", "exp" dans config.js

6. Créer "timestamp()" (time.js) helper pour la validité du JWT dans le temps et "string" helper

7. Faire middleware JWT dans config/server.js, celui qui va s'occuper de décoder et de dire si l'access_token est valide ou non

8. Faire middleware pour traiter les erreurs erreurs liés au JWT (middlewares/authError.js) https://i.gyazo.com/c18dc14c932b271a7f1c9eebd6a04f13.png

9. Faire rider guard middleware et l'associer aux ressources /riders concernées (middlewares/riderGuard.js) https://i.gyazo.com/85ad07c0a7b5939776415822e118dade.png (tenter d'accèder à une ressource rider quand on est driver par exemple)

Voilà nous avons posté nos gardiens devant notre château, maintenant on va voir comment créer notre JWT via le package "jsonwebtoken" que l'on a installé.

## 15- Authentification

1. Faire route racine /auth dans "server.js" + créer dossier "auth" comprenant "auth.routes.js" et faire la route "/auth/token" (possibiltié de décenralisé le tout sur un serveur différent)

2. Faire "auth/auth.controller.js" avec action "create"

3. Ecrire code pour le grant_type=password jusqu'à avoir le retour https://i.gyazo.com/2f697fb402116b23c9a8f128982ba6c4.png (besoin de créer devices/device.model.js)

## 16- Mise à jour d'un token d'authentification

- Faire process avec grant_type=refresh_token
Donc créer nouvelle table "device" qui contiendra nos clients, donc les différents appareils que pourraient utiliser l'utilisateur
https://i.gyazo.com/9292aab348d8b5056e2ebdc7a1a5ac68.png
Faire nouveau helper "validator" pour checker si le refresh_token est bien un SHA-1, car le package "Validator" ne gère pas se cas

## 17- Renommer et révoquer un appareil

Comme on l'a dit, l'utilisateur peut révoquer l'accès d'un appareil spécifique à son compte. Il peut aussi renommer le nom de cet appareil pour que ce soit plus "user friendly".
/devices/:uuid (refresh_token|name)

1. Créer routes nécessaires /devices

2. Faire devices/device.controller.js + créer action "edit"

3. Retour révocation d'un appareil : https://i.gyazo.com/a2e9c539ce33a987a9df242f1bfe349e.png

4. Retour édition du nom d'un appareil : https://i.gyazo.com/67a67005eae2ce82e0eb0dc8c63f034c.png

## 18- Tests d'intégration liés à l'authentification

- Faire les specs couvrant l'authentification / autorisation / révocation (auth.spec.js + device.spec.js)

## 19- Preloading

Comme dit dans un épisode précédent : "En fonction de la stratégie choisie, il est possible
de preloaded les modules lorsque les modules nécessaires pour la feature ou route en cours ont correctement été chargés.
Mais on verra ça plus tard."


Avec la stratégie "PreloadAllModules", tous les modules qui tendent à être lazy loaded seront chargés.
Pour ça il suffit simplement d'importer le module "PreloadAllModules" à notre routing principal et d'y spécifier la stratégie.


Il est également possible d'utiliser une stratégie personnalisée qui nous laissera le choix sur les modules que l'on
veut preloaded, sans dépendre du lazy loading, c'est la stratégie que l'on va utiliser pour une meilleure souplesse.

1. Créer "core/selective-preloading-strategy", cf https://angular.io/docs/ts/latest/guide/router.html#custom-preloading-strategy

2. Ajouter la stratégie dans "app-routing.module.ts"

3. Ajouter "preload: true" à la route "register"


Maintenant, en plus d'être lazy loaded, nos routes peuvent être preloaded. Attention tout de même de ne pas en abuser,
ici on sait que si l'utilisateur n'est pas authentifié, il a de grande chose chance d'attérir sur l'inscription,
c'est pour ça que l'on peut se permettre de preloaded.

## 20- Vue de connexion

Pour connecter l'utilisateur, on va créer un service "core/auth.service.ts".

Voici le déroulement général de l'authentification :

1. Rediriger le rider sur la vue de connexion après inscription

2. Se connecter

3. Récupérer le JWT + refresh_token + client_id et stocker les trois entités dans trois cookies différents en répondant bien aux spécificités du dessus à ce sujet
(au choix : possibilité de récupérer "expires_in", set date d'expiration et enregistrer le tout en local storage pour anticiper à chaque requête / changement de vue la MàJ du JWT (access_token). L'idéale serait de faire ça avec les sockets)

4. Envoyer le JWT à chaque requête, si JWT non trouvé alors vérifier si refresh_token et client_id existent sont présent, si oui, demander nouveau JWT, si un des deux derniers manquent, alors rediriger sur vue de connexion

5. Si 401 retourné, alors vérifier si refresh_token et client_id existent sont présent, si oui, demander nouveau JWT, si un des deux derniers manquent, alors rediriger sur vue de connexion

6. A chaque changement de vue, vérifier si JWT présent, si non rediriger sur vue de connexion

*[En cours]*

## 21- Tableau de bord

1. Créer feature "dashboard"

2. Une fois connecté l'utilisateur sera redirigé vers le "dashboard", l'accès à cette feature doit être protégée via un garde
(de la même façon que pour le backend), ici on utilisera "CanActivate" qui sera en fait un service que l'on va créer
dans core/auth-guard.service.ts, cf https://angular.io/docs/ts/latest/guide/router.html#!#guard-the-admin-feature.

3. Cependant, le "dashboard" sera toujours preloaded, même si l'utilisateur n'est pas connecté. Pour pallier à ça
il faut ajouter un nouveau garde : "CanLoad" qui utilisera la même logique que "CanActivate" mais pour vérifier
si il faut charger ou non le module adéquat, cf https://angular.io/docs/ts/latest/guide/router.html#!#can-load-guard.

4. Les gardes "CanActivate" et "CanLoad" seront ajoutés devant les portes de chaque feature nécessitant l'authentification.

*[En cours]*

# Notes
Différencier les riders des drivers à l'inscription et à l'authentification.

FIXER PROBLEMATIQUE : "La boucle qui controle le temps d’annulation tourne bien sur le serveur et n’attend pas la mise à jour de la webapp ? parceque la il ne s’est rien passé pendant 20 min, jusqu’a ce que le Majordome relance son navigateur"
Rendre le serveur autonomme. Node.js corrige déjà ça ? Passer par les websockets (socket.io) ?

UTILISER LES WEBSOCKETS AVEC SOCKET.IO POUR ACTUALISER LA POSITION DU DRIVER
cf http://stackoverflow.com/questions/31715179/differences-between-websockets-and-long-polling-for-turn-based-game-server

FAIRE BARRE DE PROGRESSION ANIME (PLUS LE DRIVER APPROCHE, PLUS LA COULEUR DEVIENT FONCE)

## Dev tips
- Utiliser "export default" lorsqu'il n'y a seulement qu'un export dans le fichier
- Ne pas exporter des entités mutables (var, let)
- Préciser que l'on utilisera SCSS si projet déjà créé avec Angular-CLI
    ```sh
    $ ng set defaults.styleExt scss
    ```
    - Ceci ajoute une règle à la config Angular-CLI dans le fichier angular-cli.json. Dans angular-cli.json préciser styles.scss et le créer)

- Compiler pour la prod' avec Angular-CLI
    ```sh
    $ ng build --prod
    ```
- Package pour comparer et mettre à jour les dépendances d'un projet
    ```sh
    $ npm install -g npm-check-updates
    ```
    - Comparer les version actuelles (fait un "npm outdated" en gros)
        ```sh
        $ ncu
        ```
    - Upgrade les versions actuelles
        ```sh
        $ ncu -u
        ```
- Problème, en production lorsque l'on tente d'accèder à une route qui n'est pas la racine, on tombe sur une 404 car le Web server ne connaît que la racine. Il faut donc préciser que si une ressource n'existe pas, alors rediriger sur index.html qui s'occupera de charger le nécessaire.
Générer fichier .htaccess :
    ```apache
    RewriteEngine On  
    # If an existing asset or directory is requested go to it as it is
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
    RewriteRule ^ - [L]
    
    # If the requested resource doesn't exist, use index.html
    RewriteRule ^ /index.html
    ```

### Yarn
- Ajouter une dépendance
    ```sh
    $ yarn add [package]
    ```
    
 - Ajouter dépendance de développement
    ```sh
    $ yarn add [package] [--dev/-D]
    ```
     
 - Mettre à jour les dépendances
    ```sh
    $ yarn upgrade
    ```

# Liens utiles
## Arborescence
- https://code.tutsplus.com/tutorials/build-a-complete-mvc-website-with-expressjs--net-34168
- https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/
- https://angular.io/styleguide#!#app-structure-and-angular-modules

## Bases de données
- https://www.linkedin.com/pulse/brief-introduction-mongodb-mysql-mohammadreza-faramarzi
- http://www.theserverside.com/feature/How-NoSQL-MySQL-and-MogoDB-worked-together-to-solve-a-big-data-problem
- https://www.quora.com/Why-does-Quora-use-MySQL-as-the-data-store-instead-of-NoSQLs-such-as-Cassandra-MongoDB-or-CouchDB
- http://gotocon.com/dl/goto-aar-2014/slides/MartyWeiner_ScalingPinterest.pdf
- http://stackoverflow.com/questions/7888880/what-is-redis-and-what-do-i-use-it-for

## Authentification
- https://tools.ietf.org/html/rfc6749
- https://tools.ietf.org/html/rfc7519
- https://blog.hyphe.me/using-refresh-tokens-for-permanent-user-sessions-in-node/
- https://auth0.com/forum/t/can-i-change-a-jwts-expiration-field-in-order-to-invalidate-it/1198
- http://security.stackexchange.com/questions/91116/is-my-jwt-refresh-plan-secure
- https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
- http://stackoverflow.com/questions/26739167/jwt-json-web-token-automatic-prolongation-of-expiration/26834685#26834685

## Map
- https://www.mapbox.com/
- http://leafletjs.com/

## Angular 2
### Routing
https://angular.io/docs/ts/latest/guide/router.html#the-heroes-app-code
https://angular.io/docs/ts/latest/guide/router.html#add-heroes-functionality
https://scotch.io/tutorials/routing-angular-2-single-page-apps-with-the-component-router
### Auth
http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial

## A savoir
- http://node.green/
- http://stackoverflow.com/questions/22891211/what-is-difference-between-save-and-save-dev
- bcrypt https://codahale.com/how-to-safely-store-a-password/
- Utiliser chai Should dans ES6 http://chaijs.com/guide/styles/#using-should-in-es2015

# Liens plugins / packages
- ngCordova : module Cordova pour Angular pour profiter des composants natifs
http://ngcordova.com/docs/install/ (bower install ngCordova)
- http://ngcordova.com/docs/plugins/geolocation/ (cordova plugin add cordova-plugin-geolocation)
- Utiliser Sass avec Ionic : http://ionicframework.com/docs/cli/sass.html (ionic setup sass)
- Package plumber (npm install --save-dev gulp-plumber) de cette façon ça stoppera pas la tâche, mais affichera les erreurs liées à notre style
- Express : http://expressjs.com/fr/ (micro-framework)
- Nodemon : https://github.com/remy/nodemon (recharge automatiquement application node lorsqu'un fichier est modifié)
- Babel : https://babeljs.io/ transformer ES6 (ECMAScript 2015) en ES5. Implémentation Node.js : https://github.com/babel/example-node-server
- ESLint : https://github.com/eslint/eslint
- Package eslint-config-airbnb : https://www.npmjs.com/package/eslint-config-airbnb
- Package eslint-plugin-import : https://www.npmjs.com/package/eslint-plugin-import
- eslint-plugin-jsx-a11y : https://www.npmjs.com/package/eslint-plugin-jsx-a11y
- eslint-plugin-react : https://www.npmjs.com/package/eslint-plugin-react
- Package mysql : https://www.npmjs.com/package/mysql
- Package body-parser : https://www.npmjs.com/package/body-parser
- Package validator : https://www.npmjs.com/package/validator
- Package uuid : https://www.npmjs.com/package/uuid
- Package bcrypt : https://www.npmjs.com/package/bcrypt
- Package mocha : https://www.npmjs.com/package/mocha
- Package chai : https://www.npmjs.com/package/chai
- Package chai-http : https://www.npmjs.com/package/chai-http
- Package chai-things : https://www.npmjs.com/package/chai-things
- Package express-jwt : https://www.npmjs.com/package/express-jwt
- Package jsonwebtoken : https://www.npmjs.com/package/jsonwebtoken
- Package shx : https://www.npmjs.com/package/shx

# Auteur
**Louis Grenard** : https://www.louistiti.fr

[![twitter](https://img.shields.io/twitter/follow/louistiti_fr.svg?style=social)](https://twitter.com/intent/follow?screen_name=louistiti_fr)

# Licence
MIT License

Copyright (c) 2016 Louistiti <louis.grenard@gmail.com>

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

# Cheers !
![Cheers !](https://assets-cdn.github.com/images/icons/emoji/unicode/1f37b.png?v6 "Cheers !")
