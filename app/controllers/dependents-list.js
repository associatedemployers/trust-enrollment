import Ember from 'ember';
import { caseTitle } from '../utils/text-tools';

export default Ember.ArrayController.extend({
  needs: [ 'application' ],

  isMarried:  Ember.computed.alias('parentController.isMarried'),
  enrollment: Ember.computed.alias('parentController.enrollment'),
  isSingle:   Ember.computed.not('parentController.isMarried'),

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

  checkForDependentIssues: function () {
    var enrollment      = this.get('enrollment').getProperties('dependents', 'marital', 'gender'),
        spouse          = enrollment.dependents.findBy('relationship', 'Spouse'),
        domesticPartner = enrollment.dependents.findBy('relationship', 'Domestic Partner'),
        gender          = enrollment.gender,
        isSingle        = this.get('isSingle'),
        msg, msgContext, relationshipTo;

    if( spouse && enrollment.marital && isSingle ) {
      msg            = "You can not be single and list a dependent as a spouse.";
      msgContext     = "Marital Status";
      relationshipTo = "Domestic Partner";
    } else if( domesticPartner && enrollment.marital && !isSingle ) {
      msg            = "You can not be married and list a dependent as a domestic partner.";
      msgContext     = "Marital Status";
      relationshipTo = "Spouse";
    } else if( spouse && gender === spouse.get('gender') ) {
      msg            = "You can not list a dependent as a spouse with the same gender. Trust plans do not allow same-sex marriage enrollments.";
      msgContext     = "Gender";
      relationshipTo = "Domestic Partner";
    }

    if(msg && msgContext) {
      this.setProperties({
        dependentIssueText: msg,
        dependentIssueContext: msgContext,
        relationshipTo: relationshipTo
      });

      this.send('showModal', 'dependent-issue-modal', true);
    }
  }.observes('enrollment.marital', 'enrollment.gender', 'content.@each.relationship'),

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
  }.property('enrollment.marital', 'content.@each.relationship'),

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
    },
    resolveDependentIssue: function (option) {
      var dependents     = this.get('content'),
          issueContext   = this.get('dependentIssueContext'),
          relationshipTo = this.get('relationshipTo'),
          relationship   = ( relationshipTo === 'Spouse') ? 'Domestic Partner' : 'Spouse',
          dependent      = dependents.findBy('relationship', relationship);
      
      this.send('hideModal', 'dependent-issue-modal');

      if( option === 'Relationship' ) {
        dependent.set('relationship', relationshipTo);
      } else if( option === 'Remove' ) {
        dependent.deleteRecord();
      } else if( option === 'Reset' ) {
        var op = ( issueContext === 'Gender' ) ? 'gender' : 'marital';

        this.get('enrollment').set(op, null);
      }
    }
  }
});
