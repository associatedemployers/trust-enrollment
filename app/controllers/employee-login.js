import Ember from 'ember';

export default Ember.Controller.extend({
  loginIsNotValid: Ember.computed.not('ssnIsValid'),

  ssnIsValid: function () {
    var ssn = this.get('ssn');

    if ( !ssn ) {
      return false;
    }

    // Make sure the ssn is 9 characters long and a number
    return ( ssn.length === 9 && !isNaN( ssn ) );
  }.property('ssn'),

  ssnFormatted: function () {
    var ssn   = this.get('ssn'),
        valid = this.get('ssnIsValid');

    return ( ssn ) ? ( valid ) ? ssn.replace(/(\d{3})(\d{2})(\d{4})/, '***-**-$3') : ssn.replace(/\S/g, '*') : undefined;
  }.property('ssn'),

  didChangeSocial: function () {
    var format = this.get('ssn').replace(/[^0-9]/gm, '').substring(0, 9);

    Ember.run.once(this, function () {
      this.set('ssn', format);
    });
  }.observesImmediately('ssn'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    login: function () {
      var ssn = this.get('ssn'),
          valid = this.get('ssnIsValid'),
          self = this;

      var cancel = function ( err ) {
        if ( err ) {
          err = ( typeof err === 'string' ) ? err : ( err.responseText ) ? err.responseText : err.statusText;
        }

        self.setProperties({
          loggingIn: false,
          loginError: err
        });
      };

      if ( !valid ) {
        return cancel('Invalid SSN');
      }

      self.setProperties({
        loggingIn: true,
        loginError: null
      });

      Ember.$.post('/api/employee/login', { ssn: ssn }).then(function ( res ) {
        if ( res.verificationRequired === true ) {
          cancel();
          self.transitionToRoute('employee-login.verify-id', res.token);
          console.debug('Route debug: Verification required.');
        } else {
          self.transitionToRoute('employee-account');
          console.debug('Route debug: Verification not required.');
        }
      }).fail( cancel );
    }
  }
});
