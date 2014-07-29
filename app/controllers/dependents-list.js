import Ember from 'ember';
import { caseTitle } from '../utils/text-tools';

export default Ember.Controller.extend({
  needs: [ 'application' ],
  isMarried:     Ember.computed.alias('parentController.isMarried'),
  enrollment:    Ember.computed.alias('parentController.enrollment'),

  entries: [
    {
      _valName: 'firstName',
      format: function (v) {
        return caseTitle(v);
      }
    },
    {
      _valName: 'middleInitial',
      format: function (v) {
        return caseTitle(v);
      }
    },
    {
      _valName: 'lastName',
      format: function (v) {
        return caseTitle(v);
      }
    },
    {
      _valName: 'ssn',
      format: function (v) {
        return (v) ? v.substring(0, 9) : v;
      }
    }
  ],

  dependentEntryDidChange: function () {
    var entries = this.get('entries'),
        self = this;

    entries.forEach(function (entry) {
      var val = self.get(entry._valName),
          formatted = (typeof entry.format === "function" && val) ? entry.format(val) : val;
      
      return self.set(entry._valName, formatted);
    });

  }.observes(
    'firstName',
    'middleInitial',
    'lastName',
    'ssn'
  ),

  ssnIsValid: function () {
    var ssn = this.get('ssn');
    if(!ssn) {
      return false;
    }
    // Make sure the ssn is 9 characters long and a number
    return (ssn.length === 9 && !isNaN(ssn));
  }.property('ssn'),

  ssn_formatted: function () {
    if(!this.get('ssn')) {
      return;
    }
    return this.get('ssn').replace(/(\d{3})(\d{2})(\d{4})/, '***-**-$3');
  }.property('ssn'),

  removeGenders: function () {
    // Don't allow same-sex spouses
    if(this.get('relationship') === "Spouse" && this.get("enrollment.gender")) {
      return this.get("enrollment.gender");
    }
  }.property('relationship', 'enrollment.gender'),

  removeRelationships: function () {
    // Don't allow single people to select spouse
    if(this.get('enrollment.marital') === "Single") {
      return "Spouse";
    }
  }.property('enrollment.marital')
});