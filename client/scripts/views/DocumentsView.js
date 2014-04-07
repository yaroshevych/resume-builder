App.DocumentsView = Ember.View.extend({
    didInsertElement: function() {
        this.updatePagination();
    },

    updatePagination: function() {
        var offset = +this.get('controller.offset');

        $('#documents-pager').bootpag({
            total: +this.get('controller.paginationTotal'),
            page: (this.get('controller.offset') / 10) + 1,
            maxVisible: 5
        }).on('page', _.bind(function(e, num) {
            this.get('controller').send('page', num);
        }, this));
    }.observes('paginationTotal')
});
