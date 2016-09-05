import Ember from 'ember';

export default Ember.Controller.extend({
  hasImage: false,
  imagePath: null,

  actions: {
    onDrop(path) {
      this.set("hasImage", true);
      this.set("imagePath", path);
    }
  }
});
