import Ember from 'ember';

export default Ember.Route.extend({
  model ( params ) {
    return params.token;
  },

  actions: {
    willTransition ( transition ) {
      const controller = this.controller;

      if ( !controller.get('showModal') ) {
        return;
      }

      transition.abort();
      controller.set('showModal', false);

      $('#' + controller.get('modalId')).one('hidden.bs.modal', () => {
        transition.retry();
      });
    },

    didTransition () {
      // We must turn the modal on every time we enter the route
      this.controller.set('showModal', true);
    }
  }
});
