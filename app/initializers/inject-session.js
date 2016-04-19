export var initialize = function ( application ) {
  application.inject('controller', 'session', 'modules:session');
  application.inject('route', 'session', 'modules:session');
  application.inject('component', 'session', 'modules:session');
};

export default {
  name: 'inject-session',
  after: 'register-modules',

  initialize: initialize
};
