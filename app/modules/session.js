import Ember from 'ember';

export default Ember.Object.extend({
  contentDidChange: function () {
    console.debug("Session :: Session did change");

    this.set('didSetHeaders', false);

    var token = this.get('content.token');

    if( token ) {
      console.debug("Session :: Setting up headers...");
      this._setupHeaders( token );
    }

    this.set('authenticated', !!token);
  }.observes('content'),

  destroySession: function () {
    var self = this;

    if( this.get('content.id') ) {
      this.store.find('session', this.get('content.id')).then(function ( session ) {
        session.destroyRecord();

        self.setProperties({
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
  
  createSession: function ( data ) {
    var self = this;

    return new Ember.RSVP.Promise(function ( resolve, reject ) {

      Ember.assert('Session#createSession must have data object to create a session', typeof data === 'object');

      var session = self.store.createRecord('session', {
        token:   data.token,
        expires: data.expiration,
        user:    data.user
      });

      session.save().then(function ( record ) {
        self.setProperties({
          content: record,
          authenticated: true
        });

        self.get('currentUser');

        resolve(record);
      }).catch( reject );
    });
  },
  
  _setupHeaders: function ( token ) {
    Ember.assert('Session must have token to setup headers', !!token);

    Ember.$.ajaxSetup({
      headers: {
        'X-API-Token': token
      }
    });

    this.set('didSetHeaders', true);
  },

  currentUser: function () {
    if(!this.get('content.user') || !this.get('authenticated')) {
      return;
    }

    Ember.assert('Session must have user id to fetch currentUser', this.get('content.user'));

    return this.store.find('employee', this.get('content.user'));
  }.property('content.user', 'authenticated')
});