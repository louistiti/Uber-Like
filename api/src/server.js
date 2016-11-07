'use strict';

const config = require('./config/global');
const app = require('express')();

let run = () => {
    // First middleware
    app.use(require('./middlewares/first'));

    app.get(config.uri, (req, res) => {
        let test = {toto: 42};
        res.json(test);
    });

    app.listen(config.port, (err) => {
        if (err)
        {
            return console.log('error', err);
        }

        console.log(`server is listening on ${config.port}`);
    });
};

exports.run = run;

/*
var hello = () => {
    console.log(`Hi! I'm the server.`);
};

exports.hello = hello;
*/


