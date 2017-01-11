'use strict';

import bcrypt from 'bcrypt';
import uuid from 'uuid';
import EventEmitter from 'events';
import { isUUID } from 'validator';

import Rider from '../users/rider.model';
import Device from '../devices/device.model';

import { api } from '../config/config';

import { datetime } from '../helpers/time';
import { isSha1 } from '../helpers/validator';
import { generateAccessToken, generateRefreshToken } from '../helpers/token';
import response from '../helpers/response';
import log from '../helpers/log';

const authController = {};

authController.post = (req, res) => {
    // TODO: deal with it when mobile is coming (by taking device name as default)
    const deviceName = 'Ordinateur principal';

    const grantType = req.body.grant_type;
    const userType = req.body.user_type;

    const checkEvent = new EventEmitter();

    const checking = () => {
        const errors = [];

        if (!grantType) {
            errors.push('missing_params');
        } else {
            const allowedUserTypes = ['rider', 'driver'];

            if (grantType === 'password') {
                log.info('Hi! Authenticating...');

                const email = req.body.email;
                const password = req.body.password;

                if (!email || !password || !userType) {
                    errors.push('missing_params');
                } else {
                    if (allowedUserTypes.indexOf(userType) === -1) {
                        errors.push('invalid_user_type');
                    }

                    if (errors.length === 0) {
                        // TODO Use "let" when Driver model is available
                        const model = Rider;

                        if (userType === 'driver') {
                            // model = Driver;
                        }

                        model.findOneByEmail([email], (result) => {
                            if (result.length > 0) {
                                bcrypt.compare(password, result[0].password, (err, isMatch) => {
                                    if (err) throw err;

                                    if (isMatch) {
                                        checkEvent.emit('success_password_grant', result[0]);
                                    } else {
                                        errors.push('invalid_credentials');
                                        checkEvent.emit('error', errors);
                                    }
                                });
                            } else {
                                errors.push('invalid_credentials');
                                checkEvent.emit('error', errors);
                            }
                        });
                    }
                }
            } else if (grantType === 'refresh_token') {
                log.info('Hi! Refreshing tokens...');

                const refreshToken = req.body.refresh_token;
                const clientId = req.body.client_id;

                if (!refreshToken || !clientId) {
                    errors.push('missing_params');
                } else {
                    if (!isUUID(clientId) || !isSha1(refreshToken)) {
                        errors.push('invalid_client');
                    }

                    if (errors.length === 0) {
                        Device.doesTheRefreshTokenValid([clientId, refreshToken], (result) => {
                            if (result.length > 0) {
                                checkEvent.emit('success_refresh_token_grant', result[0]);
                            } else {
                                errors.push('invalid_client');
                                checkEvent.emit('error', errors);
                            }
                        });
                    }
                }
            } else {
                errors.push('invalid_grant_type');
            }
        }

        if (errors.length > 0) {
            checkEvent.emit('error', errors);
        }
    };

    checkEvent.on('error', (err) => {
        let status = 400;

        if (err[0] === 'invalid_credentials') {
            status = 401;
        }

        response.error(res, status, err);
    });

    checking();

    checkEvent.on('success_password_grant', (result) => {
        const deviceId = uuid.v4();

        const accessToken = generateAccessToken(deviceId, result.uuid, userType);
        const refreshToken = generateRefreshToken(deviceId);

        const newDevice = {
            uuid: deviceId,
            user_uuid: result.uuid,
            user_type: userType,
            refresh_token: refreshToken,
            name: deviceName,
            created_at: datetime()
        };

        Device.add(newDevice, () => {
            // TODO Use "let" when Driver model is available
            const code = 'rider_authenticated';

            if (userType === 'driver') {
                // code = 'driver_authenticated';
            }

            response.success(res, 200, code,
                {
                    access_token: accessToken,
                    token_type: 'bearer',
                    expires_in: api().access_token.exp,
                    refresh_token: refreshToken,
                    client_id: deviceId
                }
            );
        });
    });

    checkEvent.on('success_refresh_token_grant', (result) => {
        const deviceId = uuid.v4();

        const newAccessToken = generateAccessToken(
            deviceId, result.user_uuid, result.user_type
        );
        const newRefreshToken = generateRefreshToken(deviceId);

        Device.updateRefreshToken([
            newRefreshToken,
            result.refresh_token,
            result.uuid
        ], () => {
            response.success(res, 200, 'tokens_updated',
                {
                    access_token: newAccessToken,
                    token_type: 'bearer',
                    expires_in: api().access_token.exp,
                    refresh_token: newRefreshToken,
                    client_id: result.uuid
                }
            );
        });
    });
};

export default authController;
