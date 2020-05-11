import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commenService from '../../../core/services/commonService';
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
} from "mdbreact";
import "./ResetPassword.css";

class ResetPassword extends React.Component {
  constructor( props ){
    super( props );

    this.state = {
      newPassword: '',
      confirmPassword: '',
      token: '',
      loading: false,
      isExpanded: false
    };
  }
  componentDidMount() {
  const { match: { params } } = this.props;
    localStorage.clear();
    this.setState( { token: params.token})
    
  }
  scrollToTop = () => window.scrollTo(0, 0);
  
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const loginData = {      
      newPassword: this.state.newPassword,
      token: this.state.token
    };
    if(this.state.newPassword !== this.state.confirmPassword) {
        toast.error("Password and confirm password does not match!");
        return;
    }
    this.setState( { loading: true }, () => {
      commenService.postAPI( `auth/setup-new-password`, loginData )
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

  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  toggleLearnMore = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  render() {
    
    const { newPassword, confirmPassword, loading } = this.state;
    let moreContent = '';
    if(this.state.isExpanded)
      moreContent = <p>We will have templates ready for you and continue to add more and more templates weekly, but not all retail is the same. Therefore, we allow you to customize and create your own template for your daily needs.  The templates can be created on your website access and immediately available on your app customized and ready for you.  This can all be done for the same low price monthly and no hidden fees or EVER!!</p>
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
                          <h4 className="text-heading"><strong>Setup your password</strong></h4>
                        </div>
                        {loaderElement} 
                        <ToastContainer />                       
                        <form className="grey-text mt-5 needs-validation" onSubmit={this.submitHandler} noValidate>
                          
                          <MDBInput icon="lock" group type="password" name="newPassword" value={newPassword} onChange={this.changeHandler} id="newPassword" label="New password *" required>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please enter new password.
                            </div>
                          </MDBInput>
                          <MDBInput icon="lock" group type="password" name="confirmPassword" value={confirmPassword} onChange={this.changeHandler} id="confirmPassword" label="Confirm password *" required>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                              Please enter your confirm password.
                            </div>
                          </MDBInput>                          
                          
                          <div className="text-center mt-3 mb-2">
                            <MDBBtn className="btn-account" type="submit">Save</MDBBtn>
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

export default ResetPassword;
