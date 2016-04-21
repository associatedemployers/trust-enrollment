import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel () {
    if ( !this.controllerFor('employee-account.edit').get('eventSelection') ) {
      this.transitionTo('employee-account.edit.index');
    }
  }
});
