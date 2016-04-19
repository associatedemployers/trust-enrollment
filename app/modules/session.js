import Ember from 'ember';

export default Ember.Object.extend({
  contentDidChange: function () {
    console.debug('Session :: Content Change');

    this.set('didSetHeaders', false);

    var token = this.get('content.token');

    if ( token ) {
      console.debug('Session :: Setting up headers...');
      this._setupHeaders( token );
    }

    this.set('authenticated', !!token);
  }.observes('content'),

  destroySession () {
    if ( this.get('content.id') ) {
      this.store.find('session', this.get('content.id')).then(session => {
        session.destroyRecord();

        this.setProperties({
          authenticated: false,
          content: null
        });
      });
    }

    Ember.$.ajaxSetup({
      headers: {
        'X-API-Token': null
      }
    });
  },

  createSession ( data, type ) {
    Ember.assert('Session#createSession must have data object to create a session', typeof data === 'object');

    var session = this.store.createRecord('session', {
      token:   data.token,
      expires: data.expiration,
      user:    data.user,
      type:    type || 'employee'
    });

    return session.save().then(function ( record ) {
      this.setProperties({
        content: record,
        authenticated: true
      });

      this.get('currentUser');
      return record;
    });
  },

  _setupHeaders ( token ) {
    Ember.assert('Session must have token to setup headers', !!token);

    Ember.$.ajaxSetup({
      headers: {
        'X-API-Token': token
      }
    });

    this.set('didSetHeaders', true);
  },

  currentUser: function () {
    if ( !this.get('content.user') || !this.get('authenticated') ) {
      return undefined;
    }

    Ember.assert('Session must have user id to fetch currentUser', this.get('content.user'));
    console.log(this.get('content.type'));
    return this.store.find(this.get('content.type'), this.get('content.user'));
  }.property('content.user', 'authenticated'),

  enrollmentPeriods: function () {
    return this.store.find('enrollment-period', { super: true });
  }.property()
});
