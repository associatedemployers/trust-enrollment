import Ember from 'ember';

export default Ember.Mixin.create({
  needs: [ 'enrollment' ],
  validityKey: 'isValid',

  __setupObserver: function () {
    Ember.addObserver(this, this.get('validityKey'), this.__bubbleValidity);
  }.on('init'),

  __removeObserver: function () {
    Ember.removeObserver(this, this.get('validityKey'), this.__bubbleValidity);
  }.on('willDestroy'),

  __bubbleValidity: function () {
    var namespace = this.get('validityNamespace');
    Ember.assert('Enrollment Validity Mixin requires "validityNamespace" to bubble validity status.', !!namespace);

    var parentController = this.get('controllers.enrollment'),
        route = parentController.get('routes').findBy('link', namespace),
        isValid = !!this.get(this.get('validityKey'));

    Ember.set(route, 'isValid', isValid);

    if ( route.active ) {
      parentController.set('currentRoute.isValid', isValid);
    }
  }.observes('isValid').on('init')
});
