import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
/*Common Service*/
import commonService from './core/services/commonService';
var CryptoJS = require("crypto-js");
// Containers
const AdminLayout = React.lazy(() => import('./containers/AdminLayout'));
const OrganizationLayout = React.lazy(() => import('./containers/OrganizationLayout'));
const FrontEndLayout = React.lazy(() => import('./containers/FrontEndLayout/FrontEndLayout'));
const CommonLayout = React.lazy(() => import('./containers/CommonLayout/CommonLayout'));

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class App extends Component {

  render() {
    return (
      <Router>
          <React.Suspense fallback={loading()}>
            <Switch>
              <OrganizationRoute path="/organization" name="Organization" component={OrganizationLayout} />
              <PrivateRoute path="/admin" name="Admin" component={AdminLayout} />
              <Route path="/common" name="Common" component={CommonLayout} />
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

      return commonService.getAuth() && CryptoJS.AES.decrypt(localStorage.getItem("role"), 'OEPENCRYPTION@12345').toString(CryptoJS.enc.Utf8) === "admin" ? (
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
      return commonService.getAuth() && CryptoJS.AES.decrypt(localStorage.getItem("role"), 'OEPENCRYPTION@12345').toString(CryptoJS.enc.Utf8) === "organization" ? (
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
