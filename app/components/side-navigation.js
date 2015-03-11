import Ember from 'ember';

export default Ember.Component.extend({
  needs: [ 'controller:application' ],
  classNames:        [ 'side-navigation' ],
  classNameBindings: [ 'toggle:expanded' ],

  closePanel: function () {
    this.set('toggle', false);
  }.observes('hideWithChange'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
