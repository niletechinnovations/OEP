import React from "react";
import  { Redirect, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      loading: false,
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
            this.setState( { loading: false } );
            toast.error(res.data.message);
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
          toast.success(res.data.message);
          if(loggedInfo.data.role.toLowerCase() === 'admin')
            this.props.history.push('/admin/dashboard');
          else
            this.props.history.push('/');
        } )
        .catch( err => {
          debugger;
          toast.error(err.message);
          this.setState( { loading: false} );
        } )
    } )

  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, loggedIn, loading } = this.state;

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
            <MDBMask className="bg-mask d-flex justify-content-center align-items-center" >
              <MDBContainer>
                <MDBRow>
                  <MDBCol className="col-md-6 mt-xl-5 mb-5">
                    <div className="account-content">
                      <h1 className="">Customize your form builder</h1>
                      <p>We're Committed to Service Excellence.</p>
                      <p>Learn more about how to get the most out of OEP.</p>
                      <p>
                        Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                        veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                        molestiae iste.
                      </p>
                      <div className="btn-section">
                        <a className="btn-Started" href="#">Learn More</a>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol md="6" xl="5" className="loginForm mb-3">
                    <MDBCard className="account-form">
                      <MDBCardBody className="z-depth-2">
                        <div className="text-center">
                          <h4 className="text-heading"><strong>Log in to your account</strong></h4>
                        </div>
                        {loaderElement} 
                        <ToastContainer />                       
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
                          <div className="text-center mt-3 mb-2">
                            <MDBBtn className="btn-account" type="submit">SIGN IN</MDBBtn>
                          </div>
                          <div className="text-center text-foot">
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
