App.DocumentsRoute = Ember.Route.extend({
    queryParams: {
        offset: {
            refreshModel: true
        },
        limit: {
            refreshModel: true
        }
    },

    model: function(params) {
        return this.store.find('document', params);
    },

    beforeModel: function(transition) {
        var offset = +transition.queryParams.offset,
            limit = +transition.queryParams.limit;

        if (!limit || !offset) {
            this.transitionTo('documents', {
                queryParams: {
                    offset: 0,
                    limit: 10
                }
            });
        }
    }
});
