import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Dropdown } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo-black.svg'
import sygnet from '../../assets/img/brand/logo-black.svg'
import navigation from '../../_nav_org';
import navigation_unsubcribe from '../../_nav_org_unsubcribe';
import commonService from '../../core/services/commonService';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props){
    super(props);
    this.state = {      
      isOpenMenu: false,
      selectedIndex : -1,

    }     
    this.showDropDownMenu = this.showDropDownMenu.bind(this);
    this.closeSubMenuItm = this.closeSubMenuItm.bind(this);
  }

  showDropDownMenu = (currentIndex) => {    
    if(currentIndex === this.state.selectedIndex)
      this.setState({isOpenMenu: !this.state.isOpenMenu, selectedIndex: currentIndex});
    else
      this.setState({isOpenMenu: true, selectedIndex: currentIndex});
  }
  closeSubMenuItm(){

  }
  render() {
    let navigationItem = commonService.getIsSubscribe() ? navigation : navigation_unsubcribe;
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
        

        
        <Nav className="ml-auto" navbar>
          {
            navigationItem.items.map((value, index) => <SetupMenuItem showDropDownMenu = {this.showDropDownMenu} selectedIndex = {this.state.selectedIndex} isOpenMenu = { this.state.isOpenMenu} closeSubMenuItm = {this.closeSubMenuItm} currentIndex = {index}  key = {index} menuList = {value} />)
          }
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

function SetupMenuItem(props) {
  if(props.menuList.children) {
    return (
      <Dropdown nav isOpen={props.isOpenMenu && props.currentIndex === props.selectedIndex} toggle={ (e) =>props.showDropDownMenu(props.currentIndex)} >
          <DropdownToggle nav caret>
            <i className={props.menuList.icon}></i>{props.menuList.name}
          </DropdownToggle>
          <DropdownMenu>
            { props.menuList.children.map((submenu, menuindex) => <SetMenuItem  menuItem={submenu} /> )}
          </DropdownMenu>
        </Dropdown>)
  }
  else 
    return (<NavItem>
            <NavLink href={props.menuList.url} className="nav-link"><i className={props.menuList.icon}></i>{props.menuList.name}</NavLink>
          </NavItem>)
}

function SetMenuItem(props){
  return (<DropdownItem tag={Link} to={props.menuItem.url} className="submenu-item"> {props.menuItem.name}</DropdownItem>);
}

export default DefaultHeader;
