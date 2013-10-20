define([
    'backbone.marionette',
    'communicator',
    'socket.io'
],
function (Marionette, Communicator, io) {
    'use strict';

    var App = new Marionette.Application(),
        socket = io.connect('http://localhost:9000/');

    App.addInitializer(function () {
        socket.on('refreshExample', function () {
            Communicator.mediator.trigger('examples:refresh');
        });
    });

    return App;

});
