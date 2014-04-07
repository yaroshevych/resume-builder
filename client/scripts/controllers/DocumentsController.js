App.DocumentsController = Ember.ArrayController.extend({
    queryParams: ['offset', 'limit'],
    nameFilter: '',

    actions: {
        page: function(page) {
            this.transitionToRoute('documents', {
                queryParams: {
                    offset: (page - 1) * 10,
                    limit: 10
                }
            });
        }
    },

    filteredContent: function() {
        var content = this.get('content'),
            nameFilter = this.get('nameFilter').toLowerCase();

        if (nameFilter) {
            return content.filter(function(item) {
                return (item.get('name') || '').toLowerCase().indexOf(nameFilter) !== -1;
            });
        } else {
            return content;
        }
    }.property('content', 'nameFilter'),

    paginationTotal: function() {
        if (this.get('model.isLoaded')) {
            var modelType = this.get('model.type');
            return this.get('store').typeMapFor(modelType).metadata.pagination.total;
        }
    }.property('model.isLoaded')
});
