import Ember from 'ember';

export default Ember.Mixin.create({
  needs: [ 'application' ],

  _shouldScrollToTop: function () {
    $('html,body').scrollTop(0);
  }.observes('controllers.application.currentPath')
});
