import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  frames: DS.attr('string'),
  speed: DS.attr('number'),
  image: DS.belongsTo('image')
});
