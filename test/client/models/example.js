/* jshint expr: true, es3: false */

define([
    'underscore',
    'mocha',
    'chai',
    'scripts/models/example'
],
function (_, mocha, chai, ExampleModel) {
    'use strict';

    var expect = chai.expect;

    describe('Example Model', function () {

        before(function () {
            this.exampleModel = new ExampleModel({
                name: 'this is an example backbone model'
            });
            this.idInserted = null;
            this.inserted = null;
        });

        describe('should have:', function () {

            it('a name', function () {
                expect(this.exampleModel.has('name')).to.be.true;
            });

        });

        describe('the defaults should be:', function () {

            it('name is an empty string', function () {
                var exampleModel = new ExampleModel({});
                expect(exampleModel.get('name')).to.be.a('String')
                    .and.to.be.empty;
            });

        });

        describe('the validations:', function () {

            it('the name should not be empty', function () {
                var exampleModel = new ExampleModel({});
                expect(exampleModel.isValid()).to.be.false;
            });

            it('the name must be a string', function () {
                var exampleModel = new ExampleModel({name: 12});
                expect(exampleModel.isValid()).to.be.false;
            });

            it('a valid name example', function () {
                expect(this.exampleModel.isValid()).to.be.true;
            });

        });

        describe('the CRUD:', function () {

            it('Create', function (done) {
                var self = this;
                this.exampleModel.save({}, {
                    success: function (model, response) {
                        expect(_.isEqual(
                            response,
                            self.exampleModel.toJSON()
                        )).to.be.true;
                        self.idInserted = response._id;
                        self.inserted = response;
                        done();
                    },
                    error: function (model, xhr) {
                        done(new Error(xhr.responseText));
                    }
                });
            });

            it('Read', function (done) {
                var self = this,
                    exampleModel = new ExampleModel({
                        _id: this.idInserted
                    });

                exampleModel.fetch({
                    success: function (model, response) {
                        expect(_.isEqual(
                            response,
                            self.exampleModel.toJSON()
                        )).to.be.true;
                        done();
                    },
                    error: function (model, xhr) {
                        done(new Error(xhr.responseText));
                    }
                });
            });

            it('Update', function (done) {
                var self = this;
                this.exampleModel.save(
                    {name: 'this is an example backbone model too'},
                    {
                        success: function (model, response) {
                            expect(_.isEqual(
                                response,
                                self.exampleModel.toJSON()
                            )).to.be.true;
                            done();
                        },
                        error: function (model, xhr) {
                            done(new Error(xhr.responseText));
                        }
                    }
                );
            });

            it('Delete', function (done) {
                var self = this;
                this.exampleModel.destroy({
                    success: function (model, response) {
                        expect(_.isEqual(
                            response,
                            self.exampleModel.toJSON()
                        )).to.be.true;
                        done();
                    },
                    error: function (model, xhr) {
                        done(new Error(xhr.responseText));
                    }
                });
            });
        });

    });

});
