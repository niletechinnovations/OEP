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
  MDBCardBody,
  MDBModal, 
  MDBModalBody, 
  MDBModalHeader
} from "mdbreact";
import "./HomePage.css";
const contentData = {
  "whyretailOep":[{
    "img": "/images/actions.svg",
    "heading": "Take Action",
    "shortPara": "The most important step is to start and take action on how to improve on a daily basis. OEP retail will help you begin and allow you the flexibility to gradually increase your focus.",
    "learmoreContent":"Retail OEP allows you and your team to take immediate action while allowing you to inspect what you expect. All actions are recorded and notifications sent when completed, pending and not done.  Take action!"
  },{
    "img": "/images/Inspections.svg",
    "heading": "Daily Walks",
    "shortPara": "Daily walks are inspections incorporated into your normal daily routine, but these walks are now recorded and can be shared as needed with OEP retail.",
    "learmoreContent":"Daily Retail OEP walks of your business allow you eliminate or simply decrease the amount of issues or mistakes made daily in fast pace business. Allow Retail OEP to be your guide and help daily!"
  },{
    "img": "/images/team.svg",
    "heading": "Team Oriented",
    "shortPara": "OEP Retail allows you to include your internal team in the walks/inspections and your external leaders with the simple features of emailing, texting or sharing the information.",
    "learmoreContent":"Retail OEP is built with your team in mind. The app is built to be an exceptional value, so you and your team can be a member and sync all team members."
  }], 
  "features":[{
    "img": "/images/endless-paper.jpg",
    "heading": "Make your office a smart office",
    "shortPara": "No more paper or endless filing in a dusty cabinet or binder that no one ever reviews.",
    "learmoreContent":"No more paper and looking through pages and page of notes. Everything is at your fingertips with Retail OEP."
  },{
    "img": "/images/project4.jpg",
    "heading": "Generate instant, professional reports",
    "shortPara": "Real time reports to make quick and effective decisions for you and your teams.",
    "learmoreContent":"Generate instant reports to send and share with your team, boss or on social media to share your accomplishments."
  },{
    "img": "/images/58.jpg",
    "heading": "Get a bird’s eye view with analytics",
    "shortPara": "Use data analytics along with your experience to improve your business quickly and effectively.",
    "learmoreContent":"Detail is Retail, allow Retail OEP to provide you the details you need to get it right now and tomorrow."
  }]
}
class HomePage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        modal: false,
        className: "",
        modalContent: {
          "img": "",
          "heading": "",
          "shortPara": "",
          "learmoreContent":""
        }
      }
      this.downloadAPP = React.createRef() ;
      this.showModalPopup = this.showModalPopup.bind(this); 

  }
  
  componentDidMount() {
    this.scrollToTop();
  }
  scrollToDownloadAPPSection = () =>  window.scrollTo(0, this.downloadAPP.current.offsetTop);

  scrollToTop = () => window.scrollTo(0, 0);
  /*Show Modal*/
  showModalPopup = (content, className="") => {
    this.setState({modal: true, modalContent: content, className: className});
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
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
                    src="/images/screens-section.png"
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
              {
                contentData.whyretailOep.map((contentInfo, index) =>
                    <SetWHYRETAILOEP key={index} showPopup={this.showModalPopup} contentInfo={contentInfo}  />
                )
              }
              
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
            {
              contentData.features.map((contentInfo, index) =>
                  <SETFEATURESVIEW key={index} showPopup={this.showModalPopup} contentInfo={contentInfo}  />
              )
            }
           
          </MDBRow>
          <div ref={this.downloadAPP}></div>
          </MDBContainer>
        </section>
        
        <div className="streak streak-md download-section" >
          <MDBContainer>
            <MDBRow>
              <MDBCol md="5">
                <div className="download-app-img ">
                  <img src="/images/download-app.png" className="img-fluid" alt="Download APP" />
                </div>
              </MDBCol>
              <MDBCol md="7">
                <div className="download-app-text">
                  <h3>Get the app today!</h3>
                  <p>Super easy to inspect what you expect from your daily professional lives. RetailOEP allows you to do it from the palm of your hand, with the Retail OEP app.</p>
                  <div className="download-app-button">
                    <a href="https://apps.apple.com/us/app/retail-oep/id1501693671?ls=1" className="download-btn" target="_blank"  rel="noopener noreferrer">
                      <MDBIcon fab icon="apple" />
                      <p><small>Download On</small><br /> App Store</p>
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.oep&hl=en" target="_blank"  rel="noopener noreferrer" className="download-btn hover-active">
                      <MDBIcon fab icon="google-play" />
                      <p><small>Download On</small><br /> Google Play</p>
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
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader className="modal-header-font" toggle={this.toggle}>{this.state.modalContent.heading}</MDBModalHeader>
          <MDBModalBody>
            <div className={`${this.state.className} modal-image-section`}>
              <img src={this.state.modalContent.img} alt="" className="modalImg" /> 
            </div>
            <p>{this.state.modalContent.shortPara}</p>
             <p>{this.state.modalContent.learmoreContent}</p>
          </MDBModalBody>
          
        </MDBModal>

      </>
    );
  }
}

function SetWHYRETAILOEP(props){
  const contentInfo = props.contentInfo;
  return (<MDBCol md="4" className="md-0 mb-5">
                <div className="single-featured-box">
                    <div className="icon">
                        <img
                          src={contentInfo.img}
                          alt=""
                          height="70"
                        />
                    </div>
                    <h3>{contentInfo.heading}</h3>
                    <p>{contentInfo.shortPara}</p>
                    <button className="read-more-btn"  onClick={() => props.showPopup(contentInfo)}>Read More</button>
                </div>
              </MDBCol>)
}
function SETFEATURESVIEW(props){
  const contentInfo = props.contentInfo;
  return (<MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
              <MDBView className="overlay rounded z-depth-1" waves>
                <img
                  src={contentInfo.img} alt="" className="img-fluid"
                />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
              <MDBCardBody className="pb-0 features-card cardContent">
                <h4>{contentInfo.heading}</h4>
                <p>
                  {contentInfo.shortPara}
                </p>
                <button className="btn-Started btnKeyFeatures" onClick={() => props.showPopup(contentInfo, "features-modal")}>Read More</button>
                
              </MDBCardBody>
            </MDBCol>)
}
export default HomePage;
