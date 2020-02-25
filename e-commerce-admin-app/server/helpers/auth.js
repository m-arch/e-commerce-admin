const _ = require('lodash');
const moment = require('moment');
const knex = require('../core/initDB.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cfg = require ('../core/getConfig.js');
const Promise = require('bluebird');


async function authorizeUser (username, password) {
  let admin = await knex('admin').where('username', username).first();
  if(admin){
    return new Promise ((resolve,err) => {
      bcrypt.compare(password, admin.password, (err, result) => {
        if(err){
          console.log(err);
          return resolve({error: new Error(err)});
        }else{
          if(result){
            let token = jwt.sign({username: username},
                                 cfg.security.secret,
                                 { expiresIn: '12m'});
            return resolve({token: token, error: null});
          }else{
            return resolve({token: null});
          }
        }
      });
    });
  } else {
    return Promise.resolve({token: null});
  }
  return Promise.resolve({token: null});
};

module.exports = authorizeUser;
