/*global Ladda*/
App.DocumentView = Ember.View.extend({
    didInsertElement: function() {
        this.initSaveSpinner();
        $('.document-body').markdown({
            iconlibrary: 'fa'
        });
        this.contentChanged();
    },

    contentChanged: function() {
        if ($('.document-body').length) {
            $('.document-body').markdown();
            var md = $('.document-body').data('markdown');

            md.setContent(this.get('controller.content.body'));
            md.hidePreview();
            md.showPreview();
        }
    }.observes('controller.content'),

    initSaveSpinner: function() {
        var spinner = Ladda.create($('#save-document-btn')[0]);

        this.addObserver('controller.isSaving', this, function() {
            if (this.get('controller.isSaving')) {
                spinner.start();
            } else {
                spinner.stop();
            }
        });
    },

    click: function(e) {
        if ($(e.target).hasClass('delete-doc')) {
            var confirm = $(e.target).popover({
                html: true,
                content: '<div>Are you sure you want to delete this document?</div>' +
                    '<div style="padding-top:10px"><button type="button" class="btn btn-danger btn-block delete-doc-confirm">Delete</button></div>',
                trigger: 'manual',
                placement: 'top'
            });

            confirm.popover('show');

            e.preventDefault();
            e.stopPropagation();

            var hidePopover = function() {
                confirm.popover('hide');
                $(document).off('click', hidePopover);
            };

            $(document).on('click', hidePopover);
            return;
        }

        if ($(e.target).hasClass('delete-doc-confirm')) {
            this.get('controller').send('remove');
            e.preventDefault();
            e.stopPropagation();
            return;
        }
    }
});
