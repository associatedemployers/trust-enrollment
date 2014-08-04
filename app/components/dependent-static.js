import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'static-dependents', 'list-group', 'dependent-list-group'],

  actions: {
    toggleProperty: function (prop) {
      this.toggleProperty(prop);
    }
  }
});