import Ember from 'ember';

export default Ember.Controller.extend({
  loginIsValid:    Ember.computed.and('companyIdIsValid', 'password', 'notLoggingIn'),
  loginIsNotValid: Ember.computed.not('loginIsValid'),
  notLoggingIn:    Ember.computed.not('loggingIn'),

  companyIdIsValid: function () {
    var companyId = this.get('companyId');

    return companyId && companyId.length === 5;
  }.property('companyId'),

  actions: {
    toggleProperty: function (prop) {
      this.toggleProperty(prop);
    },

    login: function () {
      var data  = this.getProperties('companyId', 'password'),
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

      Ember.$.post('/client-api/company/login', { companyId: data.companyId, password: data.password }).then(function ( res ) {
        cancel();

        self.session.createSession( res ).then(function ( /* session */ ) {
          self.transitionToRoute('company');
        });
      }).fail( cancel );
    }
  }
});
