export function initialize( application ) {
  application.inject('controller', 'session', 'modules:socket');
  application.inject('route', 'session', 'modules:socket');
  application.inject('component', 'session', 'modules:socket');
}

export default {
  name: 'inject-socket',
  initialize: initialize
};
