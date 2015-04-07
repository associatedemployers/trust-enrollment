import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'company-account/settings' ],

  notAllowChangePassword: Ember.computed.not('allowChangePassword'),
  notAllowChangeEmail:    Ember.computed.not('allowChangeEmail'),
  allowChangePassword:    Ember.computed.and('passwordConfirmed', 'newPassword', 'newPasswordConfirm'),

  passwordConfirmed: function () {
    return this.get('newPassword') === this.get('newPasswordConfirm');
  }.property('newPassword', 'newPasswordConfirm'),

  allowChangeEmail: function () {
    var model        = this.get('model'),
        changedEmail = ( model.changedAttributes().email ) ? model.changedAttributes().email : false;

    return model.get('email') && model.get('isDirty') && changedEmail && changedEmail[0] !== changedEmail[1];
  }.property('model.email', 'model.changedAttributes', 'model.isDirty'),

  actions: {
    changePassword: function () {

    },

    changeEmail: function () {
      if ( !this.get('allowChangeEmail') ) {
        return;
      }

      var self = this;

      var _end = function ( err, successMessage ) {
        var errMsg = ( err && err.responseText ) ? err.responseText : err;

        if ( err ) {
          console.error(err);
        }

        self.setProperties({
          emailError:   errMsg,
          savingEmail:  false,
          emailSuccess: successMessage
        });
      };

      this.get('controllers.company-account/settings')._saveChanges().then(function ( result ) {
        _end(null, 'Email successfully changed to ' + result.get('email') + '. Any future communications will be sent there.');
      }).catch(_end);
    }
  }
});
