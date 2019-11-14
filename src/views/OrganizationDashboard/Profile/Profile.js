import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, FormGroup, Label} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import { FormErrors } from '../../Formerrors/Formerrors';
import Loader from '../../Loader/Loader';
import './Profile.css'

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      formField: {organization_name: '', email: '', first_name: '', phoneNumber: '', address: '', city: '', state: '', country: '', postalCode: '', role: '' },
      formErrors: {organization_name: '', email: '', contact_person: '', role: '', error: ''},
      formValid: true,
      organizationId: "",
      loading: true

    };
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount() { 
    this.getProfile();
  }
  /*get profile API*/
  getProfile() {   

    this.setState( { loading: true}, () => {
      commonService.getAPIWithAccessToken('profile')
        .then( res => {

          if ( undefined === res.data.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }
          const organizationInfo = res.data.data;
          const formField = {
            organization_name: organizationInfo.organizationName, 
            email: organizationInfo.email, 
            first_name: organizationInfo.firstName, 
            phoneNumber: organizationInfo.phoneNumber, 
            address: organizationInfo.address, 
            city: organizationInfo.city, 
            state: organizationInfo.state, 
            country: organizationInfo.country, 
            postalCode: organizationInfo.postalCode, 
            role: organizationInfo.roleName };  

          this.setState({loading:false, formField: formField, formValid: true, organizationId: organizationInfo.organizationId});     
         
        } )
        .catch( err => {         
          if(err.response !== undefined && err.response.status === 401) {
            localStorage.clear();
            this.props.history.push('/login');
          }
          else
            this.setState( { loading: false } );
            toast.error(err.message);
        } )
    } )
  }
    /* Submit Form Handler*/
    submitHandler (event) {
      event.preventDefault();
      event.target.className += " was-validated";
      this.setState( { loading: true}, () => {
        const formInputField = this.state.formField;
        const formData = {
          "email": formInputField.email,
          "profileId": this.state.organizationId,
          "firstName": formInputField.first_name, 
          "phoneNumber": formInputField.phoneNumber, 
          "address": formInputField.address, 
          "roleName": formInputField.role, 
          "city": formInputField.city, 
          "state": formInputField.state, 
          "country": formInputField.country, 
          "postalCode": formInputField.postalCode, 
          "organizationName": formInputField.organization_name
        };
        debugger;
        commonService.putAPIWithAccessToken('profile', formData)
          .then( res => {
            if ( undefined === res.data.data || !res.data.status ) {
             
              this.setState( { loading: false} );
              toast.error(res.data.message);
              return;
            }           
            this.setState({ loading: false});
            toast.success(res.data.message);
           
          } )
          .catch( err => {         
            if(err.response !== undefined && err.response.status === 401) {
              localStorage.clear();
              this.props.history.push('/login');
            }
            else
              this.setState( { loading: false } );
              toast.error(err.message);
          } )
      } );
      
    };

    /* Input Field On changes*/
    changeHandler = event => {
      const name = event.target.name;
      const value = event.target.value;
      const formField = this.state.formField
      formField[name] = value;
      this.setState({ formField: formField },
                    () => { this.validateField(name, value) });
    };
    
    /* Validate Form Field */
    validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      fieldValidationErrors.error = '';
     
      switch(fieldName) {         
        case 'organization_name':        
          fieldValidationErrors.organization_name = (value !== '') ? '' : ' is required';
          break;
        case 'first_name':        
          fieldValidationErrors.contact_person = (value !== '') ? '' : ' is required';
          break;
        case 'role':        
          fieldValidationErrors.role = (value !== '') ? '' : ' is required';
          break;               
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,       
                    }, this.validateForm);
    }
    /* Validate Form */
    validateForm() {
      const formErrors = this.state.formErrors;
      const formField = this.state.formField;
      this.setState({formValid: 
        (formErrors.organization_name === ""  && formErrors.contact_person === "" && formErrors.role === "" && formField.organization_name !== "" && formField.role !== "" && formField.first_name !== "" ) 
        ? true : false});
    }
    /* Set Error Class*/
    errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }
  

  render() {

    const { loading } = this.state;
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>Profile Info</strong> 
              </CardHeader>
              <CardBody>
                <ToastContainer />
                {loaderElement}
                <Form onSubmit={this.submitHandler} noValidate>
                  <Row>
                    <FormErrors formErrors={this.state.formErrors} />
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="organization_name">Organization Name</Label>            
                        <Input type="text" placeholder="Organization Name *" id="organization_name" name="organization_name" value={this.state.formField.organization_name} onChange={this.changeHandler} required />
                      </FormGroup>  
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="email">Email</Label>            
                        <Input type="text" placeholder="Email *" id="email" name="email" value={this.state.formField.email} onChange={this.changeHandler} required />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="first_name">Contact Person</Label>            
                        <Input type="text" placeholder="Contact Person *" id="first_name" name="first_name" value={this.state.formField.first_name} onChange={this.changeHandler} required />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="role">Role</Label>            
                        <Input type="text" placeholder="Role *" id="role" name="role" value={this.state.formField.role} onChange={this.changeHandler} required />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="phoneNumber">Contact Number</Label>            
                        <Input type="text" placeholder="Contact Number " id="phoneNumber" name="phoneNumber" value={this.state.formField.phoneNumber} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="address">Address</Label>            
                        <Input type="text" placeholder="Address" id="address" name="address" value={this.state.formField.address} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="city">City</Label>            
                        <Input type="text" placeholder="City" id="city" name="city" value={this.state.formField.city} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="state">State</Label>            
                        <Input type="text" placeholder="State" id="state" name="state" value={this.state.formField.state} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="country">Country</Label>            
                        <Input type="text" placeholder="Country" id="country" name="country" value={this.state.formField.country} onChange={this.changeHandler}  />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup> 
                        <Label htmlFor="postalCode">Postal Code</Label>            
                        <Input type="text" placeholder="Postal Code" id="postalCode" name="postalCode" value={this.state.formField.postalCode} onChange={this.changeHandler}  />
                      </FormGroup>                  
                    </Col>
                    <Button color="primary" disabled={!this.state.formValid} type="submit">Update</Button>
                  </Row>
                </Form>
                  
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>

    )
  }
}

export default Profile;
