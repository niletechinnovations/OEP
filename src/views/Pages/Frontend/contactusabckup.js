import React from "react";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput,MDBCard,MDBCardBody,MDBIcon } from "mdbreact";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
import commenService from '../../../core/services/commonService';
import './ContactPage.css';
class ContactPage extends React.Component {
   constructor( props ){
    super( props );

    this.state = {
      contactPerson: '',
      email: '',     
      subject:'',
      message:'',
      loading: false,
      errors: {}
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitEnquiryForm = this.submitEnquiryForm.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  submitEnquiryForm(e) {
    e.preventDefault();
    e.target.className += " was-validated";
      if (this.validateForm()) {
        const enquiryData = {
          contactPerson: this.state.contactPerson,
          email: this.state.email.toLowerCase(),
          subject: this.state.subject,
          message: this.state.message,
        };
        this.setState( { loading: true }, () => {
          commenService.postAPI( `common/contact-us`, enquiryData )
            .then( res => {
              if ( undefined === res.data || !res.data.status ) {
                this.setState( { loading: false } );
                toast.error(res.data.message);
                return;
              }
              this.setState( { loading: false, contactPerson: '', email: '', subject: '', message: '', errors: {}} );
              toast.success(res.data.message);
                        
            } )
            .catch( err => {
              toast.error(err.message);
              this.setState( { loading: false} );
            } )
        } )
      }else{
        //console.log("Outside validation area.");
      }
  };

  changeHandler(e) {  
    this.setState({ [e.target.name]: e.target.value });
  };
  scrollToTop = () => window.scrollTo(0, 0);
  validateForm() {
    let errors = {};
    let formIsValid = true;
    if (!this.state.contactPerson) {
        formIsValid = false;
        errors["contactPerson"] = "*Please enter name.";
    }
    if (typeof this.state.contactPerson !== "undefined") {
        if (!this.state.contactPerson.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["contactPerson"] = "*Please enter alphabet characters only.";
        }
    }
   
    if (!this.state.email) {
        formIsValid = false;
        errors["email"] = "*Please enter your email-ID.";
    }
    if (typeof this.state.email !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.email)) {
            formIsValid = false;
            errors["email"] = "*Please enter valid email-ID.";
        }
    }
    if (!this.state.subject) {
        formIsValid = false;
        errors["subject"] = "*Please enter subject";
    }
    
    if (!this.state.message) {
        formIsValid = false;
        errors["message"] = "*Please enter your message.";
    }
    
    this.setState({
      loading: false,
      errors: errors
    });
    //console.error(errors);
    return formIsValid;
  }
  render() {
  	const { loading, contactPerson, email, subject, message, errors} = this.state;
    
    let loaderElement = '';
    if(loading)
      loaderElement = <Loader />
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
                    {loaderElement}
                    <ToastContainer />
                    <div className="heading-title">
      <h2>We would love to hear from you!</h2>
      <p>Please fill out the form below to inquire about our services.</p>
    </div>
    <MDBRow className="align-items-center">
        <MDBCol md="4" lg="4">
          <div className="contact-image">
            <img src="/images/contact-banner.svg" alt="" />
          </div>
        </MDBCol>
        <MDBCol md="8" lg="8">
          <div className="contact-form">
            <form id="contactForm">
              <MDBRow>
                <MDBCol md="12" lg="6">
                  <div className="form-group">
                    <input className="form-control" name="name" placeholder="Name" required="" type="text" />
                  </div>
                </MDBCol>

                <MDBCol md="12" lg="6">
                  <div  className="form-group">
                    <input className="form-control" name="email" placeholder="Email" required="" type="email" />
                  </div>
                </MDBCol>

                <MDBCol md="12" lg="6">
                  <div  className="form-group">
                    <input className="form-control" name="phone" placeholder="Phone" required="" type="number" />
                  </div>
                </MDBCol>

                <MDBCol md="12" lg="6">
                  <div  className="form-group">
                    <input className="form-control" name="msg_subject" placeholder="Subject" required="" type="text" />
                  </div>
                </MDBCol>

                <MDBCol md="12" lg="6">
                  <div  className="form-group">
                    <textarea className="form-control" cols="30" name="message" placeholder="Your Message" required="" rows="5"></textarea>
                  </div>
                </MDBCol>

                <MDBCol md="12" lg="6">
                  <div className="form-group">
                    <button  className="Send-btn" type="submit">Send Message</button>
                  </div>
                </MDBCol>
              </MDBRow>
            </form>
          </div>
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
                                
                                <form className="grey-textneeds-validation" onSubmit={this.submitEnquiryForm} noValidate>
	                                <div className="md-form">
	                                    <MDBInput
	                                    icon="user"
	                                    label="Your name *"
	                                    iconClass="grey-text"
	                                    type="text"
	                                    name="contactPerson"
	                                    invalid={errors['contactPerson'] !== undefined && errors['contactPerson'] !== ""} value={contactPerson} onChange={this.changeHandler}
	                                    id="form-name"
	                                    required
	                                    />
	                                    <p className="error">{errors['contactPerson']}</p>
	                                </div>
	                                <div className="md-form">
	                                    <MDBInput
	                                    icon="envelope"
	                                    label="Your email *"
	                                    iconClass="grey-text"
	                                    type="email"
	                                    name="email"
	                                    id="form-email"
	                                    invalid={errors['email'] !== undefined && errors['email'] !== ""} value={email} onChange={this.changeHandler}
	                                    required
	                                    />
	                                    <p className="error">{errors['email']}</p>
	                                </div>
	                                <div className="md-form">
	                                    <MDBInput
	                                    icon="tag"
	                                    label="Subject *"
	                                    iconClass="grey-text"
	                                    type="text"
	                                    id="form-subject"
	                                    name="subject"
	                                    invalid={errors['subject'] !== undefined && errors['subject'] !== ""} value={subject} onChange={this.changeHandler}
	                                    required
	                                    />
	                                    <p className="error">{errors['subject']}</p>
	                                </div>
	                                <div className="md-form">
	                                    <MDBInput
	                                    icon="pencil"
	                                    label="Message *"
	                                    iconClass="grey-text"
	                                    type="textarea"
	                                    name="message"
	                                    invalid={errors['message'] !== undefined && errors['message'] !== ""} value={message} onChange={this.changeHandler}
	                                    id="form-text"
	                                    required
	                                    />
	                                    <p className="error">{errors['message']}</p>
	                                </div>
	                                <div className="text-center">
	                                    <MDBBtn color="light-blue" className="btn-account" type="submit">Send Now</MDBBtn>
	                                </div>
	                           	</form>
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
                               
                                <MDBCol md="4">
                                <MDBBtn tag="a" floating  className="bg-grey-oep">
                                    <MDBIcon icon="envelope" />
                                </MDBBtn>
                                <p><a href="mailto:support@retailoep.com">support@retailoep.com</a></p>
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
