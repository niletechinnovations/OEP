import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Alert} from 'reactstrap';
import Profile from './Profile/Profile';
import Employee from './Employee/Employee';
import Store from './Store/Store';
import commonService from '../../core/services/commonService';
import './Setup.css'
const queryString = require('query-string');
class SetUpPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      visible: false,
      activeTab: '1'
    } 
    this.enableNextStep = this.enableNextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.finishSetup = this.finishSetup.bind(this);
  }
  componentDidMount() { 
    const queryParams = queryString.parse(this.props.location.search);
    
    if(queryParams.showAlert) {
      this.setState({visible: true})
    }
    commonService.getAPIWithAccessToken('profile/completed')
      .then( res => {
       commonService.setLocalStorageValue('isProfileCompleted', "yes")
      } )
      .catch( err => {
    } )
  }

  onDismiss = () => { this.setState({visible: false})}

  toggle = tab => {
    if(this.state.activeTab !== tab) this.setState({activeTab: tab});
  } 

  enableNextStep() {
    let activeTab = this.state.activeTab;
    activeTab++;
    this.setState({activeTab: activeTab.toString()});
  } 

  previousStep() {

    let activeTab = this.state.activeTab;
    activeTab--;
    this.setState({activeTab: activeTab.toString()});
  }

  finishSetup() {
    this.props.history.push('/organization');
  }

  render() {

    const { activeTab, visible } = this.state;     
    return (
     <div className="tabs-info-card">
      <Alert color="warning" isOpen={visible} toggle={this.onDismiss}>
        Complete your organization setup
      </Alert>
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
              <Profile history = { this.props.history} enableNextStep = {this.enableNextStep} />
        </TabPane>
        <TabPane tabId="2">
              <Employee history = { this.props.history} previousStep = {this.previousStep} enableNextStep = {this.enableNextStep} />
        </TabPane>
        <TabPane tabId="3">
              <Store history = { this.props.history} previousStep = {this.previousStep} finishSetup = {this.finishSetup} />
        </TabPane>
      </TabContent>
    </div>

    )
  }
}

export default SetUpPage;
