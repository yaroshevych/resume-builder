// App.Router = Ember.Router.extend({
//     location: 'history'
// });

App.Router.map(function() {
    this.resource('index', {
        path: '/'
    }, function() {
        this.route('about');
        this.route('profile');
    });

    this.route('login');
});
