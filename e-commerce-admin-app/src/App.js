/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { ApolloProvider } from 'react-apollo';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import eCommerceApp from './reducers.js';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import GeneralLayout from "layouts/General.jsx";

const httpLink = new HttpLink({ uri: 'http://localhost:3030/graphql' });
const token = localStorage.getItem('token');

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: token || null,
    }
  });

  return forward(operation);
});

const middleware = applyMiddleware(createLogger());
const client = new ApolloClient({ link: concat(authMiddleware, httpLink),
                                  cache: new InMemoryCache()});

const store = createStore(eCommerceApp, middleware);


function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route path="/admin/login" render={props => <GeneralLayout {...props}/>} />
              <Route path="/admin" render={props => <AdminLayout {...props}
                                                                 token={localStorage.getItem('token')}/>} />
              <Redirect from="/" to="/admin" />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );};

export default App;
