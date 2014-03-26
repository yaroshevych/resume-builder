App.Profile = DS.Model.extend({
    displayName: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    created: DS.attr('date')
});
