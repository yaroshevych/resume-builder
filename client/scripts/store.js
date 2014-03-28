App.ApplicationAdapter = DS.RESTAdapter;

App.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

DS.RESTAdapter.reopen({
    namespace: 'api'
});
