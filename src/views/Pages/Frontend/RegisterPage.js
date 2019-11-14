import React from "react";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
      loading: false
      
    };
  }

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
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
          toast.success(res.data.message);
          this.props.history.push('/login');
          
        } )
        .catch( err => {
          
          this.setState( { loading: false } );
          toast.error(err.message);
        } )
    } )

  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { organizationName, firstName, lastName, email, phoneNumber, password, confirmPassword, loading } = this.state;
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
                    <p>We're Committed to Service Excellence.</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                      veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                      molestiae iste.
                    </p>
                    <div className="btn-section">
                    <a className="btn-Started" href="#!">Learn More</a>
                    </div>
                  </div>
                </MDBCol>

                <MDBCol md="6" xl="5" className="loginForm mb-5">
                  <MDBCard className="account-form">
                    <MDBCardBody className="z-depth-2">
                      <h4 className="text-center text-heading">
                        <strong>Create your free OEP account!</strong>
                      </h4>

                      {loaderElement}
                      <ToastContainer />
                        
                      <form className="grey-textneeds-validation" onSubmit={this.submitHandler} noValidate>
                        <MDBRow>
                          <MDBCol md="12">
                            <MDBInput type="text" id="org-name" label="Organization Name" name="organizationName" value={organizationName} onChange={this.changeHandler} required>
                              <div className="invalid-feedback">
                                Organization name is required.
                              </div>
                            </MDBInput>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol md="6">
                            <MDBInput type="text" id="first-name" label="Contact person first name" name="firstName" value={firstName} onChange={this.changeHandler} required>
                              <div className="invalid-feedback">
                                First name is required.
                              </div>
                            </MDBInput>
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput type="text" id="last-name" label="Contact person last name" name="lastName" value={lastName} onChange={this.changeHandler} required>
                              <div className="invalid-feedback">
                                Last name is required.
                              </div>
                            </MDBInput>
                          </MDBCol>
                        </MDBRow>
                        
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput type="text" id="phoneNumber" label="Phone number" name="phoneNumber" value={phoneNumber} onChange={this.changeHandler} required>
                              <div className="invalid-feedback">
                                Phone number is required.
                              </div>
                            </MDBInput>
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput type="email" name="email" value={email} onChange={this.changeHandler} id="email" label="Email address *" required>
                            <div className="invalid-feedback">
                            Email-id is required.
                            </div>
                          </MDBInput>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput type="password" name="password" value={password} onChange={this.changeHandler} id="password" label="Password *" required>
                            <div className="invalid-feedback">
                              Password is required.
                            </div>
                          </MDBInput>
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput type="password" name="confirmPassword" value={confirmPassword} onChange={this.changeHandler} id="confirmPassword" label="Confirm Password *" required>
                            <div className="invalid-feedback">
                              Confirm password is required.
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
                      </form>
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
