window.App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/helpers/*');
require('scripts/views/*');
require('scripts/router');
