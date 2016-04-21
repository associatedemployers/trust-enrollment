import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.store.createRecord('employee'); // Development
    // return this.session.get('currentUser');
  },

  actions: {
    next () {
      this.transitionTo('enrollment.' + this.controller.get('nextRoute.link'));
    },

    previous () {
      this.transitionTo('enrollment.' + this.controller.get('prevRoute.link'));
    }
  }
});
