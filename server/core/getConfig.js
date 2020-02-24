let env = process.env.NODE_ENV || "development";
const cfg = require('../config');

module.exports = cfg[env];
