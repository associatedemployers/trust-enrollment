import Ember from 'ember';

export default Ember.Mixin.create({
  needs: [ 'application' ],
  currentPath: Ember.computed.alias('controllers.application.currentPath'),
  routeDefinitions: {},

  routeContext: function () {
    var c = this.get('routeDefinitions.' + this.get('currentPath').split('.').pop());
    return ( c ) ? c : '';
  }.property('currentPath'),

  inSubRoute: function () {
    var _root = this.get('root');
    return ( _root ) ? !( this.get('currentPath').split('.').slice(-2).join('.') === _root + '.index' || this.get('currentPath').split('.').pop() === _root ) : undefined;
  }.property('currentPath', 'root')
});
