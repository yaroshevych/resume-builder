var passport = require('passport'),
    session = require('../middleware/session'),
    mongoose = require('mongoose');

module.exports = function(app) {
    app.get('/api/connection', session.isAuthenticated, function(req, res) {
        mongoose.models.User.find(function(err, records) {
            if (err) {
                res.json(500, err);
            } else {
                res.json({
                    records: records
                });
            }
        });

    });

    app.post('/api/connection', passport.authenticate('local'), function(req, res) {
        return res.json({
            name: 'ok'
        });
    });

    app.del('/api/connection', function(req, res) {
        req.logout();
        return res.send();
    });
};
