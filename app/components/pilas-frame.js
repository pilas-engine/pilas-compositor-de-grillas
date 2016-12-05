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

  mustRedraw: Ember.observer('cols', 'rows', 'border', 'grid', 'onionSkin', 'currentFrame', 'zoom', function() {
    this.redraw();
  }),

  redraw() {
    let cols = this.get('cols');
    let rows = this.get('rows');
    let onionSkin = this.get('onionSkin');
    let canvas = this.get('canvasElement');
    let zoom = this.get('zoom');
    let border = this.get('border');
    let grid = this.get('grid');

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

    ctx.imageSmoothingEnabled = false;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-frameWidth / 2, -frameHeight / 2);

    let dx = Math.floor(currentFrame % cols);
    let dy = Math.floor(currentFrame / cols);


    if (currentFrame > 0 && onionSkin) {
      let dx_anterior = Math.floor((currentFrame - 1) % cols);
      let dy_anterior = Math.floor((currentFrame - 1) / cols);

      ctx.globalAlpha = 0.5;
      ctx.drawImage(image,
                    dx_anterior * frameWidth,     // source x
                    dy_anterior * frameHeight,    // source y

                    frameWidth,          // source width
                    frameHeight,         // source height

                    0, 0,                // dest x, y
                    frameWidth,          // dest width
                    frameHeight);        // dest height

      ctx.globalAlpha = 1.0;
    }

    if (border) {
      this._draw_border(ctx, frameWidth, frameHeight);
    }

    if (grid) {
      this._draw_grid(ctx, frameWidth, frameHeight);
    }


    ctx.drawImage(image,
                  dx * frameWidth,     // source x
                  dy * frameHeight,    // source y

                  frameWidth,          // source width
                  frameHeight,         // source height

                  0, 0,                // dest x, y
                  frameWidth,          // dest width
                  frameHeight);        // dest height

    ctx.restore();
  },

  _draw_border(ctx, frameWidth, frameHeight) {
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "red";
    ctx.rect(0, 0, frameWidth, frameHeight);
    ctx.stroke();
  },

  _draw_grid(ctx, frameWidth, frameHeight) {
    const gridSize = 10;

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';

    for (let i=0; i<=frameWidth; i += gridSize) {
      this._dibujarLinea(ctx, 0, i, frameWidth, i);
      this._dibujarLinea(ctx, i, 0, i, frameHeight);
    }

  },

  _dibujarLinea(ctx, x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }

});
