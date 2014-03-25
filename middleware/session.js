exports.init = function(app) {
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            done(null, {
                name: 'ok'
            });
        }
    ));

    return passport;
};

exports.isAuthenticated = function(req, res, next) {
    next();
};

