var session = require('../middleware/session'),
    mongoose = require('mongoose'),
    utils = require('../utils');

module.exports = function(app) {
    app.get('/api/documents', session.isAuthenticated, function(req, res) {
        var sendResult = function(records) {
            res.json({
                documents: records
            });
        };

        mongoose.models.Document.find({}, utils.errorHandler(res, sendResult));
    });

    app.post('/api/documents', session.isAuthenticated, function(req, res) {
            var sendResult = function(rec) {
                res.json({
                    document: rec
                });
            };

        mongoose.models.Document.create(req.body.document, utils.errorHandler(res, sendResult));
    });

    app.put('/api/documents/:id', session.isAuthenticated, function(req, res) {
        var updateDoc = function(rec) {
            if (!rec) {
                return res.json(404);
            }

            var sendResult = function() {
                res.json({
                    document: rec
                });
            };

            rec.set(req.body.document);
            rec.save(utils.errorHandler(res, sendResult));
        };

        mongoose.models.Document.findById(req.params.id, utils.errorHandler(res, updateDoc));
    });

    app.del('/api/documents/:id', session.isAuthenticated, function(req, res) {
        var sendResult = function() {
            res.send(204);
        };

        mongoose.models.Document.findByIdAndRemove(req.params.id, utils.errorHandler(res, sendResult));
    });
};
