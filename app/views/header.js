import Ember from 'ember';

var fillMap = {
  primary: [ 'index' ],
  dark:    [ 'employee-account' ]
};

export default Ember.View.extend({
  tagName: 'nav',
  templateName: 'header',
  classNameBindings: [ ':app-header', 'fill' ],

  fill: function () {
    var path = this.get('controller.parentController.currentPath'),
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
  }.property('controller.parentController.currentPath')
});
