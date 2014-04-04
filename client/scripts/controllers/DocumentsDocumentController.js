// App.DocumentsDocumentController = Ember.ObjectController.extend();

App.DocumentController = Ember.ObjectController.extend({
    needs: ['index'],
    isNotDirty: Ember.computed.not('content.isDirty'),
    isSaving: false,

    actions: {
        save: function() {
            this.get('controllers.index').set('errorMessage', null);
            this.set('isSaving', true);
            this.get('content').save().then(_.bind(this.hideSaveLoading, this), _.bind(this.showError, this, 'Failed to save document'));
        },

        remove: function() {
            this.get('controllers.index').set('errorMessage', null);
            this.get('content').destroyRecord().then(function() {}, _.bind(this.showError, this, 'Failed to delete document'));
            this.transitionToRoute('documents');
        },

        removeComment: function(commentId) {
            var comment = this.get('comments').findBy('id', commentId);
            comment.set('documentId', this.get('content.id'));

            comment.destroyRecord().then(_.bind(this.commentDeleted, this, comment), _.bind(this.showError, this, 'Failed to delete comment'));
        }
    },

    commentDeleted: function (comment) {
        this.get('comments').removeObject(comment); // this is needed for newly created comments. looks like a bug in ember data
    },

    hideSaveLoading: function() {
        this.set('isSaving', false);
    },

    showError: function(message) {
        this.get('controllers.index').set('errorMessage', message);
        this.set('isSaving', false);
    }
});
