// App.Router = Ember.Router.extend({
//     location: 'history'
// });

App.Router.map(function() {
    this.resource('index', {
        path: '/'
    }, function() {
        this.resource('documents', function() {
            this.route('document', {
                path: '/:id'
            });

            this.route('add');
        });

        this.route('about');
        this.route('profile');
    });

    this.route('login');
});
