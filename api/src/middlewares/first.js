'use strict';

import log from '../helpers/log';
import { app } from '../config/config';

const firstMidd = (req, res, next) => {
    // Disable from the header, else it makes hacker's life easier to know more about our system
    res.removeHeader('X-Powered-By');

    // Allow only a specific client to request to the API (depending of the env)
    res.header('Access-Control-Allow-Origin', `http://${app().host}:${app().port}`);

    // Allow several headers for our requests
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    log.title('Requesting');
    log.info(`Hi! Request ${req.method} ${req.url}`);

    // Add next() to continue
    next();
};

export default firstMidd;
