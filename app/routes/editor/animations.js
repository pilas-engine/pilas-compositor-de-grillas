import Ember from 'ember';

export default Ember.Route.extend({
  remodal: Ember.inject.service(),

  actions: {
    showCreateAnimationModal() {
      this.controller.set('name', '');
      this.controller.set('frames', '');
      this.controller.set('speed', '');

      this.get('remodal').open('animation');
    },
    removeAnimation(animation) {
      animation.destroyRecord();
      this.currentModel.save();
    },
    createAnimation() {
      let name = this.controller.get('name');
      let frames = this.controller.get('frames');
      let speed = this.controller.get('speed');

      let record = this.store.createRecord('animation', {
        name: name,
        frames: frames,
        speed: speed,
        image: this.currentModel,
      });

      record.save().then(() => {
        this.currentModel.save();
        this.get('remodal').close('animation');
      });
    }
  }
});
