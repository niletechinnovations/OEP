import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// routes config
import frontendRoutes from '../../frontendRoutes.js';

import FrontEndHeader from './FrontEndHeader';
import FrontEndFooter from './FrontEndFooter';
import './FrontEndResponsive.css'
class FrontEndLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogout: false
    }
  }
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    localStorage.clear();
    this.setState({isLogout: true});
    //this.props.history.push('/login')
  }

  render() {
    if(this.state.isLogout)
      return ( <Redirect to={`/`} noThrow /> )
    return (
      <div className="app">
        <div className="flyout">
            <FrontEndHeader />
            <main>      
              <ToastContainer />          
              <Suspense fallback={this.loading()}>
                <Switch>
                  {frontendRoutes.map((route, idx) => {
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
                  <Redirect from="/home" to="/" />
                </Switch>
              </Suspense>
            </main>
            <FrontEndFooter />
        </div>
      </div>
    );
  }
}

export default FrontEndLayout;
