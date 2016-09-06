import Ember from 'ember';

export default Ember.Component.extend({
  filePath: null,
  onHover: false,
  events: Ember.inject.service(),

  fileName: Ember.computed('filePath', function() {
    return this.get('filePath').split('/').pop();
  }),

  didInsertElement() {
    this.get("events").disableDropEvent();

    $('.container').bind('dragover', () => {
      this.set("onHover", true);
    });

    $('.container').bind('dragleave', () => {
      this.set("onHover", false);
    });

    $('.container').bind('drop', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      let path = ev.dataTransfer.files[0].path;

      this.set("onHover", false);
      this.set("filePath", path);
      this.sendAction("onDrop", path);
    });
  },

  willDestroyElement() {
    $('.container').off('dragover');
    $('.container').off('dragleave');
    $('.container').off('drop');

    this.get("events").disableDropEvent();
  }

});
