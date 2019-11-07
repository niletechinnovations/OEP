import React, { Component } from 'react';
import { MDBNavbar, 
    MDBNavbarBrand, 
    MDBNavbarNav, 
    MDBNavbarToggler, 
    MDBCollapse, 
    MDBNavItem, 
    MDBNavLink,
    MDBIcon, 
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBDropdownMenu
} from 'mdbreact';
import { Redirect } from 'react-router';
class TopNavigation extends Component {
    constructor(props){
        super(props);
        this.state = {
          collapse: false,
          isLoggedOut: false,
          userName: ""
        } 
        
    }
    componentDidMount() { 
        const userName = localStorage.getItem("userName"); 
        this.setState({userName: userName});
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
                    <MDBNavbarBrand href="/organization/dashboard">
                        <strong>{this.state.userName}</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick = { this.onClick } />
                    <MDBCollapse isOpen = { this.state.collapse } navbar>
                        
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBDropdown dropleft>
                                    <MDBDropdownToggle nav caret>
                                      {this.state.userName}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu basic>
                                      <MDBDropdownItem><MDBNavLink to="/organization/profile"><MDBIcon icon="user" className="mr-2"/>Profile</MDBNavLink></MDBDropdownItem>
                                      <MDBDropdownItem><MDBNavLink to="/organization/change-password"><MDBIcon icon="key" className="mr-2"/>Change Password</MDBNavLink></MDBDropdownItem>
                                      <MDBDropdownItem onClick={() => this.logoutUser()}><MDBNavLink to="#!"><MDBIcon icon="power-off" className="mr-2"/>Logout</MDBNavLink></MDBDropdownItem>
                                    </MDBDropdownMenu>
                                  </MDBDropdown>
                            </MDBNavItem>                           
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            );
    }
}

export default TopNavigation;