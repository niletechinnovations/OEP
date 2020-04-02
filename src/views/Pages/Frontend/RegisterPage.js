import React from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBView,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBMask,
  MDBCard
} from "mdbreact";
import Loader from '../../Loader/Loader';


import "./RegisterPage.css";

import commenService from '../../../core/services/commonService';

import VerifyOtp from './VerifyOtp';

class RegisterPage extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);

  constructor( props ){
    super( props );

    this.state = {
      organizationName: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
      isRegistered: false,
      errors: {}
    };
  }

  componentDidMount() {
      this.scrollToTop();
  }
  scrollToTop = () => window.scrollTo(0, 0);
    
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if(!this.validateForm())
      return false;
    const signupData = {
      organizationName: this.state.organizationName,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      password: this.state.password,
      role: 'organization'
    };
    this.setState( { loading: true }, () => {
      commenService.postAPI( `auth/sign-up`, signupData )
        .then( res => {
         
          console.log(res);
          if ( undefined === res.data || !res.data.status ) {
            this.setState( { loading: false} );
            toast.error(res.data.message);
            return;
          }
          this.setState({loading: false, isRegistered: true, organizationName: "",firstName: "",lastName: "",phoneNumber: "",password: "",confirmPassword: ""});
          toast.success(res.data.message);
          //this.props.history.push('/login');
          
        } )
        .catch( err => {
          
          this.setState( { loading: false } );
          toast.error(err.message);
        } )
    } )

  };

  validateForm() {
    let errors = {};
    let formIsValid = true;
    if (!this.state.firstName) {
        formIsValid = false;
        errors["firstName"] = "*Please enter first name.";
    }
    if (typeof this.state.firstName !== "undefined") {
        if (!this.state.firstName.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["firstName"] = "*Please enter alphabet characters only.";
        }
    }
    if (!this.state.lastName) {
      formIsValid = false;
      errors["lastName"] = "*Please enter last name.";
    }
    if (!this.state.email) {
        formIsValid = false;
        errors["email"] = "*Please enter your email-ID.";
    }
    if (typeof this.state.email !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.email)) {
            formIsValid = false;
            errors["email"] = "*Please enter valid email-ID.";
        }
    }
    if (!this.state.organizationName) {
        formIsValid = false;
        errors["organizationName"] = "*Please enter organization name.";
    }
    if (typeof this.state.phoneNumber !== "undefined" &&  this.state.phoneNumber !== "") {
        if (!this.state.phoneNumber.match(/^[0-9]{10}$/)) {
            formIsValid = false;
            errors["phoneNumber"] = "*Please enter valid mobile no.";
        }
    }
    if (!this.state.password) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
    }
    
    if (!this.state.confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "*Please re-enter your password.";
    }
    if (this.state.confirmPassword !== this.state.password) {
      formIsValid = false;
      errors["confirmPassword"] = "*Passwords and confirm-password do not match.";
    }
    this.setState({
      loading: false,
      errors: errors
    });
    //console.error(errors);
    return formIsValid;
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { organizationName, firstName, lastName, email, phoneNumber, password, confirmPassword, loading, errors } = this.state;
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />
    return (
      <>
      <div id="loginPage">
        <MDBView>
          <MDBMask className="bg-mask d-flex justify-content-center align-items-center" >
            <MDBContainer>
              <MDBRow>
                <MDBCol className="col-md-6 mt-xl-5 mb-5">
                  <div className="account-content">
                    <h1>Why Join OEP?</h1>
                    <p>OEP Retail will enhance and help you maintain the fundamentals of your business along with allowing you the flexibility to share your findings with your team in real time.  This action will move you and your business quicker and much more effectively.
                    </p>
                    <div className="btn-section">
                    <Link className="btn-Started" to="/why-join-us">Read More</Link>
                    </div>
                  </div>
                </MDBCol>
                {loaderElement}
                <MDBCol md="6" xl="5" className="loginForm mb-5">
                  <MDBCard className="account-form">
                    <MDBCardBody className="z-depth-2">
                      <h4 className="text-center text-heading">
                        <strong>{ !this.state.isRegistered ? `Create your OEP account!` : `Verify Account`}</strong>
                      </h4>

                      { !this.state.isRegistered ? 
                        
                      <form className="grey-textneeds-validation" onSubmit={this.submitHandler} noValidate>
                        <MDBRow>
                          <MDBCol md="12">
                            <MDBInput type="text" className={errors['organizationName'] !== undefined && errors['organizationName'] !== "" ? "is-invalid" : ""} id="org-name" label="Organization Name" name="organizationName" value={organizationName} onChange={this.changeHandler} required>
                              <div className="invalid-feedback">
                                {errors['organizationName']}
                              </div>
                            </MDBInput>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="6">
                            <MDBInput type="text" id="first-name" className={errors['firstName'] !== undefined && errors['firstName'] !== "" ? "is-invalid" : ""}  label="Contact person first name" name="firstName" value={firstName} onChange={this.changeHandler} required>
                              <div className="invalid-feedback">
                                {errors['firstName']}
                              </div>
                            </MDBInput>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput type="text" id="last-name" className={errors['lastName'] !== undefined && errors['lastName'] !== "" ? "is-invalid" : ""}  label="Contact person last name" name="lastName" value={lastName} onChange={this.changeHandler} required>
                              <div className="invalid-feedback">
                               {errors['lastName']}
                              </div>
                            </MDBInput>
                          </MDBCol>
                        </MDBRow>
                        
                        <MDBRow>
                          <MDBCol md="6">
                            <MDBInput type="text" id="phoneNumber" label="Phone number" className={errors['phoneNumber'] !== undefined && errors['phoneNumber'] !== "" ? "is-invalid" : ""}  name="phoneNumber" value={phoneNumber} onChange={this.changeHandler} >
                                <div className="invalid-feedback">
                                  {errors['phoneNumber']}
                                </div>
                              </MDBInput>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput type="email" name="email" className={errors['email'] !== undefined && errors['email'] !== "" ? "is-invalid" : ""}  value={email} onChange={this.changeHandler} id="email" label="Email address *" required>
                              <div className="invalid-feedback">
                              {errors['email']}
                              </div>
                            </MDBInput>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="6">
                            <MDBInput type="password" name="password" className={errors['password'] !== undefined && errors['password'] !== "" ? "is-invalid" : ""}  value={password} onChange={this.changeHandler} id="password" label="Password *" required>
                              <div className="invalid-feedback">
                                {errors['password']}
                              </div>
                            </MDBInput>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput type="password" name="confirmPassword" className={errors['confirmPassword'] !== undefined && errors['confirmPassword'] !== "" ? "is-invalid" : ""}  value={confirmPassword} onChange={this.changeHandler} id="confirmPassword" label="Confirm Password *" required>
                              <div className="invalid-feedback">
                                {errors['confirmPassword']}
                              </div>
                            </MDBInput>
                          </MDBCol>
                        </MDBRow>
                          
                        <div className="text-center mt-3 mb-3 black-text">
                          <MDBBtn className="btn-account" type="submit">Sign Up</MDBBtn>
                        </div>
                        <div className="text-center text-foot">
                          <p>Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                      </form> : 
                      <VerifyOtp email = {this.state.email} page="register" /> }
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>  
      </>
    );
  }
}

export default RegisterPage;
