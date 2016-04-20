/*
  Use this to register custom modules
*/
import Socket from 'trust-enrollment/modules/socket';

export var initialize = function( application ) {
  console.debug('Init :: Registering modules');
  // application.register('modules:session', Session, { singleton: true });
  application.register('modules:socket', Socket, { singleton: true });
};

export default {
  name: 'register-modules',
  initialize: initialize
};
