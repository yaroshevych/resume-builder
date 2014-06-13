var session = require('../middleware/session'),
    mongoose = require('mongoose'),
    utils = require('../utils'),
    sendDocument = function(res) {
        return function(rec) {
            var data = rec.toJSON();

            for (var i = 0; i < data.comments.length; i++) {
                data.comments[i] = data.comments[i]._id;
            }

            res.json({
                document: data
            });
        };
    };

module.exports = function(app) {
    app.get('/api/documents', session.isAuthenticated, function(req, res) {
        var total = 0,
            sendResult = function(records) {
                var documents = [],
                    comments = [],
                    ids;

                for (var i = 0; i < records.length; i++) {
                    ids = [];

                    var doc = records[i].toJSON();

                    for (var k = 0; k < records[i].comments.length; k++) {
                        comments.push(doc.comments[k]);
                        ids.push(doc.comments[k]._id + '');
                    }

                    doc.comments = ids;
                    documents.push(doc);
                }

                res.json({
                    documents: documents,
                    comments: comments,
                    meta: {
                        pagination: {
                            total: total
                        }
                    }
                });
            };

        var options = {};

        if (req.query.ids) {
            options._id = {
                $in: req.query.ids
            };
        }

        if (req.query.name) {
            options.name = new RegExp(req.query.name, 'i');
        }

        mongoose.models.Document.count(options, utils.errorHandler(res, function(count) {
            total = count;

            mongoose.models.Document.find(options, null, {
                sort: {
                    createdAt: 1
                },
                skip: +req.query.offset || 0,
                limit: +req.query.limit || 1000
            }, utils.errorHandler(res, sendResult));
        }));
    });

    app.post('/api/documents', session.isAuthenticated, function(req, res) {
        mongoose.models.Document.create(req.body.document, utils.errorHandler(res, sendDocument(res)));
    });

    app.put('/api/documents/:id', session.isAuthenticated, function(req, res) {
        var updateDoc = function(rec) {
            if (!rec) {
                return res.send(404);
            }

            delete req.body.document.comments;
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
            var sendData = function(doc) {
                res.json({
                    comment: rec.comments[rec.comments.length - 1]
                });
            };

            if (!rec) {
                return res.json(404);
            }

            rec.comments.push({
                body: req.body.comment.body,
                authorName: req.user.displayName,
                author: req.user.id,
                createdAt: new Date()
            });

            rec.save(utils.errorHandler(res, sendData));
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
