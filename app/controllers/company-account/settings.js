import Ember from 'ember';
import routeContextMixin from 'trust-enrollment/mixins/route-context';

export default Ember.Controller.extend(routeContextMixin, {
  routeDefinitions: {
    account:        'Account',
    communications: 'Communications',
    enrollment:     'Enrollment'
  },

  _saveChanges: function ( model ) {
    var self = this;

    return new Ember.RSVP.Promise(function ( resolve, reject ) {
      var _err = function ( err ) {
        var errMsg = ( err && err.responseText ) ? err.responseText : err;

        self.setProperties({
          saveError:     errMsg,
          savingChanges: false
        });

        reject(err);
      };

      return model.save().then(resolve).catch(_err);
    });
  }
});
