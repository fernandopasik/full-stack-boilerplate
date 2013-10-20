define([
    'backbone',
    '../communicator',
    '../models/example'
],
function (Backbone, Communicator, ExampleModel) {
    'use strict';

    return Backbone.Collection.extend({

        url: '/api/example',
        model: ExampleModel,

        initialize: function () {
            Communicator.mediator.on('examples:refresh', function () {
                this.fetch();
            }, this);
        }
    });
});
