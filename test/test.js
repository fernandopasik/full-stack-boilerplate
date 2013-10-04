/* jshint expr: true, es3: false */
'use strict';

var app = require('../server/server'),
    expect = require('chai').expect,
    request = require('superagent'),
    baseurl = 'http://localhost:9001/';

describe('Full Stack Application Test', function () {

    it('Server listens', function (done) {
        app.get('start')(done);
    });
    it('Access to root route', function (done) {
        request
            .get(baseurl)
            .end(function (res) {
                expect(res.ok).to.be.true;
                done();
            });
    });
    it('Index html response', function (done) {
        request
            .get(baseurl)
            .end(function (res) {
                expect(res.ok).to.be.true;
                expect(res.type).to.equal('text/html');
                done();
            });
    });
    it('main css file', function (done) {
        request
            .get(baseurl + 'styles/main.css')
            .end(function (res) {
                expect(res.ok).to.be.true;
                expect(res.type).to.equal('text/css');
                done();
            });
    });

});
