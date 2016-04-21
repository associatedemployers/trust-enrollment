import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.store.query('employee', {
      select: 'name legacyClientEmploymentDate legacyClientTerminationDate'
    });
  }
});
