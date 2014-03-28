/*global Handlebars, moment*/
Ember.Handlebars.helper('prettifyDate', function(date) {
    return date ? moment(new Date(date)).format('YYYY-MM-DD') : '';
});
