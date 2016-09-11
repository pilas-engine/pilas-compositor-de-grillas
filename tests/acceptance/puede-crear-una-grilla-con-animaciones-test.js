import { test } from 'qunit';
import moduleForAcceptance from 'pilas-compositor-de-grillas/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | puede crear una grilla con animaciones');

test('visiting /puede-crear-una-grilla-con-animaciones', function(assert) {
  visit('/');

  andThen(function() {
    click('#start');
  });

  andThen(function() {
    assert.equal(currentURL(), '/dropImage');
  });

  andThen(function() {
    click('#simulate');
  });

  andThen(function() {
    click('#continue');
  });

  //andThen(function() {
  //  return pauseTest();
  //});
});
