/*
  Use this to register custom modules
*/
import Session from 'trust-enrollment/modules/session';
import Socket from 'trust-enrollment/modules/socket';

export var initialize = function( application ) {
  console.debug('Init :: Registering modules');
  application.register('modules:session', Session.extend(), { singleton: true });
  application.register('modules:socket', Socket.extend(), { singleton: true });
};

export default {
  name: 'register-modules',
  after: 'inject-store-to-modules',

  initialize: initialize
};
