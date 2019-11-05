import React from "react";
import axios from "axios";
import  { Redirect } from 'react-router-dom';

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
import "./LoginPage.css";

class LoginPage extends React.Component {
  constructor( props ){
    super( props );

    this.state = {
      email: '',
      password: '',
      userName: '',
      loggedIn: false,
      loading: true,
      error: ''
    };
  }

  scrollToTop = () => window.scrollTo(0, 0);
  
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const ApiUrl = 'https://oep-project.herokuapp.com/v0.0';
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState( { loading: true }, () => {
      axios.post( `${ApiUrl}/auth/sign-in`, loginData )
        .then( res => {
          console.log(res);
          if ( undefined === res.data.token ) {
            this.setState( { error: res.data.message, loading: false } );
            return;
          }
  
          const { token, user } = res.data;
  
          localStorage.setItem( 'token', token );
          localStorage.setItem( 'userName', user.name );
  
          this.setState( {
            loading: false,
            token: token,
            userName: user.name,
            userEmail: user.email,
            loggedIn: true
          } )
         
        } )
        .catch( err => {
          this.setState( { error: err.response.data.message, loading: false } );
        } )
    } )

  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, loggedIn } = this.state;

    if ( loggedIn || localStorage.getItem( 'token' ) ) {
			return ( <Redirect to={`/admin/dashboard`} noThrow /> )
		} else {

      return (
        <>
        <div id="loginPage">
          <MDBView>
            <MDBMask className="rgba-indigo-strong d-flex justify-content-center align-items-center" >
              <MDBContainer>
                <MDBRow>
                  <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                    <h2 className="display-5 font-weight-bold mt-5">Customize your form builder</h2>
                    <hr className="hr-light" />
                    <p>We're Committed to Service Excellence.</p>
                    <p>Learn more about how to get the most out of OEP.</p>
                    <p>
                      Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                      veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                      molestiae iste.
                    </p>
                    <MDBBtn outline color="white">
                      Learn More
                    </MDBBtn>
                  </div>
                  <MDBCol md="6" xl="5" className="loginForm mb-3">
                    <MDBCard >
                      <MDBCardBody className="z-depth-2">
                        <div className="text-center">
                          <h4 className="text-heading"><strong>Log in to your account</strong></h4>
                        </div>
                        <hr />
                        <form className="grey-text mt-5 needs-validation" onSubmit={this.submitHandler} noValidate>
                          <MDBInput icon="envelope" group type="email" name="email" value={email} onChange={this.changeHandler} id="email" label="Your email" required>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please enter your registered email-id.
                            </div>
                          </MDBInput>
                          <MDBInput icon="lock" group type="password" name="password" value={password} onChange={this.changeHandler} id="password" label="Password *" required>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please enter your registered password.
                            </div>
                          </MDBInput>
                          
                          <MDBRow className="d-flex align-items-center">
                            <MDBCol md="7" className="d-flex align-items-start">
                              <MDBInput label={ <>Keep me signed in</> } type='checkbox' id='checkbox1' />
                            </MDBCol>
                            <MDBCol md="5" className="d-flex justify-content-end">
                              <p className="font-small pt-3">
                                <a href="#!" className="ml-1">Forgot Password?</a>
                            </p>
                            </MDBCol>
                          </MDBRow>
                          <div className="text-center mt-3">
                            <MDBBtn color="amber" type="submit">SIGN IN</MDBBtn>
                          </div>
                          <div className="text-center mt-5">
                          <p>Don't have an account? <a href="/register">Sign Up</a></p>
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
}

export default LoginPage;
