import Ember from 'ember';

export default Ember.Service.extend({
  disableDropEvent() {

    $(window).on('dragenter', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    document.body.ondrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
    };

    document.body.ondragover = function(e) {
      e.preventDefault();
      e.stopPropagation();
    };
  }
});
