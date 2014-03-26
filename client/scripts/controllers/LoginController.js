App.LoginController = Ember.Controller.extend({
    needs: ['application'],

    loginFailed: false,
    isProcessing: false,
    isSlowConnection: false,

    actions: {
        login: function() {
            this.setProperties({
                loginFailed: false,
                isProcessing: true
            });

            var request = $.post('/api/connection', this.getProperties('username', 'password'));

            request.done(_.bind(function(user) {
                var model = this.controllerFor('application').content;

                model.set('id', user._id);
                model.setProperties(user);

                this.reset();
                this.transitionTo('index');
            }, this));

            request.fail(this.failure.bind(this));
        }
    },

    failure: function() {
        this.reset();
        this.set('loginFailed', true);
    },

    reset: function() {
        clearTimeout(this.get('timeout'));
        this.setProperties({
            isProcessing: false,
            isSlowConnection: false
        });
    }
});
