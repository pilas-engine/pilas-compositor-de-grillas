import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    continuar(path) {
      let record = this.store.createRecord('image', {
        path: path,
        cols: 1,
        rows: 1
      });


      record.save().then(() => {
        this.transitionTo('editor', record);
      });

    }
  }
});
