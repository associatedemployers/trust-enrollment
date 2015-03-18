import Ember from 'ember';

export default Ember.Controller.extend({
  loginIsValid:    Ember.computed.and('key', 'password', 'notLoggingIn'),
  loginIsNotValid: Ember.computed.not('loginIsValid'),
  notLoggingIn:    Ember.computed.not('loggingIn'),

  actions: {
    toggleProperty: function (prop) {
      this.toggleProperty(prop);
    },

    login: function () {
      var data  = this.getProperties('key', 'password'),
          valid = this.get('loginIsValid'),
          self  = this;

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
        return cancel('Form not valid');
      }

      self.setProperties({
        loggingIn: true,
        loginError: null
      });

      var query = ( data.key.indexOf('@') < 0 ) ? { companyId: data.key } : { email: data.key };

      Ember.$.post('/client-api/company/login', Ember.$.extend({ password: data.password }, query)).then(function ( res ) {
        cancel();

        self.session.createSession( res, 'company' ).then(function ( /* session */ ) {
          self.transitionToRoute('company-account');
        });
      }).fail( cancel );
    }
  }
});
