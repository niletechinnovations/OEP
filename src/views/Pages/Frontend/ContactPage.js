import React from "react";
import { MDBContainer, MDBCol, MDBRow, MDBIcon } from "mdbreact";
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
    e.target.className += " ";
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
                            
                        </MDBCol>
                    </MDBRow>
                    {loaderElement}
                    <ToastContainer />
                    <div className="heading-title">
                      <h2>We would love to hear from you!</h2>
                      <p>Please fill out the form below to inquire about our services.</p>
                    </div>
                    <MDBRow className="align-items-center">
                        
                        <MDBCol md="5" lg="6">
                          <div className="contact-form">
                            <form className="grey-textneeds-validation" id="contactForm" onSubmit={this.submitEnquiryForm} noValidate>
                              <MDBRow>
                                <MDBCol md="12" lg="12">
                                  <div className="form-group">
                                    <input className="form-control" name="contactPerson" placeholder="Name" required="" invalid={errors['contactPerson'] !== undefined && errors['contactPerson'] !== ""} value={contactPerson} onChange={this.changeHandler} type="text" />
                                    <p className="error">{errors['contactPerson']}</p>
                                  </div>
                                </MDBCol>

                                <MDBCol md="12" lg="12">
                                  <div  className="form-group">
                                    <input className="form-control" name="email" placeholder="Email" required="" type="email" invalid={errors['email'] !== undefined && errors['email'] !== ""} value={email} onChange={this.changeHandler} />
                                    <p className="error">{errors['email']}</p>
                                  </div>
                                </MDBCol>

                                

                                <MDBCol md="12" lg="12">
                                  <div  className="form-group">
                                    <input className="form-control" name="subject" placeholder="Subject" required="" type="text" invalid={errors['subject'] !== undefined && errors['subject'] !== ""} value={subject} onChange={this.changeHandler} />
                                    <p className="error">{errors['subject']}</p>
                                  </div>
                                </MDBCol>

                                <MDBCol md="12" lg="12">
                                  <div  className="form-group">
                                    <textarea className="form-control" cols="30" name="message" placeholder="Your Message" required="" rows="5" invalid={errors['message'] !== undefined && errors['message'] !== ""} value={message} onChange={this.changeHandler}></textarea>
                                    <p className="error">{errors['message']}</p>
                                  </div>
                                </MDBCol>

                                <MDBCol md="12" lg="6">
                                  <div className="form-group">
                                    <button  className="Send-btn" type="submit">Send Message</button>
                                  </div>
                                </MDBCol>{/*
                                <MDBCol md="12" lg="6">
                                  <div className="form-group">
                                     <a href="mailto:support@retailoep.com" className="pull-right">
                                        <MDBIcon icon="envelope" /> &nbsp;
                                    support@retailoep.com</a>
                                  </div>
                                </MDBCol>*/}
                              </MDBRow>
                            </form>
                          </div>
                        </MDBCol>
                        <MDBCol md="7" lg="6">
                          <div className="contact-image">
                            <img src="/images/contact-us.png" alt="" />
                          </div>
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
