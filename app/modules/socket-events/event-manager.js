import Ember from 'ember';

export default Ember.Object.create({
  events: Ember.A([
    {
      name: 'data-transmission',
      hook: function ( data ) {
        console.log(data);
      }
    }
  ])
});
