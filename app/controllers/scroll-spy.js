import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: [ 'enrollment' ],
  progress: Ember.computed.alias('parentController.progress')
});