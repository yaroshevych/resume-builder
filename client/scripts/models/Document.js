App.Comment = DS.Model.extend({
    body: DS.attr('string'),
    authorName: DS.attr('string'),
    createdAt: DS.attr('date')
});

App.Document = DS.Model.extend({
    name: DS.attr('string'),
    body: DS.attr('string'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),
    // author: DS.belongsTo('user'),
    comments: DS.hasMany('comment')
});
