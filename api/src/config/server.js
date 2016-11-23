'use strict';

import express from 'express';
import bodyParser from 'body-parser';

import { api } from './config';
import firstMidd from '../middlewares/first';
import riderRouter from '../users/rider.routes';
import log from '../helpers/log';

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

        log.title('Initialization');
        log.success(`Hi! The current env is ${process.env.NODE_ENV}`);

        this.bootstrap();
    }

    static bootstrap() {
        // Routes

        app.use(`${api().version}/riders`, riderRouter);
        // ... others routes components here

        this.listen();
    }

    static listen() {
        // Listen

        app.listen(api().port, (err) => {
            if (err) throw err;

            log.success(`Hi! Server is listening on ${api().port}`);
        });
    }
}

export default Server;
