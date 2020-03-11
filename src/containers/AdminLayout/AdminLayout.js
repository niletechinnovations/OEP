import React, { Component, Suspense } from 'react';
//import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import adminRoutes from '../../adminRoutes';
import './AdminLayout.css';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import '../OrganizationLayout/DashboardResponsive.css'
class AdminLayout extends Component {

  /*constructor(props) {
    super(props);
    //this.asideTogglerRef = React.createRef();
  }*/

  /*componentDidMount() {
    ReactDOM.findDOMNode(this.asideTogglerRef.current).addEventListener('click', this.handleClick.bind(this));
  }
 

  // removeEventListener
  componentWillUnmount() {
    ReactDOM.findDOMNode(this.asideTogglerRef.current).removeEventListener('click', this.handleClick.bind(this));
  }


  handleClick() {
    console.log('Click')
  }*/


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app dashboard-template">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
             <AppSidebarNav navConfig={navigation} {...this.props} router={router} ref={this.asideTogglerRef}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={adminRoutes} router={router}/>
            <Container fluid>
              <ToastContainer />
              <Suspense fallback={this.loading()}>
                <Switch>
                  {adminRoutes.map((route, idx) => {
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
                  <Redirect from="/admin" to="/admin/dashboard" />
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

export default AdminLayout;
