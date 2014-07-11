import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'application' ],
  onIndex: Ember.computed.alias('controllers.application.onIndex')
});