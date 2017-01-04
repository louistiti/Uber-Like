### 0.0.9 (2017-01-04)

### Api
- *[En cours]* Integrations tests for authentication / authorization and revocation

### 0.0.8 (2017-01-04)

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