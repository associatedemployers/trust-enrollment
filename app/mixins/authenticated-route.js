import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function ( transition ) {
    if ( !this.get('session.authenticated') ) {
      this.controllerFor('employee-login').set('savedTransition', transition);

      return this.transitionTo('employee-login');
    }

    this._super();
  },

  authenticationChanged: function () {
    if(!this.session.get('authenticated')) {
      this.transitionTo('index');
    }
  }.observes('this.session.authenticated')
});
