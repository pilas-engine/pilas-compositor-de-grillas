import Ember from 'ember';

export default Ember.Component.extend({
  liveReload: null,
  canvasElement: null,
  imageElement: null,
  currentFrame: 0,
  cols: null,
  path: null,
  rows: null,
  onionSkin: false,
  zoom: 1,

  didInsertElement() {
    this.set('canvasElement', this.$().find("#canvasSlide")[0]);
    this.set('imageElement', this.$("img")[0]);

    window.image = this.get("imageElement");

    this.get("liveReload").observeFilePath(this.get("path"));

    this.get("liveReload").on("change", () => {
      this.reloadImage();
    });

    this.get('imageElement').onload = () => {
      this.redraw();
    };
  },

  reloadImage() {
    let random = new Date().getTime();
    let path = this.get("path");
    this.get('imageElement').src = `${path}?random=${random}`;
  },

  mustRedraw: Ember.observer('cols', 'rows', 'onionSkin', 'currentFrame', 'zoom', function() {
    this.redraw();
  }),

  redraw() {
    let cols = this.get('cols');
    let rows = this.get('rows');
    let onionSkin = this.get('onionSkin');
    let canvas = this.get('canvasElement');
    let zoom = this.get('zoom');

    if (isNaN(cols) || isNaN(rows)) {
      console.warn("Evitando dibujar porque las filas y columnas no están bien definidas.");
      return;
    }

    let currentFrame = this.get('currentFrame');
    let image = this.get('imageElement');
    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let width = image.naturalWidth;
    let height = image.naturalHeight;
    let frameWidth = width / this.get('cols');
    let frameHeight = height / this.get('rows');

    if (currentFrame > 0 && onionSkin) {
      ctx.globalAlpha = 0.5;
      ctx.drawImage(image, (currentFrame -1) * frameWidth, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
      ctx.globalAlpha = 1.0;
    }

    ctx.drawImage(image, currentFrame * frameWidth, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
    ctx.restore();
  }

});
