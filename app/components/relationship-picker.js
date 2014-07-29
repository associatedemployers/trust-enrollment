import Ember from 'ember';

import { dependent_relationships as staticRelationships } from '../utils/defined-data';

export default Ember.Component.extend({
  staticRelationships: staticRelationships,
  
  relationships: function () {
    var removeOptions = this.get('removeOptions');
    var removeOption = function (relationships, option) {
      return relationships.filter(function (relationship) {
        return option !== relationship;
      });
    }
    if(this.get('removeOptions')) {
      if(typeof removeOptions === 'string') {
        return removeOption(this.get('staticRelationships'), removeOptions);
      }
    } else {
      return this.get('staticRelationships');
    }
  }.property('staticRelationships', 'removeOptions')
});