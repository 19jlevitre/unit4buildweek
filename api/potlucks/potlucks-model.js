const db = require('../data/db-config')
async function insertPotluck(potluck) {
    // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
    // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
    // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
    const [newPotluckObject] = await db('potlucks').insert(potluck, ['potluck_id', 'name', 'location', 'time', 'date'])
    return newPotluckObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
  }
  function findBy(filter) {
    return db('p')
        .where(filter)
}
function findAll() {
    return db('potlucks')
}
module.exports = {
    insertPotluck,
    findBy,
    findAll
}