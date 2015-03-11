export function initialize( container, application ) {
  console.debug('Init :: Injecting socket');

  application.deferReadiness();

  var socketModule = container.lookup('modules:socket');

  socketModule.connect();

  container.typeInjection('controller', 'socket', 'modules:socket');
  container.typeInjection('route', 'socket', 'modules:socket');
  container.typeInjection('component', 'socket', 'modules:socket');

  application.advanceReadiness();
}

export default {
  name: 'inject-socket',
  initialize: initialize
};
