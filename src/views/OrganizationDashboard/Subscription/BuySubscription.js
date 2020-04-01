import React from "react";
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

import Loader from '../../Loader/Loader';

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
        <div className="animated fadeIn">
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="mainHeading">
                  <strong>Subscription Plan</strong>                  
                </CardHeader>
                <CardBody>
                  {loaderElement}                
                  <SubscriptionPlan propHistory={this.props.history} />
                </CardBody>
              </Card>
            </Col>  
          </Row>
          
        </div>
      );
    
    
  }
}



export default BuySubscription;
