
exports.up = function(knex, Promise) {
    return Promise.all([knex.schema.dropTable('resources_properties'),
        knex.schema.createTable('resources_properties', function(table) {
        table.increments();
        table.integer('resource');
        table.integer('property');
        table.integer('value');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('resources_properties');
  };
  