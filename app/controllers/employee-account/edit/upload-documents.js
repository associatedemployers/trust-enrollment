import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'employee-account/edit' ],

  eventSelection: Ember.computed.alias('controllers.employee-account/edit.eventSelection')
});
