'use strict';

import express from 'express';
import bodyParser from 'body-parser';

import { api } from './config';
import firstMidd from '../middlewares/first';
import riderRouter from '../users/rider.routes';

const app = express();

class Server {
    static init() {
        // Global middlewares

        // First middleware
        app.use(firstMidd);

        // Parse input values in JSON format
        app.use(bodyParser.json());
        // Parse from x-www-form-urlencoded, which is the universal content type
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.bootstrap();
    }

    static bootstrap() {
        // Routes

        app.get(api.version, (req, res) => {
            let test = {toto: 42};
            res.json(test);
        });

        app.use(`${api.version}riders/`, riderRouter);
        // ... others routes components here

        this.listen();
    }

    static listen() {
        // Listen

        app.listen(api.port, (err) => {
            if (err)
            {
                return console.log('error', err);
            }

            console.log(`Hi! Server is listening on ${api.port}`);
        });
    }
}

export default Server;

