import Ember from 'ember';

export default Ember.Controller.extend({
  memberIdIsNotValid: Ember.computed.not('memberIdIsValid'),

  memberIdFormatted: function () {
    var memberId = this.get('memberId');

    return ( memberId ) ? memberId.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3') : undefined;
  }.property('memberId'),

  // Input Validation
  memberIdIsValid: function () {
    var memberId = this.get('memberId');

    if ( !memberId ) {
      return false;
    }

    // Make sure the card id is 9 characters long, starts with 943, and is a number
    return ( memberId.length === 9 && parseFloat( memberId.substr(0, 3) ) === 943 && !isNaN( memberId ) );
  }.property('memberId'),

  didChangeMemberId: function () {
    var format = this.get('memberId').replace(/[^0-9]/gm, '').substring(0, 9);

    Ember.run.once(this, function () {
      this.set('memberId', format);
    });
  }.observesImmediately('memberId'),
});
