export var initialize = function ( application ) {
  application.inject('controller', 'session', 'service:session');
  application.inject('route', 'session', 'service:session');
  // application.inject('component', 'session', 'modules:session');
};

export default {
  name: 'inject-session',

  initialize: initialize
};
