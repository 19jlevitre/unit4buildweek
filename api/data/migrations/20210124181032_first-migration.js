exports.up = async (knex) => {
  await knex.schema
    .createTable('potlucks', (potlucks) => {
      potlucks.increments('potluck_id')
      potlucks.string('name', 200).notNullable()
      potlucks.string('location', 200).notNullable()
      potlucks.string('time', 200).notNullable()
      potlucks.string('date', 200).notNullable()
      potlucks.string('host', 200).notNullable()
      potlucks.timestamps(false, true)
    })
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('items', (items) => {
      items.increments('item_id')
      items.string('itemName', 200).notNullable()
    })
    .createTable('users_potlucks', (usersPotlucks) => {
      usersPotlucks.increments('up_id')
      usersPotlucks.integer('potluck_id')
      .unsigned()
      .references('potluck_id')
      .inTable('potlucks')
      .onDelete('RESTRICT')
      .onUpdate('RESTRICT')
      usersPotlucks.integer('user_id')
      .unsigned()
      .references('user_id')
      .inTable('users')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
    })
    .createTable('items_potlucks', (itemsPotlucks) => {
      itemsPotlucks.increments('ip_id')
      itemsPotlucks.integer('potluck_id')
      .unsigned()
      .references('potluck_id')
      .inTable('potlucks')
      itemsPotlucks.integer('item_id')
      .unsigned()
      .references('item_id')
      itemsPotlucks.boolean('beingBrought', 100).defaultTo(false)
      
      
        })
      
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('items_potlucks')
  await knex.schema.dropTableIfExists('users_potlucks')
  await knex.schema.dropTableIfExists('items')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('potlucks')
  
}
