import Ember from 'ember';

/*
  This controller is similar to the LoginController, a similar view controller that handles employee logins, but has been striped down
*/

var LoginCompanyController = Ember.Controller.extend({
  loginIsNotValid: Ember.computed.not('loginIsValid'),

  // Input Validation
  companyIdIsValid: function () {
    var companyId = this.get('companyId');
    if(!companyId) {
      return false;
    }
    // Make sure the company id is 5 characters long --NOTE: This may change.
    return (companyId.length === 5);
  }.property('companyId'),

  loginIsValid: function () {
    // Return the company id & password validity
    return (this.get('companyIdIsValid') && this.get('password'));
  }.property('companyIdIsValid', 'password'),

  actions: {
    toggleProperty: function (prop) {
      this.toggleProperty(prop);
    }
  }
});

export default LoginCompanyController;