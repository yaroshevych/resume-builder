/*global Ladda*/
App.IndexView = Ember.View.extend({
    didInsertElement: function() {
        this.initLogoutSpinner();
    },

    initLogoutSpinner: function() {
        var spinner = Ladda.create($('#logout-btn')[0]);

        this.addObserver('controller.loggingOut', this, function() {
            if (this.get('controller.loggingOut')) {
                spinner.start();
            } else {
                spinner.stop();
            }
        });
    }
});
