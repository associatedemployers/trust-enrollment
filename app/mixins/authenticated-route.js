import Ember from 'ember';

export default function ( type ) {
  Ember.assert('Must create Authenticated Route Mixin with type', !!type);

  return Ember.Mixin.create({
    beforeModel: function ( transition ) {
      if ( !this.session.get('authenticated') ) {
        this.controllerFor(type + '-login').set('savedTransition', transition);
        return this.transitionTo(type + '-login');
      } else if ( this.session.get('content.type') !== type ) {
        return this.transitionTo('index');
      }

      this._super.apply(this, arguments);
    },

    authenticationChanged: function () {
      if(!this.session.get('authenticated')) {
        this.transitionTo('index');
      }
    }.observes('this.session.authenticated')
  });
}
