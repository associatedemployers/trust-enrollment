import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  onIndex: Ember.computed.alias('application.onIndex')
});
