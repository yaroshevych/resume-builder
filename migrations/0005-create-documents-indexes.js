var mongodb = require('mongodb');

exports.up = function(db, next) {
    var documentsCollection = mongodb.Collection(db, 'documents');

    documentsCollection.ensureIndex({
        author: 1
    }, function(err) {
        if (err) {
            return next(err);
        }

        documentsCollection.ensureIndex({
            name: 1
        }, function(err) {
            if (err) {
                return next(err);
            }

            next();
        });
    });
};

exports.down = function(db, next) {
    var documentsCollection = mongodb.Collection(db, 'documents');

    documentsCollection.dropIndex({
        author: 1
    }, function(err) { // ignore errors
        documentsCollection.dropIndex({
            name: 1
        }, function(err) { // ignore errors
            next();
        });
    });
};
