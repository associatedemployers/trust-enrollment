import Ember from 'ember';

export default Ember.Component.extend({
  needs: [ 'controller:application' ],
  classNames:        [ 'side-navigation' ],
  classNameBindings: [ 'toggle:expanded' ],

  closeAndResetPanel: function () {
    this.set('toggle', false);
    this.get('links').filterBy('expanded', true).forEach(function ( link ) {
      Ember.set(link, 'expanded', false);
    });
  }.observes('hideWithChange'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    toggleSubLinks: function ( link ) {
      Ember.set(link, 'expanded', !Ember.get(link, 'expanded'));
    }
  }
});
