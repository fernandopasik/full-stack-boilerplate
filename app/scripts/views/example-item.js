define([
    'backbone.marionette',
    'tpl!templates/example-item.tpl'
],
function (Marionette, ExampleItemTemplate) {
    'use strict';

    return Marionette.ItemView.extend({
        template: ExampleItemTemplate,
        tagName: 'li',
        ui: {
            'button': 'button'
        },
        events: {
            'click button': 'removeExample'
        },
        removeExample: function () {
            this.model.destroy();
        }
    });
});
