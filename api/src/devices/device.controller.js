'use strict';

import EventEmitter from 'events';

import Device from './device.model';

import response from '../helpers/response';
import log from '../helpers/log';

const deviceController = {};

deviceController.patch = (req, res) => {
    log.info('Hi! Editing a device...');

    const revoked = req.body.revoked;
    const name = req.body.name;

    let code = '';

    // Split to avoid callbacks hell
    const checkEvent = new EventEmitter();

    const checking = () => {
        const errors = [];

        if (!revoked && !name) {
            errors.push('missing_params');
        } else if (revoked && name) {
            errors.push('too_many_params');
        } else {
            Device.doesTheDeviceBelongToTheUser([
                req.params.uuid,
                req.user.user,
                req.user.user_type
            ], (result) => {
                if (result) {
                    if (revoked && revoked === 'true') {
                        code = 'device_revoked';

                        checkEvent.emit('success_revoked');
                    } else if (name) {
                        code = 'device_name_changed';

                        checkEvent.emit('success_name');
                    } else {
                        errors.push('invalid_param_value');
                        checkEvent.emit('error', errors);
                    }
                } else {
                    errors.push('the_device_does_not_belong_to_the_user');
                    checkEvent.emit('error', errors);
                }
            });
        }

        if (errors.length > 0) {
            checkEvent.emit('error', errors);
        }
    };

    checkEvent.on('error', (err) => {
        let status = 400;

        if (err[0] === 'the_device_does_not_belong_to_the_user') {
            status = 404;
        }

        response.error(res, status, err);
    });

    checking();

    checkEvent.on('success_revoked', () => {
        Device.updateOneColumn([
            'revoked',
            1,
            req.params.uuid,
            req.user.user,
            req.user.user_type
        ], () => {
            response.success(res, 200, code, { device: { revoked: true } });
        });
    });

    checkEvent.on('success_name', () => {
        Device.updateOneColumn([
            'name',
            name,
            req.params.uuid,
            req.user.user,
            req.user.user_type
        ], () => {
            response.success(res, 200, code, { device: { name } });
        });
    });
};

export default deviceController;
