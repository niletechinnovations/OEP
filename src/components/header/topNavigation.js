import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { Redirect } from 'react-router';
class TopNavigation extends Component {
    constructor(props){
        super(props);
        this.state = {
          collapse: false,
          isLoggedOut: false
        } 
        
    }
    

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    logoutUser() {
        localStorage.clear();
        this.setState({isLoggedOut:true});
    }
    render() {
        if(this.state.isLoggedOut) 
            return (<Redirect to="/login" />);
        else 
            return (
                <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                    <MDBNavbarBrand href="/">
                        <strong>Admin Dashboard</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick = { this.onClick } />
                    <MDBCollapse isOpen = { this.state.collapse } navbar>
                        
                        <MDBNavbarNav right>
                            
                            <MDBNavItem>
                                <a className="border border-light rounded mr-1 nav-link Ripple-parent" rel="noopener noreferrer" href="/admin/dashboard"><MDBIcon fab icon="user" className="mr-2"/>Admin</a>
                            </MDBNavItem>
                            <MDBNavItem>
                                <a className="border border-light rounded mr-1 nav-link Ripple-parent" rel="noopener noreferrer"  onClick={() => 
              this.logoutUser()} ><MDBIcon fab icon="power" className="mr-2"/>Logout</a>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            );
    }
}

export default TopNavigation;