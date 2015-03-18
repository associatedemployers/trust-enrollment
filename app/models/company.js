import DS from 'ember-data';
import addressFormatter from 'trust-enrollment/utils/address-formatter';

var attribute = DS.attr;

export default DS.Model.extend({
  companyName: attribute('string'),
  email:       attribute('string'),
  companyId:   attribute('string'),

  contactName:  attribute('string'),
  contactPhone: attribute('string'),
  contactFax:   attribute('string'),

  addressLine1: attribute('string'),
  addressLine2: attribute('string'),
  city:         attribute('string'),
  state:        attribute('string'),
  zipcode:      attribute('string'),  

  // Relational
  medicalRates:      DS.hasMany('medical-rate', { async: true, inverse: 'company' }),
  dentalRates:       DS.hasMany('dental-rate', { async: true, inverse: false }),
  visionRates:       DS.hasMany('vision-rate', { async: true, inverse: false }),
  employees:         DS.hasMany('employee', { async: true, inverse: 'company' }),
  locations:         DS.hasMany('location', { async: true, inverse: 'company' }),
  files:             DS.hasMany('file', { async: true }),
  enrollmentPeriods: DS.hasMany('enrollment-period', { async: true }),
  lastLogin:         DS.belongsTo('login', { inverse: false }),

  // Legacy Fields and Flags
  legacyCompanyNumber:     attribute('string'),
  legacyAemMemberId:       attribute('string'),
  legacyBrokerId:          attribute('string'),
  legacyRateTier:          attribute('string'),
  legacyWaitingPeriod:     attribute('string'),
  legacySelectCare:        attribute('string'),
  legacyMinimumHours:      attribute('string'),
  legacySoleProprietor:    attribute('string'),
  legacyRetirees:          attribute('string'),
  legacyLoa:               attribute('string'),
  legacyContribution:      attribute('string'),
  legacyNotes:             attribute('string'),
  legacyAffiliated:        attribute('string'),
  legacyCoverLifeIfWaived: attribute('string'),
  legacyBrightChoicesFlag: attribute('string'),
  legacyMtChamberFlag:     attribute('string'),
  legacyWellnessFlag:      attribute('string'),
  legacyEffectiveMonth:    attribute('string'),
  legacyPrimaryCo:         attribute('string'),
  legacyNumberEmployees:   attribute('string'),

  legacyCompEffectDate:    attribute('date'),
  legacyBrokerEffectDate:  attribute('date'),
  removedOn:               attribute('date'),

  // System
  time_stamp: attribute('date', {
    defaultValue: function () {
      return Date();
    }
  }),

  // Computed
  addressFormatted: addressFormatter.property('addressLine1', 'addressLine2', 'city', 'state', 'zipcode'),

  nameAbbreviated: function () {
    var nameArray = this.get('companyName').split(' ');

    return nameArray.reduce(function ( abbrv, namePart ) {
      var addition = ( /([A-Z]){2,}/.test(namePart) ) ? namePart : namePart.charAt(0).toUpperCase();
      return abbrv + addition;
    }, '');
  }.property('companyName')
});
