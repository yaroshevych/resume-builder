App.DocumentsController = Ember.ArrayController.extend({
    nameFilter: '',

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
    }.property('content', 'nameFilter')
});
