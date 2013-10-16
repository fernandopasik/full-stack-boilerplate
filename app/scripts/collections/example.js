define([
    'backbone',
    '../models/example'
],
function (Backbone, ExampleModel) {
    'use strict';

    return Backbone.Collection.extend({

        url: '/api/example',
        model: ExampleModel

    });
});
