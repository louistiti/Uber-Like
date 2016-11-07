'use strict';

import { config, toto } from './config';
import express from 'express';

class Server {
    constructor() {
        this.app = express();
    }

    run() {
        console.log(toto);

        // First middleware
        this.app.use(require('./../middlewares/first'));

        this.app.get(config.version, (req, res) => {
            let test = {toto: 42};
            res.json(test);
        });

        this.app.listen(config.port, (err) => {
            if (err)
            {
                return console.log('error', err);
            }

            console.log(`server is listening on ${config.port}`);
        });
    }
}

export default Server;

/*
var hello = () => {
    console.log(`Hi! I'm the server.`);
};

exports.hello = hello;
*/


