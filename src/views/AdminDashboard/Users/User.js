import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Label } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';

import Loader from '../../Loader/Loader';

class User extends Component {
  constructor( props ){
    super( props );

    this.state = {
      profileInfo: {},
      loading: false,
      profileId: ""
    };
  }
  componentDidMount() {
  const { match: { params } } = this.props;
    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('profile/public/'+params.profileId)
        .then( res => {
          console.log(res);
           
          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( {  loading: false } );
            toast.error(res.data.message);  
            this.props.history.push('/user');  
            return;
          }   

          this.setState({loading:false, profileInfo: res.data.data});     
         
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

    const { profileInfo, loading } = this.state; 
    let loaderElement ='';
      
    if(loading)
        loaderElement = <Loader />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User Profile</strong>
              </CardHeader>
              <CardBody className="profileInfo">
                  {loaderElement}
                  <ToastContainer />
                  <Row>
                    <Col md={4}><Label>Name: </Label><span> {profileInfo.firstName || 'N/A'}</span></Col>
                    <Col md={4}><Label>Email: </Label><span> {profileInfo.email || 'N/A' }</span></Col>
                    <Col md={4}><Label>Phone: </Label><span> {profileInfo.phoneNumber || 'N/A'}</span></Col>
                    <Col md={4}><Label>Address: </Label><span> {profileInfo.address || 'N/A'}</span></Col>
                    <Col md={4}><Label>City: </Label><span> {profileInfo.city || 'N/A'}</span></Col>
                    <Col md={4}><Label>State: </Label><span> {profileInfo.state || 'N/A'}</span></Col>
                    <Col md={4}><Label>Country: </Label><span> {profileInfo.country || 'N/A'}</span></Col>
                    <Col md={4}><Label>Postal Code: </Label><span> {profileInfo.postalCode || 'N/A'}</span></Col>
                  </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
