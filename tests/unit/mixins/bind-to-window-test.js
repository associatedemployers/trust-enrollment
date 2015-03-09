import Ember from 'ember';
import BindToWindowMixin from 'trust-enrollment/mixins/bind-to-window';

module('BindToWindowMixin');

// Replace this with your real tests.
test('it works', function() {
  var BindToWindowObject = Ember.Object.extend(BindToWindowMixin);
  var subject = BindToWindowObject.create();
  ok(subject);
});
