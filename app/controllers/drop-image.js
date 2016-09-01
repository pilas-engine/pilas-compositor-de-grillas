import Ember from 'ember';

export default Ember.Controller.extend({
  hasImage: false,
  imagePath: null,
  queryParams: ['imagePath'],

  actions: {
    onDrop(path) {
      this.set("hasImage", true);
      this.set("imagePath", path);
    }
  }
});
