App.ApplicationView = Ember.View.extend({
    hideLoadingIndicator: function() {
        $('#app-loading-container').remove();
    }.observes('controller.content')
});
