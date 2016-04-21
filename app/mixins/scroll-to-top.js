import Ember from 'ember';

const { observer } = Ember;

export default Ember.Mixin.create({
  application: Ember.inject.controller(),

  _scrollToTop: observer('application.currentPath', function () {
    Ember.$('html,body').scrollTop(0);
  })
});
