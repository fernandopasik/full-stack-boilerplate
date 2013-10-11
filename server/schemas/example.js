/* jshint es3: false */
'use strict';

var mongoose = require('mongoose'),
    ExampleSchema;

module.exports.schema = ExampleSchema = new mongoose.Schema({

    name: {
        type: String,
        default: null,
        required: true,
        lowercase: true
    }

});

module.exports.model = mongoose.model('Example', ExampleSchema, 'examples');
