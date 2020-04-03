import React from "react";
import { Card, CardBody, CardHeader,CardText, CardTitle, Col, Row, Button  } from 'reactstrap';
import  { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
import commonService from '../../../core/services/commonService';
import commonFunction from '../../../core/functions/commonFunction';
import PaymentHistory from './PaymentHistory';
import "./PaymentPage.css";

class CurrentSubscription extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
      loading: false,    
      subscriptionDetails: {},
      tooltipOpen: false
    }    
    this.cancelSubscription = this.cancelSubscription.bind(this);
    
  }
  

  /*toggle = () => { this.setState({tooltipOpen: !this.state.tooltipOpen})}*/
 
  componentDidMount() {  
      this.setState( { loading: true}, () => {
        commonService.getAPIWithAccessToken('organization/subscription-info')
          .then( res => {
            
             
            if ( undefined === res.data.data || !res.data.status ) {
              this.setState( {  loading: false } );
              toast.error(res.data.message);             
              return;
            } 
            const subscriptionInfo = res.data.data;            
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

  cancelSubscription() {
    if( !window.confirm('Are you sure to cancel this subscription?'))
      return false;
    if(this.state.subscriptionDetails.planInfo.paymentMethod.toLowerCase() !== 'paypal')
      toast.error("Current subscription through in-app subscription. Please cancel through your itunes plateform"); 
    
    this.setState( { loading: true}, () => {
        commonService.postAPIWithAccessToken('subscription/cancel', {subscriberId: this.state.subscriptionDetails.planInfo.subscriberId})
          .then( res => {
            
             
            if ( undefined === res.data.data || !res.data.status ) {
              this.setState( {  loading: false } );
              toast.error(res.data.message);             
              return;
            } 
            const subscriptionInfo = res.data.data; 
            toast.success(res.data.message);            
            this.setState( { loading: false, subscriptionDetails: subscriptionInfo} ); 
            localStorage.setItem('isSubscribed', false);
            this.props.history.push('/subscription-plan');           
           
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



  render() {
       const {loading, subscriptionDetails} = this.state;
       let loaderElement = '';
       let subscriptionInfoHtml = '';
             
       if(loading)
          loaderElement = <Loader />
       else {

          if(subscriptionDetails.isActive) {
            let startDate = commonFunction.getDate(subscriptionDetails.planInfo.startDate || " ");
            let expiryDate = commonFunction.getDate(subscriptionDetails.planInfo.expiryDate || " ");
            subscriptionInfoHtml = <Row><Col lg={4} className="pd-20">Plan Type: <strong>{subscriptionDetails.planInfo.planType}</strong></Col>
            <Col lg={4} className="pd-20">Subscription Id: <strong>{subscriptionDetails.planInfo.transactionProfileId}</strong></Col>
            <Col lg={4} className="pd-20">Subscription Amount: <strong>${subscriptionDetails.planInfo.amount}</strong></Col>
            <Col lg={4} className="pd-20">Payment Method: <strong>{subscriptionDetails.planInfo.paymentMethod}</strong></Col>
            <Col lg={4} className="pd-20">Start Date: <strong>{startDate}</strong></Col>
            <Col lg={4} className="pd-20">Expiry Date: <strong>{expiryDate}</strong></Col>
            <Col lg={12}><Button className="search-btn cancel-btn" color = "warning" onClick={this.cancelSubscription}>Cancel Subscription</Button>
              {subscriptionDetails.planInfo.duration < 4 ? <Link className="setup-button" color = "success" to = "/organization/subscription/plan">Upgrade Your Subscription</Link> : ""}
              
              </Col>
            </Row>
          }
          else
              subscriptionInfoHtml = <CardText>Currently not have any active subscription</CardText>
       }
       return (
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Info</CardTitle>
                </CardHeader>
                <CardBody> 
                  {loaderElement}               
                  {subscriptionInfoHtml}
                </CardBody>
              </Card>

            </Col>
            <Col lg={12}>
              <PaymentHistory history = {this.props.history} />
            </Col>
          </Row>
                 
        );
  }
}

export default CurrentSubscription;
