exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('potlucks', (potlucks) => {
      potlucks.increments('potluck_id')
      potlucks.string('name', 200).notNullable()
      potlucks.string('location', 200).notNullable()
      potlucks.string('time', 200).notNullable()
      potlucks.string('date', 200).notNullable()
      potlucks.timestamps(false, true)
    })
    .createTable('items', (items) => {
      items.increments('item_id')
      items.string('name', 200).notNullable()
      
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('items')
  await knex.schema.dropTableIfExists('potlucks')
  await knex.schema.dropTableIfExists('users')
}
