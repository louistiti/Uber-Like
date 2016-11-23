'use strict';

import log from '../helpers/log';

const firstMidd = (req, res, next) => {
    // Disable from the header, else it makes hacker's life easier to know more about our system
    res.removeHeader('X-Powered-By');

    log.title('Requesting');
    log.info(`Hi! Request ${req.method} ${req.url}`);

    // Add next() to continue
    next();
};

export default firstMidd;
