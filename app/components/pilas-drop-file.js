import Ember from 'ember';

export default Ember.Component.extend({
  filePath: null,

  didInsertElement() {
    document.ondragover = document.ondrop = (ev) => {
      ev.preventDefault()
    };

    document.body.ondrop = (ev) => {
      let path = ev.dataTransfer.files[0].path;
      this.set("filePath", path);
      this.sendAction("onDrop", path);

      ev.preventDefault();
    }
  }
});
