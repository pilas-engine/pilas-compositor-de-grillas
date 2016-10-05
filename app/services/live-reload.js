import Ember from 'ember';

let IN_ELECTRON = (window && window.process && window.process.type);

export default Ember.Service.extend(Ember.Evented, {

  /*
   * Permite observar un archivo y lanza un evento cuando
   * el archivo cambia
   */
  observeFilePath(path) {
    if (IN_ELECTRON) {
      let fs = requireNode('fs');

      fs.watchFile(path, {encoding: 'buffer'}, (eventType, filename) => {
        if (fs.existsSync(filename)) {
          console.log("Notificando cambio de archivo y recargando imagen.");
          this.trigger('change');
        } else {
          console.warn(`Error, el archivo observado ('${path}') cambió de nombre o se eliminó.`);
        }
      });
    }
  }
});
