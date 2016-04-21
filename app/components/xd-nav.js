import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: [ 'xd-nav' ],
  degRatio: 250,
  zTranslate: 250,

  listStyle: computed('_consumedRoutes', 'currentRoute', function () {
    let translate = 'rotateY(' +
    -(this.get('degRatio') / this.get('_consumedRoutes.length') *
    this.get('routes').indexOf(this.get('currentRoute'))) + 'deg)';

    return this._buildTransform(translate);
  }),

  _consumedRoutes: computed('routes.[]', function () {
    var self = this,
        degRatio = this.get('degRatio');

    return Ember.copy(this.get('routes')).map(function ( route, index, array ) {
      let translate = 'rotateY(' + degRatio / array.length * index + 'deg) translateZ(' + self.get('zTranslate') + 'px)';

      Ember.setProperties(route, {
        class: 'xd-' + index,
        style: self._buildTransform(translate)
      });

      return route;
    });
  }),

  _buildTransform ( translate ) {
    return [
      '-webkit-transform',
      '-moz-transform',
      '-ms-transform',
      '-o-transform',
      'transform'
    ].reduce((ret, prefix) => ret + prefix + ': ' + translate + ';', '');
  }
});
