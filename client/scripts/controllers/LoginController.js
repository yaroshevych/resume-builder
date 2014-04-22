App.LoginController = Ember.Controller.extend(Ember.Evented, {
    loginFailed: false,
    isProcessing: false,

    actions: {
        login: function() {
            this.setProperties({
                loginFailed: false,
                isProcessing: true
            });

            this.trigger('login', this.getProperties('username', 'password'), _.bind(this.onLoginFail, this));
        }
    },

    onLoginFail: function() {
        this.setProperties({
            loginFailed: true,
            isProcessing: false
        });
    }
});
