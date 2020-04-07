import React from "react";
import { Row} from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../../core/services/commonService';

import "./SubscriptionPlan.css";

class SubscriptionPlan extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
      loading: false,
      paymentProcess: false,      
      planId: "",
      planList: [],
      termCondtionAccepted: {},
    }    
    this.buySubscription = this.buySubscription.bind(this);  
    this.acceptTermCondtion = this.acceptTermCondtion.bind(this);
  }

 
  componentDidMount() {    
    this.subscriptionPlanList();
  }
  acceptTermCondtion(planId, event) {
    let status = false;
    if(event.target.checked) 
      status = true;
    let termCondtionAccepted = this.state.termCondtionAccepted;
    termCondtionAccepted[planId] = status;
    this.setState({termCondtionAccepted: termCondtionAccepted})
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
  buySubscription(planInfo) {
    if(planInfo.isPlanActive) {
    	toast.error("Plan already activated on your account!");
    	return;
    }
    if(this.state.termCondtionAccepted[planInfo.planId] === undefined  || !this.state.termCondtionAccepted[planInfo.planId]){
      toast.error("Please accept term and conditions");
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
    
       return (
          <div className="container-fluid bg-gradient p-5">
           <div className="plan-section">
            <div className="OfferTopHeading">
              <div className="OfferContentFirst">
                
              </div>
              <div className="OfferContentSecond">
                <p>
                  </p><h4>How it works</h4>
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

            <Row className ="m-auto text-center w-85">
              {planList.map((planInfo, index) =>
                <SetPlanDetailsInfo key={index} planInfo={planInfo} acceptTermCondtion = {this.acceptTermCondtion} planId={this.state.planId} buySubscription={this.buySubscription} paymentProcess= {paymentProcess} />
              )}
              <div className="termsCondition">
                <p>* Terms and Conditions apply to the subscription plans.</p>
              </div>
            </Row>
          </div>
         </div>
                 
        );
  }
}
function SetPlanDetailsInfo (props) {
  const planInfo = props.planInfo;
  let planType = 'Monthly';
  let className = "col-md-4 col-lg-4 col-sm-6 plan-info-item princing-item yellow-item";
  if(planInfo.duration === 2){
    className = "col-md-4 col-lg-4 col-sm-6 plan-info-item princing-item violet-item";
    planType = 'Quaterly';
  }
  else if(planInfo.duration === 3) {
    className = "col-md-4 col-lg-4 col-sm-6 plan-info-item princing-item dark-blue-item";
    planType = 'Half Yearly';
  }
  else if(planInfo.duration === 4){
    className = "col-md-4 col-lg-4 col-sm-6 plan-info-item princing-item red-item";
    planType = 'Yearly';
  }
  let buttonTxt = props.paymentProcess ? 'Processing...' : 'Buy Now';
  return (<div className={className}>
                    <div className="pricing-plan">
                        <h2>{planInfo.planName}</h2>
                        <div className="lastPrice">
                          <span className="">$</span>
                           {planInfo.amount} <span className="">/{planType}</span>
                        </div>
                        <div className="ContentHeight-inner">
                          <ul className="point-list">
                            <li>Template edits: <b>Unlimited</b></li>
                            <li>Create templates: <b> Unlimited</b></li>
                            <li>Stores: <b> Unlimited</b></li>
                            <li>Employees: <b> Unlimited</b></li>
                            <li>Inspections: <b> Unlimited</b></li>
                            <li>Template Sharing: <b> Unlimited</b></li>
                            <li>24 Hour Help: <b> Unlimited</b></li>
                          </ul>
                        </div>
                        <div className="terms-and-condition">
                          <input type="checkbox" name="term" className="check-term" onChange={(e) => {props.acceptTermCondtion(planInfo.planId, e)}} /> I have read and accept the <a href="https://retailoep.com/terms-of-service" target="_blank" rel="noopener noreferrer" >Terms &amp; Conditions</a> and the <a href="https://retailoep.com/privacy-policy" target="_blank" rel="noopener noreferrer" >Privacy Policy</a>
                        </div>
                        <button type="button" className="payment-Button" onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess || props.planInfo.isPlanActive}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Buy Now'}</button>
                    </div>
                </div>);
}
export default SubscriptionPlan;
