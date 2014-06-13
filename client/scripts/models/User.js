App.User = DS.Model.extend({
    displayName: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    createdAt: DS.attr('isodate'),
    documents: DS.hasMany('document', {
        async: true
    })
});
