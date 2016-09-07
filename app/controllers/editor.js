import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['currentFrame'],
  currentFrame: 0,
  liveReload: Ember.inject.service(),
});
