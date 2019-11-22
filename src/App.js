import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';


// Containers
import  AdminLayout from './containers/AdminLayout/AdminLayout';
import  OrganizationLayout from './containers/OrganizationLayout/OrganizationLayout';
import  FrontEndLayout from './containers/FrontEndLayout/FrontEndLayout';
import './App.scss';
/*Common Service*/
import commonService from './core/services/commonService';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {

  render() {
    return (
      <Router>
          <React.Suspense fallback={loading()}>
            <Switch>
              <OrganizationRoute path="/organization" name="Organization" component={OrganizationLayout} />
              <PrivateRoute path="/admin" name="Admin" component={AdminLayout} />
              <Route path="/" name="Home" component={FrontEndLayout} />
              
              
            </Switch>
          </React.Suspense>
      </Router>
    );
  }
}
const PrivateRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return commonService.getAuth() && localStorage.getItem("role") === "admin" ? (
        renderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: routeProps.location }
        }}/>
      );
    }}/>
  );
};
const OrganizationRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return commonService.getAuth() && localStorage.getItem("role") === "organization" ? (
        renderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: routeProps.location }
        }}/>
      );
    }}/>
  );
};
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}
export default App;
