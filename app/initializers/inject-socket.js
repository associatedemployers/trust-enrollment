export function initialize( application ) {
  application.inject('controller', 'socket', 'modules:socket');
  application.inject('route', 'socket', 'modules:socket');
  application.inject('component', 'socket', 'modules:socket');
}

export default {
  name: 'inject-socket',
  after: 'register-modules',

  initialize: initialize
};
