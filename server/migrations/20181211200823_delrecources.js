
exports.up = function(knex, Promise) {
    return knex.schema.dropTable('recources');
};

exports.down = function(knex, Promise) {
  
};
