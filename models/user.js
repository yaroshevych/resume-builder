'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    displayName: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        'default': Date.now
    },
    documents: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Document'
    }]
});

userSchema.methods.setPassword = function(password, done) {
    var user = this;
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return done(err);
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return done(err);
            }

            user.password = hash;
            done();
        });
    });
};

userSchema.methods.verifyPassword = function(password, done) {
    bcrypt.compare(password, this.password, done);
};

module.exports = mongoose.model('User', userSchema);
