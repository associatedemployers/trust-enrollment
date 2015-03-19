import Ember from 'ember';

export default Ember.Controller.extend({
  validWith: [
    [ 'firstName', 'lastName' ],
    [ 'ssn' ]
  ],

  validityQualification: {
    firstName: function ( value ) {
      return ( value ) ? value.length > 3 : false;
    }
  }
});
