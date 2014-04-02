'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    comment = new mongoose.Schema({
        body: String,
        authorName: String,
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        createdAt: Date
    }),
    schema = new mongoose.Schema({
        name: String,
        body: String,
        authorName: String,
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        comments: [comment]
    });

schema.plugin(timestamps);
module.exports = mongoose.model('Document', schema);
