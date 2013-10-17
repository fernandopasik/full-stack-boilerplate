/* jshint maxlen: 150 */
require.config({

    deps: ['main'],
    shim: {
        jquery : {
            exports : 'jQuery'
        },
        underscore : {
            exports : '_'
        },
        backbone : {
            deps : ['jquery', 'underscore'],
            exports : 'Backbone'
        },
        'backbone.marionette' : {
            deps : ['jquery', 'underscore', 'backbone'],
            exports : 'Marionette'
        },
        bootstrap: {
            deps: ['jquery']
        }
    },
    paths: {
        jquery:     '/bower_components/jquery/jquery',
        backbone:   '/bower_components/backbone/backbone',
        underscore: '/bower_components/underscore/underscore',
        'backbone.marionette': '/bower_components/backbone.marionette/lib/backbone.marionette',
        'backbone.wreqr': '/bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        bootstrap: '/bower_components/sass-bootstrap/dist/js/bootstrap',
        tpl: '/bower_components/requirejs-tpl/tpl'
    }
});
