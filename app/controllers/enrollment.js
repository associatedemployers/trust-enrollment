import Ember from 'ember';
import scrollToTopMixin from 'trust-enrollment/mixins/scroll-to-top';

export default Ember.Controller.extend(scrollToTopMixin, {
  needs: [ 'application' ],

  routes: [
    {
      name: 'Get Started',
      link: 'index',
      hideNav: true
    },
    {
      name: 'About You',
      link: 'about'
    },
    {
      name: 'Dependent Information',
      link: 'dependents'
    }
  ],

  _deltaRoute: function ( delta ) {
    var routes = this.get('routes');
    return routes.objectAt(routes.indexOf(this.get('currentRoute')) + delta);
  },

  nextRoute: function () {
    return this._deltaRoute(1);
  }.property('currentRoute'),

  prevRoute: function () {
    return this._deltaRoute(-1);
  }.property('currentRoute'),

  currentPathDidChange: function () {
    this.set('currentRoute', this.get('routes').findBy('link', this.get('controllers.application.currentPath').split('enrollment.').pop()));
  }.observes('controllers.application.currentPath')
});
