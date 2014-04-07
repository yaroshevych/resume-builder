App.DocumentRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('document', params.id);
    }
});
