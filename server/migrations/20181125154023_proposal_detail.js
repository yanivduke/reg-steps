
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('proposal', function(table) {
        table.increments();
        table.string('regid').notNullable();
        table.string('manufacturer');
        table.integer('year');
        table.string('price');
        table.string('model');
        table.integer('driversnum').defaultTo(1);
        table.integer('youngerdriverage').defaultTo(18);

      })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('proposal');
  };
  