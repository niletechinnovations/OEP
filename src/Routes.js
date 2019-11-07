import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import registerPage from "./pages/RegisterPage";
import FrontEndHeader from './components/header/frontEndHeader';
import FrontEndFooter from './components/header/frontEndFooter';
/*Common Service*/
import commonService from './core/services/commonService';
/*Admin Dashboard Section */
import adminDashboard from "./components/admin/dashboard/dashboard";
import organizationLists from "./components/admin/organization/organizationLists";
import categoryLists from "./components/admin/category/categoryLists";
import adminChangePassword from "./components/admin/change-password/change-password";
import adminAgents from "./components/admin/agent/agentLists";
import templateBuilder from "./pages/TemplateBuilderPage";
import TopNavigation from './components/header/topNavigation';
/* Organization Section */
import OrganizationTopNavigation from './components/header/organizationTopNavigation';
import organizationDashboard from "./components/organization/dashboard/dashboard";
import organizationProfile from "./components/organization/profile/profile";
import organizationChangePassword from "./components/organization/change-password/change-password";

class Routes extends React.Component{

    render() {
        /*Front End Layout*/
        const FrontEndLayout = ({ children }) => (
          <div>
            <div className="flyout">
              <FrontEndHeader />
              <main>                
                  {children}
              </main>
                <FrontEndFooter />
            </div>
          </div>
        );
        /*Admin Dashboard Layout*/
        const AdminDashboardLayout = ({ children }) => (
          <div>
            <div className="flyout">
                <TopNavigation />
              <main>
                  {children} 
              </main> 
            </div>          
          </div>
        );

        /*Organization Dashboard Layout*/
        const OrganizationDashboardLayout = ({ children }) => (
          <div>
            <div className="flyout">
                <OrganizationTopNavigation />
              <main>
                  {children} 
              </main> 
            </div>          
          </div>
        );
        return (
            <Switch>
              <Route exact path={["/about-us", "/login", "/register", "/reset-password/:token", "/"]}>
                <FrontEndLayout>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/about-us" component={AboutPage} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/register" component={registerPage} />
                  <Route exact path="/reset-password/:token" component={ResetPassword} />
                </FrontEndLayout>
              </Route>
              <Route exact path={["/admin/dashboard", "/admin/agents", "/form-builder",
               "/admin/organization","/admin/category", "/admin/change-password"]}>
                <AdminDashboardLayout>
                  <PrivateRoute exact path="/admin/dashboard" component={adminDashboard} />
                  <PrivateRoute exact path="/admin/organization" component={organizationLists} />
                  <PrivateRoute exact path="/admin/category" component={categoryLists} />
                  <PrivateRoute exact path="/admin/agents" component={adminAgents} />
                  <Route exact path="/form-builder" component={templateBuilder} />
                  <PrivateRoute exact path="/admin/change-password" component={adminChangePassword} />
                </AdminDashboardLayout>
              </Route>
              <Route exact path={["/organization/dashboard", "/organization/profile", "/organization/change-password"]}>
                <OrganizationDashboardLayout>
                  <PrivateRoute exact path="/organization/dashboard" component={organizationDashboard} />
                  <PrivateRoute exact path="/organization/profile" component={organizationProfile} />
                  <PrivateRoute exact path="/organization/change-password" component={organizationChangePassword} />
                </OrganizationDashboardLayout>
              </Route>  
                
                <Route
                    render={function () {
                        return <h1>Not Found</h1>;
                    }}
                />
            </Switch>
        )
    };
}
const PrivateRoute = ({ component, ...rest }) => {
 
  return (
    <Route {...rest} exact
      render = {(props) => (

        commonService.getAuth() ? (
          
          <div>            
            {React.createElement(component, props)}
          </div>
        ) :
        (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      )}
    />
  )
}
export default Routes;