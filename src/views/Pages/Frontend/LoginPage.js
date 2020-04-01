import React from "react";
import  { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commonService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';


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
  MDBModal,  
  MDBModalBody,  
  MDBIcon
} from "mdbreact";
import "./LoginPage.css";
import VerifyOtp from './VerifyOtp';
var CryptoJS = require("crypto-js");

class LoginPage extends React.Component {
  constructor( props ){
    super( props );

    this.state = {
      email: '',
      password: '',
      userName: '',
      forgotPasswordEmail: "",
      modal: false,
      loggedIn: false,
      loading: false,
      isExpanded: false,
      isLoggedIn: false,
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
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };    this.setState( { loading: true }, () => {
	commonService.postAPI( `auth/sign-in`, loginData )
	.then( res => {
	 
	  console.log(res);
	  if ( undefined === res.data || !res.data.status ) {
	    this.setState( { loading: false } );
	    toast.error(res.data.message);
	    if(!res.data.status) {
	      if(res.data.isAccountVerified !== undefined && !res.data.isAccountVerified) {
	        this.setState( { loading: true, isLoggedIn: true }, () => {
	          commonService.postAPI( `auth/resend-otp`, {email: this.state.email} )
	            .then( res => {
	             
	              console.log(res);
	              if ( undefined === res.data || !res.data.status ) {
	                this.setState( { loading: false} );
	                toast.error(res.data.message);
	                return;
	              }
	              this.setState( { loading: false } );
	              toast.success(res.data.message);            
	            } )
	            .catch( err => {
	              
	              this.setState( { loading: false } );
	              toast.error(err.message);
	            } )
	        } )
	      }
	    }
	    return;
	  }

	  const loggedInfo = res.data;
	  
	  localStorage.setItem( 'accessToken', CryptoJS.AES.encrypt(loggedInfo.data.accessToken, 'OEPENCRYPTION@12345').toString());
	  localStorage.setItem( 'refreshToken', CryptoJS.AES.encrypt(loggedInfo.data.refreshToken, 'OEPENCRYPTION@12345').toString());
	  localStorage.setItem( 'role', CryptoJS.AES.encrypt(loggedInfo.data.role, 'OEPENCRYPTION@12345').toString());
	  localStorage.setItem( 'profilePic', loggedInfo.data.profilePic );
	  localStorage.setItem( 'userName', loggedInfo.data.firstName );
	  if(loggedInfo.data.role.toLowerCase() === 'organization') 
	    commonService.setIsSubscribe(loggedInfo.data.isActivePlan);

	  this.setState( {
	    loading: false,              
	    loggedIn: true
	  } )
	  toast.success(res.data.message);
	  /*if(loggedInfo.data.role.toLowerCase() === 'admin')
	    this.props.history.push('/admin/dashboard');
	  else if(loggedInfo.data.role.toLowerCase() === 'organization')
	    this.props.history.push('/organization/dashboard');
	  else
	    this.props.history.push('/');*/
	} )
	.catch( err => {
	  
	  toast.error(err.message);
	  this.setState( { loading: false} );
	} )
   } )

  };

