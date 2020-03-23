import React from "react";
import { Card, CardBody, CardHeader,CardText, CardTitle, Col, Row, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
import commonService from '../../../core/services/commonService';
import "./PaymentPage.css";

class CurrentSubscription extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
      loading: false,    
      subscriptionDetails: {}
    }    
    this.cancelSubscription = this.cancelSubscription.bind(this);
  }

 
  componentDidMount() {  
      this.setState( { loading: true}, () => {
        commonService.getAPIWithAccessToken('organization/subscription-info')
          .then( res => {
            debugger;
             
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
       debugger;      
       if(loading)
          loaderElement = <Loader />
       else {
          if(subscriptionDetails.isActive) {
            let startDate = new Date(subscriptionDetails.planInfo.startDate).toDateString("YYYY-MM-DD");
            let expiryDate = new Date(subscriptionDetails.planInfo.expiryDate).toDateString("YYYY-MM-DD");
            subscriptionInfoHtml = <><CardText>Plan Name: {subscriptionDetails.planInfo.planName}</CardText>
            <CardText>Subscription Amount: ${subscriptionDetails.planInfo.amount}</CardText>
            <CardText>Start Date: {startDate}</CardText>
            <CardText>Expiry Date: {expiryDate}</CardText>
            <Button onClick={this.cancelSubscription}>Cancel Subscription</Button>
            </>
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
          </Row>
                 
        );
  }
}

export default CurrentSubscription;
