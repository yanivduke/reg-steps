
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('recipes_rules', function(table) {
      table.increments();
      table.integer('recipe');
      table.integer('property');
      table.integer('method');
      table.integer('value');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes_rules');
};
