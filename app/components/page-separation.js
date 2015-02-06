import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: [ 'large-page-separation' ],
  attributeBindings: [ 'href' ],
  href: '#',

  animationTime: 1000,

  click: function ( ev ) {
    ev.preventDefault();

    var $height = this.$().height(),
        $pos    = this.$().offset().top + $height;

    $('html, body').animate({
      scrollTop: $pos - 30 // 30 is <header height> - <margin of page-sep>
    }, this.get('animationTime'));
  }
});
