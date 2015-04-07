import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [ 'byRate' ],
  byRate: false,

  shouldSetByRate: function () {
    this.set('byRate', this.get('model.contributionOnRates'));
  }.observes('model.contributionOnRates').on('init'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty(prop);
    },

    toggleContributionOnRates: function () {
      this.get('model').toggleProperty('contributionOnRates');
    }
  }
});
