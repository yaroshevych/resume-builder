var session = require('../middleware/session'),
    mongoose = require('mongoose');

module.exports = function(app) {
    app.get('/api/documents', session.isAuthenticated, function(req, res) {
        mongoose.models.Document.find({}, function(err, records) {
            if (err) {
                return res.json(400, {
                    message: err + ''
                });
            }

            res.json({
                documents: records
            });
        });
    });

    app.put('/api/documents/:id', session.isAuthenticated, function(req, res) {
        mongoose.models.Document.findByIdAndUpdate(req.params.id, {
            $set: req.body.document
        }, function(err, rec) {
            if (err) {
                return res.json(400, {
                    message: err + ''
                });
            }

            res.json({
                document: rec
            });
        });
    });

    app.del('/api/documents/:id', session.isAuthenticated, function(req, res) {
        mongoose.models.Document.findByIdAndRemove(req.params.id, function(err, rec) {
            if (err) {
                return res.json(400, {
                    message: err + ''
                });
            }

            res.send(204);
        });
    });
};
