import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavigation from "../sideNavigation";
import Loader from '../../loader';
import commonService from '../../../core/services/commonService';
import { FormErrors } from '../FormErrors';
import './change-password.css';

class changePassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      formField: {old_password: '', new_password: '', confirm_password: ''},
      formErrors: {old_password: '', new_password: '', confirm_password: '', error: ''},
      formValid: false,
      loading: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  /* Submit Form Handler*/
  submitHandler (event) {
    event.preventDefault();
    event.target.className += " was-validated";
    this.setState( { loading: true}, () => {
      const formInputField = this.state.formField;
      const formData = {
        "oldPassword": formInputField.old_password,
        "newPassword": formInputField.new_password
      };
      
      commonService.postAPIWithAccessToken('auth/change-password', formData)
        .then( res => {
          if ( undefined === res.data.data || !res.data.status ) {
           
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          }           
          this.setState({ loading: false, formField: {old_password: '', new_password: '', confirm_password: ''},
      formErrors: {old_password: '', new_password: '', confirm_password: '', error: ''}, formValid: false});
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
      case 'old_password':        
        fieldValidationErrors.old_password = (value !== '') ? '' : ' is required';
        break;
      case 'new_password':        
        fieldValidationErrors.new_password = (value !== '') ? '' : ' is required';
      case 'confirm_password':        
        fieldValidationErrors.confirm_password = (value !== '') ? '' : ' is required';
        break;               
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,       
                  }, this.validateForm);
  }
  /* Validate Form */
  validateForm() {
    let formstatus = true;
    const formErrors = this.state.formErrors;
    const formField = this.state.formField;
    debugger;
    if(formField.new_password !== formField.confirm_password) {
      formErrors.error = "New password and confirm password deos not match!";
      this.setState({formValid: false, formErrors: formErrors});
      return 
    }
    this.setState({formValid: 
        (formErrors.confirm_password == ""  && formErrors.new_password == "" && formErrors.old_password == "" && formField.old_password !== "" && formField.new_password !== "" && formField.confirm_password !== "" ) 
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
                <MDBCol md="12">
                  <h2 className="section-heading mb-4">Change Password</h2>
                </MDBCol>               
                <MDBCol className="changePasswordArea">  
                  <FormErrors formErrors={this.state.formErrors} />
                  <form className="needs-validation" onSubmit={this.submitHandler} noValidate >
                    <MDBRow>                
                      <MDBCol md="12">
                        <MDBInput value={formField.old_password} name="old_password" onChange={this.changeHandler} type="password" id="old_password" label="Old Password*" required ></MDBInput>
                      </MDBCol>                 
                      <MDBCol md="12">
                        <MDBInput value={formField.new_password} name="new_password" onChange={this.changeHandler} type="password" id="new_password" label="New Password*" required ></MDBInput>
                      </MDBCol>
                      <MDBCol md="12">
                        <MDBInput value={formField.confirm_password} name="confirm_password" onChange={this.changeHandler} type="password" id="confirm_password" label="Confirm Password*" required ></MDBInput>
                      </MDBCol>                                         
                      <MDBBtn color="primary" disabled={!formValid} type="submit">Change</MDBBtn>
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

export default changePassword;