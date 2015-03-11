import Ember from 'ember';
import { states as staticStates, suffixes as staticSuffixes, genders as staticGenders, marital_statuses, dependent_relationships as dependentRelationshipsStatic } from '../utils/defined-data';

//var fullBackgroundRoutes = [ '' ];

var ApplicationController = Ember.Controller.extend({
  // Static Properties
  states: staticStates,
  suffixes: staticSuffixes,
  marital_statuses: marital_statuses,
  genders: staticGenders,
  dependent_relationships: dependentRelationshipsStatic,

  // Computed Properties
  onIndex: function () {
    return this.get('currentPath') === "index";
  }.property('currentPath'),

  onEmployeeAccount: function () {
    return this.get('currentPath').indexOf('employee-account') > -1;
  }.property('currentPath')
});

export default ApplicationController;