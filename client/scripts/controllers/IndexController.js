/*global Ladda*/
App.IndexController = Ember.ObjectController.extend({
    loggingOut: false,

    actions: {
        logout: function() {
            this.set('loggingOut', true);

            var request = $.ajax({
                type: 'DELETE',
                url: '/api/connection'
            });

            request.done(_.bind(location.reload, location));

            request.fail(function() {
                this.set('loggingOut', false);
                // TODO: display dialog
            });
        }
    }
});
