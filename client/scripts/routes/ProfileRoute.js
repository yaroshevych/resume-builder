App.ProfileRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('application');
    }
});
