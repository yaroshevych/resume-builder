App.Comment = DS.Model.extend({
    body: DS.attr('string'),
    authorName: DS.attr('string'),
    createdAt: DS.attr('date'),
    author: DS.belongsTo('user'),
    documentId: '' // CHECK THAT THIS IS CORRECT
});

// override to use custom URL /api/documents/123/comments/
App.CommentAdapter = DS.RESTAdapter.extend({
    createRecord: function(store, type, record) {
        var data = {},
            serializer = store.serializerFor(type.typeKey),
            documentId = encodeURIComponent(record.get('documentId'));

        serializer.serializeIntoHash(data, type, record, {
            includeId: true
        });

        return this.ajax('/api/documents/' + documentId + '/comments', 'POST', {
            data: data
        });
    },

    deleteRecord: function(store, type, record) {
        var id = encodeURIComponent(record.get('id')),
            documentId = encodeURIComponent(record.get('documentId'));

        return this.ajax('/api/documents/' + documentId + '/comments/' + id, 'DELETE');
    }
});
