import Ember from 'ember';
import bindToWindowMixin from '../mixins/bind-to-window';
import layout from '../templates/components/x-navigation';

var fillMap = {
  primary: [ 'index' ],
  dark:    [ 'employee-account' ]
};

export default Ember.Component.extend(bindToWindowMixin, {
  layout: layout,
  tagName: 'nav',
  role: 'navigation',
  classNames: [ 'navbar', 'navbar-default', 'app-header' ],
  classNameBindings: [ 'fill' ],
  attributeBindings: [ 'role' ],

  didInsertElement: function () {
    this._super.apply(this, arguments);
    this.setupWindowBindings('scroll', 20);
  },

  willDestroyElement: function () {
    this._super.apply(this, arguments);
    this.teardownWindowBindings('scroll');
  },

  fill: function () {
    var path = this.get('currentPath'),
        ret;

    if ( !path ) {
      return;
    }

    path = path.split('.')[ 0 ];

    var checkFill = function ( paths, fill ) {      
      paths.forEach(function ( route ) {
        if ( path.indexOf( route ) > -1 ) {
          ret = 'fill-' + fill;
        }
      });
    };

    for ( var key in fillMap ) {
      if ( fillMap.hasOwnProperty( key ) ) {
        checkFill( fillMap[ key ], key );
      }
    }

    return ret;
  }.property('currentPath'),

  windowDidScroll: function () {
    var elClassHidden   = 'header-hidden',
        elClassNarrow   = 'header-narrow',
        elNarrowOffset  = 50,
        $this           = this.$(),
        $window         = $( window ),
        $document       = $( document ),
        $height         = $this.height(),
        dHeight         = $document.height(),
        wHeight         = $window.height(),
        wScrollCurrent  = $window.scrollTop(),
        wScrollDiff     = this.get('windowScrollPos') - wScrollCurrent;

    $this.toggleClass( elClassNarrow, wScrollCurrent > elNarrowOffset );

    if ( wScrollCurrent <= $height ) {
      $this.removeClass( elClassHidden );
    } else if ( wScrollDiff > 0 && $this.hasClass( elClassHidden ) ) {
      $this.removeClass( elClassHidden );
    } else if ( wScrollDiff < 0 ) {
      if ( wScrollCurrent + wHeight >= dHeight && $this.hasClass( elClassHidden ) ) {
        $this.removeClass( elClassHidden );
      } else {
        $this.addClass( elClassHidden );
      }
    }

    this.set('windowScrollPos', wScrollCurrent);
  },

  actions: {
    logout: function () {
      this.sendAction('logout');
    }
  }
});
