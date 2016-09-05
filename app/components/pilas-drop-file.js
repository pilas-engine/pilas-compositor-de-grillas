import Ember from 'ember';

export default Ember.Component.extend({
  filePath: null,
  onHover: false,

  didInsertElement() {
    this.set('filePath', this.get('imagePath'));

    document.ondragover = document.ondrop = (ev) => {
      ev.preventDefault();
      this.set("onHover", true);
    };

    document.ondragleave	 = () => {
      this.set("onHover", false);
    };

    document.body.ondrop = (ev) => {
      this.set("onHover", false);
      let path = ev.dataTransfer.files[0].path;
      this.set("filePath", path);
      this.sendAction("onDrop", path);

      ev.preventDefault();
    };
  }
});
