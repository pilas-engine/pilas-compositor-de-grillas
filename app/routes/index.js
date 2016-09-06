import Ember from 'ember';

export default Ember.Route.extend({
  events: Ember.inject.service(),
  
  activate() {
    this.get("events").disableDropEvent();
  }
});
