/*global module,moduleFor,test,visit,equal,currentRouteName,andThen*/

module('Common tests', {
    setup: function() {
        Ember.run(App, App.advanceReadiness);
    },
    teardown: function() {
        App.reset();
    }
});

test('redirect to login', function() {
    visit('/documents');

    andThen(function() {
        equal(currentRouteName(), 'login', currentRouteName());
    });
});

test('no redirect to login', function() {
    Ember.run(_.bind(function() {
        // use direct injection, because modelFor isolates code which won't work in this test
        App.__container__.lookup('route:application').onLoginSuccess({
            _id: 1
        });

        visit('/documents');

        andThen(function() {
            equal(currentRouteName(), 'documents.index', currentRouteName());
        });
    }, this));
});
