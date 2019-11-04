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

import { BrowserRouter as Router} from "react-router-dom";
import Routes from "./Routes";

class App extends Component{
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () => {
    window.scrollTo(0, 0);
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;

    return (
      <Router>
        <div className="flyout">
          <MDBNavbar color=" wedding-color" dark expand="lg" fixed="top" scrolling transparent>
          <MDBContainer>
            <MDBNavbarBrand href="/" className="py-0 font-weight-bold">
              <img alt="Logo" style={{ height: "auto", width: "3.6rem" }} src={logo}/>
              {/* <strong className="align-middle">OEP</strong> */}
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse("mainNavbarCollapse")} />
            <MDBCollapse id="mainNavbarCollapse" isOpen={this.state.collapseID} navbar >
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink exact to="/" onClick={this.closeCollapse("mainNavbarCollapse")}>
                    <strong>Home</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink onClick={this.closeCollapse("mainNavbarCollapse")} to="/form-builder" >
                    <strong>Form Builder</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink onClick={this.closeCollapse("mainNavbarCollapse")} to="/about-us" >
                    <strong>About Us</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink onClick={this.closeCollapse("mainNavbarCollapse")} to="/blog" >
                    <strong>Blog</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink onClick={this.closeCollapse("mainNavbarCollapse")} to="/contact-us" >
                    <strong>Contact Us</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="btn aqua-gradient active" onClick={this.closeCollapse("mainNavbarCollapse")} to="/login">
                    <strong>Login</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="btn peach-gradient active" onClick={this.closeCollapse("mainNavbarCollapse")} to="/register">
                    <strong>Get started for FREE</strong>
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
          {collapseID && overlay}
          <main>
            <Routes />
          </main>
          <MDBFooter color="mdb-color darken-4">
            <MDBContainer>
              <MDBRow className="d-flex align-items-center">
                <MDBCol md="7">
                  <p className="text-center text-md-left mt-2">
                  Copyright &copy; {new Date().getFullYear()} OEP - All Rights Reserved.
                  </p>
                </MDBCol>
                <MDBCol md="5">
                  <div className="text-center text-md-right">
                    <ul className="list-unstyled list-inline social-links">
                      <li className="list-inline-item">
                       <MDBBtn floating social="fb" size="sm" href="https://www.facebook.com/" target="_blank" className="pr-1" >
                        <MDBIcon fab icon="facebook"/>
                      </MDBBtn>
                      </li>
                      <li className="list-inline-item">
                        <MDBBtn floating social="tw" size="sm" href="https://www.twitter.com/" target="_blank" className="pr-1" >
                          <MDBIcon fab icon="twitter" />
                        </MDBBtn>
                      </li>
                      <li className="list-inline-item">
                        <MDBBtn floating social="li" size="sm" href="https://www.linkedin.com/" target="_blank" className="pr-1" >
                          <MDBIcon fab icon="linkedin"/>
                        </MDBBtn>
                      </li>
                      <li className="list-inline-item">
                        <MDBBtn floating social="ins" size="sm" href="https://www.instagram.com" target="_blank" className="pr-0" >
                          <MDBIcon fab icon="instagram"/>
                        </MDBBtn>
                      </li>
                    </ul>
                    </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default App;
