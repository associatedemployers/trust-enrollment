import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.store.findAll('enrollment-period');
  },

  actions: {
    refresh () {
      this.refresh();
    }
  }
});
