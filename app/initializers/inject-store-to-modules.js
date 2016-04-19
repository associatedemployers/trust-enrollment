export var initialize = function ( application ) {
  console.debug('Init :: Injecting store');
  application.inject('modules:session', 'store', 'service:store');
  // app.inject('components', 'store', 'store:main');
};

export default {
  name: 'inject-store-to-modules',
  after: 'store',

  initialize: initialize
};
