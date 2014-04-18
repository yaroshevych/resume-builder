// App.Router = Ember.Router.extend({
//     location: 'history'
// });

App.Router.map(function() {
    this.resource('index', {
        path: '/'
    }, function() {
        this.resource('documents', function() {
            this.resource('document', {
                path: '/:id'
            }, function() {
                this.route('comment');
            });

            this.route('add');
        });

        this.resource('users', function() {
            this.route('user', {
                path: '/:id'
            });
        });

        this.route('about');
        this.route('profile');
    });

    this.route('login');
});

// add login handler to all routers
Ember.Route.reopen({
    redirect: function() {
        if (!this.modelFor('application').get('profile')) {
            this.transitionTo('login');
        }
    }
});
