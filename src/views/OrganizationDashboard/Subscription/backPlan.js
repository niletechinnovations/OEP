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
    this.cancelSubscription = this.cancelSubscription.bind(this); 
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
            this.props.propHistory.push('/login');
          }
          else {
            this.setState( { loading: false } );
            toast.error(err.message);    
          }
        } )
    } ) 
  }

  cancelSubscription(planInfo) {
    if( !window.confirm('Are you sure to cancel this subscription?'))
      return false;
    this.setState( { loading: true}, () => {
        commonService.postAPIWithAccessToken('subscription/cancel', {subscriberId: planInfo.subscriberId})
          .then( res => {
            
             
            if ( undefined === res.data.data || !res.data.status ) {
              this.setState( {  loading: false } );
              toast.error(res.data.message);             
              return;
            } 
            //const subscriptionInfo = res.data.data; 
            toast.success(res.data.message);            
            this.setState( { loading: false} ); 
            localStorage.setItem('isSubscribed', false); 
            this.subscriptionPlanList();          
           
          } )
          .catch( err => {  
             
            if(err.response !== undefined && err.response.status === 401) {
              localStorage.clear();
              this.props.propHistory.push('/login');
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
            this.props.propHistory.push('/login');
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
    let activePlanInfo = planList.filter(function(item) { return item.isPlanActive === true});

       return (
          <Row>
            {planList.map((planInfo, index) =>
              <SetPlanDetailsInfo key={index} cancelSubscription= {this.cancelSubscription} activePlanInfo = {activePlanInfo} planInfo={planInfo} planId={this.state.planId} buySubscription={this.buySubscription} paymentProcess= {paymentProcess} />
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
  let actionButton = '';
  let buttonTxt = props.paymentProcess ? 'Processing...' : 'Buy Now';
  if(props.activePlanInfo.length > 0 ) {
    if(props.activePlanInfo[0].duration ===  planInfo.duration)
      actionButton = <button className="payment-Button"  onClick={() => props.cancelSubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Cancel'}</button>
    else if(props.activePlanInfo[0].duration <  planInfo.duration)
      actionButton = <button className="payment-Button"  onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Upgrade'}</button>
    else
      actionButton = <button className="payment-Button"  onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Downgrade'}</button>
  }
  else 
    actionButton = <button className="payment-Button"  onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Buy Now'}</button>
  
  debugger;
  return (<Col lg={3}>
            <Card className="payment-card">
              <CardTitle>{planInfo.planName}</CardTitle> 
              <CardBody>
                <CardSubtitle>${`${planInfo.amount} / ${planType}`}</CardSubtitle>                
                <CardText>Number Of Template : {planInfo.templateAccess}</CardText>
                <CardText>Number Of Employee : {planInfo.userAccess}</CardText>
                {actionButton}
              </CardBody>
            </Card>
          </Col>);
}
export default SubscriptionPlan;
