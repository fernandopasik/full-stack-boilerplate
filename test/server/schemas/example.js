/* jshint expr: true, es3: false */
'use strict';

var expect = require('chai').expect,
    ExampleModel = require(process.cwd() + '/server/schemas/example').model;

describe('Example Schema', function () {

    before(function (done) {

        this.example = {
            name: 'This is an example'
        };

        // Clean up collection
        ExampleModel.collection.remove(function (err) {
            expect(err).to.not.exist;
            done();
        });

    });

    after(function (done) {

        // Clean up collection
        ExampleModel.collection.remove(function (err) {
            expect(err).to.not.exist;
            done();
        });

    });

    describe('it should have:', function () {

        it('a name', function (done) {
            ExampleModel.create(this.example, function (err, doc) {
                expect(err).to.not.exist;
                expect(doc.name).not.undefined;
                done();
            });
        });

    });

    describe('and the validations:', function () {

        it('name is required', function (done) {
            ExampleModel.create({}, function (err) {
                expect(err).to.exist;
                done();
            });
        });
        it('name is a string', function (done) {
            // the model converts any value to string
            ExampleModel.create({name: 2}, function (err, doc) {
                expect(err).to.not.exist;
                expect(doc.name).to.be.a('string');
                done();
            });
        });
        it('name is lowercase', function (done) {
            // the model converts any value to lowercase
            ExampleModel.create({name: 'ExaMple'}, function (err, doc) {
                expect(err).to.not.exist;
                expect(doc.name).to.equal('example');
                done();
            });
        });
    });

});
