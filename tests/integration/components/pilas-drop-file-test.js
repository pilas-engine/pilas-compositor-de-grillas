import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-drop-file', 'Integration | Component | pilas drop file', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pilas-drop-file}}`);

  assert.equal(this.$().text().trim(), 'Por favor, arrastrá y soltá una imagen sobre este cuadro para comenzar.');

});
