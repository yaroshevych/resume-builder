exports.init = function(app) {
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        mongoose = require('mongoose');

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        mongoose.models.User.findOne({
            '_id': id
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            user.password = null;
            done(null, user);
        });
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            mongoose.models.User.findOne({
                email: username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false);
                }

                user.verifyPassword(password, function(err, matched) {
                    if (err || !matched) {
                        return done(err, matched);
                    }

                    user.password = null;
                    return done(null, user);
                });
            });

            // app.get('models').User.find({
            //     where: {
            //         email: username
            //     }
            // }).success(function(user) {
            //     if (!user || user.disabled) {
            //         return done(null, false);
            //     }

            //     user.verifyPassword(password, function(err, matched) {
            //         if (err || !matched) {
            //             return done(err, matched);
            //         }

            //         user.password = null;
            //         return done(null, user);
            //     });
            // }).error(function(err) {
            //     return done(err);
            // });
        }
    ));

    return passport;
};

exports.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send(401);
    }
};

// exports.hasRole = function(roleName) {
//     return function(req, res, next) {
//         if (req.isAuthenticated() && req.user[roleName + 'Role'] === true) {
//             next();
//         } else {
//             res.send(401);
//         }
//     };
// };
