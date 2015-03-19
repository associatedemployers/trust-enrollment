import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'application' ],
  currentPath: Ember.computed.alias('controllers.application.currentPath'),

  routeDefinitions: {
    bulk: 'New Employees',
    index: 'New Employee'
  },

  routeContext: function () {
    var c = this.get('routeDefinitions.' + this.get('currentPath').split('.').pop());
    return ( c ) ? c : '';
  }.property('currentPath')
});
