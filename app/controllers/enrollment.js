import Ember from 'ember';
import renderTooltips from 'trust-enrollment/mixins/render-tooltips';
import scrollToTopMixin from 'trust-enrollment/mixins/scroll-to-top';

export default Ember.Controller.extend(renderTooltips, scrollToTopMixin, {
  application: Ember.inject.controller(),
  showNav: false,

  routes: Ember.A([
    {
      name: 'Get Started',
      link: 'index',
      fullLink: 'enrollment.index',
      hideNav: true
    },
    {
      name: 'About You',
      link: 'about',
      fullLink: 'enrollment.about'
    },
    {
      name: 'Contact Methods',
      link: 'contact-methods',
      fullLink: 'enrollment.contact-methods'
    },
    {
      name: 'Dependents',
      link: 'dependents',
      fullLink: 'enrollment.dependents'
    },
    {
      name: 'Medical',
      link: 'medical',
      fullLink: 'enrollment.medical'
    }
  ]),

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
    var self = this,
        routes = this.get('routes'),
        path = this.get('application.currentPath').split('enrollment.').pop();

    var setCurrent;

    this.set('routes', routes.map(function ( route ) {
      var match = route.link === path;

      Ember.setProperties(route, {
        complete: !setCurrent && !match,
        active: match
      });

      if ( match ) {
        self.set('currentRoute', route);
        setCurrent = true;
      }

      return route;
    }));
  }.observes('application.currentPath'),

  navGlance: function () {
    var showNav = this.get('showNav');

    if ( showNav ) {
      return;
    }

    this.set('showNav', true);

    Ember.run.scheduleOnce('afterRender', this, function () {
      Ember.run.later(this, function () {
        this.set('showNav', false);
      }, 1500);
    });
  }.observes('currentRoute'),

  progress: function () {
    var ret;

    this.get('routes').forEach(function ( route, index ) {
      if ( route.active ) {
        ret = index;
      }
    });

    return (ret / this.get('routes.length')) * 100;
  }.property('routes'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
