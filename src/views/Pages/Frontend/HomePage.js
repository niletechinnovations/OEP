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
  constructor(props) {
      super(props)
      this.downloadAPP = React.createRef()  
  }
  scrollToDownloadAPPSection = () =>  window.scrollTo(0, this.downloadAPP.current.offsetTop);
  scrollToTop = () => window.scrollTo(0, 0);
  render() {
    return (
      <>
      <MDBView className="home-bg">
      <MDBMask className="gradient"></MDBMask>
        <MDBCarousel activeItem={1} length={2} showControls={false} showIndicators={false} className="z-depth-1 home-slider" slide>
          <MDBCarouselInner>            
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img className="d-block w-100" src="/images/site-inspection-1.jpg" alt="Store Inspection" />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img className="d-block w-100" src="/images/store-inspection-1.jpg" alt="Store Inspection" />
              </MDBView>
            </MDBCarouselItem>
          </MDBCarouselInner>
          <div className="homepage-search-bar">  
            
            
              <MDBContainer>
                <MDBRow>
                <MDBCol className="col-lg-6 col-md-6 mt-xl-5">
                  <div className="main-slider-content">
                      <h1 className="">
                      OEP will be the platform to help you inspect what you expect{" "}
                      </h1>
                      {/*<p className="">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </p>*/}
                      <div className="btn-section">
                        <Link className="btn-Started" to="/register">
                        Get Started for FREE
                        </Link>
                        <button className="btn-Download" onClick={this.scrollToDownloadAPPSection}>
                          Download APP
                        </button>
                      </div>
                    </div>    
                </MDBCol>
                <MDBCol lg="6" md="6" xl="5" className="mt-xl-5">
                  <img src="/images/admin-new.png" alt="" className="img-fluid" />
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
                    Why OEP Retail?
                  </h2>
                  
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
                      <h5 className="mb-3">Helps you deliver the basics consistently.</h5>
                      <p>
                        OEP will help you deliver the basics on a daily and hourly basis. The power of fundamentals in any business will drive your bottom line and customer experience.
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="1">
                      <MDBIcon icon="share" size="lg" className="icon-arrow" />
                    </MDBCol>
                    <MDBCol xl="10" md="11" size="10" className="why-col">
                      <h5 className="mb-3">Improve your day to day processes.</h5>
                      <p>
                        Improving your daily processes will help drive consistency in your business and allow you the agile flexibility to improve daily.
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="1">
                      <MDBIcon icon="share" size="lg" className="icon-arrow" />
                    </MDBCol>
                    <MDBCol xl="10" md="11" size="10" className="why-col">
                      <h5 className="mb-3">Reaching your FULL potential.</h5>
                      <p>
                        The power of basic fundamentals in any business will enhance the customer experience and your bottom line. The key is consistently perform these basics to reach your full potential. OEP will help you your team.
                      </p>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>  
        </div>
        <section className="my-4 pb-2 ">
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
                    <h3>Take Action</h3>
                    <p>The most important step is to start and take action on how to improve on a daily basis. OEP retail will help you begin and allow you the flexibility to gradually increase your focus.</p>
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
                    <h3>Daily Walks</h3>
                    <p>Daily walks are inspections incorporated into your normal daily routine, but these walks are now recorded and can be shared as needed with OEP retail.</p>
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
                    <h3>Team Oriented</h3>
                    <p>OEP Retail allows you to include your internal team in the walks/inspections and your external leaders with the simple features of emailing, texting or sharing the information.</p>
                    <a className="read-more-btn" href="#!">Read More</a>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
        
        
      <section className="text-center features-section my-5 pb-5 exploreMargin-adjust">
        <MDBContainer>
          <div className="heading-title">
            <h2 className="my-3">
              Explore Our Features
            </h2>
          </div>
          <MDBRow className="text-center">
            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
              <MDBView className="overlay rounded z-depth-1" waves>
                <img
                  src="/images/endless-paper.jpg" alt="" className="img-fluid"
                />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
              <MDBCardBody className="pb-0 features-card cardContent">
                <h4>Make your office a smart office</h4>
                <p>
                  No more paper or endless filing in a dusty cabinet or binder that no one ever reviews.
                </p>
                <Link className="btn-Started btnKeyFeatures" to="/">
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
              <MDBCardBody className="pb-0 features-card cardContent">
                <h4>Generate instant, professional reports</h4>
                <p>
                  Real time reports to make quick and effective decisions for you and your teams.
                </p>
                <Link className="btn-Started btnKeyFeatures" to="/">
                  Learn more
                </Link>
              </MDBCardBody>
            </MDBCol>
            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
              <MDBView className="overlay rounded z-depth-1" waves>
                <img
                  src="/images/58.jpg"
                  alt=""
                  className="img-fluid"
                />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
              <MDBCardBody className="pb-0 features-card cardContent">
                <h4>Get a bird’s eye view with analytics</h4>
                <p>
                  Use data analytics along with your experience to improve your business quickly and effectively.
                </p>
                <Link className="btn-Started btnKeyFeatures" to="/">
                  Learn more
                </Link>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
          </MDBContainer>
        </section>

        <div className="streak streak-md download-section" ref={this.downloadAPP}>
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
                    <a href="https://apps.apple.com/us/app/retail-oep/id1501693671?ls=1" className="download-btn" target="_blank"  rel="noopener noreferrer">
                      <MDBIcon fab icon="apple" />
                      <p><small>Download On</small><br /> App Store</p>
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.oep&hl=en" target="_blank"  rel="noopener noreferrer" className="download-btn hover-active">
                      <MDBIcon fab icon="google-play" />
                      <p><small>Get It On</small><br /> Google Play</p>
                    </a>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
        {/*<section className="product-counter-section py-5">
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
        </section>*/}

      </>
    );
  }
}

export default HomePage;
