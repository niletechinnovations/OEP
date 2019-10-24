import React from "react";
import {
  MDBCarousel, MDBCarouselInner, MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon
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
                    Make purchases with our app{" "}
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                    veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                    molestiae iste.
                  </h6>
                  <MDBBtn color="white">Download</MDBBtn>
                  <MDBBtn outline color="white">
                    Learn More
                  </MDBBtn>
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
                <MDBCol md="4">
                  <MDBRow className="mb-3">
                    <MDBCol size="2">
                      <MDBIcon
                        icon="flag-checkered"
                        size="2x"
                        className="deep-purple-text"
                      />
                    </MDBCol>
                    <MDBCol size="10">
                      <h5 className="font-weight-bold mb-3">International</h5>
                      <p className="grey-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Reprehenderit maiores nam, aperiam minima assumenda.
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="2">
                      <MDBIcon icon="flask" size="2x" className="deep-purple-text" />
                    </MDBCol>
                    <MDBCol size="10">
                      <h5 className="font-weight-bold mb-3">Experimental</h5>
                      <p className="grey-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Reprehenderit maiores nam, aperiam minima assumenda deleniti.
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="2">
                      <MDBIcon icon="glass-martini" size="2x" className="deep-purple-text" />
                    </MDBCol>
                    <MDBCol size="10">
                      <h5 className="font-weight-bold mb-3">Relaxing</h5>
                      <p className="grey-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Reprehenderit maiores nam, aperiam minima assumenda deleniti.
                      </p>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol md="4" className="text-name">
                  <img
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Mockups/Transparent/Small/iphone-portfolio1.png"
                    alt=""
                  />
                </MDBCol>
                <MDBCol md="4">
                  <MDBRow className="mb-3">
                    <MDBCol size="2">
                      <MDBIcon icon="heart" size="2x" className="deep-purple-text" />
                    </MDBCol>
                    <MDBCol size="10">
                      <h5 className="font-weight-bold mb-3">Beloved</h5>
                      <p className="grey-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Reprehenderit maiores nam, aperiam minima assumenda deleniti.
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="2">
                      <MDBIcon icon="bolt" size="2x" className="deep-purple-text" />
                    </MDBCol>
                    <MDBCol size="10">
                      <h5 className="font-weight-bold mb-3">Rapid</h5>
                      <p className="grey-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Reprehenderit maiores nam, aperiam minima assumenda deleniti.
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol size="2">
                      <MDBIcon icon="magic" size="2x" className="deep-purple-text" />
                    </MDBCol>
                    <MDBCol size="10">
                      <h5 className="font-weight-bold mb-3">Magical</h5>
                      <p className="grey-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Reprehenderit maiores nam, aperiam minima assumenda deleniti.
                      </p>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>  
        </div>
            
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
