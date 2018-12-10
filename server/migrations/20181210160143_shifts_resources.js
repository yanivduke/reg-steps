
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('shifts_resources', function(table) {
        table.increments();
        table.integer('shift');
        table.integer('resource');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        })
    ])
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shifts_resources');
};