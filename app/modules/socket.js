/*
  Socket Controller
*/

import Ember from 'ember';
import SocketEventManager from 'trust-enrollment/modules/socket-events/event-manager';
import config from 'trust-enrollment/config/environment';

export default Ember.Object.extend({
  connected:  false,
  connection: null,

  init: function () {
    this._super.apply(this, arguments);
    this.set('session', this.container.lookup('modules:session'));
  },

  connect: function () {
    var socket = io.connect(config.socketAddress);

    this.set('connection', socket);

    var self = this;

    socket.on('connect', function ( /* data */ ) {
      self.set('connected', true);

      console.debug('Socket Module :: Connected');
    });

    socket.on('connect_timeout', function ( err ) {
      console.error( err );
    });

    socket.on('connect_error', function ( err ) {
      console.error( err );
    });

    socket.on('error', function ( err ) {
      console.error( err );
    });

    socket.on('disconnect', function () {
      console.debug('Socket Module :: Disconnected');

      self.setProperties({
        connected: false
      });
    });

    SocketEventManager.get('events').forEach(function ( ev ) {
      var name = ev.name,
          hook = ev.hook;

      if ( !name || !hook || typeof hook !== 'function' ) {
        return;
      }

      console.debug('Socket Module :: Registering event:', name);

      socket.on(name, ev.hook.bind( self ));
    });
  }
});
