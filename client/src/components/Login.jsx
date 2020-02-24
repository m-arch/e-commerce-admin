import React, { Component } from "react";
import gql from 'graphql-tag';
import { withRouter, Redirect } from 'react-router';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import {Card} from '../components/Card/Card.jsx';
import {FormInputs} from '../components/FormInputs/FormInputs.jsx'
import Button from '../components/CustomButton/CustomButton';

import { loginAdmin } from '../actions.js';

class AdminLoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '',
                  password: '',
                  redirect: false};
  }

  submitLogin = (values) =>{ 
    this.props.mutate({variables: values})
      .then((response) => {
        if (!response.errors || response.errors.length <= 0){
          this.props.loginDispatcher({token: response.data.login.token});
          this.setState({redirect: true});
        }else{
          this.setState({
            errors: response.data.login.errors
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleUsernameChange = (event) => {
    this.setState({username: event.target.value});
  }
  
  render() {
    if(this.state.redirect)
      return(
        <Redirect to="/admin/dashboard"/>
      );
    else
      return (
        <Card
          title="Login"
          content={
              <div>
                  <FormInputs
                      ncols = {["col-md-12"]}
                      properties = {[
                        {
                          name: "username",
                          label: "Username",
                          type: "text",
                          placeholder: "Username",
                          bsClass: "form-control",
                          onChange: this.handleUsernameChange
                        }
                      ]}
                      />
                    <FormInputs
                        ncols = {["col-md-12"]}
                        properties = {[
                          {
                            name: "password",
                            label: "Password",
                            type: "password",
                            placeholder: "Password",
                            bsClass: "form-control",
                            onChange: this.handlePasswordChange
                          }
                        ]}
                        />
                      <div className="row">
                          <div className="col-md-12">
                              <div className="pull-right">
                                  <Button
                                      bsStyle="primary"
                                      onClick ={ () => this.submitLogin(this.state) } >Login</Button>
              </div>
              </div>
              </div>
              
            </div>
}
/>
    );
  }
}

const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token,
      error
    }
  }
`;

const loginWithData = graphql(loginMutation)(withRouter(AdminLoginView));

const mapDispatchToProps = (dispatch) => ({
  loginDispatcher(token) {
    dispatch(loginAdmin(token))
  }        
});

const loginWithDataAndState = connect(
  null,
  mapDispatchToProps
)(loginWithData);

export default loginWithDataAndState;
