'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    fieldsAliasPlugin = require('mongoose-aliasfield'),
    comment = new mongoose.Schema({
        b: {
            type: String,
            alias: 'body'
        },
        an: {
            type: String,
            alias: 'authorName'
        },
        a: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            alias: 'author'
        },
        c: {
            type: Date,
            alias: 'createdAt'
        }
    }),
    schema = new mongoose.Schema({
        n: {
            type: String,
            alias: 'name'
        },
        b: {
            type: String,
            alias: 'body'
        },
        authorName: String,
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        comments: [comment]
    });

schema.plugin(timestamps);
comment.plugin(fieldsAliasPlugin);
schema.plugin(fieldsAliasPlugin);

module.exports = function(app) {
    mongoose.model('Comment', comment)(app);
    mongoose.model('Document', schema)(app);
};
