import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'application' ],

  onSubRoute: function () {
    return this.get('controllers.application.currentPath') !== 'support.index';
  }.property('controllers.application.currentPath')
});
