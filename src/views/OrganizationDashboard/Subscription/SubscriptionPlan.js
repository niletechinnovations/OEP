import React from "react";
import { Card, CardBody, CardHeader, CardTitle, CardSubtitle, CardText, Col, Row, Form, Button} from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import "./SubscriptionPlan.css";

class SubscriptionPlan extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
      loading: false,
      paymentProcess: false,      
      planList: []
    }    
    this.buySubscription = this.buySubscription.bind(this);  
  }

 
  componentDidMount() {    
    this.subscriptionPlanList();
  }

  subscriptionPlanList() {
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('subscription')
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);             
            return;
          } 
          const subscriptionPlanData = res.data.data;
          
          this.setState( { loading: true,  planList: subscriptionPlanData} );
         
         
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
  buySubscription(planId) {
    
    this.setState( { paymentProcess: true}, () => {
      commonService.postAPIWithAccessToken('subscription/buy', {planId: planId})
        .then( res => {
          
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  paymentProcess: false } );
            toast.error(res.data.message);             
            return;
          } 
          const paymentInfo = res.data.data;
          
          this.setState( { paymentProcess: true} );
          window.location.href = paymentInfo.redirectUrl;
         
         
        } )
        .catch( err => {  
               
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else {
            this.setState( { paymentProcess: false } );
            toast.error(err.message);    
          }
        } )
    } ) 
  }
  render() {
    const { loading, planList, paymentProcess } = this.state;
    
       return (
          <Row>
            {planList.map((planInfo, index) =>
              <SetPlanDetailsInfo key={index} planInfo={planInfo} buySubscription={this.buySubscription} paymentProcess= {paymentProcess} />
            )}
          </Row>
                 
        );
  }
}
function SetPlanDetailsInfo (props) {
  const planInfo = props.planInfo;
  let planType = 'Monthly';
  if(planInfo.duration === 2)
    planType = 'Quaterly';
  else if(planInfo.duration === 3)
    planType = 'Half Yearly';
  else if(planInfo.duration === 4)
    planType = 'Yearly';
  let buttonTxt = props.paymentProcess ? 'Processing...' : 'Buy Now';
  return (<Col lg={4}>
            <Card> 
              <CardHeader>
                <CardTitle>{planInfo.planName}</CardTitle>
                <CardSubtitle>${`${planInfo.amount} / ${planType}`}</CardSubtitle>
              </CardHeader>            
              <CardBody>                
                <CardText></CardText>
                <Button onClick={() => props.buySubscription(planInfo.planId)} disabled={props.paymentProcess}>{buttonTxt}</Button>
              </CardBody>
            </Card>
          </Col>);
}
export default SubscriptionPlan;
