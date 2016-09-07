import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['currentFrame', 'onionSkin', 'zoom'],
  currentFrame: 0,
  onionSkin: false,
  zoom: 1,
  liveReload: Ember.inject.service(),
});
