import Ember from 'ember';

export default Ember.Route.extend({
  remodal: Ember.inject.service(),

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
