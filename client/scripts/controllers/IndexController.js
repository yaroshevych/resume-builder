/*global Ladda*/
App.IndexController = Ember.ObjectController.extend({
    actions: {
        logout: function() {
            var spinner = Ladda.create($('#logout-btn')[0]);
            spinner.start();

            var request = $.ajax({
                type: 'DELETE',
                url: '/api/connection'
            });

            request.done(_.bind(location.reload, location));

            request.fail(function() {
                spinner.stop();
                // TODO: display dialog
            });
        }
    }
});
