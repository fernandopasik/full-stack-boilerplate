/* jshint es3: false */
'use strict';

var PORT = 9000;

var express = require('express'),
    http = require('http');

module.exports = function (app) {

    var server = http.createServer(app),
        logListening = function () {
            console.log('Express App started in port:' + (app.get('port')));
        };

    app.configure(function () {
        app.set('port', PORT);
    });

    app.configure('development', function () {

        // Attend to listening event for connected message
        server.on('listening', logListening);
        // Useful logger for request and response status
        app.use(express.logger('dev'));

    });

    app.configure('test', function () {

        // Override port for testing environment to not be the same
        app.set('port', PORT + 1);

    });

    app.configure('production', function () {

    });

    app.configure(function () {

        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);

        // Simple start method for initialize the server
        app.set('start', function (cb) {
            server.listen(app.get('port') || PORT, function () {
                if (cb) {
                    cb();
                }
            });
        });

    });

};
