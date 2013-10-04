/* jshint expr: true, es3: false */
'use strict';

var app = require('../server/server');

describe('Full Stack Application Test', function () {

    it('Server listens', function (done) {
        app.get('start')(done);
    });

});
