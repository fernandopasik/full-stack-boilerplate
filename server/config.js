/* jshint es3: false */
'use strict';

var PORT = 9000;

var express = require('express'),
    path = require('path'),
    http = require('http');

module.exports = function (app) {

    var server = http.createServer(app),
        logListening = function () {
            console.log('Express App started in port:' + (app.get('port')));
        },
        addStatic = function (pth) {
            return express.static(path.join(__dirname, pth));
        };

    app.configure(function () {
        app.set('port', PORT);
        app.set('view engine', 'jade');
        app.set('views', __dirname + '/views');
        app.use(addStatic('../app'));
    });

    app.configure('development', function () {

        // Attend to listening event for connected message
        server.on('listening', logListening);
        // Useful logger for request and response status
        app.use(express.logger('dev'));
        app.use(addStatic('../.tmp'));
        app.use(require('connect-livereload')());

    });

    app.configure('test', function () {

        // Override port for testing environment to not be the same
        app.set('port', PORT + 1);
        app.use(addStatic('../.tmp'));

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
