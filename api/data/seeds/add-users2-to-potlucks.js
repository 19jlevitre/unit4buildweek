exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_potlucks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users_potlucks').insert([
        {user_id: 1, potluck_id: 1},
        {user_id: 2, potluck_id: 2},
        {user_id: 3, potluck_id: 3},
        {user_id: 4, potluck_id: 1},
      ]);
    });
};
