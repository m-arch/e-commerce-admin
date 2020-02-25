const admin = require('./admins.js').admin;
const admins = require('./admins.js').admins;
const login = require('./admins.js').login;
const items = require('./items.js').items;
const item = require('./items.js').item;
const newItem = require('./items.js').add;
const editItem = require('./items.js').edit;
const deleteItem = require('./items.js').deleteItem;
const stockIn = require('./items.js').stockIn;

const Mutation = {
  login,
  newItem,
  editItem,
  deleteItem,
  stockIn
}

const Query = {
  admin,
  admins,
  items,
  item
};

module.exports = { Query, Mutation} ;
