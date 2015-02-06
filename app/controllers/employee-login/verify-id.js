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

  actions: {
    verify: function () {
      var memberId = this.get('memberId'),
          valid    = this.get('memberIdIsValid'),
          token    = this.get('content'),
          self     = this;

      var cancel = function ( err ) {
        if ( err ) {
          console.error( err );
          err = ( typeof err === 'string' ) ? err : ( err.responseText ) ? err.responseText : err.statusText;
        }

        self.setProperties({
          verifying:   false,
          verifyError: err
        });
      };

      if ( !valid ) {
        return cancel('Invalid Member ID');
      }

      self.setProperties({
        verifying:   true,
        verifyError: null
      });

      Ember.$.post('/client-api/employee/login/verify', { token: token, memberId: memberId }).then(function ( res ) {
        cancel();

        var auth = res;
        delete auth.verificationRequired;

        return self.session.createSession( auth );
      })
      .then(function ( /* session */ ) {
        self.transitionToRoute('employee-account');
      }).fail( cancel );
    }
  }
});
