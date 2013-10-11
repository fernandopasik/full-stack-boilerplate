/* jshint expr: true, es3: false */
'use strict';

var app = require(process.cwd() + '/server/server'),
    expect = require('chai').expect,
    request = require('superagent'),
    baseurl = app.get('server_url') + ':' + app.get('port'),
    _ = require('underscore');

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
            .post(baseurl + '/api/example')
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
            .get(baseurl + '/api/example/' + this.idInserted)
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
            .get(baseurl + '/api/example')
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
            .put(baseurl + '/api/example/' + this.idInserted)
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
            .del(baseurl + '/api/example/' + this.idInserted)
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
