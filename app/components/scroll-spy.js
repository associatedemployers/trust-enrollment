import Ember from 'ember';
import bindToWindowMixin from '../mixins/bind-to-window';
import layout from '../templates/components/x-navigation';

export default Ember.Component.extend(bindToWindowMixin, {
  layout: layout,
  classNames: [ 'scroll-spy', 'affix' ],

  didInsertElement: function () {
    this._super.apply(this, arguments);
    this.setupWindowBindings('scroll', 500);
  },

  willDestroyElement: function () {
    this._super.apply(this, arguments);
    this.teardownWindowBindings('scroll');
  },

  windowDidScroll: function () {
    var self = this,
        $this = this.$(),
        spyOffset = $this.offset();

    this.set('links', this.get('links').map(function ( section ) {
      var $secEl = $('.enrollment-card[data-section="' + section.title + '"]'),
          secOffset = $secEl.offset(),
          // Save the following state for firing scrolledPast hook
          cache = section.active;

      section.active = (spyOffset.top + 20 > secOffset.top && spyOffset.top < ( $secEl.height() + secOffset.top )) ? true : false;

      if (section.subtitles) {
        section.subtitles.map(function (subtitle) {
          var $subEl = $secEl.find('#' + subtitle.title),
              subOffset = $subEl.offset();
          subtitle.active = (spyOffset.top > subOffset.top && spyOffset.top < ( $subEl.height() + subOffset.top )) ? true : false;
          return subtitle;
        });
      }

      if ( cache && section.active ) {
        self.get('for').set('section', section.title);
      }

      if (cache && !section.active) {
        $secEl.removeClass('active');
        if (typeof section.scrolledPast === 'function') {
          // Fire scrolledPast hook
          section.scrolledPast.call(self.get('for'));
        }
      }

      if (!cache && section.active) {
        $secEl.addClass('active');
      }

      return section;
    }));
  },

  actions: {
    changeActive: function ( param ) {
      this.sendAction('action', param);
    }
  }
});
