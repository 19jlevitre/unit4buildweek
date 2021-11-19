const db = require('../data/db-config')
async function insertPotluck(potluck) {
    const [newPotluckObject] = await db('potlucks').insert(potluck, ['potluck_id', 'name', 'host', 'location', 'time', 'date'])
    return newPotluckObject
}
async function findById(id) {
    const rows = await db('potlucks as p')
        .leftJoin('items_potlucks as ip', 'p.potluck_id', 'ip.potluck_id')
        .leftJoin('users_potlucks as up', 'p.potluck_id', 'up.potluck_id')
        .join('users as u', 'u.user_id', 'up.user_id')
        .join('items as i', 'ip.item_id', 'i.item_id')
        .select(
            'p.potluck_id',
            'p.name',
            'p.host',
            'p.time',
            'p.date',
            'p.location',
            'u.user_id',
            'u.username',
            'i.itemName',
            'i.item_id',
            'ip.beingBrought'
        )
        .where('p.potluck_id', id)

    let result = { users: [], items: [] }

    for (let row of rows) {
        if (!result.potluck_id) {
            result.potluck_id = row.potluck_id
            result.name = row.name
            result.host = row.host
            result.time = row.time
            result.date = row.date
            result.location = row.location
        }
        if (row.potluck_id) {
            if (result.users.findIndex(ruser => ruser.user_id === row.user_id)<0) {
                result.users.push({
                    user_id: row.user_id,
                    username: row.username
                })
            }
            if (result.items.findIndex(ritem => ritem.item_id === row.item_id)<0) {
                result.items.push({
                    item_id: row.item_id,
                    beingBrought: row.beingBrought,
                    name: row.itemName
                })
            }
        }

    }

    return result

}
async function findyByUserId(potluck_id, user_id) {
    return await db('users_potlucks as up')
    .where('up.user_id', user_id).where('up.potluck_id', potluck_id)
}
async function inviteUser(potluck_id, user_id) {
    return await db('users_potlucks').insert({
        user_id,
        potluck_id
    })
}
async function findItemPotluck(potluck_id, item_id) {
    return await db('items_potlucks as ip')
    .where('ip.potluck_id', potluck_id)
    .where('ip.item_id', item_id)
}
async function uninviteUser(potluck_id, user) {
    return await db('users_potlucks as up').delete()
        .where('up.user_id', user.user_id)
        .where("up.potluck_id", potluck_id)
}
async function createItem(item) {
    const [newItemObject] = await db('items').insert(item, ['item_id', 'itemName'])
    return newItemObject 
}
async function addItemToPotluck(potluck_id, item_id) {
    return await db('items_potlucks').insert({potluck_id, item_id})
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
    addItemToPotluck,
    createItem,
    findyByUserId,
    findItemPotluck
}