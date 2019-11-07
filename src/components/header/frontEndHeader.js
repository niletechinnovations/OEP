import React from 'react';
import logo from "../../assets/logo.png";
import { MDBNavbar,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBContainer} from 'mdbreact';

import commonService from '../../core/services/commonService';
import './frontEndHeader.css';

class FrontEndHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          collapseID: false,
          isLoggedOut: false
        } 
        
    }

    toggleCollapse = collapseID => () =>
      this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

    closeCollapse = collapseID => () => {
      window.scrollTo(0, 0);
      this.state.collapseID === collapseID && this.setState({ collapseID: "" });
    };
    logoutUser() {
        localStorage.clear();
        this.setState({isLoggedOut:true});
    };

    render(){
      

      //const { collapseID } = this.state;
       let  headerItem = '';
        if(commonService.getAuth()) {
          headerItem =<MDBNavItem>
            <MDBNavLink className="btn-gr" to= "/" onClick={() => this.logoutUser()}>
              Logout
            </MDBNavLink>
          </MDBNavItem>
         }
         else {
          headerItem = <>
                <MDBNavItem>
                  <MDBNavLink className="btn-gr" onClick={this.closeCollapse("mainNavbarCollapse")} to="/login">
                    Login
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="btn-Get" onClick={this.closeCollapse("mainNavbarCollapse")} to="/register">
                    Get started for FREE
                  </MDBNavLink>
                </MDBNavItem>
              </>
          
        }    
    return (
        <MDBNavbar color="white-color" bg="light" expand="lg" fixed="top" scrolling >
          <MDBContainer>
            <MDBNavbarBrand href="/" className="py-0 font-weight-bold">
              <img alt="Logo" style={{ height: "auto", width: "3.6rem" }} src={logo}/>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse("mainNavbarCollapse")} />
            <MDBCollapse id="mainNavbarCollapse" isOpen={this.state.collapseID} navbar >
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink exact to="/" onClick={this.closeCollapse("mainNavbarCollapse")}>
                    Home
                  </MDBNavLink>
                </MDBNavItem>
                {/* <MDBNavItem>
                  <MDBNavLink onClick={this.closeCollapse("mainNavbarCollapse")} to="/form-builder" >
                    Form Builder
                  </MDBNavLink>
                </MDBNavItem> */}
                <MDBNavItem>
                  <MDBNavLink onClick={this.closeCollapse("mainNavbarCollapse")} to="/about-us" >
                    About Us
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink onClick={this.closeCollapse("mainNavbarCollapse")} to="/blog" >
                    Blog
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink onClick={this.closeCollapse("mainNavbarCollapse")} to="/contact-us" >
                    Contact Us
                  </MDBNavLink>
                </MDBNavItem>
                {headerItem}
                
              </MDBNavbarNav>
            </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
          
    )};
}

export default FrontEndHeader;