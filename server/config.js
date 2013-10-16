/* jshint es3: false */
'use strict';

var PORT = 9000, // Constant for express server port

    express = require('express'),
    path = require('path'),
    http = require('http'),
    mongoose = require('mongoose');

module.exports = function (app) {

    var server = http.createServer(app),
        logListening = function () {
            console.log('Express App started in port:' + (app.get('port')));
        },
        addStatic = function (pth) {
            return express.static(path.join(__dirname, pth));
        };

    app.configure(function () {
        app.set('title', 'Full Stack Application');
        app.set('port', PORT);
        app.set('view engine', 'jade');
        app.set('views', __dirname + '/views');
        app.use(express.favicon());
        app.use(addStatic('../app'));
    });

    app.configure('development', function () {

        // Setting the mongodb url for development
        app.set('mongodb_url', 'mongodb://localhost/boilerplatedev');

        // Attend to listening event for connected message
        server.on('listening', logListening);

        // Useful logger for request and response status
        app.use(express.logger('dev'));

        // Shared folders by the server
        app.use(addStatic('../.tmp'));
        app.use('/bower_components', addStatic('../bower_components'));
        app.use(require('connect-livereload')());

    });

    app.configure('test', function () {

        // Setting the mongodb url for testing
        app.set('mongodb_url', 'mongodb://localhost/boilerplatetest');

        // Setting the server url for in case is needed
        // for example in tests
        app.set('server_url', 'http://localhost');

        // Useful logger for request and response status
        app.use(express.logger('dev'));

        // Override port for testing environment to not be the same
        app.set('port', PORT + 1);

        // Shared folders by the server
        app.use(addStatic('../.tmp'));
        app.use('/bower_components', addStatic('../bower_components'));
        app.use('/node_modules', addStatic('../node_modules'));
        app.use('/test', addStatic('../test/client'));

    });

    app.configure('production', function () {

    });

    app.configure(function () {

        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);

        // 404 and 500 error handling
        require('./error')(app);

        // Simple start method for initialize the server
        app.set('start', function (cb) {

            // Connect MongoDB
            mongoose.connect(app.get('mongodb_url'), function (err) {
                if (err) {
                    if (typeof cb === 'function') {
                        cb(err);
                    }
                }
                else {
                    // If the DB connection is ok start server
                    server.listen(app.get('port') || PORT, function () {
                        if (typeof cb === 'function') {
                            cb();
                        }
                    });
                }
            });

        });

    });

};
