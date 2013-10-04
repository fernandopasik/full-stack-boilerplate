'use strict';

var app = require('express')();

require('./config')(app);

module.exports = app;
