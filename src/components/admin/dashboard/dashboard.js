import React, { Component } from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';
import SideNavigation from "../sideNavigation";
import AdminCardSection1 from "../sections/AdminCardSection1";
import AdminCardSection2 from '../sections/AdminCardSection2';
import TableSection from '../sections/TableSection';
import ChartSection1 from '../sections/ChartSection1';
import ChartSection2 from '../sections/ChartSection2';
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