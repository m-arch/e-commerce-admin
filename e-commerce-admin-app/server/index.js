const express = require('express');
const bodyParser = require('body-parser');
const cfg = require ('./core/getConfig.js');
const graphqlHTTP = require('express-graphql');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const passport = require('passport');
const { resolvers } = require('./src/graphql');
const session = require('express-session');
const { GraphQLLocalStrategy, buildContext } = require('graphql-passport');
const authorizeUser = require('./helpers/auth.js');
const { Strategy, ExtractJwt } = require('passport-jwt');
const path = require('path');

async function start() {
  try{
    const typeDefs = await importSchema(path.join(__dirname, './src/graphql/schema.graphql'));
    const params = {
      secretOrKey: cfg.security.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };
     // Passport
    passport.use(
      new GraphQLLocalStrategy(params, async (username, password, done) => {
        try{
          let { token, error} = await authorizeUser(username, password);
          done(error, token);
        }catch(err){
          console.log(err);
          done(err);
        }
      }));
    
    const server = new ApolloServer({ typeDefs, resolvers, context: (req, res) => buildContext(req,res)});
    const app = express();
    server.applyMiddleware({ app });
    
    app.set('config', cfg);
    app.set('passport', passport);

    app.use(express.static(path.join(__dirname, '../build')));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/', express.static('public'));

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.listen(cfg.port, () =>
               console.log('Express server is running on localhost:' + cfg.port));
  }catch(err){
    console.log(err);
  }
}

start();
