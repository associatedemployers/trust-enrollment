import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'draggable' ],
  classNameBindings: [ 'isDragging:is-dragging' ],
  attributeBindings: [ 'draggable' ],
  draggable: true,

  dragStart: function () {
    this.set('isDragging', true);
  },

  dragEnd: function () {
    this.setProperties({
      isDragging: false
    });
  }
});
