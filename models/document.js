'use strict';

var mongoose = require('mongoose'),
    schema = new mongoose.Schema({
        name: String,
        body: String,
        createdAt: {
            type: Date,
            'default': Date.now
        },
        updatedAt: {
            type: Date,
            'default': Date.now
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    });

module.exports = mongoose.model('Document', schema);
