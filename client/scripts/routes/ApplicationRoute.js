App.ApplicationRoute = Ember.Route.extend({
    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)
    userProfile: null,

    checkLogin: function() {
        var xhr = Ember.$.getJSON('/api/connection');

        xhr.then(_.bind(function(user) {
            this.userProfile.id = user._id;
            this.userProfile.setProperties(user);
            // console.log(arguments);
        }, this));

        xhr.error(_.bind(function() {
            this.transitionTo('login');
        }, this));
    },

    model: function() {
        this.checkLogin();

        this.userProfile = this.store.createRecord('profile');
        return this.userProfile;
    }
});
