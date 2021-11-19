
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        { itemName: 'carrots'},
        { itemName: 'lettuce'},
        { itemName: 'ranch'}
      ]);
    });
};
