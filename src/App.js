import React, { Component } from "react";

import { BrowserRouter as Router} from "react-router-dom";

import Routes from "./Routes";

class App extends Component{
  state = {
    collapseID: ""
  };
  

  render() {
    
    return (
      <Router>
          <Routes />
      </Router>
    );
  }
}

export default App;
