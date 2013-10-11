/* jshint es3: false */
'use strict';

module.exports = function (app) {

    app.use(function (req, res) {
        res.status(404);

        if (req.accepts('html')) {
            res.render('404', {
                title: 'Page not found - ' + app.get('title')
            });
            return;
        }

        if (req.accepts('json')) {
            res.send({ error: 'Not found' });
            return;
        }

        res.type('txt').send('Not found');
    });

    app.use(function (err, req, res) {
        res.status(err.status || 500);

        if (req.accepts('html')) {
            res.render('500', {
                title: 'Server Error - ' + app.get('title')
            });
        }

        if (req.accepts('json')) {
            res.send({ error: 'Server Error' });
            return;
        }

        res.type('txt').send('Server Error');
    });

};
