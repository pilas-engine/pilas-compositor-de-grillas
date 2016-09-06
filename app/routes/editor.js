import Ember from 'ember';

export default Ember.Route.extend({
  remodal: Ember.inject.service(),

  model(params) {
    return this.store.findRecord('image', params.id);
  },

  actions: {
    save() {
      this.get('remodal').close();
      this.currentModel.save();
      return false;
    },
    open() {
      this.get('remodal').open();
    }
  }
});
