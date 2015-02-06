import Ember from 'ember';

export default Ember.ObjectController.extend({
  // Co-insurance Chart
  coinsuranceChart: {
    chartOptions: {
      color: {
        pattern: [ '#6EC463', '#FFFFFF' ]
      },
      donut: {
        width: 2
      },
      legend: {
        position: 'right'
      }
    },
    dataOptions: {
      type: 'donut'
    }
  },

  coinsuranceDataset: function () {
    var coinsurance = this.get('content.medicalRates.firstObject').get('coInsurance'),
        sCoin       = ( coinsurance ) ? coinsurance.split('/') : [ 0, 0 ];

    return Ember.A([
      [ 'Plan', sCoin[ 0 ] ],
      [ 'You',  sCoin[ 1 ] ]
    ]);
  }.property('content.medicalRates.@each.coInsurance'),
});
