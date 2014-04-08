App.DocumentsController = Ember.ArrayController.extend({
    queryParams: ['offset', 'limit', 'name'],
    nameFilter: '',
    updateRouteTimer: null,

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

    filterByName: function() {
        clearTimeout(this.updateRouteTimer);
        this.updateRouteTimer = setTimeout(_.bind(this.updateRoute, this), 500);
    }.observes('nameFilter'),

    updateRoute: function() {
        this.transitionToRoute('documents', {
            queryParams: {
                name: this.get('nameFilter')
            }
        });
    }
});
