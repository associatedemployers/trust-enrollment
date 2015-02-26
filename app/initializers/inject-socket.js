export function initialize( container, application ) {
  console.debug('Init :: Injecting socket');

  application.deferReadiness();

  var socketModule = container.lookup('modules:socket');

  socketModule.connect();

  container.typeInjection('controller', 'session', 'modules:session');
  container.typeInjection('route', 'session', 'modules:session');
  container.typeInjection('component', 'session', 'modules:session');

  application.advanceReadiness();
}

export default {
  name: 'inject-socket',
  initialize: initialize
};
