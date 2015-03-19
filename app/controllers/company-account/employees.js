import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [ 'showingTerminated', 'sortAsc' ],
  showingActive: true,
  showingTerminated: false,
  sortAsc: true,

  init: function () {
    this._super.apply(this, arguments);
    console.log(this.get('showingTerminated'));
    if ( this.get('showingTerminated') ) {
      this.set('showingActive', false);
    }
  },

  activeEmployees: Ember.computed.filter('content', function ( employee ) {
    return !employee.get('legacyClientTerminationDate');
  }),

  terminatedEmployees: Ember.computed.filter('content', function ( employee ) {
    return !!employee.get('legacyClientTerminationDate');
  }),

  sortedActiveEmployees: Ember.computed.sort('activeEmployees', 'sortOrder'),
  sortedTerminatedEmployees: Ember.computed.sort('terminatedEmployees', 'sortOrder'),

  sortOrder: function () {
    var sortProperty  = ( this.get('showingActive') ) ? 'legacyClientEmploymentDate' : 'legacyClientTerminationDate';

    return ( this.get('sortAsc') ) ? [ sortProperty ] : [ sortProperty + ':desc' ];
  }.property('sortAsc', 'showingActive', 'showingTerminated'),

  setShowing: function () {
    if ( this.get('showingTerminated') === true ) {
      this.set('showingActive', false);
    }
  }.observes('showingTerminated'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    show: function ( type ) {
      var map = {
        active:     'showingActive',
        terminated: 'showingTerminated'
      };

      for ( var key in map ) {
        this.set( map[ key ], type === key );
      }
    }
  }
});
