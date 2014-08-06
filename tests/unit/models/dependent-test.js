import { test, moduleForModel } from 'ember-qunit';

moduleForModel('dependent', 'Dependent', {
  // Specify the other units that are required for this test.
  needs: ['model:enrollment']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});
