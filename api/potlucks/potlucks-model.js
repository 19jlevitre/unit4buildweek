const db = require('../data/db-config')
async function insertPotluck(potluck) {
    // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
    // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
    // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
    const [newPotluckObject] = await db('potlucks').insert(potluck, ['potluck_id', 'name', 'host', 'location', 'time', 'date'])
    return newPotluckObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
  }
  async function findById(id) {
    const rows = await db('potlucks as p')
    .leftJoin('users_potlucks as up', 'up.potluck_id', 'p.potluck_id')
    .leftJoin('users as u', 'u.user_id', 'up.user_id')
    .select(
        'p.potluck_id',
        'p.name',
        'p.host',
        'p.time',
        'p.date',
        'p.location',
        'u.username'
    )
        .where('p.potluck_id',id)

        let result = { users:[] }

        for (let user of rows) {
            if(!result.potluck_id) {
                result.potluck_id = user.potluck_id
                result.name = user.name
                result.host = user.host
                result.time = user.time
                result.date = user.date
                result.location = user.location
            }
            if(user.potluck_id) {
                result.users.push({
                    username: user.username
            })
            }
        }
        return result

}
async function inviteUser(potluck_id, user_id) {
    return await db('users_potlucks').insert({
        user_id,
        potluck_id
    })
    }
async function uninviteUser(potluck_id, user) {
    return await db('users_potlucks as up').delete()
    .where('up.user_id', user.user_id)
    .where("up.potluck_id", potluck_id)
}

/*
[
    {
        id
        name
        host
        time
        date
        location
        guests: [usernames]
        itemsNeeded: [items]
    }
]
*/

function findAll() {
    return db('potlucks')
}
function update(id, changes) {
    return db('potlucks')
      .where('potluck_id', id)
      .update(changes)
      .then(rows => {
        return rows;
      });
  }
module.exports = {
    insertPotluck,
    findById,
    findAll,
    update,
    inviteUser,
    uninviteUser,
}