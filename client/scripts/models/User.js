App.User = DS.Model.extend({
    displayName: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    createdAt: DS.attr('date')
    // documents: DS.hasMany('document')
});
