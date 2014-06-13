App.Document = DS.Model.extend({
    name: DS.attr('string'),
    body: DS.attr('string'),
    createdAt: DS.attr('isodate'),
    updatedAt: DS.attr('isodate'),
    // author: DS.belongsTo('user'),
    comments: DS.hasMany('comment')
});
