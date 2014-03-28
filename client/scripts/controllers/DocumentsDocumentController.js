App.DocumentsDocumentController = Ember.ObjectController.extend({
    needs: ['index'],
    isNotDirty: Ember.computed.not('content.isDirty'),
    isSaving: false,

    actions: {
        save: function() {
            this.set('isSaving', true);
            this.get('content').save().then(_.bind(this.hideSaveLoading, this), _.bind(this.showError, this));
        }
    },

    hideSaveLoading: function() {
        this.set('isSaving', false);
    },

    showError: function() {
        this.get('controllers.index').set('errorMessage', 'Failed to save document');
        this.set('isSaving', false);
    }
});
