import React, { Component } from "react";
import { 
  MDBNavbar,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon
} from "mdbreact";

//import { ReactComponent as Logo } from "./assets/logo.png";
import logo from "./assets/logo.png";
import commonService from './core/services/commonService';
import { BrowserRouter as Router} from "react-router-dom";

import Routes from "./Routes";

class App extends Component{
  state = {
    collapseID: ""
  };
  

  render() {
    
    return (
      <Router>
          <Routes />
      </Router>
    );
  }
}

export default App;
