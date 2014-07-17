import Ember from 'ember';

export default Ember.ArrayController.extend({
  progress: Ember.computed.alias('parentController.progress')
});