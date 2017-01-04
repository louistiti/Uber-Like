'use strict';

import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { api } from '../config/config';

import { timestamp } from '../helpers/time';

const generateAccessToken = (deviceId, userId, userType) => {
    const currentTimestamp = timestamp();
    const futureTimestamp = currentTimestamp + api().access_token.exp;

    return jwt.sign({
        iss: 'Uber-Like',
        exp: futureTimestamp,
        sub: deviceId,
        user: userId,
        user_type: userType
    }, api().access_token.secret);
};

const generateRefreshToken = deviceId => crypto.createHash('sha1').update((deviceId + api().refresh_token.salt)).digest('hex');

export {
    generateAccessToken,
    generateRefreshToken
};
