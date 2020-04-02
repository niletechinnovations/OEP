import React, { Component, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import Profile from './Profile/Profile';
import Employee from './Employee/Employee';
import Store from './Store/Store';
import './Setup.css'

class SetUpPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      activeTab: '1'
    } 
    
  }
  componentDidMount() { 
    //this.userList();
  }


  toggle = tab => {
    if(this.state.activeTab !== tab) this.setState({activeTab: tab});
  }  

  render() {

    const { loading, activeTab } = this.state;     
    let loaderElement = '';
    if(loading) 
      loaderElement = <Loader />

    return (
     <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={ activeTab === '1' ? "active" : "" }
            onClick={() => { this.toggle('1'); }}
          >
            Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={ activeTab === '2' ? "active" : "" }
            onClick={() => { this.toggle('2'); }}
          >
            Employee Setup
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={ activeTab === '3' ? "active" : "" }
            onClick={() => { this.toggle('3'); }}
          >
            Store Setup
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Profile history = { this.props.history} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Employee history = { this.props.history} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <Store history = { this.props.history} />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>

    )
  }
}

export default SetUpPage;
