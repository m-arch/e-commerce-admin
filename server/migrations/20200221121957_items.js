
exports.up = function(knex) {
  return knex.schema.createTable('item', function(i) {
    i.uuid('id').notNullable().primary();
    i.string('title').notNullable();
    i.boolean('is_available').default(false);
    i.integer('quantity').notNullable().default(0);
    i.integer('quantity_sold').default(0);
    i.float('cost');
    i.float('price');
  }); 
};

exports.down = function(knex) {
  
};
