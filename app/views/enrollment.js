import Ember from 'ember';

export default Ember.View.extend({
  classNames: [ 'enrollment-view' ],
  didInsertElement: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      var e       = this.get('controller'),
          section = e.get('section');
      if(section) {
        e.send('changeActive', section);
      }
    });
  }
});