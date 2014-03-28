/*global Ladda*/
App.DocumentsDocumentView = Ember.View.extend({
    didInsertElement: function() {
        this.initSaveSpinner();
    },

    initSaveSpinner: function() {
        var spinner = Ladda.create($('#save-document-btn')[0]);

        this.addObserver('controller.isSaving', this, function() {
            if (this.get('controller.isSaving')) {
                spinner.start();
            } else {
                spinner.stop();
            }
        });
    }
});
