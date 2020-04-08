import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
//import  { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultTemplate from './DefaultTemplate';
import CustomTemplate from './CustomTemplate';
import UploadedTemplate from './UploadedTemplate';
import commonService from '../../../core/services/commonService';
import './Template.css'

class SetUpPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      activeTab: '1',
      subscriptionDetails: {}
    } 
    
  }
  componentDidMount() {  
      this.setState( { loading: true}, () => {
        commonService.getAPIWithAccessToken('organization/subscription-info')
          .then( res => {
            
             
            if ( undefined === res.data.data || !res.data.status ) {
              this.setState( {  loading: false } );
              toast.error(res.data.message);             
              return;
            } 
            let subscriptionInfo = res.data.data;            
            if(subscriptionInfo.planInfo) 
              subscriptionInfo.duration = subscriptionInfo.planInfo.duration;
            this.setState( { loading: false, subscriptionDetails: subscriptionInfo} );            
           
          } )
          .catch( err => {  
             
            if(err.response !== undefined && err.response.status === 401) {
              localStorage.clear();
              this.props.history.push('/login');
            }
            else {
              this.setState( { loading: false } );
              toast.error(err.message);    
            }
          } )
      } ) 
    
  }


  toggle = tab => {
    if(this.state.activeTab !== tab) this.setState({activeTab: tab});
  }  

  render() {

    const { activeTab } = this.state;  
     
    return (
     <div className="tabs-info-card">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={ activeTab === '1' ? "active" : "" }
            onClick={() => { this.toggle('1'); }}
          >
            Default Template
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={ activeTab === '2' ? "active" : "" }
            onClick={() => { this.toggle('2'); }}
          >
            Custom Template
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={ activeTab === '3' ? "active" : "" }
            onClick={() => { this.toggle('3'); }}
          >
            Uploaded Template
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <div className="DefaultTemplate-msg-card">
              <p>Choose any of the Default Templates available. Select Templates based on the Category and Subcategories of the Business. </p>
              </div>
            </Col>
            <Col sm="12">
              <DefaultTemplate history = { this.props.history} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            {/*<Col sm="12">
              {this.state.subscriptionDetails.duration === 1 ? <div className="plan-info-notice"><p>Your subscription allows you to create 5 Templates and add 10 employees to your account.</p><p>Would you like to upgrade your Subscription to a Annual Subscription. Annual Subscription allows you to Create 50 Templates. You can also add 50 Employees to your account. </p><Link className="subscription-btn" color = "success" to = "/organization/subscription/plan">Upgrade Your Subscription</Link></div> : <p>Your subscription allows you to create 50 Templates and add 50 Employees to your account.</p>} 
            </Col>*/}
            <Col sm="12">
              <CustomTemplate history = { this.props.history} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <div className="DefaultTemplate-msg-card">
              <p>You can upload a template of your choice either as a Picture or as a File. Choose the upload option to Add Upload template. We will help set-up the template for you.</p>
              </div>
            </Col>
            <Col sm="12">
              <UploadedTemplate history = { this.props.history} />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>

    )
  }
}

export default SetUpPage;
