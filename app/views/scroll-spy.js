import Ember from 'ember';
import windowBinderMixin from '../mixins/window-binder';

export default Ember.View.extend(windowBinderMixin, {
  templateName: 'scroll-spy',
  classNames: [ 'scroll-spy-view', 'affix' ],

  // Bind the window events on view insertion
  didInsertElement: function () {
    this.setupWindowBindings();
  },
  // Teardown the window event bindings on view destruction
  willDestroyElement: function () {
    this.teardownWindowBindings();
  },

  windowDidScroll: function () {
    var self = this,
        $this = this.$(),
        spyOffset = $this.offset();

    this.set('controller.content', this.get('controller.content').map(function (section) {
      var $secEl = $('.enrollment-card[data-section="' + section.title + '"]'),
          secOffset = $secEl.offset(),
          // Save the following state for firing scrolledPast hook
          cache = section.active;

      section.active = (spyOffset.top + 20 > secOffset.top && spyOffset.top < ( $secEl.height() + secOffset.top )) ? true : false;

      if(section.subtitles) {
        section.subtitles.map(function (subtitle) {
          var $subEl = $secEl.find('#' + subtitle.title),
              subOffset = $subEl.offset();
          subtitle.active = (spyOffset.top > subOffset.top && spyOffset.top < ( $subEl.height() + subOffset.top )) ? true : false;
          return subtitle;
        });
      }

      if(cache && section.active) {
        self.get('controller.controllers.enrollment').set('section', section.title);
      }
      // Fire scrolledPast hook
      if(cache && !section.active && typeof section.scrolledPast === 'function') {
        section.scrolledPast.call(self.get('controller.controllers.enrollment'));
      }

      return section;
    }));
  }
});