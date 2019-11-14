import React from 'react';
import { 
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon } from 'mdbreact';
import './FrontEndFooter.css';

const frontEndFooter = () => {
    return (
        <MDBFooter  className="footer-section">
          <MDBContainer className="foot-padding text-center text-md-left">
            <MDBRow>
              <MDBCol md="4">
                <div className="foot-content">
                  <img
                    src="images/logo.png"
                    alt=""
                    height="60"
                  />
                  <p>Laapp, a carefully crafted and powerful HTML5 template, it's perfect to showcase your App or Startup</p>
                </div>
              </MDBCol>
              <MDBCol md="2">
                <nav className="flex-column foot-nav">
                  <a href="#!" className="py-2 text-contrast nav-link">About</a>
                  <a href="#!" className="py-2 text-contrast nav-link">Contact us</a>
                  <a href="#!" className="py-2 text-contrast nav-link">Blog</a>
                </nav>
              </MDBCol>
              <MDBCol md="2">
                <nav className="flex-column foot-nav">
                  <a href="#!" className="py-2 text-contrast nav-link">Privacy Policy</a>
                  <a href="#!" className="py-2 text-contrast nav-link">Terms & Conditions</a>
                  <a href="#!" className="py-2 text-contrast nav-link">FAQ's</a>
                </nav>
              </MDBCol>

              <MDBCol md="2">
                <nav className="flex-column foot-nav">
                  <a href="#!" className="py-2 text-contrast nav-link">Templates</a>
                  <a href="#!" className="py-2 text-contrast nav-link">Resources</a>
                  <a href="#!" className="py-2 text-contrast nav-link">Integrations</a>
                </nav>
              </MDBCol>
              <MDBCol md="2">
                  <h2 className="fot-title">Follow us</h2>
                  <ul className="social-links">
                    <li>
                      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <MDBIcon fab icon="facebook"/>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                        <MDBIcon fab icon="twitter"/>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <MDBIcon fab icon="linkedin"/>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <MDBIcon fab icon="instagram"/>
                      </a>
                    </li>
                  </ul>
              </MDBCol>

            </MDBRow>
          </MDBContainer>
      <div className="footer-copyright text-center py-1">
        <MDBContainer>
          <MDBRow className="d-flex align-items-center">
              <MDBCol md="12">
                <p className="text-center  mt-2">
                Copyright &copy; {new Date().getFullYear()} OEP - All Rights Reserved. &nbsp;
                Powered by: <a href="https://www.niletechnologies.com/" target="_blank" rel="noopener noreferrer">Nile Technologies</a>
                </p>
              </MDBCol>
            </MDBRow>
        </MDBContainer>
      </div>
    </MDBFooter>
        
    );
}

export default frontEndFooter;