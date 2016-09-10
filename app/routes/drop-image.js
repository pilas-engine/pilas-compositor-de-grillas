import Ember from 'ember';

export default Ember.Route.extend({
  path: null,

  resetController(controller) {
    controller.set("hasImage", false);
  },

  actions: {
    continuar() {
      let record = this.store.createRecord('image', {
        path: this.get('path'),
        cols: 1,
        rows: 1
      });

      record.save().then(() => {
        this.transitionTo('editor.index', record);
      });
    },

    onDrop(path) {
      this.set('path', path);
      this.controller.set("hasImage", true);
    }
  }
});
