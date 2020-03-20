import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Col, Row} from 'reactstrap';
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
      planId: "",
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
  buySubscription(planInfo) {
    if(planInfo.isPlanActive) {
    	toast.error("Plan already activated on your account!");
    	return;
    }
    
    this.setState( { paymentProcess: true, planId: planInfo.planId}, () => {
      commonService.postAPIWithAccessToken('subscription/buy', {planId: planInfo.planId})
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
    const { planList, paymentProcess } = this.state;
    
       return (
          <Row>
            {planList.map((planInfo, index) =>
              <SetPlanDetailsInfo key={index} planInfo={planInfo} planId={this.state.planId} buySubscription={this.buySubscription} paymentProcess= {paymentProcess} />
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
  return (<Col lg={3}>
            <Card className="payment-card">
              <CardTitle>{planInfo.planName}</CardTitle> 
              <CardBody>
                <CardSubtitle>${`${planInfo.amount} / ${planType}`}</CardSubtitle>                
                <CardText>Number Of Template : {planInfo.templateAccess}</CardText>
                <CardText>Number Of Employee : {planInfo.userAccess}</CardText>
                <button className="payment-Button"  onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess || props.planInfo.isPlanActive}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Buy Now'}</button>
              </CardBody>
            </Card>
          </Col>);
}
export default SubscriptionPlan;
