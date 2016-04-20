export var initialize = function ( application ) {
  console.debug('Init :: Injecting store');
  application.inject('modules:session', 'store', 'service:store');
};

export default {
  name: 'inject-store-to-modules',
  initialize: initialize
};
