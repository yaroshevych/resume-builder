/*global Ladda*/
App.LoginController = Ember.Controller.extend({
    needs: ['application'],
    loginFailed: false,
    isProcessing: false,

    actions: {
        login: function() {
            this.setProperties({
                loginFailed: false,
                isProcessing: true
            });

            var spinner = Ladda.create($('#login-btn')[0]);
            spinner.start();

            var request = $.post('/api/connection', this.getProperties('username', 'password'));

            request.done(_.bind(function(user) {
                var model = this.controllerFor('application').content;

                model.set('id', user._id);
                model.setProperties(user);

                this.transitionTo('index');
            }, this));

            request.fail(_.bind(function() {
                spinner.stop();
                this.setProperties({
                    loginFailed: true,
                    isProcessing: false
                });
            }, this));
        }
    }
});
