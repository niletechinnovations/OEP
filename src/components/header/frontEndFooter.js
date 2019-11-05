import React from 'react';
import logo from "../../assets/mdb-react-small.png";
import { MDBNavItem,
  MDBNavLink,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import './frontEndFooter.css';

const frontEndFooter = () => {
    return (
        <MDBFooter color="mdb-color darken-4">
          <MDBContainer>
            <MDBRow className="d-flex align-items-center">
              <MDBCol md="7">
                <p className="text-center text-md-left mt-2">
                Copyright &copy; {new Date().getFullYear()} OEP - All Rights Reserved.
                </p>
              </MDBCol>
              <MDBCol md="5">
                <div className="text-center text-md-right">
                  <ul className="list-unstyled list-inline social-links">
                    <li className="list-inline-item">
                     <MDBBtn floating social="fb" size="sm" href="https://www.facebook.com/" target="_blank" className="pr-1" >
                      <MDBIcon fab icon="facebook"/>
                    </MDBBtn>
                    </li>
                    <li className="list-inline-item">
                      <MDBBtn floating social="tw" size="sm" href="https://www.twitter.com/" target="_blank" className="pr-1" >
                        <MDBIcon fab icon="twitter" />
                      </MDBBtn>
                    </li>
                    <li className="list-inline-item">
                      <MDBBtn floating social="li" size="sm" href="https://www.linkedin.com/" target="_blank" className="pr-1" >
                        <MDBIcon fab icon="linkedin"/>
                      </MDBBtn>
                    </li>
                    <li className="list-inline-item">
                      <MDBBtn floating social="ins" size="sm" href="https://www.instagram.com" target="_blank" className="pr-0" >
                        <MDBIcon fab icon="instagram"/>
                      </MDBBtn>
                    </li>
                  </ul>
                  </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBFooter>
    );
}

export default frontEndFooter;