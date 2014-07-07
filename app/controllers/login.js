import Ember from 'ember';

var LoginController = Ember.Controller.extend({
  loginIsNotValid: Ember.computed.not('loginIsValid'),

  // Input Validation
  idIsValid: function () {
    var cid = this.get('cid');
    if(!cid) {
      return false;
    }
    // Make sure the card id is 9 characters long, starts with 943, and is a number
    return (cid.length === 9 && parseFloat(cid.substr(0, 3)) === 943 && !isNaN(cid));
  }.property('cid'),

  ssnIsValid: function () {
    var ssn = this.get('ssn');
    if(!ssn) {
      return false;
    }
    // Make sure the ssn is 9 characters long and a number
    return (ssn.length === 9 && !isNaN(ssn));
  }.property('ssn'),

  loginIsValid: function () {
    // If this is a new enrollment, we return the ssn validity. If not, we return ssn & cid validity.
    return (this.get('newEnrollment')) ? this.get('ssnIsValid') : this.get('idIsValid') && this.get('ssnIsValid');
  }.property('ssnIsValid', 'idIsValid'),

  // Regex formatting
  cid_formatted: function () {
    if(!this.get('cid')) {
      return;
    }
    return this.get('cid').replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
  }.property('cid'),

  ssn_formatted: function () {
    if(!this.get('ssn')) {
      return;
    }
    return this.get('ssn').replace(/(\d{3})(\d{2})(\d{4})/, '***-**-$3');
  }.property('ssn'),

  actions: {
    // Implement a toggleProperty action handler to nerf a style depreciation message. Yeah, that's right, I said a STYLE DEPRECIATION.
    toggleProperty: function (prop) {
      this.toggleProperty(prop);
    }
  }
});

export default LoginController;