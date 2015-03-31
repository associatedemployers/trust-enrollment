import Ember from 'ember';

export default Ember.Mixin.create({
  needs: [ 'application' ],
  currentPath: Ember.computed.alias('controllers.application.currentPath'),
  routeDefinitions: {},

  routeContext: function () {
    var c = this.get('routeDefinitions.' + this.get('currentPath').split('.').pop());
    return ( c ) ? c : '';
  }.property('currentPath')
});
