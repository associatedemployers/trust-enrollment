/*
  Event functions definition

  Available hooks:

  1) qualify - return true or false for employee qualified for event
  2) setupEmployee - convenience hook for setting up employee with
  given data (ex. Employee marriage -> Change marital status to married)
*/

var __defaults = {
  mustBeMarried: function ( employee ) {
    return employee.get('maritalStatus') === 'married';
  },
  mustBeSingle: function ( employee ) {
    return employee.get('maritalStatus') === 'single';
  },
  mustHaveDependents: function ( employee ) {
    return employee._data.dependents.length > 0;
  }
};

export default {
  marriage: {
    qualify: __defaults.mustBeSingle,
    setupEmployee: function ( employee ) {
      employee.set('maritalStatus', 'married');
    }
  },
  domesticPartnership: {
    qualify: __defaults.mustBeSingle
  },
  divorce: {
    qualify: __defaults.mustBeMarried
  },
  spouseDeath: {
    qualify: __defaults.mustBeMarried,
    setupEmployee: function ( employee ) {
      var dependents = employee.get('dependents'),
          spouse     = dependents.findBy('relationship', 'spouse');

      dependents.removeObject( spouse );
    }
  },
  dependentDeath: {
    qualify: __defaults.mustHaveDependents
  },
  dependentOverAge: {
    qualify: __defaults.mustHaveDependents
  }
};
