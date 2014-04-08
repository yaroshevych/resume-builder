App.DocumentsRoute = Ember.Route.extend({
    queryParams: {
        offset: {
            refreshModel: true
        },
        limit: {
            refreshModel: true
        },
        name: {
            refreshModel: true
        }
    },

    model: function(params) {
        return this.store.find('document', params);
    },

    beforeModel: function(transition) {
        if (!parseInt(transition.queryParams.limit, 0)) {
            transition.queryParams.limit = 10;
        }

        if (!parseInt(transition.queryParams.offset, 0)) {
            transition.queryParams.offset = 0;
        }

        if (!transition.queryParams.name) {
            transition.queryParams.name = '';
        }

        this.transitionTo('documents', {
            queryParams: transition.queryParams
        });
    }
});
