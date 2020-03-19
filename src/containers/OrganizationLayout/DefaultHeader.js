import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo-black.svg'
import sygnet from '../../assets/img/brand/logo-black.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const profileImage = (localStorage.getItem('profilePic') !== undefined &&  localStorage.getItem('profilePic') !== "" && localStorage.getItem('profilePic') !== null) ? localStorage.getItem('profilePic') : '../../assets/img/avatars/6.jpg';
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 88, height: 40, alt: 'Construction Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Construction Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        
        <Nav className="ml-auto" navbar>
          {/*<NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">0</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem> */}          
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={profileImage} className="img-avatar" alt="organization@abc.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem tag={Link} to="/organization/profile" className="profileDropDownLink"><i className="fa fa-user"></i> Profile</DropdownItem> 
              <DropdownItem tag={Link} to="/organization/subscription" className="profileDropDownLink"><i className="fa fa-user"></i> Subscription</DropdownItem>
              <DropdownItem tag={Link} to="/organization/change-password" className="profileDropDownLink"><i className="fa fa-lock"></i> Change Password</DropdownItem>
              <DropdownItem tag={Link} to="" className="profileDropDownLink" onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
