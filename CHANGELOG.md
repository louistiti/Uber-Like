## 0.0.17 (2017-06-02)

### App
- [*coming*] Setup map

## 0.0.16 (2017-06-02)

### App
- [*coming*] Custom HTTP service for authenticated requests (JWT, ...)
- [*coming*] Get basics user data
- [*coming*] Header (logo, rides history, settings, logout)

## 0.0.15 (2017-06-02)

### App
- Signin view
- Send authentication request
- Clean TS lint warnings
- Set access_token, refresh_token and client_id in cookies to deal with auth
- protected/ path for authenticated resources/feature
- Protected layout (header)
- Auth guard
- Unauth guard
- Use angular2-jwt
- Fix lint command

## 0.0.14 (2017-05-04)

### App
- Switch template-driven forms to code-driven forms (reactive forms)
- Implement ngxErrors module for reactives forms

## 0.0.13 (2017-04-30)

### App
- Structure reviewed (core/ and shared/ modifications)
- Guard to prevent core's modules being instantiated more than one time
- Stop using `Renderer` class (deprecated)

## 0.0.12 (2017-04-11)

### Api
- Switch MySQL engine from MyISAM to InnoDB (thanks to @Elhebert)
- Set `AUTO_INCREMENT` value to 0 (thanks to @Elhebert)
- Review data modeling
- Add `sed` command in the `clone-db-test` script from the `package.json` file for testing
- Delete del-cli dev dependency
- Add shx dev dependency

## 0.0.11 (2017-03-25)

### App
- Upgrade to Angular 4
- Upgrade Angular CLI to v1.0.0
- yarn.lock

### Api
- yarn.lock

## 0.0.10 (2017-01-15)

### App
- Upgrade to Angular 2.4.3
- Upgrade to Angular-CLI 1.0.0-beta.25
- Upgrade others dependencies
- Preloading
- Core module
- Signin feature prepared

### Api
- Use /index.js to init the server for testing
- Clean "dist/" before building
- Allow OPTIONS verb for /riders ressource
- Fix CORS middleware

## 0.0.9 (2017-01-11)

### Api
- Integrations tests for authentication / authorization and revocation

## 0.0.8 (2017-01-04)

### Api
- Upgrade database from utf8 to utf8mb4 (thanks to @ptondereau)

## 0.0.7 (2017-01-04)

### Api
- Multi-devices authentication
- Revoke the access of a specific device
- Change the name of a specific device
- Refresh token implemented
- Guards middleware implemented
- Generate a new access token when it expires
- Log helper syntax reviewed (thanks to @Gynidark)

## 0.0.6 (2016-12-30)

### Api
- Authentication middleware with Json Web Tokens
- Create and return a JWT when credentials are OK
- Helper timestamp()
- Reorganize some middlewares
- Authentication specs done

## 0.0.5 (2016-12-20)

### App
- Lazy loading architecture (load chunks when needed)

## 0.0.5 (2016-12-19)

### Api
- CORS settings depending of the current env

### App
- Angular 2 structure
- Core done
- Home view
- Register view with checking
- Overload HTTP client to have a custom HTTP client and to not duplicate code
- Send the request to the API with data
- Display messages from server with a new component
- 404 component
- Loader component

## 0.0.4 (2016-11-23)

### Api
- Success return for POST method added
- test, dev and prod environments added
- Integration tests for POST /v1/riders added

## 0.0.3 (2016-11-17)

### Api
- POST /riders
- Universal responses created (able to manage several errors and several data)
- Setup and setting up of ESLint with Airbnb style guide

## 0.0.2 (2016-11-11)

### Api
- Core done:
    - Architecture splitted
    - First entity created (rider)
    - Database connection
    - Controller action "getAll()" created just to test

## 0.0.1 (2016-11-07)

### App
- Init project

### Api
- Init project