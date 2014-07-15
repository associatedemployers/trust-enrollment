import Ember from 'ember';
import { states as staticStates } from '../utils/defined-data';

var ApplicationController = Ember.Controller.extend({
  // Static Properties
  states: staticStates,

  // Computed Properties
  onIndex: function () {
    return this.get('currentPath') === "index";
  }.property('currentPath')
});

export default ApplicationController;