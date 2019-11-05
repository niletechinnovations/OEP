import React from 'react';
import logo from "../../assets/mdb-react-small.png";
import { MDBNavbar,
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
  MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import commonService from '../../core/services/commonService';
import './frontEndHeader.css';

class FrontEndHeader extends React.Component {
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
    render(){
      const overlay = (
        <div
          id="sidenav-overlay"
          style={{ backgroundColor: "transparent" }}
          onClick={this.toggleCollapse("mainNavbarCollapse")}
        />
      );

      const { collapseID } = this.state;
       let  headerItem = '';
        if(commonService.getAuth()) {
          headerItem =<MDBNavItem>
            <MDBNavLink className="btn aqua-gradient active" onClick={this.closeCollapse("mainNavbarCollapse")} to="/logout">
              <strong>Logout</strong>
            </MDBNavLink>
          </MDBNavItem>


          
         }
         else {
          headerItem = <MDBNavItem>
            <MDBNavLink className="btn aqua-gradient active" onClick={this.closeCollapse("mainNavbarCollapse")} to="/login">
              <strong>Login</strong>
            </MDBNavLink>
          </MDBNavItem>
          
        }
    return (
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
                {headerItem}
                <MDBNavItem>
                  <MDBNavLink className="btn peach-gradient active" onClick={this.closeCollapse("mainNavbarCollapse")} to="/register">
                    <strong>Get started for FREE</strong>
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
          
    )};
}

export default FrontEndHeader;