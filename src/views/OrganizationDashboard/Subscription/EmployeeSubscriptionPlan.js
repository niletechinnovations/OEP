import React from "react";
import { Row} from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';
import "./SubscriptionPlan.css";

class EmployeeSubscriptionPlan extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
      loading: false,
      paymentProcess: false,      
      planId: "",
      planVariationId: "",
      planList: [],
      employeeId: "",
      termCondtionAccepted: {},
    }    
    this.buySubscription = this.buySubscription.bind(this); 
    this.cancelSubscription = this.cancelSubscription.bind(this);  
    this.acceptTermCondtion = this.acceptTermCondtion.bind(this); 
  }

 
  componentDidMount() {    
    
    this.subscriptionPlanList();
  }
  acceptTermCondtion(planId, planVariationId, event) {
    let status = false;
    if(event.target.checked) 
      status = true;
    let termCondtionAccepted = this.state.termCondtionAccepted;
    termCondtionAccepted[planId] = status;
    termCondtionAccepted[planVariationId] = status;
    
    this.setState({termCondtionAccepted: termCondtionAccepted, planId: planId})
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
    if(this.state.termCondtionAccepted[planInfo.planId] === undefined  || !this.state.termCondtionAccepted[planInfo.planId]){
      toast.error("Please accept term and conditions");
      return;
    }
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
    /*if(planInfo.isPlanActive) {
    	toast.error("Plan already activated on your account!");
    	return;
    }*/
    
    if(this.state.termCondtionAccepted[planInfo.id] === undefined  || !this.state.termCondtionAccepted[planInfo.id] || this.state.termCondtionAccepted[this.state.planId] === undefined  || !this.state.termCondtionAccepted[this.state.planId]){
      toast.error("Please accept term and conditions");
      return;
    }
    this.setState( { paymentProcess: true, planVariationId: planInfo.id}, () => {
      commonService.postAPIWithAccessToken('subscription/buy', {planId: this.state.planId, planVariationId: planInfo.id, employeeId: this.props.employeeId})
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
    let isSingleUserPlan = planList.filter(function(item) { return item.isSingleUser === true});
    let loaderElement ='';
    if(paymentProcess)
      loaderElement = <Loader />
    if(isSingleUserPlan.length === 0)
      return ("");

       return (
         <div className="plan-section">
            <div className="OfferTopHeading">
              <div className="OfferContentSecond">
                <h4>How it works</h4>
                  <ul>
                    <li>Select your preferred plan</li>
                    <li>Easily pay through Paypal</li>
                    <li>Create your Team Member as per plan</li>
                    <li>Create your store</li>
                    <li>Create your own custom Templates and can select from existing templates</li>
                    <li>Assign Template to Team member for inspection</li>
                  </ul>
                <p></p>
                <p className="contactLine">If you have any questions about our subscription plans, feel free to <Link to="/contact-us" title="Contact Us"> contact us </Link> </p>
              </div>
            </div>
            {loaderElement}
            <div className="plan-content-intro">
            <Row className ="">
              {isSingleUserPlan[0].planVariation.map((planInfo, index) =>
                <SetPlanDetailsInfo key={index} isSingleUserPlan = {isSingleUserPlan[0]} cancelSubscription= {this.cancelSubscription} activePlanInfo = {activePlanInfo} planInfo={planInfo} acceptTermCondtion = {this.acceptTermCondtion} planId={this.state.planId} buySubscription={this.buySubscription} paymentProcess= {paymentProcess} />
              )}</Row></div>
              <div className="termsCondition">
                <p>* Terms and Conditions apply to the subscription plans.</p>
              </div>
            
         </div>
         
                 
        );
  }
}
function SetPlanDetailsInfo (props) {
  const planInfo = props.planInfo;
  let planType = 'Monthly';
  let className = "col-md-3 col-lg-3 col-sm-6";
  if(planInfo.duration === 2){
    className = "col-md-3 col-lg-3 col-sm-6";
    planType = 'Quaterly';
  }
  else if(planInfo.duration === 3) {
    className = "col-md-3 col-lg-3 col-sm-6";
    planType = 'Half Yearly';
  }
  else if(planInfo.duration === 4){
    className = "col-md-3 col-lg-3 col-sm-6";
    planType = 'Yearly';
  }
  let actionButton = '';
  let buttonTxt = props.paymentProcess ? 'Processing...' : 'Buy Now';
  /*if(props.activePlanInfo.length > 0 ) {
    if(props.activePlanInfo[0].planId ===  planInfo.planId)
      actionButton = <button className="payment-Button"  onClick={() => props.cancelSubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Cancel'}</button>
    else if(props.activePlanInfo[0].duration <  planInfo.duration)
      actionButton = <button className="payment-Button"  onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Upgrade'}</button>
    else
      actionButton = ""
  }
  else */
    actionButton = <button className="payment-Button"  onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Buy Now'}</button>
  
 
  return (<div className={className}>
                    <div className="plan-intro-card">
                        <h2>{props.isSingleUserPlan.planName}</h2>
                        <div class="price-info"><div class="price-value">${planInfo.amount}</div><span class="price-per">/ {planType}</span></div>
                        {/*<div className="lastPrice">
                          <span className="">$</span>
                           {planInfo.amount} <span className="">/{planType}</span>
                        </div>*/}
                        <div className="plan-point-list">
                          <ul className="">
                            <li>Edit Unlimited Templates</li>
                            <li>Create Unlimited Templates</li>
                            <li>Unlimited Stores</li>
                            <li>Single Employee</li>
                            <li>Unlimited Inspections</li>
                            <li>Unlimited Template Sharing</li>
                            <li>24 Hour Help</li>
                          </ul>
                        </div>
                        <div className="terms-and-condition">
                          <input type="checkbox" name="term" className="check-term" onChange={(e) => {props.acceptTermCondtion(props.isSingleUserPlan.planId, planInfo.id,  e)}} /> I have read and accept the <a href="https://retailoep.com/terms-of-service" target="_blank" rel="noopener noreferrer" >Terms &amp; Conditions</a> and the <a href="https://retailoep.com/privacy-policy" target="_blank" rel="noopener noreferrer" >Privacy Policy</a>
                        </div>
                        {actionButton}
                    </div>
                </div>);
}
export default EmployeeSubscriptionPlan;
