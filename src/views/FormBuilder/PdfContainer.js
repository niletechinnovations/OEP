import React , { Component } from 'react';
import { Button, Input, FormGroup, FormFeedback, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import commonService from '../../core/services/commonService';
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
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);  
      if((pattern.test(this.state.share_email))){
        
        this.setState( { loading: true}, () => {
          if(this.props.templateType === "inspection") {
            const formdataShare = {email: this.state.share_email, inspectionId: this.props.inspectionId };
            commonService.postAPIWithAccessToken('inspection/share-inspection', formdataShare)
            .then( res => {   
              if ( undefined === res.data.data || !res.data.status ) {
                this.setState( {  loading: false } );
                toast.error(res.data.message);  
                this.props.history.push('/login');  
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
          }
          else {
            const formdata = {email: this.state.share_email, body_content: this.bodyRef.current.innerHTML };            
            commonService.postAPIWithAccessToken('template/share-template', formdata)
            .then( res => {   
              if ( undefined === res.data.data || !res.data.status ) {
                this.setState( {  loading: false } );
                toast.error(res.data.message);  
                this.props.history.push('/login');  
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
          }
        })
      }
      else 
        toast.error("Please enter valid email address");
    }   
    else
      toast.error("Please enter email address"); 
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
    let shareButton = <a className="btn-share pull-right" onClick={this.showShareOption}>Share</a>;
    if(this.props.hideShareButton !== undefined && this.props.hideShareButton)
      shareButton = "";
    return (
      <section className="pdf-container">
        <section className="pdf-toolbar">
          <a onClick={this.createPdf} className=" btn btn-ye"><i className="fa fa-download"></i> Download PDF</a>
          {shareButton}

        </section>
        <section className="pdf-body" style= {{padding: "20px"}} ref={this.bodyRef}>
          <div className="pdf-header-logo" style = {pdf_header_logo}>
              <img src="https://retailoep.com/logo-black.svg" alt="logo" style = {pdf_header_logo_img} />
          </div>
          {this.props.children}
        </section>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="category-modal-section">
            <ModalHeader toggle={this.toggle}>Share Template</ModalHeader>
            
              <ModalBody>
                <FormGroup> 
                  <Label htmlFor="share_email">Share on Email</Label>            
                  <Input type="email" placeholder="Email *" id="share_email" name="share_email" value={this.state.email} onChange={this.changeHandler} required />
                  <FormFeedback></FormFeedback>
                </FormGroup>
                {this.props.templateType === "inspection" ? <FormGroup><div className="share-template-on-social" ><h3>OR</h3>
                  <a className="facebook-btn" target="_blank" rel="noopener noreferrer" href={`http://www.facebook.com/sharer.php?u=https://retailoep.com/common/feedback-preview/${this.props.inspectionId}/${this.props.employeeId}`}><i className="fa fa-facebook"></i> Facebook</a>
                  <a className="twitter-btn" target="_blank" rel="noopener noreferrer" href={`http://twitter.com/share?text=RetailOEP will be the platform to help you inspect what you expect&url=https://retailoep.com/common/feedback-preview/${this.props.inspectionId}/${this.props.employeeId}`}><i className="fa fa-twitter"></i> Twitter</a>
                  <a className="linkdin-btn" target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/shareArticle?mini=true&url=https://retailoep.com/common/feedback-preview/${this.props.inspectionId}/${this.props.employeeId}&title=RetailOEP will be the platform to help you inspect what you expect`}><i className="fa fa-linkedin"></i> Linkedin</a>
                </div></FormGroup> : ""}
                {this.props.templateType === "template" && this.props.shareTemplate === "yes" ?  <FormGroup><div className="share-template-on-social" ><h3>OR</h3>
                  <a className="facebook-btn" target="_blank" rel="noopener noreferrer" href={`http://www.facebook.com/sharer.php?u=https://retailoep.com/common/template/${this.props.templateId}`}><i className="fa fa-facebook"></i> Facebook</a>
                  <a className="twitter-btn" target="_blank" rel="noopener noreferrer" href={`http://twitter.com/share?text=RetailOEP will be the platform to help you inspect what you expect&url=https://retailoep.com/common/template/${this.props.templateId}`}><i className="fa fa-twitter"></i> Twitter</a>
                  <a className="linkdin-btn" target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/shareArticle?mini=true&url=https://retailoep.com/common/template/${this.props.templateId}&title=RetailOEP will be the platform to help you inspect what you expect`}><i className="fa fa-linkedin"></i> Linkedin</a>
                </div></FormGroup>: ""}
              </ModalBody>
              <ModalFooter>
                <Button color="primary"  onClick = {this.submitHandler}  disabled={this.state.loading}>{this.state.loading ? "Processing...": "Send"}</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            
          </Modal>
      </section>
    )
  }
}
export default PdfContainer;