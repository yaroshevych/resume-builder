var passport = require('passport'),
    session = require('../middleware/session'),
    mongoose = require('mongoose');

module.exports = function(app) {
    app.get('/api/connection', session.isAuthenticated, function(req, res) {
        res.json(req.user);
    });

    app.post('/api/connection', passport.authenticate('local'), function(req, res) {
        res.json(req.user);
    });

    app.del('/api/connection', function(req, res) {
        req.logout();
        res.send();
    });
};
