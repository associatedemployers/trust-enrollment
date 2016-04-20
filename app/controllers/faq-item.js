import Ember from 'ember';

export default Ember.Controller.extend({
  expanded: false,

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
