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
      loading: false,      
      planList: []
    }    
   
  }

 
  componentDidMount() {    
    col-md-3
    const values = queryString.parse(this.props.location.search);
    if(values.token !== undefined && values.token !== "") {
      this.setState( { loading: true}, () => {
        commonService.postAPIWithAccessToken('subscription/verfiy', {token: values.token, isSandBox: true})
          .then( res => {
            col-md-3
             
            if ( undefined === res.data.data || !res.data.status ) {
              this.setState( {  loading: false } );
              toast.error(res.data.message);             
              return;
            } 
            const paymentInfo = res.data.data;
            
            this.setState( { loading: true} );
            localStorage.setItem('isSubscribed', true);
           
          } )
          .catch( err => {  
          col-md-3       
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
    else
      this.props.history.push('/organization/dashboard');
  }

 
  render() {
    const { loading} = this.state;
    
       return (
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Successs</CardTitle>
                </CardHeader>
                <CardBody>                
                  <CardText>Your subscription created successfully!</CardText>
                </CardBody>
              </Card>

            </Col>
          </Row>
                 
        );
  }
}

export default Successs;
