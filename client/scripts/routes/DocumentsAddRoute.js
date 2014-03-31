App.DocumentsAddRoute = Ember.Route.extend({
    model: function() {
        return this.store.createRecord('document', {
            name: 'New Document'
        });
    }
});
