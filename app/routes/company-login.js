import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel () {
    var user = this.session.get('currentUser');

    if ( user ) {
      return this.transitionTo(this.session.get('content.type') + '-account');
    }
  }
});
