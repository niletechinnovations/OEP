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
      activePlanType: 1,
    }    
    this.buySubscription = this.buySubscription.bind(this);  
    this.cancelSubscription = this.cancelSubscription.bind(this);
    this.acceptTermCondtion = this.acceptTermCondtion.bind(this);
  }

 
  componentDidMount() {    
    this.subscriptionPlanList();
  }
  acceptTermCondtion(planInfo, event) {
    let status = false;
    let planId = planInfo.planId;
    if(event.target.checked) 
      status = true;
    let termCondtionAccepted = this.state.termCondtionAccepted;
    termCondtionAccepted[planId] = status;
    let planVariationId = '';
    if(this.state.activePlanType===1)
      planVariationId = planInfo.planVariation[0].id;
    else
      planVariationId = planInfo.planVariation[1].id;
    termCondtionAccepted[planVariationId] = status;
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
    if(planInfo.isPlanActive) {
    	toast.error("Plan already activated on your account!");
    	return;
    }
    
    let planVariationId = '';
    if(this.state.activePlanType===1)
      planVariationId = planInfo.planVariation[0].id;
    else
      planVariationId = planInfo.planVariation[1].id;
    if(this.state.termCondtionAccepted[planInfo.planId] === undefined  || !this.state.termCondtionAccepted[planInfo.planId] || this.state.termCondtionAccepted[planVariationId] === undefined  || !this.state.termCondtionAccepted[planVariationId]){
      toast.error("Please accept term and conditions");
      return;
    }
    if(!commonService.getAuth()) {
      this.props.propHistory.push({
        pathname: '/register',
        state: { planId: planInfo.planId, planVariationId: planVariationId }
      });
      return;
    }
    if(commonService.getLocalStorageValue('role') === "admin") {
      toast.error("Admin not allowed to buy subscription");
      return;
    }
    this.setState( { paymentProcess: true, planId: planInfo.planId}, () => {
      commonService.postAPIWithAccessToken('subscription/buy', {planId: planInfo.planId, planVariationId: planVariationId})
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

  changePlanType = () => {
    if(this.state.activePlanType===1)
      this.setState( { activePlanType: 4 } );
    else
      this.setState( { activePlanType: 1 } );
  }


  render() {
    const { planList, paymentProcess, activePlanType } = this.state;
    let activePlanInfo = planList.filter(function(item) { return item.isPlanActive === true});
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

            <Row className ="m-auto text-center w-85 subscription-plan-section">
              <div className="pricing-section">
                <label className={ ( activePlanType===1 ? 'toggler toggler--is-active' : 'toggler' ) } id="filt-monthly">Monthly</label>
                <div className="toggle">
                    <input type="checkbox" id="switcher" className="check" onClick={ () =>  this.changePlanType() } />
                    <b className="b switch"></b>
                </div>
                <label className={ ( activePlanType===4 ? 'toggler toggler--is-active' : 'toggler' ) } id="filt-yearly">Yearly</label>
              </div>
              {planList.map((planInfo, index) =>
                <SetPlanDetailsInfo key={index} activePlanType = {activePlanType} cancelSubscription= {this.cancelSubscription} activePlanInfo = {activePlanInfo} planInfo={planInfo} acceptTermCondtion = {this.acceptTermCondtion} planId={this.state.planId} buySubscription={this.buySubscription} paymentProcess= {paymentProcess} />
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
  let className = "col-md-4 col-lg-4 col-sm-6 plan-info-item princing-item ";
  if(planInfo.duration === 2){
    className = "col-md-4 col-lg-4 col-sm-6 plan-info-item princing-item ";
    planType = 'Quaterly';
  }
  else if(planInfo.duration === 3) {
    className = "col-md-4 col-lg-4 col-sm-6 plan-info-item princing-item ";
    planType = 'Half Yearly';
  }
  else if(planInfo.duration === 4){
    className = "col-md-4 col-lg-4 col-sm-6 plan-info-item princing-item ";
    planType = 'Yearly';
  }
  
  let actionButton = '';
  let buttonTxt = props.paymentProcess ? 'Processing...' : 'Buy Now';
  
  if(props.activePlanInfo.length > 0 ) {
    let planVariation = props.activePlanInfo[0].planVariation.filter(function(item) { return item.isActive === true ;});
    let durationPlan = '';
    if(planVariation.length > 0 )
      durationPlan = planVariation[0].duration;

    if(props.activePlanInfo[0].planId ===  planInfo.planId){
      if(props.activePlanType === durationPlan)
        actionButton = <button className="payment-Button"  onClick={() => props.cancelSubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Cancel'}</button>
      else if(props.activePlanType > durationPlan)
        actionButton = <button className="payment-Button"  onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Upgrade'}</button>
      else
        actionButton = <button className="payment-Button"  onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Downgrade'}</button>
    }
    else {
      if(props.activePlanInfo[0].isSingleUser)
        actionButton = <button className="payment-Button"  onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Upgrade'}</button>
      else
        actionButton = <button className="payment-Button"  onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Downgrade'}</button>
    }    
  }
  else 
    actionButton = <button className="payment-Button"  onClick={() => props.buySubscription(planInfo)} disabled={props.paymentProcess}>{props.paymentProcess && props.planId === planInfo.planId ? buttonTxt: 'Buy Now'}</button>
  if(planInfo.planVariation === undefined ||  planInfo.planVariation.length === 0)
    return (<></>);
  return (<div className={className}>
                    <div className="pricing-plan">
                        <h2>{planInfo.planName}</h2>
                        {props.activePlanType === 1 ? 
                        <div className="lastPrice">
                          <span className="">$</span>
                           {planInfo.planVariation[0].amount} <span className="">/Monthly</span>
                        </div>
                        : <div className="lastPrice">
                          <span className="">$</span>
                           {planInfo.planVariation[1].amount} <span className="">/Yearly</span>
                        </div> }
                        <div className="ContentHeight-inner">
                          <ul className="point-list">
                            {planInfo.isTrail ? <li><strong>30 Days Free Trial</strong></li>: ""}
                            <li>Template edits: <b>Unlimited</b></li>
                            <li>Create templates: <b> Unlimited</b></li>
                            <li>Stores: <b> {planInfo.isSingleUser ? "Single" : "Unlimited"}</b></li>
                            <li>Employees: <b> {planInfo.isSingleUser ? "Single" : "Unlimited"}</b></li>
                            <li>Inspections: <b> Unlimited</b></li>
                            <li>Template Sharing: <b> Unlimited</b></li>
                            <li>24 Hour Help: <b> Unlimited</b></li>
                          </ul>
                        </div>
                        <div className="terms-and-condition">
                          <input type="checkbox" name="term" className="check-term" onChange={(e) => {props.acceptTermCondtion(planInfo, e)}} /> I have read and accept the <a href="https://retailoep.com/terms-of-service" target="_blank" rel="noopener noreferrer" >Terms &amp; Conditions</a> and the <a href="https://retailoep.com/privacy-policy" target="_blank" rel="noopener noreferrer" >Privacy Policy</a>
                        </div>
                        {actionButton}
                    </div>
                </div>);
}
export default SubscriptionPlan;
