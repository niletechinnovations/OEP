import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import SideNavigation from "../sideNavigation";
import AdminCardSection2 from '../sections/AdminCardSection2';
import ChartSection1 from '../sections/ChartSection1';
import './dashboard.css';


class dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <SideNavigation  />
        <main className="dashboard-content">
          <MDBContainer>
            <AdminCardSection2 />
            <ChartSection1 />
            
          </MDBContainer>
        </main>
      </React.Fragment>
    )
  }
}

export default dashboard;