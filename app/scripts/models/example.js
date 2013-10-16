define([
    'backbone'
],
function (Backbone) {
    'use strict';

    return Backbone.Model.extend({

        idAttribute: '_id',

        urlRoot: '/api/example',

        defaults: {
            name: ''
        },

        validate: function (attrs) {
            if (typeof attrs.name !== 'string' || attrs.name === '') {
                return 'A name is needed for creating the example.';
            }
        }

    });

});
