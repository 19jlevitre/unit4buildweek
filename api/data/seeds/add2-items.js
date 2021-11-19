
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items_potlucks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('items_potlucks').insert([
        {potluck_id: 1, item_id: 1},
        {potluck_id: 2, item_id: 2},
        {potluck_id: 3, item_id: 3},
        {potluck_id: 1, item_id: 2},
      ]);
    });
};
