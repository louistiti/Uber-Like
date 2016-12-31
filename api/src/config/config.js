'use strict';

// Should use trim() to be sure we do not have white space (cf Windows)
if (typeof process.env.NODE_ENV !== 'undefined') {
    process.env.NODE_ENV = process.env.NODE_ENV.trim();
} else {
    process.env.NODE_ENV = 'dev';
}

const app = () => {
    const conf = {
        test: {
            host: 'localhost',
            port: 4200
        },
        dev: {
            host: 'localhost',
            port: 4200
        },
        prod: {
            host: 'localhost',
            port: 4200
        }
    };

    return conf[process.env.NODE_ENV];
};

const api = () => {
    const conf = {
        test: {
            host: 'localhost',
            port: 1337,
            version: '/v1',
            token: {
                secret: 'my-secret-key',
                exp: ((3600 * 24) * 7)
            }
        },
        dev: {
            host: 'localhost',
            port: 1337,
            version: '/v1',
            token: {
                secret: 'my-secret-key',
                exp: ((3600 * 24) * 7) // Token valid for 7 days
            }
        },
        prod: {
            host: 'localhost',
            port: 1337,
            version: '/v1',
            token: {
                secret: 'my-secret-key',
                exp: ((3600 * 24) * 7)
            }
        }
    };

    return conf[process.env.NODE_ENV];
};

const db = () => {
    const conf = {
        test: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'uberlike_test',
            port: 3306
        },
        dev: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'uberlike',
            port: 3306
        },
        prod: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'uberlike',
            port: 3306
        }
    };

    return conf[process.env.NODE_ENV];
};

export {
    app,
    api,
    db
};
