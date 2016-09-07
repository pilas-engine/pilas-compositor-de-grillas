import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {

  /*
   * Permite observar un archivo y lanza un evento cuando
   * el archivo cambia
   */
  observeFilePath(path) {
    let fs = requireNode('fs');

    fs.watch(path, {encoding: 'buffer'}, (eventType, filename) => {
      if (filename) {
        this.trigger('change');
      }
    });
  }
});
