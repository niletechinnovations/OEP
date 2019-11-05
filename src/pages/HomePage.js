import React from "react";
import { Link } from 'react-router-dom';

import {
  MDBCarousel, MDBCarouselInner, MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import "./HomePage.css";

class HomePage extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);
  render() {
    return (
      <>
      <MDBView className="home-bg">
      <MDBMask className="gradient"></MDBMask>
        <MDBCarousel activeItem={1} length={3} showControls={false} showIndicators={false} className="z-depth-1 home-slider" slide>
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img className="d-block w-100" src="/images/parking-inspection.jpg" alt="Parking Inspection" />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img className="d-block w-100" src="/images/site-inspection.jpg" alt="Store Inspection" />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <img className="d-block w-100" src="/images/store-inspection.jpg" alt="Store Inspection" />
              </MDBView>
            </MDBCarouselItem>
          </MDBCarouselInner>
          <div className="homepage-search-bar">  
            
            
              <MDBContainer>
                <MDBRow>
                <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                  <h1 className="h1-responsive font-weight-bold mt-sm-5">
                  Inspections are just the beginning{" "}
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                    veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                    molestiae iste.
                  </h6>
                  <Link to="/register">
                    <MDBBtn color="amber">Get Started for FREE</MDBBtn>
                  </Link>  
                  <MDBBtn outline color="white">Download APP</MDBBtn>
                  
                </div>
                <MDBCol md="6" xl="5" className="mt-xl-5">
                  <img
                    src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
                    alt=""
                    className="img-fluid"
                  />
                </MDBCol>
              </MDBRow>
              </MDBContainer>
          </div>
          
        </MDBCarousel>
        </MDBView>  

        <div className="main-content"> 
          <section className="my-4">
            <MDBContainer>  
              <h2 className="h2-responsive font-weight-bold text-center my-3">
                Why is it so great?
              </h2>
              <p className="lead grey-text w-responsive text-center mx-auto mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </p>

              <MDBRow>
                <MDBCol lg="5" className="text-center text-lg-left">
                  <img
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Others/screens-section.jpg"
                    alt=""
                  />
                </MDBCol>
                <MDBCol lg="7">
                  <MDBRow className="mb-3">
                    <MDBCol size="1">
                      <MDBIcon icon="share" size="lg" className="indigo-text" />
                    </MDBCol>
                    <MDBCol xl="10" md="11" size="10">
                      <h5 className="font-weight-bold mb-3">Start with the basics</h5>
                      <p className="grey-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        enim ad minima veniam, quis nostrum exercitationem ullam.
                        Reprehenderit maiores aperiam assumenda deleniti hic.
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="1">
                      <MDBIcon icon="share" size="lg" className="indigo-text" />
                    </MDBCol>
                    <MDBCol xl="10" md="11" size="10">
                      <h5 className="font-weight-bold mb-3">Improve your processes</h5>
                      <p className="grey-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        enim ad minima veniam, quis nostrum exercitationem ullam.
                        Reprehenderit maiores aperiam assumenda deleniti hic.
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="1">
                      <MDBIcon icon="share" size="lg" className="indigo-text" />
                    </MDBCol>
                    <MDBCol xl="10" md="11" size="10">
                      <h5 className="font-weight-bold mb-3">Reach your full potential</h5>
                      <p className="grey-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        enim ad minima veniam, quis nostrum exercitationem ullam.
                        Reprehenderit maiores aperiam assumenda deleniti hic.
                      </p>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>  
        </div>
        <section className="my-5 pt-5 pb-2 featured-section">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="4" className="md-0 mb-5">
                <MDBCard className="p-3">
                <MDBRow>
                  <MDBCol lg="2" md="3" size="2">
                    <MDBIcon icon="bullhorn" size="2x" className="blue-text" />
                  </MDBCol>
                  <MDBCol lg="10" md="9" size="10">
                    <h4 className="font-weight-bold">Actions</h4>
                    <p className="grey-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam.
                    </p>
                    
                  </MDBCol>
                </MDBRow>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4" className="md-0 mb-5">
              <MDBCard className="p-3">
                <MDBRow>
                  <MDBCol lg="2" md="3" size="2">
                    <MDBIcon icon="cogs" size="2x" className="pink-text" />
                  </MDBCol>
                  <MDBCol lg="10" md="9" size="10">
                    <h4 className="font-weight-bold">Inspections</h4>
                    <p className="grey-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam.
                    </p>
                    
                  </MDBCol>
                </MDBRow>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4" className="md-0 mb-5">
              <MDBCard className="p-3">
                <MDBRow>
                  <MDBCol lg="2" md="3" size="2">
                    <MDBIcon icon="users" size="2x" className="purple-text" />
                  </MDBCol>
                  <MDBCol lg="10" md="9" size="10">
                    <h4 className="font-weight-bold">Team Management</h4>
                    <p className="grey-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam.
                    </p>
                   
                  </MDBCol>
                </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        
        
      <section className="text-center my-5 pb-5">
        <MDBContainer>
          <h2 className="h1-responsive font-weight-bold my-5">
            Explore our features
          </h2>
          
          <MDBRow className="text-center">
            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
              <MDBView className="overlay rounded z-depth-1" waves>
                <img
                  src="https://mdbootstrap.com/img/Photos/Others/images/58.jpg"
                  alt=""
                  className="img-fluid"
                />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
              <MDBCardBody className="pb-0">
                <h4 className="font-weight-bold my-3">Get everyone on the same paperless page</h4>
                <p className="grey-text">
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae.
                </p>
                <MDBBtn color="indigo" size="sm">
                  <MDBIcon far icon="clone" className="left" /> Learn more
                </MDBBtn>
              </MDBCardBody>
            </MDBCol>
            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
              <MDBView className="overlay rounded z-depth-1" waves>
                <img
                  src="https://mdbootstrap.com/img/Photos/Others/project4.jpg"
                  alt=""
                  className="img-fluid"
                />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
              <MDBCardBody className="pb-0">
                <h4 className="font-weight-bold my-3">Generate instant, professional reports</h4>
                <p className="grey-text">
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae.
                </p>
                <MDBBtn color="indigo" size="sm">
                  <MDBIcon far icon="clone" className="left" /> Learn more
                </MDBBtn>
              </MDBCardBody>
            </MDBCol>
            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
              <MDBView className="overlay rounded z-depth-1" waves>
                <img
                  src="https://mdbootstrap.com/img/Photos/Others/images/88.jpg"
                  alt=""
                  className="img-fluid"
                />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
              <MDBCardBody className="pb-0">
                <h4 className="font-weight-bold my-3">Get a bird’s eye view with analytics</h4>
                <p className="grey-text">
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae.
                </p>
                <MDBBtn color="indigo" size="sm">
                  <MDBIcon far icon="clone" className="left" /> Learn more
                </MDBBtn>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
          </MDBContainer>
        </section>

        <div className="streak streak-md download-section">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="5">
                <div className="download-app-img">
                  <img src="/images/download-app.png" className="img-fluid" alt="Download APP" />
                </div>
              </MDBCol>
              <MDBCol md="7">
                <div className="download-app-text">
                  <h3>Get the app today!</h3>
                  <p>Seamlessly transform timely e-commerce for diverse leadership skills. Conveniently reconceptualize go forward expertise without extensible applications.Phosfluorescently.</p>
                  <div className="download-app-button">
                    <a href="#!" className="download-btn">
                      <MDBIcon fab icon="apple" />
                      <p><small>Download On</small><br /> App Store</p>
                    </a>
                    <a href="#!" className="download-btn hover-active">
                      <MDBIcon fab icon="google-play" />
                      <p><small>Get It On</small><br /> Google Play</p>
                    </a>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
        <section className="product-counter-section py-5">
          <div className="product-counter-wrap">
            <MDBContainer>
              <MDBRow>
                <MDBCol md="5" sm="6">
                  <div className="counter-content-wrap">
                    <MDBIcon icon="trophy" />
                    <h6 className="counter-title"><strong>Trusted by 4000+</strong></h6>
                    <p>High performing team worldwide</p>
                  </div>
                </MDBCol>
                <MDBCol md="7" sm="6">
                  <ul className="counter-list list-inline text-right">
                    <li className="list-inline-item"><span className="count">145052</span><span className="title">Downloads</span></li>
                    <li className="list-inline-item"><span className="count">4400+</span><span className="title">Active Installs</span></li>
                    <li className="list-inline-item"><span className="count">5000+</span><span className="title">Paid Users</span></li>
                  </ul>
                </MDBCol>  
              </MDBRow>
            </MDBContainer>
          </div>
        </section>

      </>
    );
  }
}

export default HomePage;
