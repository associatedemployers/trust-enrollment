import Ember from 'ember';
import titleCase from 'trust-enrollment/utils/title-case';

var titleCaseValue = function ( value ) {
  return ( value ) ? titleCase(value) : false;
};

export default Ember.Controller.extend({
  needs: [ 'application' ],

  states: Ember.computed.alias('controllers.application.states'),
  name: Ember.computed.or('firstName', 'lastName'),
  address: Ember.computed.and('addressLine1', 'city'),

  employmentTextValue: moment().format('DD MMMM, YYYY'),
  state: 'MT',

  validWith: [
    [ 'firstName', 'lastName', 'middleInitial' ],
    [ 'legacyClientEmploymentDate' ],
    [ 'ssn' ],
    [ 'addressLine1', 'city', 'state', 'zipcode' ]
  ],

  ssnMasked: function () {
    var ssn  = this.get('ssn');
    return ( ssn ) ? ( ssn.length === 9 ) ? ssn.replace(/(\d{3})(\d{2})(\d{4})/, '***-**-$3') : ssn.replace(/\S/g, '*') : ssn;
  }.property('ssn'),

  validityQualification: {
    firstName: titleCaseValue,
    middleInitial: function ( value ) {
      return ( value ) ? ( value.length === 1 ) ? value.toUpperCase() : value.charAt(0).toUpperCase() : false;
    },
    lastName: titleCaseValue,
    ssn: function ( value ) {
      return ( value ) ? ( value.length > 9 ) ? value.replace(/\D/g, '').substr(0, 9) : value.length === 9 && !isNaN( value ) : false;
    },
    city: titleCaseValue
  }
});
