
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('registrations', function(table) {
        table.increments();
        table.string('uniq').notNullable();
        table.string('email');
        table.string('firstname');
        table.string('lastname');
        table.string('phone');
        table.string('city');
        table.string('address');
        table.string('zipcode');
        table.timestamp('step_changed').defaultTo(knex.fn.now());
        table.integer('step').defaultTo(0);

      })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('registrations');
  };
  