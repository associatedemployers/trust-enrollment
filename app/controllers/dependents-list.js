import Ember from 'ember';
import { caseTitle } from '../utils/text-tools';

export default Ember.ArrayController.extend({
  needs: [ 'application' ],

  isMarried:  Ember.computed.alias('parentController.isMarried'),
  enrollment: Ember.computed.alias('parentController.enrollment'),

  formIsNotComplete: Ember.computed.not('formIsComplete'),

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
          formatted = (typeof entry.format === 'function' && val) ? entry.format(val) : val;
      
      return self.set(entry._valName, formatted);
    });
  }.observes(
    'firstName',
    'middleInitial',
    'lastName',
    'ssn'
  ),

  maritalStatusDidChange: function () {
    var spouse = this.get('enrollment.dependents').findBy('relationship', 'Spouse');

    if(spouse) {

    }
  }.observes('enrollment.marital'),

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
    if(this.get('relationship') === 'Spouse' && this.get('enrollment.gender')) {
      return this.get('enrollment.gender');
    }
  }.property('relationship', 'enrollment.gender'),

  removeRelationships: function () {
    // Some form logic to control relationship entry
    var dependents      = this.get('enrollment.dependents'),
        spouse          = dependents.findBy('relationship', 'Spouse'),
        domesticPartner = dependents.findBy('relationship', 'Domestic Partner'),
        marital         = this.get('enrollment.marital');

    if( marital === 'Single' && !domesticPartner ) {
      return 'Spouse';
    } else if( spouse || domesticPartner ) {
      return [ 'Spouse', 'Domestic Partner' ];
    } else if( marital === 'Married' ) {
      return 'Domestic Partner';
    }
  }.property('enrollment.marital', 'content.@each'),

  isSpouse: function () {
    return this.get('relationship') === 'Spouse';
  }.property('relationship'),

  formIsComplete: function () {
    var v = this.getProperties('relationship', 'firstName', 'middleInitial', 'lastName', 'ssn', 'dobYear', 'dobMonth', 'dobDay', 'gender'),
        complete;

    if(v) {
      for (var k in v) {
        if(!v[k]) {
          complete = false;
        }
      }
    }

    return complete !== false;
  }.property(
    'relationship',
    'firstName',
    'middleInitial',
    'lastName',
    'ssn',
    'dobYear',
    'dobMonth',
    'dobDay',
    'gender'
  ),

  actions: {
    addDependent: function () {
      if(this.get('formIsComplete')) {
        // Fetch dependent data
        var dependent_data = this.getProperties('relationship', 'firstName', 'middleInitial', 'lastName', 'ssn', 'dobYear', 'dobMonth', 'dobDay', 'gender', 'additionalProvider');
        // Create the record (This does not persist)
        var dependent = this.store.createRecord('dependent', dependent_data);
        // Push the new record into the enrollment model
        this.get('enrollment.dependents').pushObject(dependent);
        // Reset the form
        this.setProperties({
          relationship: null,
          firstName: null,
          middleInitial: null,
          lastName: null,
          ssn: null,
          dobYear: null,
          dobMonth: null,
          dobDay: null,
          gender: null,
          additionalProvider: null
        });
      }
    }
  }
});