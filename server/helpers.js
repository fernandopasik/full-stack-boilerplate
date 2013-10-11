/* jshint es3: false */
'use strict';

module.exports.handleResponse = function (res, err, doc, next) {

    if (err) {
        res.status(500).send({ error: 'Internal' });
    }
    else {
        res.json(200, doc);
        if (typeof next === 'function') {
            next();
        }
    }

};
