/* jshint es3: false */
'use strict';

var helpers = require('../helpers'),
    ExampleModel = require('../schemas/example').model;

module.exports = {

    browse: function (req, res) {
        ExampleModel.find({}, function (err, docs) {
            helpers.handleResponse(res, err, docs);
        });
    },

    create: function (req, res, next) {
        ExampleModel.create(req.body, function (err, doc) {
            helpers.handleResponse(res, err, doc, next);
        });
    },

    read: function (req, res) {
        ExampleModel.findById(req.params.id, function (err, doc) {
            helpers.handleResponse(res, err, doc);
        });
    },

    update: function (req, res, next) {
        if (req.body._id) {
            delete req.body._id;
        }
        ExampleModel.findByIdAndUpdate(req.params.id, req.body,
            function (err, doc) {
                helpers.handleResponse(res, err, doc, next);
            });
    },

    delete: function (req, res, next) {
        ExampleModel.findByIdAndRemove(req.params.id, function (err, doc) {
            helpers.handleResponse(res, err, doc, next);
        });
    }

};
