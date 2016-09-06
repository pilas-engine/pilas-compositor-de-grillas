import Ember from 'ember';

export default Ember.Component.extend({
  canvasElement: null,
  imageElement: null,
  currentFrame: 0,
  cols: null,
  rows: null,

  didInsertElement() {
    this.set('canvasElement', this.$("canvas")[0]);
    this.set('imageElement', this.$("img")[0]);

    this.get('imageElement').onload = () => {
      this.redraw();
    };
  },

  mustRedraw: Ember.observer('cols', 'rows', 'currentFrame', function() {
    this.redraw();
  }),

  redraw() {
    let cols = this.get('cols');
    let rows = this.get('rows');
    let canvas = this.get('canvasElement');

    if (isNaN(cols) || isNaN(rows)) {
      console.warn("Evitando dibujar porque las filas y columnas no están bien definidas.");
      return;
    }

    let currentFrame = this.get('currentFrame');
    let image = this.get('imageElement');
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let width = image.naturalWidth;
    let height = image.naturalHeight;
    let frameWidth = width / this.get('cols');
    let frameHeight = height / this.get('rows');

    ctx.drawImage(image, currentFrame * frameWidth, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
  }

});