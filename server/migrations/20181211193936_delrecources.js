
exports.up = function(knex, Promise) {
    return knex.schema.dropTable('resources');
};

exports.down = function(knex, Promise) {
  
};
