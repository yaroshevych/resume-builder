App.ApplicationRoute = Ember.Route.extend({
    promise: null,

    model: function() {
        if (!this.promise) {
            this.promise = new Ember.RSVP.Promise(_.bind(function(resolve, reject) {
                var request = $.getJSON('/api/connection'),
                    model = this.store.createRecord('user');

                request.done(_.bind(function(user) {
                    user.id = user._id;
                    model.setProperties(user);
                    resolve(model);
                }, this));

                request.fail(_.bind(function() {
                    resolve(model);
                    this.transitionTo('login');
                }, this));
            }, this));
        }

        return this.promise;
    }
});
