import Ember from 'ember';
import renderTooltips from 'trust-enrollment/mixins/render-tooltips';
import scrollToTopMixin from 'trust-enrollment/mixins/scroll-to-top';

const { computed } = Ember;

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

  _deltaRoute ( delta ) {
    var routes = this.get('routes');
    return routes.objectAt(routes.indexOf(this.get('currentRoute')) + delta);
  },

  nextRoute: computed('currentRoute', function () {
    return this._deltaRoute(1);
  }),

  prevRoute: computed('currentRoute', function () {
    return this._deltaRoute(-1);
  }),

  currentRoute: computed('routes.[]', 'application.currentPath', function () {
    return this.get('routes').findBy('link', this.get('application.currentPath').split('enrollment.').pop());
  }),

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

  progress: computed('routes.[]', 'currentRoute', function () {
    return this.get('routes').indexOf(this.get('currentRoute')) / this.get('routes.length') * 100;
  }),

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
