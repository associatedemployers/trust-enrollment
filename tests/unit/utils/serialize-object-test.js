import serializeObject from '../../../utils/serialize-object';
import { module, test } from 'qunit';

module('serializeObject');

test('it serializes nested objects', function ( assert ) {
  var object = {
    test: 'key',
    testObject: {
      key: 'inside',
      test: 'inside2'
    },
    anothertest: {
      anotherKey: 'inside',
      anotherThing: 'overhere'
    },
    groupedProperties: {
      properties: 'easy',
      another: 'here'
    },
    anothertest2: {
      anotherKey: 'inside',
      anotherThing: 'overhere'
    }
  };

  var result = serializeObject(serializeObject(object, true, 'testObject', 'anothertest'), false, 'groupedProperties', 'anothertest2');

  assert.deepEqual(result, {
    test: 'key',
    testObjectKey: 'inside',
    testObjectTest: 'inside2',
    anothertestAnotherKey: 'inside',
    anothertestAnotherThing: 'overhere',
    properties: 'easy',
    another: 'here',
    anotherKey: 'inside',
    anotherThing: 'overhere'
  }, 'Serialized objects');

  var doubleNestedObject = {
    test: 'key',
    testObject: {
      keyObject: {
        inside: 'test'
      }
    }
  };
  var doubleNestedObject2 = {
    test: 'key',
    testObject: {
      keyObject: {
        inside: 'test'
      }
    }
  };

  assert.deepEqual(serializeObject(doubleNestedObject, true, 'testObject'), {
    test: 'key',
    testObjectKeyObjectInside: 'test'
  }, 'Deep nested objects');

  assert.deepEqual(serializeObject(doubleNestedObject2, false, 'testObject'), {
    test: 'key',
    keyObjectInside: 'test'
  }, 'Deep nested objects w/o prefix');
});
