
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', password: 'foo'},
        {username: 'user2', password: 'bar'},
        {username: 'user3', password: 'baz'},
        {username: 'user4', password: 'foo'},
      ]);
    });
};
