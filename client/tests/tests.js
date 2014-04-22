/*global emq,setResolver*/

emq.globalize();
setResolver(Ember.DefaultResolver.create({
    namespace: App
}));

App.rootElement = '#qunit-fixture';
App.setupForTesting();
App.injectTestHelpers();

require('tests/*');
