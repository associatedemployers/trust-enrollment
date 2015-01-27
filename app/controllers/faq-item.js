import Ember from 'ember';

export default Ember.ObjectController.extend({
  expanded: false,

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
