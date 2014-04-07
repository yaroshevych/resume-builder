var session = require('../middleware/session'),
    mongoose = require('mongoose'),
    utils = require('../utils');

module.exports = function(app) {
    app.get('/api/generator/documents', session.isAuthenticated, function(req, res) {
        mongoose.models.User.find({}, utils.errorHandler(res, function(users) {
            var k = 0;

            for (var i = 0; i < users.length; i++) {
                for (var j = 0; j < 100; j++) {
                    mongoose.models.Document.create({
                        name: 'Lorem Ipsum #' + k++,
                        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.!',
                        author: users[i].id,
                        comments: []
                    });
                }
            }
        }));
    });

    app.get('/api/generator/users', session.isAuthenticated, function(req, res) {
        var fs = require('fs');
        var csv = require('csv');

        csv().from.path('500users.csv', {
            delimiter: ',',
            escape: '"'
        }).to.array(function(users) {
            var count = users.length,
                i = 0,
                createNextUser = function() {
                    if (i === users.length || !users[i]) {
                        res.send(200);
                        return;
                    }

                    var user = {
                        displayName: users[i][0],
                        email: users[i][5],
                        password: ''
                    };
                    i++;

                    console.log('Creating ' + JSON.stringify(user));

                    mongoose.models.User.create(user, utils.errorHandler(res, createNextUser));
                };

            createNextUser();
        });
    });
};
