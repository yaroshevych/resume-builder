/*global Ladda*/
App.DocumentCommentView = Ember.View.extend({
    didInsertElement: function() {
        this.initSaveSpinner();
        this.$('.comment-field').focus();

        // scroll to bottom
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 'slow');
    },

    initSaveSpinner: function() {
        var spinner = Ladda.create(this.$('#save-comment-btn')[0]);

        this.addObserver('controller.isSaving', this, function() {
            if (this.get('controller.isSaving')) {
                spinner.start();
            } else {
                spinner.stop();
            }
        });
    },

    keyPress: function(e) {
        if (e.which === 13) { // ENTER
            this.get('controller').send('save');
        }
    }
});
