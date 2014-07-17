import Ember from 'ember';
import { states as staticStates, suffixes as staticSuffixes } from '../utils/defined-data';

var ApplicationController = Ember.Controller.extend({
  // Static Properties
  states: staticStates,
  suffixes: staticSuffixes,

  // Computed Properties
  onIndex: function () {
    return this.get('currentPath') === "index";
  }.property('currentPath')
});

export default ApplicationController;