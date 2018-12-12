
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('resources', function(table) {
        table.increments();
        table.string('name');
        table.string('description');
        table.integer('type');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('resources');
  };
  