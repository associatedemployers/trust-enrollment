import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  type:  attribute('string', { defaultValue: 'Home' }),
  value: attribute('string'),
  ext:   attribute('string'),

  formatted: function () {
    var d   = this.getProperties('value', 'ext'),
        ret = ( d.value ) ? d.value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : d.value;

    if ( d.ext ) {
      ret += ' EXT ' + d.ext;
    }
    console.log(ret);
    return ret;
  }.property('value', 'ext')
});
