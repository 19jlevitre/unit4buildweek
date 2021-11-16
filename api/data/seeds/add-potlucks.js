
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('potlucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('potlucks').insert([
        {name: 'potluck1', host: 'doug', location: 'central park', time:'10:30', date:'9/10/21'},
        {name: 'potluck2', host: 'tim', location: 'bountiful', time:'8am', date:'10/11/12'},
        {name: 'potluck3', host: 'rick', location: 'ohio', time:'dusk', date:'12/22/11'}
      ]);
    });
};
