/* jshint expr: true, es3: false */
'use strict';

var app = require(process.cwd() + '/server/server'),
    expect = require('chai').expect,
    request = require('superagent'),
    baseurl = app.get('server_url') + ':' + app.get('port') + '/',
    _ = require('underscore'),
    io = require('socket.io-client');

describe('CRUD for Example API', function () {

    before(function () {
        this.idInserted = '1';
        this.example = {
            name: 'this is an example'
        };
    });

    it('Create', function (done) {

        var self = this;
        request
            .post(baseurl + 'api/example')
            .set('Content-Type', 'application/json')
            .send(this.example)
            .end(function (res) {
                // Is not 404
                expect(res.status).to.not.equal(404);
                // Request sent is json
                expect(res.status).to.not.equal(403);
                // Response is json
                expect(res.type).to.equal('application/json');

                // Save the id for use it on the other tests
                expect(res.body._id).to.exist;
                self.idInserted = res.body._id;

                // The REST api should return the object inserted
                expect(_.isEqual(_.omit(
                    res.body, ['__v', '_id']),
                    self.example
                    )).to.be.true;

                done();
            });

    });

    it('Read', function (done) {

        var self = this;
        request
            .get(baseurl + 'api/example/' + this.idInserted)
            .set('Content-Type', 'application/json')
            .send({})
            .end(function (res) {
                // Is not 404
                expect(res.status).to.not.equal(404);
                // Request sent is json
                expect(res.status).to.not.equal(403);
                // Response is json
                expect(res.type).to.equal('application/json');

                // The REST api should return the object inserted
                expect(_.isEqual(_.omit(
                    res.body, ['__v', '_id']),
                    self.example
                    )).to.be.true;

                done();
            });

    });

    it('Browse', function (done) {

        var self = this;
        request
            .get(baseurl + 'api/example')
            .set('Content-Type', 'application/json')
            .send({})
            .end(function (res) {
                // Is not 404
                expect(res.status).to.not.equal(404);
                // Request sent is json
                expect(res.status).to.not.equal(403);
                // Response is json
                expect(res.type).to.equal('application/json');

                // The REST api should return an array of objects
                expect(res.body).to.be.a('array');
                // Let's compare to the only supposed inserted
                // poping it out of the array
                expect(_.isEqual(_.omit(
                    res.body.pop(), ['__v', '_id']),
                    self.example
                    )).to.be.true;

                done();
            });

    });

    it('Update', function (done) {

        var self = this;
        this.example = {
            name: 'this is an example too'
        };
        request
            .put(baseurl + 'api/example/' + this.idInserted)
            .set('Content-Type', 'application/json')
            .send(this.example)
            .end(function (res) {
                // Is not 404
                expect(res.status).to.not.equal(404);
                // Request sent is json
                expect(res.status).to.not.equal(403);
                // Response is json
                expect(res.type).to.equal('application/json');

                // The REST api should return the object inserted
                expect(_.isEqual(_.omit(
                    res.body, ['__v', '_id']),
                    self.example
                    )).to.be.true;

                done();
            });

    });

    it('Delete', function (done) {

        var self = this;
        request
            .del(baseurl + 'api/example/' + this.idInserted)
            .set('Content-Type', 'application/json')
            .send({})
            .end(function (res) {
                // Is not 404
                expect(res.status).to.not.equal(404);
                // Request sent is json
                expect(res.status).to.not.equal(403);
                // Response is json
                expect(res.type).to.equal('application/json');

                // The REST api should return the object inserted
                expect(_.isEqual(_.omit(
                    res.body, ['__v', '_id']),
                    self.example
                    )).to.be.true;

                done();
            });

    });

});

describe('WebSocket emit for Example API', function () {

    before(function (done) {

        var self = this;
        this.socket = io.connect(baseurl, {'force new connection': true});
        this.socket.on('connect', function () {
            done();
        });
        this.socket.on('error', function () {
            done(new Error('Error on socket connection'));
        });
        this.socket.on('refreshExample', function () {
            self.callback();
        });

    });

    after(function (done) {

        this.serverSocket.on('disconnect', function () {
            done();
        });
        this.socket.disconnect();

    });

    it('on Create', function (done) {

        var self = this;
        this.callback = done;
        request
            .post(baseurl + 'api/example')
            .set('Content-Type', 'application/json')
            .send({name: 'this is an example'})
            .end(function (res) {
                self.idInserted = res.body._id;
            });

    });

    it('on Update', function (done) {

        this.callback = done;
        request
            .put(baseurl + 'api/example/' + this.idInserted)
            .set('Content-Type', 'application/json')
            .send({name: 'this is an example too'})
            .end();

    });

    it('on Delete', function (done) {

        this.callback = done;
        request
            .del(baseurl + 'api/example/' + this.idInserted)
            .set('Content-Type', 'application/json')
            .send({})
            .end();

    });

});
