App.DocumentCommentRoute = Ember.Route.extend({
    model: function() {
        return this.store.createRecord('comment', {
            documentId: this.modelFor('document').get('id') // this is for custom REST adapter to build URL
        });
    }
});
