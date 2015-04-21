import DS from 'ember-data';
import { dependent_relationships_context as depContexts } from '../utils/defined-data';

var attribute = DS.attr;

export default DS.Model.extend({
  firstName:     attribute('string'),
  middleInitial: attribute('string'),
  lastName:      attribute('string'),
  suffix:        attribute('string'),

  // Info
  relationship:          attribute('string'),
  ssn:                   attribute('string'),
  gender:                attribute('string'),
  ebmsTerminationCode:   attribute('string'),
  otherInsuranceCompany: attribute('string'), // Dependent's Other Health Insurance Company
  memberId:              attribute('string'),
  legacyId:              attribute('string'),

  // Legacy Fields
  legacyPreExistingLength:          attribute('number'),  // Pre-existing condition length
  legacyPreExistingCertificate:     attribute('boolean'), // Pre-existing condition cert.
  legacyPreviousMedical:            attribute('boolean'), // Medical coverage previous to term date
  legacyMedicalEnrollment:          attribute('boolean'),
  legacyVoluntaryEnrollment:        attribute('boolean'),
  legacySupplementalLifeEnrollment: attribute('boolean'),
  legacyOtherHealthInsurance:       attribute('boolean'),
  legacyHasPaperwork:               attribute('boolean'),

  // DTs
  legacyEffectiveDate:   attribute('date'),
  legacyTerminationDate: attribute('date'),
  legacyInitialDateSent: attribute('date'),
  legacyChangeSent:      attribute('date'),
  legacyTerminationSent: attribute('date'),
  dateOfBirth:           attribute('date'),

  // Relational
  notes:          DS.hasMany('note'),
  historyEvents:  DS.hasMany('history-event', { async: true }),
  employee:       DS.belongsTo('employee', { async: true }),

  // Relational Plans
  medicalRates:   DS.hasMany('medical-rate'),
  dentalRates:    DS.hasMany('dental-rate'),
  visionRates:    DS.hasMany('vision-rate'),
  lifeRates:      DS.hasMany('life-rate'),

  // Computed
  fullName: function () {
    var n = this.getProperties('firstName', 'lastName', 'middleInitial', 'suffix');

    n.middleInitial = ( n.middleInitial ) ? n.middleInitial + '. ' : '';
    n.suffix        = ( n.suffix ) ? ' ' + n.suffix : '';

    return n.firstName + ' ' + n.middleInitial + n.lastName + n.suffix;
  }.property('firstName', 'lastName', 'middleInitial', 'suffix'),

  contextualRelationship: function () {
    var m = this.getProperties('relationship', 'gender');

    var contextual = depContexts[ m.relationship ];

    return ( m.gender && contextual && contextual[ m.gender ] ) ? contextual[ m.gender ] : m.relationship;
  }.property('relationship', 'gender'),

  isSpouse: function () {
    return this.get('relationship') === 'Spouse';
  }.property('relationship'),

  isChild: function () {
    return this.get('relationship') === 'Child';
  }.property('relationship'),

  isOtherRelationship: function () {
    var rel = this.get('relationship');

    return rel !== 'Spouse' && rel !== 'Child';
  }.property('relationship'),

  isFemale: function () {
    return this.get('gender') === 'Female';
  }.property('gender'),

  isMale: function () {
    return this.get('gender') === 'Male';
  }.property('gender'),

  maskedSSN: function () {
    var ssn = this.get('ssn');

    return ( ssn ) ? this.get('ssn').replace(/(\d{3})(\d{2})(\d{4})/, '***-**-$3') : ssn; 
  }.property('ssn'),

  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
