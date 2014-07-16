import { states } from 'trust-enrollment/utils/defined-data';

module('definedData');

// Replace this with your real tests.
test('it has a list of states - is an array', function () {
  ok(states instanceof Array);
});

test('it has a list of states - contains objects', function () {
  ok(typeof states[0] === "object");
});

test('it has a list of states - object is valid', function () {
  states.forEach(function (state) {
    ok(state.l !== undefined);
    ok(state.v !== undefined);
  });
});