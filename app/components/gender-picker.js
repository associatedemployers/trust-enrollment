import Ember from 'ember';
import { genders as staticGenders } from '../utils/defined-data';

export default Ember.Component.extend({
  staticGenders: staticGenders,
  
  genders: function () {
    var removeOptions = this.get('removeOptions');
    var removeOption = function (genders, option) {
      return genders.filter(function (gender) {
        return option !== gender;
      });
    }
    if(this.get('removeOptions')) {
      if(typeof removeOptions === 'string') {
        return removeOption(this.get('staticGenders'), removeOptions);
      }
    } else {
      return this.get('staticGenders');
    }
  }.property('staticGenders', 'removeOptions')
});