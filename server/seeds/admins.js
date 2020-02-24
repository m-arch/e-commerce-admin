const bcrypt = require('bcryptjs');
const uuid = require('uuid');

async function clear(knex) {
  await knex('admin').del();
}

async function seed(knex) {
  await clear(knex);
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('pass', salt);
  await knex('admin').insert({
    id: uuid(),
    username: 'admin',
    is_active: true,
    password: hash
  });
};

module.exports = { clear, seed };
