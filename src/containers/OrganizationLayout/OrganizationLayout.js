import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as router from 'react-router-dom';
import { Container,  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Dropdown } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,  
  AppBreadcrumb2 as AppBreadcrumb,
  
} from '@coreui/react';
// sidebar nav config

// routes config
import organizationRoutes from '../../organizationRoutes';
import './OrganizationLayout.css';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import navigation from '../../_nav_org';
import { Link } from 'react-router-dom';
import commonService from '../../core/services/commonService';
import navigation_unsubcribe from '../../_nav_org_unsubcribe';
import './DashboardResponsive.css'
class OrganizationLayout extends Component {

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
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push('/login')
  }

  render() {
    let navigationItem = commonService.getIsSubscribe() ? navigation : navigation_unsubcribe;
    return (
      <div className="app dashboard-template">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          
          <main className="main">
            
            <Nav className="ml-auto organization-menu" navbar>
             {
            navigationItem.items.map((value, index) => <SetupMenuItem showDropDownMenu = {this.showDropDownMenu} selectedIndex = {this.state.selectedIndex} isOpenMenu = { this.state.isOpenMenu} closeSubMenuItm = {this.closeSubMenuItm} currentIndex = {index}  key = {index} menuList = {value} />)
          }
          </Nav>
            <AppBreadcrumb appRoutes={organizationRoutes} router={router}/>
            <Container fluid>
              <ToastContainer />
              <Suspense fallback={this.loading()}>
                <Switch>
                  {organizationRoutes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}                  
                  <Redirect from="/organization" to="/organization/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

function SetupMenuItem(props) {
  if(props.menuList.children) {
    return (
      <Dropdown nav isOpen={props.isOpenMenu && props.currentIndex === props.selectedIndex} toggle={ (e) =>props.showDropDownMenu(props.currentIndex)} >
          <DropdownToggle nav caret>
            <i className={props.menuList.icon}></i>&nbsp;&nbsp;{props.menuList.name}
          </DropdownToggle>
          <DropdownMenu>
            { props.menuList.children.map((submenu, menuindex) => <SetMenuItem  menuItem={submenu} /> )}
          </DropdownMenu>
        </Dropdown>)
  }
  else 
    return (<NavItem>
            <NavLink href={props.menuList.url} className="nav-link"><i className={props.menuList.icon}></i>&nbsp;&nbsp;{props.menuList.name}</NavLink>
          </NavItem>)
}

function SetMenuItem(props){
  return (<DropdownItem tag={Link} to={props.menuItem.url} className="submenu-item"> {props.menuItem.name}</DropdownItem>);
}
export default OrganizationLayout;
