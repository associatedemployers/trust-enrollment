import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('employee', {
      select: 'name legacyClientEmploymentDate legacyClientTerminationDate'
    });
  }
});
