import DS from 'ember-data';

export default DS.Model.extend({
  path: DS.attr('string'),
  cols: DS.attr('number'),
  rows: DS.attr('number')
});
