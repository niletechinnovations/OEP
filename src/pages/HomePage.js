import React from "react";
import { Link } from 'react-router-dom';

import {
  MDBCarousel, MDBCarouselInner, MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBCol,
  MDBRow,  
  MDBIcon,
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
                <MDBCol className="col-md-6 mt-xl-5 mb-5">
                  <div className="main-slider-content">
                      <h1 className="">
                      Inspections are just the beginning{" "}
                      </h1>
                      <p className="">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                        veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                        molestiae iste.
                      </p>
                      <div className="btn-section">
                        <Link className="btn-Started" to="/register">
                        Get Started for FREE
                        </Link>
                        <Link className="btn-Download">
                          Download APP
                        </Link>
                      </div>
                    </div>    
                </MDBCol>
                <MDBCol md="6" xl="5" className="mt-xl-5">
                  <img
                    src="/images/admin-new.png"
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
          <section className="my-4 why-section">
            <MDBContainer> 
                <div className="heading-title"> 
                  <h2 className="my-3">
                    Why is it so great?
                  </h2>
                  <p className="lead grey-text w-responsive text-center mx-auto mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt
                  </p>
                </div>
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
                      <MDBIcon icon="share" size="lg" className="icon-arrow" />
                    </MDBCol>
                    <MDBCol xl="10" md="11" size="10" className="why-col">
                      <h5 className="mb-3">Start with the basics</h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        enim ad minima veniam, quis nostrum exercitationem ullam.
                        Reprehenderit maiores aperiam assumenda deleniti hic.
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="1">
                      <MDBIcon icon="share" size="lg" className="icon-arrow" />
                    </MDBCol>
                    <MDBCol xl="10" md="11" size="10" className="why-col">
                      <h5 className="mb-3">Improve your processes</h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        enim ad minima veniam, quis nostrum exercitationem ullam.
                        Reprehenderit maiores aperiam assumenda deleniti hic.
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="1">
                      <MDBIcon icon="share" size="lg" className="icon-arrow" />
                    </MDBCol>
                    <MDBCol xl="10" md="11" size="10" className="why-col">
                      <h5 className="mb-3">Reach your full potential</h5>
                      <p>
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
        <section className="my-5 pt-5 pb-2 ">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="4" className="md-0 mb-5">
                <div className="single-featured-box">
                    <div className="icon">
                        <img
                          src="/images/actions.svg"
                          alt=""
                          height="70"
                        />
                    </div>
                    <h3>Actions</h3>
                    <p>Lorem ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p>
                    <a className="read-more-btn" href="#!">Read More</a>
                </div>
              </MDBCol>

              <MDBCol md="4" className="md-0 mb-5">
                <div className="single-featured-box">
                    <div className="icon">
                        <img
                          src="/images/Inspections.svg"
                          alt=""
                          height="70"
                        />
                    </div>
                    <h3>Inspections</h3>
                    <p>Lorem ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p>
                    <a className="read-more-btn" href="#!">Read More</a>
                </div>
              </MDBCol>

              <MDBCol md="4" className="md-0 mb-5">
                <div className="single-featured-box">
                    <div className="icon">
                        <img
                          src="/images/team.svg"
                          alt=""
                          height="70"
                        />
                    </div>
                    <h3>Team Management</h3>
                    <p>Lorem ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p>
                    <a className="read-more-btn" href="#!">Read More</a>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        
        
      <section className="text-center features-section my-5 pb-5">
        <MDBContainer>
          <div className="heading-title">
            <h2 className="my-3">
              Explore our features
            </h2>
          </div>
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
              <MDBCardBody className="pb-0 features-card">
                <h4>Get everyone on the same paperless page</h4>
                <p>
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae.
                </p>
                <Link className="btn-Started" to="/">
                  Learn more
                </Link>
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
              <MDBCardBody className="pb-0 features-card">
                <h4>Generate instant, professional reports</h4>
                <p>
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae.
                </p>
                <Link className="btn-Started" to="/">
                  Learn more
                </Link>
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
              <MDBCardBody className="pb-0 features-card">
                <h4>Get a bird’s eye view with analytics</h4>
                <p>
                  Temporibus autem quibusdam et aut officiis debitis aut rerum
                  necessitatibus saepe eveniet ut et voluptates repudiandae.
                </p>
                <Link className="btn-Started" to="/">
                  Learn more
                </Link>
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
                    <MDBRow>
                      <MDBCol md="4" sm="4">
                        <div className="counter-card">
                          <div className="counter-value blue-text">145052</div>
                          <h2 className="counter-text">Downloads</h2>
                        </div>
                      </MDBCol>
                      <MDBCol md="4" sm="4">
                        <div className="counter-card">
                          <div className="counter-value green-text">4400</div>
                          <h2 className="counter-text">Active Installs</h2>
                        </div>
                      </MDBCol>
                      <MDBCol md="4" sm="4">
                        <div className="counter-card">
                          <div className="counter-value yellow1-text">5000</div>
                          <h2 className="counter-text">Paid Users</h2>
                        </div>
                      </MDBCol>
                    </MDBRow>
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
