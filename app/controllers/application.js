import Ember from 'ember';
import { states as staticStates, suffixes as staticSuffixes, genders as staticGenders, marital_statuses } from '../utils/defined-data';

var ApplicationController = Ember.Controller.extend({
  // Static Properties
  states: staticStates,
  suffixes: staticSuffixes,
  marital_statuses: marital_statuses,
  genders: staticGenders,

  // Computed Properties
  onIndex: function () {
    return this.get('currentPath') === "index";
  }.property('currentPath')
});

export default ApplicationController;