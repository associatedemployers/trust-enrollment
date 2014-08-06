import Ember from 'ember';
import { dependent_relationships as staticRelationships } from '../utils/defined-data';

export default Ember.Component.extend({
  staticRelationships: staticRelationships,
  
  relationships: function () {
    var removeOptions = this.get('removeOptions'),
        relarr = this.get('staticRelationships');

    var removeOption = function (relationships, option, arr) {
      return relationships.filter(function (relationship) {
        return (arr) ? option.indexOf(relationship) < 0 : option !== relationship;
      });
    };
    
    if(removeOptions) {
      if(typeof removeOptions === 'string') {
        return removeOption(relarr, removeOptions);
      } else if(typeof removeOptions === 'object' && removeOptions.length) {
        return removeOption(relarr, removeOptions, true);
      }
    } else {
      return this.get('staticRelationships');
    }
  }.property('staticRelationships', 'removeOptions')
});