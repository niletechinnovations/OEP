import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavigation from "../sideNavigation";
import Loader from '../../loader';
import commonService from '../../../core/services/commonService';
import { FormErrors } from '../FormErrors';
import './profile.css';

class profile extends Component {
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

  // Fetch the organization List
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
    const { loading, formField, formValid } = this.state;
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />
    return (
      <React.Fragment>
          <SideNavigation />
          <main className="dashboard-content">
            <MDBContainer>
              <ToastContainer />
              {loaderElement}
              <MDBRow className="mb-12">
                <MDBCol md="6">
                  <h2 className="section-heading mb-4">Profile</h2>
                </MDBCol>               
                <MDBCol md="12">  
                  <FormErrors formErrors={this.state.formErrors} />
                  <form className="needs-validation" onSubmit={this.submitHandler} noValidate >
                    <MDBRow>                
                      <MDBCol md="6">
                        <MDBInput value={formField.organization_name} name="organization_name" onChange={this.changeHandler} type="text" id="organization_name" label="Organization name*" required ></MDBInput>
                      </MDBCol>                 
                      <MDBCol md="6">
                        <MDBInput value={formField.email} name="email" onChange={this.changeHandler} type="email" id="email" label="Email*" disabled ></MDBInput>
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput value={formField.first_name} name="first_name" onChange={this.changeHandler} type="text" id="first_name" label="Contact person*" required ></MDBInput>
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput value={formField.role} name="role" onChange={this.changeHandler} type="text" id="role" label="Role*" required ></MDBInput>
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput value={formField.phoneNumber} name="phoneNumber" onChange={this.changeHandler} type="text" id="role" label="Contact Number"></MDBInput>
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput value={formField.address} name="address" onChange={this.changeHandler} type="text" id="address" label="Address"></MDBInput>
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput value={formField.city} name="city" onChange={this.changeHandler} type="text" id="city" label="City"></MDBInput>
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput value={formField.state} name="state" onChange={this.changeHandler} type="text" id="state" label="State"></MDBInput>
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput value={formField.country} name="country" onChange={this.changeHandler} type="text" id="country" label="Country"></MDBInput>
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput value={formField.postalCode} name="postalCode" onChange={this.changeHandler} type="text" id="postalCode" label="Postal Code"></MDBInput>
                      </MDBCol>                    
                      <MDBBtn color="primary" disabled={!formValid} type="submit">Update</MDBBtn>
                    </MDBRow>  
                  </form>                
                </MDBCol>
            </MDBRow>
          </MDBContainer>
        </main>
      </React.Fragment>
    );
  }
}

export default profile;