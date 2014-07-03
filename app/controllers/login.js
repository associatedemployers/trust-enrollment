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

  loginIsValid: function () {

  },

  cidDidChange: function () {
    var cid = this.get('cid');
    this.set('cid_formatted', cid.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3'));
  }.observes('cid'),

  actions: {
    // Implement a toggleProperty action handler to nerf a style depreciation message. Yeah, that's right, I said a STYLE DEPRECIATION.
    toggleProperty: function (prop) {
      this.toggleProperty(prop);
    }
  }
});

export default LoginController;