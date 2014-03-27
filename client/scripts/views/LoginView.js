/*global Ladda*/
App.LoginView = Ember.View.extend({
    didInsertElement: function() {
        this.initLoginSpinner();
    },

    initLoginSpinner: function() {
        var spinner = Ladda.create($('#login-btn')[0]);

        this.addObserver('controller.isProcessing', this, function() {
            if (this.get('controller.isProcessing')) {
                spinner.start();
            } else {
                spinner.stop();
            }
        });
    }
});

