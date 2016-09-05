import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dropImage');
  this.route('editor', {path: 'editor/:id'});
});

export default Router;
