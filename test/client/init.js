/* jshint maxlen: 150 */
require.config({

    baseUrl: '/',

    shim: {
        mocha: {
            exports: 'mocha'
        },
        chai: {
            exports: 'chai'
        },
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
        }
    },

    paths: {
        mocha: '/node_modules/mocha/mocha',
        chai: '/node_modules/chai/chai',
        jquery:     '/bower_components/jquery/jquery',
        backbone:   '/bower_components/backbone/backbone',
        underscore: '/bower_components/underscore/underscore',
        'backbone.marionette': '/bower_components/backbone.marionette/lib/backbone.marionette',
        'backbone.wreqr': '/bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        text: '/bower_components/requirejs-text/text'
    }
});

require([
    'mocha',
    'test/specs'
],
function (mocha, specs) {

    'use strict';

    mocha.ui('bdd');
    mocha.reporter('html');

    require(specs.specs, function () {
        if (window.mochaPhantomJS) {
            window.mochaPhantomJS.run();
        }
        else {
            window.mocha.run();
        }
    });
});
