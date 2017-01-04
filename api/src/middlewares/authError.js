'use strict';

import response from '../helpers/response';

const authErrorMidd = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        response.error(res, 401, ['invalid_access_token']);
    } else {
        next();
    }
};

export default authErrorMidd;
