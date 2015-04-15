import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'xd-nav' ],
  degRatio: 100,
  zTranslate: 200,

  listStyle: function () {
    var foundIndex;

    this.get('_consumedRoutes').forEach(function ( route, index ) {
      if ( route.active ) {
        foundIndex = index;
      }
    });

    var translate = 'rotateY(' + -(this.get('degRatio') / this.get('_consumedRoutes.length') * foundIndex) + 'deg)';

    return this._buildTransform(translate);
  }.property('_consumedRoutes'),

  _consumedRoutes: function () {
    var self = this,
        degRatio = this.get('degRatio');

    return Ember.copy(this.get('routes')).map(function ( route, index, array ) {
      var translate = 'rotateY(' + ((degRatio / array.length) * index) + 'deg) translateZ(' + self.get('zTranslate') + 'px)';

      Ember.setProperties(route, {
        class: 'xd-' + index,
        style: self._buildTransform(translate)
      });

      return route;
    });
  }.property('routes.[]'),

  _buildTransform: function ( translate ) {
    return [ '-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform', 'transform' ].reduce(function ( ret, prefix ) {
      return ret + prefix + ': ' + translate + ';';
    }, '');
  }
});
