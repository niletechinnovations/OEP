import React from "react";
import { Card, CardBody, CardHeader,CardText, CardTitle, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import queryString from 'query-string'
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import "./PaymentPage.css";

class Successs extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
      loading: false,    
      planList: []
    }    
    this.verirfySubscription = this.verirfySubscription.bind(this);
  }

 
  componentDidMount() {    
    
    const values = queryString.parse(this.props.location.search);
    if(values.token !== undefined && values.token !== "") {
      this.verirfySubscription(values);
    }
    else
      this.props.history.push('/organization/dashboard');
  }

  verirfySubscription(values) {
    this.setState( { loading: true}, () => {
        commonService.postAPIWithAccessToken('subscription/verfiy', {token: values.token, isSandBox: true})
          .then( res => {
            
             
            if ( undefined === res.data.data || !res.data.status ) {
              this.setState( {  loading: false } );
              toast.error(res.data.message);             
              return;
            } 
            //const paymentInfo = res.data.data;
            
            this.setState( { loading: true} );
            commonService.setIsSubscribe(true);
            toast.success("Your subscription has been created successfully!");
            let isProfileCompleted = commonService.getLocalStorageValue('isProfileCompleted');
            let authId = commonService.getLocalStorageValue('authId');
            if(authId !== res.data.data.authId)       
              this.props.history.push('/organization/employee');     
            else if(isProfileCompleted.toLowerCase() === "false")
              this.props.history.push('/organization/set-up?showAlert=yes');
            else
              this.props.history.push('/organization/subscription');
           
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
 
  render() {
    
       return (
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Successs</CardTitle>
                </CardHeader>
                <CardBody>                
                  <CardText>Your subscription has been created successfully!</CardText>
                </CardBody>
              </Card>

            </Col>
          </Row>
                 
        );
  }
}

export default Successs;
