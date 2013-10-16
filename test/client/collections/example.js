/* jshint expr: true, es3: false */

define([
    'underscore',
    'mocha',
    'chai',
    'scripts/collections/example',
    'scripts/models/example',
],
function (_, mocha, chai, ExampleCollection, ExampleModel) {
    'use strict';

    var expect = chai.expect;

    describe('Example Collection', function () {

        it('should contain Example Models', function () {
            var examples = new ExampleCollection();
            examples.add({name: 'this is a test'});
            expect(examples.pop()).to.be.instanceof(ExampleModel);
        });

        before(function () {
            this.examples = new ExampleCollection();
            this.example = {
                name: 'this is a valid example'
            };
            this.idInserted = null;
        });

        describe('Sync methods', function () {

            it('Create', function (done) {
                var self = this;
                this.examples.create(this.example, {
                    success: function (model, response) {
                        expect(self.examples.length).to.equal(1);
                        self.idInserted = response._id;
                        done();
                    },
                    error: function (model, xhr) {
                        done(new Error(xhr.responseText));
                    }
                });
            });

            it('Fetch', function (done) {
                var examples = this.examples.clone();
                this.examples.fetch({
                    success: function (collection, response) {
                        expect(_.isEqual(examples.toJSON(), response))
                            .to.be.true;
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
