// App.Router = Ember.Router.extend({
//     location: 'history'
// });

App.Router.map(function() {
    this.resource('about');
    this.route('login');
    this.route('profile');
    // Add your routes here
});
