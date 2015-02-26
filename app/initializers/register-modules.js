/*
  Use this to register custom modules
*/
import Session from 'trust-enrollment/modules/session';
import Socket from 'trust-enrollment/modules/socket';

export var initialize = function( container, app ) {
  console.debug('Init :: Registering modules');

  app.deferReadiness();

  container.register('modules:session', Session.extend(), { singleton: true });
  container.register('modules:socket', Socket.extend(), { singleton: true });

  app.advanceReadiness();
};

export default {
  name: 'register-modules',
  after: 'inject-store-to-modules',

  initialize: initialize
};
