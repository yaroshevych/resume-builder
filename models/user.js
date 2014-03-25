'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    displayName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    created: {
        type: Date,
        'default': Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
