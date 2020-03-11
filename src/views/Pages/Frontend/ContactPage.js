import React from "react";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput,MDBCard,MDBCardBody,MDBIcon } from "mdbreact";

class ContactPage extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);
  render() {
    return (
      <>
        <div className="main-content"> 
            <section className="my-5 mt-5">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">
                            <h2 className="h2-responsive font-weight-bold mt-5 mb-4">
                            Contact Us
                            </h2>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="my-5">
                        <MDBCol lg="5" className="lg-0 mb-4">
                            <MDBCard>
                                <MDBCardBody>
                                <div className="form-header bg-grey-oep">
                                    <h3 className="mt-2">
                                    <MDBIcon icon="envelope" /> Write to us:
                                    </h3>
                                </div>
                                <p className="dark-grey-text">
                                    We'll write rarely, but only the best content.
                                </p>
                                <div className="md-form">
                                    <MDBInput
                                    icon="user"
                                    label="Your name *"
                                    iconClass="grey-text"
                                    type="text"
                                    id="form-name"
                                    />
                                </div>
                                <div className="md-form">
                                    <MDBInput
                                    icon="envelope"
                                    label="Your email *"
                                    iconClass="grey-text"
                                    type="text"
                                    id="form-email"
                                    />
                                </div>
                                <div className="md-form">
                                    <MDBInput
                                    icon="tag"
                                    label="Subject *"
                                    iconClass="grey-text"
                                    type="text"
                                    id="form-subject"
                                    />
                                </div>
                                <div className="md-form">
                                    <MDBInput
                                    icon="pencil"
                                    label="Message *"
                                    iconClass="grey-text"
                                    type="textarea"
                                    id="form-text"
                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn color="light-blue" className="btn-account">Send Now</MDBBtn>
                                </div>
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                            <MDBCol lg="7">
                            <div
                                id="map-container"
                                className="rounded z-depth-1-half map-container"
                                style={{ height: "350px" }}
                            >
                                <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d76765.98321148289!2d-73.96694563267306!3d40.751663750099084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1525939514494"
                                title="This is a unique title"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                />
                            </div>
                            <br />
                            <MDBRow className="text-center">
                                <MDBCol md="4" className="containerBd">
                                <MDBBtn tag="a" floating className="bg-grey-oep">
                                    <MDBIcon icon="map-marker" />
                                </MDBBtn>
                                <p>New York, 94126</p>
                                <p className="mb-md-0">United States</p>
                                </MDBCol>
                                <MDBCol md="4" className="containerBd">
                                <MDBBtn floating tag="a" className="bg-grey-oep">
                                    <MDBIcon icon="phone" />
                                </MDBBtn>
                                <p>+ 01 234 567 89</p>
                                <p className="mb-md-0">Mon - Fri, 8:00-22:00</p>
                                </MDBCol>
                                <MDBCol md="4">
                                <MDBBtn tag="a" floating  className="bg-grey-oep">
                                    <MDBIcon icon="envelope" />
                                </MDBBtn>
                                <p>info@gmail.com</p>
                                <p className="mb-md-0">sales@gmail.com</p>
                                </MDBCol>
                            </MDBRow>

                            </MDBCol>
                        </MDBRow>
                </MDBContainer>
            </section>  
        </div>
            
      </>
    );
  }
}

export default ContactPage;
