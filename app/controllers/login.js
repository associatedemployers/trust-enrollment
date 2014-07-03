import Ember from 'ember';

var LoginController = Ember.Controller.extend({

  // Input Validation
  idIsValid: function () {
    if(!this.get('cid')) {
      return false;
    }
    // Make sure the card id is 9 characters long
    return (this.get('cid').length === 9);
  }.property('cid')
  
});

export default LoginController;