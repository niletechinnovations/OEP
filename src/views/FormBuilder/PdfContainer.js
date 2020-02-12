import React , { Component } from 'react';
import { Button, Form, Input, FormGroup, FormFeedback, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import commonService from '../../core/services/commonService';
import logo from '../../assets/img/brand/logo-black.svg';

var pdf_header_logo = {
  "width": "50%",
  "margin": "0 auto",
  "marginBottom": "20px",
}
var pdf_header_logo_img = {
  width: "100%",
}
class PdfContainer extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      modal: false, 
      share_email: "",
      email_error: "",
      loading: false    

    } 
   this.bodyRef = React.createRef();   
   this.changeHandler = this.changeHandler.bind(this);
   this.submitHandler = this.submitHandler.bind(this);
  }
 
  toggle = () => {
    this.setState({
      modal: !this.state.modal,      
    });
  }
  submitHandler = (event) => { 
    event.preventDefault();
    event.target.className += " was-validated";
    if(this.state.share_email !== '') {
      if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.share_email))){
        const formdata = {email: this.state.share_email, body_content: this.bodyRef.current.innerHTML };
        this.setState( { loading: true}, () => {
          commonService.postAPIWithAccessToken('template/share-template', formdata)
          .then( res => {   
            if ( undefined === res.data.data || !res.data.status ) {
              this.setState( {  loading: false } );
              toast.error(res.data.message);  
              this.props.history.push('/organization/inspection');  
              return;
            }           
            this.setState({modal:false, share_email: "", loading: false});     
           
          } )
          .catch( err => {   
                      
            if(err.response !== undefined && err.response.status === 401) {
              localStorage.clear();
              this.props.history.push('/login');
            }
            else {
              this.setState( { loading: false } );
              toast.error(err.message);    
            }
          } )
        })
      }
    }    
  }
  showShareOption = () => {    
    this.setState({
      modal: true,      
    });
  }
  changeHandler(e) {  
    this.setState({ [e.target.name]: e.target.value });
  };
  createPdf = () => this.props.createPdf(this.bodyRef.current);   
  render() {
    
    return (
      <section className="pdf-container">
        <section className="pdf-toolbar">
          <button onClick={this.createPdf} className=" btn btn-ye"><i className="fa fa-download"></i> Export PDF</button>
           <button className="btn-re pull-right" onClick={this.showShareOption}>Share</button>

        </section>
        <section className="pdf-body" style= {{padding: "20px"}} ref={this.bodyRef}>
          <div className="pdf-header-logo" style = {pdf_header_logo}>
              <img src={logo} alt="logo" style = {pdf_header_logo_img} />
          </div>
          {this.props.children}
        </section>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="category-modal-section">
            <ModalHeader toggle={this.toggle}>Share Template</ModalHeader>
            <Form onSubmit={this.submitHandler} noValidate>
              <ModalBody>
                <FormGroup> 
                  <Label htmlFor="share_email">Share on Email</Label>            
                  <Input type="email" placeholder="Email *" id="share_email" name="share_email" value={this.state.email} onChange={this.changeHandler} required />
                  <FormFeedback></FormFeedback>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary"  type="submit" disabled={this.state.loading}>{this.state.loading ? "Processing...": "Send"}</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
      </section>
    )
  }
}
export default PdfContainer;