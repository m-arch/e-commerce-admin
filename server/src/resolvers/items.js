const __TABLENAME__ = 'item';
const Promise = require('bluebird');
const _ = require('lodash');
const uuid = require('uuid');
const knex = require('../../core/initDB.js');

const getTable =  () => knex(__TABLENAME__);

const items = () => getTable();
const item = (_, { id }) => getTable().where('id', id).first();

const add = async (_, {title}) => {
  try{
    if(!title) {
      return Promise.resolve({error: "Title is missing"});
    }

    const newItem = await getTable().insert({id: uuid(),
                                             title: title,
                                             quantity: 0}).returning('id');
    return Promise.resolve(newItem[0]);
  }catch(err) {
    return Promise.reject(err);
  }
};

const edit = async (_, {id, title}) => {
  try{
    if(!id || !title){
      return Promise.resolve({error: "Title is missing"});
    }
    const editItem = await getTable().where('id', id)
          .update({title: title})
          .returning('id');
    return Promise.resolve(editItem[0]);
  }catch(err) {
    return Promise.reject(err);
  }
};

const stockIn = async(_, {id, cost, price, quantity}) => {
  try{
    if(!id || !cost || !price || !quantity){
      return Promise.resolve({error: "All fields are required"});
    }
    const updatedItem = await getTable().where('id', id)
          .update({cost: cost,
                   price: price,
                   quantity: knex.raw('?? + (Select quantity from item where id = ?)', [[quantity], id])})
          .returning('id');

    return Promise.resolve(updatedItem[0]);
  }catch(err) {
    return Promise.reject(err);
  }
};

const deleteItem = async(_, {id}) => {
  try{
    if(!id){
      return Promise.reject({error: "Item is missing"});
    }
    await getTable().where('id', id).delete();
    return Promise.resolve({message: "deleted"});
  }catch(err) {
    return Promise.reject(err);
  }
};

module.exports = { items, item, add , stockIn, edit, deleteItem};
