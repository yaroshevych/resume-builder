var session = require('../middleware/session'),
    mongoose = require('mongoose'),
    utils = require('../utils'),
    sendDocument = function(res) {
        return function(rec) {
            res.json({
                document: rec
            });
        };
    };

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
        mongoose.models.Document.create(req.body.document, utils.errorHandler(res, sendDocument(res)));
    });

    app.put('/api/documents/:id', session.isAuthenticated, function(req, res) {
        var updateDoc = function(rec) {
            if (!rec) {
                return res.json(404);
            }

            rec.set(req.body.document);
            rec.save(utils.errorHandler(res, sendDocument(res)));
        };

        mongoose.models.Document.findById(req.params.id, utils.errorHandler(res, updateDoc));
    });

    app.del('/api/documents/:id', session.isAuthenticated, function(req, res) {
        var sendResult = function() {
            res.send(204);
        };

        mongoose.models.Document.findByIdAndRemove(req.params.id, utils.errorHandler(res, sendResult));
    });

    app.post('/api/documents/:id/comments', session.isAuthenticated, function(req, res) {
        var updateDoc = function(rec) {
            if (!rec) {
                return res.json(404);
            }

            rec.comments.push({
                body: req.body.body,
                authorName: req.user.displayName,
                author: req.user.id,
                createdAt: new Date()
            });

            rec.save(utils.errorHandler(res, sendDocument(res)));
        };

        mongoose.models.Document.findById(req.params.id, utils.errorHandler(res, updateDoc));
    });

    app.del('/api/documents/:id/comments/:commentId', session.isAuthenticated, function(req, res) {
        var updateDoc = function(rec) {
            if (!rec || !rec.comments.id(req.params.commentId)) {
                return res.json(404);
            }

            rec.comments.id(req.params.commentId).remove();
            rec.save(utils.errorHandler(res, sendDocument(res)));
        };

        mongoose.models.Document.findById(req.params.id, utils.errorHandler(res, updateDoc));
    });
};
