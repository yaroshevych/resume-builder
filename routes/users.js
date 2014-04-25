var session = require('../middleware/session'),
    mongoose = require('mongoose'),
    utils = require('../utils');

module.exports = function(app) {
    app.get('/api/users', session.isAuthenticated, function(req, res) {
        var sendResult = function(records) {
            res.json({
                users: records
            });
        };

        mongoose.models.User.find({}, {
            password: false
        }, utils.errorHandler(res, sendResult));
    });

    app.get('/api/users/:id', session.isAuthenticated, function(req, res) {
        var sendResult = function(rec) {
            if (!rec) {
                return res.send(404);
            }

            res.json({
                user: rec
            });
        };

        mongoose.models.User.findById(req.params.id, {
            password: false
        }, utils.errorHandler(res, sendResult));
    });

    app.post('/api/users', session.isAuthenticated, function(req, res) {
        var sendResult = function(rec) {
            rec.password = null;

            res.json({
                user: rec
            });
        };

        mongoose.models.User.create(req.body.user, utils.errorHandler(res, sendResult));
    });

    app.put('/api/users/:id', session.isAuthenticated, function(req, res) {
        var updateDoc = function(rec) {
            if (!rec) {
                return res.json(404);
            }

            var sendResult = function(rec) {
                rec.password = null;

                res.json({
                    user: rec
                });
            };

            rec.set(req.body.user);
            rec.save(utils.errorHandler(res, sendResult));
        };

        mongoose.models.User.findById(req.params.id, utils.errorHandler(res, updateDoc));
    });

    app.del('/api/users/:id', session.isAuthenticated, function(req, res) {
        var sendResult = function() {
            res.send(204);
        };

        mongoose.models.User.findByIdAndRemove(req.params.id, utils.errorHandler(res, sendResult));
    });
};
