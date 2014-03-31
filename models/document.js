'use strict';

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    schema = new mongoose.Schema({
        name: String,
        body: String,
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    });

schema.plugin(timestamps);
module.exports = mongoose.model('Document', schema);
