import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pilas-frame', 'Integration | Component | pilas frame', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pilas-frame}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pilas-frame}}
      template block text
    {{/pilas-frame}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
