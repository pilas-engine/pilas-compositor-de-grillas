import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['currentFrame', 'onionSkin', 'zoom'],
  currentFrame: 0,
  onionSkin: false,
  totalFrames: Ember.computed('model.cols', 'model.rows', function() {
    return (this.get('model.cols') * this.get('model.rows')) - 1;
  }),
  zoom: 1,
  border: false,
  liveReload: Ember.inject.service(),
});
