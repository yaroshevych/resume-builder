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

            var request = $.post('/api/connection', this.getProperties('username', 'password'));

            request.done(_.bind(function(user) {
                this.store.pushPayload('user', {
                    users: [user]
                });

                this.set('controllers.application.content.profile', this.store.find('user', user.id));
                this.transitionToRoute('index');
            }, this));

            request.fail(_.bind(function() {
                this.setProperties({
                    loginFailed: true,
                    isProcessing: false
                });
            }, this));
        }
    }
});
