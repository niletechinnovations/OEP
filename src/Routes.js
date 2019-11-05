import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import registerPage from "./pages/RegisterPage";
import adminDashboard from "./components/admin/dashboard/dashboard";
import organizationLists from "./components/admin/organization/organizationLists";
import categoryLists from "./components/admin/category/categoryLists";
import adminAgents from "./components/admin/agent/agentLists";
import templateBuilder from "./pages/TemplateBuilderPage";
import commonService from './core/services/commonService';
import FrontEndHeader from './components/header/frontEndHeader';
import FrontEndFooter from './components/header/frontEndFooter';
import TopNavigation from './components/header/topNavigation';
class Routes extends React.Component{

    render() {
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
        return (
            <Switch>
              <Route exact path={["/about-us", "/login", "/register", "/"]}>
                <FrontEndLayout>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/about-us" component={AboutPage} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/register" component={registerPage} />
                </FrontEndLayout>
              </Route>
              <Route exact path={["/admin/dashboard", "/admin/agents", "/form-builder", "/admin/organization","/admin/category"]}>
                <AdminDashboardLayout>
                  <PrivateRoute exact path="/admin/dashboard" component={adminDashboard} />
                  <PrivateRoute exact path="/admin/organization" component={organizationLists} />
                  <PrivateRoute exact path="/admin/category" component={categoryLists} />
                  <PrivateRoute exact path="/admin/agents" component={adminAgents} />
                  <Route exact path="/form-builder" component={templateBuilder} />
                </AdminDashboardLayout>
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