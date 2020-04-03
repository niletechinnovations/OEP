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
                <p className="contactLine">If you have any questions about our advertisement plans, feel free to <Link to="/contact-us" title="Contact Us"> contact us </Link> </p>
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
                    <div className="pricing-divider ">
                        <h5 className="text-light">{planInfo.planName}</h5>
                        <h2 className="my-0 font-weight-normal lastPrice"><span className="">$</span> {planInfo.amount} <span className="">/{planType}</span></h2>
                       <svg className="pricing-divider-img" enableBackground="new 0 0 300 100" height="100px" id="Layer_1" preserveAspectRatio="none" version="1.1" viewBox="0 0 300 100" width="300px" x="0px"  y="0px">
                    <path className="deco-layer deco-layer--1" d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729
            c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z" fill="#FFFFFF" opacity="0.6"></path>
                    <path className="deco-layer deco-layer--2" d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729
            c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z" fill="#FFFFFF" opacity="0.6"></path>
                    <path className="deco-layer deco-layer--3" d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716
            H42.401L43.415,98.342z" fill="#FFFFFF" opacity="0.7"></path>
                    <path className="deco-layer deco-layer--4" d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428
            c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z" fill="#FFFFFF"></path>
                  </svg>
                    </div>
                    <div className="card-body bg-white mt-0 shadow ContentHeight-fix">
                      <div className="ContentHeight-inner">
                      <ul className="list-unstyled mb-3 position-relative">
                       
                        <li>Number of template: <b>{planInfo.templateAccess}</b></li>
                        <li>Number of employee: <b> {planInfo.userAccess}</b></li>
                       
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
