'use strict';

import uuid from 'uuid';
import { isEmail } from 'validator';
import bcrypt from 'bcrypt';

import Rider from './rider.model';
import { datetime } from '../helpers/time';

const riderController = {};

riderController.add = (req, res) => {
    console.log('Hi! Adding a rider...');

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    if (username && email && password) {
        if (isEmail(email)) {
            // TODO Check if username or email already exists

            // Generate password with 10 iterations for the algo
            bcrypt.hash(password, 10, (err, hash) => {
                req.body.password = hash;
                req.body.uuid = uuid.v4();
                req.body.created_at = datetime();

                Rider.add(req.body, () => {
                    console.log('Hi! Rider added');
                    // TODO http status 201 + JSON success
                });
            });
        }
        else {
            // TODO error incorrect email address
        }
    }
    else {
        // TODO error fields missings
    }
};

riderController.getAll = (req, res) => {
    console.log('Hi! Getting all of the riders...');
    Rider.getAll((rows) => {
        res.json(rows);
    });
};

export default riderController;