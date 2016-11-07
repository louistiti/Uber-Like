'use strict';

var _config = require('./config');

var app = require('express')();

var run = function run() {
    // First middleware
    app.use(require('./../middlewares/first'));

    app.get(_config.config.uri, function (req, res) {
        var test = { toto: 42 };
        res.json(test);
    });

    app.listen(_config.config.port, function (err) {
        if (err) {
            return console.log('error', err);
        }

        console.log('server is listening on ' + _config.config.port);
    });
};

exports.run = run;

/*
var hello = () => {
    console.log(`Hi! I'm the server.`);
};

exports.hello = hello;
*/