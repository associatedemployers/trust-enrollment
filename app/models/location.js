import DS from 'ember-data';
import addressFormatter from 'trust-enrollment/utils/address-formatter';

var attribute = DS.attr;

export default DS.Model.extend({
  legacyCompanyNumber: attribute('string'),
  soleProprietorship:  attribute('boolean'),
  embeddedDeductible:  attribute('boolean'),
  legacyInactive:      attribute('boolean'),

  addressLine1: attribute('string'),
  addressLine2: attribute('string'),
  city:         attribute('string'),
  state:        attribute('string'),
  zipcode:      attribute('string'),
  
  phone: attribute('string'),
  fax:   attribute('string'),

  ebmsNumbers: attribute('array'),
  company:     DS.belongsTo('company'),
  employees:   DS.hasMany('employee'),

  legacyEffectiveDate: attribute('date'),
  time_stamp:          attribute('date'),

  // Computed
  addressFormatted: addressFormatter.property('addressLine1', 'addressLine2', 'city', 'state', 'zipcode')
});
