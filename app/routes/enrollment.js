import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    /*
      TODO:
        -> After wireframing the data,
           implement a loader here that,
           if specified, will take
           params and request the saved
           enrollment data.
    */

    // Passing without params will create a new enrollment record.
    return this.store.createRecord('enrollment');
  }
});