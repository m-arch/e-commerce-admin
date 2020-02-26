const __TABLENAME__ = 'admin';
const Promise = require('bluebird');
const _ = require('lodash');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const knex = require('../../core/initDB.js');
const authenticateUser = require('../../helpers/auth.js');

const getTable =  () => knex(__TABLENAME__);

const admins = () => getTable();
const admin = (_, { id }) => getTable().where('id', id).first();

const login = async (_, {username, password}, context) => {
  try{
    if(!username || !password){
      return Promise.resolve({error: new Error("User not found!")});
    }
    return new Promise ((resolve, err) => {
      context.authenticate('graphql-local', { username, password }).then((result) => {
        if(result.user)
          return resolve({token: result.user});
        else
          return resolve({error: new Error("User not found!")});
      });
    });
  }catch(err) {
    return Promise.resolve({error: err});
  }
};

module.exports = { admins, admin, login};
