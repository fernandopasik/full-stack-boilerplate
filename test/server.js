/* jshint expr: true, es3: false */
'use strict';

var app = require(process.cwd() + '/server/server'),
    expect = require('chai').expect,
    request = require('superagent'),
    baseurl = app.get('server_url') + ':' + app.get('port') + '/',
    mongoose = require('mongoose');

after(function () {
    // Cleanup test database
});

describe('Server Application Test', function () {

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

    it('MongoDB is online and operational', function (done) {

        var db = mongoose.connection.db;

        // Testing a collection and adding an element
        db.collection('test_collection', function (err, collection) {
            expect(err).to.not.exist;
            collection.insert({hello: 'world'}, function (err) {
                expect(err).to.not.exist;

                // Good to Go
                done();
            });
        });

    });

});
