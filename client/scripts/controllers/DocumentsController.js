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
        },

        upload: function(files) {
            if (files.length) {
                var formData = new FormData();
                formData.append('doc', files[0]);

                $.ajax({
                    url: 'api/documents/upload',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    dataType: 'json',
                    context: this,
                    processData: false, // Don't process the files
                    contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                    success: function(data, textStatus, jqXHR) {
                        this.store.pushPayload('document', {
                            documents: [data.doc]
                        });

                        this.get('content').insertAt(0, this.store.find('document', data.doc.id));
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert('Failed to upload file');
                    }
                });
            }
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
