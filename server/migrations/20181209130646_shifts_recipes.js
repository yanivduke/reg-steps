
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('shifts_recipes', function(table) {
      table.increments();
      table.integer('shift');
      table.integer('recipe');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shifts_recipes');
};
  