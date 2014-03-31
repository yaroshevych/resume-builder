App.DocumentsDocumentController = Ember.ObjectController.extend({
    needs: ['index'],
    isNotDirty: Ember.computed.not('content.isDirty'),
    isSaving: false,

    actions: {
        save: function() {
            this.set('isSaving', true);
            this.get('content').save().then(_.bind(this.hideSaveLoading, this), _.bind(this.showError, this, 'Failed to save document'));
        },

        remove: function() {
            this.get('content').destroyRecord().then(function() {}, _.bind(this.showError, this, 'Failed to delete document'));
            this.transitionToRoute('documents');
            // TODO: handle errors
        }
    },

    hideSaveLoading: function() {
        this.set('isSaving', false);
    },

    showError: function(message) {
        this.get('controllers.index').set('errorMessage', message);
        this.set('isSaving', false);
    }
});
