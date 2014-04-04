require('scripts/controllers/DocumentsDocumentController');

App.DocumentsAddController = App.DocumentController.extend({
    actions: {
        save: function() {
            this.get('controllers.index').set('errorMessage', null);
            this.set('isSaving', true);
            this.get('content').save().then(_.bind(this.documentAdded, this), _.bind(this.showError, this, 'Failed to create document'));
        }
    },

    documentAdded: function() {
        this.hideSaveLoading();
        this.transitionToRoute('document', this.get('content'));
    }
});
