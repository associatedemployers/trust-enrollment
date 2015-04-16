import Ember from 'ember';

export default Ember.Mixin.create({
  needs: [ 'enrollment' ],

  __bubbleValidity: function () {
    var namespace = this.get('validityNamespace');
    Ember.assert('Enrollment Validity Mixin requires "validityNamespace" to bubble validity status.', !!namespace);

    var parentController = this.get('controllers.enrollment'),
        route = parentController.get('routes').findBy('link', namespace),
        isValid = this.get('isValid');

    Ember.set(route, 'isValid', isValid);

    if ( route.active ) {
      parentController.set('currentRoute.isValid', isValid);
    }
  }.observes('isValid').on('init')
});
