App.ApplicationAdapter = DS.RESTAdapter;

App.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

DS.RESTAdapter.reopen({
    namespace: 'api'
});

App.IsodateTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        if (serialized) {
            return new Date(serialized);
        }
        return serialized;
    },

    serialize: function(deserialized) {
        if (deserialized) {
            return deserialized.toISOString();
        }
        return deserialized;
    }
});
