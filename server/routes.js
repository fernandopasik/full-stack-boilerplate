/* jshint es3: false */
'use strict';

var example = require('./controllers/example');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index', {
            title: app.get('title'),
            description: 'This is a full stack application boilerplate'
        });
    });

    function notify() {
        app.io.sockets.emit('refreshExample', {});
    }

    // Routes for Example API
    app.post('/api/example', example.create, notify);
    app.get('/api/example', example.browse);
    app.get('/api/example/:id', example.read);
    app.put('/api/example/:id', example.update, notify);
    app.del('/api/example/:id', example.delete, notify);

};
