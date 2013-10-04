/* jshint expr: true, es3: false */
'use strict';

var app = require('../server/server'),
    expect = require('chai').expect,
    request = require('superagent');

describe('Full Stack Application Test', function () {

    it('Server listens', function (done) {
        app.get('start')(done);
    });
    it('Access to root route', function (done) {
        request
            .get('http://localhost:9001/')
            .end(function (res) {
                expect(res.ok).to.be.true;
                done();
            });
    });

});
