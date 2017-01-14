'use strict';

import { app } from '../config/config';

const corsMidd = (req, res, next) => {
    // Allow only a specific client to request to the API (depending of the env)
    res.header('Access-Control-Allow-Origin', `http://${app().host}:${app().port}`);

    // Allow several headers for our requests
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
};

export default corsMidd;
