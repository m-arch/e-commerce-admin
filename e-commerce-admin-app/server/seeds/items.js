const uuid = require('uuid');

async function clear(knex) {
  await knex('item').del();
}

async function seed(knex) {
  await clear(knex);
  await knex('item').insert([
    {
      id: uuid(),
      title: "Rice juice",
      is_available: true,
      quantity: 2,
      quantity_sold: 1,
      cost: 1,
      price: 1.5
    },
    {
      id: uuid(),
      title: "Mango shake",
    }]);
};

module.exports = { clear, seed };
