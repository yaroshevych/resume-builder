/*global Ladda*/
App.IndexController = Ember.ObjectController.extend({
    loggingOut: false,
    errorMessage: '',

    actions: {
        dismissErrorMessage: function() {
            this.set('errorMessage', '');
        },
        logout: function() {
            this.set('loggingOut', true);

            var request = $.ajax({
                type: 'DELETE',
                url: '/api/connection'
            });

            request.done(_.bind(location.reload, location));

            request.fail(_.bind(function() {
                this.set('loggingOut', false);
                this.set('errorMessage', 'Logour failed');
            }, this));
        }
    }
});