  validateForm() {
    let errors = {};
    let formIsValid = true;
    if (!this.state.password) {
        formIsValid = false;
        errors["password"] = "*Please enter password.";
    }
    if (!this.state.email) {
        formIsValid = false;
        errors["email"] = "*Please enter your email.";
    }
    
   
    
    this.setState({
      loading: false,
      errors: errors
    });
    
    return formIsValid;
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /*Handle Forgot Password Field*/
  changeForgotPasswordHandler = event => {

    this.setState({ [event.target.name]: event.target.value });
  }
  /*Forgot Password */
  submitForgotPasswordHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const forgotData = {
      email: this.state.forgotPasswordEmail
    };
    this.setState( { loading: true }, () => {
      commonService.postAPI( `auth/forgot-password`, forgotData )
        .then( res => {
         
          console.log(res);
          if ( undefined === res.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          } 
  
          this.setState( {
            loading: false,
            modal: false
          } )
          toast.success(res.data.message);          
        } )
        .catch( err => {          
          toast.error(err.message);
          this.setState( { loading: false} );
        } )
    } )
  }
  /*Hide Modal*/
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      forgotPasswordEmail: ""
    });
  }

  toggleLearnMore = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  render() {
    const { email, password, loggedIn, loading, forgotPasswordEmail, errors} = this.state;

    if ( loggedIn || localStorage.getItem( 'accessToken' ) ) {
      if(CryptoJS.AES.decrypt(localStorage.getItem("role"), 'OEPENCRYPTION@12345').toString(CryptoJS.enc.Utf8) === "admin")
			  return ( <Redirect to={`/admin/dashboard`} noThrow /> )
      else if(CryptoJS.AES.decrypt(localStorage.getItem("role"), 'OEPENCRYPTION@12345').toString(CryptoJS.enc.Utf8) === "organization") {
        if(!commonService.getIsSubscribe())
          return ( <Redirect to={`/subscription-plan`} noThrow /> )
        else
          return ( <Redirect to={`/organization/dashboard`} noThrow /> )
      }
      else
        return ( <Redirect to={`/`} noThrow /> )

		} else {
    let loaderElement = '';
    let moreContent = '';
    if(this.state.isExpanded)
      moreContent = <p>We will have templates ready for you and continue to add more and more templates weekly, but not all retail is the same. Therefore, we allow you to customize and create your own template for your daily needs.  The templates can be created on your website access and immediately available on your app customized and ready for you.  This can all be done for the same low price monthly and no hidden fees or EVER!!</p>
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
                      <h1 className="">Customize your Template</h1>
                      <p>We provide the basic templates for the world to get you started in the right direction. If you need more details in your business, you can also develop the template for your precise needs, we will help you do this.
                      </p>
                      {moreContent}
                      <div className="btn-section">
                        <button className="btn-Started" onClick={this.toggleLearnMore}>{this.state.isExpanded ? 'Hide':'Read More'}</button>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol md="6" xl="5" className="loginForm mb-3">
                    <MDBCard className="account-form">
                      <MDBCardBody className="z-depth-2">
                        <div className="text-center">
                          <h4 className="text-heading"><strong>{!this.state.isLoggedIn ? `Log in to your account`: `Otp Verification` }</strong></h4>
                        </div>
                        {loaderElement} 
                        {!this.state.isLoggedIn ?            
                          <form className="grey-text mt-5 needs-validation" onSubmit={this.submitHandler} noValidate>
                            
                            <MDBInput icon="envelope" group type="email" name="email" invalid={errors['email'] !== undefined && errors['email'] !== ""} value={email} onChange={this.changeHandler} id="email" label="Your email" required>
                              <div className="valid-feedback">Looks good!</div>
                              <div className="invalid-feedback">
                                Please enter your registered email-id.
                              </div>
                            </MDBInput>
                            <MDBInput icon="lock" group type="password" name="password" invalid={errors['password'] !== undefined && errors['password'] !== ""} value={password} onChange={this.changeHandler} id="password" label="Password *" required>
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
                                <p className="Forgot-text pt-3">
                                  <a onClick={this.toggle} href="#!" className="ml-1">Forgot Password?</a>
                                   
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
                           : <VerifyOtp email = {this.state.email} page="login" />}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>

                </MDBRow>
              </MDBContainer>
              <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg" className="cascading-modal forgot-password-modal">
                <h2>Forgot Password</h2>
                <MDBBtn onClick={this.toggle} className="close">
                  <MDBIcon icon="times" />
                </MDBBtn>
                <form className="grey-text needs-validation" onSubmit={this.submitForgotPasswordHandler} >
                  <MDBModalBody>
                      <MDBRow>
                        <MDBCol md="12">      
                          <MDBInput icon="envelope" group type="email" name="forgotPasswordEmail" value={forgotPasswordEmail} onChange={this.changeForgotPasswordHandler} id="forgot_email" label="Your email" required>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please enter your registered email-id.
                            </div>
                          </MDBInput>   
                        </MDBCol>
                        <MDBCol md="12" className="text-center">
                          <MDBBtn className="btn-account" type="submit">Forgot</MDBBtn>
                         
                        </MDBCol>
                      </MDBRow>  
                  </MDBModalBody>
                </form>
              </MDBModal>
            </MDBMask>
          </MDBView>
        </div>  
        </>
      );
    }
  }
}

export default LoginPage;
