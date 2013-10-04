'use strict';

var app = require('express')();

require('./config')(app);
require('./routes')(app);

module.exports = app;
