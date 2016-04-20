import Ember from 'ember';

export default Ember.Controller.extend({
  loginIsNotValid: Ember.computed.not('ssnIsValid'),

  ssnIsValid: function () {
    var ssn = this.get('ssn');

    if ( !ssn ) {
      return false;
    }

    // Make sure the ssn is 9 characters long and a number
    return ssn.length === 9 && !isNaN( ssn );
  }.property('ssn'),

  ssnFormatted: function () {
    var ssn   = this.get('ssn'),
        valid = this.get('ssnIsValid');

    return ssn ? valid ? ssn.replace(/(\d{3})(\d{2})(\d{4})/, '***-**-$3') : ssn.replace(/\S/g, '*') : undefined;
  }.property('ssn'),

  didChangeSocial: function () {
    var format = this.get('ssn').replace(/[^0-9]/gm, '').substring(0, 9);

    Ember.run.once(this, function () {
      this.set('ssn', format);
    });
  }.observes('ssn'),

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty( prop );
    },

    login () {
      var ssn = this.get('ssn'),
          valid = this.get('ssnIsValid');

      var cancel = err => {
        let _err;

        if ( err ) {
          _err = typeof err === 'string' ? err : err.responseText ? err.responseText : err.statusText;
        }

        this.setProperties({
          loggingIn: false,
          loginError: _err
        });
      };

      if ( !valid ) {
        return cancel('Invalid SSN');
      }

      this.setProperties({
        loggingIn: true,
        loginError: null
      });

      Ember.$.post('/client-api/employee/login', { ssn }).then(res => {
        cancel();

        if ( res.verificationRequired === true ) {
          this.transitionToRoute('employee-login.verify-id', res.token);
          Ember.Logger.debug('Route debug: Verification required.');
        } else {
          Ember.Logger.debug('Route debug: Verification not required.');
          var auth = res;
          delete auth.verificationRequired;
          this.session.get('createSession')(auth, 'employee').then(( /* session */ ) => {
            this.transitionToRoute('employee-account');
          });
        }
      }).fail(cancel);
    }
  }
});
