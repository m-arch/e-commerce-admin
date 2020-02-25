import React, { Component } from "react";

import Login from "../components/Login.jsx";

class AdminView extends Component { 
  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <Login/>
      </div>
    );
  }
}

export default AdminView;
