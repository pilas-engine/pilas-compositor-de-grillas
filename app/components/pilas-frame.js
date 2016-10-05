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

    if (this.get("liveReload")) {
      this.get("liveReload").observeFilePath(this.get("path"));

      this.get("liveReload").on("change", () => {
        this.reloadImage();
      });
    }

    this.get('imageElement').onload = () => {
      this.redraw();
    };
  },

  reloadImage() {
    let random = new Date().getTime();
    let path = this.get("path");
    this.get('imageElement').src = `${path}?random=${random}`;
  },

  mustRedraw: Ember.observer('cols', 'rows', 'border', 'onionSkin', 'currentFrame', 'zoom', function() {
    this.redraw();
  }),

  redraw() {
    let cols = this.get('cols');
    let rows = this.get('rows');
    let onionSkin = this.get('onionSkin');
    let canvas = this.get('canvasElement');
    let zoom = this.get('zoom');
    let border = this.get('border');

    if (isNaN(cols) || isNaN(rows)) {
      console.warn("Evitando dibujar porque las filas y columnas no están bien definidas.");
      return;
    }

    let currentFrame = this.get('currentFrame');
    let image = this.get('imageElement');
    let ctx = canvas.getContext("2d");

    let width = image.naturalWidth;
    let height = image.naturalHeight;
    let frameWidth = width / this.get('cols');
    let frameHeight = height / this.get('rows');

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-frameWidth / 2, -frameHeight / 2);


    if (currentFrame > 0 && onionSkin) {
      ctx.globalAlpha = 0.5;
      ctx.drawImage(image, (currentFrame -1) * frameWidth, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
      ctx.globalAlpha = 1.0;
    }

    if (border) {
      this._draw_border(ctx, frameWidth, frameHeight);
    }

    let dx = Math.floor(currentFrame % rows);
    let dy = Math.floor(currentFrame / rows);

    ctx.drawImage(image, dx * frameWidth, dy * frameHeight, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

    ctx.restore();
  },

  _draw_border(ctx, frameWidth, frameHeight) {
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    ctx.rect(0, 0, frameWidth, frameHeight);
    ctx.stroke();
  }

});
