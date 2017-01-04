'use strict';

import response from '../helpers/response';

const riderGuardMidd = (req, res, next) => {
    if (req.user) {
        if (req.user.user_type !== 'rider') {
            response.error(res, 403, ['insufficient_rights']);
        } else {
            next();
        }
    }
};

export default riderGuardMidd;
