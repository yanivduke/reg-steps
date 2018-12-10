
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('properties', function(table) {
        table.increments();
        table.integer('key');
        table.string('name');
        table.string('description');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        })
    ])
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('properties');
};
