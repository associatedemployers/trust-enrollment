import { test, moduleForModel } from 'ember-qunit';

moduleForModel('enrollment', 'Enrollment', {
  // Specify the other units that are required for this test.
  needs: ['model:dependent']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});
