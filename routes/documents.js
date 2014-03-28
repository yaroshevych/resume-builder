var session = require('../middleware/session'),
    mongoose = require('mongoose');

module.exports = function(app) {
    app.get('/api/documents', session.isAuthenticated, function(req, res) {
        mongoose.models.Document.find({}, function(err, records) {
            if (err) {
                return res.send(400);
            }

            var documents = [];

            for (var i = 0; i < records.length; i++) {
                var doc = records[i].toJSON();
                doc.id = doc._id;
                delete doc._id;
                documents.push(doc);
            }

            res.json({
                documents: documents
            });
        });
    });
};
