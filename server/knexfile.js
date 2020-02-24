const config = require('./core/getConfig');
module.exports = {
  client: 'pg',
  connection: config.db
};
