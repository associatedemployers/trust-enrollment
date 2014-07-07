import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'trust-enrollment',
  Resolver: Resolver
});

loadInitializers(App, 'trust-enrollment');

export default App;