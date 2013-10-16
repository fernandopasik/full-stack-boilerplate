/* jshint expr: true, es3: false */
'use strict';

var app = require(process.cwd() + '/server/server'),
    childProcess = require('child_process'),
    mongoose = require('mongoose'),
    expect = require('chai').expect,
    db;

before(function (done) {

    this.timeout(0);
    // Server app start
    app.get('start')(function () {

        db = mongoose.connection.db;
        // Dropping test database just in case, before testing
        db.dropDatabase(function (err) {

            expect(err).to.not.exist;
            // Execute mocha-phantomjs for client tests
            childProcess.execFile(
                process.cwd() +
                '/node_modules/mocha-phantomjs/bin/mocha-phantomjs',
                ['http://localhost:9001/test'],
                function (err, stdout) {
                    expect(err).to.not.exist;
                    console.log(stdout);
                    done();
                }
            );
        });
    });
});

require('./server');
require('./server/schemas/example');
require('./server/routes/example');
