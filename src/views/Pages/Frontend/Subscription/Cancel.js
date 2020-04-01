import React from "react";
import { Card, CardBody, CardHeader,CardText, CardTitle, Col, Row } from 'reactstrap';

import "./PaymentPage.css";

class Cancel extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
      loading: false,
      paymentProcess: false,      
      planList: []
    }    
   
  }

 
  componentDidMount() {    
   
  }

 
  render() {
    
    
       return (
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Cancel</CardTitle>
                </CardHeader>
                <CardBody>                
                  <CardText>Your payment has been cancelled!</CardText>
                </CardBody>
              </Card>

            </Col>
          </Row>
                 
        );
  }
}

export default Cancel;
