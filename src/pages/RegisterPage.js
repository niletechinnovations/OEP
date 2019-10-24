import React from "react";
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
import "./RegisterPage.css";

class LoginPage extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);
  render() {
    return (
      <>
      <div id="loginPage">
        <MDBView>
          <MDBMask className="rgba-indigo-strong d-flex justify-content-center align-items-center" >
            <MDBContainer>
              <MDBRow>
                <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                  <h2 className="display-5 font-weight-bold mt-5">Why Join OEP?</h2>
                  <hr className="hr-light" />
                  <p>We're Committed to Service Excellence.</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                    veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                    molestiae iste.
                  </p>
                  <MDBBtn outline color="white">
                    Learn More
                  </MDBBtn>
                </div>
                <MDBCol md="6" xl="5" className="loginForm mb-3">
                  <MDBCard className="white-text">
                    <MDBCardBody className="z-depth-2">
                      <h4 className="white-text text-center text-heading">
                        <strong>Create your free OEP account!</strong>
                      </h4>
                      <hr />
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput type="text" id="first-name" label="First Name" />
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput type="text" id="last-name" label="Last Name" />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput type="text" id="phone" label="Your Phone" />
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput type="email" id="email" label="Your email" />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput type="password" id="password" label="Password *" />
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput type="password" id="confirm-password" label="Confirm Password" />
                        </MDBCol>
                      </MDBRow>
                        
                      <div className="text-center mt-3 black-text">
                        <MDBBtn color="amber" type="submit">SIgn Up</MDBBtn>
                      </div>
                      <div className="text-center mt-5">
                        <p>Already have an account? <a href="/register">Log in</a></p>
                      </div>
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

export default LoginPage;
