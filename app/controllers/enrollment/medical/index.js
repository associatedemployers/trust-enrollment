import Ember from 'ember';

export default Ember.Controller.extend({

  __DEVTEMP: function () {
    var tempDependents = [
      {
        firstName: 'Test',
        lastName: 'Tester',
        relationship: 'Spouse',
        gender: 'Female'
      },
      {
        firstName: 'Test2',
        lastName: 'Tester',
        relationship: 'Child',
        gender: 'Male'
      },
      {
        firstName: 'Test3',
        lastName: 'Tester',
        relationship: 'Child',
        gender: 'Female'
      }
    ];

    var self = this,
        emp  = this.get('model');

    if ( !emp ) { return; }

    emp.get('dependents').addObjects(tempDependents.map(function ( dep ) {
      return self.store.createRecord('dependent', $.extend({ employee: emp }, dep));
    }));
  }.observes('model'),

  dependentsUnassigned: Ember.computed.filterBy('model.dependents', 'hasMedical', false)
});
