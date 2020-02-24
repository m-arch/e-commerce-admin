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
import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { logoutAdmin } from 'actions';

class AdminNavbarLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {redirect: false};
  }
  
  render(token) {
    if(this.state.redirect)
      return(
        <Redirect to="/admin/login"/>
      );
    else
      return (
        <div>
          <Nav pullRight>
            <NavItem eventKey={3} onClick={ () => {
                this.props.logout()
                this.setState({redirect: true});
                }
              }>
              Log out
            </NavItem>
          </Nav>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout() {
    dispatch(logoutAdmin());
  }
});

const AdminNavbarLinksWithState = connect(
  null,
  mapDispatchToProps
)(AdminNavbarLinks);

export default AdminNavbarLinksWithState;
