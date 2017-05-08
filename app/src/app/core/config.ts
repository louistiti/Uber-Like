import { environment } from '../../environments/environment.dev';

const config = {
    suffixTitle: ' - [DEV] Uber Like',
    apiUrl: 'http://localhost:1337/v1',
    securedCookie: false,
    refreshTokenExp: ((3600 * 24) * 7)
};

if (environment.production === true) {
    config.suffixTitle = ' - Uber Like';
    config.apiUrl = 'http://localhost:1337/v1';
    config.securedCookie = true;
    config.refreshTokenExp = ((3600 * 24) * 7);
}

export default config;
