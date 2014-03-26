App.ApplicationRoute = Ember.Route.extend({
    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)
    userProfile: null,

    checkLogin: function() {
        var request = $.getJSON('/api/connection');

        request.done(_.bind(function(user) {
            this.userProfile.set('id', user._id);
            this.userProfile.setProperties(user);
        }, this));

        request.fail(_.bind(function() {
            this.transitionTo('login');
        }, this));
    },

    model: function() {
        this.checkLogin();

        this.userProfile = this.store.createRecord('profile');
        return this.userProfile;
    }
});
