App.DocumentsView = Ember.View.extend({
    paginationUpdateTimerId: 0,

    didInsertElement: function() {
        this.updatePagination();

        $('.documents-filter-field').val(this.get('controller.content.query.name'));

        this.createDropZone();
    },

    updatePagination: function() {
        if (this.get('controller.content.isLoaded')) {
            var offset = +this.get('controller.content.query.offset') || 0,
                total = +this.get('controller.content.meta.pagination.total') || 0;

            $('#documents-pager').bootpag({
                total: Math.ceil(total / 10),
                page: (this.get('controller.offset') / 10) + 1,
                maxVisible: 5
            }).on('page', _.bind(function(e, num) {
                this.get('controller').send('page', num);
            }, this));
        }
    },

    // use timer because query parameters are updated with delay
    scheduleUpdatePagination: function() {
        clearTimeout(this.paginationUpdateTimerId);

        this.paginationUpdateTimerId = setTimeout(_.bind(this.updatePagination, this), 200);
    }.observes('controller.content'),

    createDropZone: function() {
        var el = $('.documents-list'),
            dragLeaveTimer = null;

        el.on('dragover', function(evt) {
            clearTimeout(dragLeaveTimer);
            el.addClass('file-hover');
            evt.dataTransfer.dropEffect = 'copy';
            return false;
        });

        el.on('dragleave', function() {
            dragLeaveTimer = setTimeout(function() {
                el.removeClass('file-hover');
            }, 500);

            return false;
        });

        el.on('drop', _.bind(function(e) {
            el.removeClass('file-hover');
            e.preventDefault();
            this.get('controller').send('upload', e.dataTransfer.files);
        }, this));
    }
});
