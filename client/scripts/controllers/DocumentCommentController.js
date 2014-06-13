App.DocumentCommentController = Ember.ObjectController.extend({
    needs: ['document'],
    errorMessage: '',
    isSaving: false,

    actions: {
        save: function() {
            this.set('errorMessage', '');
            this.set('isSaving', true);
            this.get('content').save().then(_.bind(this.hideSaveLoading, this), _.bind(this.showError, this, 'Failed to save comment'));
        },

        dismissErrorMessage: function() {
            this.set('errorMessage', '');
        }
    },

    hideSaveLoading: function() {
        this.set('isSaving', false);
        this.transitionToRoute('document');
    },

    showError: function(message) {
        this.set('errorMessage', message);
        this.set('isSaving', false);
    }
});
