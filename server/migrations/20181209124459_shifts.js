
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('shifts', function(table) {
      table.increments();
      table.string('name');
      table.string('description');
      table.datetime('start_time');
      table.datetime('end_time');
      table.integer('status');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shifts');
};
