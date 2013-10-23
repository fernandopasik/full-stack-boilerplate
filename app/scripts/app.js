define([
    'backbone.marionette',
    'communicator',
    'socket.io',
    'views/example-list',
    'collections/example'
],
function (Marionette, Communicator, io, ExampleListView, ExampleCollection) {
    'use strict';

    var App = new Marionette.Application(),
        socket = io.connect('http://localhost:9000/'),
        examples = new ExampleCollection(),
        view = new ExampleListView({
            collection: examples
        });

    App.addRegions({
        examples: '#examples'
    });

    App.addInitializer(function () {
        App.examples.show(view);
        socket.on('refreshExample', function () {
            Communicator.mediator.trigger('examples:refresh');
        });
    });

    return App;

});
