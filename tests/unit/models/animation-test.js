import { moduleForModel, test } from 'ember-qunit';

moduleForModel('animation', 'Unit | Model | animation', {
  needs: ['model:image']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
