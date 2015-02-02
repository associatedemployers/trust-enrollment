import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'side-navigation' ],
  classNameBindings: [ 'toggle:expanded' ],

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
