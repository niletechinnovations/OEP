import React from "react";
import  { Redirect, Link } from 'react-router-dom';

import commenService from '../core/services/commonService';
import Loader from '../components/loader';
import {
  MDBView,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBMask,
  MDBCard,
  MDBAlert
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
      loading: false,
      error: '',
      alertColor: '',
      alertClassName: 'd-none'
    };
  }

  scrollToTop = () => window.scrollTo(0, 0);
  
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState( { loading: true }, () => {
      commenService.postAPI( `auth/sign-in`, loginData )
        .then( res => {
         
          console.log(res);
          if ( undefined === res.data || !res.data.status ) {
            this.setState( { error: res.data.message, loading: false, alertColor: 'danger', alertClassName: '' } );
            return;
          }
  
          const loggedInfo = res.data;
          
          localStorage.setItem( 'accessToken', loggedInfo.data.accessToken );
          localStorage.setItem( 'refreshToken', loggedInfo.data.refreshToken );
          localStorage.setItem( 'role', loggedInfo.data.role );
          localStorage.setItem( 'userName', loggedInfo.data.firstName );
  
          this.setState( {
            loading: false,              
            loggedIn: true
          } )
          
          if(loggedInfo.data.role.toLowerCase() === 'admin')
            this.props.history.push('/admin/dashboard');
          else
            this.props.history.push('/');
        } )
        .catch( err => {
          
          this.setState( { error: err.message, loading: false, alertColor: 'danger', alertClassName: '' } );
        } )
    } )

  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, loggedIn, loading, error, alertColor, alertClassName } = this.state;

    if ( loggedIn || localStorage.getItem( 'token' ) ) {
			return ( <Redirect to={`/admin/dashboard`} noThrow /> )
		} else {
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />
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
                        {loaderElement}
                        <MDBAlert color={alertColor} className={ alertClassName}>
                         {error}
                        </MDBAlert>
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
                          <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
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
