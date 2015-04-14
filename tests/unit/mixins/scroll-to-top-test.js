import Ember from 'ember';
import ScrollToTopMixin from '../../../mixins/scroll-to-top';
import { module, test } from 'qunit';

module('ScrollToTopMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ScrollToTopObject = Ember.Object.extend(ScrollToTopMixin);
  var subject = ScrollToTopObject.create();
  assert.ok(subject);
});
