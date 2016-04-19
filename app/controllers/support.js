import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),

  onSubRoute: function () {
    return this.get('application.currentPath') !== 'support.index';
  }.property('application.currentPath')
});
