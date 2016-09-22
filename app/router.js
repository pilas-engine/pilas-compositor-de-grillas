import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dropImage');
  this.route('editor', {path: '/editor/:id'}, function() {
    this.route('index', {path: 'index'});
    this.route('animations', {path: 'animations'}, function() {
      this.route('show', {path: ':animation'});
    });
  });
});

export default Router;
