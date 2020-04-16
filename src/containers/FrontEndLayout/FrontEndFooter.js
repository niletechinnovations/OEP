import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon } from 'mdbreact';
import './FrontEndFooter.css';
import logo from "../../assets/logo.svg";
const frontEndFooter = () => {
    return (
        <MDBFooter  className="footer-section">
          <MDBContainer className="foot-padding text-center text-md-left">
            <MDBRow>
              <MDBCol md="4">
                <div className="foot-content">
                  <img src={logo} alt="OEP" height="60" />
                  <p>OEP Retail is the Operational Excellence Platform for all your retail needs. The platform is 20 plus years in the making from actual retail walks and processes. Built by an operational retailer for retailers just like you.</p>
                </div>
              </MDBCol>
              <MDBCol md="2">
                <nav className="flex-column foot-nav">
                  <Link to="/about-us" className="py-2 text-contrast nav-link">About us</Link>
                  <Link to="/contact-us" className="py-2 text-contrast nav-link">Contact us</Link>
                </nav>
              </MDBCol>
              <MDBCol md="2">
                <nav className="flex-column foot-nav">
                  <Link to="/privacy-policy" className="py-2 text-contrast nav-link">Privacy Policy</Link>
                  <Link to="/terms-of-service" className="py-2 text-contrast nav-link">Terms & Conditions</Link>
                  
                  {/*<a href="#!" className="py-2 text-contrast nav-link">FAQ's</a>*/}
                </nav>
              </MDBCol>

              
              <MDBCol md="4">
                  <h2 className="fot-title">Follow us</h2>
                  <ul className="social-links">
                    <li>
                      <a href="https://www.facebook.com/Retail-OEP-100654928254091/?modal=admin_todo_tour" target="_blank" rel="noopener noreferrer">
                        <MDBIcon fab icon="facebook"/>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/OepRetail" target="_blank" rel="noopener noreferrer">
                        <MDBIcon fab icon="twitter"/>
                      </a>
                    </li>                    
                    <li>
                      <a href="https://www.instagram.com/oepretail/" target="_blank" rel="noopener noreferrer">
                        <MDBIcon fab icon="instagram"/>
                      </a>
                    </li>
                  </ul>
                  <a href="mailto:support.retailoep.com" className="py-2 text-contrast p-align"><i className="fa fa-envelope"></i> support@retailoep.com</a>
                  <div className="branding-logo-footer"><p><strong>Powered By:</strong></p><img src = "http://retailoep.com/images/OEP_Retail_Tech.jpg" alt="OEP Retail Tech" width ="170" /></div>
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