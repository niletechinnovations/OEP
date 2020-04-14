import React from "react";
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

import Loader from '../../Loader/Loader';

import  EmployeeSubscriptionPlan  from '../Subscription/EmployeeSubscriptionPlan';

class EmployeeBuySubscription extends React.Component {
  constructor(props){
    super(props);
    this.state = {      
      loading: false,  
      employeeId: "", 
    } 
  }

  // Fetch the subCategory List
  componentDidMount() {
    const { match: { params } } = this.props;    
    if(params.employeeId !== undefined && params.employeeId !=="")
      this.setState({employeeId: params.employeeId});
    else
      this.propHistory.push('/organization/employee');
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
                  <EmployeeSubscriptionPlan propHistory={this.props.history} employeeId = {this.state.employeeId} />
                </CardBody>
              </Card>
            </Col>  
          </Row>
          
        </div>
      );
    
    
  }
}



export default EmployeeBuySubscription;
