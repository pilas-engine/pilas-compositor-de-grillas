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

      fs.watch(path, {encoding: 'buffer'}, (eventType, filename) => {
        if (filename) {
          this.trigger('change');
        }
      });
    }
  }
});
