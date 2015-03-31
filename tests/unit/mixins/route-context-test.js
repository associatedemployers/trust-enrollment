import Ember from 'ember';
import RouteContextMixin from '../../../mixins/route-context';
import { module, test } from 'qunit';

module('RouteContextMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var RouteContextObject = Ember.Object.extend(RouteContextMixin);
  var subject = RouteContextObject.create();
  assert.ok(subject);
});
