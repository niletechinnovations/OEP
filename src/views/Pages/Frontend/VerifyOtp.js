import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';

import {
  MDBCol,
  MDBRow,
  MDBBtn
} from "mdbreact";
import commonService from '../../../core/services/commonService';
import "./VerifyOtp.css";
var CryptoJS = require("crypto-js");
var emailAddress = '';

export default class VerifyOtp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          otp: "",
          loading: false,
          loggedIn: false
       };
       this.changeHandler = this.changeHandler.bind(this);
       this.resendOtp = this.resendOtp.bind(this);
       this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler = otp => {
      this.setState({ otp : otp });
    };

    submitHandler = event => {
      event.preventDefault();
      event.target.className += " was-validated";
      const verifyData = {
        otp: this.state.otp,
        email: emailAddress,
        
      };
      this.setState( { loading: true }, () => {
        commonService.postAPI( `auth/verify-otp`, verifyData )
          .then( res => {
           
            console.log(res);
            if ( undefined === res.data || !res.data.status ) {
              this.setState( { loading: false} );
              toast.error(res.data.message);
              return;
            }
            toast.success(res.data.message);
            const loggedInfo = res.data;
          
            localStorage.setItem( 'accessToken', CryptoJS.AES.encrypt(loggedInfo.data.accessToken, 'OEPENCRYPTION@12345').toString());
            localStorage.setItem( 'refreshToken', CryptoJS.AES.encrypt(loggedInfo.data.refreshToken, 'OEPENCRYPTION@12345').toString());
            localStorage.setItem( 'role', CryptoJS.AES.encrypt(loggedInfo.data.role, 'OEPENCRYPTION@12345').toString());
            localStorage.setItem( 'isProfileCompleted', CryptoJS.AES.encrypt(loggedInfo.data.isProfileCompleted, 'OEPENCRYPTION@12345').toString());
            localStorage.setItem( 'authId', CryptoJS.AES.encrypt(loggedInfo.data.authId, 'OEPENCRYPTION@12345').toString());
            localStorage.setItem( 'profilePic', loggedInfo.data.profilePic );
            localStorage.setItem( 'userName', loggedInfo.data.firstName );
            commonService.setIsSubscribe(false);
    
            this.setState( {
              loading: false,              
              loggedIn: true
            } )
            //this.props.history.push('/login');
            
          } )
          .catch( err => {
            
            this.setState( { loading: false } );
            toast.error(err.message);
          } )
      } )

    };

    resendOtp = event => {
      event.preventDefault();
      const verifyData = {
        email: emailAddress        
      };
      this.setState( { loading: true }, () => {
        commonService.postAPI( `auth/resend-otp`, verifyData )
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
      
    
    
    render() {
      if ( this.state.loggedIn  ) {
        if(CryptoJS.AES.decrypt(localStorage.getItem("role"), 'OEPENCRYPTION@12345').toString(CryptoJS.enc.Utf8) === "admin")
          return ( <Redirect to={`/admin/dashboard`} noThrow /> )
        else if(CryptoJS.AES.decrypt(localStorage.getItem("role"), 'OEPENCRYPTION@12345').toString(CryptoJS.enc.Utf8) === "organization")
          return ( <Redirect to={`/subscription-plan`} noThrow /> )
        else
          return ( <Redirect to={`/`} noThrow /> )

      }
      let loaderElement = '';
      if(this.state.loading)
        loaderElement = <Loader />
      emailAddress = this.props.email;
      return (
        <div className="Verify-otp-component">
          {loaderElement}
          <form className="grey-textneeds-validation" onSubmit={this.submitHandler} noValidate>
            <MDBRow>
              <MDBCol md="12">
                <OtpInput className="otp-input-field"
                  onChange={this.changeHandler}
                  inputStyle = "otp-input-field"
                  containerStyle = "otp-container-input"
                  numInputs={6}
                  value = {this.state.otp}
                  separator={<span>-</span>}
                 />
              </MDBCol>
            </MDBRow>
              
            <div className="text-center mt-3 mb-3 black-text">
              <MDBBtn className="btn-account" type="submit">Verify</MDBBtn>
            </div>
            <div className="text-center text-foot">
              <p><MDBBtn type="button" onClick={this.resendOtp}>Resend Otp</MDBBtn></p>
              <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
          </form>
          
        </div>
      );
    }
}
