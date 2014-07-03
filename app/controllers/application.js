import Ember from 'ember';

var ApplicationController = Ember.Controller.extend({
  onIndex: function () {
    return this.get('currentPath') === "index";
  }.property('currentPath')
});

export default ApplicationController;