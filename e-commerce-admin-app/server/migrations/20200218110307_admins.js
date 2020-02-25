
exports.up = function(knex) {
  return knex.schema.createTable('admin', function(user) {
    user.uuid('id').notNullable().primary();
    user.string('username').notNullable();
    user.boolean('is_active');
    user.string('password').notNullable();
    user.unique('username');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin'); 
};
