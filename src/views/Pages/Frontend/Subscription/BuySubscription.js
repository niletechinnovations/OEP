import React from "react";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";

import Loader from '../../../Loader/Loader';

import  SubscriptionPlan  from '../Subscription/SubscriptionPlan';

class BuySubscription extends React.Component {
  constructor(props){
    super(props);
    this.state = {      
      loading: false,   
    } 
  }

  // Fetch the subCategory List
  componentDidMount() {
    
  }

  

  

  render() {
    const { loading } = this.state;    
    
    let loaderElement ='';
    if(loading)
      loaderElement = <Loader />
   
      return (
        <div className="main-content"> 
            <section className="my-5 mt-5">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">
                            
                        </MDBCol>
                    </MDBRow>
                    
                    <div className="heading-title">
                      <h2>OEP Subscription Plan</h2>
                      
                    </div>
                    <MDBRow className="align-items-center">
                        
                        <MDBCol md="12" lg="12">
                          {loaderElement}  
                          <div className="planList">              
                            <SubscriptionPlan  propHistory={this.props.history} />
                          </div>
                        </MDBCol>
                        
                      </MDBRow>
                </MDBContainer>
            </section>  
        </div>
        
      );
    
    
  }
}



export default BuySubscription;
