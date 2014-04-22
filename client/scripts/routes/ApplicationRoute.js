App.ApplicationRoute = Ember.Route.extend({
    promise: null,

    model: function() {
        if (!this.promise) {
            this.promise = new Ember.RSVP.Promise(_.bind(function(resolve, reject) {
                var request = $.getJSON('/api/connection');

                request.done(_.bind(function(user) {
                    this.store.pushPayload('user', {
                        users: [user]
                    });

                    resolve(Ember.Object.create({
                        profile: this.store.find('user', user.id)
                    }));
                }, this));

                request.fail(_.bind(function() {
                    resolve(Ember.Object.create({
                        profile: null
                    }));

                    this.transitionTo('login');
                    this.controllerFor('login').on('login', this, this.onLogin);
                }, this));
            }, this));
        }

        return this.promise;
    },

    onLogin: function(credentials, loginFailed) {
        var request = $.post('/api/connection', credentials);
        request.done(_.bind(this.onLoginSuccess, this));
        request.fail(loginFailed);
    },

    onLoginSuccess: function(user) {
        this.store.pushPayload('user', {
            users: [user]
        });

        this.modelFor('application').set('profile', this.store.find('user', user.id));
        this.transitionTo('index');
    }
});
