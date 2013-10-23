define([
    'backbone.marionette',
    './example-item',
    'tpl!templates/example-list.tpl',
    'tpl!templates/example-list-empty.tpl'
],
function (Marionette, ExampleItemView, ExampleListTemplate,
    ExampleListEmptyTemplate) {
    'use strict';

    return Marionette.CompositeView.extend({
        template: ExampleListTemplate,
        emptyView: Marionette.ItemView.extend({
            template: ExampleListEmptyTemplate
        }),
        itemView: ExampleItemView,
        itemViewContainer: 'ul',
        ui: {
            'input': 'input'
        },
        events: {
            'keypress input': 'addOnEnter'
        },
        onDomRefresh: function () {
            this.collection.fetch();
        },
        addOnEnter: function (event) {
            var ENTER_KEY = 13,
                text = this.ui.input.val().trim();

            if (event.which === ENTER_KEY && text) {
                this.collection.create({
                    name: text
                });

                this.ui.input.val('');
            }
        }
    });
});
