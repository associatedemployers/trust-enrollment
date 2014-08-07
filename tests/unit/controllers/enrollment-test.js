import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:enrollment', 'EnrollmentController', {
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});

test('it should validate & format values entered into @entries', function () {
  expect(2);

  var controller = this.subject();

  Ember.run(function () {
    controller.setProperties({
      entries: [
        {
          _valName: 'firstName',
          sectionIndex: 1,
          format: function (v) {
            return 'format' + v;
          },
          validity: {
            _check: function (txt) {
              return (txt === 'formattest');
            },
            description: "Test Value"
          }
        }
      ],
      model: Ember.Object.create({})
    });

    controller.set('content.firstName', 'test');
  });

  equal(controller.get('validity.firstName'), true, 'validity.firstName should be true when given test');

  Ember.run(function () {
    controller.set('content.firstName', 'notvalid');
  });

  equal(controller.get('validity.firstName'), false, 'validity.firstName should be false when given notvalid');
});