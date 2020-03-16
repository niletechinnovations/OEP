import React from "react";
import { toast } from 'react-toastify';
import commenService from '../../../core/services/commonService';
import Loader from '../../Loader/Loader';


import {
  MDBView,
  MDBContainer,
  MDBCol,
  MDBRow,  
  MDBMask,
} from "mdbreact";
import "./ResetPassword.css";

class VerifyEmail extends React.Component {
  constructor( props ){
    super( props );

    this.state = {
      newPassword: '',
      confirmPassword: '',
      token: '',
      loading: false,
    };
  }
  componentDidMount() {
  const { match: { params } } = this.props;
    localStorage.clear();
    this.setState( { token: params.token})
    this.setState( { loading: true }, () => {
      commenService.getAPI( `auth/verify-email/${this.state.token}` )
        .then( res => {
         
          console.log(res);
          if ( undefined === res.data || !res.data.status ) {
            this.setState( { loading: false } );
            toast.error(res.data.message);
            return;
          }
          this.setState( {
            loading: false
          } )
          toast.success(res.data.message);
          this.props.history.push('/login');
        } )
        .catch( err => {          
          toast.error(err.message);
          this.setState( { loading: false} );
        } )
    } )
    
  }
  scrollToTop = () => window.scrollTo(0, 0);
  
  

  render() {
    
    const { loading } = this.state;
     
  
    if(loading)
      return (<Loader />)
      return (
        <>
        <div id="loginPage">
          <MDBView>
            <MDBMask className="bg-mask d-flex justify-content-center align-items-center" >
              <MDBContainer>
                <MDBRow>
                  <MDBCol className="col-md-12 mt-xl-5 mb-5">
                    <div className="account-content">
                      <h1 className="">Email Verification</h1>
                      
                      <p>
                        Your email verified successfully
                      </p>
                      
                    </div>
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

export default VerifyEmail;
